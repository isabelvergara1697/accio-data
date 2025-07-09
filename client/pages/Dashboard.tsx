import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SuccessNotification from "../components/SuccessNotification";

// Add styles for button hover states
const dashboardStyles = `
  .secondary-button {
    border-radius: 8px;
    border: 1px solid #D5D7DA;
    background: #FFF;
    box-shadow: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
    transition: background 0.2s ease;
    cursor: pointer;
  }
  .secondary-button:hover {
    background: #F5F5F5;
  }
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Check for activation success parameter
  useEffect(() => {
    const activated = searchParams.get("activated");
    if (activated === "true") {
      setShowNotification(true);
      // Remove the parameter from URL
      searchParams.delete("activated");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleNotificationDismiss = () => {
    setShowNotification(false);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const isAccordionOpen = (section: string) => openAccordions.includes(section);

  const getHoverStyles = (item: string) => {
    if (hoveredItem === item && item !== "dashboard") {
      return {
        background: "var(--Colors-Background-bg-primary_hover, #F5F5F5)",
        borderRadius: "var(--radius-sm, 6px)",
      };
    }
    return {};
  };

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  const handleSignOut = () => {
    // Clear any session data here
    navigate("/login");
  };

  const menuSections = {
    tools: [
      "Online Ordering",
      "Quickscreen",
      "I-9 Order",
      "Batch Orders",
      "Court Orders",
    ],
    screening: [
      "Invites & Orders",
      "Auto-Screening",
      "Adverse Letters",
      "Bulk Report Export",
    ],
    reporting: ["CSV Reports", "Turn Around Time Reports", "Billing Reports"],
    support: ["Document Library", "Resources"],
  };

  const NavIcon = ({
    section,
    isOpen,
  }: {
    section: string;
    isOpen: boolean;
  }) => {
    const icons = {
      dashboard: (
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.97756 13.0829V14.8273M10.4663 9.59414V14.8273M13.9551 6.10536V14.8273M6.80312 18.3161H14.1296C15.595 18.3161 16.3277 18.3161 16.8874 18.0309C17.3798 17.7801 17.7801 17.3798 18.0309 16.8874C18.3161 16.3277 18.3161 15.595 18.3161 14.1296V6.80312C18.3161 5.33769 18.3161 4.60498 18.0309 4.04526C17.7801 3.55292 17.3798 3.15263 16.8874 2.90177C16.3277 2.61658 15.595 2.61658 14.1296 2.61658H6.80312C5.33769 2.61658 4.60498 2.61658 4.04526 2.90177C3.55292 3.15263 3.15263 3.55292 2.90177 4.04526C2.61658 4.60498 2.61658 5.33769 2.61658 6.80312V14.1296C2.61658 15.595 2.61658 16.3277 2.90177 16.8874C3.15263 17.3798 3.55292 17.7801 4.04526 18.0309C4.60498 18.3161 5.33769 18.3161 6.80312 18.3161Z"
            stroke="#344698"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tools: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8333 9.26607C15.7668 9.26607 16.2335 9.26607 16.59 9.08442C16.9036 8.92463 17.1586 8.66966 17.3183 8.35606C17.5 7.99954 17.5 7.53283 17.5 6.59941V6.09941C17.5 5.16599 17.5 4.69928 17.3183 4.34276C17.1586 4.02915 16.9036 3.77418 16.59 3.6144C16.2335 3.43274 15.7668 3.43274 14.8333 3.43274L5.16667 3.43274C4.23325 3.43274 3.76654 3.43274 3.41002 3.61439C3.09641 3.77418 2.84144 4.02915 2.68166 4.34275C2.5 4.69927 2.5 5.16598 2.5 6.09941L2.5 6.59941C2.5 7.53283 2.5 7.99954 2.68166 8.35606C2.84144 8.66966 3.09641 8.92463 3.41002 9.08442C3.76654 9.26607 4.23325 9.26607 5.16667 9.26607L14.8333 9.26607Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.8333 18.4327C15.7668 18.4327 16.2335 18.4327 16.59 18.2511C16.9036 18.0913 17.1586 17.8363 17.3183 17.5227C17.5 17.1662 17.5 16.6995 17.5 15.7661V15.2661C17.5 14.3327 17.5 13.8659 17.3183 13.5094C17.1586 13.1958 16.9036 12.9409 16.59 12.7811C16.2335 12.5994 15.7668 12.5994 14.8333 12.5994L5.16667 12.5994C4.23325 12.5994 3.76654 12.5994 3.41002 12.7811C3.09641 12.9408 2.84144 13.1958 2.68166 13.5094C2.5 13.8659 2.5 14.3327 2.5 15.2661L2.5 15.7661C2.5 16.6995 2.5 17.1662 2.68166 17.5227C2.84144 17.8363 3.09641 18.0913 3.41002 18.2511C3.76654 18.4327 4.23325 18.4327 5.16667 18.4327H14.8333Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      screening: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 8.43274L17.5 8.43274M7.5 3.43274L7.5 18.4327M6.5 3.43274H13.5C14.9001 3.43274 15.6002 3.43274 16.135 3.70522C16.6054 3.94491 16.9878 4.32736 17.2275 4.79776C17.5 5.33254 17.5 6.03261 17.5 7.43274V14.4327C17.5 15.8329 17.5 16.5329 17.2275 17.0677C16.9878 17.5381 16.6054 17.9206 16.135 18.1603C15.6002 18.4327 14.9001 18.4327 13.5 18.4327H6.5C5.09987 18.4327 4.3998 18.4327 3.86502 18.1603C3.39462 17.9206 3.01217 17.5381 2.77248 17.0677C2.5 16.5329 2.5 15.8329 2.5 14.4327V7.43274C2.5 6.03261 2.5 5.33254 2.77248 4.79776C3.01217 4.32736 3.39462 3.94491 3.86502 3.70522C4.3998 3.43274 5.09987 3.43274 6.5 3.43274Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      reporting: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8334 6.76607L9.90374 4.90684C9.63619 4.37174 9.50241 4.10418 9.30283 3.90871C9.12634 3.73585 8.91362 3.60438 8.68008 3.52383C8.41599 3.43274 8.11686 3.43274 7.5186 3.43274H4.33335C3.39993 3.43274 2.93322 3.43274 2.5767 3.6144C2.2631 3.77418 2.00813 4.02915 1.84834 4.34276C1.66669 4.69927 1.66669 5.16599 1.66669 6.09941V6.76607M1.66669 6.76607H14.3334C15.7335 6.76607 16.4336 6.76607 16.9683 7.03856C17.4387 7.27824 17.8212 7.66069 18.0609 8.1311C18.3334 8.66588 18.3334 9.36594 18.3334 10.7661V14.4327C18.3334 15.8329 18.3334 16.5329 18.0609 17.0677C17.8212 17.5381 17.4387 17.9206 16.9683 18.1603C16.4336 18.4327 15.7335 18.4327 14.3334 18.4327H5.66669C4.26656 18.4327 3.56649 18.4327 3.03171 18.1603C2.56131 17.9206 2.17885 17.5381 1.93917 17.0677C1.66669 16.5329 1.66669 15.8329 1.66669 14.4327V6.76607Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      support: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12.5994V9.68274M10 6.76607H10.0083M8.25 16.9327L9.46667 18.555C9.6476 18.7962 9.73807 18.9168 9.84897 18.96C9.94611 18.9977 10.0539 18.9977 10.151 18.96C10.2619 18.9168 10.3524 18.7962 10.5333 18.555L11.75 16.9327C11.9943 16.607 12.1164 16.4442 12.2654 16.3198C12.4641 16.154 12.6986 16.0368 12.9504 15.9773C13.1393 15.9327 13.3429 15.9327 13.75 15.9327C14.9149 15.9327 15.4973 15.9327 15.9567 15.7424C16.5693 15.4887 17.056 15.002 17.3097 14.3894C17.5 13.93 17.5 13.3476 17.5 12.1827V7.43274C17.5 6.03261 17.5 5.33254 17.2275 4.79776C16.9878 4.32736 16.6054 3.94491 16.135 3.70522C15.6002 3.43274 14.9001 3.43274 13.5 3.43274H6.5C5.09987 3.43274 4.3998 3.43274 3.86502 3.70522C3.39462 3.94491 3.01217 4.32736 2.77248 4.79776C2.5 5.33254 2.5 6.03261 2.5 7.43274V12.1827C2.5 13.3476 2.5 13.93 2.6903 14.3894C2.94404 15.002 3.43072 15.4887 4.04329 15.7424C4.50272 15.9327 5.08515 15.9327 6.25 15.9327C6.65715 15.9327 6.86072 15.9327 7.04959 15.9773C7.30141 16.0368 7.53593 16.154 7.73458 16.3198C7.88357 16.4442 8.00571 16.607 8.25 16.9327Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };

    return (
      <div style={{ width: "20px", height: "20px", position: "relative" }}>
        {icons[section as keyof typeof icons]}
      </div>
    );
  };

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      style={{
        width: "24px",
        height: "24px",
        position: "relative",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9.93274L12 15.9327L18 9.93274"
        stroke="#A4A7AE"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const NavItem = ({
    section,
    label,
    isActive = false,
    hasChevron = true,
    badge,
    onClick,
  }: {
    section: string;
    label: string;
    isActive?: boolean;
    hasChevron?: boolean;
    badge?: string;
    onClick?: () => void;
  }) => {
    const isOpen = isAccordionOpen(section);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "2px 0px",
            alignItems: "center",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 12px",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              borderRadius: "6px",
              background: isActive ? "#ECEEF9" : "#FFF",
              position: "relative",
              cursor: hasChevron ? "pointer" : "default",
              ...(!isActive ? getHoverStyles(section) : {}),
            }}
            onClick={onClick}
            onMouseEnter={() => !isActive && setHoveredItem(section)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: "1 0 0",
                position: "relative",
              }}
            >
              <NavIcon section={section} isOpen={isOpen} />
              <div
                style={{
                  color: isActive
                    ? "#273572"
                    : "var(--colors-text-text-secondary-700, #414651)",
                  fontFamily:
                    "var(--Font-family-font-family-body, 'Public Sans')",
                  fontSize: "var(--Font-size-text-sm, 14px)",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "var(--Line-height-text-sm, 20px)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: isActive ? "rgba(39,53,114,1)" : "rgba(65,70,81,1)",
                  }}
                >
                  {label}
                </span>
              </div>
            </div>

            {badge && (
              <div
                style={{
                  display: "flex",
                  padding: "2px 8px",
                  alignItems: "center",
                  borderRadius: "9999px",
                  border: "1px solid #E9EAEB",
                  background: "#FAFAFA",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    textAlign: "center",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "rgba(65,70,81,1)",
                    }}
                  >
                    {badge}
                  </span>
                </div>
              </div>
            )}

            {hasChevron && <ChevronIcon isOpen={isOpen} />}
          </div>
        </div>

        {/* Sub-menu */}
        {hasChevron && isOpen && (
          <div
            style={{
              display: "flex",
              paddingBottom: "4px",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
              position: "relative",
              marginTop: "4px",
            }}
          >
            {menuSections[section as keyof typeof menuSections]?.map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    padding: "2px 0px",
                    alignItems: "center",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "8px 12px 8px 40px",
                      alignItems: "center",
                      gap: "12px",
                      flex: "1 0 0",
                      borderRadius: "6px",
                      background: "#FFF",
                      position: "relative",
                      cursor: "pointer",
                      ...getHoverStyles(
                        `${section}-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                      ),
                    }}
                    onMouseEnter={() =>
                      setHoveredItem(
                        `${section}-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                      )
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flex: "1 0 0",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color:
                            "var(--colors-text-text-secondary-700, #414651)",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "rgba(65,70,81,1)",
                          }}
                        >
                          {item}
                        </span>
                      </div>
                      {item === "Invites & Orders" && (
                        <div
                          style={{
                            display: "flex",
                            padding: "2px 8px",
                            alignItems: "center",
                            borderRadius: "9999px",
                            border: "1px solid #E9EAEB",
                            background: "#FAFAFA",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "18px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontWeight: 400,
                                fontSize: "12px",
                                color: "rgba(65,70,81,1)",
                              }}
                            >
                              8
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            opacity: 0.7,
            background: "var(--Colors-Background-bg-overlay, #0A0D12)",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, #000 100%)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`transition-all duration-300 lg:translate-x-0 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          display: "flex",
          width: "296px",
          height: "100vh",
          padding: "8px 0px 24px 8px",
          alignItems: "flex-start",
          flexShrink: 0,
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flex: "1 0 0",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              paddingTop: "20px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              flex: "1 0 0",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Logo Header */}
            <div
              style={{
                display: "flex",
                padding: "0px 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "139px",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "139px",
                    height: "32px",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/876fe16651091c38ad5eb9e1c4c54f44055b43e1?width=274"
                    style={{
                      width: "137px",
                      height: "24px",
                      flexShrink: 0,
                      fill: "#34479A",
                      position: "absolute",
                      left: "1px",
                      top: "4px",
                    }}
                    alt="Acio Data Logo"
                  />
                </div>
              </div>
            </div>

            {/* Search Bar - Mobile/Tablet Only */}
            <div
              className="lg:hidden"
              style={{
                display: "flex",
                padding: "0px 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                position: "relative",
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
                  boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <svg
                    style={{
                      width: "20px",
                      height: "20px",
                      position: "relative",
                    }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                      flex: "1 0 0",
                      overflow: "hidden",
                      color: "#717680",
                      textOverflow: "ellipsis",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(113,118,128,1)",
                      }}
                    >
                      Search
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "1px 4px",
                    alignItems: "flex-start",
                    borderRadius: "4px",
                    border: "1px solid #E9EAEB",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "18px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "12px",
                        color: "rgba(113,118,128,1)",
                      }}
                    >
                      ⌘K
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification */}
            {showNotification && (
              <div
                style={{
                  display: "flex",
                  padding: "0px 20px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <SuccessNotification
                  message="Welcome to Accio Data! Your account is now ready to use."
                  onDismiss={handleNotificationDismiss}
                />
              </div>
            )}

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0px 16px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <NavItem
                  section="dashboard"
                  label="Dashboard"
                  isActive={true}
                  hasChevron={false}
                />

                <NavItem
                  section="tools"
                  label="Tools"
                  onClick={() => toggleAccordion("tools")}
                />

                <NavItem
                  section="screening"
                  label="Screening"
                  badge={!isAccordionOpen("screening") ? "8" : undefined}
                  onClick={() => toggleAccordion("screening")}
                />

                <NavItem
                  section="reporting"
                  label="Reporting"
                  onClick={() => toggleAccordion("reporting")}
                />

                <NavItem
                  section="support"
                  label="Support & Resources"
                  onClick={() => toggleAccordion("support")}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: "296px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "32px",
          paddingBottom: "24px",
          position: "relative",
        }}
        className="lg:ml-[296px] ml-0 lg:pt-0 pt-16"
      >
        {/* Mobile/Tablet Header Bar */}
        <div
          className="lg:hidden w-full fixed top-0 left-0 right-0 z-30"
          style={{
            display: "flex",
            height: "64px",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
            borderBottom: "1px solid #E9EAEB",
            background: "#FFF",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "12px 8px 12px 16px",
              justifyContent: "space-between",
              alignItems: "center",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                width: "139px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "139px",
                  height: "32px",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/876fe16651091c38ad5eb9e1c4c54f44055b43e1?width=274"
                  style={{
                    width: "137px",
                    height: "24px",
                    flexShrink: 0,
                    position: "absolute",
                    left: "1px",
                    top: "4px",
                  }}
                  alt="Accio Data Logo"
                />
              </div>
            </div>

            {/* Content */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Quick Create Button */}
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <button
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
                      "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "0px 2px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#FFF",
                      }}
                    >
                      Quick Create
                    </span>
                  </div>
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_508_136928)">
                      <path
                        d="M10.0001 6.6665V13.3332M6.66675 9.99984H13.3334M18.3334 9.99984C18.3334 14.6022 14.6025 18.3332 10.0001 18.3332C5.39771 18.3332 1.66675 14.6022 1.66675 9.99984C1.66675 5.39746 5.39771 1.6665 10.0001 1.6665C14.6025 1.6665 18.3334 5.39746 18.3334 9.99984Z"
                        stroke="#8D9BD8"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_508_136928">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>

              {/* Notification Bell */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "2px",
                }}
              >
                <button
                  style={{
                    display: "flex",
                    width: "40px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "6px",
                  }}
                >
                  <svg
                    style={{ width: "24px", height: "24px", flexShrink: 0 }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  width: "16px",
                  padding: "16px 8px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    width: "1px",
                    height: "24px",
                    background: "#E9EAEB",
                  }}
                ></div>
              </div>

              {/* User Profile Menu */}
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  alignItems: "center",
                  gap: "16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  ...getUserMenuStyles(),
                }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                onMouseEnter={() => setUserMenuHovered(true)}
                onMouseLeave={() => setUserMenuHovered(false)}
              >
                <div
                  style={{
                    display: "flex",
                    width: "200px",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      flexShrink: 0,
                      aspectRatio: "1/1",
                      borderRadius: "9999px",
                      border: "1px solid rgba(0, 0, 0, 0.10)",
                      background:
                        "url(https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800) lightgray 50% / cover no-repeat",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
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
                          color: "rgba(24,29,39,1)",
                        }}
                      >
                        Alexandra Fitzwilliam
                      </span>
                    </div>
                    <div
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        color: "#535862",
                        textOverflow: "ellipsis",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          color: "rgba(83,88,98,1)",
                        }}
                      >
                        [User Role]
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                <svg
                  style={{ width: "24px", height: "24px" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12H15M3 6H21M3 18H21"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Header Navigation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
            background:
              "linear-gradient(180deg, #FAFAFA 43.75%, rgba(255, 255, 255, 0.00) 100%)",
            position: "relative",
          }}
          className="hidden lg:flex"
        >
          <div
            style={{
              display: "flex",
              height: "72px",
              padding: "0px 32px",
              alignItems: "center",
              gap: "20px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Search Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  flex: "1 0 0",
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
                    position: "relative",
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
                      boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flex: "1 0 0",
                        position: "relative",
                      }}
                    >
                      <svg
                        style={{
                          width: "24px",
                          height: "24px",
                          position: "relative",
                        }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          flex: "1 0 0",
                          overflow: "hidden",
                          color: "#717680",
                          textOverflow: "ellipsis",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 400,
                            fontSize: "16px",
                            color: "rgba(113,118,128,1)",
                          }}
                        >
                          Search
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "1px 4px",
                        alignItems: "flex-start",
                        borderRadius: "4px",
                        border: "1px solid #E9EAEB",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "18px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 400,
                            fontSize: "12px",
                            color: "rgba(113,118,128,1)",
                          }}
                        >
                          ⌘K
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Create Button */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <div
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
                    "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "0px 2px",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#FFF",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "rgba(255,255,255,1)",
                      }}
                    >
                      Quick Create
                    </span>
                  </div>
                </div>
                <svg
                  style={{
                    width: "20px",
                    height: "20px",
                    position: "relative",
                  }}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_500_6793)">
                    <path
                      d="M9.99996 6.66663V13.3333M6.66663 9.99996H13.3333M18.3333 9.99996C18.3333 14.6023 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6023 1.66663 9.99996C1.66663 5.39759 5.39759 1.66663 9.99996 1.66663C14.6023 1.66663 18.3333 5.39759 18.3333 9.99996Z"
                      stroke="#8D9BD8"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_500_6793">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                width: "16px",
                padding: "16px 8px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "1px",
                  height: "40px",
                  background: "#E9EAEB",
                  position: "relative",
                }}
              ></div>
            </div>

            {/* User Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "2px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "40px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "6px",
                    position: "relative",
                  }}
                >
                  <svg
                    style={{
                      width: "24px",
                      height: "24px",
                      flexShrink: 0,
                      position: "relative",
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* User Profile Menu */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "8px",
                    alignItems: "center",
                    gap: "16px",
                    borderRadius: "12px",
                    position: "relative",
                    cursor: "pointer",
                    ...getUserMenuStyles(),
                  }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  onMouseEnter={() => setUserMenuHovered(true)}
                  onMouseLeave={() => setUserMenuHovered(false)}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "200px",
                      alignItems: "center",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                        aspectRatio: "1/1",
                        borderRadius: "9999px",
                        border: "1px solid rgba(0, 0, 0, 0.10)",
                        background:
                          "url(https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800) lightgray 50% / cover no-repeat",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "rgba(24,29,39,1)",
                          }}
                        >
                          Alexandra Fitzwilliam
                        </span>
                      </div>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                          color: "#535862",
                          textOverflow: "ellipsis",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 400,
                            fontSize: "14px",
                            color: "rgba(83,88,98,1)",
                          }}
                        >
                          [User Role]
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Menu Dropdown */}
                {userMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      right: 0,
                      width: "216px",
                      borderRadius: "12px",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      background: "#FAFAFA",
                      boxShadow:
                        "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        borderRadius: "12px 12px 16px 16px",
                        border: "1px solid #E9EAEB",
                        background: "#FFF",
                        position: "relative",
                      }}
                    >
                      {/* Main Menu Items */}
                      <div
                        style={{
                          display: "flex",
                          padding: "6px 0px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "2px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        {/* Account Item */}
                        <div
                          style={{
                            display: "flex",
                            padding: "0px 6px",
                            alignItems: "center",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              padding: "8px",
                              alignItems: "center",
                              gap: "12px",
                              flex: "1 0 0",
                              borderRadius: "6px",
                              cursor: "pointer",
                              position: "relative",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#F5F5F5";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                                position: "relative",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  position: "relative",
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.3333 14C13.3333 13.0696 13.3333 12.6044 13.2185 12.2259C12.96 11.3736 12.293 10.7067 11.4408 10.4482C11.0622 10.3333 10.597 10.3333 9.66665 10.3333H6.33333C5.40295 10.3333 4.93776 10.3333 4.55923 10.4482C3.70696 10.7067 3.04002 11.3736 2.78148 12.2259C2.66666 12.6044 2.66666 13.0696 2.66666 14M11 5C11 6.65685 9.65684 8 7.99999 8C6.34314 8 4.99999 6.65685 4.99999 5C4.99999 3.34315 6.34314 2 7.99999 2C9.65684 2 11 3.34315 11 5Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.67"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color: "#414651",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    color: "rgba(65,70,81,1)",
                                  }}
                                >
                                  Account
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Company Item */}
                        <div
                          style={{
                            display: "flex",
                            padding: "0px 6px",
                            alignItems: "center",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              padding: "8px",
                              alignItems: "center",
                              gap: "12px",
                              flex: "1 0 0",
                              borderRadius: "6px",
                              background: "#F5F5F5",
                              cursor: "pointer",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                                position: "relative",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  position: "relative",
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.66668 7.33333H11.8667C12.6134 7.33333 12.9868 7.33333 13.272 7.47866C13.5229 7.60649 13.7269 7.81046 13.8547 8.06135C14 8.34656 14 8.71993 14 9.46667V14M8.66668 14V4.13333C8.66668 3.3866 8.66668 3.01323 8.52135 2.72801C8.39352 2.47713 8.18955 2.27316 7.93866 2.14532C7.65345 2 7.28008 2 6.53334 2H4.13334C3.38661 2 3.01324 2 2.72802 2.14532C2.47714 2.27316 2.27317 2.47713 2.14533 2.72801C2.00001 3.01323 2.00001 3.3866 2.00001 4.13333V14M14.6667 14H1.33334M4.33334 4.66667H6.33334M4.33334 7.33333H6.33334M4.33334 10H6.33334"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.67"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color: "#252B37",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    color: "rgba(37,43,55,1)",
                                  }}
                                >
                                  Company
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Switch Account Section */}
                      <div
                        style={{
                          display: "flex",
                          padding: "6px 0px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "2px",
                          alignSelf: "stretch",
                          borderTop: "1px solid #E9EAEB",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 12px 4px 12px",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              flex: "1 0 0",
                              color: "#535862",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "18px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontWeight: 600,
                                fontSize: "12px",
                                color: "rgba(83,88,98,1)",
                              }}
                            >
                              Switch account
                            </span>
                          </div>
                        </div>

                        {/* Current User Account */}
                        <div
                          style={{
                            display: "flex",
                            padding: "0px 6px",
                            alignItems: "center",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              padding: "6px 8px",
                              alignItems: "center",
                              gap: "12px",
                              flex: "1 0 0",
                              borderRadius: "6px",
                              background: "#F5F5F5",
                              position: "relative",
                              minWidth: 0, // Ensures container can shrink
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                                position: "relative",
                                minWidth: 0, // Ensures flex item can shrink
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "40px",
                                  height: "40px",
                                  padding: "30px 0px 0px 30px",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                  aspectRatio: "1/1",
                                  borderRadius: "9999px",
                                  border: "1px solid rgba(0, 0, 0, 0.10)",
                                  background:
                                    "url(https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800) lightgray 50% / cover no-repeat",
                                  position: "relative",
                                  flexShrink: 0, // Prevent avatar from shrinking
                                }}
                              >
                                <div
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    flexShrink: 0,
                                    borderRadius: "9999px",
                                    border: "1.5px solid #FFF",
                                    background: "#17B26A",
                                    position: "absolute",
                                    left: "30px",
                                    top: "30px",
                                  }}
                                ></div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                  position: "relative",
                                  minWidth: 0, // Ensures text container can shrink
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "rgba(24,29,39,1)",
                                    }}
                                  >
                                    Alexandra Fitzwilliam
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    color: "#535862",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "rgba(83,88,98,1)",
                                    }}
                                  >
                                    [Role]
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                flexShrink: 0, // Prevent radio button from shrinking
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  padding: "5px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  background: "#344698",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    flexShrink: 0,
                                    borderRadius: "9999px",
                                    background: "#FFF",
                                    position: "absolute",
                                    left: "5px",
                                    top: "5px",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Second User Account */}
                        <div
                          style={{
                            display: "flex",
                            padding: "0px 6px",
                            alignItems: "center",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              padding: "6px 8px",
                              alignItems: "center",
                              gap: "12px",
                              flex: "1 0 0",
                              borderRadius: "6px",
                              cursor: "pointer",
                              position: "relative",
                              minWidth: 0, // Ensures container can shrink
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#F5F5F5";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                                position: "relative",
                                minWidth: 0, // Ensures flex item can shrink
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "40px",
                                  height: "40px",
                                  padding: "30px 0px 0px 30px",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                  aspectRatio: "1/1",
                                  borderRadius: "9999px",
                                  border: "1px solid rgba(0, 0, 0, 0.10)",
                                  background: "#E0E0E0",
                                  position: "relative",
                                  flexShrink: 0, // Prevent avatar from shrinking
                                }}
                              >
                                <div
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    flexShrink: 0,
                                    borderRadius: "9999px",
                                    border: "1.5px solid #FFF",
                                    background: "#17B26A",
                                    position: "absolute",
                                    left: "30px",
                                    top: "30px",
                                  }}
                                ></div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                  position: "relative",
                                  minWidth: 0, // Ensures text container can shrink
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "rgba(24,29,39,1)",
                                    }}
                                  >
                                    Sienna Hewitt
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    color: "#535862",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "rgba(83,88,98,1)",
                                    }}
                                  >
                                    [Role]
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                flexShrink: 0, // Prevent radio button from shrinking
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "9999px",
                                  border: "1px solid #D5D7DA",
                                  position: "relative",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add Account Button */}
                      <div
                        style={{
                          display: "flex",
                          padding: "2px 8px 8px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <button
                          style={{
                            display: "flex",
                            minHeight: "32px",
                            padding: "6px 8px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            flex: "1 0 0",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow:
                              "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <svg
                            style={{
                              width: "24px",
                              height: "24px",
                              position: "relative",
                            }}
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.5 5V19M5.5 12H19.5"
                              stroke="#344698"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div
                            style={{
                              display: "flex",
                              padding: "0px 2px",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#414651",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  color: "rgba(65,70,81,1)",
                                }}
                              >
                                Add account
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Sign Out */}
                      <div
                        onClick={handleSignOut}
                        style={{
                          display: "flex",
                          padding: "8px 6px",
                          alignItems: "center",
                          gap: "12px",
                          alignSelf: "stretch",
                          borderRadius: "6px",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#F5F5F5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flex: "1 0 0",
                            position: "relative",
                          }}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              position: "relative",
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6M8 11.3333C8 11.9533 8 12.2633 7.93185 12.5176C7.74692 13.2078 7.20782 13.7469 6.51764 13.9319C6.26331 14 5.95332 14 5.33333 14H5C4.06812 14 3.60218 14 3.23463 13.8478C2.74458 13.6448 2.35523 13.2554 2.15224 12.7654C2 12.3978 2 11.9319 2 11V5C2 4.06812 2 3.60218 2.15224 3.23463C2.35523 2.74458 2.74458 2.35523 3.23463 2.15224C3.60218 2 4.06812 2 5 2H5.33333C5.95332 2 6.26331 2 6.51764 2.06815C7.20782 2.25308 7.74692 2.79218 7.93185 3.48236C8 3.7367 8 4.04669 8 4.66667"
                              stroke="#A4A7AE"
                              strokeWidth="1.67"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div
                            style={{
                              flex: "1 0 0",
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "rgba(65,70,81,1)",
                              }}
                            >
                              Sign Out
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notification */}
        {showNotification && (
          <div
            style={{
              display: "flex",
              padding: "0px 32px",
              alignItems: "flex-start",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <SuccessNotification
              message="Welcome to Accio Data! Your account is now ready to use."
              onDismiss={handleNotificationDismiss}
            />
          </div>
        )}

        {/* Dashboard Header Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "0px 32px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
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
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    minWidth: "320px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "4px",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "32px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 600,
                        fontSize: "24px",
                        color: "rgba(24,29,39,1)",
                      }}
                    >
                      Dashboard
                    </span>
                  </div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "24px",
                      position: "relative",
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
                      View recent activity, task progress, and key data to stay
                      informed and organized.
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    position: "relative",
                  }}
                >
                  {/* Customize Button */}
                  <div
                    className="secondary-button"
                    style={{
                      display: "flex",
                      minHeight: "32px",
                      padding: "6px 8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      position: "relative",
                    }}
                  >
                    <svg
                      style={{
                        width: "16px",
                        height: "16px",
                        position: "relative",
                      }}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5.33337L10 5.33337M10 5.33337C10 6.43794 10.8954 7.33337 12 7.33337C13.1046 7.33337 14 6.43794 14 5.33337C14 4.2288 13.1046 3.33337 12 3.33337C10.8954 3.33337 10 4.22881 10 5.33337ZM6 10.6667L14 10.6667M6 10.6667C6 11.7713 5.10457 12.6667 4 12.6667C2.89543 12.6667 2 11.7713 2 10.6667C2 9.56214 2.89543 8.66671 4 8.66671C5.10457 8.66671 6 9.56214 6 10.6667Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      style={{
                        display: "flex",
                        padding: "0px 2px",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "rgba(65,70,81,1)",
                          }}
                        >
                          Customize
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Default Button */}
                  <div
                    className="secondary-button"
                    style={{
                      display: "flex",
                      minHeight: "32px",
                      padding: "6px 8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      position: "relative",
                    }}
                  >
                    <svg
                      style={{
                        width: "16px",
                        height: "16px",
                        position: "relative",
                      }}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 8L14 8M8 2L8 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      style={{
                        display: "flex",
                        padding: "0px 2px",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "rgba(65,70,81,1)",
                          }}
                        >
                          Default
                        </span>
                      </div>
                    </div>
                    <svg
                      style={{
                        width: "16px",
                        height: "16px",
                        position: "relative",
                      }}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Date Range Button */}
                  <div
                    className="secondary-button"
                    style={{
                      display: "flex",
                      minHeight: "32px",
                      padding: "6px 8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      position: "relative",
                    }}
                  >
                    <svg
                      style={{
                        width: "16px",
                        height: "16px",
                        position: "relative",
                      }}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 6.66671H2M10.6667 1.33337V4.00004M5.33333 1.33337V4.00004M5.2 14.6667H10.8C11.9201 14.6667 12.4802 14.6667 12.908 14.4487C13.2843 14.257 13.5903 13.951 13.782 13.5747C14 13.1469 14 12.5868 14 11.4667V5.86671C14 4.7466 14 4.18655 13.782 3.75873C13.5903 3.3824 13.2843 3.07644 12.908 2.88469C12.4802 2.66671 11.9201 2.66671 10.8 2.66671H5.2C4.0799 2.66671 3.51984 2.66671 3.09202 2.88469C2.71569 3.07644 2.40973 3.3824 2.21799 3.75873C2 4.18655 2 4.7466 2 5.86671V11.4667C2 12.5868 2 13.1469 2.21799 13.5747C2.40973 13.951 2.71569 14.257 3.09202 14.4487C3.51984 14.6667 4.0799 14.6667 5.2 14.6667Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      style={{
                        display: "flex",
                        padding: "0px 2px",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "rgba(65,70,81,1)",
                          }}
                        >
                          Jan 10, 2025 – Jan 16, 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content Placeholder */}
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "16px",
              background: "#FFF",
              borderRadius: "12px",
              border: "1px solid #E9EAEB",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              width: "100%",
            }}
          >
            <h3
              style={{
                marginBottom: "16px",
                color: "#181D27",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Dashboard Content Area
            </h3>
            <p style={{ margin: 0 }}>
              This is where the main dashboard widgets and content would be
              displayed. The layout is now properly positioned with the sidebar
              on the left and main content flowing correctly. Click on the
              sidebar items to see the accordion interactions!
            </p>
          </div>
        </div>
      </main>

      {/* Online Status Dot */}
      <svg
        style={{
          width: "8px",
          height: "8px",
          aspectRatio: "1/1",
          position: "absolute",
          right: "32px",
          top: "14px",
          zIndex: 60,
        }}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
}
