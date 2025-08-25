import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Checkbox } from "../components/ui/checkbox";
import { CustomRadio, CustomRadioGroup } from "../components/ui/custom-radio";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const I9FormCompletion = () => {
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
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);

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
    preparerOption: "",
    attestation: false,
    citizenshipAttestation: "alien_authorized",
    alienRegistrationNumber: "",
    typeOfRegistrationNumber: "",
    // Alien authorized to work fields
    expirationDate: "",
    workAuthorizationType: "foreign_passport", // i94, alien_reg, foreign_passport
    i94AdmissionNumber: "",
    foreignPassportNumber: "",
    countryOfIssuance: "",
    // Signature fields
    signature: "",
    signatureDate: new Date().toLocaleDateString("en-US"), // US format MM/DD/YYYY
    // Section 2 fields
    documentType: "",
    verificationMethod: "",
    // List A fields
    listASelectedDocument: "",
    listAIssuingAuthority: "",
    listAPassportNumber: "",
    listACardNumber: "",
    listAAlienNumber: "",
    listAI94Number: "",
    listAVisaNumber: "",
    listAExpirationDate: "",
    listACountryOfIssuance: "",
    // Document Two fields for Foreign Passport I-94
    listADocumentTwoType: "",
    listADocumentTwoIssuingAuthority: "",
    listADocumentTwoNumber: "",
    listADocumentTwoExpirationDate: "",
    // Document Three fields for Foreign Passport I-94
    listADocumentThreeType: "",
    listADocumentThreeIssuingAuthority: "",
    listADocumentThreeNumber: "",
    listADocumentThreeExpirationDate: "",
    // List B, C Document A fields
    listBCDocumentAType: "",
    listBCDocumentAIssuingAuthority: "",
    listBCDocumentANumber: "",
    listBCDocumentAExpirationDate: "",
    // List B, C Document B fields
    listBCDocumentBType: "",
    listBCDocumentBIssuingAuthority: "",
    listBCDocumentBNumber: "",
    listBCDocumentBExpirationDate: "",
    // Section 2 Additional Information
    additionalInformation: "",
  });

  // Signature canvas state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Close state dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stateDropdownOpen) {
        setStateDropdownOpen(false);
      }
    };

    if (stateDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [stateDropdownOpen]);

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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Signature drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    handleInputChange("signature", "");
  };

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas drawing properties
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

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
                      fontFamily:
                        "var(--Font-family-font-family-body, 'Public Sans')",
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
                      fontFamily:
                        "var(--Font-family-font-family-body, 'Public Sans')",
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
                      color:
                        "var(--colors-text-text-brand-secondary-700, #273572)",
                      fontFamily:
                        "var(--Font-family-font-family-body, 'Public Sans')",
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
                        fontFamily:
                          "var(--Font-family-font-family-display, 'Public Sans')",
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
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-md, 16px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Line-height-text-md, 24px)",
                      }}
                    >
                      Read instructions carefully before completing this form.
                      The instructions must be available, either in paper or
                      electronically, during completion of this form. Employers
                      are liable for errors in the completion of this form.
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
                            fontFamily:
                              "var(--Font-family-font-family-secondary, 'Roboto Mono')",
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
                            fontFamily:
                              "var(--Font-family-font-family-secondary, 'Roboto Mono')",
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
                            fontFamily:
                              "var(--Font-family-font-family-secondary, 'Roboto Mono')",
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
                            fontFamily:
                              "var(--Font-family-font-family-secondary, 'Roboto Mono')",
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
                            color:
                              "var(--colors-text-text-primary-900, #181D27)",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
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
                            color:
                              "var(--colors-text-text-primary-900, #181D27)",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
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
                            color:
                              "var(--colors-text-text-brand-secondary-700, #273572)",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
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
                            color:
                              "var(--colors-text-text-brand-secondary-700, #273572)",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
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
                            color:
                              "var(--colors-text-text-brand-secondary-700, #273572)",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
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
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-sm, 14px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Line-height-text-sm, 20px)",
                      }}
                    >
                      ANTI-DISCRIMINATION NOTICE: It is illegal to discriminate
                      against work-authorized individuals. Employers CANNOT
                      specify which document(s) an employee may present to
                      establish employment authorization and identity. The
                      refusal to hire or continue to employ an individual
                      because the documentation presented has a future
                      expiration date may also constitute illegal
                      discrimination.
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
                            color:
                              "var(--colors-text-text-secondary-700, #414651)",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
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
                          color:
                            "var(--colors-text-text-tertiary-600, #535862)",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        (Employees must complete and sign Section 1 of Form I-9
                        no later than the first day of employment, but not
                        before accepting a job offer.)
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                            border:
                              focusedField === "lastName"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            onFocus={() => setFocusedField("lastName")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                            border:
                              focusedField === "firstName"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            onFocus={() => setFocusedField("firstName")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                                color:
                                  "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
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
                              border:
                                focusedField === "middleInitial" &&
                                !formData.middleNotApplicable
                                  ? "2px solid #34479A"
                                  : "1px solid #D5D7DA",
                              background: formData.middleNotApplicable
                                ? "#F5F5F5"
                                : "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <input
                              type="text"
                              value={formData.middleInitial}
                              onChange={(e) =>
                                handleInputChange(
                                  "middleInitial",
                                  e.target.value,
                                )
                              }
                              onFocus={() => setFocusedField("middleInitial")}
                              onBlur={() => setFocusedField(null)}
                              maxLength={1}
                              disabled={formData.middleNotApplicable}
                              style={{
                                flex: "1 0 0",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
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
                                handleInputChange(
                                  "middleNotApplicable",
                                  checked,
                                );
                                if (checked) {
                                  handleInputChange("middleInitial", "");
                                }
                              }}
                              style={{
                                backgroundColor: formData.middleNotApplicable
                                  ? "#344698"
                                  : "transparent",
                                borderColor: formData.middleNotApplicable
                                  ? "#344698"
                                  : "#D5D7DA",
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
                                color:
                                  "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                            border:
                              focusedField === "otherLastNames"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.otherLastNames}
                            onChange={(e) =>
                              handleInputChange(
                                "otherLastNames",
                                e.target.value,
                              )
                            }
                            onFocus={() => setFocusedField("otherLastNames")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Second Row - Address Fields */}
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                            border:
                              focusedField === "address"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                            onFocus={() => setFocusedField("address")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                            border:
                              focusedField === "aptNumber" &&
                              !formData.aptNotApplicable
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: formData.aptNotApplicable
                              ? "#F5F5F5"
                              : "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.aptNumber}
                            onChange={(e) =>
                              handleInputChange("aptNumber", e.target.value)
                            }
                            onFocus={() => setFocusedField("aptNumber")}
                            onBlur={() => setFocusedField(null)}
                            disabled={formData.aptNotApplicable}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
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
                                backgroundColor: formData.aptNotApplicable
                                  ? "#344698"
                                  : "transparent",
                                borderColor: formData.aptNotApplicable
                                  ? "#344698"
                                  : "#D5D7DA",
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
                                color:
                                  "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
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

                      {/* City or Town */}
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
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
                            border:
                              focusedField === "cityOrTown"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.cityOrTown}
                            onChange={(e) =>
                              handleInputChange("cityOrTown", e.target.value)
                            }
                            onFocus={() => setFocusedField("cityOrTown")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>

                      {/* State Dropdown */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          width: "173px",
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            State
                          </label>
                          <div
                            style={{
                              color:
                                "var(--colors-text-text-brand-tertiary-600, #344698)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            *
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
                              <g clipPath="url(#clip0_state_help)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_state_help">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            position: "relative",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              height: "32px",
                              padding: "6px 8px",
                              alignItems: "center",
                              gap: "8px",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              border: stateDropdownOpen
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              setStateDropdownOpen(!stateDropdownOpen)
                            }
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 1,
                                  flex: "1 0 0",
                                  overflow: "hidden",
                                  color: formData.state
                                    ? "var(--colors-text-text-secondary-700, #414651)"
                                    : "var(--Colors-Text-text-placeholder, #717680)",
                                  textOverflow: "ellipsis",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                {formData.state || "Select"}
                              </div>
                            </div>
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                transform: stateDropdownOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.2s ease",
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
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          {stateDropdownOpen && (
                            <div
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                zIndex: 1000,
                                marginTop: "4px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 4px 8px 0 rgba(10, 13, 18, 0.1)",
                                maxHeight: "200px",
                                overflowY: "auto",
                              }}
                            >
                              {[
                                "Alabama",
                                "Alaska",
                                "Arizona",
                                "Arkansas",
                                "California",
                                "Colorado",
                                "Connecticut",
                                "Delaware",
                                "Florida",
                                "Georgia",
                                "Hawaii",
                                "Idaho",
                                "Illinois",
                                "Indiana",
                                "Iowa",
                                "Kansas",
                                "Kentucky",
                                "Louisiana",
                                "Maine",
                                "Maryland",
                                "Massachusetts",
                                "Michigan",
                                "Minnesota",
                                "Mississippi",
                                "Missouri",
                                "Montana",
                                "Nebraska",
                                "Nevada",
                                "New Hampshire",
                                "New Jersey",
                                "New Mexico",
                                "New York",
                                "North Carolina",
                                "North Dakota",
                                "Ohio",
                                "Oklahoma",
                                "Oregon",
                                "Pennsylvania",
                                "Rhode Island",
                                "South Carolina",
                                "South Dakota",
                                "Tennessee",
                                "Texas",
                                "Utah",
                                "Vermont",
                                "Virginia",
                                "Washington",
                                "West Virginia",
                                "Wisconsin",
                                "Wyoming",
                              ].map((state) => (
                                <div
                                  key={state}
                                  style={{
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    color:
                                      "var(--colors-text-text-secondary-700, #414651)",
                                    background:
                                      formData.state === state
                                        ? "#F3F4F6"
                                        : "transparent",
                                    transition: "background 0.2s ease",
                                  }}
                                  onClick={() => {
                                    handleInputChange("state", state);
                                    setStateDropdownOpen(false);
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "#F3F4F6";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      formData.state === state
                                        ? "#F3F4F6"
                                        : "transparent";
                                  }}
                                >
                                  {state}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Zip Code */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          width: "114px",
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Zip Code
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
                              <g clipPath="url(#clip0_zipcode_help)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_zipcode_help">
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
                            border:
                              focusedField === "zipCode"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) =>
                              handleInputChange("zipCode", e.target.value)
                            }
                            onFocus={() => setFocusedField("zipCode")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Third Row - Additional Information Fields */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Date of Birth */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          width: "188px",
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Date of Birth (mm/dd/yy)
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
                              <g clipPath="url(#clip0_dob_help)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_dob_help">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            height: "32px",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border:
                              focusedField === "dateOfBirth"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              padding: "2px 0",
                              alignItems: "center",
                              gap: "8px",
                              flex: "1 0 0",
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
                                d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <input
                              type="text"
                              placeholder="00/00/00"
                              value={formData.dateOfBirth}
                              onChange={(e) =>
                                handleInputChange("dateOfBirth", e.target.value)
                              }
                              onFocus={() => setFocusedField("dateOfBirth")}
                              onBlur={() => setFocusedField(null)}
                              style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                flex: "1 0 0",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                color: formData.dateOfBirth
                                  ? "var(--colors-text-text-secondary-700, #414651)"
                                  : "var(--Colors-Text-text-placeholder, #717680)",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* U.S. Social Security Number */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          width: "214px",
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            U.S. Social Security Number
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
                              <g clipPath="url(#clip0_ssn_help)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_ssn_help">
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
                            flex: "1 0 0",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border:
                              focusedField === "socialSecurityNumber"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.socialSecurityNumber}
                            onChange={(e) =>
                              handleInputChange(
                                "socialSecurityNumber",
                                e.target.value,
                              )
                            }
                            onFocus={() =>
                              setFocusedField("socialSecurityNumber")
                            }
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Email Address
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
                              <g clipPath="url(#clip0_email_help)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_email_help">
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
                            flex: "1 0 0",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border:
                              focusedField === "emailAddress"
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="email"
                            value={formData.emailAddress}
                            onChange={(e) =>
                              handleInputChange("emailAddress", e.target.value)
                            }
                            onFocus={() => setFocusedField("emailAddress")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Telephone Number with Checkbox */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "4px",
                          width: "177px",
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
                                color:
                                  "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Telephone Number
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
                                <g clipPath="url(#clip0_phone_help)">
                                  <path
                                    d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_phone_help">
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
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              border:
                                focusedField === "telephoneNumber" &&
                                !formData.telephoneNotApplicable
                                  ? "2px solid #34479A"
                                  : "1px solid #D5D7DA",
                              background: formData.telephoneNotApplicable
                                ? "#F5F5F5"
                                : "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <input
                              type="tel"
                              value={formData.telephoneNumber}
                              onChange={(e) =>
                                handleInputChange(
                                  "telephoneNumber",
                                  e.target.value,
                                )
                              }
                              onFocus={() => setFocusedField("telephoneNumber")}
                              onBlur={() => setFocusedField(null)}
                              disabled={formData.telephoneNotApplicable}
                              style={{
                                flex: "1 0 0",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
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
                              checked={formData.telephoneNotApplicable}
                              onCheckedChange={(checked) => {
                                handleInputChange(
                                  "telephoneNotApplicable",
                                  checked,
                                );
                                if (checked) {
                                  handleInputChange("telephoneNumber", "");
                                }
                              }}
                              style={{
                                backgroundColor: formData.telephoneNotApplicable
                                  ? "#344698"
                                  : "transparent",
                                borderColor: formData.telephoneNotApplicable
                                  ? "#344698"
                                  : "#D5D7DA",
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
                                color:
                                  "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
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

                    {/* Attestation Checkbox Section */}
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
                          checked={formData.attestation}
                          onCheckedChange={(checked) => {
                            handleInputChange("attestation", checked);
                          }}
                          style={{
                            backgroundColor: formData.attestation
                              ? "#344698"
                              : "transparent",
                            borderColor: formData.attestation
                              ? "#344698"
                              : "#D5D7DA",
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
                            color:
                              "var(--colors-text-text-secondary-700, #414651)",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          I attest, under penalty of perjury, that I am (check
                          one of the following boxes):
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

                    {/* Citizenship Attestation Section */}
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
                          color:
                            "var(--colors-text-text-secondary-700, #414651)",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                          alignSelf: "stretch",
                        }}
                      >
                        I attest, under penalty of perjury, that I am (check one
                        of the following):
                      </div>

                      <CustomRadioGroup
                        value={formData.citizenshipAttestation}
                        onValueChange={(value) =>
                          handleInputChange("citizenshipAttestation", value)
                        }
                        name="citizenshipAttestation"
                      >
                        <CustomRadio value="citizen">
                          A citizen of the United States
                        </CustomRadio>

                        <CustomRadio value="noncitizen">
                          A noncitizen national of the United States
                        </CustomRadio>

                        {/* Permanent Resident with conditional inline form */}
                        {formData.citizenshipAttestation ===
                        "permanent_resident" ? (
                          <div
                            style={{
                              display: "flex",
                              padding: "12px 8px",
                              alignItems: "flex-start",
                              gap: "20px",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              background: "#FAFAFA",
                            }}
                          >
                            <CustomRadio value="permanent_resident">
                              A lawful permanent resident
                            </CustomRadio>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "20px",
                                flex: "1 0 0",
                                flexWrap: "wrap",
                              }}
                            >
                              {/* Alien Registration Number Input */}
                              <div
                                style={{
                                  display: "flex",
                                  width: "450px",
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
                                      color:
                                        "var(--colors-text-text-secondary-700, #414651)",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize:
                                        "var(--Font-size-text-sm, 14px)",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight:
                                        "var(--Line-height-text-sm, 20px)",
                                    }}
                                  >
                                    Alien Registration Number/USCIS Number
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
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>

                                <Input
                                  value={formData.alienRegistrationNumber}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "alienRegistrationNumber",
                                      e.target.value,
                                    )
                                  }
                                  onFocus={() =>
                                    setFocusedField("alienRegistrationNumber")
                                  }
                                  onBlur={() => setFocusedField(null)}
                                  style={{
                                    height: "32px",
                                    padding: "6px 8px",
                                    borderRadius: "8px",
                                    border:
                                      focusedField === "alienRegistrationNumber"
                                        ? "2px solid #34479A"
                                        : "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                />
                              </div>

                              {/* Type of Registration Number Select */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 1 200px",
                                  minWidth: "200px",
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
                                      color:
                                        "var(--colors-text-text-secondary-700, #414651)",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize:
                                        "var(--Font-size-text-sm, 14px)",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight:
                                        "var(--Line-height-text-sm, 20px)",
                                    }}
                                  >
                                    Type of Registration Number
                                  </label>
                                  <div
                                    style={{
                                      color:
                                        "var(--colors-text-text-brand-tertiary-600, #344698)",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize:
                                        "var(--Font-size-text-sm, 14px)",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight:
                                        "var(--Line-height-text-sm, 20px)",
                                    }}
                                  >
                                    *
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
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>

                                <Select
                                  value={formData.typeOfRegistrationNumber}
                                  onValueChange={(value) =>
                                    handleInputChange(
                                      "typeOfRegistrationNumber",
                                      value,
                                    )
                                  }
                                >
                                  <SelectTrigger
                                    style={{
                                      height: "32px",
                                      padding: "6px 8px",
                                      borderRadius: "8px",
                                      border: "1px solid #D5D7DA",
                                      background: "#FFF",
                                      boxShadow:
                                        "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize:
                                        "var(--Font-size-text-sm, 14px)",
                                      lineHeight:
                                        "var(--Line-height-text-sm, 20px)",
                                    }}
                                  >
                                    <SelectValue
                                      placeholder="Select"
                                      style={{
                                        color: formData.typeOfRegistrationNumber
                                          ? "#414651"
                                          : "#717680",
                                      }}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="green_card">
                                      Green Card Number
                                    </SelectItem>
                                    <SelectItem value="uscis_number">
                                      USCIS Number
                                    </SelectItem>
                                    <SelectItem value="alien_number">
                                      Alien Registration Number
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <CustomRadio value="permanent_resident">
                            A lawful permanent resident
                          </CustomRadio>
                        )}

                        {/* Show alien authorized radio button when not selected */}
                        {formData.citizenshipAttestation !==
                          "alien_authorized" && (
                          <CustomRadio value="alien_authorized">
                            An alien authorized to work
                          </CustomRadio>
                        )}
                      </CustomRadioGroup>

                      {/* Conditional inline form for alien authorized to work */}
                      {formData.citizenshipAttestation ===
                        "alien_authorized" && (
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
                            marginTop: "8px",
                          }}
                        >
                          {/* Top section with radio button and expiration date */}
                          <div
                            style={{
                              display: "flex",
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
                              }}
                            >
                              <CustomRadio value="alien_authorized">
                                An alien authorized to work
                              </CustomRadio>
                              <div
                                style={{
                                  color:
                                    "var(--colors-text-text-tertiary-600, #535862)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                  marginLeft: "24px",
                                }}
                              >
                                See Instructions
                              </div>
                            </div>

                            {/* Expiration Date Input */}
                            <div
                              style={{
                                display: "flex",
                                width: "257px",
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
                                    color:
                                      "var(--colors-text-text-secondary-700, #414651)",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Until (Expiration Date, if applicable)
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
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help_icon_exp)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help_icon_exp">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                    d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <input
                                  type="text"
                                  placeholder="00/00/00"
                                  value={formData.expirationDate}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "expirationDate",
                                      e.target.value,
                                    )
                                  }
                                  style={{
                                    flex: "1 0 0",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    color: formData.expirationDate
                                      ? "#414651"
                                      : "#717680",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  color:
                                    "var(--colors-text-text-tertiary-600, #535862)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Some noncitizens may write N/A in this field
                              </div>
                            </div>
                          </div>

                          {/* Divider */}
                          <div
                            style={{
                              height: "1px",
                              alignSelf: "stretch",
                              background: "#E9EAEB",
                            }}
                          />

                          {/* Work authorization document type section */}
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
                                color:
                                  "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              For aliens authorized to work, provide your
                            </div>

                            {/* Work authorization type radio buttons */}
                            <CustomRadioGroup
                              value={formData.workAuthorizationType}
                              onValueChange={(value) =>
                                handleInputChange(
                                  "workAuthorizationType",
                                  value,
                                )
                              }
                              name="workAuthorizationType"
                            >
                              <CustomRadio value="i94">
                                Form I-94 Admission Number
                              </CustomRadio>

                              <CustomRadio value="alien_reg">
                                Alien Registration Number/USCIS Number
                              </CustomRadio>

                              <CustomRadio value="foreign_passport">
                                Foreign Passport
                              </CustomRadio>
                            </CustomRadioGroup>

                            {/* Conditional fields based on work authorization type */}
                            {formData.workAuthorizationType ===
                              "foreign_passport" && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "20px",
                                  alignSelf: "stretch",
                                  paddingLeft: "24px", // Align with radio button content
                                }}
                              >
                                {/* Foreign Passport Number Input */}
                                <div
                                  style={{
                                    display: "flex",
                                    width: "268px",
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
                                        color:
                                          "var(--colors-text-text-secondary-700, #414651)",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize:
                                          "var(--Font-size-text-sm, 14px)",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight:
                                          "var(--Line-height-text-sm, 20px)",
                                      }}
                                    >
                                      Foreign Passport Number
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
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clipPath="url(#clip0_help_icon_passport)">
                                          <path
                                            d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.33333"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_help_icon_passport">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    value={formData.foreignPassportNumber}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "foreignPassportNumber",
                                        e.target.value,
                                      )
                                    }
                                    style={{
                                      height: "32px",
                                      padding: "6px 8px",
                                      borderRadius: "8px",
                                      border: "1px solid #D5D7DA",
                                      background: "#FFF",
                                      boxShadow:
                                        "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize:
                                        "var(--Font-size-text-sm, 14px)",
                                      lineHeight:
                                        "var(--Line-height-text-sm, 20px)",
                                    }}
                                  />
                                </div>

                                {/* Country of Issuance Select */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "6px",
                                    flex: "1 1 200px",
                                    minWidth: "200px",
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
                                        color:
                                          "var(--colors-text-text-secondary-700, #414651)",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize:
                                          "var(--Font-size-text-sm, 14px)",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight:
                                          "var(--Line-height-text-sm, 20px)",
                                      }}
                                    >
                                      Country of Issuance
                                    </label>
                                    <div
                                      style={{
                                        color:
                                          "var(--colors-text-text-brand-tertiary-600, #344698)",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize:
                                          "var(--Font-size-text-sm, 14px)",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight:
                                          "var(--Line-height-text-sm, 20px)",
                                      }}
                                    >
                                      *
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
                                      >
                                        <g clipPath="url(#clip0_help_icon_country)">
                                          <path
                                            d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.33333"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_help_icon_country">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                  </div>
                                  <Select
                                    value={formData.countryOfIssuance}
                                    onValueChange={(value) =>
                                      handleInputChange(
                                        "countryOfIssuance",
                                        value,
                                      )
                                    }
                                  >
                                    <SelectTrigger
                                      style={{
                                        height: "32px",
                                        padding: "6px 8px",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "#FFF",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize:
                                          "var(--Font-size-text-sm, 14px)",
                                        lineHeight:
                                          "var(--Line-height-text-sm, 20px)",
                                      }}
                                    >
                                      <SelectValue
                                        placeholder="Select"
                                        style={{
                                          color: formData.countryOfIssuance
                                            ? "#414651"
                                            : "#717680",
                                        }}
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="united_states">
                                        United States
                                      </SelectItem>
                                      <SelectItem value="canada">
                                        Canada
                                      </SelectItem>
                                      <SelectItem value="mexico">
                                        Mexico
                                      </SelectItem>
                                      <SelectItem value="other">
                                        Other
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        alignSelf: "stretch",
                        background: "#E9EAEB",
                        margin: "16px 0",
                      }}
                    />

                    {/* Signature Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Signature of Employee Label */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <div
                          style={{
                            color:
                              "var(--colors-text-text-secondary-700, #414651)",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Signature of Employee
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
                          >
                            <g clipPath="url(#clip0_signature_help)">
                              <path
                                d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_signature_help">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div
                        style={{
                          alignSelf: "stretch",
                          color:
                            "var(--colors-text-text-secondary-700, #414651)",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-xs, 12px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-xs, 18px)",
                        }}
                      >
                        Please sign here, using your mouse (press and hold the
                        left button while moving the mouse):
                      </div>

                      {/* Signature Canvas */}
                      <div
                        style={{
                          display: "flex",
                          width: "662px",
                          height: "129px",
                          padding: "16px 20px",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          position: "relative",
                        }}
                      >
                        <canvas
                          ref={canvasRef}
                          width={622}
                          height={93}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          style={{
                            cursor: "crosshair",
                            position: "absolute",
                            top: "16px",
                            left: "20px",
                            border: "none",
                            background: "transparent",
                          }}
                        />

                        {/* Signature line */}
                        <svg
                          style={{
                            height: "6px",
                            flexShrink: 0,
                            alignSelf: "stretch",
                            fill: "#FFF",
                            strokeWidth: "1px",
                            stroke: "#D5D7DA",
                            filter:
                              "drop-shadow(0 1px 2px rgba(10, 13, 18, 0.05))",
                            position: "relative",
                          }}
                          width="626"
                          height="6"
                          viewBox="0 0 626 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_d_signature_line)">
                            <path d="M2 2H624" stroke="#D5D7DA" />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_signature_line"
                              x="0"
                              y="0.5"
                              width="626"
                              height="5"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="1" />
                              <feGaussianBlur stdDeviation="1" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_signature_line"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_signature_line"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>

                        {/* Clear Signature Button */}
                        <button
                          onClick={clearSignature}
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
                            position: "absolute",
                            right: "20px",
                            top: "9px",
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
                              d="M2.6665 4.66667H9.33317C11.5423 4.66667 13.3332 6.45753 13.3332 8.66667C13.3332 10.8758 11.5423 12.6667 9.33317 12.6667H2.6665M2.6665 4.66667L5.33317 2M2.6665 4.66667L5.33317 7.33333"
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
                            <div
                              style={{
                                color:
                                  "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Clear Signature
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Date of Signature */}
                      <div
                        style={{
                          alignSelf: "stretch",
                          color:
                            "var(--colors-text-text-secondary-700, #414651)",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Date of Signature: {formData.signatureDate}
                      </div>
                    </div>

                    {/* Divider */}
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

                    {/* Preparer and/or Translator Certification */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Title */}
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
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Preparer and/or Translator Certification (check one)
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
                          >
                            <g clipPath="url(#clip0_translator_help)">
                              <path
                                d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_translator_help">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      {/* Radio Button Options */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "24px",
                          alignSelf: "stretch",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CustomRadio
                            value="no_preparer"
                            name="preparerCertification"
                            checked={formData.preparerCertification === "no_preparer"}
                            onChange={(value) =>
                              handleInputChange("preparerCertification", value)
                            }
                          >
                            I did not use a preparer or translator.
                          </CustomRadio>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <CustomRadio
                            value="used_preparer"
                            name="preparerCertification"
                            checked={formData.preparerCertification === "used_preparer"}
                            onChange={(value) =>
                              handleInputChange("preparerCertification", value)
                            }
                          >
                            A preparer(s) and/or translator(s) assisted the employee in completing Section 1
                          </CustomRadio>
                          <select
                            value={formData.preparerCount || "1"}
                            onChange={(e) =>
                              handleInputChange("preparerCount", e.target.value)
                            }
                            style={{
                              width: "55px",
                              height: "32px",
                              padding: "6px 8px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              color: "#717680",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                              cursor: "pointer",
                              appearance: "none",
                              backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M4 6L8 10L12 6\" stroke=\"%23A4A7AE\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 8px center",
                              paddingRight: "28px",
                              marginTop: "2px",
                            }}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>

                      {/* Conditional Translator/Preparer Form */}
                      {formData.preparerCertification === "used_preparer" && (
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
                          {/* Preparers / Translator Signature Section */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            {/* Title */}
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
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Preparers / Translator Signature
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
                                >
                                  <g clipPath="url(#clip0_translator_signature_help)">
                                    <path
                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_translator_signature_help">
                                      <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>

                            {/* Instructions */}
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              Please sign here, using your mouse (press and hold the left button while moving the mouse):
                            </div>

                            {/* Translator Signature Canvas */}
                            <div
                              style={{
                                display: "flex",
                                width: "662px",
                                height: "129px",
                                padding: "16px 20px",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: "8px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                position: "relative",
                              }}
                            >
                              <canvas
                                ref={(el) => {
                                  if (el && !formData.translatorCanvasRef) {
                                    handleInputChange("translatorCanvasRef", el);
                                  }
                                }}
                                width={622}
                                height={93}
                                onMouseDown={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const x = e.clientX - rect.left;
                                  const y = e.clientY - rect.top;
                                  handleInputChange("translatorIsDrawing", true);

                                  const canvas = e.currentTarget;
                                  const ctx = canvas.getContext("2d");
                                  if (ctx) {
                                    ctx.beginPath();
                                    ctx.moveTo(x, y);
                                  }
                                }}
                                onMouseMove={(e) => {
                                  if (!formData.translatorIsDrawing) return;

                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const x = e.clientX - rect.left;
                                  const y = e.clientY - rect.top;

                                  const canvas = e.currentTarget;
                                  const ctx = canvas.getContext("2d");
                                  if (ctx) {
                                    ctx.lineTo(x, y);
                                    ctx.stroke();
                                  }
                                  handleInputChange("translatorHasSignature", true);
                                }}
                                onMouseUp={() => {
                                  handleInputChange("translatorIsDrawing", false);
                                }}
                                onMouseLeave={() => {
                                  handleInputChange("translatorIsDrawing", false);
                                }}
                                style={{
                                  cursor: "crosshair",
                                  position: "absolute",
                                  top: "16px",
                                  left: "20px",
                                  border: "none",
                                  background: "transparent",
                                }}
                              />

                              {/* Translator Signature line */}
                              <svg
                                style={{
                                  height: "6px",
                                  flexShrink: 0,
                                  alignSelf: "stretch",
                                  fill: "#FFF",
                                  strokeWidth: "1px",
                                  stroke: "#D5D7DA",
                                  filter: "drop-shadow(0 1px 2px rgba(10, 13, 18, 0.05))",
                                  position: "relative",
                                }}
                                width="626"
                                height="6"
                                viewBox="0 0 626 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d_translator_signature_line)">
                                  <path d="M2 2H624" stroke="#D5D7DA" />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d_translator_signature_line"
                                    x="0"
                                    y="0.5"
                                    width="626"
                                    height="5"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      result="hardAlpha"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="1" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow_translator_signature_line"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow_translator_signature_line"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>

                              {/* Clear Translator Signature Button */}
                              <button
                                onClick={() => {
                                  if (formData.translatorCanvasRef) {
                                    const ctx = formData.translatorCanvasRef.getContext("2d");
                                    if (ctx) {
                                      ctx.clearRect(0, 0, 622, 93);
                                      handleInputChange("translatorHasSignature", false);
                                    }
                                  }
                                }}
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
                                  position: "absolute",
                                  right: "20px",
                                  top: "9px",
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
                                    d="M2.6665 4.66667H9.33317C11.5423 4.66667 13.3332 6.45753 13.3332 8.66667C13.3332 10.8758 11.5423 12.6667 9.33317 12.6667H2.6665M2.6665 4.66667L5.33317 2M2.6665 4.66667L5.33317 7.33333"
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
                                  <div
                                    style={{
                                      color: "var(--colors-text-text-secondary-700, #414651)",
                                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "var(--Font-size-text-sm, 14px)",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "var(--Line-height-text-sm, 20px)",
                                    }}
                                  >
                                    Clear Signature
                                  </div>
                                </div>
                              </button>
                            </div>

                            {/* Date of Translator Signature */}
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Date of Signature : {formData.translatorSignatureDate || new Date().toLocaleDateString("en-US")}
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

                            {/* Name Fields */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "16px",
                                alignSelf: "stretch",
                              }}
                            >
                              {/* Last Name */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2px",
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
                                    Last Name (Family Name)
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
                                    >
                                      <g clipPath="url(#clip0_translator_last_name_help)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_translator_last_name_help">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  value={formData.translatorLastName || ""}
                                  onChange={(e) =>
                                    handleInputChange("translatorLastName", e.target.value)
                                  }
                                  style={{
                                    display: "flex",
                                    padding: "6px 8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    color: "var(--colors-text-text-secondary-700, #414651)",
                                    outline: "none",
                                  }}
                                />
                              </div>

                              {/* First Name */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2px",
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
                                    First Name (Given Name)
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
                                    >
                                      <g clipPath="url(#clip0_translator_first_name_help)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_translator_first_name_help">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  value={formData.translatorFirstName || ""}
                                  onChange={(e) =>
                                    handleInputChange("translatorFirstName", e.target.value)
                                  }
                                  style={{
                                    display: "flex",
                                    padding: "6px 8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    color: "var(--colors-text-text-secondary-700, #414651)",
                                    outline: "none",
                                  }}
                                />
                              </div>

                              {/* Middle Initial with Checkbox */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    width: "174px",
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
                                      Middle Initial
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
                                      >
                                        <g clipPath="url(#clip0_translator_middle_initial_help)">
                                          <path
                                            d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.33333"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_translator_middle_initial_help">
                                            <rect width="16" height="16" fill="white" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    value={formData.translatorMiddleInitial || ""}
                                    onChange={(e) =>
                                      handleInputChange("translatorMiddleInitial", e.target.value)
                                    }
                                    disabled={formData.translatorMiddleInitialNA}
                                    style={{
                                      display: "flex",
                                      padding: "6px 8px",
                                      alignItems: "center",
                                      gap: "8px",
                                      alignSelf: "stretch",
                                      borderRadius: "8px",
                                      border: "1px solid #D5D7DA",
                                      background: formData.translatorMiddleInitialNA ? "#F5F5F5" : "#FFF",
                                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "var(--Font-size-text-sm, 14px)",
                                      color: "var(--colors-text-text-secondary-700, #414651)",
                                      outline: "none",
                                    }}
                                  />
                                </div>

                                {/* Checkbox */}
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
                                    <label
                                      style={{
                                        position: "relative",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={formData.translatorMiddleInitialNA || false}
                                        onChange={(e) => {
                                          handleInputChange("translatorMiddleInitialNA", e.target.checked);
                                          if (e.target.checked) {
                                            handleInputChange("translatorMiddleInitial", "");
                                          }
                                        }}
                                        style={{
                                          position: "absolute",
                                          opacity: 0,
                                          width: 0,
                                          height: 0,
                                        }}
                                      />
                                      <div
                                        style={{
                                          width: "16px",
                                          height: "16px",
                                          borderRadius: "4px",
                                          border: formData.translatorMiddleInitialNA ? "none" : "1px solid #D5D7DA",
                                          background: formData.translatorMiddleInitialNA ? "#344698" : "transparent",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          position: "relative",
                                          transition: "all 0.2s ease",
                                        }}
                                      >
                                        {formData.translatorMiddleInitialNA && (
                                          <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M10 3L4.5 8.5L2 6"
                                              stroke="#FFF"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        )}
                                      </div>
                                    </label>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
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
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        const newValue = !formData.translatorMiddleInitialNA;
                                        handleInputChange("translatorMiddleInitialNA", newValue);
                                        if (newValue) {
                                          handleInputChange("translatorMiddleInitial", "");
                                        }
                                      }}
                                    >
                                      Check if not applicable
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Address Fields */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "16px",
                                alignSelf: "stretch",
                              }}
                            >
                              {/* Address */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2px",
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
                                    Address (Street Number and Name)
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
                                    >
                                      <g clipPath="url(#clip0_translator_address_help)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_translator_address_help">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  value={formData.translatorAddress || ""}
                                  onChange={(e) =>
                                    handleInputChange("translatorAddress", e.target.value)
                                  }
                                  style={{
                                    display: "flex",
                                    padding: "6px 8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    color: "var(--colors-text-text-secondary-700, #414651)",
                                    outline: "none",
                                  }}
                                />
                              </div>

                              {/* City or Town */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2px",
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
                                    City or Town
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
                                    >
                                      <g clipPath="url(#clip0_translator_city_help)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_translator_city_help">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  value={formData.translatorCity || ""}
                                  onChange={(e) =>
                                    handleInputChange("translatorCity", e.target.value)
                                  }
                                  style={{
                                    display: "flex",
                                    padding: "6px 8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    color: "var(--colors-text-text-secondary-700, #414651)",
                                    outline: "none",
                                  }}
                                />
                              </div>

                              {/* State */}
                              <div
                                style={{
                                  display: "flex",
                                  width: "160px",
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
                                    State
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "var(--Font-size-text-sm, 14px)",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "var(--Line-height-text-sm, 20px)",
                                    }}
                                  >
                                    *
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
                                    >
                                      <g clipPath="url(#clip0_translator_state_help)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_translator_state_help">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                                <select
                                  value={formData.translatorState || ""}
                                  onChange={(e) =>
                                    handleInputChange("translatorState", e.target.value)
                                  }
                                  style={{
                                    display: "flex",
                                    height: "32px",
                                    padding: "6px 8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    color: formData.translatorState ? "var(--colors-text-text-secondary-700, #414651)" : "#717680",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "var(--Line-height-text-sm, 20px)",
                                    cursor: "pointer",
                                    appearance: "none",
                                    backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M4 6L8 10L12 6\" stroke=\"%23A4A7AE\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 8px center",
                                    paddingRight: "28px",
                                    outline: "none",
                                  }}
                                >
                                  <option value="">Select</option>
                                  <option value="AL">Alabama</option>
                                  <option value="AK">Alaska</option>
                                  <option value="AZ">Arizona</option>
                                  <option value="AR">Arkansas</option>
                                  <option value="CA">California</option>
                                  <option value="CO">Colorado</option>
                                  <option value="CT">Connecticut</option>
                                  <option value="DE">Delaware</option>
                                  <option value="FL">Florida</option>
                                  <option value="GA">Georgia</option>
                                  {/* Add more states as needed */}
                                </select>
                              </div>

                              {/* Zip Code */}
                              <div
                                style={{
                                  display: "flex",
                                  width: "160px",
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
                                    Zip Code
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
                                    >
                                      <g clipPath="url(#clip0_translator_zip_help)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_translator_zip_help">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  value={formData.translatorZipCode || ""}
                                  onChange={(e) =>
                                    handleInputChange("translatorZipCode", e.target.value)
                                  }
                                  style={{
                                    display: "flex",
                                    padding: "6px 8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    color: "var(--colors-text-text-secondary-700, #414651)",
                                    outline: "none",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Section 2 Header */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "24px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Section Label */}
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
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 1,
                              overflow: "hidden",
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              textOverflow: "ellipsis",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            Section 2. Employer or Authorized Representative Review and Verification
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
                            >
                              <g clipPath="url(#clip0_section2_help)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_section2_help">
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
                          (Employers or their authorized representative must complete and sign Section 2 within 3 business days of the employee's first day of employment. You must physically examine one document from List A OR a combination of one document from List B and one document from List C as listed on the "List of Acceptable Documents.")
                        </div>
                      </div>

                      {/* Document Type Section */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "8px",
                          alignSelf: "stretch",
                        }}
                      >
                        {/* Document Type Label */}
                        <div
                          style={{
                            width: "1024px",
                            height: "20px",
                            color: "var(--colors-text-text-secondary-700, #414651)",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Document type
                        </div>

                        {/* Choose from List A - with conditional inline form */}
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
                              padding: "12px 8px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              background: formData.documentType === "list_a" ? "#FAFAFA" : "transparent",
                            }}
                          >
                            {/* Choose from List A Radio Button */}
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
                                  onClick={() => handleInputChange("documentType", "list_a")}
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    padding: "5px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    background: formData.documentType === "list_a" ? "#344698" : "transparent",
                                    border: formData.documentType === "list_a" ? "1px solid #344698" : "1px solid #D5D7DA",
                                    cursor: "pointer",
                                  }}
                                >
                                  {formData.documentType === "list_a" && (
                                    <div
                                      style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "9999px",
                                        background: "#FFF",
                                      }}
                                    />
                                  )}
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
                                    color: "var(--colors-text-text-secondary-700, #414651)",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "var(--Line-height-text-sm, 20px)",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleInputChange("documentType", "list_a")}
                                >
                                  Choose from List A
                                </div>
                              </div>
                            </div>

                            {/* Conditional List A Document Form - Inline */}
                            {formData.documentType === "list_a" && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "16px",
                                  alignSelf: "stretch",
                                }}
                              >
                                {/* Divider */}
                                <svg
                                  style={{
                                    display: "flex",
                                    padding: "4px 0",
                                    alignItems: "center",
                                    alignSelf: "stretch",
                                  }}
                                  width="100%"
                                  height="9"
                                  viewBox="0 0 1016 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1016 5H0V4H1016V5"
                                    fill="#E9EAEB"
                                  />
                                </svg>

                                {/* Form Container */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "20px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  {/* Form Fields */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "16px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    {/* Select Document */}
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
                                          Select Document
                                        </div>
                                        <div
                                          style={{
                                            color: "#344698",
                                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                            fontSize: "var(--Font-size-text-sm, 14px)",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "var(--Line-height-text-sm, 20px)",
                                          }}
                                        >
                                          *
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
                                          >
                                            <g clipPath="url(#clip0_select_document_help)">
                                              <path
                                                d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.33333"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_select_document_help">
                                                <rect width="16" height="16" fill="white" />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        </div>
                                      </div>
                                      <select
                                        value={formData.listASelectedDocument || ""}
                                        onChange={(e) =>
                                          handleInputChange("listASelectedDocument", e.target.value)
                                        }
                                        style={{
                                          display: "flex",
                                          height: "32px",
                                          padding: "6px 8px",
                                          alignItems: "center",
                                          gap: "8px",
                                          alignSelf: "stretch",
                                          borderRadius: "8px",
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                          color: formData.listASelectedDocument ? "var(--colors-text-text-secondary-700, #414651)" : "#717680",
                                          fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                          fontSize: "var(--Font-size-text-sm, 14px)",
                                          fontStyle: "normal",
                                          fontWeight: 400,
                                          lineHeight: "var(--Line-height-text-sm, 20px)",
                                          cursor: "pointer",
                                          appearance: "none",
                                          backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M4 6L8 10L12 6\" stroke=\"%23A4A7AE\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                                          backgroundRepeat: "no-repeat",
                                          backgroundPosition: "right 8px center",
                                          paddingRight: "28px",
                                          outline: "none",
                                        }}
                                      >
                                        <option value="">Select</option>
                                        <option value="employment_authorization_i766">Employment Authorization Document (Form I-766)</option>
                                        <option value="foreign_passport_i94">Foreign Passport With Arrival/Departure Record (Form I-94)</option>
                                        <option value="receipt_replacement_foreign_passport_i94">Receipt Replacement Foreign Passport with Arrival/Departure Record (Form I-94)</option>
                                        <option value="receipt_replacement_employment_auth_i766">Receipt Replacement Employment Authorization Document (Form I-766)</option>
                                      </select>
                                    </div>

                                    {/* Grid of Input Fields */}
                                    <div
                                      style={{
                                        display: "grid",
                                        rowGap: "16px",
                                        columnGap: "16px",
                                        alignSelf: "stretch",
                                        gridTemplateRows: "repeat(4, fit-content(100%))",
                                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                      }}
                                    >
                                      {/* Row 1 - Issuing Authority */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          flex: "1 0 0",
                                          alignSelf: "stretch",
                                          gridRow: "1 / span 1",
                                          gridColumn: "1 / span 1",
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
                                          Issuing Authority
                                        </div>
                                        <input
                                          type="text"
                                          value={formData.listAIssuingAuthority || ""}
                                          onChange={(e) =>
                                            handleInputChange("listAIssuingAuthority", e.target.value)
                                          }
                                          style={{
                                            display: "flex",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            flex: "1 0 0",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                            fontSize: "var(--Font-size-text-sm, 14px)",
                                            color: "var(--colors-text-text-secondary-700, #414651)",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Row 1 - Passport Number */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          flex: "1 0 0",
                                          alignSelf: "stretch",
                                          gridRow: "1 / span 1",
                                          gridColumn: "2 / span 1",
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
                                          Passport Number
                                        </div>
                                        <input
                                          type="text"
                                          value={formData.listAPassportNumber || ""}
                                          onChange={(e) =>
                                            handleInputChange("listAPassportNumber", e.target.value)
                                          }
                                          style={{
                                            display: "flex",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            flex: "1 0 0",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                            fontSize: "var(--Font-size-text-sm, 14px)",
                                            color: "var(--colors-text-text-secondary-700, #414651)",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Row 2 - Card Number */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          flex: "1 0 0",
                                          alignSelf: "stretch",
                                          gridRow: "2 / span 1",
                                          gridColumn: "1 / span 1",
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
                                          Card Number
                                        </div>
                                        <input
                                          type="text"
                                          value={formData.listACardNumber || ""}
                                          onChange={(e) =>
                                            handleInputChange("listACardNumber", e.target.value)
                                          }
                                          style={{
                                            display: "flex",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            flex: "1 0 0",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                            fontSize: "var(--Font-size-text-sm, 14px)",
                                            color: "var(--colors-text-text-secondary-700, #414651)",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Row 2 - Alien Number */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          flex: "1 0 0",
                                          alignSelf: "stretch",
                                          gridRow: "2 / span 1",
                                          gridColumn: "2 / span 1",
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
                                          Alien Number
                                        </div>
                                        <input
                                          type="text"
                                          value={formData.listAAlienNumber || ""}
                                          onChange={(e) =>
                                            handleInputChange("listAAlienNumber", e.target.value)
                                          }
                                          style={{
                                            display: "flex",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            flex: "1 0 0",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                            fontSize: "var(--Font-size-text-sm, 14px)",
                                            color: "var(--colors-text-text-secondary-700, #414651)",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Row 3 - I-94 Number */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          flex: "1 0 0",
                                          alignSelf: "stretch",
                                          gridRow: "3 / span 1",
                                          gridColumn: "1 / span 1",
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
                                          I-94 Number
                                        </div>
                                        <input
                                          type="text"
                                          value={formData.listAI94Number || ""}
                                          onChange={(e) =>
                                            handleInputChange("listAI94Number", e.target.value)
                                          }
                                          style={{
                                            display: "flex",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            flex: "1 0 0",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                            fontSize: "var(--Font-size-text-sm, 14px)",
                                            color: "var(--colors-text-text-secondary-700, #414651)",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Row 3 - Visa Number */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          flex: "1 0 0",
                                          alignSelf: "stretch",
                                          gridRow: "3 / span 1",
                                          gridColumn: "2 / span 1",
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
                                          Visa Number
                                        </div>
                                        <input
                                          type="text"
                                          value={formData.listAVisaNumber || ""}
                                          onChange={(e) =>
                                            handleInputChange("listAVisaNumber", e.target.value)
                                          }
                                          style={{
                                            display: "flex",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            flex: "1 0 0",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                            fontSize: "var(--Font-size-text-sm, 14px)",
                                            color: "var(--colors-text-text-secondary-700, #414651)",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Row 4 - Expiration Date */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          flex: "1 0 0",
                                          alignSelf: "stretch",
                                          gridRow: "4 / span 1",
                                          gridColumn: "1 / span 1",
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
                                          Expiration Date
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                              d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                                              stroke="#A4A7AE"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <input
                                            type="text"
                                            placeholder="00/00/00"
                                            value={formData.listAExpirationDate || ""}
                                            onChange={(e) =>
                                              handleInputChange("listAExpirationDate", e.target.value)
                                            }
                                            style={{
                                              flex: "1 0 0",
                                              color: "#717680",
                                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                              fontSize: "var(--Font-size-text-sm, 14px)",
                                              fontStyle: "normal",
                                              fontWeight: 400,
                                              lineHeight: "var(--Line-height-text-sm, 20px)",
                                              border: "none",
                                              background: "transparent",
                                              outline: "none",
                                            }}
                                          />
                                        </div>
                                      </div>

                                      {/* Row 4 - Country of Issuance */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          flex: "1 0 0",
                                          alignSelf: "stretch",
                                          gridRow: "4 / span 1",
                                          gridColumn: "2 / span 1",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "2px",
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
                                            Country of Issuance
                                          </div>
                                          <div
                                            style={{
                                              color: "#344698",
                                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                              fontSize: "var(--Font-size-text-sm, 14px)",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "var(--Line-height-text-sm, 20px)",
                                            }}
                                          >
                                            *
                                          </div>
                                        </div>
                                        <select
                                          value={formData.listACountryOfIssuance || ""}
                                          onChange={(e) =>
                                            handleInputChange("listACountryOfIssuance", e.target.value)
                                          }
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: formData.listACountryOfIssuance ? "var(--colors-text-text-secondary-700, #414651)" : "#717680",
                                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                            fontSize: "var(--Font-size-text-sm, 14px)",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "var(--Line-height-text-sm, 20px)",
                                            cursor: "pointer",
                                            appearance: "none",
                                            backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M4 6L8 10L12 6\" stroke=\"%23A4A7AE\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right 8px center",
                                            paddingRight: "28px",
                                            outline: "none",
                                          }}
                                        >
                                          <option value="">Select</option>
                                          <option value="US">United States</option>
                                          <option value="CA">Canada</option>
                                          <option value="MX">Mexico</option>
                                          <option value="GB">United Kingdom</option>
                                          <option value="other">Other</option>
                                        </select>
                                      </div>
                                    </div>

                                    {/* Document Two and Three sections for Foreign Passport I-94 and Receipt Replacement Foreign Passport I-94 only */}
                                    {(formData.listASelectedDocument === "foreign_passport_i94" || formData.listASelectedDocument === "receipt_replacement_foreign_passport_i94") && (
                                      <>
                                        {/* Divider */}
                                        <svg
                                          style={{
                                            display: "flex",
                                            padding: "4px 0",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                          }}
                                          width="100%"
                                          height="9"
                                          viewBox="0 0 545 9"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M545 5H0V4H545V5"
                                            fill="#E9EAEB"
                                          />
                                        </svg>

                                        {/* Document Two Section */}
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
                                              color: "var(--colors-text-text-secondary-700, #414651)",
                                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                              fontSize: "var(--Font-size-text-md, 16px)",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "var(--Line-height-text-md, 24px)",
                                            }}
                                          >
                                            Document Two
                                          </div>

                                          {/* Document Two Select */}
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
                                                Select Document
                                              </div>
                                              <div
                                                style={{
                                                  color: "#344698",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  fontStyle: "normal",
                                                  fontWeight: 500,
                                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                                }}
                                              >
                                                *
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
                                                >
                                                  <g clipPath="url(#clip0_doc_two_help)">
                                                    <path
                                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.33333"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_doc_two_help">
                                                      <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                            <select
                                              value={formData.listADocumentTwoType || ""}
                                              onChange={(e) =>
                                                handleInputChange("listADocumentTwoType", e.target.value)
                                              }
                                              style={{
                                                display: "flex",
                                                height: "32px",
                                                padding: "6px 8px",
                                                alignItems: "center",
                                                gap: "8px",
                                                alignSelf: "stretch",
                                                borderRadius: "8px",
                                                border: "1px solid #D5D7DA",
                                                background: "#FFF",
                                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                color: formData.listADocumentTwoType ? "var(--colors-text-text-secondary-700, #414651)" : "#717680",
                                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                fontSize: "var(--Font-size-text-sm, 14px)",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                lineHeight: "var(--Line-height-text-sm, 20px)",
                                                cursor: "pointer",
                                                appearance: "none",
                                                backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M4 6L8 10L12 6\" stroke=\"%23A4A7AE\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "right 8px center",
                                                paddingRight: "28px",
                                                outline: "none",
                                              }}
                                            >
                                              <option value="">Select</option>
                                              <option value="document_two_option_1">Document Two Option 1</option>
                                              <option value="document_two_option_2">Document Two Option 2</option>
                                            </select>
                                          </div>

                                          {/* Document Two Form Container */}
                                          <div
                                            style={{
                                              display: "grid",
                                              height: "158px",
                                              rowGap: "16px",
                                              columnGap: "16px",
                                              alignSelf: "stretch",
                                              gridTemplateRows: "repeat(2, fit-content(100%))",
                                              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                            }}
                                          >
                                            {/* Issuing Authority */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                gap: "6px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                gridRow: "1 / span 1",
                                                gridColumn: "1 / span 1",
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
                                                Issuing Authority
                                              </div>
                                              <input
                                                type="text"
                                                value={formData.listADocumentTwoIssuingAuthority || ""}
                                                onChange={(e) =>
                                                  handleInputChange("listADocumentTwoIssuingAuthority", e.target.value)
                                                }
                                                style={{
                                                  display: "flex",
                                                  padding: "6px 8px",
                                                  alignItems: "center",
                                                  gap: "8px",
                                                  flex: "1 0 0",
                                                  alignSelf: "stretch",
                                                  borderRadius: "8px",
                                                  border: "1px solid #D5D7DA",
                                                  background: "#FFF",
                                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  color: "var(--colors-text-text-secondary-700, #414651)",
                                                  outline: "none",
                                                }}
                                              />
                                            </div>

                                            {/* Document Number */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                gap: "6px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                gridRow: "1 / span 1",
                                                gridColumn: "2 / span 1",
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
                                                Document Number
                                              </div>
                                              <input
                                                type="text"
                                                value={formData.listADocumentTwoNumber || ""}
                                                onChange={(e) =>
                                                  handleInputChange("listADocumentTwoNumber", e.target.value)
                                                }
                                                style={{
                                                  display: "flex",
                                                  padding: "6px 8px",
                                                  alignItems: "center",
                                                  gap: "8px",
                                                  flex: "1 0 0",
                                                  alignSelf: "stretch",
                                                  borderRadius: "8px",
                                                  border: "1px solid #D5D7DA",
                                                  background: "#FFF",
                                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  color: "var(--colors-text-text-secondary-700, #414651)",
                                                  outline: "none",
                                                }}
                                              />
                                            </div>

                                            {/* Expiration Date */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                gap: "6px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                gridRow: "2 / span 1",
                                                gridColumn: "1 / span 2",
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
                                                Expiration Date
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  height: "32px",
                                                  padding: "6px 8px",
                                                  alignItems: "center",
                                                  gap: "8px",
                                                  alignSelf: "stretch",
                                                  borderRadius: "8px",
                                                  border: "1px solid #D5D7DA",
                                                  background: "#FFF",
                                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                                    d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                                                    stroke="#A4A7AE"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                                <input
                                                  type="text"
                                                  placeholder="00/00/00"
                                                  value={formData.listADocumentTwoExpirationDate || ""}
                                                  onChange={(e) =>
                                                    handleInputChange("listADocumentTwoExpirationDate", e.target.value)
                                                  }
                                                  style={{
                                                    flex: "1 0 0",
                                                    color: "#717680",
                                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                                    fontStyle: "normal",
                                                    fontWeight: 400,
                                                    lineHeight: "var(--Line-height-text-sm, 20px)",
                                                    border: "none",
                                                    background: "transparent",
                                                    outline: "none",
                                                  }}
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  alignSelf: "stretch",
                                                  color: "var(--colors-text-text-tertiary-600, #535862)",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  fontStyle: "normal",
                                                  fontWeight: 400,
                                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                                }}
                                              >
                                                or N/A for Not applicable, or D/S for Duration of Stay
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Divider */}
                                        <svg
                                          style={{
                                            display: "flex",
                                            padding: "4px 0",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                          }}
                                          width="100%"
                                          height="9"
                                          viewBox="0 0 545 9"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M545 5H0V4H545V5"
                                            fill="#E9EAEB"
                                          />
                                        </svg>

                                        {/* Document Three Section */}
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
                                              color: "var(--colors-text-text-secondary-700, #414651)",
                                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                              fontSize: "var(--Font-size-text-md, 16px)",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "var(--Line-height-text-md, 24px)",
                                            }}
                                          >
                                            Document Three
                                          </div>

                                          {/* Document Three Select */}
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
                                                Select Document
                                              </div>
                                              <div
                                                style={{
                                                  color: "#344698",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  fontStyle: "normal",
                                                  fontWeight: 500,
                                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                                }}
                                              >
                                                *
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
                                                >
                                                  <g clipPath="url(#clip0_doc_three_help)">
                                                    <path
                                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.33333"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_doc_three_help">
                                                      <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                            <select
                                              value={formData.listADocumentThreeType || ""}
                                              onChange={(e) =>
                                                handleInputChange("listADocumentThreeType", e.target.value)
                                              }
                                              style={{
                                                display: "flex",
                                                height: "32px",
                                                padding: "6px 8px",
                                                alignItems: "center",
                                                gap: "8px",
                                                alignSelf: "stretch",
                                                borderRadius: "8px",
                                                border: "1px solid #D5D7DA",
                                                background: "#FFF",
                                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                color: formData.listADocumentThreeType ? "var(--colors-text-text-secondary-700, #414651)" : "#717680",
                                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                fontSize: "var(--Font-size-text-sm, 14px)",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                lineHeight: "var(--Line-height-text-sm, 20px)",
                                                cursor: "pointer",
                                                appearance: "none",
                                                backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M4 6L8 10L12 6\" stroke=\"%23A4A7AE\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "right 8px center",
                                                paddingRight: "28px",
                                                outline: "none",
                                              }}
                                            >
                                              <option value="">Select</option>
                                              <option value="document_three_option_1">Document Three Option 1</option>
                                              <option value="document_three_option_2">Document Three Option 2</option>
                                            </select>
                                          </div>

                                          {/* Document Three Form Container */}
                                          <div
                                            style={{
                                              display: "grid",
                                              height: "158px",
                                              rowGap: "16px",
                                              columnGap: "16px",
                                              alignSelf: "stretch",
                                              gridTemplateRows: "repeat(2, fit-content(100%))",
                                              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                            }}
                                          >
                                            {/* Issuing Authority */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                gap: "6px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                gridRow: "1 / span 1",
                                                gridColumn: "1 / span 1",
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
                                                Issuing Authority
                                              </div>
                                              <input
                                                type="text"
                                                value={formData.listADocumentThreeIssuingAuthority || ""}
                                                onChange={(e) =>
                                                  handleInputChange("listADocumentThreeIssuingAuthority", e.target.value)
                                                }
                                                style={{
                                                  display: "flex",
                                                  padding: "6px 8px",
                                                  alignItems: "center",
                                                  gap: "8px",
                                                  flex: "1 0 0",
                                                  alignSelf: "stretch",
                                                  borderRadius: "8px",
                                                  border: "1px solid #D5D7DA",
                                                  background: "#FFF",
                                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  color: "var(--colors-text-text-secondary-700, #414651)",
                                                  outline: "none",
                                                }}
                                              />
                                            </div>

                                            {/* Document Number */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                gap: "6px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                gridRow: "1 / span 1",
                                                gridColumn: "2 / span 1",
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
                                                Document Number
                                              </div>
                                              <input
                                                type="text"
                                                value={formData.listADocumentThreeNumber || ""}
                                                onChange={(e) =>
                                                  handleInputChange("listADocumentThreeNumber", e.target.value)
                                                }
                                                style={{
                                                  display: "flex",
                                                  padding: "6px 8px",
                                                  alignItems: "center",
                                                  gap: "8px",
                                                  flex: "1 0 0",
                                                  alignSelf: "stretch",
                                                  borderRadius: "8px",
                                                  border: "1px solid #D5D7DA",
                                                  background: "#FFF",
                                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  color: "var(--colors-text-text-secondary-700, #414651)",
                                                  outline: "none",
                                                }}
                                              />
                                            </div>

                                            {/* Expiration Date */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                gap: "6px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                gridRow: "2 / span 1",
                                                gridColumn: "1 / span 2",
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
                                                Expiration Date
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  height: "32px",
                                                  padding: "6px 8px",
                                                  alignItems: "center",
                                                  gap: "8px",
                                                  alignSelf: "stretch",
                                                  borderRadius: "8px",
                                                  border: "1px solid #D5D7DA",
                                                  background: "#FFF",
                                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                                    d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                                                    stroke="#A4A7AE"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                                <input
                                                  type="text"
                                                  placeholder="00/00/00"
                                                  value={formData.listADocumentThreeExpirationDate || ""}
                                                  onChange={(e) =>
                                                    handleInputChange("listADocumentThreeExpirationDate", e.target.value)
                                                  }
                                                  style={{
                                                    flex: "1 0 0",
                                                    color: "#717680",
                                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                                    fontStyle: "normal",
                                                    fontWeight: 400,
                                                    lineHeight: "var(--Line-height-text-sm, 20px)",
                                                    border: "none",
                                                    background: "transparent",
                                                    outline: "none",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>

                                  {/* Document Preview Area */}
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "451px",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      gap: "10px",
                                      flexShrink: 0,
                                    }}
                                  >
                                    {formData.listASelectedDocument === "employment_authorization_i766" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "12px 8px",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: "8px",
                                          alignSelf: "stretch",
                                          borderRadius: "8px",
                                          border: "1px solid #E9EAEB",
                                          background: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "10px",
                                            alignSelf: "stretch",
                                          }}
                                        >
                                          <img
                                            src="https://api.builder.io/api/v1/image/assets/TEMP/6aca5cc022f6a8a4327f5aa5fa25089ead7e6504?width=870"
                                            alt="Employment Authorization Document Sample"
                                            style={{
                                              height: "285.65px",
                                              alignSelf: "stretch",
                                              aspectRatio: "233/153",
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "4px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            // Handle click to view example documents
                                            console.log("View example documents clicked");
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#273572",
                                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                              fontSize: "var(--Font-size-text-sm, 14px)",
                                              fontStyle: "normal",
                                              fontWeight: 600,
                                              lineHeight: "var(--Line-height-text-sm, 20px)",
                                              textDecoration: "underline",
                                            }}
                                          >
                                            Click image to view example document(s)
                                          </div>
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M14 14.6499L11.1 11.7499M7.33333 5.98324V9.98324M5.33333 7.98324H9.33333M12.6667 7.98324C12.6667 10.9288 10.2789 13.3166 7.33333 13.3166C4.38781 13.3166 2 10.9288 2 7.98324C2 5.03772 4.38781 2.6499 7.33333 2.6499C10.2789 2.6499 12.6667 5.03772 12.6667 7.98324Z"
                                              stroke="#34479A"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    ) : formData.listASelectedDocument === "foreign_passport_i94" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "12px 8px",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: "8px",
                                          alignSelf: "stretch",
                                          borderRadius: "8px",
                                          border: "1px solid #E9EAEB",
                                          background: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "10px",
                                            alignSelf: "stretch",
                                          }}
                                        >
                                          <img
                                            src="https://api.builder.io/api/v1/image/assets/TEMP/427c00b83faffc0e9d36f585707324ddfeec1535?width=870"
                                            alt="Foreign Passport With I-94 Sample"
                                            style={{
                                              height: "285.65px",
                                              alignSelf: "stretch",
                                              aspectRatio: "233/153",
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "4px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            // Handle click to view example documents
                                            console.log("View example documents clicked");
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#273572",
                                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                              fontSize: "var(--Font-size-text-sm, 14px)",
                                              fontStyle: "normal",
                                              fontWeight: 600,
                                              lineHeight: "var(--Line-height-text-sm, 20px)",
                                              textDecoration: "underline",
                                            }}
                                          >
                                            Click image to view example document(s)
                                          </div>
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M14 14.6499L11.1 11.7499M7.33333 5.98324V9.98324M5.33333 7.98324H9.33333M12.6667 7.98324C12.6667 10.9288 10.2789 13.3166 7.33333 13.3166C4.38781 13.3166 2 10.9288 2 7.98324C2 5.03772 4.38781 2.6499 7.33333 2.6499C10.2789 2.6499 12.6667 5.03772 12.6667 7.98324Z"
                                              stroke="#34479A"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    ) : formData.listASelectedDocument === "receipt_replacement_foreign_passport_i94" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          height: "337.65px",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: "10px",
                                          alignSelf: "stretch",
                                          background: "transparent",
                                          borderRadius: "8px",
                                          justifyContent: "center",
                                          textAlign: "center",
                                        }}
                                      >
                                        {/* Empty document preview area for Receipt Replacement Foreign Passport I-94 */}
                                      </div>
                                    ) : formData.listASelectedDocument === "receipt_replacement_employment_auth_i766" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: "10px",
                                          alignSelf: "stretch",
                                          background: "transparent",
                                          borderRadius: "8px",
                                          justifyContent: "center",
                                          textAlign: "center",
                                        }}
                                      >
                                        {/* Empty document preview area for Receipt Replacement Employment Authorization Document I-766 */}
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          display: "flex",
                                          height: "296px",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "10px",
                                          alignSelf: "stretch",
                                          background: "transparent",
                                          borderRadius: "8px",
                                          justifyContent: "center",
                                          textAlign: "center",
                                        }}
                                      >
                                        {/* Container preserved for future document display */}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Choose from List B, C - with conditional inline form */}
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
                              padding: "12px 8px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              background: formData.documentType === "list_b_c" ? "#FAFAFA" : "transparent",
                            }}
                          >
                            {/* Choose from List B, C Radio Button */}
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
                                  onClick={() => handleInputChange("documentType", "list_b_c")}
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    padding: "5px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    background: formData.documentType === "list_b_c" ? "#344698" : "transparent",
                                    border: formData.documentType === "list_b_c" ? "1px solid #344698" : "1px solid #D5D7DA",
                                    cursor: "pointer",
                                  }}
                                >
                                  {formData.documentType === "list_b_c" && (
                                    <div
                                      style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "9999px",
                                        background: "#FFF",
                                      }}
                                    />
                                  )}
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
                                    color: "var(--colors-text-text-secondary-700, #414651)",
                                    fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "var(--Line-height-text-sm, 20px)",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleInputChange("documentType", "list_b_c")}
                                >
                                  Choose from List B, C
                                </div>
                              </div>
                            </div>

                            {/* Conditional List B, C Document Form - Inline */}
                            {formData.documentType === "list_b_c" && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "16px",
                                  alignSelf: "stretch",
                                }}
                              >
                                {/* Divider */}
                                <svg
                                  style={{
                                    display: "flex",
                                    padding: "4px 0",
                                    alignItems: "center",
                                    alignSelf: "stretch",
                                  }}
                                  width="100%"
                                  height="9"
                                  viewBox="0 0 1016 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1016 5H0V4H1016V5"
                                    fill="#E9EAEB"
                                  />
                                </svg>

                                {/* Document A and B Form Container */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "20px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  {/* Document A Section */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "20px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "var(--colors-text-text-secondary-700, #414651)",
                                        fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "var(--Font-size-text-md, 16px)",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "var(--Line-height-text-md, 24px)",
                                      }}
                                    >
                                      Document A
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "20px",
                                        alignSelf: "stretch",
                                      }}
                                    >
                                      {/* Document A Form */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "16px",
                                          flex: "1 0 0",
                                        }}
                                      >
                                        {/* Document A Select */}
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
                                              Select Document
                                            </div>
                                            <div
                                              style={{
                                                color: "#344698",
                                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                fontSize: "var(--Font-size-text-sm, 14px)",
                                                fontStyle: "normal",
                                                fontWeight: 500,
                                                lineHeight: "var(--Line-height-text-sm, 20px)",
                                              }}
                                            >
                                              *
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
                                              >
                                                <g clipPath="url(#clip0_doc_a_help)">
                                                  <path
                                                    d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                    stroke="#A4A7AE"
                                                    strokeWidth="1.33333"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </g>
                                                <defs>
                                                  <clipPath id="clip0_doc_a_help">
                                                    <rect width="16" height="16" fill="white" />
                                                  </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                          </div>
                                          <select
                                            value={formData.listBCDocumentAType || ""}
                                            onChange={(e) =>
                                              handleInputChange("listBCDocumentAType", e.target.value)
                                            }
                                            style={{
                                              display: "flex",
                                              height: "32px",
                                              padding: "6px 8px",
                                              alignItems: "center",
                                              gap: "8px",
                                              alignSelf: "stretch",
                                              borderRadius: "8px",
                                              border: "1px solid #D5D7DA",
                                              background: "#FFF",
                                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                              color: formData.listBCDocumentAType ? "var(--colors-text-text-secondary-700, #414651)" : "#717680",
                                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                              fontSize: "var(--Font-size-text-sm, 14px)",
                                              fontStyle: "normal",
                                              fontWeight: 400,
                                              lineHeight: "var(--Line-height-text-sm, 20px)",
                                              cursor: "pointer",
                                              appearance: "none",
                                              backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M4 6L8 10L12 6\" stroke=\"%23A4A7AE\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                                              backgroundRepeat: "no-repeat",
                                              backgroundPosition: "right 8px center",
                                              paddingRight: "28px",
                                              outline: "none",
                                            }}
                                          >
                                            <option value="">Select</option>
                                            <option value="drivers_license">Driving License Issued by a U.S State our Outlying Possesion</option>
                                            <option value="state_id">State ID Card</option>
                                            <option value="school_id">School ID Card with Photo</option>
                                            <option value="voter_card">Voter Registration Card</option>
                                            <option value="military_id">U.S. Military Card</option>
                                          </select>
                                        </div>

                                        {/* Document A Form Grid */}
                                        <div
                                          style={{
                                            display: "grid",
                                            height: "132px",
                                            rowGap: "16px",
                                            columnGap: "16px",
                                            alignSelf: "stretch",
                                            gridTemplateRows: "repeat(2, fit-content(100%))",
                                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                          }}
                                        >
                                          {/* Issuing Authority */}
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              gap: "6px",
                                              flex: "1 0 0",
                                              alignSelf: "stretch",
                                              gridRow: "1 / span 1",
                                              gridColumn: "1 / span 1",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "2px",
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
                                                Issuing Authority
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
                                                >
                                                  <g clipPath="url(#clip0_doc_a_issuing_help)">
                                                    <path
                                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.33333"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_doc_a_issuing_help">
                                                      <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                            <input
                                              type="text"
                                              value={formData.listBCDocumentAIssuingAuthority || ""}
                                              onChange={(e) =>
                                                handleInputChange("listBCDocumentAIssuingAuthority", e.target.value)
                                              }
                                              style={{
                                                display: "flex",
                                                padding: "6px 8px",
                                                alignItems: "center",
                                                gap: "8px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                borderRadius: "8px",
                                                border: "1px solid #D5D7DA",
                                                background: "#FFF",
                                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                fontSize: "var(--Font-size-text-sm, 14px)",
                                                color: "var(--colors-text-text-secondary-700, #414651)",
                                                outline: "none",
                                              }}
                                            />
                                          </div>

                                          {/* Document Number */}
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              gap: "6px",
                                              flex: "1 0 0",
                                              alignSelf: "stretch",
                                              gridRow: "1 / span 1",
                                              gridColumn: "2 / span 1",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "2px",
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
                                                Document Number
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
                                                >
                                                  <g clipPath="url(#clip0_doc_a_number_help)">
                                                    <path
                                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.33333"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_doc_a_number_help">
                                                      <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                            <input
                                              type="text"
                                              value={formData.listBCDocumentANumber || ""}
                                              onChange={(e) =>
                                                handleInputChange("listBCDocumentANumber", e.target.value)
                                              }
                                              style={{
                                                display: "flex",
                                                padding: "6px 8px",
                                                alignItems: "center",
                                                gap: "8px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                borderRadius: "8px",
                                                border: "1px solid #D5D7DA",
                                                background: "#FFF",
                                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                fontSize: "var(--Font-size-text-sm, 14px)",
                                                color: "var(--colors-text-text-secondary-700, #414651)",
                                                outline: "none",
                                              }}
                                            />
                                          </div>

                                          {/* Expiration Date */}
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              gap: "6px",
                                              flex: "1 0 0",
                                              alignSelf: "stretch",
                                              gridRow: "2 / span 1",
                                              gridColumn: "1 / span 1",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "2px",
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
                                                Expiration Date
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
                                                >
                                                  <g clipPath="url(#clip0_doc_a_exp_help)">
                                                    <path
                                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.33333"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_doc_a_exp_help">
                                                      <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                height: "32px",
                                                padding: "6px 8px",
                                                alignItems: "center",
                                                gap: "8px",
                                                alignSelf: "stretch",
                                                borderRadius: "8px",
                                                border: "1px solid #D5D7DA",
                                                background: "#FFF",
                                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                                  d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                                                  stroke="#A4A7AE"
                                                  strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                              <input
                                                type="text"
                                                placeholder="00/00/00"
                                                value={formData.listBCDocumentAExpirationDate || ""}
                                                onChange={(e) =>
                                                  handleInputChange("listBCDocumentAExpirationDate", e.target.value)
                                                }
                                                style={{
                                                  flex: "1 0 0",
                                                  color: "#717680",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  fontStyle: "normal",
                                                  fontWeight: 400,
                                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                                  border: "none",
                                                  background: "transparent",
                                                  outline: "none",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Document A Preview Area */}
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "451px",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: "10px",
                                        }}
                                      >
                                        {formData.listBCDocumentAType === "drivers_license" ? (
                                          <div
                                            style={{
                                              display: "flex",
                                              padding: "12px 8px",
                                              flexDirection: "column",
                                              alignItems: "center",
                                              gap: "8px",
                                              alignSelf: "stretch",
                                              borderRadius: "8px",
                                              border: "1px solid #E9EAEB",
                                              background: "#FFF",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: "10px",
                                                alignSelf: "stretch",
                                              }}
                                            >
                                              <img
                                                src="https://api.builder.io/api/v1/image/assets/TEMP/5e43c9cf01518d5a57e42af370cd7e4667f8e418?width=870"
                                                alt="Driving License Sample"
                                                style={{
                                                  height: "285.65px",
                                                  alignSelf: "stretch",
                                                  aspectRatio: "233/153",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "4px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                console.log("View example documents clicked");
                                              }}
                                            >
                                              <div
                                                style={{
                                                  color: "#273572",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  fontStyle: "normal",
                                                  fontWeight: 600,
                                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                                  textDecoration: "underline",
                                                }}
                                              >
                                                Click image to view example document(s)
                                              </div>
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M14 14.6499L11.1 11.7499M7.33333 5.98324V9.98324M5.33333 7.98324H9.33333M12.6667 7.98324C12.6667 10.9288 10.2789 13.3166 7.33333 13.3166C4.38781 13.3166 2 10.9288 2 7.98324C2 5.03772 4.38781 2.6499 7.33333 2.6499C10.2789 2.6499 12.6667 5.03772 12.6667 7.98324Z"
                                                  stroke="#34479A"
                                                  strokeWidth="1.66667"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </div>
                                          </div>
                                        ) : (
                                          <div
                                            style={{
                                              display: "flex",
                                              height: "206px",
                                              flexDirection: "column",
                                              alignItems: "center",
                                              gap: "10px",
                                              alignSelf: "stretch",
                                              background: "transparent",
                                              borderRadius: "8px",
                                              justifyContent: "center",
                                              textAlign: "center",
                                            }}
                                          >
                                            {/* Empty document preview area for Document A */}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Divider */}
                                <svg
                                  style={{
                                    display: "flex",
                                    padding: "4px 0",
                                    alignItems: "center",
                                    alignSelf: "stretch",
                                  }}
                                  width="100%"
                                  height="9"
                                  viewBox="0 0 1016 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1016 5H0V4H1016V5"
                                    fill="#E9EAEB"
                                  />
                                </svg>

                                {/* Document B Section */}
                                <div
                                  style={{
                                    display: "flex",
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
                                      gap: "20px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "var(--colors-text-text-secondary-700, #414651)",
                                        fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "var(--Font-size-text-md, 16px)",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "var(--Line-height-text-md, 24px)",
                                      }}
                                    >
                                      Document B
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "20px",
                                        alignSelf: "stretch",
                                      }}
                                    >
                                      {/* Document B Form */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "16px",
                                          flex: "1 0 0",
                                        }}
                                      >
                                        {/* Document B Select */}
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
                                              Select Document
                                            </div>
                                            <div
                                              style={{
                                                color: "#344698",
                                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                fontSize: "var(--Font-size-text-sm, 14px)",
                                                fontStyle: "normal",
                                                fontWeight: 500,
                                                lineHeight: "var(--Line-height-text-sm, 20px)",
                                              }}
                                            >
                                              *
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
                                              >
                                                <g clipPath="url(#clip0_doc_b_help)">
                                                  <path
                                                    d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                    stroke="#A4A7AE"
                                                    strokeWidth="1.33333"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </g>
                                                <defs>
                                                  <clipPath id="clip0_doc_b_help">
                                                    <rect width="16" height="16" fill="white" />
                                                  </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                          </div>
                                          <select
                                            value={formData.listBCDocumentBType || ""}
                                            onChange={(e) =>
                                              handleInputChange("listBCDocumentBType", e.target.value)
                                            }
                                            style={{
                                              display: "flex",
                                              height: "32px",
                                              padding: "6px 8px",
                                              alignItems: "center",
                                              gap: "8px",
                                              alignSelf: "stretch",
                                              borderRadius: "8px",
                                              border: "1px solid #D5D7DA",
                                              background: "#FFF",
                                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                              color: formData.listBCDocumentBType ? "var(--colors-text-text-secondary-700, #414651)" : "#717680",
                                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                              fontSize: "var(--Font-size-text-sm, 14px)",
                                              fontStyle: "normal",
                                              fontWeight: 400,
                                              lineHeight: "var(--Line-height-text-sm, 20px)",
                                              cursor: "pointer",
                                              appearance: "none",
                                              backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M4 6L8 10L12 6\" stroke=\"%23A4A7AE\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')",
                                              backgroundRepeat: "no-repeat",
                                              backgroundPosition: "right 8px center",
                                              paddingRight: "28px",
                                              outline: "none",
                                            }}
                                          >
                                            <option value="">Select</option>
                                            <option value="social_security">Social Security Card</option>
                                            <option value="birth_certificate">Certified Birth Certificate</option>
                                            <option value="employment_auth">Employment Authorization Document</option>
                                            <option value="citizen_card">Certificate of Naturalization</option>
                                            <option value="tribal_document">Native American Tribal Document</option>
                                          </select>
                                        </div>

                                        {/* Document B Form Grid */}
                                        <div
                                          style={{
                                            display: "grid",
                                            height: "132px",
                                            rowGap: "16px",
                                            columnGap: "16px",
                                            alignSelf: "stretch",
                                            gridTemplateRows: "repeat(2, fit-content(100%))",
                                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                          }}
                                        >
                                          {/* Issuing Authority */}
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              gap: "6px",
                                              flex: "1 0 0",
                                              alignSelf: "stretch",
                                              gridRow: "1 / span 1",
                                              gridColumn: "1 / span 1",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "2px",
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
                                                Issuing Authority
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
                                                >
                                                  <g clipPath="url(#clip0_doc_b_issuing_help)">
                                                    <path
                                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.33333"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_doc_b_issuing_help">
                                                      <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                            <input
                                              type="text"
                                              value={formData.listBCDocumentBIssuingAuthority || ""}
                                              onChange={(e) =>
                                                handleInputChange("listBCDocumentBIssuingAuthority", e.target.value)
                                              }
                                              style={{
                                                display: "flex",
                                                padding: "6px 8px",
                                                alignItems: "center",
                                                gap: "8px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                borderRadius: "8px",
                                                border: "1px solid #D5D7DA",
                                                background: "#FFF",
                                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                fontSize: "var(--Font-size-text-sm, 14px)",
                                                color: "var(--colors-text-text-secondary-700, #414651)",
                                                outline: "none",
                                              }}
                                            />
                                          </div>

                                          {/* Document Number */}
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              gap: "6px",
                                              flex: "1 0 0",
                                              alignSelf: "stretch",
                                              gridRow: "1 / span 1",
                                              gridColumn: "2 / span 1",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "2px",
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
                                                Document Number
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
                                                >
                                                  <g clipPath="url(#clip0_doc_b_number_help)">
                                                    <path
                                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.33333"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_doc_b_number_help">
                                                      <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                            <input
                                              type="text"
                                              value={formData.listBCDocumentBNumber || ""}
                                              onChange={(e) =>
                                                handleInputChange("listBCDocumentBNumber", e.target.value)
                                              }
                                              style={{
                                                display: "flex",
                                                padding: "6px 8px",
                                                alignItems: "center",
                                                gap: "8px",
                                                flex: "1 0 0",
                                                alignSelf: "stretch",
                                                borderRadius: "8px",
                                                border: "1px solid #D5D7DA",
                                                background: "#FFF",
                                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                fontSize: "var(--Font-size-text-sm, 14px)",
                                                color: "var(--colors-text-text-secondary-700, #414651)",
                                                outline: "none",
                                              }}
                                            />
                                          </div>

                                          {/* Expiration Date */}
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              gap: "6px",
                                              flex: "1 0 0",
                                              alignSelf: "stretch",
                                              gridRow: "2 / span 1",
                                              gridColumn: "1 / span 1",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "2px",
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
                                                Expiration Date
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
                                                >
                                                  <g clipPath="url(#clip0_doc_b_exp_help)">
                                                    <path
                                                      d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.33333"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_doc_b_exp_help">
                                                      <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                height: "32px",
                                                padding: "6px 8px",
                                                alignItems: "center",
                                                gap: "8px",
                                                alignSelf: "stretch",
                                                borderRadius: "8px",
                                                border: "1px solid #D5D7DA",
                                                background: "#FFF",
                                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                                  d="M14 6.66659H2M10.6667 1.33325V3.99992M5.33333 1.33325V3.99992M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4486C13.2843 14.2569 13.5903 13.9509 13.782 13.5746C14 13.1467 14 12.5867 14 11.4666V5.86659C14 4.74648 14 4.18643 13.782 3.7586C13.5903 3.38228 13.2843 3.07632 12.908 2.88457C12.4802 2.66659 11.9201 2.66659 10.8 2.66659H5.2C4.0799 2.66659 3.51984 2.66659 3.09202 2.88457C2.71569 3.07632 2.40973 3.38228 2.21799 3.7586C2 4.18643 2 4.74648 2 5.86659V11.4666C2 12.5867 2 13.1467 2.21799 13.5746C2.40973 13.9509 2.71569 14.2569 3.09202 14.4486C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                                                  stroke="#A4A7AE"
                                                  strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                              <input
                                                type="text"
                                                placeholder="00/00/00"
                                                value={formData.listBCDocumentBExpirationDate || ""}
                                                onChange={(e) =>
                                                  handleInputChange("listBCDocumentBExpirationDate", e.target.value)
                                                }
                                                style={{
                                                  flex: "1 0 0",
                                                  color: "#717680",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  fontStyle: "normal",
                                                  fontWeight: 400,
                                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                                  border: "none",
                                                  background: "transparent",
                                                  outline: "none",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Document B Preview Area */}
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "451px",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: "10px",
                                        }}
                                      >
                                        {formData.listBCDocumentBType === "social_security" ? (
                                          <div
                                            style={{
                                              display: "flex",
                                              padding: "12px 8px",
                                              flexDirection: "column",
                                              alignItems: "center",
                                              gap: "8px",
                                              alignSelf: "stretch",
                                              borderRadius: "8px",
                                              border: "1px solid #E9EAEB",
                                              background: "#FFF",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: "10px",
                                                alignSelf: "stretch",
                                              }}
                                            >
                                              <img
                                                src="https://api.builder.io/api/v1/image/assets/TEMP/8f50546c086f04743230d05fac1f6ef5a0513d19?width=870"
                                                alt="Social Security Card Sample"
                                                style={{
                                                  height: "285.65px",
                                                  alignSelf: "stretch",
                                                  aspectRatio: "233/153",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  alignSelf: "stretch",
                                                  color: "#535862",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  fontStyle: "normal",
                                                  fontWeight: 400,
                                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                                }}
                                              >
                                                *The Social Security Administration advises cardholders not to laminate Social Security cards. Some Social Security cards may explicitly state "not valid if laminated" on the back. If this is not indicated, you may accept a laminated card as long as the card reasonably appears to be genuine and to relate to the person presenting it. Metal or plastic reproductions of Social Security cards are not acceptable for Form I-9 purposes.
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "4px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                console.log("View example documents clicked");
                                              }}
                                            >
                                              <div
                                                style={{
                                                  color: "#273572",
                                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                                  fontStyle: "normal",
                                                  fontWeight: 600,
                                                  lineHeight: "var(--Line-height-text-sm, 20px)",
                                                  textDecoration: "underline",
                                                }}
                                              >
                                                Click image to view example document(s)
                                              </div>
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M14 14.6499L11.1 11.7499M7.33333 5.98324V9.98324M5.33333 7.98324H9.33333M12.6667 7.98324C12.6667 10.9288 10.2789 13.3166 7.33333 13.3166C4.38781 13.3166 2 10.9288 2 7.98324C2 5.03772 4.38781 2.6499 7.33333 2.6499C10.2789 2.6499 12.6667 5.03772 12.6667 7.98324Z"
                                                  stroke="#34479A"
                                                  strokeWidth="1.66667"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </div>
                                          </div>
                                        ) : (
                                          <div
                                            style={{
                                              display: "flex",
                                              height: "206px",
                                              flexDirection: "column",
                                              alignItems: "center",
                                              gap: "10px",
                                              alignSelf: "stretch",
                                              background: "transparent",
                                              borderRadius: "8px",
                                              justifyContent: "center",
                                              textAlign: "center",
                                            }}
                                          >
                                            {/* Empty document preview area for Document B */}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>


                        {/* Verification Method Options */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
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
                                <div
                                  onClick={() => handleInputChange("verificationMethod", "in_person")}
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    padding: "5px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    background: formData.verificationMethod === "in_person" ? "#344698" : "transparent",
                                    border: formData.verificationMethod === "in_person" ? "1px solid #344698" : "1px solid #D5D7DA",
                                    cursor: "pointer",
                                  }}
                                >
                                  {formData.verificationMethod === "in_person" && (
                                    <div
                                      style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "9999px",
                                        background: "#FFF",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
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
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleInputChange("verificationMethod", "in_person")}
                                >
                                  I will verify documents in person
                                </div>
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
                                <div
                                  onClick={() => handleInputChange("verificationMethod", "e_verify_remote")}
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    padding: "5px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    background: formData.verificationMethod === "e_verify_remote" ? "#344698" : "transparent",
                                    border: formData.verificationMethod === "e_verify_remote" ? "1px solid #344698" : "1px solid #D5D7DA",
                                    cursor: "pointer",
                                  }}
                                >
                                  {formData.verificationMethod === "e_verify_remote" && (
                                    <div
                                      style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "9999px",
                                        background: "#FFF",
                                      }}
                                    />
                                  )}
                                </div>
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
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleInputChange("verificationMethod", "e_verify_remote")}
                                >
                                  I will verify documents through a combination of E-Verify and remote video verification
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
        </div>
      </main>
    </div>
  );
};

export default I9FormCompletion;
