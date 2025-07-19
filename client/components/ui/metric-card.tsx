import React from "react";
import { MiniChart } from "./mini-chart";
import { useIconSizeEnhanced } from "../../hooks/use-responsive-svg-enhanced";

interface MetricCardProps {
  /** The metric label/title */
  label: string;
  /** The main metric value */
  value: string | number;
  /** The trend indicator */
  trend: {
    /** Direction of the trend */
    direction: "up" | "down";
    /** Percentage value */
    percentage: string;
    /** Color of the trend indicator */
    color?: string;
  };
  /** Chart configuration */
  chart?: {
    /** Trend for chart styling */
    trend?: "positive" | "negative";
    /** Background color */
    backgroundColor?: string;
    /** Line color */
    lineColor?: string;
    /** Chart variation pattern */
    variant?: "default" | "variant1" | "variant2" | "variant3";
  };
  /** Whether this is mobile view */
  isMobile?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  chart = {},
  isMobile = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Enhanced responsive icon sizes for trend arrows
  const trendIconSize = useIconSizeEnhanced(14, {
    containerAware: true,
    minSize: 10,
    maxSize: 16,
    breakpoints: {
      mobile: 768,
      tablet: 1200, // Match Dashboard breakpoint
    },
  });

  const {
    trend: chartTrend = "positive",
    backgroundColor = "#344698",
    lineColor = "#344698",
    variant = "default",
  } = chart;

  const trendColor =
    trend.direction === "up"
      ? trend.color || "#079455"
      : trend.color || "#D92D20";

  // Hover state styling functions
  const getCardBorder = () => {
    return isHovered ? "1px solid #D5D7DA" : "1px solid #E9EAEB";
  };

  const getCardShadow = () => {
    return isHovered
      ? "0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px rgba(10, 13, 18, 0.10)"
      : "0px 1px 2px 0px rgba(10, 13, 18, 0.05)";
  };

  const getCardBackground = () => {
    return isHovered ? "#F8F9FA" : "#FFF";
  };

  const trendIcon =
    trend.direction === "up" ? (
      <svg
        width={trendIconSize.width}
        height={trendIconSize.height}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={trendIconSize.style}
        className={trendIconSize.className}
      >
        <path
          d="M6.99984 11.0832V2.9165M6.99984 2.9165L2.9165 6.99984M6.99984 2.9165L11.0832 6.99984"
          stroke="#17B26A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        width={trendIconSize.width}
        height={trendIconSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={trendIconSize.style}
        className={trendIconSize.className}
      >
        <path
          d="M8.00016 3.3335V12.6668M8.00016 12.6668L12.6668 8.00016M8.00016 12.6668L3.3335 8.00016"
          stroke="#F04438"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  return (
    <div
      style={{
        display: "flex",
        ...(isMobile
          ? { width: "100%" }
          : {
              flex: "1 1 0",
              minWidth: "240px", // Slightly larger minimum for tablet charts
              maxWidth: "100%",
            }),
        padding: "16px 12px 12px 16px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
        borderRadius: "12px",
        border: getCardBorder(),
        background: getCardBackground(),
        boxShadow: getCardShadow(),
        position: "relative",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden", // Add overflow masking
        boxSizing: "border-box", // Ensure padding is included in width calculations
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "24px",
          alignSelf: "stretch",
          position: "relative",
        }}
      >
        {/* Number and badge section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "12px",
            flex: "0 0 auto", // Don't expand, use natural width
            minWidth: "120px", // Ensure adequate space for numbers
            position: "relative",
          }}
        >
          {/* Label */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "20px",
              position: "relative",
            }}
          >
            {label}
          </div>

          {/* Number and trend */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "8px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Main number */}
            <div
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "30px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "38px",
                position: "relative",
              }}
            >
              {value}
            </div>

            {/* Trend indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2px",
                  position: "relative",
                }}
              >
                {trendIcon}
                <div
                  style={{
                    color: trendColor,
                    textAlign: "center",
                    fontFamily: "Public Sans",
                    fontSize: trend.direction === "down" ? "14px" : "12px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: trend.direction === "down" ? "20px" : "18px",
                    position: "relative",
                  }}
                >
                  {trend.percentage}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart section - allow SVG to scale naturally */}
        <div
          style={{
            height: "56px",
            flex: "1 1 auto", // Take remaining space
            position: "relative",
            minWidth: "103px", // Match SVG viewBox width
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center the chart
          }}
        >
          <MiniChart
            trend={chartTrend}
            backgroundColor={backgroundColor}
            lineColor={lineColor}
            variant={variant}
          />
        </div>
      </div>
    </div>
  );
};
