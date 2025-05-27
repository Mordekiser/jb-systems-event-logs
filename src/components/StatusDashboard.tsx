
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { StatusLegend } from "./StatusLegend";

export const StatusDashboard = () => {
  const domains = [{
    name: "Back of House",
    tenancies: [{
      name: "NZ",
      alerts: "green",
      healthchecks: "green",
      incidents: "orange",
      releases: "green",
      services: 8
    }, {
      name: "AU",
      alerts: "red",
      healthchecks: "red",
      incidents: "green",
      releases: "green",
      services: 15
    }]
  }, {
    name: "Front of House",
    tenancies: [{
      name: "NZ",
      alerts: "green",
      healthchecks: "green",
      incidents: "green",
      releases: "green",
      services: 4
    }, {
      name: "AU",
      alerts: "green",
      healthchecks: "green",
      incidents: "green",
      releases: "green",
      services: 5
    }]
  }, {
    name: "Data Services",
    tenancies: [{
      name: "NZ",
      alerts: "green",
      healthchecks: "green",
      incidents: "green",
      releases: "green",
      services: 7
    }, {
      name: "AU",
      alerts: "green",
      healthchecks: "green",
      incidents: "green",
      releases: "green",
      services: 8
    }]
  }];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "green":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "orange":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case "red":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "blue":
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-500"></div>;
    }
  };

  return <div className="space-y-6">
      {/* Active Events Banner */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Active Events</span>
            <Badge className="text-white bg-green-800">2</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Matrix */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-4">
            {/* Headers */}
            <div className="font-medium">Domain</div>
            <div className="font-medium">Tenancy</div>
            <div className="font-medium text-center">Alerts</div>
            <div className="font-medium text-center">Healthchecks</div>
            <div className="font-medium text-center">Incidents</div>
            <div className="font-medium text-center">Releases</div>
            <div className="font-medium text-center">Services</div>

            {/* Status Rows */}
            {domains.map((domain, domainIndex) => domain.tenancies.map((tenancy, tenancyIndex) => <React.Fragment key={`${domainIndex}-${tenancyIndex}`}>
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
                  <div className="flex justify-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                      {tenancy.services}
                    </span>
                  </div>
                </React.Fragment>))}
          </div>
        </CardContent>
      </Card>

      {/* Status Legend */}
      <StatusLegend />
    </div>;
};
