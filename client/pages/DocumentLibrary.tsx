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
          d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
          stroke="#D5D7DA"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute left-0 top-[18px] w-[26px] h-4 bg-[#D92D20] rounded-sm flex items-center justify-center">
        <span className="text-white text-[10px] font-bold font-inter">PDF</span>
      </div>
    </div>
  );

  const NavItem = ({
    icon: Icon,
    label,
    isActive = false,
    badge,
    hasDropdown = false,
    onClick = () => {},
  }: {
    icon: any;
    label: string;
    isActive?: boolean;
    badge?: number;
    hasDropdown?: boolean;
    onClick?: () => void;
  }) => (
    <div
      className={`flex items-center justify-between w-full p-2 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-[#ECEEF9] text-[#273572]"
          : "text-[#414651] hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#A4A7AE]" />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <Badge
            variant="secondary"
            className="text-xs bg-[#FAFAFA] text-[#414651] border border-[#E9EAEB]"
          >
            {badge}
          </Badge>
        )}
        {hasDropdown && <ChevronDown className="w-6 h-6 text-[#A4A7AE]" />}
      </div>
    </div>
  );

    return (
    <>
      <style dangerouslySetInnerHTML={{ __html: documentLibraryStyles }} />
      <div
        className="flex w-full min-h-screen bg-[#FAFAFA]"
        style={{
          marginLeft: isDesktop ? "296px" : "0",
          paddingTop: isDesktop ? "80px" : "0",
        }}
      >
      {/* Sidebar */}
      <div
        className={`${isMobile ? (mobileMenuOpen ? "w-72" : "w-0 overflow-hidden") : "w-[296px]"} transition-all duration-300 flex-shrink-0`}
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
                <NavItem icon={Table} label="Screening" badge={8} hasDropdown />
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

      {/* TopBar component for desktop */}
      <TopBar isDesktop={isDesktop} />

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
                <Button className="bg-[#344698] hover:bg-[#2A3A82] text-white px-3 py-3 h-12 shadow-sm border-2 border-white/10">
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
                <h1 className="text-2xl font-semibold text-[#181D27] mb-1">
                  Document Library
                </h1>
                <p className="text-base text-[#535862]">
                  Browse and download key forms and documents needed for
                  screenings, compliance, and account setup.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#414651] border-[#D5D7DA]"
                >
                  Most Recent
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#414651] border-[#D5D7DA]"
                >
                  All Files
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              <div className="relative min-w-52 flex-1 max-w-80">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A4A7AE]" />
                <Input
                  placeholder="Guide"
                  className="pl-8 h-8 text-sm bg-white border-[#D5D7DA] shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Document Sections */}
          <div className="space-y-6 pb-6">
            {documentSections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-xl border border-[#E9EAEB] shadow-sm"
              >
                {/* Section Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-[#181D27]">
                        {section.title}
                      </h2>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-[#FAFAFA] text-[#414651] border border-[#E9EAEB]"
                      >
                        {section.count}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2 border-[#D5D7DA]"
                      onClick={() => toggleAccordion(section.id)}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openAccordions.includes(section.id) ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Section Content */}
                {openAccordions.includes(section.id) && (
                  <div className="p-6 pt-5">
                    {section.documents.length > 0 ? (
                      <div
                        className="grid gap-4"
                        style={{
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(500px, 1fr))",
                        }}
                      >
                        {section.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E9EAEB] hover:shadow-md transition-shadow"
                          >
                            <FileIcon />
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-[#414651] mb-1">
                                {doc.name}
                              </h3>
                              <p className="text-xs text-[#535862]">
                                {doc.size}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-9 h-9 hover:bg-gray-50"
                              >
                                <Eye className="w-6 h-6 text-[#A4A7AE]" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-9 h-9 hover:bg-gray-50"
                              >
                                <Download className="w-6 h-6 text-[#A4A7AE]" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-5"></div>
                    )}
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
  );
}