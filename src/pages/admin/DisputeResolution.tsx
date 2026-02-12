import { motion } from "framer-motion";
import { AlertTriangle, MessageSquare, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/layout/AdminLayout";

const mockDisputes = [
  {
    id: "D-1042",
    bookingId: "#4499",
    user: "Alice Johnson",
    provider: "TireSwap Ltd",
    reason: "Incomplete service — tire not properly mounted",
    status: "open",
    priority: "high",
    created: "2 hours ago",
  },
  {
    id: "D-1041",
    bookingId: "#4480",
    user: "Bob Smith",
    provider: "FuelNow Express",
    reason: "Overcharged for fuel delivery",
    status: "in_review",
    priority: "medium",
    created: "1 day ago",
  },
  {
    id: "D-1039",
    bookingId: "#4451",
    user: "Dan Wilson",
    provider: "QuickFix Auto",
    reason: "Provider arrived 45 minutes late",
    status: "resolved",
    priority: "low",
    created: "3 days ago",
  },
];

const statusStyles: Record<string, { variant: "destructive" | "secondary" | "default" | "outline"; icon: React.ElementType }> = {
  open: { variant: "destructive", icon: AlertTriangle },
  in_review: { variant: "secondary", icon: Clock },
  resolved: { variant: "default", icon: CheckCircle },
};

const priorityColors: Record<string, string> = {
  high: "text-destructive",
  medium: "text-amber-400",
  low: "text-muted-foreground",
};

export default function DisputeResolution() {
  return (
    <AdminLayout title="Dispute Resolution">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Open", count: 1, color: "text-destructive" },
            { label: "In Review", count: 1, color: "text-amber-400" },
            { label: "Resolved", count: 1, color: "text-emerald-400" },
          ].map((s) => (
            <Card key={s.label} className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <p className={`text-2xl font-display font-bold ${s.color}`}>{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dispute Cards */}
        <div className="space-y-3">
          {mockDisputes.map((d, i) => {
            const sc = statusStyles[d.status];
            return (
              <motion.div key={d.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-display font-bold text-foreground">{d.id}</span>
                        <Badge variant={sc.variant} className="gap-1 text-xs">
                          <sc.icon className="h-3 w-3" /> {d.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <span className={`text-xs font-medium uppercase ${priorityColors[d.priority]}`}>{d.priority}</span>
                    </div>
                    <p className="text-sm text-foreground mb-1">{d.reason}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{d.user} vs {d.provider} • Booking {d.bookingId}</span>
                      <span>{d.created}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1">
                        <MessageSquare className="h-3 w-3" /> View Details
                      </Button>
                      {d.status !== "resolved" && (
                        <Button size="sm" className="h-8 text-xs gap-1">
                          <ChevronRight className="h-3 w-3" /> Take Action
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
