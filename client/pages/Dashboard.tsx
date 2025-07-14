import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AlertNotification from "../components/ui/alert-notification";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Sidebar } from "../components/Sidebar";

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
    transition: all 0.2s ease-in-out;
  }

  .dashboard-button:hover {
    transform: translateY(-1px);
    box-shadow: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -4px 6px 0px rgba(10, 13, 18, 0.1) inset, 0px 2px 4px 0px rgba(10, 13, 18, 0.1);
  }

  .dashboard-button:active {
    transform: translateY(0);
    box-shadow: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -1px 2px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
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
  const [showNotification, setShowNotification] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [defaultDropdownOpen, setDefaultDropdownOpen] = useState(false);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    };

    if (userMenuOpen || defaultDropdownOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userMenuOpen, defaultDropdownOpen]);

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
          "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        cursor: "pointer",
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
            "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
          cursor: "pointer",
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
            justifyContent: "center",
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
              ...(isMobile ? { flex: "1 0 0" } : {}),
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
    <button
      className="dashboard-button"
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
          "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        cursor: "pointer",
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
          d="M14 6.66683H2M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M5.2 14.6668H10.8C11.9201 14.6668 12.4802 14.6668 12.908 14.4488C13.2843 14.2571 13.5903 13.9511 13.782 13.5748C14 13.147 14 12.5869 14 11.4668V5.86683C14 4.74672 14 4.18667 13.782 3.75885C13.5903 3.38252 13.2843 3.07656 12.908 2.88482C12.4802 2.66683 11.9201 2.66683 10.8 2.66683H5.2C4.0799 2.66683 3.51984 2.66683 3.09202 2.88482C2.71569 3.07656 2.40973 3.38252 2.21799 3.75885C2 4.18667 2 4.74672 2 5.86683V11.4668C2 12.5869 2 13.147 2.21799 13.5748C2.40973 13.9511 2.71569 14.2571 3.09202 14.4488C3.51984 14.6668 4.0799 14.6668 5.2 14.6668Z"
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
          Jan 10, 2025 – Jan 16, 2025
        </div>
      </div>
    </button>
  );

  return (
    <>
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

      <div
        style={{
          display: "flex",
          width: "100%",
          background: "#FAFAFA",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && !isDesktop && (
          <div
            className="fixed inset-0 z-[9998]"
            style={{
              width: "100vw",
              height: "100vh",
              background: "rgba(10, 13, 18, 0.7)",
              backdropFilter: "blur(8px)",
              position: "fixed",
              left: 0,
              top: 0,
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
          showNotification={showNotification}
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
            minHeight: "100vh",
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
            showNotification={showNotification}
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
          />

          {/* Main Content Area */}
          <div
            style={{
              marginTop: isDesktop
                ? showNotification
                  ? "140px"
                  : "80px"
                : "64px",
              paddingBottom: isMobile
                ? showNotification
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
                  padding: isMobile ? "0px 16px" : "0px 32px",
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

            {/* Dashboard Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "16px" : "32px",
                width: "100%",
                padding: isMobile ? "0 16px" : "0 32px",
              }}
            >
              {/* Dashboard Metrics */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isDesktop
                    ? "repeat(4, 1fr)"
                    : isMobile
                      ? "1fr"
                      : "repeat(2, 1fr)",
                  gap: "20px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    background: "#FFF",
                    border: "1px solid #E9EAEB",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "14px",
                      color: "#535862",
                      marginBottom: "8px",
                    }}
                  >
                    Total Orders
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#181D27",
                    }}
                  >
                    142
                  </p>
                </div>

                <div
                  style={{
                    background: "#FFF",
                    border: "1px solid #E9EAEB",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "14px",
                      color: "#535862",
                      marginBottom: "8px",
                    }}
                  >
                    Pending Reviews
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#181D27",
                    }}
                  >
                    8
                  </p>
                </div>

                <div
                  style={{
                    background: "#FFF",
                    border: "1px solid #E9EAEB",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "14px",
                      color: "#535862",
                      marginBottom: "8px",
                    }}
                  >
                    Completed
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#181D27",
                    }}
                  >
                    134
                  </p>
                </div>

                <div
                  style={{
                    background: "#FFF",
                    border: "1px solid #E9EAEB",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "14px",
                      color: "#535862",
                      marginBottom: "8px",
                    }}
                  >
                    Active Users
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#181D27",
                    }}
                  >
                    23
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div
                style={{
                  background: "#FFF",
                  border: "1px solid #E9EAEB",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    color: "#181D27",
                  }}
                >
                  Quick Actions
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isDesktop
                      ? "repeat(3, 1fr)"
                      : isMobile
                        ? "1fr"
                        : "repeat(2, 1fr)",
                    gap: "12px",
                  }}
                >
                  <button
                    style={{
                      padding: "12px 16px",
                      background: "#344698",
                      color: "#FFF",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Create New Order
                  </button>
                  <button
                    style={{
                      padding: "12px 16px",
                      background: "#FFF",
                      color: "#344698",
                      border: "1px solid #344698",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    View Reports
                  </button>
                  <button
                    style={{
                      padding: "12px 16px",
                      background: "#FFF",
                      color: "#344698",
                      border: "1px solid #344698",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/resources")}
                  >
                    Access Resources
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
