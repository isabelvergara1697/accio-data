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
          transition: "margin-left 0.3s ease",
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

        {/* Page Content */}
        <div
          style={{
            flex: 1,
            padding: isDesktop ? "0 32px 24px" : "0 20px 24px",
            paddingTop: showNotification && isDesktop ? "84px" : "0",
          }}
        >
          {/* Header section - Exact Figma structure */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
              paddingTop: "24px",
            }}
          >
            {/* Page header - gap: 16px */}
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
                  ...(isMobile
                    ? { flexDirection: "column", alignItems: "flex-start", gap: "16px", alignSelf: "stretch" }
                    : { alignItems: "flex-end", alignContent: "flex-end", gap: "20px 16px", alignSelf: "stretch", flexWrap: "wrap" })
                }}
              >
                {/* Title and subtitle group - matches Dashboard pattern */}
                <div className="page-title-group">
                  <h1 className="page-title" style={{ alignSelf: "stretch" }}>
                    Quick Court Order
                  </h1>
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#535862",
                      fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Enter subject details to create a court order. Add multiple rows as needed.{" "}
                    Need to submit multiple subjects at once?{" "}
                    <a
                      href="#"
                      style={{
                        color: "#34479A",
                        fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textDecoration: "underline",
                      }}
                    >
                      Use batch ordering
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            {/* Section Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <h2
                style={{
                  color: "#181D27",
                  fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Create Quick Court Order
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    color: "#414651",
                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Submit Order For:
                </span>
                <FormSelect
                  label=""
                  value={selectedUser}
                  onChange={setSelectedUser}
                  options={[
                    { value: "Select User", label: "Select User" },
                    { value: "current-user", label: "Current User" },
                    { value: "admin", label: "Admin" },
                  ]}
                  placeholder="Select User"
                  style={{ minWidth: "160px" }}
                />
              </div>
            </div>

            {/* Table Container */}
            <div
              style={{
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  overflowX: "auto",
                }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ minWidth: "140px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Search
                        </span>
                      </TableHead>
                      <TableHead style={{ minWidth: "120px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          First Name
                        </span>
                      </TableHead>
                      <TableHead style={{ minWidth: "100px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Middle
                        </span>
                      </TableHead>
                      <TableHead style={{ minWidth: "120px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Last Name
                        </span>
                      </TableHead>
                      <TableHead style={{ minWidth: "100px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          State
                        </span>
                      </TableHead>
                      <TableHead style={{ minWidth: "100px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          County
                        </span>
                      </TableHead>
                      <TableHead style={{ minWidth: "140px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Date of Birth
                        </span>
                      </TableHead>
                      <TableHead style={{ minWidth: "160px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Social Security Trace
                        </span>
                      </TableHead>
                      <TableHead style={{ minWidth: "100px", padding: "12px 16px" }}>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
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
                        <TableCell style={{ padding: "8px 16px" }}>
                          <FormSelect
                            label=""
                            value={subject.search}
                            onChange={(value) =>
                              handleSubjectChange(subject.id, "search", value)
                            }
                            options={[
                              { value: "County Criminal", label: "County Criminal" },
                              { value: "State Criminal", label: "State Criminal" },
                              { value: "Federal Criminal", label: "Federal Criminal" },
                            ]}
                            placeholder="Select search type"
                          />
                        </TableCell>
                        <TableCell style={{ padding: "8px 16px" }}>
                          <FormInput
                            label=""
                            value={subject.firstName}
                            onChange={(e) =>
                              handleSubjectChange(subject.id, "firstName", e.target.value)
                            }
                            placeholder="First name"
                          />
                        </TableCell>
                        <TableCell style={{ padding: "8px 16px" }}>
                          <FormInput
                            label=""
                            value={subject.middle}
                            onChange={(e) =>
                              handleSubjectChange(subject.id, "middle", e.target.value)
                            }
                            placeholder="Middle"
                          />
                        </TableCell>
                        <TableCell style={{ padding: "8px 16px" }}>
                          <FormInput
                            label=""
                            value={subject.lastName}
                            onChange={(e) =>
                              handleSubjectChange(subject.id, "lastName", e.target.value)
                            }
                            placeholder="Last name"
                          />
                        </TableCell>
                        <TableCell style={{ padding: "8px 16px" }}>
                          <FormSelect
                            label=""
                            value={subject.state}
                            onChange={(value) =>
                              handleSubjectChange(subject.id, "state", value)
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
                              handleSubjectChange(subject.id, "county", e.target.value)
                            }
                            placeholder="County"
                          />
                        </TableCell>
                        <TableCell style={{ padding: "8px 16px" }}>
                          <FormInput
                            label=""
                            value={subject.dateOfBirth}
                            onChange={(e) =>
                              handleSubjectChange(subject.id, "dateOfBirth", e.target.value)
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
                              handleSubjectChange(subject.id, "yearsIn", e.target.value)
                            }
                            placeholder="00"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Button
                variant="outline"
                onClick={addTenRows}
                style={{
                  display: "flex",
                  padding: "10px 16px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  color: "#414651",
                  fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F5F5F5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FFF";
                }}
              >
                Add 10 Rows
              </Button>
              
              <Button
                onClick={handleSubmit}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  border: "1px solid #34479A",
                  background: "#34479A",
                  color: "#FFF",
                  fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#273572";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#34479A";
                }}
              >
                Submit Court Order
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuickCourtOrder;
