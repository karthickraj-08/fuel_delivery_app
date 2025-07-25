
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  // Mock stats
  const stats = [
    { title: "Active Gas Stations", value: "24" },
    { title: "Total Users", value: "1,842" },
    { title: "Orders Today", value: "168" },
    { title: "Total Revenue", value: "₹3.2L" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Admin dashboard with detailed analytics and management tools would be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
