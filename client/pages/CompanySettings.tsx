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
  const isCompactLayout = isMobile || isTablet;
  const headerHeight = isDesktop ? 72 : 64;

  const [activeTab, setActiveTab] = React.useState<CompanyTabType>("company");
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [userMenuHovered, setUserMenuHovered] = React.useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = React.useState<
    number | null
  >(null);
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(
    null,
  );

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

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownIndex !== null) {
        const target = event.target as HTMLElement;
        if (
          !target.closest("[data-dropdown-menu]") &&
          !target.closest("button")
        ) {
          setOpenDropdownIndex(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIndex]);

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
  const [maxPasswordExpiration, setMaxPasswordExpiration] =
    React.useState("15 Days");
  const [inactivityLogout, setInactivityLogout] = React.useState("60 Minutes");
  const [printFCRA, setPrintFCRA] = React.useState("60 Minutes");
  const [duplicateOrderCheck1, setDuplicateOrderCheck1] =
    React.useState("60 Minutes");
  const [duplicateOrderCheck2, setDuplicateOrderCheck2] =
    React.useState("No Check");
  const [sendHitsEmail, setSendHitsEmail] = React.useState(
    "olivia@acciodata.com",
  );

  // SAML Integration state
  const [samlIdpValue, setSamlIdpValue] = React.useState(
    "Value to give to your IdP",
  );
  const [samlAcsUrl, setSamlAcsUrl] = React.useState(
    "https://demoh.acciodata.com/c/p/saml?account=flatirons",
  );
  const [samlSpEntityId, setSamlSpEntityId] = React.useState(
    "https://demoh.acciodata.com/c/p/saml_logout?account=flatirons",
  );
  const [samlEnableAuth, setSamlEnableAuth] = React.useState(
    "Disable SAML Single Signon for this account",
  );
  const [samlUseMappedUsernames, setSamlUseMappedUsernames] =
    React.useState("No");
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
            boxSizing: "border-box",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      flexDirection: isCompactLayout ? "column" : "row",
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
                      style={{
                        ...inputStyle,
                        flex: isMobile ? "unset" : "1 0 0",
                      }}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        ...inputStyle,
                        flex: isMobile ? "unset" : "1 0 0",
                      }}
                    />
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                  <div
                    style={{
                      height: "1px",
                      width: "100%",
                      background: "#E9EAEB",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      justifyContent: isMobile ? "flex-start" : "flex-end",
                      alignItems: isMobile ? "stretch" : "center",
                      gap: isMobile ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        justifyContent: isMobile ? "flex-start" : "flex-end",
                        alignItems: "center",
                        gap: isMobile ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isCompactLayout ? "100%" : "auto",
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
                          width: isCompactLayout ? "100%" : "auto",
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
                          width: isCompactLayout ? "100%" : "auto",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                  <div
                    style={{
                      height: "1px",
                      width: "100%",
                      background: "#E9EAEB",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      justifyContent: isMobile ? "flex-start" : "flex-end",
                      alignItems: isMobile ? "stretch" : "center",
                      gap: isMobile ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        justifyContent: isMobile ? "flex-start" : "flex-end",
                        alignItems: "center",
                        gap: isMobile ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isCompactLayout ? "100%" : "auto",
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
                          width: isCompactLayout ? "100%" : "auto",
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
                          width: isCompactLayout ? "100%" : "auto",
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
                    Use this form to configure and enable single signon through
                    the SAML 2.0 protocol. NOTE: Once you have enabled SAML
                    authentication, if you do not have a bypass user, and the
                    SAML authentication fails, you will be locked out of your
                    account. Make sure you have at least one user on your
                    account with SAML bypass enabled before turning on SAML
                    authentication. If you wish to give a particular user the
                    ability to bypass SAML authentication, change their 'User
                    May Bypass SAML Authentication' setting to 'Yes'.
                  </p>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Setting for Your IdP */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* ACS URL */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SP Entity Id */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Another SP Entity Id field */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Enable SAML Authentication */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                    <option value="Disable SAML Single Signon for this account">
                      Disable SAML Single Signon for this account
                    </option>
                    <option value="Enable SAML Single Signon for this account">
                      Enable SAML Single Signon for this account
                    </option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Use Mapped Usernames */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                  <div
                    style={{
                      height: "1px",
                      width: "100%",
                      background: "#E9EAEB",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      justifyContent: isMobile ? "flex-start" : "flex-end",
                      alignItems: isMobile ? "stretch" : "center",
                      gap: isMobile ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        justifyContent: isMobile ? "flex-start" : "flex-end",
                        alignItems: "center",
                        gap: isMobile ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isCompactLayout ? "100%" : "auto",
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
                          width: isCompactLayout ? "100%" : "auto",
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
                          width: isCompactLayout ? "100%" : "auto",
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
                width: "100%",
                maxWidth: "100%",
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Team & Permissions Section */}
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
                    Team & Permissions
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
                    Invite new users, assign roles, and customize permissions to
                    control what each team member can access or do within the
                    platform.
                  </p>
                </div>

                {/* Sub-tabs for Members and Role Permissions */}
                <div
                  style={{
                    display: "flex",
                    padding: "4px",
                    alignItems: "center",
                    gap: "8px",
                    width: isCompactLayout ? "100%" : "auto",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxSizing: "border-box",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      height: "36px",
                      padding: "8px 12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "6px",
                      border: "1px solid #B3BCE5",
                      background: "#ECEEF9",
                      color: "#273572",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Members
                  </button>
                  <button
                    style={{
                      display: "flex",
                      height: "36px",
                      padding: "8px 12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "6px",
                      border: "none",
                      background: "transparent",
                      color: "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Role Permissions
                  </button>
                </div>

                {/* Members Table Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    overflow: "hidden",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Table Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      padding: "16px",
                      gap: "16px",
                      width: "100%",
                      boxSizing: "border-box",
                      borderBottom: "1px solid #E9EAEB",
                    }}
                  >
                    <div
                      style={{
                        flex: "1 0 0",
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "18px",
                        fontWeight: 600,
                        lineHeight: "28px",
                      }}
                    >
                      Members
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        alignItems: isMobile ? "stretch" : "center",
                        gap: "12px",
                        width: isCompactLayout ? "100%" : "auto",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Search by users or by roles"
                        style={{
                          display: "flex",
                          height: "40px",
                          padding: "8px",
                          alignItems: "center",
                          gap: "8px",
                          width: isMobile ? "100%" : "234px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
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
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Filters
                      </button>
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
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Download
                      </button>
                      <button
                        onClick={() => navigate("/invite-new-member")}
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
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Invite New Member
                      </button>
                    </div>
                  </div>

                  {/* Table Content - Responsive */}
                  <div
                    style={{
                      width: "100%",
                      overflowX: isMobile ? "auto" : "visible",
                      boxSizing: "border-box",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        minWidth: isMobile ? "800px" : "100%",
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid #E9EAEB",
                            background: "#FFF",
                          }}
                        >
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Name
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66669 10.0001L8.00002 13.3334L11.3334 10.0001M4.66669 6.00008L8.00002 2.66675L11.3334 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Email
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66669 10.0001L8.00002 13.3334L11.3334 10.0001M4.66669 6.00008L8.00002 2.66675L11.3334 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Role
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66669 10.0001L8.00002 13.3334L11.3334 10.0001M4.66669 6.00008L8.00002 2.66675L11.3334 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Department
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66669 10.0001L8.00002 13.3334L11.3334 10.0001M4.66669 6.00008L8.00002 2.66675L11.3334 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Last Active/ Invited
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66667 10.0001L8 13.3334L11.3333 10.0001M4.66667 6.00008L8 2.66675L11.3333 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Status
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66666 10.0001L8 13.3334L11.3333 10.0001M4.66666 6.00008L8 2.66675L11.3333 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Actions
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66667 10.0001L8 13.3334L11.3333 10.0001M4.66667 6.00008L8 2.66675L11.3333 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Lucas Hernandez",
                            email: "admin@acciodata.com",
                            role: "Editor",
                            department: "Finance",
                            lastActive: "Feb 22, 2025, 08:10 PM",
                            status: "Inactive",
                          },
                          {
                            name: "Isabella Rodriguez",
                            email: "support@acciodata.com",
                            role: "Editor",
                            department: "Human Resources",
                            lastActive: "Mar 10, 2025, 09:30 AM",
                            status: "Active",
                          },
                          {
                            name: "Mason Martinez",
                            email: "sso@acciodata.com",
                            role: "Orders Only",
                            department: "Talent Acquisition",
                            lastActive: "Invited Jan 10, 2025",
                            status: "Pending",
                          },
                          {
                            name: "Emma Johnson",
                            email: "deactivate@acciodata.com",
                            role: "Admin",
                            department: "Accounting",
                            lastActive: "May 18, 2025, 11:45 AM",
                            status: "Active",
                          },
                          {
                            name: "Noah Davis",
                            email: "security@acciodata.com",
                            role: "Orders Only",
                            department: "Customer Support",
                            lastActive: "Jun 30, 2025, 03:00 PM",
                            status: "Inactive",
                          },
                          {
                            name: "Liam Smith",
                            email: "newdevice@acciodata.com",
                            role: "Admin",
                            department: "Recruitment",
                            lastActive: "Invited Jan 10, 2025",
                            status: "Pending",
                          },
                          {
                            name: "Ethan Miller",
                            email: "alerts@acciodata.com",
                            role: "Admin",
                            department: "Employee Relations",
                            lastActive: "Aug 25, 2025, 01:30 PM",
                            status: "Inactive",
                          },
                          {
                            name: "Olivia Brown",
                            email: "export@acciodata.com",
                            role: "Orders Only",
                            department: "Training and Development",
                            lastActive: "Sep 14, 2025, 04:00 PM",
                            status: "Active",
                          },
                          {
                            name: "Sophia Garcia",
                            email: "timeout@acciodata.com",
                            role: "Editor",
                            department: "Payroll",
                            lastActive: "Oct 29, 2025, 12:00 PM",
                            status: "Active",
                          },
                          {
                            name: "Ava Wilson",
                            email: "settings@acciodata.com",
                            role: "Editor",
                            department: "Workplace Culture",
                            lastActive: "Nov 11, 2025, 05:15 PM",
                            status: "Active",
                          },
                        ].map((member, index) => (
                          <tr
                            key={index}
                            onMouseEnter={() => setHoveredRowIndex(index)}
                            onMouseLeave={() => setHoveredRowIndex(null)}
                            style={{
                              borderBottom: "1px solid #E9EAEB",
                              background:
                                hoveredRowIndex === index
                                  ? "#F5F5F5"
                                  : "transparent",
                              transition: "background-color 0.15s ease",
                            }}
                          >
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.name}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.email}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.role}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.department}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.lastActive}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border:
                                    member.status === "Active"
                                      ? "1px solid #ABEFC6"
                                      : member.status === "Pending"
                                        ? "1px solid #B2DDFF"
                                        : "1px solid #E9EAEB",
                                  background:
                                    member.status === "Active"
                                      ? "#ECFDF3"
                                      : member.status === "Pending"
                                        ? "#EFF8FF"
                                        : "#FAFAFA",
                                  color:
                                    member.status === "Active"
                                      ? "#067647"
                                      : member.status === "Pending"
                                        ? "#175CD3"
                                        : "#414651",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {member.status}
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                textAlign: "center",
                                position: "relative",
                              }}
                            >
                              <button
                                onClick={() =>
                                  setOpenDropdownIndex(
                                    openDropdownIndex === index ? null : index,
                                  )
                                }
                                style={{
                                  display: "inline-flex",
                                  padding: "8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border: "none",
                                  background:
                                    hoveredRowIndex === index
                                      ? "#FDFDFD"
                                      : "transparent",
                                  cursor: "pointer",
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
                                    d="M8 8.66675C8.36819 8.66675 8.66667 8.36827 8.66667 8.00008C8.66667 7.63189 8.36819 7.33341 8 7.33341C7.63181 7.33341 7.33333 7.63189 7.33333 8.00008C7.33333 8.36827 7.63181 8.66675 8 8.66675Z"
                                    stroke="#717680"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 4.00008C8.36819 4.00008 8.66667 3.7016 8.66667 3.33341C8.66667 2.96522 8.36819 2.66675 8 2.66675C7.63181 2.66675 7.33333 2.96522 7.33333 3.33341C7.33333 3.7016 7.63181 4.00008 8 4.00008Z"
                                    stroke="#717680"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 13.3334C8.36819 13.3334 8.66667 13.0349 8.66667 12.6667C8.66667 12.2986 8.36819 12.0001 8 12.0001C7.63181 12.0001 7.33333 12.2986 7.33333 12.6667C7.33333 13.0349 7.63181 13.3334 8 13.3334Z"
                                    stroke="#717680"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                              {openDropdownIndex === index && (
                                <div
                                  data-dropdown-menu
                                  style={{
                                    position: "absolute",
                                    right: "20px",
                                    top: "50px",
                                    zIndex: 1000,
                                    borderRadius: "8px",
                                    border: "1px solid rgba(0, 0, 0, 0.08)",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "4px 0",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      onClick={() => {
                                        console.log("Edit Member", member.name);
                                        setOpenDropdownIndex(null);
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                          "#F9FAFB")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                          "transparent")
                                      }
                                      style={{
                                        display: "flex",
                                        padding: "8px 12px",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        transition: "background 0.15s ease",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M2.87604 18.1157C2.92198 17.7022 2.94496 17.4955 3.00751 17.3022C3.06301 17.1308 3.14143 16.9676 3.24064 16.8172C3.35246 16.6476 3.49955 16.5005 3.79373 16.2063L17 3.00006C18.1046 1.89549 19.8955 1.89549 21 3.00006C22.1046 4.10463 22.1046 5.89549 21 7.00006L7.79373 20.2063C7.49955 20.5005 7.35245 20.6476 7.18289 20.7594C7.03245 20.8586 6.86929 20.937 6.69785 20.9925C6.5046 21.0551 6.29786 21.0781 5.88437 21.124L2.5 21.5001L2.87604 18.1157Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div
                                          style={{
                                            color: "#181D27",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Edit Member
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      onClick={() => {
                                        console.log(
                                          "Resent Invite",
                                          member.name,
                                        );
                                        setOpenDropdownIndex(null);
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                          "#F9FAFB")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                          "transparent")
                                      }
                                      style={{
                                        display: "flex",
                                        padding: "8px 12px",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        transition: "background 0.15s ease",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div
                                          style={{
                                            color: "#181D27",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Resent Invite
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      onClick={() => {
                                        console.log(
                                          "Remove Users",
                                          member.name,
                                        );
                                        setOpenDropdownIndex(null);
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                          "#F9FAFB")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                          "transparent")
                                      }
                                      style={{
                                        display: "flex",
                                        padding: "8px 12px",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        transition: "background 0.15s ease",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div
                                          style={{
                                            color: "#181D27",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Remove Users
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      padding: "12px 16px",
                      justifyContent: isMobile ? "center" : "space-between",
                      alignItems: "center",
                      width: "100%",
                      borderTop: "1px solid #E9EAEB",
                      gap: isMobile ? "12px" : "0",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        minWidth: isMobile ? "auto" : "150px",
                      }}
                    >
                      Showing [X] of [X]
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        alignItems: "center",
                        gap: "12px",
                        justifyContent: "center",
                        flex: isMobile ? "0" : "1",
                      }}
                    >
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
                          ←
                        </button>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <div
                            style={{
                              display: "flex",
                              width: "32px",
                              height: "32px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #E9EAEB",
                              background: "#F5F5F5",
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            1
                          </div>
                          {[2, 3, "...", 8, 9, 10].map((page, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                width: "32px",
                                height: "32px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                cursor: page === "..." ? "default" : "pointer",
                              }}
                            >
                              {page}
                            </div>
                          ))}
                        </div>
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
                          →
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Go to
                        </span>
                        <input
                          type="text"
                          defaultValue="1010"
                          style={{
                            display: "flex",
                            height: "32px",
                            width: "72px",
                            padding: "6px 8px",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            color: "#717680",
                            textAlign: "center",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
