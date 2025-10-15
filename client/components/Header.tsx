import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { QuickCreateDropdown } from "./ui/quick-create-dropdown";
import QuickOrderDrawer from "./ui/quick-order-drawer";
import SSNOrderDrawer from "./ui/ssn-order-drawer";
import NotificationModal from "./ui/notification-modal";
import { AdvancedSearchModal } from "./AdvancedSearchModal";
import { formatContactText } from "../lib/order-utils";
import {
  useResponsiveSVGEnhanced,
  useIconSizeEnhanced,
} from "../hooks/use-responsive-svg-enhanced";

interface HeaderProps {
  isDesktop: boolean;
  isMobile?: boolean;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  userMenuHovered: boolean;
  setUserMenuHovered: (hovered: boolean) => void;
  handleSignOut: () => void;
  getUserMenuStyles: () => object;
  showMobileUserMenu?: boolean;
  showNotification?: boolean;
  sidebarCollapsed?: boolean;
  searchQuery?: string;
  onOrderNotification?: (notification: {
    title: string;
    description: string;
    orderNumber?: string;
  }) => void;
  // Drawer control props
  quickOrderDrawerOpen?: boolean;
  setQuickOrderDrawerOpen?: (open: boolean) => void;
  ssnOrderDrawerOpen?: boolean;
  setSSNOrderDrawerOpen?: (open: boolean) => void;
  customizeDrawerOpen?: boolean;
  setCustomizeDrawerOpen?: (open: boolean) => void;
  notificationModalOpen?: boolean;
  setNotificationModalOpen?: (open: boolean) => void;
  onOpenQuickOrderDrawer?: () => void;
  onOpenSSNOrderDrawer?: () => void;
  onOpenCustomizeDrawer?: () => void;
  onOpenNotificationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDesktop,
  isMobile = false,
  userMenuOpen,
  setUserMenuOpen,
  userMenuHovered,
  setUserMenuHovered,
  handleSignOut,
  getUserMenuStyles,
  showMobileUserMenu = false,
  showNotification = false,
  sidebarCollapsed = false,
  searchQuery: initialSearchQuery = "",
  onOrderNotification,
  quickOrderDrawerOpen = false,
  setQuickOrderDrawerOpen,
  ssnOrderDrawerOpen = false,
  setSSNOrderDrawerOpen,
  customizeDrawerOpen = false,
  setCustomizeDrawerOpen,
  notificationModalOpen = false,
  setNotificationModalOpen,
  onOpenQuickOrderDrawer,
  onOpenSSNOrderDrawer,
  onOpenCustomizeDrawer,
  onOpenNotificationModal,
}) => {
  const navigate = useNavigate();
  const [quickCreateOpen, setQuickCreateOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [showAdvancedSearchModal, setShowAdvancedSearchModal] = React.useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const isSearchActive =
    searchFocused || searchQuery.length > 0 || showAdvancedSearchModal;

  // Enhanced responsive icon sizes with container awareness
  const searchIconSize = useIconSizeEnhanced(20, {
    containerAware: true,
    minSize: 16,
    maxSize: 24,
  });
  const plusIconSize = useIconSizeEnhanced(20, {
    containerAware: true,
    minSize: 16,
    maxSize: 22,
  });
  const notificationIconSize = useIconSizeEnhanced(24, {
    containerAware: true,
    minSize: 18,
    maxSize: 26,
  });

  if (!isDesktop) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: showNotification ? "60px" : 0,
        left: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
        right: 0,
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        zIndex: 20,
        background:
          "linear-gradient(180deg, #FAFAFA 43.75%, rgba(255, 255, 255, 0.00) 100%)",
      }}
    >
      {/* Search Bar */}
      <div style={{ flex: "1 0 0", position: "relative", marginRight: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            border: isSearchActive ? "2px solid #34479A" : "1px solid #D5D7DA",
            background: "#FFF",
            padding: "10px 14px",
            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
            transition: "border 0.2s ease",
          }}
        >
          <svg
            style={{ ...searchIconSize.style, flexShrink: 0 }}
            width={searchIconSize.width}
            height={searchIconSize.height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={searchIconSize.className}
          >
            <path
              d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
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
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              flex: "1 0 0",
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "Public Sans",
              fontSize: "16px",
              fontWeight: 400,
              color: "#181D27",
              lineHeight: "24px",
            }}
          />
          <div
            style={{
              display: "flex",
              padding: "1px 4px",
              alignItems: "center",
              borderRadius: "4px",
              border: "1px solid #E9EAEB",
              background: "#FAFAFA",
              color: "#717680",
              fontFamily: "Public Sans",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: "18px",
              whiteSpace: "nowrap",
            }}
          >
            ⌘K
          </div>
          {isSearchActive && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginLeft: "4px",
              }}
            >
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleClearSearch}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F5F5F5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                style={{
                  display: "flex",
                  width: "24px",
                  height: "24px",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "6px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
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
                    d="M11.3334 4.66669L4.66675 11.3334M4.66675 4.66669L11.3334 11.3334"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span
                aria-hidden="true"
                style={{
                  width: "1px",
                  height: "24px",
                  background: "#E9EAEB",
                }}
              />
              <button
                type="button"
                aria-label="Toggle advanced search"
                aria-pressed={showAdvancedSearch}
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = showAdvancedSearch
                    ? "#ECEEF9"
                    : "#F5F5F5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = showAdvancedSearch
                    ? "#ECEEF9"
                    : "#FFF";
                }}
                style={{
                  display: "flex",
                  width: "24px",
                  height: "24px",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "6px",
                  border: "1px solid #D5D7DA",
                  background: showAdvancedSearch ? "#ECEEF9" : "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
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
                    d="M2 5.33331L10 5.33331M10 5.33331C10 6.43788 10.8954 7.33331 12 7.33331C13.1046 7.33331 14 6.43788 14 5.33331C14 4.22874 13.1046 3.33331 12 3.33331C10.8954 3.33331 10 4.22874 10 5.33331ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56208 2.89543 8.66665 4 8.66665C5.10457 8.66665 6 9.56208 6 10.6666Z"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <AdvancedSearchDropdown
          showAdvancedSearch={showAdvancedSearch}
          advancedSearchForm={advancedSearchForm}
          focusedAdvancedField={focusedAdvancedField}
          onFieldChange={handleAdvancedSearchChange}
          onFieldFocus={setFocusedAdvancedField}
          onClear={clearAdvancedSearch}
          onSearch={handleAdvancedSearch}
          dropdownRef={advancedSearchRef}
          style={{
            width: "280px",
            right: "0",
          }}
        />
      </div>

      {/* Right Side - Quick Create, Notifications, User Menu */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexShrink: 0,
        }}
      >
        {/* Quick Create Button */}
        <div style={{ position: "relative" }}>
          <button
            className="quick-create-button"
            style={{
              display: "flex",
              padding: "12px 16px",
              alignItems: "center",
              gap: "8px",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.12)",
              background: quickCreateOpen ? "#273572" : "#344698",
              boxShadow:
                "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              transition: "all 0.2s ease",
              cursor: "pointer",
              flexShrink: 0,
              minWidth: "fit-content",
            }}
            onClick={() => setQuickCreateOpen(!quickCreateOpen)}
            onMouseEnter={(e) => {
              if (!quickCreateOpen) {
                e.currentTarget.style.background = "#273572";
              }
            }}
            onMouseLeave={(e) => {
              if (!quickCreateOpen) {
                e.currentTarget.style.background = "#344698";
              }
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
              style={plusIconSize.style}
              width={plusIconSize.width}
              height={plusIconSize.height}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={plusIconSize.className}
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

          <QuickCreateDropdown
            isOpen={quickCreateOpen}
            onClose={() => setQuickCreateOpen(false)}
            breakpoint="desktop"
            onOpenDrawer={() => {
              if (onOpenQuickOrderDrawer) onOpenQuickOrderDrawer();
              setQuickCreateOpen(false);
            }}
            onOpenSSNDrawer={() => {
              if (onOpenSSNOrderDrawer) onOpenSSNOrderDrawer();
              setQuickCreateOpen(false);
            }}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              if (onOpenNotificationModal) onOpenNotificationModal();
            }}
            style={{
              display: "flex",
              width: "40px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "6px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F5F5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg
              style={{
                width: "24px",
                height: "24px",
                flexShrink: 0,
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
          </button>

          {/* Notification indicator dot */}
          <div
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              background: "#17B26A",
              borderRadius: "50%",
              border: "1.5px solid #DCFAE6",
            }}
          />
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
              height: "40px",
              background: "#E9EAEB",
            }}
          />
        </div>

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
                width: "200px",
                alignItems: "center",
                gap: "8px",
                overflow: "hidden",
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
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
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

          {/* User Menu Dropdown - Hide when mobile user menu is active */}
          {!showMobileUserMenu && (
            <UserMenuDropdown isOpen={userMenuOpen} onSignOut={handleSignOut} />
          )}
        </div>
      </div>

      {/* Quick Order Drawer */}
      <QuickOrderDrawer
        isOpen={quickOrderDrawerOpen}
        onClose={() =>
          setQuickOrderDrawerOpen && setQuickOrderDrawerOpen(false)
        }
        onOrderSuccess={(orderData) => {
          console.log("Quick Order success callback triggered:", orderData);
          if (onOrderNotification) {
            onOrderNotification({
              title: `Order ${orderData.orderNumber} Created Successfully`,
              description: `${orderData.customerName} will receive an invitation to complete its order ${formatContactText(orderData.email, orderData.phone)}`,
              orderNumber: orderData.orderNumber,
            });
          }
        }}
      />

      {/* SSN Order Drawer */}
      <SSNOrderDrawer
        isOpen={ssnOrderDrawerOpen}
        onClose={() => setSSNOrderDrawerOpen && setSSNOrderDrawerOpen(false)}
        onOrderSuccess={(orderNumber) => {
          console.log("SSN Order success callback triggered:", orderNumber);
          if (onOrderNotification) {
            onOrderNotification({
              title: `Order ${orderNumber} Created Successfully`,
              description:
                "Order submitted using SSN Trace. The user will be notified using the contact information retrieved.",
              orderNumber: orderNumber,
            });
          }
        }}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notificationModalOpen}
        onClose={() =>
          setNotificationModalOpen && setNotificationModalOpen(false)
        }
      />
    </div>
  );
};
