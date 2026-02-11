import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Navigation, Camera, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";

const statusOptions = ["Accepted", "En Route", "Arrived", "Working", "Completed"];

export default function JobManagement() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(1); // "En Route"

  const advanceStatus = () => {
    if (currentStatus < statusOptions.length - 1) {
      setCurrentStatus(currentStatus + 1);
    } else {
      navigate("/provider/dashboard");
    }
  };

  return (
    <AppLayout variant="provider" title="Job Details">
      <div className="px-4 py-6 space-y-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl h-48 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="text-center z-10">
            <Navigation className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Navigate to User</p>
            <p className="text-xs text-primary mt-1">2.3 km • ~8 min</p>
          </div>
        </motion.div>

        {/* Job Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-2xl p-4"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-lg font-bold text-primary">
              JD
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground">John Doe</h3>
              <p className="text-xs text-muted-foreground">Flat Tire • Toyota Camry 2023</p>
            </div>
          </div>

          <div className="glass rounded-lg p-3 mb-4">
            <p className="text-sm text-muted-foreground">
              "My front left tire blew out on the highway. I'm parked on the shoulder."
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-11 border-border">
              <Phone className="h-4 w-4 mr-2" /> Call
            </Button>
            <Button variant="outline" className="flex-1 h-11 border-border">
              <MessageSquare className="h-4 w-4 mr-2" /> Chat
            </Button>
          </div>
        </motion.div>

        {/* Status Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4"
        >
          <h3 className="text-sm font-medium text-foreground mb-4">Update Status</h3>
          <div className="flex items-center gap-1 mb-4">
            {statusOptions.map((status, i) => (
              <div key={status} className="flex-1 flex flex-col items-center">
                <div className={`h-2 w-full rounded-full ${i <= currentStatus ? "gradient-primary" : "bg-muted"}`} />
                <span className={`text-[9px] mt-1 ${i <= currentStatus ? "text-primary" : "text-muted-foreground"}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Document Work */}
        <button className="glass rounded-xl p-4 w-full flex items-center gap-3 hover:border-primary/30 transition-all">
          <Camera className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Document Completed Work</span>
        </button>

        {/* Action Button */}
        <Button
          onClick={advanceStatus}
          className="w-full h-14 gradient-primary neon-glow text-primary-foreground font-bold text-base rounded-xl"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          {currentStatus < statusOptions.length - 1
            ? `Mark as ${statusOptions[currentStatus + 1]}`
            : "Complete Job"}
        </Button>
      </div>
    </AppLayout>
  );
}
