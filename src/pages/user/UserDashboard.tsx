import { motion } from "framer-motion";
import { Shield, Wrench, Fuel, Heart, MapPin, Star, ArrowRight, TrendingUp, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useUserRequests } from "@/hooks/useServiceRequests";

const services = [
  { icon: Wrench, label: "Mechanic", color: "gradient-primary", path: "/user/book?type=mechanic" },
  { icon: Fuel, label: "Fuel", color: "gradient-primary", path: "/user/book?type=fuel_delivery" },
  { icon: Heart, label: "Medical", color: "gradient-emergency", path: "/user/book?type=medical_aid" },
];

export default function UserDashboard() {
  const { profile } = useAuth();
  const { data: requests, isLoading } = useUserRequests();
  const activeRequest = (requests || []).find((r: any) => !["completed", "cancelled"].includes(r.status));
  const recentCompleted = (requests || []).filter((r: any) => r.status === "completed").slice(0, 3);

  return (
    <AppLayout variant="user">
      <div className="px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold">
            Hi{profile?.full_name ? `, ${profile.full_name}` : ""}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Need help on the road? We've got you covered.</p>
        </motion.div>

        {/* Active Booking */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 border-primary/20">
          {activeRequest ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10 capitalize">
                  {activeRequest.status.replace(/_/g, " ")}
                </span>
                {activeRequest.tracking_id && (
                  <span className="text-xs text-muted-foreground font-mono">{activeRequest.tracking_id}</span>
                )}
              </div>
              <p className="text-sm text-foreground font-medium capitalize">{activeRequest.service_type.replace(/_/g, " ")}</p>
              <p className="text-xs text-muted-foreground mt-1">{activeRequest.location}</p>
              <Link to={`/user/tracking/${activeRequest.id}`}>
                <Button size="sm" className="mt-3 gradient-primary text-primary-foreground font-medium">
                  Track Service <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10">No Active Booking</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Tap below to get help!</p>
              <Link to="/user/book">
                <Button size="sm" className="mt-3 gradient-primary text-primary-foreground font-medium">
                  Request Help <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Quick Services */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-lg font-display font-semibold mb-3">Quick Services</h2>
          <div className="grid grid-cols-3 gap-3">
            {services.map((service, i) => (
              <Link key={service.label} to={service.path}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.05 }}
                  className="glass rounded-xl p-4 text-center cursor-pointer hover:border-primary/30 transition-all group">
                  <div className={`h-10 w-10 rounded-lg ${service.color} flex items-center justify-center mx-auto mb-2`}>
                    <service.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{service.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-display font-semibold">Recent Bookings</h2>
            <Link to="/user/history" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          {isLoading ? (
            <div className="glass rounded-xl p-6 text-center">
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : recentCompleted.length > 0 ? (
            <div className="space-y-3">
              {recentCompleted.map((booking: any) => (
                <div key={booking.id} className="glass rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">{booking.service_type.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">{booking.location} • {new Date(booking.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">₹{booking.amount || "—"}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">No bookings yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </AppLayout>
  );
}
