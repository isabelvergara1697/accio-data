import React from "react";
import { WidgetContainer } from "./widget-container";
import { useNavigate } from "react-router-dom";

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
  lastUpdate: string;
  eta: string;
  progress: number;
}

interface LatestReportsWidgetProps {
  /** Widget unique identifier */
  id: string;
  /** Widget position in the layout */
  position?: number;
  /** Widget size */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Optional resize handler */
  onResize?: (id: string, newSize: "xs" | "sm" | "md" | "lg" | "xl") => void;
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
          minWidth: "35px",
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
    lastUpdate: "08/14/2025",
    eta: "02/19/2026",
    progress: 100,
  },
  {
    order: "654321",
    status: "unordered",
    requester: { name: "Sophia Brown", email: "michael.brown@randommail.com" },
    lastUpdate: "01/30/2025",
    eta: "04/11/2025",
    progress: 20,
  },
  {
    order: "987654",
    status: "completed",
    requester: { name: "Michael Smith", email: "sarah.connor@samplemail.com" },
    lastUpdate: "12/05/2025",
    eta: "06/25/2026",
    progress: 100,
  },
  {
    order: "789123",
    status: "archived",
    requester: { name: "Ava Anderson", email: "william.taylor@myemail.com" },
    lastUpdate: "07/22/2025",
    eta: "11/07/2025",
    progress: 40,
  },
  {
    order: "456789",
    status: "pending",
    requester: { name: "James Davis", email: "linda.johnson@fakemail.com" },
    lastUpdate: "04/28/2025",
    eta: "09/03/2025",
    progress: 50,
  },
  {
    order: "321654",
    status: "updated",
    requester: { name: "Olivia Wilson", email: "david.wilson@demoemail.com" },
    lastUpdate: "12/05/2025",
    eta: "06/25/2026",
    progress: 90,
  },
  {
    order: "789123",
    status: "reviewed",
    requester: { name: "Ava Anderson", email: "william.taylor@myemail.com" },
    lastUpdate: "11/09/2025",
    eta: "05/12/2026",
    progress: 40,
  },
  {
    order: "135792",
    status: "archived",
    requester: { name: "Liam Taylor", email: "emma.jones@webmail.com" },
    lastUpdate: "03/15/2025",
    eta: "10/30/2025",
    progress: 60,
  },
];

export const LatestReportsWidget: React.FC<LatestReportsWidgetProps> = ({
  id,
  position = 0,
  size = "md",
  onResize,
  isMobile = false,
  isTablet = false,
  windowWidth = 1024,
}) => {
  const navigate = useNavigate();
  // Determine which columns to show based on widget size instead of window width
  const getColumnsToShow = () => {
    if (isMobile) {
      return {
        showOrder: false,
        showStatus: true,
        showRequester: true,
        showLastUpdate: false,
        showETA: false,
        showProgress: false,
      };
    }

    // Column visibility based on widget size
    switch (size) {
      case "xs": // ~252px - Very compact: Status + Requester only
        return {
          showOrder: false,
          showStatus: true,
          showRequester: true,
          showLastUpdate: false,
          showETA: false,
          showProgress: false,
        };
      case "sm": // ~300px - Compact: Order + Status + Requester
        return {
          showOrder: true,
          showStatus: true,
          showRequester: true,
          showLastUpdate: false,
          showETA: false,
          showProgress: false,
        };
      case "md": // ~400px - Medium: Order + Status + Requester + Progress
        return {
          showOrder: true,
          showStatus: true,
          showRequester: true,
          showLastUpdate: false,
          showETA: false,
          showProgress: true,
        };
      case "lg": // ~500px - Large: Order + Status + Requester + Last Update + Progress
        return {
          showOrder: true,
          showStatus: true,
          showRequester: true,
          showLastUpdate: true,
          showETA: false,
          showProgress: true,
        };
      case "xl": // ~600px - Extra Large: All columns
        return {
          showOrder: true,
          showStatus: true,
          showRequester: true,
          showLastUpdate: true,
          showETA: true,
          showProgress: true,
        };
      default:
        return {
          showOrder: true,
          showStatus: true,
          showRequester: true,
          showLastUpdate: false,
          showETA: false,
          showProgress: true,
        };
    }
  };

  const columns = getColumnsToShow();

  return (
    <WidgetContainer
      id={id}
      title="Latest Reports"
      position={position}
      size={size}
      helpTooltip="View recent activity and reports"
      onSeeAllClick={() =>
        navigate("/invites-orders", { state: { activeTab: "orders" } })
      }
      onDownloadChart={() => console.log("Download Chart clicked")}
      onRemoveWidget={() => console.log("Remove Widget clicked")}
      onResize={onResize}
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
          height: "100%", // Use full available height
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            flex: "1 0 0",
            overflow: "auto", // Allow scrolling when content overflows
            minWidth: 0,
            position: "relative",
            height: "100%", // Use full available height
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "flex",
              height: "36px",
              alignItems: "center",
              alignSelf: "stretch",
              minWidth: 0,
              borderBottom: "1px solid #E9EAEB",
              background: "#FFF",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            {/* Order Header */}
            {columns.showOrder && (
              <div
                style={{
                  display: "flex",
                  width: "77px",
                  flexShrink: 0,
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
            {columns.showStatus && (
              <div
                style={{
                  display: "flex",
                  width: "120px",
                  flexShrink: 0,
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
            )}

            {/* Requester Header */}
            {columns.showRequester && (
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
            )}

            {/* Last Update Header */}
            {columns.showLastUpdate && (
              <div
                style={{
                  display: "flex",
                  width: "120px",
                  flexShrink: 0,
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
                  Last Update
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

            {/* ETA Header */}
            {columns.showETA && (
              <div
                style={{
                  display: "flex",
                  width: "120px",
                  flexShrink: 0,
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
                  ETA
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

            {/* Progress Header */}
            {columns.showProgress && (
              <div
                style={{
                  display: "flex",
                  width: "107px",
                  flexShrink: 0,
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
              flex: "1 0 0",
              minWidth: 0,
            }}
          >
            {mockReportsData.map((report, index) => {
              const isFirstRow = index === 0;
              const isSecondRow = index === 1;
              const isDisabled = !isFirstRow && !isSecondRow;
              const handleRowClick = () => {
                if (isFirstRow) {
                  navigate("/order-details/123456");
                } else if (isSecondRow) {
                  navigate("/order-details/999");
                }
              };
              return (
                <div
                  key={index}
                  onClick={handleRowClick}
                  style={{
                    display: "flex",
                    height: "52px",
                    alignItems: "center",
                    alignSelf: "stretch",
                    minWidth: 0,
                    borderBottom:
                      index < mockReportsData.length - 1
                        ? "1px solid #E9EAEB"
                        : "none",
                    background: "#FFF",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    position: "relative",
                    opacity: isDisabled ? 0.5 : 1,
                    pointerEvents: isDisabled ? "none" : "auto",
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled) {
                      e.currentTarget.style.background = "#F9FAFB";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFF";
                  }}
                >
                  {/* Order Cell */}
                  {columns.showOrder && (
                    <div
                      style={{
                        display: "flex",
                        width: "77px",
                        flexShrink: 0,
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
                  {columns.showStatus && (
                    <div
                      style={{
                        display: "flex",
                        width: "120px",
                        flexShrink: 0,
                        padding: "6px 12px",
                        alignItems: "center",
                      }}
                    >
                      <StatusBadge status={report.status} />
                    </div>
                  )}

                  {/* Requester Cell */}
                  {columns.showRequester && (
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
                  )}

                  {/* Last Update Cell */}
                  {columns.showLastUpdate && (
                    <div
                      style={{
                        display: "flex",
                        width: "120px",
                        flexShrink: 0,
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
                        {report.lastUpdate}
                      </div>
                    </div>
                  )}

                  {/* ETA Cell */}
                  {columns.showETA && (
                    <div
                      style={{
                        display: "flex",
                        width: "120px",
                        flexShrink: 0,
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
                        {report.eta}
                      </div>
                    </div>
                  )}

                  {/* Progress Cell */}
                  {columns.showProgress && (
                    <div
                      style={{
                        display: "flex",
                        width: "107px",
                        flexShrink: 0,
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
              );
            })}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};
