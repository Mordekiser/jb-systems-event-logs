
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useState } from "react";
import { TimelineHistoryModal } from "./TimelineHistoryModal";

interface HistoryButtonProps {
  entityType: "alert" | "event" | "azure" | "incident" | "release";
  entityId: string;
  entityTitle: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const HistoryButton = ({ 
  entityType, 
  entityId, 
  entityTitle, 
  variant = "outline", 
  size = "sm" 
}: HistoryButtonProps) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setShowHistory(true)}
      >
        <History className="h-4 w-4 mr-2" />
        History
      </Button>

      <TimelineHistoryModal
        open={showHistory}
        onOpenChange={setShowHistory}
        entityType={entityType}
        entityId={entityId}
        entityTitle={entityTitle}
      />
    </>
  );
};
