
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Clock, User, Calendar, FileText, Server, Building, Layers, ArrowRight } from "lucide-react";

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
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "update":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolution":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date} ${time}`);
    return {
      weekday: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
      date: dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {getTypeLabel(entityType)} Timeline (Latest First)
                </DialogTitle>
                <div className="text-sm text-gray-500 mt-1">
                  {entityTitle} • ID: {entityId}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs font-medium">
              {timelineEvents.length} Events
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const dateTime = formatDateTime(event.date, event.time);
              
              return (
                <div key={event.id} className="relative group">
                  {/* Timeline Line */}
                  {index < timelineEvents.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 group-hover:bg-gray-300 transition-colors"></div>
                  )}
                  
                  {/* Event Card */}
                  <div className="flex items-start space-x-4">
                    {/* Timeline Node */}
                    <div className={`relative z-10 w-12 h-12 rounded-full border-2 ${event.borderColor} ${event.bgColor} flex items-center justify-center shadow-sm`}>
                      <IconComponent className={`h-5 w-5 ${event.iconColor}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={`${getEventTypeColor(event.type)} font-medium text-xs`}>
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                              <Badge className={`${getSeverityColor(event.severity)} font-medium text-xs`}>
                                {getSeverityLabel(event.severity)}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.description}</p>
                          </div>
                          
                          {/* Date/Time */}
                          <div className="text-right ml-4 flex-shrink-0">
                            <div className="flex items-center space-x-1 text-xs text-gray-500 mb-1">
                              <Calendar className="h-3 w-3" />
                              <span>{dateTime.weekday}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">{dateTime.date}</div>
                            <div className="text-xs text-gray-500">{dateTime.time}</div>
                          </div>
                        </div>
                        
                        {/* Details */}
                        <div className="bg-gray-50 rounded-md p-4 mb-4">
                          <p className="text-sm text-gray-700 leading-relaxed">{event.details}</p>
                        </div>
                        
                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="text-xs text-gray-500">Reporter</div>
                              <div className="text-sm font-medium text-gray-900">{event.author}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="text-xs text-gray-500">Domain</div>
                              <div className="text-sm font-medium text-gray-900">{event.domain}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Layers className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="text-xs text-gray-500">Environment</div>
                              <div className="text-sm font-medium text-gray-900">{event.tenancy}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Server className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="text-xs text-gray-500">System</div>
                              <div className="text-sm font-medium text-gray-900">{event.system}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Impact */}
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                          <div className="flex items-center space-x-2">
                            <ArrowRight className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Impact:</span>
                            <span className="text-sm text-blue-800">{event.impact}</span>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">{event.authorRole}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {event.systemType}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
