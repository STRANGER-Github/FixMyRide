import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, UserX, Shield, Ban } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import AdminLayout from "@/components/layout/AdminLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["admin_users"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*");
      return data || [];
    },
  });

  const filtered = (users || []).filter((u: any) =>
    (u.full_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const toggleBlock = async (user: any) => {
    await supabase.from("profiles").update({ is_blocked: !user.is_blocked } as any).eq("id", user.id);
    toast.success(user.is_blocked ? "User unblocked" : "User blocked");
    queryClient.invalidateQueries({ queryKey: ["admin_users"] });
  };

  return (
    <AdminLayout title="User Management">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Users", count: (users || []).length, icon: Shield, color: "text-primary" },
            { label: "Active", count: (users || []).filter((u: any) => !u.is_blocked).length, icon: UserCheck, color: "text-emerald-400" },
            { label: "Blocked", count: (users || []).filter((u: any) => u.is_blocked).length, icon: UserX, color: "text-destructive" },
          ].map((s) => (
            <Card key={s.label} className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                <p className={`text-xl font-display font-bold ${s.color}`}>{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary/50 border-border/50" />
        </div>

        <Card className="glass border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u: any) => (
                <TableRow key={u.id} className="border-border/30">
                  <TableCell className="font-medium text-foreground">{u.full_name || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{u.phone || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={u.is_blocked ? "destructive" : "default"} className="text-xs">
                      {u.is_blocked ? "Blocked" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleBlock(u)}>
                      <Ban className={`h-4 w-4 ${u.is_blocked ? "text-destructive" : ""}`} />
                    </Button>
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
