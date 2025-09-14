import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Download, Copy, CheckCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeDisplayProps {
  batchId: string;
  farmerName: string;
  cropType: string;
  location: string;
  size?: number;
}

export function QRCodeDisplay({
  batchId,
  farmerName,
  cropType,
  location,
  size = 200,
}: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const qrValue = JSON.stringify({
    batchId,
    farmerName,
    cropType,
    location,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(batchId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const canvas = qrCodeRef.current?.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = `qr-${batchId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <Card className="p-6 text-center hover-lift">
      <div className="flex flex-col items-center space-y-4">
        {/* QR Code Visual */}
        <div className="relative" ref={qrCodeRef}>
          <div className="p-4 bg-white rounded-xl shadow-medium border-2 border-accent/20">
            <QRCodeCanvas
              value={qrValue}
              size={size}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
            />
          </div>
          {/* Animated scan line overlay */}
          <div className="absolute inset-0 scan-line rounded-xl pointer-events-none" />
        </div>

        {/* Batch Information */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gradient-primary">
            Batch ID: {batchId}
          </h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Farmer:</strong> {farmerName}</p>
            <p><strong>Crop:</strong> {cropType}</p>
            <p><strong>Location:</strong> {location}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="hover-lift"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy ID"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="hover-lift"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        {/* QR Icon indicator */}
        <div className="flex items-center text-xs text-muted-foreground">
          <QrCode className="h-4 w-4 mr-1" />
          Scan with any QR reader
        </div>
      </div>
    </Card>
  );
}