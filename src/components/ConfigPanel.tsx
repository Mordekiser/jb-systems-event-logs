import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, Bell, Database, Shield, Info, Lightbulb, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ConfigPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfigPanel = ({ open, onOpenChange }: ConfigPanelProps) => {
  const [groupingStrategy, setGroupingStrategy] = useState("domain");
  const [showRegionalBreakdown, setShowRegionalBreakdown] = useState(true);
  const [combineHealthchecks, setCombineHealthchecks] = useState(false);

  const groupingSuggestions = [
    {
      title: "By Service Type",
      description: "Group APIs, Databases, and Auth services separately",
      example: "API Services → Database Services → Authentication",
      impact: "Clearer separation of concerns, easier to identify service-specific issues"
    },
    {
      title: "By Business Function", 
      description: "Group by customer-facing vs internal services",
      example: "Customer Services → Internal Tools → Infrastructure",
      impact: "Business-aligned view, prioritize customer-impacting issues"
    },
    {
      title: "By Criticality Level",
      description: "Group services by their business criticality",
      example: "Critical → High → Medium → Low Priority",
      impact: "Focus attention on most important services first"
    },
    {
      title: "Regional Consolidation",
      description: "Combine AU/NZ regions into single status indicators",
      example: "Back of House (Combined) → Front of House (Combined)",
      impact: "Simplified overview, reduce visual clutter"
    }
  ];

  const currentConfigPreview = () => {
    if (groupingStrategy === "domain" && showRegionalBreakdown) {
      return "Current: Domain-based with AU/NZ breakdown (Default view)";
    } else if (groupingStrategy === "service-type") {
      return "Preview: API Services | Database Services | Auth Services";
    } else if (groupingStrategy === "criticality") {
      return "Preview: Critical Services | Standard Services | Support Services";
    } else if (!showRegionalBreakdown) {
      return "Preview: Consolidated regional view (AU+NZ combined)";
    }
    return "Current: Default domain-based grouping";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>System Configuration</span>
          </DialogTitle>
          <DialogDescription>
            Configure system monitoring, notifications, and dashboard grouping.
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

          <TabsContent value="grouping" className="space-y-4 overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Dashboard Grouping Strategy</span>
                </CardTitle>
                <CardDescription>
                  Configure how services are grouped and displayed in the Status Dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Grouping Strategy</Label>
                  <Select value={groupingStrategy} onValueChange={setGroupingStrategy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grouping strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domain">By Domain (Current)</SelectItem>
                      <SelectItem value="service-type">By Service Type</SelectItem>
                      <SelectItem value="criticality">By Criticality Level</SelectItem>
                      <SelectItem value="business-function">By Business Function</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Regional Breakdown</Label>
                    <p className="text-sm text-gray-500">Display AU/NZ as separate rows</p>
                  </div>
                  <Switch 
                    checked={showRegionalBreakdown} 
                    onCheckedChange={setShowRegionalBreakdown} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Combine Health Indicators</Label>
                    <p className="text-sm text-gray-500">Merge alerts and healthchecks into one column</p>
                  </div>
                  <Switch 
                    checked={combineHealthchecks} 
                    onCheckedChange={setCombineHealthchecks} 
                  />
                </div>

                {/* Preview Section */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Dashboard Preview</span>
                  </div>
                  <p className="text-sm text-blue-700">{currentConfigPreview()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <span>Grouping Suggestions</span>
                </CardTitle>
                <CardDescription>
                  Dynamic recommendations based on your current setup and best practices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {groupingSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                        <div className="mt-2 text-xs">
                          <span className="text-gray-500">Example:</span>
                          <span className="ml-1 font-mono bg-gray-100 px-1 rounded">{suggestion.example}</span>
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="text-gray-500">Impact:</span>
                          <span className="ml-1 text-green-700">{suggestion.impact}</span>
                        </div>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                          <div className="space-y-2">
                            <h4 className="font-medium">Implementation Steps</h4>
                            <p className="text-sm text-gray-600">
                              To implement "{suggestion.title}":
                            </p>
                            <ol className="text-xs text-gray-600 list-decimal list-inside space-y-1">
                              <li>Update service metadata with grouping tags</li>
                              <li>Configure grouping rules in dashboard settings</li>
                              <li>Test the new layout with sample data</li>
                              <li>Deploy changes to production dashboard</li>
                            </ol>
                            <Button size="sm" className="w-full mt-2">
                              Apply Configuration
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
