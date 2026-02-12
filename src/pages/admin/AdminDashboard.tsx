import { motion } from "framer-motion";
import { Users, Wrench, DollarSign, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layout/AdminLayout";

const kpis = [
  { label: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Active Providers", value: "184", change: "+8%", icon: Wrench, color: "text-emerald-400" },
  { label: "Monthly Revenue", value: "$48,290", change: "+23%", icon: DollarSign, color: "text-amber-400" },
  { label: "Active Bookings", value: "37", change: "+5%", icon: Activity, color: "text-violet-400" },
];

const recentActivity = [
  { id: 1, type: "booking", message: "New emergency booking #4521 created", time: "2 min ago", icon: AlertTriangle, color: "text-accent" },
  { id: 2, type: "provider", message: "Provider 'QuickFix Auto' approved", time: "15 min ago", icon: CheckCircle, color: "text-emerald-400" },
  { id: 3, type: "booking", message: "Booking #4518 completed successfully", time: "32 min ago", icon: CheckCircle, color: "text-primary" },
  { id: 4, type: "dispute", message: "New dispute filed for booking #4499", time: "1 hr ago", icon: AlertTriangle, color: "text-destructive" },
  { id: 5, type: "provider", message: "KYC application from 'RoadHelp Pro'", time: "2 hrs ago", icon: Clock, color: "text-amber-400" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> {kpi.change}
                    </span>
                  </div>
                  <p className="text-2xl font-display font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Activity Feed */}
          <Card className="glass border-border/50">
            <CardHeader><CardTitle className="text-lg font-display">Recent Activity</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <item.icon className={`h-4 w-4 mt-0.5 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass border-border/50">
            <CardHeader><CardTitle className="text-lg font-display">Platform Overview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Avg Response Time", value: "4.2 min", bar: 72 },
                { label: "Completion Rate", value: "94.8%", bar: 95 },
                { label: "Customer Satisfaction", value: "4.7/5", bar: 94 },
                { label: "Provider Utilization", value: "68%", bar: 68 },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-medium text-foreground">{stat.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.bar}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
