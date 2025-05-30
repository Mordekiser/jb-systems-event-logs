import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, XCircle, Clock, Filter, Bell, Activity, Database, Globe, Info } from "lucide-react";
import { HistoryButton } from "./HistoryButton";
import { AlertDetailsModal } from "./AlertDetailsModal";
import { AzureHealthDetailsModal } from "./AzureHealthDetailsModal";
import { BackToTopButton } from "./BackToTopButton";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: number;
  title: string;
  description: string;
  impact: string;
  status: string;
  domain: string;
  tenancy: string;
  application: string;
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
  application: string;
  lastCheck: string;
  responseTime: string;
  endpoint: string;
  details: string;
  type: "healthcheck";
}

type AzureItem = Alert | HealthCheck;

const generateDemoAlerts = (): Alert[] => {
  const domains = ["Front of House", "Back of House", "Core Retail", "Data Services", "Cloud Infrastructure"];
  const tenancies = ["AU", "NZ", "UK", "US"];
  const impacts = ["Major", "Minor", "Trivial"];
  const statuses = ["active", "investigating", "resolved"];
  const sources = ["Azure Monitor", "Application Insights", "Database Monitor", "API Gateway", "Load Balancer"];
  const applications = [
    "JB Direct", "In-Store", "Online", "Fulfilment & Consignment", 
    "Receiving & Transfer", "SMS Communication", "Email Communication", "Fraud Prevention"
  ];
  
  const alertTitlesByApplication = {
    "JB Direct": [
      "JB Direct Mobile App High CPU Usage", "JB Direct API Response Time Degradation", "JB Direct Payment Gateway Timeout",
      "JB Direct Mobile Authentication Issues", "JB Direct Cart Sync Memory Leak", "JB Direct Performance Degradation"
    ],
    "In-Store": [
      "In-Store POS System High CPU", "In-Store Payment Terminal Memory Leak", "In-Store Barcode Scanner Connection Timeout",
      "In-Store Inventory Sync High Error Rate", "In-Store Staff Portal SSL Certificate Expiring", "In-Store Receipt Printer Connection Failed"
    ],
    "Online": [
      "Online Website High Response Time", "Online Checkout High Error Rate", "Online Search Function Memory Leak",
      "Online Product Images CDN Cache Miss", "Online Payment Gateway High CPU", "Online Shopping Cart Connection Pool Exhausted"
    ],
    "Fulfilment & Consignment": [
      "Fulfilment Order Processing Queue Length Growing", "Fulfilment Inventory Database Connection Timeout", "Fulfilment Shipping Integration SSL Certificate Expiring",
      "Fulfilment Warehouse System Memory Usage High", "Fulfilment Stock Level Sync High Error Rate", "Fulfilment API Response Time Degradation"
    ],
    "Receiving & Transfer": [
      "Receiving Stock Receipt System Disk Space Warning", "Receiving Transfer Orders Network Latency Spike", "Receiving Portal Authentication Failed",
      "Receiving Stock Movement Tracking Connection Refused", "Receiving Supplier Integration Memory Leak", "Receiving Goods-In Process High CPU Usage"
    ],
    "SMS Communication": [
      "SMS Delivery Service Queue Length Growing", "SMS Text Notifications High Error Rate", "SMS Gateway Connection Pool Exhausted",
      "SMS Marketing Service Memory Usage High", "SMS Authentication Database Deadlock", "SMS Bulk Processing Network Packet Loss"
    ],
    "Email Communication": [
      "Email Delivery SMTP Connection Timeout", "Email Newsletter System Memory Leak", "Email Server High CPU Usage",
      "Email Transactional Service Queue Length Growing", "Email Template System Network Latency Spike", "Email Queue Backup High Error Rate"
    ],
    "Fraud Prevention": [
      "Fraud Detection System High CPU Usage", "Fraud Risk Assessment Memory Leak", "Fraud Security Scanner Connection Timeout",
      "Fraud Payment Verification High Error Rate", "Fraud Rules Engine Database Deadlock", "Fraud Risk Score Calculation Performance Degradation"
    ]
  };

  const descriptions = [
    "CPU usage has exceeded threshold for extended period",
    "Memory consumption increasing without release", 
    "Multiple database connection timeouts detected",
    "API response times have increased significantly",
    "Disk space usage has exceeded warning threshold",
    "Network latency has spiked above acceptable levels",
    "SSL certificate will expire within warning period",
    "Multiple failed login attempts detected",
    "Payment gateway experiencing timeout issues",
    "Email service failing to deliver messages",
    "Cache miss rate has increased significantly",
    "Message queue length growing beyond capacity",
    "Error rate has elevated above normal levels",
    "Automated backup job has failed",
    "Security scan has detected potential issues",
    "Overall system performance has degraded",
    "Service is reporting as unavailable",
    "Database connection pool is exhausted",
    "Thread count has exceeded safe limits",
    "Garbage collection pressure detected"
  ];

  const alerts: Alert[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const application = applications[Math.floor(Math.random() * applications.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tenancy = tenancies[Math.floor(Math.random() * tenancies.length)];
    const impact = impacts[Math.floor(Math.random() * impacts.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    
    const applicationTitles = alertTitlesByApplication[application as keyof typeof alertTitlesByApplication];
    const title = applicationTitles[Math.floor(Math.random() * applicationTitles.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    const timestamp = new Date(2025, 0, Math.floor(Math.random() * 27) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    
    const services = ["Web Server", "Database", "API Gateway", "Cache Service", "Load Balancer", "Auth Service"];
    const affectedServices = services.slice(0, Math.floor(Math.random() * 3) + 1);
    
    const metrics = [
      "CPU Usage: 92%", "Memory Usage: 85%", "Disk Usage: 95%", "Response Time: 2.5s",
      "Error Rate: 5.2%", "Queue Length: 1250", "Connection Count: 850", "Throughput: 45 req/s"
    ];
    
    alerts.push({
      id: i,
      title: `${title} - ${tenancy}`,
      description,
      impact,
      status,
      domain,
      tenancy,
      application,
      timestamp: timestamp.toISOString().slice(0, 19).replace('T', ' '),
      source,
      metric: metrics[Math.floor(Math.random() * metrics.length)],
      affectedServices,
      type: "alert"
    });
  }
  
  return alerts;
};

const generateDemoHealthChecks = (): HealthCheck[] => {
  const domains = ["Front of House", "Back of House", "Core Retail", "Data Services", "Cloud Infrastructure"];
  const tenancies = ["AU", "NZ", "UK", "US"];
  const statuses = ["healthy", "degraded", "unhealthy"];
  const applications = [
    "JB Direct", "In-Store", "Online", "Fulfilment & Consignment", 
    "Receiving & Transfer", "SMS Communication", "Email Communication", "Fraud Prevention"
  ];
  
  const healthCheckNamesByApplication = {
    "JB Direct": [
      "JB Direct Database Connection", "JB Direct API Gateway Health", "JB Direct Cache Service", "JB Direct Authentication Service",
      "JB Direct Payment Processing", "JB Direct Mobile App Health", "JB Direct User Session Service"
    ],
    "In-Store": [
      "In-Store POS Database Connection", "In-Store Payment Terminal Health", "In-Store Inventory Sync", "In-Store Staff Portal Health",
      "In-Store Barcode Scanner Service", "In-Store Receipt Printer Health", "In-Store Network Health"
    ],
    "Online": [
      "Online Website Health", "Online Checkout Service", "Online Search Engine", "Online Product Catalog Health",
      "Online CDN Health", "Online Shopping Cart Service", "Online User Account Health"
    ],
    "Fulfilment & Consignment": [
      "Fulfilment Order Processing Health", "Fulfilment Inventory Management", "Fulfilment Shipping Integration", "Fulfilment Warehouse System Health",
      "Fulfilment Stock Tracking", "Fulfilment API Health", "Fulfilment Reporting Service"
    ],
    "Receiving & Transfer": [
      "Receiving Stock Receipt Health", "Receiving Transfer Management", "Receiving Portal Health", "Receiving Stock Movement Health",
      "Receiving Supplier Integration", "Receiving Goods-In Health", "Receiving Tracking Service"
    ],
    "SMS Communication": [
      "SMS Gateway Health", "SMS Delivery Service", "SMS Queue Health", "SMS Marketing Service Health",
      "SMS Authentication Health", "SMS Template Service", "SMS Analytics Health"
    ],
    "Email Communication": [
      "Email SMTP Health", "Email Newsletter Service", "Email Template Health", "Email Delivery Queue Health",
      "Email Authentication Health", "Email Tracking Service", "Email Analytics Health"
    ],
    "Fraud Prevention": [
      "Fraud Detection Health", "Fraud Risk Assessment", "Fraud Security Scanner", "Fraud Payment Verification Health",
      "Fraud Rules Engine Health", "Fraud Analytics Service", "Fraud Reporting Health"
    ]
  };

  const descriptions = [
    "SQL Server database connectivity check",
    "Main API gateway availability check", 
    "Redis cache service health check",
    "Identity and authentication service check",
    "Payment gateway connectivity check",
    "Email service functionality check",
    "File storage system health check",
    "Message queue service availability",
    "Analytics processing engine check",
    "System monitoring service health"
  ];

  const endpoints = [
    "/health/database", "/health/api-gateway", "/health/cache", "/health/auth",
    "/health/payments", "/health/email", "/health/storage", "/health/queue",
    "/health/analytics", "/health/monitoring", "/health/backup", "/health/cdn"
  ];

  const healthChecks: HealthCheck[] = [];
  
  for (let i = 51; i <= 80; i++) {
    const application = applications[Math.floor(Math.random() * applications.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tenancy = tenancies[Math.floor(Math.random() * tenancies.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const applicationNames = healthCheckNamesByApplication[application as keyof typeof healthCheckNamesByApplication];
    const name = applicationNames[Math.floor(Math.random() * applicationNames.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    
    const lastCheck = new Date(Date.now() - Math.random() * 10 * 60 * 1000);
    
    const responseTimes = status === "healthy" ? ["25ms", "45ms", "67ms", "89ms"] :
                         status === "degraded" ? ["250ms", "350ms", "450ms", "550ms"] :
                         ["timeout", "error", "5000ms", "timeout"];
    
    const responseTime = responseTimes[Math.floor(Math.random() * responseTimes.length)];
    
    const healthDetails = status === "healthy" ? 
      "All systems operating normally" :
      status === "degraded" ?
      "Elevated response times detected, investigating" :
      "Service unresponsive, failover activated";
    
    healthChecks.push({
      id: i,
      name,
      description,
      status,
      domain,
      tenancy,
      application,
      lastCheck: lastCheck.toISOString().slice(0, 19).replace('T', ' '),
      responseTime,
      endpoint,
      details: healthDetails,
      type: "healthcheck"
    });
  }
  
  return healthChecks;
};

export const AzureAlerts = () => {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedHealthCheck, setSelectedHealthCheck] = useState<HealthCheck | null>(null);
  const [isAlertDetailsModalOpen, setIsAlertDetailsModalOpen] = useState(false);
  const [isHealthDetailsModalOpen, setIsHealthDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  const alerts: Alert[] = generateDemoAlerts();
  const healthChecks: HealthCheck[] = generateDemoHealthChecks();
  const allItems: AzureItem[] = [...alerts, ...healthChecks];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Major":
        return "bg-red-100 text-red-800 border-red-200";
      case "Minor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Trivial":
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

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "Major":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "Minor":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "Trivial":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <Info className="h-5 w-5 text-blue-600" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
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
    major: alerts.filter(a => a.impact === "Major").length,
    minor: alerts.filter(a => a.impact === "Minor").length,
    trivial: alerts.filter(a => a.impact === "Trivial").length
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
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">Major: {alertsSummary.major}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Minor: {alertsSummary.minor}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Trivial: {alertsSummary.trivial}</span>
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
                <Info className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Healthy: {healthSummary.healthy}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
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
                  {["All Domains", "Front of House", "Back of House", "Core Retail", "Data Services", "Cloud Infrastructure"].map((domain) => (
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
                  {item.type === 'alert' ? getImpactIcon(item.impact) : getHealthIcon(item.status)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.type === 'alert' ? item.title : item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {item.type === 'alert' && (
                    <Badge className={getImpactColor(item.impact)}>
                      {item.impact}
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Application</p>
                  <p className="text-sm">{item.application}</p>
                </div>
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
            <Info className="h-12 w-12 text-blue-600 mx-auto mb-4" />
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

      <BackToTopButton />
    </div>
  );
};
