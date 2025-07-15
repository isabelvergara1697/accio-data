import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  user: {
    initials: string;
    name: string;
  };
  timestamp: string;
  message: string;
  orderNumber?: string;
  isNew?: boolean;
  file?: {
    name: string;
    size: string;
    type: string;
  };
  comment?: string;
}

// Mock notification data based on Figma designs
const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    user: { initials: "JQ", name: "Jasper Quinn" },
    timestamp: "Just now",
    message: "Signed a file to Order 587412",
    orderNumber: "587412",
    isNew: true,
    file: {
      name: "Contract.pdf",
      size: "720 KB",
      type: "PDF",
    },
  },
  {
    id: "2",
    user: { initials: "MC", name: "Mira Caldwell" },
    timestamp: "2 mins ago",
    message: "Document uploaded",
    isNew: true,
  },
  {
    id: "3",
    user: { initials: "ZK", name: "Zara Kensington" },
    timestamp: "2 mins ago",
    message: "Flag detected in employment verification",
    isNew: true,
  },
  {
    id: "4",
    user: { initials: "TR", name: "Talia Rivers" },
    timestamp: "3 hours ago",
    message: "Commented in Order 587412",
    orderNumber: "587412",
    isNew: true,
  },
  {
    id: "5",
    user: { initials: "EF", name: "Elena Frost" },
    timestamp: "3 hours ago",
    message: "Form started for Order 587412",
    orderNumber: "587412",
    isNew: false,
  },
  {
    id: "6",
    user: { initials: "NH", name: "Nina Hart" },
    timestamp: "5:20pm 20 Jan 2025",
    message: "Submitted an order with comments",
    isNew: false,
    comment: "I couldn't upload documents.",
  },
];

export default function NotificationModal({
  isOpen,
  onClose,
}: NotificationModalProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkAllAsRead = () => {
    // Handle mark all as read functionality
    console.log("Mark all as read");
  };

  const handleSettings = () => {
    // Handle settings functionality
    console.log("Settings");
  };

  const handleOrderClick = (orderNumber: string) => {
    console.log(`Navigate to order ${orderNumber}`);
  };

  const renderNotificationItem = (notification: NotificationItem) => (
    <div
      key={notification.id}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        alignSelf: "stretch",
        position: "relative",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          display: "flex",
          paddingBottom: "6px",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "32px",
            height: "32px",
            padding: "6px 0px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9999px",
            border: "0.75px solid #E9EAEB",
            background: "#FFF",
            position: "relative",
          }}
        >
          <div
            style={{
              color: "#717680",
              textAlign: "center",
              fontFamily:
                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
            }}
          >
            {notification.user.initials}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          paddingBottom: "32px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
          flex: "1 0 0",
        }}
      >
        {/* User and timestamp */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                color: "#414651",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              {notification.user.name}
            </div>
            <div
              style={{
                color: "#535862",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "18px",
              }}
            >
              {notification.timestamp}
            </div>
          </div>

          {/* Message */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#535862",
              fontFamily:
                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            {notification.message.split("Order ").map((part, index) => {
              if (index === 0) return part;
              const [orderNum, ...rest] = part.split(" ");
              return (
                <span key={index}>
                  <span
                    style={{
                      color: "#273572",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                    onClick={() => handleOrderClick(orderNum)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = "none";
                    }}
                  >
                    Order {orderNum}
                  </span>
                  {rest.length > 0 && ` ${rest.join(" ")}`}
                </span>
              );
            })}
          </div>
        </div>

        {/* File attachment */}
        {notification.file && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            {/* PDF icon */}
            <div
              style={{ width: "40px", height: "40px", position: "relative" }}
            >
              <svg
                style={{
                  width: "32px",
                  height: "40px",
                  position: "absolute",
                  left: "7px",
                  top: "0px",
                }}
                width="32"
                height="40"
                viewBox="0 0 32 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 0.75H20C20.1212 0.75 20.2375 0.798089 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
                  stroke="#D5D7DA"
                  strokeWidth="1.5"
                />
                <path
                  d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
                  stroke="#D5D7DA"
                  strokeWidth="1.5"
                />
              </svg>
              <div
                style={{
                  display: "inline-flex",
                  padding: "2px 3px",
                  alignItems: "flex-start",
                  gap: "8px",
                  borderRadius: "2px",
                  background: "#D92D20",
                  position: "absolute",
                  left: "1px",
                  top: "18px",
                  width: "26px",
                  height: "16px",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily:
                      "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  {notification.file.type}
                </div>
              </div>
            </div>

            {/* File info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#414651",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                {notification.file.name}
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                {notification.file.size}
              </div>
            </div>
          </div>
        )}

        {/* Comment bubble */}
        {notification.comment && (
          <div
            style={{
              display: "flex",
              padding: "10px 12px",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              borderRadius: "0px 8px 8px 8px",
              border: "1px solid #E9EAEB",
              background: "#FAFAFA",
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                color: "#414651",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              "{notification.comment}"
            </div>
          </div>
        )}
      </div>

      {/* New indicator dot */}
      {notification.isNew && (
        <svg
          style={{
            width: "10px",
            height: "10px",
            position: "relative",
          }}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="5" r="4" fill="#17B26A" />
        </svg>
      )}
    </div>
  );

  // Determine panel width based on device
  const getPanelWidth = () => {
    if (isDesktop) return "440px";
    if (isTablet) return "351px";
    return "351px"; // mobile
  };

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20000,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      {/* Background overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(10, 13, 18, 0.5)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* Notification Panel */}
      <div
        style={{
          display: "flex",
          width: getPanelWidth(),
          height: "100vh",
          paddingLeft: isDesktop ? "40px" : "24px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "1 0 0",
            alignSelf: "stretch",
            borderLeft: isDesktop ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
            background: "#FFF",
            boxShadow:
              "0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4998 15.8334C12.4998 17.2141 11.3805 18.3334 9.99977 18.3334C8.61906 18.3334 7.49977 17.2141 7.49977 15.8334M11.4969 5.19882C11.8598 4.82389 12.0831 4.31304 12.0831 3.75002C12.0831 2.59943 11.1504 1.66669 9.99977 1.66669C8.84917 1.66669 7.91643 2.59943 7.91643 3.75002C7.91643 4.31304 8.13977 4.82389 8.50268 5.19882M14.9998 9.33335C14.9998 8.18408 14.473 7.08188 13.5353 6.26922C12.5976 5.45657 11.3258 5.00002 9.99977 5.00002C8.67368 5.00002 7.40192 5.45657 6.46423 6.26922C5.52655 7.08188 4.99977 8.18408 4.99977 9.33335C4.99977 11.2349 4.52821 12.6255 3.93982 13.6206C3.26922 14.7547 2.93391 15.3218 2.94715 15.4572C2.9623 15.6122 2.9902 15.6611 3.11588 15.753C3.22574 15.8334 3.77769 15.8334 4.88159 15.8334H15.1179C16.2218 15.8334 16.7738 15.8334 16.8837 15.753C17.0093 15.6611 17.0372 15.6122 17.0524 15.4572C17.0656 15.3218 16.7303 14.7547 16.0597 13.6206C15.4713 12.6255 14.9998 11.2349 14.9998 9.33335Z"
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
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: isDesktop ? "18px" : "16px",
                    fontWeight: 600,
                    lineHeight: isDesktop ? "28px" : "24px",
                  }}
                >
                  Notifications
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Stay up to date with the latest activity, updates, and file
                  changes.
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
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
              padding: isDesktop ? "0px 24px" : "0px 16px",
              flexDirection: "column",
              alignItems: "center",
              gap: "32px",
              flex: "1 0 0",
              alignSelf: "stretch",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                }}
              >
                <button
                  onClick={handleMarkAllAsRead}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#273572",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  Mark all as Read
                </button>
                <button
                  onClick={handleSettings}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#273572",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  Settings
                </button>
              </div>

              {/* Notifications list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                {mockNotifications.map(renderNotificationItem)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
