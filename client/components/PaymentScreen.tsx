import React, { useState } from "react";

interface PaymentScreenProps {
  onAuthorizePayment: () => void;
  onSeeDetails: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  onAuthorizePayment,
  onSeeDetails,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleSeeDetails = () => {
    setShowDetails(!showDetails);
    onSeeDetails(); // Keep the original callback
  };

  return (
    <div
      style={{
        display: "flex",
        height: "700px",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        position: "relative",
      }}
    >
      {/* Section Headers */}
      <div
        style={{
          display: "flex",
          height: "64px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          flexShrink: 0,
          alignSelf: "stretch",
          borderRadius: "12px 12px 0 0",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          position: "relative",
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
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "4px",
                flex: "1 0 0",
                position: "relative",
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
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    position: "relative",
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
                      position: "relative",
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
                      Create MVR Order
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table/Payment Content */}
      <div
        style={{
          display: "flex",
          padding: "20px 16px",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          flex: "1 0 0",
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
        {/* Receipt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              color: "#181D27",
              textAlign: "center",
              fontFamily: "'Public Sans'",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "24px",
              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "rgba(24,29,39,1)",
              }}
            >
              Your total is $30.30
            </span>
          </div>
          {/* Button Group */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              position: "relative",
            }}
          >
            {/* Authorize Payment Button */}
            <div
              onClick={onAuthorizePayment}
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
                position: "relative",
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
                  position: "relative",
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
                    position: "relative",
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
                    Authorize Payment
                  </span>
                </div>
              </div>
            </div>
            {/* See Details Button */}
            <div
              onClick={handleSeeDetails}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#273572",
                  fontFamily: "'Public Sans'",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "rgba(39,53,114,1)",
                  }}
                >
                  See details
                </span>
              </div>
              <svg
                style={{
                  width: "16px",
                  height: "16px",
                  position: "relative",
                  transform: showDetails ? "rotate(180deg)" : "rotate(0deg)",
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
                  stroke="#34479A"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            style={{
              maxWidth: "480px",
              color: "#535862",
              textAlign: "center",
              fontFamily: "'Public Sans'",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(83,88,98,1)",
              }}
            >
              By authorizing this payment, automatic searches will be done and
              you'll be charged to your [Billing Setup]. Get more information{" "}
            </span>
            <span
              style={{
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(52,70,152,1)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              here.
            </span>
          </div>
        </div>

        {/* Detailed Receipt - Show when details are expanded */}
        {showDetails && (
          <>
            {/* Receipt 1 */}
            <div
              style={{
                display: "flex",
                padding: "12px 8px",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #E9EAEB",
                background: "#FAFAFA",
                position: "relative",
              }}
            >
              {/* Order Info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                {/* Checkbox */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "16px",
                      height: "16px",
                      padding: "1px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      background: "#344698",
                      position: "relative",
                    }}
                  >
                    <svg
                      style={{
                        width: "14px",
                        height: "14px",
                        flexShrink: 0,
                        position: "absolute",
                        left: "1px",
                        top: "1px",
                      }}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6663 3.5L5.24967 9.91667L2.33301 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "163px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
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
                      Lopez, Sandra
                    </span>
                  </div>
                  {/* DL Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#414651",
                        textAlign: "center",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        position: "relative",
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
                        DL
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#181D27",
                        textAlign: "center",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
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
                        129503923
                      </span>
                    </div>
                  </div>
                  {/* State Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#414651",
                        textAlign: "center",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        position: "relative",
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
                        State
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#181D27",
                        textAlign: "center",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
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
                        TX
                      </span>
                    </div>
                  </div>
                  {/* Request Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#414651",
                        textAlign: "center",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        position: "relative",
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
                        Request
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#181D27",
                        textAlign: "center",
                        fontFamily: "'Public Sans'",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
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
                        849235
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detailed Table Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  position: "relative",
                  fontSize: "12px",
                  fontFamily: "'Roboto Mono'",
                }}
              >
                {/* Inc Column */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Inc
                  </div>
                  <div
                    style={{
                      width: "22px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    N
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    Y
                  </div>
                </div>
                {/* Search Type Column */}
                <div
                  style={{
                    display: "flex",
                    width: "139px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Search Type
                  </div>
                  <div
                    style={{
                      width: "139px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    MVR Package
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Motor Vehicle Driving History/TX/CDL
                  </div>
                </div>
                {/* Price Column */}
                <div
                  style={{
                    display: "flex",
                    width: "144px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Price
                  </div>
                  <div
                    style={{
                      width: "144px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    8.00
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Included in package
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    0.00
                  </div>
                </div>
                {/* Taxes Column */}
                <div
                  style={{
                    display: "flex",
                    width: "53px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Taxes
                  </div>
                  <div
                    style={{
                      width: "53px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "34px",
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    1.15
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Included in package
                  </div>
                  <div
                    style={{
                      width: "34px",
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    0.00
                  </div>
                </div>
                {/* Total Column */}
                <div
                  style={{
                    display: "flex",
                    width: "68px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Total
                  </div>
                  <div
                    style={{
                      width: "68px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    9.15
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Included in package
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    6.00
                  </div>
                  <div
                    style={{
                      width: "68px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    15.15
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt 2 - Second entry */}
            <div
              style={{
                display: "flex",
                padding: "12px 8px",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #E9EAEB",
                background: "#FAFAFA",
                position: "relative",
              }}
            >
              {/* Checkbox Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                {/* Checkbox */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "16px",
                      height: "16px",
                      padding: "1px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      background: "#344698",
                      position: "relative",
                    }}
                  >
                    <svg
                      style={{
                        width: "14px",
                        height: "14px",
                        flexShrink: 0,
                        position: "absolute",
                        left: "1px",
                        top: "1px",
                      }}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6663 3.5L5.24967 9.91667L2.33301 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  style={{
                    color: "#181D27",
                    textAlign: "center",
                    fontFamily: "'Public Sans'",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
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
                    Lopez, Sandra
                  </span>
                </div>
                {/* DL Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
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
                      DL
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
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
                      129503923
                    </span>
                  </div>
                </div>
                {/* State Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
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
                      State
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
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
                      TX
                    </span>
                  </div>
                </div>
                {/* Request Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
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
                      Request
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
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
                      849235
                    </span>
                  </div>
                </div>
              </div>
              {/* Same detailed table structure as above */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  position: "relative",
                  fontSize: "12px",
                  fontFamily: "'Roboto Mono'",
                }}
              >
                {/* Same column structure but with final totals showing 15.15 */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Inc
                  </div>
                  <div
                    style={{
                      width: "22px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    N
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    Y
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "139px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Search Type
                  </div>
                  <div
                    style={{
                      width: "139px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    MVR Package
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Motor Vehicle Driving History/TX/CDL
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "144px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Price
                  </div>
                  <div
                    style={{
                      width: "144px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    8.00
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Included in package
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    0.00
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "53px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Taxes
                  </div>
                  <div
                    style={{
                      width: "53px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "34px",
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    1.15
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Included in package
                  </div>
                  <div
                    style={{
                      width: "34px",
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    0.00
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "68px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      fontVariant: "small-caps",
                      position: "relative",
                    }}
                  >
                    Total
                  </div>
                  <div
                    style={{
                      width: "68px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    9.15
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Included in package
                  </div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    6.00
                  </div>
                  <div
                    style={{
                      width: "68px",
                      height: "1px",
                      background: "#D5D7DA",
                      position: "relative",
                    }}
                  ></div>
                  <div
                    style={{
                      color: "#181D27",
                      textAlign: "center",
                      fontFamily: "'Roboto Mono'",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    15.15
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
