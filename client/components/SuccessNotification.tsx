import React, { useState, useEffect } from "react";

interface SuccessNotificationProps {
  message: string;
  onDismiss: () => void;
  autoDisappear?: boolean;
  autoDisappearTime?: number;
}

export default function SuccessNotification({
  message,
  onDismiss,
  autoDisappear = true,
  autoDisappearTime = 60000, // 1 minute
}: SuccessNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoDisappear) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDisappearTime);

      return () => clearTimeout(timer);
    }
  }, [autoDisappear, autoDisappearTime]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300); // Wait for fade out animation
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        padding: "16px",
        alignItems: "flex-start",
        gap: "12px",
        alignSelf: "stretch",
        borderRadius: "8px",
        border: "1px solid #D1FADF",
        background: "#F6FEF9",
        boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          display: "flex",
          width: "20px",
          height: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
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
            d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
            fill="#079455"
          />
          <path
            d="M6.25 10L8.75 12.5L13.75 7.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Message Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          flex: "1 0 0",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            color: "#065F46",
            fontFamily:
              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          Account activated successfully!
        </div>
        <div
          style={{
            alignSelf: "stretch",
            color: "#047857",
            fontFamily:
              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "20px",
          }}
        >
          {message}
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        style={{
          display: "flex",
          width: "20px",
          height: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#D1FADF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
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
            stroke="#047857"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
