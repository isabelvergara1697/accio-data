import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserMenuDropdown } from "../components/UserMenuDropdown";
import { Header } from "../components/Header";

// Document data structure based on Figma design
const documentSections = [
  {
    id: "general",
    title: "General Documents",
    count: 9,
    isOpen: true,
    documents: [
      { id: "1", name: "Quick Start Guide", size: "200 KB", type: "PDF" },
      { id: "2", name: "Web Demo", size: "200 KB", type: "PDF" },
      { id: "3", name: "User Guide", size: "200 KB", type: "PDF" },
      { id: "4", name: "Consumer FCR Rights", size: "200 KB", type: "PDF" },
      { id: "5", name: "WA Add On", size: "200 KB", type: "PDF" },
      { id: "6", name: "Article 23", size: "200 KB", type: "PDF" },
      { id: "7", name: "PSP Consent", size: "200 KB", type: "PDF" },
      { id: "8", name: "Applicant Release Form", size: "200 KB", type: "PDF" },
      {
        id: "9",
        name: "CBSV User Agreement - Social Security",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
  {
    id: "motor-vehicle",
    title: "Motor Vehicle Forms",
    count: 2,
    isOpen: true,
    documents: [
      {
        id: "10",
        name: "Release of Information Form - 29 CRF Drug and Alcohol Test",
        size: "200 KB",
        type: "PDF",
      },
      { id: "11", name: "Georgia MVR Form", size: "200 KB", type: "PDF" },
    ],
  },
  {
    id: "special-search",
    title: "Special Search Specific Forms",
    count: 24,
    isOpen: false,
    documents: [
      {
        id: "12",
        name: "FBI Identity History Check",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "13",
        name: "OPM Security Investigation",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "14",
        name: "Treasury Security Check",
        size: "200 KB",
        type: "PDF",
      },
      { id: "15", name: "DOJ Fingerprint Card", size: "200 KB", type: "PDF" },
      {
        id: "16",
        name: "ICE E-Verify Authorization",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
  {
    id: "security-manuals",
    title: "Security Manuals",
    count: 5,
    isOpen: false,
    documents: [
      {
        id: "17",
        name: "Background Check Protocol",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "18",
        name: "Security Clearance Guidelines",
        size: "200 KB",
        type: "PDF",
      },
      { id: "19", name: "Data Protection Manual", size: "200 KB", type: "PDF" },
      {
        id: "20",
        name: "Identity Verification Standards",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "21",
        name: "Compliance Assessment Guide",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
];

// Add styles for button hover states
const documentLibraryStyles = `
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
  .quick-create-button {
    transition: all 0.2s ease;
    cursor: pointer;
  }
  .quick-create-button:hover {
    background: #2A3A82 !important;
  }
`;

export default function DocumentLibrary() {
  const navigate = useNavigate();
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "general",
    "motor-vehicle",
  ]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (userMenuOpen && !target.closest("[data-user-menu]")) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userMenuOpen]);

  const toggleAccordion = (accordionId: string) => {
    setOpenAccordions((prev) =>
      prev.includes(accordionId)
        ? prev.filter((id) => id !== accordionId)
        : [...prev, accordionId],
    );
  };

  const FileIcon = () => (
    <div className="relative w-10 h-10">
      <svg
        className="w-8 h-10 absolute left-2 top-0"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 0.75H20C20.1212 0.75 20.2375 0.798089 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
          stroke="#D5D7DA"
          strokeWidth="1.5"
        />
        <path
          d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
          stroke="#D5D7DA"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute left-1 top-4 w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
        <span className="text-white text-xs font-bold">PDF</span>
      </div>
    </div>
  );

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
                    color: isActive
                      ? "var(--colors-text-text-primary-900, #181D27)"
                      : "rgba(65,70,81,1)",
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
                        item === "Document Library" ? "#ECEEF9" : "#FFF",
                      position: "relative",
                      cursor: "pointer",
                      ...getHoverStyles(
                        `${section}-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                      ),
                    }}
                    onMouseEnter={() =>
                      item !== "Document Library" &&
                      setHoveredItem(
                        `${section}-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                      )
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      if (section === "support" && item === "Resources") {
                        navigate("/dashboard");
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
                            item === "Document Library"
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
                            color:
                              item === "Document Library"
                                ? "var(--colors-text-text-primary-900, #181D27)"
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
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: documentLibraryStyles }} />
      {/* Sidebar Navigation - Exact copy from Dashboard */}
      <aside
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
                  isActive={false}
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
                  isActive={true}
                  onClick={() => toggleSidebarAccordion("support")}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "296px",
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* Desktop Top Navigation Bar - Exact copy from Dashboard */}
        {isDesktop && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: "296px",
              right: 0,
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 32px",
              zIndex: 20,
            }}
          >
            {/* Search Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: "1 0 0",
                maxWidth: "400px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                padding: "10px 12px",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <svg
                style={{
                  width: "20px",
                  height: "20px",
                  flexShrink: 0,
                }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                style={{
                  flex: "1 0 0",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#717680",
                  lineHeight: "20px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  padding: "2px 6px",
                  alignItems: "center",
                  borderRadius: "4px",
                  border: "1px solid #E9EAEB",
                  background: "#FAFAFA",
                }}
              >
                <span
                  style={{
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#717680",
                  }}
                >
                  ⌘K
                </span>
              </div>
            </div>

            {/* Right Side - Quick Create, Notifications, User Menu */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginLeft: "32px",
              }}
            >
              {/* Quick Create Button */}
              <button
                className="quick-create-button"
                style={{
                  display: "flex",
                  padding: "12px 16px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Public Sans",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#FFF",
                  }}
                >
                  Quick Create
                </span>
                <svg
                  style={{ width: "20px", height: "20px" }}
                  width="20"
                  height="20"
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

              {/* Notifications */}
              <button
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "6px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
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
                    d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Divider */}
              <div
                style={{
                  width: "1px",
                  height: "24px",
                  background: "#E9EAEB",
                }}
              />

              {/* User Menu */}
              <div
                style={{
                  position: "relative",
                }}
                data-user-menu
              >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                  }}
                  onMouseEnter={() => setUserMenuHovered(true)}
                  onMouseLeave={() => setUserMenuHovered(false)}
                >
                  <div
                    style={{
                      display: "flex",
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
                        Alexandra Fitzwilliam
                      </div>
                      <div
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                        }}
                      >
                        [User Role]
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Menu Dropdown */}
            <UserMenuDropdown
              isOpen={userMenuOpen}
              onSignOut={() => navigate("/login")}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div
          style={{
            marginTop: isDesktop ? "80px" : "0px",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
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
                  minWidth: "320px",
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
                    fontFamily: "'Public Sans'",
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
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "rgba(24,29,39,1)",
                    }}
                  >
                    Document Library
                  </span>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "'Public Sans'",
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
                    Browse and download key forms and documents needed for
                    screenings, compliance, and account setup.
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  className="secondary-button"
                  style={{
                    display: "flex",
                    minHeight: "32px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
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
                    <div
                      style={{
                        color: "#414651",
                        fontFamily: "'Public Sans'",
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
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "rgba(65,70,81,1)",
                        }}
                      >
                        Most Recent
                      </span>
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
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className="secondary-button"
                  style={{
                    display: "flex",
                    minHeight: "32px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
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
                    <div
                      style={{
                        color: "#414651",
                        fontFamily: "'Public Sans'",
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
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "rgba(65,70,81,1)",
                        }}
                      >
                        All Files
                      </span>
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
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  minWidth: "200px",
                  maxWidth: "320px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  flex: "1 0 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "6px 8px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
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
                      style={{ width: "16px", height: "16px" }}
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
                    <div
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
                        fontFamily: "'Public Sans'",
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
                          color: "rgba(113,118,128,1)",
                        }}
                      >
                        Guide
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Sections */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                alignSelf: "stretch",
              }}
            >
              {documentSections.map((section) => (
                <div
                  key={section.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0px 24px",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
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
                                fontFamily: "'Public Sans'",
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
                                  fontWeight: 600,
                                  fontSize: "18px",
                                  color: "rgba(24,29,39,1)",
                                }}
                              >
                                {section.title}
                              </span>
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
                                  fontFamily: "'Public Sans'",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "18px",
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
                                  {section.count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <button
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow:
                              "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                          onClick={() => toggleAccordion(section.id)}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              transform: openAccordions.includes(section.id)
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.2s ease",
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
                        </button>
                      </div>
                    </div>

                    {/* Document Content */}
                    {openAccordions.includes(section.id) ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
                          gap: "16px",
                          padding: "20px 24px",
                          alignSelf: "stretch",
                        }}
                      >
                        {section.documents.map((doc) => (
                          <div
                            key={doc.id}
                            style={{
                              display: "flex",
                              height: "92px",
                              padding: "16px",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "12px",
                              border: "1px solid #E9EAEB",
                              background: "#FFF",
                              cursor: "pointer",
                              transition: "background-color 0.2s ease",
                            }}
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
                                alignItems: "flex-start",
                                gap: "12px",
                                flex: "1 0 0",
                              }}
                            >
                              <FileIcon />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "2px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    alignSelf: "stretch",
                                    overflow: "hidden",
                                    color: "#414651",
                                    textOverflow: "ellipsis",
                                    fontFamily: "'Public Sans'",
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
                                    {doc.name}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#535862",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "18px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        color: "rgba(83,88,98,1)",
                                      }}
                                    >
                                      {doc.size}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <button
                                style={{
                                  display: "flex",
                                  padding: "6px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "6px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
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
                                    d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                              <button
                                style={{
                                  display: "flex",
                                  padding: "6px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "6px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
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
                                    d="M21 21H3M18 11L12 17M12 17L6 11M12 17V3"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Closed state with equal 20px top and bottom padding
                      <div
                        style={{
                          padding: "20px 24px 20px 24px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
