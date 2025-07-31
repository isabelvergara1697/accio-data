import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export interface InformationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InformationDrawer({
  isOpen,
  onClose,
}: InformationDrawerProps) {
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
          backgroundColor: "rgba(10, 13, 18, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 10000,
          transition: "opacity 0.3s ease",
        }}
        onClick={handleBackdropClick}
      >
        {/* Drawer Container */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "400px",
            right: 0,
            backgroundColor: "#FFF",
            borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
            overflowY: "auto",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={(e) => e.stopPropagation()}
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
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
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
                    d="M10 11.6667V8.75M10 5.83333H10.0083M8.25 16L9.46667 17.6222C9.6476 17.8635 9.73807 17.9841 9.84897 18.0272C9.94611 18.065 10.0539 18.065 10.151 18.0272C10.2619 17.9841 10.3524 17.8635 10.5333 17.6222L11.75 16C11.9943 15.6743 12.1164 15.5114 12.2654 15.3871C12.4641 15.2213 12.6986 15.104 12.9504 15.0446C13.1393 15 13.3429 15 13.75 15C14.9149 15 15.4973 15 15.9567 14.8097C16.5693 14.556 17.056 14.0693 17.3097 13.4567C17.5 12.9973 17.5 12.4149 17.5 11.25V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V11.25C2.5 12.4149 2.5 12.9973 2.6903 13.4567C2.94404 14.0693 3.43072 14.556 4.04329 14.8097C4.50272 15 5.08515 15 6.25 15C6.65715 15 6.86072 15 7.04959 15.0446C7.30141 15.104 7.53593 15.2213 7.73458 15.3871C7.88357 15.5114 8.00571 15.6743 8.25 16Z"
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
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  Key Info
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Quick reference for report symbols, colors, and codes.
                </div>
              </div>
            </div>
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
                e.currentTarget.style.background = "#FDFDFD";
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
                  d="M15 5L5 15M5 5L15 15"
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
              padding: "0 24px 20px 24px",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            {/* Icon Legend Table */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    width: "53px",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  Icon
                </div>
                <div
                  style={{
                    width: "146px",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  Description
                </div>
                <div
                  style={{
                    width: "74px",
                    color: "#717680",
                    textAlign: "right",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  CSV Letter
                </div>
              </div>

              {/* Icon Rows */}
              {[
                {
                  icon: (
                    <div
                      style={{
                        display: "flex",
                        width: "28px",
                        height: "28px",
                        padding: "6px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "9999px",
                        background: "#FEE4E2",
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
                          d="M2.66675 14L2.66675 2.66667M2.66675 8.66667H7.60008C7.97345 8.66667 8.16013 8.66667 8.30274 8.594C8.42818 8.53009 8.53017 8.4281 8.59409 8.30266C8.66675 8.16005 8.66675 7.97337 8.66675 7.6V3.06667C8.66675 2.6933 8.66675 2.50661 8.59409 2.36401C8.53017 2.23856 8.42818 2.13658 8.30274 2.07266C8.16013 2 7.97345 2 7.60008 2H3.73341C3.36005 2 3.17336 2 3.03075 2.07266C2.90531 2.13658 2.80333 2.23856 2.73941 2.36401C2.66675 2.50661 2.66675 2.6933 2.66675 3.06667V8.66667ZM8.66675 3.33333H12.9334C13.3068 3.33333 13.4935 3.33333 13.6361 3.406C13.7615 3.46991 13.8635 3.5719 13.9274 3.69734C14.0001 3.83995 14.0001 4.02663 14.0001 4.4V8.93333C14.0001 9.3067 14.0001 9.49339 13.9274 9.63599C13.8635 9.76144 13.7615 9.86342 13.6361 9.92734C13.4935 10 13.3068 10 12.9334 10H9.73341C9.36005 10 9.17336 10 9.03075 9.92734C8.90531 9.86342 8.80333 9.76144 8.73941 9.63599C8.66675 9.49339 8.66675 9.3067 8.66675 8.93333V3.33333Z"
                          stroke="#D92D20"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Report contains discrepancies or derogatory information.",
                  csvLetter: "H",
                },
                {
                  icon: (
                    <div
                      style={{
                        display: "flex",
                        width: "28px",
                        height: "28px",
                        padding: "6px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "9999px",
                        background: "#FEF0C7",
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
                          d="M7.99976 5.99997V8.66664M7.99976 11.3333H8.00642M7.07663 2.59445L1.59338 12.0655C1.28924 12.5909 1.13717 12.8535 1.15965 13.0691C1.17925 13.2571 1.27776 13.428 1.43067 13.5392C1.60597 13.6666 1.90948 13.6666 2.5165 13.6666H13.483C14.09 13.6666 14.3935 13.6666 14.5688 13.5392C14.7217 13.428 14.8203 13.2571 14.8399 13.0691C14.8623 12.8535 14.7103 12.5909 14.4061 12.0655L8.92288 2.59445C8.61983 2.07101 8.46831 1.80929 8.27062 1.72139C8.09818 1.64471 7.90133 1.64471 7.72889 1.72139C7.5312 1.80929 7.37968 2.07101 7.07663 2.59445Z"
                          stroke="#DC6803"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Report requires review for final evaluation.",
                  csvLetter: "C",
                },
                {
                  icon: (
                    <div
                      style={{
                        display: "flex",
                        width: "28px",
                        height: "28px",
                        padding: "6px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "9999px",
                        background: "#B9E6FE",
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
                          d="M10 3.06667C10 2.6933 10 2.50661 9.92734 2.36401C9.86342 2.23856 9.76144 2.13658 9.63599 2.07266C9.49339 2 9.3067 2 8.93333 2H7.06667C6.6933 2 6.50661 2 6.36401 2.07266C6.23857 2.13658 6.13658 2.23856 6.07266 2.36401C6 2.50661 6 2.6933 6 3.06667V4.93333C6 5.3067 6 5.49339 5.92734 5.63599C5.86342 5.76143 5.76144 5.86342 5.63599 5.92734C5.49339 6 5.3067 6 4.93333 6H3.06667C2.6933 6 2.50661 6 2.36401 6.07266C2.23856 6.13658 2.13658 6.23856 2.07266 6.36401C2 6.50661 2 6.6933 2 7.06667V8.93333C2 9.3067 2 9.49339 2.07266 9.63599C2.13658 9.76144 2.23856 9.86342 2.36401 9.92734C2.50661 10 2.6933 10 3.06667 10H4.93333C5.3067 10 5.49339 10 5.63599 10.0727C5.76144 10.1366 5.86342 10.2386 5.92734 10.364C6 10.5066 6 10.6933 6 11.0667V12.9333C6 13.3067 6 13.4934 6.07266 13.636C6.13658 13.7614 6.23857 13.8634 6.36401 13.9273C6.50661 14 6.6933 14 7.06667 14H8.93333C9.3067 14 9.49339 14 9.63599 13.9273C9.76144 13.8634 9.86342 13.7614 9.92734 13.636C10 13.4934 10 13.3067 10 12.9333V11.0667C10 10.6933 10 10.5066 10.0727 10.364C10.1366 10.2386 10.2386 10.1366 10.364 10.0727C10.5066 10 10.6933 10 11.0667 10H12.9333C13.3067 10 13.4934 10 13.636 9.92734C13.7614 9.86342 13.8634 9.76144 13.9273 9.63599C14 9.49339 14 9.3067 14 8.93333V7.06667C14 6.6933 14 6.50661 13.9273 6.36401C13.8634 6.23857 13.7614 6.13658 13.636 6.07266C13.4934 6 13.3067 6 12.9333 6L11.0667 6C10.6933 6 10.5066 6 10.364 5.92734C10.2386 5.86342 10.1366 5.76143 10.0727 5.63599C10 5.49339 10 5.3067 10 4.93333V3.06667Z"
                          stroke="#0BA5EC"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Report is a drug test.",
                  csvLetter: "D",
                },
                {
                  icon: (
                    <div
                      style={{
                        display: "flex",
                        width: "28px",
                        height: "28px",
                        padding: "6px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "9999px",
                        background: "#F5F5F5",
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
                          d="M2.66659 5.33106C2.55725 5.32824 2.47785 5.32191 2.40646 5.30771C1.87754 5.2025 1.46408 4.78904 1.35887 4.26012C1.33325 4.13132 1.33325 3.97644 1.33325 3.66667C1.33325 3.3569 1.33325 3.20201 1.35887 3.07321C1.46408 2.54429 1.87754 2.13083 2.40646 2.02562C2.53526 2 2.69015 2 2.99992 2H12.9999C13.3097 2 13.4646 2 13.5934 2.02562C14.1223 2.13083 14.5358 2.54429 14.641 3.07321C14.6666 3.20201 14.6666 3.3569 14.6666 3.66667C14.6666 3.97644 14.6666 4.13132 14.641 4.26012C14.5358 4.78904 14.1223 5.2025 13.5934 5.30771C13.522 5.32191 13.4426 5.32824 13.3333 5.33106M6.66659 8.66667H9.33325M2.66659 5.33333H13.3333V10.8C13.3333 11.9201 13.3333 12.4802 13.1153 12.908C12.9235 13.2843 12.6176 13.5903 12.2412 13.782C11.8134 14 11.2534 14 10.1333 14H5.86659C4.74648 14 4.18643 14 3.7586 13.782C3.38228 13.5903 3.07632 13.2843 2.88457 12.908C2.66659 12.4802 2.66659 11.9201 2.66659 10.8V5.33333Z"
                          stroke="#717680"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Report is archived",
                  csvLetter: "A",
                },
                {
                  icon: (
                    <div
                      style={{
                        display: "flex",
                        width: "28px",
                        height: "28px",
                        padding: "6px",
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
                        <path
                          d="M14 14H3.06667C2.6933 14 2.50661 14 2.36401 13.9273C2.23856 13.8634 2.13658 13.7614 2.07266 13.636C2 13.4934 2 13.3067 2 12.9333V2M13.3333 5.33333L10.7208 8.12177C10.6217 8.22745 10.5722 8.28029 10.5125 8.3076C10.4598 8.3317 10.4017 8.34164 10.344 8.33644C10.2786 8.33055 10.2143 8.29718 10.0858 8.23045L7.91421 7.10288C7.78569 7.03615 7.72143 7.00278 7.65602 6.99689C7.59829 6.99169 7.54021 7.00163 7.48749 7.02574C7.42777 7.05305 7.37826 7.10589 7.27925 7.21156L4.66667 10"
                          stroke="#079455"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Report contains monitoring",
                  csvLetter: "M",
                },
                {
                  icon: (
                    <div
                      style={{
                        display: "flex",
                        width: "28px",
                        height: "28px",
                        padding: "6px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "9999px",
                        background: "#D9DEF2",
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
                          d="M13.9999 6.66667C13.9999 6.66667 12.6633 4.84548 11.5774 3.75883C10.4915 2.67218 8.99085 2 7.33325 2C4.01954 2 1.33325 4.68629 1.33325 8C1.33325 11.3137 4.01954 14 7.33325 14C10.0686 14 12.3765 12.1695 13.0987 9.66667M13.9999 6.66667V2.66667M13.9999 6.66667H9.99992"
                          stroke="#344698"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Report contains components registered for rescreening",
                  csvLetter: "R",
                },
                {
                  icon: "AA",
                  description: "Applicant has received Adverse Action Notice",
                  csvLetter: "",
                },
                {
                  icon: "PA",
                  description: "Applicant has received Pre-Adverse Action Notice",
                  csvLetter: "",
                },
                {
                  icon: "CA",
                  description: "Adverse Notice is in the Client Activation Queue",
                  csvLetter: "",
                },
              ].map((row, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "47px",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {typeof row.icon === "string" ? (
                      <div
                        style={{
                          width: "28px",
                          color: "#414651",
                          textAlign: "center",
                          fontFamily: "Public Sans",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "18px",
                        }}
                      >
                        {row.icon}
                      </div>
                    ) : (
                      row.icon
                    )}
                  </div>
                  <div
                    style={{
                      width: "146px",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                    }}
                  >
                    {row.description}
                  </div>
                  <div
                    style={{
                      width: "74px",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                      textAlign: "right",
                    }}
                  >
                    {row.csvLetter}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#E9EAEB",
                margin: "4px 0",
              }}
            />

            {/* Status Table */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    width: "78px",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  Status
                </div>
                <div
                  style={{
                    width: "146px",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  Description
                </div>
              </div>

              {/* Status Rows */}
              {[
                { status: "Archived*", description: "Report has been archived. (Hidden from report list)" },
                { status: "Canceled", description: "Report has been canceled." },
                { status: "Completed", description: "Report is finished; complete information is available." },
                { status: "Incomplete", description: "Report is still being processed." },
                { status: "Negative/Pass", description: "Donor tested negative for illegal use of one or more drugs." },
                { status: "Pending", description: "Report is being processed; partial information may be available." },
                { status: "Positive/Fail", description: "Donor tested positive for illegal use of one or more substances." },
                { status: "Positive/Fail", description: "Status set by the client. Generally used to track which reports have been disposed by you." },
                { status: "Requires Review*", description: "Report requires review for final evaluation." },
                { status: "Under Review", description: "Report is being finalized; partial information may be available." },
                { status: "Waiting*", description: "Report has not been ordered because information is required from the applicant." },
              ].map((row, index) => (
                <div
                  key={`status-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      width: "78px",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                    }}
                  >
                    {row.status}
                  </div>
                  <div
                    style={{
                      flex: "1 0 0",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                    }}
                  >
                    {row.description}
                  </div>
                </div>
              ))}
              
              {/* Note about computed statuses */}
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "18px",
                }}
              >
                Note that statuses with an asterisk (*) are computed statuses.
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#E9EAEB",
                margin: "4px 0",
              }}
            />

            {/* Color Status Table */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    width: "78px",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  Status
                </div>
                <div
                  style={{
                    width: "146px",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  Description
                </div>
              </div>

              {/* Color Status Rows */}
              {[
                { status: "Red", description: "Report contains discrepancies or derogatory information." },
                { status: "Green", description: "Report contains no discrepancies or derogatory information." },
                { status: "Black", description: "No evaluation has been made." },
              ].map((row, index) => (
                <div
                  key={`color-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      width: "78px",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                    }}
                  >
                    {row.status}
                  </div>
                  <div
                    style={{
                      flex: "1 0 0",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                    }}
                  >
                    {row.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <svg
              style={{
                display: "block",
                padding: "4px 0",
                width: "100%",
                height: "9px",
              }}
              width="352"
              height="9"
              viewBox="0 0 352 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M352 5H0V4H352V5Z"
                fill="#E9EAEB"
              />
            </svg>

            {/* CSV Status Code Table */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    width: "78px",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  CSV Status Code
                </div>
                <div
                  style={{
                    width: "146px",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                  }}
                >
                  Description
                </div>
              </div>

              {/* CSV Status Code Rows */}
              {[
                { code: "a", description: "Canceled" },
                { code: "A", description: "Archived" },
                { code: "c", description: "Complete" },
                { code: "C", description: "Complete" },
                { code: "E", description: "Positive / Fail" },
                { code: "G ", description: "Under Review" },
                { code: "H", description: "Not Ordered" },
                { code: "I ", description: "Incomplete" },
                { code: "N", description: "Not Ordered" },
                { code: "P", description: "Pending" },
                { code: "R", description: "Under Review" },
                { code: "W", description: "Waiting" },
              ].map((row, index) => (
                <div
                  key={`csv-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      width: "78px",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                    }}
                  >
                    {row.code}
                  </div>
                  <div
                    style={{
                      flex: "1 0 0",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "18px",
                    }}
                  >
                    {row.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <>{modalContent && createPortal(modalContent, document.body)}</>;
}
