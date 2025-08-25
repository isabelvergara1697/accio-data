import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Button } from "../components/ui/button";

const I9OrderSubmission = () => {
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

  const handleUpdateSSN = () => {
    // Navigate back to I9 form for SSN correction
    navigate("/i9-form-completion");
  };

  const handleUpdateI9Form = () => {
    // Handle replacing existing I-9
    console.log("Update I-9 Form");
  };

  const handleCreateI9OrderAnyway = () => {
    // Handle admin override
    console.log("Create I-9 Order Anyway");
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
        currentPage="i9-order-submission"
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
          marginLeft: sidebarCollapsed ? "80px" : "296px",
          width: `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`,
          maxWidth: `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`,
          overflow: "hidden",
          transition: "margin-left 0.3s, width 0.3s, max-width 0.3s",
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

        {/* Main Content with proper rounded corner */}
        <div
          style={{
            display: "flex",
            paddingBottom: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            borderRadius: "40px 0 0 0",
            position: "relative",
          }}
        >
          {/* Header Section with Breadcrumbs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
              paddingTop: isDesktop ? "24px" : "16px",
            }}
          >
            {/* Header Container with Breadcrumbs */}
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
              {/* Breadcrumbs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {/* Home Icon */}
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

                {/* Chevron */}
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

                {/* Tools */}
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

                {/* Chevron */}
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

                {/* I-9 Order */}
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

                {/* Chevron */}
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

                {/* I-9 Form */}
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

          {/* Page Content Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            {/* Page Header */}
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
              {/* Table */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                {/* Container */}
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
                                Create I-9 Order
                              </div>
                              {/* Badge */}
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px 2px 6px",
                                  alignItems: "center",
                                  gap: "2px",
                                  borderRadius: "9999px",
                                  border: "1px solid #FEDF89",
                                  background: "#FFFAEB",
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
                                    d="M7.99967 5.33334V8.00001M7.99967 10.6667H8.00634M14.6663 8.00001C14.6663 11.6819 11.6816 14.6667 7.99967 14.6667C4.31778 14.6667 1.33301 11.6819 1.33301 8.00001C1.33301 4.31811 4.31778 1.33334 7.99967 1.33334C11.6816 1.33334 14.6663 4.31811 14.6663 8.00001Z"
                                    stroke="#F79009"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <div
                                  style={{
                                    color: "#B54708",
                                    textAlign: "center",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                  }}
                                >
                                  We found an I-9 that already exists for this SSN
                                </div>
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
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    }}
                  >
                    {/* Content */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Title */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "24px",
                          }}
                        >
                          Already exist a I-9 Order for [Last Name], [First Name]
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          You are only allowed to have one active I-9 per individual.
                        </div>
                      </div>

                      {/* Question Text */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          gap: "10px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Select one of the options to continue with your request.
                        </div>

                        {/* Update SSN Section */}
                        <div
                          style={{
                            display: "flex",
                            padding: "12px 8px",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            background: "#FAFAFA",
                          }}
                        >
                          <div
                            style={{
                              color: "#414651",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            Update SSN
                          </div>
                          <div
                            style={{
                              color: "#535862",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Oops! I type in the SSN Wrong, take me back to the I-9 Form for correction
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleUpdateSSN}
                          >
                            Update SSN
                          </Button>
                        </div>

                        {/* Continue and Replace Section */}
                        <div
                          style={{
                            display: "flex",
                            padding: "12px 8px",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            background: "#FAFAFA",
                          }}
                        >
                          <div
                            style={{
                              color: "#414651",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            Continue, and replace existing I-9
                          </div>
                          <div
                            style={{
                              color: "#535862",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Yes I know, This a correction I-9. I am aware a E-verify order has alread been made for an existing I-9 , and a new one will not be created.
                          </div>
                          <div
                            style={{
                              color: "#535862",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Replace the existing I-9 for [Last Name], [First Name]
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleUpdateI9Form}
                          >
                            Update I-9 Form
                          </Button>
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

                      {/* For Admin Label */}
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                        }}
                      >
                        For Admin
                      </div>

                      {/* Admin Section */}
                      <div
                        style={{
                          display: "flex",
                          padding: "16px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FAFAFA",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          You're seeing this section because your account is on I-9 Demo Account. Regular I-9 Accounts would not see this section
                        </div>
                        <div
                          style={{
                            alignSelf: "stretch",
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          If you want to go ahead and complete this i-9 as this weren't actually duplicated click continue, to proceed with the order and create another I-9 Order for this SSN.
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCreateI9OrderAnyway}
                        >
                          Create I-9 Order Anyway
                        </Button>
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

export default I9OrderSubmission;
