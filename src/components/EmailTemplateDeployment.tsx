
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
      case "Major": return "#faf5ff";
      case "Minor": return "#eff6ff";
      default: return "#f0fdf4";
    }
  };

  const getImpactBorderColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#e9d5ff";
      case "Minor": return "#bfdbfe";
      default: return "#bbf7d0";
    }
  };

  const getImpactTextColor = (impact: string) => {
    switch (impact) {
      case "Major": return "#581c87";
      case "Minor": return "#1e3a8a";
      default: return "#14532d";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "#10b981";
      case "In Progress": return "#3b82f6";
      case "Scheduled": return "#8b5cf6";
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
        .update-icon {
            width: 28px;
            height: 28px;
            background: linear-gradient(to right, #faf5ff, #eff6ff);
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
        .release-banner {
            border: 2px solid;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 32px;
            display: table;
            width: 100%;
            box-sizing: border-box;
        }
        .release-content {
            display: table-cell;
            vertical-align: middle;
        }
        .release-title {
            font-size: 18px;
            font-weight: bold;
            margin: 0 0 4px 0;
        }
        .release-desc {
            font-size: 14px;
            margin: 0;
            opacity: 0.8;
        }
        .badge {
            background-color: #8b5cf6;
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
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
        }
        .detail-box-purple {
            background: linear-gradient(to right, #faf5ff, #eff6ff);
            border: 1px solid #e9d5ff;
        }
        .detail-box-gray {
            background-color: #f9fafb;
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
        .whats-new-box {
            background: linear-gradient(to right, #f0fdf4, #eff6ff);
            border: 1px solid #10b981;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        }
        .whats-new-title {
            font-size: 20px;
            font-weight: bold;
            color: #047857;
            margin: 0 0 16px 0;
        }
        .whats-new-desc {
            color: #047857;
            margin: 0 0 16px 0;
            line-height: 1.7;
        }
        .features-grid {
            display: table;
            width: 100%;
        }
        .features-row {
            display: table-row;
        }
        .features-cell {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding: 0 8px 16px 0;
        }
        .feature-box {
            background-color: white;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
        }
        .feature-header {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-size: 14px;
        }
        .feature-desc {
            font-size: 12px;
            color: #6b7280;
            margin: 0;
        }
        .systems-box {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        }
        .systems-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e3a8a;
            margin: 0 0 12px 0;
        }
        .system-badge {
            background-color: white;
            border: 1px solid #93c5fd;
            color: #1e40af;
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
            background: linear-gradient(to right, #8b5cf6, #3b82f6);
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
            .features-grid, .features-row, .features-cell {
                display: block;
                width: 100%;
            }
            .features-cell {
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
                    <span class="update-icon">✨</span>
                    <h2 class="header-title">SOFTWARE UPDATE</h2>
                </div>
                <p class="header-subtitle">Enhancement Notification</p>
                <div class="header-buttons">
                    <a href="#" class="header-button">📊 Dashboard</a>
                    <a href="#" class="header-button">📅 Events Calendar</a>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Release Banner -->
            <div class="release-banner" style="background-color: ${getImpactColor(event.impact)}; border-color: ${getImpactBorderColor(event.impact)}; color: ${getImpactTextColor(event.impact)};">
                <div class="release-content">
                    <h3 class="release-title">${event.impact} Release Update</h3>
                    <p class="release-desc">${event.title}</p>
                </div>
                <div class="badge" style="background-color: ${getStatusColor(event.status)};">${event.status}</div>
            </div>

            <!-- Deployment Details Grid -->
            <div class="details-grid">
                <div class="details-row">
                    <div class="details-cell">
                        <div class="detail-box detail-box-purple">
                            <div class="detail-header">🔀 Release Type</div>
                            <p class="detail-value">Software Deployment</p>
                        </div>
                        <div class="detail-box detail-box-gray">
                            <div class="detail-header">📦 Application</div>
                            <p class="detail-value">${event.application || event.systemsAffected?.[0] || "Multiple Systems"}</p>
                        </div>
                    </div>
                    <div class="details-cell">
                        <div class="detail-box detail-box-gray">
                            <div class="detail-header">📅 Deployment Start</div>
                            <p class="detail-value">${formatDate(event.fromTimestamp)}</p>
                        </div>
                        <div class="detail-box detail-box-gray">
                            <div class="detail-header">⏰ Expected Completion</div>
                            <p class="detail-value">${formatDate(event.toTimestamp)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- What's New -->
            <div class="whats-new-box">
                <h3 class="whats-new-title">✨ What's New & Improved?</h3>
                <p class="whats-new-desc">${event.description}</p>
                <div class="features-grid">
                    <div class="features-row">
                        <div class="features-cell">
                            <div class="feature-box">
                                <div class="feature-header">✅ Performance</div>
                                <p class="feature-desc">Enhanced speed and optimization</p>
                            </div>
                            <div class="feature-box">
                                <div class="feature-header">✅ Features</div>
                                <p class="feature-desc">New user experience improvements</p>
                            </div>
                        </div>
                        <div class="features-cell">
                            <div class="feature-box">
                                <div class="feature-header">✅ Security</div>
                                <p class="feature-desc">Latest security measures implemented</p>
                            </div>
                            <div class="feature-box">
                                <div class="feature-header">✅ Stability</div>
                                <p class="feature-desc">Bug fixes and reliability updates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-box">
                <h3 class="systems-title">Systems Being Updated</h3>
                <div>
                    ${event.systemsAffected.map((system: string) => `<span class="system-badge">🔧 ${system}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Contact Information -->
            <div class="contact-box">
                <h3 class="contact-title">👤 Deployment Lead</h3>
                <p>
                    <span class="contact-name">${event.createdBy}</span>
                    <span class="contact-source">(${event.createdBySource === "Manual" ? "DevOps Team" : "Automated Deployment"})</span>
                </p>
            </div>

            <!-- Action Button -->
            <div class="action-button">
                <a href="#" class="action-link">🚀 View Deployment Details</a>
            </div>

            <!-- Deployment History -->
            <div class="history-box">
                <h3 class="history-title">🔀 Deployment Timeline (Latest First)</h3>
                ${event.statusHistory?.slice().reverse().map((history: any) => `
                <div class="history-item">
                    <div class="history-header">
                        <div class="history-badges">
                            <span class="history-badge" style="background-color: ${getStatusColor(history.status)}; color: white;">${history.status}</span>
                            <span class="history-badge" style="background-color: #faf5ff; color: #7c3aed; border: 1px solid #e9d5ff;">${history.historyType}</span>
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
                <p>For real-time updates and detailed release notes, visit our dashboard</p>
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
