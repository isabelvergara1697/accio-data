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

  if (!isOpen) return null;

  const getPosition = () => {
    const offset = `${sideOffset}px`;

    switch (side) {
      case "top":
        const topBase = {
          bottom: "100%",
          marginBottom: offset,
        };

        if (align === "start") {
          return { ...topBase, left: "0" };
        } else if (align === "end") {
          return { ...topBase, right: "0" };
        } else {
          return { ...topBase, left: "50%", transform: "translateX(-50%)" };
        }

      case "bottom":
        const bottomBase = {
          top: "100%",
          marginTop: offset,
        };

        if (align === "start") {
          return { ...bottomBase, left: "0" };
        } else if (align === "end") {
          return { ...bottomBase, right: "0" };
        } else {
          return { ...bottomBase, left: "50%", transform: "translateX(-50%)" };
        }

      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: offset,
        };
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: offset,
        };
      default:
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: offset,
        };
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        ...getPosition(),
        zIndex: 1000,
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
  className?: string;
}

export function SimpleTooltip({
  content,
  children,
  position = "top",
  className = "",
}: SimpleTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={position}>{content}</TooltipContent>
    </Tooltip>
  );
}

export default SimpleTooltip;
