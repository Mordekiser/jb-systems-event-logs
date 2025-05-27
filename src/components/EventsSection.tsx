
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2, AlertTriangle, Package, Plus, Filter, X, Edit } from "lucide-react";
import { useState } from "react";
import { useIncidents } from "@/contexts/IncidentContext";
import { ManualIncidentCreationModal } from "./ManualIncidentCreationModal";
import { ManualReleaseCreationModal } from "./ManualReleaseCreationModal";
import { IncidentDetailsModal } from "./IncidentDetailsModal";
import { IncidentEditModal } from "./IncidentEditModal";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { HistoryButton } from "./HistoryButton";
import { useToast } from "@/hooks/use-toast";

interface EventsSectionProps {
  filter?: {
    type?: string;
    domain?: string;
    tenancy?: string;
  };
}

export const EventsSection = ({ filter }: EventsSectionProps) => {
  const { incidents, addIncident, deleteIncident } = useIncidents();
  const { toast } = useToast();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Modal states
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  // Mock release events data
  const releases = [
    {
      id: "rel-1",
      title: "v2.4.1 Security Patch",
      type: "release",
      status: "deployed",
      severity: "high",
      startTime: "2024-01-15 14:30",
      endTime: "2024-01-15 16:00",
      impact: "low",
      domain: "Back of House",
      tenancy: "NZ",
      description: "Critical security patch for authentication service",
      affectedServices: ["Authentication API", "User Management"]
    },
    {
      id: "rel-2", 
      title: "v2.4.0 Feature Release",
      type: "release",
      status: "scheduled",
      severity: "medium",
      scheduledTime: "2024-01-16 02:00",
      duration: "2 hours",
      impact: "medium",
      domain: "Front of House",
      tenancy: "AU",
      description: "New customer dashboard and enhanced payment processing",
      affectedServices: ["Customer Portal", "Payment API"]
    }
  ];

  // Convert incidents to match the event format
  const incidentEvents = incidents.map(incident => ({
    ...incident,
    type: "incident",
    startTime: incident.createdAt,
    impact: incident.severity,
    domain: incident.domain || "Unknown",
    tenancy: incident.tenancy || "Unknown",
    description: incident.title || "",
  }));

  // Combine all events
  const allEvents = [...incidentEvents, ...releases];

  // Apply filters
  const filteredEvents = allEvents.filter(event => {
    // Apply passed filter from props (from status dashboard navigation)
    if (filter?.type && event.type !== filter.type) return false;
    if (filter?.domain && event.domain !== filter.domain) return false;
    if (filter?.tenancy && event.tenancy !== filter.tenancy) return false;
    
    // Apply local type filter
    if (typeFilter !== "all" && event.type !== typeFilter) return false;
    
    return true;
  });

  const clearFilter = () => {
    setTypeFilter("all");
  };

  const handleViewDetails = (event: any) => {
    if (event.type === "incident") {
      setSelectedIncident(event);
      setIsDetailsModalOpen(true);
    } else {
      // For releases, show a toast for now (can be expanded later)
      toast({
        title: "Release Details",
        description: `Viewing details for ${event.title}`,
      });
    }
  };

  const handleEditEvent = (event: any) => {
    if (event.type === "incident") {
      setSelectedIncident(event);
      setIsEditModalOpen(true);
    } else {
      // For releases, show a toast for now (can be expanded later)
      toast({
        title: "Edit Release",
        description: `Editing ${event.title} (Release editing coming soon)`,
      });
    }
  };

  const handleDeleteEvent = (event: any) => {
    if (event.type === "incident") {
      setSelectedIncident(event);
      setIsDeleteDialogOpen(true);
    } else {
      // For releases, show a toast for now (can be expanded later)
      toast({
        title: "Delete Release",
        description: `Deleting ${event.title} (Release deletion coming soon)`,
      });
    }
  };

  const handleSaveIncident = (incidentData: any) => {
    addIncident(incidentData);
    toast({
      title: "Incident Created",
      description: "New incident has been created successfully.",
    });
  };

  const handleUpdateIncident = (updatedIncident: any) => {
    // Update functionality would need to be implemented in context
    toast({
      title: "Incident Updated",
      description: "Incident has been updated successfully.",
    });
  };

  const handleConfirmDelete = () => {
    if (selectedIncident) {
      deleteIncident(selectedIncident.id);
      toast({
        title: "Incident Deleted",
        description: "Incident has been deleted successfully.",
      });
    }
  };

  const getEventBadge = (type: string) => {
    const variants = {
      incident: "bg-red-100 text-red-800",
      release: "bg-green-100 text-green-800",
    };
    
    return (
      <Badge className={variants[type as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "in-progress": "bg-yellow-100 text-yellow-800",
      investigating: "bg-orange-100 text-orange-800",
      resolved: "bg-green-100 text-green-800",
      deployed: "bg-blue-100 text-blue-800",
      scheduled: "bg-purple-100 text-purple-800",
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
    };
    
    return (
      <Badge className={variants[severity as keyof typeof variants]}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getEventIcon = (type: string) => {
    return type === "incident" ? AlertTriangle : Package;
  };

  const hasActiveFilter = filter?.type || filter?.domain || filter?.tenancy || typeFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Events</span>
              {filter && (filter.type || filter.domain || filter.tenancy) && (
                <Badge variant="outline" className="ml-2">
                  {filter.type && `${filter.type.charAt(0).toUpperCase() + filter.type.slice(1)}s`}
                  {filter.domain && ` - ${filter.domain}`}
                  {filter.tenancy && ` - ${filter.tenancy}`}
                </Badge>
              )}
            </CardTitle>
            <div className="flex space-x-2">
              <div className="flex space-x-2">
                <Button
                  variant={typeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter("all")}
                >
                  All Events
                </Button>
                <Button
                  variant={typeFilter === "incident" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter("incident")}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Incidents
                </Button>
                <Button
                  variant={typeFilter === "release" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter("release")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Releases
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsIncidentModalOpen(true)}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Incident
                </Button>
                <Button
                  onClick={() => setIsReleaseModalOpen(true)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Release
                </Button>
              </div>
              {hasActiveFilter && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilter}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filter
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const IconComponent = getEventIcon(event.type);
            return (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-gray-500" />
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        {event.description && (
                          <p className="text-sm text-gray-600">{event.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {getEventBadge(event.type)}
                      {getStatusBadge(event.status)}
                      {event.severity && getSeverityBadge(event.severity)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Domain</p>
                      <p className="text-sm">{event.domain}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tenancy</p>
                      <p className="text-sm">{event.tenancy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {event.type === "release" ? "Scheduled/Deployed" : "Started"}
                      </p>
                      <p className="text-sm">
                        {event.startTime || (event as any).scheduledTime || (event as any).createdAt}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Impact</p>
                      <p className="text-sm">{event.impact}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Affected Services</p>
                    <div className="flex flex-wrap gap-2">
                      {event.affectedServices?.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <HistoryButton
                      entityType={event.type === "incident" ? "incident" : "release"}
                      entityId={event.id}
                      entityTitle={event.title}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(event)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditEvent(event)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {event.type === "incident" && event.status !== "resolved" && (
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    )}
                    {event.type === "release" && event.status === "scheduled" && (
                      <Button variant="outline" size="sm">
                        Modify Schedule
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteEvent(event)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                No events found{hasActiveFilter ? " matching your filter criteria" : ""}.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <ManualIncidentCreationModal
        open={isIncidentModalOpen}
        onOpenChange={setIsIncidentModalOpen}
        onSave={handleSaveIncident}
      />

      <ManualReleaseCreationModal
        open={isReleaseModalOpen}
        onOpenChange={setIsReleaseModalOpen}
      />

      <IncidentDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        incident={selectedIncident}
      />

      <IncidentEditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        incident={selectedIncident}
        onSave={handleUpdateIncident}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        incidentId={selectedIncident?.id || ""}
        incidentTitle={selectedIncident?.title || ""}
      />
    </div>
  );
};
