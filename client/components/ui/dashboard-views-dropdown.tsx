import React, { useState, useRef, useEffect } from "react";

interface DashboardView {
  id: string;
  name: string;
  isDefault?: boolean;
}

interface DashboardViewsDropdownProps {
  currentView: string;
  views: DashboardView[];
  onViewChange: (viewId: string) => void;
  onSaveDashboard: (viewName: string) => void;
  onCreateNewView: () => void;
  onDeleteDashboard: (viewId: string) => void;
  onRenameDashboard: (viewId: string, newName: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isMobile?: boolean;
}

export const DashboardViewsDropdown: React.FC<DashboardViewsDropdownProps> = ({
  currentView,
  views,
  onViewChange,
  onSaveDashboard,
  onCreateNewView,
  onDeleteDashboard,
  onRenameDashboard,
  isOpen,
  onToggle,
  onClose,
  isMobile = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);
  const [dashboardName, setDashboardName] = useState("");
  const [showSubmenu, setShowSubmenu] = useState<string | null>(null);
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const currentViewData = views.find((view) => view.id === currentView);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
        setShowNameInput(false);
        setDashboardName("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Focus input when it becomes visible
  useEffect(() => {
    if (showNameInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNameInput]);

  const handleSaveClick = () => {
    if (views.length >= 3) {
      alert("Maximum 3 dashboards allowed");
      return;
    }
    if (showNameInput) {
      // Save with the entered name
      if (dashboardName.trim()) {
        onSaveDashboard(dashboardName);
        setShowNameInput(false);
        setDashboardName("");
      }
    } else {
      // Show input field
      setShowNameInput(true);
      setDashboardName("My Dashboard");
    }
  };

  const handleConfirmSave = () => {
    if (dashboardName.trim()) {
      onSaveDashboard(dashboardName);
      setShowNameInput(false);
      setDashboardName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && dashboardName.trim()) {
      onSaveDashboard(dashboardName);
      setShowNameInput(false);
      setDashboardName("");
    } else if (e.key === "Escape") {
      handleCancelInput();
    }
  };

  const handleRenameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && renameValue.trim()) {
      if (isRenaming) {
        onRenameDashboard(isRenaming, renameValue);
        setIsRenaming(null);
        setRenameValue("");
        setShowSubmenu(null);
      }
    } else if (e.key === "Escape") {
      setIsRenaming(null);
      setRenameValue("");
      setShowSubmenu(null);
    }
  };

  const handleDeleteDashboard = (viewId: string) => {
    onDeleteDashboard(viewId);
    setShowSubmenu(null);
  };

  const handleRename = (viewId: string, currentName: string) => {
    setIsRenaming(viewId);
    setRenameValue(currentName);
    setShowSubmenu(null);
  };

  const handleCancelInput = () => {
    setShowNameInput(false);
    setDashboardName("");
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        ...(isMobile ? { alignSelf: "stretch" } : {}),
      }}
    >
      {/* Dropdown Button */}
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: "flex",
          minHeight: "36px",
          padding: "6px 8px",
          justifyContent: isMobile ? "space-between" : "center",
          alignItems: "center",
          gap: "4px",
          borderRadius: "8px",
          border: "1px solid #D5D7DA",
          background: isOpen ? "#F5F5F5" : isHovered ? "#F8F9FA" : "#FFF",
          boxShadow:
            "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
          ...(isMobile ? { alignSelf: "stretch", width: "100%" } : {}),
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
            d="M8 8L14 8M8 2L8 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
            stroke={isOpen ? "#717680" : "#A4A7AE"}
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            padding: "0px 2px",
            justifyContent: isMobile ? "flex-start" : "center",
            alignItems: "center",
            ...(isMobile ? { flex: "1 0 0" } : {}),
          }}
        >
          <div
            style={{
              color: isOpen ? "#252B37" : "#414651",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "20px",
              textAlign: isMobile ? "left" : "center",
            }}
          >
            {currentViewData?.name || "Default"}
          </div>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke={isOpen ? "#717680" : "#A4A7AE"}
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            marginTop: "4px",
            display: "flex",
            width: "232px",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: "8px",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            background: "#FFF",
            boxShadow:
              "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
            zIndex: 1000,
            ...(isMobile
              ? {
                  left: "50%",
                  transform: "translateX(-50%)",
                  right: "auto",
                }
              : {}),
          }}
        >
          {/* Menu Items */}
          <div
            style={{
              display: "flex",
              padding: "4px 0px",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            {/* Current Selected View */}
            {views.map((view) => (
              <div
                key={view.id}
                style={{
                  display: "flex",
                  padding: "1px 6px",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <div
                  onClick={() => {
                    if (view.id !== currentView) {
                      onViewChange(view.id);
                    }
                  }}
                  onMouseEnter={() => setHoveredItem(view.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: "flex",
                    padding: "8px 10px 8px 8px",
                    alignItems: "center",
                    gap: "8px",
                    flex: "1 0 0",
                    borderRadius: "6px",
                    background:
                      view.id === currentView
                        ? "#F5F5F5"
                        : hoveredItem === view.id
                          ? "#FAFAFA"
                          : "transparent",
                    cursor: view.id === currentView ? "default" : "pointer",
                    transition: "background-color 0.2s ease-in-out",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: "1 0 0",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: view.id === currentView ? "500" : "400",
                        lineHeight: "20px",
                      }}
                    >
                      {view.name}
                    </div>
                  </div>
                  {view.id === currentView && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#344698"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}

            {/* Divider */}
            <div
              style={{
                display: "flex",
                padding: "4px 0px",
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

            {/* Save Dashboard Section */}
            {showNameInput ? (
              /* Input Field for Dashboard Name */
              <div
                style={{
                  display: "flex",
                  height: "42px",
                  padding: "1px 6px",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "220px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "6px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "6px 8px",
                        alignItems: "center",
                        gap: "8px",
                        alignSelf: "stretch",
                        borderRadius: "8px",
                        border: "2px solid #34479A",
                        background: "#FFF",
                        boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "2px 0px",
                          alignItems: "center",
                          gap: "8px",
                          flex: "1 0 0",
                        }}
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          value={dashboardName}
                          onChange={(e) => setDashboardName(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Dashboard name"
                          style={{
                            flex: "1 0 0",
                            overflow: "hidden",
                            color: "#181D27",
                            textOverflow: "ellipsis",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "20px",
                            border: "none",
                            outline: "none",
                            background: "transparent",
                          }}
                        />
                        {/* Cancel Button */}
                        <button
                          onClick={handleCancelInput}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "16px",
                            height: "16px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "0",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.91671 4.08334L4.08337 9.91668M4.08337 4.08334L9.91671 9.91668"
                              stroke="#A4A7AE"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Save Dashboard Button */
              <div
                style={{
                  display: "flex",
                  height: "38px",
                  padding: "1px 6px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <button
                  onClick={handleSaveClick}
                  onMouseEnter={() => setHoveredItem("save")}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: hoveredItem === "save" ? "#F8F9FA" : "#FFF",
                    boxShadow:
                      "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease-in-out",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "0px 2px",
                      justifyContent: "center",
                      alignItems: "center",
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
                      Save Dashboard
                    </div>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.16667 2V4.26667C5.16667 4.64004 5.16667 4.82672 5.23933 4.96933C5.30324 5.09477 5.40523 5.19676 5.53067 5.26067C5.67328 5.33333 5.85997 5.33333 6.23333 5.33333H10.7667C11.14 5.33333 11.3267 5.33333 11.4693 5.26067C11.5948 5.19676 11.6968 5.09477 11.7607 4.96933C11.8333 4.82672 11.8333 4.64004 11.8333 4.26667V2.66667M11.8333 14V9.73333C11.8333 9.35997 11.8333 9.17328 11.7607 9.03067C11.6968 8.90523 11.5948 8.80324 11.4693 8.73933C11.3267 8.66667 11.14 8.66667 10.7667 8.66667H6.23333C5.85997 8.66667 5.67328 8.66667 5.53067 8.73933C5.40523 8.80324 5.30324 8.90523 5.23933 9.03067C5.16667 9.17328 5.16667 9.35997 5.16667 9.73333V14M14.5 6.21699V10.8C14.5 11.9201 14.5 12.4802 14.282 12.908C14.0903 13.2843 13.7843 13.5903 13.408 13.782C12.9802 14 12.4201 14 11.3 14H5.7C4.5799 14 4.01984 14 3.59202 13.782C3.21569 13.5903 2.90973 13.2843 2.71799 12.908C2.5 12.4802 2.5 11.9201 2.5 10.8V5.2C2.5 4.0799 2.5 3.51984 2.71799 3.09202C2.90973 2.71569 3.21569 2.40973 3.59202 2.21799C4.01984 2 4.5799 2 5.7 2H10.283C10.6091 2 10.7722 2 10.9256 2.03684C11.0617 2.0695 11.1918 2.12337 11.311 2.19648C11.4456 2.27894 11.5609 2.39424 11.7915 2.62484L13.8752 4.7085C14.1058 4.9391 14.2211 5.0544 14.3035 5.18895C14.3766 5.30825 14.4305 5.43831 14.4632 5.57436C14.5 5.72781 14.5 5.89087 14.5 6.21699Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Info Section */}
            {showInfo && (
              <div
                style={{
                  display: "flex",
                  padding: "1px 6px",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "4px 10px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flex: "1 0 0",
                    borderRadius: "6px",
                    background: "#FAFAFA",
                  }}
                >
                  <div
                    style={{
                      flex: "1 0 0",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "18px",
                    }}
                  >
                    Customize your Dashboard and save it for faster productivity
                  </div>
                  <button
                    onClick={() => setShowInfo(false)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.91671 4.08334L4.08337 9.91668M4.08337 4.08334L9.91671 9.91668"
                        stroke="#A4A7AE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
