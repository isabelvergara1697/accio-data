import React from "react";
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
}

const mockChartData: ChartData[] = [
  { month: "Jan", value: 191, maxValue: 373 },
  { month: "Feb", value: 113, maxValue: 373 },
  { month: "Mar", value: 351, maxValue: 373 },
  { month: "Apr", value: 160, maxValue: 373 },
  { month: "May", value: 287, maxValue: 373 },
  { month: "Jun", value: 191, maxValue: 373 },
  { month: "Jul", value: 351, maxValue: 373 },
  { month: "Aug", value: 351, maxValue: 373 },
  { month: "Sep", value: 226, maxValue: 373 },
  { month: "Oct", value: 206, maxValue: 373 },
  { month: "Nov", value: 226, maxValue: 373 },
  { month: "Dec", value: 191, maxValue: 373 },
];

const BarChart: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        padding: "0px 8px",
        justifyContent: "center",
        alignItems: "flex-end",
        flex: "1 0 0",
        alignSelf: "stretch",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "400px",
          padding: "0px 8px",
          justifyContent: "center",
          alignItems: "flex-end",
          flex: "1 0 0",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "1 0 0",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "476px",
              height: "400px",
              alignItems: "flex-start",
              gap: "4px",
              position: "absolute",
              left: "0px",
              top: "0px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: "1 0 0",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* Y-axis lines */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: index === 0 ? "22px" : "17px",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "476px",
                        height: "1px",
                        background: "#F5F5F5",
                        position: "relative",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* X-axis labels */}
              <div
                style={{
                  display: "flex",
                  padding: "0px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignSelf: "stretch",
                  position: "relative",
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
                    }}
                  >
                    {data.month}
                  </div>
                ))}
              </div>

              {/* Chart bars */}
              <div
                style={{
                  width: "476px",
                  height: "373px",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "476px",
                    height: "373px",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexShrink: 0,
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                  }}
                >
                  {mockChartData.map((data, index) => (
                    <div
                      key={index}
                      style={{
                        height: `${data.value}px`,
                        maxWidth: "10px",
                        flex: "1 0 0",
                        borderRadius: "4px",
                        background: "#8D9BD8",
                        position: "relative",
                      }}
                    />
                  ))}
                </div>

                {/* Dotted line overlay */}
                <svg
                  style={{
                    width: "482px",
                    height: "162px",
                    flexShrink: 0,
                    position: "absolute",
                    left: "0px",
                    top: "180px",
                  }}
                  width="484"
                  height="166"
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
                  />
                </svg>
              </div>
            </div>
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
      <BarChart />
    </WidgetContainer>
  );
};
