import React from "react";
import { DocumentCard } from "./DocumentCard";

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface DocumentSectionType {
  id: string;
  title: string;
  count: number;
  isOpen: boolean;
  documents: Document[];
}

interface DocumentSectionProps {
  section: DocumentSectionType;
  isOpen: boolean;
  onToggle: (sectionId: string) => void;
  isMobile: boolean;
  isDesktop: boolean;
}

export const DocumentSection: React.FC<DocumentSectionProps> = ({
  section,
  isOpen,
  onToggle,
  isMobile,
  isDesktop,
}) => {
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
        overflow: "hidden",
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
            padding: isMobile ? "16px 16px 0px 16px" : "24px 24px 4px 24px",
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
              className="section-header-button"
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
              onClick={() => onToggle(section.id)}
            >
              <svg
                style={{
                  width: "16px",
                  height: "16px",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
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
        {isOpen ? (
          <div
            className={
              isMobile
                ? "mobile-document-grid"
                : !isDesktop && !isMobile
                  ? "tablet-document-grid"
                  : ""
            }
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "16px",
              padding: isMobile ? "20px 16px" : "20px 24px",
              alignSelf: "stretch",
            }}
          >
            {section.documents.map((doc) => (
              <DocumentCard key={doc.id} document={doc} isMobile={isMobile} />
            ))}
          </div>
        ) : (
          // Closed state with equal 20px top and bottom padding
          <div
            style={{
              padding: isMobile ? "0px 16px 16px 16px" : "4px 24px 24px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          ></div>
        )}
      </div>
    </div>
  );
};
