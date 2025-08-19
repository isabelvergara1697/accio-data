import React, { useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  isFocused?: boolean;
  options: SelectOption[];
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}

export default function FormSelect({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Select an option",
  error,
  isFocused,
  options,
  required,
  style,
  className,
  disabled = false,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    if (onBlur) onBlur();
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen && onFocus) onFocus();
    if (isOpen && onBlur) onBlur();
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "6px",
        alignSelf: "stretch",
        position: "relative",
        ...style,
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
            alignItems: "flex-start",
            gap: "2px",
          }}
        >
          <div
            style={{
              color: "#414651",
              fontFamily:
                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            {label}
            {required && (
              <span style={{ color: "#344698", marginLeft: "2px" }}>*</span>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px 14px",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: error
              ? "1px solid #FDA29B"
              : isOpen || isFocused
                ? "2px solid #34479A"
                : "1px solid #D5D7DA",
            background: disabled ? "#F9FAFB" : "#FFF",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            position: "relative",
          }}
          onClick={handleToggle}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flex: "1 0 0",
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                color: selectedOption ? "#181D27" : "#717680",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </div>
          </div>
          <svg
            style={{
              width: "16px",
              height: "16px",
              flexShrink: 0,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#A4A7AE"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {error && (
            <svg
              style={{
                width: "16px",
                height: "16px",
                flexShrink: 0,
                marginLeft: "8px",
              }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 5.33325V7.99992M8 10.6666H8.00667M14.6667 7.99992C14.6667 11.6818 11.6819 14.6666 8 14.6666C4.31814 14.6666 1.33333 11.6818 1.33333 7.99992C1.33333 4.31802 4.31814 1.33325 8 1.33325C11.6819 1.33325 14.6667 4.31802 14.6667 7.99992Z"
                stroke="#F04438"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "4px",
            borderRadius: "8px",
            border: "1px solid #D5D7DA",
            background: "#FFF",
            boxShadow:
              "0px 4px 8px -2px rgba(10, 13, 18, 0.10), 0px 2px 4px -2px rgba(10, 13, 18, 0.06)",
            zIndex: 1000,
            maxHeight: "256px",
            overflowY: "auto",
          }}
        >
          {/* Options */}
          <div style={{ padding: "4px 0" }}>
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  style={{
                    padding: "1px 6px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "8px 10px 8px 8px",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "6px",
                      background: isSelected ? "#F5F5F5" : "transparent",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "#F5F5F5";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flex: "1 0 0",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: isSelected ? 600 : 400,
                          lineHeight: "20px",
                        }}
                      >
                        {option.label}
                      </div>
                    </div>
                    {isSelected && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3334 4L6.00008 11.3333L2.66675 8"
                          stroke="#344698"
                          strokeWidth="1.33333"
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
      )}

      {error && (
        <div
          style={{
            alignSelf: "stretch",
            color: "#D92D20",
            fontFamily:
              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "20px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
