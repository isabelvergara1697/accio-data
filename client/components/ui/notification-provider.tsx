import React, { createContext, useContext, useState, useCallback } from "react";
import AlertNotification from "./alert-notification";

interface NotificationData {
  id: string;
  title: string;
  description: string;
  variant?: "success" | "error" | "warning" | "info";
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  autoHide?: boolean;
  autoHideDelay?: number;
}

interface NotificationContextType {
  showNotification: (notification: Omit<NotificationData, "id">) => void;
  hideNotification: (id: string) => void;
  hideAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update responsive state
  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showNotification = useCallback(
    (notification: Omit<NotificationData, "id">) => {
      const id = `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newNotification: NotificationData = {
        id,
        ...notification,
        autoHide: notification.autoHide ?? true,
        autoHideDelay: notification.autoHideDelay ?? 15000,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Auto-hide if enabled
      if (newNotification.autoHide) {
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, newNotification.autoHideDelay);
      }
    },
    [],
  );

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const hideAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const getNotificationPosition = () => {
    return isDesktop ? "top" : "bottom";
  };

  const getNotificationBreakpoint = () => {
    if (isDesktop) return "desktop";
    if (isMobile) return "mobile";
    return "tablet";
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
        hideAllNotifications,
      }}
    >
      {children}

      {/* Render Notifications */}
      {notifications.map((notification) => (
        <AlertNotification
          key={notification.id}
          title={notification.title}
          description={notification.description}
          variant={notification.variant || "success"}
          position={getNotificationPosition()}
          breakpoint={getNotificationBreakpoint()}
          onDismiss={() => hideNotification(notification.id)}
          autoHide={notification.autoHide}
          autoHideDelay={notification.autoHideDelay}
          primaryAction={notification.primaryAction}
          secondaryAction={{
            label: "Dismiss",
            onClick: () => hideNotification(notification.id),
            ...notification.secondaryAction,
          }}
        />
      ))}
    </NotificationContext.Provider>
  );
};
