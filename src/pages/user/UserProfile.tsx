import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Car, Shield, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function UserProfile() {
  const { profile, user, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone })
      .eq("user_id", user.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated!");
      await refreshProfile();
    }
    setLoading(false);
  };

  return (
    <AppLayout variant="user" title="Profile">
      <div className="px-4 py-6 space-y-6">
        {/* Avatar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold text-primary">
              {fullName ? fullName[0]?.toUpperCase() : "U"}
            </div>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
              <Camera className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
          <h2 className="text-lg font-display font-semibold mt-3">{fullName || "User"}</h2>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </motion.div>

        {/* Personal Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Personal Information
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-muted/50 border-border h-11" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Email</label>
              <Input value={user?.email || ""} disabled className="bg-muted/30 border-border h-11 opacity-60" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-muted/50 border-border h-11" placeholder="+1 234 567 890" />
            </div>
          </div>
        </motion.div>

        {/* Vehicle Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Car className="h-4 w-4 text-primary" />
            Vehicle Information
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Make</label>
              <Input value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} placeholder="Toyota" className="bg-muted/50 border-border h-11" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Model</label>
              <Input value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} placeholder="Camry" className="bg-muted/50 border-border h-11" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Year</label>
            <Input value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} placeholder="2023" className="bg-muted/50 border-border h-11" />
          </div>
        </motion.div>

        {/* Save */}
        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full h-12 gradient-primary neon-glow text-primary-foreground font-semibold"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </AppLayout>
  );
}
