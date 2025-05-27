
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  severity: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  affectedServices: string[];
}

interface IncidentEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incident: Incident | null;
  onSave: (updatedIncident: Incident) => void;
}

export const IncidentEditModal = ({ open, onOpenChange, incident, onSave }: IncidentEditModalProps) => {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [affectedServices, setAffectedServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");

  useEffect(() => {
    if (incident) {
      setTitle(incident.title);
      setSeverity(incident.severity);
      setStatus(incident.status);
      setAffectedServices(incident.affectedServices);
    }
  }, [incident]);

  const handleAddService = () => {
    if (newService.trim() && !affectedServices.includes(newService.trim())) {
      setAffectedServices([...affectedServices, newService.trim()]);
      setNewService("");
    }
  };

  const handleRemoveService = (service: string) => {
    setAffectedServices(affectedServices.filter(s => s !== service));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incident) return;

    const updatedIncident: Incident = {
      ...incident,
      title,
      severity,
      status,
      affectedServices,
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    onSave(updatedIncident);
    onOpenChange(false);
  };

  if (!incident) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Incident - {incident.id}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Incident Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter incident title"
              required
            />
          </div>

          <div>
            <Label htmlFor="severity">Severity</Label>
            <Select value={severity} onValueChange={setSeverity} required>
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Affected Services</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add service"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
              />
              <Button type="button" onClick={handleAddService} size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {affectedServices.map((service, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {service}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveService(service)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
