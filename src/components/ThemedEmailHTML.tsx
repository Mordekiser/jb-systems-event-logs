
import React from 'react';

interface ThemedEmailHTMLProps {
  event: any;
}

export const ThemedEmailHTML = ({ event }: ThemedEmailHTMLProps) => {
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
      case "Complete": return "hsl(142 71% 45%)";
      case "In Progress": return "hsl(221 83% 53%)";
      case "Under Investigation": return "hsl(0 84% 60%)";
      case "Scheduled": return "hsl(262 83% 58%)";
      default: return "hsl(220 15% 42%)";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Major": return "hsl(0 84% 60%)";
      case "Minor": return "hsl(48 96% 53%)";
      default: return "hsl(142 71% 45%)";
    }
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
            --destructive: 0 84% 60%;
            --destructive-foreground: 210 40% 98%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --ring: 222.2 84% 4.9%;
            --radius: 0.5rem;
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
                --input: 217.2 32.6% 17.5%;
                --ring: 212.7 26.8% 83.9%;
            }
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            padding: 20px 0;
        }
        
        .container {
            max-width: 640px;
            margin: 0 auto;
            background-color: hsl(var(--card));
            border-radius: calc(var(--radius) * 2);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
            padding: 32px 24px;
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
            font-size: 2.5rem;
            font-weight: bold;
            color: #000000;
            margin: 0 0 16px 0;
            position: relative;
            z-index: 1;
            letter-spacing: -0.025em;
        }
        
        .header-card {
            background-color: hsl(var(--card));
            border-radius: var(--radius);
            padding: 24px;
            display: inline-block;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            position: relative;
            z-index: 1;
            backdrop-filter: blur(10px);
            border: 1px solid hsl(var(--border));
        }
        
        .alert-icon {
            width: 24px;
            height: 24px;
            background: ${event.eventType === 'Incident' ? 'linear-gradient(135deg, hsl(var(--destructive)), hsl(0 84% 50%))' : 'linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 48%)'};
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
            vertical-align: middle;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            color: white;
            text-align: center;
            line-height: 24px;
            font-size: 14px;
        }
        
        .header-title {
            font-size: 1.25rem;
            font-weight: bold;
            color: hsl(var(--card-foreground));
            margin: 0;
            display: inline-block;
            vertical-align: middle;
        }
        
        .header-subtitle {
            font-size: 0.75rem;
            color: hsl(var(--muted-foreground));
            margin: 8px 0 0 0;
        }
        
        .content {
            padding: 24px;
        }
        
        .priority-banner {
            border: 2px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
            background: hsl(var(--muted));
            position: relative;
            overflow: hidden;
        }
        
        .priority-banner::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: ${getImpactColor(event.impact)};
        }
        
        .priority-content {
            position: relative;
            z-index: 1;
        }
        
        .priority-title {
            font-size: 1.125rem;
            font-weight: bold;
            margin: 0 0 8px 0;
            color: hsl(var(--card-foreground));
        }
        
        .priority-desc {
            font-size: 0.875rem;
            margin: 0;
            color: hsl(var(--muted-foreground));
            line-height: 1.5;
        }
        
        .status-badge {
            background: ${getStatusColor(event.status)};
            color: white;
            padding: 6px 12px;
            border-radius: calc(var(--radius) * 0.5);
            font-size: 0.75rem;
            font-weight: 600;
            float: right;
            margin-top: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .details-grid {
            background: hsl(var(--muted));
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
            border: 1px solid hsl(var(--border));
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid hsl(var(--border));
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 600;
            color: hsl(var(--foreground));
            font-size: 0.875rem;
            display: flex;
            align-items: center;
        }
        
        .detail-value {
            color: hsl(var(--muted-foreground));
            font-weight: 500;
            font-size: 0.875rem;
            text-align: right;
            max-width: 60%;
        }
        
        .description-card {
            background: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
            position: relative;
        }
        
        .description-title {
            font-size: 1rem;
            font-weight: bold;
            color: hsl(var(--foreground));
            margin: 0 0 12px 0;
        }
        
        .description-text {
            color: hsl(var(--muted-foreground));
            margin: 0;
            line-height: 1.6;
            font-size: 0.875rem;
        }
        
        .systems-card {
            background: hsl(var(--accent));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
        }
        
        .systems-title {
            font-size: 1rem;
            font-weight: bold;
            color: hsl(var(--accent-foreground));
            margin: 0 0 16px 0;
        }
        
        .system-badge {
            background: hsl(var(--background));
            border: 1px solid hsl(var(--border));
            color: hsl(var(--foreground));
            padding: 6px 12px;
            border-radius: calc(var(--radius) * 0.5);
            font-size: 0.75rem;
            margin: 4px 8px 4px 0;
            display: inline-block;
            font-weight: 500;
        }
        
        .action-buttons {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 12px 24px;
            border-radius: var(--radius);
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.875rem;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
        }
        
        .btn-primary {
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .btn-secondary {
            background: hsl(var(--secondary));
            color: hsl(var(--secondary-foreground));
            border: 1px solid hsl(var(--border));
        }
        
        .timeline-section {
            background: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            margin-bottom: 24px;
            overflow: hidden;
        }
        
        .timeline-header {
            padding: 16px 20px;
            background: hsl(var(--muted));
            border-bottom: 1px solid hsl(var(--border));
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .timeline-title {
            font-size: 1rem;
            font-weight: bold;
            margin: 0;
            color: hsl(var(--foreground));
        }
        
        .toggle-icon {
            font-size: 1rem;
            color: hsl(var(--muted-foreground));
            transition: transform 0.3s ease;
        }
        
        .timeline-content {
            max-height: 300px;
            overflow-y: auto;
        }
        
        .timeline-item {
            padding: 16px 20px;
            border-bottom: 1px solid hsl(var(--border));
        }
        
        .timeline-item:last-child {
            border-bottom: none;
        }
        
        .timeline-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .timeline-badges {
            display: flex;
            gap: 8px;
        }
        
        .timeline-badge {
            padding: 2px 8px;
            border-radius: calc(var(--radius) * 0.5);
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .timeline-date {
            font-size: 0.75rem;
            color: hsl(var(--muted-foreground));
        }
        
        .timeline-desc {
            color: hsl(var(--foreground));
            margin: 0 0 8px 0;
            line-height: 1.5;
            font-size: 0.875rem;
        }
        
        .timeline-author {
            font-size: 0.75rem;
            color: hsl(var(--muted-foreground));
        }
        
        .footer {
            text-align: center;
            color: hsl(var(--muted-foreground));
            font-size: 0.75rem;
            padding: 20px;
            background: hsl(var(--muted));
            border-top: 1px solid hsl(var(--border));
        }
        
        .status-indicator {
            display: inline-flex;
            align-items: center;
            margin-bottom: 8px;
            color: hsl(var(--foreground));
            font-weight: 600;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background-color: hsl(142 71% 45%);
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @media only screen and (max-width: 640px) {
            .container { margin: 0 16px; }
            .content { padding: 16px; }
            .detail-row { flex-direction: column; align-items: flex-start; gap: 4px; }
            .detail-value { max-width: 100%; text-align: left; }
            .action-buttons { flex-direction: column; }
            .btn { justify-content: center; }
            .header h1 { font-size: 2rem; }
        }
    </style>
    <script>
        function toggleTimeline() {
            const content = document.getElementById('timelineContent');
            const icon = document.getElementById('toggleIcon');
            const isHidden = content.style.display === 'none';
            
            content.style.display = isHidden ? 'block' : 'none';
            icon.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
        }
        
        function viewDetails() {
            window.open('#', '_blank');
        }
        
        function contactSupport() {
            window.location.href = 'mailto:support@jbhifi.com.au?subject=Event: ${event.title}';
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
                    <span class="alert-icon">${event.eventType === 'Incident' ? '⚠️' : '🚀'}</span>
                    <h2 class="header-title">${event.eventType.toUpperCase()} ALERT</h2>
                </div>
                <p class="header-subtitle">${event.eventType === 'Incident' ? 'Critical System Notification' : 'System Update Notification'}</p>
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Priority Banner -->
            <div class="priority-banner">
                <div class="priority-content">
                    <h3 class="priority-title">${event.impact} Impact ${event.eventType}</h3>
                    <p class="priority-desc">${event.title}</p>
                </div>
                <div class="status-badge">${event.status}</div>
                <div style="clear: both;"></div>
            </div>

            <!-- Details Grid -->
            <div class="details-grid">
                <div class="detail-row">
                    <div class="detail-label">${event.eventType === 'Incident' ? '🚨' : '🚀'} Event Type</div>
                    <div class="detail-value">${event.eventType}</div>
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
                    <div class="detail-label">⏰ Expected ${event.eventType === 'Incident' ? 'Resolution' : 'Completion'}</div>
                    <div class="detail-value">${formatDate(event.toTimestamp)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">📊 Impact Level</div>
                    <div class="detail-value">${event.impact}</div>
                </div>
            </div>

            <!-- Description -->
            <div class="description-card">
                <h3 class="description-title">${event.eventType === 'Incident' ? '🔍 What\'s Happening?' : '✨ What\'s New?'}</h3>
                <p class="description-text">${event.description}</p>
            </div>

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-card">
                <h3 class="systems-title">🖥️ ${event.eventType === 'Incident' ? 'Affected Systems' : 'Updated Systems'}</h3>
                <div>
                    ${event.systemsAffected.map((system) => `<span class="system-badge">${system}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Action Buttons -->
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="viewDetails()">
                    🔗 View Full Details
                </button>
                <button class="btn btn-secondary" onclick="contactSupport()">
                    📧 Contact Support
                </button>
            </div>

            <!-- Timeline Section -->
            ${event.statusHistory?.length > 0 ? `
            <div class="timeline-section">
                <div class="timeline-header" onclick="toggleTimeline()">
                    <h3 class="timeline-title">📋 ${event.eventType} Timeline (${event.statusHistory.length} updates)</h3>
                    <span class="toggle-icon" id="toggleIcon">▶</span>
                </div>
                <div id="timelineContent" class="timeline-content" style="display: none;">
                    ${event.statusHistory.slice().reverse().slice(0, 5).map((history) => `
                    <div class="timeline-item">
                        <div class="timeline-meta">
                            <div class="timeline-badges">
                                <span class="timeline-badge" style="background-color: ${getStatusColor(history.status)}; color: white;">${history.status}</span>
                                <span class="timeline-badge" style="background-color: hsl(var(--muted)); color: hsl(var(--muted-foreground));">${history.historyType}</span>
                            </div>
                            <div class="timeline-date">${formatDate(history.createdTimestamp)}</div>
                        </div>
                        <p class="timeline-desc">${history.description}</p>
                        <div class="timeline-author">👤 ${history.createdBy} • ${history.createdBySource}</div>
                    </div>
                    `).join('')}
                    ${event.statusHistory.length > 5 ? `
                    <div style="text-align: center; padding: 16px; background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); font-size: 0.875rem; font-weight: 600;">
                        📋 View ${event.statusHistory.length - 5} more updates in dashboard
                    </div>
                    ` : ''}
                </div>
            </div>
            ` : ''}

            <!-- Contact Information -->
            <div class="description-card">
                <h3 class="description-title">👤 Contact Information</h3>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 500; color: hsl(var(--foreground));">${event.createdBy}</span>
                    <span style="color: hsl(var(--muted-foreground)); font-size: 0.75rem; background-color: hsl(var(--muted)); padding: 4px 8px; border-radius: calc(var(--radius) * 0.5);">${event.createdBySource === "Manual" ? "IT Support Team" : "Automated Alert"}</span>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="status-indicator">
                <span class="status-dot"></span>
                <span>Live from JB HI-FI System Dashboard</span>
            </div>
            <p>🔄 Real-time updates • 📊 Dashboard • 📅 Events Calendar</p>
            <p style="margin-top: 8px; opacity: 0.7;">Event ID: ${event.id} • Generated: ${formatDate(new Date().toISOString())}</p>
        </div>
    </div>
</body>
</html>
  `;

  return (
    <div className="w-full">
      <div className="mb-4 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Preview Data Structure:</h3>
        <pre className="text-xs overflow-auto bg-background p-2 rounded border">
{JSON.stringify({
  id: event.id,
  title: event.title,
  eventType: event.eventType,
  status: event.status,
  impact: event.impact,
  application: event.application,
  description: event.description,
  systemsAffected: event.systemsAffected,
  fromTimestamp: event.fromTimestamp,
  toTimestamp: event.toTimestamp,
  createdBy: event.createdBy,
  createdBySource: event.createdBySource,
  statusHistory: event.statusHistory?.slice(0, 2)
}, null, 2)}
        </pre>
      </div>
      <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
    </div>
  );
};
