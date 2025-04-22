
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  
  // In a real app, this would come from the order response or context
  const orderDetails = {
    orderId: "ORD-" + Math.floor(1000 + Math.random() * 9000),
    stationName: "City Fuel Station",
    fuelType: "Petrol",
    quantity: 20,
    price: 88.5,
    totalAmount: 1770,
    estimatedDelivery: "30-45 minutes",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-0">
          <div className="mx-auto my-4 bg-primary-light/20 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="text-center text-muted-foreground mb-6">
            <p>Your fuel delivery order has been confirmed and will be processed shortly.</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Order ID:</span>
              <span>{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Gas Station:</span>
              <span>{orderDetails.stationName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Fuel Type:</span>
              <span>{orderDetails.fuelType}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Quantity:</span>
              <span>{orderDetails.quantity} L</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Price per Liter:</span>
              <span>₹{orderDetails.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold">₹{orderDetails.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Estimated Delivery:</span>
              <span>{orderDetails.estimatedDelivery}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            className="w-full bg-primary" 
            onClick={() => navigate("/orders")}
          >
            View Order Details
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate("/dashboard")}
          >
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
