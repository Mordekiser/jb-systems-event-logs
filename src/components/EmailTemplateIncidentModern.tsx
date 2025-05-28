
import { Badge } from "@/components/ui/badge";

interface EmailTemplateIncidentModernProps {
  event: any;
}

export const EmailTemplateIncidentModern = ({ event }: EmailTemplateIncidentModernProps) => {
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

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JB HI-FI Incident Alert</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
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
            box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04);
            border: 2px solid #fecaca;
        }
        .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="warning" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 10 0 L 20 17.32 L 0 17.32 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23warning)"/></svg>');
            opacity: 0.3;
        }
        .logo {
            font-size: 32px;
            font-weight: 800;
            color: white;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
        }
        .alert-badge {
            background: rgba(255, 255, 255, 0.95);
            color: #dc2626;
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
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        .content {
            padding: 32px 24px;
        }
        .incident-card {
            background: linear-gradient(135deg, #fef2f2 0%, white 100%);
            border: 2px solid #fecaca;
            border-left: 6px solid #ef4444;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
        }
        .incident-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), transparent);
            border-radius: 0 16px 0 100%;
        }
        .incident-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 12px;
        }
        .incident-title {
            color: #dc2626;
            font-size: 20px;
            font-weight: 700;
            margin: 0;
            flex: 1;
            position: relative;
            z-index: 1;
        }
        .severity-pill {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
            position: relative;
            z-index: 1;
        }
        .incident-description {
            color: #7f1d1d;
            font-size: 16px;
            line-height: 1.6;
            margin: 0;
            position: relative;
            z-index: 1;
        }
        .critical-info {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border: 2px solid #f87171;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 24px;
            position: relative;
        }
        .critical-info::before {
            content: '⚠️';
            position: absolute;
            top: -10px;
            left: 20px;
            background: #ef4444;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }
        .critical-title {
            color: #dc2626;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
            padding-left: 20px;
        }
        .impact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }
        .impact-card {
            background: white;
            border: 2px solid #fecaca;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .impact-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ef4444, #f87171);
        }
        .impact-icon {
            font-size: 24px;
            margin-bottom: 8px;
            display: block;
        }
        .impact-label {
            color: #dc2626;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        .impact-value {
            color: #111827;
            font-size: 16px;
            font-weight: 700;
        }
        .systems-section {
            background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
            border: 1px solid #fecaca;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
        }
        .systems-title {
            color: #dc2626;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .systems-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .system-tag {
            background: linear-gradient(135deg, #fecaca 0%, #f87171 100%);
            color: #7f1d1d;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border: 1px solid #f87171;
        }
        .response-section {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 2px solid #10b981;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            text-align: center;
        }
        .response-title {
            color: #047857;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .response-info {
            color: #047857;
            font-size: 16px;
            font-weight: 600;
        }
        .emergency-actions {
            text-align: center;
            margin-bottom: 32px;
            padding: 20px;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 16px;
            border: 2px solid #f59e0b;
        }
        .emergency-title {
            color: #92400e;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            text-decoration: none;
            margin: 8px;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
        }
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
        }
        .action-button.secondary {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            color: #374151;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .timeline-section {
            background: white;
            border: 2px solid #fecaca;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 32px;
        }
        .timeline-header {
            background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%);
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
            border-bottom: 1px solid #fecaca;
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
            background: linear-gradient(135deg, #ef4444, #dc2626);
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
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        .timeline-date {
            color: #7f1d1d;
            font-size: 14px;
            font-weight: 500;
        }
        .timeline-title {
            color: #dc2626;
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
            border-top: 2px solid #fecaca;
        }
        .footer-logo {
            color: #dc2626;
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
            .impact-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            .incident-header {
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
            <div class="alert-badge">
                <span>🚨</span>
                CRITICAL INCIDENT ALERT
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Incident Card -->
            <div class="incident-card">
                <div class="incident-header">
                    <h2 class="incident-title">${event.title}</h2>
                    <div class="severity-pill">${event.impact} Impact</div>
                </div>
                <p class="incident-description">${event.description}</p>
            </div>

            <!-- Critical Information -->
            <div class="critical-info">
                <h3 class="critical-title">Immediate Action Required</h3>
                <p style="color: #7f1d1d; margin: 0;">This incident requires immediate attention from the technical team. Please review the details below and take appropriate action.</p>
            </div>

            <!-- Impact Grid -->
            <div class="impact-grid">
                <div class="impact-card">
                    <span class="impact-icon">🚨</span>
                    <div class="impact-label">Status</div>
                    <div class="impact-value">${event.status}</div>
                </div>
                <div class="impact-card">
                    <span class="impact-icon">⏰</span>
                    <div class="impact-label">Started</div>
                    <div class="impact-value">${formatDate(event.fromTimestamp)}</div>
                </div>
                <div class="impact-card">
                    <span class="impact-icon">📊</span>
                    <div class="impact-label">Severity</div>
                    <div class="impact-value">${event.impact}</div>
                </div>
                <div class="impact-card">
                    <span class="impact-icon">🏢</span>
                    <div class="impact-label">Application</div>
                    <div class="impact-value">${event.application || 'Multiple'}</div>
                </div>
            </div>

            <!-- Systems Affected -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-section">
                <h3 class="systems-title">
                    <span>⚙️</span>
                    Critical Systems Affected
                </h3>
                <div class="systems-grid">
                    ${event.systemsAffected.map((system: string) => `
                        <span class="system-tag">
                            <span>🔧</span>
                            ${system}
                        </span>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Response Team -->
            <div class="response-section">
                <h3 class="response-title">🛡️ Incident Response Team</h3>
                <div class="response-info">
                    ${event.createdBy} • ${event.createdBySource} • Incident Lead
                </div>
            </div>

            <!-- Emergency Actions -->
            <div class="emergency-actions">
                <h3 class="emergency-title">⚡ Emergency Response</h3>
                <a href="#" class="action-button">Access Incident Dashboard</a>
                <a href="#" class="action-button secondary">Contact Emergency Team</a>
            </div>

            <!-- Timeline -->
            ${event.statusHistory?.length > 0 ? `
            <div class="timeline-section">
                <div class="timeline-header">
                    <span>📋</span>
                    Incident Timeline (${event.statusHistory.length} updates)
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
                            <h4 class="timeline-title">${history.status} - Critical Update</h4>
                            <p class="timeline-description">${history.description}</p>
                            <div class="timeline-author">
                                Response by ${history.createdBy} via ${history.createdBySource}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">🚨 JB HI-FI Emergency Response</div>
            <p class="footer-text">Critical incident monitoring and response system</p>
        </div>
    </div>
</body>
</html>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
  );
};
