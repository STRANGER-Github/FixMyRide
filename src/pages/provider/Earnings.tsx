import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";

const transactions = [
  { id: "1", type: "Flat Tire Repair", user: "John D.", amount: "+$45", date: "Today, 2:30 PM", positive: true },
  { id: "2", type: "Jump Start", user: "Maria L.", amount: "+$25", date: "Today, 10:15 AM", positive: true },
  { id: "3", type: "Fuel Delivery", user: "David K.", amount: "+$30", date: "Yesterday", positive: true },
  { id: "4", type: "Platform Fee", user: "FixMyRide", amount: "-$10", date: "Yesterday", positive: false },
  { id: "5", type: "Engine Check", user: "Sarah M.", amount: "+$60", date: "Feb 9, 2026", positive: true },
  { id: "6", type: "Towing Service", user: "Alex P.", amount: "+$120", date: "Feb 8, 2026", positive: true },
];

const periods = ["Daily", "Weekly", "Monthly"];

export default function Earnings() {
  const [period, setPeriod] = useState("Weekly");

  return (
    <AppLayout variant="provider" title="Earnings">
      <div className="px-4 py-6 space-y-6">
        {/* Period Selector */}
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                period === p ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Earnings Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-6 text-center"
        >
          <p className="text-sm text-muted-foreground mb-1">Total Earnings ({period})</p>
          <h2 className="text-4xl font-display font-bold text-foreground">$1,285</h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm text-success font-medium">+18.5% vs last week</span>
          </div>

          {/* Mini Chart */}
          <div className="flex gap-1.5 mt-6 items-end justify-center h-20">
            {[45, 65, 30, 80, 55, 70, 90].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-6 rounded-sm gradient-primary transition-all" style={{ height: `${h * 0.7}px` }} />
                <span className="text-[9px] text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Jobs", value: "23" },
            { label: "Avg/Job", value: "$56" },
            { label: "Next Payout", value: "Feb 15" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-3 text-center">
              <p className="text-lg font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Recent Transactions</h3>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                    tx.positive ? "bg-success/10" : "bg-destructive/10"
                  }`}>
                    {tx.positive ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.type}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.user} • {tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${tx.positive ? "text-success" : "text-destructive"}`}>
                  {tx.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
