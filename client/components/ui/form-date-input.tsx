import React, { useState, useRef, useEffect } from "react";
import SingleDateCalendar from "./single-date-calendar";

export interface FormDateInputProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  isFocused?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function FormDateInput({
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
}: FormDateInputProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);

  // Sync input value with prop value
  useEffect(() => {
    setInputValue(formatDisplayDate(value));
  }, [value]);

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleInputFocus = () => {
    onFocus?.();
  };

  const handleInputBlur = () => {
    // Parse and validate the typed date when user leaves the input
    const parsedDate = parseTypedDate(inputValue);
    if (parsedDate) {
      // Convert to YYYY-MM-DD format for storage
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      onChange(dateString);
    } else if (inputValue.trim() === "") {
      // Clear the date if input is empty
      onChange("");
    }
    onBlur?.();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
    onBlur?.();
  };

  const handleDateSelect = (selectedDate: Date) => {
    // Convert Date back to string format (YYYY-MM-DD for consistency)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    onChange(dateString);
    setIsCalendarOpen(false);
    onBlur?.();
  };

  // Parse typed date in various formats
  const parseTypedDate = (input: string): Date | null => {
    if (!input || input.trim() === "") return null;

    const trimmed = input.trim();

    // Try MM/DD/YY format
    const mmddyyMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
    if (mmddyyMatch) {
      const month = parseInt(mmddyyMatch[1]);
      const day = parseInt(mmddyyMatch[2]);
      let year = parseInt(mmddyyMatch[3]);

      // Handle 2-digit years
      if (year < 100) {
        year = year < 50 ? 2000 + year : 1900 + year;
      }

      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const date = new Date(year, month - 1, day);
        // Verify the date is valid (handles invalid dates like 2/30)
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
          return date;
        }
      }
    }

    // Try MM/DD format (assume current year)
    const mmddMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (mmddMatch) {
      const month = parseInt(mmddMatch[1]);
      const day = parseInt(mmddMatch[2]);
      const year = new Date().getFullYear();

      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
          return date;
        }
      }
    }

    // Try YYYY-MM-DD format
    const yyyymmddMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (yyyymmddMatch) {
      const year = parseInt(yyyymmddMatch[1]);
      const month = parseInt(yyyymmddMatch[2]);
      const day = parseInt(yyyymmddMatch[3]);

      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
          return date;
        }
      }
    }

    return null;
  };

  // Convert string date to Date object for calendar components
  const getDateFromValue = (dateValue: string): Date | null => {
    if (!dateValue) return null;

    // Handle MM/DD/YY format
    if (dateValue.match(/^\d{2}\/\d{2}\/\d{2}$/)) {
      const [month, day, year] = dateValue.split('/');
      const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
      return new Date(fullYear, parseInt(month) - 1, parseInt(day));
    }

    // Handle YYYY-MM-DD format
    try {
      const date = new Date(dateValue + 'T00:00:00');
      return !isNaN(date.getTime()) ? date : null;
    } catch {
      return null;
    }
  };

  const selectedDate = getDateFromValue(value);

  const formatDisplayDate = (dateValue: string) => {
    if (!dateValue) return placeholder || "";

    // If it's already in MM/DD/YY format, return as is
    if (dateValue.match(/^\d{2}\/\d{2}\/\d{2}$/)) {
      return dateValue;
    }

    // Try to parse and format date from YYYY-MM-DD (HTML date input format) to MM/DD/YY
    try {
      const date = new Date(dateValue + 'T00:00:00'); // Add time to avoid timezone issues
      if (!isNaN(date.getTime())) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${month}/${day}/${year}`;
      }
    } catch {
      // Fall back to original value if parsing fails
    }

    return dateValue;
  };

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
        <button
          ref={buttonRef}
          onClick={handleDateClick}
          onBlur={onBlur}
          style={{
            display: "flex",
            height: "32px",
            padding: "6px 8px",
            alignItems: "center",
            gap: "4px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: error
              ? "1px solid #FDA29B"
              : (isFocused || isCalendarOpen)
                ? "2px solid #34479A"
                : "1px solid #D5D7DA",
            background: isCalendarOpen ? "#ECEEF9" : "#FFF",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <svg
            style={{ width: "16px", height: "16px", flexShrink: 0 }}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
              stroke={isCalendarOpen ? "#273572" : "#A4A7AE"}
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              padding: "0 2px",
              justifyContent: "center",
              alignItems: "center",
              flex: "1 0 0",
            }}
          >
            <div
              style={{
                color: value
                  ? (isCalendarOpen ? "#273572" : "#181D27")
                  : (isCalendarOpen ? "#273572" : "#717680"),
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                textAlign: "left",
                width: "100%",
              }}
            >
              {value ? formatDisplayDate(value) : (placeholder || "")}
            </div>
          </div>
        </button>
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

      {/* Single Date Calendar */}
      {isCalendarOpen && (
        <SingleDateCalendar
          isOpen={isCalendarOpen}
          onClose={handleCalendarClose}
          triggerRef={buttonRef}
          selectedDate={selectedDate || new Date()}
          onDateChange={handleDateSelect}
        />
      )}
    </div>
  );
}
