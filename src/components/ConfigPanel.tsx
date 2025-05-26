
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Database, Shield } from "lucide-react";

interface ConfigPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfigPanel = ({ open, onOpenChange }: ConfigPanelProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>System Configuration</span>
          </DialogTitle>
          <DialogDescription>
            Configure system monitoring, notifications, and integrations.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="notifications" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="grouping">Grouping</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Notification Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive alerts via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Desktop Notifications</Label>
                    <p className="text-sm text-gray-500">Browser push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@company.com"
                    defaultValue="admin@company.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Subscribe to Domains</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <span className="text-sm">API Services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <span className="text-sm">Database Systems</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <span className="text-sm">Authentication</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>External Integrations</span>
                </CardTitle>
                <CardDescription>
                  Connect external monitoring and alerting systems.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Azure Alerts</h4>
                    <p className="text-sm text-gray-500">Ingest alerts from Azure Monitor</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">App Insights Health Check</h4>
                    <p className="text-sm text-gray-500">Monitor application health</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Automated Test Results</h4>
                    <p className="text-sm text-gray-500">Track test pass/fail status</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Telemetry Harvest</h4>
                    <p className="text-sm text-gray-500">Collect system telemetry data</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grouping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Grouping & Rollup</CardTitle>
                <CardDescription>
                  Configure how services are grouped and rolled up in the dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Service Groups</Label>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Core Services</h4>
                      <p className="text-sm text-gray-500">API Gateway, Database, Authentication</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">External Services</h4>
                      <p className="text-sm text-gray-500">Email Service, File Storage</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Add New Group
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
