import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import FormInput from "./form-input";
import FormSelect, { SelectOption } from "./form-select";
import AlertNotification from "./alert-notification";
import { generateOrderNumber } from "../../lib/order-utils";

export interface SSNOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess?: (orderNumber: string) => void;
}

interface FormData {
  ssn: string;
  package: string;
  fcraPurpose: string;
}

interface FormErrors {
  ssn?: string;
  package?: string;
  fcraPurpose?: string;
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

const fcraPurposeOptions: SelectOption[] = [
  {
    value: "employment-hire-contract",
    label: "Employment By Hire Or Contract",
  },
  { value: "insurance-underwriting", label: "Insurance Underwriting" },
  { value: "granting-credit", label: "Granting Credit" },
  {
    value: "licensing-eligibility",
    label: "Establishing Eligibility For Licensing",
  },
  { value: "account-collection", label: "Collection Of An Account" },
  { value: "consumer-initiated", label: "Consumer-Initiated Transaction" },
  { value: "tenant-screening", label: "Tenant Screening" },
];

export default function SSNOrderDrawer({
  isOpen,
  onClose,
  onOrderSuccess,
}: SSNOrderDrawerProps) {
  // Responsive detection
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    ssn: "",
    package: "",
    fcraPurpose: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Reset form when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        ssn: "",
        package: "",
        fcraPurpose: "",
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
      case "ssn":
        if (!value.trim()) {
          return "Please enter a Social Security Number.";
        }
        // Basic SSN validation - should contain digits
        const ssnDigits = value.replace(/[^0-9]/g, "");
        if (ssnDigits.length !== 9) {
          return "Please enter a valid 9-digit Social Security Number.";
        }
        return "";
      case "package":
        return !value ? "Please select a package." : "";
      case "fcraPurpose":
        return !value ? "Please select an FCRA Purpose." : "";
      default:
        return "";
    }
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Format SSN with dashes as user types
      if (field === "ssn") {
        // Remove all non-digits
        const digits = value.replace(/[^0-9]/g, "");

        // Add dashes at appropriate positions
        if (digits.length >= 6) {
          value = `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
        } else if (digits.length >= 3) {
          value = `${digits.slice(0, 3)}-${digits.slice(3)}`;
        } else {
          value = digits;
        }
      }

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
    (["ssn", "package", "fcraPurpose"] as const).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      // Generate order number
      const newOrderNumber = generateOrderNumber();

      // Trigger success callback and close drawer
      if (onOrderSuccess) {
        onOrderSuccess(newOrderNumber);
      }
      onClose();

      console.log("SSN Order created:", {
        orderNumber: newOrderNumber,
        formData,
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = !isOpen ? null : (
    <>
      <style>{`
        @media (max-width: 767px) {
          .ssn-drawer-container {
            width: 351px !important;
            right: 0 !important;
            padding: 24px 16px !important;
          }
          .ssn-drawer-header {
            margin-bottom: 24px !important;
          }
          .ssn-form-container {
            gap: 24px !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .ssn-drawer-container {
            width: 351px !important;
            right: 0 !important;
            padding: 24px 16px !important;
          }
          .ssn-drawer-header {
            margin-bottom: 24px !important;
          }
          .ssn-form-container {
            gap: 24px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .ssn-drawer-container {
            width: 440px !important;
            right: 0 !important;
            padding: 24px !important;
          }
          .ssn-drawer-header {
            margin-bottom: 24px !important;
          }
          .ssn-form-container {
            gap: 24px !important;
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
          zIndex: 20000,
          transition: "opacity 0.3s ease",
        }}
        onClick={handleBackdropClick}
      >
        {/* Drawer Container */}
        <div
          className="ssn-drawer-container"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "440px",
            right: 0,
            backgroundColor: "#FFF",
            boxShadow:
              "0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
            overflowY: "auto",
            padding: "24px",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
            boxSizing: "border-box",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="ssn-drawer-header"
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "24px",
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
                  <g clipPath="url(#clip0_2105_1794)">
                    <path
                      d="M3.33343 18.1812C3.83558 18.3334 4.51382 18.3334 5.66675 18.3334H14.3334C15.4863 18.3334 16.1646 18.3334 16.6667 18.1812M3.33343 18.1812C3.22577 18.1486 3.12619 18.109 3.03177 18.0609C2.56137 17.8212 2.17892 17.4387 1.93923 16.9683C1.66675 16.4336 1.66675 15.7335 1.66675 14.3334V5.66669C1.66675 4.26656 1.66675 3.56649 1.93923 3.03171C2.17892 2.56131 2.56137 2.17885 3.03177 1.93917C3.56655 1.66669 4.26662 1.66669 5.66675 1.66669H14.3334C15.7335 1.66669 16.4336 1.66669 16.9684 1.93917C17.4388 2.17885 17.8212 2.56131 18.0609 3.03171C18.3334 3.56649 18.3334 4.26656 18.3334 5.66669V14.3334C18.3334 15.7335 18.3334 16.4336 18.0609 16.9683C17.8212 17.4387 17.4388 17.8212 16.9684 18.0609C16.874 18.109 16.7744 18.1486 16.6667 18.1812M3.33343 18.1812C3.33371 17.5068 3.33775 17.1499 3.39746 16.8497C3.66049 15.5274 4.69415 14.4938 6.01645 14.2307C6.33844 14.1667 6.72566 14.1667 7.50008 14.1667H12.5001C13.2745 14.1667 13.6617 14.1667 13.9837 14.2307C15.306 14.4938 16.3397 15.5274 16.6027 16.8497C16.6624 17.1499 16.6665 17.5068 16.6667 18.1812M13.3334 7.91669C13.3334 9.75764 11.841 11.25 10.0001 11.25C8.15913 11.25 6.66675 9.75764 6.66675 7.91669C6.66675 6.07574 8.15913 4.58335 10.0001 4.58335C11.841 4.58335 13.3334 6.07574 13.3334 7.91669Z"
                      stroke="#344698"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2105_1794">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: isDesktop ? "18px" : "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: isDesktop ? "28px" : "24px",
                  }}
                >
                  Order by SSN
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
                  Enter a Social Security Number to quickly create an order.
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
                borderRadius: "8px",
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              className="ssn-form-container"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* SSN Input */}
              <FormInput
                label="Social Security Trace"
                type="text"
                value={formData.ssn}
                onChange={handleInputChange("ssn")}
                onFocus={() => setFocusedField("ssn")}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. 123-45-6789"
                error={errors.ssn}
                isFocused={focusedField === "ssn"}
                required
                maxLength={11} // 9 digits + 2 dashes
              />

              {/* Package */}
              <FormSelect
                label="Package"
                value={formData.package}
                onChange={handleSelectChange("package")}
                onFocus={() => setFocusedField("package")}
                onBlur={() => setFocusedField(null)}
                placeholder="Select a package"
                error={errors.package}
                isFocused={focusedField === "package"}
                options={packageOptions}
                required
              />

              {/* FCRA Purpose */}
              <FormSelect
                label="FCRA Purpose"
                value={formData.fcraPurpose}
                onChange={handleSelectChange("fcraPurpose")}
                onFocus={() => setFocusedField("fcraPurpose")}
                onBlur={() => setFocusedField(null)}
                placeholder="Select FCRA Purpose"
                error={errors.fcraPurpose}
                isFocused={focusedField === "fcraPurpose"}
                options={fcraPurposeOptions}
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
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  width: "100%",
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

  return <>{modalContent && createPortal(modalContent, document.body)}</>;
}
