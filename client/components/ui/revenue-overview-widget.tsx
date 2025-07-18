import React, { useState } from "react";
import { WidgetContainer } from "./widget-container";

interface RevenueData {
  month: string;
  revenue: number;
  color: string;
}

interface RevenueOverviewWidgetProps {
  /** Widget unique identifier */
  id: string;
  /** Widget position in the layout */
  position?: number;
  /** Widget size */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Optional resize handler */
  onResize?: (id: string, newSize: "xs" | "sm" | "md" | "lg" | "xl") => void;
  /** Whether this is mobile view */
  isMobile?: boolean;
  /** Whether this is tablet view */
  isTablet?: boolean;
  /** Window width for responsive behavior */
  windowWidth?: number;
}

const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 45000, color: "#3CCB7F" },
  { month: "Feb", revenue: 52000, color: "#53B1FD" },
  { month: "Mar", revenue: 38000, color: "#F38744" },
  { month: "Apr", revenue: 61000, color: "#9B8AFB" },
  { month: "May", revenue: 55000, color: "#F670C7" },
  { month: "Jun", revenue: 67000, color: "#34479A" },
];

interface BarChartProps {
  data: RevenueData[];
  maxHeight: number;
  onBarHover?: (data: RevenueData | null, event?: React.MouseEvent) => void;
}

const BarChart: React.FC<BarChartProps> = ({ data, maxHeight, onBarHover }) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const barWidth = 40;
  const barSpacing = 8;
  const chartWidth = data.length * (barWidth + barSpacing) - barSpacing;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: `${barSpacing}px`,
        height: `${maxHeight}px`,
        minWidth: `${chartWidth}px`,
      }}
    >
      {data.map((item, index) => {
        const barHeight = (item.revenue / maxRevenue) * (maxHeight - 40); // Leave space for labels
        const isHovered = hoveredBar === index;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* Bar */}
            <div
              style={{
                width: `${barWidth}px`,
                height: `${barHeight}px`,
                backgroundColor: item.color,
                borderRadius: "4px 4px 0 0",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                opacity: isHovered ? 0.8 : 1,
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isHovered
                  ? "0 4px 8px rgba(0, 0, 0, 0.15)"
                  : "0 1px 3px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                setHoveredBar(index);
                onBarHover?.(item, e);
              }}
              onMouseLeave={() => {
                setHoveredBar(null);
                onBarHover?.(null);
              }}
            >
              {/* Dark overlay when hovered */}
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "4px 4px 0 0",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            {/* Month Label */}
            <div
              style={{
                color: isHovered ? "#181D27" : "#535862",
                fontFamily: "Public Sans",
                fontSize: "12px",
                fontWeight: isHovered ? "600" : "400",
                lineHeight: "16px",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {item.month}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const RevenueOverviewWidget: React.FC<RevenueOverviewWidgetProps> = ({
  id,
  position = 0,
  size = "md",
  onResize,
  isMobile = false,
  isTablet = false,
  windowWidth = 1024,
}) => {
  const [hoveredBar, setHoveredBar] = useState<RevenueData | null>(null);

  // Determine chart layout based on breakpoint and size
  const getChartLayout = () => {
    if (isMobile) {
      return {
        maxHeight: 120,
        showValues: false,
      };
    }

    if (isTablet) {
      return {
        maxHeight: 160,
        showValues: true,
      };
    }

    // Desktop: Responsive based on widget size
    switch (size) {
      case "xs":
        return { maxHeight: 100, showValues: false };
      case "sm":
        return { maxHeight: 120, showValues: false };
      case "md":
        return { maxHeight: 160, showValues: true };
      case "lg":
        return { maxHeight: 180, showValues: true };
      case "xl":
        return { maxHeight: 200, showValues: true };
      default:
        return { maxHeight: 160, showValues: true };
    }
  };

  const { maxHeight, showValues } = getChartLayout();

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000).toFixed(0)}k`;
  };

  return (
    <WidgetContainer
      id={id}
      title="Revenue Overview"
      position={position}
      size={size}
      helpTooltip="Monthly revenue performance and trends"
      onSeeAllClick={() => console.log("See All Revenue clicked")}
      onDownloadChart={() => console.log("Download Revenue Chart clicked")}
      onRemoveWidget={() => console.log("Remove Revenue Widget clicked")}
      onResize={onResize}
      isMobile={isMobile}
      isTablet={isTablet}
      windowWidth={windowWidth}
    >
      {/* Chart Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignSelf: "stretch",
          flex: "1 0 0",
          overflow: "hidden",
          minWidth: 0,
          height: "100%",
          padding: "16px 12px",
          position: "relative",
        }}
      >
        {/* Chart */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "1 0 0",
            width: "100%",
            position: "relative",
          }}
        >
          <BarChart
            data={revenueData}
            maxHeight={maxHeight}
            onBarHover={(data, event) => {
              setHoveredBar(data);
            }}
          />

          {/* Tooltip */}
          {hoveredBar && (
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#0A0D12",
                color: "#FFF",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                lineHeight: "18px",
                boxShadow:
                  "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
                pointerEvents: "none",
                zIndex: 1000,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "Public Sans" }}>
                {hoveredBar.month} - {formatCurrency(hoveredBar.revenue)}
              </div>
              <div
                style={{
                  color: "#D5D7DA",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginTop: "2px",
                }}
              >
                See Details
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {showValues && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: "1px solid #E9EAEB",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                Total
              </div>
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                }}
              >
                {formatCurrency(
                  revenueData.reduce((sum, item) => sum + item.revenue, 0),
                )}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                Avg/Month
              </div>
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                }}
              >
                {formatCurrency(
                  revenueData.reduce((sum, item) => sum + item.revenue, 0) /
                    revenueData.length,
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};
