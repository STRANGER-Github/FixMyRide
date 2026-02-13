import { motion } from "framer-motion";
import { Power, MapPin, Star, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useServiceProvider } from "@/hooks/useServiceProvider";
import { useProviderJobs, useAcceptJob } from "@/hooks/useServiceRequests";
import { useEarnings } from "@/hooks/useEarnings";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as any;

export default function ProviderDashboard() {
  const { profile } = useAuth();
  const { data: provider } = useServiceProvider();
  const { data: jobs, isLoading } = useProviderJobs(provider?.id, provider?.provider_type);
  const { data: earnings } = useEarnings(provider?.id);
  const acceptJob = useAcceptJob();
  const [available, setAvailable] = useState(provider?.is_available ?? false);

  useEffect(() => {
    if (provider) setAvailable(provider.is_available);
  }, [provider]);

  const toggleAvailability = async (val: boolean) => {
    setAvailable(val);
    if (provider) {
      await db.from("service_providers").update({ is_available: val }).eq("id", provider.id);
    }
  };

  const pendingJobs = (jobs || []).filter((j: any) => j.status === "pending");
  const activeJobs = (jobs || []).filter((j: any) => ["accepted", "on_the_way", "reached", "work_started"].includes(j.status));
  const completedCount = (jobs || []).filter((j: any) => j.status === "completed").length;
  const todayEarnings = (earnings || []).reduce((sum: number, e: any) => sum + Number(e.net_amount || 0), 0);

  // Show KYC warning if not verified
  if (provider && provider.verification_status !== "verified") {
    return (
      <AppLayout variant="provider">
        <div className="px-4 py-10 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <AlertTriangle className="h-10 w-10 text-accent" />
          </div>
          <h2 className="text-xl font-display font-bold">Verification {provider.verification_status === "rejected" ? "Rejected" : "Pending"}</h2>
          <p className="text-sm text-muted-foreground">
            {provider.verification_status === "rejected"
              ? "Your KYC was rejected. Please re-upload documents."
              : "Your account is pending verification. Upload your KYC documents."}
          </p>
          <Link to="/provider/kyc">
            <Button className="gradient-primary text-primary-foreground">Go to KYC Verification</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout variant="provider">
      <div className="px-4 py-6 space-y-6">
        {/* Greeting + Availability */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">
              Hi{profile?.full_name ? `, ${profile.full_name}` : ""}! 🔧
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {available ? "You're online and receiving jobs" : "You're currently offline"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${available ? "bg-success animate-pulse" : "bg-muted-foreground"}`} />
            <Switch checked={available} onCheckedChange={toggleAvailability} />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3">
          {[
            { icon: CheckCircle, label: "Completed", value: String(completedCount), color: "text-success" },
            { icon: Star, label: "Type", value: provider?.provider_type?.replace(/_/g, " ") || "—", color: "text-accent" },
            { icon: Clock, label: "Active", value: String(activeJobs.length), color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-3 text-center">
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-display font-bold text-foreground capitalize">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Today's Earnings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass-strong rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Earnings</span>
            <Link to="/provider/earnings" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <span className="text-3xl font-display font-bold text-foreground">₹{todayEarnings.toLocaleString()}</span>
        </motion.div>

        {/* Active Jobs */}
        {activeJobs.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-lg font-display font-semibold mb-3">Active Jobs</h2>
            <div className="space-y-3">
              {activeJobs.map((job: any) => (
                <Link key={job.id} to={`/provider/jobs/${job.id}`}>
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-foreground capitalize">{job.service_type.replace(/_/g, " ")}</h3>
                      <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10 capitalize">{job.status.replace(/_/g, " ")}</span>
                    </div>
                    <p className="text-xs text-muted-foreground"><MapPin className="h-3 w-3 inline mr-1" />{job.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pending Jobs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h2 className="text-lg font-display font-semibold mb-3">Incoming Requests</h2>
          {isLoading ? (
            <div className="glass rounded-xl p-6 text-center">
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : pendingJobs.length === 0 ? (
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">No pending requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingJobs.map((job: any) => (
                <div key={job.id} className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-foreground capitalize">{job.service_type.replace(/_/g, " ")}</h3>
                    <span className="text-xs text-muted-foreground">{new Date(job.created_at).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3 inline mr-1" />{job.location}
                  </p>
                  {job.description && <p className="text-xs text-muted-foreground mb-3 italic">"{job.description}"</p>}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gradient-primary text-primary-foreground font-medium"
                      onClick={() => acceptJob.mutate({ requestId: job.id, providerId: provider!.id })}
                      disabled={acceptJob.isPending}>
                      {acceptJob.isPending ? "Accepting..." : "Accept"}
                    </Button>
                    <Button size="sm" variant="outline" className="border-border">Decline</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AppLayout>
  );
}
