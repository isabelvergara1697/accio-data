import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import FormInput from "./form-input";
import FormSelect, { SelectOption } from "./form-select";
import {
  generateOrderNumber,
  formatFullName,
  extractContactInfo,
} from "../../lib/order-utils";

export interface QuickOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess?: (orderData: {
    orderNumber: string;
    customerName: string;
    email?: string;
    phone?: string;
  }) => void;
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

// Company-specific users mapping
const companyUsers: { [key: string]: SelectOption[] } = {
  techcorp: [
    { value: "john.smith", label: "John Smith" },
    { value: "sarah.jones", label: "Sarah Jones" },
    { value: "mike.davis", label: "Mike Davis" },
    { value: "lisa.chen", label: "Lisa Chen" },
    { value: "tom.wilson", label: "Tom Wilson" },
    { value: "amy.brown", label: "Amy Brown" },
    { value: "david.lee", label: "David Lee" },
    { value: "emma.taylor", label: "Emma Taylor" },
    { value: "james.white", label: "James White" },
    { value: "kate.garcia", label: "Kate Garcia" },
  ],
  globalventures: [
    { value: "alex.rodriguez", label: "Alex Rodriguez" },
    { value: "maria.martinez", label: "Maria Martinez" },
    { value: "chris.thompson", label: "Chris Thompson" },
    { value: "jennifer.clark", label: "Jennifer Clark" },
    { value: "robert.lewis", label: "Robert Lewis" },
    { value: "nicole.walker", label: "Nicole Walker" },
    { value: "kevin.hall", label: "Kevin Hall" },
    { value: "amanda.young", label: "Amanda Young" },
    { value: "steven.king", label: "Steven King" },
    { value: "rachel.scott", label: "Rachel Scott" },
  ],
  innovationsystems: [
    { value: "brian.adams", label: "Brian Adams" },
    { value: "michelle.baker", label: "Michelle Baker" },
    { value: "daniel.green", label: "Daniel Green" },
    { value: "stephanie.hill", label: "Stephanie Hill" },
    { value: "anthony.nelson", label: "Anthony Nelson" },
    { value: "jessica.carter", label: "Jessica Carter" },
    { value: "matthew.mitchell", label: "Matthew Mitchell" },
    { value: "ashley.perez", label: "Ashley Perez" },
    { value: "joshua.roberts", label: "Joshua Roberts" },
    { value: "megan.turner", label: "Megan Turner" },
  ],
  blueoceancorp: [
    { value: "william.phillips", label: "William Phillips" },
    { value: "elizabeth.campbell", label: "Elizabeth Campbell" },
    { value: "joseph.parker", label: "Joseph Parker" },
    { value: "samantha.evans", label: "Samantha Evans" },
    { value: "charles.edwards", label: "Charles Edwards" },
    { value: "natalie.collins", label: "Natalie Collins" },
    { value: "ryan.stewart", label: "Ryan Stewart" },
    { value: "lauren.sanchez", label: "Lauren Sanchez" },
    { value: "tyler.morris", label: "Tyler Morris" },
    { value: "hannah.rogers", label: "Hannah Rogers" },
  ],
  alphaenterprises: [
    { value: "andrew.reed", label: "Andrew Reed" },
    { value: "brittany.cook", label: "Brittany Cook" },
    { value: "jonathan.bailey", label: "Jonathan Bailey" },
    { value: "rebecca.rivera", label: "Rebecca Rivera" },
    { value: "nathan.cooper", label: "Nathan Cooper" },
    { value: "christina.richardson", label: "Christina Richardson" },
    { value: "jacob.watson", label: "Jacob Watson" },
    { value: "diana.brooks", label: "Diana Brooks" },
    { value: "brandon.ward", label: "Brandon Ward" },
    { value: "kimberly.torres", label: "Kimberly Torres" },
  ],
  nexustech: [
    { value: "gregory.peterson", label: "Gregory Peterson" },
    { value: "vanessa.gray", label: "Vanessa Gray" },
    { value: "aaron.ramirez", label: "Aaron Ramirez" },
    { value: "tiffany.james", label: "Tiffany James" },
    { value: "jeremy.watson", label: "Jeremy Watson" },
    { value: "courtney.bennett", label: "Courtney Bennett" },
    { value: "travis.wood", label: "Travis Wood" },
    { value: "heather.barnes", label: "Heather Barnes" },
    { value: "derek.henderson", label: "Derek Henderson" },
    { value: "monica.coleman", label: "Monica Coleman" },
  ],
  meridiangroup: [
    { value: "seth.jenkins", label: "Seth Jenkins" },
    { value: "valerie.perry", label: "Valerie Perry" },
    { value: "lucas.powell", label: "Lucas Powell" },
    { value: "crystal.long", label: "Crystal Long" },
    { value: "caleb.hughes", label: "Caleb Hughes" },
    { value: "miranda.flores", label: "Miranda Flores" },
    { value: "marcus.washington", label: "Marcus Washington" },
    { value: "paige.butler", label: "Paige Butler" },
    { value: "cole.simmons", label: "Cole Simmons" },
    { value: "lindsay.foster", label: "Lindsay Foster" },
  ],
  stellarlogistics: [
    { value: "blake.gonzales", label: "Blake Gonzales" },
    { value: "alexis.bryant", label: "Alexis Bryant" },
    { value: "evan.alexander", label: "Evan Alexander" },
    { value: "julia.russell", label: "Julia Russell" },
    { value: "felix.griffin", label: "Felix Griffin" },
    { value: "madison.diaz", label: "Madison Diaz" },
    { value: "noah.hayes", label: "Noah Hayes" },
    { value: "caroline.myers", label: "Caroline Myers" },
    { value: "gavin.ford", label: "Gavin Ford" },
    { value: "adriana.hamilton", label: "Adriana Hamilton" },
  ],
  quantumsolutions: [
    { value: "ian.graham", label: "Ian Graham" },
    { value: "melody.sullivan", label: "Melody Sullivan" },
    { value: "connor.wallace", label: "Connor Wallace" },
    { value: "kendra.woods", label: "Kendra Woods" },
    { value: "mason.west", label: "Mason West" },
    { value: "brooke.jordan", label: "Brooke Jordan" },
    { value: "austin.patterson", label: "Austin Patterson" },
    { value: "sierra.bradley", label: "Sierra Bradley" },
    { value: "kyle.gibson", label: "Kyle Gibson" },
    { value: "faith.ellis", label: "Faith Ellis" },
  ],
  phoenixconsulting: [
    { value: "garrett.sanders", label: "Garrett Sanders" },
    { value: "chloe.price", label: "Chloe Price" },
    { value: "shane.bennett", label: "Shane Bennett" },
    { value: "kaylee.morgan", label: "Kaylee Morgan" },
    { value: "preston.ross", label: "Preston Ross" },
    { value: "mariah.kelly", label: "Mariah Kelly" },
    { value: "drew.howard", label: "Drew Howard" },
    { value: "shelby.cox", label: "Shelby Cox" },
    { value: "chase.ward", label: "Chase Ward" },
    { value: "jasmine.bailey", label: "Jasmine Bailey" },
  ],
};

export default function QuickOrderDrawer({
  isOpen,
  onClose,
  onOrderSuccess,
}: QuickOrderDrawerProps) {
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

  // Reset user when account changes
  useEffect(() => {
    if (formData.account) {
      setFormData((prev) => ({ ...prev, user: "" }));
    }
  }, [formData.account]);

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

    // Update the first contact's label based on detected type
    const updatedContacts = formData.contacts.map((contact, index) => {
      if (index === 0 && contact.label === "Email or Phone Number") {
        return {
          ...contact,
          type: detectedType,
          label: detectedType === "email" ? "Email" : "Phone Number",
        };
      }
      return contact;
    });

    setFormData((prev) => ({
      ...prev,
      contacts: [...updatedContacts, newContact],
    }));
  };

  // Helper function to remove a contact field
  const removeContactField = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));

    // Clear error for removed field
    if (errors.contacts?.[id]) {
      setErrors((prev) => {
        const newContacts = { ...prev.contacts };
        delete newContacts[id];
        return {
          ...prev,
          contacts: newContacts,
        };
      });
    }
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

  const validateContact = (contact: ContactField): string => {
    if (contact.required && !contact.value.trim()) {
      return `Please enter your ${contact.type}.`;
    }

    if (contact.value.trim()) {
      if (contact.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.value)) {
          return "Please enter a valid email address.";
        }
      } else if (contact.type === "phone") {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(contact.value.replace(/\s|-|\(|\)/g, ""))) {
          return "Please enter a valid phone number.";
        }
      }
    }

    return "";
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

  // Get user options based on selected account
  const getUserOptions = (): SelectOption[] => {
    if (!formData.account) return [];
    return companyUsers[formData.account] || [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Validate all required fields
    const newErrors: FormErrors = {};
    (["firstName", "lastName", "package"] as const).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate contacts
    const contactErrors: { [key: string]: string } = {};
    formData.contacts.forEach((contact) => {
      const error = validateContact(contact);
      if (error) {
        contactErrors[contact.id] = error;
      }
    });

    if (Object.keys(contactErrors).length > 0) {
      newErrors.contacts = contactErrors;
    }

    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      // Generate order number and prepare data
      const orderNumber = generateOrderNumber();
      const customerName = formatFullName(
        formData.firstName,
        formData.middleName,
        formData.lastName,
      );
      const { email, phone } = extractContactInfo(formData.contacts);

      const orderData = {
        orderNumber,
        customerName,
        email,
        phone,
      };

      // Trigger success callback and close drawer
      if (onOrderSuccess) {
        onOrderSuccess(orderData);
      }
      onClose();

      console.log("Order created:", {
        orderNumber,
        customerName,
        email,
        phone,
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
            padding: 24px !important;
          }
          .drawer-header {
            margin-bottom: 24px !important;
          }
                    .form-container {
            gap: 24px !important;
          }
        }

        /* Custom tooltip styles */
        [data-tooltip] {
          position: relative;
        }

                        [data-tooltip]:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 125%;
          right: 0;
          background: #0A0D12;
          color: #FFF;
          padding: 8px 12px;
          border-radius: 8px;
          font-family: 'Public Sans', -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 12px;
          font-weight: 600;
          line-height: 18px;
          white-space: nowrap;
          z-index: 10003;
          box-shadow: 0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03);
          opacity: 1;
          pointer-events: none;
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
            padding: "24px",
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
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "44px",
                  height: "40px",
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
                gap: "24px",
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

              {/* Contact Fields */}
              {formData.contacts.map((contact, index) => (
                <div key={contact.id}>
                  {index === 0 && formData.contacts.length === 1 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <FormInput
                        label={contact.label}
                        type="text"
                        value={contact.value}
                        onChange={(e) =>
                          updateContactField(contact.id, e.target.value)
                        }
                        onFocus={() => setFocusedField(contact.id)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={
                          contact.type === "email"
                            ? "Enter email address"
                            : "e.g. 123-456-7890"
                        }
                        error={errors.contacts?.[contact.id]}
                        isFocused={focusedField === contact.id}
                        required={contact.required}
                        style={{ flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={addContactField}
                        data-tooltip="Add Additional Contact"
                        style={{
                          marginTop: "26px", // Account for label height (20px) + gap (6px)
                          padding: "8px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "6px",
                          background: "#FFF",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "40px",
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
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <FormInput
                        label={contact.label}
                        type="text"
                        value={contact.value}
                        onChange={(e) =>
                          updateContactField(contact.id, e.target.value)
                        }
                        onFocus={() => setFocusedField(contact.id)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={
                          contact.type === "email"
                            ? "Enter email address"
                            : "e.g. 123-456-7890"
                        }
                        error={errors.contacts?.[contact.id]}
                        isFocused={focusedField === contact.id}
                        required={contact.required}
                        style={{ flex: 1 }}
                      />
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => removeContactField(contact.id)}
                          data-tooltip="Remove"
                          style={{
                            marginTop: "26px", // Account for label height (20px) + gap (6px)
                            padding: "8px",
                            border: "1px solid #D5D7DA",
                            borderRadius: "6px",
                            background: "#FFF",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "40px",
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
                              d="M3.33333 8H12.6667"
                              stroke="#F04438"
                              strokeWidth="1.33"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

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
                options={getUserOptions()}
                disabled={!formData.account}
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

  return <>{modalContent && createPortal(modalContent, document.body)}</>;
}
