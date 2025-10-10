import React, { useMemo, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import DesktopCalendar from "../components/ui/desktop-calendar";
import DatePickerCalendar from "../components/ui/date-picker-calendar";
import { TurnaroundTimeChart } from "../components/ui/turnaround-time-widget";
import { Checkbox } from "../components/ui/checkbox";

type ProductTypeMetric = {
  id: string;
  name: string;
  orders: number;
  completed: number;
  inProcess: number;
  needsAttention: number;
  avgCompletionHours: number;
  change: number;
};

const PRODUCT_TYPE_METRICS: ProductTypeMetric[] = [
  {
    id: "drug",
    name: "Drug Screening",
    orders: 184,
    completed: 168,
    inProcess: 12,
    needsAttention: 4,
    avgCompletionHours: 39,
    change: 8,
  },
  {
    id: "criminal",
    name: "Criminal Search",
    orders: 212,
    completed: 194,
    inProcess: 11,
    needsAttention: 7,
    avgCompletionHours: 46,
    change: 4,
  },
  {
    id: "employment",
    name: "Employment Verification",
    orders: 158,
    completed: 134,
    inProcess: 16,
    needsAttention: 8,
    avgCompletionHours: 58,
    change: -3,
  },
  {
    id: "education",
    name: "Education Verification",
    orders: 126,
    completed: 112,
    inProcess: 9,
    needsAttention: 5,
    avgCompletionHours: 52,
    change: 2,
  },
  {
    id: "credit",
    name: "Credit Check",
    orders: 98,
    completed: 94,
    inProcess: 3,
    needsAttention: 1,
    avgCompletionHours: 24,
    change: 5,
  },
  {
    id: "mvr",
    name: "Motor Vehicle Records",
    orders: 142,
    completed: 131,
    inProcess: 7,
    needsAttention: 4,
    avgCompletionHours: 18,
    change: -1,
  },
];

const formatTurnaroundTime = (hours: number): string => {
  if (hours >= 24) {
    const days = hours / 24;
    const formattedDays = Number.isInteger(days)
      ? days.toString()
      : days.toFixed(1);
    const suffix = Number(days.toFixed(1)) === 1 ? " day" : " days";
    return `${formattedDays}${suffix}`;
  }

  const formattedHours = Number.isInteger(hours)
    ? hours.toString()
    : hours.toFixed(1);
  const suffix = hours === 1 ? " hr" : " hrs";
  return `${formattedHours}${suffix}`;
};

const getTrendStyles = (change: number) => {
  if (change > 0) {
    return { color: "#067647", background: "rgba(6, 118, 71, 0.12)" };
  }

  if (change < 0) {
    return { color: "#B42318", background: "rgba(180, 35, 24, 0.12)" };
  }

  return { color: "#414651", background: "rgba(65, 70, 81, 0.12)" };
};

const getCompletionPercent = (metric: ProductTypeMetric): number => {
  if (metric.orders <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((metric.completed / metric.orders) * 100));
};

export const Reporting: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 640 && window.innerWidth < 1200,
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("results");
  const [includeAccountInfo, setIncludeAccountInfo] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [quickOrderDrawerOpen, setQuickOrderDrawerOpen] = useState(false);
  const [ssnOrderDrawerOpen, setSSNOrderDrawerOpen] = useState(false);
  const [customizeDrawerOpen, setCustomizeDrawerOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(2025, 0, 10),
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(2025, 0, 16));
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [activeDatePicker, setActiveDatePicker] = useState<
    "generate" | "report" | null
  >(null);
  const [hoveredDateButton, setHoveredDateButton] = useState<
    "generate" | "report" | null
  >(null);
  const generateDateButtonRef = React.useRef<HTMLButtonElement>(null);
  const reportDateButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1200);
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1200);
      setWindowWidth(width);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = () => {
    console.log("Sign out clicked");
  };

  const getUserMenuStyles = () => {
    if (userMenuOpen || userMenuHovered) {
      return { background: "#F5F5F5" };
    }
    return {};
  };

  const handleOpenQuickOrderDrawer = () => setQuickOrderDrawerOpen(true);
  const handleOpenSSNOrderDrawer = () => setSSNOrderDrawerOpen(true);
  const handleOpenCustomizeDrawer = () => setCustomizeDrawerOpen(true);
  const handleOpenNotificationModal = () => setNotificationModalOpen(true);

  const tabs = [
    { id: "results", label: "Results Report" },
    { id: "product", label: "By Product Type" },
    { id: "subject", label: "By Subject/Applicant" },
    { id: "pending", label: "Pending Individual" },
    { id: "alert", label: "Subject Alert" },
    { id: "turnaround", label: "Turn Around Time" },
  ];

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

    const formatSingleDate = (date: Date) =>
      `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    return `${formatSingleDate(startDate)} – ${formatSingleDate(endDate)}`;
  };

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleOpenDatePicker = (picker: "generate" | "report") => {
    setActiveDatePicker(picker);
    setDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => {
    setDatePickerOpen(false);
    setActiveDatePicker(null);
  };

  const activeTriggerRef =
    activeDatePicker === "generate"
      ? generateDateButtonRef
      : activeDatePicker === "report"
        ? reportDateButtonRef
        : null;

  const isGenerateActive = datePickerOpen && activeDatePicker === "generate";
  const isReportActive = datePickerOpen && activeDatePicker === "report";
  const isGenerateHovered = hoveredDateButton === "generate";
  const isReportHovered = hoveredDateButton === "report";

  const aggregatedProductMetrics = useMemo(() => {
    if (PRODUCT_TYPE_METRICS.length === 0) {
      return {
        orders: 0,
        completed: 0,
        inProcess: 0,
        needsAttention: 0,
        averageHours: 0,
        completionRate: 0,
      };
    }

    const totals = PRODUCT_TYPE_METRICS.reduce(
      (acc, metric) => {
        acc.orders += metric.orders;
        acc.completed += metric.completed;
        acc.inProcess += metric.inProcess;
        acc.needsAttention += metric.needsAttention;
        acc.weightedHours += metric.avgCompletionHours * metric.orders;
        return acc;
      },
      {
        orders: 0,
        completed: 0,
        inProcess: 0,
        needsAttention: 0,
        weightedHours: 0,
      },
    );

    const averageHours =
      totals.orders === 0 ? 0 : totals.weightedHours / totals.orders;
    const completionRate =
      totals.orders === 0
        ? 0
        : Math.round((totals.completed / totals.orders) * 100);

    return {
      orders: totals.orders,
      completed: totals.completed,
      inProcess: totals.inProcess,
      needsAttention: totals.needsAttention,
      averageHours,
      completionRate,
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "product":
        return renderProductTypeContent();
      case "subject":
        return renderSubjectContent();
      case "pending":
        return renderPendingIndividualContent();
      case "alert":
        return renderSubjectAlertContent();
      case "turnaround":
        return renderTurnaroundTimeContent();
      case "results":
      default:
        return renderResultsReportContent();
    }
  };

  const renderResultsReportContent = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "24px",
        alignSelf: "stretch",
        padding: isMobile ? "16px" : "24px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            flex: "1 0 0",
          }}
        >
          <h2
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
            }}
          >
            Search Result Report
          </h2>
          <p
            style={{
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              margin: 0,
            }}
          >
            This report produces a CSV file containing all components completed
            on background checks ordered in a given time frame as well as the
            disposition of the components. Includes reports for this account
            only unless this user has the ability to view other accounts, in
            which case this report will include all of this account's
            'Additional Accounts Viewable'. NOTE: The Disposition columns will
            be blank for users who do not have "All Reports Viewable" for the
            setting What reports can this user view? in their User Settings.
          </p>
        </div>
      </div>

      {/* Generate Report Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "12px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            borderBottom: "1px solid #E9EAEB",
          }}
        >
          <h3
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
              flex: 1,
            }}
          >
            Generate Report
          </h3>
        </div>

        {/* Card Content */}
        <div
          style={{
            display: "flex",
            padding: "12px 16px 16px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <div
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              Date Selection
            </div>
            <div
              style={{
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              Select a Date Range or a Specific Time Frame
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  ref={generateDateButtonRef}
                  onClick={() => handleOpenDatePicker("generate")}
                  onMouseEnter={() => setHoveredDateButton("generate")}
                  onMouseLeave={() => setHoveredDateButton(null)}
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: isGenerateActive
                      ? "1px solid #B3BCE5"
                      : "1px solid #D5D7DA",
                    background: isGenerateActive
                      ? "#F5F5F5"
                      : isGenerateHovered
                        ? "#F8F9FA"
                        : "#FFF",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    style={{ width: "16px", height: "16px" }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                      stroke={
                        isGenerateActive || isGenerateHovered
                          ? "#717680"
                          : "#A4A7AE"
                      }
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      color: isGenerateActive ? "#252B37" : "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      padding: "0 2px",
                    }}
                  >
                    {formatDateRange(selectedStartDate, selectedEndDate)}
                  </span>
                </button>
              </div>
              <button
                style={{
                  display: "flex",
                  minHeight: "36px",
                  padding: "6px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    padding: "0 2px",
                  }}
                >
                  Create Report
                </span>
              </button>
            </div>
          </div>

          {/* Sample Preview */}
          <div
            style={{
              display: "flex",
              padding: "12px 8px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
              borderRadius: "8px",
              background: "#FAFAFA",
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
              Sample
            </div>
            <div
              style={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/f2e894808967701a2dacc0bc88870b86b9a820d0?width=2048"
                alt="Sample report preview"
                style={{
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report Chart Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "12px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            borderBottom: "1px solid #E9EAEB",
          }}
        >
          <h3
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
              flex: 1,
            }}
          >
            Report
          </h3>
          <div style={{ position: "relative" }}>
            <button
              type="button"
              ref={reportDateButtonRef}
              onClick={() => handleOpenDatePicker("report")}
              onMouseEnter={() => setHoveredDateButton("report")}
              onMouseLeave={() => setHoveredDateButton(null)}
              style={{
                display: "flex",
                minHeight: "36px",
                padding: "6px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: isReportActive
                  ? "1px solid #B3BCE5"
                  : "1px solid #D5D7DA",
                background: isReportActive
                  ? "#F5F5F5"
                  : isReportHovered
                    ? "#F8F9FA"
                    : "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <svg
                style={{ width: "16px", height: "16px" }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                  stroke={
                    isReportActive || isReportHovered ? "#717680" : "#A4A7AE"
                  }
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  color: isReportActive ? "#252B37" : "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  padding: "0 2px",
                }}
              >
                {formatDateRange(selectedStartDate, selectedEndDate)}
              </span>
            </button>
          </div>
        </div>

        {/* Chart Content */}
        <div
          style={{
            display: "flex",
            padding: "12px 16px 16px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            minHeight: "400px",
          }}
        >
          <TurnaroundTimeChart
            isMobile={isMobile}
            isTablet={isTablet}
            windowWidth={windowWidth}
          />
        </div>
      </div>
    </div>
  );

  const renderProductTypeContent = () => {
    const averageTurnaroundLabel = formatTurnaroundTime(
      Number(aggregatedProductMetrics.averageHours.toFixed(1)),
    );
    const selectionLabel = "All product types";
    const productMetrics = PRODUCT_TYPE_METRICS;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "24px",
          alignSelf: "stretch",
          padding: isMobile ? "16px" : "24px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              flex: "1 0 0",
            }}
          >
            <h2
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
                margin: 0,
              }}
            >
              Search Results by Product Type Report
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              <p style={{ margin: 0 }}>
                This report produces a CSV file containing background checks
                ordered in a given time frame with columns for the following
                product types: Drug, Criminal, Sex Offender, Credit Check,
                Education Checks, References Checks, Employment Checks, MVR.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <span style={{ fontWeight: 600, color: "#414651" }}>
                  The value of the product type columns will be one of:
                </span>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <li>N/A (the order has no components of this type)</li>
                  <li>
                    In process - components have not been completed/reviewed
                  </li>
                  <li>
                    Date/time - date/time when the last component of said type
                    has been completed/reviewed
                  </li>
                </ul>
              </div>
              <p style={{ margin: 0 }}>
                Includes reports for this account only unless this user has the
                ability to view other accounts, in which case this report will
                include all of this account's "Additional Accounts Viewable".
              </p>
            </div>
          </div>
        </div>

        {/* Generate Report Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            overflow: "hidden",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              display: "flex",
              padding: "16px",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid #E9EAEB",
            }}
          >
            <h3
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
                margin: 0,
                flex: 1,
              }}
            >
              Generate Report
            </h3>
          </div>

          {/* Card Content */}
          <div
            style={{
              display: "flex",
              padding: "12px 16px 16px 16px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Date Selection
              </div>
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Select a Date Range or a Specific Time Frame
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    ref={generateDateButtonRef}
                    onClick={() => handleOpenDatePicker("generate")}
                    onMouseEnter={() => setHoveredDateButton("generate")}
                    onMouseLeave={() => setHoveredDateButton(null)}
                    style={{
                      display: "flex",
                      minHeight: "36px",
                      padding: "6px 8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "8px",
                      border: isGenerateActive
                        ? "1px solid #B3BCE5"
                        : "1px solid #D5D7DA",
                      background: isGenerateActive
                        ? "#F5F5F5"
                        : isGenerateHovered
                          ? "#F8F9FA"
                          : "#FFF",
                      boxShadow:
                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      style={{ width: "16px", height: "16px" }}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                        stroke={
                          isGenerateActive || isGenerateHovered
                            ? "#717680"
                            : "#A4A7AE"
                        }
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        color: isGenerateActive ? "#252B37" : "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        padding: "0 2px",
                      }}
                    >
                      {formatDateRange(selectedStartDate, selectedEndDate)}
                    </span>
                  </button>
                </div>
                <button
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: "#344698",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      color: "#FFF",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      padding: "0 2px",
                    }}
                  >
                    Create Report
                  </span>
                </button>
              </div>
            </div>

            {/* Sample Preview */}
            <div
              style={{
                display: "flex",
                padding: "12px 8px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
                borderRadius: "8px",
                background: "#FAFAFA",
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
                Sample
              </div>
              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                }}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b24f0ab59702d309c327d519c4bc23bbe4942559?width=4594"
                  alt="Sample report preview"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Report Chart Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            overflow: "hidden",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              display: "flex",
              padding: "16px",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid #E9EAEB",
            }}
          >
            <h3
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
                margin: 0,
                flex: 1,
              }}
            >
              Report
            </h3>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                ref={reportDateButtonRef}
                onClick={() => handleOpenDatePicker("report")}
                onMouseEnter={() => setHoveredDateButton("report")}
                onMouseLeave={() => setHoveredDateButton(null)}
                style={{
                  display: "flex",
                  minHeight: "36px",
                  padding: "6px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "8px",
                  border: isReportActive
                    ? "1px solid #B3BCE5"
                    : "1px solid #D5D7DA",
                  background: isReportActive
                    ? "#F5F5F5"
                    : isReportHovered
                      ? "#F8F9FA"
                      : "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                    stroke={
                      isReportActive || isReportHovered ? "#717680" : "#A4A7AE"
                    }
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    color: isReportActive ? "#252B37" : "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    padding: "0 2px",
                  }}
                >
                  {formatDateRange(selectedStartDate, selectedEndDate)}
                </span>
              </button>
            </div>
          </div>

          {/* Chart Content */}
          <div
            style={{
              display: "flex",
              padding: "12px 16px 16px 16px",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
              minHeight: "400px",
            }}
          >
            <TurnaroundTimeChart
              isMobile={isMobile}
              isTablet={isTablet}
              windowWidth={windowWidth}
            />
          </div>
        </div>

        {/* Product Type Overview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "16px",
              alignItems: "center",
              gap: "24px",
              alignSelf: "stretch",
              borderBottom: "1px solid #E9EAEB",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
                margin: 0,
              }}
            >
              Product Type Overview
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: "120px",
                }}
              >
                <span
                  style={{
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Selection
                </span>
                <span
                  style={{
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  {selectionLabel}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: "100px",
                }}
              >
                <span
                  style={{
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Orders
                </span>
                <span
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  {aggregatedProductMetrics.orders.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: "120px",
                }}
              >
                <span
                  style={{
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Completion Rate
                </span>
                <span
                  style={{
                    color: "#067647",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  {aggregatedProductMetrics.completionRate}%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: "140px",
                }}
              >
                <span
                  style={{
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Avg Turnaround
                </span>
                <span
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  {averageTurnaroundLabel}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "0 16px 16px 16px",
              alignSelf: "stretch",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#535862",
                        background: "#F5F5F5",
                        borderBottom: "1px solid #E9EAEB",
                      }}
                    >
                      Product Type
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#535862",
                        background: "#F5F5F5",
                        borderBottom: "1px solid #E9EAEB",
                      }}
                    >
                      Orders
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#535862",
                        background: "#F5F5F5",
                        borderBottom: "1px solid #E9EAEB",
                      }}
                    >
                      Completed
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#535862",
                        background: "#F5F5F5",
                        borderBottom: "1px solid #E9EAEB",
                      }}
                    >
                      In Process
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#535862",
                        background: "#F5F5F5",
                        borderBottom: "1px solid #E9EAEB",
                      }}
                    >
                      Needs Attention
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#535862",
                        background: "#F5F5F5",
                        borderBottom: "1px solid #E9EAEB",
                      }}
                    >
                      Completion Rate
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#535862",
                        background: "#F5F5F5",
                        borderBottom: "1px solid #E9EAEB",
                      }}
                    >
                      Avg Turnaround
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productMetrics.map((metric, index) => {
                    const completionPercent = getCompletionPercent(metric);
                    const trendStyles = getTrendStyles(metric.change);
                    const rowBorder =
                      index === productMetrics.length - 1
                        ? "none"
                        : "1px solid #E9EAEB";

                    return (
                      <tr key={metric.id}>
                        <td
                          style={{
                            padding: "16px",
                            borderBottom: rowBorder,
                            verticalAlign: "top",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <span
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: "20px",
                              }}
                            >
                              {metric.name}
                            </span>
                            <span
                              style={{
                                display: "inline-flex",
                                width: "fit-content",
                                alignItems: "center",
                                gap: "6px",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                background: trendStyles.background,
                                color: trendStyles.color,
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "16px",
                              }}
                            >
                              {metric.change > 0 ? "+" : ""}
                              {metric.change}%
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            borderBottom: rowBorder,
                            textAlign: "right",
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          {metric.orders.toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            borderBottom: rowBorder,
                            textAlign: "right",
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          {metric.completed.toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            borderBottom: rowBorder,
                            textAlign: "right",
                            color: "#535862",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          {metric.inProcess.toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            borderBottom: rowBorder,
                            textAlign: "right",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              minWidth: "64px",
                              padding: "4px 10px",
                              borderRadius: "999px",
                              background: "#FEE4E2",
                              color: "#B42318",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "16px",
                            }}
                          >
                            {metric.needsAttention.toLocaleString()}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            borderBottom: rowBorder,
                            verticalAlign: "middle",
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
                                flex: "1 1 0%",
                                height: "6px",
                                borderRadius: "999px",
                                background: "#E9EAEB",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${completionPercent}%`,
                                  height: "100%",
                                  borderRadius: "inherit",
                                  background: "#344698",
                                  transition: "width 0.2s ease",
                                }}
                              />
                            </div>
                            <span
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "13px",
                                fontWeight: 600,
                                lineHeight: "18px",
                                minWidth: "40px",
                                textAlign: "right",
                              }}
                            >
                              {completionPercent}%
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            borderBottom: rowBorder,
                            textAlign: "right",
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          {formatTurnaroundTime(metric.avgCompletionHours)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPendingIndividualContent = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "24px",
        alignSelf: "stretch",
        padding: isMobile ? "16px" : "24px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            flex: "1 0 0",
          }}
        >
          <h2
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
            }}
          >
            Pending Individual Report
          </h2>
          <p
            style={{
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              margin: 0,
            }}
          >
            This report produces a CSV file containing information on subjects
            that have pending background checks. This will not report on items
            pending longer than 6 months. Includes reports for this account only
            unless this user has the ability to view other accounts, in which
            case this report will include all of this account's 'Additional
            Accounts Viewable'.
          </p>
        </div>
      </div>

      {/* Generate Report Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "12px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            borderBottom: "1px solid #E9EAEB",
          }}
        >
          <h3
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
              flex: 1,
            }}
          >
            Generate Report
          </h3>
        </div>

        {/* Card Content */}
        <div
          style={{
            display: "flex",
            padding: "12px 16px 16px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <button
                style={{
                  display: "flex",
                  minHeight: "36px",
                  padding: "6px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "0 2px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#FFF",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Generate CSV
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Sample Preview */}
          <div
            style={{
              display: "flex",
              padding: "12px 8px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
              borderRadius: "8px",
              background: "#FAFAFA",
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
              Sample
            </div>
            <div
              style={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/99a4ba92b3f8663b36bf02fffe86d7deac44e03c?width=8192"
                alt="Sample pending individual report preview"
                style={{
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubjectAlertContent = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "24px",
        alignSelf: "stretch",
        padding: isMobile ? "16px" : "24px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            flex: "1 0 0",
          }}
        >
          <h2
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
            }}
          >
            Subject Alert Report
          </h2>
          <div
            style={{
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            <p style={{ margin: 0 }}>
              This report produces a CSV file containing information for all of
              the subject (top-level) orders entered within a given date range
              with an alert indicator. &quot;Alert&quot; means that potentially
              derogatory information was found in one or more of the research
              elements, while &quot;No Alert&quot; means that potentially
              derogatory information was not identified by us in any element.
              The date range may be toggled to use completion dates in place of
              entry dates. Only completed reports will be displayed when using
              completion dates. By default, reports based on entry dates will
              include incomplete reports. Includes reports for this account only
              unless this user has the ability to view other accounts, in which
              case this report will include all of this account's 'Additional
              Accounts Viewable'.
            </p>
          </div>
        </div>
      </div>

      {/* Generate Report Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "12px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            borderBottom: "1px solid #E9EAEB",
          }}
        >
          <h3
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
              flex: 1,
            }}
          >
            Generate Report
          </h3>
        </div>

        {/* Card Content */}
        <div
          style={{
            display: "flex",
            padding: "12px 16px 16px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <div
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              Date Selection
            </div>
            <div
              style={{
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              Select a Date Range or a Specific Time Frame
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  ref={generateDateButtonRef}
                  onClick={() => handleOpenDatePicker("generate")}
                  onMouseEnter={() => setHoveredDateButton("generate")}
                  onMouseLeave={() => setHoveredDateButton(null)}
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: isGenerateActive
                      ? "1px solid #B3BCE5"
                      : "1px solid #D5D7DA",
                    background: isGenerateActive
                      ? "#F5F5F5"
                      : isGenerateHovered
                        ? "#F8F9FA"
                        : "#FFF",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    style={{ width: "16px", height: "16px" }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                      stroke={
                        isGenerateActive || isGenerateHovered
                          ? "#717680"
                          : "#A4A7AE"
                      }
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
                    }}
                  >
                    <span
                      style={{
                        color: isGenerateActive ? "#252B37" : "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      {formatDateRange(selectedStartDate, selectedEndDate)}
                    </span>
                  </div>
                </button>
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingTop: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      border: "1px solid #D5D7DA",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    }}
                  >
                    Use completion dates instead of entry dates?
                  </span>
                </div>
              </label>
              <button
                style={{
                  display: "flex",
                  minHeight: "36px",
                  padding: "6px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "0 2px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#FFF",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Create Report
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Sample Preview */}
          <div
            style={{
              display: "flex",
              padding: "12px 8px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
              borderRadius: "8px",
              background: "#FAFAFA",
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
              Sample
            </div>
            <div
              style={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/99a4ba92b3f8663b36bf02fffe86d7deac44e03c?width=8192"
                alt="Sample subject alert report preview"
                style={{
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report Chart Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "12px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            borderBottom: "1px solid #E9EAEB",
          }}
        >
          <h3
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
              flex: 1,
            }}
          >
            Report
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ position: "relative" }}>
              <button
                type="button"
                ref={reportDateButtonRef}
                onClick={() => handleOpenDatePicker("report")}
                onMouseEnter={() => setHoveredDateButton("report")}
                onMouseLeave={() => setHoveredDateButton(null)}
                style={{
                  display: "flex",
                  minHeight: "36px",
                  padding: "6px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "8px",
                  border: isReportActive
                    ? "1px solid #B3BCE5"
                    : "1px solid #D5D7DA",
                  background: isReportActive
                    ? "#F5F5F5"
                    : isReportHovered
                      ? "#F8F9FA"
                      : "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                    stroke={
                      isReportActive || isReportHovered ? "#717680" : "#A4A7AE"
                    }
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    color: isReportActive ? "#252B37" : "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    padding: "0 2px",
                  }}
                >
                  {formatDateRange(selectedStartDate, selectedEndDate)}
                </span>
              </button>
            </div>
            <button
              style={{
                display: "flex",
                minHeight: "36px",
                padding: "6px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <svg
                style={{ width: "16px", height: "16px" }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                  stroke="#A4A7AE"
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
                }}
              >
                <span
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Download
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Chart Content */}
        <div
          style={{
            display: "flex",
            padding: "12px 16px 16px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            minHeight: "400px",
          }}
        >
          <TurnaroundTimeChart
            isMobile={isMobile}
            isTablet={isTablet}
            windowWidth={windowWidth}
          />
        </div>
      </div>
    </div>
  );

  const renderTurnaroundTimeContent = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "24px",
        alignSelf: "stretch",
        padding: isMobile ? "16px" : "24px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          alignSelf: "stretch",
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
          }}
        >
          <h2
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
            }}
          >
            TAT Report Parameters
          </h2>
        </div>
      </div>

      {/* Report Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "12px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            padding: "16px",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            borderBottom: "1px solid #E9EAEB",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "4px",
              flex: "1 0 0",
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
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                <h3
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    margin: 0,
                  }}
                >
                  Report
                </h3>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                display: "flex",
                minHeight: "36px",
                padding: "6px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Report Type
                </span>
              </div>
              <svg
                style={{ width: "16px", height: "16px" }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              style={{
                display: "flex",
                minHeight: "36px",
                padding: "6px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  TAT Type
                </span>
              </div>
              <svg
                style={{ width: "16px", height: "16px" }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              style={{
                display: "flex",
                minHeight: "36px",
                padding: "6px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Breakdown
                </span>
              </div>
              <svg
                style={{ width: "16px", height: "16px" }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              style={{
                display: "flex",
                minHeight: "36px",
                padding: "6px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Days Per Buckect
                </span>
              </div>
              <svg
                style={{ width: "16px", height: "16px" }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                ref={reportDateButtonRef}
                onClick={() => handleOpenDatePicker("report")}
                onMouseEnter={() => setHoveredDateButton("report")}
                onMouseLeave={() => setHoveredDateButton(null)}
                style={{
                  display: "flex",
                  minHeight: "36px",
                  padding: "6px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "8px",
                  border: isReportActive
                    ? "1px solid #B3BCE5"
                    : "1px solid #D5D7DA",
                  background: isReportActive
                    ? "#F5F5F5"
                    : isReportHovered
                      ? "#F8F9FA"
                      : "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 6.66668H2M10.6667 1.33334V4.00001M5.33333 1.33334V4.00001M5.2 14.6667H10.8C11.9201 14.6667 12.4802 14.6667 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5747C14 13.1468 14 12.5868 14 11.4667V5.86668C14 4.74657 14 4.18652 13.782 3.7587C13.5903 3.38237 13.2843 3.07641 12.908 2.88466C12.4802 2.66668 11.9201 2.66668 10.8 2.66668H5.2C4.0799 2.66668 3.51984 2.66668 3.09202 2.88466C2.71569 3.07641 2.40973 3.38237 2.21799 3.7587C2 4.18652 2 4.74657 2 5.86668V11.4667C2 12.5868 2 13.1468 2.21799 13.5747C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6667 4.0799 14.6667 5.2 14.6667Z"
                    stroke={
                      isReportActive || isReportHovered ? "#717680" : "#A4A7AE"
                    }
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
                  }}
                >
                  <span
                    style={{
                      color: isReportActive ? "#252B37" : "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    {formatDateRange(selectedStartDate, selectedEndDate)}
                  </span>
                </div>
              </button>
            </div>
            <button
              style={{
                display: "flex",
                minHeight: "36px",
                padding: "6px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <svg
                style={{ width: "16px", height: "16px" }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                  stroke="#A4A7AE"
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
                }}
              >
                <span
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Download
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Chart Content */}
        <div
          style={{
            display: "flex",
            padding: "12px 16px 16px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            minHeight: "400px",
          }}
        >
          <TurnaroundTimeChart
            isMobile={isMobile}
            isTablet={isTablet}
            windowWidth={windowWidth}
          />
        </div>
      </div>
    </div>
  );

  const renderSubjectContent = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "24px",
          alignSelf: "stretch",
          padding: isMobile ? "16px" : "24px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              flex: "1 0 0",
            }}
          >
            <h2
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
                margin: 0,
              }}
            >
              Subject/Applicant Information Report
            </h2>
            <p
              style={{
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                margin: 0,
              }}
            >
              This report produces a CSV file containing applicant/subject
              information and two columns containing motor vehicle search
              component information. The information in the columns DL Number
              and DL State was entered at the subject level. The information in
              the columns MVR Number and MVR State was entered at the motor
              vehicle search component level. The columns MVR Number and MVR
              State will only have information if a motor vehicle search
              component was in the order. Includes reports for this account only
              unless this user has the ability to view other accounts, in which
              case this report will include all of this account's 'Additional
              Accounts Viewable'.
            </p>
          </div>
        </div>

        {/* Generate Report Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            overflow: "hidden",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              display: "flex",
              padding: "16px",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid #E9EAEB",
            }}
          >
            <h3
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
                margin: 0,
                flex: 1,
              }}
            >
              Generate Report
            </h3>
          </div>

          {/* Card Content */}
          <div
            style={{
              display: "flex",
              padding: "12px 16px 16px 16px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Date Selection
              </div>
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Select a Date Range or a Specific Time Frame
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    ref={generateDateButtonRef}
                    onClick={() => handleOpenDatePicker("generate")}
                    onMouseEnter={() => setHoveredDateButton("generate")}
                    onMouseLeave={() => setHoveredDateButton(null)}
                    style={{
                      display: "flex",
                      minHeight: "36px",
                      padding: "6px 8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "8px",
                      border: isGenerateActive
                        ? "1px solid #B3BCE5"
                        : "1px solid #D5D7DA",
                      background: isGenerateActive
                        ? "#F5F5F5"
                        : isGenerateHovered
                          ? "#F8F9FA"
                          : "#FFF",
                      boxShadow:
                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      style={{ width: "16px", height: "16px" }}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                        stroke={
                          isGenerateActive || isGenerateHovered
                            ? "#717680"
                            : "#A4A7AE"
                        }
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        color: isGenerateActive ? "#252B37" : "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        padding: "0 2px",
                      }}
                    >
                      {formatDateRange(selectedStartDate, selectedEndDate)}
                    </span>
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Checkbox
                    id="include-account-info"
                    checked={includeAccountInfo}
                    onCheckedChange={(checked) =>
                      setIncludeAccountInfo(checked === true)
                    }
                    style={{
                      borderColor: "#D5D7DA",
                    }}
                  />
                  <label
                    htmlFor="include-account-info"
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Include account info?
                  </label>
                </div>

                <button
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: "#344698",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      color: "#FFF",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      padding: "0 2px",
                    }}
                  >
                    Create Report
                  </span>
                </button>
              </div>
            </div>

            {/* Sample Preview */}
            <div
              style={{
                display: "flex",
                padding: "12px 8px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
                borderRadius: "8px",
                background: "#FAFAFA",
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
                Sample
              </div>
              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                }}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/8885f072864d855ad9d8da76b0675e7aa467efd5?width=8192"
                  alt="Sample applicant report preview"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Report Chart Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            overflow: "hidden",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              display: "flex",
              padding: "16px",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid #E9EAEB",
            }}
          >
            <h3
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
                margin: 0,
                flex: 1,
              }}
            >
              Report
            </h3>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                ref={reportDateButtonRef}
                onClick={() => handleOpenDatePicker("report")}
                onMouseEnter={() => setHoveredDateButton("report")}
                onMouseLeave={() => setHoveredDateButton(null)}
                style={{
                  display: "flex",
                  minHeight: "36px",
                  padding: "6px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "8px",
                  border: isReportActive
                    ? "1px solid #B3BCE5"
                    : "1px solid #D5D7DA",
                  background: isReportActive
                    ? "#F5F5F5"
                    : isReportHovered
                      ? "#F8F9FA"
                      : "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                    stroke={
                      isReportActive || isReportHovered ? "#717680" : "#A4A7AE"
                    }
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    color: isReportActive ? "#252B37" : "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    padding: "0 2px",
                  }}
                >
                  {formatDateRange(selectedStartDate, selectedEndDate)}
                </span>
              </button>
            </div>
          </div>

          {/* Chart Content */}
          <div
            style={{
              display: "flex",
              padding: "12px 16px 16px 16px",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
              minHeight: "400px",
            }}
          >
            <TurnaroundTimeChart
              isMobile={isMobile}
              isTablet={isTablet}
              windowWidth={windowWidth}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        background: "#FAFAFA",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        currentPage="reporting"
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
      />

      <div
        style={{
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          position: "relative",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Header
          isDesktop={isDesktop}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showMobileUserMenu={showMobileUserMenu}
          showNotification={showNotification}
          sidebarCollapsed={sidebarCollapsed}
          quickOrderDrawerOpen={quickOrderDrawerOpen}
          setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
          ssnOrderDrawerOpen={ssnOrderDrawerOpen}
          setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
          customizeDrawerOpen={customizeDrawerOpen}
          setCustomizeDrawerOpen={setCustomizeDrawerOpen}
          notificationModalOpen={notificationModalOpen}
          setNotificationModalOpen={setNotificationModalOpen}
          onOpenQuickOrderDrawer={handleOpenQuickOrderDrawer}
          onOpenSSNOrderDrawer={handleOpenSSNOrderDrawer}
          onOpenCustomizeDrawer={handleOpenCustomizeDrawer}
          onOpenNotificationModal={handleOpenNotificationModal}
        />

        <MobileHeader
          isDesktop={isDesktop}
          isMobile={isMobile}
          setMobileMenuOpen={setMobileMenuOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showMobileUserMenu={showMobileUserMenu}
          quickOrderDrawerOpen={quickOrderDrawerOpen}
          setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
          ssnOrderDrawerOpen={ssnOrderDrawerOpen}
          setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
          customizeDrawerOpen={customizeDrawerOpen}
          setCustomizeDrawerOpen={setCustomizeDrawerOpen}
          notificationModalOpen={notificationModalOpen}
          setNotificationModalOpen={setNotificationModalOpen}
          onOpenQuickOrderDrawer={handleOpenQuickOrderDrawer}
          onOpenSSNOrderDrawer={handleOpenSSNOrderDrawer}
          onOpenCustomizeDrawer={handleOpenCustomizeDrawer}
          onOpenNotificationModal={handleOpenNotificationModal}
        />

        {/* Main Content */}
        <div
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            flex: "1 1 auto",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Page Header */}
          <div
            style={{
              display: "flex",
              padding: isMobile ? "16px" : "0 32px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <h1
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "24px",
                  fontWeight: 600,
                  lineHeight: "32px",
                  margin: 0,
                }}
              >
                Reports
              </h1>
            </div>

            {/* Tab Navigation */}
            <div
              style={{
                display: "flex",
                padding: "4px",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
                flexWrap: "wrap",
                borderRadius: "10px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    height: "36px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "6px",
                    border: activeTab === tab.id ? "1px solid #B3BCE5" : "none",
                    background:
                      activeTab === tab.id ? "#ECEEF9" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "#F5F5F5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span
                    style={{
                      color: activeTab === tab.id ? "#273572" : "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {renderTabContent()}
        </div>
      </div>

      {datePickerOpen && activeTriggerRef && (isDesktop || isTablet) && (
        <DesktopCalendar
          isOpen={datePickerOpen}
          onClose={handleCloseDatePicker}
          triggerRef={activeTriggerRef}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={handleDateChange}
        />
      )}

      {datePickerOpen && activeTriggerRef && !isDesktop && !isTablet && (
        <DatePickerCalendar
          isOpen={datePickerOpen}
          onClose={handleCloseDatePicker}
          triggerRef={activeTriggerRef}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={handleDateChange}
        />
      )}
    </div>
  );
};
