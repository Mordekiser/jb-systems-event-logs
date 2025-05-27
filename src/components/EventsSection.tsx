
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Package, GitBranch, Clock, Trash2 } from "lucide-react";
import { useEvents } from "@/contexts/EventsContext";
import { EventDeleteConfirmDialog } from "@/components/EventDeleteConfirmDialog";

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
    // The delete confirmation dialog will handle the actual deletion
    setDeleteDialog({
      open: false,
      eventId: "",
      eventTitle: "",
      eventType: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Events Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>System Events</span>
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Events Timeline */}
      <div className="space-y-4">
        {events.map((event) => (
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
                <div className="mb-4">
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

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {events.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No events found.</p>
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
    </div>
  );
};
