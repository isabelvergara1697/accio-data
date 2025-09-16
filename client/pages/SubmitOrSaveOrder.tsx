import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

const SubmitOrSaveOrder = () => {
  const navigate = useNavigate();
  const [requireApplicantPayment, setRequireApplicantPayment] = useState(false);

  // Accordion state management
  const [orderOverviewCollapsed, setOrderOverviewCollapsed] = useState(false);
  const [allSectionsCollapsed, setAllSectionsCollapsed] = useState(false);
  const [sectionsState, setSectionsState] = useState({
    subject: false,
    employment: false,
    education: false,
    professionalReferences: false,
    credentials: false,
    motorVehicle: false,
  });

  const handleGoBack = () => {
    navigate("/online-ordering");
  };

  const handleSaveAsDraft = () => {
    console.log("Saving as draft...");
    // Add save as draft logic here
  };

  const handleSubmitNow = () => {
    console.log("Submitting order...");
    // Add final submission logic here
    // Could navigate to a confirmation page
  };

  // Accordion handlers
  const handleCollapseAll = () => {
    const newCollapsedState = !allSectionsCollapsed;
    setAllSectionsCollapsed(newCollapsedState);
    setSectionsState({
      subject: newCollapsedState,
      employment: newCollapsedState,
      education: newCollapsedState,
      professionalReferences: newCollapsedState,
      credentials: newCollapsedState,
      motorVehicle: newCollapsedState,
    });
  };

  const handleOverviewToggle = () => {
    setOrderOverviewCollapsed(!orderOverviewCollapsed);
  };

  const toggleSection = (sectionName: string) => {
    setSectionsState(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName as keyof typeof prev]
    }));
  };

  // Edit button handlers - navigate to form sections with pre-filled data
  const handleEditSection = (sectionType: string, sectionData?: any) => {
    // Normalize keys to OnlineOrdering section ids
    const sectionKeyMap: Record<string, string> = {
      subject: 'subject',
      employment: 'employment',
      education: 'education',
      professionalReferences: 'professional-references',
      credentials: 'credentials-professional-license',
      motorVehicle: 'motor-vehicle-driving',
      package: 'package-and-products',
    };
    const target = sectionKeyMap[sectionType] || sectionType;

    // Store data for pre-filling and deep-link intent
    if (sectionData) sessionStorage.setItem(`formData_${sectionType}`, JSON.stringify(sectionData));
    sessionStorage.setItem('go_to_section', target);
    sessionStorage.setItem('prefillOnArrive', 'true');
    sessionStorage.setItem('returnToAfterEdit', '/submit-order');

    // Navigate back to main form
    navigate('/online-ordering');
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: "#FAFAFA",
      }}
    >
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Header />
        
        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: 1,
            padding: "0 32px 24px 32px",
          }}
        >
          {/* Page Header */}
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
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "16px",
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
                  <h1
                    style={{
                      alignSelf: "stretch",
                      color: "#181D27",
                      fontFamily: "'Public Sans'",
                      fontSize: "24px",
                      fontWeight: 600,
                      lineHeight: "32px",
                      margin: 0,
                    }}
                  >
                    Submit or Save Order.
                  </h1>
                  <p
                    style={{
                      alignSelf: "stretch",
                      color: "#535862",
                      fontFamily: "'Public Sans'",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      margin: 0,
                    }}
                  >
                    Track pending invites and submitted orders in one place. Use filters and tools to sort, review, and manage activity easily.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
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
                backgroundColor: "#FFF",
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
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "'Public Sans'",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                      flex: "1 0 0",
                    }}
                  >
                    Authorize and Continue
                  </h2>
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
                  borderRadius: "0px 0px 12px 12px",
                  backgroundColor: "#FFF",
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
                      fontFamily: "'Public Sans'",
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
                      justifyContent: "center",
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
                        backgroundColor: "#FFF",
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F5F5F5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#FFF";
                      }}
                    >
                      <span
                        style={{
                          color: "#414651",
                          fontFamily: "'Public Sans'",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Go Back
                      </span>
                    </button>

                    <button
                      onClick={handleSaveAsDraft}
                      style={{
                        display: "flex",
                        padding: "12px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        backgroundColor: "#FFF",
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F5F5F5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#FFF";
                      }}
                    >
                      <span
                        style={{
                          color: "#414651",
                          fontFamily: "'Public Sans'",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Save as a Draft
                      </span>
                    </button>

                    <button
                      onClick={handleSubmitNow}
                      style={{
                        display: "flex",
                        padding: "12px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        border: "2px solid rgba(255, 255, 255, 0.12)",
                        backgroundColor: "#344698",
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#2D3985";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#344698";
                      }}
                    >
                      <span
                        style={{
                          color: "#FFF",
                          fontFamily: "'Public Sans'",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Submit Now
                      </span>
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#E9EAEB",
                  }}
                />

                {/* Payment Options */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#535862",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: 0,
                    }}
                  >
                    Applicant is not paying for this order
                  </p>
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
                      <input
                        type="checkbox"
                        checked={requireApplicantPayment}
                        onChange={(e) => setRequireApplicantPayment(e.target.checked)}
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "4px",
                          border: "1px solid #D5D7DA",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => setRequireApplicantPayment(!requireApplicantPayment)}
                    >
                      Require Applicant to pay for order
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Overview Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                backgroundColor: "#FFF",
                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              }}
            >
              {/* Section Header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                  alignSelf: "stretch",
                  backgroundColor: "#FFF",
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
                          <h2
                            style={{
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "18px",
                              fontWeight: 600,
                              lineHeight: "28px",
                              margin: 0,
                            }}
                          >
                            Order Overview
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <button
                        onClick={handleCollapseAll}
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "'Public Sans'",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          {allSectionsCollapsed ? "Expand All" : "Collapse All"}
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M4.66675 9.99999L8.00008 13.3333L11.3334 9.99999M4.66675 5.99999L8.00008 2.66666L11.3334 5.99999"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleOverviewToggle}
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            transform: orderOverviewCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                          }}
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
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  display: "flex",
                  padding: "20px 24px 16px 24px",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  alignSelf: "stretch",
                  borderRadius: "0px 0px 12px 12px",
                  backgroundColor: "#FFF",
                }}
              >
                {/* Package and Products Section */}
                <div
                  style={{
                    display: "flex",
                    padding: "20px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <h3
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        margin: 0,
                      }}
                    >
                      Package and Products
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <button
                        onClick={() => handleEditSection('package')}
                        style={{
                          display: "flex",
                          height: "32px",
                          padding: "6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "'Public Sans'",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Edit
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M1.91744 12.0771C1.94807 11.8015 1.96339 11.6636 2.00509 11.5348C2.04209 11.4205 2.09437 11.3117 2.16051 11.2114C2.23505 11.0984 2.33311 11.0003 2.52923 10.8042L11.3334 2.00004C12.0698 1.26366 13.2637 1.26366 14.0001 2.00004C14.7365 2.73642 14.7365 3.93033 14.0001 4.66671L5.1959 13.4709C4.99978 13.667 4.90172 13.7651 4.78867 13.8396C4.68838 13.9058 4.57961 13.958 4.46531 13.995C4.33648 14.0367 4.19865 14.0521 3.92299 14.0827L1.66675 14.3334L1.91744 12.0771Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

                  {/* Package Info */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <h4
                      style={{
                        alignSelf: "stretch",
                        color: "#414651",
                        fontFamily: "'Public Sans'",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        margin: 0,
                      }}
                    >
                      Package
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#717680",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Package
                      </div>
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        CSD Standard
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "#E9EAEB",
                    }}
                  />

                  {/* Products Section */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <h4
                      style={{
                        alignSelf: "stretch",
                        color: "#414651",
                        fontFamily: "'Public Sans'",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        margin: 0,
                      }}
                    >
                      Products
                    </h4>

                    {/* Products Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Left Column - Background & Verification Services */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                        }}
                      >
                        <div>
                          <h5
                            style={{
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                              margin: "0 0 8px 0",
                            }}
                          >
                            Background
                          </h5>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              color: "#717680",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            ✓ Social Security Trace
                          </div>
                        </div>

                        <div>
                          <h5
                            style={{
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                              margin: "0 0 8px 0",
                            }}
                          >
                            Verification Services
                          </h5>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                color: "#717680",
                                fontFamily: "'Public Sans'",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              ✓ Employment (1)
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                color: "#717680",
                                fontFamily: "'Public Sans'",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              ✓ Education (1)
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                color: "#717680",
                                fontFamily: "'Public Sans'",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              ✓ Professional References (1)
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                color: "#717680",
                                fontFamily: "'Public Sans'",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              ✓ Credentials-Professional License (1)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Column - Data Base Services & Other Products */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                        }}
                      >
                        <div>
                          <h5
                            style={{
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                              margin: "0 0 8px 0",
                            }}
                          >
                            Data Base Services
                          </h5>
                          <div
                            style={{
                              color: "#717680",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            ✓ MJD
                          </div>
                        </div>

                        <div>
                          <h5
                            style={{
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                              margin: "0 0 8px 0",
                            }}
                          >
                            Other Products
                          </h5>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                color: "#414651",
                                fontFamily: "'Public Sans'",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              Data Collection
                            </div>
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "'Public Sans'",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              ✓ DOT Drug Test and Physical
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Public Records & Additional Services */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                        }}
                      >
                        <div>
                          <h5
                            style={{
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                              margin: "0 0 8px 0",
                            }}
                          >
                            Public Records
                          </h5>
                          <div
                            style={{
                              color: "#717680",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            ✓ County/Statewide Criminal History 7yr
                          </div>
                        </div>

                        <div>
                          <h5
                            style={{
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                              margin: "0 0 8px 0",
                            }}
                          >
                            Additional Services
                          </h5>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "'Public Sans'",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              ✓ Motor Vehicle Driving History
                            </div>
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "'Public Sans'",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              ✓ Court Criminal Monitoring
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "#E9EAEB",
                    }}
                  />

                  {/* Requester Section */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <h4
                      style={{
                        alignSelf: "stretch",
                        color: "#414651",
                        fontFamily: "'Public Sans'",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        margin: 0,
                      }}
                    >
                      Requester
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "4px",
                          flex: "1 0 0",
                          minWidth: "120px",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            color: "#717680",
                            fontFamily: "'Public Sans'",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                          }}
                        >
                          Requester
                        </div>
                        <div
                          style={{
                            alignSelf: "stretch",
                            color: "#181D27",
                            fontFamily: "'Public Sans'",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                          }}
                        >
                          Alexandra Fitzwilliam
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "4px",
                          flex: "1 0 0",
                          minWidth: "120px",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            color: "#717680",
                            fontFamily: "'Public Sans'",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                          }}
                        >
                          Fax
                        </div>
                        <div
                          style={{
                            alignSelf: "stretch",
                            color: "#181D27",
                            fontFamily: "'Public Sans'",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                          }}
                        >
                          123456789
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "4px",
                          flex: "1 0 0",
                          minWidth: "120px",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            color: "#717680",
                            fontFamily: "'Public Sans'",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                          }}
                        >
                          Phone
                        </div>
                        <div
                          style={{
                            alignSelf: "stretch",
                            color: "#181D27",
                            fontFamily: "'Public Sans'",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                          }}
                        >
                          +1 (555) 000-0000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject Section */}
                <div
                  style={{
                    display: "flex",
                    padding: "20px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <h3
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        margin: 0,
                      }}
                    >
                      Subject
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        onClick={() => handleEditSection('subject')}
                        style={{
                          display: "flex",
                          height: "32px",
                          padding: "6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Edit Subject"
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "'Public Sans'",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Edit
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => toggleSection('subject')}
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Toggle Subject"
                        onClick={() => toggleSection('subject')}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: sectionsState.subject ? "none" : "block", width: "100%" }}>
                  {/* General Setup */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch" }}>
                    <h4
                      style={{
                        alignSelf: "stretch",
                        color: "#414651",
                        fontFamily: "'Public Sans'",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        margin: 0,
                      }}
                    >
                      General Setup
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
                      {[
                        "Collect PII (SSN and/or DOB) from applicant?",
                        "Send order to applicant to complete?",
                        "Require applicant to electronically sign a release?",
                        "Require applicant to pay for their order?",
                      ].map((label, idx) => (
                        <label key={idx} style={{ display: "flex", gap: "8px", alignItems: "center", width: "min(492px, 100%)" }}>
                          <input type="checkbox" disabled defaultChecked style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid #D5D7DA" }} />
                          <span style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 14, lineHeight: "20px", fontWeight: 500 }}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Requester Information */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch" }}>
                    <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: 16, fontWeight: 500, lineHeight: "24px" }}>Requester Information</div>

                    {/* 3-col grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8 }}>
                      {[
                        { label: "First Name", value: "Alexandra" },
                        { label: "Middle Name", value: "Johnson" },
                        { label: "Last Name", value: "Smith" },
                      ].map((f, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.label}</div>
                          <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* AKA's card */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, borderRadius: 10, border: "1px solid #E9EAEB", background: "#F5F5F5" }}>
                      <div style={{ color: "#414651", fontFamily: "'Public Sans'", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>AKA’s</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8 }}>
                        {[
                          { label: "Other First Name", value: "Alexander" },
                          { label: "Other Middle Name", value: "J" },
                          { label: "Other Last Name", value: "Smith T" },
                        ].map((f, i) => (
                          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.label}</div>
                            <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Address and DOB info */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 16 }}>
                      {[
                        { label: "DOB (MM/DD/YYYY)", value: "18/12/1991" },
                        { label: "Zip Code", value: "080102" },
                        { label: "Address", value: "Street 123" },
                        { label: "City", value: "City ABC" },
                        { label: "State", value: "AL, Alabama" },
                        { label: "Country", value: "USA" },
                      ].map((f, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.label}</div>
                          <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: 1, background: "#E9EAEB" }} />

                    {/* FCRA Purpose and Criminal Records */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 16 }}>
                      {[
                        { label: "FCRA Purpose", value: "Employment by Hire or Contract" },
                        { label: "Applicant has know Criminal Records?", value: "[Category]" },
                      ].map((f, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.label}</div>
                          <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: 1, background: "#E9EAEB" }} />

                    {/* Contact */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 16 }}>
                      {[
                        { label: "Applicant Phone", value: "+1 (555) 000-0000" },
                        { label: "Applicant Email", value: "alexjsmith@gmail.com" },
                      ].map((f, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.label}</div>
                          <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: 16, lineHeight: "24px" }}>{f.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                  </div>

                {/* Employment Section */}
                <div
                  style={{
                    display: "flex",
                    padding: "20px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <h3
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        margin: 0,
                      }}
                    >
                      Employment
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        onClick={() => handleEditSection('employment')}
                        style={{
                          display: "flex",
                          height: "32px",
                          padding: "6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Edit Employment"
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "'Public Sans'",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Edit
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => toggleSection('employment')}
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Toggle Employment"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: sectionsState.employment ? "none" : "block", width: "100%" }}>
                  {/* Employment #1 Card */}
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
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    {/* Employment #1 Title Bar */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                      }}
                    >
                      <h4
                        style={{
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          margin: 0,
                        }}
                      >
                        Employment #1
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                          style={{
                            display: "flex",
                            height: "32px",
                            padding: "6px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          aria-label="Edit Employment #1"
                          onClick={() => handleEditSection('employment')}
                        >
                          <span
                            style={{
                              color: "#414651",
                              fontFamily: "'Public Sans'",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Edit
                          </span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          aria-label="Toggle Employment #1"
                          onClick={() => toggleSection('employment')}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Employment Details Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gridTemplateRows: "repeat(3, auto)",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Row 1 */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Position Name</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Senior Director</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Company Name</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Acme Company</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Income Type</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Hourly</div>
                      </div>

                      {/* Row 2 */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Address</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Street 123</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Address 2</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}></div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Is this a Military Position Y/N?</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>No</div>
                      </div>

                      {/* Row 3 */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Were you subject to FMCSA Standards</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>No</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Employee ID</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>123456</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Salary Key</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>123456</div>
                      </div>
                    </div>

                    {/* Same as current employer checkbox */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "min(492px, 100%)" }}>
                      <input
                        type="checkbox"
                        disabled
                        defaultChecked
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#F5F5F5"
                        }}
                      />
                      <span style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 14, lineHeight: "20px", fontWeight: 500 }}>
                        Same as current employer?
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "4px" }}>
                        <path d="M6.06 6c.157-.445.466-.822.873-1.061.407-.24.885-.327 1.351-.247.465.08.887.322 1.192.683.304.362.47.819.47 1.291 0 1.334-2 2-2 2m.06 3.334h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z" stroke="#A4A7AE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Second Employment Details Grid (same structure) */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gridTemplateRows: "repeat(3, auto)",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Row 1 */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Position Name</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Senior Director</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Company Name</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Acme Company</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Income Type</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Hourly</div>
                      </div>

                      {/* Row 2 */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Address</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Street 123</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Address 2</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}></div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Is this a Military Position Y/N?</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>No</div>
                      </div>

                      {/* Row 3 */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Were you subject to FMCSA Standards</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>No</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Employee ID</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>123456</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Salary Key</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>123456</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Contact Information */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 0 0" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Contact</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Jhon Doe</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 0 0" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Company Name</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>jhondoe@example.com</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "98px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>EXT</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>12</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 0 0" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Phone</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>+1 (555) 000-0000</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Employment Details and Additional Info */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch" }}>
                      {/* Start Dates */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                          <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Start Date</div>
                          <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>18/12/2023</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                          <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Start Date</div>
                          <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>18/12/2023</div>
                        </div>
                      </div>

                      {/* Current employer checkbox */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "min(492px, 100%)" }}>
                        <input
                          type="checkbox"
                          disabled
                          defaultChecked
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#F5F5F5"
                          }}
                        />
                        <span style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 14, lineHeight: "20px", fontWeight: 500 }}>
                          Current employer
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "4px" }}>
                          <path d="M6.06 6c.157-.445.466-.822.873-1.061.407-.24.885-.327 1.351-.247.465.08.887.322 1.192.683.304.362.47.819.47 1.291 0 1.334-2 2-2 2m.06 3.334h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z" stroke="#A4A7AE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Additional Details */}
                      <div style={{ display: "flex", gap: "24px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                          <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Reason for Leaving</div>
                          <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Change of career</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                          <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Eligible for Rehire</div>
                          <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Yes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  </div>

                {/* Education Section */}
                <div
                  style={{
                    display: "flex",
                    padding: "20px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <h3
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        margin: 0,
                      }}
                    >
                      Education
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        style={{
                          display: "flex",
                          height: "32px",
                          padding: "6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Edit Education"
                        onClick={() => handleEditSection('education')}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "'Public Sans'",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Edit
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Toggle Education"
                        onClick={() => toggleSection('education')}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: sectionsState.education ? "none" : "block", width: "100%" }}>
                  {/* Education #1 Card */}
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
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    {/* Education #1 Title Bar */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                      }}
                    >
                      <h4
                        style={{
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          margin: 0,
                        }}
                      >
                        Education #1
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                          style={{
                            display: "flex",
                            height: "32px",
                            padding: "6px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          aria-label="Edit Education #1"
                          onClick={() => handleEditSection('education')}
                        >
                          <span
                            style={{
                              color: "#414651",
                              fontFamily: "'Public Sans'",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Edit
                          </span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          aria-label="Toggle Education #1"
                          onClick={() => toggleSection('education')}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Type of Education */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily: "'Public Sans'",
                          fontSize: "12px",
                          fontWeight: 400,
                          lineHeight: "20px",
                        }}
                      >
                        Type of Education
                      </div>
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        University
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Education Details Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* First Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>University</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Brown Community College</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Degree Type</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Bachelor</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Major</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Physiology</div>
                      </div>

                      {/* Second Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Address</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Street 123</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Address 2</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}></div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Zip</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>1234</div>
                      </div>

                      {/* Third Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Country</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>USA</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>State</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>TX, Texas</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>City</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>El Paso</div>
                      </div>

                      {/* Fourth Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>GPA Scale</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>4.0</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Student ID</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>121512</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Transcript Y/N</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Yes</div>
                      </div>

                      {/* Fifth Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Graduated Y/N</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Yes</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Highest Achieved Y/N</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Yes</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Names while attending */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 0 0" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>First Name while Attending</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Alex</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 0 0" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Last Name while Attending</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Smith</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Contact Information */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 0 0" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Email</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>admision@browncommunitycollege.com</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 0 0" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Phone</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>+1 (555) 000-0000</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 0 0" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Fax</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>123456789</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Education Dates */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Attended From</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>18/12/2023</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Attended To</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>18/12/2023</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Degree Year</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>18/12/2023</div>
                      </div>
                    </div>

                    {/* Current enrolled checkbox */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "min(492px, 100%)" }}>
                      <input
                        type="checkbox"
                        disabled
                        defaultChecked
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#F5F5F5"
                        }}
                      />
                      <span style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: 14, lineHeight: "20px", fontWeight: 500 }}>
                        Current enrolled
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "4px" }}>
                        <path d="M6.06 6c.157-.445.466-.822.873-1.061.407-.24.885-.327 1.351-.247.465.08.887.322 1.192.683.304.362.47.819.47 1.291 0 1.334-2 2-2 2m.06 3.334h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z" stroke="#A4A7AE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Comments */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Comments
                      </div>
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Made a internship at Apple while studying here
                      </div>
                    </div>
                  </div>
                </div>
                  </div>

                {/* Professional References Section */}
                <div
                  style={{
                    display: "flex",
                    padding: "20px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <h3
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        margin: 0,
                      }}
                    >
                      Professional References
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        style={{
                          display: "flex",
                          height: "32px",
                          padding: "6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Edit Professional References"
                        onClick={() => handleEditSection('professionalReferences')}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "'Public Sans'",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Edit
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Toggle Professional References"
                        onClick={() => toggleSection('professionalReferences')}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: sectionsState.professionalReferences ? "none" : "block", width: "100%" }}>
                  {/* Professional Reference #1 Card */}
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
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    {/* Professional Reference #1 Title Bar */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                      }}
                    >
                      <h4
                        style={{
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          margin: 0,
                        }}
                      >
                        Professional Reference #1
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                          style={{
                            display: "flex",
                            height: "32px",
                            padding: "6px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          aria-label="Edit Professional Reference #1"
                        >
                          <span
                            style={{
                              color: "#414651",
                              fontFamily: "'Public Sans'",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Edit
                          </span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          aria-label="Toggle Professional Reference #1"
                          onClick={() => toggleSection('professionalReferences')}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Reference Details Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gridTemplateRows: "repeat(3, auto)",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* First Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Contact Name</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Janine Claude</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Phone</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>+1 (555) 000-0000</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Reference Type</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Personal</div>
                      </div>

                      {/* Second Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Relationship</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Friend</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Address</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Street 123</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Zip</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>1234</div>
                      </div>

                      {/* Third Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>Country</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>USA</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>State</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>TX, Texas</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>City</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>El Paso</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Comments */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Comments
                      </div>
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Personal reference
                      </div>
                    </div>
                  </div>
                </div>
                  </div>

                {/* Credentials - Professional Licenses Section */}
                <div
                  style={{
                    display: "flex",
                    padding: "20px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <h3
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        margin: 0,
                      }}
                    >
                      Credentials - Professional Licenses
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        style={{
                          display: "flex",
                          height: "32px",
                          padding: "6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Edit Credentials - Professional Licenses"
                        onClick={() => handleEditSection('credentials')}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "'Public Sans'",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Edit
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Toggle Credentials - Professional Licenses"
                        onClick={() => toggleSection('credentials')}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: sectionsState.credentials ? "none" : "block", width: "100%" }}>
                  {/* Credentials - Professional License #1 Card */}
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
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    {/* Credentials - Professional License #1 Title Bar */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                      }}
                    >
                      <h4
                        style={{
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          margin: 0,
                        }}
                      >
                        Credentials - Professional License #1
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                          style={{
                            display: "flex",
                            height: "32px",
                            padding: "6px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          aria-label="Edit Credentials - Professional License #1"
                        >
                          <span
                            style={{
                              color: "#414651",
                              fontFamily: "'Public Sans'",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Edit
                          </span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            backgroundColor: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          aria-label="Toggle Credentials - Professional License #1"
                          onClick={() => toggleSection('credentials')}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* License Details Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gridTemplateRows: "repeat(2, auto)",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* First Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Organization</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Acme Company</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Description</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Security License</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>License Number</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>123456</div>
                      </div>

                      {/* Second Row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>License Status</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Active</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "12px", lineHeight: "20px" }}>License State</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>TX, Texas</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* License Dates */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Date Received</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>18/12/2025</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "312px" }}>
                        <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Expiration Date</div>
                        <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>18/12/2023</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                    {/* Comments */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Comments
                      </div>
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "'Public Sans'",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Personal reference
                      </div>
                    </div>
                  </div>
                </div>
                  </div>

                {/* Motor Vehicle Driving History Section */}
                <div
                  style={{
                    display: "flex",
                    padding: "20px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <h3
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        margin: 0,
                      }}
                    >
                      Motor Vehicle Driving History
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        style={{
                          display: "flex",
                          height: "32px",
                          padding: "6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Edit Motor Vehicle Driving History"
                        onClick={() => handleEditSection('motorVehicle')}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "'Public Sans'",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "18px",
                          }}
                        >
                          Edit
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1.917 12.077c.03-.276.046-.413.087-.542.037-.114.09-.223.156-.323.074-.113.172-.211.368-.407L11.333 2a1.667 1.667 0 0 1 2.357 2.357L5.196 13.471c-.196.196-.294.294-.408.368a1.003 1.003 0 0 1-.323.156c-.128.041-.266.057-.541.088L1.667 14.333l.25-2.256Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          backgroundColor: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                        aria-label="Toggle Motor Vehicle Driving History"
                        onClick={() => toggleSection('motorVehicle')}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: sectionsState.motorVehicle ? "none" : "block", width: "100%" }}>
                  {/* Motor Vehicle Details Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      gridTemplateRows: "auto",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Drives License Number</div>
                      <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>1234567</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Purpose for Order</div>
                      <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>CDL Employment Only</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ color: "#717680", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>MVR Type</div>
                      <div style={{ color: "#181D27", fontFamily: "'Public Sans'", fontSize: "16px", lineHeight: "24px" }}>Standard</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ width: "100%", height: "1px", backgroundColor: "#E9EAEB" }} />

                  {/* Expiration Date */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      width: "312px",
                    }}
                  >
                    <div
                      style={{
                        color: "#717680",
                        fontFamily: "'Public Sans'",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Expiration Date
                    </div>
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "'Public Sans'",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      18/12/2025
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
  );
};

export default SubmitOrSaveOrder;
