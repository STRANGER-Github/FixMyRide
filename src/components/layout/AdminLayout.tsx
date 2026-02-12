import { ReactNode } from "react";
import { Shield, Bell, LogOut, LayoutDashboard, Users, Wrench, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const adminTabs = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Wrench, label: "Providers", path: "/admin/providers" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: AlertTriangle, label: "Disputes", path: "/admin/disputes" },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14 max-w-5xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              Fix<span className="text-primary">MyRide</span>
            </span>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">Admin</span>
          </Link>
          {title && <h1 className="text-sm font-display font-semibold text-foreground hidden sm:block">{title}</h1>}
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

      {/* Tab Navigation */}
      <nav className="sticky top-14 z-30 glass border-b border-border/50">
        <div className="flex items-center gap-1 px-4 max-w-5xl mx-auto overflow-x-auto">
          {adminTabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
