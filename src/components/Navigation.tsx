import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Car,
  UserCircle,
  Settings,
  Home,
  LogOut,
  User,
  Wrench,
  Fuel,
  Heart,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

// Show public-friendly nav regardless of authentication
const getNavItems = () => {
  return [
    { name: "Home", href: "/", icon: Home },
    { name: "Book Service", href: "/book", icon: Car },
    { name: "Track Service", href: "/track", icon: Settings },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Emergency", href: "/emergency", icon: Heart },
  ];
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const navItems = getNavItems();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getLoginLink = () => {
    if (location.pathname.startsWith('/serviceprovider')) {
      return '/serviceprovider/login';
    }
    if (location.pathname.startsWith('/admin')) {
      return '/admin/login';
    }
    return '/login';
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-strong border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-primary bg-clip-text text-transparent">
              FixMyRide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 rounded-xl transition-smooth flex items-center space-x-2",
                    isActive
                      ? "bg-primary/20 text-primary shadow-glow-cyan"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  {profile?.full_name || user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to={getLoginLink()}>Login</Link>
                </Button>
                {!location.pathname.startsWith('/serviceprovider') &&
                  !location.pathname.startsWith('/admin') && (
                    <Button variant="hero" size="sm" asChild>
                      <Link to="/emergency">Emergency Help</Link>
                    </Button>
                  )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 glass-strong border-b border-border animate-slide-up">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl transition-smooth",
                      isActive
                        ? "bg-primary/20 text-primary shadow-glow-cyan"
                        : "text-foreground hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      {profile?.full_name || user.email}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={getLoginLink()} onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    {!location.pathname.startsWith('/serviceprovider') &&
                      !location.pathname.startsWith('/admin') && (
                        <Button variant="emergency" className="w-full" asChild>
                          <Link to="/emergency" onClick={() => setIsOpen(false)}>
                            Emergency Help
                          </Link>
                        </Button>
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}















































// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Menu, X, Car, UserCircle, Settings, Home, LogOut, User, Wrench, Fuel, Heart, ClipboardCheck, BarChart3 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useAuth } from "@/hooks/useAuth";

// // Navigation items for different user roles
// const getNavItems = (role: string | undefined, isAuthenticated: boolean) => {
//   if (!isAuthenticated) {
//     return [
//       { name: "Home", href: "/", icon: Home },
//       { name: "Emergency", href: "/emergency", icon: Heart },
//     ];
//   }

//   switch (role) {
//     case 'user':
//       return [
//         { name: "Home", href: "/", icon: Home },
//         { name: "Book Service", href: "/book", icon: Car },
//         { name: "Track Service", href: "/track", icon: Settings },
//         { name: "Profile", href: "/profile", icon: User },
//         { name: "Emergency", href: "/emergency", icon: Heart },
//       ];
//     case 'mechanic':
//       return [
//         { name: "Dashboard", href: "/serviceprovider/mechanic/dashboard", icon: Wrench },
//         { name: "KYC Status", href: "/serviceprovider/kyc", icon: ClipboardCheck },
//       ];
//     case 'fuel_station':
//       return [
//         { name: "Dashboard", href: "/serviceprovider/fuel/dashboard", icon: Fuel },
//         { name: "KYC Status", href: "/serviceprovider/kyc", icon: ClipboardCheck },
//       ];
//     case 'doctor':
//       return [
//         { name: "Dashboard", href: "/serviceprovider/medical/dashboard", icon: Heart },
//         { name: "KYC Status", href: "/serviceprovider/kyc", icon: ClipboardCheck },
//       ];
//     case 'admin':
//       return [
//         { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
//         { name: "KYC Approvals", href: "/admin/kyc-approvals", icon: ClipboardCheck },
//       ];
//     default:
//       return [
//         { name: "Home", href: "/", icon: Home },
//         { name: "Emergency", href: "/emergency", icon: Heart },
//       ];
//   }
// };

// export default function Navigation() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, profile, signOut } = useAuth();
  
//   const navItems = getNavItems(profile?.role, !!user);

//   const handleSignOut = async () => {
//     await signOut();
//     navigate('/');
//   };

//   const getLoginLink = () => {
//     if (location.pathname.startsWith('/serviceprovider')) {
//       return '/serviceprovider/login';
//     }
//     if (location.pathname.startsWith('/admin')) {
//       return '/admin/login';
//     }
//     return '/login';
//   };

//   return (
//     <nav className="fixed top-0 w-full z-50 glass-strong border-b border-border">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 group">
//             <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
//               <Car className="w-5 h-5 text-primary-foreground" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-primary bg-clip-text text-transparent">
//               FixMyRide
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={cn(
//                     "px-4 py-2 rounded-xl transition-smooth flex items-center space-x-2",
//                     isActive
//                       ? "bg-primary/20 text-primary shadow-glow-cyan"
//                       : "text-foreground hover:bg-primary/10 hover:text-primary"
//                   )}
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center space-x-3">
//             {user ? (
//               <div className="flex items-center space-x-3">
//                 <span className="text-sm text-muted-foreground">
//                   {profile?.full_name || user.email}
//                 </span>
//                 <Button variant="outline" size="sm" onClick={handleSignOut}>
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Sign Out
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <Button variant="outline" size="sm" asChild>
//                   <Link to={getLoginLink()}>Login</Link>
//                 </Button>
//                 {!location.pathname.startsWith('/serviceprovider') && !location.pathname.startsWith('/admin') && (
//                   <Button variant="hero" size="sm" asChild>
//                     <Link to="/emergency">Emergency Help</Link>
//                   </Button>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsOpen(!isOpen)}
//               className="relative"
//             >
//               {isOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden absolute top-16 left-0 right-0 glass-strong border-b border-border animate-slide-up">
//             <div className="px-4 py-6 space-y-3">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => setIsOpen(false)}
//                     className={cn(
//                       "flex items-center space-x-3 px-4 py-3 rounded-xl transition-smooth",
//                       isActive
//                         ? "bg-primary/20 text-primary shadow-glow-cyan"
//                         : "text-foreground hover:bg-primary/10 hover:text-primary"
//                     )}
//                   >
//                     <item.icon className="w-5 h-5" />
//                     <span>{item.name}</span>
//                   </Link>
//                 );
//               })}
//               <div className="pt-4 space-y-3">
//                 {user ? (
//                   <div className="space-y-3">
//                     <div className="px-4 py-2 text-sm text-muted-foreground">
//                       {profile?.full_name || user.email}
//                     </div>
//                     <Button variant="outline" className="w-full" onClick={() => {
//                       setIsOpen(false);
//                       handleSignOut();
//                     }}>
//                       <LogOut className="w-4 h-4 mr-2" />
//                       Sign Out
//                     </Button>
//                   </div>
//                 ) : (
//                   <>
//                     <Button variant="outline" className="w-full" asChild>
//                       <Link to={getLoginLink()} onClick={() => setIsOpen(false)}>
//                         Login
//                       </Link>
//                     </Button>
//                     {!location.pathname.startsWith('/serviceprovider') && !location.pathname.startsWith('/admin') && (
//                       <Button variant="emergency" className="w-full" asChild>
//                         <Link to="/emergency" onClick={() => setIsOpen(false)}>
//                           Emergency Help
//                         </Link>
//                       </Button>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }