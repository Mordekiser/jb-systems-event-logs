
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, Clock, User, GitBranch, Sparkles, CheckCircle } from "lucide-react";

interface EmailTemplateDeploymentProps {
  event: any;
}

export const EmailTemplateDeployment = ({ event }: EmailTemplateDeploymentProps) => {
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
      case "Major": return "#f3e8ff";
      case "Minor": return "#eff6ff";
      default: return "#ecfdf5";
    }
  };

  const getImpactBorderColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#7c3aed";
      case "Minor": return "#2563eb";
      default: return "#059669";
    }
  };

  const getImpactTextColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#7c3aed";
      case "Minor": return "#2563eb";
      default: return "#059669";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "#059669";
      case "In Progress": return "#2563eb";
      case "Scheduled": return "#7c3aed";
      default: return "#6b7280";
    }
  };

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JB HI-FI Software Update</title>
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
        .update-badge {
            background-color: #7c3aed;
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
        .release-card {
            border: 2px solid ${getImpactBorderColor(event.impact)};
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
            background-color: ${getImpactColor(event.impact)};
        }
        .release-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        .release-title {
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
        .release-description {
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
        .features-card {
            background-color: #f0fdf4;
            border-left: 4px solid #059669;
            border-radius: 0 8px 8px 0;
            padding: 20px;
            margin-bottom: 24px;
        }
        .features-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 12px 0;
        }
        .features-description {
            color: #475569;
            margin: 0;
            line-height: 1.6;
            font-size: 14px;
        }
        .systems-card {
            background-color: #eff6ff;
            border: 1px solid #93c5fd;
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
            border: 1px solid #2563eb;
            color: #2563eb;
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
            background-color: #7c3aed;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            margin: 0 8px 8px 0;
            cursor: pointer;
            border: none;
        }
        .action-button:hover {
            background-color: #6d28d9;
        }
        .action-button.secondary {
            background-color: #64748b;
        }
        .action-button.secondary:hover {
            background-color: #475569;
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
            .release-header { flex-direction: column; align-items: flex-start; }
            .status-badge { margin-top: 8px; }
            .action-button { display: block; margin: 8px 0; }
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

        function viewDeploymentDetails() {
            window.open('${window.location.origin}/?release=${event.id}', '_blank');
        }

        function contactDevOps() {
            const subject = encodeURIComponent('Release: ${event.title}');
            const body = encodeURIComponent('Regarding release ${event.id}: ${event.title}\\n\\nDescription: ${event.description}\\n\\nStatus: ${event.status}');
            window.open('mailto:devops@jbhifi.com.au?subject=' + subject + '&body=' + body);
        }
    </script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1 class="logo">JB HI-FI</h1>
            <div class="update-badge">✨ SOFTWARE UPDATE</div>
            <h2 class="header-title">Release Deployment</h2>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Release Card -->
            <div class="release-card">
                <div class="release-header">
                    <h3 class="release-title">${event.impact || 'Standard'} Release Update</h3>
                    <div class="status-badge">${event.status || 'Unknown'}</div>
                </div>
                <p class="release-description">${event.title || 'Release Details'}</p>
            </div>

            <!-- Details Grid -->
            <div class="details-grid">
                <div class="detail-row">
                    <div class="detail-label">Release ID</div>
                    <div class="detail-value">${event.id || 'N/A'}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Event Type</div>
                    <div class="detail-value">${event.eventType || 'Release'}</div>
                </div>
                ${event.application ? `
                <div class="detail-row">
                    <div class="detail-label">Application</div>
                    <div class="detail-value">${event.application}</div>
                </div>
                ` : ''}
                ${event.domain ? `
                <div class="detail-row">
                    <div class="detail-label">Domain</div>
                    <div class="detail-value">${event.domain}</div>
                </div>
                ` : ''}
                ${event.tenancy ? `
                <div class="detail-row">
                    <div class="detail-label">Environment</div>
                    <div class="detail-value">${event.tenancy}</div>
                </div>
                ` : ''}
                <div class="detail-row">
                    <div class="detail-label">Deployment Start</div>
                    <div class="detail-value">${event.fromTimestamp ? formatDate(event.fromTimestamp) : 'Unknown'}</div>
                </div>
                ${event.toTimestamp ? `
                <div class="detail-row">
                    <div class="detail-label">Expected Completion</div>
                    <div class="detail-value">${formatDate(event.toTimestamp)}</div>
                </div>
                ` : ''}
            </div>

            <!-- Release Details -->
            ${event.description ? `
            <div class="features-card">
                <h3 class="features-title">Release Information</h3>
                <p class="features-description">${event.description}</p>
            </div>
            ` : ''}

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-card">
                <h3 class="systems-title">Systems Being Updated</h3>
                <div>
                    ${event.systemsAffected.map((system: string) => `<span class="system-tag">${system}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Contact Information -->
            <div class="contact-card">
                <h3 class="contact-title">Deployment Lead</h3>
                <div class="contact-info">
                    <span class="contact-name">${event.createdBy || 'System'}</span>
                    <span class="contact-source">${event.createdBySource === "Manual" ? "DevOps Team" : "Auto Deploy"}</span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-section">
                <button onclick="viewDeploymentDetails()" class="action-button">View Deployment Details</button>
                <button onclick="contactDevOps()" class="action-button secondary">Contact DevOps</button>
            </div>

            <!-- Deployment Timeline -->
            ${event.statusHistory?.length > 0 ? `
            <div class="history-section">
                <div class="history-header" onclick="toggleHistory()">
                    <h3 class="history-title">Deployment Timeline (${event.statusHistory.length} updates)</h3>
                    <span class="toggle-icon" id="toggleIcon">+</span>
                </div>
                <div id="historyContent" class="history-content" style="display: none;">
                    ${event.statusHistory.slice().reverse().map((history: any) => `
                    <div class="history-item">
                        <div class="history-meta">
                            <div class="history-badges">
                                <span class="history-badge" style="background-color: ${getStatusColor(history.status)}; color: white;">${history.status}</span>
                                ${history.historyType ? `<span class="history-badge" style="background-color: #e2e8f0; color: #64748b;">${history.historyType}</span>` : ''}
                            </div>
                            <div class="history-date">${history.createdTimestamp ? formatDate(history.createdTimestamp) : 'Unknown time'}</div>
                        </div>
                        <p class="history-description">${history.description || 'No description available'}</p>
                        <div class="history-author">${history.createdBy || 'Unknown'} • ${history.createdBySource || 'Unknown source'}</div>
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Footer -->
            <div class="footer">
                <div class="footer-title">JB HI-FI System Dashboard</div>
                <p>For deployment status updates visit the dashboard or contact DevOps team</p>
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
