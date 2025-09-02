import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";

const OnlineOrdering = () => {
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
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Sidebar */}
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="online-ordering"
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
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          width: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          maxWidth: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          overflow: "hidden",
          transition:
            "margin-left 0.3s ease, width 0.3s ease, max-width 0.3s ease",
        }}
      >
        {/* Header */}
        {isDesktop ? (
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
        ) : (
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
        )}

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            paddingBottom: "24px",
            paddingTop:
              showNotification && isDesktop
                ? "136px"
                : isDesktop
                  ? "104px"
                  : "88px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            alignSelf: "stretch",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header section */}
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
                padding: isDesktop ? "0 32px" : "0 20px",
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
                      minWidth: isDesktop ? "320px" : "auto",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: "1 0 0",
                    }}
                  >
                    {/* Title */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "var(--colors-text-text-primary-900, #181D27)",
                        fontFamily:
                          "var(--Font-family-font-family-display, 'Public Sans')",
                        fontSize: "var(--Font-size-display-xs, 24px)",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "var(--Line-height-display-xs, 32px)",
                      }}
                    >
                      Create New Order
                    </div>
                    {/* Supporting text */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "var(--colors-text-text-tertiary-600, #535862)",
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-md, 16px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Line-height-text-md, 24px)",
                      }}
                    >
                      Track pending invites and submitted orders in one place.
                      Use filters and tools to sort, review, and manage activity
                      easily.
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {/* Expand All Button */}
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
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Expand All
                        </div>
                      </div>
                      <svg
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66675 10L8.00008 13.3333L11.3334 10M4.66675 6L8.00008 2.66667L11.3334 6"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Save as Draft Button */}
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
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Save as Draft
                        </div>
                      </div>
                    </button>
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
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            {/* Container */}
            <div
              style={{
                display: "flex",
                padding: isDesktop ? "0 32px" : "0 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              {/* Order Information Container */}
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
                {/* Section Header */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    background: "#FFF",
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
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-lg, 18px)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-lg, 28px)",
                              }}
                            >
                              Order Information
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
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Information Row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    {/* Package Info */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        minWidth: "120px",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Package
                      </div>
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        CSD Standard
                      </div>
                    </div>

                    {/* Subject Info */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        minWidth: "120px",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Subject
                      </div>
                      <div
                        style={{
                          color: "#717680",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        No Info Yet
                      </div>
                    </div>

                    {/* Requester Info */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        minWidth: "120px",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Requester
                      </div>
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        Alexandra Fitzwilliam
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        display: "flex",
                        width: isDesktop ? "320px" : "100%",
                        alignItems: "center",
                        gap: "12px",
                        minWidth: "200px",
                      }}
                    >
                      <div
                        style={{
                          height: "8px",
                          flex: "1 0 0",
                          position: "relative",
                        }}
                      >
                        {/* Background */}
                        <div
                          style={{
                            width: "100%",
                            height: "8px",
                            borderRadius: "9999px",
                            background: "#D5D7DA",
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                          }}
                        />
                        {/* Progress */}
                        <div
                          style={{
                            width: "6px",
                            height: "8px",
                            borderRadius: "9999px",
                            background: "#344698",
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          color: "#414651",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        0% Complete
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
                        height: "1px",
                        flex: "1 0 0",
                        background: "#E9EAEB",
                      }}
                    />
                  </div>

                  {/* Status Tab */}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      padding: "4px",
                      alignItems: "flex-start",
                      alignContent: "flex-start",
                      gap: "4px",
                      flexWrap: "wrap",
                      borderRadius: "10px",
                      border: "1px solid #E9EAEB",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "36px",
                        padding: "8px 6px 8px 12px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        borderRadius: "6px",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Package
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

export default OnlineOrdering;
