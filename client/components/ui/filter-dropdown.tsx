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
  searchDisabled?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Select Filter",
  searchDisabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        setIsTyping(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when dropdown opens and typing mode is enabled
  useEffect(() => {
    if (isOpen && isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isTyping]);

  const handleOptionToggle = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onSelectionChange(newSelectedValues);
  };

  const handleSelectAll = () => {
    if (selectedValues.length === filteredOptions.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(filteredOptions.map((opt) => opt.value));
    }
  };

  const getDisplayText = () => {
    if (isTyping && searchQuery) return searchQuery;
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option?.label || placeholder;
    }
    return `${selectedValues.length} selected`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setIsTyping(false);
      setSearchQuery("");
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions.length === 1) {
        handleOptionToggle(filteredOptions[0].value);
      }
    } else if (e.key.length === 1 || e.key === "Backspace") {
      if (!isOpen) {
        setIsOpen(true);
      }
      setIsTyping(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleTriggerClick = () => {
    if (isTyping) {
      // If already typing, just toggle the dropdown
      setIsOpen(!isOpen);
    } else {
      // If not typing, open dropdown and enable typing
      setIsOpen(true);
      setIsTyping(true);
    }
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

      {/* Trigger Button/Input */}
      <div
        style={{
          position: "relative",
          display: "flex",
          height: "32px",
          alignItems: "center",
          width: "100%",
          borderRadius: "8px",
          border: isOpen ? "2px solid #344698" : "1px solid #D5D7DA",
          background: "#FFF",
          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          fontSize: "14px",
          fontFamily: "Public Sans",
          cursor: "pointer",
        }}
        onClick={handleTriggerClick}
      >
        {/* Hidden input for typing */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            padding: isOpen ? "5px 32px 5px 7px" : "6px 32px 6px 8px",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "14px",
            fontFamily: "Public Sans",
            color: selectedValues.length > 0 ? "#414651" : "#717680",
            opacity: isTyping ? 1 : 0,
            pointerEvents: isTyping ? "auto" : "none",
            borderRadius: "8px",
          }}
          placeholder={placeholder}
        />
        
        {/* Display text when not typing */}
        {!isTyping && (
          <span
            style={{
              flex: 1,
              padding: isOpen ? "5px 7px" : "6px 8px",
              textAlign: "left",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: selectedValues.length > 0 ? "#414651" : "#717680",
            }}
          >
            {getDisplayText()}
          </span>
        )}

        {/* Chevron Icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: `translateY(-50%) ${isOpen ? "rotate(180deg)" : "rotate(0deg)"}`,
            transition: "transform 0.2s ease",
            pointerEvents: "none",
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
      </div>

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
          {/* Options List */}
          <div
            style={{
              maxHeight: "240px",
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
                    selectedValues.length === filteredOptions.length
                      ? "#344698"
                      : selectedValues.length > 0
                      ? "#E6E9F4"
                      : "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedValues.length === filteredOptions.length && (
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
                  selectedValues.length < filteredOptions.length && (
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
