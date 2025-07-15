import React, { useState, useEffect } from "react";
import FormInput from "./form-input";
import FormSelect, { SelectOption } from "./form-select";

export interface QuickOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  emailOrPhone: string;
  package: string;
  account: string;
  user: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  emailOrPhone?: string;
  package?: string;
  account?: string;
  user?: string;
}

const packageOptions: SelectOption[] = [
  { value: "basic", label: "Basic Package" },
  { value: "standard", label: "Standard Package" },
  { value: "premium", label: "Premium Package" },
  { value: "enterprise", label: "Enterprise Package" },
];

const accountOptions: SelectOption[] = [
  { value: "personal", label: "Personal Account" },
  { value: "business", label: "Business Account" },
  { value: "enterprise", label: "Enterprise Account" },
];

const userOptions: SelectOption[] = [
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
  { value: "guest", label: "Guest" },
];

export default function QuickOrderDrawer({
  isOpen,
  onClose,
}: QuickOrderDrawerProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    emailOrPhone: "",
    package: "",
    account: "",
    user: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Reset form when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        emailOrPhone: "",
        package: "",
        account: "",
        user: "",
      });
      setErrors({});
      setHasAttemptedSubmit(false);
      setFocusedField(null);
    }
  }, [isOpen]);

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

  const validateField = (field: keyof FormData, value: string): string => {
    switch (field) {
      case "firstName":
        return !value.trim() ? "Please enter your first name." : "";
      case "lastName":
        return !value.trim() ? "Please enter your last name." : "";
      case "emailOrPhone":
        if (!value.trim()) return "Please enter your email or phone number.";
        // Basic validation for email or phone
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (
          !emailRegex.test(value) &&
          !phoneRegex.test(value.replace(/\s|-|\(|\)/g, ""))
        ) {
          return "Please enter a valid email or phone number.";
        }
        return "";
      case "package":
        return !value ? "Please select a package." : "";
      case "account":
        return !value ? "Please select an account." : "";
      case "user":
        return !value ? "Please select a user." : "";
      default:
        return "";
    }
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (hasAttemptedSubmit && errors[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user selects
    if (hasAttemptedSubmit && errors[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Validate all required fields
    const newErrors: FormErrors = {};
    (
      [
        "firstName",
        "lastName",
        "emailOrPhone",
        "package",
        "account",
        "user",
      ] as const
    ).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your API
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
                @media (max-width: 767px) {
          .drawer-container {
            width: 85% !important;
            left: 15% !important;
            padding: 24px !important;
          }
          .drawer-header {
            margin-bottom: 24px !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .drawer-container {
            width: 400px !important;
            right: 0 !important;
            padding: 32px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .drawer-container {
            width: 440px !important;
            right: 0 !important;
            padding: 40px !important;
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
        {/* Drawer Container */}
        <div
          className="drawer-container"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "440px",
            right: 0,
            backgroundColor: "#FFF",
            boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
            padding: "40px",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="drawer-header"
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "32px",
              paddingBottom: "16px",
              borderBottom: "1px solid #E9EAEB",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#181D27",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "32px",
                }}
              >
                Create New Order
              </h2>
              <p
                style={{
                  margin: "4px 0 0 0",
                  color: "#535862",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Fill out the form below to create a new order
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
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
                  d="M15 5L5 15M5 5L15 15"
                  stroke="#667085"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* First Name */}
              <FormInput
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                onFocus={() => setFocusedField("firstName")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter first name"
                error={errors.firstName}
                isFocused={focusedField === "firstName"}
                required
              />

              {/* Middle Name */}
              <FormInput
                label="Middle Name"
                type="text"
                value={formData.middleName}
                onChange={handleInputChange("middleName")}
                onFocus={() => setFocusedField("middleName")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter middle name (optional)"
                isFocused={focusedField === "middleName"}
              />

              {/* Last Name */}
              <FormInput
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                onFocus={() => setFocusedField("lastName")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter last name"
                error={errors.lastName}
                isFocused={focusedField === "lastName"}
                required
              />

              {/* Email or Phone */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "8px",
                }}
              >
                <FormInput
                  label="Email or Phone Number"
                  type="text"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange("emailOrPhone")}
                  onFocus={() => setFocusedField("emailOrPhone")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter email or phone number"
                  error={errors.emailOrPhone}
                  isFocused={focusedField === "emailOrPhone"}
                  required
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  style={{
                    padding: "10px 14px",
                    border: "1px solid #D5D7DA",
                    borderRadius: "8px",
                    background: "#FFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "44px",
                    height: "44px",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFF";
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
                      d="M8 3.33325V12.6666M3.33333 7.99992H12.6667"
                      stroke="#667085"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Package */}
              <FormSelect
                label="Package"
                value={formData.package}
                onChange={handleSelectChange("package")}
                onFocus={() => setFocusedField("package")}
                onBlur={() => setFocusedField(null)}
                placeholder="Select package"
                error={errors.package}
                isFocused={focusedField === "package"}
                options={packageOptions}
                required
              />

              {/* Account */}
              <FormSelect
                label="Account"
                value={formData.account}
                onChange={handleSelectChange("account")}
                onFocus={() => setFocusedField("account")}
                onBlur={() => setFocusedField(null)}
                placeholder="Select account"
                error={errors.account}
                isFocused={focusedField === "account"}
                options={accountOptions}
                required
              />

              {/* User */}
              <FormSelect
                label="User"
                value={formData.user}
                onChange={handleSelectChange("user")}
                onFocus={() => setFocusedField("user")}
                onBlur={() => setFocusedField(null)}
                placeholder="Select user"
                error={errors.user}
                isFocused={focusedField === "user"}
                options={userOptions}
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  marginTop: "8px",
                  padding: "12px 16px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "8px",
                  background: "#344698",
                  boxShadow:
                    "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  color: "#FFF",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#273572";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#344698";
                }}
              >
                Create Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
