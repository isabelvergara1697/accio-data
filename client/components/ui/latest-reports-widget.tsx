import React from "react";
import { WidgetContainer } from "./widget-container";

interface StatusBadgeProps {
  status:
    | "completed"
    | "unordered"
    | "archived"
    | "pending"
    | "updated"
    | "reviewed";
}

interface ProgressBarProps {
  percentage: number;
}

interface ReportData {
  order: string;
  status: StatusBadgeProps["status"];
  requester: {
    name: string;
    email: string;
  };
  progress: number;
}

interface LatestReportsWidgetProps {
  /** Whether this is mobile view */
  isMobile?: boolean;
  /** Whether this is tablet view */
  isTablet?: boolean;
  /** Window width for responsive behavior */
  windowWidth?: number;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    completed: {
      text: "Completed",
      bgColor: "#ECFDF3",
      textColor: "#067647",
      borderColor: "#ABEFC6",
    },
    unordered: {
      text: "Unordered",
      bgColor: "#F4F3FF",
      textColor: "#5925DC",
      borderColor: "#D9D6FE",
    },
    archived: {
      text: "Archived",
      bgColor: "#FAFAFA",
      textColor: "#414651",
      borderColor: "#E9EAEB",
    },
    pending: {
      text: "Pending",
      bgColor: "#FEF6EE",
      textColor: "#B93815",
      borderColor: "#F9DBAF",
    },
    updated: {
      text: "Updated",
      bgColor: "#EFF8FF",
      textColor: "#175CD3",
      borderColor: "#B2DDFF",
    },
    reviewed: {
      text: "Reviewed",
      bgColor: "#FDF2FA",
      textColor: "#C11574",
      borderColor: "#FCCEEE",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      style={{
        display: "flex",
        padding: "2px 8px",
        alignItems: "center",
        borderRadius: "9999px",
        border: `1px solid ${config.borderColor}`,
        background: config.bgColor,
      }}
    >
      <div
        style={{
          color: config.textColor,
          textAlign: "center",
          fontFamily: "Public Sans",
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "18px",
        }}
      >
        {config.text}
      </div>
    </div>
  );
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flex: "1 0 0",
      }}
    >
      <div
        style={{
          height: "8px",
          flex: "1 0 0",
          position: "relative",
        }}
      >
        {/* Background */}
        <div
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "9999px",
            background: "#D5D7DA",
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        />
        {/* Progress */}
        <div
          style={{
            width: `${percentage}%`,
            height: "8px",
            borderRadius: "9999px",
            background: "#344698",
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        />
      </div>
      <div
        style={{
          color: "#414651",
          fontFamily: "Public Sans",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "20px",
          minWidth: "32px",
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

const mockReportsData: ReportData[] = [
  {
    order: "123456",
    status: "completed",
    requester: { name: "Emily Johnson", email: "james.smith@example.com" },
    progress: 100,
  },
  {
    order: "654321",
    status: "unordered",
    requester: { name: "Sophia Brown", email: "michael.brown@randommail.com" },
    progress: 20,
  },
  {
    order: "987654",
    status: "completed",
    requester: { name: "Michael Smith", email: "sarah.connor@samplemail.com" },
    progress: 100,
  },
  {
    order: "789123",
    status: "archived",
    requester: { name: "Ava Anderson", email: "william.taylor@myemail.com" },
    progress: 40,
  },
  {
    order: "456789",
    status: "pending",
    requester: { name: "James Davis", email: "linda.johnson@fakemail.com" },
    progress: 50,
  },
  {
    order: "321654",
    status: "updated",
    requester: { name: "Olivia Wilson", email: "david.wilson@demoemail.com" },
    progress: 90,
  },
  {
    order: "789123",
    status: "reviewed",
    requester: { name: "Ava Anderson", email: "william.taylor@myemail.com" },
    progress: 40,
  },
  {
    order: "135792",
    status: "reviewed",
    requester: { name: "Liam Taylor", email: "emma.jones@webmail.com" },
    progress: 60,
  },
];

export const LatestReportsWidget: React.FC<LatestReportsWidgetProps> = ({
  isMobile = false,
  isTablet = false,
  windowWidth = 1024,
}) => {
  // Determine which columns to show based on width
  const showOrderColumn = windowWidth >= 640;
  const showProgressColumn = windowWidth >= 480;

  return (
    <WidgetContainer
      title="Latest Reports"
      helpTooltip="View recent activity and reports"
      onSeeAllClick={() => console.log("See All Reports clicked")}
      onDownloadChart={() => console.log("Download Chart clicked")}
      onRemoveWidget={() => console.log("Remove Widget clicked")}
      isMobile={isMobile}
      isTablet={isTablet}
      windowWidth={windowWidth}
    >
      {/* Table Container with proper overflow handling */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          flex: "1 0 0",
          overflow: "hidden",
          minWidth: 0, // Allow flex item to shrink below content size
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            flex: "1 0 0",
            overflow: isMobile ? "auto" : "hidden",
            minWidth: isMobile ? "100%" : "auto",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "flex",
              height: "36px",
              alignItems: "center",
              alignSelf: "stretch",
              minWidth: isMobile ? "320px" : "auto", // Ensure minimum width on mobile
              borderBottom: "1px solid #E9EAEB",
              background: "#FFF",
            }}
          >
            {/* Order Header */}
            {showOrderColumn && (
              <div
                style={{
                  display: "flex",
                  width: "77px",
                  padding: "6px 12px",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontWeight: "600",
                    lineHeight: "18px",
                  }}
                >
                  Order
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.66666 9.99984L7.99999 13.3332L11.3333 9.99984M4.66666 5.99984L7.99999 2.6665L11.3333 5.99984"
                    stroke="#A4A7AE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            {/* Status Header */}
            <div
              style={{
                display: "flex",
                width: "120px",
                padding: "6px 12px",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontWeight: "600",
                  lineHeight: "18px",
                }}
              >
                Status
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.66666 9.99984L7.99999 13.3332L11.3333 9.99984M4.66666 5.99984L7.99999 2.6665L11.3333 5.99984"
                  stroke="#A4A7AE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Requester Header */}
            <div
              style={{
                display: "flex",
                flex: "1 0 0",
                padding: "6px 12px",
                alignItems: "center",
                gap: "4px",
                minWidth: 0, // Allow shrinking
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontWeight: "600",
                  lineHeight: "18px",
                }}
              >
                Requester
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.66666 9.99984L7.99999 13.3332L11.3333 9.99984M4.66666 5.99984L7.99999 2.6665L11.3333 5.99984"
                  stroke="#A4A7AE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Progress Header */}
            {showProgressColumn && (
              <div
                style={{
                  display: "flex",
                  width: "107px",
                  padding: "6px 12px",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontWeight: "600",
                    lineHeight: "18px",
                  }}
                >
                  Progress
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.66669 9.99984L8.00002 13.3332L11.3334 9.99984M4.66669 5.99984L8.00002 2.6665L11.3334 5.99984"
                    stroke="#A4A7AE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Table Rows */}
          {mockReportsData.map((report, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                height: "52px",
                alignItems: "center",
                alignSelf: "stretch",
                minWidth: isMobile ? "320px" : "auto", // Ensure minimum width on mobile
                borderBottom:
                  index < mockReportsData.length - 1
                    ? "1px solid #E9EAEB"
                    : "none",
                background: "#FFF",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {/* Order Cell */}
              {showOrderColumn && (
                <div
                  style={{
                    display: "flex",
                    width: "77px",
                    padding: "6px 12px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "20px",
                    }}
                  >
                    {report.order}
                  </div>
                </div>
              )}

              {/* Status Cell */}
              <div
                style={{
                  display: "flex",
                  width: "120px",
                  padding: "6px 12px",
                  alignItems: "center",
                }}
              >
                <StatusBadge status={report.status} />
              </div>

              {/* Requester Cell */}
              <div
                style={{
                  display: "flex",
                  flex: "1 0 0",
                  padding: "6px 12px",
                  alignItems: "center",
                  minWidth: 0, // Allow truncation
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                    minWidth: 0, // Allow truncation
                  }}
                >
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
                      width: "100%",
                    }}
                  >
                    {report.requester.name}
                  </div>
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
                      width: "100%",
                    }}
                  >
                    {report.requester.email}
                  </div>
                </div>
              </div>

              {/* Progress Cell */}
              {showProgressColumn && (
                <div
                  style={{
                    display: "flex",
                    width: "107px",
                    height: "52px",
                    padding: "6px 12px",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <ProgressBar percentage={report.progress} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </WidgetContainer>
  );
};
