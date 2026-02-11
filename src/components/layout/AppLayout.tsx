import { ReactNode } from "react";
import { Shield, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import BottomTabBar from "@/components/navigation/BottomTabBar";
import { userTabs, providerTabs } from "@/components/navigation/BottomTabBar";

interface AppLayoutProps {
  children: ReactNode;
  variant: "user" | "provider";
  title?: string;
}

export default function AppLayout({ children, variant, title }: AppLayoutProps) {
  const { signOut } = useAuth();
  const tabs = variant === "user" ? userTabs : providerTabs;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              Fix<span className="text-primary">MyRide</span>
            </span>
          </Link>
          {title && <h1 className="text-sm font-display font-semibold text-foreground absolute left-1/2 -translate-x-1/2">{title}</h1>}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" onClick={signOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pb-20 max-w-lg mx-auto">
        {children}
      </main>

      {/* Floating Emergency Button */}
      <Link
        to="/emergency"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full gradient-emergency emergency-glow flex items-center justify-center shadow-lg animate-pulse-glow"
      >
        <Shield className="h-6 w-6 text-accent-foreground" />
      </Link>

      <BottomTabBar tabs={tabs} />
    </div>
  );
}
