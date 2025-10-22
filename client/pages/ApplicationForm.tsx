import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    generalInformation: true,
    administrativeContact: false,
    drugTesting: false,
    useOfInformation: false,
    promotionalCodes: false,
    confirmation: false,
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
    adminName: "",
    adminEmail: "",
    adminConfirmEmail: "",
    useDrugTesting: false,
    screenApplicantsOnly: false,
    orderMVRs: false,
    orderCreditReports: false,
    promoCode1: "",
    promoCode2: "",
    promoCode3: "",
    promoCode4: "",
    confirmationName: "",
    confirmationTitle: "",
    agreeToTerms: false,
    captchaVerified: false,
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
    "adminName",
    "adminEmail",
    "adminConfirmEmail",
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
      adminName: "",
      adminEmail: "",
      adminConfirmEmail: "",
      useDrugTesting: false,
      screenApplicantsOnly: false,
      orderMVRs: false,
      orderCreditReports: false,
      promoCode1: "",
      promoCode2: "",
      promoCode3: "",
      promoCode4: "",
      confirmationName: "",
      confirmationTitle: "",
      agreeToTerms: false,
      captchaVerified: false,
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
              onClick={findNextField}
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
              onClick={clearFields}
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
              const allCollapsed =
                !expandedSections.generalInformation &&
                !expandedSections.administrativeContact &&
                !expandedSections.drugTesting &&
                !expandedSections.useOfInformation &&
                !expandedSections.promotionalCodes;
              if (allCollapsed) {
                setExpandedSections({
                  generalInformation: true,
                  administrativeContact: true,
                  drugTesting: true,
                  useOfInformation: true,
                  promotionalCodes: true,
                });
              } else {
                setExpandedSections({
                  generalInformation: false,
                  administrativeContact: false,
                  drugTesting: false,
                  useOfInformation: false,
                  promotionalCodes: false,
                });
              }
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
              {!expandedSections.generalInformation &&
              !expandedSections.administrativeContact &&
              !expandedSections.drugTesting &&
              !expandedSections.useOfInformation &&
              !expandedSections.promotionalCodes
                ? "Expand All"
                : "Collapse All"}
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="37"
                        height="22"
                        viewBox="0 0 38 23"
                        fill="none"
                        style={{ position: "absolute" }}
                      >
                        <path
                          d="M25.9619 0.38327C32.2034 0.38327 37.2637 5.38308 37.2637 11.5503C37.2635 17.7173 32.2033 22.7163 25.9619 22.7163C23.1635 22.7162 20.6046 21.7091 18.6309 20.0444C16.6572 21.7087 14.0989 22.7163 11.3008 22.7163C5.05961 22.7161 0.00017891 17.7172 0 11.5503C0 5.3832 5.0595 0.383466 11.3008 0.38327C14.0986 0.38327 16.6573 1.39016 18.6309 3.05417C20.6045 1.38975 23.1638 0.383315 25.9619 0.38327Z"
                          fill="#ED0006"
                        />
                      </svg>
                      <svg
                        width="19"
                        height="22"
                        viewBox="0 0 20 23"
                        fill="none"
                        style={{
                          position: "absolute",
                          left: "29px",
                        }}
                      >
                        <path
                          d="M7.96167 0.38327C14.2031 0.38327 19.2634 5.38308 19.2634 11.5503C19.2632 17.7173 14.203 22.7163 7.96167 22.7163C5.16376 22.7162 2.60516 21.7096 0.631592 20.0454C3.06037 17.9973 4.6022 14.9525 4.60229 11.5503C4.60229 8.14777 3.06054 5.10233 0.631592 3.05417C2.60514 1.39002 5.16384 0.383366 7.96167 0.38327Z"
                          fill="#F9A000"
                        />
                      </svg>
                      <svg
                        width="8"
                        height="17"
                        viewBox="0 0 9 18"
                        fill="none"
                        style={{
                          position: "absolute",
                          left: "25px",
                          top: "13px",
                        }}
                      >
                        <path
                          d="M4.63074 0.053833C7.06007 2.102 8.60242 5.14713 8.60242 8.54993C8.60242 11.9525 7.05979 14.9969 4.63074 17.045C2.2023 14.9969 0.661011 11.952 0.661011 8.54993C0.661011 5.14762 2.20202 2.10199 4.63074 0.053833Z"
                          fill="#FF5E00"
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="47"
                        height="8"
                        viewBox="0 0 48 9"
                        fill="none"
                        style={{
                          position: "absolute",
                          left: "5px",
                          top: "15px",
                        }}
                      >
                        <path
                          d="M18.6406 0.18457C19.2504 0.18457 19.9481 0.274633 20.4707 0.632812V2.42383C20.0352 1.88656 19.3375 1.52832 18.6406 1.52832C17.2472 1.61812 16.1151 2.8712 16.2021 4.30371V4.48242C16.2021 5.91514 17.3348 6.99023 18.7285 6.99023C19.4252 6.99012 20.0352 6.63191 20.4707 6.09473V7.88574C19.8609 8.15438 19.2506 8.33301 18.5537 8.33301C16.3761 8.33285 14.6338 6.4524 14.6338 4.21387C14.634 1.88605 16.3762 0.0057902 18.6406 0.18457ZM32.3174 5.55762L34.4072 0.18457H35.9756L32.7529 8.33301H31.9688L28.7451 0.18457H30.3135L32.3174 5.55762ZM11.6729 0.00585938C12.4567 0.0059819 13.2409 0.364189 13.8506 0.901367L13.0664 1.97559C12.718 1.61741 12.2822 1.34864 11.8467 1.34863C11.3241 1.25911 10.8889 1.70696 10.8018 2.24414C10.8018 2.69185 11.0626 2.87133 11.9336 3.22949C13.6758 3.94585 14.1111 4.48308 14.1982 5.55762V5.82617C14.1111 7.25883 12.9787 8.33368 11.585 8.24414C10.5398 8.24401 9.49426 7.70655 8.97168 6.72168L9.93066 5.73633C10.192 6.36309 10.8013 6.81144 11.498 6.81152H11.585C12.1075 6.81152 12.6306 6.27407 12.6309 5.64746C12.6309 5.28929 12.4566 5.01991 12.1953 4.84082C11.8469 4.66173 11.4978 4.4831 11.1494 4.39355C9.75592 3.94584 9.32031 3.3186 9.32031 2.24414V2.1543C9.40762 0.900868 10.4535 -0.0836756 11.6729 0.00585938ZM2.61328 0.18457C4.70372 0.274134 6.35837 2.06498 6.27148 4.21387C6.27148 5.37791 5.74895 6.45289 4.87793 7.25879C4.094 7.88552 3.13584 8.24382 2.17773 8.1543H0V0.18457H2.61328ZM8.3623 8.1543H6.88184V0.18457H8.3623V8.1543ZM40.8535 1.52832H38.1533V3.31836H40.7666V4.66211H38.1533V6.81152H40.8535V8.1543H36.6729V0.18457H40.8535V1.52832ZM43.9893 0.18457C45.7313 0.184582 46.6894 0.990575 46.6895 2.5127C46.7766 3.67678 45.9926 4.66173 44.9473 4.84082L47.2988 8.1543H45.4697L43.4668 4.93066H43.292V8.1543H41.8115V0.18457H43.9893ZM3.91992 2.1543C3.39728 1.70667 2.6128 1.43782 1.91602 1.52734H1.48047V6.81055H1.91602C2.61288 6.90009 3.39727 6.63132 3.91992 6.18359C4.44223 5.64647 4.704 4.93053 4.7041 4.125C4.70406 3.4087 4.44252 2.69152 3.91992 2.1543ZM43.292 3.85547H43.7275C44.6856 3.85547 45.122 3.40831 45.1221 2.60254C45.122 1.88627 44.6857 1.43848 43.7275 1.43848H43.292V3.85547Z"
                          fill="black"
                        />
                      </svg>
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 9 9"
                        fill="none"
                        style={{
                          position: "absolute",
                          left: "26px",
                          top: "15px",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.91285 0C2.73515 0 0.905884 1.7909 0.905884 4.11907C0.905884 6.35769 2.64804 8.23813 4.91285 8.32768C7.17765 8.41722 8.91981 6.53678 9.00692 4.20861C8.91981 1.88044 7.17765 0 4.91285 0V0Z"
                          fill="#FD6020"
                        />
                      </svg>
                      <svg
                        width="19"
                        height="6"
                        viewBox="0 0 19 6"
                        fill="none"
                        style={{
                          position: "absolute",
                          left: "37px",
                          top: "33px",
                        }}
                      >
                        <path
                          d="M0 6L19 0.25V3C19 4.65685 17.6569 6 16 6H0Z"
                          fill="#FD6020"
                        />
                      </svg>
                    </div>
                    <div
                      style={{
                        width: "58px",
                        height: "40px",
                        border: "1px solid #E9EAEB",
                        borderRadius: "6px",
                        background: "#1F72CD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="47"
                        height="12"
                        viewBox="0 0 48 13"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.15903 0.166656L0.857178 12.2446H7.20424L7.99109 10.3188H9.78965L10.5765 12.2446H17.5628V10.7748L18.1854 12.2446H21.7992L22.4218 10.7437V12.2446H36.9514L38.7182 10.3689L40.3725 12.2446L47.8352 12.2601L42.5166 6.23933L47.8352 0.166656H40.4882L38.7684 2.0077L37.1662 0.166656H21.3598L20.0025 3.28407L18.6134 0.166656H12.2796V1.58642L11.575 0.166656H6.15903ZM7.38715 1.88174H10.481L13.9977 10.0718V1.88174H17.3869L20.1032 7.754L22.6065 1.88174H25.9788V10.5484H23.9268L23.9101 3.75726L20.9185 10.5484H19.083L16.0747 3.75726V10.5484H11.8534L11.0531 8.60547H6.72948L5.93085 10.5467H3.66912L7.38715 1.88174ZM36.1997 1.88174H27.8561V10.5433H36.0705L38.7182 7.67273L41.2701 10.5433H43.9378L40.0604 6.23763L43.9378 1.88174H41.3858L38.7516 4.71937L36.1997 1.88174ZM8.8922 3.34809L7.46774 6.80932H10.315L8.8922 3.34809ZM29.9165 5.25827V3.67617V3.67465H35.1227L37.3944 6.20484L35.022 8.74885H29.9165V7.02165H34.4683V5.25827H29.9165Z"
                          fill="white"
                        />
                      </svg>
                    </div>
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
          <form ref={formRef} onSubmit={handleSubmit}>
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

            {/* Administration / Primary User Contact Information Section */}
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
                  flexDirection: "column",
                  padding: expandedSections.administrativeContact
                    ? "20px 24px 0 24px"
                    : "20px 24px 20px 24px",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      flex: 1,
                    }}
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
                      Administration / Primary User Contact Information
                    </h2>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#535862",
                        margin: 0,
                        lineHeight: "20px",
                      }}
                    >
                      User access information will be provided to the primary
                      contact only. Account information and Training Guides are
                      e-mailed to this user. Providing iProspectcheck with the
                      correct e-mail address will ensure a quick setup process.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSection("administrativeContact")}
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
                        transform: expandedSections.administrativeContact
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
              </div>

              {expandedSections.administrativeContact && (
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    gap: "16px",
                    borderRadius: "0 0 0 0",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        flex: 1,
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
                        Name <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="adminName"
                        value={formData.adminName}
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
                        flex: 1,
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
                        E-mail Address{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="adminEmail"
                        value={formData.adminEmail}
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
                        flex: 1,
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
                        Confirm Email Address{" "}
                        <span style={{ color: "#344698" }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="adminConfirmEmail"
                        value={formData.adminConfirmEmail}
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

            {/* Drug Testing Information Section */}
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
                  flexDirection: "column",
                  padding: expandedSections.drugTesting
                    ? "20px 24px 0 24px"
                    : "20px 24px 20px 24px",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      flex: 1,
                    }}
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
                      Drug Testing Information
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSection("drugTesting")}
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
                        transform: expandedSections.drugTesting
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
              </div>

              {expandedSections.drugTesting && (
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    gap: "16px",
                    borderRadius: "0 0 0 0",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "2px",
                      }}
                    >
                      <div
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            useDrugTesting: !prev.useDrugTesting,
                          }));
                        }}
                        style={{
                          display: "flex",
                          width: "16px",
                          height: "16px",
                          padding: "1px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "4px",
                          border: formData.useDrugTesting
                            ? "none"
                            : "1px solid #D5D7DA",
                          background: formData.useDrugTesting
                            ? "#344698"
                            : "transparent",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {formData.useDrugTesting && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              position: "absolute",
                              left: "1px",
                              top: "1px",
                            }}
                          >
                            <path
                              d="M11.6667 3.5L5.25004 9.91667L2.33337 7"
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
                      }}
                    >
                      <label
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            useDrugTesting: !prev.useDrugTesting,
                          }));
                        }}
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Check here if you would like to use drug testing
                        services.
                      </label>
                    </div>
                  </div>

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

            {/* Use of Information Section */}
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
                  flexDirection: "column",
                  padding: expandedSections.useOfInformation
                    ? "20px 24px 0 24px"
                    : "20px 24px 20px 24px",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      flex: 1,
                    }}
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
                      Use of Information
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSection("useOfInformation")}
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
                        transform: expandedSections.useOfInformation
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
              </div>

              {expandedSections.useOfInformation && (
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    gap: "16px",
                    borderRadius: "0 0 0 0",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {/* Checkbox 1 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "2px",
                      }}
                    >
                      <div
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            screenApplicantsOnly: !prev.screenApplicantsOnly,
                          }));
                        }}
                        style={{
                          display: "flex",
                          width: "16px",
                          height: "16px",
                          padding: "1px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "4px",
                          border: formData.screenApplicantsOnly
                            ? "none"
                            : "1px solid #D5D7DA",
                          background: formData.screenApplicantsOnly
                            ? "#344698"
                            : "transparent",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {formData.screenApplicantsOnly && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              position: "absolute",
                              left: "1px",
                              top: "1px",
                            }}
                          >
                            <path
                              d="M11.6667 3.5L5.25004 9.91667L2.33337 7"
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
                      }}
                    >
                      <label
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            screenApplicantsOnly: !prev.screenApplicantsOnly,
                          }));
                        }}
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        I will screen applicants/employees for my company only.
                      </label>
                    </div>
                  </div>

                  {/* Checkbox 2 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "2px",
                      }}
                    >
                      <div
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            orderMVRs: !prev.orderMVRs,
                          }));
                        }}
                        style={{
                          display: "flex",
                          width: "16px",
                          height: "16px",
                          padding: "1px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "4px",
                          border: formData.orderMVRs
                            ? "none"
                            : "1px solid #D5D7DA",
                          background: formData.orderMVRs
                            ? "#344698"
                            : "transparent",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {formData.orderMVRs && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              position: "absolute",
                              left: "1px",
                              top: "1px",
                            }}
                          >
                            <path
                              d="M11.6667 3.5L5.25004 9.91667L2.33337 7"
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
                        flex: 1,
                      }}
                    >
                      <label
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            orderMVRs: !prev.orderMVRs,
                          }));
                        }}
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        I would like to order driving records (MVR's). If I
                        order MVR's, I will order them for employment purposes
                        on applicants/employees for my company only. (Please
                        Note: Onsite Inspection Required.)
                      </label>
                    </div>
                  </div>

                  {/* Checkbox 3 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "2px",
                      }}
                    >
                      <div
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            orderCreditReports: !prev.orderCreditReports,
                          }));
                        }}
                        style={{
                          display: "flex",
                          width: "16px",
                          height: "16px",
                          padding: "1px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "4px",
                          border: formData.orderCreditReports
                            ? "none"
                            : "1px solid #D5D7DA",
                          background: formData.orderCreditReports
                            ? "#344698"
                            : "transparent",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {formData.orderCreditReports && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              position: "absolute",
                              left: "1px",
                              top: "1px",
                            }}
                          >
                            <path
                              d="M11.6667 3.5L5.25004 9.91667L2.33337 7"
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
                        flex: 1,
                      }}
                    >
                      <label
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            orderCreditReports: !prev.orderCreditReports,
                          }));
                        }}
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#414651",
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        I would like to order credit report based products. Some
                        examples of these products are Trac, Credit Reports and
                        Trac to Criminal History. (Please Note: Onsite
                        Inspection Required.)
                      </label>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#E9EAEB",
                    }}
                  />

                  {/* Links Section */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          color: "#273572",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        Click here to review the Agreement for Service.
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 6L14 2M14 2H10M14 2L8.66667 7.33333M6.66667 3.33333H5.2C4.0799 3.33333 3.51984 3.33333 3.09202 3.55132C2.71569 3.74307 2.40973 4.04903 2.21799 4.42535C2 4.85318 2 5.41323 2 6.53333V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H9.46667C10.5868 14 11.1468 14 11.5746 13.782C11.951 13.5903 12.2569 13.2843 12.4487 12.908C12.6667 12.4802 12.6667 11.9201 12.6667 10.8V9.33333"
                          stroke="#34479A"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>

                    <a
                      href="#"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          color: "#273572",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        Click here to review the Addendum to Service Agreement
                        for Credit Services.
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 6L14 2M14 2H10M14 2L8.66667 7.33333M6.66667 3.33333H5.2C4.0799 3.33333 3.51984 3.33333 3.09202 3.55132C2.71569 3.74307 2.40973 4.04903 2.21799 4.42535C2 4.85318 2 5.41323 2 6.53333V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H9.46667C10.5868 14 11.1468 14 11.5746 13.782C11.951 13.5903 12.2569 13.2843 12.4487 12.908C12.6667 12.4802 12.6667 11.9201 12.6667 10.8V9.33333"
                          stroke="#34479A"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>

                    <a
                      href="#"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          color: "#273572",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        Click here to review the Addendum to the Service
                        Agreement for California.
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 6L14 2M14 2H10M14 2L8.66667 7.33333M6.66667 3.33333H5.2C4.0799 3.33333 3.51984 3.33333 3.09202 3.55132C2.71569 3.74307 2.40973 4.04903 2.21799 4.42535C2 4.85318 2 5.41323 2 6.53333V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H9.46667C10.5868 14 11.1468 14 11.5746 13.782C11.951 13.5903 12.2569 13.2843 12.4487 12.908C12.6667 12.4802 12.6667 11.9201 12.6667 10.8V9.33333"
                          stroke="#34479A"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>

                    <a
                      href="#"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          color: "#273572",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        Click here to review our Privacy Policy.
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 6L14 2M14 2H10M14 2L8.66667 7.33333M6.66667 3.33333H5.2C4.0799 3.33333 3.51984 3.33333 3.09202 3.55132C2.71569 3.74307 2.40973 4.04903 2.21799 4.42535C2 4.85318 2 5.41323 2 6.53333V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H9.46667C10.5868 14 11.1468 14 11.5746 13.782C11.951 13.5903 12.2569 13.2843 12.4487 12.908C12.6667 12.4802 12.6667 11.9201 12.6667 10.8V9.33333"
                          stroke="#34479A"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>

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

            {/* Promotional Codes Section */}
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
                  flexDirection: "column",
                  padding: expandedSections.promotionalCodes
                    ? "20px 24px 0 24px"
                    : "20px 24px 20px 24px",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      flex: 1,
                    }}
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
                      Promotional Codes
                    </h2>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#535862",
                        margin: 0,
                        lineHeight: "20px",
                      }}
                    >
                      If you have promotional codes, please enter one per box.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSection("promotionalCodes")}
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
                        transform: expandedSections.promotionalCodes
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
              </div>

              {expandedSections.promotionalCodes && (
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    gap: "16px",
                    borderRadius: "0 0 0 0",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {/* First Row */}
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        flex: 1,
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
                        Promotional Code
                      </label>
                      <input
                        type="text"
                        name="promoCode1"
                        value={formData.promoCode1}
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
                        flex: 1,
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
                        Promotional Code
                      </label>
                      <input
                        type="text"
                        name="promoCode2"
                        value={formData.promoCode2}
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

                  {/* Second Row */}
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        flex: 1,
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
                        Promotional Code
                      </label>
                      <input
                        type="text"
                        name="promoCode3"
                        value={formData.promoCode3}
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
                        flex: 1,
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
                        Promotional Code
                      </label>
                      <input
                        type="text"
                        name="promoCode4"
                        value={formData.promoCode4}
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
                onClick={findNextField}
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
                onClick={clearFields}
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
