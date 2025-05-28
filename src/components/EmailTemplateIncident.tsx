
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
            background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
            padding: 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
            );
            animation: slide 20s linear infinite;
        }
        @keyframes slide {
            0% { transform: translateX(-100px) translateY(-100px); }
            100% { transform: translateX(100px) translateY(100px); }
        }
        .header h1 {
            font-size: 36px;
            font-weight: bold;
            color: #000000;
            margin: 0 0 8px 0;
            position: relative;
            z-index: 1;
        }
        .header-card {
            background-color: rgba(255, 255, 255, 0.98);
            border-radius: 16px;
            padding: 20px;
            display: inline-block;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            position: relative;
            z-index: 1;
            backdrop-filter: blur(10px);
        }
        .alert-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
            vertical-align: middle;
            box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
        }
        .header-title {
            font-size: 20px;
            font-weight: bold;
            color: #111827;
            margin: 0;
            display: inline-block;
            vertical-align: middle;
        }
        .header-subtitle {
            font-size: 12px;
            color: #6b7280;
            margin: 4px 0 12px 0;
        }
        .content {
            padding: 20px;
        }
        .priority-banner {
            border: 2px solid;
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 20px;
            display: table;
            width: 100%;
            box-sizing: border-box;
            background: linear-gradient(135deg, ${getImpactColor(event.impact)}, rgba(255,255,255,0.8));
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .priority-content {
            display: table-cell;
            vertical-align: middle;
        }
        .priority-title {
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 4px 0;
        }
        .priority-desc {
            font-size: 14px;
            margin: 0;
            opacity: 0.9;
        }
        .badge {
            background: linear-gradient(135deg, ${getStatusColor(event.status)}, rgba(0,0,0,0.1));
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            float: right;
            margin-top: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .compact-details {
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
            font-size: 13px;
            display: flex;
            align-items: center;
        }
        .detail-value {
            color: #111827;
            font-weight: 500;
            font-size: 13px;
            text-align: right;
            max-width: 60%;
        }
        .description-card {
            background: linear-gradient(135deg, #eff6ff, #dbeafe);
            border: 1px solid #93c5fd;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }
        .description-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
        }
        .description-title {
            font-size: 16px;
            font-weight: bold;
            color: #1e3a8a;
            margin: 0 0 8px 0;
        }
        .description-text {
            color: #1e40af;
            margin: 0;
            line-height: 1.6;
            font-size: 14px;
        }
        .systems-card {
            background: linear-gradient(135deg, #fff7ed, #fed7aa);
            border: 1px solid #fdba74;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .systems-title {
            font-size: 16px;
            font-weight: bold;
            color: #9a3412;
            margin: 0 0 12px 0;
        }
        .system-badge {
            background: linear-gradient(135deg, #ffffff, #fef3c7);
            border: 1px solid #fdba74;
            color: #9a3412;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            margin: 4px 6px 4px 0;
            display: inline-block;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .contact-card {
            background: linear-gradient(135deg, #f9fafb, #f3f4f6);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .contact-title {
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            margin: 0 0 8px 0;
        }
        .contact-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .contact-name {
            font-weight: 500;
            color: #374151;
        }
        .contact-source {
            color: #6b7280;
            font-size: 12px;
            background-color: #e5e7eb;
            padding: 2px 8px;
            border-radius: 12px;
        }
        .action-section {
            text-align: center;
            margin-bottom: 20px;
        }
        .action-link {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
            transition: all 0.3s ease;
        }
        .history-toggle {
            background: linear-gradient(135deg, #f9fafb, #f3f4f6);
            border-radius: 16px;
            margin-bottom: 20px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .history-header {
            padding: 16px 20px;
            background: linear-gradient(135deg, #374151, #111827);
            color: white;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .history-title {
            font-size: 16px;
            font-weight: bold;
            margin: 0;
        }
        .toggle-icon {
            font-size: 18px;
            transition: transform 0.3s ease;
        }
        .history-content {
            max-height: 300px;
            overflow-y: auto;
            padding: 0;
        }
        .history-item {
            background: linear-gradient(135deg, #ffffff, #f9fafb);
            border-bottom: 1px solid #e5e7eb;
            padding: 16px 20px;
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
            gap: 6px;
        }
        .history-badge {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
        }
        .history-date {
            font-size: 11px;
            color: #6b7280;
        }
        .history-desc {
            color: #374151;
            margin: 0 0 8px 0;
            line-height: 1.5;
            font-size: 13px;
        }
        .history-author {
            font-size: 11px;
            color: #6b7280;
        }
        .footer {
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            margin-top: 20px;
            padding: 16px;
            background: linear-gradient(135deg, #f9fafb, #f3f4f6);
            border-radius: 16px;
        }
        .status-indicator {
            display: inline-flex;
            align-items: center;
            margin-bottom: 8px;
        }
        .status-dot {
            width: 6px;
            height: 6px;
            background-color: #10b981;
            border-radius: 50%;
            margin-right: 6px;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
        }
        .view-more {
            text-align: center;
            padding: 12px;
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            border-top: 1px solid #93c5fd;
        }
        @media only screen and (max-width: 600px) {
            .container { margin: 0 10px; }
            .content { padding: 16px; }
            .detail-row { flex-direction: column; align-items: flex-start; }
            .detail-value { max-width: 100%; text-align: left; margin-top: 4px; }
            .contact-info { flex-direction: column; align-items: flex-start; }
            .contact-source { margin-left: 0; margin-top: 4px; }
        }
    </style>
    <script>
        function toggleHistory() {
            const content = document.getElementById('historyContent');
            const icon = document.getElementById('toggleIcon');
            const isHidden = content.style.display === 'none';
            
            content.style.display = isHidden ? 'block' : 'none';
            icon.textContent = isHidden ? '▼' : '▶';
        }
    </script>
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
                <p class="header-subtitle">Critical System Notification</p>
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Priority Banner -->
            <div class="priority-banner" style="background: linear-gradient(135deg, ${getImpactColor(event.impact)}, rgba(255,255,255,0.8)); border-color: ${getImpactBorderColor(event.impact)}; color: ${getImpactTextColor(event.impact)};">
                <div class="priority-content">
                    <h3 class="priority-title">${event.impact} Impact Incident</h3>
                    <p class="priority-desc">${event.title}</p>
                </div>
                <div class="badge" style="background: linear-gradient(135deg, ${getStatusColor(event.status)}, rgba(0,0,0,0.1));">${event.status}</div>
            </div>

            <!-- Compact Details -->
            <div class="compact-details">
                <div class="detail-row">
                    <div class="detail-label">🚨 Incident Type</div>
                    <div class="detail-value">System Incident</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">🛡️ Application</div>
                    <div class="detail-value">${event.application || event.systemsAffected?.[0] || "Multiple Systems"}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">📅 Started</div>
                    <div class="detail-value">${formatDate(event.fromTimestamp)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">⏰ Expected Resolution</div>
                    <div class="detail-value">${formatDate(event.toTimestamp)}</div>
                </div>
            </div>

            <!-- Description -->
            <div class="description-card">
                <h3 class="description-title">🔍 What's Happening?</h3>
                <p class="description-text">${event.description}</p>
            </div>

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-card">
                <h3 class="systems-title">🖥️ Affected Systems</h3>
                <div>
                    ${event.systemsAffected.map((system: string) => `<span class="system-badge">${system}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Contact Information -->
            <div class="contact-card">
                <h3 class="contact-title">👤 Primary Contact</h3>
                <div class="contact-info">
                    <span class="contact-name">${event.createdBy}</span>
                    <span class="contact-source">${event.createdBySource === "Manual" ? "IT Support Team" : "Automated Alert"}</span>
                </div>
            </div>

            <!-- Action Button -->
            <div class="action-section">
                <a href="#" class="action-link">🔗 View Full Details</a>
            </div>

            <!-- Collapsible Event History -->
            <div class="history-toggle">
                <div class="history-header" onclick="toggleHistory()">
                    <h3 class="history-title">📋 Incident Timeline (${event.statusHistory?.length || 0} updates)</h3>
                    <span class="toggle-icon" id="toggleIcon">▶</span>
                </div>
                <div id="historyContent" class="history-content" style="display: none;">
                    ${event.statusHistory?.slice().reverse().slice(0, 3).map((history: any) => `
                    <div class="history-item">
                        <div class="history-meta">
                            <div class="history-badges">
                                <span class="history-badge" style="background-color: ${getStatusColor(history.status)}; color: white;">${history.status}</span>
                                <span class="history-badge" style="background-color: #dbeafe; color: #1e40af;">${history.historyType}</span>
                            </div>
                            <div class="history-date">${formatDate(history.createdTimestamp)}</div>
                        </div>
                        <p class="history-desc">${history.description}</p>
                        <div class="history-author">👤 ${history.createdBy} • ${history.createdBySource}</div>
                    </div>
                    `).join('')}
                    ${event.statusHistory?.length > 3 ? `
                    <div class="view-more">
                        📋 View ${event.statusHistory.length - 3} more updates in dashboard
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="status-indicator">
                    <span class="status-dot"></span>
                    <strong>Live from JB HI-FI System Dashboard</strong>
                </div>
                <p>🔄 Real-time updates • 📊 Dashboard • 📅 Events Calendar</p>
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
