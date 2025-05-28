
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Clock, User, MapPin } from "lucide-react";

interface EmailTemplateIncidentProps {
  event: any;
}

export const EmailTemplateIncident = ({ event }: EmailTemplateIncidentProps) => {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header with JB HI-FI branding */}
      <div className="bg-yellow-400 p-6 text-center">
        <h1 className="text-4xl font-bold text-black mb-2">JB HI-FI</h1>
        <div className="bg-white rounded-lg p-4 inline-block">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <span className="text-xl font-semibold text-black">INCIDENT NOTIFICATION</span>
          </div>
          <div className="flex space-x-4 text-sm text-gray-600">
            <button className="bg-blue-100 px-3 py-1 rounded">Events</button>
            <button className="bg-gray-100 px-3 py-1 rounded">System Status Dashboard</button>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="p-6">
        {/* Incident Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Type */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 px-3 py-2 rounded font-medium min-w-[120px]">Type</div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <Badge className="bg-red-100 text-red-800">Incident</Badge>
            </div>
          </div>

          {/* Impact */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 px-3 py-2 rounded font-medium min-w-[120px]">Impact</div>
            <Badge className={
              event.impact === "Major" ? "bg-red-100 text-red-800" :
              event.impact === "Minor" ? "bg-yellow-100 text-yellow-800" :
              "bg-green-100 text-green-800"
            }>
              {event.impact}
            </Badge>
          </div>

          {/* Application */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 px-3 py-2 rounded font-medium min-w-[120px]">Application</div>
            <div className="bg-white border border-gray-300 px-3 py-2 rounded flex-1">
              {event.application || event.systemsAffected?.[0] || "N/A"}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 px-3 py-2 rounded font-medium min-w-[120px]">Status</div>
            <Badge className={
              event.status === "Complete" ? "bg-green-100 text-green-800" :
              event.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }>
              {event.status}
            </Badge>
          </div>

          {/* Start Date/Time */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 px-3 py-2 rounded font-medium min-w-[120px]">Start Date/Time</div>
            <div className="bg-white border border-gray-300 px-3 py-2 rounded flex-1">
              {formatDate(event.fromTimestamp)}
            </div>
          </div>

          {/* End Date/Time */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 px-3 py-2 rounded font-medium min-w-[120px]">End Date/Time</div>
            <div className="bg-white border border-gray-300 px-3 py-2 rounded flex-1">
              {formatDate(event.toTimestamp)}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="bg-gray-100 px-3 py-2 rounded font-medium mb-2">Description</div>
          <div className="bg-white border border-gray-300 px-3 py-4 rounded">
            {event.description}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <div className="bg-gray-100 px-3 py-2 rounded font-medium mb-2">Contact</div>
          <div className="bg-white border border-gray-300 px-3 py-2 rounded">
            {event.createdBy} ({event.createdBySource === "Manual" ? "IT Support" : "System Alert"})
          </div>
        </div>

        {/* Link to Event */}
        <div className="text-center mb-8">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded border">
            Link to this Event for more details
          </button>
        </div>

        {/* Event History */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Event History (Latest First)
          </h3>
          <div className="space-y-3">
            {event.statusHistory?.slice().reverse().map((history: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={
                      history.status === "Complete" ? "bg-green-100 text-green-800" :
                      history.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {history.status}
                    </Badge>
                    <Badge variant="outline">{history.historyType}</Badge>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(history.createdTimestamp)}
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-2">{history.description}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  Created by: {history.createdBy} ({history.createdBySource})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-6 pt-4 border-t">
          <p>This is an automated notification from JB HI-FI System Status Dashboard</p>
          <p>Links to dashboard and events calendar available above</p>
        </div>
      </div>
    </div>
  );
};
