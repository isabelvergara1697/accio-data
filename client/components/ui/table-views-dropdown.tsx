import React, { useState, useRef, useEffect } from "react";

export interface TableView {
  id: string;
  name: string;
  isDefault?: boolean;
  config?: any; // Table configuration like filters, column orders, etc.
}

export interface TableViewsDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  views: TableView[];
  currentView: TableView;
  onViewChange: (view: TableView) => void;
  onSaveTableView?: (name: string) => void;
  onCreateNewView?: () => void;
  onDeleteTableView?: (viewId: string) => void;
  onRenameTableView?: (viewId: string, newName: string) => void;
  style?: React.CSSProperties;
}

export const TableViewsDropdown: React.FC<TableViewsDropdownProps> = ({
  isOpen,
  onToggle,
  views,
  currentView,
  onViewChange,
  onSaveTableView,
  onCreateNewView,
  onDeleteTableView,
  onRenameTableView,
  style = {},
}) => {
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [saveInputValue, setSaveInputValue] = useState("");
  const [showRenameInput, setShowRenameInput] = useState<string | null>(null);
  const [renameInputValue, setRenameInputValue] = useState("");
  const [showSubmenu, setShowSubmenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const saveInputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  // Focus input when save mode becomes active
  useEffect(() => {
    if (showSaveInput && saveInputRef.current) {
      saveInputRef.current.focus();
    }
  }, [showSaveInput]);

  // Focus input when rename mode becomes active
  useEffect(() => {
    if (showRenameInput && renameInputRef.current) {
      renameInputRef.current.focus();
    }
  }, [showRenameInput]);

  // Handle save action
  const handleSaveClick = () => {
    setShowSaveInput(true);
    setSaveInputValue("");
  };

  const handleSaveSubmit = () => {
    if (saveInputValue.trim() && onSaveTableView) {
      onSaveTableView(saveInputValue.trim());
      setShowSaveInput(false);
      setSaveInputValue("");
      onToggle();
    }
  };

  const handleSaveCancel = () => {
    setShowSaveInput(false);
    setSaveInputValue("");
  };

  // Handle rename action
  const handleRenameClick = (viewId: string, currentName: string) => {
    setShowRenameInput(viewId);
    setRenameInputValue(currentName);
    setShowSubmenu(null);
  };

  const handleRenameSubmit = (viewId: string) => {
    if (renameInputValue.trim() && onRenameTableView) {
      onRenameTableView(viewId, renameInputValue.trim());
      setShowRenameInput(null);
      setRenameInputValue("");
    }
  };

  const handleRenameCancel = () => {
    setShowRenameInput(null);
    setRenameInputValue("");
  };

  // Handle delete action
  const handleDeleteClick = (viewId: string) => {
    if (onDeleteTableView) {
      onDeleteTableView(viewId);
      setShowSubmenu(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        right: "0",
        width: "240px",
        borderRadius: "8px",
        border: "1px solid rgba(10, 13, 18, 0.04)",
        background: "rgba(255, 255, 255, 1)",
        boxShadow:
          "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
        zIndex: 9999,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "4px 0",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        {/* View List */}
        {views.map((view) => (
          <div key={view.id} style={{ width: "100%", position: "relative" }}>
            {showRenameInput === view.id ? (
              // Rename Input
              <div
                style={{
                  display: "flex",
                  padding: "6px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                <input
                  ref={renameInputRef}
                  type="text"
                  value={renameInputValue}
                  onChange={(e) => setRenameInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRenameSubmit(view.id);
                    } else if (e.key === "Escape") {
                      handleRenameCancel();
                    }
                  }}
                  onBlur={() => handleRenameCancel()}
                  style={{
                    flex: "1 0 0",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid #D5D7DA",
                    outline: "none",
                    fontSize: "14px",
                    fontFamily: "Public Sans",
                  }}
                />
              </div>
            ) : (
              // View Item
              <div
                style={{
                  display: "flex",
                  padding: "1px 4px",
                  alignItems: "center",
                  alignSelf: "stretch",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredItem(view.id)}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  setShowSubmenu(null);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "6px 8px",
                    alignItems: "center",
                    gap: "8px",
                    flex: "1 0 0",
                    borderRadius: "4px",
                    background:
                      hoveredItem === view.id ? "#FDFDFD" : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                  onClick={() => {
                    onViewChange(view);
                    onToggle();
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
                    {currentView.id === view.id && (
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
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {view.name}
                  </div>

                  {/* Submenu trigger for non-default views */}
                  {!view.isDefault && (
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSubmenu(
                          showSubmenu === view.id ? null : view.id
                        );
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
                    </div>
                  )}
                </div>

                {/* Submenu */}
                {showSubmenu === view.id && !view.isDefault && (
                  <div
                    style={{
                      position: "absolute",
                      left: "calc(100% - 8px)",
                      top: "0",
                      width: "120px",
                      borderRadius: "8px",
                      border: "1px solid rgba(10, 13, 18, 0.04)",
                      background: "rgba(255, 255, 255, 1)",
                      boxShadow:
                        "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                      zIndex: 10000,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "4px 0",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Rename Option */}
                      <div
                        style={{
                          display: "flex",
                          padding: "1px 4px",
                          alignItems: "center",
                          alignSelf: "stretch",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenameClick(view.id, view.name);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            flex: "1 0 0",
                            borderRadius: "4px",
                            background: "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#FDFDFD";
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
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 400,
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
                          padding: "1px 4px",
                          alignItems: "center",
                          alignSelf: "stretch",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(view.id);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            flex: "1 0 0",
                            borderRadius: "4px",
                            background: "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#FDFDFD";
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
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 400,
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
        ))}

        {/* Divider */}
        <div
          style={{
            height: "1px",
            alignSelf: "stretch",
            background: "#E9EAEB",
            margin: "4px 0",
          }}
        />

        {/* Save Table View Input or Button */}
        {showSaveInput ? (
          <div
            style={{
              display: "flex",
              padding: "6px 12px",
              alignItems: "center",
              gap: "8px",
              alignSelf: "stretch",
            }}
          >
            <input
              ref={saveInputRef}
              type="text"
              placeholder="Enter view name..."
              value={saveInputValue}
              onChange={(e) => setSaveInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveSubmit();
                } else if (e.key === "Escape") {
                  handleSaveCancel();
                }
              }}
              onBlur={handleSaveCancel}
              style={{
                flex: "1 0 0",
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #D5D7DA",
                outline: "none",
                fontSize: "14px",
                fontFamily: "Public Sans",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              padding: "1px 4px",
              alignItems: "center",
              alignSelf: "stretch",
              cursor: "pointer",
            }}
            onClick={handleSaveClick}
          >
            <div
              style={{
                display: "flex",
                padding: "6px 8px",
                alignItems: "center",
                gap: "8px",
                flex: "1 0 0",
                borderRadius: "4px",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FDFDFD";
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
                  d="M8 3.33341V12.6667M3.33333 8.00008H12.6667"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Save Table View
              </div>
            </div>
          </div>
        )}

        {/* Create New View */}
        {onCreateNewView && (
          <div
            style={{
              display: "flex",
              padding: "1px 4px",
              alignItems: "center",
              alignSelf: "stretch",
              cursor: "pointer",
            }}
            onClick={() => {
              onCreateNewView();
              onToggle();
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "6px 8px",
                alignItems: "center",
                gap: "8px",
                flex: "1 0 0",
                borderRadius: "4px",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FDFDFD";
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
                  d="M8 3.33341V12.6667M3.33333 8.00008H12.6667"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Create New View
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
