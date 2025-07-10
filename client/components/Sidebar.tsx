import React from "react";

interface SidebarProps {
  isDesktop: boolean;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isDesktop,
  isMobile,
  mobileMenuOpen,
  children,
}) => {
  return (
    <aside
      className={`transition-all duration-300 lg:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      style={{
        display: "flex",
        width: isDesktop ? "296px" : mobileMenuOpen ? "75%" : "296px",
        height: "100vh",
        padding: isDesktop
          ? "8px 0px 24px 8px"
          : mobileMenuOpen
            ? "0px"
            : "8px 0px 24px 8px",
        alignItems: "flex-start",
        flexShrink: 0,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flex: "1 0 0",
          alignSelf: "stretch",
          borderRadius: isDesktop ? "12px" : "0px",
          border: isDesktop ? "1px solid #E9EAEB" : "none",
          background: "#FFF",
          boxShadow: isDesktop
            ? "0px 1px 2px 0px rgba(10, 13, 18, 0.05)"
            : "none",
          position: "relative",
        }}
      >
        {children}
      </div>
    </aside>
  );
};
