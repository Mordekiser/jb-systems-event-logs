
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
      case "Major": return "#fee2e2";
      case "Minor": return "#fef3c7";
      default: return "#ecfdf5";
    }
  };

  const getImpactBorderColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#dc2626";
      case "Minor": return "#d97706";
      default: return "#059669";
    }
  };

  const getImpactTextColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#dc2626";
      case "Minor": return "#d97706";
      default: return "#059669";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "#059669";
      case "In Progress": return "#2563eb";
      case "Under Investigation": return "#dc2626";
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
            background-color: #f8fafc;
            color: #334155;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #ffffff;
            padding: 32px 24px;
            text-align: center;
            border-bottom: 1px solid #e2e8f0;
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            color: #000000;
            margin: 0 0 16px 0;
            letter-spacing: -0.025em;
        }
        .alert-badge {
            background-color: #dc2626;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 8px;
        }
        .header-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin: 0;
        }
        .content {
            padding: 24px;
        }
        .priority-card {
            border: 2px solid ${getImpactBorderColor(event.impact)};
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
            background-color: ${getImpactColor(event.impact)};
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
            color: ${getImpactTextColor(event.impact)};
            margin: 0;
        }
        .status-badge {
            background-color: ${getStatusColor(event.status)};
            color: white;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
        }
        .incident-title {
            font-size: 16px;
            color: #1e293b;
            margin: 0;
            font-weight: 500;
        }
        .details-grid {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 500;
            color: #64748b;
            font-size: 14px;
        }
        .detail-value {
            color: #1e293b;
            font-weight: 500;
            font-size: 14px;
            text-align: right;
        }
        .description-card {
            background-color: #f1f5f9;
            border-left: 4px solid #2563eb;
            border-radius: 0 8px 8px 0;
            padding: 20px;
            margin-bottom: 24px;
        }
        .description-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 8px 0;
        }
        .description-text {
            color: #475569;
            margin: 0;
            line-height: 1.6;
            font-size: 14px;
        }
        .systems-card {
            background-color: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .systems-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 12px 0;
        }
        .system-tag {
            background-color: #ffffff;
            border: 1px solid #d97706;
            color: #d97706;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            margin: 4px 6px 4px 0;
            display: inline-block;
        }
        .contact-card {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .contact-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 12px 0;
        }
        .contact-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .contact-name {
            font-weight: 500;
            color: #1e293b;
            font-size: 14px;
        }
        .contact-source {
            color: #64748b;
            font-size: 12px;
            background-color: #e2e8f0;
            padding: 4px 8px;
            border-radius: 4px;
        }
        .action-section {
            text-align: center;
            margin-bottom: 24px;
        }
        .action-button {
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
        }
        .history-section {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-bottom: 24px;
            overflow: hidden;
        }
        .history-header {
            padding: 16px 20px;
            background-color: #f8fafc;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e2e8f0;
        }
        .history-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin: 0;
        }
        .toggle-icon {
            font-size: 14px;
            color: #64748b;
        }
        .history-content {
            max-height: 400px;
            overflow-y: auto;
        }
        .history-item {
            padding: 16px 20px;
            border-bottom: 1px solid #f1f5f9;
        }
        .history-item:last-child {
            border-bottom: none;
        }
        .history-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .history-badges {
            display: flex;
            gap: 8px;
        }
        .history-badge {
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
        }
        .history-date {
            font-size: 12px;
            color: #64748b;
        }
        .history-description {
            color: #475569;
            margin: 0 0 8px 0;
            line-height: 1.5;
            font-size: 14px;
        }
        .history-author {
            font-size: 12px;
            color: #64748b;
        }
        .footer {
            text-align: center;
            color: #64748b;
            font-size: 12px;
            padding: 20px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }
        .footer-title {
            font-weight: 600;
            color: #1e293b;
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
        }
    </style>
    <script>
        function toggleHistory() {
            const content = document.getElementById('historyContent');
            const icon = document.getElementById('toggleIcon');
            const isHidden = content.style.display === 'none';
            
            content.style.display = isHidden ? 'block' : 'none';
            icon.textContent = isHidden ? '−' : '+';
        }
    </script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1 class="logo">JB HI-FI</h1>
            <div class="alert-badge">⚠️ INCIDENT ALERT</div>
            <h2 class="header-title">System Incident Notification</h2>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Priority Card -->
            <div class="priority-card">
                <div class="priority-header">
                    <h3 class="priority-title">${event.impact} Impact Incident</h3>
                    <div class="status-badge">${event.status}</div>
                </div>
                <p class="incident-title">${event.title}</p>
            </div>

            <!-- Details Grid -->
            <div class="details-grid">
                <div class="detail-row">
                    <div class="detail-label">Incident Type</div>
                    <div class="detail-value">System Incident</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Application</div>
                    <div class="detail-value">${event.application || event.systemsAffected?.[0] || "Multiple Systems"}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Started</div>
                    <div class="detail-value">${formatDate(event.fromTimestamp)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Expected Resolution</div>
                    <div class="detail-value">${formatDate(event.toTimestamp)}</div>
                </div>
            </div>

            <!-- Description -->
            <div class="description-card">
                <h3 class="description-title">What's Happening?</h3>
                <p class="description-text">${event.description}</p>
            </div>

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-card">
                <h3 class="systems-title">Affected Systems</h3>
                <div>
                    ${event.systemsAffected.map((system: string) => `<span class="system-tag">${system}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Contact Information -->
            <div class="contact-card">
                <h3 class="contact-title">Primary Contact</h3>
                <div class="contact-info">
                    <span class="contact-name">${event.createdBy}</span>
                    <span class="contact-source">${event.createdBySource === "Manual" ? "IT Support Team" : "Automated Alert"}</span>
                </div>
            </div>

            <!-- Action Button -->
            <div class="action-section">
                <a href="#" class="action-button">View Full Details</a>
            </div>

            <!-- Incident Timeline -->
            <div class="history-section">
                <div class="history-header" onclick="toggleHistory()">
                    <h3 class="history-title">Incident Timeline (${event.statusHistory?.length || 0} updates)</h3>
                    <span class="toggle-icon" id="toggleIcon">+</span>
                </div>
                <div id="historyContent" class="history-content" style="display: none;">
                    ${event.statusHistory?.slice().reverse().map((history: any) => `
                    <div class="history-item">
                        <div class="history-meta">
                            <div class="history-badges">
                                <span class="history-badge" style="background-color: ${getStatusColor(history.status)}; color: white;">${history.status}</span>
                                <span class="history-badge" style="background-color: #e2e8f0; color: #64748b;">${history.historyType}</span>
                            </div>
                            <div class="history-date">${formatDate(history.createdTimestamp)}</div>
                        </div>
                        <p class="history-description">${history.description}</p>
                        <div class="history-author">${history.createdBy} • ${history.createdBySource}</div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-title">JB HI-FI System Dashboard</div>
                <p>Real-time updates • Dashboard • Events Calendar</p>
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
