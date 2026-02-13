import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, Clock, Eye, ShieldCheck, Ban } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import AdminLayout from "@/components/layout/AdminLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const db = supabase as any;

export default function ProviderManagement() {
  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [kycDocs, setKycDocs] = useState<any[]>([]);
  const queryClient = useQueryClient();

  const { data: providers, isLoading } = useQuery({
    queryKey: ["admin_providers"],
    queryFn: async () => {
      const { data } = await db.from("service_providers").select("*, profiles:user_id(full_name, email:user_id, phone)");
      return data || [];
    },
  });

  const filtered = (providers || []).filter((p: any) =>
    (p.profiles?.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    p.provider_type.includes(search.toLowerCase())
  );

  const viewProvider = async (provider: any) => {
    setSelectedProvider(provider);
    const { data } = await db.from("kyc_documents").select("*").eq("provider_id", provider.id);
    setKycDocs(data || []);
  };

  const updateKYC = async (docId: string, status: "verified" | "rejected") => {
    await db.from("kyc_documents").update({ status }).eq("id", docId);

    // Check if all docs are verified
    const updatedDocs = kycDocs.map((d: any) => d.id === docId ? { ...d, status } : d);
    setKycDocs(updatedDocs);

    const allVerified = updatedDocs.every((d: any) => d.status === "verified");
    if (allVerified && selectedProvider) {
      await db.from("service_providers").update({ verification_status: "verified" }).eq("id", selectedProvider.id);
      // Notify provider
      await db.from("notifications").insert({
        user_id: selectedProvider.user_id,
        type: "kyc_approved",
        title: "KYC Approved! ✅",
        message: "Your documents have been verified. You can now receive jobs!",
        data: {},
      });
      toast.success("Provider verified!");
    } else if (status === "rejected") {
      await db.from("service_providers").update({ verification_status: "rejected" }).eq("id", selectedProvider.id);
      await db.from("notifications").insert({
        user_id: selectedProvider.user_id,
        type: "kyc_rejected",
        title: "KYC Rejected ❌",
        message: "Your document was rejected. Please re-upload.",
        data: {},
      });
      toast.info("Document rejected");
    }

    queryClient.invalidateQueries({ queryKey: ["admin_providers"] });
  };

  const toggleBlock = async (provider: any) => {
    await db.from("service_providers").update({ is_blocked: !provider.is_blocked }).eq("id", provider.id);
    toast.success(provider.is_blocked ? "Provider unblocked" : "Provider blocked");
    queryClient.invalidateQueries({ queryKey: ["admin_providers"] });
  };

  const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive"; }> = {
    verified: { variant: "default" },
    pending: { variant: "secondary" },
    rejected: { variant: "destructive" },
  };

  return (
    <AdminLayout title="Provider Management">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Verified", count: (providers || []).filter((p: any) => p.verification_status === "verified").length, color: "text-emerald-400" },
            { label: "Pending", count: (providers || []).filter((p: any) => p.verification_status === "pending").length, color: "text-amber-400" },
            { label: "Blocked", count: (providers || []).filter((p: any) => p.is_blocked).length, color: "text-destructive" },
          ].map((s) => (
            <Card key={s.label} className="glass border-border/50">
              <CardContent className="p-4 text-center">
                <p className={`text-2xl font-display font-bold ${s.color}`}>{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search providers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary/50 border-border/50" />
        </div>

        <Card className="glass border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p: any) => (
                <TableRow key={p.id} className="border-border/30">
                  <TableCell className="font-medium text-foreground">{p.profiles?.full_name || "—"}</TableCell>
                  <TableCell className="text-muted-foreground capitalize">{p.provider_type.replace(/_/g, " ")}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[p.verification_status]?.variant || "secondary"} className="text-xs capitalize">
                      {p.is_blocked ? "Blocked" : p.verification_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => viewProvider(p)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleBlock(p)}>
                        <Ban className={`h-4 w-4 ${p.is_blocked ? "text-destructive" : ""}`} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* KYC Review Dialog */}
        <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
          <DialogContent className="glass-strong border-border">
            <DialogHeader>
              <DialogTitle className="font-display">KYC Review: {selectedProvider?.profiles?.full_name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground capitalize">Type: {selectedProvider?.provider_type?.replace(/_/g, " ")}</p>
              {kycDocs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
              ) : kycDocs.map((doc: any) => (
                <div key={doc.id} className="glass rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">{doc.document_type.replace(/_/g, " ")}</p>
                    <a href={doc.file_url} target="_blank" rel="noopener" className="text-xs text-primary hover:underline">View Document</a>
                  </div>
                  <div className="flex gap-2">
                    {doc.status === "pending" ? (
                      <>
                        <Button size="sm" className="h-7 text-xs bg-success hover:bg-success/80" onClick={() => updateKYC(doc.id, "verified")}>
                          <CheckCircle className="h-3 w-3 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => updateKYC(doc.id, "rejected")}>
                          <XCircle className="h-3 w-3 mr-1" /> Reject
                        </Button>
                      </>
                    ) : (
                      <Badge variant={doc.status === "verified" ? "default" : "destructive"} className="text-xs capitalize">{doc.status}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
}
