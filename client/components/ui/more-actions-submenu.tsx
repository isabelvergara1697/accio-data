import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FileDown,
  FileSearch,
  Archive,
  FileQuestion,
  UploadCloud,
  Mail,
  Bell,
  PlusCircle
} from "lucide-react";

interface MoreActionsSubmenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
  position?: { x: number; y: number };
  isMobile?: boolean;
  isSticky?: boolean;
  onAddI9Click?: () => void;
  onAddAkasClick?: () => void;
  onAddToOrderClick?: () => void;
}

type MenuItem = {
  label: string;
  action: string;
  icon: React.ElementType;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    title: "Create Subject Specific Documents",
    items: [
      { label: "Pre-Adverse General", action: "pre-adverse-general", icon: FileDown },
      { label: "Adverse Action Letter", action: "adverse-action-letter", icon: FileDown },
    ],
  },
  {
    title: "Manage Order",
    items: [
      { label: "Order Additional Searches (As a New Order)", action: "order-additional-searches", icon: FileSearch },
      { label: "Order Criminal Records", action: "order-criminal-records", icon: FileSearch },
      { label: "Archive Order", action: "archive-order", icon: Archive },
      { label: "Adverse Action Process", action: "adverse-action-process", icon: FileQuestion },
    ],
  },
  {
    title: "Documents",
    items: [
      { label: "Upload Applicant Release Form", action: "upload-applicant-release", icon: UploadCloud },
      { label: "Download and Fax Applicant Release Form", action: "download-fax-release", icon: FileDown },
      { label: "Upload Supporting Documents", action: "upload-supporting-docs", icon: UploadCloud },
      { label: "View all Attached Documents", action: "view-attached-docs", icon: FileDown },
      { label: "Request Document Upload from Applicant", action: "request-doc-upload", icon: FileDown },
    ],
  },
  {
    title: "Other Actions",
    items: [
      { label: "Email this Report's Requester", action: "email-requester", icon: Mail },
      { label: "Email this Report's Ordering User", action: "email-ordering-user", icon: Mail },
      { label: "Send copy of Report to Applicant", action: "send-report-copy", icon: Mail },
      { label: "Email me when Background Check is complete", action: "email-completion-notification", icon: Bell },
      { label: "Customer Service Inquiry", action: "customer-service", icon: FileDown },
    ],
  },
];

const MENU_MAX_HEIGHT = 520;

export const MoreActionsSubmenu: React.FC<MoreActionsSubmenuProps> = ({
  isOpen,
  onClose,
  onAction,
  position = { x: 0, y: 0 },
  isMobile = false,
  isSticky = false,
  onAddI9Click,
  onAddAkasClick,
  onAddToOrderClick
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useLayoutEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      setMenuHeight(rect.height);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const showMobileStickyButtons = isMobile && isSticky;

  const menuWidth = viewportWidth
    ? showMobileStickyButtons
      ? Math.max(0, viewportWidth - 32)
      : Math.min(350, viewportWidth - 32)
    : 350;
  const maxHeight = viewportHeight ? Math.min(MENU_MAX_HEIGHT, viewportHeight - 32) : MENU_MAX_HEIGHT;


  const handleAction = (action: string) => {
    onAction(action);
    onClose();
  };

  const handleAddI9 = () => {
    onAddI9Click?.();
    onClose();
  };

  const handleAddAkas = () => {
    onAddAkasClick?.();
    onClose();
  };

  const handleAddToOrder = () => {
    onAddToOrderClick?.();
    onClose();
  };

  let adjustedX = position.x;
  if (viewportWidth) {
    const maxLeft = viewportWidth - menuWidth - 16;
    adjustedX = Math.min(adjustedX, Math.max(16, maxLeft));
    adjustedX = Math.max(16, adjustedX);
  }

  let adjustedY = position.y + 8;
  if (viewportHeight && menuHeight) {
    const maxTop = viewportHeight - menuHeight - 16;
    adjustedY = Math.min(adjustedY, Math.max(16, maxTop));
    adjustedY = Math.max(16, adjustedY);
  } else if (viewportHeight) {
    adjustedY = Math.max(16, Math.min(adjustedY, viewportHeight - 400));
  }

  const menuContent = (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
        onClick={onClose}
      />

      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: adjustedY,
          left: adjustedX,
          zIndex: 1000,
          display: "flex",
          width: menuWidth,
          maxHeight,
          flexDirection: "column",
          alignItems: "stretch",
          borderRadius: "12px 12px 16px 16px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", padding: "6px 0" }}>
          {showMobileStickyButtons && (
            <>
              {/* Top Action Buttons - Mobile Sticky Only */}
              <div style={{ display: "flex", padding: "6px 12px", flexDirection: "column", alignItems: "stretch", gap: "8px" }}>
                {/* Add I-9 Button */}
                <button
                  type="button"
                  onClick={handleAddI9}
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", padding: "0 2px", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                      Add I-9
                    </div>
                  </div>
                  <PlusCircle style={{ width: "16px", height: "16px", color: "#A4A7AE" }} />
                </button>

                {/* Add AKAs Button */}
                <button
                  type="button"
                  onClick={handleAddAkas}
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", padding: "0 2px", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                      Add AKAs
                    </div>
                  </div>
                  <PlusCircle style={{ width: "16px", height: "16px", color: "#A4A7AE" }} />
                </button>

                {/* Add to this Order Button */}
                <button
                  type="button"
                  onClick={handleAddToOrder}
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: "#344698",
                    boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", padding: "0 2px", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ color: "#FFF", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                      Add to this Order
                    </div>
                  </div>
                </button>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "#E9EAEB", margin: "4px 0" }} />
            </>
          )}

          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
              <div
                style={{
                  display: "flex",
                  padding: "6px 12px 4px 12px",
                  alignItems: "center",
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                {section.title}
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.action}
                    type="button"
                    onClick={() => handleAction(item.action)}
                    style={{
                      display: "flex",
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      const content = e.currentTarget.firstElementChild as HTMLElement | null;
                      if (content) {
                        content.style.background = "#F9FAFB";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const content = e.currentTarget.firstElementChild as HTMLElement | null;
                      if (content) {
                        content.style.background = "transparent";
                      }
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        padding: "8px 12px",
                        alignItems: "center",
                        gap: "12px",
                        borderRadius: "6px",
                        transition: "background 0.2s ease",
                      }}
                    >
                      <Icon
                        style={{
                          width: "16px",
                          height: "16px",
                          color: "#717680",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          flex: 1,
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          textAlign: "left",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}

              {sectionIndex !== menuSections.length - 1 && (
                <div
                  style={{
                    height: "1px",
                    background: "#E9EAEB",
                    margin: "4px 0",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return createPortal(menuContent, document.body);
};
