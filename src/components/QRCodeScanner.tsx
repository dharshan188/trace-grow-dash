import { useEffect, useRef } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanFailure?: (error: any) => void;
}

export function QRCodeScanner({ onScanSuccess, onScanFailure }: QRCodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const qrCodeScanner = new Html5Qrcode(containerRef.current.id);
    scannerRef.current = qrCodeScanner;

    const startScanner = async () => {
      try {
        await qrCodeScanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          onScanSuccess,
          (errorMessage) => {
            if (onScanFailure) {
              onScanFailure(errorMessage);
            }
          }
        );
      } catch (err) {
        console.error("Error starting QR code scanner:", err);
        if (onScanFailure) {
          onScanFailure(err);
        }
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current && scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
        scannerRef.current.stop().catch((err) => {
          console.error("Failed to stop the scanner.", err);
        });
      }
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <Card className="p-4 bg-background/50 backdrop-blur-sm">
      <div id="qr-reader" ref={containerRef} className="w-full rounded-lg overflow-hidden" />
    </Card>
  );
}
