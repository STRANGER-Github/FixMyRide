import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserCheck, 
  DollarSign, 
  MapPin, 
  Clock, 
  Star, 
  TrendingUp,
  Car,
  Heart,
  Fuel,
  CheckCircle,
  XCircle
} from "lucide-react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const mockBookings = [
  {
    id: "BK001",
    customerName: "John Doe",
    service: "Engine Repair",
    location: "Downtown, 5th Street",
    distance: "2.3 km",
    urgency: "high",
    estimatedPay: "$120",
    time: "15 mins ago",
    status: "pending"
  },
  {
    id: "BK002", 
    customerName: "Sarah Wilson",
    service: "Tire Change",
    location: "Highway 101, Mile 23",
    distance: "4.7 km",
    urgency: "medium",
    estimatedPay: "$60",
    time: "32 mins ago",
    status: "pending"
  },
];

const stats = [
  { label: "Today's Earnings", value: "$340", icon: DollarSign, color: "neon-cyan" },
  { label: "Completed Jobs", value: "12", icon: CheckCircle, color: "success" },
  { label: "Rating", value: "4.9", icon: Star, color: "sunset-orange" },
  { label: "Response Time", value: "3 min", icon: Clock, color: "neon-cyan" },
];

export default function ServiceProvider() {
  const [isOnline, setIsOnline] = useState(true);

  const handleAcceptBooking = (bookingId: string) => {
    console.log("Accepted booking:", bookingId);
  };

  const handleDeclineBooking = (bookingId: string) => {
    console.log("Declined booking:", bookingId);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                  Service Provider Dashboard
                </span>
              </h1>
              <p className="text-muted-foreground">
                Welcome back, Alex! Manage your bookings and track your earnings.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge 
                  variant={isOnline ? "default" : "secondary"}
                  className={isOnline ? "bg-success text-white" : ""}
                >
                  {isOnline ? "Online" : "Offline"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOnline(!isOnline)}
                >
                  {isOnline ? "Go Offline" : "Go Online"}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="glass-strong border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Requests */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Incoming Booking Requests</span>
                  </CardTitle>
                  <CardDescription>
                    Accept or decline service requests in your area
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="glass rounded-xl p-6 border border-border hover:border-primary/50 transition-smooth"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">
                            {booking.service}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Customer: {booking.customerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {booking.estimatedPay}
                          </div>
                          <Badge 
                            variant={booking.urgency === "high" ? "destructive" : "secondary"}
                          >
                            {booking.urgency} priority
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.location}</span>
                          <span>• {booking.distance} away</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Requested {booking.time}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          variant="hero"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleAcceptBooking(booking.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDeclineBooking(booking.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}

                  {mockBookings.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                        <Car className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Active Requests
                      </h3>
                      <p className="text-muted-foreground">
                        You're all caught up! New requests will appear here.
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
                  <Button variant="futuristic" className="w-full" asChild>
                    <Link to="/provider/profile">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Update Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/provider/earnings">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Earnings
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/provider/settings">
                      <MapPin className="w-4 h-4 mr-2" />
                      Service Areas
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Service Types */}
              <Card className="glass border-border">
                <CardHeader>
                  <CardTitle>My Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-primary" />
                      <span className="text-sm">Automotive Repair</span>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg opacity-50">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Medical Services</span>
                    </div>
                    <Badge variant="secondary">Inactive</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg opacity-50">
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Fuel Delivery</span>
                    </div>
                    <Badge variant="secondary">Inactive</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* New Provider CTA */}
              <Card className="glass-strong border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center text-primary">
                    New Provider?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Join our platform and start earning with your skills
                  </p>
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/provider/signup">
                      Join FixMyRide
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}