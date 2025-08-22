import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Checkbox } from "../components/ui/checkbox";

const I9FormCompletion = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form state for Section 1
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleInitial: "",
    middleNotApplicable: false,
    otherLastNames: "",
    address: "",
    aptNumber: "",
    aptNotApplicable: false,
    cityOrTown: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    socialSecurityNumber: "",
    emailAddress: "",
    telephoneNumber: "",
    telephoneNotApplicable: false,
    citizenshipStatus: "",
    preparerOption: ""
  });

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    console.log("Sign out");
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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBreadcrumbNavigation = (target: string) => {
    switch (target) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "i9-order":
        navigate("/i9-order");
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAFA" }}>
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="i9-form-completion"
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
        showNotification={showNotification}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {mobileMenuOpen && !isDesktop && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          width: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          maxWidth: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          overflow: "hidden",
          transition:
            "margin-left 0.3s ease, width 0.3s ease, max-width 0.3s ease",
        }}
      >
        {isDesktop ? (
          <Header
            isDesktop={isDesktop}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            showMobileUserMenu={showMobileUserMenu}
            showNotification={showNotification}
            sidebarCollapsed={sidebarCollapsed}
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
            showMobileUserMenu={showMobileUserMenu}
          />
        )}

        <div
          style={{
            display: "flex",
            paddingBottom: "24px",
            paddingTop:
              showNotification && isDesktop
                ? "136px"
                : isDesktop
                  ? "104px"
                  : "88px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            alignSelf: "stretch",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ padding: "20px" }}>
            <h1>I-9 Form Completion</h1>
            <p>Employment Eligibility Verification form is loading...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default I9FormCompletion;
