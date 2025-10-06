import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Checkbox } from "../components/ui/checkbox";
import { Home, ChevronRight, ChevronDown } from "lucide-react";

export default function AdverseActionProcess() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showNotification] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 640 && window.innerWidth < 1024,
  );

  // Section expansion state - start with sections expanded to show content
  const [preAdverseExpanded, setPreAdverseExpanded] = useState(true);
  const [pendingDocsExpanded, setPendingDocsExpanded] = useState(true);
  const [subjectInfoExpanded, setSubjectInfoExpanded] = useState(true);

  // Form state
  const [requireApplicantPay, setRequireApplicantPay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = () => {
    navigate("/login");
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

  const handleBreadcrumbClick = (path: string) => {
    if (path === "order-details") {
      navigate(`/order-details/${orderId}`);
    } else if (path === "invites-orders") {
      navigate("/invites-orders");
    } else if (path === "dashboard") {
      navigate("/dashboard");
    }
  };

  const handleGoBack = () => {
    navigate(`/order-details/${orderId}`);
  };

  const handleSaveDraft = () => {
    console.log("Save as draft");
  };

  const handleSubmit = () => {
    console.log("Submit order");
    navigate(`/order-details/${orderId}`);
  };

  const preAdverseRows = [
    {
      letterDescription: "Letter Description",
      jurisdictionType: "Jurisdiction Type",
      applicantLocation: "Applicant's Location",
      actionLabel: "Attention Required",
    },
    {
      letterDescription: "Test",
      jurisdictionType: "Applicant's Location",
      applicantLocation: "Applicant's Location",
      actionLabel: "Preview Letter",
    },
    {
      letterDescription: "Pre-adverse General",
      jurisdictionType: "Applicant's Location",
      applicantLocation: "Applicant's Location",
      actionLabel: "Click to Upload",
    },
  ];

  const pendingDocumentRows = [
    {
      documentName: { label: "SSA-89", isLink: true },
      documentsLabel: "Click to Upload",
    },
    {
      documentName: { label: "Resume", isLink: false },
      documentsLabel: "Click to Upload",
    },
    {
      documentName: { label: "Resume", isLink: false },
      documentsLabel: "Click to Upload",
    },
  ];

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

        {/* Main Content with proper spacing */}
        <div
          style={{
            paddingTop: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
          }}
        >
          {/* Header Section with Breadcrumbs and Title */}
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
              {/* Breadcrumbs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() => handleBreadcrumbClick("dashboard")}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    borderRadius: "0px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <Home style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
                </button>
                <ChevronRight
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "#A4A7AE",
                    strokeWidth: "1.33333",
                  }}
                />
                <button
                  onClick={() => handleBreadcrumbClick("invites-orders")}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    padding: 0,
                  }}
                >
                  Checked Invidividuals
                </button>
                <ChevronRight
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "#A4A7AE",
                    strokeWidth: "1.33333",
                  }}
                />
                <button
                  onClick={() => handleBreadcrumbClick("order-details")}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    padding: 0,
                  }}
                >
                  Order #{orderId || "38138"}
                </button>
                <ChevronRight
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "#A4A7AE",
                    strokeWidth: "1.33333",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0px",
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Create Adverse Action Process
                </div>
              </div>

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
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "20px 16px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
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
                        fontFamily: "Public Sans",
                        fontSize: "24px",
                        fontWeight: 600,
                        lineHeight: "32px",
                      }}
                    >
                      Create Adverse Action Process: Submit or Save Order.
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
                      Please review the details of your order below.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div
            style={{
              display: "flex",
              padding: "0 32px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
              paddingBottom: "40px",
            }}
          >
            {/* Authorize and Continue Section */}
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
                overflow: "hidden",
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
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                    }}
                  >
                    Authorize and Continue
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  padding: "12px 24px 16px 24px",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                  borderRadius: "0px 0px 0 0",
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
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    Order Total $37.88
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <button
                      onClick={handleGoBack}
                      style={{
                        display: "flex",
                        padding: "12px",
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
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Go Back
                      </div>
                    </button>
                    <button
                      onClick={handleSaveDraft}
                      style={{
                        display: "flex",
                        padding: "12px",
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
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Save as a Draft
                      </div>
                    </button>
                    <button
                      onClick={handleSubmit}
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
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Submit Now
                      </div>
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#535862",
                      textAlign: "center",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Applicant is not paying for this order
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "2px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        checked={requireApplicantPay}
                        onCheckedChange={(checked) => setRequireApplicantPay(!!checked)}
                      />
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
                      Require Applicant to pay for order
                    </div>
                  </div>
                </div>

                <svg
                  width="1032"
                  height="9"
                  viewBox="0 0 1032 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    alignSelf: "stretch",
                  }}
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M1032 5H0V4H1032V5Z" fill="#E9EAEB" />
                </svg>

                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  The information provided is a consumer report as defined in the federal Fair
                  Credit Reporting Act [15 U.S.C. 1681-1681u]. It contains confidential information
                  on the individual named. It is submitted to the conditions contained in your
                  Subscriber Agreement with Acme inc. and may be used solely as a factor in
                  evaluating the named individual for property renting/leasing, employment,
                  promotion, reassignment or retention as an employee. Acme inc. maintains strict
                  procedures designed to ensure that the information is complete and up to date.
                  While the information furnished is from reliable sources, its accuracy is not
                  guaranteed. Proper use of this report and final verification of the named
                  individual's identity is your sole responsibility. If any adverse action is taken
                  based in whole or in part on this consumer report, a copy of this report and a
                  summary of the consumer's rights must be provided to the consumer prior to taking
                  adverse action. If you have any questions regarding the accuracy or completeness
                  of this report, please contact Acme inc. at{" "}
                  <span style={{ textDecoration: "underline" }}>800-777-7777</span>. The summary of
                  consumer's rights is available in the help section of the website.
                </div>
              </div>
            </div>

            {/* Pre Adverse Action Letter Section */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                overflow: "hidden",
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
                      flex: "1 0 0",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
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
                        Pre Adverse Action Letter
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "2px 8px",
                          alignItems: "center",
                          borderRadius: "9999px",
                          border: "1px solid #F9DBAF",
                          background: "#FEF6EE",
                        }}
                      >
                        <div
                          style={{
                            color: "#B93815",
                            textAlign: "center",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "18px",
                          }}
                        >
                          Attention Required
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      Days before sending adverse letter will be determined when waiting for a
                      pre-adverse response
                    </div>
                  </div>
                  <button
                    onClick={() => setPreAdverseExpanded(!preAdverseExpanded)}
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
                    <ChevronDown
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#A4A7AE",
                        strokeWidth: "1.66667",
                        transform: preAdverseExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                </div>
              </div>

              {preAdverseExpanded && (
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 20px 24px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                      }}
                    >
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Letter Description
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Letter Description
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Test
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Pre-adverse General
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                      }}
                    >
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Jurisdiction Type
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Jurisdiction Type
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Applicant's Location
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Applicant's Location
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                      }}
                    >
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Actions
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <button
                          style={{
                            color: "#273572",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                            textDecoration: "underline",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          Attention Required
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <button
                          style={{
                            color: "#273572",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                            textDecoration: "underline",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          Preview Letter
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "12px",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderBottom: "1px solid #E9EAEB",
                        }}
                      >
                        <button
                          style={{
                            color: "#273572",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                            textDecoration: "underline",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          Click to Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pending Documents Section */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                overflow: "hidden",
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
                      flex: "1 0 0",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
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
                        Pending Documents
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "2px 8px",
                          alignItems: "center",
                          borderRadius: "9999px",
                          border: "1px solid #F9DBAF",
                          background: "#FEF6EE",
                        }}
                      >
                        <div
                          style={{
                            color: "#B93815",
                            textAlign: "center",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "18px",
                          }}
                        >
                          Pending Documents
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      You have requested one or more searches with this order and any associated
                      orders that will require special forms. These forms must be sent in before we
                      begin researching this subject. A reminder will appear in the HTML report for
                      this subject.
                    </div>
                  </div>
                  <button
                    onClick={() => setPendingDocsExpanded(!pendingDocsExpanded)}
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
                    <ChevronDown
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#A4A7AE",
                        strokeWidth: "1.66667",
                        transform: pendingDocsExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                </div>
              </div>

              {pendingDocsExpanded && (
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 20px 24px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                      }}
                    >
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Document Name
                        </div>
                      </div>
                      {["SSA-89", "Resume", "Resume"].map((doc, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            height: "36px",
                            padding: "12px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderBottom: "1px solid #E9EAEB",
                          }}
                        >
                          <button
                            style={{
                              color: idx === 0 ? "#273572" : "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: idx === 0 ? 600 : 500,
                              lineHeight: "20px",
                              textDecoration: idx === 0 ? "underline" : "none",
                              background: "transparent",
                              border: "none",
                              cursor: idx === 0 ? "pointer" : "default",
                              padding: 0,
                            }}
                          >
                            {doc}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                      }}
                    >
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Documents
                        </div>
                      </div>
                      {[0, 1, 2].map((idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            height: "36px",
                            padding: "12px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderBottom: "1px solid #E9EAEB",
                          }}
                        >
                          <button
                            style={{
                              color: "#273572",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 600,
                              lineHeight: "20px",
                              textDecoration: "underline",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            Click to Upload
                          </button>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                      }}
                    >
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Request From Applicant
                        </div>
                      </div>
                      {[0, 1, 2].map((idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            height: "36px",
                            padding: "12px",
                            alignItems: "center",
                            gap: "12px",
                            alignSelf: "stretch",
                            borderBottom: "1px solid #E9EAEB",
                          }}
                        >
                          <Checkbox />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Billing Information Section */}
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
                overflow: "hidden",
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
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Billing Information
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "12px 24px 16px 24px",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                  borderRadius: "0px 0px 0 0",
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
                    fontSize: "12px",
                  }}
                >
                  {[
                    { header: "Included", values: ["", "N"] },
                    { header: "Search Type", values: ["I-9 Package", "I-9 Form Creation"] },
                    { header: "Location / Adjustment", values: ["[Value]", "[Value]"] },
                    { header: "Price", values: ["0.00", "0.00"] },
                    { header: "Adjustment", values: ["0.00", "0.00"] },
                    { header: "3rd Party Fees", values: ["0.00", "0.00"] },
                    { header: "Taxes", values: ["0.41", "0.00"] },
                    { header: "Total", values: ["0.41", "5.00", "5.41"] },
                  ].map((col, colIdx) => (
                    <div
                      key={colIdx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                      }}
                    >
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          {col.header}
                        </div>
                      </div>
                      {col.values.map((value, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            height: "36px",
                            padding: "12px",
                            alignItems: "center",
                            alignSelf: "stretch",
                            borderBottom: "1px solid #E9EAEB",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subject Information Section */}
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
                      flex: "1 0 0",
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
                      Subject Information
                    </div>
                  </div>
                  <button
                    onClick={() => setSubjectInfoExpanded(!subjectInfoExpanded)}
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
                    <ChevronDown
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#A4A7AE",
                        strokeWidth: "1.66667",
                        transform: subjectInfoExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                </div>
              </div>

              {subjectInfoExpanded && (
                <div
                  style={{
                    display: "flex",
                    padding: "20px 24px 16px 24px",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    alignSelf: "stretch",
                    borderRadius: "0px 0px 0 0",
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
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                      }}
                    >
                      Requester Information
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "8px",
                        alignSelf: "stretch",
                      }}
                    >
                      {[
                        { label: "First Name", value: "Alexandra" },
                        { label: "Middle Name", value: "Johnson" },
                        { label: "Last Name", value: "Smith" },
                      ].map((field, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                          }}
                        >
                          <div
                            style={{
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          >
                            {field.label}
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          >
                            {field.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        padding: "16px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "12px",
                        alignSelf: "stretch",
                        borderRadius: "10px",
                        border: "1px solid #E9EAEB",
                        background: "#F5F5F5",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 600,
                          lineHeight: "24px",
                        }}
                      >
                        AKA's
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "8px",
                          alignSelf: "stretch",
                        }}
                      >
                        {[
                          { label: "Other First Name", value: "Alexander" },
                          { label: "Other Middle Name", value: "J" },
                          { label: "Other Last Name", value: "Smith T" },
                        ].map((field, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                              }}
                            >
                              {field.label}
                            </div>
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                              }}
                            >
                              {field.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {[
                        { label: "DOB (MM/DD/YYYY)", value: "18/12/1991" },
                        { label: "Zip Code", value: "080102" },
                        { label: "Address", value: "Street 123" },
                        { label: "City", value: "City ABC" },
                        { label: "State", value: "AL, Alabama" },
                        { label: "Country", value: "USA" },
                      ].map((field, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                          }}
                        >
                          <div
                            style={{
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          >
                            {field.label}
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          >
                            {field.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <svg
                      width="1032"
                      height="9"
                      viewBox="0 0 1032 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        alignSelf: "stretch",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1032 5H0V4H1032V5Z"
                        fill="#E9EAEB"
                      />
                    </svg>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {[
                        { label: "FCRA Purpose", value: "Employment by Hire or Contract" },
                        { label: "Applicant has know Criminal Records?", value: "[Category]" },
                      ].map((field, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                          }}
                        >
                          <div
                            style={{
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          >
                            {field.label}
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          >
                            {field.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <svg
                      width="1032"
                      height="9"
                      viewBox="0 0 1032 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        alignSelf: "stretch",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1032 5H0V4H1032V5Z"
                        fill="#E9EAEB"
                      />
                    </svg>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {[
                        { label: "Applicant Phone", value: "+1 (555) 000-0000" },
                        { label: "Applicant Email", value: "alexjsmith@gmail.com" },
                      ].map((field, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                          }}
                        >
                          <div
                            style={{
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          >
                            {field.label}
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          >
                            {field.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
