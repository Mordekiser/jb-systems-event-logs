import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Filter, Download, Columns, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const ApiListing = () => {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [searchTerm, setSearchTerm] = useState("");

  // Flattened API data for table display
  const apiData = [
    // Front of House APIs
    { name: "Login API", description: "User authentication for login", domain: "Front of House", type: "Web Api", method: "POST", endpoint: "/auth/login", status: "active", application: "Customer Management App", system: "User Authentication System" },
    { name: "Register API", description: "User registration endpoint", domain: "Front of House", type: "Web Api", method: "POST", endpoint: "/auth/register", status: "active", application: "Customer Management App", system: "User Authentication System" },
    { name: "Password Reset API", description: "Password reset functionality", domain: "Front of House", type: "Web Api", method: "PUT", endpoint: "/auth/reset", status: "maintenance", application: "Customer Management App", system: "User Authentication System" },
    { name: "Get Profile API", description: "Retrieve user profile information", domain: "Front of House", type: "Web Api", method: "GET", endpoint: "/profile/{id}", status: "active", application: "Customer Management App", system: "Profile Management System" },
    { name: "Update Profile API", description: "Update user profile data", domain: "Front of House", type: "Web Api", method: "PUT", endpoint: "/profile/{id}", status: "active", application: "Customer Management App", system: "Profile Management System" },
    { name: "Add to Cart API", description: "Add items to shopping cart", domain: "Front of House", type: "Web Api", method: "POST", endpoint: "/cart/add", status: "active", application: "Order Processing App", system: "Cart Management System" },
    { name: "Remove from Cart API", description: "Remove items from cart", domain: "Front of House", type: "Web Api", method: "DELETE", endpoint: "/cart/remove", status: "active", application: "Order Processing App", system: "Cart Management System" },
    { name: "Get Cart API", description: "Retrieve cart contents", domain: "Front of House", type: "Web Api", method: "GET", endpoint: "/cart/{userId}", status: "deprecated", application: "Order Processing App", system: "Cart Management System" },
    { name: "Process Payment API", description: "Process customer payments", domain: "Front of House", type: "Web Api", method: "POST", endpoint: "/payment/process", status: "active", application: "Order Processing App", system: "Payment Processing System" },
    { name: "Refund API", description: "Process payment refunds", domain: "Front of House", type: "Web Api", method: "POST", endpoint: "/payment/refund", status: "active", application: "Order Processing App", system: "Payment Processing System" },
    
    // Back of House APIs
    { name: "Generate Report API", description: "Generate analytics reports", domain: "Back of House", type: "Web Api", method: "POST", endpoint: "/reports/generate", status: "active", application: "Data Analytics App", system: "Reporting System" },
    { name: "Get Report API", description: "Retrieve generated reports", domain: "Back of House", type: "Web Api", method: "GET", endpoint: "/reports/{id}", status: "active", application: "Data Analytics App", system: "Reporting System" },
    { name: "Export Report API", description: "Export reports to various formats", domain: "Back of House", type: "Web Api", method: "GET", endpoint: "/reports/{id}/export", status: "maintenance", application: "Data Analytics App", system: "Reporting System" },
    { name: "Track Event API", description: "Track user events and metrics", domain: "Back of House", type: "Web Api", method: "POST", endpoint: "/metrics/track", status: "active", application: "Data Analytics App", system: "Metrics Collection System" },
    { name: "Get Metrics API", description: "Retrieve performance metrics", domain: "Back of House", type: "Web Api", method: "GET", endpoint: "/metrics/{type}", status: "active", application: "Data Analytics App", system: "Metrics Collection System" },
    
    // Online APIs
    { name: "Check Permissions API", description: "Verify user permissions", domain: "Online", type: "Web Api", method: "GET", endpoint: "/auth/permissions", status: "active", application: "Access Control App", system: "Authorization System" },
    { name: "Grant Access API", description: "Grant user access rights", domain: "Online", type: "Web Api", method: "POST", endpoint: "/auth/grant", status: "active", application: "Access Control App", system: "Authorization System" },
    { name: "Revoke Access API", description: "Revoke user access rights", domain: "Online", type: "Web Api", method: "DELETE", endpoint: "/auth/revoke", status: "deprecated", application: "Access Control App", system: "Authorization System" },
    
    // Core Retail APIs
    { name: "Get Stock API", description: "Retrieve current stock levels", domain: "Core Retail", type: "Web Api", method: "GET", endpoint: "/inventory/stock", status: "active", application: "Inventory Management App", system: "Stock Management System" },
    { name: "Update Stock API", description: "Update inventory stock levels", domain: "Core Retail", type: "Web Api", method: "PUT", endpoint: "/inventory/stock/{id}", status: "active", application: "Inventory Management App", system: "Stock Management System" },
    { name: "Low Stock Alert API", description: "Get low stock alerts", domain: "Core Retail", type: "Web Api", method: "GET", endpoint: "/inventory/alerts", status: "active", application: "Inventory Management App", system: "Stock Management System" },
    { name: "Create Product API", description: "Create new product entries", domain: "Core Retail", type: "Web Api", method: "POST", endpoint: "/products/create", status: "active", application: "Inventory Management App", system: "Product Management System" },
    { name: "Update Product API", description: "Update existing product information", domain: "Core Retail", type: "Web Api", method: "PUT", endpoint: "/products/{id}", status: "active", application: "Inventory Management App", system: "Product Management System" },
  ];

  const domains = ["All Domains", "Front of House", "Back of House", "Online", "Core Retail"];

  const filteredData = apiData.filter(api => {
    const matchesDomain = selectedDomain === "All Domains" || api.domain === selectedDomain;
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.endpoint.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

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
    <div className="fixed inset-0 bg-black text-white overflow-auto">
      <div className="p-6 space-y-6">
        <Card className="bg-black border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>APIs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters and Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">Owner:</span>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain} className="text-white hover:bg-gray-700">
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 flex-1">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search APIs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
                  <Columns className="h-4 w-4 mr-2" />
                  COLUMNS
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  FILTERS
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  EXPORT
                </Button>
              </div>
            </div>

            {/* API Table */}
            <div className="border rounded-lg bg-black border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-900">
                    <TableHead className="text-gray-300 font-medium">Name</TableHead>
                    <TableHead className="text-gray-300 font-medium">Description</TableHead>
                    <TableHead className="text-gray-300 font-medium">Domain</TableHead>
                    <TableHead className="text-gray-300 font-medium">Type</TableHead>
                    <TableHead className="text-gray-300 font-medium">Method</TableHead>
                    <TableHead className="text-gray-300 font-medium">Endpoint</TableHead>
                    <TableHead className="text-gray-300 font-medium">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((api, index) => (
                    <TableRow key={index} className="border-gray-700 hover:bg-gray-900">
                      <TableCell className="font-medium text-white">{api.name}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs truncate">{api.description}</TableCell>
                      <TableCell className="text-gray-300">{api.domain}</TableCell>
                      <TableCell className="text-gray-300">{api.type}</TableCell>
                      <TableCell>
                        <Badge className={`${getMethodColor(api.method)} border-0 text-xs`}>
                          {api.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300 font-mono text-xs">{api.endpoint}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(api.status)} border-0 text-xs capitalize`}>
                          {api.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No APIs found matching your criteria.
              </div>
            )}

            <div className="mt-4 text-sm text-gray-400">
              Showing {filteredData.length} of {apiData.length} APIs
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
