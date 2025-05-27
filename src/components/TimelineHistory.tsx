
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Filter } from "lucide-react";

export const TimelineHistory = () => {
  const timelineEvents = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      type: "incident",
      title: "Back of House Front of House API",
      description: "NZ",
      status: "resolved",
      details: "List APPU API Was it being hit?"
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "12:15",
      type: "maintenance",
      title: "Database Maintenance",
      description: "Scheduled maintenance window",
      status: "completed"
    },
    {
      id: 3,
      date: "2024-01-14",
      time: "09:45",
      type: "release",
      title: "Feature Deployment",
      description: "New customer portal features",
      status: "successful"
    },
    {
      id: 4,
      date: "2024-01-14",
      time: "16:20",
      type: "incident",
      title: "Authentication Service",
      description: "Login delays reported",
      status: "resolved"
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "incident":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-blue-100 text-blue-800";
      case "release":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Timeline History of Events</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Timeline Content */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start space-x-4">
                  {/* Timeline Dot */}
                  <div className="relative">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {event.date} at {event.time}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    
                    {event.details && (
                      <p className="text-sm text-gray-500">{event.details}</p>
                    )}
                    
                    {event.status && (
                      <Badge variant="outline" className="mt-2">
                        {event.status}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Events</Button>
      </div>
    </div>
  );
};
