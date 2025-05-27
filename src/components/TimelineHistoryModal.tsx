
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, User } from "lucide-react";

interface TimelineHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityType: "alert" | "event" | "azure" | "incident" | "release";
  entityId: string;
  entityTitle: string;
}

export const TimelineHistoryModal = ({ 
  open, 
  onOpenChange, 
  entityType, 
  entityId, 
  entityTitle 
}: TimelineHistoryModalProps) => {
  
  // Mock timeline data based on entity type
  const getTimelineData = () => {
    const baseEvents = [
      {
        id: 1,
        date: "2024-01-15",
        time: "14:30",
        title: "Final update",
        description: `${entityTitle} - Issue resolved`,
        details: "The issue is now fully mitigated. All systems are operating normally.",
        author: "System Admin",
        icon: CheckCircle,
        iconColor: "text-green-500",
        type: "resolution"
      },
      {
        id: 2,
        date: "2024-01-15",
        time: "12:15",
        title: "Update",
        description: `${entityTitle} - Investigation ongoing`,
        details: "Engineering team has identified the root cause and is implementing a fix.",
        author: "Engineering Team",
        icon: Clock,
        iconColor: "text-blue-500",
        type: "update"
      },
      {
        id: 3,
        date: "2024-01-15",
        time: "09:45",
        title: "Initial detection",
        description: `${entityTitle} - Issue detected`,
        details: "Automated monitoring systems detected an anomaly. Investigation started immediately.",
        author: "Monitoring System",
        icon: AlertTriangle,
        iconColor: "text-orange-500",
        type: "detection"
      }
    ];

    // Customize events based on entity type
    if (entityType === "azure") {
      return baseEvents.map(event => ({
        ...event,
        details: `Azure AppInsights: ${event.details}`
      }));
    }

    if (entityType === "alert") {
      return baseEvents.map(event => ({
        ...event,
        details: `Alert System: ${event.details}`
      }));
    }

    return baseEvents;
  };

  const timelineEvents = getTimelineData();

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "alert":
        return "Alert";
      case "event":
        return "Event";
      case "azure":
        return "Azure AppInsight";
      case "incident":
        return "Incident";
      case "release":
        return "Release";
      default:
        return type;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "detection":
        return "bg-red-100 text-red-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "resolution":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Timeline History - {getTypeLabel(entityType)}
          </DialogTitle>
          <div className="text-sm text-gray-600">
            {entityTitle} (ID: {entityId})
          </div>
        </DialogHeader>

        <div className="mt-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Timeline Events</h3>
            <p className="text-sm text-blue-700">
              {timelineEvents.length} event{timelineEvents.length !== 1 ? 's' : ''} recorded
            </p>
          </div>

          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={event.id} className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-b-0">
                  {/* Timeline Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center ${
                      index === 0 ? 'border-green-500' : 'border-gray-300'
                    }`}>
                      <IconComponent className={`h-4 w-4 ${event.iconColor}`} />
                    </div>
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{event.author}</span>
                      <span>•</span>
                      <span>{event.date} at {event.time}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <p className="text-gray-700 leading-relaxed">{event.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
