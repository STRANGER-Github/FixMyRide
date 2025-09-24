import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, Heart, Fuel, MapPin, Phone, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const serviceTypes = [
  { id: "mechanic", name: "Emergency Mechanic", icon: Wrench, color: "neon-cyan" },
  { id: "medical", name: "Medical Emergency", icon: Heart, color: "sunset-orange" },
  { id: "fuel", name: "Fuel Delivery", icon: Fuel, color: "neon-cyan" },
];

export default function BookService() {
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock booking submission
    toast({
      title: "Booking Confirmed! 🚀",
      description: "A service provider will contact you within 5 minutes.",
    });

    // Reset form
    setSelectedService("");
    setLocation("");
    setDescription("");
    setContactNumber("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                Book Emergency Service
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Get help in minutes. Select your service type and we'll connect you with the nearest provider.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Type Cards */}
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Select Service Type</span>
                  </CardTitle>
                  <CardDescription>
                    Choose the type of emergency assistance you need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {serviceTypes.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-smooth hover:scale-105 ${
                          selectedService === service.id
                            ? "border-primary bg-primary/10 shadow-glow-cyan"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="text-center space-y-3">
                          <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center">
                            <service.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <h3 className="font-semibold text-foreground">
                            {service.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Booking Form */}
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Booking Details</span>
                  </CardTitle>
                  <CardDescription>
                    Provide your location and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Current Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter your current address or landmark"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="bg-background-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        type="tel"
                        placeholder="Your phone number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                        className="bg-background-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Problem Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your emergency or issue in detail"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-background-secondary border-border min-h-[100px]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={!selectedService}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Book Emergency Service
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Emergency Contact */}
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle className="text-center text-sunset-orange">
                    Emergency Hotline
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-3xl font-bold text-sunset-orange">
                    911
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For life-threatening emergencies
                  </p>
                  <Button variant="emergency" className="w-full">
                    Call Emergency
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="glass border-border">
                <CardHeader>
                  <CardTitle className="text-primary">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Stay calm and move to a safe location if possible
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Keep your phone charged and accessible
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Share your live location with a trusted contact
                    </span>
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