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

export const MVROrdersBatchModal: React.FC<MVROrdersBatchModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [defaultPackage, setDefaultPackage] = useState("MVR Standard");
  const [mvrPurpose, setMvrPurpose] = useState("Driver Verification");
  const [customUserEmail, setCustomUserEmail] = useState("user@mail.com");
  const [startTime, setStartTime] = useState("01/31/2025 10:45 A.M");
  const [notificationSelection, setNotificationSelection] = useState("Uploading User");
  const [iAgree, setIAgree] = useState(true);
  const [iNeedCertificate, setINeedCertificate] = useState(true);
  const [fileUploaded, setFileUploaded] = useState(true);
  
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
              Before uploading your MVR batch order, please review{" "}
              <span
                style={{
                  color: "#344698",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                the MVR uploading process
              </span>
              . You can download an example template here:{" "}
              <span
                style={{
                  color: "#344698",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                MVR batch order upload spreadsheet
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
                Default MVR Package
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
                onClick={() => setPurposeDropdownOpen(!purposeDropdownOpen)}
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
                  {mvrPurpose}
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

            {/* Rest of the form remains the same structure but abbreviated for brevity */}
            {/* Start Importing At, Notifications, File Upload, Checkboxes, Submit Button */}
            {/* ... (same structure as StandardOrdersBatchModal but with MVR-specific text) ... */}

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
