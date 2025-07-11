import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { MobileHeader } from "../components/MobileHeader";
import { DocumentLibraryLayout } from "../components/DocumentLibraryLayout";

// Document data structure based on Figma design
const documentSections = [
  {
    id: "general",
    title: "General Documents",
    count: 9,
    isOpen: true,
    documents: [
      {
        id: "1",
        name: "Quick Start Guide",
        size: "200 KB",
        type: "PDF",
      },
      { id: "2", name: "Web Demo", size: "200 KB", type: "PDF" },
      {
        id: "3",
        name: "User Manual",
        size: "200 KB",
        type: "PDF",
      },
      { id: "4", name: "Consumer FCR Rights", size: "200 KB", type: "PDF" },
      { id: "5", name: "WA Add On", size: "200 KB", type: "PDF" },
      { id: "6", name: "Article 23", size: "200 KB", type: "PDF" },
      { id: "7", name: "PSP Consent", size: "200 KB", type: "PDF" },
      { id: "8", name: "Applicant Release Form", size: "200 KB", type: "PDF" },
      {
        id: "9",
        name: "CBSV User Agreement - Social Security",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
  {
    id: "motor-vehicle",
    title: "Motor Vehicle Forms",
    count: 2,
    isOpen: true,
    documents: [
      {
        id: "10",
        name: "Release of Information Form - 29 CRF Drug and Alcohol Test",
        size: "200 KB",
        type: "PDF",
      },
      { id: "11", name: "Georgia MVR Form", size: "200 KB", type: "PDF" },
    ],
  },
  {
    id: "special-search",
    title: "Special Search Specific Forms",
    count: 24,
    isOpen: false,
    documents: [
      {
        id: "12",
        name: "FBI Identity History Check",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "13",
        name: "OPM Security Investigation",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "14",
        name: "Treasury Security Check",
        size: "200 KB",
        type: "PDF",
      },
      { id: "15", name: "DOJ Fingerprint Card", size: "200 KB", type: "PDF" },
      {
        id: "16",
        name: "ICE E-Verify Authorization",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
  {
    id: "security-manuals",
    title: "Security Manuals",
    count: 5,
    isOpen: false,
    documents: [
      {
        id: "17",
        name: "Background Check Protocol",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "18",
        name: "Security Clearance Guidelines",
        size: "200 KB",
        type: "PDF",
      },
      { id: "19", name: "Data Protection Manual", size: "200 KB", type: "PDF" },
      {
        id: "20",
        name: "Identity Verification Standards",
        size: "200 KB",
        type: "PDF",
      },
      {
        id: "21",
        name: "Compliance Assessment Guide",
        size: "200 KB",
        type: "PDF",
      },
    ],
  },
];

// Add styles for button hover states, document container borders, and responsive layouts
const documentLibraryStyles = `
  .secondary-button {
    border-radius: 8px;
    border: 1px solid #D5D7DA;
    background: #FFF;
    box-shadow: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
    transition: background 0.2s ease;
    cursor: pointer;
  }
  .secondary-button:hover {
    background: #F5F5F5 !important;
  }
  .quick-create-button {
    transition: all 0.2s ease;
    cursor: pointer;
  }
  .quick-create-button:hover {
    background: #2A3A82 !important;
  }
  .search-input {
    transition: background 0.2s ease;
  }
  .search-input:hover {
    background: #F5F5F5 !important;
  }
  .document-card {
    transition: background-color 0.2s ease;
  }
  .document-card:hover {
    background: #F5F5F5 !important;
  }
  .action-button {
    transition: background 0.2s ease;
  }
  .action-button:hover {
    background: #F5F5F5 !important;
  }
  .section-header-button {
    transition: background 0.2s ease;
  }
  .section-header-button:hover {
    background: #F5F5F5 !important;
  }

  /* Dropdown styles */
  .dropdown-container {
    position: relative;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 50;
    background: #FFF;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-shadow: 0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04);
    margin-top: 4px;
    min-width: 169px;
  }

  @media (max-width: 767px) {
    .dropdown-menu {
      width: 100%;
      min-width: 100%;
      right: 0;
      left: 0;
    }
  }
  .dropdown-item {
    display: flex;
    padding: 8px 10px;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s ease;
    border-radius: 6px;
    margin: 1px 6px;
    font-family: 'Public Sans';
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: #414651;
  }
  .dropdown-item:hover {
    background: #E9EAEB;
    color: #252B37;
  }
  .dropdown-item.selected {
    background: #E9EAEB;
    color: #252B37;
  }
  .dropdown-menu-container {
    padding: 4px 0;
    display: flex;
    flex-direction: column;
  }

  /* Fixed button widths and text truncation */
  .filter-button {
    min-width: 120px !important;
    max-width: 120px !important;
    justify-content: flex-start !important;
  }
  .filter-button > div {
    justify-content: flex-start !important;
    width: 100% !important;
  }
  .filter-button-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80px;
  }

  /* Override all button alignments */
  .secondary-button.filter-button {
    justify-content: flex-start !important;
  }
  .secondary-button.filter-button > div {
    justify-content: flex-start !important;
    width: 100% !important;
  }

  /* Desktop/mobile button overrides */
  .dropdown-container[data-sort-dropdown] .secondary-button,
  .dropdown-container[data-filetype-dropdown] .secondary-button {
    justify-content: flex-start !important;
  }
  .dropdown-container[data-sort-dropdown] .secondary-button > div,
  .dropdown-container[data-filetype-dropdown] .secondary-button > div {
    justify-content: flex-start !important;
    width: 100% !important;
  }

  /* Document card responsive styling */
  .document-card {
    width: 100%;
  }
  @media (max-width: 767px) {
    .document-card {
      width: 100% !important;
    }
  }

  /* Strong overrides for all filter buttons */
  [data-sort-dropdown] .filter-button,
  [data-filetype-dropdown] .filter-button {
    justify-content: flex-start !important;
  }
  [data-sort-dropdown] .filter-button > div,
  [data-filetype-dropdown] .filter-button > div {
    justify-content: flex-start !important;
    width: 100% !important;
  }

  /* Tablet specific button alignment */
  @media (min-width: 768px) and (max-width: 1023px) {
    .tablet-filter-buttons .secondary-button {
      justify-content: flex-start !important;
    }
    .tablet-filter-buttons .secondary-button > div {
      justify-content: flex-start !important;
      width: 100% !important;
    }
  }

  /* Responsive layout utilities */
  @media (max-width: 767px) {
    .mobile-stack {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 16px !important;
    }
    .mobile-title-section {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 2px !important;
      width: 100% !important;
    }
    .mobile-buttons {
      flex-direction: column !important;
      justify-content: flex-start !important;
      gap: 12px !important;
      width: 100% !important;
    }
    .mobile-search {
      width: 100% !important;
    }
    .mobile-button {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      align-self: stretch !important;
      justify-content: space-between !important;
      align-items: center !important;
      flex: 1 1 auto !important;
    }
    .mobile-button-content {
      width: 100% !important;
      justify-content: flex-start !important;
      align-items: center !important;
    }
    .mobile-button-text {
      width: 100% !important;
    }
    .mobile-document-grid {
      padding: 20px 16px !important;
    }
    .mobile-file-name {
      -webkit-line-clamp: 2 !important;
      display: -webkit-box !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    /* Additional mobile button alignment overrides */
    .dropdown-container .mobile-button {
      justify-content: space-between !important;
    }
    .dropdown-container .mobile-button > div {
      justify-content: flex-start !important;
      width: 100% !important;
    }
    .mobile-button-content {
      justify-content: flex-start !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .tablet-layout {
      flex-direction: column !important;
      gap: 20px !important;
      align-items: flex-start !important;
    }
    .tablet-title-section {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 2px !important;
      width: 100% !important;
    }
    .tablet-buttons-container {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      gap: 12px !important;
      width: 100% !important;
    }
    .tablet-filter-buttons {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      gap: 12px !important;
    }
    .tablet-search {
      flex: 1 !important;
      max-width: 320px !important;
    }
    .tablet-document-grid {
      grid-template-columns: repeat(2, 308px) !important;
      justify-content: space-between !important;
    }
  }

  /* Document grid responsive refinements */
  .tablet-document-grid,
  .desktop-document-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 16px !important;
  }

  @media (max-width: 767px) {
    .mobile-document-grid {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
  }
`;

export default function DocumentLibrary() {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userMenuOpen]);

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        minHeight: "100dvh", // Dynamic viewport height for mobile
        background: "#FAFAFA",
        position: "relative",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: documentLibraryStyles }} />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            width: "100vw",
            height: "100vh",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, #000 100%)",
            opacity: 0.7,
            backgroundColor: "#0A0D12",
            backdropFilter: "blur(4px)",
            position: "fixed",
            left: 0,
            top: 0,
          }}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="document-library"
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

      {/* Main Content */}
      <div
        style={{
          marginLeft: isDesktop ? "296px" : "0",
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* Desktop Top Navigation Bar */}
        <Header
          isDesktop={isDesktop}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showMobileUserMenu={showMobileUserMenu}
        />

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

        {/* Main Content Area */}
        <div
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            padding: isMobile ? "16px" : "32px",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "16px" : "32px",
          }}
        >
          <DocumentLibraryLayout
            title="Document Library"
            subtitle="Browse and download key forms and documents needed for screenings, compliance, and account setup."
            documentSections={documentSections}
            isMobile={isMobile}
            isDesktop={isDesktop}
            searchPlaceholder="Find documents or categories"
          />
        </div>
      </div>
    </div>
  );
}
