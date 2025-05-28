
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Clock, User, MapPin, AlertCircle, Shield } from "lucide-react";

interface EmailTemplateIncidentProps {
  event: any;
}

export const EmailTemplateIncident = ({ event }: EmailTemplateIncidentProps) => {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Major": return "bg-red-50 border-red-200 text-red-900";
      case "Minor": return "bg-yellow-50 border-yellow-200 text-yellow-900";
      default: return "bg-green-50 border-green-200 text-green-900";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "bg-green-500 text-white";
      case "In Progress": return "bg-blue-500 text-white";
      case "Under Investigation": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white font-sans">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black mb-3">JB HI-FI</h1>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg inline-block">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">INCIDENT ALERT</h2>
                <p className="text-sm text-gray-600">System Status Notification</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4 text-sm">
              <button className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg transition-colors">
                📊 Dashboard
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                📅 Events Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Priority Banner */}
        <div className={`${getImpactColor(event.impact)} border-2 rounded-xl p-4 mb-8`}>
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6" />
            <div>
              <h3 className="font-bold text-lg">{event.impact} Impact Incident</h3>
              <p className="text-sm opacity-80">{event.title}</p>
            </div>
            <Badge className={getStatusColor(event.status)} variant="outline">
              {event.status}
            </Badge>
          </div>
        </div>

        {/* Incident Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Incident Type</span>
              </div>
              <Badge className="bg-red-100 text-red-800">System Incident</Badge>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Application</span>
              </div>
              <p className="text-gray-900 font-medium">
                {event.application || event.systemsAffected?.[0] || "Multiple Systems"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Started</span>
              </div>
              <p className="text-gray-900">{formatDate(event.fromTimestamp)}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Expected Resolution</span>
              </div>
              <p className="text-gray-900">{formatDate(event.toTimestamp)}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-900 mb-3">What's Happening?</h3>
          <p className="text-blue-800 leading-relaxed">{event.description}</p>
        </div>

        {/* Systems Affected */}
        {event.systemsAffected?.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-orange-900 mb-3">Affected Systems</h3>
            <div className="flex flex-wrap gap-2">
              {event.systemsAffected.map((system: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-white border-orange-300 text-orange-800">
                  {system}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <User className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Primary Contact</h3>
          </div>
          <p className="text-gray-700">
            <span className="font-medium">{event.createdBy}</span>
            <span className="text-gray-500 ml-2">
              ({event.createdBySource === "Manual" ? "IT Support Team" : "Automated System Alert"})
            </span>
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center mb-8">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
            🔗 View Full Incident Details
          </button>
        </div>

        {/* Event History */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-3" />
            Incident Timeline (Latest First)
          </h3>
          <div className="space-y-4">
            {event.statusHistory?.slice().reverse().map((history: any, index: number) => (
              <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(history.status)}>
                      {history.status}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {history.historyType}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(history.createdTimestamp)}
                  </div>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">{history.description}</p>
                <div className="text-xs text-gray-500 flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span className="font-medium">{history.createdBy}</span>
                  <span className="mx-2">•</span>
                  <span>{history.createdBySource}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="font-medium">Automated notification from JB HI-FI System Status Dashboard</p>
          </div>
          <p>For real-time updates, visit our dashboard or events calendar</p>
        </div>
      </div>
    </div>
  );
};
