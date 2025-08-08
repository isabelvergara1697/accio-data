import React, { useState, useRef } from "react";
import DatePickerCalendar from "./ui/date-picker-calendar";
import FilterDropdown from "./ui/filter-dropdown";

interface FiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FilterState {
  status: string[];
  typeOfPackage: string[];
  i9Filled: string[];
  activate: string[];
  ews: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    typeOfPackage: [],
    i9Filled: [],
    activate: [],
    ews: [],
    dateRange: {
      start: new Date(),
      end: new Date(),
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hoveredCloseButton, setHoveredCloseButton] = useState(false);
  const datePickerRef = useRef<HTMLButtonElement>(null);

  const statusOptions = [
    { value: "waiting", label: "Waiting" },
    { value: "expired", label: "Expired" },
    { value: "canceled", label: "Canceled" },
    { value: "unsolicited", label: "Unsolicited" },
    { value: "waiting-for-recruitee", label: "Waiting for Recruitee" },
    { value: "expires-today", label: "Expires Today" },
  ];

  const packageTypeOptions = [
    { value: "basic", label: "Basic Package" },
    { value: "premium", label: "Premium Package" },
    { value: "enterprise", label: "Enterprise Package" },
  ];

  const i9FilledOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "pending", label: "Pending" },
  ];

  const activateOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const ewsOptions = [
    { value: "verified", label: "Verified" },
    { value: "not-verified", label: "Not Verified" },
    { value: "pending", label: "Pending" },
  ];

  const handleFilterChange = (key: keyof FilterState, value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start, end },
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Filters Panel */}
      <div
        style={{
          display: "flex",
          width: "258px",
          height: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            height: "64px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            flexShrink: 0,
            alignSelf: "stretch",
            borderRadius: "12px 12px 0 0",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "16px 16px 12px 16px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "2px",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "28px",
                        position: "relative",
                      }}
                    >
                      Filters
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  position: "relative",
                }}
              >
                <button
                  onClick={onClose}
                  onMouseEnter={() => setHoveredCloseButton(true)}
                  onMouseLeave={() => setHoveredCloseButton(false)}
                  style={{
                    display: "flex",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: hoveredCloseButton ? "#FDFDFD" : "#FFF",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.3333 4.66675L4.66666 11.3334M4.66666 4.66675L11.3333 11.3334"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Content */}
        <div
          style={{
            display: "flex",
            padding: "12px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            flex: "1 1 auto",
            alignSelf: "stretch",
            borderRadius: "0px 0px 12px 12px",
            borderRight: "1px solid #E9EAEB",
            borderBottom: "1px solid #E9EAEB",
            borderLeft: "1px solid #E9EAEB",
            background: "#FFF",
            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Status Filter */}
          <FilterDropdown
            label="Status"
            options={statusOptions}
            selectedValues={filters.status}
            onSelectionChange={(values) => handleFilterChange("status", values)}
            placeholder="Select Status"
          />

          {/* Type of Package Filter */}
          <FilterDropdown
            label="Type of Package"
            options={packageTypeOptions}
            selectedValues={filters.typeOfPackage}
            onSelectionChange={(values) => handleFilterChange("typeOfPackage", values)}
            placeholder="Select Filter"
          />

          {/* I-9 Filled Filter */}
          <FilterDropdown
            label="I-9 Filled"
            options={i9FilledOptions}
            selectedValues={filters.i9Filled}
            onSelectionChange={(values) => handleFilterChange("i9Filled", values)}
            placeholder="Select Filter"
          />

          {/* Activate Filter */}
          <FilterDropdown
            label="Activate"
            options={activateOptions}
            selectedValues={filters.activate}
            onSelectionChange={(values) => handleFilterChange("activate", values)}
            placeholder="Select Filter"
          />

          {/* EWS Filter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  EWS
                </div>
              </div>
              <div
                style={{
                  height: "32px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <select
                  value={filters.ews}
                  onChange={(e) => handleFilterChange("ews", e.target.value)}
                  style={{
                    height: "32px",
                    padding: "6px 8px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    fontSize: "14px",
                    fontFamily: "Public Sans",
                    color: "#414651",
                    outline: "none",
                    cursor: "pointer",
                    width: "100%",
                    appearance: "none",
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg width=\'16\' height=\'16\' viewBox=\'0 0 16 16\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath d=\'M4 6L8 10L12 6\' stroke=\'%23A4A7AE\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3e%3c/svg%3e")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 8px center",
                    paddingRight: "32px",
                  }}
                >
                  <option value="">Select Filter</option>
                  {ewsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date Range Filter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Date Range
                </div>
              </div>
              <div
                style={{
                  height: "32px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <button
                  ref={datePickerRef}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "6px 8px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: "1",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        color: "#717680",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      Select Date
                    </span>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#A4A7AE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker */}
      {showDatePicker && (
        <DatePickerCalendar
          isOpen={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          triggerRef={datePickerRef}
          selectedStartDate={filters.dateRange.start}
          selectedEndDate={filters.dateRange.end}
          onDateChange={handleDateRangeChange}
        />
      )}
    </>
  );
};

export default FiltersPanel;
