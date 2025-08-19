import React, { useState, useRef, useEffect } from "react";

interface MVROrdersBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const MVR_PACKAGE_OPTIONS = [
  "MVR Standard",
  "MVR Premium",
  "MVR Basic",
  "MVR Extended",
  "MVR Plus",
  "MVR Express",
  "MVR Professional",
  "MVR Complete",
  "MVR Advanced"
];

const MVR_PURPOSE_OPTIONS = [
  "Driver Verification",
  "Employment Screening",
  "Insurance Underwriting",
  "Background Check",
  "Pre-Employment Verification",
  "Tenant Screening"
];

const NOTIFICATION_OPTIONS = [
  "Uploading User",
  "Ordering User",
  "Custom",
  "No Notification"
];

export const MVROrdersBatchModal: React.FC<MVROrdersBatchModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [defaultPackage, setDefaultPackage] = useState("");
  const [mvrPurpose, setMvrPurpose] = useState("");
  const [customUserEmail, setCustomUserEmail] = useState("user@mail.com");
  const [startTime, setStartTime] = useState("01/31/2025 10:45 A.M");
  const [notificationSelection, setNotificationSelection] = useState("Uploading User");
  const [showCustomEmail, setShowCustomEmail] = useState(false);
  const [iAgree, setIAgree] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  
  // Dropdown states
  const [packageDropdownOpen, setPackageDropdownOpen] = useState(false);
  const [purposeDropdownOpen, setPurposeDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [packageSearchTerm, setPackageSearchTerm] = useState("");
  const [purposeSearchTerm, setPurposeSearchTerm] = useState("");

  const packageDropdownRef = useRef<HTMLDivElement>(null);
  const purposeDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (packageDropdownRef.current && !packageDropdownRef.current.contains(event.target as Node)) {
        setPackageDropdownOpen(false);
        setPackageSearchTerm("");
      }
      if (purposeDropdownRef.current && !purposeDropdownRef.current.contains(event.target as Node)) {
        setPurposeDropdownOpen(false);
        setPurposeSearchTerm("");
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPackageOptions = MVR_PACKAGE_OPTIONS.filter(option =>
    option.toLowerCase().includes(packageSearchTerm.toLowerCase())
  );

  const filteredPurposeOptions = MVR_PURPOSE_OPTIONS.filter(option =>
    option.toLowerCase().includes(purposeSearchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Submit MVR batch order");
    if (onSubmit) {
      onSubmit();
    } else {
      onClose();
    }
  };

  const handleFileRemove = () => {
    setFileUploaded(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(10, 13, 18, 0.7)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: "relative",
          width: "400px",
          maxWidth: "100vw",
          height: "100vh",
          background: "#FFF",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        }}
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
                MVR Orders Batch
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
                Create a new MVR batch upload.
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: "12px",
              top: "12px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              transition: "background 0.2s ease",
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
            width: "400px",
            padding: "0 24px 24px 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            position: "relative",
            overflowY: "auto",
            flex: "1 0 0",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "352px",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              position: "relative",
            }}
          >
            {/* Instructions */}
            <div
              style={{
                alignSelf: "stretch",
                color: "#414651",
                fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                position: "relative",
              }}
            >
              Before uploading your MVR batch, please review{" "}
              <span
                style={{
                  color: "#344698",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                the uploading process
              </span>
              {" "}and ensure that you're using the latest version of the{" "}
              <span
                style={{
                  color: "#344698",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                batch upload spreadsheet
              </span>
              .
            </div>

            {/* Divider */}
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
                  height: "1px",
                  flex: "1 0 0",
                  background: "#E9EAEB",
                  position: "relative",
                }}
              />
            </div>

            {/* Default MVR Package */}
            <div
              ref={packageDropdownRef}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Default MVR Package
                </div>
                <div
                  style={{
                    color: "#344698",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  *
                </div>
              </div>
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
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => setPackageDropdownOpen(!packageDropdownOpen)}
              >
                <div
                  style={{
                    flex: "1 0 0",
                    color: defaultPackage ? "#181D27" : "#717680",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    position: "relative",
                  }}
                >
                  {defaultPackage || "Select MVR package"}
                </div>
                <svg
                  style={{
                    width: "24px",
                    height: "24px",
                    position: "relative",
                    transform: packageDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              {packageDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    marginTop: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {/* Search input */}
                  <div style={{ padding: "8px", borderBottom: "1px solid #E9EAEB" }}>
                    <input
                      type="text"
                      placeholder="Search MVR packages..."
                      value={packageSearchTerm}
                      onChange={(e) => setPackageSearchTerm(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #D5D7DA",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        outline: "none",
                      }}
                      autoFocus
                    />
                  </div>
                  
                  {/* Options */}
                  <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                    {filteredPackageOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setDefaultPackage(option);
                          setPackageDropdownOpen(false);
                          setPackageSearchTerm("");
                        }}
                        style={{
                          padding: "10px 14px",
                          fontSize: "14px",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          cursor: "pointer",
                          borderBottom: "1px solid #F3F4F6",
                          transition: "background 0.2s ease",
                          background: option === defaultPackage ? "#F3F4F6" : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#F9FAFB";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = option === defaultPackage ? "#F3F4F6" : "transparent";
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MVR Purpose */}
            <div
              ref={purposeDropdownRef}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  MVR Purpose
                </div>
                <div
                  style={{
                    color: "#344698",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  *
                </div>
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    marginLeft: "4px",
                    position: "relative",
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6134_79678)">
                    <path
                      d="M6.06016 6.00016C6.2169 5.55461 6.52626 5.1789 6.93347 4.93958C7.34067 4.70027 7.81943 4.61279 8.28495 4.69264C8.75047 4.77249 9.17271 5.01451 9.47688 5.37585C9.78106 5.73718 9.94753 6.19451 9.94683 6.66683C9.94683 8.00016 7.94683 8.66683 7.94683 8.66683M8.00016 11.3335H8.00683M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6134_79678">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
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
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => setPurposeDropdownOpen(!purposeDropdownOpen)}
              >
                <div
                  style={{
                    flex: "1 0 0",
                    color: mvrPurpose ? "#181D27" : "#717680",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    position: "relative",
                  }}
                >
                  {mvrPurpose || "Select MVR purpose"}
                </div>
                <svg
                  style={{
                    width: "24px",
                    height: "24px",
                    position: "relative",
                    transform: purposeDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              {purposeDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    marginTop: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {filteredPurposeOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setMvrPurpose(option);
                        setPurposeDropdownOpen(false);
                        setPurposeSearchTerm("");
                      }}
                      style={{
                        padding: "10px 14px",
                        fontSize: "14px",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        cursor: "pointer",
                        borderBottom: "1px solid #F3F4F6",
                        transition: "background 0.2s ease",
                        background: option === mvrPurpose ? "#F3F4F6" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = option === mvrPurpose ? "#F3F4F6" : "transparent";
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Start Importing At */}
            <div
              style={{
                display: "flex",
                height: "116px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    Start Importing At
                  </div>
                  <div
                    style={{
                      color: "#344698",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    *
                  </div>
                </div>
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: "1 0 0",
                      position: "relative",
                    }}
                  >
                    <svg
                      style={{
                        width: "24px",
                        height: "24px",
                        position: "relative",
                      }}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        flex: "1 0 0",
                        overflow: "hidden",
                        color: "#717680",
                        textOverflow: "ellipsis",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                        position: "relative",
                      }}
                    >
                      {startTime}
                    </div>
                  </div>
                  <svg
                    style={{
                      width: "24px",
                      height: "24px",
                      position: "relative",
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
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
                If you leave the start time in blank, the process of importing the order will start after 7:00pm
              </div>
            </div>

            {/* Notifications */}
            <div
              ref={notificationDropdownRef}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Notifications Upon Completion To
                </div>
                <div
                  style={{
                    color: "#344698",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  *
                </div>
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    marginLeft: "4px",
                    position: "relative",
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6134_109899)">
                    <path
                      d="M6.06016 6.00016C6.2169 5.55461 6.52626 5.1789 6.93347 4.93958C7.34067 4.70027 7.81943 4.61279 8.28495 4.69264C8.75047 4.77249 9.17271 5.01451 9.47688 5.37585C9.78106 5.73718 9.94753 6.19451 9.94683 6.66683C9.94683 8.00016 7.94683 8.66683 7.94683 8.66683M8.00016 11.3335H8.00683M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6134_109899">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
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
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      flex: "1 0 0",
                      color: "#181D27",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "24px",
                      position: "relative",
                    }}
                  >
                    {notificationSelection}
                  </div>
                </div>
                <svg
                  style={{
                    width: "24px",
                    height: "24px",
                    position: "relative",
                    transform: notificationDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {notificationDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    marginTop: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {NOTIFICATION_OPTIONS.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setNotificationSelection(option);
                        setShowCustomEmail(option === "Custom");
                        setNotificationDropdownOpen(false);
                      }}
                      style={{
                        padding: "10px 14px",
                        fontSize: "14px",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        cursor: "pointer",
                        borderBottom: option !== "No Notification" ? "1px solid #F3F4F6" : "none",
                        transition: "background 0.2s ease",
                        background: option === notificationSelection ? "#F3F4F6" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = option === notificationSelection ? "#F3F4F6" : "transparent";
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom User Email - Only show when Custom is selected */}
            {showCustomEmail && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    Custom User Email
                  </div>
                  <div
                    style={{
                      color: "#344698",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    *
                  </div>
                </div>
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: "1 0 0",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        flex: "1 0 0",
                        overflow: "hidden",
                        color: "#181D27",
                        textOverflow: "ellipsis",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                        position: "relative",
                      }}
                    >
                      {customUserEmail}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {!fileUploaded ? (
                // Upload Area
                <div
                  style={{
                    display: "flex",
                    padding: "16px 24px",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => setFileUploaded(true)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "12px",
                      alignSelf: "stretch",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "10px",
                        alignItems: "center",
                        gap: "10px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                      }}
                    >
                      <svg
                        style={{
                          width: "24px",
                          height: "24px",
                          position: "relative",
                        }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                          stroke="#414651"
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
                        alignItems: "center",
                        gap: "4px",
                        flex: "1 0 0",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          gap: "4px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color: "#273572",
                              fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                              position: "relative",
                            }}
                          >
                            Click to upload
                          </div>
                        </div>
                        <div
                          style={{
                            color: "#535862",
                            fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          or drag and drop
                        </div>
                      </div>
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#535862",
                          textAlign: "center",
                          fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "18px",
                          position: "relative",
                        }}
                      >
                        Only XLS
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Uploaded File
                <div
                  style={{
                    display: "flex",
                    padding: "12px",
                    alignItems: "center",
                    gap: "12px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "40px",
                      height: "40px",
                      padding: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      aspectRatio: "1/1",
                      borderRadius: "8px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                      position: "relative",
                    }}
                  >
                    <svg
                      style={{
                        width: "20px",
                        height: "20px",
                        position: "relative",
                      }}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6673 5L7.50065 14.1667L3.33398 10"
                        stroke="#067647"
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
                      gap: "4px",
                      flex: "1 0 0",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#181D27",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                        position: "relative",
                      }}
                    >
                      mvr_batch_upload.csv
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      200 KB
                    </div>
                  </div>
                  <button
                    onClick={handleFileRemove}
                    style={{
                      display: "flex",
                      width: "20px",
                      height: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <svg
                      style={{
                        width: "20px",
                        height: "20px",
                        position: "relative",
                      }}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
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
              )}
            </div>

            {/* Custom User Email */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                  position: "relative",
                }}
              >
                Custom user Email
              </div>
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
                  position: "relative",
                }}
              >
                <input
                  type="email"
                  value={customUserEmail}
                  onChange={(e) => setCustomUserEmail(e.target.value)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* I Agree Checkbox */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  onClick={() => setIAgree(!iAgree)}
                  style={{
                    display: "flex",
                    width: "20px",
                    height: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    aspectRatio: "1/1",
                    borderRadius: "6px",
                    border: `2px solid ${iAgree ? "#344698" : "#D5D7DA"}`,
                    background: iAgree ? "#344698" : "#FFF",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {iAgree && (
                    <svg
                      style={{
                        width: "12px",
                        height: "12px",
                        position: "relative",
                      }}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="#FFF"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
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
                      color: "#414651",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    I agree to receive MVR reports and understand the charges
                  </div>
                </div>
              </div>

              {/* I Need Certificate Checkbox */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  onClick={() => setINeedCertificate(!iNeedCertificate)}
                  style={{
                    display: "flex",
                    width: "20px",
                    height: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    aspectRatio: "1/1",
                    borderRadius: "6px",
                    border: `2px solid ${iNeedCertificate ? "#344698" : "#D5D7DA"}`,
                    background: iNeedCertificate ? "#344698" : "#FFF",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {iNeedCertificate && (
                    <svg
                      style={{
                        width: "12px",
                        height: "12px",
                        position: "relative",
                      }}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="#FFF"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
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
                      color: "#414651",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    I need MVR certificate
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <button
                onClick={handleSubmit}
                style={{
                  display: "flex",
                  height: "44px",
                  padding: "12px 20px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2A3B87";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#344698";
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "24px",
                    position: "relative",
                  }}
                >
                  Submit MVR Order
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MVROrdersBatchModal;
