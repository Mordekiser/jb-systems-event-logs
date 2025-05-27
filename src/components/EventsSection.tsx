
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Filter, Plus, User, Database, FileText } from "lucide-react";
import { HistoryButton } from "./HistoryButton";
import { AddEventModal } from "./AddEventModal";
import { useToast } from "@/hooks/use-toast";

export const EventsSection = () => {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedCreatedBy, setSelectedCreatedBy] = useState("All Users");
  const [createdFromDate, setCreatedFromDate] = useState("");
  const [createdToDate, setCreatedToDate] = useState("");
  const [selectedUpdatedBy, setSelectedUpdatedBy] = useState("All Users");
  const [updatedFromDate, setUpdatedFromDate] = useState("");
  const [updatedToDate, setUpdatedToDate] = useState("");
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const { toast } = useToast();

  const events = [
    {
      id: 1,
      title: "Database Migration Completed",
      description: "Successfully migrated customer database to new infrastructure",
      type: "maintenance",
      domain: "Back of House",
      timestamp: "2024-01-15 14:30:00",
      duration: "2 hours",
      impact: "Low",
      createdBy: "John Smith",
      createdAt: "2024-01-15 12:30:00",
      updatedBy: "Jane Doe",
      updatedAt: "2024-01-15 14:30:00",
      affectedSystems: ["Customer Database", "Reporting System"]
    },
    {
      id: 2,
      title: "API Gateway Update",
      description: "Deployed new API gateway version with enhanced security features",
      type: "deployment",
      domain: "Front of House",
      timestamp: "2024-01-15 13:15:00",
      duration: "30 minutes",
      impact: "Medium",
      createdBy: "Mike Johnson",
      createdAt: "2024-01-15 13:00:00",
      updatedBy: "Mike Johnson",
      updatedAt: "2024-01-15 13:45:00",
      affectedSystems: ["API Gateway", "Authentication Service"]
    },
    {
      id: 3,
      title: "Scheduled System Backup",
      description: "Automated daily backup of critical systems completed successfully",
      type: "backup",
      domain: "Data Services",
      timestamp: "2024-01-15 02:00:00",
      duration: "45 minutes",
      impact: "None",
      createdBy: "System Scheduler",
      createdAt: "2024-01-15 02:00:00",
      updatedBy: "System Scheduler",
      updatedAt: "2024-01-15 02:45:00",
      affectedSystems: ["Database Cluster", "File Storage"]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "maintenance":
        return "bg-blue-100 text-blue-800";
      case "deployment":
        return "bg-green-100 text-green-800";
      case "backup":
        return "bg-purple-100 text-purple-800";
      case "incident":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      case "None":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesDomain = selectedDomain === "All Domains" || event.domain === selectedDomain;
    const matchesType = selectedType === "All Types" || event.type === selectedType.toLowerCase();
    const matchesCreatedBy = selectedCreatedBy === "All Users" || event.createdBy === selectedCreatedBy;
    const matchesUpdatedBy = selectedUpdatedBy === "All Users" || event.updatedBy === selectedUpdatedBy;
    
    // Date filtering logic
    const eventCreatedDate = new Date(event.createdAt);
    const eventUpdatedDate = new Date(event.updatedAt);
    
    const matchesCreatedFromDate = !createdFromDate || eventCreatedDate >= new Date(createdFromDate);
    const matchesCreatedToDate = !createdToDate || eventCreatedDate <= new Date(createdToDate);
    const matchesUpdatedFromDate = !updatedFromDate || eventUpdatedDate >= new Date(updatedFromDate);
    const matchesUpdatedToDate = !updatedToDate || eventUpdatedDate <= new Date(updatedToDate);
    
    return matchesDomain && matchesType && matchesCreatedBy && matchesUpdatedBy && 
           matchesCreatedFromDate && matchesCreatedToDate && matchesUpdatedFromDate && matchesUpdatedToDate;
  });

  const handleViewDetails = (event: any) => {
    toast({
      title: "Event Details",
      description: `Viewing details for ${event.title}`,
    });
  };

  const handleExportEvents = () => {
    toast({
      title: "Exporting Events",
      description: "Events data is being exported to CSV format.",
    });
  };

  const handleClearFilters = () => {
    setSelectedDomain("All Domains");
    setSelectedType("All Types");
    setSelectedCreatedBy("All Users");
    setCreatedFromDate("");
    setCreatedToDate("");
    setSelectedUpdatedBy("All Users");
    setUpdatedFromDate("");
    setUpdatedToDate("");
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  // Get unique values for filter dropdowns
  const uniqueUsers = Array.from(new Set([...events.map(e => e.createdBy), ...events.map(e => e.updatedBy)]));

  return (
    <div className="space-y-6">
      {/* Events Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>System Events</span>
            </div>
            <Button onClick={() => setIsAddEventModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Primary Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Domain:</span>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["All Domains", "Front of House", "Back of House", "Core Retail", "Data Services"].map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Type:</span>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["All Types", "Maintenance", "Deployment", "Backup", "Incident"].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportEvents}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Advanced Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Created By:</label>
                <Select value={selectedCreatedBy} onValueChange={setSelectedCreatedBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Users">All Users</SelectItem>
                    {uniqueUsers.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Created From:</label>
                <Input
                  type="datetime-local"
                  value={createdFromDate}
                  onChange={(e) => setCreatedFromDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Created To:</label>
                <Input
                  type="datetime-local"
                  value={createdToDate}
                  onChange={(e) => setCreatedToDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Updated By:</label>
                <Select value={selectedUpdatedBy} onValueChange={setSelectedUpdatedBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Users">All Users</SelectItem>
                    {uniqueUsers.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Updated From:</label>
                <Input
                  type="datetime-local"
                  value={updatedFromDate}
                  onChange={(e) => setUpdatedFromDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Updated To:</label>
                <Input
                  type="datetime-local"
                  value={updatedToDate}
                  onChange={(e) => setUpdatedToDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                  <Badge className={getImpactColor(event.impact)}>
                    {event.impact} Impact
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Domain</p>
                  <p className="text-sm">{event.domain}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-sm">{event.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created By</p>
                  <p className="text-sm">{event.createdBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Updated By</p>
                  <p className="text-sm">{event.updatedBy}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Created At</p>
                  <p className="text-sm">{event.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Updated At</p>
                  <p className="text-sm">{event.updatedAt}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Affected Systems</p>
                <div className="flex flex-wrap gap-2">
                  {event.affectedSystems.map((system, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {system}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <HistoryButton
                  entityType="event"
                  entityId={event.id.toString()}
                  entityTitle={event.title}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(event)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600">No events match your current filter criteria.</p>
          </CardContent>
        </Card>
      )}

      <AddEventModal
        open={isAddEventModalOpen}
        onOpenChange={setIsAddEventModalOpen}
      />
    </div>
  );
};
