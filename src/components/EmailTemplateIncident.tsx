
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Clock, User, MapPin, AlertCircle, Shield } from "lucide-react";

interface EmailTemplateIncidentProps {
  event: any;
}

export const EmailTemplateIncident = ({ event }: EmailTemplateIncidentProps) => {
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#fef2f2";
      case "Minor": return "#fefce8";
      default: return "#f0fdf4";
    }
  };

  const getImpactBorderColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#fecaca";
      case "Minor": return "#fde047";
      default: return "#bbf7d0";
    }
  };

  const getImpactTextColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#7f1d1d";
      case "Minor": return "#713f12";
      default: return "#14532d";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "#10b981";
      case "In Progress": return "#3b82f6";
      case "Under Investigation": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JB HI-FI Incident Alert</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            background-color: #f3f4f6;
        }
        .container {
            max-width: 640px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(to right, #fbbf24, #f59e0b, #d97706);
            padding: 32px;
            text-align: center;
        }
        .header h1 {
            font-size: 48px;
            font-weight: bold;
            color: #000000;
            margin: 0 0 12px 0;
        }
        .header-card {
            background-color: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 24px;
            display: inline-block;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .alert-icon {
            width: 28px;
            height: 28px;
            background-color: #fecaca;
            border-radius: 50%;
            display: inline-block;
            margin-right: 12px;
            vertical-align: middle;
        }
        .header-title {
            font-size: 24px;
            font-weight: bold;
            color: #111827;
            margin: 0;
            display: inline-block;
            vertical-align: middle;
        }
        .header-subtitle {
            font-size: 14px;
            color: #6b7280;
            margin: 4px 0 16px 0;
        }
        .header-buttons {
            margin-top: 16px;
        }
        .header-button {
            background-color: #dbeafe;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            margin: 0 8px;
            text-decoration: none;
            color: #1e40af;
            display: inline-block;
        }
        .content {
            padding: 32px;
        }
        .priority-banner {
            border: 2px solid;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 32px;
            display: table;
            width: 100%;
            box-sizing: border-box;
        }
        .priority-content {
            display: table-cell;
            vertical-align: middle;
        }
        .priority-title {
            font-size: 18px;
            font-weight: bold;
            margin: 0 0 4px 0;
        }
        .priority-desc {
            font-size: 14px;
            margin: 0;
            opacity: 0.8;
        }
        .badge {
            background-color: #ef4444;
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            float: right;
            margin-top: 8px;
        }
        .details-grid {
            display: table;
            width: 100%;
            margin-bottom: 32px;
        }
        .details-row {
            display: table-row;
        }
        .details-cell {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding: 0 8px 16px 0;
        }
        .detail-box {
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
        }
        .detail-header {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-size: 14px;
        }
        .detail-value {
            color: #111827;
            font-weight: 500;
            margin: 0;
        }
        .description-box {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        }
        .description-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e3a8a;
            margin: 0 0 12px 0;
        }
        .description-text {
            color: #1e40af;
            margin: 0;
            line-height: 1.7;
        }
        .systems-box {
            background-color: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        }
        .systems-title {
            font-size: 18px;
            font-weight: bold;
            color: #9a3412;
            margin: 0 0 12px 0;
        }
        .system-badge {
            background-color: white;
            border: 1px solid #fdba74;
            color: #9a3412;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            margin: 4px 8px 4px 0;
            display: inline-block;
        }
        .contact-box {
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        }
        .contact-title {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            margin: 0 0 12px 0;
        }
        .contact-name {
            font-weight: 500;
            color: #374151;
        }
        .contact-source {
            color: #6b7280;
            margin-left: 8px;
        }
        .action-button {
            text-align: center;
            margin-bottom: 32px;
        }
        .action-link {
            background: linear-gradient(to right, #3b82f6, #2563eb);
            color: white;
            padding: 12px 32px;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .history-box {
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        }
        .history-title {
            font-size: 20px;
            font-weight: bold;
            color: #111827;
            margin: 0 0 24px 0;
        }
        .history-item {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
        }
        .history-header {
            display: table;
            width: 100%;
            margin-bottom: 12px;
        }
        .history-badges {
            display: table-cell;
            vertical-align: middle;
        }
        .history-date {
            display: table-cell;
            text-align: right;
            vertical-align: middle;
            font-size: 12px;
            color: #6b7280;
        }
        .history-badge {
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            margin-right: 8px;
            display: inline-block;
        }
        .history-desc {
            color: #374151;
            margin: 0 0 12px 0;
            line-height: 1.7;
        }
        .history-meta {
            font-size: 12px;
            color: #6b7280;
        }
        .footer {
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
        }
        .footer-status {
            margin-bottom: 8px;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            background-color: #10b981;
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        @media only screen and (max-width: 600px) {
            .details-grid, .details-row, .details-cell {
                display: block;
                width: 100%;
            }
            .details-cell {
                padding: 0 0 16px 0;
            }
            .history-header, .history-badges, .history-date {
                display: block;
                text-align: left;
            }
            .history-date {
                margin-top: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>JB HI-FI</h1>
            <div class="header-card">
                <div>
                    <span class="alert-icon">⚠️</span>
                    <h2 class="header-title">INCIDENT ALERT</h2>
                </div>
                <p class="header-subtitle">System Status Notification</p>
                <div class="header-buttons">
                    <a href="#" class="header-button">📊 Dashboard</a>
                    <a href="#" class="header-button">📅 Events Calendar</a>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Priority Banner -->
            <div class="priority-banner" style="background-color: ${getImpactColor(event.impact)}; border-color: ${getImpactBorderColor(event.impact)}; color: ${getImpactTextColor(event.impact)};">
                <div class="priority-content">
                    <h3 class="priority-title">${event.impact} Impact Incident</h3>
                    <p class="priority-desc">${event.title}</p>
                </div>
                <div class="badge" style="background-color: ${getStatusColor(event.status)};">${event.status}</div>
            </div>

            <!-- Details Grid -->
            <div class="details-grid">
                <div class="details-row">
                    <div class="details-cell">
                        <div class="detail-box">
                            <div class="detail-header">🚨 Incident Type</div>
                            <p class="detail-value">System Incident</p>
                        </div>
                        <div class="detail-box">
                            <div class="detail-header">🛡️ Application</div>
                            <p class="detail-value">${event.application || event.systemsAffected?.[0] || "Multiple Systems"}</p>
                        </div>
                    </div>
                    <div class="details-cell">
                        <div class="detail-box">
                            <div class="detail-header">📅 Started</div>
                            <p class="detail-value">${formatDate(event.fromTimestamp)}</p>
                        </div>
                        <div class="detail-box">
                            <div class="detail-header">⏰ Expected Resolution</div>
                            <p class="detail-value">${formatDate(event.toTimestamp)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="description-box">
                <h3 class="description-title">What's Happening?</h3>
                <p class="description-text">${event.description}</p>
            </div>

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-box">
                <h3 class="systems-title">Affected Systems</h3>
                <div>
                    ${event.systemsAffected.map((system: string) => `<span class="system-badge">${system}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Contact Information -->
            <div class="contact-box">
                <h3 class="contact-title">👤 Primary Contact</h3>
                <p>
                    <span class="contact-name">${event.createdBy}</span>
                    <span class="contact-source">(${event.createdBySource === "Manual" ? "IT Support Team" : "Automated System Alert"})</span>
                </p>
            </div>

            <!-- Action Button -->
            <div class="action-button">
                <a href="#" class="action-link">🔗 View Full Incident Details</a>
            </div>

            <!-- Event History -->
            <div class="history-box">
                <h3 class="history-title">⏰ Incident Timeline (Latest First)</h3>
                ${event.statusHistory?.slice().reverse().map((history: any) => `
                <div class="history-item">
                    <div class="history-header">
                        <div class="history-badges">
                            <span class="history-badge" style="background-color: ${getStatusColor(history.status)}; color: white;">${history.status}</span>
                            <span class="history-badge" style="background-color: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe;">${history.historyType}</span>
                        </div>
                        <div class="history-date">📅 ${formatDate(history.createdTimestamp)}</div>
                    </div>
                    <p class="history-desc">${history.description}</p>
                    <div class="history-meta">
                        👤 <strong>${history.createdBy}</strong> • ${history.createdBySource}
                    </div>
                </div>
                `).join('')}
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-status">
                    <span class="status-dot"></span>
                    <strong>Automated notification from JB HI-FI System Status Dashboard</strong>
                </div>
                <p>For real-time updates, visit our dashboard or events calendar</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
  );
};
