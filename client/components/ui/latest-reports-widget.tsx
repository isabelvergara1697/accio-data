import React from "react";

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
  isCompact?: boolean;
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

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  isCompact = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isCompact ? "8px" : "12px",
        flex: "1 0 0",
      }}
    >
      <div
        style={{
          height: "8px",
          flex: "1 0 0",
          position: "relative",
          minWidth: isCompact ? "35px" : "40px",
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
          fontSize: isCompact ? "12px" : "14px",
          fontWeight: "500",
          lineHeight: isCompact ? "16px" : "20px",
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
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(
    null,
  );

  // Determine which columns to show based on width
  const showOrderColumn = windowWidth >= 640;
  const showProgressColumn = windowWidth >= 480;
  const isDesktop = windowWidth >= 1024;

  return (
    <div
      style={{
        display: "flex",
        width: isTablet || isMobile ? "100%" : "532px",
        height: "480px",
        flexDirection: "column",
        alignItems: "flex-start",
        flexShrink: 0,
        borderRadius: "12px",
        border: "1px solid #D5D7DA",
        background: "#FDFDFD",
        boxShadow:
          "0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px rgba(10, 13, 18, 0.10)",
        position: "relative",
      }}
    >
      {/* Heading and content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2px",
          flex: "1 0 0",
          alignSelf: "stretch",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            height: "52px",
            padding: "12px 20px 8px 20px",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          {/* Section label */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flex: "1 0 0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                }}
              >
                Latest Reports
              </div>
              <div
                style={{
                  display: "flex",
                  width: "16px",
                  height: "16px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_help_circle)">
                    <path
                      d="M6.06004 5.99992C6.21678 5.55436 6.52614 5.17866 6.93334 4.93934C7.34055 4.70002 7.8193 4.61254 8.28483 4.69239C8.75035 4.77224 9.17259 5.01427 9.47676 5.3756C9.78093 5.73694 9.94741 6.19427 9.94671 6.66659C9.94671 7.99992 7.94671 8.66659 7.94671 8.66659M8.00004 11.3333H8.00671M14.6667 7.99992C14.6667 11.6818 11.6819 14.6666 8.00004 14.6666C4.31814 14.6666 1.33337 11.6818 1.33337 7.99992C1.33337 4.31802 4.31814 1.33325 8.00004 1.33325C11.6819 1.33325 14.6667 4.31802 14.6667 7.99992Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_help_circle">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* See All button */}
            <button
              style={{
                display: "flex",
                minHeight: "36px",
                padding: "6px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
                transition: "all 0.15s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 2px 4px 0px rgba(10, 13, 18, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFF";
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0px 2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "20px",
                  }}
                >
                  See All
                </div>
              </div>
            </button>

            {/* Menu button */}
            <button
              style={{
                display: "flex",
                padding: "8px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99992 8.66675C8.36811 8.66675 8.66659 8.36827 8.66659 8.00008C8.66659 7.63189 8.36811 7.33341 7.99992 7.33341C7.63173 7.33341 7.33325 7.63189 7.33325 8.00008C7.33325 8.36827 7.63173 8.66675 7.99992 8.66675Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.99992 4.00008C8.36811 4.00008 8.66659 3.7016 8.66659 3.33341C8.66659 2.96522 8.36811 2.66675 7.99992 2.66675C7.63173 2.66675 7.33325 2.96522 7.33325 3.33341C7.33325 3.7016 7.63173 4.00008 7.99992 4.00008Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.99992 13.3334C8.36811 13.3334 8.66659 13.0349 8.66659 12.6667C8.66659 12.2986 8.36811 12.0001 7.99992 12.0001C7.63173 12.0001 7.33325 12.2986 7.33325 12.6667C7.33325 13.0349 7.63173 13.3334 7.99992 13.3334Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            padding: "12px 20px 16px 20px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            flex: "1 0 0",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            position: "relative",
          }}
        >
          {/* Widget Content - Table using Row-based approach */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flex: "1 0 0",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                flex: "1 0 0",
              }}
            >
              {/* Table Header */}
              <div
                style={{
                  display: "flex",
                  height: "36px",
                  alignItems: "center",
                  alignSelf: "stretch",
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
                    borderBottom:
                      index < mockReportsData.length - 1
                        ? "1px solid #E9EAEB"
                        : "none",
                    background:
                      hoveredRowIndex === index ? "#F9FAFB" : "transparent",
                    transition: "background-color 0.2s ease-in-out",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
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
                      padding: "12px",
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
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flex: "1 0 0",
                        alignSelf: "stretch",
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
                        {report.requester.name}
                      </div>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          alignSelf: "stretch",
                          overflow: "hidden",
                          color: "#535862",
                          textOverflow: "ellipsis",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "20px",
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
                      <ProgressBar
                        percentage={report.progress}
                        isCompact={isDesktop}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drag and Drop Button - positioned correctly like Figma */}
      <button
        style={{
          display: "flex",
          height: "32px",
          padding: "8px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
          transform: "rotate(90deg)",
          position: "absolute",
          left: "241px",
          top: "-6px",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#F5F5F5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.33334 6.00016C7.33334 6.36835 7.63182 6.66683 8.00001 6.66683C8.3682 6.66683 8.66668 6.36835 8.66668 6.00016C8.66668 5.63197 8.3682 5.3335 8.00001 5.3335C7.63182 5.3335 7.33334 5.63197 7.33334 6.00016Z"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.00016C12 6.36835 12.2985 6.66683 12.6667 6.66683C13.0349 6.66683 13.3333 6.36835 13.3333 6.00016C13.3333 5.63197 13.0349 5.3335 12.6667 5.3335C12.2985 5.3335 12 5.63197 12 6.00016Z"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.66668 6.00016C2.66668 6.36835 2.96515 6.66683 3.33334 6.66683C3.70153 6.66683 4.00001 6.36835 4.00001 6.00016C4.00001 5.63197 3.70153 5.3335 3.33334 5.3335C2.96515 5.3335 2.66668 5.63197 2.66668 6.00016Z"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.33334 10.0002C7.33334 10.3684 7.63182 10.6668 8.00001 10.6668C8.3682 10.6668 8.66668 10.3684 8.66668 10.0002C8.66668 9.63197 8.3682 9.3335 8.00001 9.3335C7.63182 9.3335 7.33334 9.63197 7.33334 10.0002Z"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 10.0002C12 10.3684 12.2985 10.6668 12.6667 10.6668C13.0349 10.6668 13.3333 10.3684 13.3333 10.0002C13.3333 9.63197 13.0349 9.3335 12.6667 9.3335C12.2985 9.3335 12 9.63197 12 10.0002Z"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.66668 10.0002C2.66668 10.3684 2.96515 10.6668 3.33334 10.6668C3.70153 10.6668 4.00001 10.3684 4.00001 10.0002C4.00001 9.63197 3.70153 9.3335 3.33334 9.3335C2.96515 9.3335 2.66668 9.63197 2.66668 10.0002Z"
            stroke="#A4A7AE"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
