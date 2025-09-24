-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('user', 'mechanic', 'fuel_station', 'doctor', 'admin');

-- Create enum for provider types  
CREATE TYPE public.provider_type AS ENUM ('mechanic', 'fuel_station', 'doctor');

-- Create enum for KYC status
CREATE TYPE public.kyc_status AS ENUM ('pending', 'approved', 'rejected');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service providers table
CREATE TABLE public.service_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_type provider_type NOT NULL,
  business_name TEXT NOT NULL,
  business_address TEXT,
  license_number TEXT,
  contact_phone TEXT,
  is_active BOOLEAN DEFAULT false,
  kyc_status kyc_status DEFAULT 'pending',
  kyc_submitted_at TIMESTAMP WITH TIME ZONE,
  kyc_approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create KYC documents table for file uploads
CREATE TABLE public.kyc_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.service_providers(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- 'license', 'certificate', 'registration'
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  status kyc_status DEFAULT 'pending',
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.service_providers(id),
  service_type provider_type NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'in_progress', 'completed', 'cancelled'
  location_lat DECIMAL,
  location_lng DECIMAL,
  location_address TEXT,
  description TEXT,
  estimated_cost DECIMAL,
  actual_cost DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for service providers
CREATE POLICY "Providers can view their own data"
ON public.service_providers
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all providers"
ON public.service_providers
FOR ALL
USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can view approved providers"
ON public.service_providers
FOR SELECT
USING (kyc_status = 'approved' AND is_active = true);

-- RLS Policies for KYC documents
CREATE POLICY "Providers can manage their own KYC docs"
ON public.kyc_documents
FOR ALL
USING (
  provider_id IN (
    SELECT id FROM public.service_providers WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all KYC docs"
ON public.kyc_documents
FOR SELECT
USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Providers can view their assigned bookings"
ON public.bookings
FOR SELECT
USING (
  provider_id IN (
    SELECT id FROM public.service_providers WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Providers can update their assigned bookings"
ON public.bookings
FOR UPDATE
USING (
  provider_id IN (
    SELECT id FROM public.service_providers WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR ALL
USING (public.get_user_role(auth.uid()) = 'admin');

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_providers_updated_at
  BEFORE UPDATE ON public.service_providers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'user')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();