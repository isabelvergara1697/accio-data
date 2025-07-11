import React from "react";

interface SearchEmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
  isMobile?: boolean;
}

export const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({
  searchQuery,
  onClearSearch,
  isMobile = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        position: "relative",
        minHeight: "400px",
        padding: isMobile ? "40px 16px" : "60px 32px",
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* Background pattern decorative */}
      <div
        style={{
          position: "absolute",
          width: "480px",
          height: "480px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.00) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(233, 234, 235, 0.5) 25%, rgba(233, 234, 235, 0.5) 26%, transparent 27%, transparent 74%, rgba(233, 234, 235, 0.5) 75%, rgba(233, 234, 235, 0.5) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(233, 234, 235, 0.5) 25%, rgba(233, 234, 235, 0.5) 26%, transparent 27%, transparent 74%, rgba(233, 234, 235, 0.5) 75%, rgba(233, 234, 235, 0.5) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          position: "relative",
          zIndex: 2,
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Content section */}
        <div
          style={{
            display: "flex",
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
              width: "48px",
              height: "48px",
              padding: "12px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow:
                "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                stroke="#414651"
                strokeWidth="2"
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
            <div
              style={{
                alignSelf: "stretch",
                color: "#181D27",
                textAlign: "center",
                fontFamily: "'Public Sans'",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "rgba(24,29,39,1)",
                }}
              >
                No results found
              </span>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                textAlign: "center",
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
                Your search "{searchQuery}" did not match any projects. Please
                try again.
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            width: "100%",
          }}
        >
          <button
            onClick={onClearSearch}
            style={{
              display: "flex",
              padding: "12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow:
                "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
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
                padding: "0px 2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#414651",
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
                    color: "rgba(65,70,81,1)",
                  }}
                >
                  Clear search
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
