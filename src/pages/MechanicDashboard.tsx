import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, DollarSign, Wrench, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MechanicDashboard() {
  const { profile } = useAuth();
  const [activeBookings] = useState([
    {
      id: '1',
      customer: 'John Doe',
      location: '123 Main St, Downtown',
      issue: 'Engine trouble, car won\'t start',
      distance: '2.5 km',
      estimatedCost: 150,
      status: 'pending',
      time: '10 minutes ago'
    },
    {
      id: '2',
      customer: 'Sarah Wilson',
      location: '456 Oak Avenue',
      issue: 'Flat tire replacement',
      distance: '1.2 km',
      estimatedCost: 80,
      status: 'accepted',
      time: '25 minutes ago'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'accepted':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['mechanic']}>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                Mechanic Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || 'Mechanic'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Earnings</p>
                    <p className="text-2xl font-bold">$420</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-2xl font-bold">4.8★</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-sunset-orange rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">★</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="bg-background-secondary">
              <TabsTrigger value="bookings">Active Bookings</TabsTrigger>
              <TabsTrigger value="location">Location & Status</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Services</TabsTrigger>
              <TabsTrigger value="history">Job History</TabsTrigger>
            </TabsList>

            {/* Active Bookings */}
            <TabsContent value="bookings" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                  <CardDescription>
                    New booking requests waiting for your response
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="p-4 bg-background-secondary rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{booking.customer}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {booking.location} • {booking.distance} away
                          </div>
                          <p className="text-sm">{booking.issue}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${booking.estimatedCost}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button variant="hero" size="sm" className="flex-1">
                            Accept Job
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      )}
                      
                      {booking.status === 'accepted' && (
                        <div className="flex gap-2">
                          <Button variant="hero" size="sm" className="flex-1">
                            Start Navigation
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Customer
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location & Status */}
            <TabsContent value="location" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-strong border-border">
                  <CardHeader>
                    <CardTitle>Current Status</CardTitle>
                    <CardDescription>
                      Update your availability and location
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Available for Jobs</span>
                      <Button variant="hero" size="sm">Online</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Current Location</span>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last updated: 5 minutes ago
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong border-border">
                  <CardHeader>
                    <CardTitle>Service Coverage</CardTitle>
                    <CardDescription>
                      Areas where you provide services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="secondary">Downtown</Badge>
                      <Badge variant="secondary">Midtown</Badge>
                      <Badge variant="secondary">Airport Area</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Pricing & Services */}
            <TabsContent value="pricing" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Service Pricing</CardTitle>
                  <CardDescription>
                    Manage your service rates and offerings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background-secondary rounded-lg">
                      <h3 className="font-semibold mb-2">Engine Diagnostics</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Complete engine analysis and troubleshooting
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">$80 - $150</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-background-secondary rounded-lg">
                      <h3 className="font-semibold mb-2">Battery Replacement</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Battery testing and replacement service
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">$60 - $120</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="hero" className="w-full">
                    Add New Service
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job History */}
            <TabsContent value="history" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                  <CardDescription>
                    Your completed service history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                        <div>
                          <p className="font-medium">Engine Repair - Customer #{i}</p>
                          <p className="text-sm text-muted-foreground">Yesterday, 2:30 PM</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">$180</p>
                          <Badge className="bg-green-500/10 text-green-500">Completed</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}