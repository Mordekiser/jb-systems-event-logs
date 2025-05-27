import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, XCircle, Clock, Filter, Bell } from "lucide-react";
import { HistoryButton } from "./HistoryButton";
import { AlertDetailsModal } from "./AlertDetailsModal";
import { useToast } from "@/hooks/use-toast";

export const Alerts = () => {
  const [selectedSeverity, setSelectedSeverity] = useState("All Severities");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  const alerts = [
    {
      id: 1,
      title: "High CPU Usage - Back of House NZ",
      description: "CPU usage has exceeded 85% for the past 10 minutes",
      severity: "critical",
      status: "active",
      domain: "Back of House",
      tenancy: "NZ",
      timestamp: "2024-01-15 14:30:00",
      source: "Azure Monitor",
      metric: "CPU Usage: 92%",
      affectedServices: ["Web Server", "Database Server", "Cache Service"]
    },
    {
      id: 2,
      title: "Memory Leak Detected - Back of House AU",
      description: "Memory consumption increasing steadily over 2 hours",
      severity: "high",
      status: "active", 
      domain: "Back of House",
      tenancy: "AU",
      timestamp: "2024-01-15 13:45:00",
      source: "Application Insights",
      metric: "Memory Usage: 78%",
      affectedServices: ["Application Server", "Background Jobs"]
    },
    {
      id: 3,
      title: "Database Connection Timeout",
      description: "Multiple database connection timeouts detected",
      severity: "medium",
      status: "resolved",
      domain: "Data Services",
      tenancy: "NZ",
      timestamp: "2024-01-15 12:20:00",
      source: "Database Monitor",
      metric: "Connection Time: 5.2s",
      affectedServices: ["Primary Database", "Backup Database"]
    },
    {
      id: 4,
      title: "API Response Time Degradation",
      description: "API response times have increased by 40%",
      severity: "low",
      status: "investigating",
      domain: "Front of House",
      tenancy: "AU",
      timestamp: "2024-01-15 11:15:00",
      source: "API Gateway",
      metric: "Avg Response: 850ms",
      affectedServices: ["API Gateway", "Load Balancer"]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "investigating":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === "All Severities" || alert.severity === selectedSeverity.toLowerCase();
    const matchesStatus = selectedStatus === "All Statuses" || alert.status === selectedStatus.toLowerCase();
    return matchesSeverity && matchesStatus;
  });

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert);
    setIsDetailsModalOpen(true);
  };

  const handleAcknowledge = (alert: any) => {
    toast({
      title: "Alert Acknowledged",
      description: `Alert "${alert.title}" has been acknowledged.`,
    });
  };

  const handleMoreFilters = () => {
    toast({
      title: "More Filters",
      description: "Advanced filtering options coming soon.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Alerts Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>System Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Severity:</span>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["All Severities", "Critical", "High", "Medium", "Low"].map((severity) => (
                    <SelectItem key={severity} value={severity}>
                      {severity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Status:</span>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["All Statuses", "Active", "Investigating", "Resolved"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" onClick={handleMoreFilters}>
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getSeverityIcon(alert.severity)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <Badge className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Domain</p>
                  <p className="text-sm">{alert.domain}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tenancy</p>
                  <p className="text-sm">{alert.tenancy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Source</p>
                  <p className="text-sm">{alert.source}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Timestamp</p>
                  <p className="text-sm">{alert.timestamp}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Metric</p>
                <p className="text-sm font-mono bg-gray-50 px-2 py-1 rounded">{alert.metric}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <HistoryButton
                  entityType="alert"
                  entityId={alert.id.toString()}
                  entityTitle={alert.title}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(alert)}
                >
                  View Details
                </Button>
                {alert.status === "active" && (
                  <Button 
                    size="sm"
                    onClick={() => handleAcknowledge(alert)}
                  >
                    Acknowledge
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Alerts Found</h3>
            <p className="text-gray-600">No alerts match your current filter criteria.</p>
          </CardContent>
        </Card>
      )}

      <AlertDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        alert={selectedAlert}
      />
    </div>
  );
};
