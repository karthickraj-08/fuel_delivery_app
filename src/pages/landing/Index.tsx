
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Fuel, ChevronRight, Users, CreditCard, Truck, MapPin } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Fuel className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Fuel On Wheels</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
            <Button className="bg-primary" onClick={() => navigate('/register')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Fuel Delivered <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Right To Your Doorstep</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Never worry about finding a gas station again. Get fuel delivered directly to your location with just a few taps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary" onClick={() => navigate('/register')}>
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -z-10 top-1/4 right-1/4 w-64 h-64 bg-primary-light/20 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 bottom-1/4 left-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
                  <div className="bg-primary-light p-6 flex items-center justify-center">
                    <Fuel className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <h3 className="font-semibold">Petrol</h3>
                        <p className="text-sm text-muted-foreground">Regular Unleaded</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-xl font-bold">₹88.50/L</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Quantity</span>
                        <span className="font-bold">20 L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-xl font-bold">₹1,770.00</span>
                      </div>
                      <Button className="w-full bg-secondary">Place Order</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why Choose Fuel On Wheels?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              We make refueling your fleet or personal vehicle as simple as ordering food delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary-light/20 flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenient Location</h3>
              <p className="text-muted-foreground">
                Get fuel delivered exactly where you need it - no need to drive to a gas station.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary-light/20 flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Payment</h3>
              <p className="text-muted-foreground">
                Pay securely through our app with multiple payment options available.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary-light/20 flex items-center justify-center mb-6">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-muted-foreground">
                Get fuel delivered within hours of placing your order, even in emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting fuel delivered is simple with our easy-to-use platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account in minutes with basic details
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Place Order</h3>
              <p className="text-muted-foreground">
                Select fuel type, quantity, and delivery location
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Delivery</h3>
              <p className="text-muted-foreground">
                Follow your order status in real-time through the app
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Receive Fuel</h3>
              <p className="text-muted-foreground">
                Get your fuel delivered and make secure payment
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" className="bg-primary" onClick={() => navigate('/register')}>
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">FleetMaster Inc.</h4>
                  <p className="text-sm text-muted-foreground">Fleet Manager</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "This service has saved our company hours of productivity. Now our drivers stay on their routes instead of making detours to refuel."
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Rapid Transit Co.</h4>
                  <p className="text-sm text-muted-foreground">Operations Director</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Fuel On Wheels has helped us streamline our bus operations. The consistent pricing and reliable service is exactly what we needed."
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-muted-foreground">Individual Customer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Got stranded with an empty tank late at night. Fuel On Wheels delivered in under an hour and saved me from a very stressful situation!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fueling Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of customers who've made refueling easier and more efficient.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-secondary hover:bg-secondary/90 text-white"
            onClick={() => navigate('/register')}
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Fuel className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Fuel On Wheels</span>
              </div>
              <p className="text-muted-foreground">
                Delivering fuel directly to your location, whenever you need it.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Home</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</a></li>
                <li><a href="#testimonials" className="text-muted-foreground hover:text-primary">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Get In Touch</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">support@fuelonwheels.com</li>
                <li className="text-muted-foreground">+1 (555) 123-4567</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} Fuel On Wheels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
