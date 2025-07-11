import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { MobileHeader } from "../components/MobileHeader";
import { FilterDropdown } from "../components/FilterDropdown";
import { SearchInput } from "../components/SearchInput";
import { HorizontalTabs } from "../components/HorizontalTabs";
import { ResourceSection } from "../components/ResourceSection";

// Tab configuration
const tabs = [
  { id: "onboarding", label: "Onboarding", current: true },
  { id: "accio-university", label: "Accio University" },
  { id: "my-documents", label: "My Documents" },
  { id: "category1", label: "[Category]" },
  { id: "category2", label: "[Category]" },
  { id: "category3", label: "[Category]" },
  { id: "category4", label: "[Category]" },
  { id: "category5", label: "[Category]" },
];

// Resource data for onboarding tab
const onboardingData = [
  {
    id: "training-videos",
    title: "Training Videos",
    subtitle: "Learn to Speak Accio",
    count: 3,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "1",
        name: "The Players",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "2",
        name: "Pricebooks & Packages",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "3",
        name: "Customizations",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
    ],
  },
  {
    id: "basic",
    title: "Basic",
    count: 6,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "4",
        name: "Adding accounts",
        description:
          "This comprehensive guide walks you through the step-by-step process of creating and adding new accounts to the system, including all the necessary forms, verification steps, and best practices for account management.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "5",
        name: "Working with pricebooks",
        description:
          "Learn how to create, configure, and edit comprehensive pricebooks and packages, including advanced pricing strategies, bulk editing features, and integration with external billing systems.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "6",
        name: "Vendor dispatch table",
        description:
          "A detailed tutorial covering how to effectively use the vendor dispatch table to automatically assign searches to appropriate vendors or queues, including configuration of rules, priority settings, and troubleshooting common dispatch issues.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "7",
        name: "Adding court fees",
        description:
          "Complete instructions for adding and managing search-based, jurisdictional court fees to the system, including fee calculation rules, geographic mappings, and automated fee updates.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "8",
        name: "Adding integrated data vendors",
        description:
          "Step-by-step guide for setting up and configuring a vendor that is already integrated with the Accio platform, including API configuration, data mapping, and testing procedures.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "9",
        name: "Work queues",
        description:
          "Comprehensive tutorial on setting up and managing manual work queues in the system, including queue prioritization, assignment rules, and workflow optimization strategies.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "10",
        name: "Instaclear Manual",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "11",
        name: "Applicant School Check",
        size: "200 KB",
        type: "document" as const,
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    count: 2,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "12",
        name: "Working with aliases",
        description:
          "Detailed explanation of how to properly handle AKAs (also known as) entries, including duplicate detection, name variations, and maintaining data integrity across multiple identity records.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "13",
        name: "Address & criminal functionality",
        description:
          "Comprehensive breakdown of the AddCrim system functionality and detailed instructions on how to configure the system to automatically add criminal background searches based on jurisdictions discovered during address trace operations.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
    ],
  },
  {
    id: "miscellaneous-setup",
    title: "Miscellaneous Setup",
    count: 6,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "14",
        name: "Custom Products",
        description:
          "Complete guide to adding and configuring custom products in the system, including product definitions, pricing models, and integration with existing service offerings.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "15",
        name: "Setting up an international product",
        description:
          "Detailed instructions for creating new products from scratch and comprehensive guidelines for reviewing and evaluating vendor capabilities, pricing, and service quality.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "16",
        name: "Disputes",
        description: "How to use our module for invoicing.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "17",
        name: "Importing into QuickBooks Online",
        description: "How to use our module for invoicing.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
    ],
  },
];

// Accio University data
const accioUniversityData = [
  {
    id: "accio-university",
    title: "Accio University",
    count: 16,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "au-1",
        name: "New Address Action Options",
        date: "November 2023",
        description:
          "New options for email and printing address action letters in Version 4.10.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-2",
        name: "Tips for the Killer Demo",
        date: "April 2023",
        description:
          "How to put your best foot forward for prospective customers.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-3",
        name: "The ABCs of XML",
        date: "December 2022",
        description:
          "An overview of how verifications connect and receive work.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-4",
        name: "Tips for the Killer Demo",
        date: "November 2022",
        description:
          "How to put your best foot forward for prospective customers.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-5",
        name: "Vendor Dispatch Processes",
        date: "October 2022",
        description:
          "Reviewing ways you can distribute and manage work in the system.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-6",
        name: "Inside the Accounting Hub",
        date: "July 2022",
        description: "Breaking down the numbers in the accounting module.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-7",
        name: "New Address Action Options",
        date: "May 2022",
        description: "Our new features for handling address action letters.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-8",
        name: "First Impressions",
        date: "March 2022",
        description: "Making the platform look the way you want.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-9",
        name: "Add to Order and Reverifications",
        date: "December 2021",
        description: "Ways to change existing orders.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-10",
        name: "Options for Managing Verifications",
        date: "November 2021",
        description:
          "Looking at all the ways the platform handles verifications.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-11",
        name: "Fine Tuning Version 4.07",
        date: "October 2021",
        description:
          "New features in Version 4.07 that enhance the UI experience and increase operational efficiency.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-12",
        name: "Ordering Options",
        date: "May 2021",
        description: "A look at the ways to get orders into the system.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-13",
        name: "Package Pricing Refresher",
        date: "April 2021",
        description: "Simple to complex package pricing.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-14",
        name: "Ordering Options",
        date: "March 2021",
        description: "Adding new logic to your workflow processes.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-15",
        name: "New Document Management Features",
        date: "February 2021",
        description:
          "New features in Version 4.06 for document annotation and management.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "au-16",
        name: "Versions: What's in a Name?",
        date: "August 2016",
        description:
          "Understanding our version numbering system and beta software implications.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
    ],
  },
];

// My Documents data
const myDocumentsData = [
  {
    id: "accio-system-manuals",
    title: "Accio System Manuals",
    count: 7,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "asm-1",
        name: "Operations Manual",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "asm-2",
        name: "Quick Start Guide",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "asm-3",
        name: "Receiving Account Information",
        size: "200 KB",
        description:
          "This comprehensive manual provides detailed information about receiving and processing account information through various channels, including automated imports, manual entry procedures, and data validation protocols for ensuring data integrity.",
        type: "document" as const,
      },
      {
        id: "asm-4",
        name: "Accio Accounting Hub",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "asm-5",
        name: "Create Accounts via XML",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "asm-6",
        name: "Accio Account Information via XML",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "asm-7",
        name: "Create Accounts via XML",
        size: "200 KB",
        type: "document" as const,
      },
    ],
  },
  {
    id: "product-vendors-manuals",
    title: "Product Vendors Manuals",
    count: 6,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "pvm-1",
        name: "Instaclear Manual",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "pvm-2",
        name: "Applicant School Check",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "pvm-3",
        name: "E-Verify Users Manuals",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "pvm-4",
        name: "Taleo Business Edition Integration",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "pvm-5",
        name: "E-Verify Users Manuals",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "pvm-6",
        name: "Taleo Business Edition Integration",
        size: "200 KB",
        type: "document" as const,
      },
    ],
  },
  {
    id: "third-party-xml-integrations",
    title: "Third Party XML Integrations",
    subtitle: "Your XML PostBack URL is [url]",
    count: 4,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "tpxi-1",
        name: "Order Entry",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "tpxi-2",
        name: "Results Delivery (To Clients)",
        size: "200 KB",
        type: "document" as const,
        documentType: "pptx",
      },
      {
        id: "tpxi-3",
        name: "Orders Distribution and Fulfilment",
        size: "200 KB",
        type: "document" as const,
      },
      {
        id: "tpxi-4",
        name: "Update Termination Dates",
        size: "200 KB",
        type: "document" as const,
        documentType: "docx",
      },
      {
        id: "tpxi-5",
        name: "Electronic I9 demo",
        description:
          "Comprehensive demonstration of the Electronic I9 verification process, including document scanning, identity verification, and compliance with federal employment eligibility requirements.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
    ],
  },
  {
    id: "vendor-specific-setup",
    title: "Vendor Specific Setup",
    count: 2,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [
      {
        id: "vss-1",
        name: "Electronic I9 demo",
        description:
          "Advanced Electronic I9 verification system demonstration covering automated document processing, real-time identity verification, and integration with HR management systems.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
      {
        id: "vss-2",
        name: "Electronic I9 demo",
        description:
          "Complete Electronic I9 workflow demonstration including step-by-step employee onboarding, document verification protocols, and compliance reporting features.",
        type: "video" as const,
        thumbnail: "/api/placeholder/71/40",
      },
    ],
  },
];

// Placeholder data for other tabs
const placeholderData = [
  {
    id: "placeholder",
    title: "Coming Soon",
    subtitle: "Content for this section is being prepared.",
    count: 0,
    isOpen: true,
    gridVariant: "expanded" as const,
    resources: [],
  },
];

// Add styles for button hover states, document container borders, and responsive layouts
const resourcesStyles = `
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

export default function Resources() {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

  // Tab and content state
  const [currentTab, setCurrentTab] = useState("onboarding");
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "training-videos",
    "basic",
    "advanced",
    "miscellaneous-setup",
    "accio-university",
    "accio-system-manuals",
    "product-vendors-manuals",
    "third-party-xml-integrations",
    "vendor-specific-setup",
  ]);

  // Filter and search state
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [fileTypeDropdownOpen, setFileTypeDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Most Recent");
  const [selectedFileType, setSelectedFileType] = useState("All Files");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (sortDropdownOpen && !target.closest("[data-sort-dropdown]")) {
        setSortDropdownOpen(false);
      }
      if (fileTypeDropdownOpen && !target.closest("[data-filetype-dropdown]")) {
        setFileTypeDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [sortDropdownOpen, fileTypeDropdownOpen]);

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

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  const toggleAccordion = (accordionId: string) => {
    setOpenAccordions((prev) =>
      prev.includes(accordionId)
        ? prev.filter((id) => id !== accordionId)
        : [...prev, accordionId],
    );
  };

  const handleSortOptionSelect = (option: string) => {
    setSelectedSortOption(option);
    setSortDropdownOpen(false);
  };

  const handleFileTypeSelect = (type: string) => {
    setSelectedFileType(type);
    setFileTypeDropdownOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearchActive(query.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
    setFileTypeDropdownOpen(false);
  };

  const toggleFileTypeDropdown = () => {
    setFileTypeDropdownOpen(!fileTypeDropdownOpen);
    setSortDropdownOpen(false);
  };

  const sortOptions = ["A-Z", "Most Recent", "Most Viewed"];
  const fileTypeOptions = ["All Files", "PDF", "Videos", "Docs", "PPT"];

  const getCurrentTabData = () => {
    switch (currentTab) {
      case "onboarding":
        return onboardingData;
      case "accio-university":
        return accioUniversityData;
      case "my-documents":
        return myDocumentsData;
      default:
        return placeholderData;
    }
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
      <style dangerouslySetInnerHTML={{ __html: resourcesStyles }} />

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
        currentPage="resources"
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
          {/* Page Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            <div
              className={
                isMobile ? "mobile-stack" : isDesktop ? "" : "tablet-layout"
              }
              style={{
                display: "flex",
                alignItems: isMobile
                  ? "stretch"
                  : isDesktop
                    ? "flex-end"
                    : "flex-start",
                alignContent: "flex-end",
                gap: isMobile ? "16px" : isDesktop ? "20px 16px" : "20px",
                alignSelf: "stretch",
                flexWrap: isMobile ? "nowrap" : isDesktop ? "wrap" : "nowrap",
              }}
            >
              {/* Title and Subtitle Section */}
              <div
                className={
                  isMobile
                    ? "mobile-title-section"
                    : !isDesktop && !isMobile
                      ? "tablet-title-section"
                      : ""
                }
                style={{
                  display: "flex",
                  minWidth: isDesktop ? "320px" : "100%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: isMobile
                    ? "2px"
                    : !isDesktop && !isMobile
                      ? "2px"
                      : "4px",
                  flex: isDesktop ? "1 0 0" : "none",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#181D27",
                    fontFamily: "'Public Sans'",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "32px",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "rgba(24,29,39,1)",
                    }}
                  >
                    Resources
                  </span>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "'Public Sans'",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      color: "rgba(83,88,98,1)",
                    }}
                  >
                    Find system manuals, revision history, training videos, and
                    webinar archives—everything you need to understand and get
                    the most out of Accio Data, all in one place.
                  </span>
                </div>
              </div>

              {/* Buttons and Search Section - Tablet Layout */}
              {!isDesktop && !isMobile ? (
                <div className="tablet-buttons-container">
                  <div className="tablet-filter-buttons">
                    <FilterDropdown
                      isOpen={sortDropdownOpen}
                      onToggle={toggleSortDropdown}
                      selectedValue={selectedSortOption}
                      options={sortOptions}
                      onSelect={handleSortOptionSelect}
                      isMobile={isMobile}
                      dataAttribute="sort-dropdown"
                    />
                    <FilterDropdown
                      isOpen={fileTypeDropdownOpen}
                      onToggle={toggleFileTypeDropdown}
                      selectedValue={selectedFileType}
                      options={fileTypeOptions}
                      onSelect={handleFileTypeSelect}
                      isMobile={isMobile}
                      dataAttribute="filetype-dropdown"
                    />
                  </div>
                  <div className="tablet-search">
                    <SearchInput
                      searchQuery={searchQuery}
                      onSearchChange={handleSearchChange}
                      onClearSearch={clearSearch}
                      isSearchActive={isSearchActive}
                      isMobile={isMobile}
                      placeholder="Find documents or videos"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {/* Buttons Section - Desktop/Mobile Layout */}
                  <div
                    className={isMobile ? "mobile-buttons" : ""}
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "stretch" : "center",
                      gap: "12px",
                      justifyContent: isMobile ? "flex-start" : "flex-start",
                      flex: isMobile ? "1 0 0" : "none",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    <FilterDropdown
                      isOpen={sortDropdownOpen}
                      onToggle={toggleSortDropdown}
                      selectedValue={selectedSortOption}
                      options={sortOptions}
                      onSelect={handleSortOptionSelect}
                      isMobile={isMobile}
                      dataAttribute="sort-dropdown"
                    />
                    <FilterDropdown
                      isOpen={fileTypeDropdownOpen}
                      onToggle={toggleFileTypeDropdown}
                      selectedValue={selectedFileType}
                      options={fileTypeOptions}
                      onSelect={handleFileTypeSelect}
                      isMobile={isMobile}
                      dataAttribute="filetype-dropdown"
                    />
                  </div>

                  {/* Search Section - Desktop/Mobile Layout */}
                  <div
                    className={isMobile ? "mobile-search" : ""}
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "100%" : "200px",
                      maxWidth: isMobile ? "100%" : "320px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "6px",
                      flex: isMobile ? "none" : "1 0 0",
                    }}
                  >
                    <SearchInput
                      searchQuery={searchQuery}
                      onSearchChange={handleSearchChange}
                      onClearSearch={clearSearch}
                      isSearchActive={isSearchActive}
                      isMobile={isMobile}
                      placeholder="Find documents or videos"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Horizontal Tabs */}
            <HorizontalTabs
              tabs={tabs}
              onTabChange={handleTabChange}
              currentTab={currentTab}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </div>

          {/* Search Results Header */}
          {isSearchActive && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                padding: isMobile ? "0px 16px" : "0px",
              }}
            >
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "'Public Sans'",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "rgba(24,29,39,1)",
                  }}
                >
                  Search results
                </span>
              </div>
              <div
                style={{
                  color: "#535862",
                  fontFamily: "'Public Sans'",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "rgba(83,88,98,1)",
                  }}
                >
                  0 Results
                </span>
              </div>
            </div>
          )}

          {/* Resource Sections */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                alignSelf: "stretch",
              }}
            >
              {/* Show descriptive text for Accio University tab */}
              {currentTab === "accio-university" && (
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "'Public Sans'",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      color: "rgba(83,88,98,1)",
                    }}
                  >
                    Accio University is a webinar held on the second Wednesday
                    of each month. Geared toward owners and managers, Accio U
                    looks at more advanced topics.
                  </span>
                </div>
              )}

              {getCurrentTabData().map((section) => (
                <ResourceSection
                  key={section.id}
                  section={section}
                  isOpen={openAccordions.includes(section.id)}
                  onToggle={toggleAccordion}
                  isMobile={isMobile}
                  isDesktop={isDesktop}
                  isTablet={isTablet}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
