
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, RefreshCw, Send, Eye } from "lucide-react";
import { useEvents } from "@/contexts/EventsContext";
import { EmailTemplateIncident } from "@/components/EmailTemplateIncident";
import { EmailTemplateDeployment } from "@/components/EmailTemplateDeployment";
import { useToast } from "@/hooks/use-toast";

export const EmailDemo = () => {
  const { events, updateEvent } = useEvents();
  const { toast } = useToast();
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  // Filter events that have email notifications enabled
  const eventsWithEmail = events.filter(event => event.emailNotificationEnabled);
  const selectedEvent = eventsWithEmail.find(event => event.id === selectedEventId);

  const handleSendEmail = () => {
    if (!selectedEvent) return;

    updateEvent(selectedEvent.id, {
      emailSent: true,
      updatedTimestamp: new Date().toISOString()
    });

    toast({
      title: "Email sent successfully",
      description: `${selectedEvent.eventType} notification has been sent for ${selectedEvent.title}`,
    });
  };

  const handleToggleEmailNotification = () => {
    if (!selectedEvent) return;

    const newEmailEnabled = !selectedEvent.emailNotificationEnabled;
    updateEvent(selectedEvent.id, {
      emailNotificationEnabled: newEmailEnabled,
      emailSent: newEmailEnabled ? false : undefined
    });

    toast({
      title: newEmailEnabled ? "Email notification enabled" : "Email notification disabled",
      description: `Email notifications have been ${newEmailEnabled ? "enabled" : "disabled"} for ${selectedEvent.title}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Notifications Demo</span>
            <Badge className="bg-blue-100 text-blue-800">Live Demo</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1">
              <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an event with email notification enabled" />
                </SelectTrigger>
                <SelectContent>
                  {eventsWithEmail.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          event.eventType === "Incident" ? "bg-red-100 text-red-800" : "bg-purple-100 text-purple-800"
                        }>
                          {event.eventType}
                        </Badge>
                        <span>{event.title}</span>
                        <Badge variant="outline" className={
                          event.emailSent ? "text-green-600" : "text-orange-600"
                        }>
                          {event.emailSent ? "Email sent" : "Email pending"}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <RefreshCw className="h-4 w-4 mr-1" />
              Updates automatically when events change
            </div>
          </div>

          {/* Action Buttons */}
          {selectedEvent && (
            <div className="flex space-x-3">
              <Button
                onClick={handleSendEmail}
                disabled={selectedEvent.emailSent}
                className="flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{selectedEvent.emailSent ? "Email Sent" : "Send Email"}</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleToggleEmailNotification}
                className="flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>
                  {selectedEvent.emailNotificationEnabled ? "Disable" : "Enable"} Email Notification
                </span>
              </Button>
              <Button variant="secondary" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview Email</span>
              </Button>
            </div>
          )}
          
          {eventsWithEmail.length === 0 && (
            <div className="text-center text-gray-500 mt-4 p-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No Email Events Found</h3>
              <p>No events with email notifications enabled found. Create an event with email notification enabled to see email templates.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Template Display */}
      {selectedEvent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Template Preview - {selectedEvent.eventType}</span>
                <Badge className={
                  selectedEvent.eventType === "Incident" ? "bg-red-100 text-red-800" : "bg-purple-100 text-purple-800"
                }>
                  {selectedEvent.eventType}
                </Badge>
              </div>
              <Badge variant="outline" className={
                selectedEvent.emailSent ? "text-green-600 border-green-200" : "text-orange-600 border-orange-200"
              }>
                {selectedEvent.emailSent ? "✓ Email sent" : "⏳ Email pending"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              {selectedEvent.eventType === "Incident" ? (
                <EmailTemplateIncident event={selectedEvent} />
              ) : (
                <EmailTemplateDeployment event={selectedEvent} />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
