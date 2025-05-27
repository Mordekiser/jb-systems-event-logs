
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, AlertTriangle } from "lucide-react";

export const StatusDashboard = () => {
  const services = [
    { name: "Online", category: "Domains" },
    { name: "Multi Country", category: "Tenancy" },
    { name: "NZ", category: "Tenancy" },
    { name: "AUS", category: "Tenancy" },
    { name: "Multi Country", category: "Back of House" },
    { name: "NZ", category: "Back of House" },
    { name: "AUS", category: "Back of House" },
    { name: "Multi Country", category: "Back of House" },
    { name: "NZ", category: "Back of House" },
    { name: "AUS", category: "Back of House" }
  ];

  const columns = ["Alerts", "Healthchecks", "Incidents", "Releases"];

  const getStatusIcon = (serviceIndex: number, columnIndex: number) => {
    // Mock some different statuses based on the image
    if (serviceIndex === 2 && columnIndex === 2) {
      return <div className="h-6 w-6 bg-orange-500 rounded-full mx-auto"></div>;
    }
    if (serviceIndex === 3 && (columnIndex === 0 || columnIndex === 1)) {
      return <div className="h-6 w-6 bg-red-500 rounded-full mx-auto"></div>;
    }
    return <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />;
  };

  const renderServiceRow = (service: any, index: number) => {
    const isFirstInCategory = index === 0 || services[index - 1].category !== service.category;
    const categoryRowCount = services.filter(s => s.category === service.category).length;
    
    return (
      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        {isFirstInCategory && (
          <td 
            className="p-4 border-r bg-gray-100 text-center font-medium text-gray-700 align-middle"
            rowSpan={categoryRowCount}
          >
            <div className="writing-mode-vertical transform -rotate-90 whitespace-nowrap">
              {service.category}
            </div>
          </td>
        )}
        <td className="p-4 font-medium text-gray-900">
          {service.name}
        </td>
        {columns.map((column, columnIndex) => (
          <td key={column} className="text-center p-4">
            {getStatusIcon(index, columnIndex)}
          </td>
        ))}
      </tr>
    );
  };

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
          <CardTitle className="text-xl">Active Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-100 border border-yellow-300 rounded p-3 mb-4">
            <span className="text-yellow-800 text-sm">
              <strong>do read</strong><br />
              <strong>a count?</strong><br />
              <strong>/ no?</strong>
            </span>
          </div>
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
                  <th className="text-center p-4 font-medium text-gray-700 border-r">Domains</th>
                  <th className="text-left p-4 font-medium text-gray-700">Tenancy</th>
                  {columns.map((column) => (
                    <th key={column} className="text-center p-4 font-medium text-gray-700 min-w-[120px]">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => renderServiceRow(service, index))}
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
