
import React from "react";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

export const StatusLegend = () => {
  const statusItems = [
    { icon: <CheckCircle className="w-4 h-4" />, label: "Healthy", color: "text-green-600" },
    { icon: <AlertTriangle className="w-4 h-4" />, label: "Degraded", color: "text-orange-600" },
    { icon: <XCircle className="w-4 h-4" />, label: "Unhealthy", color: "text-red-600" },
    { icon: <Info className="w-4 h-4" />, label: "Advisory", color: "text-blue-600" }
  ];

  return (
    <div className="flex items-center justify-center space-x-8 py-4 px-6 bg-gray-50 border rounded-lg">
      {statusItems.map((item, index) => (
        <div key={index} className={`flex items-center space-x-2 ${item.color}`}>
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
