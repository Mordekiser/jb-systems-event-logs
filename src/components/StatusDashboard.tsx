
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
      name: "Front of House",
      tenancies: [
        { name: "Multi Country", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" },
        { name: "NZ", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" },
        { name: "AUS", alerts: "green", healthchecks: "green", incidents: "green", releases: "green" }
      ]
    },
    {
      name: "Data Services",
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
            <Badge className="bg-yellow-500 text-white">2</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Matrix */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-6 gap-4">
            {/* Headers */}
            <div className="font-medium">Domain</div>
            <div className="font-medium">Tenancy</div>
            <div className="font-medium text-center">Alerts</div>
            <div className="font-medium text-center">Healthchecks</div>
            <div className="font-medium text-center">Incidents</div>
            <div className="font-medium text-center">Releases</div>

            {/* Status Rows */}
            {domains.map((domain, domainIndex) => 
              domain.tenancies.map((tenancy, tenancyIndex) => (
                <React.Fragment key={`${domainIndex}-${tenancyIndex}`}>
                  <div className="p-2 border rounded text-sm bg-blue-50 font-medium">
                    {domain.name}
                  </div>
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
  );
};
