import React from "react";
import { createPortal } from "react-dom";
import {
  FileDown,
  FileSearch,
  Archive,
  FileQuestion,
  UploadCloud,
  Mail,
  Bell,
  Phone
} from "lucide-react";

interface MoreActionsSubmenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
  position?: { x: number; y: number };
}

export const MoreActionsSubmenu: React.FC<MoreActionsSubmenuProps> = ({
  isOpen,
  onClose,
  onAction,
  position = { x: 0, y: 0 }
}) => {
  if (!isOpen) return null;

  const handleAction = (action: string) => {
    onAction(action);
    onClose();
  };

  // Calculate positioning to prevent overflow
  const menuWidth = 350;
  const menuHeight = 800; // Approximate height
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let adjustedX = position.x;
  let adjustedY = position.y + 8;

  // Adjust horizontal position if menu would overflow right edge
  if (adjustedX + menuWidth > viewportWidth - 20) {
    adjustedX = position.x - menuWidth + 100; // Align to right edge of button
  }

  // Adjust vertical position if menu would overflow bottom edge
  if (adjustedY + menuHeight > viewportHeight - 20) {
    adjustedY = position.y - menuHeight - 8; // Show above button
  }

  const menuContent = (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        style={{
          position: "fixed",
          top: adjustedY,
          left: adjustedX,
          zIndex: 1000,
          display: "flex",
          width: "350px",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "12px 12px 16px 16px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
        }}
      >
        {/* Menu Items */}
        <div
          style={{
            display: "flex",
            padding: "6px 0",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          {/* Create Subject Specific Documents */}
          <div
            style={{
              display: "flex",
              padding: "6px 12px 4px 12px",
              alignItems: "flex-start",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px",
                position: "relative",
              }}
            >
              Create Subject Specific Documents
            </div>
          </div>

          {/* Pre-Adverse General */}
          <button
            onClick={() => handleAction("pre-adverse-general")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileDown
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Pre-Adverse General
                </div>
              </div>
            </div>
          </button>

          {/* Adverse Action Letter */}
          <button
            onClick={() => handleAction("adverse-action-letter")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileDown
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Adverse Action Letter
                </div>
              </div>
            </div>
          </button>

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

          {/* Manage Order */}
          <div
            style={{
              display: "flex",
              padding: "6px 12px 4px 12px",
              alignItems: "flex-start",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px",
                position: "relative",
              }}
            >
              Manage Order
            </div>
          </div>

          {/* Order Additional Searches */}
          <button
            onClick={() => handleAction("order-additional-searches")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileSearch
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Order Additional Searches (As a New Order)
                </div>
              </div>
            </div>
          </button>

          {/* Order Criminal Records */}
          <button
            onClick={() => handleAction("order-criminal-records")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileSearch
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Order Criminal Records
                </div>
              </div>
            </div>
          </button>

          {/* Archive Order */}
          <button
            onClick={() => handleAction("archive-order")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <Archive
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Archive Order
                </div>
              </div>
            </div>
          </button>

          {/* Adverse Action Process */}
          <button
            onClick={() => handleAction("adverse-action-process")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileQuestion
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Adverse Action Process
                </div>
              </div>
            </div>
          </button>

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

          {/* Documents */}
          <div
            style={{
              display: "flex",
              padding: "6px 12px 4px 12px",
              alignItems: "flex-start",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px",
                position: "relative",
              }}
            >
              Documents
            </div>
          </div>

          {/* Upload Applicant Release Form */}
          <button
            onClick={() => handleAction("upload-applicant-release")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <UploadCloud
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Upload Applicant Release Form
                </div>
              </div>
            </div>
          </button>

          {/* Download and Fax Applicant Release Form */}
          <button
            onClick={() => handleAction("download-fax-release")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileDown
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Download and Fax Applicant Release Form
                </div>
              </div>
            </div>
          </button>

          {/* Upload Supporting Documents */}
          <button
            onClick={() => handleAction("upload-supporting-docs")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <UploadCloud
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Upload Supporting Documents
                </div>
              </div>
            </div>
          </button>

          {/* View all Attached Documents */}
          <button
            onClick={() => handleAction("view-attached-docs")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileDown
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  View all Attached Documents
                </div>
              </div>
            </div>
          </button>

          {/* Request Document Upload from Applicant */}
          <button
            onClick={() => handleAction("request-doc-upload")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileDown
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Request Document Upload from Applicant
                </div>
              </div>
            </div>
          </button>

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

          {/* Other Actions */}
          <div
            style={{
              display: "flex",
              padding: "6px 12px 4px 12px",
              alignItems: "flex-start",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px",
                position: "relative",
              }}
            >
              Other Actions
            </div>
          </div>

          {/* Email this Report's Requester */}
          <button
            onClick={() => handleAction("email-requester")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <Mail
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Email this Report's Requester
                </div>
              </div>
            </div>
          </button>

          {/* Email this Report's Ordering User */}
          <button
            onClick={() => handleAction("email-ordering-user")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <Mail
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Email this Report's Ordering User
                </div>
              </div>
            </div>
          </button>

          {/* Send copy of Report to Applicant */}
          <button
            onClick={() => handleAction("send-report-copy")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <Mail
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Send copy of Report to Applicant
                </div>
              </div>
            </div>
          </button>

          {/* Email me when Background Check is complete */}
          <button
            onClick={() => handleAction("email-completion-notification")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <Bell
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Email me when Background Check is complete
                </div>
              </div>
            </div>
          </button>

          {/* Customer Service Inquiry */}
          <button
            onClick={() => handleAction("customer-service")}
            style={{
              display: "flex",
              padding: "0 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
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
                <FileDown
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#A4A7AE",
                  }}
                />
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Customer Service Inquiry
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );

  return createPortal(menuContent, document.body);
};
