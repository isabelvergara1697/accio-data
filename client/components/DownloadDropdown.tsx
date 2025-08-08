import React from "react";

interface DownloadDropdownProps {
  onDownloadCSV: () => void;
  onDownloadXLSX: () => void;
  downloadDropdownRef?: React.RefObject<HTMLDivElement>;
}

export const DownloadDropdown: React.FC<DownloadDropdownProps> = ({
  onDownloadCSV,
  onDownloadXLSX,
  downloadDropdownRef,
}) => {
  return (
    <div
      ref={downloadDropdownRef}
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        right: "0",
        width: "172px",
        borderRadius: "8px",
        border: "1px solid rgba(10, 13, 18, 0.04)",
        background: "rgba(255, 255, 255, 1)",
        boxShadow:
          "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "4px 0",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        {/* Download CSV */}
        <div
          style={{
            display: "flex",
            padding: "1px 6px",
            alignItems: "center",
            alignSelf: "stretch",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const content = e.currentTarget.querySelector(".content") as HTMLElement;
            if (content) content.style.backgroundColor = "#FDFDFD";
          }}
          onMouseLeave={(e) => {
            const content = e.currentTarget.querySelector(".content") as HTMLElement;
            if (content) content.style.backgroundColor = "transparent";
          }}
          onClick={onDownloadCSV}
        >
          <div
            className="content"
            style={{
              display: "flex",
              padding: "8px",
              alignItems: "center",
              gap: "8px",
              flex: "1 0 0",
              borderRadius: "6px",
              transition: "background-color 0.2s ease",
            }}
          >
            {/* CSV File Icon */}
            <div style={{ width: "24px", height: "24px", position: "relative" }}>
              <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  left: "2px",
                  top: "0px"
                }}
              >
                <path
                  d="M4.2002 0.75H12.1895L18.6504 7.20996V20C18.6504 21.7949 17.1952 23.2499 15.4004 23.25H4.2002C2.40527 23.25 0.950195 21.7949 0.950195 20V4C0.950196 2.20508 2.40527 0.75 4.2002 0.75Z"
                  stroke="#D5D7DA"
                  strokeWidth="1.5"
                />
                <path
                  d="M12.2002 0.300781V3.20078C12.2002 5.40992 13.9911 7.20078 16.2002 7.20078H19.1002"
                  stroke="#D5D7DA"
                  strokeWidth="1.5"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: "-3px",
                  top: "8px",
                  display: "inline-flex",
                  padding: "2px 3px",
                  alignItems: "center",
                  borderRadius: "2px",
                  background: "#079455",
                  width: "28px",
                  height: "16px",
                  justifyContent: "center"
                }}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "normal"
                  }}
                >
                  CSV
                </span>
              </div>
            </div>
            <span
              style={{
                fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#181D27",
                lineHeight: "20px"
              }}
            >
              Download CSV
            </span>
          </div>
        </div>
        
        {/* Download XLSX */}
        <div
          style={{
            display: "flex",
            padding: "1px 6px",
            alignItems: "center",
            alignSelf: "stretch",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const content = e.currentTarget.querySelector(".content") as HTMLElement;
            if (content) content.style.backgroundColor = "#FDFDFD";
          }}
          onMouseLeave={(e) => {
            const content = e.currentTarget.querySelector(".content") as HTMLElement;
            if (content) content.style.backgroundColor = "transparent";
          }}
          onClick={onDownloadXLSX}
        >
          <div
            className="content"
            style={{
              display: "flex",
              padding: "8px",
              alignItems: "center",
              gap: "8px",
              flex: "1 0 0",
              borderRadius: "6px",
              transition: "background-color 0.2s ease",
            }}
          >
            {/* XLSX File Icon */}
            <div style={{ width: "24px", height: "24px", position: "relative" }}>
              <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  left: "2px",
                  top: "0px"
                }}
              >
                <path
                  d="M4.2002 0.75H12.1895L18.6504 7.20996V20C18.6504 21.7949 17.1952 23.2499 15.4004 23.25H4.2002C2.40527 23.25 0.950195 21.7949 0.950195 20V4C0.950196 2.20508 2.40527 0.75 4.2002 0.75Z"
                  stroke="#D5D7DA"
                  strokeWidth="1.5"
                />
                <path
                  d="M12.2002 0.300781V3.20078C12.2002 5.40992 13.9911 7.20078 16.2002 7.20078H19.1002"
                  stroke="#D5D7DA"
                  strokeWidth="1.5"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: "-4px",
                  top: "8px",
                  display: "inline-flex",
                  padding: "2px 3px",
                  alignItems: "center",
                  borderRadius: "2px",
                  background: "#079455",
                  width: "33px",
                  height: "16px",
                  justifyContent: "center"
                }}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "normal"
                  }}
                >
                  XLSX
                </span>
              </div>
            </div>
            <span
              style={{
                fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#181D27",
                lineHeight: "20px"
              }}
            >
              Download XLSX
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
