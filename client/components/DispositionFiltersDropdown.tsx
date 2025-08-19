import React, { useEffect, useRef, useState } from "react";

interface DispositionFiltersDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  selectedOptions: string[];
  onOptionsChange: (options: string[]) => void;
}

export const DispositionFiltersDropdown: React.FC<
  DispositionFiltersDropdownProps
> = ({ isOpen, onClose, triggerRef, selectedOptions, onOptionsChange }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Disposition by Component options with Complete/Incomplete/Unknown
  const dispositionOptions = [
    { value: "mvr-complete", label: "MVR - Complete" },
    { value: "mvr-incomplete", label: "MVR - Incomplete" },
    { value: "mvr-unknown", label: "MVR - Unknown" },
    { value: "criminal-complete", label: "Criminal - Complete" },
    { value: "criminal-incomplete", label: "Criminal - Incomplete" },
    { value: "criminal-unknown", label: "Criminal - Unknown" },
    { value: "verification-complete", label: "Verification - Complete" },
    { value: "verification-incomplete", label: "Verification - Incomplete" },
    { value: "verification-unknown", label: "Verification - Unknown" },
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose, triggerRef]);

  const handleOptionToggle = (optionValue: string) => {
    if (selectedOptions.includes(optionValue)) {
      onOptionsChange(selectedOptions.filter((s) => s !== optionValue));
    } else {
      onOptionsChange([...selectedOptions, optionValue]);
    }
  };

  const isOptionSelected = (optionValue: string) => {
    return selectedOptions.includes(optionValue);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: "250px", // Wider to fit content
        display: "flex",
        alignItems: "flex-start",
        zIndex: 9999, // Reduced to prevent interference with table hover
      }}
    >
      <div
        style={{
          display: "flex",
          height: "auto",
          maxHeight: "280px", // Limit height for scroll
          overflowY: "auto", // Add vertical scroll
          padding: "4px 0",
          flexDirection: "column",
          alignItems: "flex-start",
          flex: "1 0 0",
          borderRadius: "8px",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          background: "#FFF",
          boxShadow:
            "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
          position: "relative",
        }}
      >
        {dispositionOptions.map((option) => {
          const isSelected = isOptionSelected(option.value);
          const isHighlighted = isSelected;

          return (
            <div
              key={option.value}
              style={{
                display: "flex",
                height: isHighlighted ? "38px" : "auto",
                padding: "1px 6px",
                alignItems: "center",
                flexShrink: isHighlighted ? 0 : "unset",
                alignSelf: "stretch",
                position: "relative",
              }}
              onClick={() => handleOptionToggle(option.value)}
            >
              <div
                style={{
                  display: "flex",
                  height: isHighlighted ? "36px" : "auto",
                  padding: isHighlighted ? "8px 10px 8px 8px" : "8px",
                  flexDirection: isHighlighted ? "row" : "column",
                  alignItems: isHighlighted ? "center" : "flex-start",
                  gap: "8px",
                  flex: "1 0 0",
                  borderRadius: "6px",
                  background: isHighlighted ? "#F5F5F5" : "transparent",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: isHighlighted ? "1 0 0" : "unset",
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
                          padding: isSelected ? "1px" : "0",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "4px",
                          background: isSelected ? "#344698" : "transparent",
                          border: isSelected ? "none" : "1px solid #D5D7DA",
                          position: "relative",
                        }}
                      >
                        {isSelected && (
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
                              fontFamily:
                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
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
                {isHighlighted && (
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
