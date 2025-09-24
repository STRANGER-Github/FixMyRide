import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, User, Phone, CheckCircle, Truck, Wrench } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

export default function TrackService() {
  const [bookingId, setBookingId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock tracking data
  const mockTrackingData = {
    id: "BK-2024-001",
    service: "Vehicle Repair",
    status: "in_progress",
    provider: {
      name: "Mike's Auto Service",
      phone: "+1 (555) 123-4567",
      location: "123 Main St, City"
    },
    timeline: [
      {
        status: "booked",
        title: "Service Booked",
        description: "Your service request has been confirmed",
        time: "2024-01-15 10:00 AM",
        completed: true
      },
      {
        status: "assigned",
        title: "Provider Assigned",
        description: "Mike's Auto Service has been assigned to your request",
        time: "2024-01-15 10:30 AM",
        completed: true
      },
      {
        status: "on_way",
        title: "Provider En Route",
        description: "Service provider is on the way to your location",
        time: "2024-01-15 11:00 AM",
        completed: true
      },
      {
        status: "in_progress",
        title: "Service in Progress",
        description: "Work is currently being performed",
        time: "2024-01-15 11:30 AM",
        completed: true
      },
      {
        status: "completed",
        title: "Service Completed",
        description: "Your service has been completed successfully",
        time: "Estimated: 1:30 PM",
        completed: false
      }
    ],
    estimatedCompletion: "1:30 PM",
    currentLocation: "En route to customer location"
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a booking ID",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (bookingId.toLowerCase().includes('bk-')) {
      setTrackingData(mockTrackingData);
      toast({
        title: "Booking Found! 📍",
        description: "Here's your service tracking information",
      });
    } else {
      toast({
        title: "Booking Not Found",
        description: "Please check your booking ID and try again",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      assigned: { label: "Assigned", variant: "default" as const },
      on_way: { label: "En Route", variant: "default" as const },
      in_progress: { label: "In Progress", variant: "default" as const },
      completed: { label: "Completed", variant: "default" as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                Track Your Service
              </span>
            </h1>
            <p className="text-muted-foreground">
              Enter your booking ID to track the status of your service request
            </p>
          </div>

          {/* Search Form */}
          <Card className="glass-strong border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Your Booking
              </CardTitle>
              <CardDescription>
                Enter your booking ID (e.g., BK-2024-001)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="booking-id" className="sr-only">Booking ID</Label>
                  <Input
                    id="booking-id"
                    placeholder="Enter your booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="bg-background-secondary border-border"
                  />
                </div>
                <Button type="submit" variant="hero" disabled={loading}>
                  {loading ? "Searching..." : "Track Service"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-6 animate-fade-in">
              {/* Service Overview */}
              <Card className="glass-strong border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Wrench className="w-5 h-5" />
                        Booking #{trackingData.id}
                      </CardTitle>
                      <CardDescription>{trackingData.service}</CardDescription>
                    </div>
                    {getStatusBadge(trackingData.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{trackingData.provider.name}</p>
                        <p className="text-sm text-muted-foreground">Service Provider</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{trackingData.provider.phone}</p>
                        <p className="text-sm text-muted-foreground">Contact Number</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{trackingData.estimatedCompletion}</p>
                        <p className="text-sm text-muted-foreground">Est. Completion</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Status */}
              <Card className="glass-strong border-border border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium">Current Status</p>
                      <p className="text-sm text-muted-foreground">{trackingData.currentLocation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Service Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trackingData.timeline.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <div className="w-2 h-2 bg-current rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${
                              step.completed ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {step.title}
                            </h3>
                            <span className="text-sm text-muted-foreground">{step.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Provider
                </Button>
                <Button variant="outline" className="flex-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Location
                </Button>
              </div>
            </div>
          )}

          {/* Demo Booking ID */}
          {!trackingData && (
            <Card className="glass-strong border-border bg-muted/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Demo:</strong> Try tracking with booking ID "BK-2024-001"
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}