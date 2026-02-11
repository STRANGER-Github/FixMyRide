import { motion } from "framer-motion";
import { Search, Star, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";

const bookings = [
  { id: "1", type: "Flat Tire Repair", provider: "Ahmed's Auto", date: "Feb 10, 2026", cost: "$45", status: "Completed", rating: 4.8 },
  { id: "2", type: "Fuel Delivery", provider: "QuickFuel Station", date: "Feb 7, 2026", cost: "$30", status: "Completed", rating: 4.5 },
  { id: "3", type: "Jump Start", provider: "PowerUp Services", date: "Jan 28, 2026", cost: "$25", status: "Completed", rating: 5.0 },
  { id: "4", type: "Towing Service", provider: "City Tow", date: "Jan 15, 2026", cost: "$120", status: "Completed", rating: 4.2 },
  { id: "5", type: "Engine Check", provider: "Ahmed's Auto", date: "Jan 5, 2026", cost: "$60", status: "Cancelled", rating: null },
];

export default function BookingHistory() {
  const [search, setSearch] = useState("");
  const filtered = bookings.filter(
    (b) => b.type.toLowerCase().includes(search.toLowerCase()) || b.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout variant="user" title="History">
      <div className="px-4 py-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-muted/50 border-border h-11"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground">{booking.type}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  booking.status === "Completed" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                }`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{booking.provider} • {booking.date}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-foreground">{booking.cost}</span>
                {booking.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                    <span className="text-xs font-medium text-foreground">{booking.rating}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
