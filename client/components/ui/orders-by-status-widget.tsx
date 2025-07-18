import React from "react";
import { WidgetContainer } from "./widget-container";

interface OrdersData {
  label: string;
  value: number;
  color: string;
}

interface OrdersByStatusWidgetProps {
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

const ordersData: OrdersData[] = [
  { label: "Completed", value: 35, color: "#3CCB7F" },
  { label: "Pending", value: 25, color: "#F38744" },
  { label: "Updated", value: 15, color: "#53B1FD" },
  { label: "Unordered", value: 12, color: "#9B8AFB" },
  { label: "Reviewed", value: 8, color: "#F670C7" },
  { label: "Archived", value: 5, color: "#A4A7AE" },
];

const PieChart: React.FC<{ data: OrdersData[]; size: number }> = ({
  data,
  size,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size - 30) / 2; // Leave space for borders
  const innerRadius = radius * 0.6; // 60% inner radius for donut effect

  let currentAngle = -90; // Start from top

  const createPath = (
    startAngle: number,
    endAngle: number,
    outerR: number,
    innerR: number,
  ) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const x1 = centerX + outerR * Math.cos(startAngleRad);
    const y1 = centerY + outerR * Math.sin(startAngleRad);
    const x2 = centerX + outerR * Math.cos(endAngleRad);
    const y2 = centerY + outerR * Math.sin(endAngleRad);

    const x3 = centerX + innerR * Math.cos(endAngleRad);
    const y3 = centerY + innerR * Math.sin(endAngleRad);
    const x4 = centerX + innerR * Math.cos(startAngleRad);
    const y4 = centerY + innerR * Math.sin(startAngleRad);

    return [
      "M",
      x1,
      y1,
      "A",
      outerR,
      outerR,
      0,
      largeArcFlag,
      1,
      x2,
      y2,
      "L",
      x3,
      y3,
      "A",
      innerR,
      innerR,
      0,
      largeArcFlag,
      0,
      x4,
      y4,
      "Z",
    ].join(" ");
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((segment, index) => {
        const percentage = (segment.value / total) * 100;
        const angle = (percentage / 100) * 360;
        const path = createPath(
          currentAngle,
          currentAngle + angle,
          radius,
          innerRadius,
        );

        const pathElement = (
          <path
            key={index}
            d={path}
            fill={segment.color}
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="0.5"
          />
        );

        currentAngle += angle;
        return pathElement;
      })}
    </svg>
  );
};

const Legend: React.FC<{ data: OrdersData[]; compact?: boolean }> = ({
  data,
  compact = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: compact ? "2px" : "4px",
      }}
    >
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              paddingTop: compact ? "4px" : "6px",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: item.color,
                border: "0.5px solid rgba(0, 0, 0, 0.1)",
                flexShrink: 0,
              }}
            />
          </div>
          <div
            style={{
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: compact ? "12px" : "14px",
              fontWeight: "400",
              lineHeight: compact ? "16px" : "20px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export const OrdersByStatusWidget: React.FC<OrdersByStatusWidgetProps> = ({
  id,
  position = 0,
  size = "md",
  onResize,
  isMobile = false,
  isTablet = false,
  windowWidth = 1024,
}) => {
  // Determine chart size and layout based on widget size
  const getChartLayout = () => {
    if (isMobile) {
      return {
        chartSize: 200,
        showLegend: true,
        direction: "column" as const,
        compact: true,
      };
    }

    switch (size) {
      case "xs": // ~252px - Very compact: Small chart, no legend
        return {
          chartSize: 160,
          showLegend: false,
          direction: "column" as const,
          compact: true,
        };
      case "sm": // ~300px - Compact: Small chart, compact legend
        return {
          chartSize: 180,
          showLegend: true,
          direction: "column" as const,
          compact: true,
        };
      case "md": // ~400px - Medium: Medium chart, side legend
        return {
          chartSize: 240,
          showLegend: true,
          direction: "row" as const,
          compact: false,
        };
      case "lg": // ~500px - Large: Large chart, side legend
        return {
          chartSize: 280,
          showLegend: true,
          direction: "row" as const,
          compact: false,
        };
      case "xl": // ~600px - Extra Large: Large chart, side legend with more space
        return {
          chartSize: 320,
          showLegend: true,
          direction: "row" as const,
          compact: false,
        };
      default:
        return {
          chartSize: 240,
          showLegend: true,
          direction: "row" as const,
          compact: false,
        };
    }
  };

  const { chartSize, showLegend, direction, compact } = getChartLayout();

  return (
    <WidgetContainer
      id={id}
      title="Orders by Status"
      position={position}
      size={size}
      helpTooltip="View distribution of orders by their current status"
      onSeeAllClick={() => console.log("See All Orders clicked")}
      onDownloadChart={() => console.log("Download Chart clicked")}
      onRemoveWidget={() => console.log("Remove Widget clicked")}
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
          alignItems: "flex-start",
          alignSelf: "stretch",
          flex: "1 0 0",
          overflow: "hidden",
          minWidth: 0,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            flex: "1 0 0",
            minWidth: 0,
            position: "relative",
            height: "100%",
            padding: direction === "column" ? "8px" : "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: direction === "row" ? "16px" : "12px",
              flexDirection: direction,
              height: "100%",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {/* Pie Chart */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <PieChart data={ordersData} size={chartSize} />
            </div>

            {/* Legend */}
            {showLegend && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                  flexShrink: direction === "row" ? 0 : 1,
                  minWidth: 0,
                  overflow: "hidden",
                  ...(direction === "column" && {
                    alignSelf: "stretch",
                    paddingTop: "8px",
                  }),
                }}
              >
                <Legend data={ordersData} compact={compact} />
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};
