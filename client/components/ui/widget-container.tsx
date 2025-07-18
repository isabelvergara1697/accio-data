import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

type WidgetSize = "xs" | "sm" | "md" | "lg" | "xl";

interface WidgetContainerProps {
  /** Widget unique identifier */
  id: string;
  /** Widget title */
  title: string;
  /** Widget position in the layout */
  position?: number;
  /** Widget size */
  size?: WidgetSize;
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
  /** Optional resize handler */
  onResize?: (id: string, newSize: WidgetSize) => void;
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
  size = "md",
  helpTooltip,
  children,
  onSeeAllClick,
  onDownloadChart,
  onRemoveWidget,
  onResize,
  isMobile = false,
  isTablet = false,
  windowWidth = 1024,
}) => {
  const [isWidgetHovered, setIsWidgetHovered] = React.useState(false);
  const [isDragButtonHovered, setIsDragButtonHovered] = React.useState(false);
  const [isMenuHovered, setIsMenuHovered] = React.useState(false);
  const [isBorderHovered, setIsBorderHovered] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [draggedOverSide, setDraggedOverSide] = React.useState<
    "left" | "right" | null
  >(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeHandle, setResizeHandle] = React.useState<string | null>(null);

  // Add props for reordering
  const [widgets, setWidgets] = React.useState<
    { id: string; position: number }[]
  >([]);

  // Widget reordering function (would be passed from parent)
  const handleReorderWidgets = (
    sourceId: string,
    targetId: string,
    side: "left" | "right",
  ) => {
    console.log(`🔄 Reordering: ${sourceId} to ${side} of ${targetId}`);
    // This would be handled by parent component
    // For now, just log the action
  };

  // Enhanced drag handlers
  const handleDragStart = (e: React.DragEvent) => {
    console.log("🚀 DRAG START for widget:", id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);

    // Create drag image from actual widget content BEFORE setting drag state
    const widgetElement = e.currentTarget.closest(
      "[data-widget-container]",
    ) as HTMLElement;
    if (widgetElement) {
      const rect = widgetElement.getBoundingClientRect();
      const scale = 0.8;

      // Clone the actual widget to preserve its content for drag image
      const dragImageContainer = document.createElement("div");
      dragImageContainer.style.position = "absolute";
      dragImageContainer.style.top = "-9999px";
      dragImageContainer.style.left = "-9999px";
      dragImageContainer.style.width = rect.width * scale + "px";
      dragImageContainer.style.height = rect.height * scale + "px";
      dragImageContainer.style.pointerEvents = "none";
      dragImageContainer.style.overflow = "hidden";

      // Clone the widget content
      const clone = widgetElement.cloneNode(true) as HTMLElement;
      clone.style.transform = `scale(${scale})`;
      clone.style.transformOrigin = "top left";
      clone.style.width = rect.width + "px";
      clone.style.height = rect.height + "px";
      clone.style.margin = "0";
      clone.style.position = "relative";

      dragImageContainer.appendChild(clone);
      document.body.appendChild(dragImageContainer);

      // Set the drag image
      e.dataTransfer.setDragImage(
        dragImageContainer,
        (rect.width * scale) / 2,
        (rect.height * scale) / 2,
      );

      // Clean up
      setTimeout(() => {
        if (document.body.contains(dragImageContainer)) {
          document.body.removeChild(dragImageContainer);
        }
      }, 1);
    }

    // Set dragging state AFTER creating drag image
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    console.log("🏁 DRAG END for widget:", id);
    setIsDragging(false);
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const draggedId = e.dataTransfer.types.includes("text/plain");

    if (draggedId && !isDragging) {
      setIsDragOver(true);

      // Determine which side of the widget the cursor is on
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const mouseX = e.clientX;

      if (mouseX < centerX) {
        setDraggedOverSide("left");
        console.log("📍 Dragging over LEFT side of", id);
      } else {
        setDraggedOverSide("right");
        console.log("📍 Dragging over RIGHT side of", id);
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
      setDraggedOverSide(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    console.log(
      "🎯 DROP on widget:",
      id,
      "from:",
      sourceId,
      "side:",
      draggedOverSide,
    );

    if (sourceId && sourceId !== id && draggedOverSide) {
      console.log(
        `✅ Reordering: Moving ${sourceId} to ${draggedOverSide} of ${id}`,
      );
      handleReorderWidgets(sourceId, id, draggedOverSide);

      // Notify parent component about the reorder
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("widget-reorder", {
            detail: { sourceId, targetId: id, side: draggedOverSide },
          }),
        );
      }
    }

    setIsDragOver(false);
    setDraggedOverSide(null);
  };

  // Widget styling based on state
  const getWidgetBorder = () => {
    if (isDragging) return "1px solid #34479A";
    if (isDragOver) return "1px solid #34479A";
    if (isDragButtonHovered || isBorderHovered) return "1px solid #34479A";
    if (isWidgetHovered) return "1px solid #D5D7DA";
    return "1px solid #E9EAEB";
  };

  const getWidgetShadow = () => {
    if (isDragging || isDragOver)
      return "0px 4px 6px -1px rgba(10, 13, 18, 0.10), 0px 2px 4px -2px rgba(10, 13, 18, 0.06)";
    if (isDragButtonHovered || isBorderHovered)
      return "0px 4px 6px -1px rgba(10, 13, 18, 0.10), 0px 2px 4px -2px rgba(10, 13, 18, 0.06)";
    if (isWidgetHovered)
      return "0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px rgba(10, 13, 18, 0.10)";
    return "none";
  };

  const getWidgetBackground = () => {
    if (isDragging) return "#ECEEF9";
    if (isDragOver) return "#ECEEF9";
    return "#FDFDFD";
  };

  // Get widget dimensions based on size - width changes, height is fixed at 480px
  const getWidgetDimensions = (widgetSize: WidgetSize) => {
    const fixedHeight = "480px"; // Fixed height for all sizes on all breakpoints

    if (isMobile) {
      // On mobile, widgets should take full width with fixed height
      return { width: "100%", height: fixedHeight };
    }

    // Desktop/tablet dimensions - flexible system that adapts to container and other widgets
    // Uses flex-basis for initial size and flex-grow/shrink for adaptation
    const dimensions = {
      xs: {
        height: fixedHeight,
        flexBasis: "252px",
        flexGrow: 1,
        flexShrink: 1,
        minWidth: "252px",
        maxWidth: "calc(100% - 268px)", // Ensure space for other widget (252px + 16px gap)
      },
      sm: {
        height: fixedHeight,
        flexBasis: "300px",
        flexGrow: 1.2,
        flexShrink: 1,
        minWidth: "252px",
        maxWidth: "calc(100% - 268px)",
      },
      md: {
        height: fixedHeight,
        flexBasis: "400px",
        flexGrow: 1.5,
        flexShrink: 1,
        minWidth: "252px",
        maxWidth: "calc(100% - 268px)",
      },
      lg: {
        height: fixedHeight,
        flexBasis: "500px",
        flexGrow: 2,
        flexShrink: 1,
        minWidth: "252px",
        maxWidth: "calc(100% - 268px)",
      },
      xl: {
        height: fixedHeight,
        flexBasis: "600px",
        flexGrow: 2.5,
        flexShrink: 1,
        minWidth: "252px",
        maxWidth: "calc(100% - 268px)",
      },
    };
    return dimensions[widgetSize];
  };

  // Get next/previous size for resizing
  const getSizeChange = (
    currentSize: WidgetSize,
    direction: "increase" | "decrease",
  ): WidgetSize => {
    const sizes: WidgetSize[] = ["xs", "sm", "md", "lg", "xl"];
    const currentIndex = sizes.indexOf(currentSize);

    if (direction === "increase" && currentIndex < sizes.length - 1) {
      return sizes[currentIndex + 1];
    }
    if (direction === "decrease" && currentIndex > 0) {
      return sizes[currentIndex - 1];
    }
    return currentSize;
  };

  // Handle resize functionality - only horizontal resizing
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);

    const startX = e.clientX;
    let hasResized = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;

      // Determine resize direction based on movement and handle - only horizontal
      let direction: "increase" | "decrease" | null = null;

      // For horizontal handles only (left/right)
      if (handle.includes("left")) {
        if (deltaX < -50) direction = "increase";
        else if (deltaX > 50) direction = "decrease";
      } else if (handle.includes("right")) {
        if (deltaX > 50) direction = "increase";
        else if (deltaX < -50) direction = "decrease";
      }

      // Only resize if movement is significant enough and we haven't resized yet
      if (direction && !hasResized && Math.abs(deltaX) > 50) {
        const newSize = getSizeChange(size, direction);
        if (newSize !== size && onResize) {
          onResize(id, newSize);
          hasResized = true;
          setTimeout(() => handleResizeEnd(), 100); // Small delay to prevent flickering
        }
      }
    };

    const handleMouseUp = () => {
      handleResizeEnd();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeHandle(null);
    document.removeEventListener("mousemove", () => {});
    document.removeEventListener("mouseup", () => {});
  };

  // Handle border hover detection for resize handles
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isResizing || isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const threshold = 8;

    const isNearBorder =
      x <= threshold ||
      x >= rect.width - threshold ||
      y <= threshold ||
      y >= rect.height - threshold;

    setIsBorderHovered(isNearBorder);
  };

  return (
    <>
      {/* Drop Zone Indicator - shows where widget will be placed */}
      {isDragOver && draggedOverSide && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "4px",
            backgroundColor: "#34479A",
            borderRadius: "2px",
            zIndex: 1000,
            [draggedOverSide === "left" ? "left" : "right"]: "-8px",
            boxShadow: "0 0 8px rgba(52, 71, 154, 0.4)",
          }}
        />
      )}

      <div
        data-widget-container="true"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "12px",
          border: getWidgetBorder(),
          background: getWidgetBackground(),
          position: "relative",
          boxShadow: getWidgetShadow(),
          transition: isResizing ? "none" : "all 0.2s ease-in-out",
          cursor: isBorderHovered && !isResizing ? "move" : "default",
          opacity: isDragging ? 0.3 : 1,
          transform: "none",
          zIndex: isDragging ? 1000 : "auto",
          ...getWidgetDimensions(size),
          // Flexible sizing that adapts to container and other widgets
          flexShrink: isMobile ? 0 : getWidgetDimensions(size).flexShrink,
          flexGrow: isMobile ? 0 : getWidgetDimensions(size).flexGrow,
          flexBasis: isMobile ? "auto" : getWidgetDimensions(size).flexBasis,
          minWidth: isMobile ? "100%" : getWidgetDimensions(size).minWidth,
          maxWidth: isMobile ? "100%" : getWidgetDimensions(size).maxWidth,
        }}
        onMouseEnter={() => setIsWidgetHovered(true)}
        onMouseLeave={() => {
          setIsWidgetHovered(false);
          setIsDragButtonHovered(false);
          setIsBorderHovered(false);
          setIsDragOver(false);
          setDraggedOverSide(null);
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Drag Drop Bar - floating overlay */}
        {(isDragOver || isDragging || isDragButtonHovered) && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              width: "100%",
              height: "4px",
              background: "#D5D7DA",
              borderRadius: "12px 12px 0 0",
              zIndex: 10,
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
            {/* Drag button - centered in widget header */}
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
                <div
                  draggable={true}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
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
                  onMouseEnter={() => {
                    console.log("🎯 Drag button hover for:", id);
                    setIsDragButtonHovered(true);
                  }}
                  onMouseLeave={() => setIsDragButtonHovered(false)}
                  onMouseDown={() => {
                    console.log("🖱️ Drag button mouse down for:", id);
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
                </div>

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
              overflow: "auto", // Enable both horizontal and vertical scrolling when content exceeds container
              minWidth: 0, // Allow content to shrink below its natural size
            }}
          >
            {children}
          </div>

          {/* Resize Handles - appear on hover (desktop only, width only) */}
          {(isWidgetHovered || isResizing) &&
            !isDragging &&
            !isMobile &&
            !isTablet && (
              <>
                {/* Left resize handle */}
                <div
                  style={{
                    position: "absolute",
                    left: "-4px",
                    top: "10%",
                    bottom: "10%",
                    width: "8px",
                    cursor: "ew-resize",
                    zIndex: 1001,
                    background:
                      isResizing && resizeHandle === "left"
                        ? "rgba(52, 71, 154, 0.3)"
                        : "transparent",
                    borderRadius: "4px",
                  }}
                  onMouseDown={(e) => handleResizeStart(e, "left")}
                  onMouseEnter={() => setIsBorderHovered(true)}
                  onMouseLeave={() => setIsBorderHovered(false)}
                />

                {/* Right resize handle */}
                <div
                  style={{
                    position: "absolute",
                    right: "-4px",
                    top: "10%",
                    bottom: "10%",
                    width: "8px",
                    cursor: "ew-resize",
                    zIndex: 1001,
                    background:
                      isResizing && resizeHandle === "right"
                        ? "rgba(52, 71, 154, 0.3)"
                        : "transparent",
                    borderRadius: "4px",
                  }}
                  onMouseDown={(e) => handleResizeStart(e, "right")}
                  onMouseEnter={() => setIsBorderHovered(true)}
                  onMouseLeave={() => setIsBorderHovered(false)}
                />
              </>
            )}

          {/* Drag Overlay - blue overlay that appears during drag */}
          {isDragging && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#ECEEF9",
                border: "1px solid #34479A",
                borderRadius: "12px",
                zIndex: 1000,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
