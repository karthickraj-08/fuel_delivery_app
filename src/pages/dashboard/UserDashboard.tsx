
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { 
  Fuel, 
  MapPin, 
  Search, 
  Car,
  CreditCard,
  Navigation
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fuelType, setFuelType] = useState<"petrol" | "diesel">("petrol");
  const [quantity, setQuantity] = useState<number>(10);
  const [location, setLocation] = useState<string>("");
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(true);
  
  // Mock gas stations
  const gasStations = [
    {
      id: "gs1",
      name: "City Fuel Station",
      distance: "1.2 km away",
      rating: 4.5,
      prices: { petrol: 88.5, diesel: 80.2 }
    },
    {
      id: "gs2",
      name: "Highway Fuel Point",
      distance: "2.5 km away",
      rating: 4.2,
      prices: { petrol: 87.9, diesel: 79.8 }
    },
    {
      id: "gs3",
      name: "Express Fueling",
      distance: "3.8 km away",
      rating: 4.7,
      prices: { petrol: 88.2, diesel: 80.5 }
    }
  ];

  const handlePlaceOrder = (stationId: string) => {
    // In a real app, this would create an order and navigate to a confirmation page
    navigate("/order-confirmation");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
        </div>

        <Tabs defaultValue="order" className="space-y-6">
          <TabsList>
            <TabsTrigger value="order">Order Fuel</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="order" className="space-y-6">
            {/* Fuel Order Form */}
            <Card>
              <CardHeader>
                <CardTitle>Order Fuel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Select Fuel Type</h3>
                    <div className="flex space-x-4">
                      <Button
                        variant={fuelType === "petrol" ? "default" : "outline"}
                        className={fuelType === "petrol" ? "bg-primary" : ""}
                        onClick={() => setFuelType("petrol")}
                      >
                        <Fuel className="mr-2 h-4 w-4" />
                        Petrol
                      </Button>
                      <Button
                        variant={fuelType === "diesel" ? "default" : "outline"}
                        className={fuelType === "diesel" ? "bg-primary" : ""}
                        onClick={() => setFuelType("diesel")}
                      >
                        <Fuel className="mr-2 h-4 w-4" />
                        Diesel
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="quantity">Quantity (Liters)</Label>
                      <span className="font-medium">{quantity} L</span>
                    </div>
                    <Slider
                      id="quantity"
                      min={5}
                      max={100}
                      step={1}
                      defaultValue={[quantity]}
                      onValueChange={(value) => setQuantity(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5L</span>
                      <span>100L</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Delivery Location</Label>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto" 
                        onClick={() => setUseCurrentLocation(!useCurrentLocation)}
                      >
                        {useCurrentLocation ? "Enter manually" : "Use current location"}
                      </Button>
                    </div>
                    
                    {useCurrentLocation ? (
                      <div className="flex items-center p-3 rounded-md bg-muted">
                        <Navigation className="h-4 w-4 mr-2 text-primary" />
                        <span>Using current location</span>
                      </div>
                    ) : (
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <Input
                          type="text"
                          placeholder="Enter your location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="border-0"
                        />
                        <Button variant="ghost" size="icon" className="rounded-none">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Nearby Gas Stations */}
            <h2 className="text-xl font-semibold mb-4">Nearby Gas Stations</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {gasStations.map(station => (
                <Card key={station.id} className="overflow-hidden">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    <Fuel className="h-12 w-12 text-primary-light opacity-50" />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold">{station.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{station.distance}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <div className="font-medium">
                            {fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}:
                          </div>
                          <div className="text-lg font-bold">
                            ₹{station.prices[fuelType].toFixed(1)}/L
                          </div>
                        </div>
                        <div className="text-sm text-right">
                          <div className="font-medium">Total:</div>
                          <div className="text-lg font-bold">
                            ₹{(station.prices[fuelType] * quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-secondary hover:bg-secondary/90"
                        onClick={() => handlePlaceOrder(station.id)}
                      >
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted w-full flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="h-8 w-8 mx-auto text-primary-light mb-2" />
                    <p className="text-lg font-medium">Map View</p>
                    <p className="text-sm text-muted-foreground">
                      Interactive map would be displayed here with gas stations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
