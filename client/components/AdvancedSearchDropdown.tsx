import React from "react";

interface AdvancedSearchDropdownProps {
  showAdvancedSearch: boolean;
  advancedSearchForm: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  focusedAdvancedField: string | null;
  onFieldChange: (field: string, value: string) => void;
  onFieldFocus: (field: string | null) => void;
  onClear: () => void;
  onSearch: () => void;
  style?: React.CSSProperties;
  dropdownRef?: React.RefObject<HTMLDivElement>;
}

export const AdvancedSearchDropdown: React.FC<AdvancedSearchDropdownProps> = ({
  showAdvancedSearch,
  advancedSearchForm,
  focusedAdvancedField,
  onFieldChange,
  onFieldFocus,
  onClear,
  onSearch,
  style = {},
  dropdownRef,
}) => {
  if (!showAdvancedSearch) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: "0",
        width: "100%",
        borderRadius: "8px",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        background: "#FFF",
        boxShadow:
          "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
        zIndex: 9999,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "12px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
          alignSelf: "stretch",
        }}
      >
        {/* Title */}
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
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "20px",
            }}
          >
            Advanced Search
          </div>
          <button
            onClick={onClear}
            style={{
              background: "none",
              border: "none",
              color: "#273572",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "20px",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>

        {/* Form */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          {/* First Name */}
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
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              First Name
            </div>
            <div
              style={{
                display: "flex",
                height: "32px",
                padding: "6px 8px",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border:
                  focusedAdvancedField === "firstName"
                    ? "2px solid #34479A"
                    : "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <input
                type="text"
                value={advancedSearchForm.firstName}
                onChange={(e) => onFieldChange("firstName", e.target.value)}
                onFocus={() => onFieldFocus("firstName")}
                onBlur={() => onFieldFocus(null)}
                placeholder="John"
                style={{
                  flex: "1 0 0",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: advancedSearchForm.firstName ? "#181D27" : "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
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
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              Last Name
            </div>
            <div
              style={{
                display: "flex",
                height: "32px",
                padding: "6px 8px",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border:
                  focusedAdvancedField === "lastName"
                    ? "2px solid #34479A"
                    : "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <input
                type="text"
                value={advancedSearchForm.lastName}
                onChange={(e) => onFieldChange("lastName", e.target.value)}
                onFocus={() => onFieldFocus("lastName")}
                onBlur={() => onFieldFocus(null)}
                placeholder="Doe"
                style={{
                  flex: "1 0 0",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: advancedSearchForm.lastName ? "#181D27" : "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              />
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
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              Email
            </div>
            <div
              style={{
                display: "flex",
                height: "32px",
                padding: "6px 8px",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border:
                  focusedAdvancedField === "email"
                    ? "2px solid #34479A"
                    : "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <input
                type="email"
                value={advancedSearchForm.email}
                onChange={(e) => onFieldChange("email", e.target.value)}
                onFocus={() => onFieldFocus("email")}
                onBlur={() => onFieldFocus(null)}
                placeholder="user@mail.com"
                style={{
                  flex: "1 0 0",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: advancedSearchForm.email ? "#181D27" : "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              />
            </div>
          </div>

          {/* Phone Number */}
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
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            >
              Phone Number
            </div>
            <div
              style={{
                display: "flex",
                height: "32px",
                padding: "6px 8px",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border:
                  focusedAdvancedField === "phoneNumber"
                    ? "2px solid #34479A"
                    : "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <input
                type="tel"
                value={advancedSearchForm.phoneNumber}
                onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
                onFocus={() => onFieldFocus("phoneNumber")}
                onBlur={() => onFieldFocus(null)}
                placeholder="000000000"
                style={{
                  flex: "1 0 0",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: advancedSearchForm.phoneNumber ? "#181D27" : "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#273572";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#344698";
          }}
          style={{
            display: "flex",
            minHeight: "36px",
            padding: "6px 8px",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: "2px solid rgba(255, 255, 255, 0.12)",
            background: "#344698",
            boxShadow:
              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
            color: "#FFF",
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};
