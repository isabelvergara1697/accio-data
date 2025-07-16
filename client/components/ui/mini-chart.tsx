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
  // Chart path variations - contained within a safe area to prevent overflow
  const chartVariations = {
    default: {
      // Smooth curved line that starts low and ends high, with safe margins
      line: "M10 42 Q25 32, 45 25 T80 12",
      // Simple area fill that follows the line
      area: "M10 42 Q25 32, 45 25 T80 12 L80 48 L10 48 Z",
      // Marker position along the curve (percentage-based for better scaling)
      markerX: 80, // 80% of viewBox width
      markerY: 12,
    },
    variant1: {
      // Different curve pattern
      line: "M10 32 Q30 42, 50 17 T80 22",
      area: "M10 32 Q30 42, 50 17 T80 22 L80 48 L10 48 Z",
      markerX: 80,
      markerY: 22,
    },
    variant2: {
      // Another variation
      line: "M10 37 Q25 17, 55 32 T80 15",
      area: "M10 37 Q25 17, 55 32 T80 15 L80 48 L10 48 Z",
      markerX: 80,
      markerY: 15,
    },
    variant3: {
      // Fourth variation
      line: "M10 27 Q35 37, 60 22 T80 17",
      area: "M10 27 Q35 37, 60 22 T80 17 L80 48 L10 48 Z",
      markerX: 80,
      markerY: 17,
    },
  };

  const currentVariation = chartVariations[variant];
  const uniqueId = `gradient-${backgroundColor.replace("#", "")}-${variant}`;

  return (
    <div
      style={{
        height: "56px",
        width: "100%",
        position: "relative",
        overflow: "hidden", // Prevent any overflow
      }}
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
          display: "block", // Remove any default spacing
        }}
        viewBox="0 0 100 56"
        preserveAspectRatio="none" // Allow stretching to fit container
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={uniqueId}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop
              offset="0%"
              style={{ stopColor: backgroundColor, stopOpacity: 0.15 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: backgroundColor, stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>

        {/* Background gradient area */}
        <path d={currentVariation.area} fill={`url(#${uniqueId})`} />

        {/* Chart line */}
        <path
          d={currentVariation.line}
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Marker dot as SVG element for better scaling */}
        <g
          transform={`translate(${currentVariation.markerX}, ${currentVariation.markerY})`}
        >
          {/* Outer ring */}
          <circle
            cx="0"
            cy="0"
            r="9"
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
            opacity="0.2"
          />
          {/* Inner dot */}
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="#FFF"
            stroke={lineColor}
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};
