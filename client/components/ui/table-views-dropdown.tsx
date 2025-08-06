import React, { useState, useRef, useEffect } from "react";

export interface TableView {
  id: string;
  name: string;
  isDefault?: boolean;
  config?: any; // Table configuration like filters, column orders, etc.
}

export interface TableViewsDropdownProps {
  currentView: string;
  views: TableView[];
  onViewChange: (viewId: string) => void;
  onSaveTableView: (viewName: string) => void;
  onCreateNewView: () => void;
  onDeleteTableView: (viewId: string) => void;
  onRenameTableView: (viewId: string, newName: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isMobile?: boolean;
}

export const TableViewsDropdown: React.FC<TableViewsDropdownProps> = ({
  currentView,
  views,
  onViewChange,
  onSaveTableView,
  onCreateNewView,
  onDeleteTableView,
  onRenameTableView,
  isOpen,
  onToggle,
  onClose,
  isMobile = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);
  const [tableName, setTableName] = useState("");
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
        setTableName("");
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
      alert("Maximum 3 table views allowed");
      return;
    }
    if (showNameInput) {
      // Save with the entered name
      if (tableName.trim()) {
        onSaveTableView(tableName);
        setShowNameInput(false);
        setTableName("");
      }
    } else {
      // Show input field
      setShowNameInput(true);
      setTableName("");
    }
  };

  const handleConfirmSave = () => {
    if (tableName.trim()) {
      onSaveTableView(tableName);
      setShowNameInput(false);
      setTableName("");
    }
  };

  const handleStartRename = (view: TableView) => {
    setIsRenaming(view.id);
    setRenameValue(view.name);
    setShowSubmenu(null);
  };

  const handleRenameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (renameValue.trim() && isRenaming) {
        onRenameTableView(isRenaming, renameValue);
        setIsRenaming(null);
        setRenameValue("");
      }
    } else if (e.key === "Escape") {
      setIsRenaming(null);
      setRenameValue("");
    }
  };

  const handleDeleteView = (viewId: string) => {
    onDeleteTableView(viewId);
    setShowSubmenu(null);
  };

  // Focus rename input when it becomes visible
  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);

  if (!isOpen) return null;

  return (
    <div
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
          ref={dropdownRef}
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
            {/* Table Views */}
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
                          onRenameTableView(view.id, renameValue);
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
                          d="M13.3334 4L6.00002 11.3333L2.66669 8"
                          stroke="#34479A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  /* Normal View Item */
                  <div
                    style={{
                      display: "flex",
                      padding: "6px 8px",
                      alignItems: "center",
                      gap: "8px",
                      flex: "1 0 0",
                      borderRadius: "6px",
                      background:
                        hoveredItem === view.id ? "#F8F9FA" : "transparent",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease-in-out",
                      position: "relative",
                    }}
                    onMouseEnter={() => setHoveredItem(view.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      onViewChange(view.id);
                      onClose();
                    }}
                  >
                    {/* Checkmark for current view */}
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {currentView === view.id && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3334 4L6.00002 11.3333L2.66669 8"
                            stroke="#34479A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* View Name */}
                    <div
                      style={{
                        flex: "1 0 0",
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "20px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {view.name}
                    </div>

                    {/* Three dots menu for non-default views */}
                    {!view.isDefault && (
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowSubmenu(showSubmenu === view.id ? null : view.id);
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
                            d="M8 8.66675C8.36819 8.66675 8.66667 8.36827 8.66667 8.00008C8.66667 7.63189 8.36819 7.33341 8 7.33341C7.63181 7.33341 7.33333 7.63189 7.33333 8.00008C7.33333 8.36827 7.63181 8.66675 8 8.66675Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 4.00008C8.36819 4.00008 8.66667 3.7016 8.66667 3.33341C8.66667 2.96522 8.36819 2.66675 8 2.66675C7.63181 2.66675 7.33333 2.96522 7.33333 3.33341C7.33333 3.7016 7.63181 4.00008 8 4.00008Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 13.3334C8.36819 13.3334 8.66667 13.0349 8.66667 12.6667C8.66667 12.2986 8.36819 12.0001 8 12.0001C7.63181 12.0001 7.33333 12.2986 7.33333 12.6667C7.33333 13.0349 7.63181 13.3334 8 13.3334Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        
                        {/* Submenu */}
                        {showSubmenu === view.id && (
                          <div
                            style={{
                              position: "absolute",
                              left: "calc(100% - 8px)",
                              top: "0",
                              width: "120px",
                              borderRadius: "8px",
                              border: "1px solid rgba(0, 0, 0, 0.08)",
                              background: "#FFF",
                              boxShadow:
                                "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
                              zIndex: 1001,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "4px 0px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              {/* Rename Option */}
                              <div
                                style={{
                                  display: "flex",
                                  padding: "1px 6px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartRename(view);
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "6px 8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                    borderRadius: "6px",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#F8F9FA";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
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
                                      d="M11.3333 2.00008C11.5085 1.82494 11.7396 1.72534 11.9804 1.72534C12.2213 1.72534 12.4524 1.82494 12.6275 2.00008C12.8027 2.17522 12.9023 2.40636 12.9023 2.64716C12.9023 2.88796 12.8027 3.11909 12.6275 3.29424L4.66667 11.2551L2 12.0001L2.74494 9.33341L10.7057 1.37258"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      color: "#181D27",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontWeight: "400",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Rename
                                  </div>
                                </div>
                              </div>

                              {/* Delete Option */}
                              <div
                                style={{
                                  display: "flex",
                                  padding: "1px 6px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteView(view.id);
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "6px 8px",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                    borderRadius: "6px",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#F8F9FA";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
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
                                      d="M10 6V12.6667M6 6V12.6667M2.66667 4H13.3333M12 4V13.3333C12 14.0697 11.4031 14.6667 10.6667 14.6667H5.33333C4.59695 14.6667 4 14.0697 4 13.3333V4M6.66667 4V2.66667C6.66667 1.93029 7.26362 1.33333 8 1.33333C8.73638 1.33333 9.33333 1.93029 9.33333 2.66667V4"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      color: "#181D27",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontWeight: "400",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Delete
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Save Input Section */}
            {showNameInput && (
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
                    borderRadius: "6px",
                    border: "2px solid #34479A",
                    background: "#FFF",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter table name..."
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleConfirmSave();
                      } else if (e.key === "Escape") {
                        setShowNameInput(false);
                        setTableName("");
                      }
                    }}
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
                    onClick={handleConfirmSave}
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
                        d="M13.3334 4L6.00002 11.3333L2.66669 8"
                        stroke="#34479A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
            {!showNameInput && (
              <div
                style={{
                  display: "flex",
                  padding: "1px 6px",
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
                      Save Table View
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
                      color: "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "18px",
                    }}
                  >
                    Save your current table configuration and switch between
                    different views.
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
                      marginLeft: "8px",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 3L3 9M3 3L9 9"
                        stroke="#A4A7AE"
                        strokeWidth="1.25"
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
