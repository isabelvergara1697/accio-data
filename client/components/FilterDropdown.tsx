import React from "react";

interface FilterDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedValue: string;
  options: string[];
  onSelect: (value: string) => void;
  isMobile: boolean;
  dataAttribute: string;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onToggle,
  selectedValue,
  options,
  onSelect,
  isMobile,
  dataAttribute,
  className = "",
}) => {
  return (
    <div
      className={`dropdown-container ${className}`}
      data-sort-dropdown={dataAttribute === "sort-dropdown" ? true : undefined}
      data-filetype-dropdown={
        dataAttribute === "filetype-dropdown" ? true : undefined
      }
      style={{
        flex: isMobile ? "none" : "auto",
        width: isMobile ? "100%" : "auto",
      }}
    >
      <div
        className={`secondary-button ${isMobile ? "mobile-button" : "filter-button"}`}
        style={{
          display: "flex",
          minHeight: "36px",
          padding: "6px 8px",
          justifyContent: isMobile ? "space-between" : "flex-start",
          alignItems: "center",
          gap: "4px",
          borderRadius: "8px",
          border: "1px solid #D5D7DA",
          background: "#FFF",
          boxShadow:
            "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
          flex: isMobile ? "1 0 0" : "unset",
          width: isMobile ? "100%" : "auto",
          minWidth: isMobile ? "auto" : "120px",
          maxWidth: isMobile ? "none" : "120px",
          cursor: "pointer",
        }}
        onClick={onToggle}
      >
        <div
          className={isMobile ? "mobile-button-content" : ""}
          style={{
            display: "flex",
            padding: "0px 2px",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            className={isMobile ? "mobile-button-text" : "filter-button-text"}
            style={{
              color: "#414651",
              fontFamily: "'Public Sans'",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "20px",
              overflow: isMobile ? "visible" : "hidden",
              textOverflow: isMobile ? "unset" : "ellipsis",
              whiteSpace: isMobile ? "normal" : "nowrap",
              maxWidth: isMobile ? "auto" : "80px",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "rgba(65,70,81,1)",
              }}
            >
              {selectedValue}
            </span>
          </div>
        </div>
        <svg
          style={{ width: "16px", height: "16px" }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-menu-container">
            {options.map((option) => (
              <div
                key={option}
                className={`dropdown-item ${selectedValue === option ? "selected" : ""}`}
                onClick={() => onSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
