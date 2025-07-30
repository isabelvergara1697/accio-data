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
      setDashboardName("");
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
        ...(isMobile
          ? { alignSelf: "stretch", width: "100%", display: "block" }
          : { display: "inline-flex", minWidth: "fit-content" }),
      }}
    >
      {/* Dropdown Button */}
      <button
        className="dashboard-button"
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
          // Ensure button takes full width on mobile like other buttons
          ...(isMobile
            ? {
                alignSelf: "stretch",
                width: "100%",
                flexGrow: 1,
                minWidth: 0,
                maxWidth: "none",
              }
            : {}),
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
            justifyContent: isMobile ? "center" : "center",
            alignItems: "center",
            ...(isMobile ? { flex: "1 0 0" } : {}),
          }}
        >
          <div
            style={{
              ...(isMobile ? { flex: "1 0 0" } : {}),
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
            width: isMobile ? "100%" : "232px",
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
                  left: "0",
                  right: "0",
                  width: "100%",
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
            {/* Dashboard Views */}
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
                {isRenaming === view.id ? (
                  /* Rename Input */
                  <div
                    style={{
                      display: "flex",
                      padding: "6px 8px",
                      alignItems: "center",
                      gap: "8px",
                      flex: "1 0 0",
                      borderRadius: "6px",
                      border: "2px solid #34479A",
                      background: "#FFF",
                    }}
                  >
                    <input
                      ref={renameInputRef}
                      type="text"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={handleRenameKeyPress}
                      style={{
                        flex: "1 0 0",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "20px",
                      }}
                    />
                    <button
                      onClick={() => {
                        if (renameValue.trim()) {
                          onRenameDashboard(view.id, renameValue);
                          setIsRenaming(null);
                          setRenameValue("");
                        }
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                          d="M13.3334 4L6.00008 11.3333L2.66675 8"
                          stroke="#344698"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        setIsRenaming(null);
                        setRenameValue("");
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px",
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
                ) : (
                  /* Normal View Display */
                  <div
                    style={{
                      display: "flex",
                      height: "40px",
                      padding: "8px",
                      alignItems: "center",
                      gap: "8px",
                      flex: "1 0 0",
                      borderRadius: "6px",
                      background:
                        view.id === currentView
                          ? "#F5F5F5"
                          : hoveredItem === view.id
                            ? "#F5F5F5"
                            : "transparent",
                      position: "relative",
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
                        alignItems: "center",
                        gap: "8px",
                        flex: "1 0 0",
                        cursor: view.id === currentView ? "default" : "pointer",
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
                    {!view.isDefault && (
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSubmenu(
                              showSubmenu === view.id ? null : view.id,
                            );
                          }}
                          style={{
                            display: "flex",
                            padding: "4px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "6px",
                            background: "#F5F5F5",
                            border: "none",
                            cursor: "pointer",
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
                              d="M8.00004 8.66666C8.36823 8.66666 8.66671 8.36818 8.66671 7.99999C8.66671 7.6318 8.36823 7.33332 8.00004 7.33332C7.63185 7.33332 7.33337 7.6318 7.33337 7.99999C7.33337 8.36818 7.63185 8.66666 8.00004 8.66666Z"
                              stroke="#717680"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.00004 3.99999C8.36823 3.99999 8.66671 3.70151 8.66671 3.33332C8.66671 2.96513 8.36823 2.66666 8.00004 2.66666C7.63185 2.66666 7.33337 2.96513 7.33337 3.33332C7.33337 3.70151 7.63185 3.99999 8.00004 3.99999Z"
                              stroke="#717680"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.00004 13.3333C8.36823 13.3333 8.66671 13.0348 8.66671 12.6667C8.66671 12.2985 8.36823 12 8.00004 12C7.63185 12 7.33337 12.2985 7.33337 12.6667C7.33337 13.0348 7.63185 13.3333 8.00004 13.3333Z"
                              stroke="#717680"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        {/* Submenu */}
                        {showSubmenu === view.id && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              right: "0",
                              marginTop: "4px",
                              display: "flex",
                              width: isMobile ? "100%" : "220px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              borderRadius: "8px",
                              border: "1px solid rgba(0, 0, 0, 0.08)",
                              background: "#FFF",
                              boxShadow:
                                "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
                              zIndex: 1001,
                              ...(isMobile
                                ? {
                                    right: "auto",
                                    left: "0",
                                    width: "100%",
                                  }
                                : {}),
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "4px 0px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                alignSelf: "stretch",
                              }}
                            >
                              {/* Rename Option */}
                              <div
                                onClick={() => handleRename(view.id, view.name)}
                                style={{
                                  display: "flex",
                                  padding: "1px 6px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  cursor: "pointer",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "8px 10px",
                                    alignItems: "center",
                                    gap: "12px",
                                    flex: "1 0 0",
                                    borderRadius: "6px",
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
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.87604 18.1156C2.92198 17.7021 2.94496 17.4954 3.00751 17.3022C3.06301 17.1307 3.14143 16.9676 3.24064 16.8171C3.35246 16.6475 3.49955 16.5005 3.79373 16.2063L17 3C18.1046 1.89543 19.8955 1.89543 21 3C22.1046 4.10457 22.1046 5.89543 21 7L7.79373 20.2063C7.49955 20.5005 7.35245 20.6475 7.18289 20.7594C7.03245 20.8586 6.86929 20.937 6.69785 20.9925C6.5046 21.055 6.29786 21.078 5.88437 21.124L2.5 21.5L2.87604 18.1156Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.5"
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
                                        fontWeight: "600",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Rename Dashboard
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Delete Option - Only show if more than 1 dashboard exists */}
                              {views.length > 1 && (
                                <div
                                  onClick={() => handleDeleteDashboard(view.id)}
                                  style={{
                                    display: "flex",
                                    padding: "1px 6px",
                                    alignItems: "center",
                                    alignSelf: "stretch",
                                    cursor: "pointer",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "8px 10px",
                                      alignItems: "center",
                                      gap: "12px",
                                      flex: "1 0 0",
                                      borderRadius: "6px",
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
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.5"
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
                                          fontWeight: "600",
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Delete Dashboard
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Save Dashboard Section */}
            {showNameInput ? (
              /* Input Field for Dashboard Name */
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
                    padding: "6px 8px",
                    alignItems: "center",
                    gap: "8px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    border: "2px solid #34479A",
                    background: "#FFF",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    minWidth: 0,
                    maxWidth: "100%",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={dashboardName}
                    onChange={(e) => setDashboardName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Dashboard view name"
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
                      minWidth: 0,
                    }}
                  />
                  {/* Check Button */}
                  <button
                    onClick={handleConfirmSave}
                    disabled={!dashboardName.trim()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      background: "transparent",
                      border: "none",
                      cursor: dashboardName.trim() ? "pointer" : "not-allowed",
                      padding: "2px",
                      opacity: dashboardName.trim() ? 1 : 0.5,
                      flexShrink: 0,
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
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="#344698"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {/* Cancel Button */}
                  <button
                    onClick={handleCancelInput}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px",
                      flexShrink: 0,
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
