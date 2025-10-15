import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QuickCreateDropdown } from "./ui/quick-create-dropdown";

interface SidebarProps {
  isDesktop: boolean;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  currentPage?: string;
  showMobileUserMenu?: boolean;
  setShowMobileUserMenu?: (show: boolean) => void;
  setMobileMenuOpen?: (open: boolean) => void;
  userMenuOpen?: boolean;
  setUserMenuOpen?: (open: boolean) => void;
  userMenuHovered?: boolean;
  setUserMenuHovered?: (hovered: boolean) => void;
  handleSignOut?: () => void;
  getUserMenuStyles?: () => object;
  showNotification?: boolean;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  onOpenQuickOrderDrawer?: () => void;
  onOpenSSNOrderDrawer?: () => void;
  onOpenNotificationModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isDesktop,
  isMobile,
  mobileMenuOpen,
  currentPage = "dashboard",
  showMobileUserMenu = false,
  setShowMobileUserMenu,
  setMobileMenuOpen,
  userMenuOpen = false,
  setUserMenuOpen,
  userMenuHovered = false,
  setUserMenuHovered,
  handleSignOut,
  getUserMenuStyles,
  showNotification = false,
  isCollapsed = false,
  setIsCollapsed,
  onOpenQuickOrderDrawer,
  onOpenSSNOrderDrawer,
  onOpenNotificationModal,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [allExpanded, setAllExpanded] = useState(false);

  // Keep accordions open for related pages
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/document-library" || currentPath === "/resources") {
      if (!openAccordions.includes("support")) {
        setOpenAccordions((prev) => [...prev, "support"]);
      }
    } else if (currentPath === "/invites-orders") {
      if (!openAccordions.includes("screening")) {
        setOpenAccordions((prev) => [...prev, "screening"]);
      }
    }
  }, [location.pathname, openAccordions]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileSearchQuery, setMobileSearchQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  });
  const [isMobileSearchFocused, setIsMobileSearchFocused] = useState(false);
  const [mobileQuickCreateOpen, setMobileQuickCreateOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setMobileSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileQuickCreateOpen(false);
    }
  }, [mobileMenuOpen]);

  const handleMobileSearchSubmit = () => {
    const trimmedQuery = mobileSearchQuery.trim();
    if (!trimmedQuery) return;
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    setMobileMenuOpen?.(false);
    setShowMobileUserMenu?.(false);
  };

  const isMobileSearchActive =
    isMobileSearchFocused || mobileSearchQuery.length > 0;

  const openQuickOrderFromMobile = () => {
    setMobileQuickCreateOpen(false);
    setMobileMenuOpen?.(false);
    onOpenQuickOrderDrawer?.();
  };

  const openSSNOrderFromMobile = () => {
    setMobileQuickCreateOpen(false);
    setMobileMenuOpen?.(false);
    onOpenSSNOrderDrawer?.();
  };

  const handleOpenNotification = () => {
    setMobileMenuOpen?.(false);
    onOpenNotificationModal?.();
  };

  const menuSections = {
    tools: [
      "Online Ordering",
      "I-9 Order",
      "Batch Orders",
      "Quick Order",
      "Quick Court Order",
    ],
    screening: [
      "Invites & Orders",
      "ID Verification Status",
      "Adjudication Statuses",
      "Adverse Action Letters",
    ],
    support: ["Document Library", "Resources"],
  };

  // Define which menu items are disabled (don't have content yet)
  const disabledMenuItems = [
    "ID Verification Status",
    "Adjudication Statuses",
    "Adverse Action Letters",
  ];

  const NavIcon = ({
    section,
    isOpen,
    isActive = false,
    isMobile: iconIsMobile = false,
    isTablet = false,
  }: {
    section: string;
    isOpen: boolean;
    isActive?: boolean;
    isMobile?: boolean;
    isTablet?: boolean;
  }) => {
    // Determine icon size based on device
    const iconSize = iconIsMobile ? 18 : isTablet ? 20 : 21;
    const icons = {
      dashboard: (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.97756 13.0829V14.8273M10.4663 9.59414V14.8273M13.9551 6.10536V14.8273M6.80312 18.3161H14.1296C15.595 18.3161 16.3277 18.3161 16.8874 18.0309C17.3798 17.7801 17.7801 17.3798 18.0309 16.8874C18.3161 16.3277 18.3161 15.595 18.3161 14.1296V6.80312C18.3161 5.33769 18.3161 4.60498 18.0309 4.04526C17.7801 3.55292 17.3798 3.15263 16.8874 2.90177C16.3277 2.61658 15.595 2.61658 14.1296 2.61658H6.80312C5.33769 2.61658 4.60498 2.61658 4.04526 2.90177C3.55292 3.15263 3.15263 3.55292 2.90177 4.04526C2.61658 4.60498 2.61658 5.33769 2.61658 6.80312V14.1296C2.61658 15.595 2.61658 16.3277 2.90177 16.8874C3.15263 17.3798 3.55292 17.7801 4.04526 18.0309C4.60498 18.3161 5.33769 18.3161 6.80312 18.3161Z"
            stroke={isActive ? "#273572" : "#A4A7AE"}
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tools: (
        <svg
          width={iconSize}
          height={iconSize}
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
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 8.43274L17.5 8.43274M7.5 3.43274L7.5 18.4327M6.5 3.43274H13.5C14.9001 3.43274 15.6002 3.43274 16.135 3.70522C16.6054 3.94491 16.9878 4.32736 17.2275 4.79776C17.5 5.33254 17.5 6.03261 17.5 7.43274V14.4327C17.5 15.8329 17.5 16.5329 17.2275 17.0677C16.9878 17.5381 16.6054 17.9206 16.135 18.1603C15.6002 18.4327 14.9001 18.4327 13.5 18.4327H6.5C5.09987 18.4327 4.3998 18.4327 3.86502 18.1603C3.39462 17.9206 3.01217 17.5381 2.77248 17.0677C2.5 16.5329 2.5 15.8329 2.5 14.4327V7.43274C2.5 6.03261 2.5 5.33254 2.77248 4.79776C3.01217 4.32736 3.39462 3.94491 3.86502 3.70522C4.3998 3.43274 5.09987 3.43274 6.5 3.43274Z"
            stroke={isActive ? "#273572" : "#A4A7AE"}
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      reporting: (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8334 6.76607L9.90374 4.90684C9.63619 4.37174 9.50241 4.10418 9.30283 3.90871C9.12634 3.73585 8.91362 3.60438 8.68008 3.52383C8.41599 3.43274 8.11686 3.43274 7.5186 3.43274H4.33335C3.39993 3.43274 2.93322 3.43274 2.5767 3.6144C2.2631 3.77418 2.00813 4.02915 1.84834 4.34276C1.66669 4.69927 1.66669 5.16599 1.66669 6.09941V6.76607M1.66669 6.76607H14.3334C15.7335 6.76607 16.4336 6.76607 16.9683 7.03856C17.4387 7.27824 17.8212 7.66069 18.0609 8.1311C18.3334 8.66588 18.3334 9.36594 18.3334 10.7661V14.4327C18.3334 15.8329 18.3334 16.5329 18.0609 17.0677C17.8212 17.5381 17.4387 17.9206 16.9683 18.1603C16.4336 18.4327 15.7335 18.4327 14.3334 18.4327H5.66669C4.26656 18.4327 3.56649 18.4327 3.03171 18.1603C2.56131 17.9206 2.17885 17.5381 1.93917 17.0677C1.66669 16.5329 1.66669 15.8329 1.66669 14.4327V6.76607Z"
            stroke={isActive ? "#273572" : "#A4A7AE"}
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      support: (
        <svg
          width={iconSize}
          height={iconSize}
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

  const ChevronIcon = ({
    isOpen,
    isMobile: chevronIsMobile = false,
  }: {
    isOpen: boolean;
    isMobile?: boolean;
  }) => {
    const size = chevronIsMobile ? 20 : 24;
    return (
      <svg
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: "relative",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
        width={size}
        height={size}
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
  };

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
    isDisabled = false,
  }: {
    section: string;
    label: string;
    isActive?: boolean;
    hasChevron?: boolean;
    badge?: string;
    onClick?: () => void;
    isDisabled?: boolean;
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
              cursor: isDisabled
                ? "not-allowed"
                : hasChevron
                  ? "pointer"
                  : "default",
              opacity: isDisabled ? 0.5 : 1,
              ...(!isActive && !isDisabled ? getHoverStyles(section) : {}),
            }}
            onClick={isDisabled ? undefined : onClick}
            onMouseEnter={() =>
              !isActive && !isDisabled && setHoveredItem(section)
            }
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isDesktop && isCollapsed ? "0px" : "8px",
                flex: "1 0 0",
                position: "relative",
                justifyContent:
                  isDesktop && isCollapsed ? "center" : "flex-start",
              }}
            >
              <NavIcon
                section={section}
                isOpen={isOpen}
                isActive={isActive}
                isMobile={isMobile}
                isTablet={!isMobile && !isDesktop}
              />
              {!(isDesktop && isCollapsed) && (
                <div
                  style={{
                    color: isDisabled
                      ? "#A4A7AE"
                      : isActive
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
                      color: isDisabled
                        ? "#A4A7AE"
                        : isActive
                          ? "#273572"
                          : "rgba(65,70,81,1)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              )}
            </div>

            {badge && !(isDesktop && isCollapsed) && (
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

            {hasChevron && !(isDesktop && isCollapsed) && (
              <ChevronIcon isOpen={isOpen} isMobile={isMobile} />
            )}
          </div>
        </div>

        {/* Sub-menu */}
        {hasChevron && isOpen && !(isDesktop && isCollapsed) && (
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
                        (currentPage === "document-library" &&
                          item === "Document Library") ||
                        (currentPage === "resources" && item === "Resources") ||
                        (currentPage === "invites-orders" &&
                          item === "Invites & Orders") ||
                        (currentPage === "quick-court-order" &&
                          item === "Quick Court Order") ||
                        (currentPage === "batch-orders" &&
                          item === "Batch Orders") ||
                        (currentPage === "quick-order" &&
                          item === "Quick Order") ||
                        (currentPage === "i9-order" && item === "I-9 Order")
                          ? "#ECEEF9"
                          : "#FFF",
                      position: "relative",
                      cursor: disabledMenuItems.includes(item)
                        ? "not-allowed"
                        : "pointer",
                      opacity: disabledMenuItems.includes(item) ? 0.5 : 1,
                      ...(!(
                        (currentPage === "document-library" &&
                          item === "Document Library") ||
                        (currentPage === "resources" && item === "Resources") ||
                        (currentPage === "invites-orders" &&
                          item === "Invites & Orders") ||
                        (currentPage === "quick-court-order" &&
                          item === "Quick Court Order") ||
                        (currentPage === "batch-orders" &&
                          item === "Batch Orders") ||
                        (currentPage === "quick-order" &&
                          item === "Quick Order") ||
                        (currentPage === "i9-order" && item === "I-9 Order")
                      ) && !disabledMenuItems.includes(item)
                        ? getHoverStyles(
                            `${section}-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                          )
                        : {}),
                    }}
                    onMouseEnter={() =>
                      !(
                        (currentPage === "document-library" &&
                          item === "Document Library") ||
                        (currentPage === "resources" && item === "Resources") ||
                        (currentPage === "invites-orders" &&
                          item === "Invites & Orders") ||
                        (currentPage === "quick-court-order" &&
                          item === "Quick Court Order") ||
                        (currentPage === "batch-orders" &&
                          item === "Batch Orders") ||
                        (currentPage === "quick-order" &&
                          item === "Quick Order") ||
                        (currentPage === "i9-order" && item === "I-9 Order")
                      ) &&
                      !disabledMenuItems.includes(item) &&
                      setHoveredItem(
                        `${section}-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                      )
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      if (disabledMenuItems.includes(item)) {
                        return; // Do nothing if disabled
                      }

                      if (section === "support") {
                        if (item === "Document Library") {
                          navigate("/document-library");
                        } else if (item === "Resources") {
                          navigate("/resources");
                        }
                      } else if (section === "screening") {
                        if (item === "Invites & Orders") {
                          navigate("/invites-orders");
                        }
                      } else if (section === "tools") {
                        if (item === "Online Ordering") {
                          navigate("/online-ordering");
                        }
                        if (item === "Quick Court Order") {
                          navigate("/quick-court-order");
                        }
                        if (item === "Quick Order") {
                          navigate("/quick-order");
                        }
                        if (item === "Batch Orders") {
                          navigate("/batch-orders");
                        }
                        if (item === "I-9 Order") {
                          navigate("/i9-order");
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
                          color: disabledMenuItems.includes(item)
                            ? "#A4A7AE"
                            : (currentPage === "document-library" &&
                                  item === "Document Library") ||
                                (currentPage === "resources" &&
                                  item === "Resources") ||
                                (currentPage === "invites-orders" &&
                                  item === "Invites & Orders") ||
                                (currentPage === "quick-court-order" &&
                                  item === "Quick Court Order") ||
                                (currentPage === "batch-orders" &&
                                  item === "Batch Orders") ||
                                (currentPage === "quick-order" &&
                                  item === "Quick Order") ||
                                (currentPage === "i9-order" &&
                                  item === "I-9 Order")
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
                            color: disabledMenuItems.includes(item)
                              ? "#A4A7AE"
                              : (currentPage === "document-library" &&
                                    item === "Document Library") ||
                                  (currentPage === "resources" &&
                                    item === "Resources") ||
                                  (currentPage === "invites-orders" &&
                                    item === "Invites & Orders") ||
                                  (currentPage === "quick-court-order" &&
                                    item === "Quick Court Order") ||
                                  (currentPage === "batch-orders" &&
                                    item === "Batch Orders") ||
                                  (currentPage === "quick-order" &&
                                    item === "Quick Order") ||
                                  (currentPage === "i9-order" &&
                                    item === "I-9 Order")
                                ? "#273572"
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
                            border:
                              currentPage === "invites-orders"
                                ? "1px solid #B3BCE5"
                                : "1px solid #E9EAEB",
                            background:
                              currentPage === "invites-orders"
                                ? "#ECEEF9"
                                : "#FAFAFA",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color:
                                currentPage === "invites-orders"
                                  ? "#273572"
                                  : "#414651",
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
                                color:
                                  currentPage === "invites-orders"
                                    ? "rgba(39,53,114,1)"
                                    : "rgba(65,70,81,1)",
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

  const toggleExpandCollapseAll = () => {
    if (allExpanded) {
      // Collapse all
      setOpenAccordions([]);
      setAllExpanded(false);
    } else {
      // Expand all
      setOpenAccordions(["tools", "screening", "support"]);
      setAllExpanded(true);
    }
  };

  const isOffCanvas = !isDesktop && !mobileMenuOpen;

  return (
    <aside
      className={`transition-all duration-300 ${
        isDesktop
          ? "translate-x-0"
          : mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
      }`}
      style={{
        display: "flex",
        width: isDesktop
          ? isCollapsed
            ? "80px"
            : "296px"
          : mobileMenuOpen
            ? "75vw"
            : "0px",
        height: "100vh",
        padding: isDesktop
          ? "8px 0px 24px 8px"
          : mobileMenuOpen
            ? "0px"
            : "0px",
        alignItems: "flex-start",
        flexShrink: 0,
        position: "fixed",
        left: 0,
        top: showNotification && isDesktop ? "60px" : 0,
        zIndex: mobileMenuOpen && !isDesktop ? 1001 : 1000,
        visibility: isOffCanvas ? "hidden" : "visible",
        pointerEvents: isOffCanvas ? "none" : "auto",
        overflow: "hidden",
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
            : mobileMenuOpen
              ? "0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04)"
              : "none",
          position: "relative",
          width: isDesktop && isCollapsed ? "80px" : "auto",
          overflow: "hidden",
        }}
      >
        <div
          className={
            allExpanded && isDesktop && !isCollapsed ? "sidebar-scroll" : ""
          }
          style={{
            display: "flex",
            paddingTop: "16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            flex: "1 0 0",
            alignSelf: "stretch",
            position: "relative",
            overflow: "auto",
            maxHeight:
              allExpanded && isDesktop && !isCollapsed
                ? "calc(100vh - 200px)"
                : "none",
          }}
        >
          {/* Logo Header */}
          <div
            style={{
              display: "flex",
              padding: isDesktop && isCollapsed ? "0px 8px" : "0px 20px",
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
                justifyContent:
                  isDesktop && isCollapsed ? "center" : "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              {/* Logo - Hidden when collapsed */}
              {!(isDesktop && isCollapsed) && (
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
              )}
              {/* Desktop-only secondary button next to logo */}
              {isDesktop && !isCollapsed && (
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
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsCollapsed?.(true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFF";
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
                      d="M2 2V14M14 8H4.66667M4.66667 8L9.33333 12.6667M4.66667 8L9.33333 3.33333"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              {/* Collapsed state expand button */}
              {isDesktop && isCollapsed && (
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
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsCollapsed?.(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFF";
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
                      d="M14 14V2M2 8H11.3333M11.3333 8L6.66667 3.33333M11.3333 8L6.66667 12.6667"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {!isDesktop && (
                  <>
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setMobileQuickCreateOpen((prev) => !prev)}
                        aria-label="Open quick create"
                        style={{
                          display: "flex",
                          width: "40px",
                          height: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "12px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: mobileQuickCreateOpen ? "#273572" : "#344698",
                          boxShadow:
                            "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!mobileQuickCreateOpen) {
                            e.currentTarget.style.background = "#273572";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!mobileQuickCreateOpen) {
                            e.currentTarget.style.background = "#344698";
                          }
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ display: "block" }}
                        >
                          <g clipPath="url(#sidebar-mobile-plus)">
                            <path
                              d="M10 6.6665V13.3332M6.66669 9.99984H13.3334M18.3334 9.99984C18.3334 14.6022 14.6025 18.3332 10 18.3332C5.39763 18.3332 1.66669 14.6022 1.66669 9.99984C1.66669 5.39746 5.39763 1.6665 10 1.6665C14.6025 1.6665 18.3334 5.39746 18.3334 9.99984Z"
                              stroke="#8D9BD8"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="sidebar-mobile-plus">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={handleOpenNotification}
                      aria-label="Open notifications"
                      style={{
                        display: "flex",
                        width: "40px",
                        height: "40px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "12px",
                        background: "transparent",
                        border: "none",
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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: "block" }}
                      >
                        <path
                          d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#17B26A",
                          border: "1.5px solid #FFF",
                        }}
                      />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setMobileMenuOpen?.(false)}
                  className="lg:hidden"
                  style={{
                    display: isDesktop ? "none" : "flex",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                  }}
                >
                  <svg
                    style={{ width: "24px", height: "24px", opacity: 0.7 }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.7">
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Quick Create Dropdown */}
          {!isDesktop && (
            <QuickCreateDropdown
              isOpen={mobileQuickCreateOpen}
              onClose={() => setMobileQuickCreateOpen(false)}
              breakpoint="mobile"
              onOpenDrawer={openQuickOrderFromMobile}
              onOpenSSNDrawer={openSSNOrderFromMobile}
            />
          )}

          {/* Search Bar - Mobile/Tablet Only */}
          <div
            style={{
              display: isDesktop ? "none" : "flex",
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
                padding: "6px 8px",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: isMobileSearchActive ? "2px solid #34479A" : "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                position: "relative",
                transition: "border 0.2s ease",
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
                    minWidth: "16px",
                    minHeight: "16px",
                    flexShrink: 0,
                    position: "relative",
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
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleMobileSearchSubmit();
                    }
                  }}
                  onFocus={() => setIsMobileSearchFocused(true)}
                  onBlur={() => setIsMobileSearchFocused(false)}
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    flex: "1 0 0",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    color: "#181D27",
                    minWidth: 0,
                  }}
                />
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

          {/* Mobile User Menu Page - Show when active on mobile */}
          {isMobile && showMobileUserMenu && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                flex: "1 0 0",
                position: "relative",
              }}
            >
              {/* Back Button */}
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
                <div
                  style={{
                    display: "flex",
                    width: "123px",
                    height: "36px",
                    padding: "0px 6px",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => setShowMobileUserMenu?.(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F5F5";
                    e.currentTarget.style.borderRadius = "6px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <svg
                    style={{
                      width: "20px",
                      height: "20px",
                      flexShrink: 0,
                      position: "relative",
                    }}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      position: "relative",
                      marginLeft: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "rgba(83,88,98,1)",
                      }}
                    >
                      Back
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
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
                      onClick={() => navigate("/account-settings")}
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
                            width: "14px",
                            height: "14px",
                            position: "relative",
                          }}
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3327 14C13.3327 13.0696 13.3327 12.6044 13.2179 12.2259C12.9593 11.3736 12.2924 10.7067 11.4401 10.4482C11.0616 10.3333 10.5964 10.3333 9.66601 10.3333H6.33268C5.40231 10.3333 4.93712 10.3333 4.55859 10.4482C3.70632 10.7067 3.03938 11.3736 2.78084 12.2259C2.66602 12.6044 2.66602 13.0696 2.66602 14M10.9993 5C10.9993 6.65685 9.6562 8 7.99935 8C6.34249 8 4.99935 6.65685 4.99935 5C4.99935 3.34315 6.34249 2 7.99935 2C9.6562 2 10.9993 3.34315 10.9993 5Z"
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
                            width: "14px",
                            height: "14px",
                            position: "relative",
                          }}
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.66732 7.33333H11.8673C12.6141 7.33333 12.9874 7.33333 13.2726 7.47866C13.5235 7.60649 13.7275 7.81046 13.8553 8.06135C14.0007 8.34656 14.0007 8.71993 14.0007 9.46667V14M8.66732 14V4.13333C8.66732 3.3866 8.66732 3.01323 8.52199 2.72801C8.39416 2.47713 8.19019 2.27316 7.93931 2.14532C7.65409 2 7.28072 2 6.53398 2H4.13398C3.38725 2 3.01388 2 2.72866 2.14532C2.47778 2.27316 2.27381 2.47713 2.14598 2.72801C2.00065 3.01323 2.00065 3.3866 2.00065 4.13333V14M14.6673 14H1.33398M4.33398 4.66667H6.33398M4.33398 7.33333H6.33398M4.33398 10H6.33398"
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
                            Company
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sign Out Item */}
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
                      onClick={handleSignOut}
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
                            width: "14px",
                            height: "14px",
                            position: "relative",
                          }}
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.3327 10.6667L14.666 8L11.3327 5.33333M13.9993 8H6.66602M6.66602 14H4.53268C3.41268 14 2.85268 14 2.42535 13.7893C2.04935 13.6049 1.72885 13.2844 1.54452 12.9084C1.33268 12.4811 1.33268 11.9211 1.33268 10.8V5.2C1.33268 4.0789 1.33268 3.5184 1.54452 3.0916C1.72885 2.7156 2.04935 2.3951 2.42535 2.2107C2.85268 2 3.41268 2 4.53268 2H6.66602"
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
                            Sign out
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    display: "flex",
                    padding: "4px 0px",
                    alignItems: "center",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#E9EAEB",
                    }}
                  ></div>
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
                        alignItems: "flex-start",
                        gap: "12px",
                        flex: "1 0 0",
                        borderRadius: "6px",
                        background: "#F5F5F5",
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
                            flexShrink: 0,
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
                          }}
                        >
                          <div
                            style={{
                              alignSelf: "stretch",
                              overflow: "hidden",
                              color: "#181D27",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
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
                              alignSelf: "stretch",
                              overflow: "hidden",
                              color: "#535862",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
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

                  {/* Alternative User Account */}
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
                        alignItems: "flex-start",
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
                            flexShrink: 0,
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
                          }}
                        >
                          <div
                            style={{
                              alignSelf: "stretch",
                              overflow: "hidden",
                              color: "#181D27",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
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
                              Sienna Hewitt
                            </span>
                          </div>
                          <div
                            style={{
                              alignSelf: "stretch",
                              overflow: "hidden",
                              color: "#535862",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
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
              </div>
            </div>
          )}

          {/* Navigation - Hide on mobile when user menu is active */}
          {!(isMobile && showMobileUserMenu) && (
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
                  padding: isDesktop && isCollapsed ? "0px 8px" : "0px 16px",
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
                  isActive={
                    currentPage === "invites-orders" && isDesktop && isCollapsed
                  }
                  badge={!isAccordionOpen("screening") ? "8" : undefined}
                  onClick={() => toggleSidebarAccordion("screening")}
                />

                <NavItem
                  section="reporting"
                  label="Reporting"
                  isActive={currentPage === "reporting"}
                  hasChevron={false}
                  onClick={() => navigate("/reporting")}
                />

                <NavItem
                  section="support"
                  label="Support & Resources"
                  onClick={() => toggleSidebarAccordion("support")}
                />
              </div>
            </div>
          )}

          {/* Mobile User Profile Section - Only show on mobile */}
          {isMobile && (
            <>
              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  padding: "4px 0px",
                  alignItems: "center",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "#E9EAEB",
                  }}
                ></div>
              </div>

              {!showMobileUserMenu ? (
                /* Main Sidebar Menu with User Profile */
                <div
                  style={{
                    display: "flex",
                    padding: "0px 16px",
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
                      padding: "8px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                      borderRadius: "12px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => setShowMobileUserMenu?.(true)}
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
                        d="M9 18L15 12L9 6"
                        stroke="#A4A7AE"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Sign Out Button - Always visible in main sidebar */}
                  <div
                    style={{
                      display: "flex",
                      padding: "4px 0px",
                      alignItems: "center",
                      alignSelf: "stretch",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        background: "#E9EAEB",
                      }}
                    ></div>
                  </div>

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
                      onClick={handleSignOut}
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
                            height: "24px",
                            position: "relative",
                          }}
                          width="16"
                          height="25"
                          viewBox="0 0 16 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.6667 17.9326L14 12.9326M14 12.9326L10.6667 7.93262M14 12.9326H6M6 3.93262H5.2C4.0799 3.93262 3.51984 3.93262 3.09202 4.2596C2.7157 4.54722 2.40973 5.00616 2.21799 5.57065C2 6.21238 2 7.05246 2 8.73262V17.1326C2 18.8128 2 19.6529 2.21799 20.2946C2.40973 20.8591 2.71569 21.318 3.09202 21.6056C3.51984 21.9326 4.0799 21.9326 5.2 21.9326H6"
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
                            Sign out
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>

        {/* Desktop-only bottom section */}
        {isDesktop && !isCollapsed && (
          <div
            style={{
              display: "flex",
              padding: "16px 0",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
              borderTop: "1px solid #F5F5F5",
              position: "relative",
            }}
          >
            {/* Expand All Button */}
            <div
              style={{
                display: "flex",
                padding: "0 16px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <button
                style={{
                  display: "flex",
                  padding: "6px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={toggleExpandCollapseAll}
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
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
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
                        fontWeight: 700,
                        fontSize: "12px",
                        color: "rgba(65,70,81,1)",
                      }}
                    >
                      {allExpanded ? "Collapse All" : "Expand All"}
                    </span>
                  </div>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {allExpanded ? (
                    // Collapse All icon - chevron-selector-inverse (pointing inward)
                    <>
                      <path
                        d="M11.3333 13.3333L7.99992 9.99992L4.66659 13.3333"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.3333 2.66667L7.99992 6L4.66659 2.66667"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    // Expand All icon - chevron-selector-vertical (up/down)
                    <>
                      <path
                        d="M4.66666 10L8 13.3334L11.3333 10"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.66666 6.00002L8 2.66669L11.3333 6.00002"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
