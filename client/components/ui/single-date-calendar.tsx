import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface SingleDateCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const SingleDateCalendar: React.FC<SingleDateCalendarProps> = ({
  isOpen,
  onClose,
  triggerRef,
  selectedDate,
  onDateChange,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Working date (internal state before apply)
  const [workingDate, setWorkingDate] = useState(selectedDate);

  // Calendar display month
  const [currentMonth, setCurrentMonth] = useState(() => {
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  });

  // Input value
  const [dateInput, setDateInput] = useState("");

  // Initialize when calendar opens
  useEffect(() => {
    if (isOpen) {
      setWorkingDate(selectedDate);
      setCurrentMonth(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
      );
      setDateInput(formatDate(selectedDate));
    }
  }, [isOpen, selectedDate]);

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

  const isToday = (date: Date): boolean => {
    return isSameDate(date, new Date());
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
      let left;

      const isMobileDevice = window.innerWidth < 768;
      if (isMobileDevice) {
        left = triggerRect.left;
      } else {
        left = triggerRect.right - calendarRect.width;
      }

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

  if (!isOpen) return null;

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
    setWorkingDate(date);
    setDateInput(formatDate(date));
  };

  // Handle today button
  const handleTodayClick = () => {
    const today = new Date();
    setWorkingDate(today);
    setDateInput(formatDate(today));
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // Handle apply
  const handleApply = () => {
    onDateChange(workingDate);
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

    // Empty cells for days before month starts (previous month)
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
      const isSelected = isSameDate(date, workingDate);
      const isTodayDate = isToday(date);

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDateClick(date)}
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
              : isTodayDate
                ? "#F5F5F5"
                : "transparent",
            cursor: "pointer",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            if (!isSelected && !isTodayDate) {
              e.currentTarget.style.background = "#F5F5F5";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected && !isTodayDate) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <div
            style={{
              width: "24px",
              color: isSelected ? "#FFF" : "#414651",
              textAlign: "center",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: isSelected ? "500" : "400",
              lineHeight: "20px",
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

  return createPortal(
    <div
      data-single-date-picker
      ref={calendarRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        display: "flex",
        width: "328px",
        alignItems: "flex-start",
        borderRadius: "16px",
        border: "1px solid #D5D7DA",
        background: "#FFF",
        boxShadow:
          "0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        zIndex: 50,
        height: "520px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: "1 0 0",
        }}
      >
        {/* Calendar content */}
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
                {getMonthName(currentMonth)}
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

            {/* Actions - Date input and Today button */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
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
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
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
                        {dateInput}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTodayClick();
                }}
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
                    Today
                  </div>
                </div>
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
              {renderCalendarMonth(currentMonth)}
            </div>
          </div>
        </div>

        {/* Bottom panel with action buttons */}
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

export default SingleDateCalendar;
