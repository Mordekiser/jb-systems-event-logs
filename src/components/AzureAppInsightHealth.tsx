
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, AlertTriangle, Activity, Clock, Database, Globe } from "lucide-react";
import { HistoryButton } from "./HistoryButton";

export const AzureAppInsightHealth = () => {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const healthChecks = [
    {
      id: 1,
      name: "Database Connection",
      description: "SQL Server database connectivity check",
      status: "healthy",
      domain: "Back of House",
      tenancy: "NZ",
      lastCheck: "2024-01-15 14:35:00",
      responseTime: "45ms",
      endpoint: "/health/database",
      details: "Connection successful, query response within acceptable limits"
    },
    {
      id: 2,
      name: "API Gateway Health",
      description: "Main API gateway availability check",
      status: "degraded",
      domain: "Front of House",
      tenancy: "AU",
      lastCheck: "2024-01-15 14:34:00",
      responseTime: "350ms",
      endpoint: "/health/api-gateway",
      details: "Elevated response times detected, investigating load balancer"
    },
    {
      id: 3,
      name: "Cache Service",
      description: "Redis cache service health check",
      status: "unhealthy",
      domain: "Back of House",
      tenancy: "AU",
      lastCheck: "2024-01-15 14:33:00",
      responseTime: "timeout",
      endpoint: "/health/cache",
      details: "Cache service unresponsive, failover to secondary cache activated"
    },
    {
      id: 4,
      name: "Authentication Service",
      description: "Identity and authentication service check",
      status: "healthy",
      domain: "Front of House",
      tenancy: "NZ",
      lastCheck: "2024-01-15 14:35:00",
      responseTime: "28ms",
      endpoint: "/health/auth",
      details: "All authentication endpoints responding normally"
    },
    {
      id: 5,
      name: "Payment Processing",
      description: "Payment gateway connectivity check",
      status: "healthy",
      domain: "Core Retail",
      tenancy: "AU",
      lastCheck: "2024-01-15 14:34:00",
      responseTime: "120ms",
      endpoint: "/health/payments",
      details: "Payment processing services operational"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "degraded":
        return "bg-yellow-100 text-yellow-800";
      case "unhealthy":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
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

  const filteredHealthChecks = healthChecks.filter(check => {
    const matchesDomain = selectedDomain === "All Domains" || check.domain === selectedDomain;
    const matchesStatus = selectedStatus === "All Statuses" || check.status === selectedStatus.toLowerCase();
    return matchesDomain && matchesStatus;
  });

  const healthSummary = {
    total: healthChecks.length,
    healthy: healthChecks.filter(c => c.status === "healthy").length,
    degraded: healthChecks.filter(c => c.status === "degraded").length,
    unhealthy: healthChecks.filter(c => c.status === "unhealthy").length
  };

  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Total Checks</span>
            </div>
            <p className="text-2xl font-bold mt-2">{healthSummary.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Healthy</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-green-600">{healthSummary.healthy}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium">Degraded</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-yellow-600">{healthSummary.degraded}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium">Unhealthy</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-red-600">{healthSummary.unhealthy}</p>
          </CardContent>
        </Card>
      </div>

      {/* Health Checks Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Azure Application Insights Health Checks</span>
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
                  {["All Domains", "Front of House", "Back of House", "Core Retail", "Data Services"].map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
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
                  {["All Statuses", "Healthy", "Degraded", "Unhealthy"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Refresh All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Checks List */}
      <div className="space-y-4">
        {filteredHealthChecks.map((check) => (
          <Card key={check.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(check.status)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{check.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(check.status)}>
                  {check.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Domain</p>
                  <p className="text-sm">{check.domain}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tenancy</p>
                  <p className="text-sm">{check.tenancy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Response Time</p>
                  <p className="text-sm">{check.responseTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Check</p>
                  <p className="text-sm">{check.lastCheck}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Endpoint</p>
                <p className="text-sm font-mono bg-gray-50 px-2 py-1 rounded">{check.endpoint}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Details</p>
                <p className="text-sm text-gray-700">{check.details}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <HistoryButton
                  entityType="azure"
                  entityId={check.id.toString()}
                  entityTitle={check.name}
                />
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  View in Azure
                </Button>
                <Button variant="outline" size="sm">
                  Run Check
                </Button>
                <Button size="sm">
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHealthChecks.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Health Checks Found</h3>
            <p className="text-gray-600">No health checks match your current filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
