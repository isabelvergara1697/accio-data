import React, { useState } from "react";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { QuickCreateDropdown } from "./ui/quick-create-dropdown";
import QuickOrderDrawer from "./ui/quick-order-drawer";
import NotificationModal from "./ui/notification-modal";

interface MobileHeaderProps {
  isDesktop: boolean;
  isMobile: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  userMenuHovered: boolean;
  setUserMenuHovered: (hovered: boolean) => void;
  handleSignOut: () => void;
  getUserMenuStyles: () => object;
  showMobileUserMenu?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isDesktop,
  isMobile,
  setMobileMenuOpen,
  userMenuOpen,
  setUserMenuOpen,
  userMenuHovered,
  setUserMenuHovered,
  handleSignOut,
  getUserMenuStyles,
  showMobileUserMenu = false,
}) => {
  const [quickCreateOpen, setQuickCreateOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  if (isDesktop) return null;

  return (
    <div
      className="w-full fixed top-0 left-0 right-0 z-50"
      style={{
        display: "flex",
        height: "64px",
        padding: "12px 8px 12px 16px",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#FFF",
        borderBottom: "1px solid #E9EAEB",
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
            alt="Union"
          />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "8px" : "12px",
        }}
      >
        {/* Quick Create Button */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <button
            className="quick-create-button"
            style={{
              display: "flex",
              padding: "12px",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "0px" : "4px",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.12)",
              background: quickCreateOpen ? "#273572" : "#344698",
              boxShadow:
                "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onClick={() => setQuickCreateOpen(!quickCreateOpen)}
            onMouseEnter={(e) => {
              if (!quickCreateOpen) {
                e.currentTarget.style.background = "#2A3A82";
              }
            }}
            onMouseLeave={(e) => {
              if (!quickCreateOpen) {
                e.currentTarget.style.background = "#344698";
              }
            }}
          >
            {!isMobile && (
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
                    color: "rgba(255,255,255,1)",
                  }}
                >
                  Quick Create
                </span>
              </div>
            )}
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

          <QuickCreateDropdown
            isOpen={quickCreateOpen}
            onClose={() => setQuickCreateOpen(false)}
            breakpoint={isMobile ? "mobile" : "tablet"}
            onOpenDrawer={() => {
              setDrawerOpen(true);
              setQuickCreateOpen(false);
            }}
          />
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
            onClick={() => setNotificationModalOpen(true)}
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

        {/* Divider - Hide on mobile */}
        {!isMobile && (
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
        )}

        {/* User Profile Menu - Hide on mobile */}
        {!isMobile && (
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
                  minWidth: "120px",
                  maxWidth: "180px",
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
              <UserMenuDropdown
                isOpen={userMenuOpen}
                onSignOut={handleSignOut}
              />
            )}
          </div>
        )}

        {/* Hamburger Menu - On mobile and tablet */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          style={{
            display: "flex",
            padding: "8px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
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
              d="M3 12H15M3 6H21M3 18H21"
              stroke="#A4A7AE"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Quick Order Drawer */}
      <QuickOrderDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
