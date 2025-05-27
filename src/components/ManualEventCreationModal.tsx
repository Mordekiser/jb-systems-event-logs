
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

interface Location {
  tenant: string;
  locationIds: number[];
}

interface StatusHistoryEntry {
  createdBySource: string;
  createdTimestamp: string;
  createdBy: string;
  updatedTimestamp: string | null;
  updatedBy: string | null;
  status: string;
  historyType: string;
  description: string;
}

interface EventData {
  id: string;
  title: string;
  description: string;
  eventType: string;
  impact: string;
  locations: Location[];
  status: string;
  createdBySource: string;
  createdTimestamp: string;
  createdBy: string;
  updatedTimestamp: string;
  updatedBy: string;
  fromTimestamp: string;
  toTimestamp: string;
  resolutionEtaTimestamp: string;
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
  
  const [formData, setFormData] = useState<EventData>({
    id: "",
    title: "",
    description: "",
    eventType: "",
    impact: "",
    locations: [{ tenant: "", locationIds: [] }],
    status: "",
    createdBySource: "Manual",
    createdTimestamp: "",
    createdBy: "",
    updatedTimestamp: "",
    updatedBy: "",
    fromTimestamp: "",
    toTimestamp: "",
    resolutionEtaTimestamp: "",
    systemsAffected: [],
    domainsAffected: [],
    statusHistory: []
  });

  const [newSystem, setNewSystem] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [newLocationId, setNewLocationId] = useState("");

  const generateGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const addLocation = () => {
    setFormData({
      ...formData,
      locations: [...formData.locations, { tenant: "", locationIds: [] }]
    });
  };

  const updateLocation = (index: number, field: keyof Location, value: any) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[index] = { ...updatedLocations[index], [field]: value };
    setFormData({ ...formData, locations: updatedLocations });
  };

  const removeLocation = (index: number) => {
    const updatedLocations = formData.locations.filter((_, i) => i !== index);
    setFormData({ ...formData, locations: updatedLocations });
  };

  const addLocationId = (locationIndex: number) => {
    if (newLocationId.trim()) {
      const updatedLocations = [...formData.locations];
      updatedLocations[locationIndex].locationIds.push(parseInt(newLocationId));
      setFormData({ ...formData, locations: updatedLocations });
      setNewLocationId("");
    }
  };

  const removeLocationId = (locationIndex: number, idIndex: number) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[locationIndex].locationIds.splice(idIndex, 1);
    setFormData({ ...formData, locations: updatedLocations });
  };

  const addSystem = () => {
    if (newSystem.trim() && !formData.systemsAffected.includes(newSystem.trim())) {
      setFormData({
        ...formData,
        systemsAffected: [...formData.systemsAffected, newSystem.trim()]
      });
      setNewSystem("");
    }
  };

  const removeSystem = (system: string) => {
    setFormData({
      ...formData,
      systemsAffected: formData.systemsAffected.filter(s => s !== system)
    });
  };

  const addDomain = () => {
    if (newDomain.trim() && !formData.domainsAffected.includes(newDomain.trim())) {
      setFormData({
        ...formData,
        domainsAffected: [...formData.domainsAffected, newDomain.trim()]
      });
      setNewDomain("");
    }
  };

  const removeDomain = (domain: string) => {
    setFormData({
      ...formData,
      domainsAffected: formData.domainsAffected.filter(d => d !== domain)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventId = generateGuid();
    const currentTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    const initialStatusHistory: StatusHistoryEntry = {
      createdBySource: "Manual",
      createdTimestamp: currentTimestamp,
      createdBy: formData.createdBy,
      updatedTimestamp: null,
      updatedBy: null,
      status: formData.status,
      historyType: "Initial",
      description: formData.description
    };

    const completeEventData = {
      ...formData,
      id: eventId,
      createdTimestamp: currentTimestamp,
      updatedTimestamp: currentTimestamp,
      statusHistory: [initialStatusHistory]
    };
    
    console.log("Manual Event Created:", JSON.stringify(completeEventData, null, 2));
    
    toast({
      title: "Event created successfully",
      description: `${formData.title} has been created with ID: ${eventId.substring(0, 8)}...`,
    });
    
    onOpenChange(false);
    
    // Reset form
    setFormData({
      id: "",
      title: "",
      description: "",
      eventType: "",
      impact: "",
      locations: [{ tenant: "", locationIds: [] }],
      status: "",
      createdBySource: "Manual",
      createdTimestamp: "",
      createdBy: "",
      updatedTimestamp: "",
      updatedBy: "",
      fromTimestamp: "",
      toTimestamp: "",
      resolutionEtaTimestamp: "",
      systemsAffected: [],
      domainsAffected: [],
      statusHistory: []
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Manual Event</DialogTitle>
          <DialogDescription>
            Create a new incident or deployment event with full tracking details.
          </DialogDescription>
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
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Fulfilment App Outage"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select value={formData.eventType} onValueChange={(value) => setFormData({...formData, eventType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Incident">Incident</SelectItem>
                      <SelectItem value="Deployment">Deployment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the event details..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="impact">Impact Level</Label>
                  <Select value={formData.impact} onValueChange={(value) => setFormData({...formData, impact: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Trivial">Trivial</SelectItem>
                      <SelectItem value="Minor">Minor</SelectItem>
                      <SelectItem value="Major">Major</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromTimestamp">From Time</Label>
                  <Input
                    id="fromTimestamp"
                    type="datetime-local"
                    value={formData.fromTimestamp}
                    onChange={(e) => setFormData({...formData, fromTimestamp: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toTimestamp">To Time</Label>
                  <Input
                    id="toTimestamp"
                    type="datetime-local"
                    value={formData.toTimestamp}
                    onChange={(e) => setFormData({...formData, toTimestamp: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resolutionEtaTimestamp">Resolution ETA</Label>
                  <Input
                    id="resolutionEtaTimestamp"
                    type="datetime-local"
                    value={formData.resolutionEtaTimestamp}
                    onChange={(e) => setFormData({...formData, resolutionEtaTimestamp: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Created By</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="createdBy">Created By</Label>
                  <Input
                    id="createdBy"
                    placeholder="e.g., Josh Bell"
                    value={formData.createdBy}
                    onChange={(e) => setFormData({...formData, createdBy: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="updatedBy">Updated By</Label>
                  <Input
                    id="updatedBy"
                    placeholder="e.g., Josh Bell"
                    value={formData.updatedBy}
                    onChange={(e) => setFormData({...formData, updatedBy: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Affected Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.locations.map((location, locationIndex) => (
                <div key={locationIndex} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <Label>Tenant</Label>
                      <Input
                        placeholder="e.g., jbh-au"
                        value={location.tenant}
                        onChange={(e) => updateLocation(locationIndex, 'tenant', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLocation(locationIndex)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Location IDs</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter location ID"
                        value={newLocationId}
                        onChange={(e) => setNewLocationId(e.target.value)}
                        type="number"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addLocationId(locationIndex)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {location.locationIds.map((id, idIndex) => (
                        <Badge key={idIndex} variant="secondary" className="cursor-pointer" onClick={() => removeLocationId(locationIndex, idIndex)}>
                          {id} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addLocation}>
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
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
                  placeholder="e.g., FulfilmentAppUi"
                  value={newSystem}
                  onChange={(e) => setNewSystem(e.target.value)}
                />
                <Button type="button" variant="outline" onClick={addSystem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.systemsAffected.map((system, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSystem(system)}>
                    {system} ×
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
                  placeholder="e.g., Customer Orders"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
                <Button type="button" variant="outline" onClick={addDomain}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.domainsAffected.map((domain, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeDomain(domain)}>
                    {domain} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
