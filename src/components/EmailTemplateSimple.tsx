
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Clock, User, MapPin, Building, Server } from "lucide-react";

interface EmailTemplateSimpleProps {
  event: any;
}

export const EmailTemplateSimple = ({ event }: EmailTemplateSimpleProps) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "#10b981";
      case "Resolved": return "#10b981";
      case "In Progress": return "#3b82f6";
      case "Under Investigation": return "#ef4444";
      case "Scheduled": return "#8b5cf6";
      default: return "#6b7280";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Major": return { bg: "#fef2f2", border: "#ef4444", text: "#dc2626" };
      case "Minor": return { bg: "#fefce8", border: "#eab308", text: "#ca8a04" };
      default: return { bg: "#f0fdf4", border: "#22c55e", text: "#16a34a" };
    }
  };

  const impactColors = getImpactColor(event.impact);

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JB HI-FI ${event.eventType} Notification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            background-color: #f8fafc;
            color: #1e293b;
            padding: 20px;
        }
        .email-container {
            max-width: 680px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        }
        .header {
            padding: 24px;
            text-align: center;
            border-bottom: 1px solid #e2e8f0;
        }
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
        }
        .event-type {
            background: ${event.eventType === 'Incident' ? '#ef4444' : '#8b5cf6'};
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
        }
        .content {
            padding: 24px;
        }
        .event-header {
            background: ${impactColors.bg};
            border: 1px solid ${impactColors.border};
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .event-title {
            color: ${impactColors.text};
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .event-status {
            background: ${getStatusColor(event.status)};
            color: white;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .info-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 16px;
        }
        .info-label {
            color: #64748b;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 4px;
        }
        .info-value {
            color: #1e293b;
            font-size: 14px;
            font-weight: 600;
        }
        .description-section {
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 16px;
            margin-bottom: 24px;
        }
        .description-title {
            color: #1e293b;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .description-text {
            color: #475569;
            font-size: 14px;
            line-height: 1.6;
        }
        .systems-section {
            margin-bottom: 24px;
        }
        .section-title {
            color: #1e293b;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        .system-tag {
            background: #e2e8f0;
            color: #475569;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            margin: 4px 8px 4px 0;
            display: inline-block;
        }
        .timeline-section {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-bottom: 24px;
        }
        .timeline-header {
            padding: 16px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }
        .timeline-item {
            padding: 16px;
            border-bottom: 1px solid #f1f5f9;
            position: relative;
        }
        .timeline-item:last-child {
            border-bottom: none;
        }
        .timeline-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #e2e8f0;
        }
        .timeline-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .timeline-status {
            background: ${getStatusColor(event.status)};
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
        }
        .timeline-date {
            color: #64748b;
            font-size: 12px;
        }
        .timeline-description {
            color: #475569;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .timeline-author {
            color: #64748b;
            font-size: 12px;
        }
        .contact-section {
            background: #f8fafc;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
        }
        .contact-title {
            color: #1e293b;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .contact-info {
            color: #475569;
            font-size: 14px;
        }
        .footer {
            text-align: center;
            padding: 16px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 12px;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
            }
            .content {
                padding: 16px;
            }
            .info-grid {
                grid-template-columns: 1fr;
            }
            .timeline-meta {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1 class="logo">JB HI-FI</h1>
            <div class="event-type">${event.eventType.toUpperCase()} NOTIFICATION</div>
        </div>

        <div class="content">
            <div class="event-header">
                <h2 class="event-title">${event.title}</h2>
                <div class="event-status">${event.status}</div>
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Event Type</div>
                    <div class="info-value">${event.eventType}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Impact Level</div>
                    <div class="info-value">${event.impact}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Started</div>
                    <div class="info-value">${formatDate(event.fromTimestamp)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Application</div>
                    <div class="info-value">${event.application || 'Multiple Systems'}</div>
                </div>
            </div>

            ${event.description ? `
            <div class="description-section">
                <h3 class="description-title">Event Details</h3>
                <p class="description-text">${event.description}</p>
            </div>
            ` : ''}

            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-section">
                <h3 class="section-title">Affected Systems</h3>
                <div>
                    ${event.systemsAffected.map((system: string) => `
                        <span class="system-tag">${system}</span>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <div class="contact-section">
                <h3 class="contact-title">Event Reporter</h3>
                <div class="contact-info">
                    ${event.createdBy} • ${event.createdBySource}
                </div>
            </div>

            ${event.statusHistory?.length > 0 ? `
            <div class="timeline-section">
                <div class="timeline-header">
                    Event Timeline (${event.statusHistory.length} updates)
                </div>
                ${event.statusHistory.slice().reverse().map((history: any) => `
                    <div class="timeline-item">
                        <div class="timeline-meta">
                            <div class="timeline-status">${history.status}</div>
                            <div class="timeline-date">${formatDate(history.createdTimestamp)}</div>
                        </div>
                        <div class="timeline-description">${history.description}</div>
                        <div class="timeline-author">
                            Updated by ${history.createdBy} via ${history.createdBySource}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>

        <div class="footer">
            <p><strong>JB HI-FI System Dashboard</strong></p>
            <p>For real-time updates and support, visit our system dashboard</p>
        </div>
    </div>
</body>
</html>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
  );
};
