import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  ChevronDown,
  Search,
  Eye,
  Download,
  Bell,
  BarChart,
  Table,
  Folder,
  MessageSquareMore,
  Plus,
} from "lucide-react";

// Add styles for button hover states and file card hovers
const documentLibraryStyles = `
  .quick-create-button:hover {
    background: #2A3A82 !important;
  }
  .file-card {
    transition: background-color 0.2s ease;
    cursor: pointer;
  }
  .file-card:hover {
    background-color: #F5F5F5 !important;
  }
`;

// Document data structure based on Figma design
const documentSections = [
  {
    id: "general",
    title: "General Documents",
    count: 9,
    isOpen: true,
    documents: [
      { id: "1", name: "Quick Start Guide", size: "200 KB", type: "PDF" },
      { id: "2", name: "Web Demo", size: "200 KB", type: "PDF" },
      { id: "3", name: "User Guide", size: "200 KB", type: "PDF" },
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

export default function DocumentLibrary() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "general",
    "motor-vehicle",
  ]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
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
    const handleClickOutside = () => {
      if (userMenuOpen) setUserMenuOpen(false);
    };
    if (userMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [userMenuOpen]);

  const toggleAccordion = (accordionId: string) => {
    setOpenAccordions((prev) =>
      prev.includes(accordionId)
        ? prev.filter((id) => id !== accordionId)
        : [...prev, accordionId],
    );
  };

  const FileIcon = () => (
    <div className="relative w-10 h-10">
      <svg
        className="w-8 h-10 absolute left-2 top-0"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 0.75H20C20.1212 0.75 20.2375 0.798089 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
          stroke="#D5D7DA"
          strokeWidth="1.5"
        />
        <path
          d="M19.25 12.75H31.25"
          stroke="#D5D7DA"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-[#344698] mt-1">PDF</span>
      </div>
    </div>
  );

  const NavIcon = ({
    section,
    isOpen,
  }: {
    section: string;
    isOpen: boolean;
  }) => {
    const icons = {
      dashboard: (
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.97756 13.0829V14.8273M10.4663 9.59414V14.8273M13.9551 6.10536V14.8273M6.80312 18.3161H14.1296C15.595 18.3161 16.3277 18.3161 16.8874 18.0309C17.3798 17.7801 17.7801 17.3798 18.0309 16.8874C18.3161 16.3277 18.3161 15.595 18.3161 14.1296V6.80312C18.3161 5.33769 18.3161 4.60498 18.0309 4.04526C17.7801 3.55292 17.3798 3.15263 16.8874 2.90177C16.3277 2.61658 15.595 2.61658 14.1296 2.61658H6.80312C5.33769 2.61658 4.60498 2.61658 4.04526 2.90177C3.55292 3.15263 3.15263 3.55292 2.90177 4.04526C2.61658 4.60498 2.61658 5.33769 2.61658 6.80312V14.1296C2.61658 15.595 2.61658 16.3277 2.90177 16.8874C3.15263 17.3798 3.55292 17.7801 4.04526 18.0309C4.60498 18.3161 5.33769 18.3161 6.80312 18.3161Z"
            stroke="#344698"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tools: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8333 9.26607C15.7668 9.26607 16.2335 9.26607 16.59 9.08442C16.9036 8.92463 17.1586 8.66966 17.3183 8.35606C17.5 7.99954 17.5 7.53283 17.5 6.59941V6.09941C17.5 5.16599 17.5 4.69928 17.3183 4.34276C17.1586 4.02915 16.9036 3.77418 16.59 3.6144C16.2335 3.43274 15.7668 3.43274 14.8333 3.43274L5.16667 3.43274C4.23325 3.43274 3.76654 3.43274 3.41002 3.61439C3.09641 3.77418 2.84144 4.02915 2.68166 4.34275C2.5 4.69927 2.5 5.16598 2.5 6.09941L2.5 6.59941C2.5 7.53283 2.5 7.99954 2.68166 8.35606C2.84144 8.66966 3.09641 8.92463 3.41002 9.08442C3.76654 9.26607 4.23325 9.26607 5.16667 9.26607L14.8333 9.26607Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.8333 18.4327C15.7668 18.4327 16.2335 18.4327 16.59 18.2511C16.9036 18.0913 17.1586 17.8363 17.3183 17.5227C17.5 17.1662 17.5 16.6995 17.5 15.7661V15.2661C17.5 14.3327 17.5 13.8659 17.3183 13.5094C17.1586 13.1958 16.9036 12.9409 16.59 12.7811C16.2335 12.5994 15.7668 12.5994 14.8333 12.5994L5.16667 12.5994C4.23325 12.5994 3.76654 12.5994 3.41002 12.7811C3.09641 12.9408 2.84144 13.1958 2.68166 13.5094C2.5 13.8659 2.5 14.3327 2.5 15.2661L2.5 15.7661C2.5 16.6995 2.5 17.1662 2.68166 17.5227C2.84144 17.8363 3.09641 18.0913 3.41002 18.2511C3.76654 18.4327 4.23325 18.4327 5.16667 18.4327H14.8333Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      screening: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 8.43274L17.5 8.43274M7.5 3.43274L7.5 18.4327M6.5 3.43274H13.5C14.9001 3.43274 15.6002 3.43274 16.135 3.70522C16.6054 3.94491 16.9878 4.32736 17.2275 4.79776C17.5 5.33254 17.5 6.03261 17.5 7.43274V14.4327C17.5 15.8329 17.5 16.5329 17.2275 17.0677C16.9878 17.5381 16.6054 17.9206 16.135 18.1603C15.6002 18.4327 14.9001 18.4327 13.5 18.4327H6.5C5.09987 18.4327 4.3998 18.4327 3.86502 18.1603C3.39462 17.9206 3.01217 17.5381 2.77248 17.0677C2.5 16.5329 2.5 15.8329 2.5 14.4327V7.43274C2.5 6.03261 2.5 5.33254 2.77248 4.79776C3.01217 4.32736 3.39462 3.94491 3.86502 3.70522C4.3998 3.43274 5.09987 3.43274 6.5 3.43274Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      reporting: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8334 6.76607L9.90374 4.90684C9.63619 4.37174 9.50241 4.10418 9.30283 3.90871C9.12634 3.73585 8.91362 3.60438 8.68008 3.52383C8.41599 3.43274 8.11686 3.43274 7.5186 3.43274H4.33335C3.39993 3.43274 2.93322 3.43274 2.5767 3.6144C2.2631 3.77418 2.00813 4.02915 1.84834 4.34276C1.66669 4.69927 1.66669 5.16599 1.66669 6.09941V6.76607M1.66669 6.76607H14.3334C15.7335 6.76607 16.4336 6.76607 16.9683 7.03856C17.4387 7.27824 17.8212 7.66069 18.0609 8.1311C18.3334 8.66588 18.3334 9.36594 18.3334 10.7661V14.4327C18.3334 15.8329 18.3334 16.5329 18.0609 17.0677C17.8212 17.5381 17.4387 17.9206 16.9683 18.1603C16.4336 18.4327 15.7335 18.4327 14.3334 18.4327H5.66669C4.26656 18.4327 3.56649 18.4327 3.03171 18.1603C2.56131 17.9206 2.17885 17.5381 1.93917 17.0677C1.66669 16.5329 1.66669 15.8329 1.66669 14.4327V6.76607Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      support: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66666 10.9329V11.5996C6.66666 12.9331 6.66666 13.5998 6.91074 14.1336C7.12703 14.603 7.48033 14.9963 7.94972 15.2125C8.48351 15.4566 9.15019 15.4566 10.4836 15.4566H14.1669M6.66666 10.9329C5.33322 10.9329 4.66649 10.9329 4.13271 10.6888C3.66332 10.4725 3.27002 10.0792 3.05372 9.60984C2.80964 9.07606 2.80964 8.40938 2.80964 7.07594V6.93274C2.80964 5.59931 2.80964 4.93263 3.05372 4.39885C3.27002 3.92946 3.66332 3.53616 4.13271 3.31987C4.66649 3.07579 5.33322 3.07579 6.66666 3.07579H13.3334C14.6668 3.07579 15.3335 3.07579 15.8673 3.31987C16.3367 3.53616 16.73 3.92946 16.9463 4.39885C17.1904 4.93263 17.1904 5.59931 17.1904 6.93274V7.07594C17.1904 8.40938 17.1904 9.07606 16.9463 9.60984C16.73 10.0792 16.3367 10.4725 15.8673 10.6888C15.3335 10.9329 14.6668 10.9329 13.3334 10.9329H10.8334L6.66666 10.9329Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };
    return icons[section as keyof typeof icons] || null;
  };

  const NavItem = ({
    icon: Icon,
    label,
    badge,
    hasDropdown = false,
    onClick,
  }: {
    icon: any;
    label: string;
    badge?: number;
    hasDropdown?: boolean;
    onClick?: () => void;
  }) => (
    <div
      className="flex items-center justify-between w-full p-2 pl-4 rounded-lg text-[#414651] hover:bg-gray-50 cursor-pointer transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <NavIcon section={label.toLowerCase()} isOpen={false} />
        <span className="text-sm font-semibold">{label}</span>
        {badge && (
          <Badge className="bg-[#F79009] text-white text-xs px-2 py-0.5 h-5 min-w-5 rounded-full">
            {badge}
          </Badge>
        )}
      </div>
      {hasDropdown && <ChevronDown className="w-4 h-4 text-[#717680]" />}
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: documentLibraryStyles }} />

      {/* TopBar component for desktop */}
      <TopBar isDesktop={isDesktop} />

      <div
        className="flex w-full min-h-screen bg-[#FAFAFA]"
        style={{
          marginLeft: isDesktop ? "296px" : "0",
          paddingTop: isDesktop ? "80px" : "0",
        }}
      >
        {/* Sidebar */}
        <div
          className={`${
            isMobile
              ? mobileMenuOpen
                ? "w-72"
                : "w-0 overflow-hidden"
              : "w-[296px]"
          } transition-all duration-300 flex-shrink-0 fixed left-0 top-0 h-full z-10`}
          style={{
            paddingTop: isDesktop ? "80px" : "0",
          }}
        >
          <div className="h-full p-2 pl-2 pt-2">
            <div className="h-full bg-white rounded-xl border border-[#E9EAEB] shadow-sm">
              <div className="p-5">
                {/* Logo */}
                <div className="mb-5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5f38048a89d8ad952ff6b9682276a562665736e?width=274"
                    alt="Accio Data"
                    className="h-6"
                  />
                </div>

                {/* Navigation */}
                <div className="space-y-1">
                  <NavItem
                    icon={BarChart}
                    label="Dashboard"
                    onClick={() => navigate("/dashboard")}
                  />
                  <NavItem icon={Table} label="Tools" hasDropdown />
                  <NavItem
                    icon={Table}
                    label="Screening"
                    badge={8}
                    hasDropdown
                  />
                  <NavItem icon={Folder} label="Reporting" hasDropdown />

                  {/* Support & Resources - Expanded */}
                  <div className="space-y-1">
                    <NavItem
                      icon={MessageSquareMore}
                      label="Support & Resources"
                      hasDropdown
                    />
                    <div className="ml-8 space-y-1">
                      <div className="flex items-center w-full p-2 pl-4 rounded-lg bg-[#ECEEF9] text-[#273572] cursor-pointer">
                        <span className="text-sm font-semibold">
                          Document Library
                        </span>
                      </div>
                      <div
                        className="flex items-center w-full p-2 pl-4 rounded-lg text-[#414651] hover:bg-gray-50 cursor-pointer transition-all duration-200"
                        onClick={() => navigate("/dashboard")}
                      >
                        <span className="text-sm font-semibold">Resources</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile/Tablet Header (only shown on non-desktop) */}
          {!isDesktop && (
            <div className="bg-gradient-to-b from-[#FAFAFA] to-transparent">
              <div className="flex items-center justify-between h-18 px-8 py-4">
                <div className="flex items-center gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#A4A7AE]" />
                    <Input
                      placeholder="Search"
                      className="pl-12 pr-16 h-12 bg-white border-[#D5D7DA] shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white border border-[#E9EAEB] rounded px-2 py-1">
                      <span className="text-xs text-[#717680]">⌘K</span>
                    </div>
                  </div>

                  {/* Quick Create Button */}
                  <Button className="quick-create-button bg-[#344698] hover:bg-[#2A3A82] text-white px-3 py-3 h-12 shadow-sm border-2 border-white/10">
                    <span className="px-1">Quick Create</span>
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  {/* Divider */}
                  <div className="w-px h-10 bg-[#E9EAEB]"></div>

                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="w-10 h-10">
                    <Bell className="w-6 h-6 text-[#A4A7AE]" />
                  </Button>

                  {/* User Menu */}
                  <div className="flex items-center gap-2 p-2 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-[#181D27]">
                        Alexandra Fitzwilliam
                      </div>
                      <div className="text-sm text-[#535862]">[User Role]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page Content */}
          <div className="flex-1 px-8">
            {/* Page Header */}
            <div className="mb-5">
              <div className="flex items-end justify-between flex-wrap gap-4 mb-4">
                <div className="min-w-80 flex-1">
                  <h1 className="text-[#0C111D] text-3xl font-semibold leading-9 tracking-tight">
                    Document Library
                  </h1>
                  <p className="text-[#535862] text-base font-normal leading-6 mt-1">
                    Access and download important documents and forms
                  </p>
                </div>
              </div>
            </div>

            {/* Document Sections */}
            <div className="space-y-6">
              {documentSections.map((section) => (
                <div key={section.id} className="space-y-4">
                  {/* Section Header */}
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleAccordion(section.id)}
                    style={{
                      marginBottom: openAccordions.includes(section.id)
                        ? "24px"
                        : "8px",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <ChevronDown
                        className={`w-5 h-5 text-[#717680] transition-transform duration-200 ${
                          openAccordions.includes(section.id)
                            ? "rotate-0"
                            : "-rotate-90"
                        }`}
                      />
                      <h2 className="text-[#0C111D] text-lg font-semibold">
                        {section.title}
                      </h2>
                      <Badge
                        variant="secondary"
                        className="bg-[#F2F4F7] text-[#475467] text-sm font-medium px-2 py-1"
                      >
                        {section.count}
                      </Badge>
                    </div>
                  </div>

                  {/* Document Grid */}
                  {openAccordions.includes(section.id) && (
                    <div
                      className={`grid gap-4 ${
                        isDesktop || (!isMobile && window.innerWidth >= 768)
                          ? "grid-cols-2"
                          : "grid-cols-1"
                      }`}
                    >
                      {section.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="file-card flex items-center justify-between p-4 bg-white border border-[#E9EAEB] rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileIcon />
                            <div>
                              <h3 className="text-[#0C111D] text-sm font-semibold">
                                {doc.name}
                              </h3>
                              <p className="text-[#535862] text-sm">
                                {doc.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-[#475467] hover:text-[#344698] hover:bg-[#F0F2FF]"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-[#475467] hover:text-[#344698] hover:bg-[#F0F2FF]"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobile && mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
}
