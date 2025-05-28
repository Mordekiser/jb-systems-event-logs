
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Shield, Server, Database } from "lucide-react";

interface AzureAlertVariantsProps {
  alerts: any[];
  variant: string;
}

export const AzureAlertVariants = ({ alerts, variant }: AzureAlertVariantsProps) => {
  const getVariantStyles = (variantName: string) => {
    const variants = {
      // Design 1: Metro Style
      "metro": {
        layout: "tiles",
        cardStyle: "bg-blue-600 text-white p-6 hover:bg-blue-700 transition-colors cursor-pointer",
        titleStyle: "text-xl font-bold mb-2",
        statusStyle: "bg-white/20 text-white px-3 py-1 rounded text-sm",
        containerStyle: "grid grid-cols-2 md:grid-cols-4 gap-4"
      },
      // Design 2: Alert Dashboard
      "dashboard": {
        layout: "dashboard",
        cardStyle: "bg-white border-l-4 border-red-500 p-4 shadow-sm hover:shadow-md transition-shadow",
        titleStyle: "text-lg font-semibold text-gray-800 mb-2",
        statusStyle: "inline-flex px-2 py-1 text-xs font-medium rounded-full",
        containerStyle: "space-y-3"
      },
      // Design 3: Card Grid
      "cards": {
        layout: "grid",
        cardStyle: "bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border",
        titleStyle: "text-lg font-medium text-gray-900 mb-3",
        statusStyle: "px-3 py-1 rounded-full text-sm font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      },
      // Design 4: Timeline
      "timeline": {
        layout: "timeline",
        cardStyle: "border-l-4 border-orange-400 pl-6 py-4 relative before:absolute before:left-[-8px] before:top-6 before:w-4 before:h-4 before:bg-orange-400 before:rounded-full",
        titleStyle: "text-lg font-semibold text-gray-800 mb-2",
        statusStyle: "bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm",
        containerStyle: "space-y-6 pl-4"
      },
      // Design 5: Kanban Style
      "kanban": {
        layout: "columns",
        cardStyle: "bg-gray-50 border border-gray-200 rounded p-4 mb-3 hover:bg-gray-100 transition-colors",
        titleStyle: "text-md font-medium text-gray-800 mb-2",
        statusStyle: "px-2 py-1 rounded text-xs font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-3 gap-6"
      },
      // Design 6: Status Board
      "statusboard": {
        layout: "board",
        cardStyle: "bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-4",
        titleStyle: "text-lg font-bold text-red-800 mb-2",
        statusStyle: "bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-4"
      },
      // Design 7: Terminal Style
      "terminal": {
        layout: "terminal",
        cardStyle: "bg-black text-green-400 p-4 font-mono border border-green-500 mb-2",
        titleStyle: "text-lg font-bold mb-2 before:content-['[ALERT]_'] before:text-red-400",
        statusStyle: "text-green-400 px-2 py-1 border border-green-500 text-sm bg-gray-900",
        containerStyle: "space-y-2 bg-black p-6 rounded-lg"
      },
      // Design 8: Minimal Clean
      "minimal": {
        layout: "clean",
        cardStyle: "bg-white border border-gray-100 p-6 hover:border-gray-200 transition-colors",
        titleStyle: "text-lg font-medium text-gray-900 mb-3",
        statusStyle: "text-gray-600 bg-gray-100 px-3 py-1 rounded text-sm",
        containerStyle: "space-y-4"
      },
      // Design 9: Neon Glow
      "neon": {
        layout: "glow",
        cardStyle: "bg-gray-900 border border-cyan-400 p-4 shadow-lg shadow-cyan-400/20 rounded-lg",
        titleStyle: "text-lg font-bold text-cyan-300 mb-2",
        statusStyle: "border border-cyan-400 text-cyan-300 px-3 py-1 rounded-full text-sm bg-gray-800",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-950 p-6 rounded-xl"
      },
      // Design 10: Glass Morphism
      "glass": {
        layout: "glass",
        cardStyle: "backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl",
        titleStyle: "text-lg font-bold text-white mb-3",
        statusStyle: "bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-red-500 to-orange-500 p-8 rounded-2xl"
      },
      // Design 11-20: More unique designs...
      "vintage": {
        layout: "vintage",
        cardStyle: "bg-amber-50 border-2 border-amber-200 p-5 shadow-md rounded",
        titleStyle: "text-lg font-serif font-bold text-amber-900 mb-3",
        statusStyle: "bg-amber-600 text-white px-3 py-1 text-sm font-serif rounded",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6"
      },
      "corporate": {
        layout: "corporate",
        cardStyle: "bg-slate-50 border-l-4 border-slate-600 p-6 hover:bg-slate-100 transition-colors",
        titleStyle: "text-xl font-semibold text-slate-800 mb-3",
        statusStyle: "bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium",
        containerStyle: "space-y-3"
      },
      "retro": {
        layout: "retro",
        cardStyle: "bg-yellow-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        titleStyle: "text-lg font-bold text-black mb-2 font-mono",
        statusStyle: "bg-black text-yellow-300 px-3 py-1 font-mono text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-pink-400 p-6"
      },
      "brutalist": {
        layout: "brutalist",
        cardStyle: "bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        titleStyle: "text-2xl font-black text-black mb-3 uppercase",
        statusStyle: "bg-black text-white px-4 py-2 font-black text-sm uppercase",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-8"
      },
      "cyberpunk": {
        layout: "cyberpunk",
        cardStyle: "bg-black border border-green-400 p-4 relative before:absolute before:inset-0 before:bg-green-400/10",
        titleStyle: "text-lg font-bold text-green-300 mb-2 font-mono tracking-wider",
        statusStyle: "border border-green-400 text-green-300 px-3 py-1 bg-black/80 text-sm font-mono",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-950 p-6"
      },
      "watercolor": {
        layout: "watercolor",
        cardStyle: "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-6 shadow-lg",
        titleStyle: "text-lg font-medium text-purple-800 mb-3",
        statusStyle: "bg-white/80 text-purple-700 px-4 py-2 rounded-full text-sm backdrop-blur-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 gap-6"
      },
      "industrial": {
        layout: "industrial",
        cardStyle: "bg-gray-800 border border-orange-500 p-4 relative before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-orange-500",
        titleStyle: "text-lg font-bold text-orange-300 mb-2 font-mono",
        statusStyle: "bg-orange-500 text-black px-3 py-1 font-bold text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-900 p-6"
      },
      "geometric": {
        layout: "geometric",
        cardStyle: "bg-white p-6 relative before:absolute before:top-0 before:left-0 before:w-4 before:h-full before:bg-gradient-to-b before:from-red-500 before:to-orange-500",
        titleStyle: "text-lg font-bold text-gray-800 mb-2 ml-6",
        statusStyle: "bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-sm font-medium",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      },
      "rainbow": {
        layout: "rainbow",
        cardStyle: "bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 rounded-xl p-5 shadow-lg",
        titleStyle: "text-lg font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-2",
        statusStyle: "bg-gradient-to-r from-red-500 to-green-500 text-white px-3 py-1 rounded-full text-sm",
        containerStyle: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      }
    };

    return variants[variantName] || variants.dashboard;
  };

  const styles = getVariantStyles(variant);

  const getSeverityIcon = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const mockAlerts = alerts.length > 0 ? alerts : [
    {
      id: 1,
      name: "High CPU Usage",
      severity: "Critical",
      status: "Active",
      resource: "WebApp-Production",
      description: "CPU usage has exceeded 90% for the last 15 minutes",
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      name: "Database Connection Timeout",
      severity: "Warning", 
      status: "Resolved",
      resource: "SQL-Database-Main",
      description: "Connection timeout detected on primary database",
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 3,
      name: "Memory Usage Alert",
      severity: "Info",
      status: "Active",
      resource: "API-Gateway",
      description: "Memory usage approaching threshold",
      timestamp: new Date(Date.now() - 1800000).toISOString()
    }
  ];

  return (
    <div className={styles.containerStyle}>
      {mockAlerts.map((alert) => (
        <div key={alert.id} className={styles.cardStyle}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getSeverityIcon(alert.severity)}
              <h3 className={styles.titleStyle}>{alert.name}</h3>
            </div>
            <Badge className={`${styles.statusStyle} ${getSeverityColor(alert.severity)}`}>
              {alert.severity}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Server className="h-3 w-3" />
              <span>{alert.resource}</span>
            </div>
            <span>{new Date(alert.timestamp).toLocaleString()}</span>
          </div>
          
          <div className="mt-3">
            <Badge variant={alert.status === 'Active' ? 'destructive' : 'secondary'} className="text-xs">
              {alert.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
