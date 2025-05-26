
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2 } from "lucide-react";

export const EventsSection = () => {
  const activeEvents = [
    {
      id: 1,
      title: "Database Maintenance",
      type: "maintenance",
      status: "in-progress",
      startTime: "2024-01-15 14:00",
      endTime: "2024-01-15 16:00",
      impact: "low"
    },
    {
      id: 2,
      title: "API Rate Limit Issue",
      type: "incident",
      status: "investigating",
      startTime: "2024-01-15 15:30",
      impact: "medium"
    }
  ];

  const plannedEvents = [
    {
      id: 3,
      title: "Security Update Deployment",
      type: "release",
      scheduledTime: "2024-01-16 02:00",
      duration: "30 minutes",
      impact: "none"
    },
    {
      id: 4,
      title: "Load Balancer Upgrade",
      type: "maintenance",
      scheduledTime: "2024-01-17 10:00",
      duration: "2 hours",
      impact: "low"
    }
  ];

  const getEventBadge = (type: string) => {
    const variants = {
      maintenance: "bg-blue-100 text-blue-800",
      incident: "bg-red-100 text-red-800",
      release: "bg-green-100 text-green-800",
    };
    
    return (
      <Badge className={variants[type as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "in-progress": "bg-yellow-100 text-yellow-800",
      investigating: "bg-orange-100 text-orange-800",
      resolved: "bg-green-100 text-green-800",
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Active Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Active Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg bg-white">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {getEventBadge(event.type)}
                  {getStatusBadge(event.status)}
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Started: {event.startTime}</p>
                  {event.endTime && <p>Expected end: {event.endTime}</p>}
                  <p>Impact: {event.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planned Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Planned Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plannedEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg bg-white">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mb-3">
                  {getEventBadge(event.type)}
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Scheduled: {event.scheduledTime}</p>
                  <p>Duration: {event.duration}</p>
                  <p>Expected impact: {event.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
