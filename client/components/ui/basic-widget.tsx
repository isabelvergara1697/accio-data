import React, { useState } from "react";
import { WidgetContainer } from "./widget-container";

interface BasicWidgetProps {
  /** Widget unique identifier */
  id: string;
  /** Widget position in the layout */
  position?: number;
  /** Widget size */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Optional resize handler */
  onResize?: (id: string, newSize: "xs" | "sm" | "md" | "lg" | "xl") => void;
  /** Optional remove handler */
  onRemove?: (id: string) => void;
  /** Whether this is mobile view */
  isMobile?: boolean;
  /** Whether this is tablet view */
  isTablet?: boolean;
  /** Window width for responsive behavior */
  windowWidth?: number;
  /** Widget type for different content */
  widgetType?: "chart" | "stats" | "activity" | "notes";
}

interface StatItem {
  label: string;
  value: string;
  trend?: "up" | "down";
  percentage?: string;
}

export const BasicWidget: React.FC<BasicWidgetProps> = ({
  id,
  position,
  size,
  onResize,
  onRemove,
  isMobile,
  isTablet,
  windowWidth,
  widgetType = "stats",
}) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const getWidgetConfig = () => {
    switch (widgetType) {
      case "chart":
        return {
          title: "Performance Chart",
          helpTooltip: "View performance metrics over time",
        };
      case "activity":
        return {
          title: "Recent Activity",
          helpTooltip: "View recent activity and updates",
        };
      case "notes":
        return {
          title: "Quick Notes",
          helpTooltip: "Add and manage quick notes",
        };
      default:
        return {
          title: "Key Statistics",
          helpTooltip: "View important statistics and metrics",
        };
    }
  };

  const renderStatsContent = () => {
    const stats: StatItem[] = [
      { label: "Total Users", value: "2,847", trend: "up", percentage: "12%" },
      { label: "Revenue", value: "$45,231", trend: "up", percentage: "8%" },
      { label: "Conversions", value: "23.5%", trend: "down", percentage: "3%" },
      { label: "Growth Rate", value: "15.2%", trend: "up", percentage: "5%" },
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: "1 0 0",
          alignSelf: "stretch",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              padding: "12px",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "8px",
              background: hoveredItem === index ? "#F9FAFB" : "transparent",
              border:
                hoveredItem === index
                  ? "1px solid #E9EAEB"
                  : "1px solid transparent",
              transition: "all 0.2s ease-in-out",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: "600",
                  lineHeight: "28px",
                }}
              >
                {stat.value}
              </div>
            </div>
            {stat.trend && stat.percentage && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  background: stat.trend === "up" ? "#ECFDF3" : "#FEF2F2",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    transform:
                      stat.trend === "down" ? "rotate(180deg)" : "none",
                  }}
                >
                  <path
                    d="M6 2.5L9.5 6L6 9.5"
                    stroke={stat.trend === "up" ? "#10B981" : "#EF4444"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    color: stat.trend === "up" ? "#10B981" : "#EF4444",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontWeight: "500",
                    lineHeight: "16px",
                  }}
                >
                  {stat.percentage}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderChartContent = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: "1 0 0",
          gap: "16px",
          padding: "32px",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#FFF",
              fontFamily: "Public Sans",
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "32px",
            }}
          >
            73%
          </div>
        </div>
        <div
          style={{
            color: "#535862",
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            textAlign: "center",
          }}
        >
          Performance Score
        </div>
      </div>
    );
  };

  const renderActivityContent = () => {
    const activities = [
      { action: "New user registered", time: "2 minutes ago", type: "user" },
      {
        action: "Order #12345 completed",
        time: "15 minutes ago",
        type: "order",
      },
      { action: "Payment received", time: "1 hour ago", type: "payment" },
      { action: "System update deployed", time: "3 hours ago", type: "system" },
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: "1 0 0",
          alignSelf: "stretch",
        }}
      >
        {activities.map((activity, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px",
              borderRadius: "6px",
              background: hoveredItem === index ? "#F9FAFB" : "transparent",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background:
                  activity.type === "user"
                    ? "#3B82F6"
                    : activity.type === "order"
                      ? "#10B981"
                      : activity.type === "payment"
                        ? "#F59E0B"
                        : "#6B7280",
              }}
            />
            <div style={{ flex: "1 0 0" }}>
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                }}
              >
                {activity.action}
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNotesContent = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: "1 0 0",
          alignSelf: "stretch",
        }}
      >
        <textarea
          placeholder="Add a quick note..."
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "12px",
            border: "1px solid #D5D7DA",
            borderRadius: "8px",
            fontFamily: "Public Sans",
            fontSize: "14px",
            lineHeight: "20px",
            resize: "vertical",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#34479A";
            e.target.style.boxShadow = "0 0 0 1px #34479A";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#D5D7DA";
            e.target.style.boxShadow = "none";
          }}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              color: "#414651",
              fontFamily: "Public Sans",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #D5D7DA",
              background: "#F9FAFB",
              color: "#6B7280",
              fontFamily: "Public Sans",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (widgetType) {
      case "chart":
        return renderChartContent();
      case "activity":
        return renderActivityContent();
      case "notes":
        return renderNotesContent();
      default:
        return renderStatsContent();
    }
  };

  const config = getWidgetConfig();

  return (
    <WidgetContainer
      id={id}
      title={config.title}
      position={position}
      size={size}
      helpTooltip={config.helpTooltip}
      onSeeAllClick={() => console.log(`See All ${config.title} clicked`)}
      onDownloadChart={() =>
        console.log(`Download ${config.title} Chart clicked`)
      }
      onRemoveWidget={() => onRemove && onRemove(id)}
      onResize={onResize}
      isMobile={isMobile}
      isTablet={isTablet}
      windowWidth={windowWidth}
    >
      {renderContent()}
    </WidgetContainer>
  );
};
