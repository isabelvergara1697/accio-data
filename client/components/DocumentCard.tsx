import React from "react";

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface DocumentCardProps {
  document: Document;
  isMobile: boolean;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  isMobile,
}) => {
  const FileIcon = () => (
    <div className="relative w-10 h-10">
      <svg
        className="w-8 h-10 absolute left-2 top-0"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 0.75H20C20.1212 0.75 20.2375 0.798089 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
          stroke="#D5D7DA"
          strokeWidth="1.5"
        />
        <path
          d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
          stroke="#D5D7DA"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute left-1 top-4 w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
        <span className="text-white font-bold" style={{ fontSize: "8px" }}>
          PDF
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="document-card"
      style={{
        display: "flex",
        height: "92px",
        padding: "16px",
        alignItems: "center",
        gap: "4px",
        borderRadius: "12px",
        border: "1px solid #E9EAEB",
        background: "#FFF",
        cursor: "pointer",
        width: isMobile ? "100%" : "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          flex: "1 0 0",
        }}
      >
        <FileIcon />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
            flex: "1 0 0",
            alignSelf: "stretch",
          }}
        >
          <div
            className={isMobile ? "mobile-file-name" : ""}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: isMobile ? 2 : 1,
              alignSelf: "stretch",
              overflow: "hidden",
              color: "#414651",
              textOverflow: "ellipsis",
              fontFamily: "'Public Sans'",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(65,70,81,1)",
              }}
            >
              {document.name}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                color: "#535862",
                fontFamily: "'Public Sans'",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "18px",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(83,88,98,1)",
                }}
              >
                {document.size}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <button
          className="action-button"
          style={{
            display: "flex",
            padding: "6px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "6px",
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
              d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
              stroke="#A4A7AE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
              stroke="#A4A7AE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="action-button"
          style={{
            display: "flex",
            padding: "6px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "6px",
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
              d="M21 21H3M18 11L12 17M12 17L6 11M12 17V3"
              stroke="#A4A7AE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
