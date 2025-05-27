
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
  application?: string;
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
  const applications = [
    "JB Direct", "In-Store", "Online", "Fulfilment & Consignment", 
    "Receiving & Transfer", "SMS Communication", "Email Communication", "Fraud Prevention"
  ];
  const severities = ["low", "medium", "high", "critical"];
  const statuses = ["investigating", "in-progress", "resolved", "closed"];
  
  const services = [
    "API Gateway", "Database", "Authentication", "Payment Gateway", "Email Service",
    "File Storage", "Cache Service", "Load Balancer", "Monitoring", "Backup Service",
    "CDN", "Search Engine", "Analytics", "Notification Service", "Order Processing"
  ];

  const incidentTitlesByApplication = {
    "JB Direct": [
      "JB Direct Mobile App Crash", "Direct Ordering API Timeout", "JB Direct Payment Failed",
      "Mobile Authentication Issues", "Direct Cart Sync Problems", "JB Direct Performance Slow"
    ],
    "In-Store": [
      "POS System Unresponsive", "In-Store Payment Terminal Down", "Barcode Scanner Malfunction",
      "In-Store Inventory Sync Failed", "Staff Portal Login Issues", "Receipt Printer Offline"
    ],
    "Online": [
      "Website Loading Slowly", "Online Checkout Errors", "Search Function Broken",
      "Product Images Not Loading", "Online Payment Gateway Down", "Shopping Cart Issues"
    ],
    "Fulfilment & Consignment": [
      "Order Processing Delays", "Inventory Management Down", "Shipping Integration Failed",
      "Warehouse System Offline", "Stock Level Discrepancies", "Fulfilment API Errors"
    ],
    "Receiving & Transfer": [
      "Stock Receipt System Down", "Transfer Orders Failed", "Receiving Portal Timeout",
      "Stock Movement Tracking Lost", "Supplier Integration Issues", "Goods-In Process Halted"
    ],
    "SMS Communication": [
      "SMS Delivery Failures", "Text Notifications Delayed", "SMS Gateway Timeout",
      "Marketing SMS Not Sending", "SMS Authentication Failed", "Bulk SMS Processing Slow"
    ],
    "Email Communication": [
      "Email Delivery Delays", "SMTP Server Down", "Newsletter System Failed",
      "Transactional Emails Missing", "Email Templates Broken", "Email Queue Backed Up"
    ],
    "Fraud Prevention": [
      "Fraud Detection System Down", "Risk Assessment Failed", "Security Scanner Offline",
      "Payment Verification Slow", "Fraud Rules Engine Error", "Risk Score Calculation Failed"
    ]
  };

  const creators = [
    "System Monitor", "John Smith", "Sarah Johnson", "Mike Wilson", "Emma Davis",
    "Support Team", "DevOps Team", "Security Team", "Database Admin", "Network Team"
  ];

  const incidents: Incident[] = [];
  
  for (let i = 1; i <= 75; i++) {
    const application = applications[Math.floor(Math.random() * applications.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tenancy = tenancies[Math.floor(Math.random() * tenancies.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const creator = creators[Math.floor(Math.random() * creators.length)];
    
    const applicationTitles = incidentTitlesByApplication[application as keyof typeof incidentTitlesByApplication];
    const title = applicationTitles[Math.floor(Math.random() * applicationTitles.length)];
    
    const createdDate = new Date(2025, 0, Math.floor(Math.random() * 27) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    const updatedDate = new Date(createdDate.getTime() + Math.random() * 48 * 60 * 60 * 1000);
    
    const affectedServices = services.slice(0, Math.floor(Math.random() * 4) + 1);
    
    incidents.push({
      id: `INC-${String(i).padStart(3, '0')}`,
      title: `${title} - ${tenancy}`,
      severity,
      status,
      createdBy: creator,
      createdAt: createdDate.toISOString().slice(0, 16).replace('T', ' '),
      updatedAt: updatedDate.toISOString().slice(0, 16).replace('T', ' '),
      affectedServices,
      domain,
      tenancy,
      application
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
