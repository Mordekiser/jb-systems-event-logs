
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart } from "lucide-react";

export const StatusDashboard = () => {
  const services = [
    { name: "Core services", icon: "🔧" },
    { name: "Boards", icon: "📋" },
    { name: "Repos", icon: "📁" },
    { name: "Pipelines", icon: "🔄" },
    { name: "Test Plans", icon: "🧪" },
    { name: "Artifacts", icon: "📦" },
    { name: "Other services", icon: "🔧" }
  ];

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

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Heart className="h-16 w-16 text-green-500 fill-current" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Everything is looking good</h1>
        <p className="text-gray-600">
          View past events in the{" "}
          <a href="#" className="text-blue-600 underline">status history</a>.
        </p>
      </div>

      {/* Active Events */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Active events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">We are not tracking any degraded or unhealthy services at the moment.</p>
        </CardContent>
      </Card>

      {/* Service Health Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Service health</CardTitle>
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
                  <tr key={service.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 flex items-center space-x-3">
                      <span className="text-xl">{service.icon}</span>
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </td>
                    {regions.map((region) => (
                      <td key={region} className="text-center p-4">
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Legend */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-orange-500 rounded-full"></div>
                <span>Degraded</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                <span>Unhealthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                <span>Advisory</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
