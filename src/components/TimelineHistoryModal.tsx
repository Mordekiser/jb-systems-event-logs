
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Clock, User, Calendar, FileText, Server, Building, Layers } from "lucide-react";

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
        title: "Issue Resolved",
        description: `${entityTitle} - Final resolution completed`,
        details: "The issue has been fully mitigated. All systems are operating normally and monitoring confirms stable performance.",
        author: "System Admin",
        authorRole: "Infrastructure Team",
        icon: CheckCircle,
        iconColor: "text-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        type: "resolution",
        impact: "System restored to full functionality",
        domain: "Front of House",
        tenancy: "Production",
        system: "Payment Gateway",
        systemType: "Application",
        severity: 1
      },
      {
        id: 2,
        date: "2024-01-15",
        time: "12:15",
        title: "Investigation Progress",
        description: `${entityTitle} - Root cause identified`,
        details: "Engineering team has successfully identified the root cause as a database connection pool exhaustion. Implementing connection pool scaling and failover mechanisms.",
        author: "John Smith",
        authorRole: "Senior Engineer",
        icon: Clock,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        type: "update",
        impact: "Mitigation strategies in progress",
        domain: "Back of House",
        tenancy: "Staging",
        system: "Customer Database API",
        systemType: "API",
        severity: 2
      },
      {
        id: 3,
        date: "2024-01-15",
        time: "09:45",
        title: "Initial Detection",
        description: `${entityTitle} - Anomaly detected by monitoring`,
        details: "Automated monitoring systems detected elevated response times and error rates. Alert triggered and on-call team notified immediately. Investigation commenced.",
        author: "Monitoring System",
        authorRole: "Automated System",
        icon: AlertTriangle,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        type: "detection",
        impact: "Service degradation identified",
        domain: "Core Retail",
        tenancy: "Production",
        system: "Inventory Management",
        systemType: "Application",
        severity: 3
      }
    ];

    // Customize events based on entity type
    if (entityType === "azure") {
      return baseEvents.map(event => ({
        ...event,
        details: `Azure AppInsights: ${event.details}`,
        authorRole: event.authorRole === "Automated System" ? "Azure Monitor" : event.authorRole
      }));
    }

    if (entityType === "alert") {
      return baseEvents.map(event => ({
        ...event,
        details: `Alert System: ${event.details}`,
        authorRole: event.authorRole === "Automated System" ? "Alert Engine" : event.authorRole
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

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-red-100 text-red-800 border-red-200";
      case 2:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 3:
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityLabel = (severity: number) => {
    switch (severity) {
      case 1:
        return "Critical";
      case 2:
        return "High";
      case 3:
        return "Medium";
      default:
        return "Unknown";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <span>Timeline History</span>
              </DialogTitle>
              <div className="text-sm text-gray-600 mt-1">
                {getTypeLabel(entityType)} • {entityTitle} • ID: {entityId}
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {timelineEvents.length} Events
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-1">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-gray-200 to-gray-100"></div>
            
            <div className="space-y-8 relative">
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div key={event.id} className="relative">
                    {/* Timeline Node */}
                    <div className="absolute left-6 z-10">
                      <div className={`w-4 h-4 rounded-full border-2 ${event.borderColor} ${event.bgColor} flex items-center justify-center`}>
                        <div className={`w-2 h-2 rounded-full ${event.iconColor.replace('text-', 'bg-')}`}></div>
                      </div>
                    </div>
                    
                    {/* Event Card */}
                    <div className="ml-16">
                      <div className={`rounded-lg border ${event.borderColor} ${event.bgColor} p-6 shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${event.bgColor} border ${event.borderColor}`}>
                              <IconComponent className={`h-5 w-5 ${event.iconColor}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
                              <p className="text-sm text-gray-600">{event.description}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                            <Badge className={getSeverityColor(event.severity)}>
                              Severity {event.severity} - {getSeverityLabel(event.severity)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            <div>
                              <span className="font-medium">{event.author}</span>
                              <div className="text-xs text-gray-500">{event.authorRole}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <div>
                              <span className="font-medium">{event.date}</span>
                              <div className="text-xs text-gray-500">{event.time}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Building className="h-4 w-4" />
                            <div>
                              <span className="font-medium">{event.domain}</span>
                              <div className="text-xs text-gray-500">Domain</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Layers className="h-4 w-4" />
                            <div>
                              <span className="font-medium">{event.tenancy}</span>
                              <div className="text-xs text-gray-500">Tenancy</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Server className="h-4 w-4" />
                            <div>
                              <span className="font-medium">{event.system}</span>
                              <div className="text-xs text-gray-500">{event.systemType}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Details</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{event.details}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Impact</h4>
                            <p className="text-sm text-gray-600">{event.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t pt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline">
            Export Timeline
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
