import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/login",
    });

    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success("Password reset email sent!");
    }
    setLoading(false);
  };

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
          <h1 className="text-2xl font-display font-bold text-center mb-2">Reset Password</h1>
          <p className="text-muted-foreground text-center text-sm mb-8">
            {sent ? "Check your email for a reset link" : "Enter your email to receive a reset link"}
          </p>

          {!sent ? (
            <form className="space-y-4" onSubmit={handleReset}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-muted/50 border-border h-12"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 gradient-primary neon-glow text-primary-foreground font-semibold"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-success" />
              </div>
              <p className="text-muted-foreground text-sm">
                We've sent a password reset link to <strong className="text-foreground">{email}</strong>
              </p>
            </div>
          )}

          <Link
            to="/auth/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
