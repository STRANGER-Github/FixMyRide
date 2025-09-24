import { Link } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="relative">
            <AlertTriangle className="w-24 h-24 mx-auto text-amber-500 animate-pulse" />
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="space-y-2">
            <Button 
              onClick={() => window.history.back()}
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            <Button asChild className="w-full flex items-center justify-center gap-2" variant="hero">
              <Link to="/">
                <Home className="w-4 h-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}