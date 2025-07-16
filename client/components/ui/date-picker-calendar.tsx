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
  // Helper function to format dates
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

  const calendarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedPreset, setSelectedPreset] = useState("This month");
  const [leftMonth, setLeftMonth] = useState(new Date(2025, 0)); // January 2025
  const [rightMonth, setRightMonth] = useState(new Date(2025, 1)); // February 2025
  const [startDate, setStartDate] = useState(selectedStartDate);
  const [endDate, setEndDate] = useState(selectedEndDate);
  const [startInput, setStartInput] = useState(formatDate(selectedStartDate));
  const [endInput, setEndInput] = useState(formatDate(selectedEndDate));
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  // Position the calendar relative to the trigger button
  useEffect(() => {
    if (isOpen && triggerRef.current && calendarRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();

      // Position 4px below and right-aligned with the button
      const top = triggerRect.bottom + 4;
      const left = triggerRect.right - calendarRect.width;

      setPosition({ top, left });
    }
  }, [isOpen, triggerRef]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
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

  // Close on Escape key
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

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday=0 to Monday=0
  };

  const isDateInRange = (date: Date, monthDate: Date, day: number): boolean => {
    const currentDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      day,
    );
    const rangeStart = isSelectingRange && tempDate ? tempDate : startDate;
    const rangeEnd = isSelectingRange && tempDate ? startDate : endDate;
    return currentDate >= rangeStart && currentDate <= rangeEnd;
  };

  const isDateSelected = (
    date: Date,
    monthDate: Date,
    day: number,
  ): boolean => {
    const currentDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      day,
    );

    if (isSelectingRange && tempDate) {
      const rangeStart = tempDate < startDate ? tempDate : startDate;
      const rangeEnd = tempDate < startDate ? startDate : tempDate;
      return (
        currentDate.getTime() === rangeStart.getTime() ||
        currentDate.getTime() === rangeEnd.getTime()
      );
    }

    return (
      currentDate.getTime() === startDate.getTime() ||
      currentDate.getTime() === endDate.getTime()
    );
  };

  const isRangeStart = (monthDate: Date, day: number): boolean => {
    const currentDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      day,
    );

    if (isSelectingRange && tempDate) {
      const rangeStart = tempDate < startDate ? tempDate : startDate;
      return currentDate.getTime() === rangeStart.getTime();
    }

    return currentDate.getTime() === startDate.getTime();
  };

  const isRangeEnd = (monthDate: Date, day: number): boolean => {
    const currentDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      day,
    );

    if (isSelectingRange && tempDate) {
      const rangeEnd = tempDate < startDate ? startDate : tempDate;
      return currentDate.getTime() === rangeEnd.getTime();
    }

    return currentDate.getTime() === endDate.getTime();
  };

  const handleDateClick = (monthDate: Date, day: number) => {
    const clickedDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      day,
    );

    if (!isSelectingRange) {
      // Start new range selection
      setStartDate(clickedDate);
      setTempDate(clickedDate);
      setIsSelectingRange(true);
      setStartInput(formatDate(clickedDate));
    } else {
      // Complete range selection
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
        setEndDate(startDate);
        setStartInput(formatDate(clickedDate));
        setEndInput(formatDate(startDate));
      } else {
        setEndDate(clickedDate);
        setEndInput(formatDate(clickedDate));
      }
      setIsSelectingRange(false);
      setTempDate(null);
    }
  };

  const handleDateHover = (monthDate: Date, day: number) => {
    if (isSelectingRange) {
      const hoveredDate = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        day,
      );
      setTempDate(hoveredDate);
    }
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

  const navigateMonth = (direction: "prev" | "next", isLeft: boolean) => {
    if (isLeft) {
      if (direction === "prev") {
        setLeftMonth(
          new Date(leftMonth.getFullYear(), leftMonth.getMonth() - 1),
        );
        setRightMonth(
          new Date(rightMonth.getFullYear(), rightMonth.getMonth() - 1),
        );
      }
    } else {
      if (direction === "next") {
        setLeftMonth(
          new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1),
        );
        setRightMonth(
          new Date(rightMonth.getFullYear(), rightMonth.getMonth() + 1),
        );
      }
    }
  };

  const handleApply = () => {
    onDateChange(startDate, endDate);
    onClose();
  };

  const handleCancel = () => {
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
    setStartInput(formatDate(selectedStartDate));
    setEndInput(formatDate(selectedEndDate));
    setIsSelectingRange(false);
    setTempDate(null);
    onClose();
  };

  const handlePresetClick = (preset: string) => {
    setSelectedPreset(preset);
    const today = new Date();
    let newStartDate: Date;
    let newEndDate: Date;

    switch (preset) {
      case "This week":
        const dayOfWeek = today.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() + mondayOffset);
        newEndDate = new Date(newStartDate);
        newEndDate.setDate(newStartDate.getDate() + 6);
        break;
      case "Last week":
        const lastWeekMonday = new Date(today);
        lastWeekMonday.setDate(today.getDate() - today.getDay() - 6);
        newStartDate = lastWeekMonday;
        newEndDate = new Date(lastWeekMonday);
        newEndDate.setDate(lastWeekMonday.getDate() + 6);
        break;
      case "This month":
        newStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        newEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "Last month":
        newStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        newEndDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case "Last tree months":
        newStartDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        newEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "Last six months":
        newStartDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);
        newEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "This year":
        newStartDate = new Date(today.getFullYear(), 0, 1);
        newEndDate = new Date(today.getFullYear(), 11, 31);
        break;
      case "Last year":
        newStartDate = new Date(today.getFullYear() - 1, 0, 1);
        newEndDate = new Date(today.getFullYear() - 1, 11, 31);
        break;
      case "All time":
      default:
        newStartDate = new Date(2020, 0, 1);
        newEndDate = today;
        break;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setStartInput(formatDate(newStartDate));
    setEndInput(formatDate(newEndDate));
    setIsSelectingRange(false);
    setTempDate(null);
  };

  const renderCalendarDays = (monthDate: Date): JSX.Element[] => {
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

    // Previous month's trailing days (disabled)
    const prevMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() - 1,
    );
    const prevMonthDays = getDaysInMonth(prevMonth);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <div
          key={`prev-${day}`}
          style={{
            display: "flex",
            width: "40px",
            height: "40px",
            padding: "10px 8px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9999px",
            cursor: "default",
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

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(monthDate, monthDate, day);
      const isInRange = isDateInRange(monthDate, monthDate, day);
      const isStart = isRangeStart(monthDate, day);
      const isEnd = isRangeEnd(monthDate, day);

      days.push(
        <div
          key={`current-${day}`}
          onClick={() => handleDateClick(monthDate, day)}
          onMouseEnter={() => handleDateHover(monthDate, day)}
          style={{
            display: "flex",
            width: "40px",
            height: "40px",
            padding: "10px 8px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9999px",
            background: isSelected
              ? "#344698"
              : isInRange
                ? "#F5F5F5"
                : "transparent",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {/* Range connectors */}
          {(isInRange || isSelected) && (
            <>
              {/* Left connector - show if not range start and in range */}
              {!isStart && (isInRange || isEnd) && (
                <div
                  style={{
                    position: "absolute",
                    left: "-20px",
                    top: "0px",
                    width: "40px",
                    height: "40px",
                    background: "#F5F5F5",
                    zIndex: -1,
                  }}
                />
              )}
              {/* Right connector - show if not range end and in range */}
              {!isEnd && (isInRange || isStart) && (
                <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    top: "0px",
                    width: "40px",
                    height: "40px",
                    background: "#F5F5F5",
                    zIndex: -1,
                  }}
                />
              )}
            </>
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
            }}
          >
            {day}
          </div>
        </div>,
      );
    }

    // Next month's leading days (disabled)
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
            cursor: "default",
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

  return createPortal(
    <div
      ref={calendarRef}
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
          <div
            key={preset}
            onClick={() => handlePresetClick(preset)}
            style={{
              display: "flex",
              padding: "8px 12px",
              alignItems: "center",
              alignSelf: "stretch",
              borderRadius: "6px",
              background: selectedPreset === preset ? "#F5F5F5" : "transparent",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                color: selectedPreset === preset ? "#252B37" : "#414651",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              {preset}
            </div>
          </div>
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
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
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
                    onClick={() => navigateMonth("prev", true)}
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
                  {renderCalendarDays(leftMonth)}
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
                    }}
                  >
                    {getMonthName(rightMonth)}
                  </div>
                  <button
                    onClick={() => navigateMonth("next", false)}
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
                  {renderCalendarDays(rightMonth)}
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
                }}
              >
                <input
                  type="text"
                  value={startInput}
                  onChange={(e) => setStartInput(e.target.value)}
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
                  onChange={(e) => setEndInput(e.target.value)}
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
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
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
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "20px",
                }}
              >
                Cancel
              </div>
            </button>

            <button
              onClick={handleApply}
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
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
                  color: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "20px",
                }}
              >
                Apply
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
