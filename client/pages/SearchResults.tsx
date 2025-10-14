import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [quickOrderDrawerOpen, setQuickOrderDrawerOpen] = useState(false);
  const [ssnOrderDrawerOpen, setSSNOrderDrawerOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [documentsExpanded, setDocumentsExpanded] = useState(true);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleSignOut = () => {
    navigate("/login");
  };

  const getUserMenuStyles = () => ({
    background: userMenuOpen || userMenuHovered ? "#F5F5F5" : "transparent",
    transition: "background 0.2s ease",
  });

  // Mock data - replace with real data from API
  const invites = [
    {
      id: 1,
      status: "Canceled",
      firstName: "Loremp",
      lastName: "Young",
      email: "isabella.miller@example.com",
      completed: 80,
      lastEmail: "07/19/22",
      i9Filled: true,
      activate: true,
      ews: true,
    },
    {
      id: 2,
      status: "Canceled",
      firstName: "Ava",
      lastName: "Lewis",
      email: "Loremp@example.com",
      completed: 60,
      lastEmail: "09/05/23",
      i9Filled: true,
      activate: false,
      ews: false,
    },
  ];

  const orders = [
    {
      id: 1,
      status: "Waiting",
      firstName: "Loremp",
      lastName: "Young",
      email: "Loremp@example.com",
      phone: "(555) 890-1234",
      newUpdate: true,
      completed: 80,
      lastUpdate: "07/19/22",
      eta: "08/29/23",
    },
    {
      id: 2,
      status: "Unsolicited",
      firstName: "Ava",
      lastName: "Lewis",
      email: "Loremp@example.com",
      phone: "(555) 012-3456",
      newUpdate: true,
      completed: 60,
      lastUpdate: "09/05/23",
      eta: "10/30/24",
    },
  ];

  const documents = [
    { id: 1, name: "Loremp", size: "200 KB", type: "PDF" },
    { id: 2, name: "Loremp", size: "200 KB", type: "PDF" },
  ];

  const getStatusBadgeStyles = (status: string) => {
    const styles = {
      Canceled: {
        background: "#FEF6EE",
        border: "1px solid #F9DBAF",
        color: "#B93815",
      },
      Waiting: {
        background: "#ECFDF3",
        border: "1px solid #ABEFC6",
        color: "#067647",
      },
      Unsolicited: {
        background: "#F4F3FF",
        border: "1px solid #D9D6FE",
        color: "#5925DC",
      },
    };
    return styles[status as keyof typeof styles] || styles.Canceled;
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        borderRadius: "8px",
        background: "#FAFAFA",
        overflow: "hidden",
      }}
    >
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigate={(path) => navigate(path)}
      />

      <div
        style={{
          display: "flex",
          paddingBottom: "24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "32px",
          flex: "1 0 0",
          borderRadius: isDesktop ? "40px 0 0 0" : "0",
          alignSelf: "stretch",
          overflow: "auto",
        }}
      >
        {isDesktop ? (
          <Header
            isDesktop={isDesktop}
            isMobile={isMobile}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            searchQuery={searchQuery}
            onOpenQuickOrderDrawer={() => setQuickOrderDrawerOpen(true)}
            onOpenSSNOrderDrawer={() => setSSNOrderDrawerOpen(true)}
            onOpenNotificationModal={() => setNotificationModalOpen(true)}
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
            quickOrderDrawerOpen={quickOrderDrawerOpen}
            setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
            ssnOrderDrawerOpen={ssnOrderDrawerOpen}
            setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
            notificationModalOpen={notificationModalOpen}
            setNotificationModalOpen={setNotificationModalOpen}
            onOpenQuickOrderDrawer={() => setQuickOrderDrawerOpen(true)}
            onOpenSSNOrderDrawer={() => setSSNOrderDrawerOpen(true)}
            onOpenNotificationModal={() => setNotificationModalOpen(true)}
          />
        )}

        {/* Header Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
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
            }}
          >
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
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  gap: "20px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    minWidth: "320px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "4px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "24px",
                      fontWeight: 600,
                      lineHeight: "32px",
                    }}
                  >
                    Search Results
                  </div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Found <span style={{ fontWeight: 700 }}>5 Results</span> to "
                    {searchQuery}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "0 32px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              flex: 1,
              alignSelf: "stretch",
            }}
          >
            {/* Invites Section */}
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
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                  alignSelf: "stretch",
                  borderRadius: "12px 12px 0 0",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "16px 16px 12px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "4px",
                        flex: "1 0 0",
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
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "18px",
                              fontWeight: 600,
                              lineHeight: "28px",
                            }}
                          >
                            Invites
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "2px 8px",
                              alignItems: "center",
                              borderRadius: "9999px",
                              border: "1px solid #E9EAEB",
                              background: "#FAFAFA",
                            }}
                          >
                            <div
                              style={{
                                color: "#414651",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "18px",
                              }}
                            >
                              {invites.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invites Table */}
                <div
                  style={{
                    display: "flex",
                    padding: "12px 16px 16px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "0px 0px 12px 12px",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      overflow: "auto",
                    }}
                  >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Status
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            First Name
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Last Name
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Invitation Email
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Completed
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Last Email
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            I-9 Filled
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Activate
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            EWS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invites.map((invite, index) => (
                          <tr key={invite.id}>
                            <td
                              style={{
                                padding: "12px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              <div
                                style={{
                                  display: "inline-flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  ...getStatusBadgeStyles(invite.status),
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Public Sans",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                  }}
                                >
                                  {invite.status}
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color:
                                  index === 0 ? "#344698" : "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: index === 0 ? 700 : 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {invite.firstName}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {invite.lastName}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color:
                                  index === 1 ? "#344698" : "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: index === 1 ? 700 : 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {invite.email}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <div
                                  style={{
                                    height: "8px",
                                    flex: 1,
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "46px",
                                      height: "8px",
                                      borderRadius: "9999px",
                                      background: "#D5D7DA",
                                      position: "absolute",
                                    }}
                                  />
                                  <div
                                    style={{
                                      width: `${(invite.completed / 100) * 46}px`,
                                      height: "8px",
                                      borderRadius: "9999px",
                                      background: "#344698",
                                      position: "absolute",
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
                                  {invite.completed}%
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {invite.lastEmail}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {invite.i9Filled && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {invite.activate && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                borderBottom:
                                  index < invites.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {invite.ews && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Section */}
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
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                  alignSelf: "stretch",
                  borderRadius: "12px 12px 0 0",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "16px 16px 12px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "4px",
                        flex: "1 0 0",
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
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "18px",
                              fontWeight: 600,
                              lineHeight: "28px",
                            }}
                          >
                            Orders
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "2px 8px",
                              alignItems: "center",
                              borderRadius: "9999px",
                              border: "1px solid #E9EAEB",
                              background: "#FAFAFA",
                            }}
                          >
                            <div
                              style={{
                                color: "#414651",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "18px",
                              }}
                            >
                              {orders.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orders Table */}
                <div
                  style={{
                    display: "flex",
                    padding: "12px 16px 16px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "0px 0px 12px 12px",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      overflow: "auto",
                    }}
                  >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Status
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            First Name
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Last Name
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Applicant Email
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Phone
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            New Update
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Completed
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Last Update
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                              borderBottom: "1px solid #E9EAEB",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            ETA
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={order.id}>
                            <td
                              style={{
                                padding: "12px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              <div
                                style={{
                                  display: "inline-flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  ...getStatusBadgeStyles(order.status),
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Public Sans",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                  }}
                                >
                                  {order.status}
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color:
                                  index === 0 ? "#344698" : "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: index === 0 ? 700 : 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {order.firstName}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {order.lastName}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#344698",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 700,
                                lineHeight: "20px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {order.email}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {order.phone}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {order.newUpdate && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <div
                                  style={{
                                    height: "8px",
                                    flex: 1,
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "46px",
                                      height: "8px",
                                      borderRadius: "9999px",
                                      background: "#D5D7DA",
                                      position: "absolute",
                                    }}
                                  />
                                  <div
                                    style={{
                                      width: `${(order.completed / 100) * 46}px`,
                                      height: "8px",
                                      borderRadius: "9999px",
                                      background: "#344698",
                                      position: "absolute",
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
                                  {order.completed}%
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {order.lastUpdate}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                borderBottom:
                                  index < orders.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              {order.eta}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
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
                    background: "#FFF",
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
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "4px",
                          flex: "1 0 0",
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
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "18px",
                                fontWeight: 600,
                                lineHeight: "28px",
                              }}
                            >
                              Documents
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "2px 8px",
                                alignItems: "center",
                                borderRadius: "9999px",
                                border: "1px solid #E9EAEB",
                                background: "#FAFAFA",
                              }}
                            >
                              <div
                                style={{
                                  color: "#414651",
                                  textAlign: "center",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {documents.length}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 1,
                              alignSelf: "stretch",
                              overflow: "hidden",
                              color: "#535862",
                              textOverflow: "ellipsis",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Your XML PostBack URL is [url]
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setDocumentsExpanded(!documentsExpanded)}
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            transform: documentsExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.2s",
                          }}
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

                  {documentsExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          style={{
                            display: "flex",
                            height: "92px",
                            padding: "16px",
                            alignItems: "center",
                            gap: "4px",
                            flex: "1 0 0",
                            borderRadius: "12px",
                            border: "1px solid #E9EAEB",
                            background: "#FFF",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              flex: "1 0 0",
                            }}
                          >
                            <div style={{ width: "40px", height: "40px" }}>
                              <svg
                                width="32"
                                height="40"
                                viewBox="0 0 32 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 0.75H20C20.1212 0.75 20.2375 0.798088 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
                                  stroke="#D5D7DA"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
                                  stroke="#D5D7DA"
                                  strokeWidth="1.5"
                                />
                              </svg>
                              <div
                                style={{
                                  display: "inline-flex",
                                  padding: "2px 3px",
                                  alignItems: "flex-start",
                                  gap: "8px",
                                  borderRadius: "2px",
                                  background: "#D92D20",
                                  position: "relative",
                                  top: "-22px",
                                  left: "1px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#FFF",
                                    textAlign: "center",
                                    fontFamily: "Inter",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    lineHeight: "normal",
                                  }}
                                >
                                  {doc.type}
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "2px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 1,
                                  alignSelf: "stretch",
                                  overflow: "hidden",
                                  color: "#344698",
                                  textOverflow: "ellipsis",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 700,
                                  lineHeight: "20px",
                                }}
                              >
                                {doc.name}
                              </div>
                              <div
                                style={{
                                  color: "#535862",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 400,
                                  lineHeight: "18px",
                                }}
                              >
                                {doc.size}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <button
                              style={{
                                display: "flex",
                                width: "36px",
                                height: "36px",
                                padding: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "6px",
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
                                  d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              style={{
                                display: "flex",
                                width: "36px",
                                height: "36px",
                                padding: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "6px",
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
                                  d="M21 21H3M18 11L12 17M12 17L6 11M12 17V3"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
