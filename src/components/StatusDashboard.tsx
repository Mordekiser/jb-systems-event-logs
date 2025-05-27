
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { StatusLegend } from "./StatusLegend";
import { useIncidents } from "@/contexts/IncidentContext";
import { useConfig } from "@/contexts/ConfigContext";

interface StatusDashboardProps {
  onStatusClick?: (statusType: string, tenancy: string, domain: string) => void;
  onDomainClick?: (domain: string) => void;
}

export const StatusDashboard = ({ onStatusClick, onDomainClick }: StatusDashboardProps) => {
  const { getIncidentsByDomainAndTenancy } = useIncidents();
  const { groupingStrategy, showRegionalBreakdown, combineHealthchecks } = useConfig();

  const getIncidentStatus = (domain: string, tenancy: string) => {
    const domainIncidents = getIncidentsByDomainAndTenancy(domain, tenancy);
    const activeIncidents = domainIncidents.filter(incident => incident.status !== 'resolved');
    
    if (activeIncidents.length === 0) return "green";
    
    const hasCritical = activeIncidents.some(incident => incident.severity === "high");
    const hasMedium = activeIncidents.some(incident => incident.severity === "medium");
    
    if (hasCritical) return "red";
    if (hasMedium) return "orange";
    return "green";
  };

  const originalDomains = [
    {
      name: "Back of House",
      tenancies: [
        { name: "AU", alerts: "red", healthchecks: "red", releases: "green", services: 15 },
        { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 8 }
      ]
    },
    {
      name: "Front of House",
      tenancies: [
        { name: "AU", alerts: "green", healthchecks: "green", releases: "green", services: 5 },
        { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 4 }
      ]
    },
    {
      name: "Data Services",
      tenancies: [
        { name: "AU", alerts: "green", healthchecks: "green", releases: "green", services: 8 },
        { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 7 }
      ]
    }
  ];

  const getTransformedDomains = () => {
    if (groupingStrategy === "service-type") {
      return [
        {
          name: "API Services",
          tenancies: showRegionalBreakdown ? 
            [{ name: "AU", alerts: "green", healthchecks: "green", releases: "green", services: 12 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 8 }] :
            [{ name: "Combined", alerts: "green", healthchecks: "green", releases: "green", services: 20 }]
        },
        {
          name: "Database Services",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", alerts: "red", healthchecks: "red", releases: "green", services: 8 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 5 }] :
            [{ name: "Combined", alerts: "red", healthchecks: "red", releases: "green", services: 13 }]
        },
        {
          name: "Authentication",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", alerts: "green", healthchecks: "green", releases: "green", services: 8 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 6 }] :
            [{ name: "Combined", alerts: "green", healthchecks: "green", releases: "green", services: 14 }]
        }
      ];
    } else if (groupingStrategy === "criticality") {
      return [
        {
          name: "Critical Services",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", alerts: "red", healthchecks: "red", releases: "green", services: 10 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 7 }] :
            [{ name: "Combined", alerts: "red", healthchecks: "red", releases: "green", services: 17 }]
        },
        {
          name: "Standard Services", 
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", alerts: "green", healthchecks: "green", releases: "green", services: 15 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 10 }] :
            [{ name: "Combined", alerts: "green", healthchecks: "green", releases: "green", services: 25 }]
        },
        {
          name: "Support Services",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", alerts: "green", healthchecks: "green", releases: "green", services: 3 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 2 }] :
            [{ name: "Combined", alerts: "green", healthchecks: "green", releases: "green", services: 5 }]
        }
      ];
    } else if (groupingStrategy === "business-function") {
      return [
        {
          name: "Customer Services",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", alerts: "green", healthchecks: "green", releases: "green", services: 12 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 8 }] :
            [{ name: "Combined", alerts: "green", healthchecks: "green", releases: "green", services: 20 }]
        },
        {
          name: "Internal Tools",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", alerts: "red", healthchecks: "red", releases: "green", services: 10 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 7 }] :
            [{ name: "Combined", alerts: "red", healthchecks: "red", releases: "green", services: 17 }]
        },
        {
          name: "Infrastructure",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", alerts: "green", healthchecks: "green", releases: "green", services: 6 },
             { name: "NZ", alerts: "green", healthchecks: "green", releases: "green", services: 4 }] :
            [{ name: "Combined", alerts: "green", healthchecks: "green", releases: "green", services: 10 }]
        }
      ];
    } else {
      // Default domain grouping
      if (!showRegionalBreakdown) {
        return originalDomains.map(domain => ({
          name: domain.name,
          tenancies: [{
            name: "Combined",
            alerts: domain.tenancies.some(t => t.alerts === "red") ? "red" : "green",
            healthchecks: domain.tenancies.some(t => t.healthchecks === "red") ? "red" : "green", 
            releases: "green",
            services: domain.tenancies.reduce((sum, t) => sum + t.services, 0)
          }]
        }));
      }
      return originalDomains;
    }
  };

  const domains = getTransformedDomains();
  
  const getStatusIcon = (status: string, isClickable: boolean = false) => {
    const baseClasses = "w-5 h-5";
    const clickableClasses = isClickable ? "cursor-pointer hover:scale-110 transition-transform" : "";
    
    switch (status) {
      case "green":
        return <CheckCircle className={`${baseClasses} ${clickableClasses} text-green-600`} />;
      case "orange":
        return <AlertTriangle className={`${baseClasses} ${clickableClasses} text-orange-600`} />;
      case "red":
        return <XCircle className={`${baseClasses} ${clickableClasses} text-red-600`} />;
      case "blue":
        return <Info className={`${baseClasses} ${clickableClasses} text-blue-600`} />;
      default:
        return <div className={`${baseClasses} ${clickableClasses} rounded-full bg-gray-500`}></div>;
    }
  };

  const handleStatusClick = (statusType: string, tenancy: string, domain: string) => {
    if (onStatusClick) {
      onStatusClick(statusType, tenancy, domain);
    }
  };

  const handleDomainClick = (domainName: string) => {
    if (onDomainClick) {
      onDomainClick(domainName);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Indicator */}
      {(groupingStrategy !== "domain" || !showRegionalBreakdown || combineHealthchecks) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-800">
                Dashboard Configuration: {groupingStrategy === "domain" ? "Domain-based" : 
                  groupingStrategy === "service-type" ? "Service Type" :
                  groupingStrategy === "criticality" ? "Criticality Level" : "Business Function"}
                {!showRegionalBreakdown && " (Regional Consolidation)"}
                {combineHealthchecks && " (Combined Health Indicators)"}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Events Banner */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Active Events</span>
            <Badge className="text-white bg-green-800">2</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Matrix */}
      <Card>
        <CardContent className="p-4">
          <div className={`grid gap-4 ${combineHealthchecks ? 'grid-cols-6' : 'grid-cols-7'}`}>
            {/* Headers */}
            <div className="font-medium">Domain</div>
            <div className="font-medium">Tenancy</div>
            {combineHealthchecks ? (
              <div className="font-medium text-center">Health Status</div>
            ) : (
              <>
                <div className="font-medium text-center">Alerts</div>
                <div className="font-medium text-center">Healthchecks</div>
              </>
            )}
            <div className="font-medium text-center">Incidents</div>
            <div className="font-medium text-center">Releases</div>
            <div className="font-medium text-center">Services</div>

            {/* Status Rows */}
            {domains.map((domain) => 
              domain.tenancies.map((tenancy) => {
                const incidentStatus = getIncidentStatus(domain.name, tenancy.name);
                
                return (
                  <React.Fragment key={`${domain.name}-${tenancy.name}`}>
                    <div 
                      className="p-2 border rounded text-sm bg-blue-50 font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => handleDomainClick(domain.name)}
                    >
                      {domain.name}
                    </div>
                    <div className="p-2 border rounded text-sm bg-gray-50">
                      {tenancy.name}
                    </div>
                    {combineHealthchecks ? (
                      <div className="flex justify-center">
                        <div onClick={() => handleStatusClick('health', tenancy.name, domain.name)}>
                          {getStatusIcon(tenancy.alerts === "red" || tenancy.healthchecks === "red" ? "red" : "green", true)}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <div onClick={() => handleStatusClick('alerts', tenancy.name, domain.name)}>
                            {getStatusIcon(tenancy.alerts, true)}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div onClick={() => handleStatusClick('healthchecks', tenancy.name, domain.name)}>
                            {getStatusIcon(tenancy.healthchecks, true)}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex justify-center">
                      <div onClick={() => handleStatusClick('incidents', tenancy.name, domain.name)}>
                        {getStatusIcon(incidentStatus, true)}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div onClick={() => handleStatusClick('releases', tenancy.name, domain.name)}>
                        {getStatusIcon(tenancy.releases, true)}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button 
                        onClick={() => handleStatusClick('services', tenancy.name, domain.name)}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                      >
                        {tenancy.services}
                      </button>
                    </div>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Legend */}
      <StatusLegend />
    </div>
  );
};
