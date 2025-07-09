import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EmailSent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "[user@mail.com]";

  const handleOpenGmail = () => {
    // In a real implementation, this would redirect to the reset password page
    // For now, we'll simulate the flow by going to the set new password page
    navigate("/set-new-password");
  };

  const handleResendEmail = () => {
    // Resend email logic
    console.log("Resending email to:", email);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="email-sent-container"
      style={{
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        background: "linear-gradient(90deg, #F7F8FD 0%, #D9DEF2 100%)",
        fontFamily:
          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .email-sent-container {
            padding: 96px 32px 48px 32px !important;
          }
          .email-sent-form-container {
            padding: 32px 40px !important;
          }
        }
        @media (max-width: 767px) {
          .email-sent-container {
            padding: 32px 16px !important;
          }
                    .email-sent-form-container {
            padding: 32px 16px !important;
          }
        }
        .primary-button {
          border-radius: 8px;
          border: 2px solid rgba(255, 255, 255, 0.12);
          background: #344698;
          box-shadow: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
          transition: background 0.2s ease;
        }
        .primary-button:hover {
          background: #273572;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          maxWidth: "1280px",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <div
          className="email-sent-form-container"
          style={{
            display: "flex",
            maxWidth: "460px",
            width: "100%",
            padding: "32px 40px",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            borderRadius: "16px",
            background: "#FFF",
            boxShadow:
              "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            {/* Featured Icon - Mail */}
            <div
              style={{
                display: "flex",
                width: "56px",
                height: "56px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <svg
                style={{
                  width: "32px",
                  height: "32px",
                  flexShrink: 0,
                }}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.6665 9.3335L13.5531 16.9541C14.4346 17.5712 14.8754 17.8797 15.3549 17.9992C15.7784 18.1048 16.2213 18.1048 16.6448 17.9992C17.1243 17.8797 17.565 17.5712 18.4466 16.9541L29.3332 9.3335M9.0665 26.6668H22.9332C25.1734 26.6668 26.2935 26.6668 27.1491 26.2309C27.9018 25.8474 28.5137 25.2354 28.8972 24.4828C29.3332 23.6271 29.3332 22.507 29.3332 20.2668V11.7335C29.3332 9.49329 29.3332 8.37318 28.8972 7.51753C28.5137 6.76489 27.9018 6.15296 27.1491 5.76947C26.2935 5.3335 25.1734 5.3335 22.9332 5.3335H9.0665C6.82629 5.3335 5.70619 5.3335 4.85054 5.76947C4.09789 6.15296 3.48597 6.76489 3.10248 7.51753C2.6665 8.37318 2.6665 9.49329 2.6665 11.7335V20.2668C2.6665 22.507 2.6665 23.6271 3.10248 24.4828C3.48597 25.2354 4.09789 25.8474 4.85054 26.2309C5.70619 26.6668 6.82629 26.6668 9.0665 26.6668Z"
                  stroke="#414651"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Header Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  textAlign: "center",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "30px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "38px",
                }}
              >
                Check your email
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  textAlign: "center",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                We sent a password reset link to {email}
              </div>
            </div>
          </div>

          {/* Open Gmail Button */}
          <button
            type="button"
            onClick={handleOpenGmail}
            className="primary-button"
            style={{
              display: "flex",
              padding: "12px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              alignSelf: "stretch",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "0px 2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#FFF",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Open Gmail
              </div>
            </div>
          </button>

          {/* Resend Email Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "4px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                color: "#535862",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Didn't receive the email?
            </div>
            <button
              type="button"
              onClick={handleResendEmail}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#273572",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Click to resend
              </div>
            </button>
          </div>

          {/* Back to Login Button */}
          <button
            type="button"
            onClick={handleBackToLogin}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const textElement = e.currentTarget.querySelector("div");
              if (textElement) {
                textElement.style.color = "#3E4651";
              }
            }}
            onMouseLeave={(e) => {
              const textElement = e.currentTarget.querySelector("div");
              if (textElement) {
                textElement.style.color = "#535862";
              }
            }}
          >
            <svg
              style={{
                width: "24px",
                height: "20px",
              }}
              width="25"
              height="20"
              viewBox="0 0 25 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 9.99984H5.5M5.5 9.99984L12.5 15.8332M5.5 9.99984L12.5 4.1665"
                stroke="#A4A7AE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              style={{
                color: "#535862",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              Back to log in
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
