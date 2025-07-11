import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SuccessNotification from "../components/SuccessNotification";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Sidebar } from "../components/Sidebar";

// Add styles for mobile responsiveness
const dashboardStyles = `
  @media (max-width: 767px) {
    .dashboard-main {
      padding-left: 20px !important;
    }
  }
  @media (min-width: 1024px) {
    .dashboard-main {
      padding-left: 320px !important;
    }
  }
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showNotification, setShowNotification] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (userMenuOpen && !target.closest("[data-user-menu]")) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userMenuOpen]);

  // Check for activation success parameter
  useEffect(() => {
    const activated = searchParams.get("activated");
    if (activated === "true") {
      setShowNotification(true);
      searchParams.delete("activated");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleNotificationDismiss = () => {
    setShowNotification(false);
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && !isDesktop && (
        <div
          className="fixed inset-0 z-40"
          style={{
            width: "100vw",
            height: "100vh",
            background: "rgba(10, 13, 18, 0.7)",
            backdropFilter: "blur(8px)",
            position: "fixed",
            left: 0,
            top: 0,
          }}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="Dashboard"
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
      />

      {/* Header */}
      {isDesktop ? (
        <Header
          isDesktop={isDesktop}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
        />
      ) : (
        <MobileHeader
          isDesktop={isDesktop}
          isMobile={isMobile}
          setMobileMenuOpen={setMobileMenuOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
        />
      )}

      {/* Main Content */}
      <main
        className="dashboard-main"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "32px",
          paddingTop: isDesktop ? "120px" : "64px",
          paddingRight: "20px",
          paddingBottom: "20px",
        }}
      >
        {/* Success Notification */}
        {showNotification && (
          <div style={{ marginBottom: "20px" }}>
            <SuccessNotification
              message="Welcome to Accio Data! Your account is now ready to use."
              onDismiss={handleNotificationDismiss}
            />
          </div>
        )}

        {/* Dashboard Content */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "24px",
              color: "#181D27",
            }}
          >
            Dashboard
          </h1>

          {/* Dashboard Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop
                ? "repeat(4, 1fr)"
                : isMobile
                  ? "1fr"
                  : "repeat(2, 1fr)",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                background: "#FFF",
                border: "1px solid #E9EAEB",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  color: "#535862",
                  marginBottom: "8px",
                }}
              >
                Total Orders
              </h3>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#181D27",
                }}
              >
                142
              </p>
            </div>

            <div
              style={{
                background: "#FFF",
                border: "1px solid #E9EAEB",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  color: "#535862",
                  marginBottom: "8px",
                }}
              >
                Pending Reviews
              </h3>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#181D27",
                }}
              >
                8
              </p>
            </div>

            <div
              style={{
                background: "#FFF",
                border: "1px solid #E9EAEB",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  color: "#535862",
                  marginBottom: "8px",
                }}
              >
                Completed
              </h3>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#181D27",
                }}
              >
                134
              </p>
            </div>

            <div
              style={{
                background: "#FFF",
                border: "1px solid #E9EAEB",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  color: "#535862",
                  marginBottom: "8px",
                }}
              >
                Active Users
              </h3>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#181D27",
                }}
              >
                23
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              background: "#FFF",
              border: "1px solid #E9EAEB",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#181D27",
              }}
            >
              Quick Actions
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isDesktop
                  ? "repeat(3, 1fr)"
                  : isMobile
                    ? "1fr"
                    : "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              <button
                style={{
                  padding: "12px 16px",
                  background: "#344698",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Create New Order
              </button>
              <button
                style={{
                  padding: "12px 16px",
                  background: "#FFF",
                  color: "#344698",
                  border: "1px solid #344698",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                View Reports
              </button>
              <button
                style={{
                  padding: "12px 16px",
                  background: "#FFF",
                  color: "#344698",
                  border: "1px solid #344698",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/resources")}
              >
                Access Resources
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
