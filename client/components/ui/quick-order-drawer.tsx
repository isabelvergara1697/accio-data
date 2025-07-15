import React, { useState, useEffect } from "react";
import FormInput from "./form-input";
import FormSelect, { SelectOption } from "./form-select";

export interface QuickOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactField {
  id: string;
  type: "email" | "phone";
  label: string;
  value: string;
  required: boolean;
}

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  contacts: ContactField[];
  package: string;
  account: string;
  user: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  contacts?: { [key: string]: string };
  package?: string;
  account?: string;
  user?: string;
}

const packageOptions: SelectOption[] = [
  { value: "csd-standard", label: "CSD Standard" },
  { value: "volunteer-application", label: "Volunteer Application" },
  { value: "a-la-carte", label: "A La Carte" },
  { value: "retail", label: "Retail" },
  { value: "mvr", label: "MVR" },
  { value: "sales", label: "Sales" },
  { value: "executive", label: "Executive" },
  { value: "operations", label: "Operations" },
  { value: "hourly", label: "Hourly" },
  { value: "cbsv", label: "CBSV" },
  { value: "dot", label: "DOT" },
  { value: "new-york", label: "New York" },
  { value: "immunization-records", label: "Immunization Records" },
  { value: "just-mvr", label: "Just MVR" },
  { value: "hasc-contractor", label: "HASC Contractor" },
  {
    value: "applicant-provided-address-only",
    label: "Applicant Provided Address Only",
  },
  { value: "employment-only", label: "Employment Only" },
  { value: "sap-10", label: "SAP 10" },
  { value: "identity-check-package", label: "Identity Check Package" },
  {
    value: "identity-check-test-package-includes-product",
    label: "Identity Check Test Package Includes Product",
  },
  { value: "standard-with-edu-and-emp", label: "Standard With EDU And EMP" },
  { value: "test", label: "Test" },
  { value: "executive-plus", label: "Executive Plus" },
  { value: "portal", label: "Portal" },
];

const accountOptions: SelectOption[] = [
  { value: "techcorp", label: "TechCorp Industries" },
  { value: "globalventures", label: "Global Ventures LLC" },
  { value: "innovationsystems", label: "Innovation Systems Inc" },
  { value: "blueoceancorp", label: "Blue Ocean Corporation" },
  { value: "alphaenterprises", label: "Alpha Enterprises" },
  { value: "nexustech", label: "Nexus Technologies" },
  { value: "meridiangroup", label: "Meridian Group" },
  { value: "stellarlogistics", label: "Stellar Logistics" },
  { value: "quantumsolutions", label: "Quantum Solutions" },
  { value: "phoenixconsulting", label: "Phoenix Consulting" },
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
    contacts: [
      {
        id: "contact-1",
        type: "email",
        label: "Email or Phone Number",
        value: "",
        required: true,
      },
    ],
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
        contacts: [
          {
            id: "contact-1",
            type: "email",
            label: "Email or Phone Number",
            value: "",
            required: true,
          },
        ],
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

  // Helper function to detect if input is email or phone
  const detectContactType = (value: string): "email" | "phone" => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{1,10}$/;

    if (emailRegex.test(value)) {
      return "email";
    } else if (phoneRegex.test(value.replace(/\s|-|\(|\)/g, ""))) {
      return "phone";
    }
    // Default to email if unclear
    return "email";
  };

  // Helper function to add a new contact field
  const addContactField = () => {
    const lastContact = formData.contacts[formData.contacts.length - 1];
    if (!lastContact.value.trim()) return; // Don't add if last field is empty

    const detectedType = detectContactType(lastContact.value);
    const nextType = detectedType === "email" ? "phone" : "email";
    const nextLabel = nextType === "email" ? "Email" : "Phone Number";

    const newContact: ContactField = {
      id: `contact-${Date.now()}`,
      type: nextType,
      label: nextLabel,
      value: "",
      required: false,
    };

    setFormData((prev) => ({
      ...prev,
      contacts: [...prev.contacts, newContact],
    }));
  };

  // Helper function to update contact field
  const updateContactField = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) =>
        contact.id === id ? { ...contact, value } : contact,
      ),
    }));

    // Clear error when user starts typing
    if (hasAttemptedSubmit && errors.contacts?.[id]) {
      setErrors((prev) => ({
        ...prev,
        contacts: {
          ...prev.contacts,
          [id]: "",
        },
      }));
    }
  };

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
        return "";
      case "user":
        return "";
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
    (["firstName", "lastName", "emailOrPhone", "package"] as const).forEach(
      (field) => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      },
    );

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
          .form-container {
            gap: 24px !important;
          }
        }
        
                                                @media (min-width: 768px) and (max-width: 991px) {
          .drawer-container {
            width: 400px !important;
            right: 0 !important;
            padding: 24px !important;
          }
          .drawer-header {
            margin-bottom: 24px !important;
          }
          .form-container {
            gap: 24px !important;
          }
        }
        
                @media (min-width: 992px) {
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
              marginBottom: "24px",
              paddingBottom: "24px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
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
                    d="M11.6667 9.16675H6.66671M8.33337 12.5001H6.66671M13.3334 5.83341H6.66671M16.6667 8.75008V5.66675C16.6667 4.26662 16.6667 3.56655 16.3942 3.03177C16.1545 2.56137 15.7721 2.17892 15.3017 1.93923C14.7669 1.66675 14.0668 1.66675 12.6667 1.66675H7.33337C5.93324 1.66675 5.23318 1.66675 4.6984 1.93923C4.22799 2.17892 3.84554 2.56137 3.60586 3.03177C3.33337 3.56655 3.33337 4.26662 3.33337 5.66675V14.3334C3.33337 15.7335 3.33337 16.4336 3.60586 16.9684C3.84554 17.4388 4.22799 17.8212 4.6984 18.0609C5.23318 18.3334 5.93324 18.3334 7.33337 18.3334H9.58337M18.3334 18.3334L17.0834 17.0834M17.9167 15.0001C17.9167 16.6109 16.6109 17.9167 15 17.9167C13.3892 17.9167 12.0834 16.6109 12.0834 15.0001C12.0834 13.3893 13.3892 12.0834 15 12.0834C16.6109 12.0834 17.9167 13.3893 17.9167 15.0001Z"
                    stroke="#344698"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Create Quick Order
                </h2>
                <p
                  style={{
                    margin: "2px 0 0 0",
                    color: "#535862",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Submit an order quickly using only the essential information.
                </p>
              </div>
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
              className="form-container"
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
                  alignItems: "flex-start",
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
                    marginTop: "26px", // Account for label height (20px) + gap (6px)
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

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "#E9EAEB",
                  margin: "4px 0",
                }}
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
