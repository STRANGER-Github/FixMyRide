import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Camera, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/components/layout/AppLayout";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCreateRequest, ProviderType } from "@/hooks/useServiceRequests";

const serviceTypes: { value: ProviderType; label: string; emoji: string }[] = [
  { value: "mechanic", label: "Mechanic", emoji: "🔧" },
  { value: "fuel_delivery", label: "Fuel Delivery", emoji: "⛽" },
  { value: "medical_aid", label: "Medical Aid", emoji: "🏥" },
];

export default function ServiceBooking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialType = (searchParams.get("type") as ProviderType) || "mechanic";
  const [selectedType, setSelectedType] = useState<ProviderType>(initialType);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const createRequest = useCreateRequest();

  const detectLocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
          setDetecting(false);
        },
        () => {
          setLocation("Location detection failed - enter manually");
          setDetecting(false);
        }
      );
    } else {
      setLocation("Geolocation not supported");
      setDetecting(false);
    }
  };

  const handleSubmit = () => {
    if (!location.trim()) { return; }
    createRequest.mutate(
      {
        service_type: selectedType,
        location: location.trim(),
        description: description.trim() || undefined,
      },
      {
        onSuccess: (data: any) => {
          navigate(`/user/tracking/${data.id}`);
        },
      }
    );
  };

  return (
    <AppLayout variant="user" title="Book Service">
      <div className="px-4 py-6 space-y-6">
        {/* Location */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Your Location</h3>
          </div>
          <Input
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-muted/50 border-border h-11 mb-2"
          />
          <Button variant="outline" size="sm" onClick={detectLocation} disabled={detecting} className="text-xs border-primary text-primary">
            {detecting ? "Detecting..." : "📍 Auto-detect location"}
          </Button>
        </motion.div>

        {/* Service Type */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-sm font-medium text-foreground mb-3">What do you need?</h3>
          <div className="grid grid-cols-3 gap-2">
            {serviceTypes.map((type) => (
              <button key={type.value} onClick={() => setSelectedType(type.value)}
                className={`glass rounded-xl p-3 text-center transition-all ${
                  selectedType === type.value ? "border-primary/50 neon-glow" : "hover:border-muted-foreground/20"
                }`}>
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

        {/* Emergency Toggle */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Emergency Mode</p>
              <p className="text-xs text-muted-foreground">Priority dispatch</p>
            </div>
          </div>
          <Switch checked={isEmergency} onCheckedChange={setIsEmergency} />
        </motion.div>

        {/* Submit */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Button
            onClick={handleSubmit}
            disabled={createRequest.isPending || !location.trim()}
            className={`w-full h-14 font-bold text-base rounded-xl ${
              isEmergency ? "gradient-emergency emergency-glow" : "gradient-primary neon-glow"
            } text-primary-foreground`}
          >
            {createRequest.isPending ? (
              <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <><Send className="h-5 w-5 mr-2" />{isEmergency ? "Request Emergency Help" : "Request Help"}</>
            )}
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
}
