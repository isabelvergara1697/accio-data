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

export default function ActivateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [requirementStates, setRequirementStates] = useState<{
    [key: string]: boolean;
  }>({});

  // Update requirement states whenever password changes
  useEffect(() => {
    const newStates: { [key: string]: boolean } = {};
    passwordRequirements.forEach((req) => {
      newStates[req.id] = req.validator(formData.password);
    });
    setRequirementStates(newStates);
  }, [formData.password]);

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Check if all requirements are met
    const allRequirementsMet = passwordRequirements.every((req) =>
      req.validator(formData.password),
    );

    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== "",
    );

    if (allRequirementsMet && allFieldsFilled) {
      // Account activated successfully, redirect to dashboard with notification
      navigate("/dashboard?activated=true");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const getRequirementIconColor = (requirementId: string) => {
    if (!formData.password) return "#D5D7DA"; // Gray when no password
    if (requirementStates[requirementId]) return "#079455"; // Green when met
    if (hasAttemptedSubmit && !requirementStates[requirementId])
      return "#F04438"; // Red when failed after submit
    return "#D5D7DA"; // Gray when not met but not submitted yet
  };

  return (
    <div
      className="activate-account-container"
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        background: "linear-gradient(90deg, #F7F8FD 0%, #D9DEF2 100%)",
        fontFamily:
          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
        justifyContent: "flex-start",
        padding: "24px 16px 60px 16px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        /* iPhone Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          .activate-account-container {
            min-height: 100vh !important;
            min-height: 100dvh !important;
          }
        }

        /* Name fields responsive layout */
        .name-group {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          align-self: stretch;
        }

        @media (max-width: 1023px) {
          .name-group {
            flex-direction: column;
            gap: 20px;
          }
        }

        @media (min-width: 1024px) {
          .name-group {
            flex-direction: row;
            gap: 20px;
          }
        }

                @media (max-width: 767px) {
          html, body {
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            height: auto !important;
            min-height: 100% !important;
          }

                    .activate-account-container {
            min-height: auto !important;
            height: auto !important;
            padding: 20px 16px 100px 16px !important;
            justify-content: flex-start !important;
            gap: 20px !important;
          }

          .activate-account-form-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 24px 16px !important;
            margin-bottom: 20px !important;
          }
        }

        @media (min-width: 768px) {
          .activate-account-container {
            padding: 96px 32px 48px 32px !important;
          }
          .activate-account-form-container {
            padding: 32px 40px !important;
          }
        }
                .name-group {
          gap: 20px;
        }
        @media (max-width: 767px) {
          .name-group {
            flex-direction: column;
            gap: 20px;
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
        .link-button:hover {
          color: #1A234C !important;
        }
        .back-link:hover {
          color: #3E4651 !important;
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
          className="activate-account-form-container"
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
          {/* Logo */}
          <div
            style={{
              width: "208.5px",
              height: "48px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0f83d57ac8b2445c428a179d465e0002d79ee07?width=274"
              style={{
                width: "137px",
                height: "24px",
                flexShrink: 0,
              }}
              alt="Accio Data"
            />
          </div>

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
                Activate your account
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
                You have been invited to join [Company Name] team. Please
                validate your information
              </div>
            </div>
          </div>

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
            {/* Name Group */}
            <div className="name-group">
              {/* First Name */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  flex: "1 0 0",
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
                  Name
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
                      focusedField === "firstName"
                        ? "2px solid #34479A"
                        : "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      flex: "1 0 0",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: formData.firstName ? "#181D27" : "#717680",
                      fontFamily:
                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                    placeholder="Jhon"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  flex: "1 0 0",
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
                  Last Name
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
                      focusedField === "lastName"
                        ? "2px solid #34479A"
                        : "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      flex: "1 0 0",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: formData.lastName ? "#181D27" : "#717680",
                      fontFamily:
                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
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
              <div
                style={{
                  display: "flex",
                  padding: "10px 14px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "email"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: formData.email ? "#181D27" : "#717680",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                  placeholder="jhondoe@mail.com"
                />
              </div>
            </div>

            {/* Role */}
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
                  color: "#414651",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Role
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
                    focusedField === "role"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={formData.role}
                  onChange={handleInputChange("role")}
                  onFocus={() => setFocusedField("role")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: formData.role ? "#181D27" : "#717680",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                  placeholder="HR Manager"
                />
              </div>
            </div>

            {/* Password */}
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
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: formData.password ? "#181D27" : "#717680",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                  placeholder="Create a password"
                />
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
                    {showPassword ? (
                      <path
                        d="M1.61342 8.47562C1.52262 8.33186 1.47723 8.25998 1.45182 8.14911C1.43273 8.06583 1.43273 7.9345 1.45182 7.85122C1.47723 7.74035 1.52262 7.66847 1.61341 7.52471C2.36369 6.33672 4.59693 3.3335 8.00027 3.3335C11.4036 3.3335 13.6369 6.33672 14.3871 7.52471C14.4779 7.66847 14.5233 7.74035 14.5487 7.85122C14.5678 7.9345 14.5678 8.06583 14.5487 8.14911C14.5233 8.25998 14.4779 8.33186 14.3871 8.47562C13.6369 9.6636 11.4036 12.6668 8.00027 12.6668C4.59693 12.6668 2.36369 9.6636 1.61342 8.47562Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : null}
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
            {/* Get Started Button */}
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
                  color: "#FFF",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Get started
              </div>
            </button>

            {/* OR Divider */}
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

            {/* Sign up with Google */}
            <button
              type="button"
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
                <g clipPath="url(#clip0_507_3175)">
                  <path
                    d="M23.7663 12.2763C23.7663 11.4605 23.7001 10.6404 23.559 9.83789H12.2402V14.4589H18.722C18.453 15.9492 17.5888 17.2676 16.3233 18.1054V21.1037H20.1903C22.4611 19.0137 23.7663 15.9272 23.7663 12.2763Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.24 24.0013C15.4764 24.0013 18.2058 22.9387 20.1944 21.1044L16.3274 18.106C15.2516 18.838 13.8626 19.2525 12.2444 19.2525C9.11376 19.2525 6.45934 17.1404 5.50693 14.3008H1.51648V17.3917C3.55359 21.4439 7.70278 24.0013 12.24 24.0013Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.50277 14.3007C5.00011 12.8103 5.00011 11.1965 5.50277 9.70618V6.61523H1.51674C-0.185266 10.006 -0.185266 14.0009 1.51674 17.3916L5.50277 14.3007Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M12.24 4.74966C13.9508 4.7232 15.6043 5.36697 16.8433 6.54867L20.2694 3.12262C18.1 1.0855 15.2207 -0.034466 12.24 0.000808666C7.70277 0.000808666 3.55359 2.55822 1.51648 6.61481L5.50252 9.70575C6.45052 6.86173 9.10935 4.74966 12.24 4.74966Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_507_3175">
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
                Sign up with Google
              </div>
            </button>
          </div>

          {/* Footer */}
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
              Already have an account?
            </div>
            <button
              type="button"
              onClick={handleLoginClick}
              className="link-button"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#273572",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
