import React, { useState } from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "date";
  required?: boolean;
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  helpIcon?: boolean;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onFilled?: (isFilled: boolean) => void; // Callback when filled state changes
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  leadingIcon,
  helpIcon = false,
  className = "",
  disabled = false,
  style = {},
  onFilled,
}) => {
  const [focused, setFocused] = useState(false);
  const isFilled = value.trim().length > 0;

  React.useEffect(() => {
    if (onFilled) {
      onFilled(isFilled);
    }
  }, [isFilled, onFilled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`flex flex-col gap-1.5 ${className}`}
      style={style}
    >
      {/* Label */}
      <div className="flex items-center gap-0.5">
        <div
          style={{
            color: "#414651",
            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
            fontSize: "var(--Font-size-text-sm, 14px)",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "var(--Line-height-text-sm, 20px)",
          }}
        >
          {label}
        </div>
        {required && (
          <div
            style={{
              color: "#344698",
              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
              fontSize: "var(--Font-size-text-sm, 14px)",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "var(--Line-height-text-sm, 20px)",
            }}
          >
            *
          </div>
        )}
        {helpIcon && (
          <div className="flex w-4 h-4 justify-center items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_help)">
                <path
                  d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_help">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {/* Input Container */}
      <div
        style={{
          display: "flex",
          padding: "8px 12px",
          alignItems: "center",
          gap: "8px",
          borderRadius: "8px",
          border: `1px solid ${focused ? "#344698" : "#D5D7DA"}`,
          background: "#FFF",
          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}
      >
        {/* Leading Icon */}
        {leadingIcon && <div className="flex-shrink-0">{leadingIcon}</div>}

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            flex: "1 0 0",
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
            fontSize: "var(--Font-size-text-md, 16px)",
            fontWeight: 400,
            color: isFilled ? "#181D27" : "#717680", // Darker when filled, lighter when empty
            lineHeight: "var(--Line-height-text-md, 24px)",
          }}
        />
      </div>
    </div>
  );
};

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  helpIcon?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onFilled?: (isFilled: boolean) => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  helpIcon = false,
  placeholder = "Select",
  className = "",
  style = {},
  onFilled,
}) => {
  const [focused, setFocused] = useState(false);
  const isFilled = value.trim().length > 0;

  React.useEffect(() => {
    if (onFilled) {
      onFilled(isFilled);
    }
  }, [isFilled, onFilled]);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} style={style}>
      {/* Label */}
      <div className="flex items-center gap-0.5">
        <div
          style={{
            color: "#414651",
            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
            fontSize: "var(--Font-size-text-sm, 14px)",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "var(--Line-height-text-sm, 20px)",
          }}
        >
          {label}
        </div>
        {required && (
          <div
            style={{
              color: "#344698",
              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
              fontSize: "var(--Font-size-text-sm, 14px)",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "var(--Line-height-text-sm, 20px)",
            }}
          >
            *
          </div>
        )}
        {helpIcon && (
          <div className="flex w-4 h-4 justify-center items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_help_select)">
                <path
                  d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_help_select">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {/* Select Container */}
      <div
        style={{
          display: "flex",
          padding: "8px 12px",
          alignItems: "center",
          gap: "8px",
          borderRadius: "8px",
          border: `1px solid ${focused ? "#344698" : "#D5D7DA"}`,
          background: "#FFF",
          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          cursor: "pointer",
        }}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: "1 0 0",
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
            fontSize: "var(--Font-size-text-md, 16px)",
            fontWeight: 400,
            color: isFilled ? "#181D27" : "#717680",
            lineHeight: "var(--Line-height-text-md, 24px)",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Chevron Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#A4A7AE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
