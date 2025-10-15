import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { HorizontalTabs } from "../components/HorizontalTabs";
import { useIsMobile } from "../hooks/use-mobile";

type CompanyTabType =
  | "company"
  | "saml"
  | "team"
  | "termination"
  | "adjudication"
  | "resources"
  | "invoices"
  | "audit"
  | "customization";

export default function CompanySettings() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;
  const headerHeight = isDesktop ? 72 : 64;

  const [isTablet, setIsTablet] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<CompanyTabType>("company");
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [userMenuHovered, setUserMenuHovered] = React.useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      } as const;
    }
    return {};
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  const tabs = React.useMemo(
    () => [
      { id: "company" as CompanyTabType, label: "Company" },
      { id: "saml" as CompanyTabType, label: "SAML Integration" },
      { id: "team" as CompanyTabType, label: "Team & Permissions" },
      { id: "termination" as CompanyTabType, label: "Termination Dates" },
      { id: "adjudication" as CompanyTabType, label: "Adjudication Emails" },
      { id: "resources" as CompanyTabType, label: "Resources" },
      { id: "invoices" as CompanyTabType, label: "Invoices" },
      { id: "audit" as CompanyTabType, label: "Audit Logs" },
      { id: "customization" as CompanyTabType, label: "Customization" },
    ],
    [],
  );

  const [companyName, setCompanyName] = React.useState("Accio Data Inc.");
  const [legalName, setLegalName] = React.useState("Accio Data Incorporated");
  const [companyDescription, setCompanyDescription] = React.useState(
    "Leading background screening platform enabling compliant hiring workflows.",
  );
  const [companyWebsite, setCompanyWebsite] = React.useState("https://www.acciodata.com");
  const [supportEmail, setSupportEmail] = React.useState("support@acciodata.com");
  const [supportPhone, setSupportPhone] = React.useState("(512) 555-0198");
  const [hqAddress, setHqAddress] = React.useState("1234 Compliance Street");
  const [hqCity, setHqCity] = React.useState("Austin");
  const [hqState, setHqState] = React.useState("TX");
  const [hqZip, setHqZip] = React.useState("78701");
  const [preferredTimezone, setPreferredTimezone] = React.useState("Central Time (CT)");
  const [billingContactName, setBillingContactName] = React.useState("Morgan Rivera");
  const [billingContactEmail, setBillingContactEmail] = React.useState("billing@acciodata.com");
  const [billingContactPhone, setBillingContactPhone] = React.useState("(512) 555-0456");
  const [brandPrimaryColor, setBrandPrimaryColor] = React.useState("#344698");
  const [brandSecondaryColor, setBrandSecondaryColor] = React.useState("#ECEEF9");

  const renderSectionHeader = (title: string, description?: string) => (
    <div>
      <h2
        style={{
          color: "#181D27",
          fontFamily: "Public Sans",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "28px",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            color: "#535862",
            textOverflow: "ellipsis",
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            margin: "2px 0 0 0",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );

  const renderLabel = (text: string, required?: boolean) => (
    <label
      style={{
        color: "#414651",
        fontFamily: "Public Sans",
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "20px",
        display: "flex",
        alignItems: "center",
        gap: "2px",
      }}
    >
      {text}
      {required && <span style={{ color: "#344698" }}>*</span>}
    </label>
  );

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #D5D7DA",
    background: "#FFF",
    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
    color: "#181D27",
    fontFamily: "Public Sans",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
      }}
    >
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
        />
      )}

      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="company-settings"
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {isMobile && (
        <MobileHeader
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          showMobileUserMenu={showMobileUserMenu}
          setShowMobileUserMenu={setShowMobileUserMenu}
          handleSignOut={handleSignOut}
          currentPage="company-settings"
        />
      )}

      <main
        style={{
          marginTop: `${headerHeight}px`,
          marginLeft: isDesktop ? (isCollapsed ? "80px" : "296px") : "0",
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          boxSizing: "border-box",
        }}
      >
        {isDesktop && (
          <Header
            isDesktop={isDesktop}
            isMobile={isMobile}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            sidebarCollapsed={isCollapsed}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: isMobile ? "16px" : "32px",
            gap: isMobile ? "20px" : "32px",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : "24px",
            }}
          >
            <h1
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 600,
                lineHeight: isMobile ? "28px" : "32px",
                margin: 0,
              }}
            >
              Company Settings
            </h1>
          </div>

          <HorizontalTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as CompanyTabType)}
            size="sm"
            fullWidth={false}
            type="button-border"
          />

          {activeTab === "company" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {renderSectionHeader(
                "Company profile",
                "Share the core information that appears on invoices, reports, and client communications.",
              )}
              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Company name", true)}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                  }}
                >
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Legal entity name", true)}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                  }}
                >
                  <input
                    type="text"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Company description")}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                  }}
                >
                  <textarea
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    style={{
                      ...inputStyle,
                      minHeight: "96px",
                      resize: "vertical",
                    }}
                  />
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    Share a concise summary that appears for internal teammates.
                  </p>
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Website")}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                  }}
                >
                  <input
                    type="url"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                {!isMobile && (
                  <button
                    type="button"
                    style={{
                      display: "flex",
                      padding: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow:
                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  style={{
                    display: "flex",
                    flex: isMobile ? "1 0 0" : "none",
                    padding: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: "#344698",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    cursor: "pointer",
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {renderSectionHeader(
                "Primary contacts",
                "Update the people who should receive account notifications and billing information.",
              )}
              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Support email", true)}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                  }}
                >
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    style={inputStyle}
                  />
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    We'll use this for system alerts and escalations.
                  </p>
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Support phone")}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                  }}
                >
                  <input
                    type="tel"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Billing contact", true)}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <input
                    type="text"
                    value={billingContactName}
                    onChange={(e) => setBillingContactName(e.target.value)}
                    style={inputStyle}
                    placeholder="Full name"
                  />
                  <input
                    type="email"
                    value={billingContactEmail}
                    onChange={(e) => setBillingContactEmail(e.target.value)}
                    style={inputStyle}
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={billingContactPhone}
                    onChange={(e) => setBillingContactPhone(e.target.value)}
                    style={inputStyle}
                    placeholder="Phone"
                  />
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                {!isMobile && (
                  <button
                    type="button"
                    style={{
                      display: "flex",
                      padding: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow:
                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  style={{
                    display: "flex",
                    flex: isMobile ? "1 0 0" : "none",
                    padding: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: "#344698",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    cursor: "pointer",
                  }}
                >
                  Save contacts
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {renderSectionHeader(
                "Branding & locale",
                "Customize how your company appears in notifications and determine default localization preferences.",
              )}
              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Primary brand color")}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <input
                    type="color"
                    value={brandPrimaryColor}
                    onChange={(e) => setBrandPrimaryColor(e.target.value)}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  />
                  <input
                    type="text"
                    value={brandPrimaryColor}
                    onChange={(e) => setBrandPrimaryColor(e.target.value)}
                    style={{
                      ...inputStyle,
                      flex: "1 0 0",
                    }}
                  />
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Secondary brand color")}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <input
                    type="color"
                    value={brandSecondaryColor}
                    onChange={(e) => setBrandSecondaryColor(e.target.value)}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  />
                  <input
                    type="text"
                    value={brandSecondaryColor}
                    onChange={(e) => setBrandSecondaryColor(e.target.value)}
                    style={{
                      ...inputStyle,
                      flex: "1 0 0",
                    }}
                  />
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "16px" : "32px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile ? "auto" : "200px",
                    maxWidth: isMobile ? "auto" : "280px",
                    flex: isMobile ? "none" : "1 0 0",
                  }}
                >
                  {renderLabel("Default timezone", true)}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    minWidth: isMobile ? "auto" : "480px",
                    maxWidth: isMobile ? "auto" : "512px",
                  }}
                >
                  <select
                    value={preferredTimezone}
                    onChange={(e) => setPreferredTimezone(e.target.value)}
                    style={{
                      ...inputStyle,
                      appearance: "none",
                    }}
                  >
                    <option value="Central Time (CT)">Central Time (CT)</option>
                    <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                    <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                    <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                  </select>
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                {!isMobile && (
                  <button
                    type="button"
                    style={{
                      display: "flex",
                      padding: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow:
                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  style={{
                    display: "flex",
                    flex: isMobile ? "1 0 0" : "none",
                    padding: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: "#344698",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    cursor: "pointer",
                  }}
                >
                  Save branding
                </button>
              </div>
            </div>
          </div>
          )}

          {activeTab === "saml" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                SAML Integration content coming soon...
              </p>
            </div>
          )}

          {activeTab === "team" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                Team & Permissions content coming soon...
              </p>
            </div>
          )}

          {activeTab === "termination" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                Termination Dates content coming soon...
              </p>
            </div>
          )}

          {activeTab === "adjudication" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                Adjudication Emails content coming soon...
              </p>
            </div>
          )}

          {activeTab === "resources" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                Resources content coming soon...
              </p>
            </div>
          )}

          {activeTab === "invoices" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                Invoices content coming soon...
              </p>
            </div>
          )}

          {activeTab === "audit" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                Audit Logs content coming soon...
              </p>
            </div>
          )}

          {activeTab === "customization" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                Customization content coming soon...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
