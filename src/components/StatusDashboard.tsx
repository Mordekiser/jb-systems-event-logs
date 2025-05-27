import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, XCircle, Info } from "lucide-react";
import { StatusLegend } from "./StatusLegend";
import { useIncidents } from "@/contexts/IncidentContext";
import { useEvents } from "@/contexts/EventsContext";
import { useConfig } from "@/contexts/ConfigContext";

interface StatusDashboardProps {
  onStatusClick?: (statusType: string, tenancy: string, domain: string) => void;
  onDomainClick?: (domain: string) => void;
}

export const StatusDashboard = ({ onStatusClick, onDomainClick }: StatusDashboardProps) => {
  const { getIncidentsByDomainAndTenancy } = useIncidents();
  const { events } = useEvents();
  const { groupingStrategy, showRegionalBreakdown, combineHealthchecks } = useConfig();

  const getImpactStatus = (domain: string, tenancy: string, statusType: string) => {
    // Get incidents for this domain and tenancy
    const domainIncidents = getIncidentsByDomainAndTenancy(domain, tenancy);
    const activeIncidents = domainIncidents.filter(incident => incident.status !== 'resolved');
    
    // Get events for this domain and tenancy
    const domainEvents = events.filter(event => 
      event.domainsAffected.includes(domain) && 
      event.locations.some(loc => loc.tenant.toLowerCase().includes(tenancy.toLowerCase())) &&
      event.status !== 'Complete'
    );

    // Combine all impacts from incidents and events
    const allImpacts: string[] = [];
    
    // Add incident impacts (map severity to impact)
    activeIncidents.forEach(incident => {
      if (incident.severity === 'high') allImpacts.push('Major');
      else if (incident.severity === 'medium') allImpacts.push('Minor');
      else allImpacts.push('Trivial');
    });
    
    // Add event impacts
    domainEvents.forEach(event => {
      allImpacts.push(event.impact);
    });

    // For Azure alerts simulation, add some demo impact data based on domain/tenancy
    if (statusType === 'alerts' || statusType === 'healthchecks') {
      // Simulate some alert impacts based on domain/tenancy combinations
      if (domain === "Back of House" && tenancy === "AU") {
        allImpacts.push('Major'); // Simulating critical alerts in AU Back of House
      }
    }

    // Apply impact hierarchy logic
    if (allImpacts.includes('Major')) return 'major';
    if (allImpacts.includes('Minor')) return 'minor';
    if (allImpacts.includes('Trivial')) return 'trivial';
    
    // Default to trivial if no issues
    return 'trivial';
  };

  const originalDomains = [
    {
      name: "Back of House",
      tenancies: [
        { name: "AU", services: 15 },
        { name: "NZ", services: 8 }
      ]
    },
    {
      name: "Front of House", 
      tenancies: [
        { name: "AU", services: 5 },
        { name: "NZ", services: 4 }
      ]
    },
    {
      name: "Data Services",
      tenancies: [
        { name: "AU", services: 8 },
        { name: "NZ", services: 7 }
      ]
    }
  ];

  const getTransformedDomains = () => {
    if (groupingStrategy === "service-type") {
      return [
        {
          name: "API Services",
          tenancies: showRegionalBreakdown ? 
            [{ name: "AU", services: 12 },
             { name: "NZ", services: 8 }] :
            [{ name: "Combined", services: 20 }]
        },
        {
          name: "Database Services",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", services: 8 },
             { name: "NZ", services: 5 }] :
            [{ name: "Combined", services: 13 }]
        },
        {
          name: "Authentication",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", services: 8 },
             { name: "NZ", services: 6 }] :
            [{ name: "Combined", services: 14 }]
        }
      ];
    } else if (groupingStrategy === "criticality") {
      return [
        {
          name: "Critical Services",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", services: 10 },
             { name: "NZ", services: 7 }] :
            [{ name: "Combined", services: 17 }]
        },
        {
          name: "Standard Services", 
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", services: 15 },
             { name: "NZ", services: 10 }] :
            [{ name: "Combined", services: 25 }]
        },
        {
          name: "Support Services",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", services: 3 },
             { name: "NZ", services: 2 }] :
            [{ name: "Combined", services: 5 }]
        }
      ];
    } else if (groupingStrategy === "business-function") {
      return [
        {
          name: "Customer Services",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", services: 12 },
             { name: "NZ", services: 8 }] :
            [{ name: "Combined", services: 20 }]
        },
        {
          name: "Internal Tools",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", services: 10 },
             { name: "NZ", services: 7 }] :
            [{ name: "Combined", services: 17 }]
        },
        {
          name: "Infrastructure",
          tenancies: showRegionalBreakdown ?
            [{ name: "AU", services: 6 },
             { name: "NZ", services: 4 }] :
            [{ name: "Combined", services: 10 }]
        }
      ];
    } else {
      // Default domain grouping
      if (!showRegionalBreakdown) {
        return originalDomains.map(domain => ({
          name: domain.name,
          tenancies: [{
            name: "Combined",
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
      case "trivial":
        return <Info className={`${baseClasses} ${clickableClasses} text-blue-600`} />;
      case "minor":
        return <AlertTriangle className={`${baseClasses} ${clickableClasses} text-orange-600`} />;
      case "major":
        return <XCircle className={`${baseClasses} ${clickableClasses} text-red-600`} />;
      default:
        return <Info className={`${baseClasses} ${clickableClasses} text-blue-600`} />;
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
                const alertsStatus = getImpactStatus(domain.name, tenancy.name, 'alerts');
                const healthchecksStatus = getImpactStatus(domain.name, tenancy.name, 'healthchecks');
                const incidentsStatus = getImpactStatus(domain.name, tenancy.name, 'incidents');
                const releasesStatus = getImpactStatus(domain.name, tenancy.name, 'releases');
                
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
                          {getStatusIcon(alertsStatus === "major" || healthchecksStatus === "major" ? "major" : 
                                       alertsStatus === "minor" || healthchecksStatus === "minor" ? "minor" : "trivial", true)}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <div onClick={() => handleStatusClick('alerts', tenancy.name, domain.name)}>
                            {getStatusIcon(alertsStatus, true)}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div onClick={() => handleStatusClick('healthchecks', tenancy.name, domain.name)}>
                            {getStatusIcon(healthchecksStatus, true)}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex justify-center">
                      <div onClick={() => handleStatusClick('incidents', tenancy.name, domain.name)}>
                        {getStatusIcon(incidentsStatus, true)}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div onClick={() => handleStatusClick('releases', tenancy.name, domain.name)}>
                        {getStatusIcon(releasesStatus, true)}
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
