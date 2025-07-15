import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WidgetCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const widgetCards: WidgetCard[] = [
  {
    id: "chart-breakout",
    title: "Widget Title",
    description:
      "Lorem ipsum dolor sit amet, consec adipiscing elit. Suspendisse vulputate volutpat mauris, a rhoncus nisi aliquet.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.16667 2.49996H6.5C5.09987 2.49996 4.3998 2.49996 3.86502 2.77244C3.39462 3.01213 3.01217 3.39458 2.77248 3.86498C2.5 4.39976 2.5 5.09983 2.5 6.49996V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.1349C3.01217 16.6053 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6053 17.2275 16.1349C17.5 15.6002 17.5 14.9001 17.5 13.5V10.8333M10 6.66663H13.3333V9.99996M12.9167 2.91663V1.66663M16.1995 3.80051L17.0833 2.91663M17.0919 7.08329H18.3419M2.5 11.1225C3.04328 11.2064 3.59989 11.25 4.16667 11.25C7.82197 11.25 11.0544 9.43962 13.0164 6.66663"
          stroke="#414651"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "presentation-chart",
    title: "Widget Title",
    description:
      "Lorem ipsum dolor sit amet, consec adipiscing elit. Suspendisse vulputate volutpat mauris, a rhoncus nisi aliquet.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99984 13.3333V17.5M9.99984 13.3333L14.9998 17.5M9.99984 13.3333L4.99984 17.5M6.6665 5.83333V10M9.99984 7.5V10M13.3332 9.16667V10M18.3332 2.5H1.6665M2.49984 2.5H17.4998V9.33333C17.4998 10.7335 17.4998 11.4335 17.2274 11.9683C16.9877 12.4387 16.6052 12.8212 16.1348 13.0608C15.6 13.3333 14.9 13.3333 13.4998 13.3333H6.49984C5.09971 13.3333 4.39964 13.3333 3.86486 13.0608C3.39446 12.8212 3.012 12.4387 2.77232 11.9683C2.49984 11.4335 2.49984 10.7335 2.49984 9.33333V2.5Z"
          stroke="#414651"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "horizontal-bar-chart",
    title: "Widget Title",
    description:
      "Lorem ipsum dolor sit amet, consec adipiscing elit. Suspendisse vulputate volutpat mauris, a rhoncus nisi aliquet.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.8333 7.91675V5.08342C10.8333 4.6167 10.8333 4.38335 10.7425 4.20509C10.6626 4.04829 10.5351 3.9208 10.3783 3.84091C10.2001 3.75008 9.96671 3.75008 9.5 3.75008H2.5M14.1667 12.0834V9.25008C14.1667 8.78337 14.1667 8.55002 14.0758 8.37176C13.9959 8.21495 13.8685 8.08747 13.7117 8.00758C13.5334 7.91675 13.3 7.91675 12.8333 7.91675H2.5M2.5 1.66675L2.5 18.3334M2.5 16.2501H16.1667C16.6334 16.2501 16.8667 16.2501 17.045 16.1593C17.2018 16.0794 17.3293 15.9519 17.4092 15.7951C17.5 15.6168 17.5 15.3835 17.5 14.9167V13.4167C17.5 12.95 17.5 12.7167 17.4092 12.5384C17.3293 12.3816 17.2018 12.2541 17.045 12.1742C16.8667 12.0834 16.6334 12.0834 16.1667 12.0834L2.5 12.0834L2.5 16.2501Z"
          stroke="#414651"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "bar-chart-square-up",
    title: "Widget Title",
    description:
      "Lorem ipsum dolor sit amet, consec adipiscing elit. Suspendisse vulputate volutpat mauris, a rhoncus nisi aliquet.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99984 2.50008H13.4998C14.9 2.50008 15.6 2.50008 16.1348 2.77257C16.6052 3.01225 16.9877 3.3947 17.2274 3.86511C17.4998 4.39988 17.4998 5.09995 17.4998 6.50008V13.5001C17.4998 14.9002 17.4998 15.6003 17.2274 16.1351C16.9877 16.6055 16.6052 16.9879 16.1348 17.2276C15.6 17.5001 14.9 17.5001 13.4998 17.5001H6.49984C5.09971 17.5001 4.39964 17.5001 3.86486 17.2276C3.39446 16.9879 3.012 16.6055 2.77232 16.1351C2.49984 15.6003 2.49984 14.9002 2.49984 13.5001V10.0001M6.6665 10.8334V14.1667M13.3332 9.16675V14.1667M9.99984 5.83341V14.1667M1.6665 4.16675L4.1665 1.66675M4.1665 1.66675L6.6665 4.16675M4.1665 1.66675L4.1665 6.66675"
          stroke="#414651"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "pie-chart",
    title: "Widget Title",
    description:
      "Lorem ipsum dolor sit amet, consec adipiscing elit. Suspendisse vulputate volutpat mauris, a rhoncus nisi aliquet.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_pie_chart)">
          <path
            d="M14.3332 11.6667C14.564 11.6667 14.6794 11.6667 14.773 11.718C14.8501 11.7603 14.922 11.8397 14.9563 11.9207C14.998 12.0189 14.9875 12.1233 14.9665 12.3323C14.8578 13.4157 14.485 14.4596 13.8763 15.3705C13.1438 16.4669 12.1026 17.3213 10.8844 17.8259C9.66622 18.3305 8.32578 18.4625 7.03257 18.2053C5.73936 17.9481 4.55148 17.3131 3.61913 16.3808C2.68678 15.4484 2.05184 14.2605 1.79461 12.9673C1.53737 11.6741 1.66939 10.3337 2.17398 9.1155C2.67856 7.89733 3.53304 6.85614 4.62937 6.1236C5.54031 5.51493 6.58422 5.14206 7.6676 5.03336C7.87656 5.0124 7.98104 5.00191 8.07924 5.04357C8.16024 5.07794 8.23964 5.14977 8.28192 5.22693C8.33317 5.32048 8.33317 5.4359 8.33317 5.66673V11.0001C8.33317 11.2334 8.33317 11.3501 8.37859 11.4392C8.41854 11.5176 8.48228 11.5814 8.56068 11.6213C8.64981 11.6667 8.76649 11.6667 8.99984 11.6667H14.3332Z"
            stroke="#414651"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.6665 2.33339C11.6665 2.10256 11.6665 1.98714 11.7178 1.89359C11.76 1.81643 11.8394 1.7446 11.9204 1.71023C12.0186 1.66857 12.1231 1.67905 12.3321 1.70001C13.8558 1.85285 15.2882 2.52698 16.3806 3.61935C17.4729 4.71172 18.1471 6.14414 18.2999 7.66781C18.3208 7.87679 18.3313 7.98127 18.2897 8.07947C18.2553 8.16047 18.1835 8.23986 18.1063 8.28214C18.0128 8.33339 17.8973 8.33339 17.6665 8.33339L12.3332 8.33339C12.0998 8.33339 11.9831 8.33339 11.894 8.28798C11.8156 8.24803 11.7519 8.18429 11.7119 8.10589C11.6665 8.01676 11.6665 7.90008 11.6665 7.66673V2.33339Z"
            stroke="#414651"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_pie_chart">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "bar-chart",
    title: "Widget Title",
    description:
      "Lorem ipsum dolor sit amet, consec adipiscing elit. Suspendisse vulputate volutpat mauris, a rhoncus nisi aliquet.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 16.6666V3.33325M5 16.6666V13.3333M10 16.6666V8.33325"
          stroke="#414651"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function CustomizeDrawer({
  isOpen,
  onClose,
}: CustomizeDrawerProps) {
  // Responsive detection
  const [isDesktop, setIsDesktop] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCardClick = (cardId: string) => {
    console.log("Widget card clicked:", cardId);
    // Add widget selection logic here
  };

  const modalContent = !isOpen ? null : (
    <>
      <style>{`
        @media (max-width: 767px) {
          .customize-drawer-container {
            width: 351px !important;
            right: 0 !important;
            padding: 24px 16px !important;
          }
          .customize-drawer-header {
            margin-bottom: 24px !important;
          }
          .customize-content {
            gap: 24px !important;
          }
          .widget-card {
            padding: 12px !important;
          }
          .widget-icon {
            width: 32px !important;
            height: 32px !important;
            padding: 8px !important;
            border-radius: 6px !important;
          }
          .widget-icon svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .customize-drawer-container {
            width: 351px !important;
            right: 0 !important;
            padding: 24px 16px !important;
          }
          .customize-drawer-header {
            margin-bottom: 24px !important;
          }
          .customize-content {
            gap: 24px !important;
          }
          .widget-card {
            padding: 12px !important;
          }
          .widget-icon {
            width: 32px !important;
            height: 32px !important;
            padding: 8px !important;
            border-radius: 6px !important;
          }
          .widget-icon svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .customize-drawer-container {
            width: 400px !important;
            right: 0 !important;
            padding: 24px !important;
          }
          .customize-drawer-header {
            margin-bottom: 24px !important;
          }
          .customize-content {
            gap: 24px !important;
          }
          .widget-card {
            padding: 16px !important;
          }
          .widget-icon {
            width: 40px !important;
            height: 40px !important;
            padding: 10px !important;
            border-radius: 8px !important;
          }
          .widget-icon svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>

      {/* Background Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 13, 18, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 15000,
          transition: "opacity 0.3s ease",
        }}
        onClick={handleBackdropClick}
      >
        {/* Drawer Container */}
        <div
          className="customize-drawer-container"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "400px",
            right: 0,
            backgroundColor: "#FFF",
            boxShadow:
              "0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
            overflowY: "auto",
            padding: "24px",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="customize-drawer-header"
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
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
                    d="M2.5 6.66663L12.5 6.66663M12.5 6.66663C12.5 8.04734 13.6193 9.16663 15 9.16663C16.3807 9.16663 17.5 8.04734 17.5 6.66663C17.5 5.28591 16.3807 4.16663 15 4.16663C13.6193 4.16663 12.5 5.28591 12.5 6.66663ZM7.5 13.3333L17.5 13.3333M7.5 13.3333C7.5 14.714 6.38071 15.8333 5 15.8333C3.61929 15.8333 2.5 14.714 2.5 13.3333C2.5 11.9526 3.61929 10.8333 5 10.8333C6.38071 10.8333 7.5 11.9526 7.5 13.3333Z"
                    stroke="#344698"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: isDesktop ? "18px" : "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: isDesktop ? "28px" : "24px",
                  }}
                >
                  Customize your Dashboard
                </h2>
                <p
                  style={{
                    margin: "2px 0 0 0",
                    color: "#535862",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Monitor key metrics with our ready-to-use widgets.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
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

          {/* Widget Cards Content */}
          <div
            className="customize-content"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignItems: "center",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            {widgetCards.map((card) => (
              <div
                key={card.id}
                className="widget-card"
                style={{
                  display: "flex",
                  padding: isDesktop ? "16px" : "12px",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: hoveredCard === card.id ? "#F9FAFB" : "#FFF",
                  boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(card.id)}
              >
                <div
                  className="widget-icon"
                  style={{
                    display: "flex",
                    width: isDesktop ? "40px" : "32px",
                    height: isDesktop ? "40px" : "32px",
                    padding: isDesktop ? "10px" : "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    borderRadius: isDesktop ? "8px" : "6px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {card.icon}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "2px",
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
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 4,
                      alignSelf: "stretch",
                      overflow: "hidden",
                      color: "#535862",
                      textOverflow: "ellipsis",
                      fontFamily:
                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    {card.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return <>{modalContent && createPortal(modalContent, document.body)}</>;
}
