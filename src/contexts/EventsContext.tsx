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
  application?: string;
  statusHistory: StatusHistoryEntry[];
  emailNotificationEnabled?: boolean;
  emailSent?: boolean;
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
  const applications = [
    "JB Direct", "In-Store", "Online", "Fulfilment & Consignment", 
    "Receiving & Transfer", "SMS Communication", "Email Communication", "Fraud Prevention"
  ];
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

  const eventTitlesByApplication = {
    "JB Direct": {
      "Incident": [
        "JB Direct API Gateway Timeout", "Mobile App Authentication Failed", "Direct Order Processing Down",
        "JB Direct Payment Service Unavailable", "Mobile Push Notifications Failed", "Direct Sync Service Error"
      ],
      "Deployment": [
        "JB Direct Mobile App Update", "Direct API Enhancement Release", "JB Direct Performance Optimization",
        "Mobile Security Patch Deployment", "Direct Feature Enhancement", "JB Direct Bug Fix Release"
      ]
    },
    "In-Store": {
      "Incident": [
        "POS Terminal Network Failure", "In-Store Payment Gateway Down", "Staff Portal Authentication Issues",
        "Barcode Scanning System Error", "In-Store Inventory Sync Failed", "Receipt Printing Service Down"
      ],
      "Deployment": [
        "In-Store POS System Upgrade", "Staff Portal Feature Release", "In-Store Security Enhancement",
        "POS Terminal Software Update", "In-Store Inventory System Upgrade", "Staff Training Module Release"
      ]
    },
    "Online": {
      "Incident": [
        "Website Performance Degradation", "Online Checkout Process Failed", "Search Service Unresponsive",
        "Product Catalog Service Down", "Online Payment Processing Error", "Website CDN Issues"
      ],
      "Deployment": [
        "Website UI/UX Enhancement", "Online Checkout Optimization", "Search Algorithm Improvement",
        "Product Recommendation Engine Update", "Website Performance Optimization", "Online Security Patch"
      ]
    },
    "Fulfilment & Consignment": {
      "Incident": [
        "Order Processing System Down", "Inventory Management Service Failed", "Shipping Integration Error",
        "Warehouse Management System Offline", "Stock Level Sync Issues", "Fulfilment API Timeout"
      ],
      "Deployment": [
        "Warehouse Management System Upgrade", "Order Processing Enhancement", "Inventory Optimization Release",
        "Shipping Integration Improvement", "Stock Management Feature Update", "Fulfilment Process Automation"
      ]
    },
    "Receiving & Transfer": {
      "Incident": [
        "Stock Receipt System Failure", "Transfer Management Service Down", "Receiving Portal Timeout",
        "Stock Movement Tracking Lost", "Supplier Integration Failed", "Goods-In Process Error"
      ],
      "Deployment": [
        "Receiving System Enhancement", "Transfer Management Upgrade", "Stock Tracking Improvement",
        "Supplier Integration Update", "Goods-In Process Optimization", "Receiving Portal Feature Release"
      ]
    },
    "SMS Communication": {
      "Incident": [
        "SMS Gateway Service Down", "Text Message Delivery Failed", "SMS Queue Processing Error",
        "Marketing SMS System Timeout", "SMS Authentication Service Failed", "Bulk SMS Processing Slow"
      ],
      "Deployment": [
        "SMS Gateway Upgrade", "Text Messaging Enhancement", "SMS Template System Update",
        "Marketing SMS Feature Release", "SMS Delivery Optimization", "Communication Platform Upgrade"
      ]
    },
    "Email Communication": {
      "Incident": [
        "Email Delivery Service Down", "SMTP Server Connection Failed", "Newsletter System Error",
        "Email Template Rendering Failed", "Email Queue Backup", "Transactional Email Service Timeout"
      ],
      "Deployment": [
        "Email System Upgrade", "Newsletter Platform Enhancement", "Email Template System Update",
        "Transactional Email Optimization", "Email Delivery Improvement", "Communication Service Release"
      ]
    },
    "Fraud Prevention": {
      "Incident": [
        "Fraud Detection System Offline", "Risk Assessment Service Failed", "Security Scanning Error",
        "Payment Verification Timeout", "Fraud Rules Engine Down", "Risk Scoring Service Unavailable"
      ],
      "Deployment": [
        "Fraud Detection Algorithm Update", "Security System Enhancement", "Risk Assessment Improvement",
        "Payment Security Upgrade", "Fraud Prevention Feature Release", "Security Monitoring Enhancement"
      ]
    }
  };

  const events: SystemEvent[] = [];

  for (let i = 1; i <= 100; i++) {
    const application = applications[Math.floor(Math.random() * applications.length)];
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

    const applicationTitles = eventTitlesByApplication[application as keyof typeof eventTitlesByApplication][eventType];
    const title = applicationTitles[Math.floor(Math.random() * applicationTitles.length)];

    const descriptions = eventType === "Incident" ? [
      `Critical ${application} service experiencing failures affecting user operations`,
      `${application} system performance significantly degraded beyond acceptable thresholds`,
      `${application} service components are unresponsive to user requests`,
      `${application} integration with external services has failed completely`,
      `${application} database connectivity issues causing service disruption`,
      `${application} authentication and authorization services not functioning`,
      `${application} payment processing capabilities are currently unavailable`,
      `${application} data synchronization processes have stopped working`,
      `${application} monitoring systems indicate critical service failures`,
      `${application} user interface components are not loading properly`
    ] : [
      `Scheduled ${application} system maintenance for performance optimization and updates`,
      `${application} feature enhancement deployment to improve user experience`,
      `${application} security patches and vulnerability fixes implementation`,
      `${application} infrastructure upgrade to latest stable versions`,
      `${application} configuration updates for improved system reliability`,
      `${application} database optimization and performance tuning deployment`,
      `${application} integration enhancements with third-party services`,
      `${application} user interface improvements and accessibility updates`,
      `${application} monitoring and alerting system enhancements`,
      `${application} backup and disaster recovery system improvements`
    ];

    const description = descriptions[Math.floor(Math.random() * descriptions.length)];

    // Add email notification settings - 70% chance of having email enabled
    const emailNotificationEnabled = Math.random() > 0.3;
    const emailSent = emailNotificationEnabled && Math.random() > 0.4; // 60% of enabled notifications are sent

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
      application,
      emailNotificationEnabled,
      emailSent,
      statusHistory: [{
        createdBySource,
        createdTimestamp: createdDate.toISOString(),
        createdBy: creator,
        updatedTimestamp: updatedDate.toISOString(),
        updatedBy: creator,
        status,
        historyType: "Initial",
        description: `${eventType} created for ${application}: ${description}`
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
