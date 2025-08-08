import React, { useState, useRef, useEffect } from "react";

interface FilterOption {
  value: string;
  label: string;
  checked?: boolean;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Select Filter",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionToggle = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onSelectionChange(newSelectedValues);
  };

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(options.map((opt) => opt.value));
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option?.label || placeholder;
    }
    return `${selectedValues.length} selected`;
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
      {/* Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          marginBottom: "6px",
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
          {label}
        </div>
      </div>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          height: "32px",
          padding: "6px 8px",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #D5D7DA",
          background: "#FFF",
          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          fontSize: "14px",
          fontFamily: "Public Sans",
          color: selectedValues.length > 0 ? "#414651" : "#717680",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            flex: 1,
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {getDisplayText()}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="#A4A7AE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            maxHeight: "240px",
            borderRadius: "8px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            boxShadow:
              "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {/* Search Input */}
          <div
            style={{
              padding: "8px",
              borderBottom: "1px solid #E9EAEB",
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "28px",
                padding: "4px 8px",
                border: "1px solid #D5D7DA",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "Public Sans",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Options List */}
          <div
            style={{
              maxHeight: "160px",
              overflowY: "auto",
              padding: "4px 0",
            }}
            className="custom-scrollbar"
          >
            {/* Select All Option */}
            <div
              onClick={handleSelectAll}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #F0F1F3",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F8F9FC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  border: "1px solid #D5D7DA",
                  background:
                    selectedValues.length === options.length
                      ? "#344698"
                      : selectedValues.length > 0
                      ? "#E6E9F4"
                      : "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedValues.length === options.length && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#FFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {selectedValues.length > 0 &&
                  selectedValues.length < options.length && (
                    <div
                      style={{
                        width: "8px",
                        height: "2px",
                        background: "#344698",
                        borderRadius: "1px",
                      }}
                    />
                  )}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Public Sans",
                  color: "#414651",
                  fontWeight: 600,
                }}
              >
                All
              </span>
            </div>

            {/* Individual Options */}
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionToggle(option.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F8F9FC";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "4px",
                    border: "1px solid #D5D7DA",
                    background: selectedValues.includes(option.value)
                      ? "#344698"
                      : "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedValues.includes(option.value) && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="#FFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "Public Sans",
                    color: "#414651",
                  }}
                >
                  {option.label}
                </span>
              </div>
            ))}

            {filteredOptions.length === 0 && (
              <div
                style={{
                  padding: "12px",
                  textAlign: "center",
                  color: "#717680",
                  fontSize: "14px",
                  fontFamily: "Public Sans",
                }}
              >
                No options found
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default FilterDropdown;
