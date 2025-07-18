import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AlertNotification from "../components/ui/alert-notification";
import CustomizeDrawer from "../components/ui/customize-drawer";
import DatePickerCalendar from "../components/ui/date-picker-calendar";
import { MetricCard } from "../components/ui/metric-card";
import { LatestReportsWidget } from "../components/ui/latest-reports-widget";
import { TurnaroundTimeWidget } from "../components/ui/turnaround-time-widget";
import { OrdersByStatusWidget } from "../components/ui/orders-by-status-widget";

import { AssignedTasksWidget } from "../components/ui/assigned-tasks-widget";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Sidebar } from "../components/Sidebar";
import DesktopCalendar from "../components/ui/desktop-calendar";
import { DragDropProvider, WidgetInfo } from "../contexts/DragDropContext";

// Add styles for mobile responsiveness and scroll behavior
const dashboardStyles = `
  @media (max-width: 767px) {
    /* Ensure proper mobile scrolling behavior */
    body {
      overflow-x: hidden;
      overflow-y: auto;
    }

    /* Mobile content scrolling */
    .mobile-container {
      -webkit-overflow-scrolling: touch !important;
      overflow-x: hidden !important;
      min-height: auto !important;
      height: auto !important;
    }

    /* Fix content areas that might have height issues */
    .mobile-content-area {
      -webkit-overflow-scrolling: touch !important;
      min-height: auto !important;
      height: auto !important;
      padding-bottom: 80px !important;
    }

    /* iPhone Safari specific viewport fixes */
    @supports (-webkit-touch-callout: none) {
      body {
        -webkit-overflow-scrolling: touch !important;
      }
    }

    /* Ensure viewport units work correctly on mobile */
    @supports (height: 100dvh) {
      .mobile-container {
        min-height: 100dvh !important;
      }
    }
  }

  /* Dashboard action buttons hover states */
    .dashboard-button {
    transition: background-color 0.2s ease-in-out;
  }

    .dashboard-button:hover {
    background-color: #F5F5F5;
  }

  .dashboard-button:active {
    background-color: #F2F4F7;
  }

  .dashboard-dropdown {
    position: relative;
  }

  .dashboard-dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #FFF;
    border: 1px solid #D5D7DA;
    border-radius: 8px;
    box-shadow: 0px 4px 6px -1px rgba(10, 13, 18, 0.1), 0px 2px 4px -1px rgba(10, 13, 18, 0.06);
    z-index: 10;
    margin-top: 4px;
    display: none;
  }

  .dashboard-dropdown.open .dashboard-dropdown-content {
    display: block;
  }

  .dashboard-dropdown-item {
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 400;
    color: #414651;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    transition: background-color 0.2s ease-in-out;
  }

  .dashboard-dropdown-item:hover {
    background-color: #F9FAFB;
  }

  .dashboard-dropdown-item:first-child {
    border-radius: 8px 8px 0 0;
  }

  .dashboard-dropdown-item:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Widget management state
  const [widgetOrder, setWidgetOrder] = useState<string[]>([
    "latest-reports",
    "turnaround-time",
  ]);

  // Second row widgets
  const [secondRowWidgets, setSecondRowWidgets] = useState<string[]>([
    "orders-by-status",
  ]);

  // Third row widgets
  const [thirdRowWidgets, setThirdRowWidgets] = useState<string[]>([
    "assigned-tasks",
  ]);

  // Widget sizes state - using flex-based sizes for 2x2 grid
  const [widgetSizes, setWidgetSizes] = useState<
    Record<string, "xs" | "sm" | "md" | "lg" | "xl">
  >({
    "latest-reports": "md",
    "turnaround-time": "md",
    "orders-by-status": "md",
    "assigned-tasks": "md",
  });

  // Initial widget configuration
  const initialWidgets: WidgetInfo[] = [
    { id: "latest-reports", title: "Latest Reports", position: 0 },
    { id: "turnaround-time", title: "Turnaround Time", position: 1 },
    { id: "orders-by-status", title: "Orders by Status", position: 2 },
    { id: "assigned-tasks", title: "Assigned Tasks", position: 3 },
  ];
  const [showNotification, setShowNotification] = useState(false);
  const [orderNotification, setOrderNotification] = useState<{
    show: boolean;
    title: string;
    description: string;
    orderNumber?: string;
  } | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [defaultDropdownOpen, setDefaultDropdownOpen] = useState(false);
  // Drawer states to coordinate with mobile menu
  const [quickOrderDrawerOpen, setQuickOrderDrawerOpen] = useState(false);
  const [ssnOrderDrawerOpen, setSSNOrderDrawerOpen] = useState(false);
  const [customizeDrawerOpen, setCustomizeDrawerOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(2025, 0, 10),
  ); // Jan 10, 2025
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(2025, 0, 16)); // Jan 16, 2025
  const [customizeButtonHovered, setCustomizeButtonHovered] = useState(false);
  const [defaultButtonHovered, setDefaultButtonHovered] = useState(false);
  const [dateButtonHovered, setDateButtonHovered] = useState(false);
  const dateButtonRef = useRef<HTMLButtonElement>(null);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Listen for widget reorder events
  useEffect(() => {
    const handleWidgetReorderEvent = (event: CustomEvent) => {
      const { sourceId, targetId, side } = event.detail;
      handleWidgetReorder(sourceId, targetId, side);
    };

    window.addEventListener(
      "widget-reorder",
      handleWidgetReorderEvent as EventListener,
    );
    return () => {
      window.removeEventListener(
        "widget-reorder",
        handleWidgetReorderEvent as EventListener,
      );
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (userMenuOpen && !target.closest("[data-user-menu]")) {
        setUserMenuOpen(false);
      }
      if (defaultDropdownOpen && !target.closest("[data-dropdown]")) {
        setDefaultDropdownOpen(false);
      }
      if (datePickerOpen && !target.closest("[data-date-picker]")) {
        setDatePickerOpen(false);
      }
    };

    if (userMenuOpen || defaultDropdownOpen || datePickerOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userMenuOpen, defaultDropdownOpen, datePickerOpen]);

  // Check for activation success parameter
  useEffect(() => {
    const activated = searchParams.get("activated");
    if (activated === "true") {
      setShowNotification(true);
      searchParams.delete("activated");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleNotificationDismiss = () => {
    setShowNotification(false);
  };

  // Drawer control functions that close mobile menu
  const handleOpenQuickOrderDrawer = () => {
    setMobileMenuOpen(false);
    setQuickOrderDrawerOpen(true);
  };

  const handleOpenSSNOrderDrawer = () => {
    setMobileMenuOpen(false);
    setSSNOrderDrawerOpen(true);
  };

  const handleOpenCustomizeDrawer = () => {
    setMobileMenuOpen(false);
    setCustomizeDrawerOpen(true);
  };

  const handleOpenNotificationModal = () => {
    setMobileMenuOpen(false);
    setNotificationModalOpen(true);
  };

  const handleOpenDatePicker = () => {
    setMobileMenuOpen(false);
    setDatePickerOpen(true);
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

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleUpdateAccount = () => {
    // Navigate to account settings or profile page
    console.log("Navigate to account settings");
  };

  const getNotificationPosition = () => {
    // Desktop: top, Tablet and Mobile: bottom
    return isDesktop ? "top" : "bottom";
  };

  const getNotificationBreakpoint = () => {
    if (isDesktop) return "desktop";
    if (isMobile) return "mobile";
    return "tablet";
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  // Handle widget reordering
  const handleWidgetReorder = (
    sourceId: string,
    targetId: string,
    side: "left" | "right",
  ) => {
    console.log(
      `🔄 Dashboard reordering: ${sourceId} to ${side} of ${targetId}`,
    );

    setWidgetOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      const sourceIndex = newOrder.indexOf(sourceId);
      const targetIndex = newOrder.indexOf(targetId);

      if (sourceIndex === -1 || targetIndex === -1) return prevOrder;

      // Remove source widget
      newOrder.splice(sourceIndex, 1);

      // Find new target index after removal
      const newTargetIndex = newOrder.indexOf(targetId);

      // Insert source widget at appropriate position
      if (side === "left") {
        newOrder.splice(newTargetIndex, 0, sourceId);
      } else {
        newOrder.splice(newTargetIndex + 1, 0, sourceId);
      }

      console.log("📋 New widget order:", newOrder);
      return newOrder;
    });
  };

  // Handle widget resizing
  const handleWidgetResize = (
    widgetId: string,
    newSize: "xs" | "sm" | "md" | "lg" | "xl",
  ) => {
    console.log(`📏 Resizing widget ${widgetId} to ${newSize}`);
    setWidgetSizes((prevSizes) => ({
      ...prevSizes,
      [widgetId]: newSize,
    }));

    // Optional: Show a brief notification about the resize
    console.log(`✅ Widget ${widgetId} resized to ${newSize}`);
  };

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  const renderCustomizeButton = () => (
    <button
      className="dashboard-button"
      onClick={handleOpenCustomizeDrawer}
      onMouseEnter={() => setCustomizeButtonHovered(true)}
      onMouseLeave={() => setCustomizeButtonHovered(false)}
      style={{
        display: "flex",
        minHeight: "36px",
        padding: "6px 8px",
        justifyContent: isMobile ? "flex-start" : "center",
        alignItems: "center",
        gap: "4px",
        borderRadius: "8px",
        border: "1px solid #D5D7DA",
        background: customizeButtonHovered ? "#F8F9FA" : "#FFF",
        boxShadow:
          "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
        ...(isMobile ? { alignSelf: "stretch" } : {}),
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
          d="M2 5.3335L10 5.3335M10 5.3335C10 6.43807 10.8954 7.3335 12 7.3335C13.1046 7.3335 14 6.43807 14 5.3335C14 4.22893 13.1046 3.3335 12 3.3335C10.8954 3.3335 10 4.22893 10 5.3335ZM6 10.6668L14 10.6668M6 10.6668C6 11.7714 5.10457 12.6668 4 12.6668C2.89543 12.6668 2 11.7714 2 10.6668C2 9.56226 2.89543 8.66683 4 8.66683C5.10457 8.66683 6 9.56226 6 10.6668Z"
          stroke="#A4A7AE"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
          Customize
        </div>
      </div>
    </button>
  );

  const renderDefaultButton = () => (
    <div
      className={`dashboard-dropdown ${defaultDropdownOpen ? "open" : ""}`}
      data-dropdown
      style={{
        position: "relative",
        ...(isMobile ? { alignSelf: "stretch" } : {}),
      }}
    >
      <button
        className="dashboard-button"
        onClick={() => setDefaultDropdownOpen(!defaultDropdownOpen)}
        onMouseEnter={() => setDefaultButtonHovered(true)}
        onMouseLeave={() => setDefaultButtonHovered(false)}
        style={{
          display: "flex",
          minHeight: "36px",
          padding: "6px 8px",
          justifyContent: isMobile ? "space-between" : "center",
          alignItems: "center",
          gap: "4px",
          borderRadius: "8px",
          border: "1px solid #D5D7DA",
          background: defaultButtonHovered ? "#F8F9FA" : "#FFF",
          boxShadow:
            "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
          ...(isMobile ? { alignSelf: "stretch", width: "100%" } : {}),
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
            d="M8 8L14 8M8 2L8 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            padding: "0px 2px",
            justifyContent: isMobile ? "flex-start" : "center",
            alignItems: "center",
            ...(isMobile ? { flex: "1 0 0" } : {}),
          }}
        >
          <div
            style={{
              color: "#414651",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "20px",
              textAlign: isMobile ? "left" : "center",
            }}
          >
            Default
          </div>
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
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="dashboard-dropdown-content">
        <button className="dashboard-dropdown-item">Grid View</button>
        <button className="dashboard-dropdown-item">List View</button>
        <button className="dashboard-dropdown-item">Card View</button>
      </div>
    </div>
  );

  const renderDateButton = () => (
    <div
      data-date-picker
      style={{
        position: "relative",
        ...(isMobile ? { alignSelf: "stretch" } : {}),
      }}
    >
      <button
        ref={dateButtonRef}
        className="dashboard-button"
        onClick={handleOpenDatePicker}
        onMouseEnter={() => setDateButtonHovered(true)}
        onMouseLeave={() => setDateButtonHovered(false)}
        style={{
          display: "flex",
          minHeight: "36px",
          padding: "6px 8px",
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: "center",
          gap: "4px",
          borderRadius: "8px",
          border: "1px solid #D5D7DA",
          background: datePickerOpen
            ? "#F5F5F5"
            : dateButtonHovered
              ? "#F8F9FA"
              : "#FFF",
          boxShadow:
            "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
          ...(isMobile ? { alignSelf: "stretch", width: "100%" } : {}),
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
            d="M14 6.66683H2M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M5.2 14.6668H10.8C11.9201 14.6668 12.4802 14.6668 12.908 14.4488C13.2843 14.2571 13.5903 13.9511 13.782 13.5748C14 13.147 14 12.5869 14 11.4668V5.86683C14 4.74672 14 4.18667 13.782 3.75885C13.5903 3.38252 13.2843 3.07656 12.908 2.88482C12.4802 2.66683 11.9201 2.66683 10.8 2.66683H5.2C4.0799 2.66683 3.51984 2.66683 3.09202 2.88482C2.71569 3.07656 2.40973 3.38252 2.21799 3.75885C2 4.18667 2 4.74672 2 5.86683V11.4668C2 12.5869 2 13.147 2.21799 13.5748C2.40973 13.9511 2.71569 14.2571 3.09202 14.4488C3.51984 14.6668 4.0799 14.6668 5.2 14.6668Z"
            stroke={datePickerOpen ? "#717680" : "#A4A7AE"}
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
              color: datePickerOpen ? "#252B37" : "#414651",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "20px",
            }}
          >
            {formatDateRange(selectedStartDate, selectedEndDate)}
          </div>
        </div>
      </button>
    </div>
  );

  return (
    <DragDropProvider initialWidgets={initialWidgets}>
      <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />

      {/* Success Notification - Positioned at the very top */}
      {showNotification && (
        <AlertNotification
          title="Account Activated Successfully"
          description="Manage your account and update your personal details in settings."
          variant="success"
          position={getNotificationPosition()}
          breakpoint={getNotificationBreakpoint()}
          onDismiss={handleNotificationDismiss}
          primaryAction={{
            label: "Update Account",
            onClick: handleUpdateAccount,
          }}
          secondaryAction={{
            label: "Dismiss",
            onClick: handleNotificationDismiss,
          }}
        />
      )}

      {/* Order Success Notification - Positioned at the very top */}
      {orderNotification?.show && (
        <AlertNotification
          title={orderNotification.title}
          description={orderNotification.description}
          variant="success"
          position={getNotificationPosition()}
          breakpoint={getNotificationBreakpoint()}
          onDismiss={() => setOrderNotification(null)}
          primaryAction={{
            label: "View Order",
            onClick: () => {
              console.log("View order:", orderNotification.orderNumber);
              setOrderNotification(null);
            },
          }}
          secondaryAction={{
            label: "Dismiss",
            onClick: () => setOrderNotification(null),
          }}
        />
      )}

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
        {/* Mobile Menu Overlay - Only show when mobile menu is open and no drawers are active */}
        {mobileMenuOpen && !isDesktop && (
          <div
            className="fixed inset-0"
            style={{
              width: "100vw",
              height: "100vh",
              background: "rgba(10, 13, 18, 0.7)",
              backdropFilter: "blur(8px)",
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 999,
            }}
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Sidebar Navigation */}
        <Sidebar
          isDesktop={isDesktop}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          currentPage="Dashboard"
          showMobileUserMenu={showMobileUserMenu}
          setShowMobileUserMenu={setShowMobileUserMenu}
          setMobileMenuOpen={setMobileMenuOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showNotification={showNotification || orderNotification?.show}
        />

        {/* Main Content */}
        <div
          className={isMobile ? "mobile-container" : ""}
          style={{
            marginLeft: isDesktop ? "296px" : "0",
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            background: "#FAFAFA",
            position: "relative",
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* Desktop Top Navigation Bar */}
          <Header
            isDesktop={isDesktop}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            showMobileUserMenu={showMobileUserMenu}
            showNotification={showNotification || orderNotification?.show}
            onOrderNotification={(notification) => {
              setOrderNotification({
                show: true,
                ...notification,
              });
            }}
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
            onOrderNotification={(notification) => {
              setOrderNotification({
                show: true,
                ...notification,
              });
            }}
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

          {/* Main Content Area */}
          <div
            style={{
              marginTop: isDesktop
                ? showNotification || orderNotification?.show
                  ? "140px"
                  : "80px"
                : "64px",
              paddingBottom: isMobile
                ? showNotification || orderNotification?.show
                  ? "140px"
                  : "80px"
                : "32px",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              minHeight: "auto",
              height: "auto",
            }}
          >
            {/* Header Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: isMobile ? "32px 16px 0" : "32px 32px 0",
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
                  <div
                    style={{
                      display: "flex",
                      ...(isMobile
                        ? {
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }
                        : {
                            alignItems: "flex-end",
                            alignContent: "flex-end",
                            gap: "20px 16px",
                            alignSelf: "stretch",
                            flexWrap: "wrap",
                          }),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        ...(isMobile
                          ? {
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "2px",
                              alignSelf: "stretch",
                            }
                          : {
                              minWidth: "320px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                            }),
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#181D27",
                          fontFamily: "Public Sans",
                          fontSize: isDesktop ? "24px" : "20px",
                          fontWeight: "600",
                          lineHeight: isDesktop ? "32px" : "30px",
                        }}
                      >
                        Dashboard
                      </div>
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: "400",
                          lineHeight: "24px",
                        }}
                      >
                        View recent activity, task progress, and key data to
                        stay informed and organized.
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div
                      style={{
                        display: "flex",
                        ...(isMobile
                          ? {
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              gap: "12px",
                              alignSelf: "stretch",
                            }
                          : { alignItems: "center", gap: "12px" }),
                      }}
                    >
                      {renderCustomizeButton()}
                      {renderDefaultButton()}
                      {renderDateButton()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Overview Section */}
            <div
              style={{
                display: "flex",
                padding: isMobile ? "0px 16px" : "0px 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              {/* Section label */}
              <div
                style={{
                  display: "flex",
                  width: "280px",
                  minWidth: "240px",
                  maxWidth: "280px",
                  flexDirection: "column",
                  alignItems: "flex-start",
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
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  >
                    Quick Overview
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "16px",
                      height: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        width: "16px",
                        height: "16px",
                        flexShrink: 0,
                      }}
                    >
                      <g clipPath="url(#clip0_help_circle)">
                        <path
                          d="M6.06016 6.00016C6.2169 5.55461 6.52626 5.1789 6.93347 4.93958C7.34067 4.70027 7.81943 4.61279 8.28495 4.69264C8.75047 4.77249 9.17271 5.01451 9.47688 5.37585C9.78106 5.73718 9.94753 6.19451 9.94683 6.66683C9.94683 8.00016 7.94683 8.66683 7.94683 8.66683M8.00016 11.3335H8.00683M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_help_circle">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Metric cards group */}
              <div
                style={{
                  display: isMobile ? "flex" : "grid",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  ...(isMobile
                    ? {
                        flexDirection: "column",
                      }
                    : isDesktop
                      ? {
                          gridTemplateColumns: "repeat(4, 1fr)",
                        }
                      : {
                          // Tablet: 2x2 grid
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gridTemplateRows: "repeat(2, 1fr)",
                        }),
                }}
              >
                <MetricCard
                  label="[Metric]"
                  value="347"
                  trend={{
                    direction: "up",
                    percentage: "100%",
                  }}
                  chart={{
                    trend: "positive",
                    backgroundColor: "#344698",
                    lineColor: "#344698",
                    variant: "default",
                  }}
                  isMobile={isMobile}
                />

                <MetricCard
                  label="[Metric]"
                  value="482"
                  trend={{
                    direction: "down",
                    percentage: "50%",
                  }}
                  chart={{
                    trend: "positive",
                    backgroundColor: "#344698",
                    lineColor: "#344698",
                    variant: "variant1",
                  }}
                  isMobile={isMobile}
                />

                <MetricCard
                  label="[Metric]"
                  value="391"
                  trend={{
                    direction: "up",
                    percentage: "100%",
                  }}
                  chart={{
                    trend: "positive",
                    backgroundColor: "#344698",
                    lineColor: "#344698",
                    variant: "variant2",
                  }}
                  isMobile={isMobile}
                />

                <MetricCard
                  label="[Metric]"
                  value="482"
                  trend={{
                    direction: "down",
                    percentage: "50%",
                  }}
                  chart={{
                    trend: "positive",
                    backgroundColor: "#344698",
                    lineColor: "#344698",
                    variant: "variant3",
                  }}
                  isMobile={isMobile}
                />
              </div>
            </div>

            {/* Widgets Section */}
            <div
              style={{
                display: "flex",
                padding: isMobile ? "0px 16px" : "0px 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  ...(isMobile
                    ? {
                        flexDirection: "column",
                        gap: "16px",
                        alignSelf: "stretch",
                      }
                    : {
                        // Flexible row layout that keeps widgets side by side and adapts to their sizes
                        flexDirection: "row",
                        gap: "16px",
                        width: "100%",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        overflow: "hidden", // Prevent widgets from overflowing container
                        minWidth: 0, // Allow flex items to shrink below their natural size
                      }),
                }}
              >
                {widgetOrder.map((widgetId, index) => {
                  if (widgetId === "latest-reports") {
                    return (
                      <LatestReportsWidget
                        key={widgetId}
                        id={widgetId}
                        position={index}
                        size={widgetSizes[widgetId]}
                        onResize={handleWidgetResize}
                        isMobile={isMobile}
                        isTablet={!isMobile && !isDesktop}
                        windowWidth={windowWidth}
                      />
                    );
                  }
                  if (widgetId === "turnaround-time") {
                    return (
                      <TurnaroundTimeWidget
                        key={widgetId}
                        id={widgetId}
                        position={index}
                        size={widgetSizes[widgetId]}
                        onResize={handleWidgetResize}
                        isMobile={isMobile}
                        isTablet={!isMobile && !isDesktop}
                        windowWidth={windowWidth}
                      />
                    );
                  }
                  return null;
                })}
              </div>

              {/* Second Row - Orders by Status Widget */}
              <div
                style={{
                  display: "flex",
                  ...(isMobile
                    ? {
                        flexDirection: "column",
                        gap: "16px",
                        alignSelf: "stretch",
                      }
                    : {
                        // Flexible row layout for new row
                        flexDirection: "row",
                        gap: "16px",
                        width: "100%",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        overflow: "hidden",
                        minWidth: 0,
                      }),
                }}
              >
                {secondRowWidgets.map((widgetId, index) => {
                  if (widgetId === "orders-by-status") {
                    return (
                      <OrdersByStatusWidget
                        key={widgetId}
                        id={widgetId}
                        position={index + widgetOrder.length}
                        size={widgetSizes[widgetId]}
                        onResize={handleWidgetResize}
                        isMobile={isMobile}
                        isTablet={!isMobile && !isDesktop}
                        windowWidth={windowWidth}
                      />
                    );
                  }

                  return null;
                })}
              </div>

              {/* Third Row - Assigned Tasks Widget */}
              <div
                style={{
                  display: "flex",
                  ...(isMobile
                    ? {
                        flexDirection: "column",
                        gap: "16px",
                        alignSelf: "stretch",
                      }
                    : {
                        // Flexible row layout for third row
                        flexDirection: "row",
                        gap: "16px",
                        width: "100%",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        overflow: "hidden",
                        minWidth: 0,
                      }),
                }}
              >
                {thirdRowWidgets.map((widgetId, index) => {
                  if (widgetId === "assigned-tasks") {
                    return (
                      <AssignedTasksWidget
                        key={widgetId}
                        id={widgetId}
                        position={
                          index + widgetOrder.length + secondRowWidgets.length
                        }
                        size={widgetSizes[widgetId]}
                        onResize={handleWidgetResize}
                        isMobile={isMobile}
                        isTablet={!isMobile && !isDesktop}
                        windowWidth={windowWidth}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customize Drawer */}
      <CustomizeDrawer
        isOpen={customizeDrawerOpen}
        onClose={() => setCustomizeDrawerOpen(false)}
      />

      {/* Date Picker Calendar - Desktop uses DesktopCalendar, Mobile/Tablet uses DatePickerCalendar */}
      {isDesktop ? (
        <DesktopCalendar
          isOpen={datePickerOpen}
          onClose={() => setDatePickerOpen(false)}
          triggerRef={dateButtonRef}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={handleDateChange}
        />
      ) : (
        <DatePickerCalendar
          isOpen={datePickerOpen}
          onClose={() => setDatePickerOpen(false)}
          triggerRef={dateButtonRef}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={handleDateChange}
        />
      )}
    </DragDropProvider>
  );
}
