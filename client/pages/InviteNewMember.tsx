import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Home, ChevronRight, User, XCircle } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

interface Permission {
  name: string;
  enabled: boolean;
  locked?: boolean;
}

export default function InviteNewMember() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const width = window.innerWidth;
    return width >= 768 && width < 1024;
  });
  const isDesktop = !isMobile && !isTablet;
  const isCompact = !isDesktop;

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [passwordOption, setPasswordOption] = useState<"auto" | "manual">("auto");
  const [reportViewOption, setReportViewOption] = useState<"own" | "any" | "select">("select");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([
    { id: 1, name: "[First Name Last Name]" },
    { id: 2, name: "[First Name Last Name]" },
    { id: 3, name: "[First Name Last Name]" },
    { id: 4, name: "[First Name Last Name]" },
  ]);

  const selectChevronDataUri =
    "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

  const [permissions, setPermissions] = useState<Permission[]>([
    { name: "Olivia Rhye", enabled: true, locked: true },
    { name: "Olivia Rhye", enabled: true, locked: true },
    { name: "Ordering Enabled", enabled: false },
    { name: "Partial Reports Viewable", enabled: false },
    { name: "Non-DOT Drug Results Viewable", enabled: false },
    { name: "DOT Drug Results Viewable", enabled: false },
    { name: "View Sub Accounts", enabled: false },
    { name: "View Billing", enabled: false },
    { name: "Can Edit Billing ID Lists", enabled: false },
    { name: "Hide Social Security Number", enabled: false },
    { name: "Hide Date of Birth", enabled: false },
    { name: "Hide Gender", enabled: false },
    { name: "Hide Race", enabled: false },
  ]);

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

  const getUserMenuStyles = useCallback(() => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      } as const;
    }
    return {} as const;
  }, [userMenuHovered, userMenuOpen]);

  const handleSignOut = () => {
    navigate("/login");
  };

  const togglePermission = (index: number) => {
    const permission = permissions[index];
    if (permission.locked) return;
    const updated = [...permissions];
    updated[index] = { ...permission, enabled: !permission.enabled };
    setPermissions(updated);
  };

  const removeTeamMember = (id: number) => {
    setSelectedTeamMembers((members) => members.filter((member) => member.id !== id));
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

      <div
        style={{
          marginLeft: isDesktop ? (isCollapsed ? "80px" : "296px") : "0",
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          minHeight: "100vh",
        }}
      >
        {isDesktop && (
          <Header
            isDesktop={isDesktop}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            showMobileUserMenu={showMobileUserMenu}
            sidebarCollapsed={isCollapsed}
          />
        )}

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

        <div
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            padding: isMobile ? "16px" : "32px",
            paddingBottom: isMobile ? "80px" : "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1048px",
              display: "flex",
              flexDirection: "column",
              gap: isCompact ? "16px" : "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <button
                onClick={() => navigate("/")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
                aria-label="Go to dashboard"
              >
                <Home size={24} color="#A4A7AE" />
              </button>
              <ChevronRight size={24} color="#A4A7AE" />
              <button
                onClick={() => navigate("/company-settings")}
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Company settings
              </button>
              <ChevronRight size={24} color="#A4A7AE" />
              <span
                style={{
                  color: "#273572",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Invite New User
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <h1
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: isCompact ? "22px" : "24px",
                  fontWeight: 600,
                  lineHeight: isCompact ? "30px" : "32px",
                  margin: 0,
                }}
              >
                Invite New Member
              </h1>
              <p
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  margin: 0,
                }}
              >
                Invite new users to your account, assign roles, and configure access permissions. Fill
                out the form below to set up user credentials, contact details, and report visibility
                settings.
              </p>
            </div>

            <div
              style={{
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "16px" }}>
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
                  Access
                </h2>
              </div>
              <div
                style={{
                  padding: isCompact ? "16px" : "12px 16px 40px 16px",
                  borderTop: "1px solid #E9EAEB",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: isCompact ? "grid" : "flex",
                    gridTemplateColumns: isCompact ? "1fr" : undefined,
                    gap: "16px",
                  }}
                >
                  {[{ label: "Email", type: "email" }, { label: "User", type: "text" }].map(
                    ({ label, type }) => (
                      <div key={label} style={{ flex: 1, minWidth: 0 }}>
                        <label
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                            display: "block",
                            marginBottom: "6px",
                          }}
                        >
                          {label}
                        </label>
                        <input
                          type={type}
                          style={{
                            width: "100%",
                            height: "40px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    ),
                  )}
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      margin: 0,
                    }}
                  >
                    Password
                  </h3>
                  {[
                    {
                      value: "auto" as const,
                      title: "Automatically generate a secure 16-character password",
                      description: "It will be emailed to the user",
                    },
                    {
                      value: "manual" as const,
                      title: "Create password",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      style={{ display: "flex", gap: "8px", cursor: "pointer" }}
                      onClick={() => setPasswordOption(option.value)}
                    >
                      <div style={{ display: "flex", paddingTop: "2px" }}>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "9999px",
                            border:
                              passwordOption === option.value ? "5px solid #344698" : "1px solid #D5D7DA",
                            background: passwordOption === option.value ? "#344698" : "transparent",
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: option.description ? "4px" : "0" }}>
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          {option.title}
                        </span>
                        {option.description && (
                          <span
                            style={{
                              color: "#535862",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            {option.description}
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "16px" }}>
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
                  Basic Information
                </h2>
              </div>
              <div
                style={{
                  padding: isCompact ? "16px" : "12px 16px 40px 16px",
                  borderTop: "1px solid #E9EAEB",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isCompact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                    gap: isCompact ? "16px" : "20px",
                  }}
                >
                  {[
                    { label: "First Name", type: "text" },
                    { label: "Last Name", type: "text" },
                    { label: "Role", type: "text" },
                    { label: "Telephone", type: "tel" },
                    { label: "Fax", type: "tel" },
                    { label: "Secondary Mail", type: "email", helper: "Optional. Used only for receiving system alerts or notification emails." },
                    { label: "Zip", type: "text" },
                    { label: "Address", type: "text" },
                  ].map(({ label, type, helper }) => (
                    <div key={label} style={{ display: "flex", flexDirection: "column", gap: helper ? "6px" : "0" }}>
                      <label
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        style={{
                          width: "100%",
                          height: "40px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                      {helper && (
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          {helper}
                        </span>
                      )}
                    </div>
                  ))}
                  {["State", "City"].map((label) => (
                    <div key={label}>
                      <label
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        {label}
                      </label>
                      <select
                        style={{
                          width: "100%",
                          height: "40px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          color: "#717680",
                          outline: "none",
                          boxSizing: "border-box",
                          appearance: "none",
                          backgroundImage: `url("${selectChevronDataUri}")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 8px center",
                        }}
                        defaultValue="Select"
                      >
                        <option value="Select">Select</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "16px" }}>
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
                  Account Options
                </h2>
                <p
                  style={{
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    margin: "4px 0 0 0",
                  }}
                >
                  This configuration will over rule user's permissions and roles
                </p>
              </div>
              <div
                style={{
                  padding: isCompact ? "16px" : "12px 16px 40px 16px",
                  borderTop: "1px solid #E9EAEB",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h3
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      margin: 0,
                    }}
                  >
                    Permissions
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isCompact ? "1fr" : "1fr 120px",
                      border: "1px solid #E9EAEB",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          padding: "6px 12px",
                          background: "#FFF",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <span
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Configuration
                        </span>
                      </div>
                      {permissions.map((permission, index) => (
                        <div
                          key={`${permission.name}-${index}`}
                          style={{
                            padding: "12px",
                            borderBottom:
                              index === permissions.length - 1 ? "none" : "1px solid #E9EAEB",
                            minHeight: permission.locked ? "64px" : "36px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {permission.name}
                            </div>
                            {permission.locked && (
                              <div
                                style={{
                                  color: "#535862",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  lineHeight: "20px",
                                }}
                              >
                                Cannot be turned off for admin User ID
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderLeft: isCompact ? "none" : "1px solid #E9EAEB" }}>
                      <div
                        style={{
                          padding: "6px 12px",
                          background: "#FFF",
                          borderBottom: "1px solid #E9EAEB",
                          minHeight: "36px",
                        }}
                      />
                      {permissions.map((permission, index) => (
                        <div
                          key={`${permission.name}-${index}-toggle`}
                          style={{
                            padding: "12px",
                            borderBottom:
                              index === permissions.length - 1 ? "none" : "1px solid #E9EAEB",
                            minHeight: permission.locked ? "64px" : "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: isCompact ? "flex-start" : "center",
                          }}
                        >
                          <button
                            onClick={() => togglePermission(index)}
                            disabled={permission.locked}
                            style={{
                              display: "flex",
                              width: "36px",
                              height: "20px",
                              padding: "2px",
                              justifyContent: permission.enabled ? "flex-end" : "flex-start",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: permission.enabled ? "#344698" : "#F5F5F5",
                              border: permission.enabled ? "none" : "1px solid #E9EAEB",
                              cursor: permission.locked ? "not-allowed" : "pointer",
                              transition: "all 0.2s",
                              opacity: permission.locked ? 0.6 : 1,
                            }}
                          >
                            <div
                              style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "9999px",
                                background: "#FFF",
                                boxShadow: "0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px -1px rgba(10, 13, 18, 0.10)",
                              }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      margin: 0,
                    }}
                  >
                    Option to View Other User's Reports
                  </h3>
                  {[
                    { value: "own" as const, label: "Only this user's reports" },
                    { value: "any" as const, label: "Reports ordered by any user in this account" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      style={{ display: "flex", gap: "8px", cursor: "pointer" }}
                      onClick={() => setReportViewOption(option.value)}
                    >
                      <div style={{ display: "flex", paddingTop: "2px" }}>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "9999px",
                            border:
                              reportViewOption === option.value ? "5px solid #344698" : "1px solid #D5D7DA",
                            background: reportViewOption === option.value ? "#344698" : "transparent",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      padding: "12px 8px",
                      borderRadius: "8px",
                      background: "#FAFAFA",
                    }}
                  >
                    <label
                      style={{ display: "flex", gap: "8px", cursor: "pointer" }}
                      onClick={() => setReportViewOption("select")}
                    >
                      <div style={{ display: "flex", paddingTop: "2px" }}>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "9999px",
                            border:
                              reportViewOption === "select" ? "5px solid #344698" : "1px solid #D5D7DA",
                            background: reportViewOption === "select" ? "#344698" : "transparent",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        Select from existing users
                      </span>
                    </label>

                    <div style={{ height: "1px", background: "#E9EAEB" }} />

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <label
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Select Team Member
                        </label>
                        <span
                          style={{
                            color: "#344698",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          *
                        </span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          maxWidth: "330px",
                        }}
                      >
                        <User size={16} color="#A4A7AE" />
                        <span
                          style={{
                            flex: 1,
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Select Team Member
                        </span>
                        <svg
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
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Visible reports From
                        </span>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "12px",
                          }}
                        >
                          {selectedTeamMembers.map((member) => (
                            <div
                              key={member.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                                padding: "2px 4px 2px 5px",
                                borderRadius: "6px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "9999px",
                                  border: "0.667px solid rgba(0, 0, 0, 0.10)",
                                  background: "#D6CFB7",
                                }}
                              />
                              <span
                                style={{
                                  color: "#414651",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  lineHeight: "20px",
                                }}
                              >
                                {member.name}
                              </span>
                              <button
                                onClick={() => removeTeamMember(member.id)}
                                style={{
                                  display: "flex",
                                  padding: "2px",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  borderRadius: "3px",
                                }}
                                aria-label={`Remove ${member.name}`}
                              >
                                <XCircle size={20} color="#A4A7AE" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      margin: 0,
                    }}
                  >
                    Report Visibility
                  </h3>
                  <div style={{ maxWidth: "358px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <label
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        What Reports Can this User View?
                      </label>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <select
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        color: "#717680",
                        outline: "none",
                        boxSizing: "border-box",
                        appearance: "none",
                        backgroundImage: `url("${selectChevronDataUri}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 8px center",
                      }}
                      defaultValue="Select"
                    >
                      <option value="Select">Select</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      Reports this user can see by adjudication status
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                      {["All", "Does not Meet Hiring Requirements", "Meet Hiring Requirements"].map(
                        (label) => (
                          <label key={label} style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
                            <div style={{ display: "flex", paddingTop: "2px" }}>
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              />
                            </div>
                            <span
                              style={{
                                color: "#414651",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {label}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      margin: 0,
                    }}
                  >
                    iCIMS Configuration
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isCompact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {["iCIMS Customer ID", "iCIMS User ID", "iCIMS User name", "iCIMS Password"].map(
                      (label) => (
                        <div key={label}>
                          <label
                            style={{
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                              display: "block",
                              marginBottom: "6px",
                            }}
                          >
                            {label}
                          </label>
                          <input
                            type={label === "iCIMS Password" ? "password" : "text"}
                            style={{
                              width: "100%",
                              height: "40px",
                              padding: "8px 12px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: isCompact ? "8px" : "16px",
              }}
            >
              <button
                style={{
                  display: "flex",
                  padding: "12px 20px",
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
                Create User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
