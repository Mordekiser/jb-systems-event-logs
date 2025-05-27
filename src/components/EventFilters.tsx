
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";

interface EventFiltersProps {
  onFiltersChange: (filters: EventFilters) => void;
  currentFilters: EventFilters;
}

export interface EventFilters {
  createdBy?: string;
  createdFromDate?: string;
  createdToDate?: string;
  updatedBy?: string;
  updatedFromDate?: string;
  updatedToDate?: string;
  eventCreationType?: "Manual" | "Azure Alert";
  historyType?: "Initial" | "Update" | "Complete";
}

export const EventFilters = ({ onFiltersChange, currentFilters }: EventFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof EventFilters, value: string | undefined) => {
    const newFilters = {
      ...currentFilters,
      [key]: value === "all" ? undefined : value || undefined
    };
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(currentFilters).some(value => value !== undefined && value !== "");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Event Filters</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Created By */}
            <div>
              <Label htmlFor="createdBy">Created By</Label>
              <Input
                id="createdBy"
                placeholder="Enter creator name"
                value={currentFilters.createdBy || ""}
                onChange={(e) => handleFilterChange("createdBy", e.target.value)}
              />
            </div>

            {/* Updated By */}
            <div>
              <Label htmlFor="updatedBy">Updated By</Label>
              <Input
                id="updatedBy"
                placeholder="Enter updater name"
                value={currentFilters.updatedBy || ""}
                onChange={(e) => handleFilterChange("updatedBy", e.target.value)}
              />
            </div>

            {/* Event Creation Type */}
            <div>
              <Label htmlFor="eventCreationType">Event Creation Type</Label>
              <Select
                value={currentFilters.eventCreationType || "all"}
                onValueChange={(value) => handleFilterChange("eventCreationType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select creation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Azure Alert">Azure Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* History Type */}
            <div>
              <Label htmlFor="historyType">History Type</Label>
              <Select
                value={currentFilters.historyType || "all"}
                onValueChange={(value) => handleFilterChange("historyType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select history type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Initial">Initial</SelectItem>
                  <SelectItem value="Update">Update</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Filters */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Created Date Range</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                <div>
                  <Label htmlFor="createdFromDate" className="text-xs text-gray-500">From</Label>
                  <Input
                    id="createdFromDate"
                    type="datetime-local"
                    value={currentFilters.createdFromDate || ""}
                    onChange={(e) => handleFilterChange("createdFromDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="createdToDate" className="text-xs text-gray-500">To</Label>
                  <Input
                    id="createdToDate"
                    type="datetime-local"
                    value={currentFilters.createdToDate || ""}
                    onChange={(e) => handleFilterChange("createdToDate", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Updated Date Range</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                <div>
                  <Label htmlFor="updatedFromDate" className="text-xs text-gray-500">From</Label>
                  <Input
                    id="updatedFromDate"
                    type="datetime-local"
                    value={currentFilters.updatedFromDate || ""}
                    onChange={(e) => handleFilterChange("updatedFromDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="updatedToDate" className="text-xs text-gray-500">To</Label>
                  <Input
                    id="updatedToDate"
                    type="datetime-local"
                    value={currentFilters.updatedToDate || ""}
                    onChange={(e) => handleFilterChange("updatedToDate", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
