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
            if (content) content.style.backgroundColor = "#F5F5F5";
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
                  left: "4px",
                  top: "0px"
                }}
              >
                <path
                  d="M4.2002 0.75H12.1895L18.6504 7.20996V20C18.6504 21.7949 17.1952 23.2499 15.4004 23.25H4.2002C2.40527 23.25 0.950195 21.7949 0.950195 20V4C0.950196 2.20507 2.40527 0.75 4.2002 0.75Z"
                  stroke="#D5D7DA"
                  strokeWidth="1.5"
                />
                <path
                  d="M12.2002 0.300781V3.20078C12.2002 5.40992 13.9911 7.20078 16.2002 7.20078H19.1002"
                  stroke="#D5D7DA"
                  strokeWidth="1.5"
                />
              </svg>
              <svg
                width="28"
                height="13"
                viewBox="0 0 28 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  left: "-4px",
                  top: "10px"
                }}
              >
                <rect x="0.597168" y="0.863281" width="26.8052" height="11.4751" rx="2" fill="#079455"/>
                <path d="M10.1419 5.50888H8.58651C8.55811 5.30765 8.5001 5.12891 8.41251 4.97266C8.32491 4.81404 8.21246 4.6791 8.07515 4.56783C7.93784 4.45656 7.77922 4.37133 7.5993 4.31214C7.42174 4.25296 7.2288 4.22337 7.02046 4.22337C6.64404 4.22337 6.31615 4.31688 6.0368 4.50391C5.75744 4.68857 5.54082 4.95845 5.38694 5.31357C5.23306 5.66631 5.15612 6.09482 5.15612 6.59908C5.15612 7.11754 5.23306 7.55315 5.38694 7.9059C5.54319 8.25864 5.76099 8.52498 6.04035 8.7049C6.31971 8.88483 6.64286 8.97479 7.00981 8.97479C7.21578 8.97479 7.40635 8.94756 7.58154 8.89311C7.7591 8.83866 7.91653 8.75935 8.05384 8.65518C8.19115 8.54865 8.30479 8.41963 8.39475 8.26811C8.48708 8.1166 8.551 7.94377 8.58651 7.74965L10.1419 7.75675C10.1017 8.09055 10.0011 8.41252 9.84007 8.72266C9.68145 9.03042 9.4672 9.30623 9.19731 9.55007C8.92979 9.79155 8.61019 9.98331 8.2385 10.1254C7.86919 10.265 7.45133 10.3349 6.98495 10.3349C6.33628 10.3349 5.75626 10.1881 5.2449 9.89453C4.7359 9.60097 4.33344 9.17602 4.03751 8.61967C3.74395 8.06333 3.59717 7.3898 3.59717 6.59908C3.59717 5.80599 3.74632 5.13127 4.04461 4.57493C4.34291 4.01858 4.74774 3.59482 5.2591 3.30362C5.77046 3.01006 6.34575 2.86328 6.98495 2.86328C7.40635 2.86328 7.79698 2.92247 8.15683 3.04084C8.51904 3.15921 8.83983 3.33203 9.11919 3.5593C9.39854 3.78421 9.62581 4.06001 9.801 4.38672C9.97856 4.71342 10.0922 5.08748 10.1419 5.50888Z" fill="white"/>
                <path d="M15.1899 5.05433C15.1614 4.76787 15.0395 4.54534 14.8241 4.38672C14.6086 4.2281 14.3163 4.14879 13.947 4.14879C13.696 4.14879 13.4841 4.1843 13.3113 4.25533C13.1385 4.32398 13.0059 4.41986 12.9136 4.54297C12.8236 4.66607 12.7786 4.80575 12.7786 4.962C12.7739 5.09221 12.8011 5.20585 12.8603 5.30291C12.9219 5.39998 13.0059 5.48402 13.1124 5.55504C13.219 5.6237 13.3421 5.68407 13.4818 5.73615C13.6214 5.78587 13.7706 5.82848 13.9292 5.86399L14.5826 6.02024C14.8998 6.09126 15.191 6.18596 15.4562 6.30433C15.7213 6.4227 15.951 6.5683 16.1451 6.74112C16.3392 6.91394 16.4896 7.11754 16.5961 7.35192C16.705 7.58629 16.7606 7.855 16.763 8.15803C16.7606 8.6031 16.647 8.98899 16.4221 9.3157C16.1996 9.64003 15.8776 9.89216 15.4562 10.0721C15.0372 10.2496 14.5317 10.3384 13.9399 10.3384C13.3527 10.3384 12.8414 10.2485 12.4058 10.0685C11.9725 9.88861 11.634 9.62228 11.3901 9.26953C11.1487 8.91442 11.022 8.47526 11.0102 7.95206H12.4981C12.5147 8.1959 12.5845 8.3995 12.7076 8.56286C12.8331 8.72384 13 8.84576 13.2083 8.92862C13.419 9.00911 13.6569 9.04936 13.9221 9.04936C14.1825 9.04936 14.4086 9.01148 14.6004 8.93572C14.7945 8.85997 14.9448 8.75462 15.0514 8.61967C15.1579 8.48473 15.2112 8.32966 15.2112 8.15447C15.2112 7.99112 15.1626 7.85381 15.0656 7.74254C14.9709 7.63127 14.8312 7.53658 14.6465 7.45845C14.4642 7.38033 14.2405 7.3093 13.9754 7.24538L13.1835 7.04652C12.5703 6.89737 12.0862 6.66418 11.731 6.34695C11.3759 6.02971 11.1996 5.60239 11.2019 5.06499C11.1996 4.62464 11.3167 4.23994 11.5535 3.91087C11.7926 3.58179 12.1205 3.32493 12.5372 3.14027C12.9538 2.95561 13.4273 2.86328 13.9576 2.86328C14.4974 2.86328 14.9685 2.95561 15.371 3.14027C15.7758 3.32493 16.0907 3.58179 16.3156 3.91087C16.5405 4.23994 16.6565 4.62109 16.6636 5.05433H15.1899Z" fill="white"/>
                <path d="M19.1112 2.96271L20.869 8.48828H20.9365L22.6978 2.96271H24.4024L21.8953 10.2354H19.9138L17.4031 2.96271H19.1112Z" fill="white"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 400,
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
