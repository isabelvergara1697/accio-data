import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DatePickerCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  selectedStartDate: Date;
  selectedEndDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  isOpen,
  onClose,
  triggerRef,
  selectedStartDate,
  selectedEndDate,
  onDateChange,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Working dates (before Apply)
  const [workingStartDate, setWorkingStartDate] = useState(selectedStartDate);
  const [workingEndDate, setWorkingEndDate] = useState(selectedEndDate);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(() => {
    const start = new Date(selectedStartDate);
    return new Date(start.getFullYear(), start.getMonth(), 1);
  });

  const [selectedPreset, setSelectedPreset] = useState("");
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Input state
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  // Initialize when opening
  useEffect(() => {
    if (isOpen) {
      setWorkingStartDate(selectedStartDate);
      setWorkingEndDate(selectedEndDate);
      setSelectedPreset("");
      setIsSelectingRange(false);
      setRangeStart(null);
      setHoverDate(null);

      const month = new Date(
        selectedStartDate.getFullYear(),
        selectedStartDate.getMonth(),
        1,
      );
      setCurrentMonth(month);

      setStartInput(formatDate(selectedStartDate));
      setEndInput(formatDate(selectedEndDate));
    }
  }, [isOpen, selectedStartDate, selectedEndDate]);

  // Position calendar
  useEffect(() => {
    if (isOpen && triggerRef.current && calendarRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();

      const top = triggerRect.bottom + 4;
      const left = triggerRect.right - calendarRect.width;

      setPosition({ top, left });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  // Helper functions
  const formatDate = (date: Date): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const parseDate = (dateStr: string): Date | null => {
    try {
      const date = new Date(dateStr);
      return !isNaN(date.getTime()) ? date : null;
    } catch {
      return null;
    }
  };

  const isSameDate = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
    return date >= start && date <= end;
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday=0 to Monday=0
  };

  const getMonthName = (date: Date): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Event handlers
  const handlePresetClick = (preset: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedPreset(preset);
    setIsSelectingRange(false);
    setRangeStart(null);
    setHoverDate(null);

    const today = new Date();
    let start: Date;
    let end: Date;

    switch (preset) {
      case "This week":
        const currentDay = today.getDay();
        const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
        start = new Date(today);
        start.setDate(today.getDate() - daysToMonday);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;

      case "Last week":
        const lastWeekStart = new Date(today);
        const lastWeekDay = today.getDay();
        const daysToLastMonday = lastWeekDay === 0 ? 13 : lastWeekDay + 6;
        lastWeekStart.setDate(today.getDate() - daysToLastMonday);
        start = lastWeekStart;
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;

      case "This month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;

      case "Last month":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;

      case "Last tree months":
        start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;

      case "Last six months":
        start = new Date(today.getFullYear(), today.getMonth() - 5, 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;

      case "This year":
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
        break;

      case "Last year":
        start = new Date(today.getFullYear() - 1, 0, 1);
        end = new Date(today.getFullYear() - 1, 11, 31);
        break;

      case "All time":
      default:
        start = new Date(2020, 0, 1);
        end = today;
        break;
    }

    setWorkingStartDate(start);
    setWorkingEndDate(end);
    setStartInput(formatDate(start));
    setEndInput(formatDate(end));
    setCurrentMonth(new Date(start.getFullYear(), start.getMonth(), 1));
  };

  const handleDateClick = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedPreset("");

    if (!isSelectingRange) {
      setIsSelectingRange(true);
      setRangeStart(date);
      setWorkingStartDate(date);
      setWorkingEndDate(date);
      setHoverDate(null);
    } else {
      if (rangeStart) {
        const start = date < rangeStart ? date : rangeStart;
        const end = date > rangeStart ? date : rangeStart;
        setWorkingStartDate(start);
        setWorkingEndDate(end);
        setStartInput(formatDate(start));
        setEndInput(formatDate(end));
      }
      setIsSelectingRange(false);
      setRangeStart(null);
      setHoverDate(null);
    }
  };

  const handleDateHover = (date: Date) => {
    if (isSelectingRange && rangeStart) {
      setHoverDate(date);
    }
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setStartInput(value);
    const parsed = parseDate(value);
    if (parsed) {
      setWorkingStartDate(parsed);
      setSelectedPreset("");
    }
  };

  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setEndInput(value);
    const parsed = parseDate(value);
    if (parsed) {
      setWorkingEndDate(parsed);
      setSelectedPreset("");
    }
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateChange(workingStartDate, workingEndDate);
    onClose();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Render calendar month
  const renderCalendarMonth = (monthDate: Date) => {
    const daysInMonth = getDaysInMonth(monthDate);
    const firstDay = getFirstDayOfMonth(monthDate);
    const days: JSX.Element[] = [];

    // Day headers
    const dayHeaders = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    dayHeaders.forEach((day, index) => {
      days.push(
        <div
          key={`header-${index}`}
          style={{
            display: "flex",
            width: "40px",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            color: "#414651",
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
          }}
        >
          {day}
        </div>,
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} style={{ width: "40px", height: "40px" }} />,
      );
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);

      // Determine visual state
      let isSelected = false;
      let isInRange = false;
      let isRangeStart = false;
      let isRangeEnd = false;

      if (isSelectingRange && rangeStart && hoverDate) {
        const tempStart = hoverDate < rangeStart ? hoverDate : rangeStart;
        const tempEnd = hoverDate > rangeStart ? hoverDate : rangeStart;
        isSelected = isSameDate(date, tempStart) || isSameDate(date, tempEnd);
        isInRange = isDateInRange(date, tempStart, tempEnd);
        isRangeStart = isSameDate(date, tempStart);
        isRangeEnd = isSameDate(date, tempEnd);
      } else {
        isSelected =
          isSameDate(date, workingStartDate) ||
          isSameDate(date, workingEndDate);
        isInRange = isDateInRange(date, workingStartDate, workingEndDate);
        isRangeStart = isSameDate(date, workingStartDate);
        isRangeEnd = isSameDate(date, workingEndDate);
      }

      days.push(
        <div
          key={`day-${day}`}
          onClick={(e) => handleDateClick(date, e)}
          onMouseEnter={() => handleDateHover(date)}
          style={{
            display: "flex",
            width: "40px",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius:
              isRangeStart && !isRangeEnd
                ? "20px 0 0 20px"
                : isRangeEnd && !isRangeStart
                  ? "0 20px 20px 0"
                  : "20px",
            background: isSelected
              ? "#344698"
              : isInRange
                ? "#F5F5F5"
                : "transparent",
            cursor: "pointer",
            position: "relative",
            color: isSelected ? "#FFF" : "#414651",
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
          }}
        >
          {/* Range connectors */}
          {isInRange && !isSelected && (
            <>
              {!isRangeStart && (
                <div
                  style={{
                    position: "absolute",
                    left: "-20px",
                    top: "0",
                    width: "40px",
                    height: "40px",
                    background: "#F5F5F5",
                    zIndex: -1,
                  }}
                />
              )}
              {!isRangeEnd && (
                <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    top: "0",
                    width: "40px",
                    height: "40px",
                    background: "#F5F5F5",
                    zIndex: -1,
                  }}
                />
              )}
            </>
          )}
          {day}
        </div>,
      );
    }

    return days;
  };

  const presets = [
    "This week",
    "Last week",
    "This month",
    "Last month",
    "Last tree months",
    "Last six months",
    "This year",
    "Last year",
    "All time",
  ];

  const leftMonth = currentMonth;
  const rightMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1,
  );

  return createPortal(
    <div
      data-date-picker
      ref={calendarRef}
      onClick={handleCalendarClick}
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        display: "flex",
        alignItems: "flex-start",
        borderRadius: "16px",
        border: "1px solid #D5D7DA",
        background: "#FFF",
        boxShadow:
          "0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        zIndex: 50,
      }}
    >
      {/* Left sidebar with presets */}
      <div
        style={{
          display: "flex",
          width: "152px",
          padding: "12px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2px",
          alignSelf: "stretch",
          borderRight: "1px solid #E9EAEB",
        }}
      >
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={(e) => handlePresetClick(preset, e)}
            style={{
              display: "flex",
              padding: "8px 12px",
              alignItems: "center",
              alignSelf: "stretch",
              borderRadius: "6px",
              background: selectedPreset === preset ? "#F5F5F5" : "transparent",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
              color: selectedPreset === preset ? "#252B37" : "#414651",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              if (selectedPreset !== preset) {
                e.currentTarget.style.background = "#F9FAFB";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPreset !== preset) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Right side with calendar months */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Calendar months */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {/* Left month */}
          <div
            style={{
              display: "flex",
              width: "328px",
              flexDirection: "column",
              alignItems: "center",
              borderRight: "1px solid #E9EAEB",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "20px 24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                }}
              >
                {/* Month header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <button
                    onClick={handlePrevMonth}
                    style={{
                      display: "flex",
                      width: "32px",
                      height: "32px",
                      padding: "6px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "6px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="#A4A7AE"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    style={{
                      color: "#414651",
                      textAlign: "center",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "20px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {getMonthName(leftMonth)}
                  </div>
                  <div style={{ width: "32px", height: "32px" }} />
                </div>

                {/* Calendar grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "0px",
                    alignSelf: "stretch",
                  }}
                >
                  {renderCalendarMonth(leftMonth)}
                </div>
              </div>
            </div>
          </div>

          {/* Right month */}
          <div
            style={{
              display: "flex",
              width: "328px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "20px 24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                }}
              >
                {/* Month header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <div style={{ width: "32px", height: "32px" }} />
                  <div
                    style={{
                      color: "#414651",
                      textAlign: "center",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "20px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {getMonthName(rightMonth)}
                  </div>
                  <button
                    onClick={handleNextMonth}
                    style={{
                      display: "flex",
                      width: "32px",
                      height: "32px",
                      padding: "6px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "6px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="#A4A7AE"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Calendar grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "0px",
                    alignSelf: "stretch",
                  }}
                >
                  {renderCalendarMonth(rightMonth)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom panel with inputs and buttons */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            alignItems: "center",
            gap: "12px",
            alignSelf: "stretch",
            borderTop: "1px solid #E9EAEB",
          }}
        >
          {/* Input fields */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "136px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={startInput}
                  onChange={handleStartInputChange}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                color: "#A4A7AE",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              –
            </div>

            <div
              style={{
                display: "flex",
                width: "136px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={endInput}
                  onChange={handleEndInputChange}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={handleCancel}
              style={{
                display: "flex",
                height: "40px",
                padding: "10px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "20px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFF";
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleApply}
              style={{
                display: "flex",
                height: "40px",
                padding: "10px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                background: "#344698",
                boxShadow:
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                color: "#FFF",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "20px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2A3A7C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#344698";
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DatePickerCalendar;
