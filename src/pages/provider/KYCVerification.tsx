import { motion } from "framer-motion";
import { Upload, FileCheck, AlertCircle, CheckCircle, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const documents = [
  { name: "Business License", status: "verified", icon: FileCheck },
  { name: "Insurance Certificate", status: "pending", icon: Clock },
  { name: "Professional Certification", status: "not_uploaded", icon: Upload },
  { name: "Government ID", status: "verified", icon: FileCheck },
];

export default function KYCVerification() {
  return (
    <AppLayout variant="provider" title="KYC Verification">
      <div className="px-4 py-6 space-y-6">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-5 text-center"
        >
          <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-lg font-display font-semibold text-foreground">Verification In Progress</h2>
          <p className="text-sm text-muted-foreground mt-1">2 of 4 documents verified</p>
          <div className="h-2 bg-muted rounded-full overflow-hidden mt-4">
            <div className="h-full w-1/2 gradient-primary rounded-full" />
          </div>
        </motion.div>

        {/* Documents */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Required Documents</h3>
          {documents.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  doc.status === "verified" ? "bg-success/10" : doc.status === "pending" ? "bg-accent/10" : "bg-muted"
                }`}>
                  {doc.status === "verified" ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : doc.status === "pending" ? (
                    <Clock className="h-5 w-5 text-accent" />
                  ) : (
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{doc.status.replace("_", " ")}</p>
                </div>
              </div>
              {doc.status === "not_uploaded" && (
                <Button size="sm" variant="outline" className="border-primary text-primary text-xs">
                  Upload
                </Button>
              )}
              {doc.status === "pending" && (
                <span className="text-xs text-accent font-medium">Reviewing</span>
              )}
            </motion.div>
          ))}
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
