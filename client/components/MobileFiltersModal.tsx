import React, { useState, useRef } from "react";
import FilterDropdown from "./ui/filter-dropdown";

export interface FilterState {
  status: string[];
  typeOfPackage: string[];
  i9Filled: string[];
  activate: string[];
  ews: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

interface MobileFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const MobileFiltersModal: React.FC<MobileFiltersModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  // Date picker disabled on mobile
  const datePickerRef = useRef<HTMLButtonElement>(null);

  // Keep local filters in sync with parent
  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  if (!isOpen) return null;

  // Filter options
  const statusOptions = [
    { value: "waiting", label: "Waiting" },
    { value: "expired", label: "Expired" },
    { value: "canceled", label: "Canceled" },
    { value: "unsolicited", label: "Unsolicited" },
    { value: "waiting-for-recruitee", label: "Waiting for Recruitee" },
    { value: "expires-today", label: "Expires Today" },
  ];

  const packageTypeOptions = [
    { value: "csd-standard", label: "CSD Standard" },
    { value: "volunteer-application", label: "Volunteer Application" },
    { value: "a-la-carte", label: "A La Carte" },
    { value: "retail", label: "Retail" },
    { value: "mvr", label: "MVR" },
    { value: "sales", label: "Sales" },
    { value: "executive", label: "Executive" },
    { value: "operations", label: "Operations" },
    { value: "hourly", label: "Hourly" },
    { value: "cbsv", label: "CBSV" },
    { value: "dot", label: "DOT" },
    { value: "new-york", label: "New York" },
    { value: "immunization-records", label: "Immunization Records" },
    { value: "just-mvr", label: "Just MVR" },
    { value: "hasc-contractor", label: "HASC Contractor" },
    {
      value: "applicant-provided-address-only",
      label: "Applicant provided address only",
    },
    { value: "employment-only", label: "Employment Only" },
    { value: "sap-10", label: "SAP 10" },
    { value: "identity-check-package", label: "Identity Check Package" },
    {
      value: "identity-check-test-package-includes-product",
      label: "Identity Check Test Package Includes Product",
    },
    { value: "standard-with-edu-and-emp", label: "Standard with EDU and EMP" },
    { value: "executive-plus", label: "Executive Plus" },
  ];

  const i9FilledOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const activateOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const ewsOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const handleFilterChange = (key: keyof FilterState, value: string[]) => {
    const newFilters = {
      ...localFilters,
      [key]: value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    const newFilters = {
      ...localFilters,
      dateRange: { start, end },
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      status: [],
      typeOfPackage: [],
      i9Filled: [],
      activate: [],
      ews: [],
      dateRange: {
        start: null,
        end: null,
      },
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const removeFilter = (
    filterKey: keyof FilterState,
    valueToRemove: string,
  ) => {
    if (filterKey === "dateRange") {
      const newFilters = {
        ...localFilters,
        dateRange: {
          start: new Date(2025, 0, 10),
          end: new Date(2025, 0, 16),
        },
      };
      setLocalFilters(newFilters);
      onFiltersChange(newFilters);
    } else {
      const currentValues = localFilters[filterKey] as string[];
      const newValues = currentValues.filter(
        (value) => value !== valueToRemove,
      );
      handleFilterChange(filterKey, newValues);
    }
  };

  const getFilterLabel = (
    filterKey: keyof FilterState,
    value: string,
  ): string => {
    const optionsMap = {
      status: statusOptions,
      typeOfPackage: packageTypeOptions,
      i9Filled: i9FilledOptions,
      activate: activateOptions,
      ews: ewsOptions,
    };

    if (filterKey in optionsMap) {
      const option = optionsMap[filterKey as keyof typeof optionsMap].find(
        (opt) => opt.value === value,
      );
      return option?.label || value;
    }
    return value;
  };

  const getAppliedFilters = () => {
    const appliedFilters: Array<{
      key: keyof FilterState;
      value: string;
      label: string;
    }> = [];

    // Check each filter type
    (Object.keys(localFilters) as Array<keyof FilterState>).forEach((key) => {
      if (key === "dateRange") {
        const defaultStart = new Date(2025, 0, 10);
        const defaultEnd = new Date(2025, 0, 16);
        if (
          localFilters.dateRange.start &&
          localFilters.dateRange.end &&
          (localFilters.dateRange.start.getTime() !== defaultStart.getTime() ||
          localFilters.dateRange.end.getTime() !== defaultEnd.getTime())
        ) {
          appliedFilters.push({
            key: "dateRange",
            value: "dateRange",
            label: `Date: ${formatDateRange(localFilters.dateRange.start, localFilters.dateRange.end)}`,
          });
        }
      } else {
        const values = localFilters[key] as string[];
        if (values.length === 0) return;

        values.forEach((value) => {
          let filterLabel = "";
          switch (key) {
            case "status":
              filterLabel = "Status";
              break;
            case "typeOfPackage":
              filterLabel = "Type of Package";
              break;
            case "i9Filled":
              filterLabel = "I-9 Filled";
              break;
            case "activate":
              filterLabel = "Activate";
              break;
            case "ews":
              filterLabel = "EWS";
              break;
            default:
              filterLabel =
                key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1");
          }
          appliedFilters.push({
            key,
            value,
            label: `${filterLabel}: ${getFilterLabel(key, value)}`,
          });
        });
      }
    });

    return appliedFilters;
  };

  const hasAppliedFilters = () => {
    return getAppliedFilters().length > 0;
  };

  const formatDateRange = (startDate: Date, endDate: Date): string => {
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

    const formatSingleDate = (date: Date) => {
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return `${formatSingleDate(startDate)} – ${formatSingleDate(endDate)}`;
  };

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
          width: "351px",
          maxWidth: "100vw",
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
            padding: "24px 16px",
            alignItems: "flex-start",
            gap: "8px",
            background: "#FFF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flex: "1 0 0",
            }}
          >
            {/* Featured Icon */}
            <div
              style={{
                display: "flex",
                width: "44px",
                height: "44px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "9999px",
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

            {/* Title and Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Filters
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Manage and quickly apply filters.
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
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
            display: "flex",
            height: "856px",
            padding: "0 16px",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            alignSelf: "stretch",
            overflowY: "auto",
          }}
        >
          {/* Filters Selected Section - only show if there are applied filters */}
          {hasAppliedFilters() && (
            <>
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
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
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
                      }}
                    >
                      Filters Selected
                    </div>
                    <button
                      onClick={clearAllFilters}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          color: "#273572",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Clear All
                      </div>
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignContent: "flex-start",
                      gap: "4px",
                      alignSelf: "stretch",
                      flexWrap: "wrap",
                    }}
                  >
                    {getAppliedFilters().map((filter, index) => (
                      <div
                        key={`${filter.key}-${filter.value}-${index}`}
                        style={{
                          display: "flex",
                          padding: "3px 4px 3px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "3px",
                          borderRadius: "6px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <div
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            {filter.label}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFilter(filter.key, filter.value)}
                          style={{
                            display: "flex",
                            width: "18px",
                            padding: "2px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderRadius: "3px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                              stroke="#A4A7AE"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  padding: "4px 0",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "#E9EAEB",
                  }}
                />
              </div>
            </>
          )}

          {/* Status Filter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <FilterDropdown
              label="Status"
              options={statusOptions}
              selectedValues={localFilters.status}
              onSelectionChange={(values) =>
                handleFilterChange("status", values)
              }
              placeholder="Select Filter"
              searchDisabled={true}
            />
          </div>

          {/* Type of Package Filter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <FilterDropdown
              label="Type of Package"
              options={packageTypeOptions}
              selectedValues={localFilters.typeOfPackage}
              onSelectionChange={(values) =>
                handleFilterChange("typeOfPackage", values)
              }
              placeholder="Select Filter"
            />
          </div>

          {/* I-9 Filled Filter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <FilterDropdown
              label="I-9 Filled"
              options={i9FilledOptions}
              selectedValues={localFilters.i9Filled}
              onSelectionChange={(values) =>
                handleFilterChange("i9Filled", values)
              }
              placeholder="Select Filter"
            />
          </div>

          {/* Activate Filter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <FilterDropdown
              label="Activate"
              options={activateOptions}
              selectedValues={localFilters.activate}
              onSelectionChange={(values) =>
                handleFilterChange("activate", values)
              }
              placeholder="Select Filter"
            />
          </div>

          {/* EWS Filter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <FilterDropdown
              label="EWS"
              options={ewsOptions}
              selectedValues={localFilters.ews}
              onSelectionChange={(values) => handleFilterChange("ews", values)}
              placeholder="Select Filter"
            />
          </div>

          {/* Date Range Filter - reuse desktop element without calendar functionality */}
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
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
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
                  }}
                >
                  Date Range
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
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                      flex: "1 0 0",
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    {formatDateRange(
                      localFilters.dateRange.start,
                      localFilters.dateRange.end,
                    )}
                  </div>
                </div>
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
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* No date picker on mobile - calendar functionality disabled */}
    </div>
  );
};
