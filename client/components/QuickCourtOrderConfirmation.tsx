import React from "react";
import { useIsMobile } from "../hooks/use-mobile";

interface ConfirmationProps {
  onSeeAllOrders: () => void;
  onNewQuickCourtOrder: () => void;
}

const QuickCourtOrderConfirmation: React.FC<ConfirmationProps> = ({
  onSeeAllOrders,
  onNewQuickCourtOrder,
}) => {
  const isMobile = useIsMobile();
  const isTablet = !isMobile && window.innerWidth < 1024;

  // Order data
  const orders = [
    {
      id: 1,
      type: "County Criminal",
      order: "849235",
      name: "Sandra Lopez",
      dl: "129503923",
      state: "TX",
      county: "AK",
      dob: "01/02/23",
      yearsToSearch: "00",
      comments: "I need more information on this, that, and that.",
    },
    {
      id: 2,
      type: "County Criminal",
      order: "849235",
      name: "Sandra Lopez",
      dl: "129503923",
      state: "TX",
      county: "AK",
      dob: "01/02/23",
      yearsToSearch: "00",
      comments: "I need more information on this, that, and that.",
    },
  ];

  const OrderCard = ({ order, index }: { order: typeof orders[0]; index: number }) => {
    return (
      <div
        style={{
          display: "flex",
          padding: "12px",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          alignSelf: "stretch",
          borderRadius: "8px",
          border: "1px solid #E9EAEB",
          background: "#FAFAFA",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: index === 0 ? "20px" : "16px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: index === 0 ? "16px" : "8px",
              alignSelf: "stretch",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#181D27",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {order.type}
              </div>
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
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F9FAFB";
                  e.currentTarget.style.borderColor = "#98A2B3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FFF";
                  e.currentTarget.style.borderColor = "#D5D7DA";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "0 2px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      fontFamily:
                        "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    See Order
                  </div>
                </div>
              </button>
            </div>

            {/* Details Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: isMobile ? "16px" : "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: isMobile ? "1 1 calc(50% - 8px)" : "none",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Order
                </div>
                <div
                  style={{
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {order.order}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: isMobile ? "1 1 calc(50% - 8px)" : "none",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Name
                </div>
                <div
                  style={{
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {order.name}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: isMobile ? "1 1 calc(50% - 8px)" : "none",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  DL
                </div>
                <div
                  style={{
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {order.dl}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: isMobile ? "1 1 calc(50% - 8px)" : "none",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  State
                </div>
                <div
                  style={{
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {order.state}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: isMobile ? "1 1 calc(50% - 8px)" : "none",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  County
                </div>
                <div
                  style={{
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {order.county}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: isMobile ? "1 1 calc(50% - 8px)" : "none",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  DOB
                </div>
                <div
                  style={{
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {order.dob}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: isMobile ? "1 1 calc(50% - 8px)" : "none",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Years to Search
                </div>
                <div
                  style={{
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {order.yearsToSearch}
                </div>
              </div>
            </div>

            {/* Comments Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Comments
                </div>
                <div
                  style={{
                    color: "#181D27",
                    fontFamily:
                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {order.comments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        padding: isTablet ? "20px 24px" : isMobile ? "16px" : "20px 24px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
        flex: "1 0 0",
        alignSelf: "stretch",
        borderRadius: "0px 0px 12px 12px",
        borderRight: "1px solid #E9EAEB",
        borderBottom: "1px solid #E9EAEB",
        borderLeft: "1px solid #E9EAEB",
        background: "#FFF",
        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
      }}
    >
      {/* Success message and actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-start",
          alignSelf: "stretch",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "16px" : "0",
        }}
      >
        {/* Message */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "4px",
            flex: isMobile ? "1" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "32px",
              height: "32px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "9999px",
              background: "#DCFAE6",
              flexShrink: 0,
            }}
          >
            <svg
              style={{
                width: "16px",
                height: "16px",
                flexShrink: 0,
              }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3332 4L5.99984 11.3333L2.6665 8"
                stroke="#079455"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <div
              style={{
                color: "#181D27",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              2 Orders Created Successfully
            </div>
            <div
              style={{
                color: "#535862",
                fontFamily:
                  "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Get your billing details{" "}
              <span
                style={{
                  color: "#344698",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#273572";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#344698";
                }}
              >
                here.
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: isMobile ? "stretch" : "auto",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <button
            onClick={onSeeAllOrders}
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
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
              e.currentTarget.style.borderColor = "#98A2B3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF";
              e.currentTarget.style.borderColor = "#D5D7DA";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "0 2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                See all Orders
              </div>
            </div>
          </button>
          <button
            onClick={onNewQuickCourtOrder}
            style={{
              display: "flex",
              minHeight: "36px",
              padding: "6px 8px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.12)",
              background: "#344698",
              boxShadow:
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2A3B87";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#344698";
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "0 2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#FFF",
                  fontFamily:
                    "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                New Quick Court Order
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Content divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            height: "1px",
            flex: "1 0 0",
            background: "#E9EAEB",
          }}
        ></div>
      </div>

      {/* Order cards */}
      {orders.map((order, index) => (
        <OrderCard key={order.id} order={order} index={index} />
      ))}
    </div>
  );
};

export default QuickCourtOrderConfirmation;
