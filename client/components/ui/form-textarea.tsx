import React from "react";

export interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  isFocused?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
  rows?: number;
}

export default function FormTextarea({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  error,
  isFocused,
  required,
  style,
  className,
  rows = 2,
}: FormTextareaProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "6px",
        alignSelf: "stretch",
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
        {label && (
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
        )}
        <div
          style={{
            display: "flex",
            padding: "6px 8px",
            alignItems: "flex-start",
            gap: "8px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: error
              ? "1px solid #FDA29B"
              : isFocused
                ? "2px solid #34479A"
                : "1px solid #D5D7DA",
            background: "#FFF",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            minHeight: "32px",
            position: "relative",
          }}
        >
          <textarea
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={rows}
            style={{
              flex: "1 0 0",
              border: "none",
              outline: "none",
              background: "transparent",
              color: value ? "#181D27" : "#717680",
              fontFamily:
                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
              resize: "none",
              minHeight: "20px",
              maxHeight: "40px",
              overflow: "hidden",
            }}
            placeholder={placeholder}
          />
          {/* Resize handle icon - positioned in bottom right corner */}
          <svg
            style={{
              width: "12px",
              height: "12px",
              position: "absolute",
              bottom: "6px",
              right: "6px",
              pointerEvents: "none",
            }}
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2.5L2 10.5"
              stroke="#D5D7DA"
              strokeLinecap="round"
            />
            <path
              d="M11 7.5L7 11.5"
              stroke="#D5D7DA"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {error && (
        <div
          style={{
            color: "#FDA29B",
            fontFamily:
              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "18px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
