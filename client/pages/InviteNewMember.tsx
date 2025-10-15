import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Home, ChevronRight, User, XCircle } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { useToast } from "../hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

interface Permission {
  name: string;
  enabled: boolean;
  locked?: boolean;
}

interface PasswordRequirement {
  id: string;
  text: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    text: "Must be at least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "special",
    text: "Must contain one special character (e.g. !, @, #, $)",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
  {
    id: "uppercase",
    text: "Must include at least one uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: "number",
    text: "Must include at least one number",
    validator: (password) => /[0-9]/.test(password),
  },
];

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

  const [passwordOption, setPasswordOption] = useState<"auto" | "manual">(
    "auto",
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requirementStates, setRequirementStates] = useState<{
    [key: string]: boolean;
  }>({});

  const [reportViewOption, setReportViewOption] = useState<
    "own" | "any" | "select"
  >("select");
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

  // Update requirement states whenever password changes
  useEffect(() => {
    const newStates: { [key: string]: boolean } = {};
    passwordRequirements.forEach((req) => {
      newStates[req.id] = req.validator(password);
    });
    setRequirementStates(newStates);
  }, [password]);

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
    setSelectedTeamMembers((members) =>
      members.filter((member) => member.id !== id),
    );
  };

  const getRequirementIconColor = (requirementId: string) => {
    if (!password) return "#D5D7DA"; // Gray when no password
    if (requirementStates[requirementId]) return "#079455"; // Green when met
    return "#D5D7DA"; // Gray when not met
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
            padding: isMobile ? "16px" : "32px 24px 32px 32px",
            paddingBottom: isMobile ? "80px" : "32px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "100%",
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
                Invite new users to your account, assign roles, and configure
                access permissions. Fill out the form below to set up user
                credentials, contact details, and report visibility settings.
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
              <div style={{ padding: "16px 16px 12px 16px" }}>
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
                  {[
                    { label: "Email", type: "email" },
                    { label: "User", type: "text" },
                  ].map(({ label, type }) => (
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
                  ))}
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
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
                  <RadioGroup
                    value={passwordOption}
                    onValueChange={(value: "auto" | "manual") =>
                      setPasswordOption(value)
                    }
                    style={{
                      display: "flex",
                      flexDirection: isCompact ? "column" : "row",
                      alignItems: "flex-start",
                      gap: isCompact ? "12px" : "24px",
                      flexWrap: isCompact ? "nowrap" : "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        maxWidth: isCompact ? "100%" : "360px",
                      }}
                    >
                      <RadioGroupItem
                        value="auto"
                        id="auto-password"
                        style={{ marginTop: "2px" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        <Label
                          htmlFor="auto-password"
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Automatically generate a secure 16-character password
                        </Label>
                        <p
                          style={{
                            color: "#535862",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                            margin: 0,
                          }}
                        >
                          It will be emailed to the user
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <RadioGroupItem
                        value="manual"
                        id="manual-password"
                        style={{ marginTop: "2px" }}
                      />
                      <Label
                        htmlFor="manual-password"
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        Create password
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {passwordOption === "manual" && (
                  <>
                    <div style={{ height: "1px", background: "#E9EAEB" }} />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
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
                        Assign User Password
                      </h3>

                      <div
                        style={{
                          display: isCompact ? "grid" : "flex",
                          gridTemplateColumns: isCompact ? "1fr" : undefined,
                          gap: "20px",
                        }}
                      >
                        {/* Password Input */}
                        <div style={{ flex: 1, minWidth: 0 }}>
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
                            Password
                          </label>
                          <div style={{ position: "relative" }}>
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              style={{
                                width: "100%",
                                height: "48px",
                                padding: "10px 44px 10px 14px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                outline: "none",
                                boxSizing: "border-box",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                width: "24px",
                                height: "24px",
                                padding: "4px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "6px",
                                background: "transparent",
                                border: "none",
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
                                  d="M1.61342 8.47537C1.52262 8.33161 1.47723 8.25973 1.45182 8.14886C1.43273 8.06559 1.43273 7.93425 1.45182 7.85097C1.47723 7.74011 1.52262 7.66823 1.61341 7.52447C2.36369 6.33648 4.59693 3.33325 8.00027 3.33325C11.4036 3.33325 13.6369 6.33648 14.3871 7.52447C14.4779 7.66823 14.5233 7.74011 14.5487 7.85097C14.5678 7.93425 14.5678 8.06559 14.5487 8.14886C14.5233 8.25973 14.4779 8.33161 14.3871 8.47537C13.6369 9.66336 11.4036 12.6666 8.00027 12.6666C4.59693 12.6666 2.36369 9.66336 1.61342 8.47537Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8.00027 9.99992C9.10484 9.99992 10.0003 9.10449 10.0003 7.99992C10.0003 6.89535 9.10484 5.99992 8.00027 5.99992C6.8957 5.99992 6.00027 6.89535 6.00027 7.99992C6.00027 9.10449 6.8957 9.99992 8.00027 9.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div style={{ flex: 1, minWidth: 0 }}>
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
                            Confirm password
                          </label>
                          <div style={{ position: "relative" }}>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="••••••••"
                              style={{
                                width: "100%",
                                height: "48px",
                                padding: "10px 44px 10px 14px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                outline: "none",
                                boxSizing: "border-box",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                width: "24px",
                                height: "24px",
                                padding: "4px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "6px",
                                background: "transparent",
                                border: "none",
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
                                  d="M1.61342 8.47537C1.52262 8.33161 1.47723 8.25973 1.45182 8.14886C1.43273 8.06559 1.43273 7.93425 1.45182 7.85097C1.47723 7.74011 1.52262 7.66823 1.61341 7.52447C2.36369 6.33648 4.59693 3.33325 8.00027 3.33325C11.4036 3.33325 13.6369 6.33648 14.3871 7.52447C14.4779 7.66823 14.5233 7.74011 14.5487 7.85097C14.5678 7.93425 14.5678 8.06559 14.5487 8.14886C14.5233 8.25973 14.4779 8.33161 14.3871 8.47537C13.6369 9.66336 11.4036 12.6666 8.00027 12.6666C4.59693 12.6666 2.36369 9.66336 1.61342 8.47537Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8.00027 9.99992C9.10484 9.99992 10.0003 9.10449 10.0003 7.99992C10.0003 6.89535 9.10484 5.99992 8.00027 5.99992C6.8957 5.99992 6.00027 6.89535 6.00027 7.99992C6.00027 9.10449 6.8957 9.99992 8.00027 9.99992Z"
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

                      {/* Password Validation Checks */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        {passwordRequirements.map((requirement) => (
                          <div
                            key={requirement.id}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                flexShrink: 0,
                              }}
                            >
                              <path
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill={getRequirementIconColor(requirement.id)}
                              />
                              <path
                                d="M6.25 10L8.75 12.5L13.75 7.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span
                              style={{
                                flex: 1,
                                color: "#535862",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "20px",
                              }}
                            >
                              {requirement.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
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
              <div style={{ padding: "16px 16px 12px 16px" }}>
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
                    height: isCompact ? "auto" : "410px",
                    gridTemplateRows: isCompact
                      ? "auto"
                      : "repeat(5, minmax(0, 1fr))",
                    gridTemplateColumns: isCompact
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    rowGap: isCompact ? "16px" : "20px",
                    columnGap: isCompact ? "16px" : "20px",
                  }}
                >
                  <div
                    style={{ gridRow: "1 / span 1", gridColumn: "1 / span 1" }}
                  >
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
                      First Name
                    </label>
                    <input
                      type="text"
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

                  <div
                    style={{ gridRow: "1 / span 1", gridColumn: "2 / span 1" }}
                  >
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
                      Last Name
                    </label>
                    <input
                      type="text"
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

                  <div
                    style={{ gridRow: "2 / span 1", gridColumn: "1 / span 1" }}
                  >
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
                      Role
                    </label>
                    <input
                      type="text"
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

                  <div
                    style={{ gridRow: "2 / span 1", gridColumn: "2 / span 1" }}
                  >
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
                      Telephone
                    </label>
                    <input
                      type="tel"
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

                  <div
                    style={{ gridRow: "3 / span 1", gridColumn: "1 / span 1" }}
                  >
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
                      Fax
                    </label>
                    <input
                      type="tel"
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

                  <div
                    style={{ gridRow: "3 / span 1", gridColumn: "2 / span 1" }}
                  >
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
                      Secondary Mail
                    </label>
                    <input
                      type="email"
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
                        marginBottom: "6px",
                      }}
                    />
                    <div
                      style={{
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      Optional. Used only for receiving system alerts or
                      notification emails.
                    </div>
                  </div>

                  <div
                    style={{ gridRow: "4 / span 1", gridColumn: "1 / span 1" }}
                  >
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
                      Zip
                    </label>
                    <input
                      type="text"
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

                  <div
                    style={{ gridRow: "4 / span 1", gridColumn: "2 / span 1" }}
                  >
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
                      Address
                    </label>
                    <input
                      type="text"
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

                  <div
                    style={{ gridRow: "5 / span 1", gridColumn: "1 / span 1" }}
                  >
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
                      State
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

                  <div
                    style={{ gridRow: "5 / span 1", gridColumn: "2 / span 1" }}
                  >
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
                      City
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
              <div style={{ padding: "16px 16px 12px 16px" }}>
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
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
                      display: "flex",
                      flexDirection: isCompact ? "column" : "row",
                      alignSelf: "stretch",
                      gap: isCompact ? "0" : "0",
                    }}
                  >
                    {/* Left Column - Configuration */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: "1 0 0",
                      }}
                    >
                      {/* Header */}
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "6px 12px",
                          alignItems: "center",
                          borderBottom: "1px solid #E9EAEB",
                          background: "#FFF",
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
                          Configuration
                        </span>
                      </div>
                      {/* Rows */}
                      {permissions.map((permission, index) => (
                        <div
                          key={`${permission.name}-${index}`}
                          style={{
                            display: "flex",
                            padding: "12px",
                            alignItems: "center",
                            alignSelf: "stretch",
                            borderBottom: "1px solid #E9EAEB",
                            height: permission.locked ? "64px" : "36px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 400,
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
                    {/* Right Column - Toggles */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isCompact ? "stretch" : "center",
                        width: isCompact ? "100%" : "72px",
                      }}
                    >
                      {/* Empty Header */}
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "6px 12px",
                          alignItems: "center",
                          justifyContent: "center",
                          borderBottom: "1px solid #E9EAEB",
                          background: "#FFF",
                          width: isCompact ? "100%" : "72px",
                          boxSizing: "border-box",
                        }}
                      />
                      {/* Toggle Rows */}
                      {permissions.map((permission, index) => (
                        <div
                          key={`${permission.name}-${index}-toggle`}
                          style={{
                            display: "flex",
                            height: permission.locked ? "64px" : "36px",
                            padding: "12px",
                            alignItems: "center",
                            justifyContent: isCompact ? "flex-start" : "center",
                            borderBottom: "1px solid #E9EAEB",
                            width: isCompact ? "100%" : "72px",
                            boxSizing: "border-box",
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
                              justifyContent: permission.enabled
                                ? "flex-end"
                                : "flex-start",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: permission.enabled
                                ? "#344698"
                                : "#F5F5F5",
                              border: permission.enabled
                                ? "none"
                                : "1px solid #E9EAEB",
                              cursor: permission.locked
                                ? "not-allowed"
                                : "pointer",
                              transition: "all 0.2s",
                              flexShrink: 0,
                            }}
                          >
                            <div
                              style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "9999px",
                                background: "#FFF",
                                boxShadow:
                                  "0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px -1px rgba(10, 13, 18, 0.10)",
                              }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
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
                    {
                      value: "own" as const,
                      label: "Only this user's reports",
                    },
                    {
                      value: "any" as const,
                      label: "Reports ordered by any user in this account",
                    },
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
                              reportViewOption === option.value
                                ? "5px solid #344698"
                                : "1px solid #D5D7DA",
                            background:
                              reportViewOption === option.value
                                ? "#344698"
                                : "transparent",
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
                              reportViewOption === "select"
                                ? "5px solid #344698"
                                : "1px solid #D5D7DA",
                            background:
                              reportViewOption === "select"
                                ? "#344698"
                                : "transparent",
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

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
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

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
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
                  <div
                    style={{
                      maxWidth: "358px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
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

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
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
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
                    >
                      {[
                        "All",
                        "Does not Meet Hiring Requirements",
                        "Meet Hiring Requirements",
                      ].map((label) => (
                        <label
                          key={label}
                          style={{
                            display: "flex",
                            gap: "8px",
                            cursor: "pointer",
                          }}
                        >
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
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
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
                      gridTemplateColumns: isCompact
                        ? "1fr"
                        : "repeat(2, minmax(0, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {[
                      "iCIMS Customer ID",
                      "iCIMS User ID",
                      "iCIMS User name",
                      "iCIMS Password",
                    ].map((label) => (
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
                          type={
                            label === "iCIMS Password" ? "password" : "text"
                          }
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
                    ))}
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
