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
  const [selectedIndividualType, setSelectedIndividualType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Array<{id: string, firstName: string, lastName: string, email: string}>>([]);

  // Sample background check data
  const backgroundCheckData = [
    { id: "bg1", firstName: "John", lastName: "Smith", email: "john.smith@email.com" },
    { id: "bg2", firstName: "Sarah", lastName: "Smith", email: "sarah.smith@email.com" },
    { id: "bg3", firstName: "Michael", lastName: "Smith", email: "michael.smith@email.com" },
    { id: "bg4", firstName: "Emily", lastName: "Johnson", email: "emily.johnson@email.com" },
    { id: "bg5", firstName: "David", lastName: "Williams", email: "david.williams@email.com" },
    { id: "bg6", firstName: "Lisa", lastName: "Brown", email: "lisa.brown@email.com" },
    { id: "bg7", firstName: "Robert", lastName: "Davis", email: "robert.davis@email.com" },
    { id: "bg8", firstName: "Jennifer", lastName: "Miller", email: "jennifer.miller@email.com" },
    { id: "bg9", firstName: "William", lastName: "Wilson", email: "william.wilson@email.com" },
    { id: "bg10", firstName: "Amanda", lastName: "Moore", email: "amanda.moore@email.com" },
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

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (selectedIndividualType === "background-checked" && value.trim().length > 0) {
      // Filter results by last name (case-insensitive)
      const filtered = backgroundCheckData.filter(person =>
        person.lastName.toLowerCase().includes(value.toLowerCase()) ||
        person.firstName.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setShowSearchDropdown(false);
      setSearchResults([]);
    }
  };

  // Handle selecting a person from dropdown
  const handleSelectPerson = (person: {id: string, firstName: string, lastName: string, email: string}) => {
    setSearchQuery(`${person.firstName} ${person.lastName}`);
    setShowSearchDropdown(false);
    console.log("Selected person:", person);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-search-container]')) {
        setShowSearchDropdown(false);
      }
    };

    if (showSearchDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
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
                        color: "#181D27",
                        fontFamily:
                          "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "32px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 700,
                          fontSize: "24px",
                          color: "rgba(24,29,39,1)",
                        }}
                      >
                        I-9 Order
                      </span>
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
                        Start a new I-9 form by linking it to an existing background check or entering a new individual's information.
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
                                color: "#181D27",
                                fontFamily:
                                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "28px",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 700,
                                  fontSize: "18px",
                                  color: "rgba(24,29,39,1)",
                                }}
                              >
                                Create New I-9 Document
                              </span>
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
                    minHeight: selectedIndividualType === "background-checked" ? "350px" : "218px",
                    padding: "12px 16px 40px 16px",
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
                          Select the type of individual you'd like to create an I-9 for:
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
                          onClick={() => setSelectedIndividualType("background-checked")}
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
                                border: selectedIndividualType === "background-checked" 
                                  ? "1px solid #34479A" 
                                  : "1px solid #D5D7DA",
                                background: "#FFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {selectedIndividualType === "background-checked" && (
                                <div
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "9999px",
                                    background: "#34479A",
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
                          onClick={() => setSelectedIndividualType("new-individual")}
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
                                border: selectedIndividualType === "new-individual" 
                                  ? "1px solid #34479A" 
                                  : "1px solid #D5D7DA",
                                background: "#FFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {selectedIndividualType === "new-individual" && (
                                <div
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "9999px",
                                    background: "#34479A",
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
                                Option 1: Go to the Reports Page<br />
                                Search and select the person you'd like to add an I-9 for<br />
                                Open their background report<br />
                                Use the "Add I-9 to this order" link from the Actions menu on the right
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
                                boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                              }}
                              onClick={() => navigate("/invites-orders", {
                                state: {
                                  activeTab: "orders",
                                  showActionsPanel: true,
                                  selectedItems: ["ord1"] // This will trigger the actions panel to show
                                }
                              })}
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
                                Option 2: Search by name<br />
                                Fill in the first few characters of the person's last name<br />
                                Select the correct person from the list of persons
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
                                      onChange={(e) => handleSearchChange(e.target.value)}
                                      style={{
                                        display: "flex",
                                        height: "20px",
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        color: searchQuery ? "#414651" : "#717680",
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
                              {showSearchDropdown && searchResults.length > 0 && (
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
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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
                                        fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        lineHeight: "16px",
                                      }}
                                    >
                                      Background Checked Individuals ({searchResults.length})
                                    </div>
                                  </div>

                                  {/* Search Results */}
                                  <div style={{ padding: "4px 0" }}>
                                    {searchResults.map((person) => (
                                      <div
                                        key={person.id}
                                        onClick={() => handleSelectPerson(person)}
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          padding: "8px 12px",
                                          cursor: "pointer",
                                          borderBottom: "1px solid #F3F4F6",
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.backgroundColor = "#F9FAFB";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#111827",
                                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
                                            fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
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
