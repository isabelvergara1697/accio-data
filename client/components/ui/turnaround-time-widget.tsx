import React, { useState, useRef, useEffect } from "react";
import { WidgetContainer } from "./widget-container";

interface TurnaroundTimeWidgetProps {
  /** Whether this is mobile view */
  isMobile?: boolean;
  /** Whether this is tablet view */
  isTablet?: boolean;
  /** Window width for responsive behavior */
  windowWidth?: number;
}

interface ChartData {
  month: string;
  value: number;
  maxValue: number;
  actualValue: number;
  date: string;
}

const mockChartData: ChartData[] = [
  {
    month: "Jan",
    value: 191,
    maxValue: 373,
    actualValue: 1218,
    date: "Jan 10, 2025",
  },
  {
    month: "Feb",
    value: 113,
    maxValue: 373,
    actualValue: 856,
    date: "Feb 10, 2025",
  },
  {
    month: "Mar",
    value: 351,
    maxValue: 373,
    actualValue: 2456,
    date: "Mar 10, 2025",
  },
  {
    month: "Apr",
    value: 160,
    maxValue: 373,
    actualValue: 1123,
    date: "Apr 10, 2025",
  },
  {
    month: "May",
    value: 287,
    maxValue: 373,
    actualValue: 1876,
    date: "May 10, 2025",
  },
  {
    month: "Jun",
    value: 191,
    maxValue: 373,
    actualValue: 1234,
    date: "Jun 10, 2025",
  },
  {
    month: "Jul",
    value: 351,
    maxValue: 373,
    actualValue: 2398,
    date: "Jul 10, 2025",
  },
  {
    month: "Aug",
    value: 351,
    maxValue: 373,
    actualValue: 2467,
    date: "Aug 10, 2025",
  },
  {
    month: "Sep",
    value: 226,
    maxValue: 373,
    actualValue: 1567,
    date: "Sep 10, 2025",
  },
  {
    month: "Oct",
    value: 206,
    maxValue: 373,
    actualValue: 1389,
    date: "Oct 10, 2025",
  },
  {
    month: "Nov",
    value: 226,
    maxValue: 373,
    actualValue: 1598,
    date: "Nov 10, 2025",
  },
  {
    month: "Dec",
    value: 191,
    maxValue: 373,
    actualValue: 1267,
    date: "Dec 10, 2025",
  },
];

interface BarChartProps {
  isMobile?: boolean;
  isTablet?: boolean;
  windowWidth?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  isMobile = false,
  isTablet = false,
  windowWidth = 1024,
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    data: ChartData;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate responsive dimensions
  const getChartDimensions = () => {
    if (isMobile) {
      return {
        width: Math.max(400, mockChartData.length * 40), // Min width for horizontal scroll
        containerWidth: "100%",
        barMinWidth: "16px",
        barSpacing: "2px",
        overflow: "auto" as const,
      };
    } else if (isTablet) {
      return {
        width: "100%",
        containerWidth: "100%",
        barMinWidth: "20px",
        barSpacing: "4px",
        overflow: "hidden" as const,
      };
    } else {
      return {
        width: "100%",
        containerWidth: "100%",
        barMinWidth: "24px",
        barSpacing: "6px",
        overflow: "hidden" as const,
      };
    }
  };

  const dimensions = getChartDimensions();

  const handleBarHover = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setHoveredBar(index);
      setTooltip({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 10,
        data: mockChartData[index],
      });
    }
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
    setTooltip(null);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        padding: "16px 12px",
        justifyContent: "center",
        alignItems: "flex-end",
        flex: "1 0 0",
        alignSelf: "stretch",
        position: "relative",
        overflow: dimensions.overflow,
      }}
    >
      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translateX(-50%) translateY(-100%)",
            background: "#0A0D12",
            color: "#FFF",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: "Public Sans",
            boxShadow:
              "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
            zIndex: 1000,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ fontWeight: "600", color: "#FFF" }}>
            {tooltip.data.actualValue.toLocaleString()}
          </div>
          <div style={{ color: "#D5D7DA", fontSize: "12px", marginTop: "2px" }}>
            {tooltip.data.date}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          height: "400px",
          width: dimensions.width,
          minWidth: isMobile ? "400px" : "auto",
          padding: "0px 8px",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Y-axis grid lines */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "373px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  height: "1px",
                  background: "#F5F5F5",
                }}
              />
            ))}
          </div>

          {/* Chart content */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "373px",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: dimensions.barSpacing,
              marginBottom: "27px",
              position: "relative",
            }}
          >
            {mockChartData.map((data, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: "1 1 0",
                  minWidth: dimensions.barMinWidth,
                  position: "relative",
                }}
                onMouseEnter={(e) => handleBarHover(index, e)}
                onMouseLeave={handleBarLeave}
              >
                {/* Hover indicator line */}
                {hoveredBar === index && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "2px",
                        height: "100%",
                        background: "#344698",
                        borderRadius: "1px",
                        zIndex: 10,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: `${373 - data.value - 6}px`,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#344698",
                        border: "2px solid #344698",
                        zIndex: 11,
                      }}
                    />
                  </>
                )}

                {/* Bar */}
                <div
                  style={{
                    height: `${data.value}px`,
                    width: "100%",
                    maxWidth: "32px",
                    borderRadius: "4px",
                    background: hoveredBar === index ? "#B3BCE5" : "#8D9BD8",
                    transition: "background-color 0.2s ease",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}

            {/* Dotted line overlay */}
            <svg
              style={{
                position: "absolute",
                top: "180px",
                left: 0,
                width: "100%",
                height: "162px",
                pointerEvents: "none",
              }}
              preserveAspectRatio="none"
              viewBox="0 0 484 166"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 164.227L20.1762 150.842L39.591 154.762L58.566 107.612L78.0841 138.199L97.2143 102.313L116.735 133.085L136.017 127.404L155.213 96.2715L174.551 113.746L193.784 104.51L212.856 64.3795L232.155 79.0846L251.686 91.4667L270.808 54.9685L290.373 88.9741L309.678 84.8867L328.9 74.8363L347.965 53.4165L367.373 56.8076L386.825 44.2741L406.141 60.2024L425.062 28.3063L444.534 36.332L463.685 1.97241L483 18.2523"
                stroke="#344698"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0.1 6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* X-axis labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: dimensions.barSpacing,
            }}
          >
            {mockChartData.map((data) => (
              <div
                key={data.month}
                style={{
                  color: "#535862",
                  textAlign: "center",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "18px",
                  flex: "1 1 0",
                  minWidth: dimensions.barMinWidth,
                }}
              >
                {data.month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TurnaroundTimeWidget: React.FC<TurnaroundTimeWidgetProps> = ({
  isMobile = false,
  isTablet = false,
  windowWidth = 1024,
}) => {
  return (
    <WidgetContainer
      title="Turnaround Time"
      helpTooltip="View turnaround time metrics and trends"
      onSeeAllClick={() => console.log("See All Turnaround Time clicked")}
      onDownloadChart={() => console.log("Download Turnaround Chart clicked")}
      onRemoveWidget={() => console.log("Remove Turnaround Widget clicked")}
      isMobile={isMobile}
      isTablet={isTablet}
      windowWidth={windowWidth}
    >
      <BarChart
        isMobile={isMobile}
        isTablet={isTablet}
        windowWidth={windowWidth}
      />
    </WidgetContainer>
  );
};
