import React from "react";

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "90%",
          maxHeight: "90vh",
          backgroundColor: "#FFF",
          borderRadius: "12px",
          padding: "24px",
          overflowY: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F5F5F5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#717680"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div
          style={{
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              color: "#181D27",
              fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "28px",
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Payment Details
          </h2>
          <p
            style={{
              color: "#535862",
              fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              margin: 0,
            }}
          >
            Review your order details and billing information below.
          </p>
        </div>

        {/* Order Summary */}
        <div
          style={{
            marginBottom: "24px",
            padding: "16px",
            border: "1px solid #E9EAEB",
            borderRadius: "8px",
            backgroundColor: "#FAFAFA",
          }}
        >
          <h3
            style={{
              color: "#181D27",
              fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              margin: 0,
              marginBottom: "16px",
            }}
          >
            Order Summary
          </h3>
          
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                color: "#414651",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              MVR Reports (10 records)
            </span>
            <span
              style={{
                color: "#181D27",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              $25.00
            </span>
          </div>
          
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                color: "#414651",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Processing Fee
            </span>
            <span
              style={{
                color: "#181D27",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              $3.00
            </span>
          </div>
          
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                color: "#414651",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Tax
            </span>
            <span
              style={{
                color: "#181D27",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              $2.30
            </span>
          </div>
          
          <div
            style={{
              height: "1px",
              backgroundColor: "#E9EAEB",
              margin: "12px 0",
            }}
          />
          
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#181D27",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              Total
            </span>
            <span
              style={{
                color: "#181D27",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              $30.30
            </span>
          </div>
        </div>

        {/* Billing Information */}
        <div
          style={{
            marginBottom: "24px",
            padding: "16px",
            border: "1px solid #E9EAEB",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              color: "#181D27",
              fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              margin: 0,
              marginBottom: "16px",
            }}
          >
            Billing Information
          </h3>
          
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  color: "#414651",
                  fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "16px",
                  marginBottom: "4px",
                }}
              >
                Admin
              </div>
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                CSD
              </div>
            </div>
            
            <div>
              <div
                style={{
                  color: "#414651",
                  fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "16px",
                  marginBottom: "4px",
                }}
              >
                User
              </div>
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Rjones
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              display: "flex",
              minHeight: "36px",
              padding: "6px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow:
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
              e.currentTarget.style.borderColor = "#98A2B3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF";
              e.currentTarget.style.borderColor = "#D5D7DA";
            }}
          >
            <span
              style={{
                color: "#414651",
                fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              Close
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
