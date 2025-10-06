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
        {/* Decorative background pattern */}
        <div
          style={{
            width: "336px",
            height: "336px",
            position: "absolute",
            left: "-120px",
            top: "-120px",
            pointerEvents: "none",
          }}
        >
          {/* Mask */}
          <div
            style={{
              display: "flex",
              width: "336px",
              height: "336px",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          >
            <div
              style={{
                width: "336px",
                height: "336px",
                background:
                  "radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0, 0, 0, 0.00) 100%)",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            />
          </div>

          {/* Grid Lines Content */}
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 0,
              top: 0,
              width: "336px",
              height: "336px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "absolute",
                left: 0,
                top: 0,
                width: "336px",
                height: "336px",
              }}
            >
              {/* Vertical lines */}
              <div
                style={{
                  display: "flex",
                  height: "336px",
                  alignItems: "flex-start",
                  gap: "24px",
                  border: "1px solid #E9EAEB",
                }}
              >
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={`v-${i}`}
                    style={{
                      width: "1px",
                      height: "336px",
                      background: "#E9EAEB",
                    }}
                  />
                ))}
              </div>

              {/* Horizontal lines */}
              <div
                style={{
                  display: "flex",
                  width: "336px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "24px",
                  position: "absolute",
                  border: "1px solid #E9EAEB",
                }}
              >
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={`h-${i}`}
                    style={{
                      width: "336px",
                      height: "1px",
                      background: "#E9EAEB",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
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
