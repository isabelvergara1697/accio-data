import React from "react";

interface TableLoadingStateProps {
  onClose?: () => void;
}

export const TableLoadingState: React.FC<TableLoadingStateProps> = ({
  onClose,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        alignSelf: "stretch",
        padding: "60px 16px",
        justifyContent: "center",
        minHeight: "500px",
      }}
    >
      {/* Loading Icon */}
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
          style={{
            animation: "spin 1s linear infinite",
          }}
        >
          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
          <path
            d="M12 2.25V4.75M12 18V22M5.75 12H2.25M21.25 12H19.75M18.4571 18.4571L17.75 17.75M18.6642 5.41579L17.25 6.83M4.92157 19.0784L7.75 16.25M5.12868 5.20868L7.25 7.33"
            stroke="#414651"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          maxWidth: "352px",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#181D27",
            fontFamily:
              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "24px",
          }}
        >
          Data Loaded Successfully
        </div>
        <div
          style={{
            color: "#535862",
            fontFamily:
              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          Please wait while we calculate your total and verify the spreadsheet
          data. This can take several minutes for large uploads.
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          display: "flex",
          width: "320px",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            height: "8px",
            flex: "1 0 0",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "8px",
              borderRadius: "9999px",
              background: "#D5D7DA",
            }}
          />
          <div
            style={{
              width: "20%",
              height: "8px",
              borderRadius: "9999px",
              background: "#344698",
              position: "absolute",
              top: "0",
              left: "0",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div
          style={{
            color: "#414651",
            fontFamily:
              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
          }}
        >
          20%
        </div>
      </div>

      {/* Admin and User Section */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "412px",
          padding: "16px",
          alignItems: "flex-start",
          gap: "8px",
          borderRadius: "8px",
          border: "1px solid #D5D7DA",
          background: "#FAFAFA",
        }}
      >
        {/* Admin Input */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "6px",
            flex: "1 0 0",
          }}
        >
          <div
            style={{
              color: "#414651",
              fontFamily:
                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            Admin
          </div>
          <div
            style={{
              display: "flex",
              height: "32px",
              padding: "6px 8px",
              alignItems: "center",
              gap: "8px",
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FAFAFA",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            }}
          >
            <div
              style={{
                color: "#717680",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px",
              }}
            >
              CSD
            </div>
          </div>
        </div>

        {/* User Input */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "6px",
            flex: "1 0 0",
          }}
        >
          <div
            style={{
              color: "#414651",
              fontFamily:
                "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            User
          </div>
          <div
            style={{
              display: "flex",
              height: "32px",
              padding: "6px 8px",
              alignItems: "center",
              gap: "8px",
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FAFAFA",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            }}
          >
            <div
              style={{
                color: "#717680",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px",
              }}
            >
              Rjones
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLoadingState;
