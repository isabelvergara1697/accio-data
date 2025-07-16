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
  // Optimized chart path variations that look good at all sizes
  const chartVariations = {
    default: {
      line: "M8 45 Q25 35, 45 25 T85 12",
      area: "M8 45 Q25 35, 45 25 T85 12 L85 52 L8 52 Z",
      markerX: 85,
      markerY: 12,
    },
    variant1: {
      line: "M8 32 Q30 45, 50 18 T85 25",
      area: "M8 32 Q30 45, 50 18 T85 25 L85 52 L8 52 Z",
      markerX: 85,
      markerY: 25,
    },
    variant2: {
      line: "M8 40 Q25 18, 55 35 T85 15",
      area: "M8 40 Q25 18, 55 35 T85 15 L85 52 L8 52 Z",
      markerX: 85,
      markerY: 15,
    },
    variant3: {
      line: "M8 28 Q35 42, 60 22 T85 18",
      area: "M8 28 Q35 42, 60 22 T85 18 L85 52 L8 52 Z",
      markerX: 85,
      markerY: 18,
    },
  };

  const currentVariation = chartVariations[variant];
  const uniqueId = `gradient-${backgroundColor.replace("#", "")}-${variant}`;

  return (
    <div
      style={{
        width: "100%",
        height: "56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
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
          vectorEffect="non-scaling-stroke"
        />

        {/* Marker dot */}
        <g
          transform={`translate(${currentVariation.markerX}, ${currentVariation.markerY})`}
        >
          {/* Outer ring */}
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
            opacity="0.2"
            vectorEffect="non-scaling-stroke"
          />
          {/* Inner dot */}
          <circle
            cx="0"
            cy="0"
            r="4"
            fill="#FFF"
            stroke={lineColor}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  );
};
