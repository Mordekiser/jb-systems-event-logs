
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Smartphone, 
  Server, 
  ShoppingCart, 
  Package, 
  MessageCircle, 
  Mail, 
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Settings,
  Maximize2,
  X
} from "lucide-react";

export const BrowserExtensionDemo = () => {
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);

  const applications = [
    {
      name: "JB Direct",
      icon: Smartphone,
      status: "Operational",
      statusColor: "bg-green-500",
      incidents: 0,
      responseTime: "123ms"
    },
    {
      name: "In-Store",
      icon: ShoppingCart,
      status: "Degraded",
      statusColor: "bg-yellow-500",
      incidents: 1,
      responseTime: "456ms"
    },
    {
      name: "Online",
      icon: Globe,
      status: "Operational",
      statusColor: "bg-green-500",
      incidents: 0,
      responseTime: "234ms"
    },
    {
      name: "Fulfilment",
      icon: Package,
      status: "Incident",
      statusColor: "bg-red-500",
      incidents: 2,
      responseTime: "1.2s"
    },
    {
      name: "SMS",
      icon: MessageCircle,
      status: "Operational",
      statusColor: "bg-green-500",
      incidents: 0,
      responseTime: "89ms"
    },
    {
      name: "Email",
      icon: Mail,
      status: "Operational",
      statusColor: "bg-green-500",
      incidents: 0,
      responseTime: "156ms"
    },
    {
      name: "Fraud Prevention",
      icon: Shield,
      status: "Maintenance",
      statusColor: "bg-blue-500",
      incidents: 0,
      responseTime: "345ms"
    },
    {
      name: "Core Systems",
      icon: Server,
      status: "Operational",
      statusColor: "bg-green-500",
      incidents: 0,
      responseTime: "78ms"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Operational": return CheckCircle;
      case "Degraded": return AlertTriangle;
      case "Incident": return XCircle;
      case "Maintenance": return Clock;
      default: return CheckCircle;
    }
  };

  const getOverallStatus = () => {
    const hasIncident = applications.some(app => app.status === "Incident");
    const hasDegraded = applications.some(app => app.status === "Degraded");
    const hasMaintenance = applications.some(app => app.status === "Maintenance");

    if (hasIncident) return { status: "Major Issues", color: "bg-red-500" };
    if (hasDegraded) return { status: "Minor Issues", color: "bg-yellow-500" };
    if (hasMaintenance) return { status: "Maintenance", color: "bg-blue-500" };
    return { status: "All Systems Operational", color: "bg-green-500" };
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="space-y-6">
      {/* Demo Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Browser Extension Demo
              </span>
              <div className="flex space-x-2 mt-1">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Quick Status View</Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-700">Live Data</Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Click the extension icon below to see how the browser extension would display application statuses.
          </p>
          <Button 
            onClick={() => setIsExtensionOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Globe className="h-4 w-4 mr-2" />
            Open Extension
          </Button>
        </CardContent>
      </Card>

      {/* Browser Extension Popup */}
      {isExtensionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 max-h-96 overflow-hidden">
            {/* Extension Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                  <Globe className="h-3 w-3 text-white" />
                </div>
                <span className="font-semibold text-sm text-gray-800">JB HI-FI Status</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 hover:bg-gray-200"
                  onClick={() => setIsExtensionOpen(false)}
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 hover:bg-gray-200"
                  onClick={() => setIsExtensionOpen(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Overall Status */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${overallStatus.color}`}></div>
                  <span className="text-sm font-medium text-gray-800">{overallStatus.status}</span>
                </div>
                <span className="text-xs text-gray-500">Updated 2m ago</span>
              </div>
            </div>

            {/* Applications List */}
            <div className="max-h-64 overflow-y-auto">
              {applications.map((app, index) => {
                const StatusIcon = getStatusIcon(app.status);
                return (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <app.icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-800">{app.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${app.statusColor}`}></div>
                        <StatusIcon className={`h-3 w-3 ${
                          app.status === 'Operational' ? 'text-green-600' :
                          app.status === 'Degraded' ? 'text-yellow-600' :
                          app.status === 'Incident' ? 'text-red-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      
                      {app.incidents > 0 && (
                        <Badge variant="destructive" className="text-xs px-1 py-0">
                          {app.incidents}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Extension Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-gray-600 hover:text-gray-800 p-0 h-auto"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  View Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extension Features */}
      <Card>
        <CardHeader>
          <CardTitle>Extension Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
              <h3 className="font-semibold text-sm mb-1">Quick Status Overview</h3>
              <p className="text-xs text-gray-600">See all application statuses at a glance</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mb-2" />
              <h3 className="font-semibold text-sm mb-1">Incident Alerts</h3>
              <p className="text-xs text-gray-600">Get notified of incidents immediately</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <Clock className="h-6 w-6 text-blue-500 mb-2" />
              <h3 className="font-semibold text-sm mb-1">Real-time Updates</h3>
              <p className="text-xs text-gray-600">Live status updates every 30 seconds</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
