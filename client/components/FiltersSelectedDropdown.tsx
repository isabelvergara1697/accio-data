import React, { useEffect, useRef } from "react";

interface FiltersSelectedDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  selectedStatusFilters: string[];
  onStatusFilterRemove: (status: string) => void;
  onClearAllFilters: () => void;
}

export const FiltersSelectedDropdown: React.FC<FiltersSelectedDropdownProps> = ({
  isOpen,
  onClose,
  triggerRef,
  selectedStatusFilters,
  onStatusFilterRemove,
  onClearAllFilters,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose, triggerRef]);

  // Calculate position based on trigger button
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: triggerRect.bottom + 4,
        left: triggerRect.left,
      });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  const formatStatusLabel = (status: string) => {
    // Convert status to readable format
    const statusMap: { [key: string]: string } = {
      'canceled': 'Canceled',
      'expired': 'Expired',
      'processing': 'Processing',
      'pending-review': 'Pending Review',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'on-hold': 'On Hold',
      'completed': 'Completed',
    };
    return statusMap[status] || status;
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: "240px",
        display: "flex",
        padding: "12px",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "8px",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        background: "#FFF",
        boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "240px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "6px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              Filters Selected
            </div>
            <button
              onClick={onClearAllFilters}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div
                style={{
                  color: "#273572",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Clear All
              </div>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              alignContent: "flex-start",
              gap: "4px",
              alignSelf: "stretch",
              flexWrap: "wrap",
            }}
          >
            {selectedStatusFilters.map((status) => (
              <div
                key={status}
                style={{
                  display: "flex",
                  padding: "3px 4px 3px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3px",
                  borderRadius: "6px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
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
                    }}
                  >
                    Status: {formatStatusLabel(status)}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "18px",
                    padding: "2px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => onStatusFilterRemove(status)}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
