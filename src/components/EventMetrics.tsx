
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, AlertTriangle } from "lucide-react";
import { useEvents } from "@/contexts/EventsContext";

type TimeFilter = "weekly" | "monthly" | "quarterly" | "yearly";

export const EventMetrics = () => {
  const { events } = useEvents();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("monthly");

  const getFilteredEvents = () => {
    const now = new Date();
    let startDate = new Date();

    switch (timeFilter) {
      case "weekly":
        startDate.setDate(now.getDate() - 7);
        break;
      case "monthly":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "quarterly":
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "yearly":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return events.filter(event => 
      new Date(event.createdTimestamp) >= startDate
    );
  };

  const filteredEvents = getFilteredEvents();
  const deploymentCount = filteredEvents.filter(event => event.eventType === "Deployment").length;
  const incidentCount = filteredEvents.filter(event => event.eventType === "Incident").length;

  const getTimeFilterLabel = () => {
    switch (timeFilter) {
      case "weekly":
        return "This Week";
      case "monthly":
        return "This Month";
      case "quarterly":
        return "This Quarter";
      case "yearly":
        return "This Year";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Event Metrics</span>
          </CardTitle>
          <Select value={timeFilter} onValueChange={(value: TimeFilter) => setTimeFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deployments Section */}
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Deployments</p>
                  <p className="text-3xl font-bold text-purple-700">{deploymentCount}</p>
                  <p className="text-sm text-purple-600 mt-1">{getTimeFilterLabel()}</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-4">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  Scheduled Releases
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Incidents Section */}
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Incidents</p>
                  <p className="text-3xl font-bold text-red-700">{incidentCount}</p>
                  <p className="text-sm text-red-600 mt-1">{getTimeFilterLabel()}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div className="mt-4">
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  Service Issues
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Events ({getTimeFilterLabel()})</span>
            <span className="font-semibold text-gray-900">{filteredEvents.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
