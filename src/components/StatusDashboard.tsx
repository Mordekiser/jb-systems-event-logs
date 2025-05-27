
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

export const StatusDashboard = () => {
  const domains = [
    {
      name: "Back of House",
      tenancies: [
        { name: "Multi Country", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" },
        { name: "NZ", alerts: "green", healthchecks: "green", incidents: "orange", releases: "green" },
        { name: "AUS", alerts: "red", healthchecks: "red", incidents: "green", releases: "green" }
      ]
    },
    {
      name: "Back of House",
      tenancies: [
        { name: "Multi Country", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" },
        { name: "NZ", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" },
        { name: "AUS", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" }
      ]
    },
    {
      name: "Back of House",
      tenancies: [
        { name: "Multi Country", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" },
        { name: "NZ", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" },
        { name: "AUS", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "green":
        return <div className="w-6 h-6 rounded-full bg-green-500"></div>;
      case "orange":
        return <div className="w-6 h-6 rounded-full bg-orange-500"></div>;
      case "red":
        return <div className="w-6 h-6 rounded-full bg-red-500"></div>;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-500"></div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Events Banner */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Active Events</span>
            <Badge className="bg-yellow-500 text-white">do need a count? / no?</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domains Column */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 border rounded">Online</div>
                {domains.map((domain, index) => (
                  <div key={index} className="p-2 border rounded bg-gray-50">
                    {domain.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Matrix */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-5 gap-4">
                {/* Headers */}
                <div className="font-medium">Tenancy</div>
                <div className="font-medium text-center">Alerts</div>
                <div className="font-medium text-center">Healthchecks</div>
                <div className="font-medium text-center">Incidents</div>
                <div className="font-medium text-center">Releases</div>

                {/* Status Rows */}
                {domains.map((domain, domainIndex) => 
                  domain.tenancies.map((tenancy, tenancyIndex) => (
                    <React.Fragment key={`${domainIndex}-${tenancyIndex}`}>
                      <div className="p-2 border rounded text-sm bg-gray-50">
                        {tenancy.name}
                      </div>
                      <div className="flex justify-center">
                        {getStatusIcon(tenancy.alerts)}
                      </div>
                      <div className="flex justify-center">
                        {getStatusIcon(tenancy.healthchecks)}
                      </div>
                      <div className="flex justify-center">
                        {getStatusIcon(tenancy.incidents)}
                      </div>
                      <div className="flex justify-center">
                        {getStatusIcon(tenancy.releases)}
                      </div>
                    </React.Fragment>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drill Down Section */}
      <Card>
        <CardHeader>
          <CardTitle>Drill into Domain from status dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded bg-gray-50">
              <h3 className="font-medium mb-2">Back of House</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded">Multi Country</div>
              <div className="p-3 border rounded">Carrier API</div>
              <div className="p-3 border rounded">Customer Order API</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
