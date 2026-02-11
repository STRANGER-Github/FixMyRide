import { motion } from "framer-motion";
import { Shield, Wrench, UserCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const roles = [
  {
    icon: UserCheck,
    title: "I Need Help",
    desc: "I'm a vehicle owner looking for emergency roadside assistance.",
    path: "/user/dashboard",
  },
  {
    icon: Wrench,
    title: "I Provide Services",
    desc: "I'm a mechanic, fuel station, or medical professional.",
    path: "/provider/dashboard",
  },
  {
    icon: Shield,
    title: "Administrator",
    desc: "I manage the FixMyRide platform.",
    path: "/admin/dashboard",
  },
];

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelect = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background gradient-mesh flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">
            Fix<span className="text-primary">MyRide</span>
          </span>
        </Link>

        <div className="glass-strong rounded-2xl p-8">
          <h1 className="text-2xl font-display font-bold text-center mb-2">Choose Your Role</h1>
          <p className="text-muted-foreground text-center text-sm mb-8">How would you like to use FixMyRide?</p>

          <div className="space-y-4">
            {roles.map((role, i) => (
              <motion.button
                key={role.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSelect(role.path)}
                className="w-full glass rounded-xl p-5 cursor-pointer group hover:border-primary/30 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <role.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.desc}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
