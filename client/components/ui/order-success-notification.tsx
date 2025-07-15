import React from "react";
import { createPortal } from "react-dom";

export interface OrderSuccessNotificationProps {
  isVisible: boolean;
  orderNumber: string;
  customerName: string;
  email?: string;
  phone?: string;
  onDismiss: () => void;
  onViewOrder: () => void;
}

export default function OrderSuccessNotification({
  isVisible,
  orderNumber,
  customerName,
  email,
  phone,
  onDismiss,
  onViewOrder,
}: OrderSuccessNotificationProps) {
  if (!isVisible) return null;

  // Create contact text based on provided information
  const getContactText = () => {
    if (email && phone) {
      return `to ${email} and to ${phone}`;
    } else if (email) {
      return `to ${email}`;
    } else if (phone) {
      return `to ${phone}`;
    }
    return "";
  };

  const notificationContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "0px",
        borderBottom: "1px solid #D5D7DA",
        background: "#FFF",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1280px",
          padding: "12px 32px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: "1 0 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flex: "1 0 0",
            }}
          >
            {/* Success Icon */}
            <div
              style={{
                display: "flex",
                width: "32px",
                height: "32px",
                padding: "8px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "9999px",
                background: "#DCFAE6",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_success)">
                  <path
                    d="M4.99998 7.99992L6.99998 9.99992L11 5.99992M14.6666 7.99992C14.6666 11.6818 11.6819 14.6666 7.99998 14.6666C4.31808 14.6666 1.33331 11.6818 1.33331 7.99992C1.33331 4.31802 4.31808 1.33325 7.99998 1.33325C11.6819 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                    stroke="#079455"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_success">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Content */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "2px 6px",
                flex: "1 0 0",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Order #{orderNumber} Created Successfully
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                {customerName} will receive an invitation to complete its order{" "}
                {getContactText()}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <button
                onClick={onDismiss}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#535862",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  cursor: "pointer",
                  padding: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Dismiss
              </button>
              <button
                onClick={onViewOrder}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#273572",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  cursor: "pointer",
                  padding: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                View Order
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onDismiss}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3334 4.66675L4.66675 11.3334M4.66675 4.66675L11.3334 11.3334"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .notification-container {
              padding: 12px 16px !important;
            }
            .notification-content {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 12px !important;
            }
            .notification-actions {
              align-self: flex-end !important;
            }
          }
        `}
      </style>
    </div>
  );

  return createPortal(notificationContent, document.body);
}
