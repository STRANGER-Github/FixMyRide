import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Public pages
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import EmergencyPage from "./pages/EmergencyPage";
import SupportPage from "./pages/SupportPage";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RoleSelectPage from "./pages/auth/RoleSelectPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import ServiceBooking from "./pages/user/ServiceBooking";
import LiveTracking from "./pages/user/LiveTracking";
import UserProfile from "./pages/user/UserProfile";
import BookingHistory from "./pages/user/BookingHistory";

// Provider pages
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import JobsList from "./pages/provider/JobsList";
import JobManagement from "./pages/provider/JobManagement";
import KYCVerification from "./pages/provider/KYCVerification";
import ProviderProfile from "./pages/provider/ProviderProfile";
import Earnings from "./pages/provider/Earnings";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProviderManagement from "./pages/admin/ProviderManagement";
import UserManagement from "./pages/admin/UserManagement";
import DisputeResolution from "./pages/admin/DisputeResolution";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/role-select" element={<RoleSelectPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

            {/* User */}
            <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/user/book" element={<ProtectedRoute><ServiceBooking /></ProtectedRoute>} />
            <Route path="/user/tracking/:bookingId" element={<ProtectedRoute><LiveTracking /></ProtectedRoute>} />
            <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/user/history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />

            {/* Provider */}
            <Route path="/provider/dashboard" element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} />
            <Route path="/provider/jobs" element={<ProtectedRoute><JobsList /></ProtectedRoute>} />
            <Route path="/provider/jobs/:jobId" element={<ProtectedRoute><JobManagement /></ProtectedRoute>} />
            <Route path="/provider/kyc" element={<ProtectedRoute><KYCVerification /></ProtectedRoute>} />
            <Route path="/provider/profile" element={<ProtectedRoute><ProviderProfile /></ProtectedRoute>} />
            <Route path="/provider/earnings" element={<ProtectedRoute><Earnings /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/providers" element={<ProtectedRoute requiredRole="admin"><ProviderManagement /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><UserManagement /></ProtectedRoute>} />
            <Route path="/admin/disputes" element={<ProtectedRoute requiredRole="admin"><DisputeResolution /></ProtectedRoute>} />

            {/* Shared */}
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/support" element={<SupportPage />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
