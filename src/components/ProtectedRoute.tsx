import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/hooks/useAuth';
import { Loader2, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      console.log('Unauthorized access attempt to:', location.pathname);
    }
  }, [loading, requireAuth, user, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="relative">
          <Shield className="w-24 h-24 mx-auto text-destructive animate-pulse" />
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => window.history.back()}
            className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
          <a 
            href="/"
            className="block w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}