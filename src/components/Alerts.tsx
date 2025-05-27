import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, XCircle, Clock, Filter, Bell } from "lucide-react";
import { HistoryButton } from "./HistoryButton";
import { AlertDetailsModal } from "./AlertDetailsModal";
import { useToast } from "@/hooks/use-toast";

const generateDemoAlerts = () => {
  const domains = ["Front of House", "Back of House", "Core Retail", "Data Services", "Cloud Infrastructure"];
  const tenancies = ["AU", "NZ", "UK", "US"];
  const severities = ["critical", "high", "medium", "low"];
  const statuses = ["active", "investigating", "resolved"];
  const sources = ["Azure Monitor", "Application Insights", "Database Monitor", "API Gateway", "System Monitor"];
  
  const alertTitles = [
    "High CPU Usage", "Memory Leak Detected", "Database Connection Timeout", "API Response Time Degradation",
    "Disk Space Warning", "Network Latency Spike", "SSL Certificate Expiring", "Failed Login Attempts",
    "Payment Gateway Timeout", "Email Service Failure", "Cache Miss Rate High", "Queue Length Growing",
    "Error Rate Elevated", "Backup Job Failed", "Security Scan Alert", "Performance Degradation",
    "Service Unavailable", "Connection Pool Exhausted", "Thread Count High", "GC Pressure Alert",
    "Database Deadlock", "File System Full", "Network Packet Loss", "Service Discovery Failed",
    "Load Balancer Health Check Failed", "CDN Cache Miss", "Search Index Lag", "Notification Delivery Failed",
    "User Session Timeout", "API Rate Limit Exceeded", "Database Query Slow", "Memory Usage High",
    "Connection Refused", "Service Dependency Down", "Authentication Failed", "Authorization Error"
  ];

  const descriptions = [
    "CPU usage has exceeded threshold for extended period",
    "Memory consumption increasing without release patterns",
    "Multiple database connection timeouts detected across services",
    "API response times have increased significantly above SLA",
    "Disk space usage has exceeded critical warning threshold",
    "Network latency has spiked above acceptable service levels",
    "SSL certificate will expire within critical warning period",
    "Multiple failed login attempts detected from various sources",
    "Payment gateway experiencing timeout issues with transactions",
    "Email service failing to deliver messages to recipients",
    "Cache miss rate has increased significantly affecting performance",
    "Message queue length growing beyond configured capacity limits",
    "Error rate has elevated above normal operational levels",
    "Automated backup job has failed multiple consecutive times",
    "Security scan has detected potential vulnerabilities or threats",
    "Overall system performance has degraded below acceptable levels",
    "Critical service is reporting as completely unavailable",
    "Database connection pool resources are completely exhausted",
    "Application thread count has exceeded safe operational limits",
    "Garbage collection pressure detected affecting application performance"
  ];

  const alerts = [];
  
  for (let i = 1; i <= 60; i++) {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tenancy = tenancies[Math.floor(Math.random() * tenancies.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const title = alertTitles[Math.floor(Math.random() * alertTitles.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    const timestamp = new Date(2025, 0, Math.floor(Math.random() * 27) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    
    const services = ["Web Server", "Database", "API Gateway", "Cache Service", "Load Balancer", "Auth Service", "Payment Service", "Email Service"];
    const affectedServices = services.slice(0, Math.floor(Math.random() * 4) + 1);
    
    const metrics = [
      "CPU Usage: 92%", "Memory Usage: 85%", "Disk Usage: 95%", "Response Time: 2.5s",
      "Error Rate: 5.2%", "Queue Length: 1250", "Connection Count: 850", "Throughput: 45 req/s",
      "Latency: 850ms", "Success Rate: 94.2%", "Cache Hit Rate: 65%", "Active Sessions: 2850"
    ];
    
    alerts.push({
      id: i,
      title: `${title} - ${domain} ${tenancy}`,
      description,
      severity,
      status,
      domain,
      tenancy,
      timestamp: timestamp.toISOString().slice(0, 19).replace('T', ' '),
      source,
      metric: metrics[Math.floor(Math.random() * metrics.length)],
      affectedServices
    });
  }
  
  return alerts;
};

export const Alerts = () => {
  const [selectedSeverity, setSelectedSeverity] = useState("All Severities");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  const alerts = generateDemoAlerts();

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
    const matchesDomain = selectedDomain === "All Domains" || alert.domain === selectedDomain;
    return matchesSeverity && matchesStatus && matchesDomain;
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
              <span className="text-sm font-medium">Domain:</span>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["All Domains", "Front of House", "Back of House", "Core Retail", "Data Services", "Cloud Infrastructure"].map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
