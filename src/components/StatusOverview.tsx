
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

export const StatusOverview = () => {
  const systemStatus = {
    overall: "operational", // operational, degraded, outage
    services: [
      { name: "API Gateway", status: "operational" },
      { name: "Database", status: "operational" },
      { name: "Authentication", status: "degraded" },
      { name: "File Storage", status: "operational" },
      { name: "Email Service", status: "outage" },
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      operational: "bg-green-100 text-green-800",
      degraded: "bg-yellow-100 text-yellow-800",
      outage: "bg-red-100 text-red-800",
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Overall Status */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getStatusIcon(systemStatus.overall)}
            <span>Overall Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {getStatusBadge(systemStatus.overall)}
            <p className="text-sm text-gray-600 mt-2">
              All systems operational
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Services Status */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Services Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemStatus.services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(service.status)}
                  <span className="font-medium">{service.name}</span>
                </div>
                {getStatusBadge(service.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
