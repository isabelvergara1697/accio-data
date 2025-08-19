import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import FormInput from "../components/ui/form-input";
import FormSelect from "../components/ui/form-select";
import FormDateInput from "../components/ui/form-date-input";
import FormTextarea from "../components/ui/form-textarea";
import TableLoadingState from "../components/TableLoadingState";
import QuickCourtOrderConfirmation from "../components/QuickCourtOrderConfirmation";

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
  const navigate = useNavigate();
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
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    setIsLoading(true);

    // Simulate processing time - replace with actual API call
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmation(true);
    }, 5000);
  };

  const handleSeeAllOrders = () => {
    navigate("/invites-orders", { state: { activeTab: "orders" } });
  };

  const handleNewQuickCourtOrder = () => {
    setShowConfirmation(false);
    // Reset all form data
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
    setSubjects(initialSubjects);
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
          {/* Header section */}
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
                padding: isDesktop ? "0 32px" : "0 20px",
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
                      minWidth: isDesktop ? "320px" : "auto",
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
                        fontFamily:
                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "32px",
                      }}
                    >
                      Quick Court Order
                    </div>
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
                      Enter subject details to create a court order. Add
                      multiple rows as needed.{" "}
                      <span
                        style={{
                          color: "#344698",
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
                              Create Quick Court Order
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table or Confirmation */}
                {showConfirmation ? (
                  <QuickCourtOrderConfirmation
                    onSeeAllOrders={handleSeeAllOrders}
                    onNewQuickCourtOrder={handleNewQuickCourtOrder}
                  />
                ) : (
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
                      position: "relative",
                    }}
                  >
                    {isLoading && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "#FFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 10,
                        }}
                      >
                        <TableLoadingState
                          onClose={() => setIsLoading(false)}
                        />
                      </div>
                    )}

                    {/* Table Content - Simplified for demo */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          padding: "12px",
                          border: "1px solid #E9EAEB",
                          borderRadius: "8px",
                          background: "#FAFAFA",
                        }}
                      >
                        <p>Table content would go here...</p>
                        <p>This is a simplified version for demonstration.</p>
                      </div>

                      {/* Action Buttons */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingTop: "12px",
                        }}
                      >
                        <button
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
                        >
                          Add 10 Rows
                        </button>
                        <button
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
                            color: "#FFF",
                            fontFamily: "'Public Sans'",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Submit Court Order
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuickCourtOrder;
