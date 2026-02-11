import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background gradient-mesh p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">
              Fix<span className="text-primary">MyRide</span>
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-8"
        >
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}! 👋
          </h1>
          <p className="text-muted-foreground mb-8">Your dashboard is being built. Stay tuned!</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Emergency Help", "Mechanic", "Fuel Delivery", "Medical Aid"].map((service) => (
              <div key={service} className="glass rounded-xl p-4 text-center cursor-pointer hover:border-primary/30 transition-all">
                <p className="text-sm font-medium text-foreground">{service}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
