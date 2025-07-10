import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isDesktop: boolean;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  currentPage?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isDesktop,
  isMobile,
  mobileMenuOpen,
  currentPage = "dashboard",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
            stroke="#A4A7AE"
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

  const getHoverStyles = (item: string) => {
    if (hoveredItem === item && item !== currentPage) {
      return {
        background: "var(--Colors-Background-bg-primary_hover, #F5F5F5)",
        borderRadius: "var(--radius-sm, 6px)",
      };
    }
    return {};
  };

  const isAccordionOpen = (section: string) => openAccordions.includes(section);

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
                    ? "#344698"
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
                    color: isActive ? "#344698" : "rgba(65,70,81,1)",
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
                      background:
                        currentPage === "document-library" &&
                        item === "Document Library"
                          ? "#ECEEF9"
                          : "#FFF",
                      position: "relative",
                      cursor: "pointer",
                      ...getHoverStyles(
                        `${section}-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                      ),
                    }}
                    onMouseEnter={() =>
                      !(
                        currentPage === "document-library" &&
                        item === "Document Library"
                      ) &&
                      setHoveredItem(
                        `${section}-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                      )
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      if (section === "support") {
                        if (item === "Resources") {
                          navigate("/dashboard");
                        } else if (item === "Document Library") {
                          navigate("/document-library");
                        }
                      }
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
                      <div
                        style={{
                          color:
                            currentPage === "document-library" &&
                            item === "Document Library"
                              ? "#344698"
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
                            color:
                              currentPage === "document-library" &&
                              item === "Document Library"
                                ? "#344698"
                                : "rgba(65,70,81,1)",
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

  const toggleSidebarAccordion = (section: string) => {
    setOpenAccordions((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  return (
    <aside
      className={`transition-all duration-300 lg:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      style={{
        display: "flex",
        width: isDesktop ? "296px" : mobileMenuOpen ? "75%" : "296px",
        height: "100vh",
        padding: isDesktop
          ? "8px 0px 24px 8px"
          : mobileMenuOpen
            ? "0px"
            : "8px 0px 24px 8px",
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
          borderRadius: isDesktop ? "12px" : "0px",
          border: isDesktop ? "1px solid #E9EAEB" : "none",
          background: "#FFF",
          boxShadow: isDesktop
            ? "0px 1px 2px 0px rgba(10, 13, 18, 0.05)"
            : "none",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            paddingTop: "16px",
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
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5f38048a89d8ad952ff6b9682276a562665736e?width=274"
                  style={{
                    width: "137px",
                    height: "24px",
                    flexShrink: 0,
                    fill: "#34479A",
                    position: "absolute",
                    left: "1px",
                    top: "4px",
                  }}
                  alt="Union"
                />
              </div>
            </div>
          </div>

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
                isActive={currentPage === "dashboard"}
                hasChevron={false}
                onClick={() => navigate("/dashboard")}
              />

              <NavItem
                section="tools"
                label="Tools"
                onClick={() => toggleSidebarAccordion("tools")}
              />

              <NavItem
                section="screening"
                label="Screening"
                badge={!isAccordionOpen("screening") ? "8" : undefined}
                onClick={() => toggleSidebarAccordion("screening")}
              />

              <NavItem
                section="reporting"
                label="Reporting"
                onClick={() => toggleSidebarAccordion("reporting")}
              />

              <NavItem
                section="support"
                label="Support & Resources"
                isActive={currentPage === "document-library"}
                onClick={() => toggleSidebarAccordion("support")}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
