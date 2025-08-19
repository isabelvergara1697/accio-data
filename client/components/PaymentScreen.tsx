import React, { useState } from "react";

interface PaymentScreenProps {
  onAuthorizePayment: () => void;
  onSeeDetails: () => void;
}

interface OrderItem {
  id: string;
  name: string;
  dl: string;
  state: string;
  request: string;
  price: number;
  taxes: number;
  total: number;
  checked: boolean;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  onAuthorizePayment,
  onSeeDetails,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Lopez, Sandra",
      dl: "129503923",
      state: "TX",
      request: "849235",
      price: 8.00,
      taxes: 1.15,
      total: 15.15,
      checked: true,
    },
    {
      id: "2", 
      name: "Lopez, Sandra",
      dl: "129503923",
      state: "TX",
      request: "849235",
      price: 8.00,
      taxes: 1.15,
      total: 15.15,
      checked: true,
    },
  ]);

  const toggleItemCheck = (id: string) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const calculateTotal = () => {
    return orderItems
      .filter(item => item.checked)
      .reduce((sum, item) => sum + item.total, 0)
      .toFixed(2);
  };

  const handleSeeDetails = () => {
    setShowDetails(!showDetails);
    onSeeDetails();
  };

  const Checkbox = ({ 
    checked, 
    onClick 
  }: { 
    checked: boolean; 
    onClick: () => void; 
  }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "16px",
          height: "16px",
          padding: "1px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
          background: checked ? "#344698" : "transparent",
          border: checked ? "none" : "1px solid #D5D7DA",
          position: "relative",
        }}
      >
        {checked && (
          <svg
            style={{
              width: "14px",
              height: "14px",
              flexShrink: 0,
              position: "absolute",
              left: "1px",
              top: "1px",
            }}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6663 3.5L5.24967 9.91667L2.33301 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "700px",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        position: "relative",
      }}
    >
      {/* Section Headers */}
      <div
        style={{
          display: "flex",
          height: "64px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          flexShrink: 0,
          alignSelf: "stretch",
          borderRadius: "12px 12px 0 0",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px 16px 12px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "4px",
                flex: "1 0 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "2px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "28px",
                      position: "relative",
                    }}
                  >
                    Create MVR Order
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table/Payment Content */}
      <div
        style={{
          display: "flex",
          padding: "20px 16px",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          flex: "1 0 0",
          alignSelf: "stretch",
          borderRadius: "0px 0px 12px 12px",
          borderRight: "1px solid #E9EAEB",
          borderBottom: "1px solid #E9EAEB",
          borderLeft: "1px solid #E9EAEB",
          background: "#FFF",
          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          position: "relative",
        }}
      >
        {/* Receipt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              color: "#181D27",
              textAlign: "center",
              fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "24px",
              position: "relative",
            }}
          >
            Your total is ${calculateTotal()}
          </div>
          {/* Button Group */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              position: "relative",
            }}
          >
            {/* Authorize Payment Button */}
            <div
              onClick={onAuthorizePayment}
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
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2D3985";
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
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Authorize Payment
                </div>
              </div>
            </div>
            {/* See Details Button */}
            <div
              onClick={handleSeeDetails}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#273572",
                  fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                  position: "relative",
                }}
              >
                See details
              </div>
              <svg
                style={{
                  width: "16px",
                  height: "16px",
                  position: "relative",
                  transform: showDetails ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 0.2s ease",
                }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 10L8 6L4 10"
                  stroke="#34479A"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            style={{
              maxWidth: "480px",
              color: "#344698",
              textAlign: "center",
              fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationSkipInk: "none",
              textDecorationThickness: "auto",
              textUnderlineOffset: "auto",
              textUnderlinePosition: "from-font",
              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(83,88,98,1)",
              }}
            >
              By authorizing this payment, automatic searches will be done and you'll be charged to your [Billing Setup]. Get more information{" "}
            </span>
            <span
              style={{
                fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(52,70,152,1)",
                textDecoration: "underline",
              }}
            >
              here.
            </span>
          </div>
        </div>

        {/* Detailed Receipt - Show when details are expanded */}
        {showDetails && (
          <>
            {orderItems.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  padding: "12px 8px",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid #E9EAEB",
                  background: item.checked ? "#FAFAFA" : "#F5F5F5",
                  position: "relative",
                }}
              >
                {/* Order Info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <Checkbox 
                    checked={item.checked} 
                    onClick={() => toggleItemCheck(item.id)} 
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "163px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "20px",
                        position: "relative",
                      }}
                    >
                      {item.name}
                    </div>
                    {/* DL Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: item.checked ? "#414651" : "#717680",
                          textAlign: "center",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        DL
                      </div>
                      <div
                        style={{
                          color: item.checked ? "#181D27" : "#717680",
                          textAlign: "center",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        {item.dl} 
                      </div>
                    </div>
                    {/* State Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: item.checked ? "#414651" : "#717680",
                          textAlign: "center",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        State
                      </div>
                      <div
                        style={{
                          color: item.checked ? "#181D27" : "#717680",
                          textAlign: "center",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        {item.state}
                      </div>
                    </div>
                    {/* Request Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: item.checked ? "#414651" : "#717680",
                          textAlign: "center",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        Request
                      </div>
                      <div
                        style={{
                          color: item.checked ? "#181D27" : "#717680",
                          textAlign: "center",
                          fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        {item.request}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table Row - Following exact Figma structure */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  {/* Search Type Column (Inc) */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        opacity: 0.1,
                        position: "relative",
                      }}
                    >
                      Inc
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        fontVariant: "small-caps",
                        position: "relative",
                      }}
                    >
                      Inc
                    </div>
                    <div
                      style={{
                        width: "22px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      N
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        position: "relative",
                      }}
                    >
                      Y
                    </div>
                  </div>

                  {/* Search Type Column */}
                  <div
                    style={{
                      display: "flex",
                      width: "139px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "10px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        opacity: 0.1,
                        position: "relative",
                      }}
                    >
                      Search Type
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        fontVariant: "small-caps",
                        position: "relative",
                      }}
                    >
                      Search Type
                    </div>
                    <div
                      style={{
                        width: "139px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      MVR Package
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      Motor Vehicle Driving History/TX/CDL
                    </div>
                  </div>

                  {/* Location Adjustment Column */}
                  <div
                    style={{
                      display: "flex",
                      width: "160px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      Location/Adjustment
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        fontVariant: "small-caps",
                        position: "relative",
                      }}
                    >
                      Reason
                    </div>
                    <div
                      style={{
                        width: "160px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                  </div>

                  {/* Price Column */}
                  <div
                    style={{
                      display: "flex",
                      width: "144px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        opacity: 0.1,
                        position: "relative",
                      }}
                    >
                      Price
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        fontVariant: "small-caps",
                        position: "relative",
                      }}
                    >
                      Price
                    </div>
                    <div
                      style={{
                        width: "144px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      {item.price.toFixed(2)}
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      Included in package
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      0.00
                    </div>
                  </div>

                  {/* Adjustments Column */}
                  <div
                    style={{
                      display: "flex",
                      width: "73px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        opacity: 0.1,
                        position: "relative",
                      }}
                    >
                      Adjustment
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        fontVariant: "small-caps",
                        position: "relative",
                      }}
                    >
                      Adjustment
                    </div>
                    <div
                      style={{
                        width: "73px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      0.00
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      Included in package
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      0.00
                    </div>
                  </div>

                  {/* 3rd Party Fees Column */}
                  <div
                    style={{
                      display: "flex",
                      width: "105px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        opacity: 0.1,
                        position: "relative",
                      }}
                    >
                      3rd Party Fees
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        fontVariant: "small-caps",
                        position: "relative",
                      }}
                    >
                      3rd Party Fees
                    </div>
                    <div
                      style={{
                        width: "105px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      0.00
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      Included in package
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      0.00
                    </div>
                  </div>

                  {/* Taxes Column */}
                  <div
                    style={{
                      display: "flex",
                      width: "53px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        opacity: 0.1,
                        position: "relative",
                      }}
                    >
                      Taxes
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        fontVariant: "small-caps",
                        position: "relative",
                      }}
                    >
                      Taxes
                    </div>
                    <div
                      style={{
                        width: "53px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "34px",
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      {item.taxes.toFixed(2)}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      Included in package
                    </div>
                    <div
                      style={{
                        width: "34px",
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      0.00
                    </div>
                  </div>

                  {/* Total Column */}
                  <div
                    style={{
                      display: "flex",
                      width: "68px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        opacity: 0.1,
                        position: "relative",
                      }}
                    >
                      Total
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        fontVariant: "small-caps",
                        position: "relative",
                      }}
                    >
                      Total
                    </div>
                    <div
                      style={{
                        width: "68px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      9.15
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      Included in package
                    </div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      6.00
                    </div>
                    <div
                      style={{
                        width: "68px",
                        height: "1px",
                        background: "#D5D7DA",
                        position: "relative",
                      }}
                    ></div>
                    <div
                      style={{
                        color: item.checked ? "#181D27" : "#717680",
                        textAlign: "center",
                        fontFamily: "Roboto Mono, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "18px",
                        position: "relative",
                      }}
                    >
                      {item.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
