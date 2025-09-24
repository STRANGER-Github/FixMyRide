import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, Clock, MapPin, AlertTriangle, DollarSign, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MedicalDashboard() {
  const { profile } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [emergencyCalls] = useState([
    {
      id: '1',
      patient: 'Emergency Call #001',
      location: '456 Oak Street, Downtown',
      severity: 'high',
      distance: '1.8 km',
      symptoms: 'Chest pain, difficulty breathing',
      time: '3 minutes ago',
      status: 'pending'
    },
    {
      id: '2',
      patient: 'Emergency Call #002',
      location: '789 Pine Avenue',
      severity: 'medium',
      distance: '3.2 km',
      symptoms: 'Severe allergic reaction',
      time: '12 minutes ago',
      status: 'responding'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['doctor']}>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                Medical Emergency Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground">
              Dr. {profile?.full_name || 'Doctor'} - Emergency Response Unit
            </p>
          </div>

          {/* Availability Toggle */}
          <Card className="glass-strong border-border mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-semibold">
                      Status: {isAvailable ? 'Available for Emergency Calls' : 'Offline'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Toggle your availability for emergency medical assistance
                    </p>
                  </div>
                </div>
                <Button 
                  variant={isAvailable ? "destructive" : "hero"}
                  onClick={() => setIsAvailable(!isAvailable)}
                >
                  {isAvailable ? 'Go Offline' : 'Go Online'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Emergency Calls</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="text-2xl font-bold">8min</p>
                  </div>
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Cases</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <Stethoscope className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Earnings</p>
                    <p className="text-2xl font-bold">$850</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="emergency" className="space-y-6">
            <TabsList className="bg-background-secondary">
              <TabsTrigger value="emergency">Emergency Calls</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Services</TabsTrigger>
              <TabsTrigger value="supplies">Medical Supplies</TabsTrigger>
              <TabsTrigger value="history">Case History</TabsTrigger>
            </TabsList>

            {/* Emergency Calls */}
            <TabsContent value="emergency" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Active Emergency Calls
                  </CardTitle>
                  <CardDescription>
                    Incoming emergency requests requiring immediate medical attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emergencyCalls.map((call) => (
                    <div key={call.id} className="p-4 bg-background-secondary rounded-lg border-l-4 border-red-500">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{call.patient}</h3>
                            <Badge className={getSeverityColor(call.severity)}>
                              {call.severity.toUpperCase()} PRIORITY
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {call.location} • {call.distance} away
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            {call.time}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">Reported Symptoms:</p>
                        <p className="text-sm bg-red-500/5 p-2 rounded border border-red-500/20">
                          {call.symptoms}
                        </p>
                      </div>

                      {call.status === 'pending' ? (
                        <div className="flex gap-2">
                          <Button variant="emergency" className="flex-1">
                            <Phone className="w-4 h-4 mr-2" />
                            Accept & Respond
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Forward to Hospital
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="hero" className="flex-1">
                            <MapPin className="w-4 h-4 mr-2" />
                            Navigate to Patient
                          </Button>
                          <Button variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Patient
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  {emergencyCalls.length === 0 && (
                    <div className="text-center py-8">
                      <Stethoscope className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No active emergency calls</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing & Services */}
            <TabsContent value="pricing" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Medical Service Pricing</CardTitle>
                  <CardDescription>
                    Set your rates for emergency medical services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-background-secondary rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">Base Response Fee</h3>
                          <span className="font-bold text-lg">$150</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Initial assessment and basic care
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Update Rate
                        </Button>
                      </div>

                      <div className="p-4 bg-background-secondary rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">Per Kilometer Rate</h3>
                          <span className="font-bold text-lg">$3.50</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Travel cost to patient location
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Update Rate
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-background-secondary rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">Emergency Medicine</h3>
                          <span className="font-bold text-lg">Cost + 15%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Medications and supplies used
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Update Markup
                        </Button>
                      </div>

                      <div className="p-4 bg-background-secondary rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">Extended Care</h3>
                          <span className="font-bold text-lg">$75/hr</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Ongoing monitoring and care
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Update Rate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background-secondary rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Service Coverage Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Downtown (0-5km: $0)</Badge>
                      <Badge variant="secondary">Suburbs (5-15km: Standard rate)</Badge>
                      <Badge variant="secondary">Rural (15km+: Double rate)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medical Supplies */}
            <TabsContent value="supplies" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Medical Supplies Inventory</CardTitle>
                  <CardDescription>
                    Track your emergency medical supplies and medications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'EpiPen', quantity: 8, minStock: 5, status: 'ok' },
                      { name: 'Insulin', quantity: 12, minStock: 10, status: 'ok' },
                      { name: 'Oxygen Tank', quantity: 3, minStock: 5, status: 'low' },
                      { name: 'Emergency Medications', quantity: 25, minStock: 20, status: 'ok' },
                      { name: 'Basic First Aid', quantity: 15, minStock: 10, status: 'ok' },
                      { name: 'Diagnostic Equipment', quantity: 2, minStock: 3, status: 'low' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-background-secondary rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge className={item.status === 'low' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}>
                            {item.quantity} units
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Min. stock: {item.minStock}</span>
                          <span className={item.status === 'low' ? 'text-red-500 font-medium' : ''}>
                            {item.status === 'low' ? 'Reorder needed' : 'In stock'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Case History */}
            <TabsContent value="history" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Recent Cases</CardTitle>
                  <CardDescription>
                    Your emergency response history and patient outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { case: 'Cardiac Emergency', outcome: 'Stabilized', time: 'Yesterday, 3:45 PM', payment: '$285' },
                      { case: 'Severe Allergic Reaction', outcome: 'Treated', time: 'Yesterday, 11:20 AM', payment: '$180' },
                      { case: 'Diabetic Emergency', outcome: 'Stable', time: '2 days ago, 6:15 PM', payment: '$220' }
                    ].map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                        <div>
                          <p className="font-medium">{record.case}</p>
                          <p className="text-sm text-muted-foreground">{record.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{record.payment}</p>
                          <Badge className="bg-green-500/10 text-green-500">{record.outcome}</Badge>
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