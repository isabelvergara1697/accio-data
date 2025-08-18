import React, { useState, useRef, useEffect } from "react";

export interface OrdersFilterState {
  status: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userID: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

interface OrdersFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: OrdersFilterState;
  onFiltersChange: (filters: OrdersFilterState) => void;
  isMobile?: boolean;
}

export const OrdersFiltersModal: React.FC<OrdersFiltersModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  isMobile = false,
}) => {
  const [localFilters, setLocalFilters] = useState<OrdersFilterState>(filters);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Keep local filters in sync with parent
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  const statusOptions = [
    { value: "processing", label: "Processing" },
    { value: "pending-review", label: "Pending Review" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "on-hold", label: "On Hold" },
    { value: "completed", label: "Completed" },
    { value: "canceled", label: "Canceled" },
    { value: "expired", label: "Expired" },
  ];

  const handleFilterChange = (key: keyof OrdersFilterState, value: string[] | string) => {
    const newFilters = {
      ...localFilters,
      [key]: value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: OrdersFilterState = {
      status: [],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userID: "",
      dateRange: {
        start: null,
        end: null,
      },
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasAppliedFilters = () => {
    return (
      localFilters.status.length > 0 ||
      localFilters.firstName.trim() !== "" ||
      localFilters.lastName.trim() !== "" ||
      localFilters.email.trim() !== "" ||
      localFilters.phone.trim() !== "" ||
      localFilters.userID.trim() !== "" ||
      (localFilters.dateRange.start !== null && localFilters.dateRange.end !== null)
    );
  };

  const formatDateRange = (startDate: Date | null, endDate: Date | null): string => {
    if (!startDate || !endDate) {
      return "Jan 10, 2025 – Jan 16, 2025"; // Default placeholder
    }
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const formatSingleDate = (date: Date) => {
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return `${formatSingleDate(startDate)} – ${formatSingleDate(endDate)}`;
  };

  // Mobile Modal Layout
  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* Background Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(10, 13, 18, 0.7)",
            backdropFilter: "blur(4px)",
          }}
          onClick={onClose}
        />

        {/* Modal Panel */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            maxWidth: "400px",
            height: "100vh",
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            boxShadow:
              "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              padding: "24px 20px",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #E9EAEB",
              background: "#FFF",
            }}
          >
            <div
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
              }}
            >
              Filters
            </div>

            <button
              onClick={onClose}
              style={{
                display: "flex",
                width: "32px",
                height: "32px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                cursor: "pointer",
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

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Clear All Section */}
            {hasAppliedFilters() && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #E9EAEB",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Filters Applied
                </div>
                <button
                  onClick={clearAllFilters}
                  style={{
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Text Inputs Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Search Fields
              </div>

              {/* First Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={localFilters.firstName}
                  onChange={(e) => handleFilterChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    color: "#181D27",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Last Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={localFilters.lastName}
                  onChange={(e) => handleFilterChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    color: "#181D27",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={localFilters.email}
                  onChange={(e) => handleFilterChange("email", e.target.value)}
                  placeholder="Enter email address"
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    color: "#181D27",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  value={localFilters.phone}
                  onChange={(e) => handleFilterChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    color: "#181D27",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* User ID */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  User ID
                </label>
                <input
                  type="text"
                  value={localFilters.userID}
                  onChange={(e) => handleFilterChange("userID", e.target.value)}
                  placeholder="Enter user ID"
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    color: "#181D27",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Modal Layout
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(10, 13, 18, 0.7)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "600px",
          maxWidth: "90vw",
          maxHeight: "80vh",
          background: "#FFF",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "24px 24px 16px 24px",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E9EAEB",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "40px",
                height: "40px",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                background: "#D9DEF2",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16667 17.5L4.16667 12.5M4.16667 12.5C5.08714 12.5 5.83333 11.7538 5.83333 10.8333C5.83333 9.91286 5.08714 9.16667 4.16667 9.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333C2.5 11.7538 3.24619 12.5 4.16667 12.5ZM4.16667 5.83333V2.5M10 17.5V12.5M10 5.83333V2.5M10 5.83333C9.07953 5.83333 8.33333 6.57953 8.33333 7.5C8.33333 8.42047 9.07953 9.16667 10 9.16667C10.9205 9.16667 11.6667 8.42047 11.6667 7.5C11.6667 6.57953 10.9205 5.83333 10 5.83333ZM15.8333 17.5V14.1667M15.8333 14.1667C16.7538 14.1667 17.5 13.4205 17.5 12.5C17.5 11.5795 16.7538 10.8333 15.8333 10.8333C14.9129 10.8333 14.1667 11.5795 14.1667 12.5C14.1667 13.4205 14.9129 14.1667 15.8333 14.1667ZM15.8333 7.5V2.5"
                  stroke="#344698"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                Filter Orders
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                {hasAppliedFilters() ? "Filters applied" : "No filter selected"}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              display: "flex",
              width: "32px",
              height: "32px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              cursor: "pointer",
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

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Clear All Section */}
          {hasAppliedFilters() && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "16px",
                borderBottom: "1px solid #E9EAEB",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Filters Applied
              </div>
              <button
                onClick={clearAllFilters}
                style={{
                  color: "#273572",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Clear All
              </button>
            </div>
          )}

          {/* Form Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* First Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                First Name
              </label>
              <input
                type="text"
                value={localFilters.firstName}
                onChange={(e) => handleFilterChange("firstName", e.target.value)}
                placeholder="Enter first name"
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  color: "#181D27",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Last Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={localFilters.lastName}
                onChange={(e) => handleFilterChange("lastName", e.target.value)}
                placeholder="Enter last name"
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  color: "#181D27",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Email - spans both columns */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "1 / -1" }}>
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={localFilters.email}
                onChange={(e) => handleFilterChange("email", e.target.value)}
                placeholder="Enter email address"
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  color: "#181D27",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Phone
              </label>
              <input
                type="tel"
                value={localFilters.phone}
                onChange={(e) => handleFilterChange("phone", e.target.value)}
                placeholder="Enter phone number"
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  color: "#181D27",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* User ID */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                User ID
              </label>
              <input
                type="text"
                value={localFilters.userID}
                onChange={(e) => handleFilterChange("userID", e.target.value)}
                placeholder="Enter user ID"
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  color: "#181D27",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
