import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Plus, Settings, AlertTriangle, CheckCircle, Clock, Activity, BarChart3, Package } from "lucide-react";
import { StatusOverview } from "@/components/StatusOverview";
import { EventsSection } from "@/components/EventsSection";
import { IncidentTracking } from "@/components/IncidentTracking";
import { ConfigPanel } from "@/components/ConfigPanel";
import { ManualEventCreationModal } from "@/components/ManualEventCreationModal";
import { NotificationCenter } from "@/components/NotificationCenter";
import { StatusDashboard } from "@/components/StatusDashboard";
import { TimelineHistory } from "@/components/TimelineHistory";
import { ReleaseEvents } from "@/components/ReleaseEvents";
const Index = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  return <div className="min-h-screen bg-yellow-400">
      {/* Header */}
      <header className="bg-yellow-400 shadow-sm border-b border-yellow-500">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Dashboard */}
        <div className="space-y-8">
          <Tabs defaultValue="status-dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 border border-yellow-500 bg-slate-950">
              <TabsTrigger value="status-dashboard" className="flex items-center space-x-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                <Activity className="h-4 w-4" />
                <span>Status Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="timeline-history" className="flex items-center space-x-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                <Clock className="h-4 w-4" />
                <span>Timeline History</span>
              </TabsTrigger>
              <TabsTrigger value="release-events" className="flex items-center space-x-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                <Package className="h-4 w-4" />
                <span>Release Events</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                Events
              </TabsTrigger>
              <TabsTrigger value="incidents" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                Incidents
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                Monitoring
              </TabsTrigger>
            </TabsList>

            <TabsContent value="status-dashboard" className="space-y-6">
              <StatusDashboard />
            </TabsContent>

            <TabsContent value="timeline-history" className="space-y-6">
              <TimelineHistory />
            </TabsContent>

            <TabsContent value="release-events" className="space-y-6">
              <ReleaseEvents />
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <StatusOverview />
              <EventsSection />
            </TabsContent>

            <TabsContent value="incidents" className="space-y-6">
              <IncidentTracking />
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
    </div>;
};
export default Index;