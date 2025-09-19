import React from "react";

export interface ShortcutCardProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  onRemove?: (id: string) => void;
}

export default function ShortcutCard({
  id,
  label,
  icon,
  onClick,
  onRemove,
}: ShortcutCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flex: "1 1 auto",
        width: "100%",
        minWidth: 0,
        padding: "16px 12px",
        alignItems: "flex-start",
        gap: "12px",
        borderRadius: "12px",
        border: "1px solid #E9EAEB",
        background: isHovered ? "#F5F5F5" : "#FFF",
        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
        cursor: onClick ? "pointer" : "default",
        transition: "background-color 0.2s ease",
        position: "relative",
        boxSizing: "border-box",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured icon */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          alignItems: "center",
          gap: "10px",
          borderRadius: "8px",
          border: "1px solid #D5D7DA",
          background: "#FFF",
          boxShadow:
            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "2px",
          flex: "1 0 0",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            color: "#414651",
            fontFamily: "Public Sans",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "24px",
          }}
        >
          {label}
        </div>
      </div>

      {/* Remove button (only show on hover if onRemove is provided) */}
      {onRemove && isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            display: "flex",
            width: "20px",
            height: "20px",
            padding: "2px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
            border: "none",
            background: "rgba(255, 255, 255, 0.9)",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F04438";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="#667085"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
