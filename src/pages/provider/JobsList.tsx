import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Star, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";

const jobs = [
  { id: "j1", type: "Flat Tire", user: "John D.", distance: "2.3 km", status: "pending", time: "5 min ago", priority: "high" },
  { id: "j2", type: "Fuel Delivery", user: "Sarah M.", distance: "4.1 km", status: "pending", time: "12 min ago", priority: "normal" },
  { id: "j3", type: "Jump Start", user: "Alex P.", distance: "1.8 km", status: "accepted", time: "20 min ago", priority: "normal" },
  { id: "j4", type: "Engine Check", user: "Maria L.", distance: "5.2 km", status: "completed", time: "2 hours ago", priority: "normal" },
];

export default function JobsList() {
  return (
    <AppLayout variant="provider" title="Jobs">
      <div className="px-4 py-6 space-y-4">
        {/* Tabs */}
        <div className="flex gap-2">
          {["All", "Pending", "Active", "Completed"].map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                i === 0 ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-3">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {job.priority === "high" && <AlertTriangle className="h-4 w-4 text-accent" />}
                  <h3 className="text-sm font-medium text-foreground">{job.type}</h3>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  job.status === "completed" ? "bg-success/10 text-success" :
                  job.status === "accepted" ? "bg-primary/10 text-primary" :
                  "bg-accent/10 text-accent"
                }`}>
                  {job.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3 inline mr-1" />{job.user} • {job.distance} • {job.time}
              </p>
              {job.status === "pending" && (
                <div className="flex gap-2">
                  <Link to={`/provider/jobs/${job.id}`} className="flex-1">
                    <Button size="sm" className="w-full gradient-primary text-primary-foreground text-xs">Accept</Button>
                  </Link>
                  <Button size="sm" variant="outline" className="border-border text-xs">Decline</Button>
                </div>
              )}
              {job.status === "accepted" && (
                <Link to={`/provider/jobs/${job.id}`}>
                  <Button size="sm" variant="outline" className="w-full border-primary text-primary text-xs">View Details</Button>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
