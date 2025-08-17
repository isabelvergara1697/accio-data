import React, { useState, createContext, useContext } from "react";

interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("TooltipTrigger must be used within a Tooltip");
  }

  const { setIsOpen } = context;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      onMouseEnter: (e: React.MouseEvent) => {
        setIsOpen(true);
        if (children.props.onMouseEnter) {
          children.props.onMouseEnter(e);
        }
      },
      onMouseLeave: (e: React.MouseEvent) => {
        setIsOpen(false);
        if (children.props.onMouseLeave) {
          children.props.onMouseLeave(e);
        }
      },
    });
  }

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
}

export function TooltipContent({
  children,
  side = "top",
  align = "center",
  sideOffset = 8,
}: {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("TooltipContent must be used within a Tooltip");
  }

  const { isOpen } = context;

  console.log("TooltipContent render:", { isOpen, children });

  if (!isOpen) return null;

  const getPosition = () => {
    switch (side) {
      case "top":
        if (align === "start") {
          return {
            bottom: "100%",
            left: "0",
            marginBottom: `${sideOffset}px`,
          };
        } else if (align === "end") {
          return {
            bottom: "100%",
            right: "0",
            marginBottom: `${sideOffset}px`,
          };
        } else {
          return {
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: `${sideOffset}px`,
          };
        }
      case "bottom":
        if (align === "start") {
          return {
            top: "100%",
            left: "0",
            marginTop: `${sideOffset}px`,
          };
        } else if (align === "end") {
          return {
            top: "100%",
            right: "0",
            marginTop: `${sideOffset}px`,
          };
        } else {
          return {
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: `${sideOffset}px`,
          };
        }
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: `${sideOffset}px`,
        };
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: `${sideOffset}px`,
        };
      default:
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: `${sideOffset}px`,
        };
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        ...getPosition(),
        zIndex: 10002,
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "8px 12px",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "8px",
          background: "#0A0D12",
          boxShadow:
            "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
        }}
      >
        <div
          style={{
            color: "#FFF",
            textAlign: "center",
            fontFamily:
              "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "18px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Simple tooltip component for easy usage
export interface SimpleTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}

export function SimpleTooltip({
  content,
  children,
  position = "top",
  align = "center",
  sideOffset = 8,
  className = "",
}: SimpleTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={position} align={align} sideOffset={sideOffset}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

export default SimpleTooltip;
