import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

export type ProviderType = "mechanic" | "fuel_delivery" | "medical_aid";
export type RequestStatus = "pending" | "accepted" | "on_the_way" | "reached" | "work_started" | "completed" | "cancelled";

const db = supabase as any;

export function useUserRequests() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["user_requests", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await db
        .from("service_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("user-requests-realtime")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "service_requests",
        filter: `user_id=eq.${user.id}`,
      }, () => {
        queryClient.invalidateQueries({ queryKey: ["user_requests", user.id] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, queryClient]);

  return query;
}

export function useProviderJobs(providerId: string | undefined, providerType: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["provider_jobs", providerId],
    queryFn: async () => {
      if (!providerId) return [];
      const { data, error } = await db
        .from("service_requests")
        .select("*")
        .or(`status.eq.pending,assigned_provider_id.eq.${providerId}`)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).filter((r: any) => {
        if (r.status === "pending" && r.service_type === providerType) return true;
        if (r.assigned_provider_id === providerId) return true;
        return false;
      });
    },
    enabled: !!providerId,
  });

  useEffect(() => {
    if (!providerId) return;
    const channel = supabase
      .channel("provider-jobs-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "service_requests" }, () => {
        queryClient.invalidateQueries({ queryKey: ["provider_jobs", providerId] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [providerId, queryClient]);

  return query;
}

export function useCreateRequest() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      service_type: ProviderType;
      location: string;
      latitude?: number;
      longitude?: number;
      description?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await db
        .from("service_requests")
        .insert({ user_id: user.id, ...params })
        .select()
        .single();
      if (error) throw error;

      // Notify matching providers
      const { data: providers } = await db
        .from("service_providers")
        .select("user_id")
        .eq("provider_type", params.service_type)
        .eq("verification_status", "verified")
        .eq("is_available", true)
        .eq("is_blocked", false);

      if (providers?.length) {
        await db.from("notifications").insert(
          providers.map((p: any) => ({
            user_id: p.user_id,
            type: "new_job",
            title: "New Service Request",
            message: `New ${params.service_type.replace(/_/g, " ")} request nearby`,
            data: { request_id: data.id },
          }))
        );
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_requests"] });
      toast.success("Service request created!");
    },
    onError: (error: any) => toast.error(error.message),
  });
}

export function useAcceptJob() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, providerId }: { requestId: string; providerId: string }) => {
      if (!user) throw new Error("Not authenticated");

      const { data: current } = await db
        .from("service_requests")
        .select("status, user_id")
        .eq("id", requestId)
        .single();

      if (current?.status !== "pending") throw new Error("Job already taken");

      const { data, error } = await db
        .from("service_requests")
        .update({ status: "accepted", assigned_provider_id: providerId })
        .eq("id", requestId)
        .eq("status", "pending")
        .select()
        .single();
      if (error) throw error;
      if (!data) throw new Error("Job already taken");

      await db.from("job_tracking").insert({
        request_id: requestId, status: "accepted", note: "Provider accepted the job",
      });

      await db.from("notifications").insert({
        user_id: current.user_id,
        type: "job_accepted",
        title: "Provider Found!",
        message: "A provider has accepted your service request",
        data: { request_id: requestId, tracking_id: data.tracking_id },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider_jobs"] });
      toast.success("Job accepted!");
    },
    onError: (error: any) => toast.error(error.message),
  });
}

export function useUpdateJobStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status, note }: { requestId: string; status: RequestStatus; note?: string }) => {
      const { data, error } = await db
        .from("service_requests")
        .update({ status })
        .eq("id", requestId)
        .select("*")
        .single();
      if (error) throw error;

      await db.from("job_tracking").insert({
        request_id: requestId, status, note: note || `Status updated to ${status}`,
      });

      const labels: Record<string, string> = {
        on_the_way: "Provider is on the way",
        reached: "Provider has arrived",
        work_started: "Work has started",
        completed: "Service completed!",
      };
      if (labels[status]) {
        await db.from("notifications").insert({
          user_id: data.user_id,
          type: "status_update",
          title: "Status Update",
          message: labels[status],
          data: { request_id: requestId },
        });
      }

      if (status === "completed") {
        const amount = data.amount || 500;
        const platformFee = Math.round(amount * 0.1);
        await db.from("earnings").insert({
          provider_id: data.assigned_provider_id,
          request_id: requestId,
          amount, platform_fee: platformFee, net_amount: amount - platformFee,
        });
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider_jobs"] });
      queryClient.invalidateQueries({ queryKey: ["user_requests"] });
    },
    onError: (error: any) => toast.error(error.message),
  });
}

export function useCancelRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await db
        .from("service_requests")
        .update({ status: "cancelled" })
        .eq("id", requestId)
        .eq("status", "pending");
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_requests"] });
      toast.success("Request cancelled");
    },
  });
}
