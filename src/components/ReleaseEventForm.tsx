
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Mail } from "lucide-react";

interface ReleaseEvent {
  id: string;
  application: string;
  releaseTitle: string;
  releaseDateTime: string;
  impact: 'None' | 'Low' | 'Medium' | 'High';
  changeSummary: string[];
  contactEmail: string;
  releaseType: 'Manual' | 'Automated';
  sendEmailNotification: boolean;
  emailRecipients: string[];
  emailSubject?: string;
  emailBodyTemplate?: string;
  createdBy: string;
  createdAt: string;
}

interface ReleaseEventFormProps {
  onSave: (releaseEvent: ReleaseEvent) => void;
  onCancel: () => void;
}

export const ReleaseEventForm = ({ onSave, onCancel }: ReleaseEventFormProps) => {
  const [formData, setFormData] = useState<Partial<ReleaseEvent>>({
    application: "",
    releaseTitle: "",
    releaseDateTime: "",
    impact: undefined,
    changeSummary: [],
    contactEmail: "",
    releaseType: "Manual",
    sendEmailNotification: false,
    emailRecipients: [],
    emailSubject: "",
    emailBodyTemplate: "",
    createdBy: ""
  });

  const [newChange, setNewChange] = useState("");
  const [newRecipient, setNewRecipient] = useState("");

  const generateId = () => {
    return 'rel_' + Math.random().toString(36).substr(2, 9);
  };

  const addChange = () => {
    if (newChange.trim() && !formData.changeSummary?.includes(newChange.trim())) {
      setFormData(prev => ({
        ...prev,
        changeSummary: [...(prev.changeSummary || []), newChange.trim()]
      }));
      setNewChange("");
    }
  };

  const removeChange = (change: string) => {
    setFormData(prev => ({
      ...prev,
      changeSummary: prev.changeSummary?.filter(c => c !== change) || []
    }));
  };

  const addRecipient = () => {
    if (newRecipient.trim() && !formData.emailRecipients?.includes(newRecipient.trim())) {
      setFormData(prev => ({
        ...prev,
        emailRecipients: [...(prev.emailRecipients || []), newRecipient.trim()]
      }));
      setNewRecipient("");
    }
  };

  const removeRecipient = (recipient: string) => {
    setFormData(prev => ({
      ...prev,
      emailRecipients: prev.emailRecipients?.filter(r => r !== recipient) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.application || !formData.releaseTitle || !formData.releaseDateTime || !formData.impact || !formData.createdBy) {
      return;
    }

    const now = new Date().toISOString();
    const releaseEvent: ReleaseEvent = {
      id: generateId(),
      application: formData.application,
      releaseTitle: formData.releaseTitle,
      releaseDateTime: formData.releaseDateTime,
      impact: formData.impact,
      changeSummary: formData.changeSummary || [],
      contactEmail: formData.contactEmail || "",
      releaseType: formData.releaseType || "Manual",
      sendEmailNotification: formData.sendEmailNotification || false,
      emailRecipients: formData.emailRecipients || [],
      emailSubject: formData.emailSubject,
      emailBodyTemplate: formData.emailBodyTemplate,
      createdBy: formData.createdBy,
      createdAt: now
    };

    onSave(releaseEvent);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Release Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="application">Application *</Label>
              <Input
                id="application"
                value={formData.application}
                onChange={(e) => setFormData(prev => ({ ...prev, application: e.target.value }))}
                placeholder="e.g., JB POS API"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="releaseTitle">Release Title *</Label>
              <Input
                id="releaseTitle"
                value={formData.releaseTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, releaseTitle: e.target.value }))}
                placeholder="Short description/title"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="releaseDateTime">Release Date & Time *</Label>
              <Input
                id="releaseDateTime"
                type="datetime-local"
                value={formData.releaseDateTime}
                onChange={(e) => setFormData(prev => ({ ...prev, releaseDateTime: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="impact">Impact *</Label>
              <Select value={formData.impact} onValueChange={(value: any) => setFormData(prev => ({ ...prev, impact: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="createdBy">Created By *</Label>
              <Input
                id="createdBy"
                value={formData.createdBy}
                onChange={(e) => setFormData(prev => ({ ...prev, createdBy: e.target.value }))}
                placeholder="Your email or name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="Support or notification contact"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What's New?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add change description"
              value={newChange}
              onChange={(e) => setNewChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChange())}
            />
            <Button type="button" variant="outline" onClick={addChange}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.changeSummary?.map((change, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">• {change}</span>
                <X
                  className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
                  onClick={() => removeChange(change)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Notification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendEmailNotification"
              checked={formData.sendEmailNotification}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendEmailNotification: !!checked }))}
            />
            <Label htmlFor="sendEmailNotification">Send Email Notification</Label>
          </div>

          {formData.sendEmailNotification && (
            <>
              <div className="space-y-2">
                <Label htmlFor="emailSubject">Email Subject</Label>
                <Input
                  id="emailSubject"
                  value={formData.emailSubject}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailSubject: e.target.value }))}
                  placeholder="Custom email subject (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label>Email Recipients</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add email address"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecipient())}
                  />
                  <Button type="button" variant="outline" onClick={addRecipient}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.emailRecipients?.map((recipient) => (
                    <Badge key={recipient} variant="secondary" className="flex items-center gap-1">
                      {recipient}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeRecipient(recipient)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailBodyTemplate">Email Body Template</Label>
                <Textarea
                  id="emailBodyTemplate"
                  value={formData.emailBodyTemplate}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailBodyTemplate: e.target.value }))}
                  placeholder="Custom email body template (optional - will use default if empty)"
                  rows={4}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Release Event</Button>
      </div>
    </form>
  );
};
