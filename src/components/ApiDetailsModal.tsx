
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Globe, FileText } from "lucide-react";

interface ApiDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  api: any;
}

export const ApiDetailsModal = ({ open, onOpenChange, api }: ApiDetailsModalProps) => {
  if (!api) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "deprecated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800";
      case "POST":
        return "bg-green-100 text-green-800";
      case "PUT":
        return "bg-orange-100 text-orange-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>API Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{api.name}</h3>
            <p className="text-gray-600">{api.description}</p>
          </div>

          <div className="flex space-x-2">
            <Badge className={getMethodColor(api.method)}>
              {api.method}
            </Badge>
            <Badge className={getStatusColor(api.status)}>
              {api.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Domain</p>
              <p className="text-sm">{api.domain}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p className="text-sm">{api.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Application</p>
              <p className="text-sm">{api.application}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">System</p>
              <p className="text-sm">{api.system}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Endpoint</p>
            <p className="text-sm font-mono bg-gray-50 px-3 py-2 rounded border">{api.endpoint}</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              Test API
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
