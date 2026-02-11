import { motion } from "framer-motion";
import { Power, MapPin, Star, DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import { Link } from "react-router-dom";

const activeJobs = [
  { id: "j1", type: "Flat Tire", user: "John D.", distance: "2.3 km", priority: "high", time: "5 min ago" },
  { id: "j2", type: "Fuel Delivery", user: "Sarah M.", distance: "4.1 km", priority: "normal", time: "12 min ago" },
];

export default function ProviderDashboard() {
  const { profile } = useAuth();
  const [available, setAvailable] = useState(true);

  return (
    <AppLayout variant="provider">
      <div className="px-4 py-6 space-y-6">
        {/* Greeting + Availability */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">
              Hi{profile?.full_name ? `, ${profile.full_name}` : ""}! 🔧
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {available ? "You're online and receiving jobs" : "You're currently offline"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${available ? "bg-success animate-pulse-glow" : "bg-muted-foreground"}`} />
            <Switch checked={available} onCheckedChange={setAvailable} />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3">
          {[
            { icon: CheckCircle, label: "Completed", value: "156", color: "text-success" },
            { icon: Star, label: "Rating", value: "4.8", color: "text-accent" },
            { icon: Clock, label: "Avg Response", value: "4m", color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-3 text-center">
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Today's Earnings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-strong rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Today's Earnings</span>
            <Link to="/provider/earnings" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-display font-bold text-foreground">$285</span>
            <span className="text-xs text-success mb-1">+12% from yesterday</span>
          </div>
          <div className="flex gap-1 mt-3">
            {[40, 65, 30, 80, 55, 70, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-sm gradient-primary" style={{ height: `${h * 0.4}px` }} />
                <span className="text-[8px] text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Jobs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-lg font-display font-semibold mb-3">Incoming Requests</h2>
          <div className="space-y-3">
            {activeJobs.map((job) => (
              <div key={job.id} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {job.priority === "high" && <AlertTriangle className="h-4 w-4 text-accent" />}
                    <h3 className="text-sm font-medium text-foreground">{job.type}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">{job.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3 inline mr-1" />{job.user} • {job.distance} away
                </p>
                <div className="flex gap-2">
                  <Link to={`/provider/jobs/${job.id}`} className="flex-1">
                    <Button size="sm" className="w-full gradient-primary text-primary-foreground font-medium">
                      Accept
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="border-border">
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
