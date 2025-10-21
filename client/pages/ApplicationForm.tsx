import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    basic: true,
    employment: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    zipCode: "",
    address: "",
    country: "USA",
    state: "Select",
    city: "Select",
    phone: "",
    phoneCountry: "US",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [akaFields, setAkaFields] = useState<
    { firstName: string; middleName: string; lastName: string }[]
  >([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddAka = () => {
    setAkaFields((prev) => [
      ...prev,
      { firstName: "", middleName: "", lastName: "" },
    ]);
  };

  const handleAkaChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setAkaFields((prev) => {
      const newAkas = [...prev];
      newAkas[index] = {
        ...newAkas[index],
        [field]: value,
      };
      return newAkas;
    });
  };

  const handleNextSection = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.dob.trim()) {
      newErrors.dob = "Date of Birth is required";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip Code is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toggleSection("employment");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, akaFields });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100dvh",
        flexDirection: "column",
        background: "#FFF",
        fontFamily:
          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          padding: "16px 20px",
          alignItems: "center",
          gap: "8px",
          alignSelf: "stretch",
          borderBottom: "1px solid #E9EAEB",
          background: "#FFF",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0f83d57ac8b2445c428a179d465e0002d79ee07?width=274"
          style={{
            height: "24px",
            width: "auto",
          }}
          alt="Accio Data"
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 20px",
          flex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "720px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Page Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 600,
                color: "#181D27",
                margin: 0,
              }}
            >
              Complete Your Background Check Form
            </h1>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#535862",
                margin: 0,
              }}
            >
              Provide your personal details below to begin the screening process.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <div
              style={{
                border: "1px solid #E9EAEB",
                borderRadius: "12px",
                background: "#FFF",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: expandedSections.basic
                    ? "1px solid #E9EAEB"
                    : "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleSection("basic")}
              >
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#181D27",
                    margin: 0,
                  }}
                >
                  Basic Information
                </h2>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: expandedSections.basic
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#A4A7AE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {expandedSections.basic && (
                <div style={{ padding: "20px" }}>
                  {/* First Name, Middle Name, Last Name */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        First Name <span style={{ color: "#D92D20" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        style={{
                          padding: "10px 14px",
                          border: errors.firstName
                            ? "1px solid #FDA29B"
                            : "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => {
                          if (!errors.firstName) {
                            e.target.style.borderColor = "#34479A";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.firstName) {
                            e.target.style.borderColor = "#D5D7DA";
                          }
                        }}
                      />
                      {errors.firstName && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#D92D20",
                          }}
                        >
                          {errors.firstName}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        placeholder="Enter middle name"
                        style={{
                          padding: "10px 14px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#34479A";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#D5D7DA";
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        Last Name <span style={{ color: "#D92D20" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        style={{
                          padding: "10px 14px",
                          border: errors.lastName
                            ? "1px solid #FDA29B"
                            : "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          if (!errors.lastName) {
                            e.target.style.borderColor = "#34479A";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.lastName) {
                            e.target.style.borderColor = "#D5D7DA";
                          }
                        }}
                      />
                      {errors.lastName && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#D92D20",
                          }}
                        >
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add More AKAs */}
                  <button
                    type="button"
                    onClick={handleAddAka}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#34479A",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      padding: "8px 0",
                      marginBottom: "16px",
                    }}
                  >
                    + Add More AKAs
                  </button>

                  {/* Additional AKAs */}
                  {akaFields.map((aka, index) => (
                    <div
                      key={index}
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "16px",
                        marginBottom: "16px",
                        padding: "16px",
                        background: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#414651",
                          }}
                        >
                          First Name (AKA)
                        </label>
                        <input
                          type="text"
                          value={aka.firstName}
                          onChange={(e) =>
                            handleAkaChange(index, "firstName", e.target.value)
                          }
                          placeholder="Enter first name"
                          style={{
                            padding: "10px 14px",
                            border: "1px solid #D5D7DA",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontFamily: "inherit",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#414651",
                          }}
                        >
                          Middle Name (AKA)
                        </label>
                        <input
                          type="text"
                          value={aka.middleName}
                          onChange={(e) =>
                            handleAkaChange(
                              index,
                              "middleName",
                              e.target.value
                            )
                          }
                          placeholder="Enter middle name"
                          style={{
                            padding: "10px 14px",
                            border: "1px solid #D5D7DA",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontFamily: "inherit",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#414651",
                          }}
                        >
                          Last Name (AKA)
                        </label>
                        <input
                          type="text"
                          value={aka.lastName}
                          onChange={(e) =>
                            handleAkaChange(index, "lastName", e.target.value)
                          }
                          placeholder="Enter last name"
                          style={{
                            padding: "10px 14px",
                            border: "1px solid #D5D7DA",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontFamily: "inherit",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* DOB, Zip Code, Address */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        DOB (MM/DD/YYYY){" "}
                        <span style={{ color: "#D92D20" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        placeholder="MM/DD/YYYY"
                        style={{
                          padding: "10px 14px",
                          border: errors.dob
                            ? "1px solid #FDA29B"
                            : "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          if (!errors.dob) {
                            e.target.style.borderColor = "#34479A";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.dob) {
                            e.target.style.borderColor = "#D5D7DA";
                          }
                        }}
                      />
                      {errors.dob && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#D92D20",
                          }}
                        >
                          {errors.dob}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        Zip Code <span style={{ color: "#D92D20" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Enter zip code"
                        style={{
                          padding: "10px 14px",
                          border: errors.zipCode
                            ? "1px solid #FDA29B"
                            : "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          if (!errors.zipCode) {
                            e.target.style.borderColor = "#34479A";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.zipCode) {
                            e.target.style.borderColor = "#D5D7DA";
                          }
                        }}
                      />
                      {errors.zipCode && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#D92D20",
                          }}
                        >
                          {errors.zipCode}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        Address <span style={{ color: "#D92D20" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                        style={{
                          padding: "10px 14px",
                          border: errors.address
                            ? "1px solid #FDA29B"
                            : "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          if (!errors.address) {
                            e.target.style.borderColor = "#34479A";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.address) {
                            e.target.style.borderColor = "#D5D7DA";
                          }
                        }}
                      />
                      {errors.address && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#D92D20",
                          }}
                        >
                          {errors.address}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Country, State, City */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        style={{
                          padding: "10px 14px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          cursor: "pointer",
                        }}
                      >
                        <option>USA</option>
                        <option>Canada</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        style={{
                          padding: "10px 14px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          cursor: "pointer",
                        }}
                      >
                        <option>Select</option>
                        <option>California</option>
                        <option>Texas</option>
                        <option>Florida</option>
                      </select>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        City
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        style={{
                          padding: "10px 14px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          cursor: "pointer",
                        }}
                      >
                        <option>Select</option>
                        <option>New York</option>
                        <option>Los Angeles</option>
                      </select>
                    </div>
                  </div>

                  {/* Phone and Email */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        Applicant Phone{" "}
                        <span style={{ color: "#D92D20" }}>*</span>
                      </label>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <select
                          name="phoneCountry"
                          value={formData.phoneCountry}
                          onChange={handleInputChange}
                          style={{
                            padding: "10px 8px",
                            border: "1px solid #D5D7DA",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontFamily: "inherit",
                            outline: "none",
                            background: "#FFF",
                            cursor: "pointer",
                            minWidth: "60px",
                          }}
                        >
                          <option>US</option>
                          <option>CA</option>
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          style={{
                            flex: 1,
                            padding: "10px 14px",
                            border: errors.phone
                              ? "1px solid #FDA29B"
                              : "1px solid #D5D7DA",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontFamily: "inherit",
                            outline: "none",
                          }}
                          onFocus={(e) => {
                            if (!errors.phone) {
                              e.target.style.borderColor = "#34479A";
                            }
                          }}
                          onBlur={(e) => {
                            if (!errors.phone) {
                              e.target.style.borderColor = "#D5D7DA";
                            }
                          }}
                        />
                      </div>
                      {errors.phone && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#D92D20",
                          }}
                        >
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                        }}
                      >
                        Applicant Email{" "}
                        <span style={{ color: "#D92D20" }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        style={{
                          padding: "10px 14px",
                          border: errors.email
                            ? "1px solid #FDA29B"
                            : "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          if (!errors.email) {
                            e.target.style.borderColor = "#34479A";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.email) {
                            e.target.style.borderColor = "#D5D7DA";
                          }
                        }}
                      />
                      {errors.email && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#D92D20",
                          }}
                        >
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Next Section Button */}
                  <button
                    type="button"
                    onClick={handleNextSection}
                    style={{
                      padding: "10px 16px",
                      background: "#FFF",
                      border: "1px solid #D5D7DA",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#414651",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F5F5F5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FFF";
                    }}
                  >
                    Next Section
                  </button>
                </div>
              )}
            </div>

            {/* Employment Section */}
            <div
              style={{
                border: "1px solid #E9EAEB",
                borderRadius: "12px",
                background: "#FFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: expandedSections.employment
                    ? "1px solid #E9EAEB"
                    : "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleSection("employment")}
              >
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#181D27",
                    margin: 0,
                  }}
                >
                  Employment
                </h2>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: expandedSections.employment
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#A4A7AE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {expandedSections.employment && (
                <div style={{ padding: "20px" }}>
                  <p
                    style={{
                      color: "#535862",
                      fontSize: "14px",
                    }}
                  >
                    Employment information will be collected in this section.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
