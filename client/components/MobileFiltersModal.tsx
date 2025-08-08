import React from "react";
import FiltersPanel from "./FiltersPanel";

export interface FilterState {
  status: string[];
  typeOfPackage: string[];
  i9Filled: string[];
  activate: string[];
  ews: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

interface MobileFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const MobileFiltersModal: React.FC<MobileFiltersModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(10, 13, 18, 0.7)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: "relative",
          width: "351px",
          maxWidth: "100vw",
          height: "100vh",
          background: "#FFF",
          display: "flex",
          flexDirection: "column",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "24px 16px",
            alignItems: "flex-start",
            gap: "8px",
            background: "#FFF",
            borderBottom: "1px solid #E9EAEB",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flex: "1 0 0",
            }}
          >
            {/* Featured Icon */}
            <div
              style={{
                display: "flex",
                width: "44px",
                height: "44px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "9999px",
                background: "#D9DEF2",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16667 17.5L4.16667 12.5M4.16667 12.5C5.08714 12.5 5.83333 11.7538 5.83333 10.8333C5.83333 9.91286 5.08714 9.16667 4.16667 9.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333C2.5 11.7538 3.24619 12.5 4.16667 12.5ZM4.16667 5.83333V2.5M10 17.5V12.5M10 5.83333V2.5M10 5.83333C9.07953 5.83333 8.33333 6.57953 8.33333 7.5C8.33333 8.42047 9.07953 9.16667 10 9.16667C10.9205 9.16667 11.6667 8.42047 11.6667 7.5C11.6667 6.57953 10.9205 5.83333 10 5.83333ZM15.8333 17.5V14.1667M15.8333 14.1667C16.7538 14.1667 17.5 13.4205 17.5 12.5C17.5 11.5795 16.7538 10.8333 15.8333 10.8333C14.9129 10.8333 14.1667 11.5795 14.1667 12.5C14.1667 13.4205 14.9129 14.1667 15.8333 14.1667ZM15.8333 7.5V2.5"
                  stroke="#344698"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title and Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Filters
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Manage and quickly apply filters.
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#A4A7AE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "0 16px",
            paddingBottom: "24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Reuse FiltersPanel component */}
          <FiltersPanel
            isVisible={true}
            filters={filters}
            onFiltersChange={onFiltersChange}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
};
