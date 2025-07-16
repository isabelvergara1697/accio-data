import React from "react";
import { MiniChart } from "./mini-chart";

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

  const trendIcon =
    trend.direction === "up" ? (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "14px", height: "14px" }}
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
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "16px", height: "16px" }}
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
              minWidth: "200px",
              maxWidth: "300px",
            }),
        padding: "16px 12px 12px 16px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
        borderRadius: "12px",
        border: "1px solid #E9EAEB",
        background: "#FFF",
        boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        position: "relative",
      }}
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
            flex: "1 0 0",
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

        {/* Chart section */}
        <MiniChart
          trend={chartTrend}
          backgroundColor={backgroundColor}
          lineColor={lineColor}
          variant={variant}
        />
      </div>
    </div>
  );
};
