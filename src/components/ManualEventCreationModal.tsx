import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";
import { useEvents } from "@/contexts/EventsContext";

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

interface ManualEventCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualEventCreationModal = ({ open, onOpenChange }: ManualEventCreationModalProps) => {
  const { toast } = useToast();
  const { addEvent } = useEvents();
  const [formData, setFormData] = useState<Partial<SystemEvent>>({
    eventType: undefined,
    impact: undefined,
    status: "Under Investigation",
    createdBySource: "Manual",
    locations: [],
    systemsAffected: [],
    domainsAffected: [],
    statusHistory: []
  });

  const [newSystem, setNewSystem] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [newTenant, setNewTenant] = useState("");
  const [newLocationIds, setNewLocationIds] = useState("");

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({
        eventType: undefined,
        impact: undefined,
        status: "Under Investigation",
        createdBySource: "Manual",
        locations: [],
        systemsAffected: [],
        domainsAffected: [],
        statusHistory: []
      });
      setNewSystem("");
      setNewDomain("");
      setNewTenant("");
      setNewLocationIds("");
    }
  }, [open]);

  const generateId = () => {
    return 'evt_' + Math.random().toString(36).substr(2, 9);
  };

  const addSystem = () => {
    if (newSystem.trim() && !formData.systemsAffected?.includes(newSystem.trim())) {
      setFormData(prev => ({
        ...prev,
        systemsAffected: [...(prev.systemsAffected || []), newSystem.trim()]
      }));
      setNewSystem("");
    }
  };

  const removeSystem = (system: string) => {
    setFormData(prev => ({
      ...prev,
      systemsAffected: prev.systemsAffected?.filter(s => s !== system) || []
    }));
  };

  const addDomain = () => {
    if (newDomain.trim() && !formData.domainsAffected?.includes(newDomain.trim())) {
      setFormData(prev => ({
        ...prev,
        domainsAffected: [...(prev.domainsAffected || []), newDomain.trim()]
      }));
      setNewDomain("");
    }
  };

  const removeDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      domainsAffected: prev.domainsAffected?.filter(d => d !== domain) || []
    }));
  };

  const addLocation = () => {
    if (newTenant.trim()) {
      const locationIds = newLocationIds.trim() 
        ? newLocationIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
        : [];
      
      const newLocation: Location = {
        tenant: newTenant.trim(),
        locationIds
      };

      setFormData(prev => ({
        ...prev,
        locations: [...(prev.locations || []), newLocation]
      }));
      setNewTenant("");
      setNewLocationIds("");
    }
  };

  const removeLocation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.eventType || !formData.impact || !formData.createdBy) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const now = new Date().toISOString();
    const event: SystemEvent = {
      id: generateId(),
      title: formData.title!,
      description: formData.description!,
      eventType: formData.eventType!,
      impact: formData.impact!,
      locations: formData.locations || [],
      status: formData.status || "Under Investigation",
      createdBySource: "Manual",
      createdTimestamp: now,
      createdBy: formData.createdBy!,
      updatedTimestamp: now,
      updatedBy: formData.createdBy!,
      fromTimestamp: formData.fromTimestamp || now,
      toTimestamp: formData.toTimestamp || now,
      resolutionEtaTimestamp: formData.resolutionEtaTimestamp,
      notificationTimestamp: formData.notificationTimestamp,
      systemsAffected: formData.systemsAffected || [],
      domainsAffected: formData.domainsAffected || [],
      statusHistory: [{
        createdBySource: "Manual",
        createdTimestamp: now,
        createdBy: formData.createdBy!,
        updatedTimestamp: now,
        updatedBy: formData.createdBy!,
        status: formData.status || "Under Investigation",
        historyType: "Initial",
        description: `${formData.eventType} created: ${formData.description}`
      }]
    };

    addEvent(event);
    toast({
      title: "Event created successfully",
      description: `${event.title} has been created.`,
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New System Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select value={formData.eventType} onValueChange={(value: "Incident" | "Deployment") => setFormData(prev => ({ ...prev, eventType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Incident">Incident</SelectItem>
                      <SelectItem value="Deployment">Deployment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="impact">Impact *</Label>
                  <Select value={formData.impact} onValueChange={(value: "Trivial" | "Minor" | "Major") => setFormData(prev => ({ ...prev, impact: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Trivial">Trivial</SelectItem>
                      <SelectItem value="Minor">Minor</SelectItem>
                      <SelectItem value="Major">Major</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the event"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: "Under Investigation" | "Scheduled" | "In Progress" | "Complete") => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="createdBy">Created By *</Label>
                  <Input
                    id="createdBy"
                    value={formData.createdBy || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, createdBy: e.target.value }))}
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Window */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Window</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromTimestamp">From Time</Label>
                  <Input
                    id="fromTimestamp"
                    type="datetime-local"
                    value={formData.fromTimestamp?.slice(0, 16) || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, fromTimestamp: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toTimestamp">To Time</Label>
                  <Input
                    id="toTimestamp"
                    type="datetime-local"
                    value={formData.toTimestamp?.slice(0, 16) || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, toTimestamp: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resolutionEtaTimestamp">Resolution ETA (Optional)</Label>
                  <Input
                    id="resolutionEtaTimestamp"
                    type="datetime-local"
                    value={formData.resolutionEtaTimestamp?.slice(0, 16) || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, resolutionEtaTimestamp: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notificationTimestamp">Notification Time (Optional)</Label>
                  <Input
                    id="notificationTimestamp"
                    type="datetime-local"
                    value={formData.notificationTimestamp?.slice(0, 16) || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, notificationTimestamp: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Systems Affected */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Systems Affected</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add system/service name"
                  value={newSystem}
                  onChange={(e) => setNewSystem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSystem())}
                />
                <Button type="button" variant="outline" onClick={addSystem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.systemsAffected?.map((system) => (
                  <Badge key={system} variant="secondary" className="flex items-center gap-1">
                    {system}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSystem(system)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Domains Affected */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Domains Affected</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add domain name (e.g., Customer Orders)"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDomain())}
                />
                <Button type="button" variant="outline" onClick={addDomain}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.domainsAffected?.map((domain) => (
                  <Badge key={domain} variant="outline" className="flex items-center gap-1">
                    {domain}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeDomain(domain)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Affected Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Tenant (e.g., jbh-au)"
                  value={newTenant}
                  onChange={(e) => setNewTenant(e.target.value)}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Location IDs (comma-separated, empty for all)"
                    value={newLocationIds}
                    onChange={(e) => setNewLocationIds(e.target.value)}
                  />
                  <Button type="button" variant="outline" onClick={addLocation}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {formData.locations?.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">{location.tenant}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {location.locationIds.length === 0 ? "All locations" : `Locations: ${location.locationIds.join(', ')}`}
                      </span>
                    </div>
                    <X
                      className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
                      onClick={() => removeLocation(index)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
