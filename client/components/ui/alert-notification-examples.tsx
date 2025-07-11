import React, { useState } from "react";
import AlertNotification from "./alert-notification";

// Example usage of the AlertNotification component
export function AlertNotificationExamples() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      style={{
        padding: "20px",
        gap: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Alert Notification Examples</h2>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={() => setShowSuccess(true)}
          style={{
            padding: "8px 16px",
            background: "#079455",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Show Success (Top)
        </button>

        <button
          onClick={() => setShowError(true)}
          style={{
            padding: "8px 16px",
            background: "#F04438",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Show Error (Bottom)
        </button>

        <button
          onClick={() => setShowWarning(true)}
          style={{
            padding: "8px 16px",
            background: "#F59E0B",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Show Warning (Auto-hide)
        </button>

        <button
          onClick={() => setShowInfo(true)}
          style={{
            padding: "8px 16px",
            background: "#0EA5E9",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Show Info
        </button>
      </div>

      {/* Success notification - positioned at top */}
      {showSuccess && (
        <AlertNotification
          title="Account Activated Successfully"
          description="Manage your account and update your personal details in settings."
          variant="success"
          position="top"
          onDismiss={() => setShowSuccess(false)}
          primaryAction={{
            label: "Update Account",
            onClick: () => {
              console.log("Update account clicked");
              setShowSuccess(false);
            },
          }}
          secondaryAction={{
            label: "Dismiss",
            onClick: () => setShowSuccess(false),
          }}
        />
      )}

      {/* Error notification - positioned at bottom */}
      {showError && (
        <AlertNotification
          title="Error Occurred"
          description="There was an issue processing your request. Please try again."
          variant="error"
          position="bottom"
          onDismiss={() => setShowError(false)}
          primaryAction={{
            label: "Retry",
            onClick: () => {
              console.log("Retry clicked");
              setShowError(false);
            },
          }}
        />
      )}

      {/* Warning notification - auto-hide after 3 seconds */}
      {showWarning && (
        <AlertNotification
          title="Session Expiring Soon"
          description="Your session will expire in 5 minutes. Please save your work."
          variant="warning"
          position="top"
          onDismiss={() => setShowWarning(false)}
          autoHide={true}
          autoHideDelay={3000}
          primaryAction={{
            label: "Extend Session",
            onClick: () => {
              console.log("Extend session clicked");
              setShowWarning(false);
            },
          }}
        />
      )}

      {/* Info notification - simple */}
      {showInfo && (
        <AlertNotification
          title="New Feature Available"
          description="Check out our new dashboard analytics feature."
          variant="info"
          position="top"
          onDismiss={() => setShowInfo(false)}
        />
      )}
    </div>
  );
}

// Example of using the component programmatically
export const showAccountActivationNotification = (
  onDismiss: () => void,
  onUpdateAccount: () => void,
) => {
  return (
    <AlertNotification
      title="Account Activated Successfully"
      description="Manage your account and update your personal details in settings."
      variant="success"
      position="top" // Use "bottom" for tablet/mobile
      onDismiss={onDismiss}
      primaryAction={{
        label: "Update Account",
        onClick: onUpdateAccount,
      }}
      secondaryAction={{
        label: "Dismiss",
        onClick: onDismiss,
      }}
    />
  );
};

// Example of error notification
export const showErrorNotification = (
  title: string,
  description: string,
  onDismiss: () => void,
  onRetry?: () => void,
) => {
  return (
    <AlertNotification
      title={title}
      description={description}
      variant="error"
      position="bottom"
      onDismiss={onDismiss}
      primaryAction={
        onRetry
          ? {
              label: "Retry",
              onClick: onRetry,
            }
          : undefined
      }
    />
  );
};

export default AlertNotificationExamples;
