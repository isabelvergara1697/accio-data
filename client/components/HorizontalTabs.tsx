import React from "react";

interface Tab {
  id: string;
  label: string;
  current?: boolean;
}

interface HorizontalTabsProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
  currentTab: string;
  isMobile?: boolean;
}

export const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  onTabChange,
  currentTab,
  isMobile = false,
}) => {
  const isScrollable = isMobile;
  return (
    <div
      style={{
        display: "flex",
        padding: "4px",
        alignItems: "center",
        gap: "4px",
        alignSelf: "stretch",
        borderRadius: "10px",
        border: "1px solid #E9EAEB",
        background: "#FFF",
        overflowX: isScrollable ? "auto" : "visible",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
      className="scrollable-tabs"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollable-tabs::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        `,
        }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            display: "flex",
            height: "36px",
            padding: "8px 12px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "6px",
            background: currentTab === tab.id ? "#ECEEF9" : "transparent",
            boxShadow:
              currentTab === tab.id
                ? "0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px rgba(10, 13, 18, 0.10)"
                : "none",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            flexShrink: 0,
            minWidth: isMobile ? "auto" : "fit-content",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            if (currentTab !== tab.id) {
              e.currentTarget.style.background = "#F5F5F5";
            }
          }}
          onMouseLeave={(e) => {
            if (currentTab !== tab.id) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <div
            style={{
              color: currentTab === tab.id ? "#273572" : "#717680",
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
                color: currentTab === tab.id ? "#273572" : "#717680",
              }}
            >
              {tab.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
