import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useDragDrop, WidgetInfo } from "../../contexts/DragDropContext";

interface WidgetContainerProps {
  /** Widget unique identifier */
  id: string;
  /** Widget title */
  title: string;
  /** Widget position in the layout */
  position?: number;
  /** Optional help icon tooltip */
  helpTooltip?: string;
  /** Children content to render inside the widget */
  children: React.ReactNode;
  /** Optional see all button click handler */
  onSeeAllClick?: () => void;
  /** Optional download chart click handler */
  onDownloadChart?: () => void;
  /** Optional remove widget click handler */
  onRemoveWidget?: () => void;
  /** Whether this is mobile view */
  isMobile?: boolean;
  /** Whether this is tablet view */
  isTablet?: boolean;
  /** Window width for responsive behavior */
  windowWidth?: number;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  id,
  title,
  position = 0,
  helpTooltip,
  children,
  onSeeAllClick,
  onDownloadChart,
  onRemoveWidget,
  isMobile = false,
  isTablet = false,
  windowWidth = 1024,
}) => {
  const [isWidgetHovered, setIsWidgetHovered] = React.useState(false);
  const [isDragButtonHovered, setIsDragButtonHovered] = React.useState(false);
  const [isMenuHovered, setIsMenuHovered] = React.useState(false);
  const [isBorderHovered, setIsBorderHovered] = React.useState(false);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [showDragPlaceholder, setShowDragPlaceholder] = React.useState(false);

  const { state, startDrag, endDrag, setDropTarget, reorderWidgets } =
    useDragDrop();

  const widgetInfo: WidgetInfo = {
    id,
    title,
    position,
  };

  const isDragging = state.isDragging && state.draggedWidget?.id === id;
  const isGlobalDragging = state.isDragging;
  const isDragTarget = state.dropTarget === id;

  // Drag and drop event handlers
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    startDrag(widgetInfo);
    setShowDragPlaceholder(true);
  };

  const handleDragEnd = () => {
    endDrag();
    setShowDragPlaceholder(false);
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragging && isGlobalDragging) {
      setIsDragOver(true);
      setDropTarget(id);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Only clear drag over if mouse is truly outside the widget
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
      setDropTarget(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (sourceId && sourceId !== id) {
      reorderWidgets(sourceId, id);
    }
    setIsDragOver(false);
    setDropTarget(null);
  };

  // Determine widget state and styling
  const getWidgetBorder = () => {
    if (isDragging) return "1px solid #34479A"; // Brand color when being dragged
    if (isDragOver || isDragTarget) return "1px solid #34479A"; // Brand color when drag target
    if (isDragButtonHovered || isBorderHovered) return "1px solid #34479A"; // Brand color when drag button or border is hovered
    if (isWidgetHovered) return "1px solid #D5D7DA"; // Primary border on widget hover
    return "1px solid #E9EAEB"; // Default secondary border
  };

  const getWidgetShadow = () => {
    if (isDragging)
      return "0px 4px 6px -1px rgba(10, 13, 18, 0.10), 0px 2px 4px -2px rgba(10, 13, 18, 0.06)"; // Strong shadow when dragging
    if (isDragOver || isDragTarget)
      return "0px 4px 6px -1px rgba(10, 13, 18, 0.10), 0px 2px 4px -2px rgba(10, 13, 18, 0.06)"; // Strong shadow when drag target
    if (isDragButtonHovered || isBorderHovered)
      return "0px 4px 6px -1px rgba(10, 13, 18, 0.10), 0px 2px 4px -2px rgba(10, 13, 18, 0.06)"; // Stronger shadows
    if (isWidgetHovered)
      return "0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px rgba(10, 13, 18, 0.10)"; // Medium shadows
    return "none"; // No shadows in default state
  };

  const getWidgetBackground = () => {
    if (isDragOver || isDragTarget) return "#ECEEF9"; // Brand background when drag target
    return "#FDFDFD"; // Default background
  };

  // Handle border hover detection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const threshold = 8; // 8px threshold for border detection

    const isNearLeftBorder = x <= threshold;
    const isNearRightBorder = x >= rect.width - threshold;
    const isNearTopBorder = y <= threshold;
    const isNearBottomBorder = y >= rect.height - threshold;
    const isNearCorner =
      (isNearLeftBorder || isNearRightBorder) &&
      (isNearTopBorder || isNearBottomBorder);
    const isNearBorder =
      isNearLeftBorder ||
      isNearRightBorder ||
      isNearTopBorder ||
      isNearBottomBorder;

    setIsBorderHovered(isNearBorder);
  };

  return (
    <>
      {/* Drag Placeholder - shown when widget is being dragged */}
      {showDragPlaceholder && isDragging && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: "1 0 0",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: "2px dashed #34479A",
            background: "rgba(236, 238, 249, 0.5)",
            position: "relative",
            minHeight: "480px",
            opacity: 0.6,
            transition: "all 0.2s ease-in-out",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              color: "#717680",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Drop widget here
          </div>
        </div>
      )}

      {/* Main Widget Container */}
      <div
        draggable={isDragButtonHovered}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          display: isDragging && showDragPlaceholder ? "none" : "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flex: "1 0 0",
          alignSelf: "stretch",
          borderRadius: "12px",
          border: getWidgetBorder(),
          background: getWidgetBackground(),
          position: "relative",
          boxShadow: getWidgetShadow(),
          transition: "all 0.2s ease-in-out",
          cursor: isBorderHovered
            ? "ew-resize"
            : isDragButtonHovered
              ? "grab"
              : "default",
          opacity: isDragging ? 0.5 : 1,
        }}
        onMouseEnter={() => setIsWidgetHovered(true)}
        onMouseLeave={() => {
          setIsWidgetHovered(false);
          setIsDragButtonHovered(false);
          setIsBorderHovered(false);
          setIsDragOver(false);
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Drag Drop Bar - shown when in drag mode */}
        {(isDragOver || isDragTarget || isDragging) && (
          <div
            style={{
              width: "100%",
              height: "4px",
              background: "#34479A",
              borderRadius: "12px 12px 0 0",
            }}
          />
        )}

        {/* Heading and content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
            flex: "1 0 0",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              height: "52px",
              padding: "12px 20px 8px 20px",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Drag button - centered in widget header, hidden until widget hover */}
            {isWidgetHovered && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <button
                  style={{
                    display: "flex",
                    width: "20px",
                    height: "20px",
                    padding: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                    border: "none",
                    background: isDragButtonHovered
                      ? "rgba(52, 71, 154, 0.1)"
                      : "transparent",
                    cursor: "grab",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={() => setIsDragButtonHovered(true)}
                  onMouseLeave={() => setIsDragButtonHovered(false)}
                  onMouseDown={(e) => {
                    e.currentTarget.style.cursor = "grabbing";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.cursor = "grab";
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
                      d="M7.33325 5.99992C7.33325 6.36811 7.63173 6.66658 7.99992 6.66658C8.36811 6.66658 8.66659 6.36811 8.66659 5.99992C8.66659 5.63173 8.36811 5.33325 7.99992 5.33325C7.63173 5.33325 7.33325 5.63173 7.33325 5.99992Z"
                      stroke={isDragButtonHovered ? "#344698" : "#A4A7AE"}
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0001 5.99992C12.0001 6.36811 12.2986 6.66658 12.6668 6.66658C13.035 6.66658 13.3335 6.36811 13.3335 5.99992C13.3335 5.63173 13.035 5.33325 12.6668 5.33325C12.2986 5.33325 12.0001 5.63173 12.0001 5.99992Z"
                      stroke={isDragButtonHovered ? "#344698" : "#A4A7AE"}
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.66659 5.99992C2.66659 6.36811 2.96507 6.66658 3.33325 6.66658C3.70144 6.66658 3.99992 6.36811 3.99992 5.99992C3.99992 5.63173 3.70144 5.33325 3.33325 5.33325C2.96507 5.33325 2.66659 5.63173 2.66659 5.99992Z"
                      stroke={isDragButtonHovered ? "#344698" : "#A4A7AE"}
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.33325 9.99992C7.33325 10.3681 7.63173 10.6666 7.99992 10.6666C8.36811 10.6666 8.66659 10.3681 8.66659 9.99992C8.66659 9.63173 8.36811 9.33325 7.99992 9.33325C7.63173 9.33325 7.33325 9.63173 7.33325 9.99992Z"
                      stroke={isDragButtonHovered ? "#344698" : "#A4A7AE"}
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0001 9.99992C12.0001 10.3681 12.2986 10.6666 12.6668 10.6666C13.035 10.6666 13.3335 10.3681 13.3335 9.99992C13.3335 9.63173 13.035 9.33325 12.6668 9.33325C12.2986 9.33325 12.0001 9.63173 12.0001 9.99992Z"
                      stroke={isDragButtonHovered ? "#344698" : "#A4A7AE"}
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.66659 9.99992C2.66659 10.3681 2.96507 10.6666 3.33325 10.6666C3.70144 10.6666 3.99992 10.3681 3.99992 9.99992C3.99992 9.63173 3.70144 9.33325 3.33325 9.33325C2.96507 9.33325 2.66659 9.63173 2.66659 9.99992Z"
                      stroke={isDragButtonHovered ? "#344698" : "#A4A7AE"}
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Tooltip */}
                {isDragButtonHovered && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "#0A0D12",
                      color: "#FFF",
                      fontSize: "12px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      fontFamily: "Public Sans",
                      whiteSpace: "nowrap",
                      boxShadow:
                        "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
                      zIndex: 1000,
                    }}
                  >
                    Drag to move
                  </div>
                )}
              </div>
            )}

            {/* Section label */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    color: "#414651",
                    textOverflow: "ellipsis",
                    fontFamily: "Public Sans",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                  }}
                >
                  {title}
                </div>
                {helpTooltip && (
                  <div
                    style={{
                      display: "flex",
                      width: "16px",
                      height: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_help_circle)">
                        <path
                          d="M6.06004 5.99992C6.21678 5.55436 6.52614 5.17866 6.93334 4.93934C7.34055 4.70002 7.8193 4.61254 8.28483 4.69239C8.75035 4.77224 9.17259 5.01427 9.47676 5.3756C9.78093 5.73694 9.94741 6.19427 9.94671 6.66659C9.94671 7.99992 7.94671 8.66659 7.94671 8.66659M8.00004 11.3333H8.00671M14.6667 7.99992C14.6667 11.6818 11.6819 14.6666 8.00004 14.6666C4.31814 14.6666 1.33337 11.6818 1.33337 7.99992C1.33337 4.31802 4.31814 1.33325 8.00004 1.33325C11.6819 1.33325 14.6667 4.31802 14.6667 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_help_circle">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* See All button */}
              {onSeeAllClick && (
                <button
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "20px",
                    color: "#414651",
                  }}
                  onClick={onSeeAllClick}
                >
                  See All
                </button>
              )}

              {/* Menu dropdown */}
              {(onDownloadChart || onRemoveWidget) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      style={{
                        display: "flex",
                        padding: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                        border: "none",
                        background: isMenuHovered ? "#F8F9FA" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onMouseEnter={() => setIsMenuHovered(true)}
                      onMouseLeave={() => setIsMenuHovered(false)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99992 8.66675C8.36811 8.66675 8.66659 8.36827 8.66659 8.00008C8.66659 7.63189 8.36811 7.33341 7.99992 7.33341C7.63173 7.33341 7.33325 7.63189 7.33325 8.00008C7.33325 8.36827 7.63173 8.66675 7.99992 8.66675Z"
                          stroke={isMenuHovered ? "#344698" : "#A4A7AE"}
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.99992 4.00008C8.36811 4.00008 8.66659 3.7016 8.66659 3.33341C8.66659 2.96522 8.36811 2.66675 7.99992 2.66675C7.63173 2.66675 7.33325 2.96522 7.33325 3.33341C7.33325 3.7016 7.63173 4.00008 7.99992 4.00008Z"
                          stroke={isMenuHovered ? "#344698" : "#A4A7AE"}
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.99992 13.3334C8.36811 13.3334 8.66659 13.0349 8.66659 12.6667C8.66659 12.2986 8.36811 12.0001 7.99992 12.0001C7.63173 12.0001 7.33325 12.2986 7.33325 12.6667C7.33325 13.0349 7.63173 13.3334 7.99992 13.3334Z"
                          stroke={isMenuHovered ? "#344698" : "#A4A7AE"}
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    style={{
                      minWidth: "160px",
                      padding: "4px",
                      borderRadius: "8px",
                      border: "1px solid #E9EAEB",
                      background: "#FFF",
                      boxShadow:
                        "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03)",
                      fontFamily: "Public Sans",
                    }}
                  >
                    {onDownloadChart && (
                      <DropdownMenuItem
                        className="hover-light"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "20px",
                          color: "#414651",
                          cursor: "pointer",
                        }}
                        onSelect={onDownloadChart}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Download Chart
                      </DropdownMenuItem>
                    )}
                    {onRemoveWidget && (
                      <DropdownMenuItem
                        className="hover-light"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "20px",
                          color: "#414651",
                          cursor: "pointer",
                        }}
                        onSelect={onRemoveWidget}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Remove Widget
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              padding: "12px 20px 16px 20px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              flex: "1 0 0",
              alignSelf: "stretch",
              borderRadius: "12px",
              border: "1px solid #E9EAEB",
              background: "#FFF",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              position: "relative",
              minHeight: "400px",
              height: "480px", // Fixed height for all breakpoints
              maxHeight: "480px", // Ensure height consistency
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
