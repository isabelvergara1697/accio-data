import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { MobileHeader } from "../components/MobileHeader";
import { Checkbox } from "../components/ui/checkbox";
import { Home, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

export default function AdverseActionProcess() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 640 && window.innerWidth < 1024,
  );

  // Section expansion state
  const [preAdverseExpanded, setPreAdverseExpanded] = useState(false);
  const [pendingDocsExpanded, setPendingDocsExpanded] = useState(false);
  const [subjectInfoExpanded, setSubjectInfoExpanded] = useState(false);

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
    // Handle save as draft logic
  };

  const handleSubmit = () => {
    console.log("Submit order");
    // Handle submit logic
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#FAFAFA",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        currentPage="tools"
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Mobile Header */}
      {!isDesktop && (
        <MobileHeader
          showNotification={false}
          showUserMenu={showMobileUserMenu}
          setShowUserMenu={setShowMobileUserMenu}
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          marginTop: isMobile || isTablet ? "72px" : "0",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Header Navigation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
            background: "linear-gradient(180deg, #FAFAFA 43.75%, rgba(255, 255, 255, 0.00) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "72px",
              padding: "0 32px",
              alignItems: "center",
              gap: "20px",
              alignSelf: "stretch",
            }}
          >
            {/* Search Bar */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "10px 14px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                    d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  style={{
                    flex: "1 0 0",
                    overflow: "hidden",
                    color: "#717680",
                    textOverflow: "ellipsis",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  Search
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "1px 4px",
                    alignItems: "flex-start",
                    borderRadius: "4px",
                    border: "1px solid #E9EAEB",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "18px",
                    }}
                  >
                    ⌘K
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Create Button */}
            <button
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
              onClick={() => navigate("/online-ordering")}
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
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Quick Create
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0013 6.66667V13.3333M6.66797 10H13.3346M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                  stroke="#8D9BD8"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                width: "16px",
                padding: "16px 8px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "1px",
                  height: "40px",
                  background: "#E9EAEB",
                }}
              />
            </div>

            {/* User Section */}
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "16px",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "200px",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(0, 0, 0, 0.10)",
                    background: "#E9EAEB",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Alexandra Fitzwilliam
                  </div>
                  <div
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    [User Role]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                }}
              >
                <Home style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
              </button>
              <ChevronRight style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
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
                }}
              >
                Checked Individuals
              </button>
              <ChevronRight style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
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
                }}
              >
                Order #{orderId || "38138"}
              </button>
              <ChevronRight style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
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

        {/* Main Form Content */}
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
            }}
          >
            {/* Section Header */}
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
            </div>

            {/* Content */}
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

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
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
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Go Back
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
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Save as a Draft
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
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Submit Now
                </button>
              </div>

              {/* Applicant Payment Info */}
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
                  <Checkbox
                    checked={requireApplicantPay}
                    onCheckedChange={(checked) => setRequireApplicantPay(!!checked)}
                  />
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

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "#E9EAEB",
                }}
              />

              {/* Disclaimer Text */}
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
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
              borderRadius: "12px",
              border: "1px solid #E9EAEB",
              background: "#FFF",
              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
            }}
          >
            {/* Section Header */}
            <div
              style={{
                display: "flex",
                padding: "20px 24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                cursor: "pointer",
              }}
              onClick={() => setPreAdverseExpanded(!preAdverseExpanded)}
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
                  {preAdverseExpanded ? (
                    <ChevronUp style={{ width: "16px", height: "16px", color: "#A4A7AE" }} />
                  ) : (
                    <ChevronDown style={{ width: "16px", height: "16px", color: "#A4A7AE" }} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Pending Documents Section */}
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
            {/* Section Header */}
            <div
              style={{
                display: "flex",
                padding: "20px 24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                cursor: "pointer",
              }}
              onClick={() => setPendingDocsExpanded(!pendingDocsExpanded)}
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
                  {pendingDocsExpanded ? (
                    <ChevronUp style={{ width: "16px", height: "16px", color: "#A4A7AE" }} />
                  ) : (
                    <ChevronDown style={{ width: "16px", height: "16px", color: "#A4A7AE" }} />
                  )}
                </button>
              </div>
            </div>
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
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  alignSelf: "stretch",
                }}
              >
                Billing information table would be displayed here...
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
            {/* Section Header */}
            <div
              style={{
                display: "flex",
                padding: "20px 24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                cursor: "pointer",
              }}
              onClick={() => setSubjectInfoExpanded(!subjectInfoExpanded)}
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
                  {subjectInfoExpanded ? (
                    <ChevronUp style={{ width: "16px", height: "16px", color: "#A4A7AE" }} />
                  ) : (
                    <ChevronDown style={{ width: "16px", height: "16px", color: "#A4A7AE" }} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
