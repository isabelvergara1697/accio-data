import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import FormInput from "../components/ui/form-input";
import FormSelect from "../components/ui/form-select";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

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

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000); // 30 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Sample state options
  const stateOptions = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  // Initial subject data with 10 rows
  const [subjects, setSubjects] = useState<SubjectData[]>(() => {
    const initialSubjects: SubjectData[] = [];
    for (let i = 0; i < 10; i++) {
      initialSubjects.push({
        id: `subject-${i + 1}`,
        search: i === 0 ? "County Criminal" : "County Criminal",
        firstName: i === 0 ? "John" : "",
        middle: i === 0 ? "R" : "",
        lastName: i === 0 ? "Doe" : "",
        state: i === 0 ? "TX" : "",
        county: i === 0 ? "AK" : "",
        dateOfBirth: i === 0 ? "01/25/90" : "",
        socialSecurityTrace: i === 0 ? "000-000-000" : "",
        yearsIn: i === 0 ? "00" : "",
      });
    }
    return initialSubjects;
  });

  const [selectedUser, setSelectedUser] = useState("Select User");

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
    // TODO: Implement submission logic
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
                        multiple rows as needed. Need to submit multiple
                        subjects at once?{" "}
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

          {/* Section - Figma structure for form content */}
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
            {/* Container - Figma padding: 0 32px */}
            <div
              style={{
                display: "flex",
                padding: isDesktop ? "0 32px" : "0 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              {/* Form Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  width: "100%",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                {/* Section Headers - Matching Figma */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0px",
                    width: "100%",
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
                                lineHeight: "var(--Line-height-text-lg, 28px)",
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
                                color: "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
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
                    padding: "0px 16px 16px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    borderRadius: "0px 0px 12px 12px",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    marginTop: "-1px",
                  }}
                >
                  <div
                    style={{
                      overflowX: "auto",
                      overflowY: "hidden",
                      width: "100%",
                      maxWidth: "100%",
                      position: "relative",
                    }}
                  >
                    <Table style={{ minWidth: "600px", width: "auto", margin: "0", borderSpacing: "0", borderCollapse: "separate" }}>
                      <TableHeader>
                        <TableRow>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              width: "171px",
                              minWidth: "171px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              Search
                            </span>
                          </TableHead>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              minWidth: "120px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              First Name
                            </span>
                          </TableHead>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              minWidth: "100px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              Middle
                            </span>
                          </TableHead>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              minWidth: "120px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Last Name
                            </span>
                          </TableHead>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              minWidth: "100px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              State
                            </span>
                          </TableHead>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              minWidth: "100px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              County
                            </span>
                          </TableHead>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              minWidth: "140px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              Date of Birth
                            </span>
                          </TableHead>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              minWidth: "160px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              Social Security Trace
                            </span>
                          </TableHead>
                          <TableHead
                            style={{
                              height: "36px",
                              padding: "6px 12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              minWidth: "100px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--colors-text-text-quaternary-500, #717680)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-xs, 12px)",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-xs, 18px)",
                              }}
                            >
                              Years In
                            </span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subjects.map((subject, index) => (
                          <TableRow key={subject.id}>
                            <TableCell
                              style={{
                                height: "52px",
                                padding: "12px 6px",
                                borderBottom: "1px solid #E9EAEB",
                              }}
                            >
                              <FormSelect
                                label=""
                                value={subject.search}
                                onChange={(value) =>
                                  handleSubjectChange(
                                    subject.id,
                                    "search",
                                    value,
                                  )
                                }
                                options={[
                                  {
                                    value: "County Criminal",
                                    label: "County Criminal",
                                  },
                                  {
                                    value: "State Criminal",
                                    label: "State Criminal",
                                  },
                                  {
                                    value: "Federal Criminal",
                                    label: "Federal Criminal",
                                  },
                                ]}
                                placeholder="Select search type"
                                style={{
                                  height: "32px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ padding: "8px 16px" }}>
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
                                placeholder="First name"
                              />
                            </TableCell>
                            <TableCell style={{ padding: "8px 16px" }}>
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
                                placeholder="Middle"
                              />
                            </TableCell>
                            <TableCell style={{ padding: "8px 16px" }}>
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
                                placeholder="Last name"
                              />
                            </TableCell>
                            <TableCell style={{ padding: "8px 16px" }}>
                              <FormSelect
                                label=""
                                value={subject.state}
                                onChange={(value) =>
                                  handleSubjectChange(
                                    subject.id,
                                    "state",
                                    value,
                                  )
                                }
                                options={stateOptions}
                                placeholder="State"
                              />
                            </TableCell>
                            <TableCell style={{ padding: "8px 16px" }}>
                              <FormInput
                                label=""
                                value={subject.county}
                                onChange={(e) =>
                                  handleSubjectChange(
                                    subject.id,
                                    "county",
                                    e.target.value,
                                  )
                                }
                                placeholder="County"
                              />
                            </TableCell>
                            <TableCell style={{ padding: "8px 16px" }}>
                              <FormInput
                                label=""
                                value={subject.dateOfBirth}
                                onChange={(e) =>
                                  handleSubjectChange(
                                    subject.id,
                                    "dateOfBirth",
                                    e.target.value,
                                  )
                                }
                                placeholder="MM/DD/YY"
                              />
                            </TableCell>
                            <TableCell style={{ padding: "8px 16px" }}>
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
                                placeholder="000-000-000"
                              />
                            </TableCell>
                            <TableCell style={{ padding: "8px 16px" }}>
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
                                placeholder="00"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Button Group - Matching Figma */}
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
      </main>
    </div>
  );
};

export default QuickCourtOrder;
