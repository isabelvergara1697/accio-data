import React from "react";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  isSearchActive: boolean;
  isMobile: boolean;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  isSearchActive,
  isMobile,
  placeholder = "Find documents or categories",
  className = "",
}) => {
  return (
    <div
      className={`search-input ${className}`}
      style={{
        display: "flex",
        minHeight: "36px",
        padding: "6px 8px",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
        borderRadius: "8px",
        border: isSearchActive ? "2px solid #34479A" : "1px solid #D5D7DA",
        background: "#FFF",
        boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flex: "1 0 0",
        }}
      >
        <svg
          style={{
            width: isMobile ? "14px" : "16px",
            height: isMobile ? "14px" : "16px",
          }}
          width={isMobile ? "14" : "16"}
          height={isMobile ? "14" : "16"}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={placeholder}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            flex: "1 0 0",
            height: "20px",
            color: "#181D27",
            fontFamily: "'Public Sans'",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "20px",
          }}
        />
      </div>
      {isSearchActive && (
        <button
          onClick={onClearSearch}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            style={{ width: "16px", height: "16px" }}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="#A4A7AE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
