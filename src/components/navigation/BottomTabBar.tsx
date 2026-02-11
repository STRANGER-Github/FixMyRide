import { NavLink, useLocation } from "react-router-dom";
import { Home, MapPin, Clock, User, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface BottomTabBarProps {
  tabs: TabItem[];
}

export default function BottomTabBar({ tabs }: BottomTabBarProps) {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all min-w-[60px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_6px_hsl(187,94%,43%)]")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-1 h-1 w-6 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export const userTabs: TabItem[] = [
  { icon: Home, label: "Home", path: "/user/dashboard" },
  { icon: MapPin, label: "Book", path: "/user/book" },
  { icon: Clock, label: "History", path: "/user/history" },
  { icon: User, label: "Profile", path: "/user/profile" },
  { icon: Headphones, label: "Support", path: "/support" },
];

export const providerTabs: TabItem[] = [
  { icon: Home, label: "Home", path: "/provider/dashboard" },
  { icon: MapPin, label: "Jobs", path: "/provider/jobs" },
  { icon: Clock, label: "Earnings", path: "/provider/earnings" },
  { icon: User, label: "Profile", path: "/provider/profile" },
  { icon: Headphones, label: "Support", path: "/support" },
];
