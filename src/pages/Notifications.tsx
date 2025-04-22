
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Info } from "lucide-react";

export default function Notifications() {
  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "Order Confirmed",
      message: "Your order #ORD-1234 has been confirmed and is being processed.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "delivery",
      title: "Delivery On The Way",
      message: "Your fuel delivery is on the way and will arrive in approximately 30 minutes.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Successful",
      message: "Your payment of ₹1,770 for order #ORD-1234 was successful.",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: "Price Update",
      message: "Fuel prices have been updated. Petrol is now ₹88.50/L and Diesel is ₹80.20/L.",
      time: "1 day ago",
      read: true,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <Badge variant="outline" className="text-primary">
            {notifications.filter(n => !n.read).length} Unread
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start p-4 rounded-lg border ${
                  !notification.read ? "bg-primary-light/5 border-primary-light/20" : ""
                }`}
              >
                <div 
                  className={`mr-4 rounded-full p-2 ${
                    !notification.read 
                      ? "bg-primary-light/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {notification.type === "order" ? (
                    <Bell className="h-5 w-5" />
                  ) : notification.type === "delivery" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Info className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
