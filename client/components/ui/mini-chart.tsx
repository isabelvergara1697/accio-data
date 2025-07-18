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
  // Chart paths optimized for the 103x56 container from Figma
  const chartVariations = {
    default: {
      // Smooth wavy line that looks good at all sizes
      line: "M1 47 Q12 37, 25 32 Q40 26, 55 28 Q70 30, 85 20 Q92 16, 102 14",
      area: "M1 47 Q12 37, 25 32 Q40 26, 55 28 Q70 30, 85 20 Q92 16, 102 14 L102 56 L1 56 Z",
      markerX: 94, // Position as percentage of width
      markerY: 16,
    },
    variant1: {
      line: "M1 35 Q15 45, 30 22 Q45 18, 60 25 Q75 32, 90 18 Q96 15, 102 22",
      area: "M1 35 Q15 45, 30 22 Q45 18, 60 25 Q75 32, 90 18 Q96 15, 102 22 L102 56 L1 56 Z",
      markerX: 94,
      markerY: 20,
    },
    variant2: {
      line: "M1 42 Q18 25, 35 30 Q50 35, 65 22 Q80 16, 95 18 Q98 19, 102 17",
      area: "M1 42 Q18 25, 35 30 Q50 35, 65 22 Q80 16, 95 18 Q98 19, 102 17 L102 56 L1 56 Z",
      markerX: 94,
      markerY: 18,
    },
    variant3: {
      line: "M1 38 Q20 48, 40 28 Q55 22, 70 26 Q85 30, 95 15 Q98 13, 102 16",
      area: "M1 38 Q20 48, 40 28 Q55 22, 70 26 Q85 30, 95 15 Q98 13, 102 16 L102 56 L1 56 Z",
      markerX: 94,
      markerY: 15,
    },
  };

  const currentVariation = chartVariations[variant];
  const uniqueId = `gradient-${backgroundColor.replace("#", "")}-${variant}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      style={{
        width: "100%",
        height: "56px",
        position: "relative",
        overflow: "hidden",
        minWidth: "80px",
      }}
    >
      {/* Single SVG with consistent scaling and aspect ratio */}
      <svg
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        viewBox="0 0 103 56"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={uniqueId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={backgroundColor} stopOpacity={0.1} />
            <stop offset="100%" stopColor={backgroundColor} stopOpacity={0} />
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
      </svg>

      {/* Absolutely positioned perfect circles that scale with container */}
      <div
        style={{
          position: "absolute",
          left: `${(currentVariation.markerX / 103) * 100}%`,
          top: `${(currentVariation.markerY / 56) * 100}%`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        {/* Outer ring - always circular regardless of container stretch */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            border: `1px solid ${lineColor}`,
            opacity: 0.2,
            boxSizing: "border-box",
          }}
        />
        {/* Inner dot - always circular regardless of container stretch */}
        <div
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: "#FFF",
            border: `1px solid ${lineColor}`,
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
};
