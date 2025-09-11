import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Leaf, 
  QrCode, 
  BarChart3, 
  Users, 
  MapPin, 
  Truck,
  Store,
  CheckCircle,
  Zap,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export default function Homepage() {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable records ensure complete transparency from farm to fork.",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: QrCode,
      title: "QR Code Tracking",
      description: "Instant verification with any smartphone camera.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics", 
      description: "Live monitoring and anomaly detection across the supply chain.",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: MapPin,
      title: "Geo-location Verification",
      description: "GPS tracking prevents tampering and ensures authenticity.",
      color: "text-orange-600 bg-orange-100"
    }
  ];

  const userTypes = [
    {
      title: "Farmers",
      icon: Leaf,
      description: "Register crops and generate QR codes",
      features: ["Crop registration", "QR generation", "AI quality grading"],
      href: "/farmer",
      gradient: "gradient-primary"
    },
    {
      title: "Aggregators",
      icon: Truck,
      description: "Track and log supply chain events",
      features: ["QR scanning", "Weather logging", "Event tracking"],
      href: "/aggregator", 
      gradient: "gradient-accent"
    },
    {
      title: "Consumers",
      icon: Users,
      description: "Verify product authenticity and journey",
      features: ["Product verification", "Journey timeline", "Price transparency"],
      href: "/consumer",
      gradient: "gradient-primary"
    },
    {
      title: "Administrators",
      icon: Store,
      description: "Monitor and audit the entire ecosystem", 
      features: ["Analytics dashboard", "Anomaly detection", "Export reports"],
      href: "/admin",
      gradient: "gradient-accent"
    }
  ];

  const stats = [
    { label: "Verified Batches", value: "12,847", icon: CheckCircle },
    { label: "Active Farmers", value: "2,341", icon: Leaf },
    { label: "Supply Chain Events", value: "156,932", icon: Zap },
    { label: "Consumer Scans", value: "89,245", icon: QrCode }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/10">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="animate-fade-in">
              <Badge className="gradient-accent text-accent-foreground mb-6 text-sm px-4 py-2">
                🚀 Revolutionizing Food Transparency
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient-primary">Farm-to-Fork</span>
                <br />
                <span className="text-foreground">Transparency</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Complete supply chain visibility through blockchain technology, AI-powered quality assessment, 
                and real-time tracking. Ensure food safety and authenticity at every step.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/farmer">
                  <Button size="lg" className="gradient-primary text-white hover-glow px-8 py-4 text-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/consumer">
                  <Button variant="outline" size="lg" className="glass-button px-8 py-4 text-lg">
                    <QrCode className="mr-2 h-5 w-5" />
                    Verify Product
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden shadow-strong hover-lift">
                <img 
                  src={heroImage} 
                  alt="Farm-to-Fork Supply Chain Journey" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 gradient-accent p-4 rounded-2xl shadow-glow animate-bounce-gentle">
                <Shield className="h-8 w-8 text-accent-foreground" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 gradient-primary p-4 rounded-2xl shadow-glow animate-glow-pulse">
                <QrCode className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center glass-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="gradient-primary p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gradient-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets agricultural transparency for a safer food supply chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="glass-card hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              Choose Your Portal
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access role-specific dashboards tailored for each participant in the supply chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Link key={type.title} to={type.href}>
                  <Card className="glass-card hover-lift hover-glow cursor-pointer transition-all duration-500 animate-scale-in group" style={{ animationDelay: `${index * 0.15}s` }}>
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl ${type.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {type.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {type.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {type.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4 group-hover:bg-primary/90 transition-colors">
                        Access Portal
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}