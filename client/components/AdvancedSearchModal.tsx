import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type AdvancedSearchAnchor = {
  top: number;
  left: number;
  width: number;
};

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchor: AdvancedSearchAnchor | null;
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [searchOrdersForm, setSearchOrdersForm] = useState({
    firstName: "",
    lastName: "",
    ssn: "",
    orderNumber: "",
    billingId1: "",
    billingId2: "",
    billingId3: "",
  });
  const [allAccountsForm, setAllAccountsForm] = useState({
    orderNumber: "",
    ssn: "",
    name: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleClear = () => {
    setSearchOrdersForm({
      firstName: "",
      lastName: "",
      ssn: "",
      orderNumber: "",
      billingId1: "",
      billingId2: "",
      billingId3: "",
    });
    setAllAccountsForm({
      orderNumber: "",
      ssn: "",
      name: "",
    });
  };

  const handleSearchOrders = () => {
    const parts = [];
    if (searchOrdersForm.firstName) parts.push(searchOrdersForm.firstName);
    if (searchOrdersForm.lastName) parts.push(searchOrdersForm.lastName);
    if (searchOrdersForm.ssn) parts.push(searchOrdersForm.ssn);
    if (searchOrdersForm.orderNumber) parts.push(searchOrdersForm.orderNumber);
    if (searchOrdersForm.billingId1) parts.push(searchOrdersForm.billingId1);
    if (searchOrdersForm.billingId2) parts.push(searchOrdersForm.billingId2);
    if (searchOrdersForm.billingId3) parts.push(searchOrdersForm.billingId3);

    const query = parts.join(" ");
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleAccountSearch = (field: "orderNumber" | "ssn" | "name") => {
    const value = allAccountsForm[field];
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: 50,
        padding: "74px 20px 20px",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "602px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          borderRadius: "12px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          boxShadow:
            "0 24px 48px -12px rgba(10, 13, 18, 0.18), 0 4px 4px -2px rgba(10, 13, 18, 0.04)",
          padding: "16px 0",
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "flex",
            padding: "0 16px",
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
            Advanced Search
          </div>
          <button
            onClick={handleClear}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              color: "#273572",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Clear
          </button>
        </div>

        {/* Search Orders Section */}
        <div
          style={{
            display: "flex",
            padding: "0 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            Search Orders
          </div>

          {/* First Row: First Name, Last Name */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              flexWrap: "wrap",
            }}
          >
            {/* First Name */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                minWidth: "180px",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                First Name
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "firstName"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={searchOrdersForm.firstName}
                  onChange={(e) =>
                    setSearchOrdersForm({
                      ...searchOrdersForm,
                      firstName: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
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
                flex: "1 0 0",
                minWidth: "180px",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Last Name
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "lastName"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={searchOrdersForm.lastName}
                  onChange={(e) =>
                    setSearchOrdersForm({
                      ...searchOrdersForm,
                      lastName: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Second Row: SSN, Order # */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              flexWrap: "wrap",
            }}
          >
            {/* SSN */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                minWidth: "180px",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                SSN
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "ssn"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={searchOrdersForm.ssn}
                  onChange={(e) =>
                    setSearchOrdersForm({
                      ...searchOrdersForm,
                      ssn: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("ssn")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>

            {/* Order # */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                minWidth: "180px",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Order #
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "orderNumber"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={searchOrdersForm.orderNumber}
                  onChange={(e) =>
                    setSearchOrdersForm({
                      ...searchOrdersForm,
                      orderNumber: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("orderNumber")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Third Row: Billing Identifiers */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              flexWrap: "wrap",
            }}
          >
            {/* Billing Identifier 1 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                minWidth: "140px",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Billing Identifier 1
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "billingId1"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={searchOrdersForm.billingId1}
                  onChange={(e) =>
                    setSearchOrdersForm({
                      ...searchOrdersForm,
                      billingId1: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("billingId1")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>

            {/* Billing Identifier 2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                minWidth: "140px",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Billing Identifier 2
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "billingId2"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={searchOrdersForm.billingId2}
                  onChange={(e) =>
                    setSearchOrdersForm({
                      ...searchOrdersForm,
                      billingId2: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("billingId2")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>

            {/* Billing Identifier 3 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                minWidth: "140px",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Billing Identifier 3
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "billingId3"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={searchOrdersForm.billingId3}
                  onChange={(e) =>
                    setSearchOrdersForm({
                      ...searchOrdersForm,
                      billingId3: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("billingId3")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Search Orders Button */}
          <button
            onClick={handleSearchOrders}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#273572";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#344698";
            }}
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
              transition: "background 0.2s ease",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "0 2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Search Orders
              </div>
            </div>
          </button>
        </div>

        {/* Divider */}
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
          />
        </div>

        {/* All Accounts Section */}
        <div
          style={{
            display: "flex",
            padding: "0 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            All Accounts
          </div>

          {/* Order # with Search Button */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Order #
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "allAccountsOrderNumber"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={allAccountsForm.orderNumber}
                  onChange={(e) =>
                    setAllAccountsForm({
                      ...allAccountsForm,
                      orderNumber: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("allAccountsOrderNumber")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => handleAccountSearch("orderNumber")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#273572";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#344698";
              }}
              style={{
                display: "flex",
                height: "40px",
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
                transition: "background 0.2s ease",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Search
                </div>
              </div>
            </button>
          </div>

          {/* SSN with Search Button */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                SSN
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "allAccountsSSN"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={allAccountsForm.ssn}
                  onChange={(e) =>
                    setAllAccountsForm({
                      ...allAccountsForm,
                      ssn: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("allAccountsSSN")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => handleAccountSearch("ssn")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#273572";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#344698";
              }}
              style={{
                display: "flex",
                height: "40px",
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
                transition: "background 0.2s ease",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Search
                </div>
              </div>
            </button>
          </div>

          {/* Name with Search Button */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              <label
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Name
              </label>
              <div
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border:
                    focusedField === "allAccountsName"
                      ? "2px solid #34479A"
                      : "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                }}
              >
                <input
                  type="text"
                  value={allAccountsForm.name}
                  onChange={(e) =>
                    setAllAccountsForm({
                      ...allAccountsForm,
                      name: e.target.value,
                    })
                  }
                  onFocus={() => setFocusedField("allAccountsName")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => handleAccountSearch("name")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#273572";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#344698";
              }}
              style={{
                display: "flex",
                height: "40px",
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
                transition: "background 0.2s ease",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Search
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
