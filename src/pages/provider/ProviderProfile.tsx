import { useState } from "react";
import { motion } from "framer-motion";
import { User, Wrench, MapPin, Clock, Camera, Save, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const specializations = ["Flat Tire", "Engine Repair", "Battery", "Fuel Delivery", "Towing", "Electrical"];

export default function ProviderProfile() {
  const { profile, user, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [bio, setBio] = useState("");
  const [serviceRadius, setServiceRadius] = useState("15");
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(["Flat Tire", "Battery"]);
  const [loading, setLoading] = useState(false);

  const toggleSpec = (spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone })
      .eq("user_id", user.id);

    if (error) toast.error(error.message);
    else {
      toast.success("Profile updated!");
      await refreshProfile();
    }
    setLoading(false);
  };

  return (
    <AppLayout variant="provider" title="Profile">
      <div className="px-4 py-6 space-y-6">
        {/* Avatar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold text-primary">
              {fullName ? fullName[0]?.toUpperCase() : "P"}
            </div>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
              <Camera className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
          <h2 className="text-lg font-display font-semibold mt-3">{fullName || "Provider"}</h2>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </motion.div>

        {/* Personal Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="h-4 w-4 text-primary" /> Personal Info
          </h3>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="bg-muted/50 border-border h-11" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="bg-muted/50 border-border h-11" />
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Professional bio..." className="bg-muted/50 border-border min-h-[60px] resize-none" />
        </motion.div>

        {/* Specializations */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-xl p-4">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2 mb-3">
            <Wrench className="h-4 w-4 text-primary" /> Specializations
          </h3>
          <div className="flex flex-wrap gap-2">
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => toggleSpec(spec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSpecs.includes(spec)
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Service Settings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Service Settings
          </h3>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Service Radius (km)</label>
            <Input value={serviceRadius} onChange={(e) => setServiceRadius(e.target.value)} type="number" className="bg-muted/50 border-border h-11" />
          </div>
        </motion.div>

        <Button onClick={handleSave} disabled={loading} className="w-full h-12 gradient-primary neon-glow text-primary-foreground font-semibold">
          <Save className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </AppLayout>
  );
}
