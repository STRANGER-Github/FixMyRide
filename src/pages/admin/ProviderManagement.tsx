import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, CheckCircle, XCircle, Clock, MoreVertical, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import AdminLayout from "@/components/layout/AdminLayout";

const mockProviders = [
  { id: "1", name: "QuickFix Auto", type: "Mechanic", status: "active", rating: 4.8, jobs: 142, joinDate: "2025-09-15" },
  { id: "2", name: "FuelNow Express", type: "Fuel", status: "active", rating: 4.6, jobs: 89, joinDate: "2025-10-02" },
  { id: "3", name: "RoadHelp Pro", type: "Towing", status: "pending", rating: 0, jobs: 0, joinDate: "2026-02-10" },
  { id: "4", name: "MediRoad Care", type: "Medical", status: "active", rating: 4.9, jobs: 67, joinDate: "2025-11-20" },
  { id: "5", name: "TireSwap Ltd", type: "Mechanic", status: "suspended", rating: 3.2, jobs: 23, joinDate: "2025-08-05" },
];

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  active: { variant: "default", icon: CheckCircle },
  pending: { variant: "secondary", icon: Clock },
  suspended: { variant: "destructive", icon: XCircle },
};

export default function ProviderManagement() {
  const [search, setSearch] = useState("");

  const filtered = mockProviders.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Provider Management">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        {/* KYC Queue Summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Active", count: 3, color: "text-emerald-400" },
            { label: "Pending KYC", count: 1, color: "text-amber-400" },
            { label: "Suspended", count: 1, color: "text-destructive" },
          ].map((s) => (
            <Card key={s.label} className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <p className={`text-2xl font-display font-bold ${s.color}`}>{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search providers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary/50 border-border/50" />
          </div>
          <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
        </div>

        {/* Providers Table */}
        <Card className="glass border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Rating</TableHead>
                <TableHead className="hidden sm:table-cell">Jobs</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => {
                const sc = statusConfig[p.status];
                return (
                  <TableRow key={p.id} className="border-border/30">
                    <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                    <TableCell className="text-muted-foreground">{p.type}</TableCell>
                    <TableCell>
                      <Badge variant={sc.variant} className="gap-1 text-xs">
                        <sc.icon className="h-3 w-3" /> {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{p.rating > 0 ? `⭐ ${p.rating}` : "—"}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{p.jobs}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </AdminLayout>
  );
}
