import React from "react";

interface MiniChartProps {
  /** Whether to show positive or negative trend */
  trend?: "positive" | "negative";
  /** Chart background color */
  backgroundColor?: string;
  /** Chart line color */
  lineColor?: string;
  /** Chart variation pattern */
  variant?: "default" | "variant1" | "variant2" | "variant3";
}

export const MiniChart: React.FC<MiniChartProps> = ({
  trend = "positive",
  backgroundColor = "#344698",
  lineColor = "#344698",
  variant = "default",
}) => {
  // Base dimensions for consistent aspect ratio
  const baseWidth = 103;
  const baseHeight = 56;

  // Chart path variations with normalized coordinates
  const chartVariations = {
    default: {
      path: "M103 0C86.2658 1.51637 85.2295 37.8191 68.6667 42C55.0086 45.4477 48.0926 25.8771 34.3333 28C19.4094 30.3026 14.6336 50.6959 0 56H103V0Z",
      line: "M1 57C5.29167 55.6667 12.333 49.5117 20.3125 39.5C32.2679 24.5 44.683 30.5 48.3616 33.5C52.0402 36.5 58.4777 44.5 66.7545 43.5C75.0313 42.5 83.308 33 89.2857 17.5C95.2634 2 99.4018 1.5 104 1",
      markerPosition: { x: 76, y: 12 },
    },
    variant1: {
      path: "M103 15C85.5 8.5 79.2 25.3 65.5 20C48.8 13.2 52.1 35.8 34.5 38.5C20.2 40.8 18.7 25.2 0 30V56H103V15Z",
      line: "M1 31C8.5 28.5 15.2 42.8 25.8 40C38.9 36.5 35.1 18.2 48.7 21.5C61.2 24.5 58.8 40.8 73.4 38C86.1 35.5 91.8 25.2 104 22",
      markerPosition: { x: 82, y: 18 },
    },
    variant2: {
      path: "M103 25C88.3 35.2 82.7 15.8 68.2 22.5C51.8 30.4 57.2 8.2 40.1 12C25.9 15.1 29.4 38.7 15.2 42.5C7.8 44.8 5.1 35.2 0 38V56H103V25Z",
      line: "M1 39C9.2 36.1 12.8 45.9 22.4 43.2C34.1 39.8 30.7 21.5 43.2 24.8C57.9 28.8 52.4 12.5 67.8 18.2C80.5 22.8 85.1 38.2 104 35",
      markerPosition: { x: 85, y: 28 },
    },
    variant3: {
      path: "M103 5C89.7 18.3 85.4 2.8 71.5 12.5C55.2 24.1 62.8 5.7 46.3 8.2C32.1 10.4 37.5 28.9 23.8 32.5C14.2 35.1 16.7 18.4 0 22V56H103V5Z",
      line: "M1 23C11.8 19.2 14.5 34.8 26.1 31.9C39.4 28.4 34.2 12.1 47.8 15.2C63.7 18.9 56.1 7.5 71.2 13.8C83.9 19.1 88.2 7.2 104 10",
      markerPosition: { x: 79, y: 8 },
    },
  };

  const currentVariation = chartVariations[variant];
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
            d={currentVariation.path}
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
          d={currentVariation.line}
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
          left: currentVariation.markerPosition.left,
          top: currentVariation.markerPosition.top,
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
