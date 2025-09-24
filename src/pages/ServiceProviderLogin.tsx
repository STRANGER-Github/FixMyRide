import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Lock, Eye, EyeOff, UserPlus, Building } from "lucide-react";
import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

type ProviderType = 'mechanic' | 'fuel_station' | 'doctor';

export default function ServiceProviderLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [providerType, setProviderType] = useState<ProviderType>('mechanic');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) {
      // Redirect based on provider type or role
      if (profile.role === 'admin') {
        navigate('/admin');
      } else if (['mechanic', 'fuel_station', 'doctor'].includes(profile.role)) {
        navigate(`/serviceprovider/${profile.role}/dashboard`);
      } else {
        navigate('/serviceprovider/kyc');
      }
    }
  }, [user, profile, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome Back! 🚀",
          description: "Successfully logged into FixMyRide Provider Portal",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/serviceprovider/kyc`,
          data: {
            full_name: fullName,
            role: providerType,
            business_name: businessName,
            provider_type: providerType
          }
        }
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Registration Successful! 📧",
          description: "Please check your email to verify your account",
        });
        
        // Create service provider record
        const { error: providerError } = await supabase
          .from('service_providers')
          .insert({
            user_id: data.user.id,
            provider_type: providerType,
            business_name: businessName,
            kyc_status: 'pending'
          });

        if (providerError) {
          console.error('Error creating provider record:', providerError);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                {isSignUp ? 'Join as Provider' : 'Provider Portal'}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {isSignUp 
                ? 'Register as a service provider and start earning' 
                : 'Access your service provider dashboard'
              }
            </p>
          </div>

          <Card className="glass-strong border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isSignUp ? <UserPlus className="w-5 h-5" /> : <Building className="w-5 h-5" />}
                {isSignUp ? 'Create Provider Account' : 'Provider Sign In'}
              </CardTitle>
              <CardDescription>
                {isSignUp 
                  ? 'Complete the form below to register as a service provider'
                  : 'Sign in to manage your services and bookings'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
                {isSignUp && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-background-secondary border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        type="text"
                        placeholder="Your business name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="bg-background-secondary border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="providerType">Service Type</Label>
                      <Select value={providerType} onValueChange={(value: ProviderType) => setProviderType(value)}>
                        <SelectTrigger className="bg-background-secondary border-border">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mechanic">Mechanic Services</SelectItem>
                          <SelectItem value="fuel_station">Fuel Station</SelectItem>
                          <SelectItem value="doctor">Medical Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@business.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background-secondary border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-background-secondary border-border"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading 
                    ? (isSignUp ? "Creating Account..." : "Signing In...") 
                    : (isSignUp ? "Create Provider Account" : "Sign In")
                  }
                </Button>
              </form>

              {/* Toggle between login and signup */}
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                </span>
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-neon-cyan hover:underline font-medium"
                >
                  {isSignUp ? 'Sign In' : 'Register'}
                </button>
              </div>

              {/* User Login Link */}
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">Regular user? </span>
                <Link to="/login" className="text-primary hover:underline font-medium">
                  User Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}