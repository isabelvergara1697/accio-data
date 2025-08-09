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
            <div style={{ width: "20px", height: "20px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "3px",
                  background: "#079455",
                  color: "#FFF",
                  fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                  lineHeight: "1"
                }}
              >
                CSV
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
            <div style={{ width: "24px", height: "20px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  width: "24px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "3px",
                  background: "#079455",
                  color: "#FFF",
                  fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "8px",
                  fontWeight: 700,
                  lineHeight: "1"
                }}
              >
                XLSX
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
