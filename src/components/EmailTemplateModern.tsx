
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Clock, User, MapPin, AlertCircle, Shield, Package, Zap, CheckCircle, Building, Server, Layers, ArrowRight } from "lucide-react";

interface EmailTemplateModernProps {
  event: any;
}

export const EmailTemplateModern = ({ event }: EmailTemplateModernProps) => {
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

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "Incident": return "🚨";
      case "Release": return "🚀";
      case "Maintenance": return "🔧";
      default: return "📋";
    }
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
      case "Major": return { bg: "#fef2f2", border: "#fecaca", text: "#7f1d1d" };
      case "Minor": return { bg: "#fefce8", border: "#fde047", text: "#713f12" };
      default: return { bg: "#f0fdf4", border: "#bbf7d0", text: "#14532d" };
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
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            color: #111827;
            min-height: 100vh;
            padding: 20px;
        }
        .email-container {
            max-width: 680px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .header {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
            padding: 32px 24px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        .logo {
            font-size: 32px;
            font-weight: 800;
            color: #000;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
        }
        .event-badge {
            background: rgba(255, 255, 255, 0.95);
            color: #1f2937;
            padding: 12px 20px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 32px 24px;
        }
        .event-card {
            background: linear-gradient(135deg, ${impactColors.bg} 0%, white 100%);
            border: 2px solid ${impactColors.border};
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
        }
        .event-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, ${impactColors.border} 0%, ${getStatusColor(event.status)} 100%);
        }
        .event-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 12px;
        }
        .event-title {
            color: ${impactColors.text};
            font-size: 20px;
            font-weight: 700;
            margin: 0;
            flex: 1;
        }
        .status-pill {
            background: ${getStatusColor(event.status)};
            color: white;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .event-description {
            color: #4b5563;
            font-size: 16px;
            line-height: 1.6;
            margin: 0;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }
        .info-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
        }
        .info-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }
        .info-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .info-label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .info-value {
            color: #111827;
            font-size: 16px;
            font-weight: 600;
            margin: 0;
        }
        .details-section {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            position: relative;
        }
        .details-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #1e40af);
            border-radius: 16px 16px 0 0;
        }
        .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #1e40af;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        .section-content {
            color: #475569;
            font-size: 15px;
            line-height: 1.7;
            margin: 0;
        }
        .systems-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
        }
        .system-tag {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border: 1px solid #93c5fd;
            color: #1e40af;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .contact-section {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 1px solid #f59e0b;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            text-align: center;
        }
        .contact-title {
            color: #92400e;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .contact-info {
            color: #92400e;
            font-size: 16px;
            font-weight: 600;
        }
        .actions-section {
            text-align: center;
            margin-bottom: 32px;
        }
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            text-decoration: none;
            margin: 8px;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
        }
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }
        .action-button.secondary {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            color: #374151;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .timeline-section {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 32px;
        }
        .timeline-header {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            padding: 20px 24px;
            font-size: 18px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .timeline-content {
            max-height: 400px;
            overflow-y: auto;
        }
        .timeline-item {
            padding: 24px;
            border-bottom: 1px solid #f3f4f6;
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
            width: 4px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        }
        .timeline-meta {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
            flex-wrap: wrap;
            gap: 8px;
        }
        .timeline-badges {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        .timeline-badge {
            background: linear-gradient(135deg, #3b82f6, #1e40af);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        .timeline-date {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
        }
        .timeline-title {
            color: #111827;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .timeline-description {
            color: #4b5563;
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 12px;
        }
        .timeline-author {
            color: #9ca3af;
            font-size: 12px;
            font-style: italic;
        }
        .footer {
            background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-logo {
            color: #374151;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .footer-text {
            color: #6b7280;
            font-size: 14px;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 12px;
            }
            .content {
                padding: 20px 16px;
            }
            .info-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            .event-header {
                flex-direction: column;
                align-items: flex-start;
            }
            .action-button {
                display: block;
                margin: 8px 0;
                width: 100%;
            }
            .timeline-meta {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1 class="logo">JB HI-FI</h1>
            <div class="event-badge">
                <span>${getEventIcon(event.eventType)}</span>
                ${event.eventType.toUpperCase()} NOTIFICATION
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Event Card -->
            <div class="event-card">
                <div class="event-header">
                    <h2 class="event-title">${event.title}</h2>
                    <div class="status-pill">${event.status}</div>
                </div>
                <p class="event-description">${event.description}</p>
            </div>

            <!-- Info Grid -->
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-label">
                        <span>📅</span>
                        Event Type
                    </div>
                    <p class="info-value">${event.eventType}</p>
                </div>
                <div class="info-card">
                    <div class="info-label">
                        <span>⏰</span>
                        Started
                    </div>
                    <p class="info-value">${formatDate(event.fromTimestamp)}</p>
                </div>
                <div class="info-card">
                    <div class="info-label">
                        <span>🎯</span>
                        Impact Level
                    </div>
                    <p class="info-value">${event.impact}</p>
                </div>
                <div class="info-card">
                    <div class="info-label">
                        <span>🏢</span>
                        Application
                    </div>
                    <p class="info-value">${event.application || 'Multiple Systems'}</p>
                </div>
            </div>

            <!-- Details Section -->
            ${event.description ? `
            <div class="details-section">
                <h3 class="section-title">
                    <span>📋</span>
                    Event Details
                </h3>
                <p class="section-content">${event.description}</p>
            </div>
            ` : ''}

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="details-section">
                <h3 class="section-title">
                    <span>🔧</span>
                    Affected Systems
                </h3>
                <div class="systems-grid">
                    ${event.systemsAffected.map((system: string) => `
                        <span class="system-tag">
                            <span>⚙️</span>
                            ${system}
                        </span>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Contact Information -->
            <div class="contact-section">
                <h3 class="contact-title">👤 Event Reporter</h3>
                <div class="contact-info">
                    ${event.createdBy} • ${event.createdBySource}
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="actions-section">
                <a href="#" class="action-button">View Full Details</a>
                <a href="#" class="action-button secondary">Dashboard</a>
            </div>

            <!-- Timeline -->
            ${event.statusHistory?.length > 0 ? `
            <div class="timeline-section">
                <div class="timeline-header">
                    <span>⏱️</span>
                    Event Timeline (${event.statusHistory.length} updates)
                </div>
                <div class="timeline-content">
                    ${event.statusHistory.slice().reverse().map((history: any) => `
                        <div class="timeline-item">
                            <div class="timeline-meta">
                                <div class="timeline-badges">
                                    <span class="timeline-badge">${history.status}</span>
                                    <span class="timeline-badge">${history.historyType}</span>
                                </div>
                                <div class="timeline-date">${formatDate(history.createdTimestamp)}</div>
                            </div>
                            <h4 class="timeline-title">${history.status} Update</h4>
                            <p class="timeline-description">${history.description}</p>
                            <div class="timeline-author">
                                Updated by ${history.createdBy} via ${history.createdBySource}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">JB HI-FI System Dashboard</div>
            <p class="footer-text">For real-time updates and support, visit our system dashboard</p>
        </div>
    </div>
</body>
</html>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
  );
};
