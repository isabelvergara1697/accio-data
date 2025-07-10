import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserMenuDropdown } from "../components/UserMenuDropdown";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { MobileHeader } from "../components/MobileHeader";

// Document data structure based on Figma design
const documentSections = [
  {
    id: "general",
    title: "General Documents",
    count: 9,
    isOpen: true,
    documents: [
      { id: "1", name: "Quick Start Guide", size: "200 KB", type: "PDF" },
      { id: "2", name: "Web Demo", size: "200 KB", type: "PDF" },
      { id: "3", name: "User Guide", size: "200 KB", type: "PDF" },
      { id: "4", name: "Consumer FCR Rights", size: "200 KB", type: "PDF" },
      { id: "5", name: "WA Add On", size: "200 KB", type: "PDF" },
      { id: "6", name: "Article 23", size: "200 KB", type: "PDF" },
      { id: "7", name: "PSP Consent", size: "200 KB", type: "PDF" },
      { id: "8", name: "Applicant Release Form", size: "200 KB", type: "PDF" },
      {
        id: "9",
        name: "CBSV User Agreement - Social Security",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
  {
    id: "motor-vehicle",
    title: "Motor Vehicle Forms",
    count: 2,
    isOpen: true,
    documents: [
      {
        id: "10",
        name: "Release of Information Form - 29 CRF Drug and Alcohol Test",
        size: "200 KB",
        type: "PDF",
      },
      { id: "11", name: "Georgia MVR Form", size: "200 KB", type: "PDF" },
    ],
  },
  {
    id: "special-search",
    title: "Special Search Specific Forms",
    count: 24,
    isOpen: false,
    documents: [
      {
        id: "12",
        name: "FBI Identity History Check",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "13",
        name: "OPM Security Investigation",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "14",
        name: "Treasury Security Check",
        size: "200 KB",
        type: "PDF",
      },
      { id: "15", name: "DOJ Fingerprint Card", size: "200 KB", type: "PDF" },
      {
        id: "16",
        name: "ICE E-Verify Authorization",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
  {
    id: "security-manuals",
    title: "Security Manuals",
    count: 5,
    isOpen: false,
    documents: [
      {
        id: "17",
        name: "Background Check Protocol",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "18",
        name: "Security Clearance Guidelines",
        size: "200 KB",
        type: "PDF",
      },
      { id: "19", name: "Data Protection Manual", size: "200 KB", type: "PDF" },
      {
        id: "20",
        name: "Identity Verification Standards",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "21",
        name: "Compliance Assessment Guide",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
];

// Add styles for button hover states, document container borders, and responsive layouts
const documentLibraryStyles = `
  .secondary-button {
    border-radius: 8px;
    border: 1px solid #D5D7DA;
    background: #FFF;
    box-shadow: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
    transition: background 0.2s ease;
    cursor: pointer;
  }
    .secondary-button:hover {
    background: #F5F5F5 !important;
  }
  .quick-create-button {
    transition: all 0.2s ease;
    cursor: pointer;
  }
  .quick-create-button:hover {
    background: #2A3A82 !important;
  }
  .search-input {
    transition: background 0.2s ease;
  }
  .search-input:hover {
    background: #F5F5F5 !important;
  }
  .document-card {
    transition: background-color 0.2s ease;
  }
  .document-card:hover {
    background: #F5F5F5 !important;
  }
  .action-button {
    transition: background 0.2s ease;
  }
  .action-button:hover {
    background: #F5F5F5 !important;
  }
  .section-header-button {
    transition: background 0.2s ease;
  }
  .section-header-button:hover {
    background: #F5F5F5 !important;
  }

  /* Responsive layout utilities */
  @media (max-width: 767px) {
    .mobile-stack {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .mobile-buttons {
      justify-content: space-between !important;
      gap: 12px !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .tablet-layout {
      flex-direction: column !important;
      gap: 16px !important;
    }
    .tablet-buttons {
      flex-direction: row !important;
      justify-content: flex-start !important;
      gap: 12px !important;
    }
  }
`;

export default function DocumentLibrary() {
  const navigate = useNavigate();
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "general",
    "motor-vehicle",
  ]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (userMenuOpen && !target.closest("[data-user-menu]")) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userMenuOpen]);

  const toggleAccordion = (accordionId: string) => {
    setOpenAccordions((prev) =>
      prev.includes(accordionId)
        ? prev.filter((id) => id !== accordionId)
        : [...prev, accordionId],
    );
  };

  const FileIcon = () => (
    <div className="relative w-10 h-10">
      <svg
        className="w-8 h-10 absolute left-2 top-0"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 0.75H20C20.1212 0.75 20.2375 0.798089 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
          stroke="#D5D7DA"
          strokeWidth="1.5"
        />
        <path
          d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
          stroke="#D5D7DA"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute left-1 top-4 w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
        <span className="text-white font-bold" style={{ fontSize: "8px" }}>
          PDF
        </span>
      </div>
    </div>
  );

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  const handleSignOut = () => {
    navigate("/login");
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
      <style dangerouslySetInnerHTML={{ __html: documentLibraryStyles }} />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            width: "100vw",
            height: "100vh",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, #000 100%)",
            opacity: 0.7,
            backgroundColor: "#0A0D12",
            backdropFilter: "blur(4px)",
            position: "fixed",
            left: 0,
            top: 0,
          }}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="document-library"
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
      />

      {/* Main Content */}
      <div
        style={{
          marginLeft: isDesktop ? "296px" : "0",
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* Desktop Top Navigation Bar */}
        <Header
          isDesktop={isDesktop}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showMobileUserMenu={showMobileUserMenu}
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

        {/* Main Content Area */}
        <div
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            padding: isMobile ? "16px" : "32px",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "16px" : "32px",
          }}
        >
          {/* Page Header */}
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
              className={isMobile ? "mobile-stack" : "tablet-layout"}
              style={{
                display: "flex",
                alignItems: isMobile ? "stretch" : "flex-end",
                alignContent: "flex-end",
                gap: isMobile ? "16px" : "20px 16px",
                alignSelf: "stretch",
                flexWrap: isMobile ? "nowrap" : "wrap",
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
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#181D27",
                    fontFamily: "'Public Sans'",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "32px",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "rgba(24,29,39,1)",
                    }}
                  >
                    Document Library
                  </span>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "'Public Sans'",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      color: "rgba(83,88,98,1)",
                    }}
                  >
                    Browse and download key forms and documents needed for
                    screenings, compliance, and account setup.
                  </span>
                </div>
              </div>
              <div
                className={
                  isMobile
                    ? "mobile-buttons"
                    : !isDesktop
                      ? "tablet-buttons"
                      : ""
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "12px" : "12px",
                  justifyContent: isMobile ? "space-between" : "flex-start",
                  flex: isMobile ? "1 0 0" : "unset",
                }}
              >
                <div
                  className="secondary-button"
                  style={{
                    display: "flex",
                    minHeight: "32px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    flex: isMobile ? "1 0 0" : "unset",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "0px 2px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#414651",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "rgba(65,70,81,1)",
                        }}
                      >
                        Most Recent
                      </span>
                    </div>
                  </div>
                  <svg
                    style={{ width: "16px", height: "16px" }}
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
                </div>
                <div
                  className="secondary-button"
                  style={{
                    display: "flex",
                    minHeight: "32px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    flex: isMobile ? "1 0 0" : "unset",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "0px 2px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#414651",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "rgba(65,70,81,1)",
                        }}
                      >
                        All Files
                      </span>
                    </div>
                  </div>
                  <svg
                    style={{ width: "16px", height: "16px" }}
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
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  minWidth: "200px",
                  maxWidth: "320px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  flex: "1 0 0",
                }}
              >
                <div
                  className="search-input"
                  style={{
                    display: "flex",
                    padding: "6px 8px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: "1 0 0",
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
                        d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      style={{
                        display: "flex",
                        height: "20px",
                        flexDirection: "column",
                        justifyContent: "center",
                        flex: "1 0 0",
                        overflow: "hidden",
                        color: "#717680",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          color: "rgba(113,118,128,1)",
                        }}
                      >
                        Guide
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Sections */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                alignSelf: "stretch",
              }}
            >
              {documentSections.map((section) => (
                <div
                  key={section.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: isMobile
                          ? "0px 16px 0px 16px"
                          : "20px 24px 0px 24px",
                        alignItems: "flex-start",
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
                                fontFamily: "'Public Sans'",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "28px",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 600,
                                  fontSize: "18px",
                                  color: "rgba(24,29,39,1)",
                                }}
                              >
                                {section.title}
                              </span>
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
                                  fontFamily: "'Public Sans'",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "12px",
                                    color: "rgba(65,70,81,1)",
                                  }}
                                >
                                  {section.count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <button
                          className="section-header-button"
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow:
                              "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          onClick={() => toggleAccordion(section.id)}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              transform: openAccordions.includes(section.id)
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.2s ease",
                            }}
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

                    {/* Document Content */}
                    {openAccordions.includes(section.id) ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
                          gap: "16px",
                          padding: isMobile ? "0px 16px" : "20px 24px",
                          alignSelf: "stretch",
                        }}
                      >
                        {section.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="document-card"
                            style={{
                              display: "flex",
                              height: "92px",
                              padding: "16px",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "12px",
                              border: "1px solid #E9EAEB",
                              background: "#FFF",
                              cursor: "pointer",
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
                              <FileIcon />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "2px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    alignSelf: "stretch",
                                    overflow: "hidden",
                                    color: "#414651",
                                    textOverflow: "ellipsis",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    {doc.name}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#535862",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "18px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        color: "rgba(83,88,98,1)",
                                      }}
                                    >
                                      {doc.size}
                                    </span>
                                  </div>
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
                                className="action-button"
                                style={{
                                  display: "flex",
                                  padding: "6px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "6px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <svg
                                  style={{ width: "24px", height: "24px" }}
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
                                className="action-button"
                                style={{
                                  display: "flex",
                                  padding: "6px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "6px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <svg
                                  style={{ width: "24px", height: "24px" }}
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
                    ) : (
                      // Closed state with equal 20px top and bottom padding
                      <div
                        style={{
                          padding: isMobile
                            ? "0px 16px 0px 16px"
                            : "20px 24px 20px 24px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
