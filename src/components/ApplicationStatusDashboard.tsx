
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Activity } from "lucide-react";

interface ApplicationStatusDashboardProps {
  onApplicationClick?: (application: string) => void;
}

export const ApplicationStatusDashboard = ({ onApplicationClick }: ApplicationStatusDashboardProps) => {
  const applications = [
    {
      name: "JB Direct",
      status: "operational",
      statusText: "Operational",
      message: "All systems are running normally with no impact or downtime.",
      lastUpdated: "2 minutes ago"
    },
    {
      name: "In-Store",
      status: "operational", 
      statusText: "Operational",
      message: "All point-of-sale systems are functioning perfectly with full availability.",
      lastUpdated: "5 minutes ago"
    },
    {
      name: "Online",
      status: "capped",
      statusText: "Capped",
      message: "Website performance is degraded. Response times are higher than normal.",
      lastUpdated: "1 minute ago"
    },
    {
      name: "Fulfilment & Consignment",
      status: "operational",
      statusText: "Operational", 
      message: "Warehouse and fulfillment operations are running smoothly with no delays.",
      lastUpdated: "3 minutes ago"
    },
    {
      name: "Receiving & Transfer",
      status: "capped",
      statusText: "Capped",
      message: "Stock processing is experiencing minor delays due to high volume.",
      lastUpdated: "4 minutes ago"
    },
    {
      name: "SMS Communication",
      status: "danger",
      statusText: "Danger", 
      message: "SMS gateway is completely down. No text messages can be sent or received.",
      lastUpdated: "7 minutes ago"
    },
    {
      name: "Email Communication",
      status: "operational",
      statusText: "Operational",
      message: "Email services are functioning normally with reliable delivery.",
      lastUpdated: "6 minutes ago"
    },
    {
      name: "Fraud Prevention",
      status: "operational",
      statusText: "Operational",
      message: "Security systems are active and monitoring transactions effectively.",
      lastUpdated: "1 minute ago"
    }
  ];

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

  const operationalCount = applications.filter(app => app.status === "operational").length;
  const cappedCount = applications.filter(app => app.status === "capped").length;
  const dangerCount = applications.filter(app => app.status === "danger").length;

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
            {applications.map((app) => (
              <Card 
                key={app.name} 
                className="border hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
                onClick={() => handleApplicationClick(app.name)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(app.status)}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{app.name}</h3>
                        <Badge className={`${getStatusBadgeColor(app.status)} text-xs font-medium`}>
                          {app.statusText}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {app.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Last updated: {app.lastUpdated}</span>
                      <span className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
