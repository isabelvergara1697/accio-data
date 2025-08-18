import React, { useState } from "react";

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

interface ManageInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteData: InviteData | null;
}

export const ManageInvitationModal: React.FC<ManageInvitationModalProps> = ({
  isOpen,
  onClose,
  inviteData,
}) => {
  // State for radio button groups
  const [activateOrder, setActivateOrder] = useState<"yes" | "no">("yes");
  const [applicantCompletesOrder, setApplicantCompletesOrder] = useState<"yes" | "no">("yes");
  const [applicantCompletesI9, setApplicantCompletesI9] = useState<"yes" | "no">("yes");
  const [collectEWS, setCollectEWS] = useState<"yes" | "no">("yes");

  // State for form inputs
  const [invitationEmail, setInvitationEmail] = useState("cody.reeves@acciodata.com");
  const [emailSent, setEmailSent] = useState("Watch this video to understand the new process");
  const [invitationPhone, setInvitationPhone] = useState("+1 000 000 000");
  const [smsMessage, setSmsMessage] = useState("Add here SMS Message you'll like to sent.");
  const [invitationNotes, setInvitationNotes] = useState("Watch this video to understand the new process");

  if (!isOpen || !inviteData) return null;

  const RadioButton = ({ 
    checked, 
    onClick, 
    label 
  }: { 
    checked: boolean; 
    onClick: () => void; 
    label: string;
  }) => (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        position: "relative",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          paddingTop: "2px",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "20px",
            height: "20px",
            padding: checked ? "6px" : "0",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9999px",
            background: checked ? "#344698" : "transparent",
            border: checked ? "none" : "1px solid #D5D7DA",
            position: "relative",
          }}
        >
          {checked && (
            <div
              style={{
                width: "8px",
                height: "8px",
                flexShrink: 0,
                borderRadius: "9999px",
                background: "#FFF",
                position: "absolute",
                left: "6px",
                top: "6px",
              }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2px",
          position: "relative",
        }}
      >
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
              color: "#414651",
              fontFamily: "Public Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "24px",
              position: "relative",
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );

  const Divider = () => (
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
  );

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
                  d="M11.6663 9.16699H6.66634M8.33301 12.5003H6.66634M13.333 5.83366H6.66634M16.6663 8.75033V5.66699C16.6663 4.26686 16.6663 3.5668 16.3939 3.03202C16.1542 2.56161 15.7717 2.17916 15.3013 1.93948C14.7665 1.66699 14.0665 1.66699 12.6663 1.66699H7.33301C5.93288 1.66699 5.23281 1.66699 4.69803 1.93948C4.22763 2.17916 3.84517 2.56161 3.60549 3.03202C3.33301 3.5668 3.33301 4.26686 3.33301 5.66699V14.3337C3.33301 15.7338 3.33301 16.4339 3.60549 16.9686C3.84517 17.439 4.22763 17.8215 4.69803 18.0612C5.23281 18.3337 5.93288 18.3337 7.33301 18.3337H9.58301M18.333 18.3337L17.083 17.0837M17.9163 15.0003C17.9163 16.6112 16.6105 17.917 14.9997 17.917C13.3888 17.917 12.083 16.6112 12.083 15.0003C12.083 13.3895 13.3888 12.0837 14.9997 12.0837C16.6105 12.0837 17.9163 13.3895 17.9163 15.0003Z"
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
                Manage Invite
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
                Quickly manage and update your invite.
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
            padding: "0 24px 24px 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            position: "relative",
            overflowY: "auto",
            height: "calc(100vh - 100px)",
          }}
        >
          {/* Form */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Status */}
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
                  Started
                </div>
              </div>
            </div>

            {/* Form Section - Radio Button Groups */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* Activate Order */}
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
                    width: "160px",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "28px",
                    position: "relative",
                  }}
                >
                  Activate Order:
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <RadioButton 
                    checked={activateOrder === "yes"}
                    onClick={() => setActivateOrder("yes")}
                    label="Yes"
                  />
                  <RadioButton 
                    checked={activateOrder === "no"}
                    onClick={() => setActivateOrder("no")}
                    label="No"
                  />
                </div>
              </div>

              {/* Applicant Completes Order */}
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
                    width: "160px",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "28px",
                    position: "relative",
                  }}
                >
                  Applicant Completes Order:
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <RadioButton 
                    checked={applicantCompletesOrder === "yes"}
                    onClick={() => setApplicantCompletesOrder("yes")}
                    label="Yes"
                  />
                  <RadioButton 
                    checked={applicantCompletesOrder === "no"}
                    onClick={() => setApplicantCompletesOrder("no")}
                    label="No"
                  />
                </div>
              </div>

              {/* Applicant Completes I-9 */}
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
                    width: "160px",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "28px",
                    position: "relative",
                  }}
                >
                  Applicant Completes I-9:
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <RadioButton 
                    checked={applicantCompletesI9 === "yes"}
                    onClick={() => setApplicantCompletesI9("yes")}
                    label="Yes"
                  />
                  <RadioButton 
                    checked={applicantCompletesI9 === "no"}
                    onClick={() => setApplicantCompletesI9("no")}
                    label="No"
                  />
                </div>
              </div>

              {/* Collect EWS */}
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
                    width: "160px",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "28px",
                    position: "relative",
                  }}
                >
                  Collect EWS:
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <RadioButton 
                    checked={collectEWS === "yes"}
                    onClick={() => setCollectEWS("yes")}
                    label="Yes"
                  />
                  <RadioButton 
                    checked={collectEWS === "no"}
                    onClick={() => setCollectEWS("no")}
                    label="No"
                  />
                </div>
              </div>
            </div>

            <Divider />

            {/* Email Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* Invitation Email Input */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "2px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    Invitation Email:
                  </div>
                  <div
                    style={{
                      color: "#344698",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    *
                  </div>
                </div>
                <input
                  type="email"
                  value={invitationEmail}
                  onChange={(e) => setInvitationEmail(e.target.value)}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Email Sent Textarea */}
              <div
                style={{
                  display: "flex",
                  height: "142px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    Email Sent
                  </div>
                </div>
                <textarea
                  value={emailSent}
                  onChange={(e) => setEmailSent(e.target.value)}
                  style={{
                    display: "flex",
                    padding: "12px 14px",
                    alignItems: "flex-start",
                    gap: "8px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    resize: "none",
                    outline: "none",
                  }}
                />
              </div>

              {/* Resent Email Button */}
              <button
                style={{
                  display: "flex",
                  padding: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
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
                  }}
                >
                  Resent Email Invitation
                </div>
              </button>

              {/* Email Status Badge */}
              <div
                style={{
                  display: "flex",
                  padding: "2px 8px",
                  alignItems: "center",
                  borderRadius: "9999px",
                  border: "1px solid #E9EAEB",
                  background: "#FAFAFA",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    textAlign: "center",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  Email Invite has been sent (x) times.
                </div>
              </div>
            </div>

            <Divider />

            {/* SMS Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* Phone Input */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Invitation Phone
                </div>
                <input
                  type="tel"
                  value={invitationPhone}
                  onChange={(e) => setInvitationPhone(e.target.value)}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    outline: "none",
                  }}
                />
              </div>

              {/* SMS Message Textarea */}
              <div
                style={{
                  display: "flex",
                  height: "142px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  SMS Invitation Sent
                </div>
                <textarea
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  style={{
                    display: "flex",
                    padding: "12px 14px",
                    alignItems: "flex-start",
                    gap: "8px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    resize: "none",
                    outline: "none",
                  }}
                />
              </div>

              {/* Send SMS Button */}
              <button
                style={{
                  display: "flex",
                  padding: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                  }}
                >
                  Send SMS Invitation
                </div>
              </button>
            </div>

            <Divider />

            {/* Notes Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* Notes Textarea */}
              <div
                style={{
                  display: "flex",
                  height: "142px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#414651",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Invitation Notes
                </div>
                <textarea
                  value={invitationNotes}
                  onChange={(e) => setInvitationNotes(e.target.value)}
                  style={{
                    display: "flex",
                    padding: "12px 14px",
                    alignItems: "flex-start",
                    gap: "8px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    resize: "none",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <Divider />

            {/* Cancel Invitation Button */}
            <button
              style={{
                display: "flex",
                padding: "10px 14px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                background: "#D92D20",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Cancel Invitation
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
