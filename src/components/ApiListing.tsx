import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronRight, Server, Globe, Database, Code, Shield } from "lucide-react";

export const ApiListing = () => {
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);
  const [expandedApplications, setExpandedApplications] = useState<string[]>([]);

  const toggleDomain = (domainName: string) => {
    setExpandedDomains(prev => 
      prev.includes(domainName) 
        ? prev.filter(d => d !== domainName)
        : [...prev, domainName]
    );
  };

  const toggleApplication = (appName: string) => {
    setExpandedApplications(prev => 
      prev.includes(appName) 
        ? prev.filter(a => a !== appName)
        : [...prev, appName]
    );
  };

  // Updated data structure with new domains
  const apiData = [
    {
      domain: "Front of House",
      applications: [
        {
          name: "Customer Management App",
          systems: [
            {
              name: "User Authentication System",
              apis: [
                { name: "Login API", method: "POST", endpoint: "/auth/login", status: "active" },
                { name: "Register API", method: "POST", endpoint: "/auth/register", status: "active" },
                { name: "Password Reset API", method: "PUT", endpoint: "/auth/reset", status: "maintenance" }
              ]
            },
            {
              name: "Profile Management System",
              apis: [
                { name: "Get Profile API", method: "GET", endpoint: "/profile/{id}", status: "active" },
                { name: "Update Profile API", method: "PUT", endpoint: "/profile/{id}", status: "active" }
              ]
            }
          ]
        },
        {
          name: "Order Processing App",
          systems: [
            {
              name: "Cart Management System",
              apis: [
                { name: "Add to Cart API", method: "POST", endpoint: "/cart/add", status: "active" },
                { name: "Remove from Cart API", method: "DELETE", endpoint: "/cart/remove", status: "active" },
                { name: "Get Cart API", method: "GET", endpoint: "/cart/{userId}", status: "deprecated" }
              ]
            },
            {
              name: "Payment Processing System",
              apis: [
                { name: "Process Payment API", method: "POST", endpoint: "/payment/process", status: "active" },
                { name: "Refund API", method: "POST", endpoint: "/payment/refund", status: "active" }
              ]
            }
          ]
        }
      ]
    },
    {
      domain: "Back of House",
      applications: [
        {
          name: "Data Analytics App",
          systems: [
            {
              name: "Reporting System",
              apis: [
                { name: "Generate Report API", method: "POST", endpoint: "/reports/generate", status: "active" },
                { name: "Get Report API", method: "GET", endpoint: "/reports/{id}", status: "active" },
                { name: "Export Report API", method: "GET", endpoint: "/reports/{id}/export", status: "maintenance" }
              ]
            },
            {
              name: "Metrics Collection System",
              apis: [
                { name: "Track Event API", method: "POST", endpoint: "/metrics/track", status: "active" },
                { name: "Get Metrics API", method: "GET", endpoint: "/metrics/{type}", status: "active" }
              ]
            }
          ]
        }
      ]
    },
    {
      domain: "Online",
      applications: [
        {
          name: "Access Control App",
          systems: [
            {
              name: "Authorization System",
              apis: [
                { name: "Check Permissions API", method: "GET", endpoint: "/auth/permissions", status: "active" },
                { name: "Grant Access API", method: "POST", endpoint: "/auth/grant", status: "active" },
                { name: "Revoke Access API", method: "DELETE", endpoint: "/auth/revoke", status: "deprecated" }
              ]
            }
          ]
        }
      ]
    },
    {
      domain: "Core Retail",
      applications: [
        {
          name: "Inventory Management App",
          systems: [
            {
              name: "Stock Management System",
              apis: [
                { name: "Get Stock API", method: "GET", endpoint: "/inventory/stock", status: "active" },
                { name: "Update Stock API", method: "PUT", endpoint: "/inventory/stock/{id}", status: "active" },
                { name: "Low Stock Alert API", method: "GET", endpoint: "/inventory/alerts", status: "active" }
              ]
            },
            {
              name: "Product Management System",
              apis: [
                { name: "Create Product API", method: "POST", endpoint: "/products/create", status: "active" },
                { name: "Update Product API", method: "PUT", endpoint: "/products/{id}", status: "active" }
              ]
            }
          ]
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "deprecated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800";
      case "POST":
        return "bg-green-100 text-green-800";
      case "PUT":
        return "bg-orange-100 text-orange-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-yellow-300">
        <CardHeader>
          <CardTitle className="text-xl text-black flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>API Listing by Domain</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiData.map((domain, domainIndex) => (
              <div key={domainIndex} className="border rounded-lg bg-gray-50">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleDomain(domain.domain)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {expandedDomains.includes(domain.domain) ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                      <Globe className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-lg text-black">{domain.domain}</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {domain.applications.length} Applications
                    </Badge>
                  </div>
                </div>

                {expandedDomains.includes(domain.domain) && (
                  <div className="px-4 pb-4 space-y-3">
                    {domain.applications.map((app, appIndex) => (
                      <div key={appIndex} className="ml-6 border rounded-lg bg-white">
                        <div 
                          className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleApplication(`${domain.domain}-${app.name}`)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {expandedApplications.includes(`${domain.domain}-${app.name}`) ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )}
                              <Server className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-black">{app.name}</span>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {app.systems.length} Systems
                            </Badge>
                          </div>
                        </div>

                        {expandedApplications.includes(`${domain.domain}-${app.name}`) && (
                          <div className="px-3 pb-3 space-y-2">
                            {app.systems.map((system, systemIndex) => (
                              <div key={systemIndex} className="ml-6 border rounded bg-gray-50">
                                <div className="p-3">
                                  <div className="flex items-center space-x-3 mb-3">
                                    <Database className="h-4 w-4 text-purple-600" />
                                    <span className="font-medium text-black">{system.name}</span>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                      {system.apis.length} APIs
                                    </Badge>
                                  </div>
                                  
                                  <div className="ml-6 space-y-2">
                                    {system.apis.map((api, apiIndex) => (
                                      <div key={apiIndex} className="flex items-center justify-between p-2 bg-white rounded border">
                                        <div className="flex items-center space-x-3">
                                          <Badge className={getMethodColor(api.method)} variant="outline">
                                            {api.method}
                                          </Badge>
                                          <span className="font-medium text-sm text-black">{api.name}</span>
                                          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                                            {api.endpoint}
                                          </code>
                                        </div>
                                        <Badge className={getStatusColor(api.status)} variant="outline">
                                          {api.status}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
