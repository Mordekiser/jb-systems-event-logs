
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, Clock, User, GitBranch, Sparkles, CheckCircle } from "lucide-react";

interface EmailTemplateDeploymentProps {
  event: any;
}

export const EmailTemplateDeployment = ({ event }: EmailTemplateDeploymentProps) => {
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
      case "Major": return "bg-purple-50 border-purple-200 text-purple-900";
      case "Minor": return "bg-blue-50 border-blue-200 text-blue-900";
      default: return "bg-green-50 border-green-200 text-green-900";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "bg-green-500 text-white";
      case "In Progress": return "bg-blue-500 text-white";
      case "Scheduled": return "bg-purple-500 text-white";
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
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full">
                <Sparkles className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">SOFTWARE UPDATE</h2>
                <p className="text-sm text-gray-600">Enhancement Notification</p>
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
        {/* Release Banner */}
        <div className={`${getImpactColor(event.impact)} border-2 rounded-xl p-4 mb-8`}>
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6" />
            <div>
              <h3 className="font-bold text-lg">{event.impact} Release Update</h3>
              <p className="text-sm opacity-80">{event.title}</p>
            </div>
            <Badge className={getStatusColor(event.status)} variant="outline">
              {event.status}
            </Badge>
          </div>
        </div>

        {/* Deployment Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <GitBranch className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-gray-700">Release Type</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Software Deployment</Badge>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Package className="h-5 w-5 text-gray-600" />
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
                <span className="font-semibold text-gray-700">Deployment Start</span>
              </div>
              <p className="text-gray-900">{formatDate(event.fromTimestamp)}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Expected Completion</span>
              </div>
              <p className="text-gray-900">{formatDate(event.toTimestamp)}</p>
            </div>
          </div>
        </div>

        {/* What's New */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-bold text-green-900">What's New & Improved?</h3>
          </div>
          <p className="text-green-800 leading-relaxed mb-4">{event.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-700">Performance</span>
              </div>
              <p className="text-sm text-gray-600">Enhanced speed and optimization</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-700">Security</span>
              </div>
              <p className="text-sm text-gray-600">Latest security measures implemented</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-gray-700">Features</span>
              </div>
              <p className="text-sm text-gray-600">New user experience improvements</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-gray-700">Stability</span>
              </div>
              <p className="text-sm text-gray-600">Bug fixes and reliability updates</p>
            </div>
          </div>
        </div>

        {/* Systems Affected */}
        {event.systemsAffected?.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Systems Being Updated</h3>
            <div className="flex flex-wrap gap-2">
              {event.systemsAffected.map((system: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-white border-blue-300 text-blue-800">
                  🔧 {system}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <User className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Deployment Lead</h3>
          </div>
          <p className="text-gray-700">
            <span className="font-medium">{event.createdBy}</span>
            <span className="text-gray-500 ml-2">
              ({event.createdBySource === "Manual" ? "DevOps Team" : "Automated Deployment"})
            </span>
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center mb-8">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
            🚀 View Deployment Details
          </button>
        </div>

        {/* Deployment History */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <GitBranch className="h-6 w-6 mr-3" />
            Deployment Timeline (Latest First)
          </h3>
          <div className="space-y-4">
            {event.statusHistory?.slice().reverse().map((history: any, index: number) => (
              <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(history.status)}>
                      {history.status}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
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
          <p>For real-time updates and detailed release notes, visit our dashboard</p>
        </div>
      </div>
    </div>
  );
};
