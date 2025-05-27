
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Incident {
  id: string;
  title: string;
  severity: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  affectedServices: string[];
  domain?: string;
  tenancy?: string;
}

interface IncidentContextType {
  incidents: Incident[];
  setIncidents: (incidents: Incident[]) => void;
  updateIncidentStatus: (incidentId: string, newStatus: string) => void;
  addIncident: (incident: Omit<Incident, 'id'>) => void;
  deleteIncident: (incidentId: string) => void;
  getIncidentsByDomainAndTenancy: (domain: string, tenancy: string) => Incident[];
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};

const generateDemoIncidents = (): Incident[] => {
  const domains = ["Front of House", "Back of House", "Core Retail", "Data Services", "Cloud Infrastructure"];
  const tenancies = ["AU", "NZ", "UK", "US"];
  const severities = ["low", "medium", "high", "critical"];
  const statuses = ["investigating", "in-progress", "resolved", "closed"];
  
  const services = [
    "API Gateway", "Database", "Authentication", "Payment Gateway", "Email Service",
    "File Storage", "Cache Service", "Load Balancer", "Monitoring", "Backup Service",
    "CDN", "Search Engine", "Analytics", "Notification Service", "Order Processing"
  ];

  const incidentTitles = [
    "Database Performance Issues", "API Gateway Timeout", "Authentication Service Down", 
    "Payment Processing Failure", "Email Delivery Delays", "File Upload Errors",
    "Cache Service Unresponsive", "Load Balancer Health Check Failed", "High Error Rates",
    "Memory Leak Detected", "Disk Space Critical", "Network Connectivity Issues",
    "SSL Certificate Expired", "Backup Job Failed", "Security Breach Detected",
    "Performance Degradation", "Service Unavailable", "Data Corruption Detected",
    "Queue Processing Delays", "Search Index Corruption", "Notification Failures",
    "User Session Issues", "Integration Endpoint Down", "Monitoring Alert Storm",
    "Resource Exhaustion", "Configuration Error", "Deployment Rollback Required",
    "Third-party Service Outage", "Database Deadlock", "Application Crash"
  ];

  const creators = [
    "System Monitor", "John Smith", "Sarah Johnson", "Mike Wilson", "Emma Davis",
    "Support Team", "DevOps Team", "Security Team", "Database Admin", "Network Team"
  ];

  const incidents: Incident[] = [];
  
  for (let i = 1; i <= 75; i++) {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tenancy = tenancies[Math.floor(Math.random() * tenancies.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const title = incidentTitles[Math.floor(Math.random() * incidentTitles.length)];
    const creator = creators[Math.floor(Math.random() * creators.length)];
    
    const createdDate = new Date(2025, 0, Math.floor(Math.random() * 27) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    const updatedDate = new Date(createdDate.getTime() + Math.random() * 48 * 60 * 60 * 1000);
    
    const affectedServices = services.slice(0, Math.floor(Math.random() * 4) + 1);
    
    incidents.push({
      id: `INC-${String(i).padStart(3, '0')}`,
      title: `${title} - ${domain} ${tenancy}`,
      severity,
      status,
      createdBy: creator,
      createdAt: createdDate.toISOString().slice(0, 16).replace('T', ' '),
      updatedAt: updatedDate.toISOString().slice(0, 16).replace('T', ' '),
      affectedServices,
      domain,
      tenancy
    });
  }
  
  return incidents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const IncidentProvider = ({ children }: { children: ReactNode }) => {
  const [incidents, setIncidents] = useState<Incident[]>(generateDemoIncidents());

  const updateIncidentStatus = (incidentId: string, newStatus: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { ...incident, status: newStatus, updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
        : incident
    ));
  };

  const addIncident = (newIncident: Omit<Incident, 'id'>) => {
    const incident: Incident = {
      ...newIncident,
      id: `INC-${String(incidents.length + 1).padStart(3, '0')}`
    };
    setIncidents(prev => [incident, ...prev]);
  };

  const deleteIncident = (incidentId: string) => {
    setIncidents(prev => prev.filter(incident => incident.id !== incidentId));
  };

  const getIncidentsByDomainAndTenancy = (domain: string, tenancy: string) => {
    return incidents.filter(incident => 
      incident.domain === domain && incident.tenancy === tenancy
    );
  };

  return (
    <IncidentContext.Provider value={{
      incidents,
      setIncidents,
      updateIncidentStatus,
      addIncident,
      deleteIncident,
      getIncidentsByDomainAndTenancy
    }}>
      {children}
    </IncidentContext.Provider>
  );
};
