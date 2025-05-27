
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEvents } from "@/contexts/EventsContext";
import { useToast } from "@/hooks/use-toast";

interface EventDeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  eventId: string;
  eventTitle: string;
  eventType: string;
}

export const EventDeleteConfirmDialog = ({ 
  open, 
  onOpenChange, 
  onConfirm, 
  eventId, 
  eventTitle,
  eventType 
}: EventDeleteConfirmDialogProps) => {
  const { deleteEvent } = useEvents();
  const { toast } = useToast();

  const handleConfirm = () => {
    deleteEvent(eventId);
    toast({
      title: "Event deleted",
      description: `${eventType} "${eventTitle}" has been deleted successfully.`,
    });
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {eventType}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to permanently delete this {eventType.toLowerCase()} <strong>{eventId}</strong>?
            <br />
            <br />
            <strong>"{eventTitle}"</strong>
            <br />
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
