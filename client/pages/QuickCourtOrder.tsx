import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import FormInput from "../components/ui/form-input";
import FormSelect from "../components/ui/form-select";


interface SubjectData {
  id: string;
  search: string;
  firstName: string;
  middle: string;
  lastName: string;
  state: string;
  county: string;
  dateOfBirth: string;
  socialSecurityTrace: string;
  yearsIn: string;
}

const QuickCourtOrder: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

  // Table data state
  const [subjects, setSubjects] = useState<SubjectData[]>(() => {
    const initialSubjects: SubjectData[] = [];
    for (let i = 0; i < 10; i++) {
      initialSubjects.push({
        id: `subject-${i + 1}`,
        search: "County Criminal",
        firstName: "",
        middle: "",
        lastName: "",
        state: "",
        county: "",
        dateOfBirth: "",
        socialSecurityTrace: "",
        yearsIn: "",
      });
    }
    return initialSubjects;
  });

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000); // 30 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
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

  const handleSubjectChange = (
    subjectId: string,
    field: keyof SubjectData,
    value: string,
  ) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === subjectId ? { ...subject, [field]: value } : subject,
      ),
    );
  };

  const addTenRows = () => {
    const newSubjects: SubjectData[] = [];
    const currentLength = subjects.length;
    for (let i = 0; i < 10; i++) {
      newSubjects.push({
        id: `subject-${currentLength + i + 1}`,
        search: "County Criminal",
        firstName: "",
        middle: "",
        lastName: "",
        state: "",
        county: "",
        dateOfBirth: "",
        socialSecurityTrace: "",
        yearsIn: "",
      });
    }
    setSubjects((prev) => [...prev, ...newSubjects]);
  };

  const handleSubmit = () => {
    console.log("Submitting court order with subjects:", subjects);
  };


  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Sidebar */}
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="quick-court-order"
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
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 700,
                          fontSize: "24px",
                          color: "rgba(24,29,39,1)",
                        }}
                      >
                        Quick Court Order
                      </span>
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
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "rgba(83,88,98,1)",
                        }}
                      >
                        Enter subject details to create a court order. Add
                        multiple rows as needed.{" "}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "rgba(83,88,98,1)",
                        }}
                      >
                        Need to submit multiple subjects at once?{" "}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "rgba(52,70,152,1)",
                          textDecoration: "underline",
                        }}
                      >
                        Use batch ordering
                      </span>
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
                    width: isDesktop ? "1080px" : "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    position: "relative",
                  }}
                >
                  {/* Section Headers */}
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
                        {/* Title */}
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
                                    fontWeight: 700,
                                    fontSize: "18px",
                                    color: "rgba(24,29,39,1)",
                                  }}
                                >
                                  Create Quick Court Order
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Actions */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
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
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "0 2px",
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
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    color: "rgba(65,70,81,1)",
                                  }}
                                >
                                  Submit Order For: Select User
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
                      </div>
                    </div>
                  </div>
                  {/* Table */}
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
                        background: "#FFF",
                        overflowX: "auto",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "171px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* Search Column Header */}
                        <div
                          style={{
                            display: "flex",
                            height: "36px",
                            padding: "6px 12px",
                            alignItems: "center",
                            gap: "12px",
                            alignSelf: "stretch",
                            borderBottom: "1px solid #E9EAEB",
                            background: "#FFF",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "'Public Sans'",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 700,
                                  fontSize: "12px",
                                  color: "rgba(113,118,128,1)",
                                }}
                              >
                                Search
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Search Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={subject.id}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  alignSelf: "stretch",
                                }}
                              >
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
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                    <div
                                      style={{
                                        flex: "1 0 0",
                                        color: "#181D27",
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
                                          color: "rgba(24,29,39,1)",
                                        }}
                                      >
                                        County Criminal
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
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Button Group */}
                    <div
                      style={{
                        display: "flex",
                        padding: "12px 0 0 12px",
                        alignItems: "center",
                        gap: "8px",
                        alignSelf: "stretch",
                        borderTop: "1px solid #D5D7DA",
                      }}
                    >
                      <div
                        onClick={addTenRows}
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
                        <div
                          style={{
                            display: "flex",
                            padding: "0 2px",
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
                                fontWeight: 700,
                                fontSize: "14px",
                                color: "rgba(65,70,81,1)",
                              }}
                            >
                              Add 10 Rows
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={handleSubmit}
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
                        <div
                          style={{
                            display: "flex",
                            padding: "0 2px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              color: "#FFF",
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
                                fontWeight: 700,
                                fontSize: "14px",
                                color: "rgba(255,255,255,1)",
                              }}
                            >
                              Submit Court Order
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default QuickCourtOrder;
