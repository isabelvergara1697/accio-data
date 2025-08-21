import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Checkbox } from "../components/ui/checkbox";

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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form state for Section 1
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleInitial: "",
    middleNotApplicable: false,
    otherLastNames: "",
    address: "",
    aptNumber: "",
    aptNotApplicable: false,
    cityOrTown: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    socialSecurityNumber: "",
    emailAddress: "",
    telephoneNumber: "",
    telephoneNotApplicable: false,
    citizenshipStatus: "",
    preparerOption: ""
  });

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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBreadcrumbNavigation = (target: string) => {
    switch (target) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "i9-order":
        navigate("/i9-order");
        break;
      default:
        break;
    }
  };

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
              {/* Active Breadcrumbs */}
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
                    cursor: "pointer",
                  }}
                  onClick={() => handleBreadcrumbNavigation("dashboard")}
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
                      stroke="#344698"
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
                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
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
                    cursor: "pointer",
                  }}
                  onClick={() => handleBreadcrumbNavigation("i9-order")}
                >
                  <div
                    style={{
                      color: "#344698",
                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
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
                      color: "var(--colors-text-text-brand-secondary-700, #273572)",
                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
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
                        color: "var(--colors-text-text-primary-900, #181D27)",
                        fontFamily: "var(--Font-family-font-family-display, 'Public Sans')",
                        fontSize: "var(--Font-size-display-xs, 24px)",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "var(--Line-height-display-xs, 32px)",
                      }}
                    >
                      Employment Eligibility Verification
                    </div>
                    {/* Supporting text */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "var(--colors-text-text-tertiary-600, #535862)",
                        fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-md, 16px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Line-height-text-md, 24px)",
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
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
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
              {/* Form Containers */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                {/* First Container - Form Header */}
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
                            fontFamily: "var(--Font-family-font-family-secondary, 'Roboto Mono')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          USCIS
                        </div>
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-secondary, 'Roboto Mono')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Form I-9
                        </div>
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-secondary, 'Roboto Mono')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          OMB No. 1615-0047
                        </div>
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-secondary, 'Roboto Mono')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
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
                            color: "var(--colors-text-text-primary-900, #181D27)",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          Department of Homeland Security
                        </div>
                        <div
                          style={{
                            color: "var(--colors-text-text-primary-900, #181D27)",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-md, 24px)",
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
                            color: "var(--colors-text-text-brand-secondary-700, #273572)",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
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
                            color: "var(--colors-text-text-brand-secondary-700, #273572)",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
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
                            color: "var(--colors-text-text-brand-secondary-700, #273572)",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
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
                        color: "var(--colors-text-text-secondary-700, #414651)",
                        fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-sm, 14px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Line-height-text-sm, 20px)",
                      }}
                    >
                      ANTI-DISCRIMINATION NOTICE: It is illegal to discriminate against work-authorized individuals. Employers CANNOT specify which document(s) an employee 
                      may present to establish employment authorization and identity. The refusal to hire or continue to employ an individual because the documentation 
                      presented has a future expiration date may also constitute illegal discrimination.
                    </div>
                  </div>
                </div>

                {/* Second Container - Section 1 Form */}
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
                  {/* Section 1. Employee Information and Attestation */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "24px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Section label */}
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
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <div
                          style={{
                            color: "var(--colors-text-text-secondary-700, #414651)",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          Section 1. Employee Information and Attestation
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
                            <g clipPath="url(#clip0_6183_45216)">
                              <path
                                d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_6183_45216">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "var(--colors-text-text-tertiary-600, #535862)",
                          fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        (Employees must complete and sign Section 1 of Form I-9 no later than the first day of employment, but not before accepting a job offer.)
                      </div>
                    </div>

                    {/* First Row - Name Fields */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Last Name */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: isMobile ? "1 0 0" : "1 1 200px",
                          minWidth: "150px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <label
                            style={{
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Last Name (Family Name)
                          </label>
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
                              <g clipPath="url(#clip0_6183_45224)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_6183_45224">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: focusedField === "lastName" ? "2px solid #34479A" : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            onFocus={() => setFocusedField("lastName")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>

                      {/* First Name */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: isMobile ? "1 0 0" : "1 1 200px",
                          minWidth: "150px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <label
                            style={{
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            First Name (Given Name)
                          </label>
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
                                d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: focusedField === "firstName" ? "2px solid #34479A" : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            onFocus={() => setFocusedField("firstName")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Middle Initial */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "4px",
                          width: "174px",
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
                            <label
                              style={{
                                color: "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Middle Initial
                            </label>
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
                                  d="M6.39366 5.99992C6.5504 5.55436 6.85976 5.17866 7.26696 4.93934C7.67416 4.70002 8.15292 4.61254 8.61844 4.69239C9.08396 4.77224 9.5062 5.01427 9.81038 5.3756C10.1146 5.73694 10.281 6.19427 10.2803 6.66659C10.2803 7.99992 8.28033 8.66659 8.28033 8.66659M8.33366 11.3333H8.34033M15.0003 7.99992C15.0003 11.6818 12.0156 14.6666 8.33366 14.6666C4.65176 14.6666 1.66699 11.6818 1.66699 7.99992C1.66699 4.31802 4.65176 1.33325 8.33366 1.33325C12.0156 1.33325 15.0003 4.31802 15.0003 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "6px 8px",
                              alignItems: "center",
                              gap: "8px",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              border: focusedField === "middleInitial" && !formData.middleNotApplicable ? "2px solid #34479A" : "1px solid #D5D7DA",
                              background: formData.middleNotApplicable ? "#F5F5F5" : "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <input
                              type="text"
                              value={formData.middleInitial}
                              onChange={(e) => handleInputChange("middleInitial", e.target.value)}
                              onFocus={() => setFocusedField("middleInitial")}
                              onBlur={() => setFocusedField(null)}
                              maxLength={1}
                              disabled={formData.middleNotApplicable}
                              style={{
                                flex: "1 0 0",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
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
                            <Checkbox
                              checked={formData.middleNotApplicable}
                              onCheckedChange={(checked) => {
                                handleInputChange("middleNotApplicable", checked);
                                if (checked) {
                                  handleInputChange("middleInitial", "");
                                }
                              }}
                              style={{
                                backgroundColor: formData.middleNotApplicable ? "#344698" : "transparent",
                                borderColor: formData.middleNotApplicable ? "#344698" : "#D5D7DA",
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
                            <div
                              style={{
                                color: "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Check if not applicable
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Other Last Names */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: isMobile ? "1 0 0" : "1 1 200px",
                          minWidth: "150px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <label
                            style={{
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Other Last Names Used (if any)
                          </label>
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
                                d="M6.39366 5.99992C6.5504 5.55436 6.85976 5.17866 7.26696 4.93934C7.67416 4.70002 8.15292 4.61254 8.61844 4.69239C9.08396 4.77224 9.5062 5.01427 9.81038 5.3756C10.1146 5.73694 10.281 6.19427 10.2803 6.66659C10.2803 7.99992 8.28033 8.66659 8.28033 8.66659M8.33366 11.3333H8.34033M15.0003 7.99992C15.0003 11.6818 12.0156 14.6666 8.33366 14.6666C4.65176 14.6666 1.66699 11.6818 1.66699 7.99992C1.66699 4.31802 4.65176 1.33325 8.33366 1.33325C12.0156 1.33325 15.0003 4.31802 15.0003 7.99992Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: focusedField === "otherLastNames" ? "2px solid #34479A" : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.otherLastNames}
                            onChange={(e) => handleInputChange("otherLastNames", e.target.value)}
                            onFocus={() => setFocusedField("otherLastNames")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Row - Requester container */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Address (Street Number and Name) */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          width: "300px",
                          minWidth: "300px",
                          maxWidth: "300px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <label
                            style={{
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Address (Street Number and Name)
                          </label>
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
                              <g clipPath="url(#clip0_6183_45474)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_6183_45474">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: focusedField === "address" ? "2px solid #34479A" : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            onFocus={() => setFocusedField("address")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Apt Number with Checkbox */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "4px",
                          width: "100px",
                          minWidth: "100px",
                          maxWidth: "100px",
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
                            <label
                              style={{
                                color: "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Apt Number
                            </label>
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
                                <g clipPath="url(#clip0_6187_5434)">
                                  <path
                                    d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_6187_5434">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "6px 8px",
                              alignItems: "center",
                              gap: "8px",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              border: focusedField === "aptNumber" && !formData.aptNotApplicable ? "2px solid #34479A" : "1px solid #D5D7DA",
                              background: formData.aptNotApplicable ? "#F5F5F5" : "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <input
                              type="text"
                              value={formData.aptNumber}
                              onChange={(e) => handleInputChange("aptNumber", e.target.value)}
                              onFocus={() => setFocusedField("aptNumber")}
                              onBlur={() => setFocusedField(null)}
                              disabled={formData.aptNotApplicable}
                              style={{
                                flex: "1 0 0",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
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
                            <Checkbox
                              checked={formData.aptNotApplicable}
                              onCheckedChange={(checked) => {
                                handleInputChange("aptNotApplicable", checked);
                                if (checked) {
                                  handleInputChange("aptNumber", "");
                                }
                              }}
                              style={{
                                backgroundColor: formData.aptNotApplicable ? "#344698" : "transparent",
                                borderColor: formData.aptNotApplicable ? "#344698" : "#D5D7DA",
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
                            <div
                              style={{
                                color: "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Check if not applicable
                            </div>
                        </div>
                      </div>

                      {/* City or Town */}
                      <div
                        style={{
                          display: "flex",
                          width: "110px",
                          minWidth: "110px",
                          maxWidth: "110px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <label
                            style={{
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            City or Town
                          </label>
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
                              <g clipPath="url(#clip0_6187_5592)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_6187_5592">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: focusedField === "cityOrTown" ? "2px solid #34479A" : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.cityOrTown}
                            onChange={(e) => handleInputChange("cityOrTown", e.target.value)}
                            onFocus={() => setFocusedField("cityOrTown")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
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

export default I9FormCompletion;
