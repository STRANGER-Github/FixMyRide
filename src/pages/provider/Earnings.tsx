import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import { useServiceProvider } from "@/hooks/useServiceProvider";
import { useEarnings } from "@/hooks/useEarnings";

export default function Earnings() {
  const { data: provider } = useServiceProvider();
  const { data: earnings, isLoading } = useEarnings(provider?.id);

  const totalEarnings = (earnings || []).reduce((sum: number, e: any) => sum + Number(e.net_amount || 0), 0);
  const totalJobs = (earnings || []).length;
  const avgPerJob = totalJobs > 0 ? Math.round(totalEarnings / totalJobs) : 0;

  return (
    <AppLayout variant="provider" title="Earnings">
      <div className="px-4 py-6 space-y-6">
        {/* Summary */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
          <h2 className="text-4xl font-display font-bold text-foreground">₹{totalEarnings.toLocaleString()}</h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Jobs", value: String(totalJobs) },
            { label: "Avg/Job", value: `₹${avgPerJob}` },
            { label: "Platform Fee", value: "10%" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-3 text-center">
              <p className="text-lg font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Transaction History</h3>
          {isLoading ? (
            <div className="text-center py-6">
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (earnings || []).length === 0 ? (
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">No earnings yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {(earnings || []).map((tx: any, i: number) => (
                <motion.div key={tx.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="glass rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-success/10">
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Service Completed</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-success">+₹{tx.net_amount}</span>
                    {Number(tx.platform_fee) > 0 && (
                      <p className="text-[10px] text-muted-foreground">Fee: ₹{tx.platform_fee}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
