import React, { useRef, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResourceItem {
  id: string;
  name: string;
  size?: string;
  date?: string;
  type: "video" | "document";
  description?: string;
  thumbnail?: string;
  documentType?: "pdf" | "pptx" | "docx";
}

interface ResourceCardProps {
  resource: ResourceItem;
  isMobile: boolean;
  variant?: "compact" | "expanded";
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isMobile,
  variant = "compact",
}) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (descriptionRef.current && resource.description) {
        const element = descriptionRef.current;
        // Check if text is truncated by comparing scroll dimensions
        const isOverflowing =
          element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth;
        setIsDescriptionTruncated(isOverflowing);
      } else {
        setIsDescriptionTruncated(false);
      }
    };

    // Use a small delay to ensure the element is rendered
    const timeoutId = setTimeout(checkTruncation, 10);

    const handleResize = () => {
      setTimeout(checkTruncation, 10);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [resource.description, variant]);
  const VideoThumbnail = () => (
    <div
      style={{
        display: "flex",
        width: "71px",
        height: "40px",
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: "71/40",
        borderRadius: "8px",
        border: "0.5px solid rgba(0, 0, 0, 0.10)",
        background: resource.thumbnail
          ? `url(${resource.thumbnail}) lightgray 50% / cover no-repeat`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "71px",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          background: "rgba(0, 0, 0, 0.10)",
          position: "absolute",
          left: 0,
          top: 0,
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "24px",
            height: "24px",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            borderRadius: "9999px",
            backdropFilter: "blur(8px)",
            position: "relative",
          }}
        >
          <svg
            style={{
              width: "16px",
              height: "16px",
              flexShrink: 0,
              position: "relative",
            }}
            width="16"
            height="16"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.42155 2.33515C8.43151 2.34179 8.4415 2.34846 8.45153 2.35514L17.2421 8.21555C17.4965 8.38508 17.7323 8.54228 17.9135 8.68835C18.1025 8.8408 18.3253 9.05219 18.4536 9.36145C18.6231 9.7702 18.6231 10.2296 18.4536 10.6383C18.3253 10.9476 18.1025 11.159 17.9135 11.3114C17.7323 11.4575 17.4965 11.6147 17.2422 11.7842L8.42157 17.6646C8.11067 17.8719 7.8311 18.0583 7.59388 18.1869C7.35649 18.3155 7.03065 18.4625 6.65034 18.4398C6.16388 18.4108 5.7145 18.1703 5.42049 17.7816C5.19064 17.4778 5.13222 17.1251 5.10758 16.8563C5.08296 16.5876 5.08298 16.2516 5.08301 15.8779L5.08301 4.15792C5.08301 4.14587 5.08301 4.13386 5.08301 4.12188C5.08298 3.74822 5.08296 3.41222 5.10758 3.14354C5.13222 2.87466 5.19064 2.52199 5.42049 2.21815C5.7145 1.8295 6.16388 1.589 6.65034 1.55996C7.03065 1.53725 7.35649 1.68426 7.59388 1.81291C7.8311 1.94146 8.11065 2.12786 8.42155 2.33515Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  const DocumentIcon = () => {
    const getDocumentInfo = () => {
      const docType = resource.documentType || "pdf";
      switch (docType) {
        case "pptx":
          return {
            label: "PPTX",
            bgColor: "#E62E05", // Orange
            width: "33px",
          };
        case "docx":
          return {
            label: "DOCX",
            bgColor: "#155EEF", // Blue
            width: "36px",
          };
        default:
          return {
            label: "PDF",
            bgColor: "#D92D20", // Red
            width: "26px",
          };
      }
    };

    const docInfo = getDocumentInfo();

    return (
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
        <div
          className="absolute left-1 top-4 h-4 rounded-sm flex items-center justify-center"
          style={{
            backgroundColor: docInfo.bgColor,
            width: docInfo.width,
            padding: "2px 3px",
          }}
        >
          <span className="text-white font-bold" style={{ fontSize: "10px" }}>
            {docInfo.label}
          </span>
        </div>
      </div>
    );
  };

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
        width: "100%",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems:
            variant === "compact" && resource.type === "video"
              ? "center"
              : "flex-start",
          gap: "12px",
          flex: "1 0 0",
          width: "100%",
        }}
      >
        {resource.type === "video" ? <VideoThumbnail /> : <DocumentIcon />}
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
              {resource.name}
            </span>
          </div>
          {resource.date && resource.type === "video" && (
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
                  {resource.date}
                </span>
              </div>
            </div>
          )}
          {resource.description && variant === "expanded" && (
            <div
              style={{
                display: "flex",
                height: "18px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              {isDescriptionTruncated ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      ref={descriptionRef}
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        alignSelf: "stretch",
                        overflow: "hidden",
                        color: "#535862",
                        textOverflow: "ellipsis",
                        fontFamily: "'Public Sans'",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        cursor: "help",
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
                        {resource.description}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-xs z-50"
                    style={{
                      background: "#0A0D12",
                      color: "#FFF",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      fontFamily: "'Public Sans'",
                      boxShadow:
                        "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
                    }}
                  >
                    {resource.description}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div
                  ref={descriptionRef}
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    alignSelf: "stretch",
                    overflow: "hidden",
                    color: "#535862",
                    textOverflow: "ellipsis",
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
                    {resource.description}
                  </span>
                </div>
              )}
            </div>
          )}
          {resource.size && resource.type === "document" && (
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
                  {resource.size}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: resource.type === "video" ? "10px" : "4px",
        }}
      >
        {resource.type === "video" && (
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
                d="M5 4.98951C5 4.01835 5 3.53277 5.20249 3.2651C5.37889 3.03191 5.64852 2.88761 5.9404 2.87018C6.27544 2.85017 6.67946 3.11953 7.48752 3.65823L18.0031 10.6686C18.6708 11.1137 19.0046 11.3363 19.1209 11.6168C19.2227 11.8621 19.2227 12.1377 19.1209 12.383C19.0046 12.6635 18.6708 12.886 18.0031 13.3312L7.48752 20.3415C6.67946 20.8802 6.27544 21.1496 5.9404 21.1296C5.64852 21.1122 5.37889 20.9679 5.20249 20.7347C5 20.467 5 19.9814 5 19.0103V4.98951Z"
                stroke="#A4A7AE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {resource.type === "document" && (
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
        )}
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
