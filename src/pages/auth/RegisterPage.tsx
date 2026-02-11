import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Shield, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background gradient-mesh flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
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
          <h1 className="text-2xl font-display font-bold text-center mb-2">Create Account</h1>
          <p className="text-muted-foreground text-center text-sm mb-8">Join FixMyRide today</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Full name" className="pl-10 bg-muted/50 border-border h-12" />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Email address" type="email" className="pl-10 bg-muted/50 border-border h-12" />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Phone number" type="tel" className="pl-10 bg-muted/50 border-border h-12" />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10 bg-muted/50 border-border h-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" className="rounded border-border mt-0.5" />
              <span>
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>

            <Button className="w-full h-12 gradient-primary neon-glow text-primary-foreground font-semibold text-base">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
