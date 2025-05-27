
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ManualIncidentCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualIncidentCreationModal = ({ open, onOpenChange }: ManualIncidentCreationModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [affectedServices, setAffectedServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");

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
    // Here you would typically submit the incident data
    console.log({
      title,
      description,
      severity,
      affectedServices,
      status: "investigating",
      createdBy: "Manual Entry",
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setSeverity("");
    setAffectedServices([]);
    setNewService("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Manual Incident</DialogTitle>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the incident"
              rows={3}
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
            <Button type="submit">Create Incident</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
