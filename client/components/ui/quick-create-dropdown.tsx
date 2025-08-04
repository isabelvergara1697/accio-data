import React from "react";

interface QuickCreateDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  breakpoint: "desktop" | "tablet" | "mobile";
  position?: {
    top: number;
    left: number;
  };
  onOpenDrawer?: () => void;
  onOpenSSNDrawer?: () => void;
}

interface DropdownItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const createDropdownItems = (
  onOpenDrawer?: () => void,
  onOpenSSNDrawer?: () => void,
): DropdownItem[] => [
  {
    id: "order",
    label: "Order",
    icon: (
      <svg
        style={{ width: "24px", height: "24px" }}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z"
          stroke="#A4A7AE"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    onClick: () => {
      if (onOpenDrawer) {
        onOpenDrawer();
      } else {
        console.log("Order clicked");
      }
    },
  },
  {
    id: "order-by-ssn",
    label: "Order by SSN",
    icon: (
      <svg
        style={{ width: "24px", height: "24px" }}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.00002 21.8174C4.6026 22 5.41649 22 6.8 22H17.2C18.5835 22 19.3974 22 20 21.8174M4.00002 21.8174C3.87082 21.7783 3.75133 21.7308 3.63803 21.673C3.07354 21.3854 2.6146 20.9265 2.32698 20.362C2 19.7202 2 18.8802 2 17.2V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H17.2C18.8802 2 19.7202 2 20.362 2.32698C20.9265 2.6146 21.3854 3.07354 21.673 3.63803C22 4.27976 22 5.11984 22 6.8V17.2C22 18.8802 22 19.7202 21.673 20.362C21.3854 20.9265 20.9265 21.3854 20.362 21.673C20.2487 21.7308 20.1292 21.7783 20 21.8174M4.00002 21.8174C4.00035 21.0081 4.00521 20.5799 4.07686 20.2196C4.39249 18.6329 5.63288 17.3925 7.21964 17.0769C7.60603 17 8.07069 17 9 17H15C15.9293 17 16.394 17 16.7804 17.0769C18.3671 17.3925 19.6075 18.6329 19.9231 20.2196C19.9948 20.5799 19.9996 21.0081 20 21.8174M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5Z"
          stroke="#A4A7AE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    onClick: () => {
      if (onOpenSSNDrawer) {
        onOpenSSNDrawer();
      } else {
        console.log("Order by SSN clicked");
      }
    },
  },
];

export const QuickCreateDropdown: React.FC<QuickCreateDropdownProps> = ({
  isOpen,
  onClose,
  breakpoint,
  position,
  onOpenDrawer,
  onOpenSSNDrawer,
}) => {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const dropdownItems = createDropdownItems(onOpenDrawer, onOpenSSNDrawer);

  React.useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element;
        if (target && !target.closest("[data-quick-create-dropdown]")) {
          onClose();
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getDropdownWidth = () => {
    switch (breakpoint) {
      case "mobile":
        return "calc(100vw - 32px)"; // Full width minus 16px padding on each side
      case "tablet":
      case "desktop":
      default:
        return "169px";
    }
  };

  const getDropdownPosition = () => {
    if (position) {
      return {
        position: "absolute" as const,
        top: position.top,
        left: position.left,
      };
    }

    // Mobile: Position 4px below navbar, center aligned with buttons
    if (breakpoint === "mobile") {
      return {
        position: "fixed" as const,
        top: "68px", // 4px below 64px navbar
        left: "16px", // 16px from left edge to match button alignment
        right: "16px", // 16px from right edge
      };
    }

    // Desktop/Tablet: Default positioning relative to button
    return {
      position: "absolute" as const,
      top: "100%",
      left: "-31px",
      marginTop: "8px",
    };
  };

  const handleItemClick = (item: DropdownItem) => {
    item.onClick();
    onClose();
  };

  return (
    <div
      data-quick-create-dropdown
      style={{
        ...getDropdownPosition(),
        width: getDropdownWidth(),
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "8px",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        background: "#FFF",
        boxShadow:
          "0px 12px 16px -4px var(--Colors-Effects-Shadows-shadow-lg_01, rgba(10, 13, 18, 0.08)), 0px 4px 6px -2px var(--Colors-Effects-Shadows-shadow-lg_02, rgba(10, 13, 18, 0.03)), 0px 2px 2px -1px var(--Colors-Effects-Shadows-shadow-lg_03, rgba(10, 13, 18, 0.04))",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "4px 0px",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        {dropdownItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              padding: "1px 6px",
              alignItems: "center",
              alignSelf: "stretch",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item)}
          >
            <div
              style={{
                display: "flex",
                padding: "8px 10px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
                background: hoveredItem === item.id ? "#F5F5F5" : "transparent",
                transition: "background-color 0.15s ease",
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
                {item.icon}
                <div
                  style={{
                    flex: "1 0 0",
                    color: hoveredItem === item.id ? "#252B37" : "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    transition: "color 0.15s ease",
                  }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
