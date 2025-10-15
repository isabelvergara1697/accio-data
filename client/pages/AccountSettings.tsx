import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Sidebar } from "../components/Sidebar";
import { useIsMobile } from "../hooks/use-mobile";

type TabType = "profile" | "security" | "notifications";

export default function AccountSettings() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;
  
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Director of Human Resources");
  const [address, setAddress] = useState("123456 Street");
  const [zipCode, setZipCode] = useState("18735");
  const [state, setState] = useState("Texas");
  const [city, setCity] = useState("Austin");
  const [fax, setFax] = useState("9999999");
  const [phone, setPhone] = useState("9999999");
  const [timezone, setTimezone] = useState("Pacific Standard Time (PST)");
  const [primaryEmail, setPrimaryEmail] = useState("alexandra@acciodata.com");
  const [secondaryEmail, setSecondaryEmail] = useState("");

  const handleSignOut = () => {
    navigate("/login");
  };

  const getUserMenuStyles = () => ({
    position: "absolute" as const,
    top: "100%",
    right: 0,
    marginTop: "8px",
  });

  const headerHeight = isMobile ? 64 : 72;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#FAFAFA",
      }}
    >
      {isDesktop && (
        <Sidebar
          isDesktop={isDesktop}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          currentPage="settings"
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}

      {isMobile && (
        <MobileHeader
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          showMobileUserMenu={showMobileUserMenu}
          setShowMobileUserMenu={setShowMobileUserMenu}
          handleSignOut={handleSignOut}
          currentPage="settings"
        />
      )}

      <main
        style={{
          marginTop: isMobile ? `${headerHeight}px` : 0,
          marginLeft: isDesktop && !isCollapsed ? "280px" : "0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
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
          {/* Page Header */}
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
              Account Settings
            </h1>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                padding: "4px",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
                borderRadius: "10px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflowX: "auto",
              }}
            >
              {[
                { id: "profile" as TabType, label: "Profile" },
                { id: "security" as TabType, label: "Security" },
                { id: "notifications" as TabType, label: "Notifications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    height: "36px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "6px",
                    border: activeTab === tab.id ? "1px solid #B3BCE5" : "none",
                    background: activeTab === tab.id ? "#ECEEF9" : "transparent",
                    color: activeTab === tab.id ? "#273572" : "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Tab Content */}
          {activeTab === "profile" && (
            <>
              {/* Basic Information Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
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
                      Basic Information
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
                      Update your personal details so we can tailor your experience and keep your profile accurate.
                    </p>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Name Fields */}
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
                      <label
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Name<span style={{ color: "#344698" }}>*</span>
                      </label>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "24px",
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{
                          flex: "1 0 0",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{
                          flex: "1 0 0",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Photo Upload */}
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
                        Your photo<span style={{ color: "#344698" }}>*</span>
                      </label>
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
                        This will be displayed on your profile.
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                      }}
                    >
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "9999px",
                          border: "1px solid rgba(0, 0, 0, 0.10)",
                          background: "#E0E0E0",
                        }}
                      />
                      <div
                        style={{
                          flex: "1 0 0",
                          display: "flex",
                          padding: "16px 24px",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "12px",
                          border: "1px solid #E9EAEB",
                          background: "#FFF",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                                stroke="#414651"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "4px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#273572",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                Click to upload
                              </span>
                              <span
                                style={{
                                  color: "#535862",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  lineHeight: "20px",
                                }}
                              >
                                or drag and drop
                              </span>
                            </div>
                            <p
                              style={{
                                color: "#535862",
                                textAlign: "center",
                                fontFamily: "Roboto Mono",
                                fontSize: "12px",
                                fontWeight: 400,
                                lineHeight: "18px",
                                margin: 0,
                              }}
                            >
                              SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Other fields - Role, Address, Zip Code, Location, Fax, Phone, Timezone */}
                  {[
                    { label: "Role", value: role, onChange: setRole },
                    { label: "Address", value: address, onChange: setAddress },
                    { label: "Zip Code", value: zipCode, onChange: setZipCode },
                  ].map((field) => (
                    <React.Fragment key={field.label}>
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
                          <label
                            style={{
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            {field.label}
                          </label>
                        </div>
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          style={{
                            flex: "1 0 0",
                            minWidth: isMobile ? "auto" : "480px",
                            maxWidth: isMobile ? "auto" : "512px",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div style={{ height: "1px", background: "#E9EAEB" }} />
                    </React.Fragment>
                  ))}

                  {/* Location - State and City */}
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
                      <label
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Location
                      </label>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "24px",
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                      }}
                    >
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        style={{
                          flex: "1 0 0",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      >
                        <option value="Texas">Texas</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                      </select>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{
                          flex: "1 0 0",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      >
                        <option value="Austin">Austin</option>
                        <option value="Houston">Houston</option>
                        <option value="Dallas">Dallas</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Fax and Phone */}
                  {[
                    { label: "Fax", value: fax, onChange: setFax },
                    { label: "Phone", value: phone, onChange: setPhone },
                  ].map((field) => (
                    <React.Fragment key={field.label}>
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
                          <label
                            style={{
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            {field.label}
                          </label>
                        </div>
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          style={{
                            flex: "1 0 0",
                            minWidth: isMobile ? "auto" : "480px",
                            maxWidth: isMobile ? "auto" : "512px",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div style={{ height: "1px", background: "#E9EAEB" }} />
                    </React.Fragment>
                  ))}

                  {/* Timezone */}
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
                      <label
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Timezone
                      </label>
                    </div>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      style={{
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        color: "#717680",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        outline: "none",
                      }}
                    >
                      <option value="Pacific Standard Time (PST)">Pacific Standard Time (PST)</option>
                      <option value="Eastern Standard Time (EST)">Eastern Standard Time (EST)</option>
                      <option value="Central Standard Time (CST)">Central Standard Time (CST)</option>
                    </select>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Save/Cancel Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <button
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
                      Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
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
                      Email
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
                      Add and manage your email addresses. You'll need to verify each one to activate it.
                    </p>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Email Address */}
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
                      <label
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Email Address<span style={{ color: "#344698" }}>*</span>
                      </label>
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
                        value={primaryEmail}
                        onChange={(e) => setPrimaryEmail(e.target.value)}
                        style={{
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
                        Used for login, password recovery, and important account notifications.
                      </p>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Secondary Email */}
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
                      <label
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Secondary Email<span style={{ color: "#344698" }}>*</span>
                      </label>
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
                        placeholder="user@mail.com"
                        value={secondaryEmail}
                        onChange={(e) => setSecondaryEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
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
                        Optional. Used only for receiving system alerts or notification emails.
                      </p>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Save/Cancel Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <button
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
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Security Tab Content */}
          {activeTab === "security" && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
              }}
            >
              Security settings coming soon...
            </div>
          )}

          {/* Notifications Tab Content */}
          {activeTab === "notifications" && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
              }}
            >
              Notification settings coming soon...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
