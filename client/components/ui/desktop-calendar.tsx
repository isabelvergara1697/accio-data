import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DesktopCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  selectedStartDate: Date;
  selectedEndDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DesktopCalendar: React.FC<DesktopCalendarProps> = ({
  isOpen,
  onClose,
  triggerRef,
  selectedStartDate,
  selectedEndDate,
  onDateChange,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Working dates (internal state before apply)
  const [workingStartDate, setWorkingStartDate] = useState(selectedStartDate);
  const [workingEndDate, setWorkingEndDate] = useState(selectedEndDate);

  // Calendar display months
  const [leftMonth, setLeftMonth] = useState(() => {
    const start = new Date(selectedStartDate);
    return new Date(start.getFullYear(), start.getMonth(), 1);
  });

  const [rightMonth, setRightMonth] = useState(() => {
    const start = new Date(selectedStartDate);
    return new Date(start.getFullYear(), start.getMonth() + 1, 1);
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
      const startMonth = new Date(
        selectedStartDate.getFullYear(),
        selectedStartDate.getMonth(),
        1,
      );
      setLeftMonth(startMonth);
      setRightMonth(
        new Date(startMonth.getFullYear(), startMonth.getMonth() + 1, 1),
      );

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

  // Position calendar
  const updatePosition = () => {
    if (isOpen && triggerRef.current && calendarRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();

      const top = triggerRect.bottom + 4;
      // On desktop, align calendar's right edge with trigger's right edge
      const left = triggerRect.right - calendarRect.width;

      setPosition({ top, left });
    }
  };

  useEffect(() => {
    updatePosition();
  }, [isOpen, triggerRef]);

  // Recalculate position on window resize
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Check if the click is inside the calendar
      if (calendarRef.current && calendarRef.current.contains(target)) {
        return; // Don't close if clicking inside calendar
      }

      // Check if the click is on the trigger button
      if (triggerRef.current && triggerRef.current.contains(target)) {
        return; // Don't close if clicking on trigger
      }

      // Close calendar if clicking outside
      onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside, {
        capture: true,
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, {
        capture: true,
      });
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

  if (!isOpen) return null;

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
    setLeftMonth(new Date(start.getFullYear(), start.getMonth(), 1));
    setRightMonth(new Date(start.getFullYear(), start.getMonth() + 1, 1));
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setLeftMonth((prev) => {
      const newLeft = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      setRightMonth(new Date(newLeft.getFullYear(), newLeft.getMonth() + 1, 1));
      return newLeft;
    });
  };

  const handleNextMonth = () => {
    setRightMonth((prev) => {
      const newRight = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      setLeftMonth(
        new Date(newRight.getFullYear(), newRight.getMonth() - 1, 1),
      );
      return newRight;
    });
  };

  // Handle date clicks - simplified version
  const handleDateClick = (date: Date, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Date clicked:", date); // Debug log
    setSelectedPreset(""); // Clear preset when manually selecting

    if (!isSelectingRange) {
      // Start new selection
      setIsSelectingRange(true);
      setRangeStart(date);
      setWorkingStartDate(date);
      setWorkingEndDate(date);
      setHoverDate(null);
      setStartInput(formatDate(date));
      setEndInput(formatDate(date));
      console.log("Started range selection:", date); // Debug log
    } else {
      // Complete selection
      if (rangeStart) {
        const start = date < rangeStart ? date : rangeStart;
        const end = date > rangeStart ? date : rangeStart;

        setWorkingStartDate(start);
        setWorkingEndDate(end);
        setStartInput(formatDate(start));
        setEndInput(formatDate(end));
        console.log("Completed range selection:", start, end); // Debug log
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

  // Handle apply
  const handleApply = () => {
    console.log("Apply clicked:", workingStartDate, workingEndDate); // Debug log
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
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
      const dayIndex = (firstDay + day - 1) % 7;
      const isLastInRow = dayIndex === 6;
      const isFirstInRow = dayIndex === 0;

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
          onClick={(e) => {
            handleDateClick(date, e);
          }}
          onMouseEnter={() => handleDateHover(date)}
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* Range background for in-range dates */}
          {isInRange && (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: isRangeStart || isFirstInRow ? "20px" : "-20px",
                right: isRangeEnd || isLastInRow ? "20px" : "-20px",
                height: "40px",
                background: "#F5F5F5",
                zIndex: 0,
                borderRadius: isRangeStart
                  ? "20px 0 0 20px"
                  : isRangeEnd
                    ? "0 20px 20px 0"
                    : "0",
              }}
            />
          )}

          {/* Selected date circle */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: isSelected ? "#344698" : "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                color: isSelected ? "#FFF" : "#414651",
                textAlign: "center",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              {day}
            </div>
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
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

  return createPortal(
    <div
      ref={calendarRef}
      data-date-picker
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
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
        zIndex: 9999,
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
          gap: "4px 0px",
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
              background: selectedPreset === preset ? "#F5F5F5" : "transparent",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
              color: selectedPreset === preset ? "#252B37" : "#717680",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "400",
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

      {/* Calendar content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Date pickers */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {/* Left calendar */}
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
                  <div style={{ width: "32px", height: "32px" }} />
                </div>

                {/* Calendar grid */}
                <div
                  style={{
                    display: "flex",
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
          </div>

          {/* Right calendar */}
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
                    }}
                  >
                    {getMonthName(rightMonth)}
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

                {/* Calendar grid */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                    gap: "4px 0px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  {renderCalendarMonth(rightMonth)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            alignItems: "flex-start",
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
                  height: "40px",
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
                  height: "40px",
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

          {/* Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              style={{
                display: "flex",
                padding: "8px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "20px",
                height: "40px",
              }}
            >
              Cancel
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleApply();
              }}
              style={{
                display: "flex",
                padding: "8px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                background: "#344698",
                boxShadow:
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
                color: "#FFF",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "20px",
                height: "40px",
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

export default DesktopCalendar;
