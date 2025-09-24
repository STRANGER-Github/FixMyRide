import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Star
} from "lucide-react";
import Layout from "@/components/Layout";

const stats = [
  { label: "Active Users", value: "12,543", change: "+12%", icon: Users, color: "neon-cyan" },
  { label: "Service Providers", value: "1,847", change: "+8%", icon: TrendingUp, color: "success" },
  { label: "Monthly Revenue", value: "$284,391", change: "+15%", icon: DollarSign, color: "sunset-orange" },
  { label: "Active Bookings", value: "127", change: "-5%", icon: Clock, color: "neon-cyan" },
];

const pendingProviders = [
  {
    id: "SP001",
    name: "Mike Johnson",
    service: "Automotive Repair",
    location: "Downtown Area",
    rating: 4.8,
    experience: "8 years",
    status: "pending"
  },
  {
    id: "SP002", 
    name: "Dr. Sarah Chen",
    service: "Medical Emergency",
    location: "North District",
    rating: 4.9,
    experience: "12 years",
    status: "pending"
  },
];

export default function AdminDashboard() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handleApproveProvider = (providerId: string) => {
    console.log("Approved provider:", providerId);
  };

  const handleRejectProvider = (providerId: string) => {
    console.log("Rejected provider:", providerId);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage service providers, monitor platform activity, and handle disputes.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="glass-strong border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <Badge 
                      variant={stat.change.startsWith('+') ? 'default' : 'secondary'}
                      className={stat.change.startsWith('+') ? 'bg-success text-white' : ''}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pending Approvals */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-sunset-orange" />
                    <span>Pending Provider Approvals</span>
                  </CardTitle>
                  <CardDescription>
                    Review and approve new service provider applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="glass rounded-xl p-6 border border-border hover:border-primary/50 transition-smooth"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-foreground text-lg">
                            {provider.name}
                          </h3>
                          <Badge variant="outline">
                            {provider.service}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-sunset-orange fill-current" />
                            <span className="font-semibold">{provider.rating}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {provider.experience} exp
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{provider.location}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          variant="hero"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleApproveProvider(provider.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleRejectProvider(provider.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProvider(provider.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}

                  {pendingProviders.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        All Caught Up!
                      </h3>
                      <p className="text-muted-foreground">
                        No pending provider approvals at the moment.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="futuristic" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    View Disputes
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass border-border">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <span className="text-foreground">New provider approved</span>
                        <div className="text-muted-foreground">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <span className="text-foreground">Emergency resolved</span>
                        <div className="text-muted-foreground">15 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <span className="text-foreground">Dispute reported</span>
                        <div className="text-muted-foreground">1 hour ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="glass border-border">
                <CardHeader>
                  <CardTitle className="text-success">System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Status</span>
                    <Badge className="bg-success text-white">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Gateway</span>
                    <Badge className="bg-success text-white">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Service</span>
                    <Badge className="bg-success text-white">Operational</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}