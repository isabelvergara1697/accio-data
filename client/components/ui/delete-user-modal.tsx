import React from "react";
import { createPortal } from "react-dom";

export interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  userName?: string;
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  onConfirmDelete,
  userName = "user",
}: DeleteUserModalProps) {
  // Close modal on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirmDelete();
    onClose();
  };

  const modalContent = !isOpen ? null : (
    <>
      {/* Background Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 13, 18, 0.7)",
          backdropFilter: "blur(8px)",
          zIndex: 10001,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
        }}
        onClick={handleBackdropClick}
      >
        {/* Modal Container */}
        <div
          style={{
            display: "flex",
            maxWidth: "400px",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "16px",
            backgroundColor: "#FFF",
            boxShadow:
              "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "24px 24px 0 24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
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
                  borderRadius: "9999px",
                  backgroundColor: "#FEE4E2",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                    stroke="#D92D20"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Content */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "2px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                  }}
                >
                  Delete User
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "20px",
                  }}
                >
                  Are you sure you want to remove {userName} from your team?
                  They will no longer be able to access the platform, but their
                  account data will remain for record-keeping.
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                display: "flex",
                width: "44px",
                height: "44px",
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#A4A7AE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Modal Actions */}
          <div
            style={{
              display: "flex",
              paddingTop: "32px",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "0 24px 24px 24px",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
              }}
            >
              {/* Cancel Button */}
              <button
                onClick={onClose}
                style={{
                  display: "flex",
                  padding: "12px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  flex: "1 0 0",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  backgroundColor: "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F9FAFB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFF";
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
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </button>

              {/* Delete Button */}
              <button
                onClick={handleConfirm}
                style={{
                  display: "flex",
                  padding: "12px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  flex: "1 0 0",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  backgroundColor: "#D92D20",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#B91C1C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#D92D20";
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
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  >
                    Delete
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <>{modalContent && createPortal(modalContent, document.body)}</>;
}
