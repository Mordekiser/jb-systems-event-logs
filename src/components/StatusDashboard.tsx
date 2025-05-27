
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

export const StatusDashboard = () => {
  const regions = [
    "United States", 
    "Canada", 
    "Brazil", 
    "Europe", 
    "United Kingdom", 
    "Asia Pacific", 
    "Australia", 
    "India"
  ];

  const services = [
    {
      name: "Core services",
      icon: "🔵",
      statuses: ["green", "green", "green", "green", "green", "green", "red", "green"]
    },
    {
      name: "Boards",
      icon: "📋",
      statuses: ["green", "green", "green", "green", "green", "green", "green", "green"]
    },
    {
      name: "Repos",
      icon: "🔴",
      statuses: ["green", "green", "green", "green", "green", "green", "green", "green"]
    },
    {
      name: "Pipelines",
      icon: "🔵",
      statuses: ["green", "green", "green", "green", "green", "green", "green", "green"]
    },
    {
      name: "Test Plans",
      icon: "🟣",
      statuses: ["green", "green", "green", "orange", "green", "green", "green", "green"]
    },
    {
      name: "Artifacts",
      icon: "🟥",
      statuses: ["green", "green", "green", "green", "green", "green", "green", "green"]
    },
    {
      name: "Other services",
      icon: "🔵",
      statuses: ["green", "green", "green", "green", "green", "green", "green", "green"]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "green":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "orange":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "red":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="mb-4">
          <div className="inline-flex flex-col items-center space-y-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-1">
                {[...Array(Math.min(9 - Math.abs(i - 2) * 2, 9))].map((_, j) => (
                  <div key={j} className="w-2 h-1 bg-green-500 rounded-full"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Everything is looking good</h2>
        <p className="text-gray-600">
          View past events in the <span className="text-blue-600 underline cursor-pointer">status history</span>.
        </p>
      </div>

      {/* Active Events */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Active events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">We are not tracking any degraded or unhealthy services at the moment.</p>
        </CardContent>
      </Card>

      {/* Service Health Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Service health</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-700">Services</th>
                  {regions.map((region) => (
                    <th key={region} className="text-center p-4 font-medium text-gray-700 min-w-[120px]">
                      {region}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service.name} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{service.icon}</span>
                        <span className="font-medium text-gray-900">{service.name}</span>
                      </div>
                    </td>
                    {service.statuses.map((status, regionIndex) => (
                      <td key={regionIndex} className="p-4 text-center">
                        {getStatusIcon(status)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Status Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>Healthy</span>
        </div>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <span>Degraded</span>
        </div>
        <div className="flex items-center space-x-2">
          <XCircle className="h-4 w-4 text-red-500" />
          <span>Unhealthy</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>Advisory</span>
        </div>
      </div>
    </div>
  );
};
