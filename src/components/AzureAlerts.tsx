
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, XCircle, Clock, Filter, Bell, Activity, Database, Globe } from "lucide-react";
import { HistoryButton } from "./HistoryButton";
import { AlertDetailsModal } from "./AlertDetailsModal";
import { AzureHealthDetailsModal } from "./AzureHealthDetailsModal";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  domain: string;
  tenancy: string;
  timestamp: string;
  source: string;
  metric: string;
  affectedServices: string[];
  type: "alert";
}

interface HealthCheck {
  id: number;
  name: string;
  description: string;
  status: string;
  domain: string;
  tenancy: string;
  lastCheck: string;
  responseTime: string;
  endpoint: string;
  details: string;
  type: "healthcheck";
}

type AzureItem = Alert | HealthCheck;

export const AzureAlerts = () => {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedHealthCheck, setSelectedHealthCheck] = useState<HealthCheck | null>(null);
  const [isAlertDetailsModalOpen, setIsAlertDetailsModalOpen] = useState(false);
  const [isHealthDetailsModalOpen, setIsHealthDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  const alerts: Alert[] = [
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
      affectedServices: ["Web Server", "Database Server", "Cache Service"],
      type: "alert"
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
      affectedServices: ["Application Server", "Background Jobs"],
      type: "alert"
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
      affectedServices: ["Primary Database", "Backup Database"],
      type: "alert"
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
      affectedServices: ["API Gateway", "Load Balancer"],
      type: "alert"
    }
  ];

  const healthChecks: HealthCheck[] = [
    {
      id: 5,
      name: "Database Connection",
      description: "SQL Server database connectivity check",
      status: "healthy",
      domain: "Back of House",
      tenancy: "NZ",
      lastCheck: "2024-01-15 14:35:00",
      responseTime: "45ms",
      endpoint: "/health/database",
      details: "Connection successful, query response within acceptable limits",
      type: "healthcheck"
    },
    {
      id: 6,
      name: "API Gateway Health",
      description: "Main API gateway availability check",
      status: "degraded",
      domain: "Front of House",
      tenancy: "AU",
      lastCheck: "2024-01-15 14:34:00",
      responseTime: "350ms",
      endpoint: "/health/api-gateway",
      details: "Elevated response times detected, investigating load balancer",
      type: "healthcheck"
    },
    {
      id: 7,
      name: "Cache Service",
      description: "Redis cache service health check",
      status: "unhealthy",
      domain: "Back of House",
      tenancy: "AU",
      lastCheck: "2024-01-15 14:33:00",
      responseTime: "timeout",
      endpoint: "/health/cache",
      details: "Cache service unresponsive, failover to secondary cache activated",
      type: "healthcheck"
    },
    {
      id: 8,
      name: "Authentication Service",
      description: "Identity and authentication service check",
      status: "healthy",
      domain: "Front of House",
      tenancy: "NZ",
      lastCheck: "2024-01-15 14:35:00",
      responseTime: "28ms",
      endpoint: "/health/auth",
      details: "All authentication endpoints responding normally",
      type: "healthcheck"
    },
    {
      id: 9,
      name: "Payment Processing",
      description: "Payment gateway connectivity check",
      status: "healthy",
      domain: "Core Retail",
      tenancy: "AU",
      lastCheck: "2024-01-15 14:34:00",
      responseTime: "120ms",
      endpoint: "/health/payments",
      details: "Payment processing services operational",
      type: "healthcheck"
    }
  ];

  const allItems: AzureItem[] = [...alerts, ...healthChecks];

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
      case "unhealthy":
        return "bg-red-100 text-red-800";
      case "investigating":
      case "degraded":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
      case "healthy":
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

  const getHealthIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "unhealthy":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredItems = allItems.filter(item => {
    const matchesDomain = selectedDomain === "All Domains" || item.domain === selectedDomain;
    return matchesDomain;
  });

  const handleViewAlertDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsAlertDetailsModalOpen(true);
  };

  const handleViewHealthDetails = (healthCheck: HealthCheck) => {
    setSelectedHealthCheck(healthCheck);
    setIsHealthDetailsModalOpen(true);
  };

  const handleAcknowledge = (item: AzureItem) => {
    const title = item.type === 'alert' ? item.title : item.name;
    toast({
      title: "Alert Acknowledged",
      description: `${item.type === 'alert' ? 'Alert' : 'Health Check'} "${title}" has been acknowledged.`,
    });
  };

  const handleViewInAzure = (item: AzureItem) => {
    const title = item.type === 'alert' ? item.title : item.name;
    toast({
      title: "Opening Azure Portal",
      description: `Opening ${title} in Azure Application Insights.`,
    });
  };

  const handleRunCheck = (item: HealthCheck) => {
    toast({
      title: "Running Health Check",
      description: `Manually triggering health check for ${item.name}.`,
    });
  };

  const alertsSummary = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === "critical").length,
    high: alerts.filter(a => a.severity === "high").length,
    medium: alerts.filter(a => a.severity === "medium").length,
    low: alerts.filter(a => a.severity === "low").length
  };

  const healthSummary = {
    total: healthChecks.length,
    healthy: healthChecks.filter(c => c.status === "healthy").length,
    degraded: healthChecks.filter(c => c.status === "degraded").length,
    unhealthy: healthChecks.filter(c => c.status === "unhealthy").length
  };

  return (
    <div className="space-y-6">
      {/* Summary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alerts Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">Critical: {alertsSummary.critical}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">High: {alertsSummary.high}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Medium: {alertsSummary.medium}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Low: {alertsSummary.low}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Checks Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Health Checks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Healthy: {healthSummary.healthy}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Degraded: {healthSummary.degraded}</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">Unhealthy: {healthSummary.unhealthy}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Azure Alerts & Health Checks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Domain:</span>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["All Domains", "Front of House", "Back of House", "Core Retail", "Data Services"].map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combined List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={`${item.type}-${item.id}`} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {item.type === 'alert' ? getSeverityIcon(item.severity) : getHealthIcon(item.status)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.type === 'alert' ? item.title : item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {item.type === 'alert' && (
                    <Badge className={getSeverityColor(item.severity)}>
                      {item.severity}
                    </Badge>
                  )}
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.type === 'alert' ? 'Alert' : 'Health Check'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Domain</p>
                  <p className="text-sm">{item.domain}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tenancy</p>
                  <p className="text-sm">{item.tenancy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Source</p>
                  <p className="text-sm">
                    {item.type === 'alert' ? item.source : 'Azure Health Check'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.type === 'alert' ? 'Timestamp' : 'Last Check'}
                  </p>
                  <p className="text-sm">
                    {item.type === 'alert' ? item.timestamp : item.lastCheck}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {item.type === 'alert' ? 'Metric' : 'Endpoint'}
                </p>
                <p className="text-sm font-mono bg-gray-50 px-2 py-1 rounded">
                  {item.type === 'alert' ? item.metric : item.endpoint}
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <HistoryButton
                  entityType={item.type === 'alert' ? 'alert' : 'azure'}
                  entityId={item.id.toString()}
                  entityTitle={item.type === 'alert' ? item.title : item.name}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => item.type === 'alert' ? handleViewAlertDetails(item) : handleViewHealthDetails(item)}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewInAzure(item)}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  View in Azure
                </Button>
                {item.type === 'healthcheck' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRunCheck(item)}
                  >
                    Run Check
                  </Button>
                )}
                {((item.type === 'alert' && item.status === 'active') || 
                  (item.type === 'healthcheck' && item.status !== 'healthy')) && (
                  <Button 
                    size="sm"
                    onClick={() => handleAcknowledge(item)}
                  >
                    Acknowledge
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Items Found</h3>
            <p className="text-gray-600">No alerts or health checks match your current filter criteria.</p>
          </CardContent>
        </Card>
      )}

      <AlertDetailsModal
        open={isAlertDetailsModalOpen}
        onOpenChange={setIsAlertDetailsModalOpen}
        alert={selectedAlert}
      />

      <AzureHealthDetailsModal
        open={isHealthDetailsModalOpen}
        onOpenChange={setIsHealthDetailsModalOpen}
        healthCheck={selectedHealthCheck}
      />
    </div>
  );
};
