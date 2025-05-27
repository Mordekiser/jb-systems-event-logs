
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, User, Globe } from "lucide-react";

export const TimelineHistory = () => {
  const eventTitle = "Availability Degradation in West Europe region";
  
  const eventInfo = {
    state: "Resolved",
    start: "5/20/2025, 3:21 PM",
    end: "5/20/2025, 7:28 PM"
  };

  const impactInfo = {
    severity: "Degraded",
    service: "Core services",
    geography: "Europe"
  };

  const eventLog = [
    {
      id: 1,
      type: "final",
      title: "Final update",
      author: "Premysl Hruby",
      timestamp: "5/20/2025, 8:07 PM",
      description: "The issue is now fully mitigated following SQL team failing over from a faulty DB node. Our engineers will be investigating this further to learn from and reduce the risk of potential recurrences. We apologize for the impact this had on our customers.",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    },
    {
      id: 2,
      type: "update",
      title: "Update",
      author: "Premysl Hruby", 
      timestamp: "5/20/2025, 7:19 PM",
      description: "Our engineers identified a problem with one of the SQL databases and are working together with the SQL team to mitigate this issue.",
      icon: <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white"></div>
    },
    {
      id: 3,
      type: "update",
      title: "Update",
      author: "Premysl Hruby",
      timestamp: "5/20/2025, 5:24 PM", 
      description: "Our engineers are working to understand and mitigate the issue.",
      icon: <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white"></div>
    },
    {
      id: 4,
      type: "update",
      title: "Update",
      author: "Premysl Hruby",
      timestamp: "5/20/2025, 4:27 PM",
      description: "We're investigating repeated traffic spikes in the West Europe regions. These might result in small portion of customers in the region to observe occasional slow or failing requests. We are working to understand and mitigate the issue.",
      icon: <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white"></div>
    },
    {
      id: 5,
      type: "initial",
      title: "Initial communication",
      author: "Azure DevOps Incident Scout",
      timestamp: "5/20/2025, 3:42 PM",
      description: "Our engineers are currently investigating an event impacting Azure DevOps. The event is being triaged and we will post an update as soon as we know more.",
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Event Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{eventTitle}</h1>
        
        <div className="border-b">
          <nav className="flex space-x-8">
            <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
              Event log
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Log - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {eventLog.map((event, index) => (
                <div key={event.id} className="relative flex items-start space-x-4">
                  {/* Timeline Icon */}
                  <div className="relative z-10 bg-white p-1">
                    {event.icon}
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{event.author}</span>
                        <span>•</span>
                        <span>{event.timestamp}</span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Information - Right Side */}
        <div className="space-y-6">
          {/* Event Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">State</p>
                  <p className="font-medium">{eventInfo.state}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Start</p>
                  <p className="font-medium">{eventInfo.start}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">End</p>
                  <p className="font-medium">{eventInfo.end}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Impact information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm mb-2">Severity</p>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{impactInfo.severity}</span>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm mb-2">Service</p>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-blue-500 rounded"></div>
                  <span className="font-medium">{impactInfo.service}</span>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm mb-2">Geography</p>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">{impactInfo.geography}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
