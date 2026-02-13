import { motion } from "framer-motion";
import { MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";
import { useServiceProvider } from "@/hooks/useServiceProvider";
import { useProviderJobs, useAcceptJob } from "@/hooks/useServiceRequests";
import { useState } from "react";

export default function JobsList() {
  const { data: provider } = useServiceProvider();
  const { data: jobs, isLoading } = useProviderJobs(provider?.id, provider?.provider_type);
  const acceptJob = useAcceptJob();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = (jobs || []).filter((j: any) => {
    if (activeTab === "pending") return j.status === "pending";
    if (activeTab === "active") return ["accepted", "on_the_way", "reached", "work_started"].includes(j.status);
    if (activeTab === "completed") return j.status === "completed";
    return true;
  });

  return (
    <AppLayout variant="provider" title="Jobs">
      <div className="px-4 py-6 space-y-4">
        <div className="flex gap-2">
          {["all", "pending", "active", "completed"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                activeTab === tab ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground"
              }`}>{tab}</button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass rounded-xl p-10 text-center">
            <p className="text-sm text-muted-foreground">No jobs found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((job: any, i: number) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-foreground capitalize">{job.service_type.replace(/_/g, " ")}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                    job.status === "completed" ? "bg-success/10 text-success" :
                    job.status === "pending" ? "bg-accent/10 text-accent" :
                    "bg-primary/10 text-primary"
                  }`}>{job.status.replace(/_/g, " ")}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3 inline mr-1" />{job.location} • {new Date(job.created_at).toLocaleTimeString()}
                </p>
                {job.status === "pending" && provider && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gradient-primary text-primary-foreground text-xs"
                      onClick={() => acceptJob.mutate({ requestId: job.id, providerId: provider.id })}
                      disabled={acceptJob.isPending}>Accept</Button>
                    <Button size="sm" variant="outline" className="border-border text-xs">Decline</Button>
                  </div>
                )}
                {["accepted", "on_the_way", "reached", "work_started"].includes(job.status) && (
                  <Link to={`/provider/jobs/${job.id}`}>
                    <Button size="sm" variant="outline" className="w-full border-primary text-primary text-xs">View Details</Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
