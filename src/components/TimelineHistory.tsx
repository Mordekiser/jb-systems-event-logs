
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Filter, CheckCircle, AlertTriangle, User, X } from "lucide-react";

interface TimelineFilter {
  statusType?: string;
  tenancy?: string;
  domain?: string;
}

interface TimelineHistoryProps {
  filter?: TimelineFilter;
}

export const TimelineHistory = ({ filter }: TimelineHistoryProps) => {
  const timelineEvents = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      type: "incident",
      statusType: "incidents",
      tenancy: "NZ",
      domain: "Back of House",
      title: "Final update",
      description: "Back of House Front of House API - NZ - List APPU API Was it being hit?",
      status: "resolved",
      details: "The issue is now fully mitigated following SQL team failing over from a faulty DB node. Our engineers will be investigating this further to learn from and reduce the risk of potential recurrences. We apologize for the impact this had on our customers.",
      author: "System Admin",
      icon: CheckCircle,
      iconColor: "text-green-500"
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "12:15",
      type: "maintenance",
      statusType: "healthchecks",
      tenancy: "AU",
      domain: "Front of House",
      title: "Update",
      description: "Database Maintenance - Scheduled maintenance window",
      status: "completed",
      details: "Our engineers identified a problem with one of the SQL databases and are working together with the SQL team to mitigate this issue.",
      author: "System Admin",
      icon: Clock,
      iconColor: "text-blue-500"
    },
    {
      id: 3,
      date: "2024-01-14",
      time: "09:45",
      type: "release",
      statusType: "releases",
      tenancy: "NZ",
      domain: "Data Services",
      title: "Update",
      description: "Feature Deployment - New customer portal features",
      status: "successful",
      details: "Our engineers are working to understand and mitigate the issue.",
      author: "System Admin",
      icon: Clock,
      iconColor: "text-blue-500"
    },
    {
      id: 4,
      date: "2024-01-14",
      time: "16:20",
      type: "incident",
      statusType: "alerts",
      tenancy: "AU",
      domain: "Back of House",
      title: "Initial communication",
      description: "Authentication Service - Login delays reported",
      status: "resolved",
      details: "Our engineers are currently investigating an event impacting Azure DevOps. The event is being triaged and we will post an update as soon as we know more.",
      author: "DevOps Incident Scout",
      icon: AlertTriangle,
      iconColor: "text-orange-500"
    },
    {
      id: 5,
      date: "2024-01-13",
      time: "10:30",
      type: "service",
      statusType: "services",
      tenancy: "NZ",
      domain: "Front of House",
      title: "Service Update",
      description: "API Gateway - Performance optimization completed",
      status: "completed",
      details: "Service performance improvements have been successfully deployed across all regions.",
      author: "Platform Team",
      icon: CheckCircle,
      iconColor: "text-green-500"
    }
  ];

  // Filter events based on the provided filter
  const filteredEvents = filter && (filter.statusType || filter.tenancy || filter.domain) 
    ? timelineEvents.filter(event => {
        return (!filter.statusType || event.statusType === filter.statusType) &&
               (!filter.tenancy || event.tenancy === filter.tenancy) &&
               (!filter.domain || event.domain === filter.domain);
      })
    : timelineEvents;

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "incident":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-blue-100 text-blue-800";
      case "release":
        return "bg-green-100 text-green-800";
      case "service":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusTypeLabel = (statusType: string) => {
    switch (statusType) {
      case "alerts":
        return "Alerts";
      case "healthchecks":
        return "Health Checks";
      case "incidents":
        return "Incidents";
      case "releases":
        return "Releases";
      case "services":
        return "Services";
      default:
        return statusType;
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              System Availability Events History
              {filter && (filter.statusType || filter.tenancy || filter.domain) && (
                <div className="text-sm font-normal text-gray-600 mt-2">
                  Filtered by: {filter.statusType && getStatusTypeLabel(filter.statusType)}
                  {filter.tenancy && ` • ${filter.tenancy}`}
                  {filter.domain && ` • ${filter.domain}`}
                </div>
              )}
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
              {filter && (filter.statusType || filter.tenancy || filter.domain) && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filter
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Log - Left Side */}
        <div className="lg:col-span-2">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Event log</h3>
            <p className="text-sm text-blue-700">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              {filter && (filter.statusType || filter.tenancy || filter.domain) && ' matching your filter'}
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => {
                    const IconComponent = event.icon;
                    return (
                      <div key={event.id} className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-b-0">
                        {/* Timeline Icon */}
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center ${
                            event.id === 1 ? 'border-green-500' : 'border-gray-300'
                          }`}>
                            <IconComponent className={`h-4 w-4 ${event.iconColor}`} />
                          </div>
                        </div>
                        
                        {/* Event Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <Badge className={getEventTypeColor(event.type)}>
                              {getStatusTypeLabel(event.statusType)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {event.domain} • {event.tenancy}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            <span>{event.author}</span>
                            <span>•</span>
                            <span>{event.date} at {event.time}</span>
                          </div>
                          
                          <p className="text-gray-700 leading-relaxed">{event.details}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No events found matching your filter criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Panels - Right Side */}
        <div className="space-y-6">
          {/* Event Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Event information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">State</div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Resolved
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Start</div>
                  <div className="text-sm font-medium">1/14/2024, 4:20 PM</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">End</div>
                  <div className="text-sm font-medium">1/15/2024, 2:30 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Impact information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Severity</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Degraded</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Service</div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm font-medium">Core services</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Geography</div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">Multiple Regions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filter Information */}
          {filter && (filter.statusType || filter.tenancy || filter.domain) && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-900">Active Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filter.statusType && (
                  <div className="text-sm">
                    <span className="font-medium">Status Type:</span> {getStatusTypeLabel(filter.statusType)}
                  </div>
                )}
                {filter.tenancy && (
                  <div className="text-sm">
                    <span className="font-medium">Tenancy:</span> {filter.tenancy}
                  </div>
                )}
                {filter.domain && (
                  <div className="text-sm">
                    <span className="font-medium">Domain:</span> {filter.domain}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Events</Button>
      </div>
    </div>
  );
};
