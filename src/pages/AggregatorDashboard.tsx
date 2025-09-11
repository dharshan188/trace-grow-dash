import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Scan, 
  Thermometer, 
  Droplets, 
  MapPin, 
  Clock, 
  Truck,
  CheckCircle,
  AlertTriangle,
  Cloud,
  Activity,
  Upload
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScanResult {
  batchId: string;
  farmerName: string;
  cropType: string;
  status: "verified" | "warning" | "error";
}

export default function AggregatorDashboard() {
  const [scannedBatch, setScannedBatch] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temperature: 24,
    humidity: 68,
    weather: "Partly Cloudy"
  });

  // Mock temperature data for the last 24 hours
  const temperatureData = [
    { time: '00:00', temp: 18, humidity: 75 },
    { time: '03:00', temp: 16, humidity: 80 },
    { time: '06:00', temp: 19, humidity: 72 },
    { time: '09:00', temp: 22, humidity: 65 },
    { time: '12:00', temp: 26, humidity: 58 },
    { time: '15:00', temp: 28, humidity: 55 },
    { time: '18:00', temp: 25, humidity: 62 },
    { time: '21:00', temp: 21, humidity: 70 },
  ];

  const recentEvents = [
    { id: 1, batchId: "FB-ABC123", action: "Quality Check", timestamp: "10:30 AM", status: "completed" },
    { id: 2, batchId: "FB-DEF456", action: "Temperature Log", timestamp: "10:15 AM", status: "completed" },
    { id: 3, batchId: "FB-GHI789", action: "Location Update", timestamp: "09:45 AM", status: "pending" },
    { id: 4, batchId: "FB-JKL012", action: "Weather Log", timestamp: "09:30 AM", status: "completed" },
  ];

  const handleQRScan = () => {
    setIsScanning(true);
    // Mock QR scan delay
    setTimeout(() => {
      setScannedBatch({
        batchId: "FB-" + Math.random().toString(36).substr(2, 8).toUpperCase(),
        farmerName: "Raj Kumar",
        cropType: "Organic Tomatoes",
        status: "verified"
      });
      setIsScanning(false);
    }, 2000);
  };

  const logEvent = (action: string) => {
    // Mock event logging
    console.log(`Logged: ${action} for batch ${scannedBatch?.batchId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="gradient-accent w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Truck className="h-10 w-10 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">
            Aggregator Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Scan QR codes, log events, and monitor supply chain conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* QR Scanner Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scan className="mr-3 h-6 w-6 text-primary" />
                  QR Code Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className={`border-4 border-dashed ${isScanning ? 'border-accent animate-glow-pulse' : 'border-muted'} rounded-xl p-12 transition-all duration-300`}>
                      <Scan className={`h-16 w-16 mx-auto mb-4 ${isScanning ? 'text-accent animate-bounce-gentle' : 'text-muted-foreground'}`} />
                      {isScanning ? (
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-accent">Scanning QR Code...</div>
                          <div className="scan-line h-1 bg-accent/30 rounded"></div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Scan Product QR Code</h3>
                          <p className="text-muted-foreground">
                            Position the QR code within the scanner area
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={handleQRScan}
                    disabled={isScanning}
                    className="gradient-accent text-accent-foreground hover-glow"
                  >
                    {isScanning ? "Scanning..." : "Start QR Scan"}
                  </Button>

                  {/* Scanned Result */}
                  {scannedBatch && (
                    <Card className="animate-fade-in gradient-primary text-white">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold">Batch Verified!</h4>
                            <p className="text-white/80">ID: {scannedBatch.batchId}</p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-green-300" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Farmer:</strong> {scannedBatch.farmerName}
                          </div>
                          <div>
                            <strong>Crop:</strong> {scannedBatch.cropType}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Temperature Monitoring */}
            <Card className="glass-card animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-3 h-6 w-6 text-primary" />
                  Environmental Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="humidity" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {scannedBatch && (
                  <div className="grid grid-cols-3 gap-4">
                    <Button 
                      onClick={() => logEvent("Temperature Log")}
                      className="glass-button flex-col h-16"
                    >
                      <Thermometer className="h-5 w-5 mb-1" />
                      Log Temperature
                    </Button>
                    
                    <Button 
                      onClick={() => logEvent("Weather Update")}
                      className="glass-button flex-col h-16"
                    >
                      <Cloud className="h-5 w-5 mb-1" />
                      Weather Log
                    </Button>
                    
                    <Button 
                      onClick={() => logEvent("Location Update")}
                      className="glass-button flex-col h-16"
                    >
                      <MapPin className="h-5 w-5 mb-1" />
                      Update Location
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Weather & Events */}
          <div className="space-y-6">
            
            {/* Current Weather */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Cloud className="mr-2 h-5 w-5 text-primary" />
                  Current Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient-primary mb-2">
                      {weatherData.temperature}°C
                    </div>
                    <p className="text-muted-foreground">{weatherData.weather}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Thermometer className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-sm font-medium">Temperature</div>
                      <div className="text-lg font-bold">{weatherData.temperature}°C</div>
                    </div>
                    
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-sm font-medium">Humidity</div>
                      <div className="text-lg font-bold">{weatherData.humidity}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Recent Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover-lift">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          event.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium">{event.action}</div>
                          <div className="text-xs text-muted-foreground">{event.batchId}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{event.timestamp}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start glass-button">
                    <Upload className="mr-2 h-4 w-4" />
                    Batch Upload
                  </Button>
                  
                  <Button className="w-full justify-start glass-button">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Issue
                  </Button>
                  
                  <Button className="w-full justify-start glass-button">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Quality Check
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