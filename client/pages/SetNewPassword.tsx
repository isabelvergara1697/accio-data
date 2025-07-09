import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PasswordRequirement {
  id: string;
  text: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    text: "Must be at least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "special",
    text: "Must contain one special character (e.g. !, @, #, $)",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
  {
    id: "uppercase",
    text: "Must include at least one uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: "number",
    text: "Must include at least one number",
    validator: (password) => /[0-9]/.test(password),
  },
];

export default function SetNewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [requirementStates, setRequirementStates] = useState<{
    [key: string]: boolean;
  }>({});

  // Update requirement states whenever password changes
  useEffect(() => {
    const newStates: { [key: string]: boolean } = {};
    passwordRequirements.forEach((req) => {
      newStates[req.id] = req.validator(password);
    });
    setRequirementStates(newStates);
  }, [password]);

  // Validate confirm password
  useEffect(() => {
    if (hasAttemptedSubmit && confirmPassword) {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Password don't match. Please try again");
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [password, confirmPassword, hasAttemptedSubmit]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (hasAttemptedSubmit) {
      if (password !== value && value !== "") {
        setConfirmPasswordError("Password don't match. Please try again");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Check if all requirements are met
    const allRequirementsMet = passwordRequirements.every((req) =>
      req.validator(password),
    );

    // Check if passwords match
    const passwordsMatch = password === confirmPassword;

    if (!passwordsMatch) {
      setConfirmPasswordError("Password don't match. Please try again");
      return;
    }

    if (allRequirementsMet && passwordsMatch) {
      // Password is valid, navigate to success page
      navigate("/password-reset-success");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const getRequirementIconColor = (requirementId: string) => {
    if (!password) return "#D5D7DA"; // Gray when no password
    if (requirementStates[requirementId]) return "#079455"; // Green when met
    if (hasAttemptedSubmit && !requirementStates[requirementId])
      return "#F04438"; // Red when failed after submit
    return "#D5D7DA"; // Gray when not met but not submitted yet
  };

  return (
    <div
      className="set-new-password-container"
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
          .set-new-password-container {
            padding: 96px 32px 48px 32px !important;
          }
          .set-new-password-form-container {
            padding: 32px 40px !important;
          }
        }
        @media (max-width: 767px) {
          .set-new-password-container {
            padding: 32px 16px !important;
          }
                    .set-new-password-form-container {
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
          className="set-new-password-form-container"
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
            {/* Featured Icon - Lock */}
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
                  d="M22.6667 14.6667V10.6667C22.6667 6.98477 19.6819 4 16 4C12.3181 4 9.33333 6.98477 9.33333 10.6667V14.6667M10.4 28H21.6C23.8402 28 24.9603 28 25.816 27.564C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V21.0667C28 18.8265 28 17.7064 27.564 16.8507C27.1805 16.0981 26.5686 15.4861 25.816 15.1026C24.9603 14.6667 23.8402 14.6667 21.6 14.6667H10.4C8.15979 14.6667 7.03969 14.6667 6.18404 15.1026C5.43139 15.4861 4.81947 16.0981 4.43597 16.8507C4 17.7064 4 18.8265 4 21.0667V21.6C4 23.8402 4 24.9603 4.43597 25.816C4.81947 26.5686 5.43139 27.1805 6.18404 27.564C7.03969 28 8.15979 28 10.4 28Z"
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
                Set new password
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
                Your new password must be different to previously used
                passwords.
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
                      border:
                        focusedField === "password"
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
                          d="M1.61342 8.47562C1.52262 8.33186 1.47723 8.25998 1.45182 8.14911C1.43273 8.06583 1.43273 7.9345 1.45182 7.85122C1.47723 7.74035 1.52262 7.66847 1.61341 7.52471C2.36369 6.33672 4.59693 3.3335 8.00027 3.3335C11.4036 3.3335 13.6369 6.33672 14.3871 7.52471C14.4779 7.66847 14.5233 7.74035 14.5487 7.85122C14.5678 7.9345 14.5678 8.06583 14.5487 8.14911C14.5233 8.25998 14.4779 8.33186 14.3871 8.47562C13.6369 9.6636 11.4036 12.6668 8.00027 12.6668C4.59693 12.6668 2.36369 9.6636 1.61342 8.47562Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.00027 10.0002C9.10484 10.0002 10.0003 9.10473 10.0003 8.00016C10.0003 6.89559 9.10484 6.00016 8.00027 6.00016C6.8957 6.00016 6.00027 6.89559 6.00027 8.00016C6.00027 9.10473 6.8957 10.0002 8.00027 10.0002Z"
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

              {/* Confirm Password Field */}
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
                      Confirm password
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
                      border: confirmPasswordError
                        ? "1px solid #FDA29B"
                        : focusedField === "confirmPassword"
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
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          flex: "1 0 0",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          color: confirmPassword ? "#181D27" : "#717680",
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                          d="M1.61342 8.47562C1.52262 8.33186 1.47723 8.25998 1.45182 8.14911C1.43273 8.06583 1.43273 7.9345 1.45182 7.85122C1.47723 7.74035 1.52262 7.66847 1.61341 7.52471C2.36369 6.33672 4.59693 3.3335 8.00027 3.3335C11.4036 3.3335 13.6369 6.33672 14.3871 7.52471C14.4779 7.66847 14.5233 7.74035 14.5487 7.85122C14.5678 7.9345 14.5678 8.06583 14.5487 8.14911C14.5233 8.25998 14.4779 8.33186 14.3871 8.47562C13.6369 9.6636 11.4036 12.6668 8.00027 12.6668C4.59693 12.6668 2.36369 9.6636 1.61342 8.47562Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.00027 10.0002C9.10484 10.0002 10.0003 9.10473 10.0003 8.00016C10.0003 6.89559 9.10484 6.00016 8.00027 6.00016C6.8957 6.00016 6.00027 6.89559 6.00027 8.00016C6.00027 9.10473 6.8957 10.0002 8.00027 10.0002Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {confirmPasswordError && (
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
                        <path
                          d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="#F04438"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {confirmPasswordError && (
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
                    {confirmPasswordError}
                  </div>
                )}
              </div>

              {/* Password Requirements */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                }}
              >
                {passwordRequirements.map((requirement) => (
                  <div
                    key={requirement.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      alignSelf: "stretch",
                    }}
                  >
                    <svg
                      style={{
                        width: "20px",
                        height: "20px",
                        aspectRatio: "1/1",
                        fill: getRequirementIconColor(requirement.id),
                      }}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                        fill={getRequirementIconColor(requirement.id)}
                      />
                      <path
                        d="M6.25 10L8.75 12.5L13.75 7.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      style={{
                        flex: "1 0 0",
                        color: "#535862",
                        fontFamily:
                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      {requirement.text}
                    </div>
                  </div>
                ))}
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
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  Reset password
                </div>
              </div>
            </button>

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
                  height: "24px",
                }}
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 12H5.5M5.5 12L12.5 19M5.5 12L12.5 5"
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
    </div>
  );
}
