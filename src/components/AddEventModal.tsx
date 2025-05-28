
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddEventModal = ({ open, onOpenChange }: AddEventModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    scheduledTime: "",
    duration: "",
    impact: "",
    affectedServices: "",
    emailNotificationEnabled: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log("New event:", formData);
    
    toast({
      title: "Event created successfully",
      description: `${formData.title} has been added to the schedule${formData.emailNotificationEnabled ? " with email notifications enabled" : ""}.`,
    });
    
    onOpenChange(false);
    setFormData({
      title: "",
      type: "",
      description: "",
      scheduledTime: "",
      duration: "",
      impact: "",
      affectedServices: "",
      emailNotificationEnabled: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Schedule a new maintenance, release, or incident event.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              placeholder="e.g., Database Maintenance"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="release">Release</SelectItem>
                <SelectItem value="incident">Incident</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the event and its purpose..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Scheduled Time</Label>
              <Input
                id="scheduledTime"
                type="datetime-local"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 2 hours"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="impact">Expected Impact</Label>
            <Select value={formData.impact} onValueChange={(value) => setFormData({...formData, impact: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select impact level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Impact</SelectItem>
                <SelectItem value="low">Low Impact</SelectItem>
                <SelectItem value="medium">Medium Impact</SelectItem>
                <SelectItem value="high">High Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="affectedServices">Affected Services</Label>
            <Input
              id="affectedServices"
              placeholder="e.g., API Gateway, Database"
              value={formData.affectedServices}
              onChange={(e) => setFormData({...formData, affectedServices: e.target.value})}
            />
          </div>

          {/* Email Notification Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <Label htmlFor="emailNotification" className="text-sm font-medium">
                    Email Notification
                  </Label>
                  <p className="text-xs text-gray-500">
                    Send email notifications for this event
                  </p>
                </div>
              </div>
              <Switch
                id="emailNotification"
                checked={formData.emailNotificationEnabled}
                onCheckedChange={(checked) => setFormData({...formData, emailNotificationEnabled: checked})}
              />
            </div>
          </div>

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
