import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Bell, Plus, Settings, AlertTriangle, CheckCircle, Clock, Activity, BarChart3, Package, Calendar, Zap, Code, Menu, Database, Home, Mail } from "lucide-react";
import { EventsSection } from "@/components/EventsSection";
import { ConfigPanel } from "@/components/ConfigPanel";
import { ManualEventCreationModal } from "@/components/ManualEventCreationModal";
import { NotificationCenter } from "@/components/NotificationCenter";
import { StatusDashboard } from "@/components/StatusDashboard";
import { ApplicationStatusDashboard } from "@/components/ApplicationStatusDashboard";
import { ApiListing } from "@/components/ApiListing";
import { AzureAlerts } from "@/components/AzureAlerts";
import { EventMetrics } from "@/components/EventMetrics";
import { EmailDemo } from "@/components/EmailDemo";
import { IncidentProvider } from "@/contexts/IncidentContext";
import { EventsProvider } from "@/contexts/EventsContext";
import { ConfigProvider } from "@/contexts/ConfigContext";
import { EventViewVariants } from "@/components/EventViewVariants";
import { AzureAlertVariants } from "@/components/AzureAlertVariants";
import { ApiListingVariants } from "@/components/ApiListingVariants";

const Index = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("status-dashboard");
  const [apiListingFilter, setApiListingFilter] = useState<string>("");
  const [apiApplicationFilter, setApiApplicationFilter] = useState<string>("");
  const [eventsFilter, setEventsFilter] = useState<{
    type?: string;
    domain?: string;
    tenancy?: string;
  }>({});

  // Design variant states
  const [eventViewVariant, setEventViewVariant] = useState<string>("minimal");
  const [azureAlertVariant, setAzureAlertVariant] = useState<string>("dashboard");
  const [apiListingVariant, setApiListingVariant] = useState<string>("modern");

  // Design variant options
  const eventViewVariants = [
    { value: "minimal", label: "Minimalist Cards" },
    { value: "timeline", label: "Timeline Style" },
    { value: "glass", label: "Glassmorphism" },
    { value: "neon", label: "Neon Dark" },
    { value: "newspaper", label: "Newspaper Style" },
    { value: "material", label: "Material Design" },
    { value: "retro", label: "Retro Gaming" },
    { value: "corporate", label: "Corporate Professional" },
    { value: "pastel", label: "Pastel Soft" },
    { value: "industrial", label: "Industrial" },
    { value: "artdeco", label: "Art Deco" },
    { value: "cyberpunk", label: "Cyberpunk" },
    { value: "watercolor", label: "Watercolor" },
    { value: "terminal", label: "Terminal" },
    { value: "vintage", label: "Vintage Paper" },
    { value: "geometric", label: "Geometric Modern" },
    { value: "glassdark", label: "Dark Glass" },
    { value: "rainbow", label: "Rainbow Gradient" },
    { value: "brutalist", label: "Brutalist" },
    { value: "mesh", label: "Gradient Mesh" }
  ];

  const azureAlertVariants = [
    { value: "metro", label: "Metro Style" },
    { value: "dashboard", label: "Alert Dashboard" },
    { value: "cards", label: "Card Grid" },
    { value: "timeline", label: "Timeline" },
    { value: "kanban", label: "Kanban Style" },
    { value: "statusboard", label: "Status Board" },
    { value: "terminal", label: "Terminal Style" },
    { value: "minimal", label: "Minimal Clean" },
    { value: "neon", label: "Neon Glow" },
    { value: "glass", label: "Glass Morphism" },
    { value: "vintage", label: "Vintage" },
    { value: "corporate", label: "Corporate" },
    { value: "retro", label: "Retro" },
    { value: "brutalist", label: "Brutalist" },
    { value: "cyberpunk", label: "Cyberpunk" },
    { value: "watercolor", label: "Watercolor" },
    { value: "industrial", label: "Industrial" },
    { value: "geometric", label: "Geometric" },
    { value: "rainbow", label: "Rainbow" }
  ];

  const apiListingVariants = [
    { value: "console", label: "Developer Console" },
    { value: "modern", label: "Modern Cards" },
    { value: "docs", label: "Documentation Style" },
    { value: "postman", label: "Postman Style" },
    { value: "swagger", label: "Swagger Style" },
    { value: "graphql", label: "GraphQL Style" },
    { value: "rest", label: "REST API Style" },
    { value: "microservices", label: "Microservices" },
    { value: "enterprise", label: "Enterprise" },
    { value: "minimal", label: "Minimal List" },
    { value: "terminal", label: "Terminal" },
    { value: "neon", label: "Neon" },
    { value: "retro", label: "Retro" },
    { value: "glass", label: "Glass" },
    { value: "brutalist", label: "Brutalist" },
    { value: "vintage", label: "Vintage" },
    { value: "cyberpunk", label: "Cyberpunk" },
    { value: "watercolor", label: "Watercolor" },
    { value: "geometric", label: "Geometric" }
  ];

  const clearAllFilters = () => {
    setApiListingFilter("");
    setApiApplicationFilter("");
    setEventsFilter({});
    setActiveTab("status-dashboard");
  };

  const clearEventsFilter = () => {
    setEventsFilter({});
  };

  const clearApiListingFilter = () => {
    setApiListingFilter("");
    setApiApplicationFilter("");
  };

  const handleStatusClick = (statusType: string, tenancy: string, domain: string) => {
    // Navigate to different tabs based on status type
    if (statusType === 'alerts' || statusType === 'healthchecks') {
      setActiveTab("azure-alerts");
    } else if (statusType === 'incidents') {
      setEventsFilter({ type: 'incident', domain, tenancy });
      setActiveTab("events");
    } else if (statusType === 'releases') {
      setEventsFilter({ type: 'release', domain, tenancy });
      setActiveTab("events");
    } else {
      // For other status types, navigate to events
      setEventsFilter({ domain, tenancy });
      setActiveTab("events");
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
    setApiApplicationFilter("");
    setActiveTab("api-listing");
  };

  const handleApplicationClick = (application: string) => {
    setApiApplicationFilter(application);
    setApiListingFilter("");
    setActiveTab("api-listing");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Clear filters when navigating directly to tabs (not through status dashboard)
    if (value === "events") {
      setEventsFilter({});
    } else if (value === "api-listing") {
      setApiListingFilter("");
      setApiApplicationFilter("");
    }
  };

  const renderBreadcrumbs = () => {
    const hasEventsFilter = eventsFilter.type || eventsFilter.domain || eventsFilter.tenancy;
    const hasApiFilter = apiListingFilter || apiApplicationFilter;

    // Always show breadcrumbs for all tabs except status-dashboard
    if (activeTab === "status-dashboard" && !hasEventsFilter && !hasApiFilter) {
      return null;
    }

    const getTabLabel = (tabValue: string) => {
      switch (tabValue) {
        case "status-dashboard": return "Application Status";
        case "azure-alerts": return "Azure Alerts";
        case "api-listing": return "API Listing";
        case "events": return "Events";
        case "email": return "Email";
        case "monitoring": return "System Monitoring";
        default: return "Unknown";
      }
    };

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
                  Application Status
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {activeTab !== "status-dashboard" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {hasEventsFilter || hasApiFilter ? (
                      <BreadcrumbLink 
                        onClick={() => {
                          if (activeTab === "events") clearEventsFilter();
                          if (activeTab === "api-listing") clearApiListingFilter();
                        }}
                        className="cursor-pointer hover:text-blue-600"
                      >
                        {getTabLabel(activeTab)}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>
                        {getTabLabel(activeTab)}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </>
              )}

              {hasEventsFilter && activeTab === "events" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {eventsFilter.type && `${eventsFilter.type.charAt(0).toUpperCase() + eventsFilter.type.slice(1)}s`}
                      {eventsFilter.domain && ` - ${eventsFilter.domain}`}
                      {eventsFilter.tenancy && ` - ${eventsFilter.tenancy}`}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}

              {hasApiFilter && activeTab === "api-listing" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {apiListingFilter && `Domain: ${apiListingFilter}`}
                      {apiApplicationFilter && `Application: ${apiApplicationFilter}`}
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
    { value: "status-dashboard", label: "Application Status", icon: Activity },
    { value: "azure-alerts", label: "Azure Alerts", icon: AlertTriangle },
    { value: "api-listing", label: "API Listing", icon: Code },
    { value: "events", label: "Events", icon: Calendar },
    { value: "email", label: "Email", icon: Mail },
    { value: "monitoring", label: "System Monitoring", icon: BarChart3 },
  ];

  return (
    <ConfigProvider>
      <EventsProvider>
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
                    <ApplicationStatusDashboard onApplicationClick={handleApplicationClick} />
                  </TabsContent>

                  <TabsContent value="azure-alerts" className="space-y-6">
                    <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            Azure Alerts - Design Variants
                          </span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <label className="text-sm font-medium text-gray-700">Design:</label>
                              <select 
                                value={azureAlertVariant} 
                                onChange={(e) => setAzureAlertVariant(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
                              >
                                {azureAlertVariants.map((variant) => (
                                  <option key={variant.value} value={variant.value}>
                                    {variant.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <AzureAlertVariants alerts={[]} variant={azureAlertVariant} />
                  </TabsContent>

                  <TabsContent value="api-listing" className="space-y-6">
                    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            API Listing - Design Variants
                          </span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <label className="text-sm font-medium text-gray-700">Design:</label>
                              <select 
                                value={apiListingVariant} 
                                onChange={(e) => setApiListingVariant(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
                              >
                                {apiListingVariants.map((variant) => (
                                  <option key={variant.value} value={variant.value}>
                                    {variant.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <ApiListingVariants apis={[]} variant={apiListingVariant} />
                  </TabsContent>

                  <TabsContent value="events" className="space-y-6">
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Events - Design Variants
                          </span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <label className="text-sm font-medium text-gray-700">Design:</label>
                              <select 
                                value={eventViewVariant} 
                                onChange={(e) => setEventViewVariant(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
                              >
                                {eventViewVariants.map((variant) => (
                                  <option key={variant.value} value={variant.value}>
                                    {variant.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <EventMetrics />
                    <EventsSection filter={eventsFilter} />
                  </TabsContent>

                  <TabsContent value="email" className="space-y-6">
                    <EmailDemo />
                  </TabsContent>

                  <TabsContent value="monitoring" className="space-y-6">
                    <StatusDashboard 
                      onStatusClick={handleStatusClick} 
                      onDomainClick={handleDomainClick}
                      onApplicationClick={handleApplicationClick}
                    />
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
      </EventsProvider>
    </ConfigProvider>
  );
};

export default Index;
