
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
        .update-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
            vertical-align: middle;
            box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);
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
        .release-banner {
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
        .release-content {
            display: table-cell;
            vertical-align: middle;
        }
        .release-title {
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 4px 0;
        }
        .release-desc {
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
            background: linear-gradient(135deg, #faf5ff, #f3e8ff);
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
            border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #581c87;
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
        .whats-new-card {
            background: linear-gradient(135deg, #f0fdf4, #dcfce7);
            border: 1px solid #22c55e;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }
        .whats-new-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #22c55e, #16a34a);
        }
        .whats-new-title {
            font-size: 16px;
            font-weight: bold;
            color: #047857;
            margin: 0 0 8px 0;
        }
        .whats-new-desc {
            color: #047857;
            margin: 0 0 12px 0;
            line-height: 1.6;
            font-size: 14px;
        }
        .features-compact {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }
        .feature-tag {
            background: linear-gradient(135deg, #ffffff, #f0fdf4);
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 8px 12px;
            text-align: center;
            font-size: 11px;
            font-weight: 600;
            color: #047857;
        }
        .systems-card {
            background: linear-gradient(135deg, #eff6ff, #dbeafe);
            border: 1px solid #60a5fa;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .systems-title {
            font-size: 16px;
            font-weight: bold;
            color: #1e3a8a;
            margin: 0 0 12px 0;
        }
        .system-badge {
            background: linear-gradient(135deg, #ffffff, #dbeafe);
            border: 1px solid #93c5fd;
            color: #1e40af;
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
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.4);
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
            background: linear-gradient(135deg, #7c3aed, #581c87);
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
            background: linear-gradient(135deg, #faf5ff, #f3e8ff);
            color: #7c3aed;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            border-top: 1px solid #e9d5ff;
        }
        @media only screen and (max-width: 600px) {
            .container { margin: 0 10px; }
            .content { padding: 16px; }
            .detail-row { flex-direction: column; align-items: flex-start; }
            .detail-value { max-width: 100%; text-align: left; margin-top: 4px; }
            .contact-info { flex-direction: column; align-items: flex-start; }
            .contact-source { margin-left: 0; margin-top: 4px; }
            .features-compact { grid-template-columns: 1fr; }
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
                    <span class="update-icon">✨</span>
                    <h2 class="header-title">SOFTWARE UPDATE</h2>
                </div>
                <p class="header-subtitle">Enhancement Deployment</p>
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Release Banner -->
            <div class="release-banner" style="background: linear-gradient(135deg, ${getImpactColor(event.impact)}, rgba(255,255,255,0.8)); border-color: ${getImpactBorderColor(event.impact)}; color: ${getImpactTextColor(event.impact)};">
                <div class="release-content">
                    <h3 class="release-title">${event.impact} Release Update</h3>
                    <p class="release-desc">${event.title}</p>
                </div>
                <div class="badge" style="background: linear-gradient(135deg, ${getStatusColor(event.status)}, rgba(0,0,0,0.1));">${event.status}</div>
            </div>

            <!-- Compact Details -->
            <div class="compact-details">
                <div class="detail-row">
                    <div class="detail-label">🚀 Release Type</div>
                    <div class="detail-value">Software Deployment</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">📦 Application</div>
                    <div class="detail-value">${event.application || event.systemsAffected?.[0] || "Multiple Systems"}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">📅 Deployment Start</div>
                    <div class="detail-value">${formatDate(event.fromTimestamp)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">⏰ Expected Completion</div>
                    <div class="detail-value">${formatDate(event.toTimestamp)}</div>
                </div>
            </div>

            <!-- What's New -->
            <div class="whats-new-card">
                <h3 class="whats-new-title">✨ What's New & Improved?</h3>
                <p class="whats-new-desc">${event.description}</p>
                <div class="features-compact">
                    <div class="feature-tag">⚡ Performance</div>
                    <div class="feature-tag">🔒 Security</div>
                    <div class="feature-tag">🎨 Features</div>
                    <div class="feature-tag">🛠️ Stability</div>
                </div>
            </div>

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-card">
                <h3 class="systems-title">🖥️ Systems Being Updated</h3>
                <div>
                    ${event.systemsAffected.map((system: string) => `<span class="system-badge">🔧 ${system}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Contact Information -->
            <div class="contact-card">
                <h3 class="contact-title">👤 Deployment Lead</h3>
                <div class="contact-info">
                    <span class="contact-name">${event.createdBy}</span>
                    <span class="contact-source">${event.createdBySource === "Manual" ? "DevOps Team" : "Auto Deploy"}</span>
                </div>
            </div>

            <!-- Action Button -->
            <div class="action-section">
                <a href="#" class="action-link">🚀 View Deployment Details</a>
            </div>

            <!-- Collapsible Deployment History -->
            <div class="history-toggle">
                <div class="history-header" onclick="toggleHistory()">
                    <h3 class="history-title">🔄 Deployment Timeline (${event.statusHistory?.length || 0} updates)</h3>
                    <span class="toggle-icon" id="toggleIcon">▶</span>
                </div>
                <div id="historyContent" class="history-content" style="display: none;">
                    ${event.statusHistory?.slice().reverse().slice(0, 3).map((history: any) => `
                    <div class="history-item">
                        <div class="history-meta">
                            <div class="history-badges">
                                <span class="history-badge" style="background-color: ${getStatusColor(history.status)}; color: white;">${history.status}</span>
                                <span class="history-badge" style="background-color: #faf5ff; color: #7c3aed;">${history.historyType}</span>
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
