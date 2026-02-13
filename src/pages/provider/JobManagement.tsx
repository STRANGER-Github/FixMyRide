import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Navigation, Camera, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import { useServiceProvider } from "@/hooks/useServiceProvider";
import { useProviderJobs, useUpdateJobStatus, RequestStatus } from "@/hooks/useServiceRequests";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const db = supabase as any;

const statusFlow: RequestStatus[] = ["accepted", "on_the_way", "reached", "work_started", "completed"];
const statusLabels: Record<string, string> = {
  accepted: "Accepted",
  on_the_way: "On The Way",
  reached: "Arrived",
  work_started: "Working",
  completed: "Completed",
};

export default function JobManagement() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { data: provider } = useServiceProvider();
  const { data: jobs } = useProviderJobs(provider?.id, provider?.provider_type);
  const updateStatus = useUpdateJobStatus();

  const job = (jobs || []).find((j: any) => j.id === jobId);

  // Get user profile for contact
  const { data: userProfile } = useQuery({
    queryKey: ["user_profile_for_job", job?.user_id],
    queryFn: async () => {
      if (!job?.user_id) return null;
      const { data } = await supabase.from("profiles").select("*").eq("user_id", job.user_id).single();
      return data;
    },
    enabled: !!job?.user_id,
  });

  if (!job) {
    return (
      <AppLayout variant="provider" title="Job Details">
        <div className="px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading job...</p>
        </div>
      </AppLayout>
    );
  }

  const currentIdx = statusFlow.indexOf(job.status);
  const isAccepted = currentIdx >= 0;

  const advanceStatus = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx < statusFlow.length) {
      updateStatus.mutate(
        { requestId: job.id, status: statusFlow[nextIdx] },
        { onSuccess: () => { if (statusFlow[nextIdx] === "completed") navigate("/provider/dashboard"); } }
      );
    }
  };

  return (
    <AppLayout variant="provider" title="Job Details">
      <div className="px-4 py-6 space-y-6">
        {/* Map */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl h-48 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="text-center z-10">
            <Navigation className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Navigate to User</p>
            <p className="text-xs text-muted-foreground mt-1">{job.location}</p>
          </div>
        </motion.div>

        {/* Job Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-strong rounded-2xl p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-lg font-bold text-primary">
              {userProfile?.full_name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground">{userProfile?.full_name || "User"}</h3>
              <p className="text-xs text-muted-foreground capitalize">{job.service_type.replace(/_/g, " ")}</p>
            </div>
            {job.tracking_id && <span className="text-xs font-mono text-primary">{job.tracking_id}</span>}
          </div>

          {job.description && (
            <div className="glass rounded-lg p-3 mb-4">
              <p className="text-sm text-muted-foreground">"{job.description}"</p>
            </div>
          )}

          {/* Contact - only after acceptance */}
          {isAccepted && (
            <div className="flex gap-3">
              {userProfile?.phone && (
                <a href={`tel:${userProfile.phone}`} className="flex-1">
                  <Button variant="outline" className="w-full h-11 border-border">
                    <Phone className="h-4 w-4 mr-2" /> Call
                  </Button>
                </a>
              )}
              <Button variant="outline" className="flex-1 h-11 border-border" disabled>
                <MessageSquare className="h-4 w-4 mr-2" /> Chat
              </Button>
            </div>
          )}
        </motion.div>

        {/* Status Progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Update Status</h3>
          <div className="flex items-center gap-1 mb-4">
            {statusFlow.map((status, i) => (
              <div key={status} className="flex-1 flex flex-col items-center">
                <div className={`h-2 w-full rounded-full ${i <= currentIdx ? "gradient-primary" : "bg-muted"}`} />
                <span className={`text-[9px] mt-1 ${i <= currentIdx ? "text-primary" : "text-muted-foreground"}`}>
                  {statusLabels[status]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Button */}
        {job.status !== "completed" && (
          <Button
            onClick={advanceStatus}
            disabled={updateStatus.isPending}
            className="w-full h-14 gradient-primary neon-glow text-primary-foreground font-bold text-base rounded-xl"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {updateStatus.isPending
              ? "Updating..."
              : currentIdx < statusFlow.length - 2
                ? `Mark as ${statusLabels[statusFlow[currentIdx + 1]]}`
                : "Complete Job"}
          </Button>
        )}
      </div>
    </AppLayout>
  );
}
