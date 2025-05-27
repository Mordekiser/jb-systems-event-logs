
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Activity } from "lucide-react";
import { useEvents } from "@/contexts/EventsContext";
import { useIncidents } from "@/contexts/IncidentContext";

interface ApplicationStatusDashboardProps {
  onApplicationClick?: (application: string) => void;
}

export const ApplicationStatusDashboard = ({ onApplicationClick }: ApplicationStatusDashboardProps) => {
  const { events } = useEvents();
  const { incidents } = useIncidents();

  const applications = [
    { name: "JB Direct" },
    { name: "In-Store" },
    { name: "Online" },
    { name: "Fulfilment & Consignment" },
    { name: "Receiving & Transfer" },
    { name: "SMS Communication" },
    { name: "Email Communication" },
    { name: "Fraud Prevention" }
  ];

  const getApplicationStatus = (applicationName: string) => {
    // Get active incidents for this application (exclude resolved)
    const applicationIncidents = incidents.filter(incident => 
      incident.application === applicationName && 
      incident.status !== 'resolved' && 
      incident.status !== 'closed'
    );
    
    // Get active events for this application (exclude completed)
    const applicationEvents = events.filter(event => 
      event.application === applicationName &&
      event.status !== 'Complete'
    );

    // Combine all impacts from incidents and events
    const allImpacts: string[] = [];
    
    // Add incident impacts (map severity to impact)
    applicationIncidents.forEach(incident => {
      if (incident.severity === 'critical' || incident.severity === 'high') {
        allImpacts.push('Major');
      } else if (incident.severity === 'medium') {
        allImpacts.push('Minor');
      } else {
        allImpacts.push('Trivial');
      }
    });
    
    // Add event impacts
    applicationEvents.forEach(event => {
      allImpacts.push(event.impact);
    });

    // Apply impact hierarchy logic
    if (allImpacts.includes('Major')) {
      return {
        status: 'danger',
        statusText: 'Danger',
        message: `${applicationName} is completely down or experiencing critical failures. Service is unavailable and requires immediate attention.`,
        lastUpdated: applicationIncidents.length > 0 || applicationEvents.length > 0 
          ? getLatestUpdateTime(applicationIncidents, applicationEvents)
          : "No recent issues"
      };
    }
    
    if (allImpacts.includes('Minor')) {
      return {
        status: 'capped',
        statusText: 'Capped',
        message: `${applicationName} performance is degraded. Response times are higher than normal and some features may be slow.`,
        lastUpdated: applicationIncidents.length > 0 || applicationEvents.length > 0 
          ? getLatestUpdateTime(applicationIncidents, applicationEvents)
          : "No recent issues"
      };
    }
    
    // Default to operational
    return {
      status: 'operational',
      statusText: 'Operational',
      message: `All ${applicationName} systems are running normally with no impact or downtime.`,
      lastUpdated: "System healthy"
    };
  };

  const getLatestUpdateTime = (incidents: any[], events: any[]) => {
    const allTimes = [
      ...incidents.map(i => new Date(i.updatedAt).getTime()),
      ...events.map(e => new Date(e.updatedTimestamp).getTime())
    ];
    
    if (allTimes.length === 0) return "No recent updates";
    
    const latestTime = Math.max(...allTimes);
    const now = new Date().getTime();
    const diffMinutes = Math.floor((now - latestTime) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "capped":
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      case "danger":
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Activity className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600";
      case "capped":
        return "text-amber-600";
      case "danger":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800 border-green-200";
      case "capped":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "danger":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleApplicationClick = (applicationName: string) => {
    if (onApplicationClick) {
      onApplicationClick(applicationName);
    }
  };

  // Calculate status counts for summary cards
  const applicationStatuses = applications.map(app => getApplicationStatus(app.name));
  const operationalCount = applicationStatuses.filter(status => status.status === "operational").length;
  const cappedCount = applicationStatuses.filter(status => status.status === "capped").length;
  const dangerCount = applicationStatuses.filter(status => status.status === "danger").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Operational</p>
                <p className="text-3xl font-bold text-green-700">{operationalCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Capped</p>
                <p className="text-3xl font-bold text-amber-700">{cappedCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Danger</p>
                <p className="text-3xl font-bold text-red-700">{dangerCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Status Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Application Status Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map((app) => {
              const appStatus = getApplicationStatus(app.name);
              
              return (
                <Card 
                  key={app.name} 
                  className="border hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
                  onClick={() => handleApplicationClick(app.name)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(appStatus.status)}
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{app.name}</h3>
                          <Badge className={`${getStatusBadgeColor(appStatus.status)} text-xs font-medium`}>
                            {appStatus.statusText}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {appStatus.message}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Last updated: {appStatus.lastUpdated}</span>
                        <span className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Operational - No impact or downtime</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-600">Capped - Performance degraded</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">Danger - Service unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
