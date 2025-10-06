import React, { useState } from "react";
import { Mail, X } from "lucide-react";

interface RequestDocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: RequestDocumentData) => void;
}

export interface RequestDocumentData {
  to: string;
  from: string;
  documentRequested: string;
  regarding: string;
  visibleToClient: boolean;
  instructions: string;
}

export const RequestDocumentUploadModal: React.FC<
  RequestDocumentUploadModalProps
> = ({ isOpen, onClose, onSend }) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [documentRequested, setDocumentRequested] = useState("");
  const [regarding, setRegarding] = useState(
    "Urgent: Additional information needed to complete your background check"
  );
  const [visibleToClient, setVisibleToClient] = useState(true);
  const [instructions, setInstructions] = useState(
    "In order to complete our background check, we need additional documentation from you. Please click the link below to provide us with __DOCUMENT_TITLE__."
  );

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSend = () => {
    if (!to.trim() || !from.trim() || !documentRequested.trim() || !regarding.trim() || !instructions.trim()) {
      return;
    }
    onSend({
      to: to.trim(),
      from: from.trim(),
      documentRequested: documentRequested.trim(),
      regarding: regarding.trim(),
      visibleToClient,
      instructions: instructions.trim(),
    });
    handleClose();
  };

  const handleClose = () => {
    setTo("");
    setFrom("");
    setDocumentRequested("");
    setRegarding("Urgent: Additional information needed to complete your background check");
    setVisibleToClient(true);
    setInstructions(
      "In order to complete our background check, we need additional documentation from you. Please click the link below to provide us with __DOCUMENT_TITLE__."
    );
    onClose();
  };

  const isSendDisabled =
    !to.trim() ||
    !from.trim() ||
    !documentRequested.trim() ||
    !regarding.trim() ||
    !instructions.trim();

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1100,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        backdropFilter: "blur(4px)",
        paddingLeft: isDesktop ? "40px" : "0",
      }}
      onClick={handleBackdropClick}
    >
      {/* Background overlay */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.7,
          background: "#0A0D12",
        }}
      />

      {/* Slide-out Panel */}
      <div
        onClick={handlePanelClick}
        style={{
          display: "flex",
          width: "400px",
          maxWidth: "100%",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          background: "#FFF",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
          position: "relative",
          animation: "slideIn 0.3s ease-out",
          overflowY: "auto",
        }}
      >
        <style>
          {`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
          `}
        </style>

        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "24px",
            alignItems: "flex-start",
            gap: "8px",
            alignSelf: "stretch",
            background: "#FFF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flex: "1 0 0",
            }}
          >
            {/* Featured icon */}
            <div
              style={{
                display: "flex",
                width: "44px",
                height: "44px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "9999px",
                background: "#D9DEF2",
              }}
            >
              <Mail
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#344698",
                  strokeWidth: "1.66667",
                }}
              />
            </div>

            {/* Title and supporting text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                Request Document Upload from Applicant
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
                Complete the form, the user will receive this request via email.
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            type="button"
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F5F5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <X
              style={{
                width: "24px",
                height: "24px",
                color: "#A4A7AE",
                strokeWidth: "1.66667",
              }}
            />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            width: "400px",
            maxWidth: "100%",
            padding: "0 24px 24px 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* To Field */}
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
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                To
              </div>
              <div
                style={{
                  color: "#344698",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                *
              </div>
            </div>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="user@mail.com"
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
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#344698";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(52, 70, 152, 0.12), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D5D7DA";
                e.currentTarget.style.boxShadow =
                  "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
            />
          </div>

          {/* From Field */}
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
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                From
              </div>
              <div
                style={{
                  color: "#344698",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                *
              </div>
            </div>
            <input
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="user@mail.com"
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
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#344698";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(52, 70, 152, 0.12), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D5D7DA";
                e.currentTarget.style.boxShadow =
                  "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
            />
          </div>

          {/* Document Requested Field */}
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
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Document Requested
              </div>
              <div
                style={{
                  color: "#344698",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                *
              </div>
            </div>
            <input
              type="text"
              value={documentRequested}
              onChange={(e) => setDocumentRequested(e.target.value)}
              placeholder="Resume"
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
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#344698";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(52, 70, 152, 0.12), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D5D7DA";
                e.currentTarget.style.boxShadow =
                  "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
            />
          </div>

          {/* Regarding Field */}
          <div
            style={{
              display: "flex",
              height: "100px",
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
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Regarding
              </div>
              <div
                style={{
                  color: "#344698",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                *
              </div>
            </div>
            <textarea
              value={regarding}
              onChange={(e) => setRegarding(e.target.value)}
              placeholder="Urgent: Additional information needed to complete your background check"
              style={{
                display: "flex",
                padding: "12px 14px",
                alignItems: "flex-start",
                gap: "8px",
                flex: "1 0 0",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                outline: "none",
                resize: "vertical",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#344698";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(52, 70, 152, 0.12), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D5D7DA";
                e.currentTarget.style.boxShadow =
                  "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
            />
          </div>

          {/* Radio Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                cursor: "pointer",
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
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "9999px",
                    border: visibleToClient ? "5px solid #344698" : "1px solid #D5D7DA",
                    background: visibleToClient ? "#FFF" : "transparent",
                  }}
                />
              </div>
              <input
                type="radio"
                checked={visibleToClient}
                onChange={() => setVisibleToClient(true)}
                style={{ display: "none" }}
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
                Visible to Client
              </div>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                cursor: "pointer",
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
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "9999px",
                    border: !visibleToClient ? "5px solid #344698" : "1px solid #D5D7DA",
                    background: !visibleToClient ? "#FFF" : "transparent",
                  }}
                />
              </div>
              <input
                type="radio"
                checked={!visibleToClient}
                onChange={() => setVisibleToClient(false)}
                style={{ display: "none" }}
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
                Not Visible to Client
              </div>
            </label>
          </div>

          {/* Instructions Field */}
          <div
            style={{
              display: "flex",
              height: "142px",
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
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Instructions
              </div>
              <div
                style={{
                  color: "#344698",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                *
              </div>
            </div>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="In order to complete our background check, we need additional documentation from you. Please click the link below to provide us with __DOCUMENT_TITLE__."
              style={{
                display: "flex",
                padding: "12px 14px",
                alignItems: "flex-start",
                gap: "8px",
                flex: "1 0 0",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                outline: "none",
                resize: "vertical",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#344698";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(52, 70, 152, 0.12), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D5D7DA";
                e.currentTarget.style.boxShadow =
                  "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
              }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isSendDisabled}
            type="button"
            style={{
              display: "flex",
              height: "44px",
              padding: "12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              flexShrink: 0,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.12)",
              background: isSendDisabled ? "#A4A7AE" : "#344698",
              boxShadow:
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: isSendDisabled ? "not-allowed" : "pointer",
              opacity: isSendDisabled ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isSendDisabled) {
                e.currentTarget.style.background = "#2A3A7D";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSendDisabled) {
                e.currentTarget.style.background = "#344698";
              }
            }}
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
                Send
              </div>
            </div>
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleClose}
            type="button"
            style={{
              display: "flex",
              height: "44px",
              padding: "12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              flexShrink: 0,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow:
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F5F5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF";
            }}
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
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Cancel
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
