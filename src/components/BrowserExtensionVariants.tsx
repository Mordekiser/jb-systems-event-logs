
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

interface BrowserExtensionVariantsProps {
  variant: string;
}

export const BrowserExtensionVariants = ({ variant }: BrowserExtensionVariantsProps) => {
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

  const getVariantStyles = (variantName: string) => {
    const variants = {
      // Variant 1: Ocean Blue Theme
      "ocean": {
        headerBg: "bg-gradient-to-r from-blue-500 to-blue-700",
        cardBg: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-900",
        accentColor: "bg-blue-500"
      },
      // Variant 2: Sunset Orange Theme
      "sunset": {
        headerBg: "bg-gradient-to-r from-orange-500 to-red-500",
        cardBg: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-900",
        accentColor: "bg-orange-500"
      },
      // Variant 3: Forest Green Theme
      "forest": {
        headerBg: "bg-gradient-to-r from-green-600 to-emerald-600",
        cardBg: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-900",
        accentColor: "bg-green-500"
      },
      // Variant 4: Purple Galaxy Theme
      "galaxy": {
        headerBg: "bg-gradient-to-r from-purple-600 to-indigo-600",
        cardBg: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-900",
        accentColor: "bg-purple-500"
      },
      // Variant 5: Crimson Red Theme
      "crimson": {
        headerBg: "bg-gradient-to-r from-red-600 to-pink-600",
        cardBg: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-900",
        accentColor: "bg-red-500"
      },
      // Variant 6: Midnight Dark Theme
      "midnight": {
        headerBg: "bg-gradient-to-r from-gray-800 to-gray-900",
        cardBg: "bg-gray-900",
        borderColor: "border-gray-700",
        textColor: "text-gray-100",
        accentColor: "bg-gray-600"
      },
      // Variant 7: Golden Theme
      "golden": {
        headerBg: "bg-gradient-to-r from-yellow-500 to-amber-500",
        cardBg: "bg-yellow-50",
        borderColor: "border-yellow-200",
        textColor: "text-yellow-900",
        accentColor: "bg-yellow-500"
      },
      // Variant 8: Teal Wave Theme
      "teal": {
        headerBg: "bg-gradient-to-r from-teal-500 to-cyan-500",
        cardBg: "bg-teal-50",
        borderColor: "border-teal-200",
        textColor: "text-teal-900",
        accentColor: "bg-teal-500"
      },
      // Variant 9: Rose Pink Theme
      "rose": {
        headerBg: "bg-gradient-to-r from-pink-500 to-rose-500",
        cardBg: "bg-pink-50",
        borderColor: "border-pink-200",
        textColor: "text-pink-900",
        accentColor: "bg-pink-500"
      },
      // Variant 10: Steel Gray Theme
      "steel": {
        headerBg: "bg-gradient-to-r from-slate-600 to-gray-600",
        cardBg: "bg-slate-50",
        borderColor: "border-slate-200",
        textColor: "text-slate-900",
        accentColor: "bg-slate-500"
      },
      // Variant 11: Lime Fresh Theme
      "lime": {
        headerBg: "bg-gradient-to-r from-lime-500 to-green-500",
        cardBg: "bg-lime-50",
        borderColor: "border-lime-200",
        textColor: "text-lime-900",
        accentColor: "bg-lime-500"
      },
      // Variant 12: Coral Theme
      "coral": {
        headerBg: "bg-gradient-to-r from-red-400 to-pink-400",
        cardBg: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-800",
        accentColor: "bg-red-400"
      },
      // Variant 13: Electric Blue Theme
      "electric": {
        headerBg: "bg-gradient-to-r from-blue-600 to-indigo-600",
        cardBg: "bg-blue-50",
        borderColor: "border-blue-300",
        textColor: "text-blue-800",
        accentColor: "bg-blue-600"
      },
      // Variant 14: Lavender Theme
      "lavender": {
        headerBg: "bg-gradient-to-r from-violet-500 to-purple-500",
        cardBg: "bg-violet-50",
        borderColor: "border-violet-200",
        textColor: "text-violet-900",
        accentColor: "bg-violet-500"
      },
      // Variant 15: Emerald Theme
      "emerald": {
        headerBg: "bg-gradient-to-r from-emerald-600 to-green-600",
        cardBg: "bg-emerald-50",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-900",
        accentColor: "bg-emerald-500"
      },
      // Variant 16: Amber Theme
      "amber": {
        headerBg: "bg-gradient-to-r from-amber-500 to-orange-500",
        cardBg: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-900",
        accentColor: "bg-amber-500"
      },
      // Variant 17: Indigo Theme
      "indigo": {
        headerBg: "bg-gradient-to-r from-indigo-600 to-blue-600",
        cardBg: "bg-indigo-50",
        borderColor: "border-indigo-200",
        textColor: "text-indigo-900",
        accentColor: "bg-indigo-500"
      },
      // Variant 18: Cyan Theme
      "cyan": {
        headerBg: "bg-gradient-to-r from-cyan-500 to-blue-500",
        cardBg: "bg-cyan-50",
        borderColor: "border-cyan-200",
        textColor: "text-cyan-900",
        accentColor: "bg-cyan-500"
      },
      // Variant 19: Warm Theme
      "warm": {
        headerBg: "bg-gradient-to-r from-rose-500 to-orange-500",
        cardBg: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-900",
        accentColor: "bg-rose-500"
      },
      // Variant 20: Mint Theme
      "mint": {
        headerBg: "bg-gradient-to-r from-green-400 to-emerald-400",
        cardBg: "bg-green-50",
        borderColor: "border-green-300",
        textColor: "text-green-800",
        accentColor: "bg-green-400"
      }
    };

    return variants[variantName] || variants.ocean;
  };

  const styles = getVariantStyles(variant);

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
      <Card className={`${styles.cardBg} ${styles.borderColor}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full ${styles.accentColor} flex items-center justify-center`}>
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className={styles.textColor}>
                Browser Extension Demo - {variant.charAt(0).toUpperCase() + variant.slice(1)} Theme
              </span>
              <div className="flex space-x-2 mt-1">
                <Badge className={styles.accentColor + " text-white"}>Quick Status View</Badge>
                <Badge variant="outline" className={`${styles.borderColor} ${styles.textColor}`}>Live Data</Badge>
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
            className={`${styles.headerBg} text-white`}
          >
            <Globe className="h-4 w-4 mr-2" />
            Open Extension
          </Button>
        </CardContent>
      </Card>

      {/* Browser Extension Popup */}
      {isExtensionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg shadow-2xl border w-80 max-h-96 overflow-hidden ${styles.borderColor}`}>
            {/* Extension Header */}
            <div className={`flex items-center justify-between p-3 border-b ${styles.headerBg} ${styles.borderColor}`}>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-white bg-opacity-20 flex items-center justify-center">
                  <Globe className="h-3 w-3 text-white" />
                </div>
                <span className="font-semibold text-sm text-white">JB HI-FI Status</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 hover:bg-white hover:bg-opacity-20 text-white"
                  onClick={() => setIsExtensionOpen(false)}
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 hover:bg-white hover:bg-opacity-20 text-white"
                  onClick={() => setIsExtensionOpen(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Overall Status */}
            <div className={`p-3 border-b ${styles.cardBg} ${styles.borderColor}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${overallStatus.color}`}></div>
                  <span className={`text-sm font-medium ${styles.textColor}`}>{overallStatus.status}</span>
                </div>
                <span className="text-xs text-gray-500">Updated 2m ago</span>
              </div>
            </div>

            {/* Applications List */}
            <div className="max-h-64 overflow-y-auto">
              {applications.map((app, index) => {
                const StatusIcon = getStatusIcon(app.status);
                return (
                  <div key={index} className={`flex items-center justify-between p-3 hover:${styles.cardBg} border-b border-gray-50 last:border-b-0`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <app.icon className={`h-4 w-4 ${styles.textColor}`} />
                        <span className={`text-sm font-medium ${styles.textColor}`}>{app.name}</span>
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
            <div className={`p-3 border-t ${styles.cardBg} ${styles.borderColor}`}>
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs ${styles.textColor} hover:${styles.cardBg} p-0 h-auto`}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs ${styles.textColor} hover:${styles.cardBg} p-0 h-auto`}
                >
                  View Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
