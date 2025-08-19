import React, { useState, useRef, useEffect } from "react";

interface StandardOrdersBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PACKAGE_OPTIONS = [
  "CSD Standard",
  "Volunteer Application",
  "A La Carte",
  "Retail",
  "MVR",
  "Sales",
  "Executive",
  "Operations",
  "Hourly",
  "CBSV",
  "DOT",
  "New York",
  "Immunization Records",
  "Just MVR",
  "HASC Contractor",
  "Applicant provided address only",
  "Employment Only",
  "SAP 10",
  "Identity Check Package",
  "Identity Check Test Package Includes Product",
  "Standard with EDU and EMP",
  "Test",
  "Executive Plus",
  "portal"
];

const FCRA_PURPOSE_OPTIONS = [
  "Employment by Hire or Contract",
  "Insurance Underwriting",
  "Granting Credit",
  "Establishing Eligibility for Licensing",
  "Collection of an Account",
  "Consumer-Initiated Transaction",
  "Tenant Screening"
];

export const StandardOrdersBatchModal: React.FC<StandardOrdersBatchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [defaultPackage, setDefaultPackage] = useState("CSD Standard");
  const [fcrapPurpose, setFcraPurpose] = useState("Employment by Hire or Contract");
  const [customUserEmail, setCustomUserEmail] = useState("user@mail.com");
  const [startTime, setStartTime] = useState("01/31/2025 10:45 A.M");
  const [notificationSelection, setNotificationSelection] = useState("Uploading User");
  const [iAgree, setIAgree] = useState(true);
  const [iNeedCertificate, setINeedCertificate] = useState(true);
  const [fileUploaded, setFileUploaded] = useState(true);
  
  // Dropdown states
  const [packageDropdownOpen, setPackageDropdownOpen] = useState(false);
  const [fcraDropdownOpen, setFcraDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [packageSearchTerm, setPackageSearchTerm] = useState("");
  const [fcraSearchTerm, setFcraSearchTerm] = useState("");

  const packageDropdownRef = useRef<HTMLDivElement>(null);
  const fcraDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (packageDropdownRef.current && !packageDropdownRef.current.contains(event.target as Node)) {
        setPackageDropdownOpen(false);
        setPackageSearchTerm("");
      }
      if (fcraDropdownRef.current && !fcraDropdownRef.current.contains(event.target as Node)) {
        setFcraDropdownOpen(false);
        setFcraSearchTerm("");
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPackageOptions = DEFAULT_PACKAGE_OPTIONS.filter(option =>
    option.toLowerCase().includes(packageSearchTerm.toLowerCase())
  );

  const filteredFcraOptions = FCRA_PURPOSE_OPTIONS.filter(option =>
    option.toLowerCase().includes(fcraSearchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Submit batch order");
    onClose();
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
                Standard Orders Batch
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
                Create a new batch upload.
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
              Before uploading your batch order, please review{" "}
              <span
                style={{
                  color: "#344698",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                the uploading process
              </span>
              . You can download an example template here:{" "}
              <span
                style={{
                  color: "#344698",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                batch order upload spreadsheet
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

            {/* Default Package */}
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
                  color: "#414651",
                  fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                  position: "relative",
                }}
              >
                Default Package
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
                    color: "#181D27",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    position: "relative",
                  }}
                >
                  {defaultPackage}
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
                      placeholder="Search packages..."
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

            {/* FCRA Purpose */}
            <div
              ref={fcraDropdownRef}
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
                  FCRA Purpose
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
                      d="M6.06016 6C6.2169 5.55444 6.52626 5.17873 6.93347 4.93942C7.34067 4.7001 7.81943 4.61262 8.28495 4.69247C8.75047 4.77232 9.17271 5.01434 9.47688 5.37568C9.78106 5.73702 9.94753 6.19434 9.94683 6.66666C9.94683 8 7.94683 8.66666 7.94683 8.66666M8.00016 11.3333H8.00683M14.6668 8C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8C1.3335 4.3181 4.31826 1.33333 8.00016 1.33333C11.6821 1.33333 14.6668 4.3181 14.6668 8Z"
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
                onClick={() => setFcraDropdownOpen(!fcraDropdownOpen)}
              >
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#181D27",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    position: "relative",
                  }}
                >
                  {fcrapPurpose}
                </div>
                <svg
                  style={{
                    width: "24px",
                    height: "24px",
                    position: "relative",
                    transform: fcraDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
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
              
              {fcraDropdownOpen && (
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
                  {filteredFcraOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setFcraPurpose(option);
                        setFcraDropdownOpen(false);
                        setFcraSearchTerm("");
                      }}
                      style={{
                        padding: "10px 14px",
                        fontSize: "14px",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        cursor: "pointer",
                        borderBottom: "1px solid #F3F4F6",
                        transition: "background 0.2s ease",
                        background: option === fcrapPurpose ? "#F3F4F6" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = option === fcrapPurpose ? "#F3F4F6" : "transparent";
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
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{
                    flex: "1 0 0",
                    color: "#181D27",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                  }}
                />
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

            {/* Notifications Upon Completion To */}
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
                  <g clipPath="url(#clip0_6134_79706)">
                    <path
                      d="M6.06016 6C6.2169 5.55445 6.52626 5.17874 6.93347 4.93942C7.34067 4.70011 7.81943 4.61263 8.28495 4.69248C8.75047 4.77232 9.17271 5.01435 9.47688 5.37569C9.78106 5.73702 9.94753 6.19435 9.94683 6.66667C9.94683 8 7.94683 8.66667 7.94683 8.66667M8.00016 11.3333H8.00683M14.6668 8C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8C1.3335 4.3181 4.31826 1.33333 8.00016 1.33333C11.6821 1.33333 14.6668 4.3181 14.6668 8Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6134_79706">
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
                    flex: "1 0 0",
                    color: "#181D27",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    position: "relative",
                  }}
                >
                  {notificationSelection}
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
                  {["Uploading User", "Ordering User", "No Notification", "Custom"].map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setNotificationSelection(option);
                        setNotificationDropdownOpen(false);
                      }}
                      style={{
                        padding: "10px 14px",
                        fontSize: "14px",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        cursor: "pointer",
                        borderBottom: option === "Custom" ? "none" : "1px solid #F3F4F6",
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

            {/* Custom User Email - Show only when Custom is selected */}
            {notificationSelection === "Custom" && (
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
                  <input
                    type="email"
                    value={customUserEmail}
                    onChange={(e) => setCustomUserEmail(e.target.value)}
                    style={{
                      flex: "1 0 0",
                      color: "#181D27",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "24px",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                    }}
                  />
                </div>
              </div>
            )}

            {/* File Upload */}
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
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                        <span
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
                        </span>
                        <span
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
                        </span>
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
                <div
                  style={{
                    display: "flex",
                    padding: "16px",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      flex: "1 0 0",
                      position: "relative",
                    }}
                  >
                    {/* File Icon */}
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        position: "relative",
                      }}
                    >
                      <svg
                        style={{
                          width: "32px",
                          height: "40px",
                          position: "absolute",
                          left: "4px",
                          top: "0px",
                        }}
                        width="32"
                        height="40"
                        viewBox="0 0 32 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 0.75H20C20.1212 0.75 20.2375 0.798089 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
                          stroke="#D5D7DA"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
                          stroke="#D5D7DA"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <div
                        style={{
                          position: "absolute",
                          left: "1px",
                          top: "18px",
                          width: "26px",
                          height: "16px",
                          display: "inline-flex",
                          padding: "2px 3px",
                          alignItems: "flex-start",
                          gap: "8px",
                          borderRadius: "2px",
                          background: "#079455",
                        }}
                      >
                        <div
                          style={{
                            color: "#FFF",
                            textAlign: "center",
                            fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "10px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                            position: "relative",
                          }}
                        >
                          XLS
                        </div>
                      </div>
                    </div>

                    {/* File Content */}
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
                          color: "#414651",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        batchdocumentname.xlsx
                      </div>
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
                            color: "#535862",
                            fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          200 KB of 200 KB
                        </div>
                        <svg
                          style={{
                            width: "0",
                            height: "12px",
                            strokeWidth: "1px",
                            stroke: "#D5D7DA",
                            position: "relative",
                          }}
                          width="2"
                          height="14"
                          viewBox="0 0 2 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1V13" stroke="#D5D7DA" strokeLinecap="round" />
                        </svg>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            position: "relative",
                          }}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              position: "relative",
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_6134_116096)">
                              <path
                                d="M5.00016 8L7.00016 10L11.0002 6M14.6668 8C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8C1.3335 4.3181 4.31826 1.33333 8.00016 1.33333C11.6821 1.33333 14.6668 4.3181 14.6668 8Z"
                                stroke="#079455"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_6134_116096">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <div
                            style={{
                              color: "#079455",
                              fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "20px",
                              position: "relative",
                            }}
                          >
                            Complete
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            height: "8px",
                            flex: "1 0 0",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "8px",
                              borderRadius: "9999px",
                              background: "#D5D7DA",
                              position: "absolute",
                              left: "0px",
                              top: "0px",
                            }}
                          />
                          <div
                            style={{
                              width: "100%",
                              height: "8px",
                              borderRadius: "9999px",
                              background: "#344698",
                              position: "absolute",
                              left: "0px",
                              top: "0px",
                            }}
                          />
                        </div>
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
                          100%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={handleFileRemove}
                    style={{
                      display: "flex",
                      width: "32px",
                      height: "32px",
                      padding: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      right: "8px",
                      top: "8px",
                      borderRadius: "6px",
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
                        width: "16px",
                        height: "16px",
                        position: "relative",
                      }}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.6667 2.66667V2.31111C10.6667 1.81333 10.6667 1.56444 10.5213 1.37422C10.3936 1.20698 10.1896 1.07099 9.93867 0.985771C9.65346 0.888889 9.28007 0.888889 8.53333 0.888889H7.46667C6.71993 0.888889 6.34654 0.888889 6.06133 0.985771C5.81044 1.07099 5.60642 1.20698 5.47866 1.37422C5.33333 1.56444 5.33333 1.81333 5.33333 2.31111V2.66667M6.66667 5.11111V7.33333M9.33333 5.11111V7.33333M2 2.66667H14M12.6667 2.66667V9.64444C12.6667 10.3913 12.6667 10.7647 12.4489 11.0498C12.2569 11.3007 11.9507 11.5046 11.5747 11.6325C11.1468 11.7778 10.5868 11.7778 9.46667 11.7778H6.53333C5.41324 11.7778 4.85319 11.7778 4.42535 11.6325C4.04928 11.5046 3.74309 11.3007 3.55112 11.0498C3.33333 10.7647 3.33333 10.3913 3.33333 9.64444V2.66667"
                        stroke="#A4A7AE"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
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

            {/* Checkboxes */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  paddingTop: "2px",
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
                    background: iAgree ? "#344698" : "transparent",
                    border: iAgree ? "none" : "1px solid #D5D7DA",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => setIAgree(!iAgree)}
                >
                  {iAgree && (
                    <svg
                      style={{
                        width: "14px",
                        height: "14px",
                        position: "relative",
                      }}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
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
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    I Agree
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
                  By clicking on the 'Upload Orders' button I agree to pay for all charges incurred by the processing of the uploaded batch orders. I agree
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  paddingTop: "2px",
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
                    background: iNeedCertificate ? "#344698" : "transparent",
                    border: iNeedCertificate ? "none" : "1px solid #D5D7DA",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => setINeedCertificate(!iNeedCertificate)}
                >
                  {iNeedCertificate && (
                    <svg
                      style={{
                        width: "14px",
                        height: "14px",
                        position: "relative",
                      }}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
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
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    I Need Certificate
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
                  Click here if you would like all common subject searches to be combined into one order
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              style={{
                display: "flex",
                height: "44px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                background: "#344698",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s ease",
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
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Fix Any Error And Submit
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardOrdersBatchModal;
