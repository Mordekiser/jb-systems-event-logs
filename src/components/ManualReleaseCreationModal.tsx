
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ManualReleaseCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualReleaseCreationModal = ({ open, onOpenChange }: ManualReleaseCreationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    environment: "",
    date: "",
    time: "",
    deployedBy: "",
    branch: "",
    description: "",
  });
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    if (newService.trim() && !services.includes(newService.trim())) {
      setServices(prev => [...prev, newService.trim()]);
      setNewService("");
    }
  };

  const removeService = (serviceToRemove: string) => {
    setServices(prev => prev.filter(service => service !== serviceToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.environment) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log("Creating release:", { ...formData, services });
    
    toast({
      title: "Release Created",
      description: `Release ${formData.name} has been scheduled successfully`,
    });
    
    // Reset form
    setFormData({
      name: "",
      type: "",
      environment: "",
      date: "",
      time: "",
      deployedBy: "",
      branch: "",
      description: "",
    });
    setServices([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Release</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="release-name">Release Name *</Label>
              <Input
                id="release-name"
                placeholder="e.g., v2.4.1"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="release-type">Release Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger id="release-type">
                  <SelectValue placeholder="Select release type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">Feature Release</SelectItem>
                  <SelectItem value="hotfix">Hotfix</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="patch">Patch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="environment">Environment *</Label>
              <Select value={formData.environment} onValueChange={(value) => handleInputChange("environment", value)}>
                <SelectTrigger id="environment">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deployed-by">Deployed By</Label>
              <Input
                id="deployed-by"
                placeholder="Enter deployer name"
                value={formData.deployedBy}
                onChange={(e) => handleInputChange("deployedBy", e.target.value)}
              />
            </div>
          </div>

          {/* Schedule Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="release-date">Release Date</Label>
              <Input
                id="release-date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="release-time">Release Time</Label>
              <Input
                id="release-time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              placeholder="e.g., release/v2.4.1"
              value={formData.branch}
              onChange={(e) => handleInputChange("branch", e.target.value)}
            />
          </div>

          {/* Affected Services */}
          <div className="space-y-3">
            <Label>Affected Services</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add service name"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addService();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addService}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {services.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <Badge key={service} variant="secondary" className="flex items-center gap-1">
                    {service}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeService(service)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the changes in this release..."
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Release
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
