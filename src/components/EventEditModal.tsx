
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents } from "@/contexts/EventsContext";

interface EventEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: any;
}

export const EventEditModal = ({ open, onOpenChange, event }: EventEditModalProps) => {
  const { updateEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    impact: "",
    status: "",
    eventType: "",
    fromTimestamp: "",
    toTimestamp: ""
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        impact: event.impact || "",
        status: event.status || "",
        eventType: event.eventType || "",
        fromTimestamp: event.fromTimestamp ? new Date(event.fromTimestamp).toISOString().slice(0, 16) : "",
        toTimestamp: event.toTimestamp ? new Date(event.toTimestamp).toISOString().slice(0, 16) : ""
      });
    }
  }, [event]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEvent = {
      ...formData,
      fromTimestamp: new Date(formData.fromTimestamp).toISOString(),
      toTimestamp: new Date(formData.toTimestamp).toISOString(),
      updatedBy: "Current User",
      updatedTimestamp: new Date().toISOString()
    };

    updateEvent(event.id, updatedEvent);
    onOpenChange(false);
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Incident">Incident</SelectItem>
                  <SelectItem value="Deployment">Deployment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="impact">Impact</Label>
              <Select value={formData.impact} onValueChange={(value) => handleInputChange("impact", value)}>
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

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromTimestamp">Start Date & Time</Label>
              <Input
                id="fromTimestamp"
                type="datetime-local"
                value={formData.fromTimestamp}
                onChange={(e) => handleInputChange("fromTimestamp", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="toTimestamp">End Date & Time</Label>
              <Input
                id="toTimestamp"
                type="datetime-local"
                value={formData.toTimestamp}
                onChange={(e) => handleInputChange("toTimestamp", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
