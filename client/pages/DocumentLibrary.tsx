import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "general",
    "motor-vehicle",
  ]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute left-1 top-4 w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
        <span className="text-white text-xs font-bold">PDF</span>
      </div>
    </div>
  );

  const NavIcon = ({ section }: { section: string }) => {
    const icons = {
      dashboard: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66667 12.5V14.1667M10 9.16667V14.1667M13.3333 5.83333V14.1667M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      tools: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8333 8.33333C15.7668 8.33333 16.2335 8.33333 16.59 8.15168C16.9036 7.99189 17.1586 7.73692 17.3183 7.42332C17.5 7.0668 17.5 6.60009 17.5 5.66667V5.16667C17.5 4.23325 17.5 3.76654 17.3183 3.41002C17.1586 3.09641 16.9036 2.84145 16.59 2.68166C16.2335 2.5 15.7668 2.5 14.8333 2.5L5.16667 2.5C4.23325 2.5 3.76654 2.5 3.41002 2.68166C3.09641 2.84144 2.84144 3.09641 2.68166 3.41002C2.5 3.76654 2.5 4.23325 2.5 5.16667L2.5 5.66667C2.5 6.60009 2.5 7.0668 2.68166 7.42332C2.84144 7.73692 3.09641 7.99189 3.41002 8.15168C3.76654 8.33333 4.23325 8.33333 5.16667 8.33333L14.8333 8.33333Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.8333 17.5C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V14.3333C17.5 13.3999 17.5 12.9332 17.3183 12.5767C17.1586 12.2631 16.9036 12.0081 16.59 11.8483C16.2335 11.6667 15.7668 11.6667 14.8333 11.6667L5.16667 11.6667C4.23325 11.6667 3.76654 11.6667 3.41002 11.8483C3.09641 12.0081 2.84144 12.2631 2.68166 12.5767C2.5 12.9332 2.5 13.3999 2.5 14.3333L2.5 14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333Z"
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
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 7.5L17.5 7.5M7.5 2.5L7.5 17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
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
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8337 5.83333L9.90404 3.9741C9.6365 3.439 9.50271 3.17144 9.30313 2.97597C9.12664 2.80311 8.91393 2.67164 8.68039 2.59109C8.4163 2.5 8.11716 2.5 7.5189 2.5H4.33366C3.40024 2.5 2.93353 2.5 2.57701 2.68166C2.2634 2.84144 2.00844 3.09641 1.84865 3.41002C1.66699 3.76654 1.66699 4.23325 1.66699 5.16667V5.83333M1.66699 5.83333H14.3337C15.7338 5.83333 16.4339 5.83333 16.9686 6.10582C17.439 6.3455 17.8215 6.72795 18.0612 7.19836C18.3337 7.73314 18.3337 8.4332 18.3337 9.83333V13.5C18.3337 14.9001 18.3337 15.6002 18.0612 16.135C17.8215 16.6054 17.439 16.9878 16.9686 17.2275C16.4339 17.5 15.7338 17.5 14.3337 17.5H5.66699C4.26686 17.5 3.5668 17.5 3.03202 17.2275C2.56161 16.9878 2.17916 16.6054 1.93948 16.135C1.66699 15.6002 1.66699 14.9001 1.66699 13.5V5.83333Z"
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
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 11.6667V8.75M10 5.83333H10.0083M8.25 16L9.46667 17.6222C9.6476 17.8635 9.73807 17.9841 9.84897 18.0272C9.94611 18.065 10.0539 18.065 10.151 18.0272C10.2619 17.9841 10.3524 17.8635 10.5333 17.6222L11.75 16C11.9943 15.6743 12.1164 15.5114 12.2654 15.3871C12.4641 15.2213 12.6986 15.104 12.9504 15.0446C13.1393 15 13.3429 15 13.75 15C14.9149 15 15.4973 15 15.9567 14.8097C16.5693 14.556 17.056 14.0693 17.3097 13.4567C17.5 12.9973 17.5 12.4149 17.5 11.25V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V11.25C2.5 12.4149 2.5 12.9973 2.6903 13.4567C2.94404 14.0693 3.43072 14.556 4.04329 14.8097C4.50272 15 5.08515 15 6.25 15C6.65715 15 6.86072 15 7.04959 15.0446C7.30141 15.104 7.53593 15.2213 7.73458 15.3871C7.88357 15.5114 8.00571 15.6743 8.25 16Z"
            stroke="#A4A7AE"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };
    return icons[section.toLowerCase() as keyof typeof icons] || null;
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      {/* Sidebar */}
      <div className="w-[296px] h-screen p-2 pl-2 pt-2 pb-6 flex-shrink-0">
        <div className="h-full bg-white rounded-xl border border-[#E9EAEB] shadow-sm flex flex-col justify-between">
          <div className="flex-1 pt-5 flex flex-col gap-5">
            {/* Logo */}
            <div className="px-5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5f38048a89d8ad952ff6b9682276a562665736e?width=274"
                alt="Accio Data"
                className="h-6"
              />
            </div>

            {/* Navigation */}
            <div className="px-4 space-y-1">
              {/* Dashboard */}
              <div
                className="flex items-center gap-3 p-2 px-3 rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => navigate("/dashboard")}
              >
                <NavIcon section="dashboard" />
                <span className="text-sm font-semibold text-[#414651]">
                  Dashboard
                </span>
              </div>

              {/* Tools */}
              <div className="flex items-center justify-between p-2 px-3 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <NavIcon section="tools" />
                  <span className="text-sm font-semibold text-[#414651]">
                    Tools
                  </span>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#A4A7AE"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Screening */}
              <div className="flex items-center justify-between p-2 px-3 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <NavIcon section="screening" />
                  <span className="text-sm font-semibold text-[#414651]">
                    Screening
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#FAFAFA] border border-[#E9EAEB] rounded-full px-2 py-0.5">
                    <span className="text-xs text-[#414651] font-medium">
                      8
                    </span>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#A4A7AE"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Reporting */}
              <div className="flex items-center justify-between p-2 px-3 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <NavIcon section="reporting" />
                  <span className="text-sm font-semibold text-[#414651]">
                    Reporting
                  </span>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#A4A7AE"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Support & Resources - Expanded */}
              <div className="space-y-1">
                <div className="flex items-center justify-between p-2 px-3 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <NavIcon section="support" />
                    <span className="text-sm font-semibold text-[#414651]">
                      Support & Resources
                    </span>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="#A4A7AE"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="ml-8 space-y-1 pb-1">
                  <div className="p-2 pl-4 rounded-lg bg-[#ECEEF9] cursor-pointer">
                    <span className="text-sm font-semibold text-[#273572]">
                      Document Library
                    </span>
                  </div>
                  <div
                    className="p-2 pl-4 rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate("/dashboard")}
                  >
                    <span className="text-sm font-semibold text-[#414651]">
                      Resources
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col border-radius-[40px_0_0_0]">
        {/* Header Navigation */}
        <div
          className="flex flex-col items-center"
          style={{
            background:
              "linear-gradient(180deg, #FAFAFA 43.75%, rgba(255, 255, 255, 0.00) 100%)",
          }}
        >
          <div className="flex items-center gap-5 h-[72px] px-8 w-full">
            {/* Search Bar */}
            <div className="flex items-center gap-2 flex-1 max-w-md px-3.5 py-2.5 border border-[#D5D7DA] rounded-lg bg-white shadow-sm">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="flex-1 border-none outline-none bg-transparent text-[#717680] text-base"
              />
              <div className="px-1 py-0.5 border border-[#E9EAEB] rounded bg-white">
                <span className="text-xs text-[#717680] font-medium">⌘K</span>
              </div>
            </div>

            {/* Quick Create Button */}
            <button className="flex items-center gap-1 px-3 py-3 bg-[#344698] hover:bg-[#2A3A82] text-white rounded-lg border-2 border-white/12 shadow-sm transition-colors">
              <span className="text-sm font-semibold px-0.5">Quick Create</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0003 6.66699V13.3337M6.66699 10.0003H13.3337M18.3337 10.0003C18.3337 14.6027 14.6027 18.3337 10.0003 18.3337C5.39795 18.3337 1.66699 14.6027 1.66699 10.0003C1.66699 5.39795 5.39795 1.66699 10.0003 1.66699C14.6027 1.66699 18.3337 5.39795 18.3337 10.0003Z"
                  stroke="#8D9BD8"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center gap-3 ml-8">
              {/* Divider */}
              <div className="w-4 h-10 flex items-center justify-center">
                <div className="w-px h-10 bg-[#E9EAEB]"></div>
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-md">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.35395 21C10.0591 21.6224 10.9853 22 11.9998 22C13.0142 22 13.9405 21.6224 14.6456 21M17.9998 8C17.9998 6.4087 17.3676 4.88258 16.2424 3.75736C15.1172 2.63214 13.5911 2 11.9998 2C10.4085 2 8.88235 2.63214 7.75713 3.75736C6.63192 4.88258 5.99977 6.4087 5.99977 8C5.99977 11.0902 5.22024 13.206 4.34944 14.6054C3.6149 15.7859 3.24763 16.3761 3.2611 16.5408C3.27601 16.7231 3.31463 16.7926 3.46155 16.9016C3.59423 17 4.19237 17 5.38863 17H18.6109C19.8072 17 20.4053 17 20.538 16.9016C20.6849 16.7926 20.7235 16.7231 20.7384 16.5408C20.7519 16.3761 20.3846 15.7859 19.6501 14.6054C18.7793 13.206 17.9998 11.0902 17.9998 8Z"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-2 p-2 rounded-xl">
                <div className="w-10 h-10 rounded-full border border-black/10 bg-gray-300"></div>
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

        {/* Page Content Container */}
        <div className="px-8 space-y-5">
          {/* Page Header */}
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="min-w-80 flex-1">
              <h1 className="text-2xl font-semibold text-[#181D27] leading-8">
                Document Library
              </h1>
              <p className="text-base text-[#535862] mt-1">
                Browse and download key forms and documents needed for
                screenings, compliance, and account setup.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 px-2 py-1.5 min-h-8 border border-[#D5D7DA] bg-white rounded-lg shadow-sm">
                <span className="text-sm font-semibold text-[#414651] px-0.5">
                  Most Recent
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="flex items-center gap-1 px-2 py-1.5 min-h-8 border border-[#D5D7DA] bg-white rounded-lg shadow-sm">
                <span className="text-sm font-semibold text-[#414651] px-0.5">
                  All Files
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 min-w-48 max-w-80 flex-1 px-2 py-1.5 border border-[#D5D7DA] bg-white rounded-lg shadow-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Guide"
                className="flex-1 text-sm font-medium text-[#717680] border-none outline-none bg-transparent h-5"
              />
            </div>
          </div>

          {/* Document Sections */}
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="px-8 flex flex-col gap-6 w-full">
              {documentSections.map((section) => (
                <div
                  key={section.id}
                  className="flex flex-col border border-[#E9EAEB] bg-white rounded-xl shadow-sm"
                >
                  {/* Section Header */}
                  <div className="flex justify-between items-start gap-4 p-5 pb-0">
                    <div className="flex items-start gap-1 flex-1">
                      <div className="flex flex-col justify-center items-start gap-0.5 flex-1">
                        <div className="flex items-center gap-2 w-full">
                          <h2 className="text-lg font-semibold text-[#181D27]">
                            {section.title}
                          </h2>
                          <div className="bg-[#FAFAFA] border border-[#E9EAEB] rounded-full px-2 py-0.5">
                            <span className="text-xs text-[#414651] font-medium">
                              {section.count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="p-2 border border-[#D5D7DA] bg-white rounded-lg shadow-sm"
                      onClick={() => toggleAccordion(section.id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform ${openAccordions.includes(section.id) ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Document Content */}
                  {openAccordions.includes(section.id) && (
                    <div className="p-5 pt-5">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {section.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center gap-1 p-4 border border-[#E9EAEB] bg-white rounded-xl hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                            style={{ width: "508px", height: "92px" }}
                          >
                            <div className="flex items-start gap-3 flex-1">
                              <FileIcon />
                              <div className="flex flex-col items-start gap-0.5 flex-1">
                                <div className="text-sm font-medium text-[#414651] w-full overflow-hidden text-ellipsis line-clamp-1">
                                  {doc.name}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-[#535862]">
                                    {doc.size}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 rounded-md">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                              <button className="p-1.5 rounded-md">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21 21H3M18 11L12 17M12 17L6 11M12 17V3"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
