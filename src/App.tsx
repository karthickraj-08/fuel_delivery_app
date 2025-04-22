import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ServiceProvider } from "./contexts/ServiceContext";
import LandingPage from "./pages/landing/Index";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import UserDashboard from "./pages/dashboard/UserDashboard";
import OrderHistory from "./pages/dashboard/OrderHistory";
import Profile from "./pages/dashboard/Profile";
import Notifications from "./pages/Notifications";
import OrderConfirmation from "./pages/order/OrderConfirmation";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StationDashboard from "./pages/station/StationDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Role-based routes
const RoleRoute = ({ requiredRole, children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== requiredRole) {
    // Redirect based on user role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'station') {
      return <Navigate to="/station" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ServiceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* User routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <RoleRoute requiredRole="user">
                    <UserDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-confirmation" 
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <RoleRoute requiredRole="admin">
                    <AdminDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              } 
            />
            
            {/* Gas Station routes */}
            <Route 
              path="/station" 
              element={
                <ProtectedRoute>
                  <RoleRoute requiredRole="station">
                    <StationDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </ServiceProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
