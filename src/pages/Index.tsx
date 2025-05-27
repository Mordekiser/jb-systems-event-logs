import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Bell, Plus, Settings, AlertTriangle, CheckCircle, Clock, Activity, BarChart3, Package, Calendar, Zap, Code, Menu, Database, Home } from "lucide-react";
import { StatusOverview } from "@/components/StatusOverview";
import { EventsSection } from "@/components/EventsSection";
import { IncidentTracking } from "@/components/IncidentTracking";
import { ConfigPanel } from "@/components/ConfigPanel";
import { ManualEventCreationModal } from "@/components/ManualEventCreationModal";
import { NotificationCenter } from "@/components/NotificationCenter";
import { StatusDashboard } from "@/components/StatusDashboard";
import { TimelineHistory } from "@/components/TimelineHistory";
import { ReleaseEvents } from "@/components/ReleaseEvents";
import { ApiListing } from "@/components/ApiListing";
import { Alerts } from "@/components/Alerts";
import { AzureAppInsightHealth } from "@/components/AzureAppInsightHealth";
import { IncidentProvider } from "@/contexts/IncidentContext";

const Index = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("status-dashboard");
  const [timelineFilter, setTimelineFilter] = useState<{
    statusType?: string;
    tenancy?: string;
    domain?: string;
  }>({});
  const [apiListingFilter, setApiListingFilter] = useState<string>("");
  const [incidentFilter, setIncidentFilter] = useState<{
    domain?: string;
    tenancy?: string;
  }>({});

  const clearAllFilters = () => {
    setTimelineFilter({});
    setApiListingFilter("");
    setIncidentFilter({});
    setActiveTab("status-dashboard");
  };

  const clearTimelineFilter = () => {
    setTimelineFilter({});
  };

  const clearIncidentFilter = () => {
    setIncidentFilter({});
  };

  const clearApiListingFilter = () => {
    setApiListingFilter("");
  };

  const handleStatusClick = (statusType: string, tenancy: string, domain: string) => {
    // Navigate to different tabs based on status type
    if (statusType === 'alerts') {
      setActiveTab("alerts");
    } else if (statusType === 'healthchecks') {
      setActiveTab("azure-health");
    } else if (statusType === 'incidents') {
      setIncidentFilter({ domain, tenancy });
      setActiveTab("incidents");
    } else if (statusType === 'releases') {
      setActiveTab("release-events");
    } else {
      setTimelineFilter({ statusType, tenancy, domain });
      setActiveTab("timeline-history");
    }
  };

  const handleDomainClick = (domain: string) => {
    // Map domain names to API listing filter values
    const domainMapping: { [key: string]: string } = {
      "Back of House": "Back of House",
      "Front of House": "Front of House", 
      "Data Services": "Core Retail" // Assuming Data Services maps to Core Retail in API listing
    };
    
    setApiListingFilter(domainMapping[domain] || domain);
    setActiveTab("api-listing");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Clear filters when navigating directly to tabs (not through status dashboard)
    if (value === "incidents") {
      setIncidentFilter({});
    } else if (value === "api-listing") {
      setApiListingFilter("");
    } else if (value === "timeline-history") {
      setTimelineFilter({});
    }
  };

  const renderBreadcrumbs = () => {
    const hasTimelineFilter = timelineFilter.statusType || timelineFilter.tenancy || timelineFilter.domain;
    const hasIncidentFilter = incidentFilter.domain || incidentFilter.tenancy;
    const hasApiFilter = apiListingFilter;

    if (!hasTimelineFilter && !hasIncidentFilter && !hasApiFilter) {
      return null;
    }

    return (
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={clearAllFilters}
                  className="flex items-center cursor-pointer hover:text-blue-600"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Status Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {hasTimelineFilter && activeTab === "timeline-history" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={clearTimelineFilter}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      Timeline History
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {timelineFilter.domain && `${timelineFilter.domain}`}
                      {timelineFilter.tenancy && ` - ${timelineFilter.tenancy}`}
                      {timelineFilter.statusType && ` - ${timelineFilter.statusType}`}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}

              {hasIncidentFilter && activeTab === "incidents" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={clearIncidentFilter}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      Incidents
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {incidentFilter.domain && `${incidentFilter.domain}`}
                      {incidentFilter.tenancy && ` - ${incidentFilter.tenancy}`}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}

              {hasApiFilter && activeTab === "api-listing" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={clearApiListingFilter}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      API Listing
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {apiListingFilter}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    );
  };

  const tabItems = [
    { value: "status-dashboard", label: "Status Dashboard", icon: Activity },
    { value: "timeline-history", label: "Timeline History", icon: Clock },
    { value: "alerts", label: "Alerts", icon: AlertTriangle },
    { value: "azure-health", label: "Azure AppInsight Health", icon: Database },
    { value: "release-events", label: "Release Events", icon: Package },
    { value: "api-listing", label: "API Listing", icon: Code },
    { value: "events", label: "Events", icon: Calendar },
    { value: "incidents", label: "Incidents", icon: AlertTriangle },
    { value: "monitoring", label: "Monitoring", icon: BarChart3 },
  ];

  return (
    <IncidentProvider>
      <div className="min-h-screen bg-yellow-400">
        {/* Header */}
        <header className="bg-yellow-400 shadow-sm border-b border-yellow-500 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <img src="/lovable-uploads/0127785e-3c65-4556-abc3-5185624e3902.png" alt="Application Logo" className="h-8 w-auto" />
                <h1 className="text-2xl font-bold text-black">System Status Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setShowNotifications(true)} className="relative bg-white border-black text-black hover:bg-gray-100">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
                
                <Button variant="outline" size="sm" onClick={() => setShowConfig(true)} className="bg-white border-black text-black hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-2" />
                  Config
                </Button>
                
                <Button size="sm" onClick={() => setShowAddEvent(true)} className="bg-black text-white hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Bar */}
        <nav className="bg-slate-950 border-b border-yellow-500 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center">
              <div className="flex space-x-1">
                {tabItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleTabChange(item.value)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-none border-b-2 transition-colors ${
                      activeTab === item.value
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "text-white hover:bg-slate-800 border-transparent"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex justify-between items-center py-3">
              <span className="text-white font-medium">
                {tabItems.find(item => item.value === activeTab)?.label}
              </span>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 bg-slate-950 border-yellow-500">
                  <div className="flex flex-col space-y-2 mt-8">
                    {tabItems.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleTabChange(item.value)}
                        className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-md transition-colors w-full text-left ${
                          activeTab === item.value
                            ? "bg-yellow-400 text-black"
                            : "text-white hover:bg-slate-800"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          {renderBreadcrumbs()}

          {/* Main Dashboard */}
          <div className="space-y-8">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
              <TabsContent value="status-dashboard" className="space-y-6">
                <StatusDashboard onStatusClick={handleStatusClick} onDomainClick={handleDomainClick} />
              </TabsContent>

              <TabsContent value="timeline-history" className="space-y-6">
                <TimelineHistory filter={timelineFilter} />
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <Alerts />
              </TabsContent>

              <TabsContent value="azure-health" className="space-y-6">
                <AzureAppInsightHealth />
              </TabsContent>

              <TabsContent value="release-events" className="space-y-6">
                <ReleaseEvents />
              </TabsContent>

              <TabsContent value="api-listing" className="space-y-6">
                <ApiListing initialDomainFilter={apiListingFilter} />
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <StatusOverview />
                <EventsSection />
              </TabsContent>

              <TabsContent value="incidents" className="space-y-6">
                <IncidentTracking filter={incidentFilter} />
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-white border-yellow-300">
                    <CardHeader>
                      <CardTitle className="text-sm text-black">Azure Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-black">Connected</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-yellow-300">
                    <CardHeader>
                      <CardTitle className="text-sm text-black">App Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-black">Health Check Active</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-yellow-300">
                    <CardHeader>
                      <CardTitle className="text-sm text-black">Automated Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm text-black">2 Failed Tests</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Modals */}
        <ManualEventCreationModal open={showAddEvent} onOpenChange={setShowAddEvent} />
        <ConfigPanel open={showConfig} onOpenChange={setShowConfig} />
        <NotificationCenter open={showNotifications} onOpenChange={setShowNotifications} />
      </div>
    </IncidentProvider>
  );
};

export default Index;
