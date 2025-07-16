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
  // Chart path variations - simplified and properly aligned
  const chartVariations = {
    default: {
      // Smooth curved line that starts low and ends high
      line: "M8 45 Q25 35, 45 28 T85 15",
      // Simple area fill that follows the line
      area: "M8 45 Q25 35, 45 28 T85 15 L85 50 L8 50 Z",
      // Marker position along the curve
      markerX: 85,
      markerY: 15,
    },
    variant1: {
      // Different curve pattern
      line: "M8 35 Q30 45, 50 20 T85 25",
      area: "M8 35 Q30 45, 50 20 T85 25 L85 50 L8 50 Z",
      markerX: 85,
      markerY: 25,
    },
    variant2: {
      // Another variation
      line: "M8 40 Q25 20, 55 35 T85 18",
      area: "M8 40 Q25 20, 55 35 T85 18 L85 50 L8 50 Z",
      markerX: 85,
      markerY: 18,
    },
    variant3: {
      // Fourth variation
      line: "M8 30 Q35 40, 60 25 T85 20",
      area: "M8 30 Q35 40, 60 25 T85 20 L85 50 L8 50 Z",
      markerX: 85,
      markerY: 20,
    },
  };

  const currentVariation = chartVariations[variant];
  const uniqueId = `gradient-${backgroundColor.replace("#", "")}-${variant}`;

  return (
    <div
      style={{
        height: "56px",
        flex: "1 0 0",
        position: "relative",
        minWidth: "100px",
      }}
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        viewBox="0 0 100 56"
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
      </svg>

      {/* Marker dot positioned at the end of the line */}
      <div
        style={{
          position: "absolute",
          right: "8px",
          top: `${(currentVariation.markerY / 56) * 100}%`,
          transform: "translateY(-50%)",
          width: "16px",
          height: "16px",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            border: `2px solid ${lineColor}`,
            opacity: 0.2,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {/* Inner dot */}
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            border: `2px solid ${lineColor}`,
            background: "#FFF",
            position: "absolute",
            top: "2px",
            left: "2px",
          }}
        />
      </div>
    </div>
  );
};
