import { motion } from "framer-motion";
import { Shield, Wrench, Fuel, Heart, Zap, MapPin, Star, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

const services = [
  { icon: Shield, label: "Emergency", color: "gradient-emergency", path: "/user/book?type=emergency" },
  { icon: Wrench, label: "Mechanic", color: "gradient-primary", path: "/user/book?type=mechanic" },
  { icon: Fuel, label: "Fuel", color: "gradient-primary", path: "/user/book?type=fuel" },
  { icon: Heart, label: "Medical", color: "gradient-emergency", path: "/user/book?type=medical" },
  { icon: Zap, label: "Jump Start", color: "gradient-primary", path: "/user/book?type=jumpstart" },
  { icon: MapPin, label: "Towing", color: "gradient-primary", path: "/user/book?type=towing" },
];

const recentBookings = [
  { id: "1", type: "Flat Tire Repair", provider: "Ahmed's Auto", date: "2 hours ago", status: "Completed", rating: 4.8 },
  { id: "2", type: "Fuel Delivery", provider: "QuickFuel Station", date: "3 days ago", status: "Completed", rating: 4.5 },
];

export default function UserDashboard() {
  const { profile } = useAuth();

  return (
    <AppLayout variant="user">
      <div className="px-4 py-6 space-y-6">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold">
            Hi{profile?.full_name ? `, ${profile.full_name}` : ""}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Need help on the road? We've got you covered.</p>
        </motion.div>

        {/* Active Booking Card (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 border-primary/20"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10">No Active Booking</span>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">You have no active service requests. Tap below to get help!</p>
          <Link to="/user/book">
            <Button size="sm" className="mt-3 gradient-primary text-primary-foreground font-medium">
              Request Help <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Quick Services */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-lg font-display font-semibold mb-3">Quick Services</h2>
          <div className="grid grid-cols-3 gap-3">
            {services.map((service, i) => (
              <Link key={service.label} to={service.path}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="glass rounded-xl p-4 text-center cursor-pointer hover:border-primary/30 transition-all group"
                >
                  <div className={`h-10 w-10 rounded-lg ${service.color} flex items-center justify-center mx-auto mb-2`}>
                    <service.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{service.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Profile Completion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Profile Completion</span>
            <span className="text-xs text-primary font-medium">60%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-3/5 gradient-primary rounded-full" />
          </div>
          <Link to="/user/profile">
            <p className="text-xs text-primary mt-2 hover:underline cursor-pointer">Complete your profile →</p>
          </Link>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-display font-semibold">Recent Bookings</h2>
            <Link to="/user/history" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="glass rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{booking.type}</p>
                  <p className="text-xs text-muted-foreground">{booking.provider} • {booking.date}</p>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 text-accent fill-accent" />
                  <span className="text-foreground font-medium">{booking.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
