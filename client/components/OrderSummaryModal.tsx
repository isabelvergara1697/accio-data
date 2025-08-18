import React from "react";

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData?: {
    orderNumber: string;
    date: string;
    time: string;
    package: string;
    timeFirstCompleted: string;
    userName: string;
    components: {
      i9Form: {
        lastUpdate: string;
        status: string;
        statusId: string;
      };
      eVerify: {
        lastUpdate: string;
        status: string;
        statusId: string;
      };
    };
  };
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  isOpen,
  onClose,
  orderData = {
    orderNumber: "291024",
    date: "00/00/00",
    time: "11:41 AM Central",
    package: "I-9",
    timeFirstCompleted: "00/00/00",
    userName: "First Name, Last Name",
    components: {
      i9Form: {
        lastUpdate: "00/00/00",
        status: "Waiting",
        statusId: "2839/4949",
      },
      eVerify: {
        lastUpdate: "00/00/00",
        status: "Waiting",
        statusId: "2839/4949",
      },
    },
  },
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(10, 13, 18, 0.7)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: "relative",
          width: "400px",
          maxWidth: "100vw",
          height: "100vh",
          background: "#FFF",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "24px",
            alignItems: "flex-start",
            gap: "8px",
            background: "#FFF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flex: "1 0 0",
            }}
          >
            {/* Featured Icon */}
            <div
              style={{
                display: "flex",
                width: "44px",
                height: "44px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "9999px",
                background: "#D9DEF2",
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
                  d="M11.6668 9.16797H6.66683M8.3335 12.5013H6.66683M13.3335 5.83464H6.66683M16.6668 8.7513V5.66797C16.6668 4.26784 16.6668 3.56777 16.3943 3.03299C16.1547 2.56259 15.7722 2.18014 15.3018 1.94045C14.767 1.66797 14.067 1.66797 12.6668 1.66797H7.3335C5.93336 1.66797 5.2333 1.66797 4.69852 1.94045C4.22811 2.18014 3.84566 2.56259 3.60598 3.03299C3.3335 3.56777 3.3335 4.26784 3.3335 5.66797V14.3346C3.3335 15.7348 3.3335 16.4348 3.60598 16.9696C3.84566 17.44 4.22811 17.8225 4.69852 18.0622C5.2333 18.3346 5.93336 18.3346 7.3335 18.3346H9.5835M18.3335 18.3346L17.0835 17.0846M17.9168 15.0013C17.9168 16.6121 16.611 17.918 15.0002 17.918C13.3893 17.918 12.0835 16.6121 12.0835 15.0013C12.0835 13.3905 13.3893 12.0846 15.0002 12.0846C16.611 12.0846 17.9168 13.3905 17.9168 15.0013Z"
                  stroke="#344698"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title and Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                Order Summary
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Order overview with real-time status updates.
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
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
            overflowY: "auto",
          }}
        >
          {/* Order Number and Date */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: "28px",
              }}
            >
              Order Number and Date
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
              }}
            >
              {orderData.orderNumber}
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
              }}
            >
              {orderData.date}, {orderData.time}
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
            }}
          >
            <div
              style={{
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: "28px",
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
                fontWeight: 600,
                lineHeight: "28px",
              }}
            >
              {orderData.package}
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
            }}
          >
            <div
              style={{
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: "28px",
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
                fontWeight: 600,
                lineHeight: "28px",
              }}
            >
              {orderData.timeFirstCompleted}
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
            }}
          >
            <div
              style={{
                color: "#414651",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: "28px",
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
                fontWeight: 600,
                lineHeight: "28px",
              }}
            >
              {orderData.userName}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              padding: "4px 0",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "#E9EAEB",
              }}
            />
          </div>

          {/* Components Section */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#414651",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "28px",
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
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#34479A",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
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
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "28px",
                }}
              >
                Last Update:
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                {orderData.components.i9Form.lastUpdate}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
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
                }}
              >
                <div
                  style={{
                    color: "#067647",
                    textAlign: "center",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {orderData.components.i9Form.status}
                </div>
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                {orderData.components.i9Form.statusId}
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
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#34479A",
                fontFamily: "Public Sans",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "28px",
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
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "28px",
                }}
              >
                Last Update:
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                {orderData.components.eVerify.lastUpdate}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
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
                }}
              >
                <div
                  style={{
                    color: "#067647",
                    textAlign: "center",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {orderData.components.eVerify.status}
                </div>
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                {orderData.components.eVerify.statusId}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
