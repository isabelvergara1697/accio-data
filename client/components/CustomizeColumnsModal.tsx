import React, { useState } from "react";

interface Column {
  id: string;
  name: string;
  order?: number;
  isSelected: boolean;
  hasHelpIcon?: boolean;
}

interface ColumnSection {
  id: string;
  name: string;
  isExpanded: boolean;
  columns: Column[];
  totalCount: number;
  selectedCount: number;
}

interface CustomizeColumnsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizeColumnsModal: React.FC<CustomizeColumnsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Selected columns that are currently active
  const [selectedColumns] = useState<Column[]>([
    { id: "status", name: "Status", order: 1, isSelected: true },
    { id: "firstName", name: "First Name", order: 2, isSelected: true },
    { id: "lastName", name: "Last Name", order: 3, isSelected: true },
    { id: "invtEmail", name: "Invt Email", order: 4, isSelected: true },
    { id: "completed", name: "Completed", order: 5, isSelected: true },
    { id: "i9Filled", name: "I-9 Filled", order: 6, isSelected: true },
    { id: "activate", name: "Activate", order: 7, isSelected: true },
    { id: "ews", name: "EWS", order: 8, isSelected: true },
  ]);

  // All available columns for Subject / Applicant section
  const subjectApplicantColumns = [
    { id: "name", name: "Name", isSelected: false },
    { id: "maidenLastName", name: "Maiden Last Name", isSelected: false },
    { id: "mothersMaidenName", name: "Mothers Maiden Name", isSelected: false },
    { id: "motherCompleteName", name: "Mother Complete Name", isSelected: false },
    { id: "fatherCompleteName", name: "Father Complete Name", isSelected: false },
    { id: "middleName", name: "Middle Name", isSelected: false },
    { id: "address", name: "Address", isSelected: false },
    { id: "addressLine2", name: "Address Line 2", isSelected: false },
    { id: "applicantCity", name: "Applicant City", isSelected: false },
    { id: "applicantCountry", name: "Applicant Country", isSelected: false },
    { id: "ssn", name: "SSN", isSelected: false },
    { id: "dateOfBirth", name: "Date of Birth", isSelected: false },
    { id: "driverLicenseNumber", name: "Driver License Number", isSelected: false },
    { id: "driverLicenseCountry", name: "Driver License Country", isSelected: false },
    { id: "stateOfBirth", name: "State of Birth", isSelected: false },
    { id: "cityOfBirth", name: "City of Birth", isSelected: false },
    { id: "countryOfBirth", name: "Country of Birth", isSelected: false },
    { id: "passportNumber", name: "Passport Number", isSelected: false },
    { id: "passportCountry", name: "Passport Country", isSelected: false },
    { id: "citizenshipStatus", name: "Citizenship Status", isSelected: false },
    { id: "passportType", name: "Passport Type", isSelected: false },
    { id: "intlDriverLicenseState", name: "Intl. Driver License State", isSelected: false },
    { id: "intlGovernmentId", name: "Intl. Government Id", isSelected: false },
    { id: "applicantEmail", name: "Applicant Email", isSelected: false, hasHelpIcon: true },
    { id: "noteTitle", name: "Note Title", isSelected: false },
    { id: "hairColor", name: "Hair Color", isSelected: false },
    { id: "race", name: "Race", isSelected: false },
    { id: "yearsAtCurrentResidence", name: "Years at Current Residence", isSelected: false },
    { id: "monthlyIncome", name: "Monthly Income", isSelected: false },
    { id: "monthlyPayments", name: "Monthly Payments", isSelected: false },
    { id: "applicantId", name: "Applicant ID", isSelected: false },
    { id: "adjudicationStatus", name: "Adjudication Status", isSelected: false },
    { id: "adjudicationSubStatus2", name: "Adjudication Sub Status #2", isSelected: false },
    { id: "subjectDisposition", name: "Subject Disposition", isSelected: false },
    { id: "intlGovernmentIdDescription", name: "Intl. Government ID Description", isSelected: false },
    { id: "applicantPhone", name: "Applicant Phone", isSelected: false, hasHelpIcon: true },
    { id: "hasAdmittedConvictions", name: "Has Admitted Convictions", isSelected: false },
    { id: "eyeColor", name: "Eye Color", isSelected: false },
    { id: "gender", name: "Gender", isSelected: false },
    { id: "monthsAtCurrentResidence", name: "Months at Current Residence", isSelected: false },
    { id: "monthlyRent", name: "Monthly Rent", isSelected: false },
    { id: "taxIdNumber", name: "Tax Id Number", isSelected: false },
    { id: "csvReportStatus", name: "CSV Report Status", isSelected: false },
    { id: "adjudicationSubStatus1", name: "Adjudication Sub Status #1", isSelected: false },
    { id: "adjudicationSubStatus3", name: "Adjudication Sub Status #3", isSelected: false },
    { id: "hireDate", name: "Hire Date", isSelected: false },
  ];

  // Column sections for the accordion
  const [columnSections] = useState<ColumnSection[]>([
    {
      id: "subject",
      name: "Subject / Applicant",
      isExpanded: true,
      selectedCount: 0,
      totalCount: 50,
      columns: subjectApplicantColumns,
    },
    {
      id: "invitation",
      name: "Invitation / Portal",
      isExpanded: false,
      selectedCount: 4,
      totalCount: 31,
      columns: [],
    },
    {
      id: "jobPortal",
      name: "Job Portal",
      isExpanded: false,
      selectedCount: 2,
      totalCount: 46,
      columns: [],
    },
    {
      id: "jobInfo",
      name: "Job Information",
      isExpanded: false,
      selectedCount: 2,
      totalCount: 42,
      columns: [],
    },
    {
      id: "orderStatus",
      name: "Order Status",
      isExpanded: false,
      selectedCount: 2,
      totalCount: 19,
      columns: [],
    },
    {
      id: "billing",
      name: "Billing Identifiers",
      isExpanded: false,
      selectedCount: 0,
      totalCount: 22,
      columns: [],
    },
    {
      id: "integration",
      name: "Integration",
      isExpanded: false,
      selectedCount: 0,
      totalCount: 35,
      columns: [],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const resetToDefault = () => {
    console.log("Reset to default clicked");
  };

  const expandAll = () => {
    console.log("Expand all clicked");
  };

  const collapseAll = () => {
    console.log("Collapse all clicked");
  };

  const removeColumn = (columnId: string) => {
    console.log("Remove column:", columnId);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(10, 13, 18, 0.7)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: "relative",
          width: "400px",
          maxWidth: "100vw",
          height: "100vh",
          background: "#FFF",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "24px",
            alignItems: "flex-start",
            gap: "8px",
            background: "#FFF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flex: "1 0 0",
            }}
          >
            {/* Featured Icon */}
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
                  d="M5.66667 2.5H5.16667C4.23325 2.5 3.76654 2.5 3.41002 2.68166C3.09641 2.84144 2.84144 3.09641 2.68166 3.41002C2.5 3.76654 2.5 4.23325 2.5 5.16667V14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H5.66667C6.60009 17.5 7.0668 17.5 7.42332 17.3183C7.73692 17.1586 7.99189 16.9036 8.15168 16.59C8.33333 16.2335 8.33333 15.7668 8.33333 14.8333V5.16667C8.33333 4.23325 8.33333 3.76654 8.15168 3.41002C7.99189 3.09641 7.73692 2.84144 7.42332 2.68166C7.0668 2.5 6.60009 2.5 5.66667 2.5Z"
                  stroke="#344698"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.8333 2.5H14.3333C13.3999 2.5 12.9332 2.5 12.5767 2.68166C12.2631 2.84144 12.0081 3.09641 11.8483 3.41002C11.6667 3.76654 11.6667 4.23325 11.6667 5.16667V14.8333C11.6667 15.7668 11.6667 16.2335 11.8483 16.59C12.0081 16.9036 12.2631 17.1586 12.5767 17.3183C12.9332 17.5 13.3999 17.5 14.3333 17.5H14.8333C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V5.16667C17.5 4.23325 17.5 3.76654 17.3183 3.41002C17.1586 3.09641 16.9036 2.84144 16.59 2.68166C16.2335 2.5 15.7668 2.5 14.8333 2.5Z"
                  stroke="#344698"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title and Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                Customize Columns
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Select, reorder, and customize your column layout. Then you can save your customize.
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
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

        {/* Content */}
        <div
          style={{
            display: "flex",
            width: "400px",
            height: "856px",
            padding: "0 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            overflowY: "auto",
          }}
        >
          {/* Selected Columns Section */}
          <div
            style={{
              display: "flex",
              padding: "8px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Selected Columns
              </div>
              <button
                onClick={resetToDefault}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Reset to Default
                </div>
              </button>
            </div>

            {/* Column Tags */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                alignContent: "flex-start",
                gap: "10px",
                alignSelf: "stretch",
                flexWrap: "wrap",
              }}
            >
              {selectedColumns.map((column) => (
                <div
                  key={column.id}
                  style={{
                    display: "flex",
                    height: "28px",
                    padding: "3px 4px 3px 6px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "3px",
                    borderRadius: "6px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                  }}
                >
                  {/* Drag Handle */}
                  <button
                    style={{
                      display: "flex",
                      width: "24px",
                      height: "24px",
                      transform: "rotate(90deg)",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "6px",
                      border: "none",
                      background: "transparent",
                      cursor: "grab",
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
                        d="M7.33337 5.99992C7.33337 6.36811 7.63185 6.66658 8.00004 6.66658C8.36823 6.66658 8.66671 6.36811 8.66671 5.99992C8.66671 5.63173 8.36823 5.33325 8.00004 5.33325C7.63185 5.33325 7.33337 5.63173 7.33337 5.99992Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 5.99992C12 6.36811 12.2985 6.66658 12.6667 6.66658C13.0349 6.66658 13.3334 6.36811 13.3334 5.99992C13.3334 5.63173 13.0349 5.33325 12.6667 5.33325C12.2985 5.33325 12 5.63173 12 5.99992Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.66671 5.99992C2.66671 6.36811 2.96518 6.66658 3.33337 6.66658C3.70156 6.66658 4.00004 6.36811 4.00004 5.99992C4.00004 5.63173 3.70156 5.33325 3.33337 5.33325C2.96518 5.33325 2.66671 5.63173 2.66671 5.99992Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.33337 9.99992C7.33337 10.3681 7.63185 10.6666 8.00004 10.6666C8.36823 10.6666 8.66671 10.3681 8.66671 9.99992C8.66671 9.63173 8.36823 9.33325 8.00004 9.33325C7.63185 9.33325 7.33337 9.63173 7.33337 9.99992Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 9.99992C12 10.3681 12.2985 10.6666 12.6667 10.6666C13.0349 10.6666 13.3334 10.3681 13.3334 9.99992C13.3334 9.63173 13.0349 9.33325 12.6667 9.33325C12.2985 9.33325 12 9.63173 12 9.99992Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.66671 9.99992C2.66671 10.3681 2.96518 10.6666 3.33337 10.6666C3.70156 10.6666 4.00004 10.3681 4.00004 9.99992C4.00004 9.63173 3.70156 9.33325 3.33337 9.33325C2.96518 9.33325 2.66671 9.63173 2.66671 9.99992Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Order Badge */}
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #E9EAEB",
                      background: "#FAFAFA",
                    }}
                  >
                    <div
                      style={{
                        color: "#414651",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      {column.order}
                    </div>
                  </div>

                  {/* Column Name */}
                  <div
                    style={{
                      color: "#414651",
                      textAlign: "center",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "18px",
                    }}
                  >
                    {column.name}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeColumn(column.id)}
                    style={{
                      display: "flex",
                      padding: "2px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      borderRadius: "3px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                        stroke="#A4A7AE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              padding: "4px 0",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "#E9EAEB",
              }}
            />
          </div>

          {/* All Columns Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            {/* Title and Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                All Columns
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <button
                  onClick={expandAll}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      color: "#273572",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Expand All
                  </div>
                </button>
                <button
                  onClick={collapseAll}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      color: "#273572",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Collapse All
                  </div>
                </button>
              </div>
            </div>

            {/* Search Field */}
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
                  height: "32px",
                  padding: "6px 8px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                    d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Find Columns"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    display: "flex",
                    height: "20px",
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: "1 0 0",
                    overflow: "hidden",
                    color: "#717680",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                  }}
                />
              </div>
            </div>

            {/* Column Sections */}
            {columnSections.map((section) => (
              <div
                key={section.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "8px 0",
                    alignItems: "center",
                    gap: "12px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "#FFF",
                    cursor: "pointer",
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
                    <div
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      {section.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "2px 8px",
                        alignItems: "center",
                        borderRadius: "9999px",
                        border: "1px solid #E9EAEB",
                        background: "#FAFAFA",
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          textAlign: "center",
                          fontFamily: "Public Sans",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "18px",
                        }}
                      >
                        {section.selectedCount} of {section.totalCount}
                      </div>
                    </div>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: section.isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#A4A7AE"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Expanded section content */}
                {section.isExpanded && section.columns.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignContent: "flex-start",
                      gap: "12px 8px",
                      alignSelf: "stretch",
                      flexWrap: "wrap",
                      paddingTop: "8px",
                    }}
                  >
                    {section.columns.map((column) => (
                      <div
                        key={column.id}
                        style={{
                          display: "flex",
                          width: "172px",
                          alignItems: "flex-start",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            paddingTop: "2px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "16px",
                              height: "16px",
                              padding: "1px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "4px",
                              background: column.isSelected ? "#344698" : "transparent",
                              border: column.isSelected ? "none" : "1px solid #D5D7DA",
                              cursor: "pointer",
                            }}
                          >
                            {column.isSelected && (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
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
                            alignItems: "flex-start",
                            flex: "1 0 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "18px",
                                flex: column.hasHelpIcon ? "1 0 0" : "auto",
                                display: column.hasHelpIcon ? "-webkit-box" : "block",
                                WebkitBoxOrient: column.hasHelpIcon ? "vertical" : "initial",
                                WebkitLineClamp: column.hasHelpIcon ? 1 : "initial",
                                overflow: column.hasHelpIcon ? "hidden" : "visible",
                                textOverflow: column.hasHelpIcon ? "ellipsis" : "initial",
                              }}
                            >
                              {column.name}
                            </div>
                            {column.hasHelpIcon && (
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_help)">
                                    <path
                                      d="M6.06004 6.00016C6.21678 5.55461 6.52614 5.1789 6.93334 4.93958C7.34055 4.70027 7.8193 4.61279 8.28483 4.69264C8.75035 4.77249 9.17259 5.01451 9.47676 5.37585C9.78093 5.73718 9.94741 6.19451 9.94671 6.66683C9.94671 8.00016 7.94671 8.66683 7.94671 8.66683M8.00004 11.3335H8.00671M14.6667 8.00016C14.6667 11.6821 11.6819 14.6668 8.00004 14.6668C4.31814 14.6668 1.33337 11.6821 1.33337 8.00016C1.33337 4.31826 4.31814 1.3335 8.00004 1.3335C11.6819 1.3335 14.6667 4.31826 14.6667 8.00016Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_help">
                                      <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
