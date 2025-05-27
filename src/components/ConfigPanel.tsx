
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, Bell, Database, Shield, Info, Lightbulb, ArrowRight, Zap } from "lucide-react";
import { useConfig } from "@/contexts/ConfigContext";
import { useToast } from "@/hooks/use-toast";

interface ConfigPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfigPanel = ({ open, onOpenChange }: ConfigPanelProps) => {
  const {
    groupingStrategy,
    showRegionalBreakdown,
    combineHealthchecks,
    setGroupingStrategy,
    setShowRegionalBreakdown,
    setCombineHealthchecks,
    applyGroupingStrategy,
  } = useConfig();
  
  const { toast } = useToast();

  const groupingSuggestions = [
    {
      title: "By Service Type",
      description: "Group APIs, Databases, and Auth services separately",
      example: "API Services → Database Services → Authentication",
      impact: "Clearer separation of concerns, easier to identify service-specific issues",
      strategy: "service-type",
      icon: Database,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "By Business Function", 
      description: "Group by customer-facing vs internal services",
      example: "Customer Services → Internal Tools → Infrastructure",
      impact: "Business-aligned view, prioritize customer-impacting issues",
      strategy: "business-function",
      icon: Shield,
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "By Criticality Level",
      description: "Group services by their business criticality",
      example: "Critical → High → Medium → Low Priority",
      impact: "Focus attention on most important services first",
      strategy: "criticality",
      icon: Zap,
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
    },
    {
      title: "Regional Consolidation",
      description: "Combine AU/NZ regions into single status indicators",
      example: "Back of House (Combined) → Front of House (Combined)",
      impact: "Simplified overview, reduce visual clutter",
      strategy: "domain",
      icon: Settings,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    }
  ];

  const currentConfigPreview = () => {
    if (groupingStrategy === "domain" && showRegionalBreakdown) {
      return "Current: Domain-based with AU/NZ breakdown (Default view)";
    } else if (groupingStrategy === "service-type") {
      return "Preview: API Services | Database Services | Auth Services";
    } else if (groupingStrategy === "criticality") {
      return "Preview: Critical Services | Standard Services | Support Services";
    } else if (groupingStrategy === "business-function") {
      return "Preview: Customer Services | Internal Tools | Infrastructure";
    } else if (!showRegionalBreakdown) {
      return "Preview: Consolidated regional view (AU+NZ combined)";
    }
    return "Current: Default domain-based grouping";
  };

  const handleApplyConfiguration = (suggestion: any) => {
    if (suggestion.strategy === "domain" && suggestion.title === "Regional Consolidation") {
      setShowRegionalBreakdown(false);
    } else {
      applyGroupingStrategy(suggestion.strategy);
    }
    
    toast({
      title: "Configuration Applied",
      description: `Dashboard updated with "${suggestion.title}" grouping strategy.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[700px] bg-white">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Settings className="h-6 w-6 text-blue-600" />
            <span>System Configuration</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Configure system monitoring, notifications, and dashboard grouping.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="notifications" className="h-full overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white">Notifications</TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-white">Integrations</TabsTrigger>
            <TabsTrigger value="grouping" className="data-[state=active]:bg-white">Grouping</TabsTrigger>
          </TabsList>

          <div className="h-[calc(100%-60px)] overflow-y-auto">
            <TabsContent value="notifications" className="space-y-4 p-1">
              <Card className="border-gray-200">
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <span>Notification Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive alerts via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="font-medium">Desktop Notifications</Label>
                      <p className="text-sm text-gray-500">Browser push notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@company.com"
                      defaultValue="admin@company.com"
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="font-medium">Subscribe to Domains</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">API Services</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Database Systems</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Authentication</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4 p-1">
              <Card className="border-gray-200">
                <CardHeader className="bg-green-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Database className="h-5 w-5 text-green-600" />
                    <span>External Integrations</span>
                  </CardTitle>
                  <CardDescription>
                    Connect external monitoring and alerting systems.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900">Azure Alerts</h4>
                      <p className="text-sm text-gray-500">Ingest alerts from Azure Monitor</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900">App Insights Health Check</h4>
                      <p className="text-sm text-gray-500">Monitor application health</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900">Automated Test Results</h4>
                      <p className="text-sm text-gray-500">Track test pass/fail status</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900">Telemetry Harvest</h4>
                      <p className="text-sm text-gray-500">Collect system telemetry data</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grouping" className="space-y-4 p-1">
              <Card className="border-gray-200">
                <CardHeader className="bg-orange-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Shield className="h-5 w-5 text-orange-600" />
                    <span>Dashboard Grouping Strategy</span>
                  </CardTitle>
                  <CardDescription>
                    Configure how services are grouped and displayed in the Status Dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-3">
                    <Label className="font-medium">Grouping Strategy</Label>
                    <Select value={groupingStrategy} onValueChange={setGroupingStrategy}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select grouping strategy" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg z-50">
                        <SelectItem value="domain">By Domain (Current)</SelectItem>
                        <SelectItem value="service-type">By Service Type</SelectItem>
                        <SelectItem value="criticality">By Criticality Level</SelectItem>
                        <SelectItem value="business-function">By Business Function</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="font-medium">Show Regional Breakdown</Label>
                      <p className="text-sm text-gray-500">Display AU/NZ as separate rows</p>
                    </div>
                    <Switch 
                      checked={showRegionalBreakdown} 
                      onCheckedChange={setShowRegionalBreakdown} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="font-medium">Combine Health Indicators</Label>
                      <p className="text-sm text-gray-500">Merge alerts and healthchecks into one column</p>
                    </div>
                    <Switch 
                      checked={combineHealthchecks} 
                      onCheckedChange={setCombineHealthchecks} 
                    />
                  </div>

                  {/* Preview Section */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Dashboard Preview</span>
                    </div>
                    <p className="text-sm text-blue-700">{currentConfigPreview()}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Dynamic Suggestions */}
              <Card className="border-gray-200">
                <CardHeader className="bg-yellow-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    <span>Grouping Suggestions</span>
                  </CardTitle>
                  <CardDescription>
                    Dynamic recommendations based on your current setup and best practices.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {groupingSuggestions.map((suggestion, index) => (
                    <div key={index} className={`p-4 border rounded-lg transition-all duration-200 ${suggestion.color}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <suggestion.icon className="h-5 w-5 mt-1 text-gray-600" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{suggestion.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                            <div className="mb-2">
                              <span className="text-xs font-medium text-gray-500">Example:</span>
                              <div className="text-xs font-mono bg-white px-2 py-1 rounded mt-1 border">
                                {suggestion.example}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-500">Impact:</span>
                              <p className="text-xs text-green-700 mt-1">{suggestion.impact}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button 
                            size="sm" 
                            onClick={() => handleApplyConfiguration(suggestion)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Apply
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white border shadow-lg z-50" align="end">
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Implementation Steps</h4>
                                <p className="text-sm text-gray-600">
                                  To implement "{suggestion.title}":
                                </p>
                                <ol className="text-xs text-gray-600 list-decimal list-inside space-y-1">
                                  <li>Update service metadata with grouping tags</li>
                                  <li>Configure grouping rules in dashboard settings</li>
                                  <li>Test the new layout with sample data</li>
                                  <li>Deploy changes to production dashboard</li>
                                </ol>
                                <Button 
                                  size="sm" 
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={() => handleApplyConfiguration(suggestion)}
                                >
                                  Apply Configuration
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
