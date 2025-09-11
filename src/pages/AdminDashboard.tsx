import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Search, 
  Download, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Leaf,
  Package,
  Shield,
  MapPin,
  Calendar,
  Filter,
  RefreshCw
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';

interface AnomalyItem {
  id: string;
  batchId: string;
  type: "price_jump" | "weather_anomaly" | "geo_mismatch";
  description: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
  farmerName: string;
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data for charts
  const batchDistribution = [
    { month: 'Jan', batches: 1240, verified: 1180 },
    { month: 'Feb', batches: 1360, verified: 1290 },
    { month: 'Mar', batches: 1480, verified: 1420 },
    { month: 'Apr', batches: 1620, verified: 1580 },
    { month: 'May', batches: 1580, verified: 1540 },
    { month: 'Jun', batches: 1720, verified: 1690 },
  ];

  const cropDistribution = [
    { name: 'Rice', value: 35, color: '#0D7377' },
    { name: 'Wheat', value: 25, color: '#14FFEC' },
    { name: 'Tomatoes', value: 20, color: '#323232' },
    { name: 'Others', value: 20, color: '#808080' }
  ];

  const profitMargins = [
    { crop: 'Rice', farmer: 45, transport: 25, retailer: 30 },
    { crop: 'Wheat', farmer: 40, transport: 30, retailer: 30 },
    { crop: 'Tomatoes', farmer: 50, transport: 20, retailer: 30 },
    { crop: 'Onions', farmer: 42, transport: 28, retailer: 30 },
  ];

  const anomalies: AnomalyItem[] = [
    {
      id: "1",
      batchId: "FB-ABC123",
      type: "price_jump",
      description: "Price increased 340% from farm to retail",
      severity: "high",
      timestamp: "2025-01-11 14:30",
      farmerName: "Raj Kumar"
    },
    {
      id: "2", 
      batchId: "FB-DEF456",
      type: "geo_mismatch",
      description: "Location verification failed - possible tampering",
      severity: "high",
      timestamp: "2025-01-11 12:15",
      farmerName: "Priya Sharma"
    },
    {
      id: "3",
      batchId: "FB-GHI789", 
      type: "weather_anomaly",
      description: "Temperature spike detected during transport",
      severity: "medium",
      timestamp: "2025-01-11 09:45",
      farmerName: "Amit Singh"
    }
  ];

  const stats = [
    { label: "Total Batches", value: "12,847", change: "+12%", icon: Package, color: "text-blue-600" },
    { label: "Active Farmers", value: "2,341", change: "+8%", icon: Users, color: "text-green-600" },
    { label: "Verified Products", value: "11,986", change: "+15%", icon: Shield, color: "text-purple-600" },
    { label: "Anomalies Detected", value: "45", change: "-5%", icon: AlertTriangle, color: "text-red-600" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAnomalyIcon = (type: string) => {
    switch (type) {
      case "price_jump": return "💰";
      case "geo_mismatch": return "📍";
      case "weather_anomaly": return "🌡️";
      default: return "⚠️";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Monitor supply chain analytics and detect anomalies
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button className="gradient-primary text-white hover-glow">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" className="glass-button">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="glass-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-gradient-primary">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-muted/50`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Batch Distribution Chart */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Batch Distribution Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={batchDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="batches" fill="hsl(var(--primary))" radius={4} />
                      <Bar dataKey="verified" fill="hsl(var(--accent))" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Profit Margin Analysis */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Profit Margin Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitMargins} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                      <YAxis type="category" dataKey="crop" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="farmer" stackId="a" fill="hsl(var(--primary))" />
                      <Bar dataKey="transport" stackId="a" fill="hsl(var(--accent))" />
                      <Bar dataKey="retailer" stackId="a" fill="hsl(var(--secondary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Batch Search */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5 text-primary" />
                  Batch Search & Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <Input 
                    placeholder="Search by Batch ID, Farmer, or Crop..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 hover-lift"
                  />
                  
                  <select 
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-input rounded-lg bg-background hover-lift"
                  >
                    <option value="all">All Batches</option>
                    <option value="verified">Verified Only</option>
                    <option value="pending">Pending Verification</option>
                    <option value="flagged">Flagged Items</option>
                  </select>
                  
                  <Button className="gradient-accent text-accent-foreground">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Anomalies & Insights */}
          <div className="space-y-6">
            
            {/* Crop Distribution */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-primary" />
                  Crop Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cropDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {cropDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  {cropDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Anomaly Detection */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                    Anomaly Detection
                  </div>
                  <Badge className="bg-red-100 text-red-800">
                    {anomalies.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {anomalies.map((anomaly) => (
                    <div key={anomaly.id} className="p-4 border border-border/50 rounded-lg hover-lift">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getAnomalyIcon(anomaly.type)}</span>
                          <Badge className={getSeverityColor(anomaly.severity)}>
                            {anomaly.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{anomaly.timestamp}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="font-semibold text-sm">Batch: {anomaly.batchId}</p>
                        <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                        <p className="text-xs text-muted-foreground">Farmer: {anomaly.farmerName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start gradient-primary text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export Full Report
                  </Button>
                  
                  <Button className="w-full justify-start glass-button">
                    <MapPin className="mr-2 h-4 w-4" />
                    Geo Analysis
                  </Button>
                  
                  <Button className="w-full justify-start glass-button">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Audit
                  </Button>
                  
                  <Button className="w-full justify-start glass-button">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Flag Investigation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}