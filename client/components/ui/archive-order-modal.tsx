import React from "react";
import { Archive, X } from "lucide-react";

interface ArchiveOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ArchiveOrderModal: React.FC<ArchiveOrderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

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
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(8px)",
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

      {/* Modal */}
      <div
        onClick={handleModalClick}
        style={{
          display: "flex",
          maxWidth: "400px",
          width: "calc(100% - 32px)",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "16px",
          background: "#FFF",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background pattern - simplified */}
        <div
          style={{
            width: "336px",
            height: "336px",
            position: "absolute",
            left: "-120px",
            top: "-120px",
            pointerEvents: "none",
            opacity: 0.5,
          }}
        >
          <svg
            width="336"
            height="336"
            viewBox="0 0 336 336"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
          >
            <defs>
              <radialGradient
                id="grid-mask"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#E9EAEB" stopOpacity="1" />
                <stop offset="100%" stopColor="#E9EAEB" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Vertical lines */}
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 24}
                y1="0"
                x2={i * 24}
                y2="336"
                stroke="url(#grid-mask)"
                strokeWidth="1"
              />
            ))}
            {/* Horizontal lines */}
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 24}
                x2="336"
                y2={i * 24}
                stroke="url(#grid-mask)"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* Modal header */}
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
            }}
          >
            {/* Featured icon */}
            <div
              style={{
                display: "flex",
                width: "48px",
                height: "48px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "9999px",
                background: "#F5F5F5",
              }}
            >
              <Archive
                style={{
                  width: "24px",
                  height: "24px",
                  color: "#717680",
                }}
              />
            </div>

            {/* Title and description */}
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
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Archive
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
                Are you sure you want to archive this order?
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
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
          >
            <X
              style={{
                width: "24px",
                height: "24px",
                color: "#A4A7AE",
              }}
            />
          </button>
        </div>

        {/* Modal actions */}
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
            {/* Cancel button */}
            <button
              onClick={onClose}
              type="button"
              style={{
                display: "flex",
                padding: "12px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
                flex: "1 0 0",
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
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  Cancel
                </div>
              </div>
            </button>

            {/* Archive Order button */}
            <button
              onClick={handleConfirm}
              type="button"
              style={{
                display: "flex",
                padding: "12px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
                flex: "1 0 0",
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                background: "#344698",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2A3A7D";
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
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  Archive Order
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
