import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      return "Please enter your email address.";
    }
    if (!emailRegex.test(emailValue)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (hasAttemptedSubmit) {
      setEmailError(validateEmail(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const emailErr = validateEmail(email);
    setEmailError(emailErr);

    if (!emailErr) {
      // Valid email, simulate sending reset instructions
      setIsSubmitted(true);
      console.log("Reset password instructions sent to:", email);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div
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
        // Desktop: padding top/bottom, mobile: full height
        paddingTop: window.innerWidth >= 768 ? "96px" : "0px",
        paddingLeft: window.innerWidth >= 768 ? "32px" : "0px",
        paddingRight: window.innerWidth >= 768 ? "32px" : "0px",
        paddingBottom: window.innerWidth >= 768 ? "48px" : "0px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: window.innerWidth >= 768 ? "1280px" : "100%",
          width: "100%",
          padding: window.innerWidth >= 768 ? "0px 32px" : "0px",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: "460px",
            width: "100%",
            padding: window.innerWidth >= 768 ? "32px 40px" : "32px 16px",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            borderRadius: "16px",
            background: "#FFF",
            boxShadow:
              "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            margin: window.innerWidth < 768 ? "auto" : "0",
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
            {/* Featured Icon */}
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
                  d="M22.6667 11.9999C22.6666 11.3175 22.4063 10.6351 21.8856 10.1144C21.3649 9.59368 20.6825 9.33333 20 9.33333M20 20C24.4183 20 28 16.4183 28 12C28 7.58172 24.4183 4 20 4C15.5817 4 12 7.58172 12 12C12 12.3649 12.0244 12.7241 12.0717 13.076C12.1496 13.6549 12.1885 13.9443 12.1623 14.1275C12.135 14.3182 12.1003 14.421 12.0063 14.5892C11.916 14.7507 11.7569 14.9097 11.4388 15.2278L4.62484 22.0418C4.39424 22.2724 4.27894 22.3877 4.19648 22.5223C4.12337 22.6416 4.0695 22.7716 4.03684 22.9077C4 23.0611 4 23.2242 4 23.5503V25.8667C4 26.6134 4 26.9868 4.14532 27.272C4.27316 27.5229 4.47713 27.7268 4.72801 27.8547C5.01323 28 5.3866 28 6.13333 28H9.33333V25.3333H12V22.6667H14.6667L16.7722 20.5612C17.0903 20.2431 17.2493 20.084 17.4108 19.9937C17.579 19.8997 17.6818 19.865 17.8725 19.8377C18.0557 19.8115 18.3451 19.8504 18.924 19.9283C19.2759 19.9756 19.6351 20 20 20Z"
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
                  fontWeight: 700,
                  lineHeight: "38px",
                }}
              >
                Forgot password?
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
                No worries, we'll send you reset instructions.
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              alignSelf: "stretch",
              borderRadius: "12px",
            }}
          >
            {isSubmitted ? (
              /* Success State */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "24px",
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
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  Reset instructions have been sent to your email address.
                </div>
              </div>
            ) : (
              <>
                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Email Field */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "6px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "2px",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Email
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "10px 14px",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderRadius: "8px",
                          border: emailError
                            ? "1px solid #FDA29B"
                            : focusedField === "email"
                              ? "2px solid #34479A"
                              : "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flex: "1 0 0",
                          }}
                        >
                          <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              color: email ? "#181D27" : "#717680",
                              fontFamily:
                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                            placeholder="Enter your email"
                          />
                        </div>
                        {emailError && (
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              flexShrink: 0,
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 5.33325V7.99992M8 10.6666H8.00667M14.6667 7.99992C14.6667 11.6818 11.6819 14.6666 8 14.6666C4.31814 14.6666 1.33333 11.6818 1.33333 7.99992C1.33333 4.31802 4.31814 1.33325 8 1.33325C11.6819 1.33325 14.6667 4.31802 14.6667 7.99992Z"
                              stroke="#F04438"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    {emailError && (
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#D92D20",
                          fontFamily:
                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                        }}
                      >
                        {emailError}
                      </div>
                    )}
                  </div>
                </form>

                {/* Reset Password Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  style={{
                    display: "flex",
                    padding: "12px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: "#344698",
                    boxShadow:
                      "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
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
                        fontWeight: 700,
                        lineHeight: "24px",
                      }}
                    >
                      Reset password
                    </div>
                  </div>
                </button>
              </>
            )}

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
                  fontWeight: 700,
                  lineHeight: "20px",
                }}
              >
                Back to log in
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
