
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LogOut,
  User,
  Home,
  ShoppingCart,
  Settings,
  Bell,
  Map,
  Users,
  Fuel,
  Truck,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigateTo = (path: string) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const getNavItems = () => {
    switch (user?.role) {
      case "admin":
        return [
          { icon: <Home size={20} />, label: "Dashboard", path: "/admin" },
          { icon: <Map size={20} />, label: "Gas Stations", path: "/admin/stations" },
          { icon: <Users size={20} />, label: "Users", path: "/admin/users" },
          { icon: <ShoppingCart size={20} />, label: "Orders", path: "/admin/orders" },
          { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
        ];
      case "station":
        return [
          { icon: <Home size={20} />, label: "Dashboard", path: "/station" },
          { icon: <Fuel size={20} />, label: "Inventory", path: "/station/inventory" },
          { icon: <ShoppingCart size={20} />, label: "Orders", path: "/station/orders" },
          { icon: <Bell size={20} />, label: "Notifications", path: "/station/notifications" },
          { icon: <Settings size={20} />, label: "Settings", path: "/station/settings" },
        ];
      default:
        return [
          { icon: <Home size={20} />, label: "Home", path: "/dashboard" },
          { icon: <ShoppingCart size={20} />, label: "My Orders", path: "/orders" },
          { icon: <Bell size={20} />, label: "Notifications", path: "/notifications" },
          { icon: <User size={20} />, label: "Profile", path: "/profile" },
        ];
    }
  };

  const navItems = getNavItems();

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center space-x-2">
        <Fuel className="text-primary w-8 h-8" />
        <h1 className="text-xl font-bold text-primary">Fuel On Wheels</h1>
      </div>
      <Separator className="mb-4" />

      <div className="flex-1 px-2">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start mb-1"
              onClick={() => navigateTo(item.path)}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 mt-auto">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
          <div>
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-sm text-muted-foreground">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside
          className={`bg-background border-r w-64 transition-all duration-300 ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          {renderSidebarContent()}
        </aside>
      )}

      {/* Mobile Sidebar Sheet */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            {renderSidebarContent()}
          </SheetContent>
        </Sheet>
      )}

      <div className="flex-1">
        <header className="h-14 border-b flex items-center px-4 sticky top-0 bg-background z-10">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </Button>
          )}
          <div className="flex-1">
            {!isMobile && !sidebarOpen && (
              <div className="flex items-center space-x-2">
                <Fuel className="text-primary w-6 h-6" />
                <span className="font-semibold text-primary">Fuel On Wheels</span>
              </div>
            )}
          </div>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
