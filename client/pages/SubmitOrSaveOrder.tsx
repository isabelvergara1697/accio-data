import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

const SubmitOrSaveOrder = () => {
  const navigate = useNavigate();
  const [requireApplicantPayment, setRequireApplicantPayment] = useState(false);

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
                    Order Overview
                  </h2>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitOrSaveOrder;
