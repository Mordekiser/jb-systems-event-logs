
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, AlertTriangle } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  severity: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  affectedServices: string[];
}

interface IncidentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incident: Incident | null;
}

export const IncidentDetailsModal = ({ open, onOpenChange, incident }: IncidentDetailsModalProps) => {
  if (!incident) return null;

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
    };
    
    return (
      <Badge className={variants[severity as keyof typeof variants]}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      investigating: "bg-orange-100 text-orange-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Incident Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-sm text-gray-500">{incident.id}</span>
              <h2 className="text-xl font-semibold mt-1">{incident.title}</h2>
            </div>
            <div className="flex space-x-2">
              {getSeverityBadge(incident.severity)}
              {getStatusBadge(incident.status)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Created By</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">{incident.createdBy}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Created</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">{incident.createdAt}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Last Updated</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">{incident.updatedAt}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <div className="ml-6">
                {getStatusBadge(incident.status)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Affected Services</h3>
            <div className="flex flex-wrap gap-2">
              {incident.affectedServices.map((service, index) => (
                <Badge key={index} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
