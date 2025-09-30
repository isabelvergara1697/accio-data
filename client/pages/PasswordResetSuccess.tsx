import React from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordResetSuccess() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="password-reset-success-container"
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100dvh",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        background: "linear-gradient(90deg, #F7F8FD 0%, #D9DEF2 100%)",
        fontFamily:
          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
        justifyContent: "flex-start",
        paddingTop: "32px",
        paddingBottom: "32px",
        padding: "16px",
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .password-reset-success-container {
            width: 100% !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 16px !important;
            padding-top: 24px !important;
            padding-bottom: 40px !important;
            justify-content: flex-start !important;
          }
          .password-reset-success-form-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 24px 16px !important;
            box-sizing: border-box !important;
          }
          body {
            overflow-x: hidden !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
        }
        @media (min-width: 768px) {
          .password-reset-success-container {
            padding: 96px 32px 48px 32px !important;
          }
          .password-reset-success-form-container {
            padding: 32px 40px !important;
          }
        }
        @media (max-width: 767px) {
          .password-reset-success-container {
            padding: 32px 16px !important;
          }
                    .password-reset-success-form-container {
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
          className="password-reset-success-form-container"
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
            {/* Featured Icon - Check Circle */}
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
                  d="M10.0003 15.9998L14.0003 19.9998L22.0003 11.9998M29.3337 15.9998C29.3337 23.3636 23.3641 29.3332 16.0003 29.3332C8.63653 29.3332 2.66699 23.3636 2.66699 15.9998C2.66699 8.63604 8.63653 2.6665 16.0003 2.6665C23.3641 2.6665 29.3337 8.63604 29.3337 15.9998Z"
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
                Password reset
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
                Your password has been successfully reset. Click below to log in
                magically.
              </div>
            </div>
          </div>

          {/* Back to Login Button */}
          <button
            type="button"
            onClick={handleBackToLogin}
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
                Back to Login
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
