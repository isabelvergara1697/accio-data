import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showNotification] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
      }}
    >
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="invites-orders"
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          alignSelf: "stretch",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          minHeight: "100vh",
          height: "auto",
          overflow: "visible",
          boxSizing: "border-box",
        }}
      >
        <Header
          isDesktop={isDesktop}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showMobileUserMenu={showMobileUserMenu}
          sidebarCollapsed={sidebarCollapsed}
        />

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

        <main
          style={{
            display: "flex",
            marginTop: isDesktop ? "104px" : "96px",
            paddingBottom: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            borderRadius: "40px 0 0 0",
            position: "relative",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              display: "none",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "stretch",
              background:
                "linear-gradient(180deg, #FAFAFA 43.75%, rgba(255, 255, 255, 0.00) 100%)",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "72px",
                padding: "0 32px",
                alignItems: "center",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                {/* Search Bar */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "10px 14px",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      borderRadius: "8px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flex: "1 0 0",
                        position: "relative",
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
                          d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          flex: "1 0 0",
                          overflow: "hidden",
                          color: "#717680",
                          textOverflow: "ellipsis",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Search
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "1px 4px",
                        alignItems: "flex-start",
                        borderRadius: "4px",
                        border: "1px solid #E9EAEB",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "18px",
                          position: "relative",
                        }}
                      >
                        ⌘K
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Create Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    position: "relative",
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
                      border: "2px solid rgba(255, 255, 255, 0.12)",
                      background: "#344698",
                      boxShadow:
                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "0 2px",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        Quick Create
                      </div>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99935 6.66667V13.3333M6.66602 10H13.3327M18.3327 10C18.3327 14.6024 14.6017 18.3333 9.99935 18.3333C5.39698 18.3333 1.66602 14.6024 1.66602 10C1.66602 5.39763 5.39698 1.66667 9.99935 1.66667C14.6017 1.66667 18.3327 5.39763 18.3327 10Z"
                        stroke="#8D9BD8"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  width: "16px",
                  padding: "16px 8px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "1px",
                    height: "40px",
                    background: "#E9EAEB",
                    position: "relative",
                  }}
                />
              </div>

              {/* User Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  position: "relative",
                }}
              >
                {/* Notification Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "2px",
                    position: "relative",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      width: "40px",
                      padding: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "6px",
                      position: "relative",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
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
                        d="M9.35493 21C10.0601 21.6224 10.9863 22 12.0008 22C13.0152 22 13.9414 21.6224 14.6466 21M18.0008 8C18.0008 6.4087 17.3686 4.88258 16.2434 3.75736C15.1182 2.63214 13.5921 2 12.0008 2C10.4095 2 8.88333 2.63214 7.75811 3.75736C6.63289 4.88258 6.00075 6.4087 6.00075 8C6.00075 11.0902 5.22122 13.206 4.35042 14.6054C3.61588 15.7859 3.24861 16.3761 3.26208 16.5408C3.27699 16.7231 3.31561 16.7926 3.46253 16.9016C3.59521 17 4.19334 17 5.38961 17H18.6119C19.8082 17 20.4063 17 20.539 16.9016C20.6859 16.7926 20.7245 16.7231 20.7394 16.5408C20.7529 16.3761 20.3856 15.7859 19.6511 14.6054C18.7803 13.206 18.0008 11.0902 18.0008 8Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* User Menu */}
                <div
                  style={{
                    display: "flex",
                    padding: "8px",
                    alignItems: "center",
                    gap: "16px",
                    borderRadius: "12px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "200px",
                      alignItems: "center",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                        aspectRatio: "1/1",
                        borderRadius: "9999px",
                        border: "1px solid rgba(0, 0, 0, 0.10)",
                        background:
                          "url(https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800) lightgray 50% / cover no-repeat",
                        position: "relative",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        Alexandra Fitzwilliam
                      </div>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                          color: "#535862",
                          textOverflow: "ellipsis",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        [User Role]
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "0 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "20px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: "320px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: "1 0 0",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "32px",
                        position: "relative",
                      }}
                    >
                      Sue Janes Order #{orderId || "38138"}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Report Disposition
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "4px 12px",
                          alignItems: "center",
                          borderRadius: "9999px",
                          border: "1px solid #ABEFC6",
                          background: "#ECFDF3",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#067647",
                            textAlign: "center",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Meets Hiring Requirements
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      position: "relative",
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
                        position: "relative",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "0 2px",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#535862",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          More Actions
                        </div>
                      </div>
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
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "0 2px",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Add I-9
                        </div>
                      </div>
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
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "0 2px",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Add to this report
                        </div>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.00065 5.33333V10.6667M5.33398 8H10.6673M14.6673 8C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8C1.33398 4.3181 4.31875 1.33333 8.00065 1.33333C11.6826 1.33333 14.6673 4.3181 14.6673 8Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
                        border: "2px solid rgba(255, 255, 255, 0.12)",
                        background: "#344698",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "0 2px",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#FFF",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Main CTA
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              padding: "0 32px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* Left Column - Subject Overview */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "24px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "320px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
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
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 16px 0 16px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: "1 0 0",
                            position: "relative",
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
                                  fontFamily: "Public Sans",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                  position: "relative",
                                }}
                              >
                                Subject Overview
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
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      position: "relative",
                    }}
                  >
                    {/* General Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        General
                      </div>

                      {/* Information Items */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Name (LFM)
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Jeans, Sue
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          AKA
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          DDD, Sue
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Race
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Caucasian
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Gender
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Feminine
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Social Security Trace
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          777-77-7777
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          DOB
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          01/01/1980 (45 Years)
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
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Address Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Address
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Address
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          1234 Fox ST Bossier
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          City
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Los Angeles
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Zip
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          71112
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Address Since
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          01/01/2024
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
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Contact Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Contact
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Phone
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          +1 (555) 000-0000
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Email
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          suejanes@gmail.com
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
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Local and National Identification Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Local and National Identification
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Label
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          [Value]
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
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Employment Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Employment
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Label
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          [Value]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Report Summary */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "24px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "20px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0px",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
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
                      position: "relative",
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
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: "1 0 0",
                            position: "relative",
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
                                  fontFamily: "Public Sans",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                  position: "relative",
                                }}
                              >
                                Report Summary
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
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
                            position: "relative",
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

                  {/* Empty Content Area */}
                  <div
                    style={{
                      display: "flex",
                      height: "204px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      position: "relative",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetails;
