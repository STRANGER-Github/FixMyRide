import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Camera, AlertTriangle, Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/components/layout/AppLayout";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const serviceTypes = [
  { value: "emergency", label: "Emergency", emoji: "🚨" },
  { value: "mechanic", label: "Mechanic", emoji: "🔧" },
  { value: "fuel", label: "Fuel Delivery", emoji: "⛽" },
  { value: "medical", label: "Medical Aid", emoji: "🏥" },
  { value: "jumpstart", label: "Jump Start", emoji: "⚡" },
  { value: "towing", label: "Towing", emoji: "🚛" },
];

export default function ServiceBooking() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "mechanic";
  const [selectedType, setSelectedType] = useState(initialType);
  const [description, setDescription] = useState("");
  const [isEmergency, setIsEmergency] = useState(initialType === "emergency");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Service request submitted! Looking for providers...");
      setLoading(false);
    }, 1500);
  };

  return (
    <AppLayout variant="user" title="Book Service">
      <div className="px-4 py-6 space-y-6">
        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl h-48 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="text-center z-10">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2 animate-float" />
            <p className="text-sm text-muted-foreground">Auto-detecting your location...</p>
            <p className="text-xs text-primary mt-1">Lagos, Nigeria</p>
          </div>
        </motion.div>

        {/* Service Type Selection */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-sm font-medium text-foreground mb-3">What do you need?</h3>
          <div className="grid grid-cols-3 gap-2">
            {serviceTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`glass rounded-xl p-3 text-center transition-all ${
                  selectedType === type.value ? "border-primary/50 neon-glow" : "hover:border-muted-foreground/20"
                }`}
              >
                <span className="text-xl block mb-1">{type.emoji}</span>
                <span className="text-xs font-medium text-foreground">{type.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-medium text-foreground mb-2">Describe the problem</h3>
          <Textarea
            placeholder="E.g. My car won't start, battery might be dead..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-muted/50 border-border min-h-[80px] resize-none"
          />
        </motion.div>

        {/* Photo Upload */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <button className="glass rounded-xl p-4 w-full flex items-center gap-3 hover:border-primary/30 transition-all">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
              <Camera className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Add Photos</p>
              <p className="text-xs text-muted-foreground">Help providers understand the issue</p>
            </div>
          </button>
        </motion.div>

        {/* Emergency Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Emergency Mode</p>
              <p className="text-xs text-muted-foreground">Priority dispatch for urgent situations</p>
            </div>
          </div>
          <Switch checked={isEmergency} onCheckedChange={setIsEmergency} />
        </motion.div>

        {/* Submit */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full h-14 font-bold text-base rounded-xl ${
              isEmergency ? "gradient-emergency emergency-glow" : "gradient-primary neon-glow"
            } text-primary-foreground`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                {isEmergency ? "Request Emergency Help" : "Request Help"}
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
}
