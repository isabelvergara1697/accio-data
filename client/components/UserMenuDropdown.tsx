import React from "react";
import { useNavigate } from "react-router-dom";

interface UserMenuDropdownProps {
  isOpen: boolean;
  onSignOut: () => void;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  isOpen,
  onSignOut,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: "216px",
        borderRadius: "12px",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        background: "#FAFAFA",
        boxShadow:
          "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "12px 12px 16px 16px",
          border: "1px solid #E9EAEB",
          background: "#FFF",
          position: "relative",
        }}
      >
        {/* Menu Items */}
        <div
          style={{
            display: "flex",
            padding: "6px 0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          {/* Account Item */}
          <div
            style={{
              display: "flex",
              padding: "0px 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    position: "relative",
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3337 14C13.3337 13.0696 13.3337 12.6044 13.2188 12.2259C12.9603 11.3736 12.2934 10.7067 11.4411 10.4482C11.0626 10.3333 10.5974 10.3333 9.66699 10.3333H6.33366C5.40328 10.3333 4.93809 10.3333 4.55956 10.4482C3.7073 10.7067 3.04035 11.3736 2.78182 12.2259C2.66699 12.6044 2.66699 13.0696 2.66699 14M11.0003 5C11.0003 6.65685 9.65718 8 8.00033 8C6.34347 8 5.00033 6.65685 5.00033 5C5.00033 3.34315 6.34347 2 8.00033 2C9.65718 2 11.0003 3.34315 11.0003 5Z"
                    stroke="#A4A7AE"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "rgba(65,70,81,1)",
                    }}
                  >
                    Account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Item */}
          <div
            style={{
              display: "flex",
              padding: "0px 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    position: "relative",
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.66634 7.33333H11.8663C12.6131 7.33333 12.9864 7.33333 13.2717 7.47866C13.5225 7.60649 13.7265 7.81046 13.8544 8.06135C13.9997 8.34656 13.9997 8.71993 13.9997 9.46667V14M8.66634 14V4.13333C8.66634 3.3866 8.66634 3.01323 8.52102 2.72801C8.39319 2.47713 8.18921 2.27316 7.93833 2.14532C7.65311 2 7.27974 2 6.53301 2H4.13301C3.38627 2 3.0129 2 2.72769 2.14532C2.4768 2.27316 2.27283 2.47713 2.145 2.72801C1.99967 3.01323 1.99967 3.3866 1.99967 4.13333V14M14.6663 14H1.33301M4.33301 4.66667H6.33301M4.33301 7.33333H6.33301M4.33301 10H6.33301"
                    stroke="#A4A7AE"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#252B37",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "rgba(37,43,55,1)",
                    }}
                  >
                    Company
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Switch Account Section */}
        <div
          style={{
            display: "flex",
            padding: "6px 0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
            alignSelf: "stretch",
            borderTop: "1px solid #E9EAEB",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "6px 12px 4px 12px",
              alignItems: "flex-start",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "18px",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "rgba(83,88,98,1)",
                }}
              >
                Switch account
              </span>
            </div>
          </div>

          {/* Current User Account */}
          <div
            style={{
              display: "flex",
              padding: "0px 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "6px 8px",
                alignItems: "flex-start",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
                background: "#F5F5F5",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "40px",
                    height: "40px",
                    padding: "30px 0px 0px 30px",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    aspectRatio: "1/1",
                    borderRadius: "9999px",
                    border: "1px solid rgba(0, 0, 0, 0.10)",
                    background:
                      "url(https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800) lightgray 50% / cover no-repeat",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      flexShrink: 0,
                      borderRadius: "9999px",
                      border: "1.5px solid #FFF",
                      background: "#17B26A",
                      position: "absolute",
                      left: "30px",
                      top: "30px",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                      alignSelf: "stretch",
                      overflow: "hidden",
                      color: "#181D27",
                      textOverflow: "ellipsis",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "rgba(24,29,39,1)",
                      }}
                    >
                      Alexandra Fitzwilliam
                    </span>
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
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(83,88,98,1)",
                      }}
                    >
                      [Role]
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "16px",
                    height: "16px",
                    padding: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "9999px",
                    background: "#344698",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      flexShrink: 0,
                      borderRadius: "9999px",
                      background: "#FFF",
                      position: "absolute",
                      left: "5px",
                      top: "5px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative User Account */}
          <div
            style={{
              display: "flex",
              padding: "0px 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "6px 8px",
                alignItems: "flex-start",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "40px",
                    height: "40px",
                    padding: "30px 0px 0px 30px",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    aspectRatio: "1/1",
                    borderRadius: "9999px",
                    border: "1px solid rgba(0, 0, 0, 0.10)",
                    background:
                      "url(https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2Ffe2cbcc18afe43589eb16ba5b34f47fd?format=webp&width=800) lightgray 50% / cover no-repeat, #E0E0E0",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      flexShrink: 0,
                      borderRadius: "9999px",
                      border: "1.5px solid #FFF",
                      background: "#17B26A",
                      position: "absolute",
                      left: "30px",
                      top: "30px",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                      alignSelf: "stretch",
                      overflow: "hidden",
                      color: "#181D27",
                      textOverflow: "ellipsis",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "rgba(24,29,39,1)",
                      }}
                    >
                      Sienna Hewitt
                    </span>
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
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(83,88,98,1)",
                      }}
                    >
                      [Role]
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "9999px",
                    border: "1px solid #D5D7DA",
                    position: "relative",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Actions */}
        <div
          style={{
            display: "flex",
            padding: "2px 8px 8px 8px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              minHeight: "32px",
              padding: "6px 8px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              flex: "1 0 0",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow:
                "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F5F5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF";
            }}
          >
            <svg
              style={{
                width: "24px",
                height: "24px",
                position: "relative",
              }}
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 5V19M5.5 12H19.5"
                stroke="#344698"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              style={{
                display: "flex",
                padding: "0px 2px",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "rgba(65,70,81,1)",
                  }}
                >
                  Add account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Items */}
        <div
          style={{
            display: "flex",
            padding: "4px 0px 6px 0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "0px 6px",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                alignItems: "center",
                gap: "12px",
                flex: "1 0 0",
                borderRadius: "6px",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={onSignOut}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    position: "relative",
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6M8 11.3333C8 11.9533 8 12.2633 7.93185 12.5176C7.74692 13.2078 7.20782 13.7469 6.51764 13.9319C6.26331 14 5.95332 14 5.33333 14H5C4.06812 14 3.60218 14 3.23463 13.8478C2.74458 13.6448 2.35523 13.2554 2.15224 12.7654C2 12.3978 2 11.9319 2 11V5C2 4.06812 2 3.60218 2.15224 3.23463C2.35523 2.74458 2.74458 2.35523 3.23463 2.15224C3.60218 2 4.06812 2 5 2H5.33333C5.95332 2 6.26331 2 6.51764 2.06815C7.20782 2.25308 7.74692 2.79218 7.93185 3.48236C8 3.7367 8 4.04669 8 4.66667"
                    stroke="#A4A7AE"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "rgba(65,70,81,1)",
                    }}
                  >
                    Sign Out
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
