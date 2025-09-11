import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tractor, 
  Truck, 
  Store, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Thermometer,
  Shield,
  AlertTriangle
} from "lucide-react";

interface TimelineEvent {
  id: string;
  stage: "farm" | "aggregator" | "transport" | "retailer";
  title: string;
  description: string;
  timestamp: string;
  location: string;
  temperature?: number;
  humidity?: number;
  verified: boolean;
  anomaly?: boolean;
}

interface TimelineViewProps {
  events: TimelineEvent[];
  batchId: string;
}

const stageIcons = {
  farm: Tractor,
  aggregator: Store,
  transport: Truck,
  retailer: Store,
};

const stageColors = {
  farm: "text-green-600 bg-green-100",
  aggregator: "text-blue-600 bg-blue-100",
  transport: "text-purple-600 bg-purple-100",
  retailer: "text-orange-600 bg-orange-100",
};

export function TimelineView({ events, batchId }: TimelineViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gradient-primary mb-2">
          Supply Chain Journey
        </h2>
        <p className="text-muted-foreground">
          Complete transparency for Batch ID: <span className="font-mono text-primary">{batchId}</span>
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-muted-foreground"></div>

        {/* Events */}
        <div className="space-y-8">
          {events.map((event, index) => {
            const Icon = stageIcons[event.stage];
            return (
              <div key={event.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 rounded-full bg-white border-4 border-accent shadow-medium z-10">
                  <div className="absolute inset-0.5 rounded-full bg-accent animate-glow-pulse"></div>
                </div>

                {/* Event card */}
                <div className="ml-16">
                  <Card className="p-6 hover-lift glass-card">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${stageColors[event.stage]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Status badges */}
                      <div className="flex flex-col items-end space-y-2">
                        {event.verified ? (
                          <Badge className="gradient-primary text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}

                        {event.anomaly && (
                          <Badge variant="destructive" className="animate-glow-pulse">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Anomaly Detected
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>

                      {event.temperature && (
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-4 w-4 text-muted-foreground" />
                          <span>{event.temperature}°C, {event.humidity}% humidity</span>
                        </div>
                      )}
                    </div>

                    {/* Security indicator */}
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        <span>Blockchain verified • Geo-locked • Tamper-proof</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}