import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";

export const Reporting: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 640 && window.innerWidth < 1200,
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("results");
  const [showNotification, setShowNotification] = useState(false);
  const [quickOrderDrawerOpen, setQuickOrderDrawerOpen] = useState(false);
  const [ssnOrderDrawerOpen, setSSNOrderDrawerOpen] = useState(false);
  const [customizeDrawerOpen, setCustomizeDrawerOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1200);
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = () => {
    console.log("Sign out clicked");
  };

  const getUserMenuStyles = () => {
    if (userMenuOpen || userMenuHovered) {
      return { background: "#F5F5F5" };
    }
    return {};
  };

  const handleOpenQuickOrderDrawer = () => setQuickOrderDrawerOpen(true);
  const handleOpenSSNOrderDrawer = () => setSSNOrderDrawerOpen(true);
  const handleOpenCustomizeDrawer = () => setCustomizeDrawerOpen(true);
  const handleOpenNotificationModal = () => setNotificationModalOpen(true);

  const tabs = [
    { id: "results", label: "Results Report" },
    { id: "product", label: "By Product Type" },
    { id: "subject", label: "By Subject/Applicant" },
    { id: "pending", label: "Pending Individual" },
    { id: "alert", label: "Subject Alert" },
    { id: "turnaround", label: "Turn Around Time" },
  ];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        background: "#FAFAFA",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        currentPage="reporting"
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
      />

      <div
        style={{
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          position: "relative",
          height: "100vh",
          overflow: "auto",
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
          showNotification={showNotification}
          sidebarCollapsed={sidebarCollapsed}
          quickOrderDrawerOpen={quickOrderDrawerOpen}
          setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
          ssnOrderDrawerOpen={ssnOrderDrawerOpen}
          setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
          customizeDrawerOpen={customizeDrawerOpen}
          setCustomizeDrawerOpen={setCustomizeDrawerOpen}
          notificationModalOpen={notificationModalOpen}
          setNotificationModalOpen={setNotificationModalOpen}
          onOpenQuickOrderDrawer={handleOpenQuickOrderDrawer}
          onOpenSSNOrderDrawer={handleOpenSSNOrderDrawer}
          onOpenCustomizeDrawer={handleOpenCustomizeDrawer}
          onOpenNotificationModal={handleOpenNotificationModal}
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
          quickOrderDrawerOpen={quickOrderDrawerOpen}
          setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
          ssnOrderDrawerOpen={ssnOrderDrawerOpen}
          setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
          customizeDrawerOpen={customizeDrawerOpen}
          setCustomizeDrawerOpen={setCustomizeDrawerOpen}
          notificationModalOpen={notificationModalOpen}
          setNotificationModalOpen={setNotificationModalOpen}
          onOpenQuickOrderDrawer={handleOpenQuickOrderDrawer}
          onOpenSSNOrderDrawer={handleOpenSSNOrderDrawer}
          onOpenCustomizeDrawer={handleOpenCustomizeDrawer}
          onOpenNotificationModal={handleOpenNotificationModal}
        />

        {/* Main Content */}
        <div
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            flex: "1 1 auto",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Page Header */}
          <div
            style={{
              display: "flex",
              padding: isMobile ? "16px" : "0 32px",
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
              <h1
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "24px",
                  fontWeight: 600,
                  lineHeight: "32px",
                  margin: 0,
                }}
              >
                Reports
              </h1>
            </div>

            {/* Tab Navigation */}
            <div
              style={{
                display: "flex",
                padding: "4px",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
                flexWrap: "wrap",
                borderRadius: "10px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
              }}
            >
              {tabs.map((tab) => (
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
                    background:
                      activeTab === tab.id ? "#ECEEF9" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "#F5F5F5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span
                    style={{
                      color: activeTab === tab.id ? "#273572" : "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Result Report Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
              padding: isMobile ? "16px" : "24px 32px",
            }}
          >
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
                  gap: "2px",
                  flex: "1 0 0",
                }}
              >
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
                  Search Result Report
                </h2>
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
                  This report produces a CSV file containing all components
                  completed on background checks ordered in a given time frame
                  as well as the disposition of the components. Includes reports
                  for this account only unless this user has the ability to view
                  other accounts, in which case this report will include all of
                  this account's 'Additional Accounts Viewable'. NOTE: The
                  Disposition columns will be blank for users who do not have
                  "All Reports Viewable" for the setting What reports can this
                  user view? in their User Settings.
                </p>
              </div>
            </div>

            {/* Generate Report Card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  padding: "16px",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                  borderBottom: "1px solid #E9EAEB",
                }}
              >
                <h3
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  Generate Report
                </h3>
              </div>

              {/* Card Content */}
              <div
                style={{
                  display: "flex",
                  padding: "12px 16px 16px 16px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "24px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    Date Selection
                  </div>
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    }}
                  >
                    Select a Date Range or a Specific Time Frame
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      flexWrap: "wrap",
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
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        style={{ width: "16px", height: "16px" }}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          padding: "0 2px",
                        }}
                      >
                        Jan 10, 2025 – Jan 16, 2025
                      </span>
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
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          padding: "0 2px",
                        }}
                      >
                        Create Report
                      </span>
                    </button>
                  </div>
                </div>

                {/* Sample Preview */}
                <div
                  style={{
                    display: "flex",
                    padding: "12px 8px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "12px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    background: "#FAFAFA",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    }}
                  >
                    Sample
                  </div>
                  <div
                    style={{
                      width: "100%",
                      overflowX: "auto",
                    }}
                  >
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/f2e894808967701a2dacc0bc88870b86b9a820d0?width=2048"
                      alt="Sample report preview"
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Report Chart Card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  padding: "16px",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                  borderBottom: "1px solid #E9EAEB",
                }}
              >
                <h3
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  Report
                </h3>
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
                    cursor: "pointer",
                  }}
                >
                  <svg
                    style={{ width: "16px", height: "16px" }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 6.66665H2M10.6667 1.33331V3.99998M5.33333 1.33331V3.99998M5.2 14.6666H10.8C11.9201 14.6666 12.4802 14.6666 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5746C14 13.1468 14 12.5868 14 11.4666V5.86665C14 4.74654 14 4.18649 13.782 3.75867C13.5903 3.38234 13.2843 3.07638 12.908 2.88463C12.4802 2.66665 11.9201 2.66665 10.8 2.66665H5.2C4.0799 2.66665 3.51984 2.66665 3.09202 2.88463C2.71569 3.07638 2.40973 3.38234 2.21799 3.75867C2 4.18649 2 4.74654 2 5.86665V11.4666C2 12.5868 2 13.1468 2.21799 13.5746C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6666 4.0799 14.6666 5.2 14.6666Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      padding: "0 2px",
                    }}
                  >
                    Jan 10, 2025 – Jan 16, 2025
                  </span>
                </button>
              </div>

              {/* Chart Content */}
              <div
                style={{
                  display: "flex",
                  padding: "12px 16px 16px 16px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "398px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    padding: "0 8px",
                    position: "relative",
                  }}
                >
                  {/* Bar Chart - Simplified version */}
                  {[
                    191, 113, 351, 160, 287, 191, 351, 351, 226, 206, 226, 191,
                  ].map((height, index) => (
                    <div
                      key={index}
                      style={{
                        height: `${height}px`,
                        maxWidth: "10px",
                        flex: "1 0 0",
                        borderRadius: "4px",
                        background: "#8D9BD8",
                      }}
                    />
                  ))}
                </div>
                {/* Month Labels */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignSelf: "stretch",
                    padding: "8px 0 0 0",
                  }}
                >
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month) => (
                    <div
                      key={month}
                      style={{
                        color: "#535862",
                        textAlign: "center",
                        fontFamily: "Roboto Mono",
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "18px",
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
