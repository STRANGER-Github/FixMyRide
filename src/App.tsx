import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute, { UnauthorizedPage } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import BookService from "./pages/BookService";
import ServiceProvider from "./pages/ServiceProvider";
import AdminDashboard from "./pages/AdminDashboard";
import UserLogin from "./pages/UserLogin";
import ServiceProviderLogin from "./pages/ServiceProviderLogin";
import AdminLogin from "./pages/AdminLogin";
import KYCUpload from "./pages/KYCUpload";
import MechanicDashboard from "./pages/MechanicDashboard";
import FuelDashboard from "./pages/FuelDashboard";
import MedicalDashboard from "./pages/MedicalDashboard";
import AdminKYCApprovals from "./pages/AdminKYCApprovals";
import UserProfile from "./pages/UserProfile";
import Emergency from "./pages/Emergency";
import TrackService from "./pages/TrackService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* <Routes> */}
















      <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/login" element={<UserLogin />} />
  <Route path="/serviceprovider/login" element={<ServiceProviderLogin />} />
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/403" element={<UnauthorizedPage />} />
  
  {/* Make these routes public by removing ProtectedRoute */}
  <Route path="/book" element={<BookService />} />
  <Route path="/emergency" element={<Emergency />} />
  <Route path="/track" element={<TrackService />} />
  <Route path="/profile" element={<UserProfile />} />
  
  <Route path="/serviceprovider" element={<ServiceProvider />} />
  <Route path="/serviceprovider/kyc" element={<KYCUpload />} />
  <Route path="/serviceprovider/mechanic/dashboard" element={<MechanicDashboard />} />
  <Route path="/serviceprovider/fuel/dashboard" element={<FuelDashboard />} />
  <Route path="/serviceprovider/medical/dashboard" element={<MedicalDashboard />} />

  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/kyc-approvals" element={<AdminKYCApprovals />} />

  <Route path="*" element={<NotFound />} />
</Routes>


























            {/* Public Routes */}
            {/* <Route path="/" element={<Index />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/serviceprovider/login" element={<ServiceProviderLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/403" element={<UnauthorizedPage />} /> */}

            {/* User Routes */}
            {/* <Route path="/book" element={
              <ProtectedRoute allowedRoles={['user']}>
                <BookService />
              </ProtectedRoute>
            } />
            <Route path="/emergency" element={
              <ProtectedRoute allowedRoles={['user']}>
                <Emergency />
              </ProtectedRoute>
            } />
            <Route path="/track" element={
              <ProtectedRoute allowedRoles={['user']}>
                <TrackService />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserProfile />
              </ProtectedRoute>
            } /> */}

            {/* Service Provider Routes */}
            {/* <Route path="/serviceprovider" element={<ServiceProvider />} />
            <Route path="/serviceprovider/kyc" element={
              <ProtectedRoute allowedRoles={['mechanic', 'fuel_station', 'doctor']}>
                <KYCUpload />
              </ProtectedRoute>
            } />
            <Route path="/serviceprovider/mechanic/dashboard" element={
              <ProtectedRoute allowedRoles={['mechanic']}>
                <MechanicDashboard />
              </ProtectedRoute>
            } />
            <Route path="/serviceprovider/fuel/dashboard" element={
              <ProtectedRoute allowedRoles={['fuel_station']}>
                <FuelDashboard />
              </ProtectedRoute>
            } />
            <Route path="/serviceprovider/medical/dashboard" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <MedicalDashboard />
              </ProtectedRoute>
            } /> */}

            {/* Admin Routes */}
            {/* <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/kyc-approvals" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminKYCApprovals />
              </ProtectedRoute>
            } />
 */}
            {/* Catch All */}
            {/* <Route path="*" element={<NotFound />} /> */}
          {/* </Routes> */}
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
