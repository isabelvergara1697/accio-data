import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";

const I9Order: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

  // Form state
  const [selectedIndividualType, setSelectedIndividualType] =
    useState<string>("");
  const [selectedNewIndividualOption, setSelectedNewIndividualOption] =
    useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    Array<{ id: string; firstName: string; lastName: string; email: string }>
  >([]);

  // Form options state
  const [selectedFormOption, setSelectedFormOption] = useState<string>("");

  // Billing identifier states
  const [billingIdentifiers, setBillingIdentifiers] = useState<{
    [key: string]: string;
  }>({});

  // Employee Information for "together" option
  const [employeeInfo, setEmployeeInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    hireDate: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hireDate: "",
  });

  // Invitation options for "together" option
  const [selectedInvitationOption, setSelectedInvitationOption] = useState<string>("");

  // Form options for "together" option
  const [selectedTogetherFormOption, setSelectedTogetherFormOption] = useState<string>("");

  // Billing identifiers for "together" option
  const [togetherBillingIdentifiers, setTogetherBillingIdentifiers] = useState<{
    [key: string]: string;
  }>({});

  // Remote employee states
  const [remoteEmployeeInfo, setRemoteEmployeeInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    hireDate: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hireDate: "",
  });

  const [remoteRepresentativeInfo, setRemoteRepresentativeInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    zipCode: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [selectedRemoteRepresentativeOption, setSelectedRemoteRepresentativeOption] = useState<string>("");
  const [selectedRemoteInvitationOption, setSelectedRemoteInvitationOption] = useState<string>("");
  const [selectedRemoteFormOption, setSelectedRemoteFormOption] = useState<string>("");

  // Sample background check data
  const backgroundCheckData = [
    {
      id: "bg1",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
    },
    {
      id: "bg2",
      firstName: "Sarah",
      lastName: "Smith",
      email: "sarah.smith@email.com",
    },
    {
      id: "bg3",
      firstName: "Michael",
      lastName: "Smith",
      email: "michael.smith@email.com",
    },
    {
      id: "bg4",
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.johnson@email.com",
    },
    {
      id: "bg5",
      firstName: "David",
      lastName: "Williams",
      email: "david.williams@email.com",
    },
    {
      id: "bg6",
      firstName: "Lisa",
      lastName: "Brown",
      email: "lisa.brown@email.com",
    },
    {
      id: "bg7",
      firstName: "Robert",
      lastName: "Davis",
      email: "robert.davis@email.com",
    },
    {
      id: "bg8",
      firstName: "Jennifer",
      lastName: "Miller",
      email: "jennifer.miller@email.com",
    },
    {
      id: "bg9",
      firstName: "William",
      lastName: "Wilson",
      email: "william.wilson@email.com",
    },
    {
      id: "bg10",
      firstName: "Amanda",
      lastName: "Moore",
      email: "amanda.moore@email.com",
    },
  ];

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000); // 30 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    console.log("Sign out");
  };

  // Validation functions
  const isValidSendEmailOption = () => {
    return selectedFormOption !== "";
  };

  const isValidTogetherOption = () => {
    const requiredEmployeeFields = [
      employeeInfo.firstName,
      employeeInfo.lastName,
      employeeInfo.email,
      employeeInfo.phoneNumber,
      employeeInfo.hireDate,
    ];

    const allEmployeeFieldsFilled = requiredEmployeeFields.every(field => field.trim() !== "");
    const invitationSelected = selectedInvitationOption !== "";
    const formOptionSelected = selectedTogetherFormOption !== "";

    return allEmployeeFieldsFilled && invitationSelected && formOptionSelected;
  };

  const isValidRemoteOption = () => {
    const requiredEmployeeFields = [
      remoteEmployeeInfo.firstName,
      remoteEmployeeInfo.lastName,
      remoteEmployeeInfo.email,
      remoteEmployeeInfo.phoneNumber,
      remoteEmployeeInfo.hireDate,
    ];

    const requiredRepresentativeFields = [
      remoteRepresentativeInfo.firstName,
      remoteRepresentativeInfo.lastName,
      remoteRepresentativeInfo.email,
      remoteRepresentativeInfo.phoneNumber,
      remoteRepresentativeInfo.address,
      remoteRepresentativeInfo.city,
      remoteRepresentativeInfo.zipCode,
    ];

    const allEmployeeFieldsFilled = requiredEmployeeFields.every(field => field.trim() !== "");
    const allRepresentativeFieldsFilled = requiredRepresentativeFields.every(field => field.trim() !== "");
    const representativeOptionSelected = selectedRemoteRepresentativeOption !== "";
    const invitationSelected = selectedRemoteInvitationOption !== "";
    const formOptionSelected = selectedRemoteFormOption !== "";

    return allEmployeeFieldsFilled && allRepresentativeFieldsFilled && representativeOptionSelected && invitationSelected && formOptionSelected;
  };

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (
      selectedIndividualType === "background-checked" &&
      value.trim().length > 0
    ) {
      // Filter results by last name (case-insensitive)
      const filtered = backgroundCheckData.filter(
        (person) =>
          person.lastName.toLowerCase().includes(value.toLowerCase()) ||
          person.firstName.toLowerCase().includes(value.toLowerCase()),
      );
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setShowSearchDropdown(false);
      setSearchResults([]);
    }
  };

  // Handle selecting a person from dropdown
  const handleSelectPerson = (person: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    setSearchQuery(`${person.firstName} ${person.lastName}`);
    setShowSearchDropdown(false);
    console.log("Selected person:", person);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-search-container]")) {
        setShowSearchDropdown(false);
      }
    };

    if (showSearchDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSearchDropdown]);

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Sidebar */}
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="i9-order"
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
        showNotification={showNotification}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && !isDesktop && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          width: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          maxWidth: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          overflow: "hidden",
          transition:
            "margin-left 0.3s ease, width 0.3s ease, max-width 0.3s ease",
        }}
      >
        {/* Header */}
        {isDesktop ? (
          <Header
            isDesktop={isDesktop}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            showMobileUserMenu={showMobileUserMenu}
            showNotification={showNotification}
            sidebarCollapsed={sidebarCollapsed}
          />
        ) : (
          <MobileHeader
            isDesktop={isDesktop}
            isMobile={isMobile}
            setMobileMenuOpen={setMobileMenuOpen}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            showMobileUserMenu={showMobileUserMenu}
          />
        )}

        {/* Main - Exact Figma structure */}
        <div
          style={{
            display: "flex",
            paddingBottom: "24px",
            paddingTop:
              showNotification && isDesktop
                ? "136px"
                : isDesktop
                  ? "104px"
                  : "88px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            alignSelf: "stretch",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            {/* Container */}
            <div
              style={{
                display: "flex",
                padding: isDesktop ? "0 32px" : "0 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              {/* Page header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                {/* Content */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "20px 16px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isDesktop ? "320px" : "auto",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: "1 0 0",
                    }}
                  >
                    {/* Title */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "var(--colors-text-text-primary-900, #181D27)",
                        fontFamily:
                          "var(--Font-family-font-family-display, 'Public Sans')",
                        fontSize: isDesktop ? "var(--Font-size-display-xs, 24px)" : "var(--Font-size-text-xl, 20px)",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: isDesktop ? "var(--Line-height-display-xs, 32px)" : "var(--Line-height-text-xl, 30px)",
                      }}
                    >
                      I-9 Order
                    </div>
                    {/* Supporting text */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily:
                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "rgba(83,88,98,1)",
                        }}
                      >
                        Start a new I-9 form by linking it to an existing
                        background check or entering a new individual's
                        information.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            {/* Container */}
            <div
              style={{
                display: "flex",
                padding: isDesktop ? "0 32px" : "0 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              {/* Table */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                {/* Section Headers */}
                <div
                  style={{
                    display: "flex",
                    height: "64px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    borderRadius: "12px 12px 0 0",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                  }}
                >
                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "16px 16px 12px 16px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Top */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Title */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "4px",
                          flex: "1 0 0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "2px",
                            flex: "1 0 0",
                          }}
                        >
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
                                color: "var(--colors-text-text-primary-900, #181D27)",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-lg, 18px)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-lg, 28px)",
                              }}
                            >
                              Create New I-9 Document
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Container */}
                <div
                  style={{
                    display: "flex",
                    minHeight:
                      selectedIndividualType === "background-checked"
                        ? "350px"
                        : selectedIndividualType === "new-individual" && selectedNewIndividualOption === "send-email"
                        ? "650px"
                        : selectedIndividualType === "new-individual" && selectedNewIndividualOption === "together"
                        ? isMobile ? "1400px" : "750px"
                        : selectedIndividualType === "new-individual" && selectedNewIndividualOption === "remote"
                        ? isMobile ? "1800px" : "1200px"
                        : selectedIndividualType === "new-individual"
                        ? "300px"
                        : "218px",
                    padding: isDesktop ? "12px 16px 40px 16px" : "12px 16px 20px 16px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "0px 0px 12px 12px",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "10px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Question Text */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          fontFamily:
                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 400,
                            fontSize: "14px",
                            color: "rgba(65,70,81,1)",
                          }}
                        >
                          Select the type of individual you'd like to create an
                          I-9 for:
                        </span>
                      </div>

                      {/* Radio Group */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "24px",
                          alignSelf: "stretch",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Background Checked Individual */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setSelectedIndividualType("background-checked")
                          }
                        >
                          {/* Radio Input */}
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
                                width: "16px",
                                height: "16px",
                                borderRadius: "9999px",
                                border:
                                  selectedIndividualType ===
                                  "background-checked"
                                    ? "none"
                                    : "1px solid #D5D7DA",
                                background:
                                  selectedIndividualType ===
                                  "background-checked"
                                    ? "#344698"
                                    : "#FFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                              }}
                            >
                              {selectedIndividualType ===
                                "background-checked" && (
                                <div
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "9999px",
                                    background: "#FFF",
                                    position: "absolute",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "320px",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color: "#414651",
                                  fontFamily:
                                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    color: "rgba(65,70,81,1)",
                                  }}
                                >
                                  Background Checked Individual
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* New Individual */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setSelectedIndividualType("new-individual")
                          }
                        >
                          {/* Radio Input */}
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
                                width: "16px",
                                height: "16px",
                                borderRadius: "9999px",
                                border:
                                  selectedIndividualType === "new-individual"
                                    ? "none"
                                    : "1px solid #D5D7DA",
                                background:
                                  selectedIndividualType === "new-individual"
                                    ? "#344698"
                                    : "#FFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                              }}
                            >
                              {selectedIndividualType === "new-individual" && (
                                <div
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "9999px",
                                    background: "#FFF",
                                    position: "absolute",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "320px",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color: "#414651",
                                  fontFamily:
                                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    color: "rgba(65,70,81,1)",
                                  }}
                                >
                                  New Individual
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content divider */}
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

                    {/* Conditional content for Background Checked Individual */}
                    {selectedIndividualType === "background-checked" && (
                      <>
                        {/* To continue text */}
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily:
                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                              fontWeight: 400,
                              fontSize: "14px",
                              color: "rgba(65,70,81,1)",
                            }}
                          >
                            To continue, you can either:
                          </span>
                        </div>

                        {/* Options Container */}
                        <div
                          style={{
                            display: "flex",
                            height: "140px",
                            alignItems: "flex-start",
                            gap: "10px",
                            alignSelf: "stretch",
                          }}
                        >
                          {/* Option 1 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "10px",
                              alignSelf: "stretch",
                              flex: "1",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                maxWidth: "524px",
                                flex: "1 0 0",
                                color: "#414651",
                                fontFamily:
                                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 400,
                                  fontSize: "14px",
                                  color: "rgba(65,70,81,1)",
                                }}
                              >
                                Option 1: Go to the Reports Page
                                <br />
                                Search and select the person you'd like to add
                                an I-9 for
                                <br />
                                Open their background report
                                <br />
                                Use the "Add I-9 to this order" link from the
                                Actions menu on the right
                              </span>
                            </div>
                            <button
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
                              onClick={() =>
                                navigate("/invites-orders", {
                                  state: {
                                    activeTab: "orders",
                                    showActionsPanel: true,
                                    selectedItems: ["ord1"], // This will trigger the actions panel to show
                                  },
                                })
                              }
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#F5F5F5";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#FFF";
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
                                    color: "#414651",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 700,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    Report Page
                                  </span>
                                </div>
                              </div>
                            </button>
                          </div>

                          {/* Option 2 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "10px",
                              alignSelf: "stretch",
                              flex: "1",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                maxWidth: "524px",
                                flex: "1 0 0",
                                color: "#414651",
                                fontFamily:
                                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 400,
                                  fontSize: "14px",
                                  color: "rgba(65,70,81,1)",
                                }}
                              >
                                Option 2: Search by name
                                <br />
                                Fill in the first few characters of the person's
                                last name
                                <br />
                                Select the correct person from the list of
                                persons
                              </span>
                            </div>
                            {/* Search Input Container */}
                            <div
                              data-search-container
                              style={{
                                display: "flex",
                                width: "100%",
                                maxWidth: "320px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                position: "relative",
                              }}
                            >
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
                                    height: "40px",
                                    padding: "8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                      }}
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
                                      placeholder="Search"
                                      value={searchQuery}
                                      onChange={(e) =>
                                        handleSearchChange(e.target.value)
                                      }
                                      style={{
                                        display: "flex",
                                        height: "20px",
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        color: searchQuery
                                          ? "#414651"
                                          : "#717680",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Search Results Dropdown */}
                              {showSearchDropdown &&
                                searchResults.length > 0 && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "46px",
                                      left: "0",
                                      width: "100%",
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                      backgroundColor: "#FFF",
                                      border: "1px solid #E9EAEB",
                                      borderRadius: "8px",
                                      boxShadow:
                                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                      zIndex: 1000,
                                    }}
                                  >
                                    {/* Search Header */}
                                    <div
                                      style={{
                                        padding: "8px 12px",
                                        borderBottom: "1px solid #E9EAEB",
                                        backgroundColor: "#F9FAFB",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#374151",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "12px",
                                          fontWeight: 600,
                                          lineHeight: "16px",
                                        }}
                                      >
                                        Background Checked Individuals (
                                        {searchResults.length})
                                      </div>
                                    </div>

                                    {/* Search Results */}
                                    <div style={{ padding: "4px 0" }}>
                                      {searchResults.map((person) => (
                                        <div
                                          key={person.id}
                                          onClick={() =>
                                            handleSelectPerson(person)
                                          }
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            padding: "8px 12px",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#F9FAFB";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "transparent";
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#111827",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            {person.firstName} {person.lastName}
                                          </div>
                                          <div
                                            style={{
                                              color: "#6B7280",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "12px",
                                              fontWeight: 400,
                                              lineHeight: "16px",
                                            }}
                                          >
                                            {person.email}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Conditional content for New Individual */}
                    {selectedIndividualType === "new-individual" && (
                      <>
                        {/* Select one of the options text */}
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily:
                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                              fontWeight: 400,
                              fontSize: "14px",
                              color: "rgba(65,70,81,1)",
                            }}
                          >
                            Select one of the options
                          </span>
                        </div>

                        {/* New Individual Options Radio Group */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "24px",
                            alignSelf: "stretch",
                          }}
                        >
                          {/* First option with highlighted background */}
                          <div
                            style={{
                              display: "flex",
                              padding: selectedNewIndividualOption === "send-email" ? "12px 8px" : "0",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: selectedNewIndividualOption === "send-email" ? "12px" : "0",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              background: selectedNewIndividualOption === "send-email" ? "#FAFAFA" : "transparent",
                            }}
                          >
                            {/* Option 1: Send employee email */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                alignSelf: "stretch",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setSelectedNewIndividualOption("send-email")
                              }
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
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "9999px",
                                  border:
                                    selectedNewIndividualOption === "send-email"
                                      ? "none"
                                      : "1px solid #D5D7DA",
                                  background:
                                    selectedNewIndividualOption === "send-email"
                                      ? "#344698"
                                      : "#FFF",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  position: "relative",
                                }}
                              >
                                {selectedNewIndividualOption ===
                                  "send-email" && (
                                  <div
                                    style={{
                                      width: "6px",
                                      height: "6px",
                                      borderRadius: "9999px",
                                      background: "#FFF",
                                      position: "absolute",
                                    }}
                                  />
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
                                      flex: "1 0 0",
                                      color: "#414651",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Send employee email to fill/verify and sign
                                      Section I
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Inline form content for send-email option */}
                            {selectedNewIndividualOption === "send-email" && (
                              <>
                                {/* Content divider */}
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

                                {/* Form Options */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "1008px",
                                      color: "#414651",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Form Options:
                                    </span>
                                  </div>

                                  {/* Form Options Radio Group - Single Line */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "24px",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {/* Create and save this I-9 */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedFormOption("create-save")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedFormOption === "create-save" ? "none" : "1px solid #D5D7DA",
                                            background: selectedFormOption === "create-save" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedFormOption === "create-save" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Create and save this I-9
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Create, save and verify with E-Verify */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedFormOption("create-save-verify")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedFormOption === "create-save-verify" ? "none" : "1px solid #D5D7DA",
                                            background: selectedFormOption === "create-save-verify" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedFormOption === "create-save-verify" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            width: "320px",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Create, save and verify with E-Verify this I-9
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Create I-9 Form Button */}
                                <button
                                  disabled={!isValidSendEmailOption()}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    border: "2px solid rgba(255, 255, 255, 0.12)",
                                    background: isValidSendEmailOption() ? "#344698" : "#A4A7AE",
                                    boxShadow: isValidSendEmailOption()
                                      ? "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)"
                                      : "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: isValidSendEmailOption() ? "pointer" : "not-allowed",
                                    alignSelf: "flex-start",
                                    opacity: isValidSendEmailOption() ? 1 : 0.6,
                                  }}
                                  onClick={() => {
                                    if (isValidSendEmailOption()) {
                                      console.log("Create I-9 Form clicked - Send Email Option");
                                    }
                                  }}
                                  onMouseEnter={(e) => {
                                    if (isValidSendEmailOption()) {
                                      e.currentTarget.style.background = "#2A3A7A";
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (isValidSendEmailOption()) {
                                      e.currentTarget.style.background = "#344698";
                                    }
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
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 700,
                                          fontSize: "14px",
                                          color: "rgba(255,255,255,1)",
                                        }}
                                      >
                                        Create I-9 Form
                                      </span>
                                    </div>
                                  </div>
                                </button>

                                {/* Validation message for send-email option */}
                                {!isValidSendEmailOption() && (
                                  <div
                                    style={{
                                      color: "#DC2626",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "16px",
                                      marginTop: "4px",
                                    }}
                                  >
                                    Please select a form option before continuing.
                                  </div>
                                )}

                                {/* Billing Identifier Fields - First Row */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "24px",
                                    alignSelf: "stretch",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <div
                                      key={num}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
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
                                            alignItems: "center",
                                            gap: "2px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Billing Identifier {num}
                                            </span>
                                          </div>
                                        </div>
                                        <input
                                          type="text"
                                          value={billingIdentifiers[`billing${num}`] || ""}
                                          onChange={(e) => setBillingIdentifiers(prev => ({
                                            ...prev,
                                            [`billing${num}`]: e.target.value
                                          }))}
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
                                            color: "#181D27",
                                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                          onFocus={(e) => {
                                            e.target.style.border = "1px solid #344698";
                                            e.target.style.boxShadow = "0 0 0 3px rgba(52, 70, 152, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                          }}
                                          onBlur={(e) => {
                                            e.target.style.border = "1px solid #D5D7DA";
                                            e.target.style.boxShadow = "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Billing Identifier Fields - Second Row */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "24px",
                                    alignSelf: "stretch",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {[6, 7, 8, 9, 10].map((num) => (
                                    <div
                                      key={num}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
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
                                            alignItems: "center",
                                            gap: "2px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Billing Identifier {num}
                                            </span>
                                          </div>
                                        </div>
                                        <input
                                          type="text"
                                          value={billingIdentifiers[`billing${num}`] || ""}
                                          onChange={(e) => setBillingIdentifiers(prev => ({
                                            ...prev,
                                            [`billing${num}`]: e.target.value
                                          }))}
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
                                            color: "#181D27",
                                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                          onFocus={(e) => {
                                            e.target.style.border = "1px solid #344698";
                                            e.target.style.boxShadow = "0 0 0 3px rgba(52, 70, 152, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                          }}
                                          onBlur={(e) => {
                                            e.target.style.border = "1px solid #D5D7DA";
                                            e.target.style.boxShadow = "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Option 2: Employer and Employee together */}
                          <div
                            style={{
                              display: "flex",
                              padding: selectedNewIndividualOption === "together" ? "12px 8px" : "0",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: selectedNewIndividualOption === "together" ? "20px" : "0",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              background: selectedNewIndividualOption === "together" ? "#FAFAFA" : "transparent",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                alignSelf: "stretch",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setSelectedNewIndividualOption("together")
                              }
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
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "9999px",
                                    border:
                                      selectedNewIndividualOption === "together"
                                        ? "none"
                                        : "1px solid #D5D7DA",
                                    background:
                                      selectedNewIndividualOption === "together"
                                        ? "#344698"
                                        : "#FFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                  }}
                                >
                                  {selectedNewIndividualOption === "together" && (
                                    <div
                                      style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "9999px",
                                        background: "#FFF",
                                        position: "absolute",
                                      }}
                                    />
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
                                      flex: "1 0 0",
                                      color: "#414651",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Employer and Employee will fill all sections
                                      of I-9 Form together
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Inline form content for together option */}
                            {selectedNewIndividualOption === "together" && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "20px",
                                alignSelf: "stretch",
                              }}
                            >
                              {/* Content divider */}
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

                              {/* Employee Information */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "12px",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    color: "#414651",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    Employee Information
                                  </span>
                                </div>

                                {/* Employee Information Row */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "24px",
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
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        First Name
                                      </span>
                                    </div>
                                    <input
                                      type="text"
                                      value={employeeInfo.firstName}
                                      onChange={(e) => setEmployeeInfo(prev => ({
                                        ...prev,
                                        firstName: e.target.value
                                      }))}
                                      placeholder="John"
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
                                        color: "#181D27",
                                        fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                      }}
                                      onFocus={(e) => {
                                        e.target.style.border = "1px solid #344698";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(52, 70, 152, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                      onBlur={(e) => {
                                        e.target.style.border = "1px solid #D5D7DA";
                                        e.target.style.boxShadow = "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                    />
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
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Last Name
                                      </span>
                                    </div>
                                    <input
                                      type="text"
                                      value={employeeInfo.lastName}
                                      onChange={(e) => setEmployeeInfo(prev => ({
                                        ...prev,
                                        lastName: e.target.value
                                      }))}
                                      placeholder="Doe"
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
                                        color: "#181D27",
                                        fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                      }}
                                      onFocus={(e) => {
                                        e.target.style.border = "1px solid #344698";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(52, 70, 152, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                      onBlur={(e) => {
                                        e.target.style.border = "1px solid #D5D7DA";
                                        e.target.style.boxShadow = "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                    />
                                  </div>

                                  {/* Email */}
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
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Email
                                      </span>
                                    </div>
                                    <input
                                      type="email"
                                      value={employeeInfo.email}
                                      onChange={(e) => setEmployeeInfo(prev => ({
                                        ...prev,
                                        email: e.target.value
                                      }))}
                                      placeholder="user@mail.com"
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
                                        color: "#181D27",
                                        fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                      }}
                                      onFocus={(e) => {
                                        e.target.style.border = "1px solid #344698";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(52, 70, 152, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                      onBlur={(e) => {
                                        e.target.style.border = "1px solid #D5D7DA";
                                        e.target.style.boxShadow = "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                    />
                                  </div>

                                  {/* Phone Number */}
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
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Phone Number
                                      </span>
                                    </div>
                                    <input
                                      type="tel"
                                      value={employeeInfo.phoneNumber}
                                      onChange={(e) => setEmployeeInfo(prev => ({
                                        ...prev,
                                        phoneNumber: e.target.value
                                      }))}
                                      placeholder="+1 000 000 000"
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
                                        color: "#181D27",
                                        fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                      }}
                                      onFocus={(e) => {
                                        e.target.style.border = "1px solid #344698";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(52, 70, 152, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                      onBlur={(e) => {
                                        e.target.style.border = "1px solid #D5D7DA";
                                        e.target.style.boxShadow = "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                    />
                                  </div>

                                  {/* Hire Date */}
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
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Hire Date
                                      </span>
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
                                        border: "1px solid #D5D7DA",
                                        background: "#FFF",
                                        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        position: "relative",
                                      }}
                                    >
                                      <svg
                                        style={{
                                          width: "16px",
                                          height: "16px",
                                        }}
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14.7998 6.66665H2.7998M11.4665 1.33331V3.99998M6.13314 1.33331V3.99998M5.9998 14.6666H11.5998C12.7199 14.6666 13.28 14.6666 13.7078 14.4487C14.0841 14.2569 14.3901 13.951 14.5818 13.5746C14.7998 13.1468 14.7998 12.5868 14.7998 11.4666V5.86665C14.7998 4.74654 14.7998 4.18649 14.5818 3.75867C14.3901 3.38234 14.0841 3.07638 13.7078 2.88463C13.28 2.66665 12.7199 2.66665 11.5998 2.66665H5.9998C4.8797 2.66665 4.31965 2.66665 3.89182 2.88463C3.5155 3.07638 3.20954 3.38234 3.01779 3.75867C2.7998 4.18649 2.7998 4.74654 2.7998 5.86665V11.4666C2.7998 12.5868 2.7998 13.1468 3.01779 13.5746C3.20954 13.951 3.5155 14.2569 3.89182 14.4487C4.31965 14.6666 4.8797 14.6666 5.9998 14.6666Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <input
                                        type="text"
                                        value={employeeInfo.hireDate}
                                        onChange={(e) => setEmployeeInfo(prev => ({
                                          ...prev,
                                          hireDate: e.target.value
                                        }))}
                                        placeholder="00/00/00"
                                        style={{
                                          flex: "1 0 0",
                                          border: "none",
                                          outline: "none",
                                          background: "transparent",
                                          color: "#181D27",
                                          fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 400,
                                          lineHeight: "20px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Invitation Options */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    color: "#414651",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    Invitation Options:
                                  </span>
                                </div>

                                {/* Invitation Options Container */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "24px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {/* Send Invite by Email */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "8px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedInvitationOption("email")}
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
                                          width: "16px",
                                          height: "16px",
                                          borderRadius: "9999px",
                                          border: selectedInvitationOption === "email" ? "none" : "1px solid #D5D7DA",
                                          background: selectedInvitationOption === "email" ? "#344698" : "#FFF",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          position: "relative",
                                        }}
                                      >
                                        {selectedInvitationOption === "email" && (
                                          <div
                                            style={{
                                              width: "6px",
                                              height: "6px",
                                              borderRadius: "9999px",
                                              background: "#FFF",
                                              position: "absolute",
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Send Invite by Email
                                      </span>
                                    </div>
                                  </div>

                                  {/* Send Invite by SMS Text First */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "8px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedInvitationOption("sms")}
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
                                          width: "16px",
                                          height: "16px",
                                          borderRadius: "9999px",
                                          border: selectedInvitationOption === "sms" ? "none" : "1px solid #D5D7DA",
                                          background: selectedInvitationOption === "sms" ? "#344698" : "#FFF",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          position: "relative",
                                        }}
                                      >
                                        {selectedInvitationOption === "sms" && (
                                          <div
                                            style={{
                                              width: "6px",
                                              height: "6px",
                                              borderRadius: "9999px",
                                              background: "#FFF",
                                              position: "absolute",
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Send Invite by SMS Text First
                                      </span>
                                    </div>
                                  </div>

                                  {/* Send Invite by SMS and Email */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "8px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedInvitationOption("both")}
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
                                          width: "16px",
                                          height: "16px",
                                          borderRadius: "9999px",
                                          border: selectedInvitationOption === "both" ? "none" : "1px solid #D5D7DA",
                                          background: selectedInvitationOption === "both" ? "#344698" : "#FFF",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          position: "relative",
                                        }}
                                      >
                                        {selectedInvitationOption === "both" && (
                                          <div
                                            style={{
                                              width: "6px",
                                              height: "6px",
                                              borderRadius: "9999px",
                                              background: "#FFF",
                                              position: "absolute",
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Send Invite by SMS and Email
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Form Options */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    color: "#414651",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    Form Options:
                                  </span>
                                </div>

                                {/* Form Options Container - Single Line */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "24px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {/* Create and save this I-9 */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "8px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedTogetherFormOption("create-save")}
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
                                          width: "16px",
                                          height: "16px",
                                          borderRadius: "9999px",
                                          border: selectedTogetherFormOption === "create-save" ? "none" : "1px solid #D5D7DA",
                                          background: selectedTogetherFormOption === "create-save" ? "#344698" : "#FFF",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          position: "relative",
                                        }}
                                      >
                                        {selectedTogetherFormOption === "create-save" && (
                                          <div
                                            style={{
                                              width: "6px",
                                              height: "6px",
                                              borderRadius: "9999px",
                                              background: "#FFF",
                                              position: "absolute",
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Create and save this I-9
                                      </span>
                                    </div>
                                  </div>

                                  {/* Create, save and verify with E-Verify */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "8px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedTogetherFormOption("create-save-verify")}
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
                                          width: "16px",
                                          height: "16px",
                                          borderRadius: "9999px",
                                          border: selectedTogetherFormOption === "create-save-verify" ? "none" : "1px solid #D5D7DA",
                                          background: selectedTogetherFormOption === "create-save-verify" ? "#344698" : "#FFF",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          position: "relative",
                                        }}
                                      >
                                        {selectedTogetherFormOption === "create-save-verify" && (
                                          <div
                                            style={{
                                              width: "6px",
                                              height: "6px",
                                              borderRadius: "9999px",
                                              background: "#FFF",
                                              position: "absolute",
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Create, save and verify with E-Verify this I-9
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Create I-9 Form Button */}
                              <button
                                disabled={!isValidTogetherOption()}
                                style={{
                                  display: "flex",
                                  minHeight: "36px",
                                  padding: "6px 8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "8px",
                                  border: "2px solid rgba(255, 255, 255, 0.12)",
                                  background: isValidTogetherOption() ? "#344698" : "#A4A7AE",
                                  boxShadow: isValidTogetherOption()
                                    ? "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)"
                                    : "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: isValidTogetherOption() ? "pointer" : "not-allowed",
                                  alignSelf: "flex-start",
                                  opacity: isValidTogetherOption() ? 1 : 0.6,
                                }}
                                onClick={() => {
                                  if (isValidTogetherOption()) {
                                    console.log("Create I-9 Form clicked - Together Option");
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  if (isValidTogetherOption()) {
                                    e.currentTarget.style.background = "#2A3A7A";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (isValidTogetherOption()) {
                                    e.currentTarget.style.background = "#344698";
                                  }
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
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: "rgba(255,255,255,1)",
                                      }}
                                    >
                                      Create I-9 Form
                                    </span>
                                  </div>
                                </div>
                              </button>

                              {/* Validation message for together option */}
                              {!isValidTogetherOption() && (
                                <div
                                  style={{
                                    color: "#DC2626",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "16px",
                                    marginTop: "4px",
                                  }}
                                >
                                  Please fill all required fields and select invitation and form options before continuing.
                                </div>
                              )}

                              {/* Content divider */}
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

                              {/* Billing Identifier Fields */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: isMobile ? "column" : "row",
                                  alignItems: "flex-start",
                                  gap: isMobile ? "16px" : "24px",
                                  alignSelf: "stretch",
                                  flexWrap: isMobile ? "nowrap" : "wrap",
                                }}
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <div
                                    key={num}
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      flex: "1 0 0",
                                      minWidth: "150px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Billing Identifier {num}
                                      </span>
                                    </div>
                                    <input
                                      type="text"
                                      value={togetherBillingIdentifiers[`billing${num}`] || ""}
                                      onChange={(e) => setTogetherBillingIdentifiers(prev => ({
                                        ...prev,
                                        [`billing${num}`]: e.target.value
                                      }))}
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
                                        color: "#181D27",
                                        fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                      }}
                                      onFocus={(e) => {
                                        e.target.style.border = "1px solid #344698";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(52, 70, 152, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                      onBlur={(e) => {
                                        e.target.style.border = "1px solid #D5D7DA";
                                        e.target.style.boxShadow = "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>

                              {/* Billing Identifier Fields - Second Row */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "24px",
                                  alignSelf: "stretch",
                                  flexWrap: "wrap",
                                }}
                              >
                                {[6, 7, 8, 9, 10].map((num) => (
                                  <div
                                    key={num}
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      flex: "1 0 0",
                                      minWidth: "150px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Billing Identifier {num}
                                      </span>
                                    </div>
                                    <input
                                      type="text"
                                      value={togetherBillingIdentifiers[`billing${num}`] || ""}
                                      onChange={(e) => setTogetherBillingIdentifiers(prev => ({
                                        ...prev,
                                        [`billing${num}`]: e.target.value
                                      }))}
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
                                        color: "#181D27",
                                        fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                      }}
                                      onFocus={(e) => {
                                        e.target.style.border = "1px solid #344698";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(52, 70, 152, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                      onBlur={(e) => {
                                        e.target.style.border = "1px solid #D5D7DA";
                                        e.target.style.boxShadow = "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            )}
                          </div>

                          {/* Option 3: Remote Employee - with highlighted background and inline form */}
                          <div
                            style={{
                              display: "flex",
                              padding: selectedNewIndividualOption === "remote" ? "12px 8px" : "0",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: selectedNewIndividualOption === "remote" ? "20px" : "0",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              background: selectedNewIndividualOption === "remote" ? "#FAFAFA" : "transparent",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                alignSelf: "stretch",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setSelectedNewIndividualOption("remote")
                              }
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
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "9999px",
                                    border:
                                      selectedNewIndividualOption === "remote"
                                        ? "none"
                                        : "1px solid #D5D7DA",
                                    background:
                                      selectedNewIndividualOption === "remote"
                                        ? "#344698"
                                        : "#FFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                  }}
                                >
                                  {selectedNewIndividualOption === "remote" && (
                                    <div
                                      style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "9999px",
                                        background: "#FFF",
                                        position: "absolute",
                                      }}
                                    />
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
                                      flex: "1 0 0",
                                      color: "#414651",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Remote Employee — Send employee email to fill/verify and sign section 1, then send section 2 to an authorized representative.
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Inline form content for remote option */}
                            {selectedNewIndividualOption === "remote" && (
                              <>
                                {/* Content divider */}
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

                                {/* Employee Information Section */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "1008px",
                                      color: "#414651",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Employee Information
                                    </span>
                                  </div>

                                  {/* Employee Info Row */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "24px",
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
                                        minWidth: "200px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder="John"
                                          value={remoteEmployeeInfo.firstName}
                                          onChange={(e) => setRemoteEmployeeInfo(prev => ({
                                            ...prev,
                                            firstName: e.target.value
                                          }))}
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: remoteEmployeeInfo.firstName ? "#181D27" : "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                        flex: "1 0 0",
                                        minWidth: "200px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder="Doe"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                        flex: "1 0 0",
                                        minWidth: "200px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="email"
                                          placeholder="user@mail.com"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                        flex: "1 0 0",
                                        minWidth: "200px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="tel"
                                          placeholder="+1 000 000 000"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                          }}
                                        />
                                      </div>
                                    </div>

                                    {/* Hire Date */}
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                        flex: "1 0 0",
                                        minWidth: "200px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Hire Date
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <svg
                                          style={{ width: "16px", height: "16px" }}
                                          width="17"
                                          height="16"
                                          viewBox="0 0 17 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M14.7998 6.66665H2.7998M11.4665 1.33331V3.99998M6.13314 1.33331V3.99998M5.9998 14.6666H11.5998C12.7199 14.6666 13.28 14.6666 13.7078 14.4487C14.0841 14.2569 14.3901 13.951 14.5818 13.5746C14.7998 13.1468 14.7998 12.5868 14.7998 11.4666V5.86665C14.7998 4.74654 14.7998 4.18649 14.5818 3.75867C14.3901 3.38234 14.0841 3.07638 13.7078 2.88463C13.28 2.66665 12.7199 2.66665 11.5998 2.66665H5.9998C4.8797 2.66665 4.31965 2.66665 3.89182 2.88463C3.5155 3.07638 3.20954 3.38234 3.01779 3.75867C2.7998 4.18649 2.7998 4.74654 2.7998 5.86665V11.4666C2.7998 12.5868 2.7998 13.1468 3.01779 13.5746C3.20954 13.951 3.5155 14.2569 3.89182 14.4487C4.31965 14.6666 4.8797 14.6666 5.9998 14.6666Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <input
                                          type="text"
                                          placeholder="00/00/00"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Content divider */}
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

                                {/* Authorized Representative Information Section */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "12px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "1008px",
                                      color: "#414651",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Authorized Representative Information
                                    </span>
                                  </div>

                                  {/* Representative Options */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "24px",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {/* Employer will designate */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedRemoteRepresentativeOption("employer")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedRemoteRepresentativeOption === "employer" ? "none" : "1px solid #D5D7DA",
                                            background: selectedRemoteRepresentativeOption === "employer" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedRemoteRepresentativeOption === "employer" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Employer will designate an authorized representative
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Employee will designate */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedRemoteRepresentativeOption("employee")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedRemoteRepresentativeOption === "employee" ? "none" : "1px solid #D5D7DA",
                                            background: selectedRemoteRepresentativeOption === "employee" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedRemoteRepresentativeOption === "employee" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Employee will designate an authorized representative
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Representative Info Fields */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "24px",
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
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder="John"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder="Doe"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="email"
                                          placeholder="user@mail.com"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="tel"
                                          placeholder="+1 000 000 000"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                          }}
                                        />
                                      </div>
                                    </div>

                                    {/* Address */}
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Address
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder="123 Pearl Street"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Second Row for State, City, Zip Code */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "24px",
                                      alignSelf: "stretch",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {/* State */}
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "396px",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        State
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                                              flex: "1 0 0",
                                              color: "#717680",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 400,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            Select State
                                          </div>
                                        </div>
                                        <svg
                                          style={{ width: "16px", height: "16px" }}
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M4 6L8 10L12 6"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                    </div>

                                    {/* City */}
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        City
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder="City"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                          }}
                                        />
                                      </div>
                                    </div>

                                    {/* Zip Code */}
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Zip Code
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder="000000"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Content divider */}
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

                                {/* Invitation Options */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "1008px",
                                      color: "#414651",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Invitation Options:
                                    </span>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "24px",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {/* Send Invite by Email */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedRemoteInvitationOption("email")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedRemoteInvitationOption === "email" ? "none" : "1px solid #D5D7DA",
                                            background: selectedRemoteInvitationOption === "email" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedRemoteInvitationOption === "email" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Send Invite by Email
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Send Invite by SMS Text First */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedRemoteInvitationOption("sms")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedRemoteInvitationOption === "sms" ? "none" : "1px solid #D5D7DA",
                                            background: selectedRemoteInvitationOption === "sms" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedRemoteInvitationOption === "sms" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Send Invite by SMS Text First
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Send Invite by SMS and Email */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedRemoteInvitationOption("both")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedRemoteInvitationOption === "both" ? "none" : "1px solid #D5D7DA",
                                            background: selectedRemoteInvitationOption === "both" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedRemoteInvitationOption === "both" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Send Invite by SMS and Email
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Form Options */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "1008px",
                                      color: "#414651",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Form Options:
                                    </span>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "24px",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {/* Create and save this I-9 */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedRemoteFormOption("create-save")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedRemoteFormOption === "create-save" ? "none" : "1px solid #D5D7DA",
                                            background: selectedRemoteFormOption === "create-save" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedRemoteFormOption === "create-save" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Create and save this I-9
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Create, save and verify with E-Verify this I-9 */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setSelectedRemoteFormOption("create-save-verify")}
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
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "9999px",
                                            border: selectedRemoteFormOption === "create-save-verify" ? "none" : "1px solid #D5D7DA",
                                            background: selectedRemoteFormOption === "create-save-verify" ? "#344698" : "#FFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                          }}
                                        >
                                          {selectedRemoteFormOption === "create-save-verify" && (
                                            <div
                                              style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "9999px",
                                                background: "#FFF",
                                                position: "absolute",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            width: "320px",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#414651",
                                              fontFamily:
                                                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Create, save and verify with E-Verify this I-9
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Create I-9 Form Button */}
                                <button
                                  disabled={!isValidRemoteOption()}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    border: "2px solid rgba(255, 255, 255, 0.12)",
                                    background: isValidRemoteOption() ? "#344698" : "#A4A7AE",
                                    boxShadow: isValidRemoteOption()
                                      ? "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)"
                                      : "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: isValidRemoteOption() ? "pointer" : "not-allowed",
                                    alignSelf: "flex-start",
                                    opacity: isValidRemoteOption() ? 1 : 0.6,
                                  }}
                                  onClick={() => {
                                    if (isValidRemoteOption()) {
                                      console.log("Create I-9 Form clicked - Remote Employee Option");
                                    }
                                  }}
                                  onMouseEnter={(e) => {
                                    if (isValidRemoteOption()) {
                                      e.currentTarget.style.background = "#2A3A7A";
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (isValidRemoteOption()) {
                                      e.currentTarget.style.background = "#344698";
                                    }
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
                                        fontFamily:
                                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 700,
                                          fontSize: "14px",
                                          color: "rgba(255,255,255,1)",
                                        }}
                                      >
                                        Create I-9 Form
                                      </span>
                                    </div>
                                  </div>
                                </button>

                                {/* Validation message for remote option */}
                                {!isValidRemoteOption() && (
                                  <div
                                    style={{
                                      color: "#DC2626",
                                      fontFamily:
                                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "16px",
                                      marginTop: "4px",
                                    }}
                                  >
                                    Please fill all employee and representative information fields, and select representative designation, invitation, and form options before continuing.
                                  </div>
                                )}

                                {/* Content divider */}
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

                                {/* Billing Identifiers Row 1 */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "24px",
                                    alignSelf: "stretch",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {Array.from({ length: 5 }, (_, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Billing Identifier {index + 1}
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Billing Identifiers Row 2 */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "24px",
                                    alignSelf: "stretch",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {Array.from({ length: 5 }, (_, index) => (
                                    <div
                                      key={index + 5}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "6px",
                                        flex: "1 0 0",
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily:
                                            "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Billing Identifier {index + 6}
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
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          style={{
                                            flex: "1 0 0",
                                            border: "none",
                                            outline: "none",
                                            background: "transparent",
                                            color: "#717680",
                                            fontFamily:
                                              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default I9Order;
