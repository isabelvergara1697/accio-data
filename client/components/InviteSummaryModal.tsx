import React from "react";

interface InviteData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status:
    | "waiting"
    | "unsolicited"
    | "canceled"
    | "expired"
    | "waiting-for-recruitee"
    | "expires-today"
    | "reviewed"
    | "archived";
  completion: number;
  lastEmail: string;
  i9Filled: boolean;
  activated: boolean;
  ews: boolean;
  packageType: string;
}

interface InviteSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteData: InviteData | null;
}

export const InviteSummaryModal: React.FC<InviteSummaryModalProps> = ({
  isOpen,
  onClose,
  inviteData,
}) => {
  if (!isOpen || !inviteData) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 13, 18, 0.5)",
          zIndex: 999999,
        }}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "400px",
          backgroundColor: "#FFF",
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
          zIndex: 1000000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "24px",
            alignItems: "flex-start",
            gap: "8px",
            alignSelf: "stretch",
            background: "#FFF",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flex: "1 0 0",
              position: "relative",
            }}
          >
            {/* Featured icon */}
            <div
              style={{
                display: "flex",
                width: "44px",
                height: "44px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                aspectRatio: "1/1",
                borderRadius: "9999px",
                background: "#D9DEF2",
                position: "relative",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6668 9.16699H6.66683M8.3335 12.5003H6.66683M13.3335 5.83366H6.66683M16.6668 8.75033V5.66699C16.6668 4.26686 16.6668 3.5668 16.3943 3.03202C16.1547 2.56161 15.7722 2.17916 15.3018 1.93948C14.767 1.66699 14.067 1.66699 12.6668 1.66699H7.3335C5.93336 1.66699 5.2333 1.66699 4.69852 1.93948C4.22811 2.17916 3.84566 2.56161 3.60598 3.03202C3.3335 3.5668 3.3335 4.26686 3.3335 5.66699V14.3337C3.3335 15.7338 3.3335 16.4339 3.60598 16.9686C3.84566 17.439 4.22811 17.8215 4.69852 18.0612C5.2333 18.3337 5.93336 18.3337 7.3335 18.3337H9.5835M18.3335 18.3337L17.0835 17.0837M17.9168 15.0003C17.9168 16.6112 16.611 17.917 15.0002 17.917C13.3893 17.917 12.0835 16.6112 12.0835 15.0003C12.0835 13.3895 13.3893 12.0837 15.0002 12.0837C16.611 12.0837 17.9168 13.3895 17.9168 15.0003Z"
                  stroke="#344698"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                flex: "1 0 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                Invite Summary
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                  position: "relative",
                }}
              >
                Order overview with real-time status updates.
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              right: "12px",
              top: "12px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#A4A7AE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            width: "400px",
            height: "856px",
            padding: "0 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            position: "relative",
            overflowY: "auto",
          }}
        >
          {/* Order Number */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "311px",
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              Order Number
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              291024
            </div>
          </div>

          {/* Package */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "311px",
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              Package
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              {inviteData.packageType}
            </div>
          </div>

          {/* Time First Completed */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "311px",
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              Time First Completed
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              00/00/00
            </div>
          </div>

          {/* User */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "311px",
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              User
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              {inviteData.firstName}, {inviteData.lastName}
            </div>
          </div>

          {/* Divider */}
          <svg
            width="352"
            height="9"
            viewBox="0 0 352 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display: "flex",
              padding: "4px 0",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M352 5H0V4H352V5Z"
              fill="#E9EAEB"
            />
          </svg>

          {/* Components Section */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#414651",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "28px",
              position: "relative",
            }}
          >
            Components
          </div>

          {/* I-9 Form Creation */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#34479A",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              I-9 Form Creation
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                Last Update:
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                00/00/00
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                Status:
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "4px 12px",
                  alignItems: "center",
                  borderRadius: "9999px",
                  border: "1px solid #ABEFC6",
                  background: "#ECFDF3",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#067647",
                    textAlign: "center",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Waiting
                </div>
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                2839/4949
              </div>
            </div>
          </div>

          {/* E-Verify */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#34479A",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "28px",
                position: "relative",
              }}
            >
              E-Verify
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                Last Update:
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                00/00/00
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                Status:
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "4px 12px",
                  alignItems: "center",
                  borderRadius: "9999px",
                  border: "1px solid #ABEFC6",
                  background: "#ECFDF3",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#067647",
                    textAlign: "center",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Waiting
                </div>
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px",
                  position: "relative",
                }}
              >
                2839/4949
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
