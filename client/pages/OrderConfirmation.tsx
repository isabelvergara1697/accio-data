import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { useIsMobile } from "../hooks/use-mobile";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = !isMobile && typeof window !== "undefined" && window.innerWidth < 1024;
  const isDesktop = !isMobile && !isTablet;
  const [showNotification, setShowNotification] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);

  const handleSignOut = () => {
    navigate("/activate-account");
  };

  const getUserMenuStyles = () => ({
    opacity: userMenuOpen || userMenuHovered ? 1 : 0,
    visibility: (userMenuOpen || userMenuHovered ? "visible" : "hidden") as "visible" | "hidden",
    transform: `translateY(${userMenuOpen || userMenuHovered ? "0" : "-10px"})`,
    transition: "opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setShowMobileUserMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const handleCreateNewOrder = () => {
    navigate("/online-ordering");
  };

  const handleSeeOrder = () => {
    // Navigate to order details or screening dashboard
    console.log("Navigating to order details...");
  };

  const handleScheduleDrugTest = () => {
    // Navigate to drug test scheduling
    console.log("Navigating to drug test scheduling...");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Sidebar */}
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="order-confirmation"
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

      {/* Main Content area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#FAFAFA",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          width: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          maxWidth: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          transition:
            "margin-left 0.3s ease, width 0.3s ease, max-width 0.3s ease",
        }}
      >
        {/* Top Bar */}
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
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: 1,
            padding: isMobile ? "0 16px 24px 16px" : "0 32px 24px 32px",
            paddingTop:
              showNotification && isDesktop
                ? "136px"
                : isDesktop
                  ? "104px"
                  : isTablet
                    ? "88px"
                    : "88px",
          }}
        >
          {/* Page Header */}
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
                gap: "16px",
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
                <h1
                  style={{
                    alignSelf: "stretch",
                    color: "#181D27",
                    fontFamily: "'Public Sans'",
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "32px",
                    margin: 0,
                  }}
                >
                  Order 9284 Created
                </h1>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "'Public Sans'",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  Your order for [First Name, Last Name] has been created. Next, you can manage documents or schedule additional services.
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <button
                  onClick={handleSeeOrder}
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
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    See Order
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
            }}
          >
            {/* Schedule Drug Test Section */}
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
              {/* Header */}
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
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "'Public Sans'",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                      flex: "1 0 0",
                    }}
                  >
                    Schedule Drug Test
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  display: "flex",
                  padding: "12px 24px 16px 24px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "0px 0px 0 0",
                  borderRight: "1px solid #E9EAEB",
                  borderBottom: "1px solid #E9EAEB",
                  borderLeft: "1px solid #E9EAEB",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "'Public Sans'",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Choose a convenient collection site and schedule the drug test on behalf of the applicant. Once scheduled, the donor pass will be available for download.
                </div>
                <button
                  onClick={handleScheduleDrugTest}
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
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Schedule Drug Test
                  </span>
                </button>
              </div>
            </div>

            {/* Document List Section */}
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
              {/* Header */}
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
                      alignItems: "center",
                      gap: "8px",
                      flex: "1 0 0",
                    }}
                  >
                    <h2
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "18px",
                        fontWeight: 600,
                        lineHeight: "28px",
                        margin: 0,
                      }}
                    >
                      Document List
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        padding: "2px 8px",
                        alignItems: "center",
                        borderRadius: "9999px",
                        border: "1px solid #E9EAEB",
                        background: "#FAFAFA",
                      }}
                    >
                      <span
                        style={{
                          color: "#414651",
                          textAlign: "center",
                          fontFamily: "'Public Sans'",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "18px",
                        }}
                      >
                        0/9 Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document List Content */}
              <div
                style={{
                  display: "flex",
                  padding: "12px 24px 16px 24px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                  borderRadius: "0px 0px 0 0",
                  borderRight: "1px solid #E9EAEB",
                  borderBottom: "1px solid #E9EAEB",
                  borderLeft: "1px solid #E9EAEB",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Document Items */}
                  {[
                    {
                      title: "Release Form Cover Page",
                      description: "Upload a single release form",
                    },
                    {
                      title: "Privacy Policy",
                      description: "Read our privacy policy and confirm you understand it.",
                    },
                    {
                      title: "Employment Contract",
                      description: "Sign your employment agreement to move forward.",
                    },
                    {
                      title: "Non-Disclosure Agreement",
                      description: "Sign the NDA to confirm confidentiality.",
                    },
                    {
                      title: "Health Insurance Form",
                      description: "Complete and sign to enroll in health benefits.",
                    },
                    {
                      title: "Upload Driver's License",
                      description: "Upload a clear photo of your driver's license.",
                    },
                    {
                      title: "Employment Application Form",
                      description: "Download, complete, and re-upload your application form.",
                    },
                    {
                      title: "Employment Information Form",
                      description: "Fill out your employee information online and sign.",
                    },
                    {
                      title: "Employment Contract - PDF Form",
                      description: "Review, complete, and sign the employment contract PDF.",
                    },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "12px",
                          alignItems: "center",
                          flex: "1 0 0",
                          borderBottom: index < 8 ? "1px solid #E9EAEB" : "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              alignSelf: "stretch",
                              overflow: "hidden",
                              color: "#181D27",
                              textOverflow: "ellipsis",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {doc.title}
                          </div>
                          <div
                            style={{
                              color: "#535862",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            {doc.description}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "64px",
                          padding: "12px",
                          alignItems: "center",
                          borderBottom: index < 8 ? "1px solid #E9EAEB" : "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "2px 8px",
                            alignItems: "center",
                            borderRadius: "9999px",
                            border: "1px solid #FEDF89",
                            background: "#FFFAEB",
                          }}
                        >
                          <span
                            style={{
                              color: "#B54708",
                              textAlign: "center",
                              fontFamily: "'Public Sans'",
                              fontSize: "12px",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            Pending
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "40px",
                          padding: "12px",
                          alignItems: "center",
                          gap: "4px",
                          alignSelf: "stretch",
                          borderBottom: index < 8 ? "1px solid #E9EAEB" : "none",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M1.61342 8.47546C1.52262 8.3317 1.47723 8.25982 1.45182 8.14895C1.43273 8.06568 1.43273 7.93434 1.45182 7.85107C1.47723 7.7402 1.52262 7.66832 1.61341 7.52456C2.36369 6.33657 4.59693 3.33334 8.00027 3.33334C11.4036 3.33334 13.6369 6.33657 14.3871 7.52456C14.4779 7.66832 14.5233 7.7402 14.5487 7.85107C14.5678 7.93434 14.5678 8.06568 14.5487 8.14895C14.5233 8.25982 14.4779 8.3317 14.3871 8.47546C13.6369 9.66345 11.4036 12.6667 8.00027 12.6667C4.59693 12.6667 2.36369 9.66345 1.61342 8.47546Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.00027 10C9.10484 10 10.0003 9.10458 10.0003 8.00001C10.0003 6.89544 9.10484 6.00001 8.00027 6.00001C6.8957 6.00001 6.00027 6.89544 6.00027 8.00001C6.00027 9.10458 6.8957 10 8.00027 10Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <button
              onClick={handleCreateNewOrder}
              style={{
                display: "flex",
                padding: "12px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  color: "#414651",
                  fontFamily: "'Public Sans'",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Create New Order
              </span>
            </button>
            <button
              onClick={handleSeeOrder}
              style={{
                display: "flex",
                padding: "12px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
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
                  fontFamily: "'Public Sans'",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                See Order
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
