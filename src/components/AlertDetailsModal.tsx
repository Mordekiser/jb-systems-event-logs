
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle, Clock, Bell } from "lucide-react";

interface AlertDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: any;
}

export const AlertDetailsModal = ({ open, onOpenChange, alert }: AlertDetailsModalProps) => {
  if (!alert) return null;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "high":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case "medium":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "low":
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "investigating":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getSeverityIcon(alert.severity)}
            <span>Alert Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{alert.title}</h3>
            <p className="text-gray-600">{alert.description}</p>
          </div>

          <div className="flex space-x-2">
            <Badge className={getSeverityColor(alert.severity)}>
              {alert.severity}
            </Badge>
            <Badge className={getStatusColor(alert.status)}>
              {alert.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Domain</p>
              <p className="text-sm">{alert.domain}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tenancy</p>
              <p className="text-sm">{alert.tenancy}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Source</p>
              <p className="text-sm">{alert.source}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Timestamp</p>
              <p className="text-sm">{alert.timestamp}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Metric</p>
            <p className="text-sm font-mono bg-gray-50 px-3 py-2 rounded border">{alert.metric}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Affected Services</p>
            <div className="flex flex-wrap gap-2">
              {alert.affectedServices?.map((service: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {alert.status === "active" && (
              <Button>
                Acknowledge Alert
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
