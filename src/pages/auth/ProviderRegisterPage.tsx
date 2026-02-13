import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Shield, User, Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const db = supabase as any;

export default function ProviderRegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [providerType, setProviderType] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate("/provider/dashboard", { replace: true });
    return null;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please accept the terms"); return; }
    if (!providerType) { toast.error("Please select a provider type"); return; }
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email, password,
      options: {
        emailRedirectTo: window.location.origin + "/provider/dashboard",
        data: { full_name: fullName, phone },
      },
    });

    if (authError) {
      toast.error(authError.message);
      setLoading(false);
      return;
    }

    // Create service_provider record (trigger will add service_provider role)
    if (authData.user) {
      const { error: spError } = await db
        .from("service_providers")
        .insert({
          user_id: authData.user.id,
          provider_type: providerType,
          phone,
        });
      if (spError) {
        console.error("Provider record error:", spError);
        // Still redirect — the record can be created later
      }
    }

    toast.success("Account created! Check email for verification.");
    navigate("/auth/provider/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background gradient-mesh flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">Fix<span className="text-primary">MyRide</span></span>
        </Link>

        <div className="glass-strong rounded-2xl p-8">
          <h1 className="text-2xl font-display font-bold text-center mb-2">Provider Sign Up</h1>
          <p className="text-muted-foreground text-center text-sm mb-8">Register as a service provider</p>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10 bg-muted/50 border-border h-12" required />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-muted/50 border-border h-12" required />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 bg-muted/50 border-border h-12" required />
            </div>
            <div>
              <Select value={providerType} onValueChange={setProviderType}>
                <SelectTrigger className="bg-muted/50 border-border h-12">
                  <Wrench className="h-4 w-4 text-muted-foreground mr-2" />
                  <SelectValue placeholder="Select provider type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mechanic">Mechanic</SelectItem>
                  <SelectItem value="fuel_delivery">Fuel Delivery</SelectItem>
                  <SelectItem value="medical_aid">Medical Aid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Password (min 6 chars)" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-muted/50 border-border h-12" required minLength={6} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="rounded border-border mt-0.5" />
              <span>I agree to the <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></span>
            </label>
            <Button type="submit" disabled={loading} className="w-full h-12 gradient-primary neon-glow text-primary-foreground font-semibold text-base">
              {loading ? "Creating..." : "Create Provider Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/auth/provider/login" className="text-primary hover:underline font-medium">Sign In</Link>
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Need help instead? <Link to="/auth/user/register" className="text-primary hover:underline font-medium">Register as User</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
