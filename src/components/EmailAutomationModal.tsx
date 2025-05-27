
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailAutomationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: any;
  onEmailSent: (eventId: string) => void;
}

export const EmailAutomationModal = ({ open, onOpenChange, event, onEmailSent }: EmailAutomationModalProps) => {
  const { toast } = useToast();
  const [emailData, setEmailData] = useState({
    recipients: "",
    subject: `Software Update Notification - ${event?.title || ""}`,
    application: event?.systemsAffected?.[0] || "",
    when: event?.fromTimestamp ? new Date(event.fromTimestamp).toLocaleString() : "",
    impact: event?.impact || "None",
    whatsNew: "",
    contact: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setEmailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendEmail = async () => {
    if (!emailData.recipients || !emailData.whatsNew) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate email sending process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark email as sent for this event
      onEmailSent(event.id);
      
      toast({
        title: "Email Sent Successfully",
        description: `Software update notification has been sent to ${emailData.recipients}`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email notification",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Software Update Notification</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Header */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-center mb-4">Software Update Notification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Application */}
              <div>
                <Label htmlFor="application">Application *</Label>
                <Input
                  id="application"
                  value={emailData.application}
                  onChange={(e) => handleInputChange("application", e.target.value)}
                  placeholder="Enter application name"
                />
              </div>

              {/* When */}
              <div>
                <Label htmlFor="when">When *</Label>
                <Input
                  id="when"
                  value={emailData.when}
                  onChange={(e) => handleInputChange("when", e.target.value)}
                  placeholder="Enter date and time"
                />
              </div>

              {/* Impact */}
              <div>
                <Label htmlFor="impact">Impact</Label>
                <Input
                  id="impact"
                  value={emailData.impact}
                  onChange={(e) => handleInputChange("impact", e.target.value)}
                  placeholder="None, Minor, Major"
                />
              </div>

              {/* Contact */}
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  value={emailData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  placeholder="Contact email"
                />
              </div>
            </div>

            {/* What's New */}
            <div className="mt-4">
              <Label htmlFor="whatsNew">What's New? *</Label>
              <Textarea
                id="whatsNew"
                value={emailData.whatsNew}
                onChange={(e) => handleInputChange("whatsNew", e.target.value)}
                placeholder="• Consolidate code that calls algolia for products info into AlgoliaProductSearchService&#10;• Customer Order Generation changes for Contract App&#10;• Support Gift Card Type toggle"
                rows={8}
                className="mt-1"
              />
            </div>
          </div>

          {/* Email Configuration */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipients">Recipients *</Label>
              <Input
                id="recipients"
                value={emailData.recipients}
                onChange={(e) => handleInputChange("recipients", e.target.value)}
                placeholder="Enter email addresses separated by commas"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={emailData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Email subject"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Sending..." : "Send Email"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
