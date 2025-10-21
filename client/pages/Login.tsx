import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

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

  const validatePassword = (passwordValue: string) => {
    if (!passwordValue) {
      return "Please enter your password.";
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (hasAttemptedSubmit) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      // Valid credentials, redirect to dashboard
      navigate("/dashboard");
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Google sign in clicked");
  };

  const handleSignUp = () => {
    // Navigate to sign up page
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    navigate("/forgot-password");
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100dvh", // Dynamic viewport height for mobile
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        background: "linear-gradient(90deg, #F7F8FD 0%, #D9DEF2 100%)",
        fontFamily:
          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
        padding: "16px",
        justifyContent: "flex-start",
        paddingTop: "32px",
        paddingBottom: "32px",
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .login-container {
            padding: 32px !important;
          }
                    .login-form-container {
            max-width: 460px !important;
            padding: 32px 40px !important;
          }
        }
                        @media (max-width: 767px) {
          .login-container {
            width: 100% !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 16px !important;
            padding-top: 24px !important;
            padding-bottom: 40px !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }
          .login-form-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 24px 16px !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
          body {
            overflow-x: hidden !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
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
        .secondary-button {
          border-radius: 8px;
          border: 1px solid #D5D7DA;
          background: #FFF;
          box-shadow: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
          transition: background 0.2s ease;
        }
        .secondary-button:hover {
          background: #F5F5F5;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          maxWidth: "460px",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <div
          className="login-form-container"
          style={{
            display: "flex",
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
            {/* Logo */}
            <div
              style={{
                display: "flex",
                width: "139px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "139px",
                  height: "32px",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0f83d57ac8b2445c428a179d465e0002d79ee07?width=274"
                  style={{
                    width: "137px",
                    height: "24px",
                    flexShrink: 0,
                    position: "absolute",
                    left: "1px",
                    top: "4px",
                  }}
                  alt="Accio Data"
                />
              </div>
            </div>

            {/* Header Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
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
                Welcome Back
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
                Welcome back! Please enter your details.
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

              {/* Password Field */}
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
                      Password
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
                      border: passwordError
                        ? "1px solid #FDA29B"
                        : focusedField === "password"
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
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          flex: "1 0 0",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          color: password ? "#181D27" : "#717680",
                          fontFamily:
                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                        placeholder="••••••••"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F5F5F5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {showPassword ? (
                        <svg
                          style={{
                            width: "16px",
                            height: "16px",
                          }}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.16196 3.39488C7.4329 3.35482 7.7124 3.33333 8.00028 3.33333C11.4036 3.33333 13.6369 6.33656 14.3871 7.52455C14.4779 7.66833 14.5233 7.74023 14.5488 7.85112C14.5678 7.93439 14.5678 8.06578 14.5487 8.14905C14.5233 8.25993 14.4776 8.3323 14.3861 8.47705C14.1862 8.79343 13.8814 9.23807 13.4777 9.7203M4.48288 4.47669C3.0415 5.45447 2.06297 6.81292 1.61407 7.52352C1.52286 7.66791 1.47725 7.74011 1.45183 7.85099C1.43273 7.93426 1.43272 8.06563 1.45181 8.14891C1.47722 8.25979 1.52262 8.33168 1.61342 8.47545C2.36369 9.66344 4.59694 12.6667 8.00028 12.6667C9.37255 12.6667 10.5546 12.1784 11.5259 11.5177M2.00028 2L14.0003 14M6.58606 6.58579C6.22413 6.94772 6.00028 7.44772 6.00028 8C6.00028 9.10457 6.89571 10 8.00028 10C8.55256 10 9.05256 9.77614 9.41449 9.41421"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          style={{
                            width: "16px",
                            height: "16px",
                          }}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.61342 8.47537C1.52262 8.33161 1.47723 8.25973 1.45182 8.14886C1.43273 8.06559 1.43273 7.93425 1.45182 7.85097C1.47723 7.74011 1.52262 7.66823 1.61341 7.52447C2.36369 6.33648 4.59693 3.33325 8.00027 3.33325C11.4036 3.33325 13.6369 6.33648 14.3871 7.52447C14.4779 7.66823 14.5233 7.74011 14.5487 7.85097C14.5678 7.93425 14.5678 8.06559 14.5487 8.14886C14.5233 8.25973 14.4779 8.33161 14.3871 8.47537C13.6369 9.66336 11.4036 12.6666 8.00027 12.6666C4.59693 12.6666 2.36369 9.66336 1.61342 8.47537Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.00027 9.99992C9.10484 9.99992 10.0003 9.10449 10.0003 7.99992C10.0003 6.89535 9.10484 5.99992 8.00027 5.99992C6.8957 5.99992 6.00027 6.89535 6.00027 7.99992C6.00027 9.10449 6.8957 9.99992 8.00027 9.99992Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    {passwordError && (
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
                {passwordError && (
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
                    {passwordError}
                  </div>
                )}
              </div>
            </form>

            {/* Remember Me & Forgot Password Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  flex: "1 0 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingTop: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      border: rememberMe ? "none" : "1px solid #D5D7DA",
                      background: rememberMe ? "#344698" : "transparent",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    {rememberMe && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6668 3.5L5.25016 9.91667L2.3335 7"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: "1 0 0",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#414651",
                      fontFamily:
                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Remember for 30 days
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
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
                    textElement.style.color = "#1A234C";
                  }
                }}
                onMouseLeave={(e) => {
                  const textElement = e.currentTarget.querySelector("div");
                  if (textElement) {
                    textElement.style.color = "#273572";
                  }
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
                  Forgot password
                </div>
              </button>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              {/* Sign In Button */}
              <button
                type="submit"
                onClick={handleSubmit}
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
                    Sign in
                  </div>
                </div>
              </button>

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
                ></div>
                <div
                  style={{
                    color: "#535862",
                    textAlign: "center",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  OR
                </div>
                <div
                  style={{
                    height: "1px",
                    flex: "1 0 0",
                    background: "#E9EAEB",
                  }}
                ></div>
              </div>

              {/* Google Sign In Button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  alignSelf: "stretch",
                }}
              >
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="secondary-button"
                  style={{
                    display: "flex",
                    padding: "10px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                    alignSelf: "stretch",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_502_996)">
                      <path
                        d="M23.7663 12.2765C23.7663 11.4608 23.7001 10.6406 23.559 9.83813H12.2402V14.4591H18.722C18.453 15.9495 17.5888 17.2679 16.3233 18.1056V21.104H20.1903C22.4611 19.014 23.7663 15.9274 23.7663 12.2765Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.50277 14.3002C5.00011 12.8099 5.00011 11.196 5.50277 9.70569V6.61475H1.51674C-0.185266 10.0055 -0.185266 14.0004 1.51674 17.3912L5.50277 14.3002Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_502_996">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div
                    style={{
                      color: "#414651",
                      fontFamily:
                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    Sign in with Google
                  </div>
                </button>
              </div>
            </div>

            {/* Sign Up Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
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
                Don't have an account?
              </div>
              <button
                type="button"
                onClick={handleSignUp}
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
                    textElement.style.color = "#1A234C";
                  }
                }}
                onMouseLeave={(e) => {
                  const textElement = e.currentTarget.querySelector("div");
                  if (textElement) {
                    textElement.style.color = "#273572";
                  }
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
                  Sign up
                </div>
              </button>
            </div>

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
              ></div>
            </div>

            {/* Service Information Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  textAlign: "center",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Log in to initiate a background screening or to retrieve your
                background and drug screening results, or
              </div>
              <button
                type="button"
                onClick={handleSignUp}
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
                    textElement.style.color = "#1A234C";
                  }
                }}
                onMouseLeave={(e) => {
                  const textElement = e.currentTarget.querySelector("div");
                  if (textElement) {
                    textElement.style.color = "#273572";
                  }
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
                  Sign up for service.
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
