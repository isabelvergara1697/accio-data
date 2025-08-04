import React, { useState } from "react";
import { WidgetContainer } from "./widget-container";

interface Task {
  id: string;
  orderNumber: string;
  customerName: string;
  description: string;
  iconType: "alert" | "eye" | "search" | "bell" | "file-search";
}

interface AssignedTasksWidgetProps {
  id: string;
  position: number;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  onResize: (
    widgetId: string,
    newSize: "xs" | "sm" | "md" | "lg" | "xl",
  ) => void;
  isMobile: boolean;
  isTablet: boolean;
  windowWidth: number;
}

export const AssignedTasksWidget: React.FC<AssignedTasksWidgetProps> = ({
  id,
  position,
  size,
  onResize,
  isMobile,
  isTablet,
  windowWidth,
}) => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const tasks: Task[] = [
    {
      id: "1",
      orderNumber: "473829",
      customerName: "Emily Carter",
      description: "Review flagged background report for applicant",
      iconType: "alert",
    },
    {
      id: "2",
      orderNumber: "158374",
      customerName: "Michael Thompson",
      description: "Follow up on pending consent form for ScreenDoor applicant",
      iconType: "eye",
    },
    {
      id: "3",
      orderNumber: "629485",
      customerName: "Sophia Williams",
      description: "Verify court record data for case",
      iconType: "search",
    },
    {
      id: "4",
      orderNumber: "384920",
      customerName: "James Anderson",
      description: "Resolve failed document upload",
      iconType: "search",
    },
    {
      id: "5",
      orderNumber: "752913",
      customerName: "Olivia Brown",
      description: "Send reminder email to applicant to complete form",
      iconType: "bell",
    },
    {
      id: "6",
      orderNumber: "846201",
      customerName: "Liam Johnson",
      description: "Assign flagged order to support team for review",
      iconType: "file-search",
    },
  ];

  const renderTaskIcon = (iconType: string) => {
    const iconProps = {
      width: "16",
      height: "16",
      stroke: "#34479A",
      strokeWidth: "1.5",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
    };

    switch (iconType) {
      case "alert":
        return (
          <svg {...iconProps} viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_alert)">
              <path d="M8.00016 5.33337V8.00004M8.00016 10.6667H8.00683M14.6668 8.00004C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8.00004C1.3335 4.31814 4.31826 1.33337 8.00016 1.33337C11.6821 1.33337 14.6668 4.31814 14.6668 8.00004Z" />
            </g>
            <defs>
              <clipPath id="clip0_alert">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "eye":
        return (
          <svg {...iconProps} viewBox="0 0 16 16" fill="none">
            <path d="M1.61342 8.47549C1.52262 8.33173 1.47723 8.25985 1.45182 8.14898C1.43273 8.06571 1.43273 7.93437 1.45182 7.8511C1.47723 7.74023 1.52262 7.66835 1.61341 7.52459C2.36369 6.3366 4.59693 3.33337 8.00027 3.33337C11.4036 3.33337 13.6369 6.3366 14.3871 7.52459C14.4779 7.66835 14.5233 7.74023 14.5487 7.8511C14.5678 7.93437 14.5678 8.06571 14.5487 8.14898C14.5233 8.25985 14.4779 8.33173 14.3871 8.47549C13.6369 9.66348 11.4036 12.6667 8.00027 12.6667C4.59693 12.6667 2.36369 9.66348 1.61342 8.47549Z" />
            <path d="M8.00027 10C9.10484 10 10.0003 9.10461 10.0003 8.00004C10.0003 6.89547 9.10484 6.00004 8.00027 6.00004C6.8957 6.00004 6.00027 6.89547 6.00027 8.00004C6.00027 9.10461 6.8957 10 8.00027 10Z" />
          </svg>
        );
      case "search":
        return (
          <svg {...iconProps} viewBox="0 0 16 16" fill="none">
            <path d="M9.33317 1.51306V4.26676C9.33317 4.64012 9.33317 4.82681 9.40583 4.96942C9.46975 5.09486 9.57173 5.19684 9.69718 5.26076C9.83978 5.33342 10.0265 5.33342 10.3998 5.33342H13.1535M10.6665 12.3334L9.6665 11.3334M9.33317 1.33337H5.8665C4.7464 1.33337 4.18635 1.33337 3.75852 1.55136C3.3822 1.74311 3.07624 2.04907 2.88449 2.42539C2.6665 2.85322 2.6665 3.41327 2.6665 4.53337V11.4667C2.6665 12.5868 2.6665 13.1469 2.88449 13.5747C3.07624 13.951 3.3822 14.257 3.75852 14.4487C4.18635 14.6667 4.7464 14.6667 5.8665 14.6667H10.1332C11.2533 14.6667 11.8133 14.6667 12.2412 14.4487C12.6175 14.257 12.9234 13.951 13.1152 13.5747C13.3332 13.1469 13.3332 12.5868 13.3332 11.4667V5.33337L9.33317 1.33337ZM10.3332 9.66671C10.3332 10.9554 9.2885 12 7.99984 12C6.71117 12 5.6665 10.9554 5.6665 9.66671C5.6665 8.37804 6.71117 7.33337 7.99984 7.33337C9.2885 7.33337 10.3332 8.37804 10.3332 9.66671Z" />
          </svg>
        );
      case "bell":
        return (
          <svg {...iconProps} viewBox="0 0 16 16" fill="none">
            <path d="M9.33353 13.9999H6.66687M1.52943 3.87985C1.51986 2.91228 2.04152 2.00875 2.88423 1.53325M14.4683 3.87985C14.4779 2.91229 13.9562 2.00875 13.1135 1.53325M12.0002 5.33325C12.0002 4.27239 11.5788 3.25497 10.8286 2.50482C10.0785 1.75468 9.06106 1.33325 8.0002 1.33325C6.93933 1.33325 5.92192 1.75468 5.17177 2.50482C4.42163 3.25497 4.0002 4.27239 4.0002 5.33325C4.0002 7.39338 3.48051 8.80389 2.89998 9.73686C2.41028 10.5238 2.16544 10.9173 2.17442 11.0271C2.18436 11.1486 2.21011 11.195 2.30805 11.2676C2.3965 11.3333 2.79526 11.3333 3.59277 11.3333H12.4076C13.2051 11.3333 13.6039 11.3333 13.6923 11.2676C13.7903 11.195 13.816 11.1486 13.826 11.0271C13.835 10.9173 13.5901 10.5238 13.1004 9.73686C12.5199 8.80389 12.0002 7.39338 12.0002 5.33325Z" />
          </svg>
        );
      case "file-search":
        return (
          <svg {...iconProps} viewBox="0 0 16 16" fill="none">
            <path d="M9.33317 7.33325H5.33317M6.6665 9.99992H5.33317M10.6665 4.66659H5.33317M13.3332 6.99992V4.53325C13.3332 3.41315 13.3332 2.85309 13.1152 2.42527C12.9234 2.04895 12.6175 1.74299 12.2412 1.55124C11.8133 1.33325 11.2533 1.33325 10.1332 1.33325H5.8665C4.7464 1.33325 4.18635 1.33325 3.75852 1.55124C3.3822 1.74299 3.07624 2.04895 2.88449 2.42527C2.6665 2.85309 2.6665 3.41315 2.6665 4.53325V11.4666C2.6665 12.5867 2.6665 13.1467 2.88449 13.5746C3.07624 13.9509 3.3822 14.2569 3.75852 14.4486C4.18635 14.6666 4.7464 14.6666 5.8665 14.6666H7.6665M14.6665 14.6666L13.6665 13.6666M14.3332 11.9999C14.3332 13.2886 13.2885 14.3333 11.9998 14.3333C10.7112 14.3333 9.6665 13.2886 9.6665 11.9999C9.6665 10.7113 10.7112 9.66659 11.9998 9.66659C13.2885 9.66659 14.3332 10.7113 14.3332 11.9999Z" />
          </svg>
        );
      default:
        return (
          <svg {...iconProps} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="4" />
          </svg>
        );
    }
  };

  const renderTask = (task: Task) => (
    <div
      key={task.id}
      style={{
        display: "flex",
        padding: "12px 8px",
        alignItems: "center",
        gap: "4px",
        alignSelf: "stretch",
        borderRadius: "12px",
        cursor: "pointer",
        background: hoveredTask === task.id ? "#F5F5F5" : "#FFF",
        border: "1px solid #E9EAEB",
        boxShadow:
          hoveredTask === task.id
            ? "0px 1px 2px 0px rgba(10, 13, 18, 0.05)"
            : "none",
        transition: "all 0.2s ease-in-out",
      }}
      onMouseEnter={() => setHoveredTask(task.id)}
      onMouseLeave={() => setHoveredTask(null)}
    >
      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          flex: "1 0 0",
        }}
      >
        {/* Order and customer info */}
        <div
          style={{
            display: "flex",
            width: "200px",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              padding: "5px",
              alignItems: "center",
              gap: "4px",
              borderRadius: "9999px",
              border: "1px solid #B3BCE5",
              background: "#ECEEF9",
            }}
          >
            {renderTaskIcon(task.iconType)}
          </div>

          {/* Order info */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <div
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              Order
            </div>
            <div
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {task.orderNumber}
            </div>
          </div>

          {/* Dot separator */}
          <svg
            style={{
              width: "4px",
              height: "4px",
              flexShrink: 0,
              fill: "#D5D7DA",
            }}
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#D5D7DA" />
          </svg>

          {/* Customer name */}
          <div
            style={{
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: "1 0 0",
            }}
          >
            {task.customerName}
          </div>
        </div>

        {/* Task description */}
        <div
          style={{
            alignSelf: "stretch",
            color: "#535862",
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {task.description}
        </div>
      </div>

      {/* View button */}
      <button
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
        onClick={() => console.log("View task:", task.id)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.61342 8.47549C1.52262 8.33173 1.47723 8.25985 1.45182 8.14898C1.43273 8.06571 1.43273 7.93437 1.45182 7.8511C1.47723 7.74023 1.52262 7.66835 1.61341 7.52459C2.36369 6.3366 4.59693 3.33337 8.00027 3.33337C11.4036 3.33337 13.6369 6.3366 14.3871 7.52459C14.4779 7.66835 14.5233 7.74023 14.5487 7.8511C14.5678 7.93437 14.5678 8.06571 14.5487 8.14898C14.5233 8.25985 14.4779 8.33173 14.3871 8.47549C13.6369 9.66348 11.4036 12.6667 8.00027 12.6667C4.59693 12.6667 2.36369 9.66348 1.61342 8.47549Z"
            stroke="#A4A7AE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.00027 10C9.10484 10 10.0003 9.10461 10.0003 8.00004C10.0003 6.89547 9.10484 6.00004 8.00027 6.00004C6.8957 6.00004 6.00027 6.89547 6.00027 8.00004C6.00027 9.10461 6.8957 10 8.00027 10Z"
            stroke="#A4A7AE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <WidgetContainer
      id={id}
      title="Assigned Tasks"
      position={position}
      size={size}
      helpTooltip="View and manage tasks assigned to you"
      onSeeAllClick={() => console.log("See All Tasks clicked")}
      onDownloadChart={() => console.log("Download Tasks Chart clicked")}
      onRemoveWidget={() => console.log("Remove Tasks Widget clicked")}
      onResize={onResize}
      isMobile={isMobile}
      isTablet={isTablet}
      windowWidth={windowWidth}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
          flex: "1 0 0",
          alignSelf: "stretch",
          overflowY: "auto",
          maxHeight: "400px",
        }}
      >
        {tasks.map((task) => renderTask(task))}
      </div>
    </WidgetContainer>
  );
};
