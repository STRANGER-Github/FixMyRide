import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, MoreVertical, UserCheck, UserX, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import AdminLayout from "@/components/layout/AdminLayout";

const mockUsers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "active", bookings: 12, joined: "2025-08-10" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "active", bookings: 5, joined: "2025-11-22" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", status: "suspended", bookings: 0, joined: "2026-01-03" },
  { id: "4", name: "Dan Wilson", email: "dan@example.com", status: "active", bookings: 28, joined: "2025-06-18" },
  { id: "5", name: "Eve Martinez", email: "eve@example.com", status: "active", bookings: 3, joined: "2026-02-01" },
];

export default function UserManagement() {
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="User Management">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Users", count: 2847, icon: Shield, color: "text-primary" },
            { label: "Active", count: 2801, icon: UserCheck, color: "text-emerald-400" },
            { label: "Suspended", count: 46, icon: UserX, color: "text-destructive" },
          ].map((s) => (
            <Card key={s.label} className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                <p className={`text-xl font-display font-bold ${s.color}`}>{s.count.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary/50 border-border/50" />
          </div>
          <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
        </div>

        {/* Users Table */}
        <Card className="glass border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>User</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Bookings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id} className="border-border/30">
                  <TableCell className="font-medium text-foreground">{u.name}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === "active" ? "default" : "destructive"} className="text-xs">
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">{u.bookings}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </AdminLayout>
  );
}
