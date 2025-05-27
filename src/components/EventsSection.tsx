import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Package, GitBranch, Trash2, Filter, X, Eye, Edit } from "lucide-react";
import { useEvents } from "@/contexts/EventsContext";
import { EventDeleteConfirmDialog } from "@/components/EventDeleteConfirmDialog";
import { EventDetailsModal } from "@/components/EventDetailsModal";
import { EventEditModal } from "@/components/EventEditModal";

interface EventFilters {
  createdBy?: string;
  createdFromDate?: string;
  createdToDate?: string;
  updatedBy?: string;
  updatedFromDate?: string;
  updatedToDate?: string;
  eventCreationType?: "Manual" | "Azure Alert";
  historyType?: "Initial" | "Update" | "Complete";
}

interface EventsSectionProps {
  filter?: {
    type?: string;
    domain?: string;
    tenancy?: string;
  };
}

export const EventsSection = ({ filter = {} }: EventsSectionProps) => {
  const { events } = useEvents();
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    eventId: string;
    eventTitle: string;
    eventType: string;
  }>({
    open: false,
    eventId: "",
    eventTitle: "",
    eventType: ""
  });
  const [eventFilters, setEventFilters] = useState<EventFilters>({});
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showEventEdit, setShowEventEdit] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Under Investigation":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Incident":
        return "bg-red-100 text-red-800";
      case "Deployment":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Major":
        return "bg-red-100 text-red-800";
      case "Minor":
        return "bg-yellow-100 text-yellow-800";
      case "Trivial":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteClick = (eventId: string, eventTitle: string, eventType: string) => {
    setDeleteDialog({
      open: true,
      eventId,
      eventTitle,
      eventType
    });
  };

  const handleDeleteConfirm = () => {
    setDeleteDialog({
      open: false,
      eventId: "",
      eventTitle: "",
      eventType: ""
    });
  };

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setShowEventEdit(true);
  };

  const handleFilterChange = (key: keyof EventFilters, value: string | undefined) => {
    const newFilters = {
      ...eventFilters,
      [key]: value === "all" ? undefined : value || undefined
    };
    setEventFilters(newFilters);
  };

  const clearAllFilters = () => {
    setEventFilters({});
  };

  const hasActiveFilters = Object.values(eventFilters).some(value => value !== undefined && value !== "");

  const filterEvents = () => {
    let filteredEvents = events;

    // Apply legacy filters
    if (filter.type) {
      filteredEvents = filteredEvents.filter(event => 
        event.eventType.toLowerCase() === filter.type?.toLowerCase()
      );
    }
    if (filter.domain) {
      filteredEvents = filteredEvents.filter(event => 
        event.domainsAffected.includes(filter.domain!)
      );
    }
    if (filter.tenancy) {
      filteredEvents = filteredEvents.filter(event => 
        event.locations.some(location => location.tenant.includes(filter.tenancy!.toLowerCase()))
      );
    }

    // Apply new event filters
    if (eventFilters.createdBy) {
      filteredEvents = filteredEvents.filter(event => 
        event.createdBy.toLowerCase().includes(eventFilters.createdBy!.toLowerCase())
      );
    }
    if (eventFilters.updatedBy) {
      filteredEvents = filteredEvents.filter(event => 
        event.updatedBy.toLowerCase().includes(eventFilters.updatedBy!.toLowerCase())
      );
    }
    if (eventFilters.eventCreationType) {
      filteredEvents = filteredEvents.filter(event => 
        event.createdBySource === eventFilters.eventCreationType
      );
    }
    if (eventFilters.historyType) {
      filteredEvents = filteredEvents.filter(event => 
        event.statusHistory.some(history => history.historyType === eventFilters.historyType)
      );
    }
    if (eventFilters.createdFromDate) {
      filteredEvents = filteredEvents.filter(event => 
        new Date(event.createdTimestamp) >= new Date(eventFilters.createdFromDate!)
      );
    }
    if (eventFilters.createdToDate) {
      filteredEvents = filteredEvents.filter(event => 
        new Date(event.createdTimestamp) <= new Date(eventFilters.createdToDate!)
      );
    }
    if (eventFilters.updatedFromDate) {
      filteredEvents = filteredEvents.filter(event => 
        new Date(event.updatedTimestamp) >= new Date(eventFilters.updatedFromDate!)
      );
    }
    if (eventFilters.updatedToDate) {
      filteredEvents = filteredEvents.filter(event => 
        new Date(event.updatedTimestamp) <= new Date(eventFilters.updatedToDate!)
      );
    }

    return filteredEvents;
  };

  const filteredEvents = filterEvents();

  return (
    <div className="space-y-6">
      {/* Events Header with Integrated Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>System Events</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              >
                <Filter className="h-4 w-4 mr-1" />
                {isFiltersExpanded ? "Hide" : "Show"} Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {isFiltersExpanded && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Created By */}
              <div>
                <Label htmlFor="createdBy">Created By</Label>
                <Input
                  id="createdBy"
                  placeholder="Enter creator name"
                  value={eventFilters.createdBy || ""}
                  onChange={(e) => handleFilterChange("createdBy", e.target.value)}
                />
              </div>

              {/* Updated By */}
              <div>
                <Label htmlFor="updatedBy">Updated By</Label>
                <Input
                  id="updatedBy"
                  placeholder="Enter updater name"
                  value={eventFilters.updatedBy || ""}
                  onChange={(e) => handleFilterChange("updatedBy", e.target.value)}
                />
              </div>

              {/* Event Creation Type */}
              <div>
                <Label htmlFor="eventCreationType">Event Creation Type</Label>
                <Select
                  value={eventFilters.eventCreationType || "all"}
                  onValueChange={(value) => handleFilterChange("eventCreationType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select creation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Azure Alert">Azure Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* History Type */}
              <div>
                <Label htmlFor="historyType">History Type</Label>
                <Select
                  value={eventFilters.historyType || "all"}
                  onValueChange={(value) => handleFilterChange("historyType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select history type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Initial">Initial</SelectItem>
                    <SelectItem value="Update">Update</SelectItem>
                    <SelectItem value="Complete">Complete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date Filters */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Created Date Range</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  <div>
                    <Label htmlFor="createdFromDate" className="text-xs text-gray-500">From</Label>
                    <Input
                      id="createdFromDate"
                      type="datetime-local"
                      value={eventFilters.createdFromDate || ""}
                      onChange={(e) => handleFilterChange("createdFromDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="createdToDate" className="text-xs text-gray-500">To</Label>
                    <Input
                      id="createdToDate"
                      type="datetime-local"
                      value={eventFilters.createdToDate || ""}
                      onChange={(e) => handleFilterChange("createdToDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Updated Date Range</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  <div>
                    <Label htmlFor="updatedFromDate" className="text-xs text-gray-500">From</Label>
                    <Input
                      id="updatedFromDate"
                      type="datetime-local"
                      value={eventFilters.updatedFromDate || ""}
                      onChange={(e) => handleFilterChange("updatedFromDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="updatedToDate" className="text-xs text-gray-500">To</Label>
                    <Input
                      id="updatedToDate"
                      type="datetime-local"
                      value={eventFilters.updatedToDate || ""}
                      onChange={(e) => handleFilterChange("updatedToDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Events Timeline */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {event.eventType === "Deployment" ? (
                    <GitBranch className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Package className="h-5 w-5 text-gray-500" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(event.eventType)}>
                    {event.eventType}
                  </Badge>
                  <Badge className={getImpactColor(event.impact)}>
                    {event.impact}
                  </Badge>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(event)}
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditEvent(event)}
                    className="text-green-500 hover:text-green-700 hover:bg-green-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(event.id, event.title, event.eventType)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Created By</p>
                  <p className="text-sm">{event.createdBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="text-sm">{new Date(event.createdTimestamp).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">From Time</p>
                  <p className="text-sm">{new Date(event.fromTimestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">To Time</p>
                  <p className="text-sm">{new Date(event.toTimestamp).toLocaleString()}</p>
                </div>
              </div>

              {event.systemsAffected.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Systems Affected</p>
                  <div className="flex flex-wrap gap-2">
                    {event.systemsAffected.map((system, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {event.domainsAffected.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Domains Affected</p>
                  <div className="flex flex-wrap gap-2">
                    {event.domainsAffected.map((domain, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {domain}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No events found matching the current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <EventDeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}
        onConfirm={handleDeleteConfirm}
        eventId={deleteDialog.eventId}
        eventTitle={deleteDialog.eventTitle}
        eventType={deleteDialog.eventType}
      />

      {/* Event Details Modal */}
      <EventDetailsModal
        open={showEventDetails}
        onOpenChange={setShowEventDetails}
        event={selectedEvent}
      />

      {/* Event Edit Modal */}
      <EventEditModal
        open={showEventEdit}
        onOpenChange={setShowEventEdit}
        event={selectedEvent}
      />
    </div>
  );
};
