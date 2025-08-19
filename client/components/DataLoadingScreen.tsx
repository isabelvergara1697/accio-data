import React from "react";

interface DataLoadingScreenProps {
  onComplete: () => void;
}

const DataLoadingScreen: React.FC<DataLoadingScreenProps> = ({ onComplete }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "636px",
        padding: "12px 16px 16px 16px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                flex: "1 0 0",
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
                {/* Featured Icon */}
                <div
                  style={{
                    display: "flex",
                    width: "48px",
                    height: "48px",
                    padding: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <svg
                    style={{
                      width: "24px",
                      height: "24px",
                      flexShrink: 0,
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2.25V4.75M12 18V22M5.75 12H2.25M21.25 12H19.75M18.4571 18.4571L17.75 17.75M18.6642 5.41579L17.25 6.83M4.92157 19.0784L7.75 16.25M5.12868 5.20868L7.25 7.33"
                      stroke="#414651"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    display: "flex",
                    maxWidth: "352px",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
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
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
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
                      Data Loaded Successfully
                    </span>
                  </div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#535862",
                      textAlign: "center",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
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
                      Please wait while we calculate your total and verify the
                      spreadsheet data. This can take several minutes for large
                      uploads.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div
            style={{
              display: "flex",
              width: "320px",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                height: "8px",
                flex: "1 0 0",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "278px",
                  height: "8px",
                  flexShrink: 0,
                  borderRadius: "9999px",
                  background: "#D5D7DA",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                }}
              ></div>
              <div
                style={{
                  width: "56px",
                  height: "8px",
                  flexShrink: 0,
                  borderRadius: "9999px",
                  background: "#344698",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                }}
              ></div>
            </div>
            <div
              style={{
                color: "#414651",
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
                  color: "rgba(65,70,81,1)",
                }}
              >
                20%
              </span>
            </div>
          </div>
        </div>
        {/* Admin Section */}
        <div
          style={{
            display: "flex",
            width: "412px",
            padding: "16px",
            alignItems: "flex-start",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid #D5D7DA",
            background: "#FAFAFA",
          }}
        >
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
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <div
                  style={{
                    color: "#414651",
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
                      color: "rgba(65,70,81,1)",
                    }}
                  >
                    Admin
                  </span>
                </div>
              </div>
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
                  background: "#FAFAFA",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "2px 0",
                    alignItems: "center",
                    gap: "8px",
                    flex: "1 0 0",
                  }}
                >
                  <div
                    style={{
                      flex: "1 0 0",
                      overflow: "hidden",
                      color: "#717680",
                      textOverflow: "ellipsis",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(113,118,128,1)",
                      }}
                    >
                      CSD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <div
                  style={{
                    color: "#414651",
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
                      color: "rgba(65,70,81,1)",
                    }}
                  >
                    User
                  </span>
                </div>
              </div>
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
                  background: "#FAFAFA",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "2px 0",
                    alignItems: "center",
                    gap: "8px",
                    flex: "1 0 0",
                  }}
                >
                  <div
                    style={{
                      flex: "1 0 0",
                      overflow: "hidden",
                      color: "#717680",
                      textOverflow: "ellipsis",
                      fontFamily: "'Public Sans'",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(113,118,128,1)",
                      }}
                    >
                      Rjones
                    </span>
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

export default DataLoadingScreen;
