import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    generalInformation: true,
  });

  const [formData, setFormData] = useState({
    companyName: "",
    parentCompanyName: "",
    otherTradeNames: "",
    otherTradeName2: "",
    businessName: "",
    businessTelephone: "",
    faxNumber: "",
    streetAddress: "",
    physicalFax: "",
    physicalAddress: "",
    physicalCity: "Select",
    physicalState: "Select",
    physicalZip: "",
    sameAsPhysical: false,
    mailingAddress: "",
    mailingCity: "Select",
    mailingState: "Select",
    mailingZip: "",
    numberOfEmployees: "",
    sicCode: "",
    businessDescription: "",
    stateIdNumber: "",
    federalTaxId: "",
    businessStructure: "Select",
    dateFormed: "",
    stateOfFormation: "Select",
    dunnBradstreet: "",
    internetAddress: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const mandatoryFields = [
    "companyName",
    "businessName",
    "businessTelephone",
    "faxNumber",
    "streetAddress",
    "physicalFax",
    "physicalAddress",
    "physicalCity",
    "physicalState",
    "physicalZip",
    "mailingAddress",
    "mailingCity",
    "mailingState",
    "mailingZip",
    "numberOfEmployees",
    "sicCode",
    "stateIdNumber",
    "federalTaxId",
    "dateFormed",
    "stateOfFormation",
    "dunnBradstreet",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

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

  const findNextField = () => {
    const firstEmptyField = mandatoryFields.find((fieldName) => {
      const value = formData[fieldName as keyof typeof formData];
      if (fieldName.includes("City") || fieldName.includes("State")) {
        return value === "Select" || value === "";
      }
      return !value;
    });

    if (firstEmptyField) {
      const inputElement = formRef.current?.querySelector(
        `input[name="${firstEmptyField}"], select[name="${firstEmptyField}"]`
      ) as HTMLElement;

      if (inputElement) {
        inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
        inputElement.focus();
      }
    } else {
      alert("All mandatory fields are filled!");
    }
  };

  const clearFields = () => {
    setFormData({
      companyName: "",
      parentCompanyName: "",
      otherTradeNames: "",
      otherTradeName2: "",
      businessName: "",
      businessTelephone: "",
      faxNumber: "",
      streetAddress: "",
      physicalFax: "",
      physicalAddress: "",
      physicalCity: "Select",
      physicalState: "Select",
      physicalZip: "",
      sameAsPhysical: false,
      mailingAddress: "",
      mailingCity: "Select",
      mailingState: "Select",
      mailingZip: "",
      numberOfEmployees: "",
      sicCode: "",
      businessDescription: "",
      stateIdNumber: "",
      federalTaxId: "",
      businessStructure: "Select",
      dateFormed: "",
      stateOfFormation: "Select",
      dunnBradstreet: "",
      internetAddress: "",
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100dvh",
        flexDirection: "column",
        background: "linear-gradient(90deg, #F7F8FD 0%, #D9DEF2 100%)",
        fontFamily:
          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
      }}
    >
      {/* Header with Actions */}
      <div
        style={{
          display: "flex",
          height: "64px",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid #E9EAEB",
          background: "#FFF",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "12px 16px",
            justifyContent: "space-between",
            alignItems: "center",
            flex: "1 0 0",
            alignSelf: "stretch",
            maxWidth: "100%",
          }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/876fe16651091c38ad5eb9e1c4c54f44055b43e1?width=274"
            style={{
              height: "32px",
              width: "auto",
            }}
            alt="Accio Data"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              type="button"
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                background: "#344698",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
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
                  d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
                  stroke="#8D9BD8"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  color: "#FFF",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Find Next Field
              </div>
            </button>
            <button
              type="button"
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
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
                  d="M3.33337 5.83333H11.6667C14.4281 5.83333 16.6667 8.07191 16.6667 10.8333C16.6667 13.5948 14.4281 15.8333 11.6667 15.8333H3.33337M3.33337 5.83333L6.66671 2.5M3.33337 5.83333L6.66671 9.16667"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  color: "#414651",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Clear Fields
              </div>
            </button>
            <button
              type="button"
              disabled
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #E9EAEB",
                background: "#F5F5F5",
                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "not-allowed",
              }}
            >
              <div
                style={{
                  color: "#A4A7AE",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Proccess Application
              </div>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            display: "flex",
            height: "8px",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "8px",
              borderRadius: "9999px 0px 0 9999px",
              background: "#D5D7DA",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "32%",
                height: "8px",
                borderRadius: "0px 9999px 9999px 0",
                background: "#344698",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div
        style={{
          display: "flex",
          padding: "32px 32px 0 32px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "20px",
            alignSelf: "stretch",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              minWidth: "320px",
              flexDirection: "column",
              gap: "4px",
              flex: "1 0 0",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#181D27",
                margin: 0,
                lineHeight: "32px",
              }}
            >
              Client Application and Service Agreement
            </h1>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#535862",
                margin: 0,
                lineHeight: "24px",
              }}
            >
              Provide your personal details below to begin the screening
              process.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setExpandedSections({
                generalInformation: false,
              });
            }}
            style={{
              display: "flex",
              minHeight: "36px",
              padding: "6px 8px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow:
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                color: "#414651",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              Collapse All
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66663 10L7.99996 13.3334L11.3333 10M4.66663 6.00002L7.99996 2.66669L11.3333 6.00002"
                stroke="#A4A7AE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          display: "flex",
          padding: "20px 32px 48px 32px",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Left Sidebar - Instructions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "320px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
              border: "1px solid #E9EAEB",
              background: "#FFF",
              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
            }}
          >
            <div
              style={{
                padding: "20px 16px 12px 16px",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#181D27",
                  margin: 0,
                  marginBottom: "16px",
                  lineHeight: "28px",
                }}
              >
                Instructions and Information
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    color: "#181D27",
                    margin: 0,
                    lineHeight: "24px",
                  }}
                >
                  The information provided is sensitive in nature. To maintain
                  compliance with the Fair Credit Reporting Act, the Driver
                  Privacy Protection Act, and various other state laws and
                  regulations, we must verify the legitimacy of all accounts. We
                  reserve the right to limit access to our services based upon
                  verification of your business.
                </p>

                <div
                  style={{
                    height: "1px",
                    background: "#E9EAEB",
                  }}
                ></div>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#181D27",
                    margin: 0,
                    lineHeight: "24px",
                  }}
                >
                  This form must be completed by an officer of the company or
                  other individual authorized to enter into a legal contract on
                  behalf of your company.{" "}
                  <strong>
                    If you have any questions, please call{" "}
                    <span
                      style={{
                        color: "#273572",
                        textDecoration: "underline",
                      }}
                    >
                      800-777-7777
                    </span>
                    .
                  </strong>
                </p>

                <div
                  style={{
                    height: "1px",
                    background: "#E9EAEB",
                  }}
                ></div>

                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#414651",
                      margin: "0 0 8px 0",
                      lineHeight: "24px",
                    }}
                  >
                    Lifetime Subscription Fee
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#181D27",
                      margin: 0,
                      lineHeight: "24px",
                    }}
                  >
                    This form must be completed by an officer of the company or
                    other individual authorized to enter into a legal contract
                    on behalf of your company.{" "}
                    <strong>
                      If you have any questions, please call{" "}
                      <span
                        style={{
                          color: "#273572",
                          textDecoration: "underline",
                        }}
                      >
                        800-777-7777
                      </span>
                      .
                    </strong>
                  </p>
                </div>

                <div
                  style={{
                    height: "1px",
                    background: "#E9EAEB",
                  }}
                ></div>

                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#414651",
                      margin: "0 0 8px 0",
                      lineHeight: "24px",
                    }}
                  >
                    Onsite Inspection Fee
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#181D27",
                      margin: "0 0 16px 0",
                      lineHeight: "24px",
                    }}
                  >
                    If you would like to purchase motor vehicle reports (MVR's)
                    or credit report based products such as Trac, Credit
                    Reports, Trac to Criminal History, an onsite inspection of
                    your business is required. This fee is $99 and is usually
                    completed within five business days.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Payment Icons */}
                    <div
                      style={{
                        width: "58px",
                        height: "40px",
                        border: "1px solid #E9EAEB",
                        borderRadius: "6px",
                        background: "#FFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="40"
                        height="14"
                        viewBox="0 0 40 14"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.91709 13.4304H6.48419L3.90993 3.32063C3.78775 2.85558 3.52831 2.44444 3.14669 2.25067C2.19432 1.76372 1.14486 1.37618 5.72205e-06 1.18072V0.791494H5.53014C6.29338 0.791494 6.86581 1.37618 6.96121 2.05522L8.29688 9.34775L11.7281 0.791494H15.0656L9.91709 13.4304ZM16.9737 13.4304H13.7316L16.4013 0.791494H19.6434L16.9737 13.4304ZM23.8378 4.29286C23.9332 3.61213 24.5057 3.2229 25.1735 3.2229C26.223 3.12518 27.3661 3.32063 28.3202 3.8059L28.8926 1.08468C27.9386 0.695456 26.8891 0.5 25.9367 0.5C22.7901 0.5 20.5003 2.25068 20.5003 4.6804C20.5003 6.52881 22.1222 7.49934 23.2671 8.08403C24.5057 8.66703 24.9827 9.05625 24.8873 9.63925C24.8873 10.5137 23.9332 10.903 22.9809 10.903C21.836 10.903 20.6912 10.6115 19.6434 10.1245L19.0709 12.8474C20.2158 13.3327 21.4544 13.5282 22.5993 13.5282C26.1276 13.6242 28.3202 11.8752 28.3202 9.25002C28.3202 5.94412 23.8378 5.75035 23.8378 4.29286V4.29286ZM39.6667 13.4304L37.0924 0.791494H34.3273C33.7549 0.791494 33.1825 1.18072 32.9917 1.76372L28.2248 13.4304H31.5623L32.2284 11.5837H36.3292L36.7108 13.4304H39.6667ZM34.8044 4.19514L35.7568 8.95854H33.0871L34.8044 4.19514Z"
                          fill="#172B85"
                        />
                      </svg>
                    </div>
                    <div
                      style={{
                        width: "58px",
                        height: "40px",
                        border: "1px solid #E9EAEB",
                        borderRadius: "6px",
                        background: "#FFF",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "58px",
                        height: "40px",
                        border: "1px solid #E9EAEB",
                        borderRadius: "6px",
                        background: "#FFF",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "58px",
                        height: "40px",
                        border: "1px solid #E9EAEB",
                        borderRadius: "6px",
                        background: "#1F72CD",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  style={{
                    height: "1px",
                    background: "#E9EAEB",
                  }}
                ></div>

                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#414651",
                      margin: "0 0 8px 0",
                      lineHeight: "24px",
                    }}
                  >
                    PDF Recommendation
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#181D27",
                      margin: "0 0 16px 0",
                      lineHeight: "24px",
                    }}
                  >
                    Many of our documents are in Adobe Portable Document Format
                    (PDF). To view a PDF, you must have the Adobe Acrobat Reader
                    9.0 or higher software installed on your computer. To
                    download the software, click on the adjacent button.
                  </p>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/6422fb8920e29f2d9842322e06055075310068b3?width=176"
                    alt="Get Adobe Reader"
                    style={{
                      width: "88px",
                      height: "31px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* General Information Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "20px 24px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => toggleSection("generalInformation")}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#181D27",
                    margin: 0,
                    lineHeight: "28px",
                  }}
                >
                  General Information
                </h2>
                <button
                  type="button"
                  style={{
                    display: "flex",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: expandedSections.generalInformation
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {expandedSections.generalInformation && (
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    gap: "16px",
                    borderTop: "1px solid #E9EAEB",
                  }}
                >
                  {/* Company Name Row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        Company Name{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                          lineHeight: "20px",
                        }}
                      >
                        Parent Company Name
                      </label>
                      <input
                        type="text"
                        name="parentCompanyName"
                        value={formData.parentCompanyName}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                          lineHeight: "20px",
                        }}
                      >
                        Other Trade or DBA Names
                      </label>
                      <input
                        type="text"
                        name="otherTradeNames"
                        value={formData.otherTradeNames}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Business Name Row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        Other Trade or DBA Names
                      </label>
                      <input
                        type="text"
                        name="otherTradeName2"
                        value={formData.otherTradeName2}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                          lineHeight: "20px",
                        }}
                      >
                        Business NAME Your Company Listed with Directory
                        Assistance <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#535862",
                          lineHeight: "20px",
                        }}
                      >
                        (NAME, not the number.)
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      background: "#E9EAEB",
                    }}
                  ></div>

                  {/* Contact Information */}
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#181D27",
                      margin: 0,
                      lineHeight: "24px",
                    }}
                  >
                    Contact Information
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        Business Telephone Your Company Listed with Directory
                        Assistance <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="businessTelephone"
                        value={formData.businessTelephone}
                        onChange={handleInputChange}
                        placeholder="999-999-9999"
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                          lineHeight: "20px",
                        }}
                      >
                        Fax Number <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="faxNumber"
                        value={formData.faxNumber}
                        onChange={handleInputChange}
                        placeholder="999-999-9999"
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      background: "#E9EAEB",
                    }}
                  ></div>

                  {/* Physical Address */}
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#181D27",
                      margin: 0,
                      lineHeight: "24px",
                    }}
                  >
                    Physical Address
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        Street Address{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#535862",
                          lineHeight: "20px",
                        }}
                      >
                        No Post Office Boxes
                      </span>
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
                          lineHeight: "20px",
                        }}
                      >
                        Fax Number <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="physicalFax"
                        value={formData.physicalFax}
                        onChange={handleInputChange}
                        placeholder="999-999-9999"
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        Physical Address{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="physicalAddress"
                        value={formData.physicalAddress}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#535862",
                          lineHeight: "20px",
                        }}
                      >
                        Pre-checked items are your most commonly ordered
                        services. Any additional items you order will be added to
                        your bill.
                      </span>
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
                          lineHeight: "20px",
                        }}
                      >
                        City <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <select
                        name="physicalCity"
                        value={formData.physicalCity}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <option>Select</option>
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        State <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <select
                        name="physicalState"
                        value={formData.physicalState}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <option>Select</option>
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
                          lineHeight: "20px",
                        }}
                      >
                        Zip Code <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="physicalZip"
                        value={formData.physicalZip}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      background: "#E9EAEB",
                    }}
                  ></div>

                  {/* Mailing Address */}
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#181D27",
                      margin: 0,
                      lineHeight: "24px",
                    }}
                  >
                    Mailing Address
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="sameAsPhysical"
                      checked={formData.sameAsPhysical}
                      onChange={handleInputChange}
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "4px",
                        border: "1px solid #D5D7DA",
                        cursor: "pointer",
                      }}
                    />
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#414651",
                        lineHeight: "20px",
                      }}
                    >
                      Same as physical address
                    </label>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        Address <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="mailingAddress"
                        value={formData.mailingAddress}
                        onChange={handleInputChange}
                        placeholder="999-999-9999"
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#535862",
                          lineHeight: "20px",
                        }}
                      >
                        No Post Office Boxes
                      </span>
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
                          lineHeight: "20px",
                        }}
                      >
                        City <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <select
                        name="mailingCity"
                        value={formData.mailingCity}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <option>Select</option>
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        State <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <select
                        name="mailingState"
                        value={formData.mailingState}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <option>Select</option>
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
                          lineHeight: "20px",
                        }}
                      >
                        Zip Code <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="mailingZip"
                        value={formData.mailingZip}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      background: "#E9EAEB",
                    }}
                  ></div>

                  {/* Complementary Information */}
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#181D27",
                      margin: 0,
                      lineHeight: "24px",
                    }}
                  >
                    Complementary Information
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        Number of Employees{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="numberOfEmployees"
                        value={formData.numberOfEmployees}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                          lineHeight: "20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        SIC Code <span style={{ color: "#344698" }}>*</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6.05998 6.00001C6.21672 5.55446 6.52608 5.17875 6.93328 4.93943C7.34048 4.70012 7.81924 4.61264 8.28476 4.69248C8.75028 4.77233 9.17252 5.01436 9.4767 5.3757C9.78087 5.73703 9.94735 6.19436 9.94665 6.66668C9.94665 8.00001 7.94665 8.66668 7.94665 8.66668M7.99998 11.3333H8.00665M14.6666 8.00001C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8.00001C1.33331 4.31811 4.31808 1.33334 7.99998 1.33334C11.6819 1.33334 14.6666 4.31811 14.6666 8.00001Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                      <input
                        type="text"
                        name="sicCode"
                        value={formData.sicCode}
                        onChange={handleInputChange}
                        placeholder="9999"
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
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
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Please describe the nature of your business. (Maximum of
                      250 characters)
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M6.05998 5.99998C6.21672 5.55442 6.52608 5.17872 6.93328 4.9394C7.34048 4.70009 7.81924 4.61261 8.28476 4.69245C8.75028 4.7723 9.17252 5.01433 9.4767 5.37567C9.78087 5.737 9.94735 6.19433 9.94665 6.66665C9.94665 7.99998 7.94665 8.66665 7.94665 8.66665M7.99998 11.3333H8.00665M14.6666 7.99998C14.6666 11.6819 11.6819 14.6666 7.99998 14.6666C4.31808 14.6666 1.33331 11.6819 1.33331 7.99998C1.33331 4.31808 4.31808 1.33331 7.99998 1.33331C11.6819 1.33331 14.6666 4.31808 14.6666 7.99998Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      placeholder="Enter a description..."
                      rows={3}
                      maxLength={250}
                      style={{
                        padding: "12px 14px",
                        border: "1px solid #D5D7DA",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontFamily: "inherit",
                        outline: "none",
                        background: "#FFF",
                        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        State ID Number{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="stateIdNumber"
                        value={formData.stateIdNumber}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                          lineHeight: "20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Federal Tax ID Number{" "}
                        <span style={{ color: "#344698" }}>*</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6.05998 5.99998C6.21672 5.55442 6.52608 5.17872 6.93328 4.9394C7.34048 4.70009 7.81924 4.61261 8.28476 4.69245C8.75028 4.7723 9.17252 5.01433 9.4767 5.37567C9.78087 5.737 9.94735 6.19433 9.94665 6.66665C9.94665 7.99998 7.94665 8.66665 7.94665 8.66665M7.99998 11.3333H8.00665M14.6666 7.99998C14.6666 11.6819 11.6819 14.6666 7.99998 14.6666C4.31808 14.6666 1.33331 11.6819 1.33331 7.99998C1.33331 4.31808 4.31808 1.33331 7.99998 1.33331C11.6819 1.33331 14.6666 4.31808 14.6666 7.99998Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                      <input
                        type="text"
                        name="federalTaxId"
                        value={formData.federalTaxId}
                        onChange={handleInputChange}
                        placeholder="99-9999999"
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "16px",
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
                          lineHeight: "20px",
                        }}
                      >
                        Business Structure
                      </label>
                      <select
                        name="businessStructure"
                        value={formData.businessStructure}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <option>Select</option>
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
                          lineHeight: "20px",
                        }}
                      >
                        Date Formed <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 12px",
                          alignItems: "center",
                          gap: "8px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <input
                          type="text"
                          name="dateFormed"
                          value={formData.dateFormed}
                          onChange={handleInputChange}
                          style={{
                            border: "none",
                            outline: "none",
                            flex: 1,
                            fontSize: "16px",
                            fontFamily: "inherit",
                            background: "transparent",
                          }}
                        />
                      </div>
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
                          lineHeight: "20px",
                        }}
                      >
                        State of Formation{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <select
                        name="stateOfFormation"
                        value={formData.stateOfFormation}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <option>Select</option>
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
                          lineHeight: "20px",
                        }}
                      >
                        Dunn & Bradstreet Number{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="dunnBradstreet"
                        value={formData.dunnBradstreet}
                        onChange={handleInputChange}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        gridColumn: "span 1",
                      }}
                    ></div>
                    <div
                      style={{
                        gridColumn: "span 1",
                      }}
                    ></div>
                    <div
                      style={{
                        gridColumn: "span 1",
                      }}
                    ></div>
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
                          lineHeight: "20px",
                        }}
                      >
                        Internet Address
                      </label>
                      <input
                        type="text"
                        name="internetAddress"
                        value={formData.internetAddress}
                        onChange={handleInputChange}
                        placeholder="www.example.com"
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #D5D7DA",
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          outline: "none",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Next Section Button */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        minHeight: "36px",
                        padding: "6px 8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Next Section
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                padding: "20px 0",
              }}
            >
              <button
                type="button"
                style={{
                  display: "flex",
                  padding: "12px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5 21L15.5001 15M17.5 10C17.5 13.866 14.366 17 10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10Z"
                    stroke="#8D9BD8"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  style={{
                    color: "#FFF",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  Find Next Field
                </div>
              </button>

              <button
                type="button"
                style={{
                  display: "flex",
                  padding: "12px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 7H14.5C17.8137 7 20.5 9.68629 20.5 13C20.5 16.3137 17.8137 19 14.5 19H4.5M4.5 7L8.5 3M4.5 7L8.5 11"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  style={{
                    color: "#414651",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  Clear Fields
                </div>
              </button>

              <button
                type="button"
                disabled
                style={{
                  display: "flex",
                  padding: "12px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "8px",
                  border: "1px solid #E9EAEB",
                  background: "#F5F5F5",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "not-allowed",
                }}
              >
                <div
                  style={{
                    color: "#A4A7AE",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  Proccess Application
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
