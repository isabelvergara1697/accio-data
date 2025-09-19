import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export interface AddShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShortcutSelect?: (shortcutType: string, shortcutLabel: string) => void;
  onShortcutRemove?: (shortcutId: string) => void;
  selectedShortcuts?: Array<{ id: string; type: string; label: string }>;
}

interface ShortcutOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const shortcutOptions: ShortcutOption[] = [
  {
    id: "online-ordering",
    label: "Online Ordering",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.8333 8.33333C15.7668 8.33333 16.2335 8.33333 16.59 8.15168C16.9036 7.99189 17.1586 7.73692 17.3183 7.42332C17.5 7.0668 17.5 6.60009 17.5 5.66667V5.16667C17.5 4.23325 17.5 3.76654 17.3183 3.41002C17.1586 3.09641 16.9036 2.84145 16.59 2.68166C16.2335 2.5 15.7668 2.5 14.8333 2.5L5.16667 2.5C4.23325 2.5 3.76654 2.5 3.41002 2.68166C3.09641 2.84144 2.84144 3.09641 2.68166 3.41002C2.5 3.76654 2.5 4.23325 2.5 5.16667L2.5 5.66667C2.5 6.60009 2.5 7.0668 2.68166 7.42332C2.84144 7.73692 3.09641 7.99189 3.41002 8.15168C3.76654 8.33333 4.23325 8.33333 5.16667 8.33333L14.8333 8.33333Z"
          stroke="#414651"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.8333 17.5C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V14.3333C17.5 13.3999 17.5 12.9332 17.3183 12.5767C17.1586 12.2631 16.9036 12.0081 16.59 11.8483C16.2335 11.6667 15.7668 11.6667 14.8333 11.6667L5.16667 11.6667C4.23325 11.6667 3.76654 11.6667 3.41002 11.8483C3.09641 12.0081 2.84144 12.2631 2.68166 12.5767C2.5 12.9332 2.5 13.3999 2.5 14.3333L2.5 14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333Z"
          stroke="#414651"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "i9-order",
    label: "I-9 Order",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_i9_order)">
          <path
            d="M3.3327 18.1805C3.83485 18.3327 4.51309 18.3327 5.66602 18.3327H14.3327C15.4856 18.3327 16.1638 18.3327 16.666 18.1805M3.3327 18.1805C3.22503 18.1479 3.12546 18.1083 3.03104 18.0602C2.56063 17.8205 2.17818 17.4381 1.9385 16.9677C1.66602 16.4329 1.66602 15.7328 1.66602 14.3327V5.66602C1.66602 4.26588 1.66602 3.56582 1.9385 3.03104C2.17818 2.56063 2.56063 2.17818 3.03104 1.9385C3.56582 1.66602 4.26588 1.66602 5.66602 1.66602H14.3327C15.7328 1.66602 16.4329 1.66602 16.9677 1.9385C17.4381 2.17818 17.8205 2.56063 18.0602 3.03104C18.3327 3.56582 18.3327 4.26588 18.3327 5.66602V14.3327C18.3327 15.7328 18.3327 16.4329 18.0602 16.9677C17.8205 17.4381 17.4381 17.8205 16.9677 18.0602C16.8732 18.1083 16.7737 18.1479 16.666 18.1805M3.3327 18.1805C3.33298 17.5061 3.33702 17.1492 3.39673 16.849C3.65975 15.5267 4.69341 14.4931 6.01571 14.2301C6.33771 14.166 6.72492 14.166 7.49935 14.166H12.4993C13.2738 14.166 13.661 14.166 13.983 14.2301C15.3053 14.4931 16.3389 15.5267 16.602 16.849C16.6617 17.1492 16.6657 17.5061 16.666 18.1805M13.3327 7.91602C13.3327 9.75697 11.8403 11.2493 9.99935 11.2493C8.1584 11.2493 6.66602 9.75697 6.66602 7.91602C6.66602 6.07507 8.1584 4.58268 9.99935 4.58268C11.8403 4.58268 13.3327 6.07507 13.3327 7.91602Z"
            stroke="#414651"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_i9_order">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "batch-orders",
    label: "Batch Orders",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_batch_orders)">
          <path
            d="M1.66602 10.0009L9.70121 14.0185C9.81053 14.0732 9.86518 14.1005 9.92252 14.1113C9.9733 14.1208 10.0254 14.1208 10.0762 14.1113C10.1335 14.1005 10.1882 14.0732 10.2975 14.0185L18.3327 10.0009M1.66602 14.1676L9.70121 18.1852C9.81053 18.2399 9.86518 18.2672 9.92252 18.278C9.9733 18.2875 10.0254 18.2875 10.0762 18.278C10.1335 18.2672 10.1882 18.2399 10.2975 18.1852L18.3327 14.1676M1.66602 5.83428L9.70121 1.81669C9.81053 1.76203 9.86518 1.7347 9.92252 1.72394C9.9733 1.71442 10.0254 1.71442 10.0762 1.72394C10.1335 1.7347 10.1882 1.76203 10.2975 1.81669L18.3327 5.83428L10.2975 9.85188C10.1882 9.90654 10.1335 9.93387 10.0762 9.94462C10.0254 9.95415 9.9733 9.95415 9.92252 9.94462C9.86518 9.93387 9.81053 9.90654 9.70121 9.85188L1.66602 5.83428Z"
            stroke="#414651"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_batch_orders">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "quick-order",
    label: "Quick Order",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 7.5L17.5 7.5M7.5 2.5L7.5 17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
          stroke="#414651"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "quick-court-order",
    label: "Quick Court Order",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 7.5H17.5M2.5 12.5H17.5M10 2.5V17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
          stroke="#414651"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function AddShortcutModal({
  isOpen,
  onClose,
  onShortcutSelect,
}: AddShortcutModalProps) {
  // Responsive detection
  const [isDesktop, setIsDesktop] = React.useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
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

  const handleShortcutClick = (shortcut: ShortcutOption) => {
    if (onShortcutSelect) {
      onShortcutSelect(shortcut.id, shortcut.label);
    }
    console.log("Shortcut selected:", shortcut.label);
    // For now, just close the modal
    // onClose();
  };

  const handleCustomShortcutClick = () => {
    if (onShortcutSelect) {
      onShortcutSelect("custom", "Create Custom Shortcut");
    }
    console.log("Custom shortcut selected");
    // For now, just close the modal
    // onClose();
  };

  const modalContent = !isOpen ? null : (
    <>
      <style>{`
        @media (max-width: 767px) {
          .shortcut-modal-container {
            width: 85% !important;
            left: 15% !important;
            padding: 24px !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 991px) {
          .shortcut-modal-container {
            width: 400px !important;
            right: 0 !important;
            padding: 24px !important;
          }
        }
        
        @media (min-width: 992px) {
          .shortcut-modal-container {
            width: 400px !important;
            right: 0 !important;
            padding: 24px !important;
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
          zIndex: 10000,
          transition: "opacity 0.3s ease",
        }}
        onClick={handleBackdropClick}
      >
        {/* Modal Container */}
        <div
          className="shortcut-modal-container"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "400px",
            right: 0,
            backgroundColor: "#FFF",
            boxShadow:
              "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
            overflowY: "auto",
            padding: "24px",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
            boxSizing: "border-box",
            borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              padding: "0",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              background: "#FFF",
              marginBottom: "24px",
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
                  aspectRatio: "1/1",
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
                    d="M2.5 6.66602L12.5 6.66602M12.5 6.66602C12.5 8.04673 13.6193 9.16602 15 9.16602C16.3807 9.16602 17.5 8.04673 17.5 6.66602C17.5 5.2853 16.3807 4.16602 15 4.16602C13.6193 4.16602 12.5 5.2853 12.5 6.66602ZM7.5 13.3327L17.5 13.3327M7.5 13.3327C7.5 14.7134 6.38071 15.8327 5 15.8327C3.61929 15.8327 2.5 14.7134 2.5 13.3327C2.5 11.952 3.61929 10.8327 5 10.8327C6.38071 10.8327 7.5 11.952 7.5 13.3327Z"
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
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "28px",
                  }}
                >
                  Add Quick Shortcut
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "20px",
                  }}
                >
                  Add up to 4 shortcuts to internal pages or external links you use daily.
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
                border: "none",
                background: "transparent",
                cursor: "pointer",
                borderRadius: "8px",
                position: "relative",
                right: "12px",
                top: "12px",
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
              padding: "0",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            {/* Shortcut Options */}
            {shortcutOptions.map((shortcut) => (
              <div
                key={shortcut.id}
                style={{
                  display: "flex",
                  padding: "16px 12px",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onClick={() => handleShortcutClick(shortcut)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F5F5F5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FFF";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {shortcut.icon}
                </div>
                {/* Label */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
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
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  >
                    {shortcut.label}
                  </div>
                </div>
                {/* Add button */}
                <div
                  style={{
                    display: "flex",
                    width: "32px",
                    height: "32px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "6px",
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
                      d="M8.00065 3.33398V12.6673M3.33398 8.00065H12.6673"
                      stroke="#A4A7AE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}

            {/* Divider */}
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
                  height: "1px",
                  flex: "1 0 0",
                  background: "#E9EAEB",
                }}
              />
            </div>

            {/* Create Custom Shortcut */}
            <div
              style={{
                display: "flex",
                padding: "16px 12px",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: "1px dashed #34479A",
                background: "#ECEEF9",
                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onClick={handleCustomShortcutClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D9DEF2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ECEEF9";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "8px",
                  border: "1px solid #34479A",
                  background: "#D9DEF2",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                    d="M10 6.66667V13.3333M6.66667 10H13.3333M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z"
                    stroke="#34479A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Label */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "2px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "24px",
                  }}
                >
                  Create Custom Shortcut
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <>{modalContent && createPortal(modalContent, document.body)}</>;
}
