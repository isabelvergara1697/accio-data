import React from "react";

interface SelectionBadgeProps {
  count: number;
  onClear: () => void;
}

export const SelectionBadge: React.FC<SelectionBadgeProps> = ({
  count,
  onClear,
}) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "3px 4px 3px 8px",
        justifyContent: "center",
        alignItems: "center",
        gap: "3px",
        borderRadius: "6px",
        border: "1px solid #D5D7DA",
        background: "#FFF",
        position: "fixed",
        right: "32px",
        top: "140px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#414651",
            textAlign: "center",
            fontFamily: "Public Sans",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "18px",
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily:
                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "rgba(65,70,81,1)",
            }}
          >
            {count} Invite{count !== 1 ? "s" : ""} Selected
          </span>
        </div>
      </div>
      <button
        onClick={onClear}
        style={{
          display: "flex",
          width: "18px",
          padding: "2px",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "3px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
            stroke="#A4A7AE"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
