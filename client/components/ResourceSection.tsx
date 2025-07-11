import React from "react";
import { ResourceCard } from "./ResourceCard";

interface ResourceItem {
  id: string;
  name: string;
  size?: string;
  type: "video" | "document";
  description?: string;
  thumbnail?: string;
}

interface ResourceSectionType {
  id: string;
  title: string;
  subtitle?: string;
  count: number;
  isOpen: boolean;
  resources: ResourceItem[];
  gridVariant?: "compact" | "expanded";
}

interface ResourceSectionProps {
  section: ResourceSectionType;
  isOpen: boolean;
  onToggle: (sectionId: string) => void;
  isMobile: boolean;
  isDesktop: boolean;
}

export const ResourceSection: React.FC<ResourceSectionProps> = ({
  section,
  isOpen,
  onToggle,
  isMobile,
  isDesktop,
}) => {
  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      style={{
        width: "16px",
        height: "16px",
        position: "relative",
        transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
        transition: "transform 0.2s ease",
      }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 10L8 6L4 10"
        stroke="#A4A7AE"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const getGridTemplate = () => {
    if (isMobile) {
      return "1fr";
    }

    if (section.gridVariant === "compact") {
      // 2x2 grid for compact video layout
      return "repeat(2, 1fr)";
    }

    // Single column for expanded layout
    return "1fr 1fr";
  };

  const getGridHeight = () => {
    if (
      section.gridVariant === "compact" &&
      section.resources[0]?.type === "video"
    ) {
      return section.resources.length <= 2 ? "256px" : "auto";
    }

    if (section.gridVariant === "expanded") {
      return "auto";
    }

    return "auto";
  };

  return (
    <div
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
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          alignSelf: "stretch",
          background: "#FFF",
          borderRadius: "12px 12px 0px 0px",
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
              {section.subtitle && (
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    alignSelf: "stretch",
                    overflow: "hidden",
                    color: "#535862",
                    textOverflow: "ellipsis",
                    fontFamily: "'Public Sans'",
                    fontSize: "14px",
                    fontStyle: "normal",
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
                    {section.subtitle}
                  </span>
                </div>
              )}
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
              className="section-header-button"
              onClick={() => onToggle(section.id)}
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
            >
              <ChevronIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div
          style={{
            display: "grid",
            height: getGridHeight(),
            padding: "20px 24px",
            rowGap: "16px",
            columnGap: "16px",
            alignSelf: "stretch",
            gridTemplateColumns: getGridTemplate(),
          }}
        >
          {section.resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isMobile={isMobile}
              variant={section.gridVariant || "compact"}
            />
          ))}
        </div>
      )}
    </div>
  );
};
