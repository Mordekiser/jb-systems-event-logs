
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { IncidentForm } from "./IncidentForm";
import { ReleaseEventForm } from "./ReleaseEventForm";

interface ManualEventCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualEventCreationModal = ({ open, onOpenChange }: ManualEventCreationModalProps) => {
  const { toast } = useToast();
  const [eventType, setEventType] = useState<string>("");

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setEventType("");
    }
  }, [open]);

  const handleEventCreated = (eventData: any) => {
    console.log("Event created:", eventData);
    toast({
      title: "Event created successfully",
      description: `${eventData.title || eventData.releaseTitle} has been created.`,
    });
    onOpenChange(false);
    setEventType(""); // Reset form
  };

  const handleCancel = () => {
    setEventType("");
    onOpenChange(false);
  };

  const handleEventTypeChange = (value: string) => {
    console.log("Event type changed to:", value);
    setEventType(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type *</Label>
            <Select value={eventType} onValueChange={handleEventTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="release">Release Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {eventType === "incident" && (
            <div key="incident-form">
              <IncidentForm onSave={handleEventCreated} onCancel={handleCancel} />
            </div>
          )}

          {eventType === "release" && (
            <div key="release-form">
              <ReleaseEventForm onSave={handleEventCreated} onCancel={handleCancel} />
            </div>
          )}

          {!eventType && (
            <div className="text-center py-8 text-gray-500">
              Please select an event type to continue
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
