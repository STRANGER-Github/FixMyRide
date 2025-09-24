import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fuel, TrendingUp, MapPin, Clock, DollarSign } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useToast } from "@/hooks/use-toast";

export default function FuelDashboard() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [fuelPrices, setFuelPrices] = useState({
    petrol: 1.45,
    diesel: 1.38,
    cng: 0.95
  });

  const updatePrice = (fuelType: keyof typeof fuelPrices, newPrice: number) => {
    setFuelPrices(prev => ({
      ...prev,
      [fuelType]: newPrice
    }));
    
    toast({
      title: "Price Updated! ⛽",
      description: `${fuelType.toUpperCase()} price updated to $${newPrice.toFixed(2)}/L`,
    });
  };

  return (
    <ProtectedRoute allowedRoles={['fuel_station']}>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                Fuel Station Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || 'Station Manager'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Sales</p>
                    <p className="text-2xl font-bold">$2,840</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel Sold</p>
                    <p className="text-2xl font-bold">1,950L</p>
                  </div>
                  <Fuel className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customers</p>
                    <p className="text-2xl font-bold">142</p>
                  </div>
                  <MapPin className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                    <p className="text-2xl font-bold">4.7★</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-sunset-orange rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">★</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="pricing" className="space-y-6">
            <TabsList className="bg-background-secondary">
              <TabsTrigger value="pricing">Fuel Pricing</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="station">Station Info</TabsTrigger>
            </TabsList>

            {/* Fuel Pricing */}
            <TabsContent value="pricing" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Current Fuel Prices</CardTitle>
                  <CardDescription>
                    Update your fuel prices to reflect current market rates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Petrol */}
                    <div className="p-6 bg-background-secondary rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <Fuel className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Petrol</h3>
                          <p className="text-sm text-muted-foreground">Regular Unleaded</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="petrol-price">Price per Liter</Label>
                          <Badge variant="secondary">${fuelPrices.petrol}/L</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="petrol-price"
                            type="number"
                            step="0.01"
                            value={fuelPrices.petrol}
                            onChange={(e) => setFuelPrices(prev => ({ ...prev, petrol: parseFloat(e.target.value) }))}
                            className="bg-background border-border"
                          />
                          <Button 
                            variant="hero" 
                            size="sm"
                            onClick={() => updatePrice('petrol', fuelPrices.petrol)}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Diesel */}
                    <div className="p-6 bg-background-secondary rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                          <Fuel className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Diesel</h3>
                          <p className="text-sm text-muted-foreground">Ultra Low Sulfur</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="diesel-price">Price per Liter</Label>
                          <Badge variant="secondary">${fuelPrices.diesel}/L</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="diesel-price"
                            type="number"
                            step="0.01"
                            value={fuelPrices.diesel}
                            onChange={(e) => setFuelPrices(prev => ({ ...prev, diesel: parseFloat(e.target.value) }))}
                            className="bg-background border-border"
                          />
                          <Button 
                            variant="hero" 
                            size="sm"
                            onClick={() => updatePrice('diesel', fuelPrices.diesel)}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* CNG */}
                    <div className="p-6 bg-background-secondary rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <Fuel className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">CNG</h3>
                          <p className="text-sm text-muted-foreground">Compressed Natural Gas</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="cng-price">Price per kg</Label>
                          <Badge variant="secondary">${fuelPrices.cng}/kg</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="cng-price"
                            type="number"
                            step="0.01"
                            value={fuelPrices.cng}
                            onChange={(e) => setFuelPrices(prev => ({ ...prev, cng: parseFloat(e.target.value) }))}
                            className="bg-background border-border"
                          />
                          <Button 
                            variant="hero" 
                            size="sm"
                            onClick={() => updatePrice('cng', fuelPrices.cng)}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background-secondary rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Price updates will be visible to customers within 5 minutes. 
                      Competitive pricing helps attract more customers to your station.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inventory */}
            <TabsContent value="inventory" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Fuel Inventory</CardTitle>
                  <CardDescription>
                    Monitor your fuel tank levels and schedule refills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { fuel: 'Petrol', level: 85, capacity: 10000, color: 'blue' },
                    { fuel: 'Diesel', level: 62, capacity: 8000, color: 'amber' },
                    { fuel: 'CNG', level: 94, capacity: 5000, color: 'green' }
                  ].map((tank, index) => (
                    <div key={index} className="p-4 bg-background-secondary rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{tank.fuel} Tank</h3>
                        <Badge className={tank.level < 30 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}>
                          {tank.level}% Full
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full bg-background rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full bg-${tank.color}-500`}
                            style={{ width: `${tank.level}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{Math.round(tank.capacity * tank.level / 100).toLocaleString()}L</span>
                          <span>{tank.capacity.toLocaleString()}L capacity</span>
                        </div>
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
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Sales Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>This Week</span>
                        <span className="font-bold text-green-500">+12.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>This Month</span>
                        <span className="font-bold text-green-500">+8.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Peak Hours</span>
                        <span className="font-bold">7-9 AM, 5-7 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong border-border">
                  <CardHeader>
                    <CardTitle>Customer Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Repeat Customers</span>
                        <span className="font-bold">68%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Avg. Visit Value</span>
                        <span className="font-bold">$42.50</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Popular Fuel</span>
                        <span className="font-bold">Petrol (65%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Station Info */}
            <TabsContent value="station" className="space-y-4">
              <Card className="glass-strong border-border">
                <CardHeader>
                  <CardTitle>Station Information</CardTitle>
                  <CardDescription>
                    Update your station details and operating hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Station Name</Label>
                      <Input 
                        value="FixMyRide Fuel Station #1" 
                        className="bg-background-secondary border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Number</Label>
                      <Input 
                        value="+1 (555) 123-4567" 
                        className="bg-background-secondary border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input 
                        value="123 Fuel Street, City Center" 
                        className="bg-background-secondary border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Operating Hours</Label>
                      <Input 
                        value="24/7" 
                        className="bg-background-secondary border-border"
                      />
                    </div>
                  </div>
                  <Button variant="hero" className="w-full">
                    Update Station Info
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}