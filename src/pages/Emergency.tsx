import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Phone, MapPin, Clock, Car, Heart, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

export default function Emergency() {
  const [emergencyType, setEmergencyType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const emergencyTypes = [
    { value: "breakdown", label: "Vehicle Breakdown", icon: Car, color: "text-amber-500" },
    { value: "accident", label: "Road Accident", icon: AlertTriangle, color: "text-red-500" },
    { value: "medical", label: "Medical Emergency", icon: Heart, color: "text-red-600" },
    { value: "fuel", label: "Out of Fuel", icon: Zap, color: "text-blue-500" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate emergency request processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Emergency Request Sent! 🚨",
      description: "Help is on the way. We'll contact you shortly.",
    });

    setSubmitting(false);
    
    // Reset form
    setEmergencyType("");
    setLocation("");
    setDescription("");
    setContactNumber("");
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({
            title: "Location Captured",
            description: "Your current location has been added.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                Emergency Assistance
              </span>
            </h1>
            <p className="text-muted-foreground">
              Get immediate help when you need it most
            </p>
          </div>

          {/* Emergency Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="glass-strong border-red-500/20 bg-red-500/5">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="font-medium">Emergency Hotline</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 911-HELP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong border-amber-500/20 bg-amber-500/5">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-amber-500" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">15-30 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Request Form */}
          <Card className="glass-strong border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Request Emergency Help
              </CardTitle>
              <CardDescription>
                Fill out this form to get immediate assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="emergency-type">Emergency Type *</Label>
                  <Select value={emergencyType} onValueChange={setEmergencyType} required>
                    <SelectTrigger className="bg-background-secondary border-border">
                      <SelectValue placeholder="Select emergency type" />
                    </SelectTrigger>
                    <SelectContent>
                      {emergencyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <type.icon className={`w-4 h-4 ${type.color}`} />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Enter your location or coordinates"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-background-secondary border-border"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGetLocation}
                      className="flex-shrink-0"
                    >
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number *</Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="bg-background-secondary border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your emergency situation and any additional details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-background-secondary border-border min-h-[100px]"
                  />
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    <strong>Important:</strong> For life-threatening emergencies, call 911 immediately. 
                    This service is for roadside assistance and non-critical emergencies.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full bg-red-500 hover:bg-red-600"
                  disabled={submitting}
                >
                  {submitting ? "Sending Emergency Request..." : "Send Emergency Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}