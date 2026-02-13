import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Navigation, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useUserRequests, useCancelRequest } from "@/hooks/useServiceRequests";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const db = supabase as any;

const allStatuses = ["pending", "accepted", "on_the_way", "reached", "work_started", "completed"];
const statusLabels: Record<string, string> = {
  pending: "Request Sent",
  accepted: "Provider Assigned",
  on_the_way: "On The Way",
  reached: "Arrived",
  work_started: "Work Started",
  completed: "Completed",
};

export default function LiveTracking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { data: requests } = useUserRequests();
  const cancelRequest = useCancelRequest();

  const request = (requests || []).find((r: any) => r.id === bookingId);

  // Get provider profile if assigned
  const { data: providerData } = useQuery({
    queryKey: ["provider_profile", request?.assigned_provider_id],
    queryFn: async () => {
      if (!request?.assigned_provider_id) return null;
      const { data: sp } = await db
        .from("service_providers")
        .select("*, profiles:user_id(full_name, phone, avatar_url)")
        .eq("id", request.assigned_provider_id)
        .single();
      return sp;
    },
    enabled: !!request?.assigned_provider_id,
  });

  if (!request) {
    return (
      <AppLayout variant="user" title="Tracking">
        <div className="px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading request...</p>
        </div>
      </AppLayout>
    );
  }

  const currentIdx = allStatuses.indexOf(request.status);
  const providerName = providerData?.profiles?.full_name || "Provider";
  const providerPhone = providerData?.profiles?.phone;
  const isAccepted = currentIdx >= 1;

  return (
    <AppLayout variant="user" title="Live Tracking">
      <div className="px-4 py-6 space-y-6">
        {/* Map Area */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl h-48 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="text-center z-10">
            <Navigation className="h-10 w-10 text-primary mx-auto mb-2 animate-float" />
            <p className="text-sm text-muted-foreground capitalize">{request.status.replace(/_/g, " ")}</p>
            {request.tracking_id && (
              <p className="text-xs font-mono text-primary mt-1">{request.tracking_id}</p>
            )}
          </div>
        </motion.div>

        {/* Provider Card - only after acceptance */}
        {isAccepted && providerData && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-strong rounded-2xl p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-xl font-bold text-primary">
                {providerName[0]?.toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-foreground">{providerName}</h3>
                <p className="text-xs text-muted-foreground capitalize">{providerData.provider_type?.replace(/_/g, " ")}</p>
              </div>
              <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10 capitalize">
                {request.status.replace(/_/g, " ")}
              </span>
            </div>

            {/* Contact - only shown after acceptance */}
            <div className="flex gap-3">
              {providerPhone && (
                <a href={`tel:${providerPhone}`} className="flex-1">
                  <Button variant="outline" className="w-full h-11 border-border">
                    <Phone className="h-4 w-4 mr-2" /> Call
                  </Button>
                </a>
              )}
              <Button variant="outline" className="flex-1 h-11 border-border" disabled>
                <MessageSquare className="h-4 w-4 mr-2" /> Message
              </Button>
            </div>
          </motion.div>
        )}

        {!isAccepted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-strong rounded-2xl p-4 text-center">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium">Searching for providers...</p>
            <p className="text-xs text-muted-foreground mt-1">We'll notify you when someone accepts</p>
          </motion.div>
        )}

        {/* Status Timeline */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Service Progress</h3>
          <div className="space-y-4">
            {allStatuses.map((status, i) => {
              const done = i <= currentIdx;
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                    done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {done ? <CheckCircle className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
                  </div>
                  <span className={`text-sm ${done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {statusLabels[status]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Cancel (only if pending) */}
        {request.status === "pending" && (
          <Button
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => cancelRequest.mutate(request.id, { onSuccess: () => navigate("/user/dashboard") })}
            disabled={cancelRequest.isPending}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel Request
          </Button>
        )}
      </div>
    </AppLayout>
  );
}
