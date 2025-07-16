import React from "react";

interface MiniChartProps {
  /** Whether to show positive or negative trend */
  trend?: "positive" | "negative";
  /** Chart background color */
  backgroundColor?: string;
  /** Chart line color */
  lineColor?: string;
  /** Width of the chart */
  width?: number;
  /** Height of the chart */
  height?: number;
  /** Chart variation pattern */
  variant?: "default" | "variant1" | "variant2" | "variant3";
}

export const MiniChart: React.FC<MiniChartProps> = ({
  trend = "positive",
  backgroundColor = "#344698",
  lineColor = "#344698",
  width = 103,
  height = 56,
}) => {
  return (
    <div
      style={{
        height: `${height}px`,
        flex: "1 0 0",
        position: "relative",
      }}
    >
      {/* Background with gradient */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          flexShrink: 0,
          position: "absolute",
          left: "0px",
          top: "0px",
        }}
      >
        {/* Background with gradient fill */}
        <svg
          style={{
            width: `${width}px`,
            height: `${height}px`,
            flexShrink: 0,
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`gradient-${backgroundColor.replace("#", "")}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: backgroundColor, stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: backgroundColor, stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M103 0C86.2658 1.51637 85.2295 37.8191 68.6667 42C55.0086 45.4477 48.0926 25.8771 34.3333 28C19.4094 30.3026 14.6336 50.6959 0 56H103V0Z"
            fill={`url(#gradient-${backgroundColor.replace("#", "")})`}
          />
        </svg>
      </div>

      {/* Wavy line */}
      <svg
        style={{
          width: `${width}px`,
          height: `${height}px`,
          flexShrink: 0,
          strokeWidth: "2px",
          stroke: lineColor,
          position: "absolute",
          left: "0px",
          top: "0px",
        }}
        width={width + 2}
        height={height + 2}
        viewBox={`0 0 ${width + 2} ${height + 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 57C5.29167 55.6667 12.333 49.5117 20.3125 39.5C32.2679 24.5 44.683 30.5 48.3616 33.5C52.0402 36.5 58.4777 44.5 66.7545 43.5C75.0313 42.5 83.308 33 89.2857 17.5C95.2634 2 99.4018 1.5 104 1"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Marker dot */}
      <div
        style={{
          width: "18px",
          height: "19px",
          flexShrink: 0,
          position: "absolute",
          left: "76px",
          top: "12px",
        }}
      >
        {/* Ring */}
        <div
          style={{
            width: "19px",
            height: "19px",
            flexShrink: 0,
            borderRadius: "200px",
            border: `2px solid ${lineColor}`,
            opacity: 0.2,
            position: "absolute",
            left: "-1px",
            top: "0px",
          }}
        />

        {/* Dot */}
        <div
          style={{
            width: "11px",
            height: "11px",
            flexShrink: 0,
            borderRadius: "200px",
            border: `2px solid ${lineColor}`,
            background: "#FFF",
            position: "absolute",
            left: "3px",
            top: "4px",
          }}
        />
      </div>
    </div>
  );
};
