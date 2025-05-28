
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Clock, User, MapPin, AlertCircle, Shield } from "lucide-react";

interface EmailTemplateVariantsProps {
  event: any;
  variant: string;
}

export const EmailTemplateVariants = ({ event, variant }: EmailTemplateVariantsProps) => {
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

  const getVariantStyles = (variantName: string) => {
    const variants = {
      // Variant 1: Ocean Blue
      "ocean": {
        headerBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBg: "#f0f8ff",
        borderColor: "#4682b4",
        textColor: "#1e3a8a",
        accentColor: "#0ea5e9"
      },
      // Variant 2: Sunset Orange
      "sunset": {
        headerBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        cardBg: "#fff7ed",
        borderColor: "#fb923c",
        textColor: "#c2410c",
        accentColor: "#ea580c"
      },
      // Variant 3: Forest Green
      "forest": {
        headerBg: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
        cardBg: "#f0fdf4",
        borderColor: "#22c55e",
        textColor: "#166534",
        accentColor: "#16a34a"
      },
      // Variant 4: Purple Galaxy
      "galaxy": {
        headerBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBg: "#faf5ff",
        borderColor: "#a855f7",
        textColor: "#7c3aed",
        accentColor: "#9333ea"
      },
      // Variant 5: Crimson Red
      "crimson": {
        headerBg: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
        cardBg: "#fef2f2",
        borderColor: "#ef4444",
        textColor: "#dc2626",
        accentColor: "#b91c1c"
      },
      // Variant 6: Midnight Dark
      "midnight": {
        headerBg: "linear-gradient(135deg, #2c3e50 0%, #4a6741 100%)",
        cardBg: "#1f2937",
        borderColor: "#374151",
        textColor: "#e5e7eb",
        accentColor: "#6b7280"
      },
      // Variant 7: Golden Honey
      "honey": {
        headerBg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        cardBg: "#fffbeb",
        borderColor: "#f59e0b",
        textColor: "#d97706",
        accentColor: "#b45309"
      },
      // Variant 8: Teal Wave
      "teal": {
        headerBg: "linear-gradient(135deg, #4fd1c7 0%, #06b6d4 100%)",
        cardBg: "#f0fdfa",
        borderColor: "#14b8a6",
        textColor: "#0f766e",
        accentColor: "#0d9488"
      },
      // Variant 9: Rose Pink
      "rose": {
        headerBg: "linear-gradient(135deg, #fbb6ce 0%, #f9a8d4 100%)",
        cardBg: "#fdf2f8",
        borderColor: "#ec4899",
        textColor: "#be185d",
        accentColor: "#9d174d"
      },
      // Variant 10: Steel Gray
      "steel": {
        headerBg: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
        cardBg: "#f8fafc",
        borderColor: "#64748b",
        textColor: "#334155",
        accentColor: "#475569"
      },
      // Variant 11: Lime Fresh
      "lime": {
        headerBg: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
        cardBg: "#f7fee7",
        borderColor: "#84cc16",
        textColor: "#365314",
        accentColor: "#4d7c0f"
      },
      // Variant 12: Coral Reef
      "coral": {
        headerBg: "linear-gradient(135deg, #ff7875 0%, #ea5753 100%)",
        cardBg: "#fef7f7",
        borderColor: "#f87171",
        textColor: "#b91c1c",
        accentColor: "#dc2626"
      },
      // Variant 13: Electric Blue
      "electric": {
        headerBg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        cardBg: "#eff6ff",
        borderColor: "#3b82f6",
        textColor: "#1e40af",
        accentColor: "#1d4ed8"
      },
      // Variant 14: Lavender Dreams
      "lavender": {
        headerBg: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
        cardBg: "#faf5ff",
        borderColor: "#c084fc",
        textColor: "#7c3aed",
        accentColor: "#8b5cf6"
      },
      // Variant 15: Emerald Shine
      "emerald": {
        headerBg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
        cardBg: "#ecfdf5",
        borderColor: "#10b981",
        textColor: "#047857",
        accentColor: "#059669"
      },
      // Variant 16: Amber Glow
      "amber": {
        headerBg: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
        cardBg: "#fffbeb",
        borderColor: "#fbbf24",
        textColor: "#92400e",
        accentColor: "#b45309"
      },
      // Variant 17: Indigo Night
      "indigo": {
        headerBg: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        cardBg: "#eef2ff",
        borderColor: "#6366f1",
        textColor: "#3730a3",
        accentColor: "#4338ca"
      },
      // Variant 18: Cyan Fresh
      "cyan": {
        headerBg: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
        cardBg: "#ecfeff",
        borderColor: "#06b6d4",
        textColor: "#0e7490",
        accentColor: "#0891b2"
      },
      // Variant 19: Warm Sunset
      "warm": {
        headerBg: "linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)",
        cardBg: "#fff1f2",
        borderColor: "#fb7185",
        textColor: "#be123c",
        accentColor: "#e11d48"
      },
      // Variant 20: Cool Mint
      "mint": {
        headerBg: "linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)",
        cardBg: "#f0fdf4",
        borderColor: "#6ee7b7",
        textColor: "#047857",
        accentColor: "#10b981"
      }
    };

    return variants[variantName] || variants.ocean;
  };

  const styles = getVariantStyles(variant);

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JB HI-FI Event Notification</title>
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
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: ${styles.headerBg};
            padding: 32px;
            text-align: center;
            color: white;
        }
        .header h1 {
            font-size: 32px;
            font-weight: bold;
            margin: 0 0 12px 0;
        }
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin: 0;
        }
        .content {
            padding: 32px;
            background-color: ${styles.cardBg};
        }
        .event-card {
            background: white;
            border: 2px solid ${styles.borderColor};
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .event-title {
            font-size: 24px;
            font-weight: bold;
            color: ${styles.textColor};
            margin: 0 0 8px 0;
        }
        .event-type {
            background-color: ${styles.accentColor};
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 16px;
        }
        .event-description {
            color: #4b5563;
            font-size: 16px;
            line-height: 1.6;
            margin: 0;
        }
        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .detail-card {
            background: white;
            border: 1px solid ${styles.borderColor};
            border-radius: 8px;
            padding: 20px;
        }
        .detail-label {
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
            margin-bottom: 4px;
        }
        .detail-value {
            font-size: 16px;
            color: ${styles.textColor};
            font-weight: 600;
        }
        .timeline-section {
            background: white;
            border-radius: 12px;
            padding: 24px;
            border: 1px solid ${styles.borderColor};
        }
        .timeline-title {
            font-size: 20px;
            font-weight: bold;
            color: ${styles.textColor};
            margin: 0 0 20px 0;
        }
        .timeline-item {
            border-left: 3px solid ${styles.accentColor};
            padding-left: 16px;
            margin-bottom: 20px;
            position: relative;
        }
        .timeline-item:before {
            content: '';
            width: 12px;
            height: 12px;
            background: ${styles.accentColor};
            border-radius: 50%;
            position: absolute;
            left: -7px;
            top: 8px;
        }
        .timeline-date {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 4px;
        }
        .timeline-desc {
            color: #374151;
            font-size: 14px;
            margin: 0;
        }
        .footer {
            text-align: center;
            padding: 24px;
            background: #f9fafb;
            color: #6b7280;
            font-size: 14px;
        }
        @media only screen and (max-width: 600px) {
            .content { padding: 16px; }
            .details-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>JB HI-FI</h1>
            <p class="header-subtitle">${event.eventType} Notification</p>
        </div>
        
        <div class="content">
            <div class="event-card">
                <div class="event-type">${event.eventType}</div>
                <h2 class="event-title">${event.title}</h2>
                <p class="event-description">${event.description}</p>
            </div>
            
            <div class="details-grid">
                <div class="detail-card">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">${event.status}</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Impact Level</div>
                    <div class="detail-value">${event.impact}</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Start Time</div>
                    <div class="detail-value">${formatDate(event.fromTimestamp)}</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Expected End</div>
                    <div class="detail-value">${formatDate(event.toTimestamp)}</div>
                </div>
            </div>
            
            ${event.statusHistory?.length > 0 ? `
            <div class="timeline-section">
                <h3 class="timeline-title">Event Timeline</h3>
                ${event.statusHistory.slice().reverse().map((history: any) => `
                <div class="timeline-item">
                    <div class="timeline-date">${formatDate(history.createdTimestamp)}</div>
                    <p class="timeline-desc">${history.description}</p>
                </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
        
        <div class="footer">
            <p>JB HI-FI System Status Dashboard</p>
        </div>
    </div>
</body>
</html>
  `;

  return <div dangerouslySetInnerHTML={{ __html: emailHtml }} />;
};
