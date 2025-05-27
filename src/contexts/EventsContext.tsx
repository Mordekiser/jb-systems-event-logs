
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Location {
  tenant: string;
  locationIds: number[];
}

interface StatusHistoryEntry {
  createdBySource: "Manual" | "Azure Alert";
  createdTimestamp: string;
  createdBy: string;
  updatedTimestamp: string | null;
  updatedBy: string | null;
  status: "Under Investigation" | "Scheduled" | "In Progress" | "Complete";
  historyType: "Initial" | "Update" | "Complete";
  description: string;
}

interface SystemEvent {
  id: string;
  title: string;
  description: string;
  eventType: "Incident" | "Deployment";
  impact: "Trivial" | "Minor" | "Major";
  locations: Location[];
  status: "Under Investigation" | "Scheduled" | "In Progress" | "Complete";
  createdBySource: "Manual" | "Azure Alert";
  createdTimestamp: string;
  createdBy: string;
  updatedTimestamp: string;
  updatedBy: string;
  fromTimestamp: string;
  toTimestamp: string;
  resolutionEtaTimestamp?: string;
  notificationTimestamp?: string;
  systemsAffected: string[];
  domainsAffected: string[];
  statusHistory: StatusHistoryEntry[];
}

interface EventsContextType {
  events: SystemEvent[];
  setEvents: (events: SystemEvent[]) => void;
  addEvent: (event: SystemEvent) => void;
  deleteEvent: (eventId: string) => void;
  updateEvent: (eventId: string, updatedEvent: Partial<SystemEvent>) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

const generateDemoEvents = (): SystemEvent[] => {
  const domains = ["Front of House", "Back of House", "Core Retail", "Data Services", "Cloud Infrastructure"];
  const tenants = ["jbh-au", "jbh-nz", "jbh-uk", "jbh-us"];
  const eventTypes: ("Incident" | "Deployment")[] = ["Incident", "Deployment"];
  const impacts: ("Trivial" | "Minor" | "Major")[] = ["Trivial", "Minor", "Major"];
  const statuses: ("Under Investigation" | "Scheduled" | "In Progress" | "Complete")[] = ["Under Investigation", "Scheduled", "In Progress", "Complete"];
  const createdBySources: ("Manual" | "Azure Alert")[] = ["Manual", "Azure Alert"];
  
  const systems = [
    "Database Server", "Web Server", "API Gateway", "Load Balancer", "Cache Service",
    "Payment Gateway", "Authentication Service", "Email Service", "File Storage",
    "Message Queue", "Analytics Engine", "Monitoring System", "Backup Service",
    "CDN", "Security Scanner", "Notification Service", "Search Engine",
    "Order Processing", "Inventory Management", "Customer Portal", "Admin Dashboard"
  ];

  const events: SystemEvent[] = [];

  for (let i = 1; i <= 100; i++) {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const impact = impacts[Math.floor(Math.random() * impacts.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdBySource = createdBySources[Math.floor(Math.random() * createdBySources.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tenant = tenants[Math.floor(Math.random() * tenants.length)];
    
    const createdDate = new Date(2025, 0, Math.floor(Math.random() * 27) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    const fromDate = new Date(createdDate.getTime() + Math.random() * 24 * 60 * 60 * 1000);
    const toDate = new Date(fromDate.getTime() + Math.random() * 12 * 60 * 60 * 1000);
    const updatedDate = new Date(createdDate.getTime() + Math.random() * 48 * 60 * 60 * 1000);

    const affectedSystems = systems.slice(0, Math.floor(Math.random() * 5) + 1);
    const affectedDomains = domains.slice(0, Math.floor(Math.random() * 3) + 1);

    const creators = createdBySource === "Manual" 
      ? ["Admin User", "John Smith", "Sarah Johnson", "Mike Wilson", "Emma Davis", "Support Team", "DevOps Team"]
      : ["Azure Monitor", "Application Insights", "System Alert"];
    
    const creator = creators[Math.floor(Math.random() * creators.length)];

    const titles = eventType === "Incident" ? [
      "Database Connection Timeout",
      "High CPU Usage Alert",
      "Memory Leak Detected",
      "API Response Time Degradation",
      "Payment Processing Failure",
      "Authentication Service Down",
      "Email Delivery Issues",
      "File Upload Errors",
      "Cache Service Unresponsive",
      "Load Balancer Health Check Failed",
      "SSL Certificate Expiring",
      "Disk Space Warning",
      "Network Connectivity Issues",
      "Security Breach Detected",
      "Backup Job Failed",
      "CDN Performance Degraded",
      "Search Index Corruption",
      "Order Processing Delays",
      "Customer Login Issues",
      "Admin Dashboard Unavailable"
    ] : [
      "Database Maintenance Window",
      "API Gateway Upgrade",
      "Security Patch Deployment",
      "New Feature Release",
      "Infrastructure Migration",
      "Load Balancer Configuration Update",
      "SSL Certificate Renewal",
      "Monitoring System Enhancement",
      "Cache Service Optimization",
      "Backup System Upgrade",
      "CDN Configuration Update",
      "Performance Optimization",
      "Security Enhancement",
      "System Health Check",
      "Data Migration Process",
      "Service Configuration Update",
      "Network Infrastructure Upgrade",
      "Application Performance Tuning",
      "Database Index Optimization",
      "Log Retention Policy Update"
    ];

    const descriptions = eventType === "Incident" ? [
      "Multiple database connection timeouts detected across services",
      "CPU usage has exceeded 85% threshold for extended period",
      "Memory consumption increasing steadily without release",
      "API response times have increased significantly",
      "Payment processing service experiencing intermittent failures",
      "Authentication service is completely unresponsive",
      "Email service failing to deliver messages to customers",
      "File upload functionality returning errors consistently",
      "Cache service not responding to health checks",
      "Load balancer failing health checks for backend services",
      "SSL certificate will expire within 30 days",
      "Disk space usage has exceeded 90% on critical servers",
      "Network connectivity issues affecting multiple services",
      "Potential security breach detected in system logs",
      "Automated backup job has failed multiple times",
      "CDN performance has degraded significantly",
      "Search index appears to be corrupted",
      "Order processing experiencing significant delays",
      "Customers unable to log into their accounts",
      "Admin dashboard is completely inaccessible"
    ] : [
      "Scheduled database maintenance for performance optimization",
      "Upgrading API gateway to latest version with security fixes",
      "Deploying critical security patches across all systems",
      "Rolling out new customer-facing features",
      "Migrating services to new infrastructure platform",
      "Updating load balancer configuration for better performance",
      "Renewing SSL certificates before expiration",
      "Enhancing monitoring capabilities with new tools",
      "Optimizing cache service for better performance",
      "Upgrading backup system to latest version",
      "Updating CDN configuration for global performance",
      "Implementing performance optimizations across services",
      "Deploying security enhancements and hardening",
      "Performing comprehensive system health checks",
      "Migrating historical data to new storage system",
      "Updating service configurations for compliance",
      "Upgrading network infrastructure for better reliability",
      "Fine-tuning application performance parameters",
      "Optimizing database indexes for query performance",
      "Updating log retention policies for compliance"
    ];

    const title = titles[Math.floor(Math.random() * titles.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];

    const event: SystemEvent = {
      id: `evt_${String(i).padStart(3, '0')}`,
      title,
      description,
      eventType,
      impact,
      locations: [
        { tenant, locationIds: Array.from({length: Math.floor(Math.random() * 5)}, (_, i) => i + 1) }
      ],
      status,
      createdBySource,
      createdTimestamp: createdDate.toISOString(),
      createdBy: creator,
      updatedTimestamp: updatedDate.toISOString(),
      updatedBy: creator,
      fromTimestamp: fromDate.toISOString(),
      toTimestamp: toDate.toISOString(),
      systemsAffected: affectedSystems,
      domainsAffected: affectedDomains,
      statusHistory: [{
        createdBySource,
        createdTimestamp: createdDate.toISOString(),
        createdBy: creator,
        updatedTimestamp: updatedDate.toISOString(),
        updatedBy: creator,
        status,
        historyType: "Initial",
        description: `${eventType} created: ${description}`
      }]
    };

    events.push(event);
  }

  return events.sort((a, b) => new Date(b.createdTimestamp).getTime() - new Date(a.createdTimestamp).getTime());
};

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<SystemEvent[]>(generateDemoEvents());

  const addEvent = (event: SystemEvent) => {
    setEvents(prev => [event, ...prev]);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const updateEvent = (eventId: string, updatedEvent: Partial<SystemEvent>) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, ...updatedEvent, updatedTimestamp: new Date().toISOString() }
        : event
    ));
  };

  return (
    <EventsContext.Provider value={{
      events,
      setEvents,
      addEvent,
      deleteEvent,
      updateEvent
    }}>
      {children}
    </EventsContext.Provider>
  );
};
