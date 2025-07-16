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
  const [isMobile, setIsMobile] = useState(false);

  // Working dates (internal state before apply)
  const [workingStartDate, setWorkingStartDate] = useState(selectedStartDate);
  const [workingEndDate, setWorkingEndDate] = useState(selectedEndDate);

  // Calendar display month
  const [currentMonth, setCurrentMonth] = useState(() => {
    const start = new Date(selectedStartDate);
    return new Date(start.getFullYear(), start.getMonth(), 1);
  });

  // Selection state
  const [selectedPreset, setSelectedPreset] = useState("");
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Input values
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  // Initialize when calendar opens
  useEffect(() => {
    if (isOpen) {
      setWorkingStartDate(selectedStartDate);
      setWorkingEndDate(selectedEndDate);
      setSelectedPreset("");
      setIsSelectingRange(false);
      setRangeStart(null);
      setHoverDate(null);

      // Set calendar to show the current date range
      const month = new Date(
        selectedStartDate.getFullYear(),
        selectedStartDate.getMonth(),
        1,
      );
      setCurrentMonth(month);

      // Update inputs
      setStartInput(formatDate(selectedStartDate));
      setEndInput(formatDate(selectedEndDate));
    }
  }, [isOpen, selectedStartDate, selectedEndDate]);

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

  const getNextMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };

  // Position calendar
  useEffect(() => {
    if (isOpen && triggerRef.current && calendarRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();

      const top = triggerRect.bottom + 4;
      let left;

      const isMobileDevice = window.innerWidth < 768;
      if (isMobileDevice) {
        // On mobile, align calendar with trigger button's left edge
        left = triggerRect.left;
      } else {
        // On tablet and desktop, align calendar's right edge with trigger's right edge
        left = triggerRect.right - calendarRect.width;
      }

      setPosition({ top, left });
    }
  }, [isOpen, triggerRef]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        calendarRef.current &&
        !calendarRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle responsive breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Treat tablet as mobile for layout
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isOpen) return null;

  // Check responsive breakpoints - consistent with isMobile state
  const currentWidth = window.innerWidth;
  const isMobileDevice = currentWidth < 768; // True mobile only
  const isTablet = currentWidth >= 768 && currentWidth < 1024; // Tablet range
  const isDesktop = currentWidth >= 1024; // Desktop only

  // Preset options
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

  // Mobile preset options (shortened list matching design)
  const mobilePresets = ["Last week", "Last month", "Last year"];

  // Handle preset selection
  const handlePresetClick = (preset: string) => {
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
        start = new Date(2020, 0, 1);
        end = today;
        break;

      default:
        return;
    }

    // Update working dates
    setWorkingStartDate(start);
    setWorkingEndDate(end);

    // Update inputs
    setStartInput(formatDate(start));
    setEndInput(formatDate(end));

    // Update calendar view to show the start date
    setCurrentMonth(new Date(start.getFullYear(), start.getMonth(), 1));
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  // Handle date clicks
  const handleDateClick = (date: Date) => {
    setSelectedPreset(""); // Clear preset when manually selecting

    if (!isSelectingRange) {
      // Start new selection
      setIsSelectingRange(true);
      setRangeStart(date);
      setWorkingStartDate(date);
      setWorkingEndDate(date);
      setHoverDate(null);
    } else {
      // Complete selection
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

  // Handle date hover
  const handleDateHover = (date: Date) => {
    if (isSelectingRange && rangeStart) {
      setHoverDate(date);
    }
  };

  // Handle input changes
  const handleStartInputChange = (value: string) => {
    setStartInput(value);
    const parsed = parseDate(value);
    if (parsed) {
      setWorkingStartDate(parsed);
      setSelectedPreset("");
    }
  };

  const handleEndInputChange = (value: string) => {
    setEndInput(value);
    const parsed = parseDate(value);
    if (parsed) {
      setWorkingEndDate(parsed);
      setSelectedPreset("");
    }
  };

  // Handle apply
  const handleApply = () => {
    onDateChange(workingStartDate, workingEndDate);
    onClose();
  };

  // Handle cancel
  const handleCancel = () => {
    onClose();
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
            padding: "10px 8px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9999px",
          }}
        >
          <div
            style={{
              width: "24px",
              color: "#414651",
              textAlign: "center",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            {day}
          </div>
        </div>,
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      const prevMonth = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() - 1,
      );
      const prevMonthDays = getDaysInMonth(prevMonth);
      const day = prevMonthDays - (firstDay - 1 - i);

      days.push(
        <div
          key={`prev-${i}`}
          style={{
            display: "flex",
            width: "40px",
            height: "40px",
            padding: "10px 8px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9999px",
          }}
        >
          <div
            style={{
              width: "24px",
              color: "#717680",
              textAlign: "center",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
            }}
          >
            {day}
          </div>
        </div>,
      );
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      const dayIndex = (firstDay + day - 1) % 7; // Position in current week
      const isLastInRow = dayIndex === 6; // Sunday (last column)
      const isFirstInRow = dayIndex === 0; // Monday (first column)

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

      // Range connectors only for in-range dates and not at row ends
      const needsLeftConnector = isInRange && !isRangeStart && !isFirstInRow;
      const needsRightConnector = isInRange && !isRangeEnd && !isLastInRow;

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => handleDateHover(date)}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "9999px",
            background: isSelected
              ? "#344698"
              : isInRange
                ? "#F5F5F5"
                : "transparent",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Range connectors */}
          {needsLeftConnector && (
            <svg
              style={{
                width: "40px",
                height: "40px",
                position: "absolute",
                left: "-20px",
                top: "0px",
                zIndex: -1,
              }}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40 0H0C11.0457 0 20 8.95435 20 20C20 31.0457 11.0457 40 0 40H40C28.9543 40 20 31.0457 20 20C20 8.95435 28.9543 0 40 0Z"
                fill="#F5F5F5"
              />
            </svg>
          )}
          {needsRightConnector && (
            <svg
              style={{
                width: "40px",
                height: "40px",
                position: "absolute",
                left: "20px",
                top: "0px",
                zIndex: -1,
              }}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 20C20 31.0457 28.9543 40 40 40H0C11.0457 40 20 31.0457 20 20ZM0 0C11.0457 0 20 8.95435 20 20C20 8.95435 28.9543 0 40 0H0Z"
                fill="#F5F5F5"
              />
            </svg>
          )}

          <div
            style={{
              width: "24px",
              color: isSelected ? "#FFF" : "#414651",
              textAlign: "center",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {day}
          </div>
        </div>,
      );
    }

    // Next month leading days to fill the grid
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          style={{
            display: "flex",
            width: "40px",
            height: "40px",
            padding: "10px 8px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9999px",
          }}
        >
          <div
            style={{
              width: "24px",
              color: "#717680",
              textAlign: "center",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
            }}
          >
            {day}
          </div>
        </div>,
      );
    }

    return days;
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

  const leftMonth = currentMonth;
  const rightMonth = getNextMonth(currentMonth);

  return createPortal(
    <div
      data-date-picker
      ref={calendarRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        display: "flex",
        width: isMobileDevice
          ? triggerRef.current
            ? `${triggerRef.current.getBoundingClientRect().width}px`
            : "343px"
          : "342px", // Fixed width matching Figma design
        alignItems: "flex-start",
        borderRadius: "8px",
        border: "1px solid #D5D7DA",
        background: "#FFF",
        boxShadow:
          "0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        zIndex: 50,
      }}
    >
      {/* Desktop: Left sidebar with presets */}
      {!isMobile && (
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
              onClick={(e) => {
                e.stopPropagation();
                handlePresetClick(preset);
              }}
              style={{
                display: "flex",
                padding: "8px 12px",
                alignItems: "center",
                alignSelf: "stretch",
                borderRadius: "6px",
                background:
                  selectedPreset === preset ? "#F5F5F5" : "transparent",
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
      )}

      {/* Main calendar container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: "1 0 0",
        }}
      >
        {/* Calendar content - matches Figma design exactly */}
        <div
          style={{
            display: "flex",
            padding: "20px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
          }}
        >
          {/* Calendar section */}
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
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevMonth();
                }}
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
                }}
              >
                {getMonthName(leftMonth)}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextMonth();
                }}
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

            {/* Input fields - positioned after month header */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  flex: "1 0 0",
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
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        flex: "1 0 0",
                        overflow: "hidden",
                        color: "#181D27",
                        textOverflow: "ellipsis",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "24px",
                      }}
                    >
                      {startInput}
                    </div>
                  </div>
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
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  flex: "1 0 0",
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
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        flex: "1 0 0",
                        overflow: "hidden",
                        color: "#181D27",
                        textOverflow: "ellipsis",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "24px",
                      }}
                    >
                      {endInput}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preset actions - positioned above calendar grid matching Figma */}
            <div
              style={{
                display: "flex",
                padding: "4px 8px 0px 8px",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              {mobilePresets.map((preset) => (
                <button
                  key={preset}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePresetClick(preset);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "20px",
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Calendar grid - matches Figma design exactly */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                alignContent: "flex-start",
                gap: "4px 0px",
                alignSelf: "stretch",
                flexWrap: "wrap",
              }}
            >
              {renderCalendarMonth(leftMonth)}
            </div>
          </div>
        </div>

        {/* Bottom panel with action buttons - matching Figma design */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            gap: "12px",
            alignSelf: "stretch",
            borderTop: "1px solid #E9EAEB",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              flex: "1 0 0",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                flex: "1 0 0",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0px 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "20px",
                  }}
                >
                  Cancel
                </div>
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleApply();
              }}
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                flex: "1 0 0",
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                background: "#344698",
                boxShadow:
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0px 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "20px",
                  }}
                >
                  Apply
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DatePickerCalendar;
