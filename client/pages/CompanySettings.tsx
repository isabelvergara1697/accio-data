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
  const [isTablet, setIsTablet] = React.useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const width = window.innerWidth;
    return width >= 768 && width < 1024;
  });
  const isDesktop = !isMobile && !isTablet;
  const headerHeight = isDesktop ? 72 : 64;

  const [activeTab, setActiveTab] = React.useState<CompanyTabType>("company");
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [userMenuHovered, setUserMenuHovered] = React.useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewport = () => {
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

  // SAML Integration state
  const [samlIdpValue, setSamlIdpValue] = React.useState("Value to give to your IdP");
  const [samlAcsUrl, setSamlAcsUrl] = React.useState("https://demoh.acciodata.com/c/p/saml?account=flatirons");
  const [samlSpEntityId, setSamlSpEntityId] = React.useState("https://demoh.acciodata.com/c/p/saml_logout?account=flatirons");
  const [samlEnableAuth, setSamlEnableAuth] = React.useState("Disable SAML Single Signon for this account");
  const [samlUseMappedUsernames, setSamlUseMappedUsernames] = React.useState("No");
  const [samlSsoUrl, setSamlSsoUrl] = React.useState("");
  const [samlIdpCertificate, setSamlIdpCertificate] = React.useState("");
  const [samlIdpIssuer, setSamlIdpIssuer] = React.useState("");
  const [samlEmailAttribute, setSamlEmailAttribute] = React.useState("");
  const [samlPrivateKey, setSamlPrivateKey] = React.useState("");
  const [samlAccioCertificate, setSamlAccioCertificate] = React.useState("");

  const inputStyle = {
    width: "100%",
    maxWidth: "100%",
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
    minWidth: 0,
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

      {!isDesktop && (
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
            padding: isMobile ? "24px 16px 24px" : "32px 32px 32px",
            gap: isMobile ? "20px" : "24px",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
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
              Account Settings
            </h1>

            <HorizontalTabs
              tabs={tabs}
              currentTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId as CompanyTabType)}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </div>

          {activeTab === "company" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
                maxWidth: "100%",
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Administration Contact Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
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
                    Main point of contact of your company
                  </p>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: "flex-start",
                      gap: isMobile ? "12px" : "24px",
                      width: "100%",
                      maxWidth: isMobile ? "100%" : "512px",
                      boxSizing: "border-box" as const,
                    }}
                  >
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{ ...inputStyle, flex: isMobile ? "unset" : "1 0 0" }}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{ ...inputStyle, flex: isMobile ? "unset" : "1 0 0" }}
                    />
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  />
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: isMobile ? "flex-start" : "flex-end",
                      alignItems: isMobile ? "stretch" : "center",
                      gap: isMobile ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: isMobile ? "flex-start" : "flex-end",
                        alignItems: "center",
                        gap: isMobile ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isMobile ? "100%" : "auto",
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
                          width: isMobile ? "100%" : "auto",
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
                          width: isMobile ? "100%" : "auto",
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
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
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
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      maxWidth: isMobile ? "100%" : "512px",
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
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: isMobile ? "flex-start" : "flex-end",
                      alignItems: isMobile ? "stretch" : "center",
                      gap: isMobile ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: isMobile ? "flex-start" : "flex-end",
                        alignItems: "center",
                        gap: isMobile ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isMobile ? "100%" : "auto",
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
                          width: isMobile ? "100%" : "auto",
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
                          width: isMobile ? "100%" : "auto",
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
                width: "100%",
                maxWidth: "100%",
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* SAML 2.0 Integration Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
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
                    SAML 2.0 (Single Signon) Integration Settings
                  </h2>
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Use this form to configure and enable single signon through the SAML 2.0 protocol.
                    NOTE: Once you have enabled SAML authentication, if you do not have a bypass user, and the SAML authentication fails,
                    you will be locked out of your account. Make sure you have at least one user on your account with SAML bypass enabled
                    before turning on SAML authentication. If you wish to give a particular user the ability to bypass SAML authentication,
                    change their 'User May Bypass SAML Authentication' setting to 'Yes'.
                  </p>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Setting for Your IdP */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      Setting for Your IdP
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      width: "100%",
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      {samlIdpValue}
                    </div>
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        padding: "12px",
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* ACS URL */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      ACS URL (Your SP SSO URL)
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      width: "100%",
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {samlAcsUrl}
                    </div>
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        padding: "12px",
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SP Entity Id */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SP Entity Id (Audience Restriction)
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      width: "100%",
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {samlSpEntityId}
                    </div>
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        padding: "12px",
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Another SP Entity Id field */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SP Entity Id (Audience Restriction)
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      width: "100%",
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {samlSpEntityId}
                    </div>
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        padding: "12px",
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Enable SAML Authentication */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      Enable SAML Authentication
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                        <path d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </label>
                  </div>
                  <select
                    value={samlEnableAuth}
                    onChange={(e) => setSamlEnableAuth(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isMobile ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="Disable SAML Single Signon for this account">Disable SAML Single Signon for this account</option>
                    <option value="Enable SAML Single Signon for this account">Enable SAML Single Signon for this account</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Use Mapped Usernames */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SAML Use Mapped Usernames
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                        <path d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </label>
                  </div>
                  <select
                    value={samlUseMappedUsernames}
                    onChange={(e) => setSamlUseMappedUsernames(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isMobile ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML SSO URL */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SAML SSO URL
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                        <path d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={samlSsoUrl}
                    onChange={(e) => setSamlSsoUrl(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML IdP Certificate */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SAML IdP Certificate
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                        <path d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </label>
                  </div>
                  <textarea
                    value={samlIdpCertificate}
                    onChange={(e) => setSamlIdpCertificate(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isMobile ? "100%" : "512px",
                      minHeight: "154px",
                      resize: "vertical",
                      padding: "12px 14px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Idp Issuer */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SAML Idp Issuer
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                        <path d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={samlIdpIssuer}
                    onChange={(e) => setSamlIdpIssuer(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Email Attribute */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SAML Email Attribute
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                        <path d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={samlEmailAttribute}
                    onChange={(e) => setSamlEmailAttribute(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isMobile ? "100%" : "512px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Private Key */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SAML Private Key
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                        <path d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </label>
                  </div>
                  <textarea
                    value={samlPrivateKey}
                    onChange={(e) => setSamlPrivateKey(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isMobile ? "100%" : "512px",
                      minHeight: "154px",
                      resize: "vertical",
                      padding: "12px 14px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Accio Certificate */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "flex-start",
                    gap: isMobile ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "280px",
                      flex: isMobile ? "0 0 auto" : "1 0 0",
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
                      SAML Accio Certificate
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                        <path d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </label>
                  </div>
                  <textarea
                    value={samlAccioCertificate}
                    onChange={(e) => setSamlAccioCertificate(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isMobile ? "100%" : "512px",
                      minHeight: "154px",
                      resize: "vertical",
                      padding: "12px 14px",
                    }}
                  />
                </div>

                {/* Footer with Cancel and Update buttons */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <div style={{ height: "1px", width: "100%", background: "#E9EAEB" }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: isMobile ? "flex-start" : "flex-end",
                      alignItems: isMobile ? "stretch" : "center",
                      gap: isMobile ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: isMobile ? "flex-start" : "flex-end",
                        alignItems: "center",
                        gap: isMobile ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isMobile ? "100%" : "auto",
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
                          width: isMobile ? "100%" : "auto",
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
                          width: isMobile ? "100%" : "auto",
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
