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
}) => {
  return (
    <div
      style={{
        display: "flex",
        width: isMobile ? "100%" : "532px",
        height: "480px",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "12px",
        border: "1px solid #E9EAEB",
        background: "#FDFDFD",
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
            alignItems: "center",
            gap: "4px",
            flex: "1 0 0",
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

      {/* Table Content */}
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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flex: "1 0 0",
            alignSelf: "stretch",
          }}
        >
          {/* Order Column */}
          <div
            style={{
              display: "flex",
              width: "77px",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                height: "36px",
                padding: "6px 12px",
                alignItems: "center",
                gap: "12px",
                borderBottom: "1px solid #E9EAEB",
                background: "#FFF",
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
                    d="M4.66663 10.0001L7.99996 13.3334L11.3333 10.0001M4.66663 6.00008L7.99996 2.66675L11.3333 6.00008"
                    stroke="#A4A7AE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Data cells */}
            {mockReportsData.map((report, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  height: "52px",
                  padding: "6px 12px",
                  alignItems: "center",
                  alignSelf: "stretch",
                  borderBottom:
                    index < mockReportsData.length - 1
                      ? "1px solid #E9EAEB"
                      : "none",
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
            ))}
          </div>

          {/* Status Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                height: "36px",
                padding: "6px 12px",
                alignItems: "center",
                gap: "12px",
                alignSelf: "stretch",
                borderBottom: "1px solid #E9EAEB",
                background: "#FFF",
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
                    d="M4.66663 10.0001L7.99996 13.3334L11.3333 10.0001M4.66663 6.00008L7.99996 2.66675L11.3333 6.00008"
                    stroke="#A4A7AE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Data cells */}
            {mockReportsData.map((report, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  padding: "12px",
                  alignItems: "center",
                  borderBottom:
                    index < mockReportsData.length - 1
                      ? "1px solid #E9EAEB"
                      : "none",
                }}
              >
                <StatusBadge status={report.status} />
              </div>
            ))}
          </div>

          {/* Requester Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flex: "1 0 0",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                height: "36px",
                padding: "6px 12px",
                alignItems: "center",
                gap: "12px",
                alignSelf: "stretch",
                borderBottom: "1px solid #E9EAEB",
                background: "#FFF",
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
                    d="M4.66663 10.0001L7.99996 13.3334L11.3333 10.0001M4.66663 6.00008L7.99996 2.66675L11.3333 6.00008"
                    stroke="#A4A7AE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Data cells */}
            {mockReportsData.map((report, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  padding: "6px 12px",
                  alignItems: "center",
                  alignSelf: "stretch",
                  borderBottom:
                    index < mockReportsData.length - 1
                      ? "1px solid #E9EAEB"
                      : "none",
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
                      alignSelf: "stretch",
                      overflow: "hidden",
                      color: "#535862",
                      textOverflow: "ellipsis",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {report.requester.email}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Column */}
          <div
            style={{
              display: "flex",
              width: "107px",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                height: "36px",
                padding: "6px 12px",
                alignItems: "center",
                gap: "12px",
                alignSelf: "stretch",
                borderBottom: "1px solid #E9EAEB",
                background: "#FFF",
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
                    d="M4.66675 10.0001L8.00008 13.3334L11.3334 10.0001M4.66675 6.00008L8.00008 2.66675L11.3334 6.00008"
                    stroke="#A4A7AE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Data cells */}
            {mockReportsData.map((report, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  height: "52px",
                  padding: "6px 12px",
                  alignItems: "center",
                  gap: "12px",
                  alignSelf: "stretch",
                  borderBottom:
                    index < mockReportsData.length - 1
                      ? "1px solid #E9EAEB"
                      : "none",
                }}
              >
                <ProgressBar percentage={report.progress} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
