import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { 
  Leaf, 
  Camera, 
  Upload, 
  CheckCircle, 
  Star,
  MapPin,
  Calendar,
  Printer,
  RefreshCw
} from "lucide-react";

export default function FarmerPortal() {
  const [formData, setFormData] = useState({
    farmerName: "",
    cropType: "",
    location: "",
    harvestDate: "",
    quantity: "",
  });
  
  const [step, setStep] = useState<"form" | "photo" | "qr">("form");
  const [batchId, setBatchId] = useState("");
  const [aiGrading, setAiGrading] = useState<{
    grade: string;
    defects: string;
    confidence: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate batch ID
    const id = `FB-${Date.now().toString(36).toUpperCase()}`;
    setBatchId(id);
    setStep("photo");
  };

  const handlePhotoUpload = () => {
    // Mock AI grading
    setAiGrading({
      grade: "Grade A",
      defects: "2% surface defects detected",
      confidence: 94.3
    });
    setTimeout(() => setStep("qr"), 1000);
  };

  const handlePrintQR = () => {
    window.print();
  };

  const cropOptions = [
    "Rice", "Wheat", "Tomatoes", "Onions", "Potatoes", "Carrots", "Apples", "Mangoes"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Leaf className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">
            Farmer Registration Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            Register your crops and generate blockchain-verified QR codes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {["Registration", "AI Grading", "QR Generation"].map((label, index) => {
              const stepIndex = ["form", "photo", "qr"].indexOf(step);
              const isActive = index === stepIndex;
              const isCompleted = index < stepIndex;
              
              return (
                <div key={label} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    isCompleted 
                      ? "gradient-primary text-white border-primary" 
                      : isActive 
                        ? "border-primary text-primary bg-primary/10" 
                        : "border-muted text-muted-foreground"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? "text-primary" : isCompleted ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {label}
                  </span>
                  {index < 2 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        {step === "form" && (
          <Card className="glass-card animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Leaf className="mr-3 h-6 w-6 text-primary" />
                Crop Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="farmerName">Farmer Name *</Label>
                    <Input
                      id="farmerName"
                      value={formData.farmerName}
                      onChange={(e) => setFormData({...formData, farmerName: e.target.value})}
                      placeholder="Enter your full name"
                      required
                      className="hover-lift"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type *</Label>
                    <select
                      id="cropType"
                      value={formData.cropType}
                      onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                      className="w-full p-3 border border-input rounded-lg bg-background hover-lift"
                      required
                    >
                      <option value="">Select crop type</option>
                      {cropOptions.map((crop) => (
                        <option key={crop} value={crop}>{crop}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Farm Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="City, State"
                        className="pl-10 hover-lift"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="harvestDate"
                        type="date"
                        value={formData.harvestDate}
                        onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                        className="pl-10 hover-lift"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="quantity">Quantity (kg) *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      placeholder="Enter quantity in kg"
                      min="1"
                      className="hover-lift"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary text-white hover-glow py-6 text-lg"
                  disabled={!formData.farmerName || !formData.cropType || !formData.location}
                >
                  Register Crop & Generate Batch ID
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "photo" && (
          <Card className="glass-card animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Camera className="mr-3 h-6 w-6 text-primary" />
                AI Quality Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="border-2 border-dashed border-accent/50 rounded-xl p-12 hover-lift">
                <Camera className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload Crop Photo</h3>
                <p className="text-muted-foreground mb-6">
                  Our AI will analyze your crop quality and assign a grade
                </p>
                
                <Button 
                  onClick={handlePhotoUpload}
                  className="gradient-accent text-accent-foreground hover-glow"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>

              {aiGrading && (
                <div className="animate-fade-in">
                  <Card className="gradient-primary text-white">
                    <CardContent className="pt-6 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <Star className="h-8 w-8 text-yellow-300 mr-2" />
                        <span className="text-2xl font-bold">{aiGrading.grade}</span>
                      </div>
                      <p className="text-lg mb-2">{aiGrading.defects}</p>
                      <Badge className="bg-white/20 text-white">
                        {aiGrading.confidence}% Confidence
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === "qr" && (
          <div className="space-y-6 animate-scale-in">
            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gradient-primary">
                  🎉 Registration Complete!
                </CardTitle>
                <p className="text-muted-foreground">
                  Your crop has been registered on the blockchain. Here's your QR code:
                </p>
              </CardHeader>
              <CardContent className="flex justify-center">
                <QRCodeDisplay
                  batchId={batchId}
                  farmerName={formData.farmerName}
                  cropType={formData.cropType}
                  location={formData.location}
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={handlePrintQR}
                className="gradient-primary text-white hover-glow"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print QR Label
              </Button>
              
              <Button 
                onClick={() => {
                  setStep("form");
                  setFormData({
                    farmerName: "",
                    cropType: "",
                    location: "",
                    harvestDate: "",
                    quantity: "",
                  });
                  setBatchId("");
                  setAiGrading(null);
                }}
                variant="outline"
                className="glass-button"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Register New Batch
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}