
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Upload, Link, MessageSquare } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  systemsAffected: string[];
  status: 'Initial' | 'In Progress' | 'Resolved';
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
  startTime: string;
  endTime?: string;
  incidentType: 'Manual' | 'Azure Alert' | 'Automated';
  tags?: string[];
  // Additional fields
  attachments?: string[];
  linkedTickets?: string[];
  slaBreached?: boolean;
  urgency?: 'Low' | 'Medium' | 'High';
  teamAssigned?: string;
  comments?: string[];
}

interface IncidentFormProps {
  onSave: (incident: Incident) => void;
  onCancel: () => void;
}

export const IncidentForm = ({ onSave, onCancel }: IncidentFormProps) => {
  const [formData, setFormData] = useState<Partial<Incident>>({
    title: "",
    description: "",
    impact: undefined,
    systemsAffected: [],
    status: "Initial",
    createdBy: "",
    startTime: "",
    endTime: "",
    incidentType: "Manual",
    tags: [],
    attachments: [],
    linkedTickets: [],
    slaBreached: false,
    urgency: undefined,
    teamAssigned: "",
    comments: []
  });

  const [newSystem, setNewSystem] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newTicket, setNewTicket] = useState("");
  const [newComment, setNewComment] = useState("");

  const generateId = () => {
    return 'inc_' + Math.random().toString(36).substr(2, 9);
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

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const addTicket = () => {
    if (newTicket.trim() && !formData.linkedTickets?.includes(newTicket.trim())) {
      setFormData(prev => ({
        ...prev,
        linkedTickets: [...(prev.linkedTickets || []), newTicket.trim()]
      }));
      setNewTicket("");
    }
  };

  const removeTicket = (ticket: string) => {
    setFormData(prev => ({
      ...prev,
      linkedTickets: prev.linkedTickets?.filter(t => t !== ticket) || []
    }));
  };

  const addComment = () => {
    if (newComment.trim()) {
      const timestamp = new Date().toISOString();
      const commentWithTimestamp = `[${timestamp}] ${formData.createdBy || 'User'}: ${newComment.trim()}`;
      setFormData(prev => ({
        ...prev,
        comments: [...(prev.comments || []), commentWithTimestamp]
      }));
      setNewComment("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.impact || !formData.createdBy) {
      return;
    }

    const now = new Date().toISOString();
    const incident: Incident = {
      id: generateId(),
      title: formData.title,
      description: formData.description,
      impact: formData.impact,
      systemsAffected: formData.systemsAffected || [],
      status: formData.status || "Initial",
      createdBy: formData.createdBy,
      createdAt: now,
      updatedAt: now,
      startTime: formData.startTime || now,
      endTime: formData.endTime,
      incidentType: formData.incidentType || "Manual",
      tags: formData.tags,
      attachments: formData.attachments,
      linkedTickets: formData.linkedTickets,
      slaBreached: formData.slaBreached,
      urgency: formData.urgency,
      teamAssigned: formData.teamAssigned,
      comments: formData.comments
    };

    onSave(incident);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Incident Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the incident"
                required
              />
            </div>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of the incident"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="impact">Impact *</Label>
              <Select value={formData.impact} onValueChange={(value: any) => setFormData(prev => ({ ...prev, impact: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Initial">Initial</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency</Label>
              <Select value={formData.urgency} onValueChange={(value: any) => setFormData(prev => ({ ...prev, urgency: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time (Expected/Actual)</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
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

      {/* Custom Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamAssigned">Team Assigned</Label>
              <Input
                id="teamAssigned"
                value={formData.teamAssigned}
                onChange={(e) => setFormData(prev => ({ ...prev, teamAssigned: e.target.value }))}
                placeholder="e.g., Infrastructure Team"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="slaBreached"
                checked={formData.slaBreached}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, slaBreached: !!checked }))}
              />
              <Label htmlFor="slaBreached">SLA Breached</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <Button type="button" variant="outline" onClick={addTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1">
                {tag}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Linked Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Link className="h-5 w-5" />
            Linked Tickets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add ticket ID (e.g., JIRA-123, ZD-456)"
              value={newTicket}
              onChange={(e) => setNewTicket(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTicket())}
            />
            <Button type="button" variant="outline" onClick={addTicket}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.linkedTickets?.map((ticket) => (
              <Badge key={ticket} variant="outline" className="flex items-center gap-1">
                {ticket}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeTicket(ticket)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments & Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addComment())}
            />
            <Button type="button" variant="outline" onClick={addComment}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {formData.comments?.map((comment, index) => (
              <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                {comment}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Incident</Button>
      </div>
    </form>
  );
};
