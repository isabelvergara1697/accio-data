import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { MobileHeader } from "../components/MobileHeader";
import { Search, ChevronRight, Home, CheckCircle2 } from "lucide-react";

export default function Quickscreen() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );

  // Form state
  const [selectedNames, setSelectedNames] = useState({
    primary: "",
    alias: [] as string[],
    doNotUse: [] as string[],
  });
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedSearches, setSelectedSearches] = useState({
    county: [] as string[],
    federal: [] as string[],
    statewide: [] as string[],
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContinue = () => {
    // Handle form submission
    console.log("Continue to next step", {
      selectedNames,
      selectedAddress,
      selectedSearches,
    });
  };

  const handleBreadcrumbClick = (path: string) => {
    if (path === "order-details") {
      navigate(`/order-details/${orderId}`);
    } else if (path === "invites-orders") {
      navigate("/invites-orders");
    } else if (path === "dashboard") {
      navigate("/dashboard");
    }
  };

  const nameOptions = [
    { name: "John Bad", dob: "" },
    { name: "Johnny Bad", dob: "02/23/1958" },
    { name: "Joohny B Bard Sr", dob: "02/23/1958" },
  ];

  const addressOptions = [
    { group: "Johnny B Bad Sr   DOB 02/23/1958", addresses: [
      "444 No Place Dr. Anytown, WA    99214",
      "100 Main St. Catskill, NY    12414",
      "111 No Place Dr. Anytown, TX    78749",
      "333 All Place Dr. Anytown, AZ    85285",
      "1234 West 5th. Auburn, NY    1302",
      "222 All Place Dr. Anytown, TX    78029",
      "222 All Place Dr. Anytown, TX    78029",
    ]},
    { group: "Johnny Bad   DOB 02/23/1958", addresses: [
      "222 All Place Dr. Anytown, TX    78728",
      "111 No Place Dr. Anytown, TX    78749",
    ]},
    { group: "John Bad   DOB", addresses: [
      "1234 West 5th. Auburn, NY    1302",
      "222 All Place Dr. Anytown, TX    78029",
    ]},
  ];

  const criminalSearches = [
    { location: "Spokane, WA - 2020", name: "John Bad" },
    { location: "Greene, NY - 2020", name: "Johnny Bad" },
    { location: "Travis, TX - 2019", name: "Joohny B Bard Sr" },
  ];

  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh", background: "#FAFAFA" }}>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPage="quickscreen"
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {(isMobile || isTablet) && (
        <MobileHeader
          isDesktop={isDesktop}
          isMobile={isMobile}
          showMobileUserMenu={showMobileUserMenu}
          setShowMobileUserMenu={setShowMobileUserMenu}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      <main
        style={{
          flex: 1,
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          marginTop: isMobile || isTablet ? "72px" : "0",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header Navigation */}
        {isDesktop && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "stretch",
              background: "linear-gradient(180deg, #FAFAFA 43.75%, rgba(255, 255, 255, 0.00) 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "72px",
                padding: "0 32px",
                alignItems: "center",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: "1 0 0" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    flex: "1 0 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "10px 14px",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      borderRadius: "8px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    }}
                  >
                    <Search style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
                    <div
                      style={{
                        flex: "1 0 0",
                        color: "#717680",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Search
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "1px 4px",
                        alignItems: "flex-start",
                        borderRadius: "4px",
                        border: "1px solid #E9EAEB",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "18px",
                        }}
                      >
                        ⌘K
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            paddingBottom: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: isMobile ? "0 16px" : "0 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              {/* Breadcrumbs */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => handleBreadcrumbClick("dashboard")}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <Home style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
                </button>
                <ChevronRight style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
                <button
                  onClick={() => handleBreadcrumbClick("invites-orders")}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Checked Individuals
                </button>
                <ChevronRight style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
                <button
                  onClick={() => handleBreadcrumbClick("order-details")}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Order #{orderId || "38138"}
                </button>
                <ChevronRight style={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Quickscreen for Sue Janes
                </div>
              </div>

              {/* Page Header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
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
                      minWidth: isMobile ? "0" : "320px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: "1 0 0",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "24px",
                        fontWeight: 600,
                        lineHeight: "32px",
                      }}
                    >
                      Quickscreen for Sue Janes
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Complete this form to generate a Quickscreen for Sue Janes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: isMobile ? "0 16px" : "0 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              {/* Step 1: SSN Validation */}
              <div
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
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    borderRadius: "12px 12px 0 0",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                  }}
                >
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", flex: "1 0 0" }}>
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
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "18px",
                              fontWeight: 600,
                              lineHeight: "28px",
                            }}
                          >
                            Step 1 SSN Validation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "12px 16px 40px 16px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "0 0 12px 12px",
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
                      maxWidth: "600px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          width: "26.667px",
                          height: "26.667px",
                          padding: "6.333px 6.999px 7px 6.335px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "9999px",
                          background: "#DCFAE6",
                        }}
                      >
                        <CheckCircle2 style={{ width: "14px", height: "14px", color: "#079455" }} />
                      </div>
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        SSN is valid. Issued in MA between 1937 and 1940
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Select Names */}
              <div
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
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    borderRadius: "12px 12px 0 0",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                  }}
                >
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", flex: "1 0 0" }}>
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
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "18px",
                              fontWeight: 600,
                              lineHeight: "28px",
                            }}
                          >
                            Step 2: Select Names and AKA's
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
                            Select a name from the list below. If none are correct, just choose the one that's closest.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "12px 16px 40px 16px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "0 0 12px 12px",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", alignSelf: "stretch", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #E9EAEB" }}>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Name
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              width: "141px",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Primary
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              width: "141px",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Alias
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              width: "141px",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Do not Use
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {nameOptions.map((option, index) => (
                          <tr key={index} style={{ borderBottom: "1px solid #E9EAEB" }}>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {option.name}
                            </td>
                            <td style={{ padding: "12px" }}>
                              <input
                                type="checkbox"
                                checked={selectedNames.primary === option.name}
                                onChange={() => setSelectedNames({ ...selectedNames, primary: option.name })}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                              />
                            </td>
                            <td style={{ padding: "12px" }}>
                              <input
                                type="checkbox"
                                checked={selectedNames.alias.includes(option.name)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedNames({
                                      ...selectedNames,
                                      alias: [...selectedNames.alias, option.name],
                                    });
                                  } else {
                                    setSelectedNames({
                                      ...selectedNames,
                                      alias: selectedNames.alias.filter((n) => n !== option.name),
                                    });
                                  }
                                }}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                              />
                            </td>
                            <td style={{ padding: "12px" }}>
                              <input
                                type="checkbox"
                                checked={selectedNames.doNotUse.includes(option.name)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedNames({
                                      ...selectedNames,
                                      doNotUse: [...selectedNames.doNotUse, option.name],
                                    });
                                  } else {
                                    setSelectedNames({
                                      ...selectedNames,
                                      doNotUse: selectedNames.doNotUse.filter((n) => n !== option.name),
                                    });
                                  }
                                }}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Step 3: Select Address */}
              <div
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
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    borderRadius: "12px 12px 0 0",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                  }}
                >
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", flex: "1 0 0" }}>
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
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "18px",
                              fontWeight: 600,
                              lineHeight: "28px",
                            }}
                          >
                            Step 3: Select the subject's address
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
                            Select the subject's primary (current) address from the list below. If none are correct, don't select anything, you can type it in later.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "12px 16px 40px 16px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    borderRadius: "0 0 12px 12px",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {addressOptions.map((group, groupIndex) => (
                    <div
                      key={groupIndex}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                        }}
                      >
                        {group.group}
                      </div>
                      {group.addresses.map((address, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={address}
                            checked={selectedAddress === address}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            style={{ marginTop: "2px", width: "16px", height: "16px", cursor: "pointer" }}
                          />
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
                                color: "#414651",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {address}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4: Select Criminal Records */}
              <div
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
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    borderRadius: "12px 12px 0 0",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                  }}
                >
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", flex: "1 0 0" }}>
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
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "18px",
                              fontWeight: 600,
                              lineHeight: "28px",
                            }}
                          >
                            Step 4: Select criminal records searches
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
                            Select the searches you wish to run from the list below. subject information will not auto-populate, if you do not see the proper name then click submit and manually enter the name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "12px 16px 40px 16px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    borderRadius: "0 0 12px 12px",
                    borderRight: "1px solid #E9EAEB",
                    borderBottom: "1px solid #E9EAEB",
                    borderLeft: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", alignSelf: "stretch", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #E9EAEB" }}>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            County/State
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              width: "141px",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            County Criminal
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              width: "141px",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Federal Criminal
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Statewide Criminal Repository
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              textAlign: "left",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            Name At This Location
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {criminalSearches.map((search, index) => (
                          <tr key={index} style={{ borderBottom: "1px solid #E9EAEB" }}>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {search.location}
                            </td>
                            <td style={{ padding: "12px" }}>
                              <input
                                type="checkbox"
                                checked={selectedSearches.county.includes(search.location)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedSearches({
                                      ...selectedSearches,
                                      county: [...selectedSearches.county, search.location],
                                    });
                                  } else {
                                    setSelectedSearches({
                                      ...selectedSearches,
                                      county: selectedSearches.county.filter((l) => l !== search.location),
                                    });
                                  }
                                }}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                              />
                            </td>
                            <td style={{ padding: "12px" }}>
                              <input
                                type="checkbox"
                                checked={selectedSearches.federal.includes(search.location)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedSearches({
                                      ...selectedSearches,
                                      federal: [...selectedSearches.federal, search.location],
                                    });
                                  } else {
                                    setSelectedSearches({
                                      ...selectedSearches,
                                      federal: selectedSearches.federal.filter((l) => l !== search.location),
                                    });
                                  }
                                }}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                              />
                            </td>
                            <td style={{ padding: "12px" }}>
                              <input
                                type="checkbox"
                                checked={selectedSearches.statewide.includes(search.location)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedSearches({
                                      ...selectedSearches,
                                      statewide: [...selectedSearches.statewide, search.location],
                                    });
                                  } else {
                                    setSelectedSearches({
                                      ...selectedSearches,
                                      statewide: selectedSearches.statewide.filter((l) => l !== search.location),
                                    });
                                  }
                                }}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                              />
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {search.name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  alignSelf: "stretch",
                }}
              >
                <button
                  onClick={handleContinue}
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
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Continue to Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
