import React from "react";

interface BatchOrderingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BatchOrderingDetailsModal: React.FC<BatchOrderingDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingLeft: "40px",
        }}
        onClick={onClose}
      >
        {/* Modal Panel */}
        <div
          style={{
            display: "flex",
            width: "974px",
            height: "100vh",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
            borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
            background: "#FFF",
            boxShadow: "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
            position: "relative",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              padding: "24px",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              background: "#FFF",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                flex: "1 0 0",
                position: "relative",
              }}
            >
              {/* Featured Icon */}
              <div
                style={{
                  display: "flex",
                  width: "44px",
                  height: "44px",
                  padding: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  aspectRatio: "1/1",
                  borderRadius: "9999px",
                  background: "#D9DEF2",
                  position: "relative",
                }}
              >
                <svg
                  style={{
                    width: "20px",
                    height: "20px",
                    flexShrink: 0,
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                  }}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 12.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5"
                    stroke="#344698"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "2px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#181D27",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "28px",
                    position: "relative",
                  }}
                >
                  Batch Ordering Details
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Preview all details for uploaded batch orders.
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                display: "flex",
                width: "40px",
                height: "40px",
                padding: "8px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                position: "relative",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F9FAFB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg
                style={{
                  width: "24px",
                  height: "24px",
                  flexShrink: 0,
                  position: "relative",
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div
            style={{
              display: "flex",
              padding: "0 24px 24px 24px",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
              position: "relative",
              flex: "1 0 0",
            }}
          >
            {/* Table */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                alignSelf: "stretch",
                background: "#FFF",
                position: "relative",
                overflowX: "auto",
              }}
            >
              {/* Status Column */}
              <div
                style={{
                  display: "flex",
                  width: "100px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Status
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "2px 8px",
                        alignItems: "center",
                        borderRadius: "9999px",
                        border: "1px solid #ABEFC6",
                        background: "#ECFDF3",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#067647",
                          textAlign: "center",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "18px",
                          position: "relative",
                        }}
                      >
                        Success
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    width: "98px",
                    height: "36px",
                    padding: "6px 12px",
                    alignItems: "center",
                    gap: "12px",
                    borderBottom: "1px solid #E9EAEB",
                    background: "#FFF",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Order
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "98px",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      gap: "8px",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#273572",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        textDecoration: "underline",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      1258647
                    </div>
                  </div>
                ))}
              </div>

              {/* Index Column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Index
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
                      }}
                    >
                      1231
                    </div>
                  </div>
                ))}
              </div>

              {/* Name Column */}
              <div
                style={{
                  display: "flex",
                  width: "95px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Name
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
                      }}
                    >
                      [Name]
                    </div>
                  </div>
                ))}
              </div>

              {/* Last Column */}
              <div
                style={{
                  display: "flex",
                  width: "95px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Last
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
                      }}
                    >
                      [Name]
                    </div>
                  </div>
                ))}
              </div>

              {/* SSN Column */}
              <div
                style={{
                  display: "flex",
                  width: "121px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    SSN
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
                      }}
                    >
                      XXX-XX-1254
                    </div>
                  </div>
                ))}
              </div>

              {/* Processed On Column */}
              <div
                style={{
                  display: "flex",
                  width: "100px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Processed On
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        00/00/00
                      </div>
                      <div
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        00:00:00
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ordered By Column */}
              <div
                style={{
                  display: "flex",
                  width: "106px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Ordered By
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
                      }}
                    >
                      [username]
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                {/* Header */}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    Message
                  </div>
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                  </div>
                ))}
              </div>

              {/* Actions Column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    width: "55px",
                    height: "36px",
                    padding: "6px 12px",
                    alignItems: "center",
                    gap: "12px",
                    borderBottom: "1px solid #E9EAEB",
                    background: "#FFF",
                    position: "relative",
                  }}
                >
                </div>
                {/* Data Rows */}
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      height: "52px",
                      padding: "12px",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      borderBottom: "1px solid #E9EAEB",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#273572",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        textDecoration: "underline",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      Data
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchOrderingDetailsModal;
