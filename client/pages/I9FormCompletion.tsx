import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";

const I9FormCompletion: React.FC = () => {
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
    }, 30000); // 30 seconds

    // Cleanup timer on component unmount
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
        currentPage="i9-form-completion"
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
              {/* Breadcrumbs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    borderRadius: "0px",
                  }}
                >
                  <svg
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
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
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
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
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Tools
                  </div>
                </div>
                <svg
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
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
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    I-9 Order
                  </div>
                </div>
                <svg
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
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
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    I-9 Form
                  </div>
                </div>
              </div>

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
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: isDesktop ? "24px" : "20px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: isDesktop ? "32px" : "30px",
                      }}
                    >
                      Employment Eligibility Verification
                    </div>
                    {/* Supporting text */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily: "'Public Sans'",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Read instructions carefully before completing this form. The instructions must be available, either in paper or electronically, 
                      during completion of this form. Employers are liable for errors in the completion of this form.
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
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                            fontFamily: "'Public Sans'",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
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

          {/* Section */}
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
              {/* Form Container */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "24px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
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
                      gap: "20px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Form Header */}
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
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "'Roboto Mono'",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          USCIS
                        </div>
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "'Roboto Mono'",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Form I-9OMB
                        </div>
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "'Roboto Mono'",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          OMB No. 1615-0047
                        </div>
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "'Roboto Mono'",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Expires 05/31/2027
                        </div>
                      </div>
                      
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "'Public Sans'",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "24px",
                          }}
                        >
                          Department of Homeland Security
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "'Public Sans'",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "24px",
                          }}
                        >
                          U.S. Citizenship and Immigration Services
                        </div>
                      </div>
                    </div>

                    {/* Content divider */}
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
                          height: "1px",
                          flex: "1 0 0",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Links */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            color: "#273572",
                            fontFamily: "'Public Sans'",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            textDecoration: "underline",
                          }}
                        >
                          Click here for English Instructions
                        </div>
                      </button>
                      
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            color: "#273572",
                            fontFamily: "'Public Sans'",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            textDecoration: "underline",
                          }}
                        >
                          Haga clic aquí para instrucciones Español
                        </div>
                      </button>
                      
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            color: "#273572",
                            fontFamily: "'Public Sans'",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            textDecoration: "underline",
                          }}
                        >
                          Click here for the USCIS Handbook for Employers
                        </div>
                      </button>
                    </div>

                    {/* Notice */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#414651",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      ANTI-DISCRIMINATION NOTICE: It is illegal to discriminate against work-authorized individuals. Employers CANNOT specify which document(s) an employee 
                      may present to establish employment authorization and identity. The refusal to hire or continue to employ an individual because the documentation 
                      presented has a future expiration date may also constitute illegal discrimination.
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

export default I9FormCompletion;
