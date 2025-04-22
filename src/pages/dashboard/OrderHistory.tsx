
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/lib/types";
import { useState } from "react";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-04-21T10:30:00",
    fuelType: "Petrol",
    quantity: 15,
    totalPrice: 1327.5,
    stationName: "City Fuel Station",
    status: "delivered" as OrderStatus,
  },
  {
    id: "ORD-002",
    date: "2023-04-18T14:15:00",
    fuelType: "Diesel",
    quantity: 25,
    totalPrice: 2005.0,
    stationName: "Highway Fuel Point",
    status: "delivered" as OrderStatus,
  },
  {
    id: "ORD-003",
    date: "2023-04-22T09:45:00",
    fuelType: "Petrol",
    quantity: 10,
    totalPrice: 885.0,
    stationName: "Express Fueling",
    status: "processing" as OrderStatus,
  },
  {
    id: "ORD-004",
    date: "2023-04-22T11:00:00",
    fuelType: "Diesel",
    quantity: 20,
    totalPrice: 1596.0,
    stationName: "City Fuel Station",
    status: "confirmed" as OrderStatus,
  },
  {
    id: "ORD-005",
    date: "2023-04-22T12:30:00",
    fuelType: "Petrol",
    quantity: 12,
    totalPrice: 1062.0,
    stationName: "Highway Fuel Point",
    status: "pending" as OrderStatus,
  },
];

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(mockOrders);

  // Filter out orders that can be canceled
  const canBeCanceled = (status: OrderStatus) => 
    ["pending", "confirmed"].includes(status);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "outline";
      case "confirmed":
        return "secondary";
      case "processing":
        return "default";
      case "delivering":
        return "secondary";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleCancelOrder = (orderId: string) => {
    // In a real app, this would call an API
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "cancelled" as OrderStatus } 
        : order
    ));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Fuel Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>{order.fuelType}</TableCell>
                    <TableCell>{order.quantity} L</TableCell>
                    <TableCell className="text-right">₹{order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {canBeCanceled(order.status) ? (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" disabled={order.status === "cancelled"}>
                          Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
