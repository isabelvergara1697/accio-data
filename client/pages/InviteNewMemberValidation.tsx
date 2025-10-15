import { useEffect, useMemo, useState, CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { useIsMobile } from "../hooks/use-mobile";
import { ChevronRight, Home } from "lucide-react";

interface InviteMemberFormData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  telephone: string;
  fax: string;
  secondaryEmail: string;
  zip: string;
  address: string;
  state: string;
  city: string;
  reportVisibility: string;
  icimsCustomerId: string;
  icimsUserId: string;
  icimsUserName: string;
  icimsPassword: string;
}

interface TeamMember {
  id: number;
  name: string;
}

interface InviteValidationState {
  formData: InviteMemberFormData;
  passwordOption: "auto" | "manual";
  password: string;
  selectedTeamMembers: TeamMember[];
  adjudicationSelections: string[];
  reportViewOption: "own" | "any" | "select";
}

const INFO_CARD_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #E9EAEB",
  background: "#FFF",
  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
};

export default function InviteNewMemberValidation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as InviteValidationState | undefined;
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const width = window.innerWidth;
    return width >= 768 && width < 1024;
  });
  const isDesktop = !isMobile && !isTablet;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewport = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!state) {
      navigate("/invite-new-member", { replace: true });
    }
  }, [navigate, state]);

  if (!state) {
    return null;
  }

  const {
    formData,
    passwordOption,
    password,
    selectedTeamMembers,
    adjudicationSelections,
  } = state;

  const breadcrumbItems = useMemo(
    () => [
      { label: "Company settings", path: "/company-settings" },
      { label: "Invite New User", path: "/invite-new-member" },
      { label: "Validate Invite", path: "/invite-new-member/validation" },
    ],
    [],
  );

  const summaryRows: Array<{ label: string; value: string }> = [
    { label: "Email", value: formData.email },
    { label: "User", value: formData.username },
    { label: "Role", value: formData.role },
    { label: "Telephone", value: formData.telephone },
    { label: "Fax", value: formData.fax },
    { label: "Secondary Mail", value: formData.secondaryEmail },
    { label: "Address", value: formData.address },
    { label: "Zip", value: formData.zip },
    { label: "State", value: formData.state },
    { label: "City", value: formData.city },
  ];

  const passwordSummary =
    passwordOption === "manual"
      ? password.replace(/./g, "•")
      : "Administrator generated password will be emailed";

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
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={false}
        currentPage="company-settings"
        showMobileUserMenu={false}
        setShowMobileUserMenu={() => {}}
        setMobileMenuOpen={() => {}}
        userMenuOpen={false}
        setUserMenuOpen={() => {}}
        userMenuHovered={false}
        setUserMenuHovered={() => {}}
        handleSignOut={() => navigate("/login")}
        getUserMenuStyles={() => ({})}
        isCollapsed={false}
        setIsCollapsed={() => {}}
      />

      <div
        style={{
          marginLeft: isDesktop ? "296px" : "0",
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          minHeight: "100vh",
        }}
      >
        {isDesktop ? (
          <Header
            isDesktop
            userMenuOpen={false}
            setUserMenuOpen={() => {}}
            userMenuHovered={false}
            setUserMenuHovered={() => {}}
            handleSignOut={() => navigate("/login")}
            getUserMenuStyles={() => ({})}
          />
        ) : (
          <MobileHeader
            title="Validate Invite"
            onBack={() => navigate(-1)}
            onOpenSidebar={() => {}}
            onOpenUserMenu={() => {}}
          />
        )}

        <div
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            padding: isMobile ? "16px" : "32px",
            paddingBottom: isMobile ? "80px" : "32px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "960px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <nav style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                  cursor: "pointer",
                }}
                aria-label="Go to dashboard"
              >
                <Home size={16} color="#717680" />
              </button>
              {breadcrumbItems.map((item, index) => (
                <div
                  key={item.path}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <ChevronRight size={16} color="#A4A7AE" />
                  <button
                    onClick={() => navigate(item.path)}
                    style={{
                      border: "none",
                      background: "none",
                      color:
                        index === breadcrumbItems.length - 1
                          ? "#273572"
                          : "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: index === breadcrumbItems.length - 1 ? 600 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </nav>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h1
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: isMobile ? "22px" : "24px",
                  fontWeight: 600,
                  lineHeight: isMobile ? "30px" : "32px",
                  margin: 0,
                }}
              >
                Review invite details
              </h1>
              <p
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  lineHeight: "24px",
                  margin: 0,
                }}
              >
                Confirm that all access credentials and visibility settings look correct
                before sending the invite.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: "24px",
                gridTemplateColumns: isDesktop ? "repeat(2, minmax(0, 1fr))" : "1fr",
              }}
            >
              <section style={INFO_CARD_STYLE}>
                <h2
                  style={{
                    margin: 0,
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Access summary
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#717680", fontSize: "14px", fontWeight: 500 }}>
                      Email
                    </span>
                    <span style={{ color: "#181D27", fontSize: "16px" }}>{formData.email}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#717680", fontSize: "14px", fontWeight: 500 }}>
                      Username
                    </span>
                    <span style={{ color: "#181D27", fontSize: "16px" }}>{formData.username}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#717680", fontSize: "14px", fontWeight: 500 }}>
                      Password option
                    </span>
                    <span style={{ color: "#181D27", fontSize: "16px" }}>
                      {passwordOption === "manual"
                        ? "Custom password provided"
                        : "System generated password"}
                    </span>
                    {passwordOption === "manual" && (
                      <span style={{ color: "#535862", fontSize: "14px" }}>
                        Password: {passwordSummary}
                      </span>
                    )}
                  </div>
                </div>
              </section>

              <section style={INFO_CARD_STYLE}>
                <h2
                  style={{
                    margin: 0,
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Report visibility
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#717680", fontSize: "14px", fontWeight: 500 }}>
                      Visibility option
                    </span>
                    <span style={{ color: "#181D27", fontSize: "16px" }}>
                      {formData.reportVisibility}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#717680", fontSize: "14px", fontWeight: 500 }}>
                      Adjudication filters
                    </span>
                    <span style={{ color: "#181D27", fontSize: "16px" }}>
                      {adjudicationSelections.join(", ")}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#717680", fontSize: "14px", fontWeight: 500 }}>
                      Team members
                    </span>
                    <span style={{ color: "#181D27", fontSize: "16px" }}>
                      {selectedTeamMembers.map((member) => member.name).join(", ")}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <section style={INFO_CARD_STYLE}>
              <h2
                style={{
                  margin: 0,
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                Contact details
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isDesktop ? "repeat(2, minmax(0, 1fr))" : "1fr",
                  gap: "16px",
                }}
              >
                {summaryRows.map((row) => (
                  <div key={row.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#717680", fontSize: "14px", fontWeight: 500 }}>
                      {row.label}
                    </span>
                    <span style={{ color: "#181D27", fontSize: "16px" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section style={INFO_CARD_STYLE}>
              <h2
                style={{
                  margin: 0,
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                iCIMS configuration
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isDesktop ? "repeat(2, minmax(0, 1fr))" : "1fr",
                  gap: "16px",
                }}
              >
                {[
                  { label: "Customer ID", value: formData.icimsCustomerId },
                  { label: "User ID", value: formData.icimsUserId },
                  { label: "User name", value: formData.icimsUserName },
                  {
                    label: "Password",
                    value:
                      passwordOption === "manual"
                        ? passwordSummary
                        : "Will be generated automatically",
                  },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#717680", fontSize: "14px", fontWeight: 500 }}>
                      {item.label}
                    </span>
                    <span style={{ color: "#181D27", fontSize: "16px" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "16px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => navigate(-1)}
                style={{
                  display: "flex",
                  padding: "12px 20px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Edit details
              </button>
              <button
                onClick={() => navigate("/invites-orders", { state: { newInvite: formData } })}
                style={{
                  display: "flex",
                  padding: "12px 20px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  color: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Send invite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
