
import { Badge } from "@/components/ui/badge";

interface EmailTemplateReleaseModernProps {
  event: any;
}

export const EmailTemplateReleaseModern = ({ event }: EmailTemplateReleaseModernProps) => {
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
    <title>JB HI-FI Release Notification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
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
            box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04);
            border: 2px solid #c4b5fd;
        }
        .header {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="rocket" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="12.5" cy="12.5" r="2" fill="rgba(255,255,255,0.1)"/><path d="M 8 12.5 L 17 12.5 M 12.5 8 L 12.5 17" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23rocket)"/></svg>');
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
        .release-badge {
            background: rgba(255, 255, 255, 0.95);
            color: #7c3aed;
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
            animation: bounce 2s infinite;
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        .content {
            padding: 32px 24px;
        }
        .release-card {
            background: linear-gradient(135deg, #faf5ff 0%, white 100%);
            border: 2px solid #c4b5fd;
            border-left: 6px solid #8b5cf6;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
        }
        .release-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent);
            border-radius: 0 16px 0 50%;
        }
        .release-card::after {
            content: '🚀';
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 32px;
            opacity: 0.3;
            z-index: 1;
        }
        .release-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 12px;
        }
        .release-title {
            color: #7c3aed;
            font-size: 20px;
            font-weight: 700;
            margin: 0;
            flex: 1;
            position: relative;
            z-index: 2;
        }
        .status-pill {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: white;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3);
            position: relative;
            z-index: 2;
        }
        .release-description {
            color: #581c87;
            font-size: 16px;
            line-height: 1.6;
            margin: 0;
            position: relative;
            z-index: 2;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }
        .feature-card {
            background: white;
            border: 2px solid #e9d5ff;
            border-radius: 16px;
            padding: 20px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
        }
        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #8b5cf6, #a855f7);
        }
        .feature-icon {
            font-size: 24px;
            margin-bottom: 12px;
            display: block;
        }
        .feature-title {
            color: #7c3aed;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .feature-description {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.5;
        }
        .whats-new-section {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 2px solid #10b981;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            position: relative;
        }
        .whats-new-section::before {
            content: '✨';
            position: absolute;
            top: -10px;
            left: 20px;
            background: #10b981;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }
        .whats-new-title {
            color: #047857;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 16px;
            padding-left: 20px;
        }
        .improvement-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            margin-top: 16px;
        }
        .improvement-item {
            background: white;
            border: 1px solid #a7f3d0;
            border-radius: 10px;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #047857;
            font-weight: 500;
        }
        .systems-section {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px solid #3b82f6;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
        }
        .systems-title {
            color: #1e40af;
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
            background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
            color: #1e40af;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border: 1px solid #93c5fd;
        }
        .deployment-info {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #f59e0b;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            text-align: center;
        }
        .deployment-title {
            color: #92400e;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .deployment-details {
            color: #92400e;
            font-size: 16px;
            font-weight: 600;
        }
        .celebration-actions {
            text-align: center;
            margin-bottom: 32px;
            padding: 20px;
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
            border-radius: 16px;
            border: 2px solid #c4b5fd;
        }
        .celebration-title {
            color: #7c3aed;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            text-decoration: none;
            margin: 8px;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
        }
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }
        .action-button.secondary {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            color: #374151;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .timeline-section {
            background: white;
            border: 2px solid #c4b5fd;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 32px;
        }
        .timeline-header {
            background: linear-gradient(135deg, #581c87 0%, #6d28d9 100%);
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
            border-bottom: 1px solid #e9d5ff;
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
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        .timeline-date {
            color: #581c87;
            font-size: 14px;
            font-weight: 500;
        }
        .timeline-title {
            color: #7c3aed;
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
            border-top: 2px solid #c4b5fd;
        }
        .footer-logo {
            color: #7c3aed;
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
            .features-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            .improvement-list {
                grid-template-columns: 1fr;
            }
            .release-header {
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
            <div class="release-badge">
                <span>🚀</span>
                NEW RELEASE DEPLOYED
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Release Card -->
            <div class="release-card">
                <div class="release-header">
                    <h2 class="release-title">${event.title}</h2>
                    <div class="status-pill">${event.status}</div>
                </div>
                <p class="release-description">${event.description}</p>
            </div>

            <!-- Features Grid -->
            <div class="features-grid">
                <div class="feature-card">
                    <span class="feature-icon">⚡</span>
                    <div class="feature-title">Performance</div>
                    <div class="feature-description">Enhanced speed and optimization</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">✨</span>
                    <div class="feature-title">New Features</div>
                    <div class="feature-description">Exciting new capabilities added</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🛡️</span>
                    <div class="feature-title">Security</div>
                    <div class="feature-description">Latest security improvements</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🐛</span>
                    <div class="feature-title">Bug Fixes</div>
                    <div class="feature-description">Resolved issues and stability</div>
                </div>
            </div>

            <!-- What's New Section -->
            <div class="whats-new-section">
                <h3 class="whats-new-title">What's New in This Release</h3>
                <p style="color: #047857; margin-bottom: 16px;">This release brings significant improvements and new features to enhance your experience.</p>
                <div class="improvement-list">
                    <div class="improvement-item">
                        <span>✅</span>
                        Improved user interface
                    </div>
                    <div class="improvement-item">
                        <span>✅</span>
                        Enhanced performance
                    </div>
                    <div class="improvement-item">
                        <span>✅</span>
                        New security features
                    </div>
                    <div class="improvement-item">
                        <span>✅</span>
                        Bug fixes and stability
                    </div>
                </div>
            </div>

            <!-- Systems Updated -->
            ${event.systemsAffected?.length > 0 ? `
            <div class="systems-section">
                <h3 class="systems-title">
                    <span>🔧</span>
                    Systems Updated
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

            <!-- Deployment Info -->
            <div class="deployment-info">
                <h3 class="deployment-title">🚀 Deployment Information</h3>
                <div class="deployment-details">
                    Deployed by ${event.createdBy} • ${event.createdBySource} • ${formatDate(event.fromTimestamp)}
                </div>
            </div>

            <!-- Celebration Actions -->
            <div class="celebration-actions">
                <h3 class="celebration-title">🎉 Explore the New Features</h3>
                <a href="#" class="action-button">View Release Notes</a>
                <a href="#" class="action-button secondary">Access Application</a>
            </div>

            <!-- Timeline -->
            ${event.statusHistory?.length > 0 ? `
            <div class="timeline-section">
                <div class="timeline-header">
                    <span>📋</span>
                    Deployment Timeline (${event.statusHistory.length} updates)
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
                            <h4 class="timeline-title">${history.status} - Deployment Update</h4>
                            <p class="timeline-description">${history.description}</p>
                            <div class="timeline-author">
                                Deployed by ${history.createdBy} via ${history.createdBySource}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">🚀 JB HI-FI Release Management</div>
            <p class="footer-text">Continuous improvement and innovation for better user experience</p>
        </div>
    </div>
</body>
</html>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
  );
};
