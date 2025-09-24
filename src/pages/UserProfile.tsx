import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Clock, Star, Phone, Mail, CreditCard } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useToast } from "@/hooks/use-toast";

export default function UserProfile() {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: profile?.full_name || '',
    phone: profile?.phone || '',
    email: profile?.email || ''
  });

  const [bookingHistory] = useState([
    {
      id: '1',
      service: 'Engine Repair',
      provider: 'Downtown Auto Repair',
      date: '2024-01-15',
      status: 'completed',
      cost: '$180',
      rating: 5,
      location: '123 Main St'
    },
    {
      id: '2',
      service: 'Fuel Delivery',
      provider: 'Quick Fuel Services',
      date: '2024-01-10',
      status: 'completed',
      cost: '$45',
      rating: 4,
      location: '456 Oak Ave'
    },
    {
      id: '3',
      service: 'Emergency Medical',
      provider: 'Dr. Smith Emergency Care',
      date: '2024-01-05',
      status: 'completed',
      cost: '$220',
      rating: 5,
      location: '789 Pine St'
    }
  ]);

  const handleSaveProfile = async () => {
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                My Profile
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage your account and view your service history
            </p>
          </div>

          {/* Profile Overview */}
          <Card className="glass-strong border-border mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-cyan to-sunset-orange rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{profile?.full_name || 'User'}</h2>
                    <p className="text-muted-foreground">{profile?.email}</p>
                    <Badge className="mt-1 bg-primary/10 text-primary">Regular User</Badge>
                  </div>
                </div>
                <Button 
                  variant={isEditing ? "hero" : "outline"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-background-secondary">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="history">Service History</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Details */}
            <TabsContent value="profile" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                          disabled={!isEditing}
                          className="pl-10 bg-background-secondary border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className="pl-10 bg-background-secondary border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className="pl-10 bg-background-secondary border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <Input
                        value="Regular User"
                        disabled
                        className="bg-background-secondary border-border"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3">
                      <Button variant="hero" onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Service History */}
            <TabsContent value="history" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Service History</CardTitle>
                  <CardDescription>
                    View all your past service bookings and transactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="p-4 bg-background-secondary rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{booking.service}</h3>
                          <p className="text-sm text-muted-foreground">{booking.provider}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {booking.location}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{booking.cost}</p>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">Rating:</span>
                          <div className="flex gap-1 ml-1">
                            {renderStars(booking.rating)}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}

                  {bookingHistory.length === 0 && (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No service history yet</p>
                      <Button variant="hero" className="mt-4" asChild>
                        <a href="/book">Book Your First Service</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods */}
            <TabsContent value="payment" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your saved payment methods for quick booking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-background-secondary rounded-lg border border-dashed border-border">
                    <div className="text-center">
                      <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">No payment methods saved yet</p>
                      <Button variant="hero">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Customize your FixMyRide experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about your bookings</p>
                      </div>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Get text updates on service status</p>
                      </div>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Location Services</p>
                        <p className="text-sm text-muted-foreground">Allow location access for better service</p>
                      </div>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                      </div>
                      <Button variant="outline" size="sm">Disabled</Button>
                    </div>
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