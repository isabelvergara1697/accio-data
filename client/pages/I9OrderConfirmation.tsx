import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Button } from "../components/ui/button";

const I9OrderConfirmation = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(true);

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    console.log("Sign out");
  };

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        background: "#FAFAFA",
        borderRadius: "12px",
      };
    }
    return {};
  };

  // Responsive breakpoint logic
  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  const handleSubmitNow = () => {
    // Handle final submission
    console.log("Order submitted successfully");
    // You can add success message or redirect to success page
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#FAFAFA",
        fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
      }}
    >
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="i9-order-confirmation"
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
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && !isDesktop && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
          ...(isDesktop && {
            marginLeft: sidebarCollapsed ? "80px" : "296px",
          }),
        }}
      >
        {isMobile ? (
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
        ) : (
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
          />
        )}

        {/* Spacer for fixed header */}
        <div
          style={{
            height: isDesktop ? "72px" : "64px",
            background: "transparent",
          }}
        />
        
        {/* Main Content Container */}
        <div
          style={{
            display: "flex",
            paddingBottom: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            borderRadius: "40px 0 0 0",
            background: "#F9F9F9",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header Navigation */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "stretch",
              background: "#F9F9F9",
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "72px",
                padding: "0 32px",
                alignItems: "center",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              {/* Breadcrumbs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {/* Home Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    borderRadius: "0px",
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
                      d="M8 17H16M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#A4A7AE"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0px",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Tools
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
                    d="M9 18L15 12L9 6"
                    stroke="#A4A7AE"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0px",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    I-9 Order
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
                    d="M9 18L15 12L9 6"
                    stroke="#A4A7AE"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0px",
                  }}
                >
                  <div
                    style={{
                      color: "#273572",
                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    I-9 Form
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                padding: "0 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              {/* Page header */}
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
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "20px 16px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: "320px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: "1 0 0",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#181D27",
                        fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "24px",
                        fontWeight: 600,
                        lineHeight: "32px",
                      }}
                    >
                      Submit or Save Order.
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Track pending invites and submitted orders in one place. Use filters and tools to sort, review, and manage activity easily.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            {/* Container */}
            <div
              style={{
                display: "flex",
                padding: "0 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              {/* Form */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                  alignSelf: "stretch",
                }}
              >
                {/* Authorize and Continue */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {/* Section Headers */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
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
                              <div
                                style={{
                                  color: "#181D27",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "18px",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                }}
                              >
                                Authorize and Continue
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 24px 16px 24px",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      border: "1px solid #E9EAEB",
                      borderTop: "none",
                    }}
                  >
                    {/* Actions */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#181D27",
                          textAlign: "center",
                          fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "16px",
                          fontWeight: 600,
                          lineHeight: "24px",
                        }}
                      >
                        Order Total $5.41
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <Button
                          variant="default"
                          size="lg"
                          onClick={handleSubmitNow}
                          style={{
                            background: "#344698",
                            color: "#FFF",
                            border: "2px solid rgba(255, 255, 255, 0.12)",
                            borderRadius: "8px",
                            padding: "12px",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          Submit Now
                        </Button>
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
                            flex: "1 0 0",
                            height: "1px",
                            background: "#E9EAEB",
                          }}
                        />
                      </div>

                      {/* Table */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                        }}
                      >
                        {/* Table Headers */}
                        <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Included
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              N
                            </div>
                          </div>
                        </div>

                        {/* Search Type Column */}
                        <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Search Type
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              I-9 Package
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              I-9 Form Creation
                            </div>
                          </div>
                        </div>

                        {/* Location/Adjustment Column */}
                        <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Location / Adjustment
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              [Value]
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              [Value]
                            </div>
                          </div>
                        </div>

                        {/* Price Column */}
                        <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Price
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.00
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.00
                            </div>
                          </div>
                        </div>

                        {/* Adjustment Column */}
                        <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Adjustment
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.00
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.00
                            </div>
                          </div>
                        </div>

                        {/* 3rd Party Fees Column */}
                        <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              3rd Party Fees
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.00
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.00
                            </div>
                          </div>
                        </div>

                        {/* Taxes Column */}
                        <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Taxes
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.41
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.00
                            </div>
                          </div>
                        </div>

                        {/* Total Column */}
                        <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Total
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              0.41
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              5.00
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              5.41
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Second Divider */}
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
                            flex: "1 0 0",
                            height: "1px",
                            background: "#E9EAEB",
                          }}
                        />
                      </div>

                      {/* Legal Text */}
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#535862",
                          fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                        }}
                      >
                        The information provided is a consumer report as defined in the federal Fair Credit Reporting Act [15 U.S.C. 1681-1681u]. It contains confidential information on the individual named. It is submitted to the conditions contained in your Subscriber Agreement with Accio Data and may be used solely as a factor in evaluating the named individual for property renting/leasing, employment, promotion, reassignment or retention as an employee. Accio Data maintains strict procedures designed to ensure that the information is complete and up to date. While the information furnished is from reliable sources, its accuracy is not guaranteed. Proper use of this report and final verification of the named individual's identity is your sole responsibility. If any adverse action is taken based in whole or in part on this consumer report, a copy of this report and a summary of the consumer's rights must be provided to the consumer prior to taking adverse action. If you have any questions regarding the accuracy or completeness of this report, please contact Accio Data at 800-777-7777.
                      </div>

                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#535862",
                          fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                        }}
                      >
                        The summary of consumer's rights is available in the help section of the website.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Overview Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {/* Section Headers */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
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
                              <div
                                style={{
                                  color: "#181D27",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "18px",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                }}
                              >
                                Order Overview
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "20px 24px 16px 24px",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "20px",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      border: "1px solid #E9EAEB",
                      borderTop: "none",
                    }}
                  >
                    {/* Package and Products Section */}
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 16px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        borderRadius: "8px",
                        border: "1px solid #E9EAEB",
                        background: "#FAFAFA",
                      }}
                    >
                      {/* Title Bar */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "stretch",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "18px",
                            fontWeight: 500,
                            lineHeight: "28px",
                          }}
                        >
                          Package and Products
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            style={{
                              padding: "8px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              transform: isAccordionExpanded ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s ease",
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
                                d="M4 6L8 10L12 6"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "8px",
                          alignSelf: "stretch",
                        }}
                      >
                        {/* Package Section */}
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
                              alignSelf: "stretch",
                              color: "#414651",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "16px",
                              fontWeight: 600,
                              lineHeight: "24px",
                            }}
                          >
                            Package
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "16px",
                              alignSelf: "stretch",
                            }}
                          >
                            {/* Package Info */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#717680",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                Package
                              </div>
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#181D27",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                I-9 Form
                              </div>
                            </div>

                            {/* ETA Info */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#717680",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                ETA
                              </div>
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#181D27",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                Today 08/21
                              </div>
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
                              flex: "1 0 0",
                              height: "1px",
                              background: "#E9EAEB",
                            }}
                          />
                        </div>

                        {/* Requester Section */}
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
                              alignSelf: "stretch",
                              color: "#414651",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "16px",
                              fontWeight: 600,
                              lineHeight: "24px",
                            }}
                          >
                            Requester
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            {/* Requester Name */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#717680",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                Requester
                              </div>
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#181D27",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                Alexandra Fitzwilliam
                              </div>
                            </div>

                            {/* Requester Fax */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#717680",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                Fax
                              </div>
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#181D27",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                123456789
                              </div>
                            </div>

                            {/* Requester Phone */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#717680",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                Phone
                              </div>
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#181D27",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                +1 (555) 000-0000
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default I9OrderConfirmation;
