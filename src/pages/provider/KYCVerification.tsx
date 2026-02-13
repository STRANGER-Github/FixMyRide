import { motion } from "framer-motion";
import { Upload, FileCheck, AlertCircle, CheckCircle, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { useServiceProvider } from "@/hooks/useServiceProvider";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const db = supabase as any;

const docsByType: Record<string, { name: string; type: string }[]> = {
  mechanic: [
    { name: "Garage License", type: "garage_license" },
    { name: "Government ID", type: "government_id" },
  ],
  fuel_delivery: [
    { name: "Fuel Distribution License", type: "fuel_license" },
    { name: "Government ID", type: "government_id" },
  ],
  medical_aid: [
    { name: "Medical Certification", type: "medical_cert" },
    { name: "Government ID", type: "government_id" },
  ],
};

export default function KYCVerification() {
  const { user } = useAuth();
  const { data: provider } = useServiceProvider();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<string>("");

  // Fetch existing KYC docs
  const [kycDocs, setKycDocs] = useState<any[]>([]);
  useState(() => {
    if (provider) {
      db.from("kyc_documents").select("*").eq("provider_id", provider.id).then(({ data }: any) => {
        if (data) setKycDocs(data);
      });
    }
  });

  const requiredDocs = docsByType[provider?.provider_type || "mechanic"] || docsByType.mechanic;

  const getDocStatus = (docType: string) => {
    const doc = kycDocs.find((d: any) => d.document_type === docType);
    return doc?.status || "not_uploaded";
  };

  const handleUpload = async (file: File, docType: string) => {
    if (!user || !provider) return;
    setUploading(docType);

    const filePath = `${user.id}/${docType}_${Date.now()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage.from("kyc-documents").upload(filePath, file);
    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("kyc-documents").getPublicUrl(filePath);

    const { error: dbError } = await db.from("kyc_documents").insert({
      provider_id: provider.id,
      document_type: docType,
      file_url: urlData.publicUrl || filePath,
      status: "pending",
    });

    if (dbError) toast.error("Error saving doc: " + dbError.message);
    else {
      toast.success("Document uploaded!");
      // Refresh
      const { data } = await db.from("kyc_documents").select("*").eq("provider_id", provider.id);
      if (data) setKycDocs(data);
    }
    setUploading(null);
  };

  const verifiedCount = kycDocs.filter((d: any) => d.status === "verified").length;

  return (
    <AppLayout variant="provider" title="KYC Verification">
      <div className="px-4 py-6 space-y-6">
        <input type="file" ref={fileRef} className="hidden" accept="image/*,.pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && uploadTarget) handleUpload(file, uploadTarget);
          }} />

        {/* Status Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-5 text-center">
          <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-lg font-display font-semibold text-foreground capitalize">
            {provider?.verification_status === "verified" ? "Verified ✅" :
              provider?.verification_status === "rejected" ? "Rejected ❌" : "Verification Pending"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{verifiedCount} of {requiredDocs.length} documents verified</p>
          <div className="h-2 bg-muted rounded-full overflow-hidden mt-4">
            <div className="h-full gradient-primary rounded-full" style={{ width: `${(verifiedCount / requiredDocs.length) * 100}%` }} />
          </div>
        </motion.div>

        {/* Documents */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Required Documents</h3>
          {requiredDocs.map((doc, i) => {
            const status = getDocStatus(doc.type);
            return (
              <motion.div key={doc.type} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    status === "verified" ? "bg-success/10" : status === "pending" ? "bg-accent/10" : "bg-muted"
                  }`}>
                    {status === "verified" ? <CheckCircle className="h-5 w-5 text-success" /> :
                      status === "pending" ? <Clock className="h-5 w-5 text-accent" /> :
                      status === "rejected" ? <AlertCircle className="h-5 w-5 text-destructive" /> :
                      <Upload className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{status.replace("_", " ")}</p>
                  </div>
                </div>
                {(status === "not_uploaded" || status === "rejected") && (
                  <Button size="sm" variant="outline" className="border-primary text-primary text-xs"
                    disabled={uploading === doc.type}
                    onClick={() => { setUploadTarget(doc.type); fileRef.current?.click(); }}>
                    {uploading === doc.type ? "Uploading..." : "Upload"}
                  </Button>
                )}
                {status === "pending" && <span className="text-xs text-accent font-medium">Reviewing</span>}
              </motion.div>
            );
          })}
        </div>

        <div className="glass rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            All documents must be verified before you can start receiving job requests. Verification typically takes 24-48 hours.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
