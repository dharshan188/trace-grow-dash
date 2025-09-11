import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TimelineView } from "@/components/TimelineView";
import { 
  Scan, 
  Shield, 
  DollarSign, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  Star,
  Users,
  Leaf,
  Clock,
  Search
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProductInfo {
  batchId: string;
  farmerName: string;
  cropType: string;
  harvestDate: string;
  location: string;
  aiGrade: string;
  verified: boolean;
  tampered: boolean;
  priceBreakdown: {
    farmer: number;
    transport: number;
    retailer: number;
  };
}

export default function ConsumerVerification() {
  const [batchId, setBatchId] = useState("");
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const mockTimelineEvents = [
    {
      id: "1",
      stage: "farm" as const,
      title: "Crop Harvested",
      description: "Organic tomatoes harvested by certified farmer",
      timestamp: "2025-01-08 06:30 AM",
      location: "Green Valley Farm, Karnataka",
      temperature: 22,
      humidity: 65,
      verified: true
    },
    {
      id: "2", 
      stage: "aggregator" as const,
      title: "Quality Assessment",
      description: "AI grading completed, Grade A quality verified",
      timestamp: "2025-01-08 10:15 AM",
      location: "Regional Collection Center",
      temperature: 18,
      humidity: 70,
      verified: true
    },
    {
      id: "3",
      stage: "transport" as const,
      title: "In Transit",
      description: "Cold chain maintained during transportation",
      timestamp: "2025-01-09 02:20 PM",
      location: "Highway Transport Hub",
      temperature: 15,
      humidity: 75,
      verified: true
    },
    {
      id: "4",
      stage: "retailer" as const,
      title: "Retail Display",
      description: "Product available for consumer purchase",
      timestamp: "2025-01-10 08:45 AM", 
      location: "Fresh Mart, Bangalore",
      verified: true,
      anomaly: false
    }
  ];

  const handleScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      setProductInfo({
        batchId: batchId || "FB-DEMO123",
        farmerName: "Raj Kumar Singh",
        cropType: "Organic Tomatoes",
        harvestDate: "2025-01-08",
        location: "Green Valley Farm, Karnataka",
        aiGrade: "Grade A",
        verified: true,
        tampered: false,
        priceBreakdown: {
          farmer: 45,
          transport: 25,
          retailer: 30
        }
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleManualEntry = () => {
    if (batchId.trim()) {
      handleScan();
    }
  };

  const priceData = productInfo ? [
    { name: 'Farmer', value: productInfo.priceBreakdown.farmer, color: '#0D7377' },
    { name: 'Transport', value: productInfo.priceBreakdown.transport, color: '#14FFEC' },
    { name: 'Retailer', value: productInfo.priceBreakdown.retailer, color: '#323232' }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">
            Consumer Verification Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            Scan QR codes to verify product authenticity and trace its journey
          </p>
        </div>

        {!productInfo ? (
          /* Scanner Interface */
          <Card className="glass-card animate-scale-in max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center">
                <Scan className="mr-3 h-6 w-6 text-primary" />
                Product Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* QR Scanner */}
                <div className="text-center">
                  <div className={`border-4 border-dashed ${isScanning ? 'border-accent animate-glow-pulse' : 'border-muted'} rounded-xl p-12 mb-6 transition-all duration-300`}>
                    <Scan className={`h-20 w-20 mx-auto mb-4 ${isScanning ? 'text-accent animate-bounce-gentle' : 'text-muted-foreground'}`} />
                    {isScanning ? (
                      <div className="space-y-3">
                        <div className="text-xl font-semibold text-accent">Verifying Product...</div>
                        <div className="scan-line h-2 bg-accent/30 rounded-full"></div>
                        <p className="text-sm text-muted-foreground">Checking blockchain records</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Scan Product QR Code</h3>
                        <p className="text-muted-foreground">
                          Point your camera at the QR code on the product
                        </p>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleScan}
                    disabled={isScanning}
                    className="gradient-primary text-white hover-glow px-8 py-4 text-lg mb-6"
                  >
                    {isScanning ? "Scanning..." : "Start Camera Scan"}
                  </Button>
                </div>

                {/* Manual Entry */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground">
                      Or enter Batch ID manually
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Input 
                    placeholder="Enter Batch ID (e.g., FB-ABC123)"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="flex-1 hover-lift"
                  />
                  <Button 
                    onClick={handleManualEntry}
                    disabled={!batchId.trim() || isScanning}
                    className="gradient-accent text-accent-foreground"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Verification Results */
          <div className="space-y-8">
            
            {/* Verification Status */}
            <Card className={`glass-card animate-scale-in ${productInfo.verified ? 'border-green-200' : 'border-red-200'}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl ${productInfo.verified ? 'gradient-primary' : 'bg-destructive'}`}>
                      {productInfo.verified ? (
                        <CheckCircle className="h-8 w-8 text-white" />
                      ) : (
                        <AlertTriangle className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gradient-primary">
                        {productInfo.verified ? "✅ Verified Product" : "⚠️ Verification Failed"}
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        Batch ID: <span className="font-mono text-primary">{productInfo.batchId}</span>
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setProductInfo(null)}
                    variant="outline"
                    className="glass-button"
                  >
                    Scan New Product
                  </Button>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-4 text-center">
                      <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-sm text-green-700 font-medium">Farmer</div>
                      <div className="text-lg font-bold text-green-800">{productInfo.farmerName}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4 text-center">
                      <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm text-blue-700 font-medium">AI Grade</div>
                      <div className="text-lg font-bold text-blue-800">{productInfo.aiGrade}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="pt-4 text-center">
                      <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm text-purple-700 font-medium">Origin</div>
                      <div className="text-lg font-bold text-purple-800">{productInfo.location}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="pt-4 text-center">
                      <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-sm text-orange-700 font-medium">Harvest Date</div>
                      <div className="text-lg font-bold text-orange-800">{productInfo.harvestDate}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Timeline */}
              <div className="lg:col-span-2">
                <TimelineView 
                  events={mockTimelineEvents}
                  batchId={productInfo.batchId}
                />
              </div>

              {/* Price Transparency */}
              <div className="space-y-6">
                <Card className="glass-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-primary" />
                      Price Transparency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={priceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {priceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                      {priceData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <span className="text-lg font-bold">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Score */}
                <Card className="glass-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      Trust Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold text-gradient-primary mb-2">98</div>
                      <div className="text-sm text-muted-foreground">out of 100</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Blockchain Verified</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Location Verified</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cold Chain Maintained</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">No Tampering Detected</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}