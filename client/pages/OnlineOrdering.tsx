import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";

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
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [packageCheckboxes, setPackageCheckboxes] = useState<Record<string, boolean>>({});
  const [packageQuantities, setPackageQuantities] = useState<Record<string, number>>({});

  const packageLabelMap: Record<string, string> = {
    "csd-standard": "CSD Standard",
    "portal": "Portal",
  };

  // Initialize checkboxes and quantities when CSD Standard is selected
  useEffect(() => {
    if (selectedPackage === "csd-standard") {
      setPackageCheckboxes({
        "social-security-trace": false,
        "employment": false,
        "education": true, // pre-checked in figma
        "professional-references": false,
        "credentials-professional-license": true, // pre-checked in figma
        "mjd": true, // pre-checked and disabled
        "data-collection": false,
        "dot-drug-test": true, // pre-checked and disabled
        "county-criminal-history": false,
        "motor-vehicle-driving": false,
        "court-criminal-monitoring": true, // pre-checked and disabled
      });
      setPackageQuantities({
        "employment": 1,
        "education": 1,
        "professional-references": 1,
        "credentials-professional-license": 1,
      });
    }
  }, [selectedPackage]);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setPackageCheckboxes(prev => ({ ...prev, [key]: checked }));
  };

  const handleQuantityChange = (key: string, quantity: number) => {
    setPackageQuantities(prev => ({ ...prev, [key]: quantity }));
  };

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
                  overflow: "hidden",
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
                          color: selectedPackage ? "#181D27" : "#717680",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        {selectedPackage ? (packageLabelMap[selectedPackage] ?? selectedPackage) : "—"}
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

                  {/* Service Categories - only show if CSD Standard is selected */}
                  {selectedPackage === "csd-standard" && (
                    <>
                      {/* Service Categories Container */}
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
                        {/* Background */}
                        <div
                          style={{
                            display: packageCheckboxes["social-security-trace"] ? "flex" : "none",
                            width: isDesktop ? "350px" : "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "200px",
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
                            Background
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
                            Social Security Trace
                          </div>
                        </div>

                        {/* Database Services */}
                        <div
                          style={{
                            display: packageCheckboxes["mjd"] ? "flex" : "none",
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
                            Database Services
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
                            MJD
                          </div>
                        </div>

                        {/* Additional Services */}
                        <div
                          style={{
                            display: (packageCheckboxes["motor-vehicle-driving"] || packageCheckboxes["court-criminal-monitoring"]) ? "flex" : "none",
                            width: isDesktop ? "400px" : "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "300px",
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
                            Additional Services
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
                            {[
                              packageCheckboxes["motor-vehicle-driving"] ? "MVR History" : null,
                              packageCheckboxes["court-criminal-monitoring"] ? "Court Criminal Monitoring" : null,
                            ].filter(Boolean).join(", ")}
                          </div>
                        </div>
                      </div>

                      {/* Second row of service categories */}
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
                        {/* Public Records */}
                        <div
                          style={{
                            display: packageCheckboxes["county-criminal-history"] ? "flex" : "none",
                            width: isDesktop ? "400px" : "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "300px",
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
                            Public Records
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
                            County/Statewide Criminal History 7yr
                          </div>
                        </div>

                        {/* Other Products */}
                        <div
                          style={{
                            display: (packageCheckboxes["data-collection"] || packageCheckboxes["dot-drug-test"]) ? "flex" : "none",
                            width: isDesktop ? "400px" : "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "300px",
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
                            Other Products
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
                            {[
                              packageCheckboxes["data-collection"] ? "Data Collection" : null,
                              packageCheckboxes["dot-drug-test"] ? "DOT Drug Test and Physical" : null,
                            ].filter(Boolean).join(", ")}
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
                    </>
                  )}

                  {/* Status Tabs - show Package and Subject always, other tabs only if checked */}
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
                    {/* Package Tab - always show */}
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

                    {/* Subject Tab - always show */}
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
                        Subject
                      </div>
                    </div>

                    {/* Employment Tab - only show if checked */}
                    {packageCheckboxes["employment"] && (
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
                          Employment
                        </div>
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
                          <div
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            {packageQuantities["employment"] || 1}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Education Tab - only show if checked */}
                    {packageCheckboxes["education"] && (
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
                          Education
                        </div>
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
                          <div
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            {packageQuantities["education"] || 1}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Professional References Tab - only show if checked */}
                    {packageCheckboxes["professional-references"] && (
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
                          Professional References
                        </div>
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
                          <div
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            {packageQuantities["professional-references"] || 1}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Credentials-Professional License Tab - only show if checked */}
                    {packageCheckboxes["credentials-professional-license"] && (
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
                          Credentials-Professional License
                        </div>
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
                          <div
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            {packageQuantities["credentials-professional-license"] || 1}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MVR History Tab - only show if checked */}
                    {packageCheckboxes["motor-vehicle-driving"] && (
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
                          MVR History
                        </div>
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
                          <div
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            {packageQuantities["motor-vehicle-driving"] || 1}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Authorization Tab - always show */}
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
                        Authorization
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package and Products Container */}
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
                  overflow: "hidden",
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
                              Package and Products
                            </div>
                          </div>
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
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
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
                              d="M4 6L8 10L12 6"
                              stroke="#A4A7AE"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
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
                  {/* Section Title */}
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
                    Package and Products
                  </div>

                  {/* Select Component */}
                  <div
                    style={{
                      display: "flex",
                      width: isDesktop ? "470px" : "100%",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "6px",
                      maxWidth: "100%",
                    }}
                  >
                    {/* Input with label */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Label wrapper */}
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
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Choose Package
                        </div>
                      </div>

                      {/* Select Component */}
                      <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                        <SelectTrigger
                          style={{
                            display: "flex",
                            padding: "8px 12px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                            color: "#181D27",
                            height: "auto",
                          }}
                        >
                          <SelectValue placeholder="Select Package" />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            maxHeight: "256px",
                            padding: "4px 0",
                            borderRadius: "8px",
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            background: "#FFF",
                            boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                            zIndex: 50,
                          }}
                        >
                          <SelectItem
                            value="csd-standard"
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  CSD Standard
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="volunteer-application"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Volunteer Application
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="a-la-carte"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  A La Carte
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="retail"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Retail
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="mvr"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  MVR
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="sales"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Sales
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="executive"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Executive
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="operations"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Operations
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="hourly"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Hourly
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="cbsv"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  CBSV
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="dot"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  DOT
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="new-york"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  New York
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="immunization-records"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Immunization Records
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="just-mvr"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Just MVR
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="hasc-contractor"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  HASC Contractor
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="applicant-provided-address-only"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Applicant provided address only
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="employment-only"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Employment Only
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="sap-10"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  SAP 10
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="identity-check-package"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Identity Check Package
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="identity-check-test-package-includes-product"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Identity Check Test Package Includes Product
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="standard-with-edu-and-emp"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Standard with EDU and EMP
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="test"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Test
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="executive-plus"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Executive Plus
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="portal"
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Portal
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Hint text */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-sm, 14px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Line-height-text-sm, 20px)",
                      }}
                    >
                      Pre-checked items are your most commonly ordered services. Any
                      additional items you order will be added to your bill.
                    </div>
                  </div>

                  {/* Conditional CSD Standard Content */}
                  {selectedPackage === "csd-standard" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        flexWrap: "wrap",
                        gap: "20px",
                      }}
                    >
                      {/* Left Column */}
                      <div
                        style={{
                          display: "flex",
                          width: isDesktop ? "324px" : "100%",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          minWidth: isDesktop ? "300px" : "100%",
                        }}
                      >
                        {/* Background Section */}
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
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Background
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
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
                                checked={packageCheckboxes["social-security-trace"] || false}
                                onCheckedChange={(checked) => handleCheckboxChange("social-security-trace", !!checked)}
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Social Security Trace
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help">
                                        <rect width="16" height="16" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Verification Services Section */}
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
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Verification Services
                          </div>

                          {/* Employment */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
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
                                  checked={packageCheckboxes["employment"] || false}
                                  onCheckedChange={(checked) => handleCheckboxChange("employment", !!checked)}
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "4px",
                                    border: "1px solid #D5D7DA",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Employment
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help2)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help2">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Select
                              value={packageQuantities["employment"]?.toString() || "1"}
                              onValueChange={(value) => handleQuantityChange("employment", parseInt(value))}
                              disabled={!packageCheckboxes["employment"]}
                            >
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  width: "55px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: packageCheckboxes["employment"] ? "#FFF" : "#FAFAFA",
                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontSize: "14px",
                                  color: "#717680",
                                  cursor: packageCheckboxes["employment"] ? "pointer" : "not-allowed",
                                  opacity: packageCheckboxes["employment"] ? 1 : 0.6,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              {packageCheckboxes["employment"] && (
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              )}
                            </Select>
                          </div>

                          {/* Education */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
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
                                  checked={packageCheckboxes["education"] || false}
                                  onCheckedChange={(checked) => handleCheckboxChange("education", !!checked)}
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "4px",
                                    border: "1px solid #D5D7DA",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Education
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help3)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help3">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Select
                              value={packageQuantities["education"]?.toString() || "1"}
                              onValueChange={(value) => handleQuantityChange("education", parseInt(value))}
                              disabled={!packageCheckboxes["education"]}
                            >
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  width: "55px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: packageCheckboxes["education"] ? "#FFF" : "#FAFAFA",
                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontSize: "14px",
                                  color: "#717680",
                                  cursor: packageCheckboxes["education"] ? "pointer" : "not-allowed",
                                  opacity: packageCheckboxes["education"] ? 1 : 0.6,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              {packageCheckboxes["education"] && (
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              )}
                            </Select>
                          </div>

                          {/* Professional References */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
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
                                  checked={packageCheckboxes["professional-references"] || false}
                                  onCheckedChange={(checked) => handleCheckboxChange("professional-references", !!checked)}
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "4px",
                                    border: "1px solid #D5D7DA",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Professional References
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help4)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help4">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Select
                              value={packageQuantities["professional-references"]?.toString() || "1"}
                              onValueChange={(value) => handleQuantityChange("professional-references", parseInt(value))}
                              disabled={!packageCheckboxes["professional-references"]}
                            >
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  width: "55px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: packageCheckboxes["professional-references"] ? "#FFF" : "#FAFAFA",
                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontSize: "14px",
                                  color: "#717680",
                                  cursor: packageCheckboxes["professional-references"] ? "pointer" : "not-allowed",
                                  opacity: packageCheckboxes["professional-references"] ? 1 : 0.6,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              {packageCheckboxes["professional-references"] && (
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              )}
                            </Select>
                          </div>

                          {/* Credentials-Professional License */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
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
                                  checked={packageCheckboxes["credentials-professional-license"] || false}
                                  onCheckedChange={(checked) => handleCheckboxChange("credentials-professional-license", !!checked)}
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "4px",
                                    border: "1px solid #D5D7DA",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Credentials-Professional License
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help5)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help5">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Select
                              value={packageQuantities["credentials-professional-license"]?.toString() || "1"}
                              onValueChange={(value) => handleQuantityChange("credentials-professional-license", parseInt(value))}
                              disabled={!packageCheckboxes["credentials-professional-license"]}
                            >
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  width: "55px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: packageCheckboxes["credentials-professional-license"] ? "#FFF" : "#FAFAFA",
                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontSize: "14px",
                                  color: "#717680",
                                  cursor: packageCheckboxes["credentials-professional-license"] ? "pointer" : "not-allowed",
                                  opacity: packageCheckboxes["credentials-professional-license"] ? 1 : 0.6,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              {packageCheckboxes["credentials-professional-license"] && (
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              )}
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Middle Column */}
                      <div
                        style={{
                          display: "flex",
                          width: isDesktop ? "324px" : "100%",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "13px",
                          minWidth: isDesktop ? "300px" : "100%",
                        }}
                      >
                        {/* Data Base Services Section */}
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
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Data Base Services
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
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
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                  background: "#F5F5F5",
                                }}
                              >
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3332 4L5.99984 11.3333L2.6665 8"
                                    stroke="#D5D7DA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  MJD
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help6)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help6">
                                        <rect width="16" height="16" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Other Products Section */}
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
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Other Products
                          </div>

                          {/* Data Collection */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
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
                                checked={packageCheckboxes["data-collection"] || false}
                                onCheckedChange={(checked) => handleCheckboxChange("data-collection", !!checked)}
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Data Collection
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help7)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help7">
                                        <rect width="16" height="16" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* DOT Drug Test and Physical */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
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
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                  background: "#F5F5F5",
                                }}
                              >
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3332 4L5.99984 11.3333L2.6665 8"
                                    stroke="#D5D7DA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  DOT Drug Test and Physical
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help8)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help8">
                                        <rect width="16" height="16" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div
                        style={{
                          display: "flex",
                          width: isDesktop ? "324px" : "100%",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          minWidth: isDesktop ? "300px" : "100%",
                        }}
                      >
                        {/* Public Records Section */}
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
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Public Records
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
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
                                checked={packageCheckboxes["county-criminal-history"] || false}
                                onCheckedChange={(checked) => handleCheckboxChange("county-criminal-history", !!checked)}
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  County/Statewide Criminal History 7yr
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help9)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help9">
                                        <rect width="16" height="16" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Services Section */}
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
                              alignSelf: "stretch",
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Additional Services
                          </div>

                          {/* Motor Vehicle Driving History */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
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
                                checked={packageCheckboxes["motor-vehicle-driving"] || false}
                                onCheckedChange={(checked) => handleCheckboxChange("motor-vehicle-driving", !!checked)}
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Motor Vehicle Driving History
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help10)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help10">
                                        <rect width="16" height="16" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Court Criminal Monitoring */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
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
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                  background: "#F5F5F5",
                                }}
                              >
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3332 4L5.99984 11.3333L2.6665 8"
                                    stroke="#D5D7DA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Court Criminal Monitoring
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help11)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help11">
                                        <rect width="16" height="16" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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

                  {/* Requester */}
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
                        color: "#181D27",
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-md, 16px)",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "var(--Line-height-text-md, 24px)",
                      }}
                    >
                      Requester
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        flexWrap: isDesktop ? "nowrap" : "wrap",
                      }}
                    >
                      {/* Requester Select */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          minWidth: isDesktop ? "auto" : "100%",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Requester
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 12px",
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
                              flex: "1 0 0",
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
                              d="M6 9L12 15L18 9"
                              stroke="#A4A7AE"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Fax Input */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          minWidth: isDesktop ? "auto" : "100%",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Fax
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 12px",
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
                              flex: "1 0 0",
                              color: "#717680",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            000-0000
                          </div>
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          minWidth: isDesktop ? "auto" : "100%",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Phone
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 12px",
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
                              flex: "1 0 0",
                              color: "#717680",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            (000) 000 - 0000
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider (old, hidden) */}
              <div
                style={{
                  display: "none",
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

              {/* Requester Section (old, hidden) */}
              <div
                style={{
                  display: "none",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  overflow: "hidden",
                }}
              >
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
                  {/* Section Title */}
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
                    Requester
                  </div>

                  {/* Input Fields Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                      flexWrap: isDesktop ? "nowrap" : "wrap",
                    }}
                  >
                    {/* Requester Select */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        flex: "1 0 0",
                        minWidth: isDesktop ? "auto" : "100%",
                      }}
                    >
                      {/* Label */}
                      <div
                        style={{
                          color: "#414651",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Requester
                      </div>
                      {/* Select Input */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 12px",
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
                            flex: "1 0 0",
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
                            d="M6 9L12 15L18 9"
                            stroke="#A4A7AE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Fax Input */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        flex: "1 0 0",
                        minWidth: isDesktop ? "auto" : "100%",
                      }}
                    >
                      {/* Label */}
                      <div
                        style={{
                          color: "#414651",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Fax
                      </div>
                      {/* Input */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 12px",
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
                            flex: "1 0 0",
                            color: "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          000-0000
                        </div>
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        flex: "1 0 0",
                        minWidth: isDesktop ? "auto" : "100%",
                      }}
                    >
                      {/* Label */}
                      <div
                        style={{
                          color: "#414651",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Phone
                      </div>
                      {/* Input */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 12px",
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
                            flex: "1 0 0",
                            color: "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          (000) 000 - 0000
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

export default OnlineOrdering;
