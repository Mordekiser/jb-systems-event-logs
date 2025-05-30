import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, RefreshCw, Send, Eye, Sparkles, Palette, Globe } from "lucide-react";
import { useEvents } from "@/contexts/EventsContext";
import { EmailTemplateSimple } from "@/components/EmailTemplateSimple";
import { EmailTemplateIncidentModern } from "@/components/EmailTemplateIncidentModern";
import { EmailTemplateReleaseModern } from "@/components/EmailTemplateReleaseModern";
import { EmailTemplateVariants } from "@/components/EmailTemplateVariants";
import { BrowserExtensionDemo } from "@/components/BrowserExtensionDemo";
import { BrowserExtensionVariants } from "@/components/BrowserExtensionVariants";
import { useToast } from "@/hooks/use-toast";

export const EmailDemo = () => {
  const { events, updateEvent } = useEvents();
  const { toast } = useToast();
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("simple");
  const [selectedEmailVariant, setSelectedEmailVariant] = useState<string>("ocean");
  const [selectedExtensionVariant, setSelectedExtensionVariant] = useState<string>("ocean");

  // Filter events that have email notifications enabled
  const eventsWithEmail = events.filter(event => event.emailNotificationEnabled);
  const selectedEvent = eventsWithEmail.find(event => event.id === selectedEventId);

  const emailVariants = [
    { value: "ocean", label: "Ocean Blue", description: "Professional blue theme" },
    { value: "sunset", label: "Sunset Orange", description: "Warm orange gradient" },
    { value: "forest", label: "Forest Green", description: "Natural green theme" },
    { value: "galaxy", label: "Purple Galaxy", description: "Cosmic purple design" },
    { value: "crimson", label: "Crimson Red", description: "Bold red styling" },
    { value: "midnight", label: "Midnight Dark", description: "Dark theme variant" },
    { value: "honey", label: "Golden Honey", description: "Warm golden tones" },
    { value: "teal", label: "Teal Wave", description: "Fresh teal colors" },
    { value: "rose", label: "Rose Pink", description: "Elegant pink theme" },
    { value: "steel", label: "Steel Gray", description: "Modern gray design" },
    { value: "lime", label: "Lime Fresh", description: "Vibrant lime green" },
    { value: "coral", label: "Coral Reef", description: "Tropical coral theme" },
    { value: "electric", label: "Electric Blue", description: "Bright electric blue" },
    { value: "lavender", label: "Lavender Dreams", description: "Soft lavender theme" },
    { value: "emerald", label: "Emerald Shine", description: "Rich emerald green" },
    { value: "amber", label: "Amber Glow", description: "Warm amber colors" },
    { value: "indigo", label: "Indigo Night", description: "Deep indigo theme" },
    { value: "cyan", label: "Cyan Fresh", description: "Cool cyan design" },
    { value: "warm", label: "Warm Sunset", description: "Warm gradient theme" },
    { value: "mint", label: "Cool Mint", description: "Refreshing mint green" }
  ];

  const extensionVariants = [
    { value: "ocean", label: "Ocean Blue", description: "Professional blue theme" },
    { value: "sunset", label: "Sunset Orange", description: "Warm orange theme" },
    { value: "forest", label: "Forest Green", description: "Natural green design" },
    { value: "galaxy", label: "Purple Galaxy", description: "Cosmic purple theme" },
    { value: "crimson", label: "Crimson Red", description: "Bold red styling" },
    { value: "midnight", label: "Midnight Dark", description: "Dark mode theme" },
    { value: "golden", label: "Golden Theme", description: "Luxurious gold colors" },
    { value: "teal", label: "Teal Wave", description: "Fresh teal design" },
    { value: "rose", label: "Rose Pink", description: "Elegant pink theme" },
    { value: "steel", label: "Steel Gray", description: "Modern steel design" },
    { value: "lime", label: "Lime Fresh", description: "Vibrant lime theme" },
    { value: "coral", label: "Coral Theme", description: "Tropical coral design" },
    { value: "electric", label: "Electric Blue", description: "Bright electric theme" },
    { value: "lavender", label: "Lavender Theme", description: "Soft lavender design" },
    { value: "emerald", label: "Emerald Theme", description: "Rich emerald styling" },
    { value: "amber", label: "Amber Theme", description: "Warm amber design" },
    { value: "indigo", label: "Indigo Theme", description: "Deep indigo styling" },
    { value: "cyan", label: "Cyan Theme", description: "Cool cyan design" },
    { value: "warm", label: "Warm Theme", description: "Warm gradient styling" },
    { value: "mint", label: "Mint Theme", description: "Fresh mint design" }
  ];

  const handleSendEmail = () => {
    if (!selectedEvent) return;

    updateEvent(selectedEvent.id, {
      emailSent: true,
      updatedTimestamp: new Date().toISOString()
    });

    toast({
      title: "Email sent successfully",
      description: `${selectedEvent.eventType} notification has been sent for ${selectedEvent.title}`,
    });
  };

  const handleToggleEmailNotification = () => {
    if (!selectedEvent) return;

    const newEmailEnabled = !selectedEvent.emailNotificationEnabled;
    updateEvent(selectedEvent.id, {
      emailNotificationEnabled: newEmailEnabled,
      emailSent: newEmailEnabled ? false : undefined
    });

    toast({
      title: newEmailEnabled ? "Email notification enabled" : "Email notification disabled",
      description: `Email notifications have been ${newEmailEnabled ? "enabled" : "disabled"} for ${selectedEvent.title}`,
    });
  };

  const getTemplateComponent = () => {
    if (!selectedEvent) return null;

    switch (selectedTemplate) {
      case "simple":
        return <EmailTemplateSimple event={selectedEvent} />;
      case "incident":
        return <EmailTemplateIncidentModern event={selectedEvent} />;
      case "release":
        return <EmailTemplateReleaseModern event={selectedEvent} />;
      case "variants":
        return <EmailTemplateVariants event={selectedEvent} variant={selectedEmailVariant} />;
      default:
        return <EmailTemplateSimple event={selectedEvent} />;
    }
  };

  const getTemplateDescription = (template: string) => {
    switch (template) {
      case "simple":
        return "Clean event view format - minimal styling, maximum information";
      case "incident":
        return "Critical incident template with emergency styling and red theme";
      case "release":
        return "Celebration release template with purple theme and feature highlights";
      case "variants":
        return "20 unique design variants with different color schemes and layouts";
      default:
        return "";
    }
  };

  return (
    <Tabs defaultValue="email" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email" className="flex items-center space-x-2">
          <Mail className="h-4 w-4" />
          <span>Email Templates</span>
        </TabsTrigger>
        <TabsTrigger value="extension" className="flex items-center space-x-2">
          <Globe className="h-4 w-4" />
          <span>Browser Extension</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="email" className="space-y-6">
        {/* Enhanced Header */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Email Templates Demo
                </span>
                <div className="flex space-x-2 mt-1">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">20+ Design Variants</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700">Live Preview</Badge>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Template Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>Template Style</span>
                </label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Choose template style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium">Simple Event View</div>
                          <div className="text-xs text-gray-500">Clean, minimal design</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="incident">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div>
                          <div className="font-medium">Critical Incident</div>
                          <div className="text-xs text-gray-500">Emergency alert styling</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="release">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <div>
                          <div className="font-medium">Release Celebration</div>
                          <div className="text-xs text-gray-500">Feature launch styling</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="variants">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <div>
                          <div className="font-medium">Design Variants</div>
                          <div className="text-xs text-gray-500">20 unique styles</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600">{getTemplateDescription(selectedTemplate)}</p>
              </div>

              {selectedTemplate === "variants" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Design Variant</span>
                  </label>
                  <Select value={selectedEmailVariant} onValueChange={setSelectedEmailVariant}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Choose design variant" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {emailVariants.map((variant) => (
                        <SelectItem key={variant.value} value={variant.value}>
                          <div>
                            <div className="font-medium">{variant.label}</div>
                            <div className="text-xs text-gray-500">{variant.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Select Event</span>
                </label>
                <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Choose an event to preview" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventsWithEmail.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            event.eventType === "Incident" ? "bg-red-100 text-red-800" : "bg-purple-100 text-purple-800"
                          }>
                            {event.eventType}
                          </Badge>
                          <span className="truncate max-w-40">{event.title}</span>
                          <Badge variant="outline" className={
                            event.emailSent ? "text-green-600 border-green-200" : "text-orange-600 border-orange-200"
                          }>
                            {event.emailSent ? "Sent" : "Pending"}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <div className="text-sm text-gray-600 flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200">
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  <span>Live preview updates automatically</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {selectedEvent && (
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleSendEmail}
                  disabled={selectedEvent.emailSent}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {selectedEvent.emailSent ? "Email Sent" : "Send Email"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleEmailNotification}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {selectedEvent.emailNotificationEnabled ? "Disable" : "Enable"} Notifications
                </Button>
                <Button variant="secondary" className="bg-gray-100 hover:bg-gray-200">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview in New Tab
                </Button>
              </div>
            )}
            
            {eventsWithEmail.length === 0 && (
              <div className="text-center text-gray-500 mt-4 p-8 border-2 border-dashed border-gray-200 rounded-lg bg-white">
                <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No Email Events Found</h3>
                <p>Create an event with email notifications enabled to preview the templates.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Template Preview */}
        {selectedEvent && (
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold">Email Template Preview</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={
                        selectedEvent.eventType === "Incident" ? "bg-red-100 text-red-800" : "bg-purple-100 text-purple-800"
                      }>
                        {selectedEvent.eventType}
                      </Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">
                        {selectedTemplate === "variants" 
                          ? `${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} - ${selectedEmailVariant.charAt(0).toUpperCase() + selectedEmailVariant.slice(1)}` 
                          : selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={
                  selectedEvent.emailSent ? "text-green-600 border-green-200" : "text-orange-600 border-orange-200"
                }>
                  {selectedEvent.emailSent ? "✓ Email sent" : "⏳ Email pending"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                {getTemplateComponent()}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="extension" className="space-y-6">
        {/* Extension Header */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Browser Extension Variants
                </span>
                <div className="flex space-x-2 mt-1">
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">20+ Theme Variants</Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">Quick Status</Badge>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>Extension Theme</span>
                </label>
                <Select value={selectedExtensionVariant} onValueChange={setSelectedExtensionVariant}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Choose extension theme" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {extensionVariants.map((variant) => (
                      <SelectItem key={variant.value} value={variant.value}>
                        <div>
                          <div className="font-medium">{variant.label}</div>
                          <div className="text-xs text-gray-500">{variant.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <div className="text-sm text-gray-600 flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200">
                  <RefreshCw className="h-4 w-4 text-green-500" />
                  <span>Theme changes apply instantly</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <BrowserExtensionVariants variant={selectedExtensionVariant} />
      </TabsContent>
    </Tabs>
  );
};
