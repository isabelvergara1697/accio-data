import React, { useRef, useEffect } from "react";

interface OrdersFiltersDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export const OrdersFiltersDropdown: React.FC<OrdersFiltersDropdownProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Position dropdown relative to trigger button
  useEffect(() => {
    if (isOpen && dropdownRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownEl = dropdownRef.current;
      
      // Position below the trigger button
      dropdownEl.style.position = "fixed";
      dropdownEl.style.top = `${triggerRect.bottom + 8}px`;
      dropdownEl.style.left = `${triggerRect.left}px`;
      dropdownEl.style.zIndex = "9999";
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        display: "flex",
        width: "240px",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "8px",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        background: "#FFF",
        boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
        position: "fixed",
      }}
    >
      {/* Menu items */}
      <div
        style={{
          display: "flex",
          padding: "4px 0",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        {/* Content */}
        <div
          style={{
            display: "flex",
            padding: "12px",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
          }}
        >
          {/* Featured icon */}
          <div
            style={{
              display: "flex",
              width: "32px",
              height: "32px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              aspectRatio: "1/1",
              borderRadius: "6px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                d="M3.3335 14V9.33333M3.3335 6.66667V2M8.00016 14V8M8.00016 5.33333V2M12.6668 14V10.6667M12.6668 8V2M1.3335 9.33333H5.3335M6.00016 5.33333H10.0002M10.6668 10.6667H14.6668"
                stroke="#414651"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text content */}
          <div
            style={{
              display: "flex",
              maxWidth: "352px",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              alignSelf: "stretch",
            }}
          >
            {/* Title */}
            <div
              style={{
                alignSelf: "stretch",
                color: "#181D27",
                textAlign: "center",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              No filter selected
            </div>

            {/* Supporting text */}
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                textAlign: "center",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Select your by clicking the filter button in the column and manage your selection here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
