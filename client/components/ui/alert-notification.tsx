import React, { useState, useEffect } from "react";

export interface AlertNotificationProps {
  title: string;
  description: string;
  variant?: "success" | "error" | "warning" | "info";
  position?: "top" | "bottom";
  onDismiss: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  autoHide?: boolean;
  autoHideDelay?: number;
}

export default function AlertNotification({
  title,
  description,
  variant = "success",
  position = "top",
  onDismiss,
  primaryAction,
  secondaryAction,
  autoHide = false,
  autoHideDelay = 5000,
}: AlertNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300); // Wait for animation
  };

  if (!isVisible) {
    return null;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          iconBackground: "#DCFAE6",
          iconColor: "#079455",
        };
      case "error":
        return {
          iconBackground: "#FEE4E2",
          iconColor: "#F04438",
        };
      case "warning":
        return {
          iconBackground: "#FEF3C7",
          iconColor: "#F59E0B",
        };
      case "info":
        return {
          iconBackground: "#EBF8FF",
          iconColor: "#0EA5E9",
        };
      default:
        return {
          iconBackground: "#DCFAE6",
          iconColor: "#079455",
        };
    }
  };

  const variantStyles = getVariantStyles();

  const renderIcon = () => {
    switch (variant) {
      case "success":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_success)">
              <path
                d="M4.99992 7.99967L6.99992 9.99967L10.9999 5.99967M14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967Z"
                stroke={variantStyles.iconColor}
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
        );
      default:
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_default)">
              <path
                d="M4.99992 7.99967L6.99992 9.99967L10.9999 5.99967M14.6666 7.99967C14.6666 11.6816 11.6818 14.6663 7.99992 14.6663C4.31802 14.6663 1.33325 11.6816 1.33325 7.99967C1.33325 4.31778 4.31802 1.33301 7.99992 1.33301C11.6818 1.33301 14.6666 4.31778 14.6666 7.99967Z"
                stroke={variantStyles.iconColor}
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_default">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
    }
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: "fixed" as const,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center" as const,
      borderRadius: "0px",
      background: "#FFF",
      opacity: isVisible ? 1 : 0,
      transform: `translateY(${isVisible ? "0" : position === "top" ? "-100%" : "100%"})`,
      transition: "all 0.3s ease-in-out",
    };

    if (position === "top") {
      return {
        ...baseStyles,
        top: 0,
        borderBottom: "1px solid #D5D7DA",
      };
    } else {
      return {
        ...baseStyles,
        bottom: 0,
        borderTop: "1px solid #D5D7DA",
      };
    }
  };

  return (
    <div style={getPositionStyles()}>
      <div
        style={{
          display: "flex",
          maxWidth: "1280px",
          padding: "12px 32px",
          alignItems: "center",
          alignSelf: "stretch",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Mobile responsive adjustments */}
        <style>{`
          @media (max-width: 767px) {
            .alert-container {
              padding: 16px 16px !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 16px !important;
            }
            .alert-content {
              align-self: stretch !important;
            }
            .alert-buttons {
              align-items: flex-start !important;
              gap: 12px !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .alert-container {
              padding: 16px 32px !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 16px !important;
            }
            .alert-content {
              align-self: stretch !important;
            }
          }
        `}</style>

        <div
          className="alert-container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: "1 0 0",
            position: "relative",
          }}
        >
          {/* Content */}
          <div
            className="alert-content"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flex: "1 0 0",
              position: "relative",
            }}
          >
            {/* Featured icon */}
            <div
              style={{
                display: "flex",
                width: "32px",
                height: "32px",
                padding: "8px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "9999px",
                background: variantStyles.iconBackground,
                flexShrink: 0,
              }}
            >
              {renderIcon()}
            </div>

            {/* Text content */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                alignContent: "flex-start",
                gap: "2px 6px",
                flex: "1 0 0",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "20px",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                }}
              >
                {description}
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
            {/* Action buttons */}
            {(primaryAction || secondaryAction) && (
              <div
                className="alert-buttons"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                {secondaryAction && (
                  <button
                    onClick={secondaryAction.onClick}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "20px",
                    }}
                  >
                    {secondaryAction.label}
                  </button>
                )}
                {primaryAction && (
                  <button
                    onClick={primaryAction.onClick}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#273572",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "20px",
                    }}
                  >
                    {primaryAction.label}
                  </button>
                )}
              </div>
            )}

            {/* Close button */}
            <button
              onClick={handleDismiss}
              style={{
                display: "flex",
                padding: "4px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "6px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
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
                  d="M11.3332 4.66699L4.6665 11.3337M4.6665 4.66699L11.3332 11.3337"
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
    </div>
  );
}
