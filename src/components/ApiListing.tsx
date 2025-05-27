
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Filter, Download, Columns, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ApiDetailsModal } from "./ApiDetailsModal";
import { useToast } from "@/hooks/use-toast";

interface ApiListingProps {
  initialDomainFilter?: string;
  initialApplicationFilter?: string;
}

export const ApiListing = ({ initialDomainFilter, initialApplicationFilter }: ApiListingProps) => {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedApplication, setSelectedApplication] = useState("All Applications");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApi, setSelectedApi] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  // Set initial filters when component receives them
  useEffect(() => {
    if (initialDomainFilter && initialDomainFilter !== selectedDomain) {
      setSelectedDomain(initialDomainFilter);
    }
    if (initialApplicationFilter && initialApplicationFilter !== selectedApplication) {
      setSelectedApplication(initialApplicationFilter);
    }
  }, [initialDomainFilter, initialApplicationFilter]);

  const handleViewDetails = (api: any) => {
    setSelectedApi(api);
    setIsDetailsModalOpen(true);
  };

  const handleColumns = () => {
    toast({
      title: "Column Configuration",
      description: "Column customization options coming soon.",
    });
  };

  const handleFilters = () => {
    toast({
      title: "Advanced Filters",
      description: "Additional filtering options coming soon.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "API listing data export initiated.",
    });
  };

  // Updated API data with applications
  const apiData = [
    // JB Direct APIs
    { name: "Customer Login API", description: "JB Direct customer authentication", domain: "Front of House", application: "JB Direct", type: "Web Api", method: "POST", endpoint: "/jb-direct/auth/login", status: "active", system: "User Authentication System" },
    { name: "Product Catalog API", description: "JB Direct product browsing", domain: "Front of House", application: "JB Direct", type: "Web Api", method: "GET", endpoint: "/jb-direct/catalog", status: "active", system: "Product Management System" },
    { name: "Shopping Cart API", description: "JB Direct cart management", domain: "Front of House", application: "JB Direct", type: "Web Api", method: "POST", endpoint: "/jb-direct/cart", status: "active", system: "Cart Management System" },
    
    // In-Store APIs
    { name: "POS Transaction API", description: "In-store point of sale transactions", domain: "Back of House", application: "In-Store", type: "Web Api", method: "POST", endpoint: "/in-store/pos/transaction", status: "active", system: "POS System" },
    { name: "Inventory Check API", description: "In-store inventory lookup", domain: "Back of House", application: "In-Store", type: "Web Api", method: "GET", endpoint: "/in-store/inventory", status: "active", system: "Inventory Management System" },
    { name: "Staff Authentication API", description: "In-store staff login", domain: "Back of House", application: "In-Store", type: "Web Api", method: "POST", endpoint: "/in-store/staff/auth", status: "active", system: "Staff Management System" },
    
    // Online APIs
    { name: "E-commerce Checkout API", description: "Online shopping checkout process", domain: "Front of House", application: "Online", type: "Web Api", method: "POST", endpoint: "/online/checkout", status: "active", system: "Payment Processing System" },
    { name: "User Profile API", description: "Online customer profile management", domain: "Front of House", application: "Online", type: "Web Api", method: "GET", endpoint: "/online/profile", status: "active", system: "Profile Management System" },
    { name: "Order History API", description: "Online order history retrieval", domain: "Front of House", application: "Online", type: "Web Api", method: "GET", endpoint: "/online/orders", status: "active", system: "Order Management System" },
    
    // Fulfilment & Consignment APIs
    { name: "Order Fulfillment API", description: "Process order fulfillment", domain: "Core Retail", application: "Fulfilment & Consignment", type: "Web Api", method: "POST", endpoint: "/fulfillment/process", status: "active", system: "Fulfillment System" },
    { name: "Consignment Tracking API", description: "Track consignment shipments", domain: "Core Retail", application: "Fulfilment & Consignment", type: "Web Api", method: "GET", endpoint: "/consignment/track", status: "active", system: "Shipping System" },
    { name: "Warehouse Management API", description: "Warehouse operations management", domain: "Core Retail", application: "Fulfilment & Consignment", type: "Web Api", method: "PUT", endpoint: "/warehouse/manage", status: "maintenance", system: "Warehouse Management System" },
    
    // Receiving & Transfer APIs
    { name: "Stock Receiving API", description: "Process incoming stock", domain: "Core Retail", application: "Receiving & Transfer", type: "Web Api", method: "POST", endpoint: "/receiving/stock", status: "active", system: "Stock Management System" },
    { name: "Inter-store Transfer API", description: "Transfer stock between stores", domain: "Core Retail", application: "Receiving & Transfer", type: "Web Api", method: "POST", endpoint: "/transfer/stores", status: "active", system: "Transfer Management System" },
    
    // SMS Communication APIs
    { name: "SMS Notification API", description: "Send SMS notifications to customers", domain: "Online", application: "SMS Communication", type: "Web Api", method: "POST", endpoint: "/sms/send", status: "active", system: "SMS Gateway System" },
    { name: "SMS Campaign API", description: "Manage SMS marketing campaigns", domain: "Online", application: "SMS Communication", type: "Web Api", method: "POST", endpoint: "/sms/campaign", status: "active", system: "Marketing System" },
    
    // Email Communication APIs
    { name: "Email Notification API", description: "Send email notifications", domain: "Online", application: "Email Communication", type: "Web Api", method: "POST", endpoint: "/email/send", status: "active", system: "Email Service System" },
    { name: "Newsletter API", description: "Manage email newsletters", domain: "Online", application: "Email Communication", type: "Web Api", method: "POST", endpoint: "/email/newsletter", status: "active", system: "Newsletter System" },
    
    // Fraud Prevention APIs
    { name: "Transaction Screening API", description: "Screen transactions for fraud", domain: "Back of House", application: "Fraud Prevention", type: "Web Api", method: "POST", endpoint: "/fraud/screen", status: "active", system: "Fraud Detection System" },
    { name: "Risk Assessment API", description: "Assess customer risk profiles", domain: "Back of House", application: "Fraud Prevention", type: "Web Api", method: "GET", endpoint: "/fraud/risk", status: "active", system: "Risk Management System" },
    { name: "Alert Management API", description: "Manage fraud alerts", domain: "Back of House", application: "Fraud Prevention", type: "Web Api", method: "PUT", endpoint: "/fraud/alerts", status: "deprecated", system: "Alert Management System" }
  ];

  const domains = ["All Domains", "Front of House", "Back of House", "Online", "Core Retail"];
  const applications = [
    "All Applications",
    "JB Direct",
    "In-Store", 
    "Online",
    "Fulfilment & Consignment",
    "Receiving & Transfer",
    "SMS Communication",
    "Email Communication",
    "Fraud Prevention"
  ];

  const filteredData = apiData.filter(api => {
    const matchesDomain = selectedDomain === "All Domains" || api.domain === selectedDomain;
    const matchesApplication = selectedApplication === "All Applications" || api.application === selectedApplication;
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.endpoint.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesApplication && matchesSearch;
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
    <div className="fixed top-32 left-0 right-0 bottom-0 bg-black text-white overflow-auto">
      <div className="bg-black space-y-0">
        <Card className="bg-black border-gray-700 m-0 rounded-none">
          <CardHeader className="p-6">
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>APIs</span>
              {(initialDomainFilter || initialApplicationFilter) && (
                <div className="flex space-x-2">
                  {initialDomainFilter && (
                    <Badge className="bg-yellow-500 text-black ml-2">
                      Domain: {initialDomainFilter}
                    </Badge>
                  )}
                  {initialApplicationFilter && (
                    <Badge className="bg-purple-500 text-white ml-2">
                      App: {initialApplicationFilter}
                    </Badge>
                  )}
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {/* Filters and Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">Domain:</span>
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
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">Application:</span>
                <Select value={selectedApplication} onValueChange={setSelectedApplication}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    {applications.map((application) => (
                      <SelectItem key={application} value={application} className="text-white hover:bg-gray-700">
                        {application}
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={handleColumns}
                >
                  <Columns className="h-4 w-4 mr-2" />
                  COLUMNS
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={handleFilters}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  FILTERS
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={handleExport}
                >
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
                    <TableHead className="text-gray-300 font-medium">Application</TableHead>
                    <TableHead className="text-gray-300 font-medium">Domain</TableHead>
                    <TableHead className="text-gray-300 font-medium">Type</TableHead>
                    <TableHead className="text-gray-300 font-medium">Method</TableHead>
                    <TableHead className="text-gray-300 font-medium">Endpoint</TableHead>
                    <TableHead className="text-gray-300 font-medium">Status</TableHead>
                    <TableHead className="text-gray-300 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((api, index) => (
                    <TableRow key={index} className="border-gray-700 hover:bg-gray-900">
                      <TableCell className="font-medium text-white">{api.name}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs truncate">{api.description}</TableCell>
                      <TableCell className="text-gray-300">{api.application}</TableCell>
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
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white hover:bg-gray-700"
                          onClick={() => handleViewDetails(api)}
                        >
                          View
                        </Button>
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

      <ApiDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        api={selectedApi}
      />
    </div>
  );
};
