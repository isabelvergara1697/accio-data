import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import BatchOrderingHelpModal from "../components/BatchOrderingHelpModal";
import StandardOrdersBatchModal from "../components/StandardOrdersBatchModal";
import BatchOrderingDetailsModal from "../components/BatchOrderingDetailsModal";
import MVROrdersBatchModal from "../components/MVROrdersBatchModal";

const BatchOrders: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState<"standard" | "mvr">("standard");
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [standardBatchModalOpen, setStandardBatchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(20);
  const [showTable, setShowTable] = useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [batchDetailsModalOpen, setBatchDetailsModalOpen] = useState(false);

  // MVR specific states
  const [mvrBatchModalOpen, setMvrBatchModalOpen] = useState(false);
  const [mvrIsLoading, setMvrIsLoading] = useState(false);
  const [mvrLoadingProgress, setMvrLoadingProgress] = useState(20);
  const [mvrShowTable, setMvrShowTable] = useState(false);
  const [mvrHoveredRowIndex, setMvrHoveredRowIndex] = useState<number | null>(null);
  const [mvrActionMenuOpen, setMvrActionMenuOpen] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000); // 30 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuOpen !== null && !(event.target as Element).closest('[data-dropdown-menu]')) {
        setActionMenuOpen(null);
      }
      if (mvrActionMenuOpen !== null && !(event.target as Element).closest('[data-dropdown-menu]')) {
        setMvrActionMenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [actionMenuOpen, mvrActionMenuOpen]);

  const handleStartNewBatch = () => {
    if (activeTab === "standard") {
      setStandardBatchModalOpen(true);
    } else {
      setMvrBatchModalOpen(true);
    }
  };

  const handleBatchSubmit = () => {
    setStandardBatchModalOpen(false);
    setIsLoading(true);
    setShowTable(false);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Show table after loading completes
          setTimeout(() => {
            setIsLoading(false);
            setShowTable(true);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  const handleMvrBatchSubmit = () => {
    setMvrBatchModalOpen(false);
    setMvrIsLoading(true);
    setMvrShowTable(false);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setMvrLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Show table after loading completes
          setTimeout(() => {
            setMvrIsLoading(false);
            setMvrShowTable(true);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  const handleHelpClick = () => {
    setHelpModalOpen(true);
  };

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
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Sidebar */}
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="batch-orders"
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && !isDesktop && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          width: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          maxWidth: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          overflow: "hidden",
          transition:
            "margin-left 0.3s ease, width 0.3s ease, max-width 0.3s ease",
        }}
      >
        {/* Header */}
        {isDesktop ? (
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
            showMobileUserMenu={showMobileUserMenu}
          />
        )}

        {/* Main - Exact Figma structure */}
        <div
          style={{
            display: "flex",
            paddingBottom: "24px",
            paddingTop:
              showNotification && isDesktop
                ? "136px"
                : isDesktop
                  ? "104px"
                  : "88px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            alignSelf: "stretch",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header section - Figma structure */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            {/* Container - Figma padding: 0 32px */}
            <div
              style={{
                display: "flex",
                padding: isDesktop ? "0 32px" : "0 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              {/* Page header - Figma gap: 16px */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                {/* Content - Figma gap: 20px */}
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
                  {/* Title and supporting text group - Exact Figma structure */}
                  <div
                    style={{
                      display: "flex",
                      minWidth: isDesktop ? "320px" : "auto",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Title - Exact Figma styling */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#181D27",
                        fontFamily:
                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "32px",
                      }}
                    >
                      Batch Orders
                    </div>
                    {/* Supporting text - Exact Figma styling */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily:
                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Easily create batch orders by uploading a spreadsheet with
                      the required information.
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={() => setActiveTab("standard")}
                        style={{
                          display: "flex",
                          minHeight: "40px",
                          padding: "8px 16px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px",
                          borderRight: "1px solid #D5D7DA",
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px",
                          background:
                            activeTab === "standard" ? "#ECEEF9" : "#FFF",
                          cursor: "pointer",
                          border: "none",
                          position: "relative",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (activeTab !== "standard") {
                            e.currentTarget.style.background = "#F9FAFB";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeTab !== "standard") {
                            e.currentTarget.style.background = "#FFF";
                          }
                        }}
                      >
                        <div
                          style={{
                            color:
                              activeTab === "standard" ? "#273572" : "#414651",
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Standard Orders
                        </div>
                      </button>
                      <button
                        onClick={() => setActiveTab("mvr")}
                        style={{
                          display: "flex",
                          minHeight: "40px",
                          padding: "8px 16px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px",
                          borderTopRightRadius: "8px",
                          borderBottomRightRadius: "8px",
                          background: activeTab === "mvr" ? "#ECEEF9" : "#FFF",
                          cursor: "pointer",
                          border: "none",
                          position: "relative",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (activeTab !== "mvr") {
                            e.currentTarget.style.background = "#F9FAFB";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeTab !== "mvr") {
                            e.currentTarget.style.background = "#FFF";
                          }
                        }}
                      >
                        <div
                          style={{
                            color: activeTab === "mvr" ? "#273572" : "#414651",
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          MVR Orders
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section - Table Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: isDesktop ? "0 32px" : "0 20px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    position: "relative",
                  }}
                >
                  {/* Table Header */}
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
                      position: "relative",
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
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                  position: "relative",
                                }}
                              >
                                Batch{" "}
                                {activeTab === "standard" ? "Standard" : "MVR"}{" "}
                                Orders
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
                          {/* Help Button */}
                          <button
                            onClick={handleHelpClick}
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
                              position: "relative",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#F9FAFB";
                              e.currentTarget.style.borderColor = "#98A2B3";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#FFF";
                              e.currentTarget.style.borderColor = "#D5D7DA";
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                position: "relative",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_6134_77588)">
                                <path
                                  d="M6.06001 6.00001C6.21675 5.55446 6.52611 5.17875 6.93331 4.93943C7.34052 4.70012 7.81927 4.61264 8.28479 4.69248C8.75032 4.77233 9.17255 5.01436 9.47673 5.3757C9.7809 5.73703 9.94738 6.19436 9.94668 6.66668C9.94668 8.00001 7.94668 8.66668 7.94668 8.66668M8.00001 11.3333H8.00668M14.6667 8.00001C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00001C1.33334 4.31811 4.31811 1.33334 8.00001 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8.00001Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_6134_77588">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
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
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                Help
                              </div>
                            </div>
                          </button>

                          {/* Spreadsheet Guideline Button */}
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
                              position: "relative",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#F9FAFB";
                              e.currentTarget.style.borderColor = "#98A2B3";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#FFF";
                              e.currentTarget.style.borderColor = "#D5D7DA";
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                position: "relative",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.3333 7.00001V4.53334C13.3333 3.41324 13.3333 2.85319 13.1153 2.42536C12.9236 2.04904 12.6176 1.74308 12.2413 1.55133C11.8135 1.33334 11.2534 1.33334 10.1333 1.33334H5.86666C4.74655 1.33334 4.1865 1.33334 3.75868 1.55133C3.38235 1.74308 3.07639 2.04904 2.88464 2.42536C2.66666 2.85319 2.66666 3.41324 2.66666 4.53334V11.4667C2.66666 12.5868 2.66666 13.1468 2.88464 13.5747C3.07639 13.951 3.38235 14.2569 3.75868 14.4487C4.1865 14.6667 4.74655 14.6667 5.86666 14.6667H7.66666M14.6667 14.6667L13.6667 13.6667M14.3333 12C14.3333 13.2887 13.2887 14.3333 12 14.3333C10.7113 14.3333 9.66666 13.2887 9.66666 12C9.66666 10.7113 10.7113 9.66668 12 9.66668C13.2887 9.66668 14.3333 10.7113 14.3333 12Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
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
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                Spreadsheet Guideline
                              </div>
                            </div>
                          </button>

                          {/* Download Batch Template Button */}
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
                              position: "relative",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#F9FAFB";
                              e.currentTarget.style.borderColor = "#98A2B3";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#FFF";
                              e.currentTarget.style.borderColor = "#D5D7DA";
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                position: "relative",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
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
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                Download Batch Template
                              </div>
                            </div>
                          </button>

                          {/* Start New Batch Button */}
                          <button
                            onClick={handleStartNewBatch}
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
                              position: "relative",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#2A3B87";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#344698";
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                position: "relative",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_6134_77609)">
                                <path
                                  d="M7.99998 5.33334V10.6667M5.33331 8.00001H10.6666M14.6666 8.00001C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8.00001C1.33331 4.31811 4.31808 1.33334 7.99998 1.33334C11.6819 1.33334 14.6666 4.31811 14.6666 8.00001Z"
                                  stroke="#8D9BD8"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_6134_77609">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
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
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                Start New Batch
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div
                    style={{
                      display: "flex",
                      minHeight: "400px",
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
                      position: "relative",
                    }}
                  >
                    {/* Content - Loading State, Table State, or Empty State */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: (activeTab === "standard" ? showTable : mvrShowTable) ? "flex-start" : "center",
                        alignItems: (activeTab === "standard" ? showTable : mvrShowTable) ? "flex-start" : "center",
                        gap: "20px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                        position: "relative",
                        minHeight: "500px",
                        padding: (activeTab === "standard" ? showTable : mvrShowTable) ? "0" : "60px 20px",
                      }}
                    >
                      {(activeTab === "standard" ? isLoading : mvrIsLoading) ? (
                        /* Loading State */
                        <>
                          {/* Loading Icon */}
                          <div
                            style={{
                              display: "flex",
                              width: "48px",
                              height: "48px",
                              padding: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              aspectRatio: "1/1",
                              borderRadius: "10px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              position: "relative",
                            }}
                          >
                            <svg
                              style={{
                                width: "24px",
                                height: "24px",
                                flexShrink: 0,
                                position: "absolute",
                                left: "12px",
                                top: "12px",
                                animation: "spin 1s linear infinite",
                              }}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2.25V4.75M12 18V22M5.75 12H2.25M21.25 12H19.75M18.4571 18.4571L17.75 17.75M18.6642 5.41579L17.25 6.83M4.92157 19.0784L7.75 16.25M5.12868 5.20868L7.25 7.33"
                                stroke="#414651"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          {/* Loading Message */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "8px",
                              width: "100%",
                              maxWidth: "600px",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                maxWidth: "352px",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "4px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#181D27",
                                  textAlign: "center",
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "24px",
                                  position: "relative",
                                }}
                              >
                                Data Loaded Successfully
                              </div>
                              <div
                                style={{
                                  alignSelf: "stretch",
                                  color: "#535862",
                                  textAlign: "center",
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                <span>If you are running a large number of order, this HTML page may time out before order import has completed. If this happen do not try to restart Order Import. You may interrupt the run already in progress. Instead check the </span>
                                <span style={{ color: "#344698", textDecoration: "underline" }}>Bulk Import List</span>
                                <span>. They will show up there when the bulk has finished processing your file.</span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                maxWidth: "320px",
                                alignItems: "center",
                                gap: "12px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  height: "8px",
                                  flex: "1 0 0",
                                  borderRadius: "8px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    height: "8px",
                                    borderRadius: "9999px",
                                    background: "#D5D7DA",
                                    position: "absolute",
                                    left: "0px",
                                    top: "0px",
                                  }}
                                />
                                <div
                                  style={{
                                    width: `${loadingProgress}%`,
                                    height: "8px",
                                    borderRadius: "9999px",
                                    background: "#344698",
                                    position: "absolute",
                                    left: "0px",
                                    top: "0px",
                                    transition: "width 0.3s ease",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  color: "#414651",
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                {loadingProgress}%
                              </div>
                            </div>
                          </div>

                          {/* Admin and User Section */}
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              maxWidth: "412px",
                              padding: "16px",
                              alignItems: "flex-start",
                              gap: "8px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FAFAFA",
                              position: "relative",
                            }}
                          >
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
                                  color: "#414651",
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                Admin
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FAFAFA",
                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  CSD
                                </div>
                              </div>
                            </div>
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
                                  color: "#414651",
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                User
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FAFAFA",
                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Rjones
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : showTable ? (
                        /* Table State */
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            background: "#FFF",
                            position: "relative",
                            width: "100%",
                          }}
                        >
                          {/* Table Headers */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              alignSelf: "stretch",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div style={{ display: "flex", width: "110px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Batch Number</div>
                            </div>
                            <div style={{ display: "flex", width: "95px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Uploaded By</div>
                            </div>
                            <div style={{ display: "flex", width: "100px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Uploaded On</div>
                            </div>
                            <div style={{ display: "flex", width: "106px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Ordered By</div>
                            </div>
                            <div style={{ display: "flex", width: "100px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Status</div>
                            </div>
                            <div style={{ display: "flex", width: "69px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Count</div>
                            </div>
                            <div style={{ display: "flex", width: "69px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Success</div>
                            </div>
                            <div style={{ display: "flex", width: "61px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Failed</div>
                            </div>
                            <div style={{ display: "flex", width: "70px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Combined</div>
                            </div>
                            <div style={{ display: "flex", width: "100px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Start At</div>
                            </div>
                            <div style={{ display: "flex", flex: "1 0 0", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                              <div style={{ color: "#717680", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Message</div>
                            </div>
                            <div style={{ display: "flex", width: "48px", height: "36px", padding: "6px 12px", alignItems: "center", gap: "12px", borderBottom: "1px solid #E9EAEB", background: "#FFF" }}>
                            </div>
                          </div>

                          {/* Table Data Rows */}
                          {[0, 1, 2, 3].map((rowIdx) => (
                            <div
                              key={rowIdx}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                alignSelf: "stretch",
                                background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "#FFF",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                              onMouseEnter={() => setHoveredRowIndex(rowIdx)}
                              onMouseLeave={() => setHoveredRowIndex(null)}
                            >
                              {/* Batch Number Cell */}
                              <div style={{ display: "flex", width: "110px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  12345678_234567
                                </div>
                              </div>

                              {/* Uploaded By Cell */}
                              <div style={{ display: "flex", width: "95px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                                  [username]
                                </div>
                              </div>

                              {/* Uploaded On Cell */}
                              <div style={{ display: "flex", width: "100px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                  <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>00/00/00</div>
                                  <div style={{ color: "#535862", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>00:00:00</div>
                                </div>
                              </div>

                              {/* Ordered By Cell */}
                              <div style={{ display: "flex", width: "106px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                                  [username]
                                </div>
                              </div>

                              {/* Status Cell */}
                              <div style={{ display: "flex", width: "100px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{
                                  display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px",
                                  border: `1px solid ${rowIdx === 0 ? "#ABEFC6" : rowIdx === 1 ? "#B2DDFF" : rowIdx === 2 ? "#FECDCA" : "#FEDF89"}`,
                                  background: rowIdx === 0 ? "#ECFDF3" : rowIdx === 1 ? "#EFF8FF" : rowIdx === 2 ? "#FEF3F2" : "#FFFAEB"
                                }}>
                                  <div style={{
                                    color: rowIdx === 0 ? "#067647" : rowIdx === 1 ? "#175CD3" : rowIdx === 2 ? "#B42318" : "#B54708",
                                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "12px", fontWeight: 500, lineHeight: "18px"
                                  }}>
                                    {rowIdx === 0 ? "Success" : rowIdx === 1 ? "Processing" : rowIdx === 2 ? "Error" : "Failed"}
                                  </div>
                                </div>
                              </div>

                              {/* Count Cell */}
                              <div style={{ display: "flex", width: "69px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                                  {rowIdx < 2 ? "10" : rowIdx === 2 ? "0" : "1"}
                                </div>
                              </div>

                              {/* Success Cell */}
                              <div style={{ display: "flex", width: "69px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                                  {rowIdx < 2 ? "3" : rowIdx === 2 ? "0" : "1"}
                                </div>
                              </div>

                              {/* Failed Cell */}
                              <div style={{ display: "flex", width: "61px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                                  {rowIdx === 3 ? "1" : "0"}
                                </div>
                              </div>

                              {/* Combined Cell */}
                              <div style={{ display: "flex", width: "70px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                                  {rowIdx === 1 ? "Y" : rowIdx === 3 ? "1" : "0"}
                                </div>
                              </div>

                              {/* Start At Cell */}
                              <div style={{ display: "flex", width: "100px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                  <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>00/00/00</div>
                                  <div style={{ color: "#535862", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>00:00:00</div>
                                </div>
                              </div>

                              {/* Message Cell */}
                              <div style={{ display: "flex", flex: "1 0 0", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent" }}>
                              </div>

                              {/* Actions Cell */}
                              <div style={{ display: "flex", width: "48px", height: "52px", padding: "12px", alignItems: "center", borderBottom: "1px solid #E9EAEB", background: hoveredRowIndex === rowIdx ? "#F5F5F5" : "transparent", position: "relative" }}>
                                <button
                                  onClick={() => setActionMenuOpen(actionMenuOpen === rowIdx ? null : rowIdx)}
                                  style={{
                                    display: "flex",
                                    padding: "8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "8px",
                                    border: "none",
                                    background: hoveredRowIndex === rowIdx ? "#FDFDFD" : "transparent",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease"
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#FDFDFD";
                                  }}
                                  onMouseLeave={(e) => {
                                    if (actionMenuOpen !== rowIdx) {
                                      e.currentTarget.style.background = hoveredRowIndex === rowIdx ? "#FDFDFD" : "transparent";
                                    }
                                  }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 8.66663C8.36819 8.66663 8.66667 8.36815 8.66667 7.99996C8.66667 7.63177 8.36819 7.33329 8 7.33329C7.63181 7.33329 7.33333 7.63177 7.33333 7.99996C7.33333 8.36815 7.63181 8.66663 8 8.66663Z" stroke={hoveredRowIndex === rowIdx ? "#717680" : "#A4A7AE"} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 3.99996C8.36819 3.99996 8.66667 3.70148 8.66667 3.33329C8.66667 2.9651 8.36819 2.66663 8 2.66663C7.63181 2.66663 7.33333 2.9651 7.33333 3.33329C7.33333 3.70148 7.63181 3.99996 8 3.99996Z" stroke={hoveredRowIndex === rowIdx ? "#717680" : "#A4A7AE"} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 13.3333C8.36819 13.3333 8.66667 13.0348 8.66667 12.6666C8.66667 12.2984 8.36819 12 8 12C7.63181 12 7.33333 12.2984 7.33333 12.6666C7.33333 13.0348 7.63181 13.3333 8 13.3333Z" stroke={hoveredRowIndex === rowIdx ? "#717680" : "#A4A7AE"} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {actionMenuOpen === rowIdx && (
                                  <div
                                    data-dropdown-menu
                                    style={{
                                      position: "absolute",
                                      top: "100%",
                                      right: "8px",
                                      zIndex: 1000,
                                      width: "248px",
                                      borderRadius: "8px",
                                      border: "1px solid rgba(0, 0, 0, 0.08)",
                                      background: "#FFF",
                                      boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                      marginTop: "4px"
                                    }}
                                  >
                                    <div style={{ display: "flex", padding: "4px 0", flexDirection: "column", alignItems: "flex-start", alignSelf: "stretch" }}>
                                      {/* Stop Action */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "1px 6px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer"
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.querySelector('.menu-content').style.background = "#F9FAFB";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.querySelector('.menu-content').style.background = "transparent";
                                        }}
                                      >
                                        <div className="menu-content" style={{ display: "flex", padding: "8px", flexDirection: "column", alignItems: "flex-start", gap: "8px", flex: "1 0 0", borderRadius: "6px", transition: "background-color 0.2s ease" }}>
                                          <div style={{ display: "flex", alignItems: "center", gap: "8px", alignSelf: "stretch" }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                              <path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Stop</div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Data Action */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "1px 6px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer"
                                        }}
                                        onClick={() => {
                                          setBatchDetailsModalOpen(true);
                                          setActionMenuOpen(null);
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.querySelector('.menu-content').style.background = "#F9FAFB";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.querySelector('.menu-content').style.background = "transparent";
                                        }}
                                      >
                                        <div className="menu-content" style={{ display: "flex", padding: "8px", flexDirection: "column", alignItems: "flex-start", gap: "8px", flex: "1 0 0", borderRadius: "6px", transition: "background-color 0.2s ease" }}>
                                          <div style={{ display: "flex", alignItems: "center", gap: "8px", alignSelf: "stretch" }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                              <path d="M14 11H8M10 15H8M16 7H8M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H11.5M22 22L20.5 20.5M21.5 18C21.5 19.933 19.933 21.5 18 21.5C16.067 21.5 14.5 19.933 14.5 18C14.5 16.067 16.067 14.5 18 14.5C19.933 14.5 21.5 16.067 21.5 18Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Data</div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Details Action */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "1px 6px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer"
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.querySelector('.menu-content').style.background = "#F9FAFB";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.querySelector('.menu-content').style.background = "transparent";
                                        }}
                                      >
                                        <div className="menu-content" style={{ display: "flex", padding: "8px", flexDirection: "column", alignItems: "flex-start", gap: "8px", flex: "1 0 0", borderRadius: "6px", transition: "background-color 0.2s ease" }}>
                                          <div style={{ display: "flex", alignItems: "center", gap: "8px", alignSelf: "stretch" }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                              <path d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                              <path d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div style={{ color: "#181D27", fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Details</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Empty State */
                        <>
                          {/* Featured Icon */}
                          <div
                            style={{
                              display: "flex",
                              width: "48px",
                              height: "48px",
                              padding: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              aspectRatio: "1/1",
                              borderRadius: "10px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              position: "relative",
                            }}
                          >
                            <svg
                              style={{
                                width: "24px",
                                height: "24px",
                                flexShrink: 0,
                                position: "absolute",
                                left: "12px",
                                top: "12px",
                              }}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                                stroke="#414651"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          {/* Text Content */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "4px",
                              width: "100%",
                              maxWidth: "352px",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                textAlign: "center",
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              No Batches Found
                            </div>
                            <div
                              style={{
                                color: "#535862",
                                textAlign: "center",
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "20px",
                                position: "relative",
                              }}
                            >
                              You haven't uploaded any Batch Orders yet.
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={handleStartNewBatch}
                            style={{
                              display: "flex",
                              height: "44px",
                              padding: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "2px solid rgba(255, 255, 255, 0.12)",
                              background: "#344698",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                              position: "relative",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#2A3B87";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#344698";
                            }}
                          >
                            <svg
                              style={{
                                width: "20px",
                                height: "20px",
                                position: "relative",
                              }}
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.5 6.66667V13.3333M7.16666 10H13.8333M18.8333 10C18.8333 14.6024 15.1024 18.3333 10.5 18.3333C5.89762 18.3333 2.16666 14.6024 2.16666 10C2.16666 5.39763 5.89762 1.66667 10.5 1.66667C15.1024 1.66667 18.8333 5.39763 18.8333 10Z"
                                stroke="#8D9BD8"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
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
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                Start New Batch
                              </div>
                            </div>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Help Modal */}
      <BatchOrderingHelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />

      {/* Standard Orders Batch Modal */}
      <StandardOrdersBatchModal
        isOpen={standardBatchModalOpen}
        onClose={() => setStandardBatchModalOpen(false)}
        onSubmit={handleBatchSubmit}
      />

      {/* Batch Ordering Details Modal */}
      <BatchOrderingDetailsModal
        isOpen={batchDetailsModalOpen}
        onClose={() => setBatchDetailsModalOpen(false)}
      />

      {/* Spinning animation for loading icon */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default BatchOrders;
