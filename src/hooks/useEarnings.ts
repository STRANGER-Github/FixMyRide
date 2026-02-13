import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as any;

export function useEarnings(providerId: string | undefined) {
  return useQuery({
    queryKey: ["earnings", providerId],
    queryFn: async () => {
      if (!providerId) return [];
      const { data, error } = await db
        .from("earnings")
        .select("*")
        .eq("provider_id", providerId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!providerId,
  });
}
