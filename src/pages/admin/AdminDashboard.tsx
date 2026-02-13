import { motion } from "framer-motion";
import { Users, Wrench, DollarSign, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layout/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as any;

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin_stats"],
    queryFn: async () => {
      const [users, providers, requests, earnings] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        db.from("service_providers").select("id", { count: "exact", head: true }),
        db.from("service_requests").select("id", { count: "exact", head: true }),
        db.from("earnings").select("net_amount"),
      ]);
      const totalRevenue = (earnings.data || []).reduce((s: number, e: any) => s + Number(e.net_amount || 0), 0);
      return {
        totalUsers: users.count || 0,
        totalProviders: providers.count || 0,
        totalRequests: requests.count || 0,
        totalRevenue,
      };
    },
  });

  const { data: recentRequests } = useQuery({
    queryKey: ["admin_recent_requests"],
    queryFn: async () => {
      const { data } = await db.from("service_requests").select("*").order("created_at", { ascending: false }).limit(5);
      return data || [];
    },
  });

  const kpis = [
    { label: "Total Users", value: String(stats?.totalUsers || 0), icon: Users, color: "text-primary" },
    { label: "Providers", value: String(stats?.totalProviders || 0), icon: Wrench, color: "text-emerald-400" },
    { label: "Revenue (₹)", value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-amber-400" },
    { label: "Requests", value: String(stats?.totalRequests || 0), icon: Activity, color: "text-violet-400" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass border-border/50">
                <CardContent className="p-4">
                  <kpi.icon className={`h-5 w-5 ${kpi.color} mb-2`} />
                  <p className="text-2xl font-display font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="glass border-border/50">
          <CardHeader><CardTitle className="text-lg font-display">Recent Service Requests</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {(recentRequests || []).map((r: any) => (
              <div key={r.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <div className="flex-1">
                  <p className="text-sm text-foreground capitalize">{r.service_type.replace(/_/g, " ")} — {r.location}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">{r.status.replace(/_/g, " ")} • {new Date(r.created_at).toLocaleString()}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                  r.status === "completed" ? "bg-success/10 text-success" :
                  r.status === "pending" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                }`}>{r.status}</span>
              </div>
            ))}
            {(!recentRequests || recentRequests.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">No requests yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
