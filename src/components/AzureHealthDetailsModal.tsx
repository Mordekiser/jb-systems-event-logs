
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, Activity, Globe } from "lucide-react";

interface AzureHealthDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  healthCheck: any;
}

export const AzureHealthDetailsModal = ({ open, onOpenChange, healthCheck }: AzureHealthDetailsModalProps) => {
  if (!healthCheck) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "degraded":
        return "bg-yellow-100 text-yellow-800";
      case "unhealthy":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "unhealthy":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getStatusIcon(healthCheck.status)}
            <span>Health Check Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{healthCheck.name}</h3>
            <p className="text-gray-600">{healthCheck.description}</p>
          </div>

          <div className="flex space-x-2">
            <Badge className={getStatusColor(healthCheck.status)}>
              {healthCheck.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Domain</p>
              <p className="text-sm">{healthCheck.domain}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tenancy</p>
              <p className="text-sm">{healthCheck.tenancy}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Response Time</p>
              <p className="text-sm">{healthCheck.responseTime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Check</p>
              <p className="text-sm">{healthCheck.lastCheck}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Endpoint</p>
            <p className="text-sm font-mono bg-gray-50 px-3 py-2 rounded border">{healthCheck.endpoint}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Details</p>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded border">{healthCheck.details}</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              View in Azure
            </Button>
            <Button>
              Run Check Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
