import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FileDown,
  FileSearch,
  Archive,
  FileQuestion,
  UploadCloud,
  Mail,
  Bell
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useLayoutEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      setMenuHeight(rect.height);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const menuWidth = viewportWidth ? Math.min(350, viewportWidth - 32) : 350;
  const maxHeight = viewportHeight ? viewportHeight - 32 : undefined;

  const handleAction = (action: string) => {
    onAction(action);
    onClose();
  };

  let adjustedX = position.x;
  if (viewportWidth) {
    const maxLeft = viewportWidth - menuWidth - 16;
    adjustedX = Math.min(adjustedX, Math.max(16, maxLeft));
    adjustedX = Math.max(16, adjustedX);
  }

  let adjustedY = position.y + 8;
  if (viewportHeight && menuHeight) {
    const maxTop = viewportHeight - menuHeight - 16;
    adjustedY = Math.min(adjustedY, Math.max(16, maxTop));
    adjustedY = Math.max(16, adjustedY);
  } else if (viewportHeight) {
    adjustedY = Math.max(16, Math.min(adjustedY, viewportHeight - 400));
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
        ref={menuRef}
        style={{
          position: "fixed",
          top: adjustedY,
          left: adjustedX,
          zIndex: 1000,
          display: "flex",
          width: menuWidth,
          maxHeight,
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "12px 12px 16px 16px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
          overflowY: maxHeight ? "auto" : undefined,
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
                    color: "#717680",
                    minWidth: "16px",
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
                    textAlign: "right",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    textAlign: "right",
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
            type="button"
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
                    color: "#717680",
                    minWidth: "16px",
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
