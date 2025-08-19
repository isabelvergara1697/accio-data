import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import FormInput from "../components/ui/form-input";
import FormSelect from "../components/ui/form-select";
import FormDateInput from "../components/ui/form-date-input";
import FormTextarea from "../components/ui/form-textarea";
import QuickCourtOrderLoading from "../components/QuickCourtOrderLoading";

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
  comments: string;
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
  const [isLoading, setIsLoading] = useState(false);

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
        comments: "",
      });
    }
    return initialSubjects;
  });

  // Focus state for inputs
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

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
        comments: "",
      });
    }
    setSubjects((prev) => [...prev, ...newSubjects]);
  };

  const handleSubmit = () => {
    console.log("Submitting court order with subjects:", subjects);
  };

  const copyFromPreviousRow = (currentIndex: number) => {
    if (currentIndex > 0) {
      const previousSubject = subjects[currentIndex - 1];
      const currentSubject = subjects[currentIndex];

      setSubjects((prev) =>
        prev.map((subject, index) =>
          index === currentIndex
            ? {
                ...subject,
                search: previousSubject.search,
                firstName: previousSubject.firstName,
                middle: previousSubject.middle,
                lastName: previousSubject.lastName,
                state: previousSubject.state,
                county: previousSubject.county,
                dateOfBirth: previousSubject.dateOfBirth,
                socialSecurityTrace: previousSubject.socialSecurityTrace,
                yearsIn: previousSubject.yearsIn,
                comments: previousSubject.comments,
              }
            : subject,
        ),
      );
    }
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
                  padding: "0 32px",
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
                                  color:
                                    "var(--colors-text-text-primary-900, #181D27)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-lg, 18px)",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight:
                                    "var(--Line-height-text-lg, 28px)",
                                }}
                              >
                                Create Quick Court Order
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
                              cursor: "pointer",
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
                                  color:
                                    "var(--colors-text-text-secondary-700, #414651)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Submit Order For: Select User
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
                        width: "100%",
                        minWidth: 0,
                        // Ensure horizontal scrolling works properly
                        scrollbarWidth: "thin",
                        scrollbarColor: "#D5D7DA #F5F5F5",
                      }}
                    >
                      {/* Search Column */}
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
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormSelect
                              label=""
                              value={subject.search}
                              onChange={(value) =>
                                handleSubjectChange(subject.id, "search", value)
                              }
                              options={[
                                {
                                  value: "County Criminal",
                                  label: "County Criminal",
                                },
                                {
                                  value: "County Civil Lower",
                                  label: "County Civil Lower",
                                },
                                {
                                  value: "County Civil Upper",
                                  label: "County Civil Upper",
                                },
                                {
                                  value: "Federal Criminal",
                                  label: "Federal Criminal",
                                },
                                {
                                  value: "Statewide Criminal",
                                  label: "Statewide Criminal",
                                },
                              ]}
                              placeholder="Select search type"
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Copy Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "60px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* Copy Column Header */}
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
                              Copy
                            </div>
                          </div>
                        </div>
                        {/* Copy Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`copy-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            {index > 0 && (
                              <button
                                onClick={() => copyFromPreviousRow(index)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "#344698",
                                  fontFamily: "'Public Sans'",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#F0F4FF";
                                  e.currentTarget.style.textDecoration = "none";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";
                                  e.currentTarget.style.textDecoration =
                                    "underline";
                                }}
                              >
                                Copy
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* First Name Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "110px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* First Name Column Header */}
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
                                First Name
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* First Name Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`firstName-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormInput
                              label=""
                              value={subject.firstName}
                              onChange={(e) =>
                                handleSubjectChange(
                                  subject.id,
                                  "firstName",
                                  e.target.value,
                                )
                              }
                              onFocus={() =>
                                setFocusedInput(`firstName-${subject.id}`)
                              }
                              onBlur={() => setFocusedInput(null)}
                              isFocused={
                                focusedInput === `firstName-${subject.id}`
                              }
                              placeholder={index === 0 ? "John" : ""}
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Middle Name Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "106px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* Middle Name Column Header */}
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
                                Middle
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Middle Name Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`middle-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormInput
                              label=""
                              value={subject.middle}
                              onChange={(e) =>
                                handleSubjectChange(
                                  subject.id,
                                  "middle",
                                  e.target.value,
                                )
                              }
                              onFocus={() =>
                                setFocusedInput(`middle-${subject.id}`)
                              }
                              onBlur={() => setFocusedInput(null)}
                              isFocused={
                                focusedInput === `middle-${subject.id}`
                              }
                              placeholder={index === 0 ? "R" : ""}
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Last Name Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "106px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* Last Name Column Header */}
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
                                Last Name
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Last Name Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`lastName-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormInput
                              label=""
                              value={subject.lastName}
                              onChange={(e) =>
                                handleSubjectChange(
                                  subject.id,
                                  "lastName",
                                  e.target.value,
                                )
                              }
                              onFocus={() =>
                                setFocusedInput(`lastName-${subject.id}`)
                              }
                              onBlur={() => setFocusedInput(null)}
                              isFocused={
                                focusedInput === `lastName-${subject.id}`
                              }
                              placeholder={index === 0 ? "Doe" : ""}
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* State Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "96px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* State Column Header */}
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
                                State
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* State Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`state-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormSelect
                              label=""
                              value={subject.state}
                              onChange={(value) => {
                                handleSubjectChange(subject.id, "state", value);
                                // Clear county when state changes
                                handleSubjectChange(subject.id, "county", "");
                              }}
                              options={[
                                { value: "TX", label: "TX" },
                                { value: "CA", label: "CA" },
                                { value: "NY", label: "NY" },
                                { value: "FL", label: "FL" },
                                { value: "IL", label: "IL" },
                                { value: "PA", label: "PA" },
                                { value: "OH", label: "OH" },
                                { value: "GA", label: "GA" },
                                { value: "NC", label: "NC" },
                                { value: "MI", label: "MI" },
                              ]}
                              placeholder={index === 0 ? "TX" : ""}
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* County Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "96px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* County Column Header */}
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
                                County
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* County Column Rows */}
                        {subjects.map((subject, index) => {
                          // Get county options based on selected state
                          const getCountyOptions = (state: string) => {
                            switch (state) {
                              case "TX":
                                return [
                                  { value: "Harris", label: "Harris" },
                                  { value: "Dallas", label: "Dallas" },
                                  { value: "Tarrant", label: "Tarrant" },
                                  { value: "Bexar", label: "Bexar" },
                                  { value: "Travis", label: "Travis" },
                                  { value: "Collin", label: "Collin" },
                                  { value: "Hidalgo", label: "Hidalgo" },
                                  { value: "El Paso", label: "El Paso" },
                                  { value: "Denton", label: "Denton" },
                                  { value: "Fort Bend", label: "Fort Bend" },
                                ];
                              case "CA":
                                return [
                                  { value: "Los Angeles", label: "Los Angeles" },
                                  { value: "San Diego", label: "San Diego" },
                                  { value: "Orange", label: "Orange" },
                                  { value: "Riverside", label: "Riverside" },
                                  { value: "San Bernardino", label: "San Bernardino" },
                                  { value: "Santa Clara", label: "Santa Clara" },
                                  { value: "Alameda", label: "Alameda" },
                                  { value: "Sacramento", label: "Sacramento" },
                                  { value: "Contra Costa", label: "Contra Costa" },
                                  { value: "Fresno", label: "Fresno" },
                                ];
                              case "NY":
                                return [
                                  { value: "New York", label: "New York" },
                                  { value: "Kings", label: "Kings" },
                                  { value: "Queens", label: "Queens" },
                                  { value: "Suffolk", label: "Suffolk" },
                                  { value: "Bronx", label: "Bronx" },
                                  { value: "Nassau", label: "Nassau" },
                                  { value: "Westchester", label: "Westchester" },
                                  { value: "Erie", label: "Erie" },
                                  { value: "Monroe", label: "Monroe" },
                                  { value: "Richmond", label: "Richmond" },
                                ];
                              default:
                                return [
                                  { value: "Harris", label: "Harris" },
                                  { value: "Dallas", label: "Dallas" },
                                  { value: "Tarrant", label: "Tarrant" },
                                  { value: "Bexar", label: "Bexar" },
                                  { value: "Travis", label: "Travis" },
                                  { value: "Collin", label: "Collin" },
                                  { value: "Hidalgo", label: "Hidalgo" },
                                  { value: "El Paso", label: "El Paso" },
                                  { value: "Denton", label: "Denton" },
                                  { value: "Fort Bend", label: "Fort Bend" },
                                ];
                            }
                          };

                          return (
                            <div
                              key={`county-${subject.id}`}
                              style={{
                                display: "flex",
                                height: "52px",
                                padding: "12px 6px",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom:
                                  index < subjects.length - 1
                                    ? "1px solid #E9EAEB"
                                    : "none",
                              }}
                            >
                              <FormSelect
                                label=""
                                value={subject.county}
                                onChange={(value) =>
                                  handleSubjectChange(subject.id, "county", value)
                                }
                                options={getCountyOptions(subject.state || "TX")}
                                placeholder={index === 0 ? "Harris" : ""}
                                style={{
                                  width: "100%",
                                  gap: "0px",
                                  justifyContent: "center",
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Date of Birth Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "122px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* Date of Birth Column Header */}
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
                                Date of Birth
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Date of Birth Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`dateOfBirth-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormDateInput
                              label=""
                              value={subject.dateOfBirth}
                              onChange={(date) =>
                                handleSubjectChange(subject.id, "dateOfBirth", date)
                              }
                              onFocus={() =>
                                setFocusedInput(`dateOfBirth-${subject.id}`)
                              }
                              onBlur={() => setFocusedInput(null)}
                              isFocused={
                                focusedInput === `dateOfBirth-${subject.id}`
                              }
                              placeholder=""
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Social Security Trace Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "132px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* Social Security Trace Column Header */}
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
                                Social Security Trace
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Social Security Trace Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`socialSecurityTrace-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormInput
                              label=""
                              value={subject.socialSecurityTrace}
                              onChange={(e) =>
                                handleSubjectChange(
                                  subject.id,
                                  "socialSecurityTrace",
                                  e.target.value,
                                )
                              }
                              onFocus={() =>
                                setFocusedInput(`socialSecurityTrace-${subject.id}`)
                              }
                              onBlur={() => setFocusedInput(null)}
                              isFocused={
                                focusedInput === `socialSecurityTrace-${subject.id}`
                              }
                              placeholder={index === 0 ? "000-000-000" : ""}
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Years to Search Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "96px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* Years to Search Column Header */}
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
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Years to Search
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Years to Search Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`yearsIn-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormInput
                              label=""
                              value={subject.yearsIn}
                              onChange={(e) =>
                                handleSubjectChange(
                                  subject.id,
                                  "yearsIn",
                                  e.target.value,
                                )
                              }
                              onFocus={() =>
                                setFocusedInput(`yearsIn-${subject.id}`)
                              }
                              onBlur={() => setFocusedInput(null)}
                              isFocused={
                                focusedInput === `yearsIn-${subject.id}`
                              }
                              placeholder={index === 0 ? "00" : ""}
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Comments Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "309px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flexShrink: 0,
                        }}
                      >
                        {/* Comments Column Header */}
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
                                Comments
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Comments Column Rows */}
                        {subjects.map((subject, index) => (
                          <div
                            key={`comments-${subject.id}`}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px 6px",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom:
                                index < subjects.length - 1
                                  ? "1px solid #E9EAEB"
                                  : "none",
                            }}
                          >
                            <FormTextarea
                              label=""
                              value={subject.comments}
                              onChange={(e) =>
                                handleSubjectChange(
                                  subject.id,
                                  "comments",
                                  e.target.value,
                                )
                              }
                              onFocus={() =>
                                setFocusedInput(`comments-${subject.id}`)
                              }
                              onBlur={() => setFocusedInput(null)}
                              isFocused={
                                focusedInput === `comments-${subject.id}`
                              }
                              placeholder=""
                              rows={1}
                              style={{
                                width: "100%",
                                gap: "0px",
                                justifyContent: "center",
                              }}
                            />
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
                              color:
                                "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Add 10 Rows
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
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#2D3985";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#344698";
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
                              color: "var(--Colors-Text-text-white, #FFF)",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Submit Court Order
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
