
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, User, AlertTriangle, Package } from "lucide-react";

interface EventDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: any;
}

export const EventDetailsModal = ({ open, onOpenChange, event }: EventDetailsModalProps) => {
  if (!event) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {event.eventType === "Deployment" ? (
              <Package className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            <span>{event.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Type Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className={getTypeColor(event.eventType)}>
              {event.eventType}
            </Badge>
            <Badge className={getImpactColor(event.impact)}>
              {event.impact} Impact
            </Badge>
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>

          <Separator />

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date Time */}
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-gray-500">Start Date & Time</h4>
                <p className="text-sm">{new Date(event.fromTimestamp).toLocaleString()}</p>
              </div>
            </div>

            {/* End Date Time */}
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-gray-500">End Date & Time</h4>
                <p className="text-sm">{new Date(event.toTimestamp).toLocaleString()}</p>
              </div>
            </div>

            {/* Primary Contact */}
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-gray-500">Primary Contact</h4>
                <p className="text-sm">{event.createdBy}</p>
                <p className="text-xs text-gray-500">Created: {new Date(event.createdTimestamp).toLocaleString()}</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-gray-500">Last Updated</h4>
                <p className="text-sm">By {event.updatedBy}</p>
                <p className="text-xs text-gray-500">{new Date(event.updatedTimestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Locations */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <h3 className="font-semibold">Affected Locations</h3>
            </div>
            <div className="space-y-2">
              {event.locations.map((location: any, index: number) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{location.tenant.toUpperCase()}</p>
                      {location.locationIds.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Location IDs: {location.locationIds.join(", ")}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {location.locationIds.length === 0 ? "All Locations" : `${location.locationIds.length} Locations`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Domains Affected */}
          {event.domainsAffected.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Domains Affected</h3>
              <div className="flex flex-wrap gap-2">
                {event.domainsAffected.map((domain: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {domain}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Systems Affected */}
          {event.systemsAffected.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Systems Affected</h3>
              <div className="flex flex-wrap gap-2">
                {event.systemsAffected.map((system: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {system}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Status History */}
          <div>
            <h3 className="font-semibold mb-3">Status History</h3>
            <div className="space-y-3">
              {event.statusHistory.map((history: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                  <div className="flex justify-between items-start mb-1">
                    <Badge className={getStatusColor(history.status)} variant="outline">
                      {history.status}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(history.createdTimestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{history.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    By {history.createdBy} • {history.historyType} • {history.createdBySource}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
