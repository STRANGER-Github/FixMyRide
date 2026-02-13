import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import { useUserRequests } from "@/hooks/useServiceRequests";

export default function BookingHistory() {
  const [search, setSearch] = useState("");
  const { data: requests, isLoading } = useUserRequests();

  const completed = (requests || []).filter((r: any) =>
    ["completed", "cancelled"].includes(r.status) &&
    (r.service_type.includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppLayout variant="user" title="History">
      <div className="px-4 py-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-muted/50 border-border h-11" />
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : completed.length === 0 ? (
          <div className="glass rounded-xl p-10 text-center">
            <p className="text-sm text-muted-foreground">No booking history yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completed.map((booking: any, i: number) => (
              <motion.div key={booking.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-foreground capitalize">{booking.service_type.replace(/_/g, " ")}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    booking.status === "completed" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}>{booking.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{booking.location} • {new Date(booking.created_at).toLocaleDateString()}</p>
                {booking.tracking_id && <p className="text-xs font-mono text-primary mt-1">{booking.tracking_id}</p>}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-semibold text-foreground">₹{booking.amount || "—"}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
