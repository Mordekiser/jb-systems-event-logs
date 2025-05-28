
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Clock, User, MapPin, AlertCircle, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ThemedEmailTemplateProps {
  event: any;
}

export const ThemedEmailTemplate = ({ event }: ThemedEmailTemplateProps) => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  if (!event) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getImpactColorClasses = (impact: string) => {
    switch (impact) {
      case "Major": return "border-destructive bg-destructive/10 text-destructive";
      case "Minor": return "border-yellow-500 bg-yellow-50 text-yellow-700";
      default: return "border-green-500 bg-green-50 text-green-700";
    }
  };

  const getStatusColorClasses = (status: string) => {
    switch (status) {
      case "Complete": 
      case "Resolved": return "bg-green-600";
      case "In Progress": return "bg-blue-600";
      case "Under Investigation": return "bg-destructive";
      case "Scheduled": return "bg-purple-600";
      default: return "bg-muted";
    }
  };

  const handleViewDetails = () => {
    window.open(`${window.location.origin}/?event=${event.id}`, '_blank');
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`${event.eventType}: ${event.title}`);
    const body = encodeURIComponent(`Regarding ${event.eventType} ${event.id}: ${event.title}\n\nDescription: ${event.description}\n\nStatus: ${event.status}`);
    window.open(`mailto:support@jbhifi.com.au?subject=${subject}&body=${body}`);
  };

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JB HI-FI ${event.eventType} Alert</title>
    <style>
        :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --primary: 222.2 47.4% 11.2%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96.1%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --muted: 210 40% 96.1%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --accent: 210 40% 96.1%;
            --accent-foreground: 222.2 47.4% 11.2%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 210 40% 98%;
            --border: 214.3 31.8% 91.4%;
            --radius: 0.5rem;
            --yellow-500: 45 93% 47%;
            --yellow-50: 54 91% 95%;
            --yellow-700: 36 77% 49%;
            --green-500: 142 69% 58%;
            --green-50: 138 76% 97%;
            --green-700: 145 63% 42%;
            --green-600: 142 71% 45%;
            --blue-600: 221 83% 53%;
            --purple-600: 262 83% 58%;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --background: 222.2 84% 4.9%;
                --foreground: 210 40% 98%;
                --card: 222.2 84% 4.9%;
                --card-foreground: 210 40% 98%;
                --primary: 210 40% 98%;
                --primary-foreground: 222.2 47.4% 11.2%;
                --secondary: 217.2 32.6% 17.5%;
                --secondary-foreground: 210 40% 98%;
                --muted: 217.2 32.6% 17.5%;
                --muted-foreground: 215 20.2% 65.1%;
                --accent: 217.2 32.6% 17.5%;
                --accent-foreground: 210 40% 98%;
                --destructive: 0 62.8% 30.6%;
                --destructive-foreground: 210 40% 98%;
                --border: 217.2 32.6% 17.5%;
            }
        }

        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            background-color: hsl(var(--card));
            border-radius: calc(var(--radius) * 2);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #facc15 0%, #eab308 100%);
            padding: 32px 24px;
            text-align: center;
            border-bottom: 1px solid hsl(var(--border));
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            color: #000000;
            margin: 0 0 16px 0;
            letter-spacing: -0.025em;
        }
        .alert-badge {
            background-color: ${event.eventType === "Incident" ? "hsl(var(--destructive))" : "hsl(var(--purple-600))"};
            color: hsl(var(--destructive-foreground));
            padding: 8px 16px;
            border-radius: var(--radius);
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 8px;
        }
        .header-title {
            font-size: 18px;
            font-weight: 600;
            color: #000000;
            margin: 0;
        }
        .content {
            padding: 24px;
        }
        .priority-card {
            border: 1px solid ${event.impact === "Major" ? "hsl(var(--destructive))" : event.impact === "Minor" ? "hsl(var(--yellow-500))" : "hsl(var(--green-500))"};
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
            background-color: ${event.impact === "Major" ? "hsl(var(--destructive) / 0.1)" : event.impact === "Minor" ? "hsl(var(--yellow-50))" : "hsl(var(--green-50))"};
        }
        .priority-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        .priority-title {
            font-size: 18px;
            font-weight: 600;
            color: ${event.impact === "Major" ? "hsl(var(--destructive))" : event.impact === "Minor" ? "hsl(var(--yellow-700))" : "hsl(var(--green-700))"};
            margin: 0;
        }
        .status-badge {
            background-color: ${getStatusColorClasses(event.status).includes('bg-green-600') ? 'hsl(var(--green-600))' : 
                              getStatusColorClasses(event.status).includes('bg-blue-600') ? 'hsl(var(--blue-600))' :
                              getStatusColorClasses(event.status).includes('bg-destructive') ? 'hsl(var(--destructive))' :
                              getStatusColorClasses(event.status).includes('bg-purple-600') ? 'hsl(var(--purple-600))' : 'hsl(var(--muted))'};
            color: white;
            padding: 4px 12px;
            border-radius: calc(var(--radius) * 0.5);
            font-size: 12px;
            font-weight: 600;
        }
        .incident-title {
            font-size: 16px;
            color: hsl(var(--card-foreground));
            margin: 0;
            font-weight: 500;
        }
        .details-grid {
            background-color: hsl(var(--muted));
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
            border: 1px solid hsl(var(--border));
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid hsl(var(--border));
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 500;
            color: hsl(var(--muted-foreground));
            font-size: 14px;
        }
        .detail-value {
            color: hsl(var(--card-foreground));
            font-weight: 500;
            font-size: 14px;
            text-align: right;
        }
        .description-card {
            background-color: hsl(var(--accent));
            border-left: 4px solid hsl(var(--primary));
            border-radius: 0 var(--radius) var(--radius) 0;
            padding: 20px;
            margin-bottom: 24px;
        }
        .description-title {
            font-size: 16px;
            font-weight: 600;
            color: hsl(var(--card-foreground));
            margin: 0 0 8px 0;
        }
        .description-text {
            color: hsl(var(--muted-foreground));
            margin: 0;
            line-height: 1.6;
            font-size: 14px;
        }
        .systems-card {
            background-color: hsl(var(--accent));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
        }
        .systems-title {
            font-size: 16px;
            font-weight: 600;
            color: hsl(var(--card-foreground));
            margin: 0 0 12px 0;
        }
        .system-tag {
            background-color: hsl(var(--secondary));
            border: 1px solid hsl(var(--border));
            color: hsl(var(--secondary-foreground));
            padding: 6px 12px;
            border-radius: calc(var(--radius) * 0.5);
            font-size: 12px;
            font-weight: 500;
            margin: 4px 6px 4px 0;
            display: inline-block;
        }
        .contact-card {
            background-color: hsl(var(--muted));
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
            border: 1px solid hsl(var(--border));
        }
        .contact-title {
            font-size: 16px;
            font-weight: 600;
            color: hsl(var(--card-foreground));
            margin: 0 0 12px 0;
        }
        .contact-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .contact-name {
            font-weight: 500;
            color: hsl(var(--card-foreground));
            font-size: 14px;
        }
        .contact-source {
            color: hsl(var(--muted-foreground));
            font-size: 12px;
            background-color: hsl(var(--secondary));
            padding: 4px 8px;
            border-radius: calc(var(--radius) * 0.5);
        }
        .action-section {
            text-align: center;
            margin-bottom: 24px;
        }
        .action-button {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 12px 24px;
            border-radius: var(--radius);
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            margin: 0 8px 8px 0;
            cursor: pointer;
            border: none;
            transition: background-color 0.2s;
        }
        .action-button:hover {
            background-color: hsl(var(--primary) / 0.9);
        }
        .action-button.secondary {
            background-color: hsl(var(--secondary));
            color: hsl(var(--secondary-foreground));
        }
        .action-button.secondary:hover {
            background-color: hsl(var(--secondary) / 0.8);
        }
        .history-section {
            background-color: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            margin-bottom: 24px;
            overflow: hidden;
        }
        .history-header {
            padding: 16px 20px;
            background-color: hsl(var(--muted));
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid hsl(var(--border));
            transition: background-color 0.2s;
        }
        .history-header:hover {
            background-color: hsl(var(--muted) / 0.8);
        }
        .history-title {
            font-size: 16px;
            font-weight: 600;
            color: hsl(var(--card-foreground));
            margin: 0;
        }
        .toggle-icon {
            font-size: 14px;
            color: hsl(var(--muted-foreground));
            transition: transform 0.2s;
        }
        .history-content {
            max-height: 600px;
            overflow-y: auto;
        }
        .history-item {
            padding: 20px;
            border-bottom: 1px solid hsl(var(--border));
            position: relative;
        }
        .history-item:last-child {
            border-bottom: none;
        }
        .history-item:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background-color: hsl(var(--border));
        }
        .history-item.critical:before {
            background-color: hsl(var(--destructive));
        }
        .history-item.high:before {
            background-color: hsl(var(--yellow-500));
        }
        .history-item.medium:before {
            background-color: hsl(var(--green-500));
        }
        .history-meta {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
            flex-wrap: wrap;
            gap: 8px;
        }
        .history-badges {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        .history-badge {
            padding: 4px 8px;
            border-radius: calc(var(--radius) * 0.5);
            font-size: 11px;
            font-weight: 500;
            color: white;
        }
        .severity-badge {
            padding: 4px 8px;
            border-radius: calc(var(--radius) * 0.5);
            font-size: 11px;
            font-weight: 500;
            border: 1px solid;
            background-color: hsl(var(--card));
        }
        .history-date {
            font-size: 12px;
            color: hsl(var(--muted-foreground));
            white-space: nowrap;
        }
        .history-title-text {
            font-size: 16px;
            font-weight: 600;
            color: hsl(var(--card-foreground));
            margin: 0 0 8px 0;
        }
        .history-description {
            color: hsl(var(--muted-foreground));
            margin: 0 0 12px 0;
            line-height: 1.5;
            font-size: 14px;
        }
        .history-details {
            background-color: hsl(var(--muted));
            border-radius: var(--radius);
            padding: 12px;
            margin-bottom: 12px;
        }
        .history-details-title {
            font-size: 13px;
            font-weight: 600;
            color: hsl(var(--card-foreground));
            margin: 0 0 6px 0;
        }
        .history-details-text {
            font-size: 13px;
            color: hsl(var(--muted-foreground));
            margin: 0;
            line-height: 1.4;
        }
        .history-metadata {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
            margin-bottom: 12px;
        }
        .metadata-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
        }
        .metadata-label {
            color: hsl(var(--muted-foreground));
            font-weight: 500;
        }
        .metadata-value {
            color: hsl(var(--card-foreground));
            font-weight: 600;
        }
        .history-author {
            font-size: 12px;
            color: hsl(var(--muted-foreground));
            border-top: 1px solid hsl(var(--border));
            padding-top: 8px;
        }
        .footer {
            text-align: center;
            color: hsl(var(--muted-foreground));
            font-size: 12px;
            padding: 20px;
            background-color: hsl(var(--muted));
            border-top: 1px solid hsl(var(--border));
        }
        .footer-title {
            font-weight: 600;
            color: hsl(var(--card-foreground));
            margin-bottom: 4px;
        }
        @media only screen and (max-width: 600px) {
            .container { margin: 0 10px; }
            .content { padding: 16px; }
            .detail-row { flex-direction: column; align-items: flex-start; }
            .detail-value { text-align: left; margin-top: 4px; }
            .contact-info { flex-direction: column; align-items: flex-start; }
            .contact-source { margin-top: 8px; }
            .priority-header { flex-direction: column; align-items: flex-start; }
            .status-badge { margin-top: 8px; }
            .action-button { display: block; margin: 8px 0; }
            .history-meta { flex-direction: column; align-items: flex-start; }
            .history-metadata { grid-template-columns: 1fr; }
        }
    </style>
    <script>
        function toggleHistory() {
            const content = document.getElementById('historyContent');
            const icon = document.getElementById('toggleIcon');
            const isHidden = content.style.display === 'none';
            
            content.style.display = isHidden ? 'block' : 'none';
            icon.textContent = isHidden ? '−' : '+';
            icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }

        function viewEventDetails() {
            window.open('${window.location.origin}/?event={{this.id}}', '_blank');
        }

        function contactSupport() {
            const subject = encodeURIComponent('{{this.eventType}}: {{this.title}}');
            const body = encodeURIComponent('Regarding {{this.eventType}} {{this.id}}: {{this.title}}\\n\\nDescription: {{this.description}}\\n\\nStatus: {{this.status}}');
            window.open('mailto:support@jbhifi.com.au?subject=' + subject + '&body=' + body);
        }
    </script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1 class="logo">JB HI-FI</h1>
            <div class="alert-badge">{{#if (eq this.eventType "Incident")}}⚠️ INCIDENT ALERT{{else}}✨ RELEASE UPDATE{{/if}}</div>
            <h2 class="header-title">{{#if (eq this.eventType "Incident")}}System Incident Notification{{else}}Release Deployment{{/if}}</h2>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Priority Card -->
            <div class="priority-card">
                <div class="priority-header">
                    <h3 class="priority-title">{{this.impact}} Impact {{this.eventType}}</h3>
                    <div class="status-badge">{{this.status}}</div>
                </div>
                <p class="incident-title">{{this.title}}</p>
            </div>

            <!-- Details Grid -->
            <div class="details-grid">
                <div class="detail-row">
                    <div class="detail-label">{{this.eventType}} ID</div>
                    <div class="detail-value">{{this.id}}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Event Type</div>
                    <div class="detail-value">{{this.eventType}}</div>
                </div>
                {{#if this.application}}
                <div class="detail-row">
                    <div class="detail-label">Application</div>
                    <div class="detail-value">{{this.application}}</div>
                </div>
                {{/if}}
                {{#if this.domainsAffected}}
                <div class="detail-row">
                    <div class="detail-label">Domain</div>
                    <div class="detail-value">{{#each this.domainsAffected}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}</div>
                </div>
                {{/if}}
                {{#if this.tenancy}}
                <div class="detail-row">
                    <div class="detail-label">Environment</div>
                    <div class="detail-value">{{this.tenancy}}</div>
                </div>
                {{/if}}
                <div class="detail-row">
                    <div class="detail-label">Started</div>
                    <div class="detail-value">{{formatDate this.fromTimestamp}}</div>
                </div>
                {{#if this.toTimestamp}}
                <div class="detail-row">
                    <div class="detail-label">Expected {{#if (eq this.eventType "Incident")}}Resolution{{else}}Completion{{/if}}</div>
                    <div class="detail-value">{{formatDate this.toTimestamp}}</div>
                </div>
                {{/if}}
            </div>

            <!-- Description -->
            {{#if this.description}}
            <div class="description-card">
                <h3 class="description-title">{{this.eventType}} Details</h3>
                <p class="description-text">{{this.description}}</p>
            </div>
            {{/if}}

            <!-- Systems Affected -->
            {{#if this.systemsAffected}}
            <div class="systems-card">
                <h3 class="systems-title">{{#if (eq this.eventType "Incident")}}Affected Systems{{else}}Systems Being Updated{{/if}}</h3>
                <div>
                    {{#each this.systemsAffected}}<span class="system-tag">{{this}}</span>{{/each}}
                </div>
            </div>
            {{/if}}

            <!-- Contact Information -->
            <div class="contact-card">
                <h3 class="contact-title">{{#if (eq this.eventType "Incident")}}Incident Reporter{{else}}Deployment Lead{{/if}}</h3>
                <div class="contact-info">
                    <span class="contact-name">{{this.createdBy}}</span>
                    <span class="contact-source">{{#if (eq this.createdBySource "Manual")}}{{#if (eq this.eventType "Incident")}}Manually Reported{{else}}DevOps Team{{/if}}{{else}}Auto-Detected{{/if}}</span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-section">
                <button onclick="viewEventDetails()" class="action-button">View Full Details</button>
                <button onclick="contactSupport()" class="action-button secondary">Contact Support</button>
            </div>

            <!-- Detailed Timeline -->
            {{#if this.history}}
            {{#if (gt this.history.length 1)}}
            <div class="history-section">
                <div class="history-header" onclick="toggleHistory()">
                    <h3 class="history-title">Detailed {{this.eventType}} Timeline ({{this.history.length}} updates)</h3>
                    <span class="toggle-icon" id="toggleIcon">+</span>
                </div>
                <div id="historyContent" class="history-content" style="display: none;">
                    {{#each this.history}}
                    <div class="history-item medium">
                        <div class="history-meta">
                            <div class="history-badges">
                                <span class="history-badge" style="background-color: {{getStatusColor this.status}};">{{this.status}}</span>
                                {{#if this.historyType}}<span class="history-badge" style="background-color: hsl(var(--muted-foreground));">{{this.historyType}}</span>{{/if}}
                                <span class="severity-badge" style="color: hsl(var(--green-500)); border-color: hsl(var(--green-500));">
                                    Priority Medium
                                </span>
                            </div>
                            <div class="history-date">{{formatDate this.createdTimestamp}}</div>
                        </div>
                        
                        <h4 class="history-title-text">{{this.status}} Update #{{add @index 1}}</h4>
                        <p class="history-description">{{this.description}}</p>
                        
                        <div class="history-details">
                            <div class="history-details-title">Technical Details</div>
                            <div class="history-details-text">
                                {{#if (eq @index 0)}}Resolution confirmed through comprehensive system validation. All monitoring metrics have returned to normal baselines with no residual impact detected.{{else}}{{#if (eq @index 1)}}Root cause analysis completed. Implementation of permanent fix in progress with rollback procedures prepared.{{else}}Initial triage completed. Engineering team has been notified and investigation procedures initiated.{{/if}}{{/if}}
                            </div>
                        </div>
                        
                        <div class="history-metadata">
                            <div class="metadata-item">
                                <span class="metadata-label">Reporter:</span>
                                <span class="metadata-value">{{this.createdBy}}</span>
                            </div>
                            <div class="metadata-item">
                                <span class="metadata-label">Domain:</span>
                                <span class="metadata-value">{{../domainsAffected.[0]}}</span>
                            </div>
                            <div class="metadata-item">
                                <span class="metadata-label">Environment:</span>
                                <span class="metadata-value">{{../tenancy}}</span>
                            </div>
                            <div class="metadata-item">
                                <span class="metadata-label">Impact:</span>
                                <span class="metadata-value">{{../impact}}</span>
                            </div>
                        </div>
                        
                        <div class="history-author">
                            Updated by {{this.createdBy}} via {{this.createdBySource}}
                            {{#if (eq @index 0)}} • {{../eventType}} fully resolved and monitoring confirmed{{else}}{{#if (eq @index 1)}} • Root cause identified and mitigation in progress{{else}} • Investigation initiated and team notified{{/if}}{{/if}}
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>
            {{/if}}
            {{/if}}

            <!-- Footer -->
            <div class="footer">
                <div class="footer-title">JB HI-FI System Dashboard</div>
                <p>For system status updates visit the dashboard or contact IT support</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Themed Email Template</h3>
        <div className="flex gap-2">
          <Button onClick={handleViewDetails} size="sm">
            View Details
          </Button>
          <Button onClick={handleContactSupport} variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </div>
      <div 
        className="border rounded-lg overflow-hidden bg-background"
        dangerouslySetInnerHTML={{ __html: emailHtml }} 
      />
    </div>
  );
};
