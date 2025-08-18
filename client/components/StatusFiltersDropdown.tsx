import React, { useEffect, useRef, useState } from "react";

interface StatusFiltersDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  selectedStatuses: string[];
  onStatusChange: (statuses: string[]) => void;
}

export const StatusFiltersDropdown: React.FC<StatusFiltersDropdownProps> = ({
  isOpen,
  onClose,
  triggerRef,
  selectedStatuses,
  onStatusChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Status options for orders
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "processing", label: "Processing" },
    { value: "pending-review", label: "Pending Review" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "on-hold", label: "On Hold" },
    { value: "completed", label: "Completed" },
    { value: "canceled", label: "Canceled" },
    { value: "expired", label: "Expired" },
  ];

  // Calculate position based on trigger button
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: triggerRect.bottom + 4,
        left: triggerRect.left,
      });
    }
  }, [isOpen, triggerRef]);

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

  const handleStatusToggle = (statusValue: string) => {
    if (statusValue === "all") {
      // Toggle all - if all are selected, clear selection, otherwise select all
      if (selectedStatuses.length === statusOptions.length - 1) {
        onStatusChange([]);
      } else {
        onStatusChange(statusOptions.slice(1).map(option => option.value));
      }
    } else {
      // Toggle individual status
      if (selectedStatuses.includes(statusValue)) {
        onStatusChange(selectedStatuses.filter(s => s !== statusValue));
      } else {
        onStatusChange([...selectedStatuses, statusValue]);
      }
    }
  };

  const isAllSelected = selectedStatuses.length === statusOptions.length - 1;
  const isStatusSelected = (statusValue: string) => {
    if (statusValue === "all") return isAllSelected;
    return selectedStatuses.includes(statusValue);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: "170px",
        display: "flex",
        alignItems: "flex-start",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "auto",
          maxHeight: "320px",
          padding: "4px 0",
          flexDirection: "column",
          alignItems: "flex-start",
          flex: "1 0 0",
          borderRadius: "8px",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          background: "#FFF",
          boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
          position: "relative",
        }}
      >
        {statusOptions.map((option, index) => (
          <React.Fragment key={option.value}>
            <div
              style={{
                display: "flex",
                padding: "1px 6px",
                alignItems: "center",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  flex: "1 0 0",
                  borderRadius: "6px",
                  background: isStatusSelected(option.value) ? "#F5F5F5" : "transparent",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleStatusToggle(option.value)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      flex: "1 0 0",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "2px",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "16px",
                          height: "16px",
                          padding: isStatusSelected(option.value) ? "1px" : "0",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "4px",
                          background: isStatusSelected(option.value) ? "#344698" : "transparent",
                          border: isStatusSelected(option.value) ? "none" : "1px solid #D5D7DA",
                          position: "relative",
                        }}
                      >
                        {isStatusSelected(option.value) && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              width: "14px",
                              height: "14px",
                              flexShrink: 0,
                              position: "absolute",
                              left: "1px",
                              top: "1px",
                            }}
                          >
                            <path
                              d="M11.6668 3.5L5.25016 9.91667L2.3335 7"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                              fontWeight: 400,
                              fontSize: "14px",
                              color: "rgba(24,29,39,1)",
                            }}
                          >
                            {option.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isStatusSelected(option.value) && option.value !== "all" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "16px",
                    height: "16px",
                    position: "relative",
                  }}
                >
                  <path
                    d="M13.3332 4L5.99984 11.3333L2.6665 8"
                    stroke="#344698"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            {/* Divider after "All" option */}
            {index === 0 && (
              <svg
                width="170"
                height="9"
                viewBox="0 0 170 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  display: "flex",
                  padding: "4px 0",
                  alignItems: "center",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M170 5H0V4H170V5Z"
                  fill="#E9EAEB"
                />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
