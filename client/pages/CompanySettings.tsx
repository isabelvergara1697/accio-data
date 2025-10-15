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

  // Administration Contact state
  const [firstName, setFirstName] = React.useState("Oliva");
  const [lastName, setLastName] = React.useState("Rhye");
  const [title, setTitle] = React.useState("HR Manager");
  const [city, setCity] = React.useState("Austin");
  const [state, setState] = React.useState("Alabama");
  const [telephone, setTelephone] = React.useState("Austin");
  const [fax, setFax] = React.useState("2849193");
  const [email, setEmail] = React.useState("olivia@acciodata.com");

  // General Settings state
  const [manualRescreening, setManualRescreening] = React.useState("12");
  const [minPasswordLength, setMinPasswordLength] = React.useState("6");
  const [maxPasswordExpiration, setMaxPasswordExpiration] = React.useState("15 Days");
  const [inactivityLogout, setInactivityLogout] = React.useState("60 Minutes");
  const [printFCRA, setPrintFCRA] = React.useState("60 Minutes");
  const [duplicateOrderCheck1, setDuplicateOrderCheck1] = React.useState("60 Minutes");
  const [duplicateOrderCheck2, setDuplicateOrderCheck2] = React.useState("No Check");
  const [sendHitsEmail, setSendHitsEmail] = React.useState("olivia@acciodata.com");

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
            padding: isMobile ? "0 16px 24px" : "0 32px 32px",
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
              padding: isMobile ? "0 0" : "0 0",
              gap: isMobile ? "16px" : "20px",
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
              Company settings
            </h1>

            <HorizontalTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId as CompanyTabType)}
              size="sm"
              fullWidth={false}
              type="button-border"
            />
          </div>

          {activeTab === "company" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {/* Administration Contact Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
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
                    Administration Contact
                  </h2>
                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
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
                    Main point of contact of your companuy
                  </p>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
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
                      Name
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      alignItems: "flex-start",
                      gap: "24px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{ ...inputStyle, flex: "1 0 0" }}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{ ...inputStyle, flex: "1 0 0" }}
                    />
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Title
                    </label>
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      City
                    </label>
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      State
                    </label>
                  </div>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="Alabama">Alabama</option>
                    <option value="Texas">Texas</option>
                    <option value="California">California</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Telephone
                    </label>
                  </div>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Fax
                    </label>
                  </div>
                  <input
                    type="text"
                    value={fax}
                    onChange={(e) => setFax(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  />
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Email
                    </label>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div style={{ height: "1px", width: "100%", background: "#E9EAEB" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "12px",
                        flex: "1 0 0",
                      }}
                    >
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
                      <button
                        type="button"
                        style={{
                          display: "flex",
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
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Settings Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
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
                    General Settings
                  </h2>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Manual rescreening interval (months)
                    </label>
                  </div>
                  <input
                    type="text"
                    value={manualRescreening}
                    onChange={(e) => setManualRescreening(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Minimum Password Length
                    </label>
                  </div>
                  <select
                    value={minPasswordLength}
                    onChange={(e) => setMinPasswordLength(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Maximum Password Expiration
                    </label>
                  </div>
                  <select
                    value={maxPasswordExpiration}
                    onChange={(e) => setMaxPasswordExpiration(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Inactivity Logout
                    </label>
                  </div>
                  <select
                    value={inactivityLogout}
                    onChange={(e) => setInactivityLogout(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="60 Minutes">60 Minutes</option>
                    <option value="120 Minutes">120 Minutes</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Print FCRA Rights on Report
                    </label>
                  </div>
                  <select
                    value={printFCRA}
                    onChange={(e) => setPrintFCRA(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="60 Minutes">60 Minutes</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Duplicate Order Check
                    </label>
                  </div>
                  <select
                    value={duplicateOrderCheck1}
                    onChange={(e) => setDuplicateOrderCheck1(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="60 Minutes">60 Minutes</option>
                    <option value="120 Minutes">120 Minutes</option>
                  </select>
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Duplicate Order Check
                    </label>
                  </div>
                  <select
                    value={duplicateOrderCheck2}
                    onChange={(e) => setDuplicateOrderCheck2(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="No Check">No Check</option>
                    <option value="Check">Check</option>
                  </select>
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Send Hits E-mail
                    </label>
                  </div>
                  <input
                    type="email"
                    value={sendHitsEmail}
                    onChange={(e) => setSendHitsEmail(e.target.value)}
                    style={{
                      ...inputStyle,
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      flex: isMobile ? "1 0 100%" : "1 0 0",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div style={{ height: "1px", width: "100%", background: "#E9EAEB" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "12px",
                        flex: "1 0 0",
                      }}
                    >
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
                      <button
                        type="button"
                        style={{
                          display: "flex",
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
                        Update
                      </button>
                    </div>
                  </div>
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
