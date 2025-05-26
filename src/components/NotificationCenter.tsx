
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react";

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationCenter = ({ open, onOpenChange }: NotificationCenterProps) => {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "High API Response Times Detected",
      message: "API response times have exceeded 2 seconds for the past 5 minutes.",
      timestamp: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "info",
      title: "Scheduled Maintenance Starting Soon",
      message: "Database maintenance will begin in 30 minutes.",
      timestamp: "15 minutes ago",
      read: false
    },
    {
      id: 3,
      type: "success",
      title: "Incident Resolved",
      message: "Login authentication delays have been resolved.",
      timestamp: "1 hour ago",
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </DialogTitle>
          <DialogDescription>
            Stay updated with system events and alerts.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <Badge className="bg-blue-500 text-white text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.timestamp}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm">
            Clear All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
