
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

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<SystemEvent[]>([
    {
      id: "evt_001",
      title: "Database Maintenance",
      description: "Scheduled database maintenance for performance optimization",
      eventType: "Deployment",
      impact: "Minor",
      locations: [
        { tenant: "jbh-au", locationIds: [1, 2, 3] },
        { tenant: "jbh-nz", locationIds: [] }
      ],
      status: "Scheduled",
      createdBySource: "Manual",
      createdTimestamp: "2025-01-20T10:00:00Z",
      createdBy: "Admin User",
      updatedTimestamp: "2025-01-20T10:00:00Z",
      updatedBy: "Admin User",
      fromTimestamp: "2025-01-21T02:00:00Z",
      toTimestamp: "2025-01-21T04:00:00Z",
      systemsAffected: ["Database", "API Gateway"],
      domainsAffected: ["Customer Orders", "Inventory"],
      statusHistory: [{
        createdBySource: "Manual",
        createdTimestamp: "2025-01-20T10:00:00Z",
        createdBy: "Admin User",
        updatedTimestamp: "2025-01-20T10:00:00Z",
        updatedBy: "Admin User",
        status: "Scheduled",
        historyType: "Initial",
        description: "Deployment created: Scheduled database maintenance for performance optimization"
      }]
    },
    {
      id: "evt_002",
      title: "Payment Service Outage",
      description: "Payment processing service is experiencing intermittent failures",
      eventType: "Incident",
      impact: "Major",
      locations: [
        { tenant: "jbh-au", locationIds: [] }
      ],
      status: "Under Investigation",
      createdBySource: "Manual",
      createdTimestamp: "2025-01-20T14:30:00Z",
      createdBy: "Support Team",
      updatedTimestamp: "2025-01-20T15:00:00Z",
      updatedBy: "Support Team",
      fromTimestamp: "2025-01-20T14:15:00Z",
      toTimestamp: "2025-01-20T16:00:00Z",
      systemsAffected: ["Payment Gateway", "Order Processing"],
      domainsAffected: ["Customer Orders"],
      statusHistory: [{
        createdBySource: "Manual",
        createdTimestamp: "2025-01-20T14:30:00Z",
        createdBy: "Support Team",
        updatedTimestamp: "2025-01-20T15:00:00Z",
        updatedBy: "Support Team",
        status: "Under Investigation",
        historyType: "Initial",
        description: "Incident created: Payment processing service is experiencing intermittent failures"
      }]
    }
  ]);

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
