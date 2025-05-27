import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Package, GitBranch, Clock } from "lucide-react";
import { useState } from "react";
import { ManualReleaseCreationModal } from "./ManualReleaseCreationModal";

export const ReleaseEvents = () => {
  const [showAddRelease, setShowAddRelease] = useState(false);

  const releases = [
    {
      id: 1,
      name: "v2.4.1",
      type: "hotfix",
      status: "deployed",
      environment: "production",
      date: "2024-01-15",
      time: "14:30",
      services: ["Back of House", "Front of House", "API Gateway"],
      deployedBy: "John Doe",
      branch: "hotfix/critical-fix",
      description: "Critical security patch for authentication service"
    },
    {
      id: 2,
      name: "v2.4.0",
      type: "feature",
      status: "scheduled",
      environment: "production",
      date: "2024-01-16",
      time: "02:00",
      services: ["Customer Portal", "Payment API", "Notification Service"],
      deployedBy: "Jane Smith",
      branch: "release/v2.4.0",
      description: "New customer dashboard and enhanced payment processing"
    },
    {
      id: 3,
      name: "v2.3.5",
      type: "maintenance",
      status: "in-progress",
      environment: "staging",
      date: "2024-01-15",
      time: "16:00",
      services: ["Database", "Cache Layer"],
      deployedBy: "DevOps Team",
      branch: "maintenance/db-optimization",
      description: "Database performance optimizations and cache improvements"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-purple-100 text-purple-800";
      case "hotfix":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Release Events Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Release Events</span>
            </CardTitle>
            <Button size="sm" onClick={() => setShowAddRelease(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Release
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Release Timeline */}
      <div className="space-y-4">
        {releases.map((release) => (
          <Card key={release.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <GitBranch className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-semibold text-lg">{release.name}</h3>
                    <p className="text-sm text-gray-600">{release.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getTypeColor(release.type)}>
                    {release.type}
                  </Badge>
                  <Badge className={getStatusColor(release.status)}>
                    {release.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Environment</p>
                  <p className="text-sm">{release.environment}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date & Time</p>
                  <p className="text-sm">{release.date} at {release.time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Deployed By</p>
                  <p className="text-sm">{release.deployedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Branch</p>
                  <p className="text-sm font-mono text-xs">{release.branch}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Affected Services</p>
                <div className="flex flex-wrap gap-2">
                  {release.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {release.status === "scheduled" && (
                  <Button variant="outline" size="sm">
                    Modify Schedule
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Manual Release Creation Modal */}
      <ManualReleaseCreationModal 
        open={showAddRelease} 
        onOpenChange={setShowAddRelease} 
      />
    </div>
  );
};
