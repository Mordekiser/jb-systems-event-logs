
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eye, Clock } from "lucide-react";

export const IncidentTracking = () => {
  const incidents = [
    {
      id: "INC-001",
      title: "High API Response Times",
      severity: "high",
      status: "investigating",
      createdBy: "System Monitor",
      createdAt: "2024-01-15 15:45",
      updatedAt: "2024-01-15 16:00",
      affectedServices: ["API Gateway", "Database"]
    },
    {
      id: "INC-002", 
      title: "Email Service Intermittent Failures",
      severity: "medium",
      status: "in-progress",
      createdBy: "John Doe",
      createdAt: "2024-01-15 14:20",
      updatedAt: "2024-01-15 15:30",
      affectedServices: ["Email Service"]
    },
    {
      id: "INC-003",
      title: "Login Authentication Delays",
      severity: "low",
      status: "resolved",
      createdBy: "Jane Smith",
      createdAt: "2024-01-15 09:15",
      updatedAt: "2024-01-15 11:45",
      affectedServices: ["Authentication"]
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
    };
    
    return (
      <Badge className={variants[severity as keyof typeof variants]}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      investigating: "bg-orange-100 text-orange-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Incident Tracking</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono text-sm text-gray-500">{incident.id}</span>
                    {getSeverityBadge(incident.severity)}
                    {getStatusBadge(incident.status)}
                  </div>
                  <h3 className="font-semibold text-lg">{incident.title}</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium">Created By</p>
                  <p>{incident.createdBy}</p>
                </div>
                <div>
                  <p className="font-medium">Created</p>
                  <p>{incident.createdAt}</p>
                </div>
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p>{incident.updatedAt}</p>
                </div>
                <div>
                  <p className="font-medium">Affected Services</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {incident.affectedServices.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
