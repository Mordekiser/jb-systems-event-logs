
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, RefreshCw } from "lucide-react";
import { useEvents } from "@/contexts/EventsContext";
import { EmailTemplateIncident } from "@/components/EmailTemplateIncident";
import { EmailTemplateDeployment } from "@/components/EmailTemplateDeployment";

export const EmailDemo = () => {
  const { events } = useEvents();
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  // Filter events that have email notifications enabled
  const eventsWithEmail = events.filter(event => event.emailNotificationEnabled);
  const selectedEvent = eventsWithEmail.find(event => event.id === selectedEventId);

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
          <div className="flex items-center space-x-4">
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
          
          {eventsWithEmail.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No events with email notifications enabled found. Create an event with email notification enabled to see email templates.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Template Display */}
      {selectedEvent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Email Template Preview - {selectedEvent.eventType}</span>
              <Badge className={
                selectedEvent.eventType === "Incident" ? "bg-red-100 text-red-800" : "bg-purple-100 text-purple-800"
              }>
                {selectedEvent.eventType}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-lg overflow-hidden">
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
