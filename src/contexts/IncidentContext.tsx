
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

export const IncidentProvider = ({ children }: { children: ReactNode }) => {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "INC-001",
      title: "High API Response Times",
      severity: "high",
      status: "investigating",
      createdBy: "System Monitor",
      createdAt: "2024-01-15 15:45",
      updatedAt: "2024-01-15 16:00",
      affectedServices: ["API Gateway", "Database"],
      domain: "Back of House",
      tenancy: "NZ"
    },
    {
      id: "INC-002", 
      title: "Email Service Intermittent Failures",
      severity: "medium",
      status: "in-progress",
      createdBy: "John Doe",
      createdAt: "2024-01-15 14:20",
      updatedAt: "2024-01-15 15:30",
      affectedServices: ["Email Service"],
      domain: "Back of House",
      tenancy: "AU"
    },
    {
      id: "INC-003",
      title: "Login Authentication Delays",
      severity: "low",
      status: "resolved",
      createdBy: "Jane Smith",
      createdAt: "2024-01-15 09:15",
      updatedAt: "2024-01-15 11:45",
      affectedServices: ["Authentication"],
      domain: "Front of House",
      tenancy: "NZ"
    }
  ]);

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
