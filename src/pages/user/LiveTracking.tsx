import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Star, Clock, CheckCircle, Navigation, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

const statusSteps = [
  { label: "Request Sent", done: true },
  { label: "Provider Assigned", done: true },
  { label: "En Route", done: true },
  { label: "Arrived", done: false },
  { label: "Completed", done: false },
];

export default function LiveTracking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return (
    <AppLayout variant="user" title="Live Tracking">
      <div className="px-4 py-6 space-y-6">
        {/* Map Area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl h-56 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="text-center z-10">
            <Navigation className="h-10 w-10 text-primary mx-auto mb-2 animate-float" />
            <p className="text-sm text-muted-foreground">Provider is on the way</p>
            <p className="text-lg font-display font-bold text-primary mt-1">ETA: 8 min</p>
          </div>
        </motion.div>

        {/* Provider Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-2xl p-4"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-xl font-bold text-primary">
              AM
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground">Ahmed Mechanic</h3>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                <span className="text-xs text-foreground">4.8</span>
                <span className="text-xs text-muted-foreground">• 1,200+ jobs</span>
              </div>
            </div>
            <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10">En Route</span>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-11 border-border">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1 h-11 border-border">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4"
        >
          <h3 className="text-sm font-medium text-foreground mb-4">Service Progress</h3>
          <div className="space-y-4">
            {statusSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                  step.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {step.done ? <CheckCircle className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
                </div>
                {i < statusSteps.length - 1 && (
                  <div className="absolute ml-3 mt-8 w-px h-4 bg-border" />
                )}
                <span className={`text-sm ${step.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cancel */}
        <Button
          variant="outline"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
          onClick={() => navigate("/user/dashboard")}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel Booking
        </Button>
      </div>
    </AppLayout>
  );
}
