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
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                        .tabs-container {
              display: flex;
              padding: 4px;
              ${isMobile ? "padding-right: 20px;" : ""}
              align-items: center;
              gap: 4px;
              align-self: stretch;
              border-radius: 10px;
              border: 1px solid #E9EAEB;
              background: #FFF;
              overflow-x: ${isMobile ? "auto" : "visible"};
              overflow-y: hidden;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
              -ms-overflow-style: none;
              ${isMobile ? "touch-action: pan-x;" : ""}
              ${isMobile ? "scroll-behavior: smooth;" : ""}
            }

            .tabs-container::-webkit-scrollbar {
              display: none;
              width: 0;
              height: 0;
            }

            .tab-button {
              display: flex;
              height: 36px;
              padding: 8px 12px;
              justify-content: center;
              align-items: center;
              gap: 8px;
              border-radius: 6px;
              border: none;
              cursor: pointer;
              transition: all 0.2s ease;
              flex-shrink: 0;
              white-space: nowrap;
              min-width: fit-content;
            }
          `,
        }}
      />
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="tab-button"
            style={{
              background: currentTab === tab.id ? "#ECEEF9" : "transparent",
              boxShadow:
                currentTab === tab.id
                  ? "0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px rgba(10, 13, 18, 0.10)"
                  : "none",
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
    </>
  );
};
