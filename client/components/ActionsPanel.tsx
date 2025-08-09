import React from "react";

interface ActionsPanelProps {
  isVisible: boolean;
  onClose: () => void;
  selectedCount: number;
  onAction: (action: string) => void;
}

export const ActionsPanel: React.FC<ActionsPanelProps> = ({
  isVisible,
  onClose,
  selectedCount,
  onAction,
}) => {
  const actions = [
    { id: "customer-service", label: "Customer Service Inquiry" },
    { id: "add-rescreening", label: "Add Automated Rescreening" },
    { id: "remove-rescreening", label: "Remove Automated Rescreening" },
    { id: "add-stayclear", label: "Add StayClear Monitoring" },
    { id: "remove-stayclear", label: "Remove StayClear Monitoring" },
    { id: "archive", label: "Archive" },
    { id: "set-reviewed", label: "Set Status to Reviewed" },
    { id: "unreview", label: "Un/review" },
    { id: "activate-orders", label: "Activate Saved Orders" },
    { id: "move-hired", label: "Move to Hired" },
    { id: "set-termination", label: "Set Employment Termination" },
    { id: "print-i9", label: "Print I-9 Document" },
  ];

  if (!isVisible) return null;

  return (
    <div
      style={{
        display: "flex",
        width: "258px",
        height: "700px",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* Header */}
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
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "28px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 600,
                        fontSize: "18px",
                        color: "rgba(24,29,39,1)",
                      }}
                    >
                      Actions
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                position: "relative",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  border: "1px solid #D5D7DA",
                  background: "#FFF",
                  boxShadow:
                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F5F5F5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FFF";
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
                    d="M11.3334 4.66663L4.66675 11.3333M4.66675 4.66663L11.3334 11.3333"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions List */}
      <div
        style={{
          display: "flex",
          padding: "12px 12px 16px 12px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
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
        {/* Action buttons vertically stacked as per Figma */}
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            style={{
              display: "flex",
              minHeight: "36px",
              padding: "6px 8px",
              alignItems: "center",
              gap: "4px",
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow:
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F5F5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF";
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
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                  position: "relative",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
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
                  {action.label}
                </span>
              </div>
            </div>
          </button>
        ))}
        
        {/* Save PDF Button */}
        <button
          onClick={() => onAction("save-pdf")}
          style={{
            display: "flex",
            minHeight: "36px",
            padding: "6px 8px",
            alignItems: "center",
            gap: "4px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: "1px solid #D5D7DA",
            background: "#FFF",
            boxShadow:
              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F5F5F5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFF";
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
                Save PDF
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
