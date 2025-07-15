import React from "react";

export interface FormInputProps {
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  isFocused?: boolean;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  error,
  isFocused,
  showPasswordToggle,
  onPasswordToggle,
  required,
  style,
  className,
}: FormInputProps) {
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
              : isFocused
                ? "2px solid #34479A"
                : "1px solid #D5D7DA",
            background: "#FFF",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
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
            <input
              type={type}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              style={{
                flex: "1 0 0",
                border: "none",
                outline: "none",
                background: "transparent",
                color: value ? "#181D27" : "#717680",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
              placeholder={placeholder}
            />
          </div>
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              onClick={onPasswordToggle}
              style={{
                display: "flex",
                padding: "4px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "6px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg
                style={{
                  width: "16px",
                  height: "16px",
                }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.61342 8.47537C1.52262 8.33161 1.47723 8.25973 1.45182 8.14886C1.43273 8.06559 1.43273 7.93425 1.45182 7.85097C1.47723 7.74011 1.52262 7.66823 1.61341 7.52447C2.36369 6.33648 4.59693 3.33325 8.00027 3.33325C11.4036 3.33325 13.6369 6.33648 14.3871 7.52447C14.4779 7.66823 14.5233 7.74011 14.5487 7.85097C14.5678 7.93425 14.5678 8.06559 14.5487 8.14886C14.5233 8.25973 14.4779 8.33161 14.3871 8.47537C13.6369 9.66336 11.4036 12.6666 8.00027 12.6666C4.59693 12.6666 2.36369 9.66336 1.61342 8.47537Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.00027 9.99992C9.10484 9.99992 10.0003 9.10449 10.0003 7.99992C10.0003 6.89535 9.10484 5.99992 8.00027 5.99992C6.8957 5.99992 6.00027 6.89535 6.00027 7.99992C6.00027 9.10449 6.8957 9.99992 8.00027 9.99992Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {error && (
            <svg
              style={{
                width: "16px",
                height: "16px",
                flexShrink: 0,
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
