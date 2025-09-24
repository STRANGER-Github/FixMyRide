import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, CheckCircle, XCircle, Clock, FileText, User } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useToast } from "@/hooks/use-toast";

export default function AdminKYCApprovals() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [pendingApplications] = useState([
    {
      id: '1',
      businessName: 'Downtown Auto Repair',
      applicantName: 'John Smith',
      providerType: 'mechanic',
      submittedDate: '2024-01-15',
      documents: ['Business License', 'Garage Registration', 'Insurance Certificate'],
      status: 'pending'
    },
    {
      id: '2',
      businessName: 'City Fuel Station',
      applicantName: 'Sarah Johnson',
      providerType: 'fuel_station',
      submittedDate: '2024-01-14',
      documents: ['Fuel License', 'Environmental Permit', 'Safety Certificate'],
      status: 'pending'
    },
    {
      id: '3',
      businessName: 'Emergency Medical Services',
      applicantName: 'Dr. Michael Brown',
      providerType: 'doctor',
      submittedDate: '2024-01-13',
      documents: ['Medical License', 'Board Certification', 'Malpractice Insurance'],
      status: 'pending'
    }
  ]);

  const [recentDecisions] = useState([
    {
      id: '4',
      businessName: 'QuickFix Motors',
      applicantName: 'David Wilson',
      providerType: 'mechanic',
      decidedDate: '2024-01-12',
      status: 'approved',
      decidedBy: 'Admin'
    },
    {
      id: '5',
      businessName: 'Metro Gas Station',
      applicantName: 'Lisa Anderson',
      providerType: 'fuel_station',
      decidedDate: '2024-01-11',
      status: 'rejected',
      decidedBy: 'Admin',
      reason: 'Incomplete environmental permits'
    }
  ]);

  const handleApprove = async (applicationId: string) => {
    toast({
      title: "Application Approved! ✅",
      description: "Service provider has been activated and notified.",
    });
  };

  const handleReject = async (applicationId: string) => {
    toast({
      title: "Application Rejected",
      description: "Applicant has been notified with feedback.",
      variant: "destructive",
    });
  };

  const getProviderTypeIcon = (type: string) => {
    switch (type) {
      case 'mechanic':
        return '🔧';
      case 'fuel_station':
        return '⛽';
      case 'doctor':
        return '🏥';
      default:
        return '📋';
    }
  };

  const getProviderTypeName = (type: string) => {
    switch (type) {
      case 'mechanic':
        return 'Mechanic Services';
      case 'fuel_station':
        return 'Fuel Station';
      case 'doctor':
        return 'Medical Emergency';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                KYC Approvals
              </span>
            </h1>
            <p className="text-muted-foreground">
              Review and manage service provider applications
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{pendingApplications.length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Approved Today</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Review Time</p>
                    <p className="text-2xl font-bold">2.3d</p>
                  </div>
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="bg-background-secondary">
              <TabsTrigger value="pending">Pending Applications</TabsTrigger>
              <TabsTrigger value="recent">Recent Decisions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Pending Applications */}
            <TabsContent value="pending" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Applications Awaiting Review</CardTitle>
                  <CardDescription>
                    Service provider applications requiring your approval
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingApplications.map((application) => (
                    <div key={application.id} className="p-6 bg-background-secondary rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getProviderTypeIcon(application.providerType)}</span>
                            <div>
                              <h3 className="font-semibold text-lg">{application.businessName}</h3>
                              <p className="text-sm text-muted-foreground">
                                {getProviderTypeName(application.providerType)} • Applied by {application.applicantName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Submitted: {application.submittedDate}</span>
                            <Badge className={getStatusColor(application.status)}>
                              <Clock className="w-3 h-3 mr-1" />
                              {application.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Submitted Documents:</h4>
                        <div className="flex flex-wrap gap-2">
                          {application.documents.map((doc, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <FileText className="w-3 h-3 mr-1" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Review Documents
                        </Button>
                        <Button 
                          variant="hero" 
                          className="flex-1"
                          onClick={() => handleApprove(application.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="flex-1"
                          onClick={() => handleReject(application.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}

                  {pendingApplications.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                      <p className="text-muted-foreground">All applications have been reviewed!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Decisions */}
            <TabsContent value="recent" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Recent Approval Decisions</CardTitle>
                  <CardDescription>
                    Recently processed applications and their outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentDecisions.map((decision) => (
                    <div key={decision.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getProviderTypeIcon(decision.providerType)}</span>
                        <div>
                          <p className="font-medium">{decision.businessName}</p>
                          <p className="text-sm text-muted-foreground">
                            {decision.applicantName} • {decision.decidedDate}
                          </p>
                          {decision.reason && (
                            <p className="text-xs text-red-500 mt-1">Reason: {decision.reason}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(decision.status)}>
                          {decision.status === 'approved' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {decision.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">by {decision.decidedBy}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-strong border-border">
                  <CardHeader>
                    <CardTitle>Application Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        🔧 Mechanic Services
                      </span>
                      <span className="font-bold">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        ⛽ Fuel Stations
                      </span>
                      <span className="font-bold">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        🏥 Medical Emergency
                      </span>
                      <span className="font-bold">20%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong border-border">
                  <CardHeader>
                    <CardTitle>Approval Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Approval Rate</span>
                      <span className="font-bold text-green-500">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg. Review Time</span>
                      <span className="font-bold">2.3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pending Queue</span>
                      <span className="font-bold">{pendingApplications.length} applications</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}