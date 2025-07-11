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
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string;
  }>({});

  // Update requirement states whenever password changes
  useEffect(() => {
    const newStates: { [key: string]: boolean } = {};
    passwordRequirements.forEach((req) => {
      newStates[req.id] = req.validator(formData.password);
    });
    setRequirementStates(newStates);
  }, [formData.password]);

  const validateField = (field: string, value: string) => {
    if (!value.trim()) {
      switch (field) {
        case "firstName":
          return "Please enter your first name.";
        case "lastName":
          return "Please enter your last name.";
        case "email":
          return "Please enter your email address.";
        case "role":
          return "Please enter your role.";
        case "password":
          return "Please enter a password.";
        default:
          return "This field is required.";
      }
    }
    return "";
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (hasAttemptedSubmit && fieldErrors[field]) {
        setFieldErrors((prev) => ({
          ...prev,
          [field]: validateField(field, value),
        }));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Validate all fields
    const newFieldErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData],
      );
      if (error) {
        newFieldErrors[field] = error;
      }
    });

    setFieldErrors(newFieldErrors);

    // Check if all requirements are met
    const allRequirementsMet = passwordRequirements.every((req) =>
      req.validator(formData.password),
    );

    // Check if all fields are filled and have no errors
    const hasFieldErrors = Object.keys(newFieldErrors).length > 0;
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== "",
    );

    if (allRequirementsMet && allFieldsFilled && !hasFieldErrors) {
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
          flex-direction: row;
          gap: 20px;
          align-items: flex-start;
          align-self: stretch;
        }

        @media (max-width: 1023px) {
          .name-group {
            flex-direction: column;
            gap: 20px;
          }
          .name-group > div {
            width: 100% !important;
            flex: 1 1 100% !important;
          }
        }

                @media (min-width: 1024px) {
          .name-group {
            flex-direction: row;
            gap: 20px;
          }
          .name-group > div {
            flex: 1;
            max-width: calc(50% - 10px);
            min-width: 0;
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
              display: "flex",
              width: "139px",
              alignItems: "flex-start",
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
                    border: fieldErrors.firstName
                      ? "1px solid #FDA29B"
                      : focusedField === "firstName"
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
                  {fieldErrors.firstName && (
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
                {fieldErrors.firstName && (
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
                    {fieldErrors.firstName}
                  </div>
                )}
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
                    border: fieldErrors.lastName
                      ? "1px solid #FDA29B"
                      : focusedField === "lastName"
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
                  {fieldErrors.lastName && (
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
                {fieldErrors.lastName && (
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
                    {fieldErrors.lastName}
                  </div>
                )}
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
                  border: fieldErrors.email
                    ? "1px solid #FDA29B"
                    : focusedField === "email"
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
                {fieldErrors.email && (
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
              {fieldErrors.email && (
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
                  {fieldErrors.email}
                </div>
              )}
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
                  border: fieldErrors.role
                    ? "1px solid #FDA29B"
                    : focusedField === "role"
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
                {fieldErrors.role && (
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
              {fieldErrors.role && (
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
                  {fieldErrors.role}
                </div>
              )}
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
                  border: fieldErrors.password
                    ? "1px solid #FDA29B"
                    : focusedField === "password"
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
                {fieldErrors.password && (
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
              {fieldErrors.password && (
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
                  {fieldErrors.password}
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
