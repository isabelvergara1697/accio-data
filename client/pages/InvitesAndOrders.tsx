import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Checkbox } from "../components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import InformationDrawer from "../components/ui/information-drawer";

interface InviteData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status:
    | "waiting"
    | "unsolicited"
    | "canceled"
    | "expired"
    | "waiting-for-recruitee"
    | "expires-today"
    | "reviewed"
    | "archived";
  completion: number;
  lastEmail: string;
  i9Filled: boolean;
  activated: boolean;
  ews: boolean;
}

// Component to handle text truncation with tooltip
const TruncatedText: React.FC<{
  text: string;
  style?: React.CSSProperties;
  maxWidth?: string;
  highlightedText?: React.ReactNode;
}> = ({ text, style = {}, maxWidth, highlightedText }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const checkTruncation = useCallback(() => {
    if (textRef.current) {
      const element = textRef.current;
      setIsTruncated(element.scrollWidth > element.offsetWidth);
    }
  }, []);

  useEffect(() => {
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [checkTruncation, text]);

  const textElement = (
    <div
      ref={textRef}
      style={{
        ...style,
        maxWidth: maxWidth || "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      <span
        style={{
          fontFamily:
            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          color: "rgba(24,29,39,1)",
        }}
      >
        {highlightedText || text}
      </span>
    </div>
  );

  if (isTruncated) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{textElement}</TooltipTrigger>
        <TooltipContent
          side="top"
          align="start"
          sideOffset={5}
          style={{
            maxWidth: "300px",
            wordWrap: "break-word",
            backgroundColor: "#0A0D12",
            color: "#FFF",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "18px",
            boxShadow:
              "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
          }}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    );
  }

  return textElement;
};

const InvitesAndOrders: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isLargeDesktop, setIsLargeDesktop] = useState(
    window.innerWidth >= 1440,
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"invites" | "orders">("invites");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showNotification] = useState(false);
  const [sortField, setSortField] = useState<keyof InviteData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null,
  );
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredPaginationButton, setHoveredPaginationButton] = useState<
    string | null
  >(null);
  const [showInformationDrawer, setShowInformationDrawer] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showMobileDotsMenu, setShowMobileDotsMenu] = useState(false);
  const [tableView, setTableView] = useState<"table" | "rows">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearchForm, setAdvancedSearchForm] = useState({
    firstName: "",
    lastName: "",
    socialSecurityTrace: "",
    orderNumber: "",
  });
  const [goToInputValue, setGoToInputValue] = useState("");
  const [hoveredSearchButton, setHoveredSearchButton] = useState<string | null>(
    null,
  );
  const [isButtonClick, setIsButtonClick] = useState(false);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);
  const advancedSearchRef = useRef<HTMLDivElement>(null);
  const advancedSearchButtonRef = useRef<HTMLButtonElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const mobileDotsMenuRef = useRef<HTMLDivElement>(null);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsLargeDesktop(width >= 1440);
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    // Call immediately on mount to set initial values
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadDropdownRef.current &&
        !downloadDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDownloadDropdown(false);
      }
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setShowActionMenu(null);
      }
      if (
        mobileDotsMenuRef.current &&
        !mobileDotsMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileDotsMenu(false);
      }
      if (
        advancedSearchRef.current &&
        !advancedSearchRef.current.contains(event.target as Node) &&
        advancedSearchButtonRef.current &&
        !advancedSearchButtonRef.current.contains(event.target as Node)
      ) {
        setShowAdvancedSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  // Sample data for invites
  const invitesData: InviteData[] = [
    {
      id: "1",
      firstName: "Isabella",
      lastName: "Young",
      email: "isabella.miller@example.com",
      status: "waiting",
      completion: 80,
      lastEmail: "07/19/22",
      i9Filled: true,
      activated: true,
      ews: true,
    },
    {
      id: "2",
      firstName: "Ava",
      lastName: "Lewis",
      email: "ava.jones@example.com",
      status: "expired",
      completion: 60,
      lastEmail: "09/05/23",
      i9Filled: true,
      activated: false,
      ews: false,
    },
    {
      id: "3",
      firstName: "Emma",
      lastName: "Walker",
      email: "emma.garcia@example.com",
      status: "canceled",
      completion: 80,
      lastEmail: "02/14/25",
      i9Filled: false,
      activated: true,
      ews: true,
    },
    {
      id: "4",
      firstName: "Sophia",
      lastName: "Mitchell",
      email: "sophia.williams@example.com",
      status: "expired",
      completion: 60,
      lastEmail: "08/15/25",
      i9Filled: true,
      activated: true,
      ews: false,
    },
    {
      id: "5",
      firstName: "Noah",
      lastName: "Clark",
      email: "noah.davis@example.com",
      status: "waiting-for-recruitee",
      completion: 60,
      lastEmail: "12/01/24",
      i9Filled: true,
      activated: true,
      ews: true,
    },
    {
      id: "6",
      firstName: "Mason",
      lastName: "Carter",
      email: "mason.johnson@example.com",
      status: "waiting",
      completion: 40,
      lastEmail: "11/30/23",
      i9Filled: false,
      activated: false,
      ews: true,
    },
    {
      id: "7",
      firstName: "Oliver",
      lastName: "Harris",
      email: "liam.smith@example.com",
      status: "expires-today",
      completion: 70,
      lastEmail: "05/22/24",
      i9Filled: false,
      activated: false,
      ews: true,
    },
    {
      id: "8",
      firstName: "Liam",
      lastName: "Anderson",
      email: "oliver.brown@example.com",
      status: "expired",
      completion: 10,
      lastEmail: "03/10/23",
      i9Filled: true,
      activated: true,
      ews: false,
    },
    {
      id: "9",
      firstName: "Noah",
      lastName: "Mitchell",
      email: "noah.davis@example.com",
      status: "unsolicited",
      completion: 80,
      lastEmail: "02/14/25",
      i9Filled: false,
      activated: true,
      ews: true,
    },
    {
      id: "10",
      firstName: "Mason",
      lastName: "Carter",
      email: "mason.johnson@example.com",
      status: "canceled",
      completion: 60,
      lastEmail: "03/10/23",
      i9Filled: true,
      activated: true,
      ews: false,
    },
    // Second page content (page 2)
    {
      id: "11",
      firstName: "Lucas",
      lastName: "Thompson",
      email: "lucas.thompson@example.com",
      status: "waiting",
      completion: 75,
      lastEmail: "01/15/24",
      i9Filled: true,
      activated: true,
      ews: true,
    },
    {
      id: "12",
      firstName: "Mia",
      lastName: "Rodriguez",
      email: "mia.rodriguez@example.com",
      status: "expired",
      completion: 45,
      lastEmail: "11/20/23",
      i9Filled: false,
      activated: false,
      ews: false,
    },
    {
      id: "13",
      firstName: "Ethan",
      lastName: "Davis",
      email: "ethan.davis@example.com",
      status: "waiting-for-recruitee",
      completion: 90,
      lastEmail: "03/08/24",
      i9Filled: true,
      activated: true,
      ews: true,
    },
    {
      id: "14",
      firstName: "Charlotte",
      lastName: "Wilson",
      email: "charlotte.wilson@example.com",
      status: "expires-today",
      completion: 65,
      lastEmail: "02/28/24",
      i9Filled: true,
      activated: false,
      ews: true,
    },
    {
      id: "15",
      firstName: "James",
      lastName: "Moore",
      email: "james.moore@example.com",
      status: "unsolicited",
      completion: 30,
      lastEmail: "12/10/23",
      i9Filled: false,
      activated: false,
      ews: false,
    },
    {
      id: "16",
      firstName: "Amelia",
      lastName: "Taylor",
      email: "amelia.taylor@example.com",
      status: "waiting",
      completion: 85,
      lastEmail: "01/22/24",
      i9Filled: true,
      activated: true,
      ews: true,
    },
    {
      id: "17",
      firstName: "Benjamin",
      lastName: "Anderson",
      email: "benjamin.anderson@example.com",
      status: "canceled",
      completion: 50,
      lastEmail: "10/15/23",
      i9Filled: false,
      activated: false,
      ews: false,
    },
    {
      id: "18",
      firstName: "Harper",
      lastName: "Thomas",
      email: "harper.thomas@example.com",
      status: "expired",
      completion: 70,
      lastEmail: "09/30/23",
      i9Filled: true,
      activated: false,
      ews: true,
    },
    {
      id: "19",
      firstName: "Alexander",
      lastName: "Jackson",
      email: "alexander.jackson@example.com",
      status: "waiting",
      completion: 95,
      lastEmail: "02/14/24",
      i9Filled: true,
      activated: true,
      ews: true,
    },
    {
      id: "20",
      firstName: "Evelyn",
      lastName: "White",
      email: "evelyn.white@example.com",
      status: "expires-today",
      completion: 55,
      lastEmail: "01/05/24",
      i9Filled: false,
      activated: false,
      ews: false,
    },
  ];

  // Component for status badges with dynamic truncation detection - LATEST FIXES APPLIED
  const StatusBadge: React.FC<{ status: InviteData["status"] }> = ({
    status,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    const statusConfig = {
      waiting: { label: "Waiting", color: "blue-light" },
      unsolicited: { label: "Unsolicited", color: "gray-blue" },
      canceled: { label: "Canceled", color: "orange" },
      expired: { label: "Expired", color: "gray" },
      "waiting-for-recruitee": {
        label: "Waiting for Recruitee",
        color: "error",
      },
      "expires-today": { label: "Expires Today", color: "warning" },
      reviewed: { label: "Reviewed", color: "pink" },
      archived: { label: "Archived", color: "gray" },
    };

    const config = statusConfig[status];
    const colorMap = {
      "blue-light": { bg: "#F0F9FF", border: "#B9E6FE", text: "#026AA2" },
      "gray-blue": { bg: "#F8F9FC", border: "#D5D9EB", text: "#363F72" },
      gray: { bg: "#FAFAFA", border: "#E9EAEB", text: "#414651" },
      orange: { bg: "#FEF6EE", border: "#F9DBAF", text: "#B93815" },
      error: { bg: "#FEF3F2", border: "#FECDCA", text: "#B42318" },
      warning: { bg: "#FFFAEB", border: "#FEDF89", text: "#B54708" },
      pink: { bg: "#FDF2FA", border: "#FCCEEE", text: "#C11574" },
    };

    const colors = colorMap[config.color as keyof typeof colorMap];

    const checkTruncation = useCallback(() => {
      if (textRef.current) {
        // Check if the text is actually overflowing
        const element = textRef.current;
        setIsTruncated(element.scrollWidth > element.offsetWidth);
      }
    }, [config.label]);

    useEffect(() => {
      // Add a small delay to ensure DOM is fully rendered
      const timer = setTimeout(checkTruncation, 10);
      window.addEventListener("resize", checkTruncation);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", checkTruncation);
      };
    }, [checkTruncation]);

    const isLongText =
      config.label === "Waiting for Recruitee" ||
      config.label === "Expires Today";

    const badgeElement = (
      <div
        ref={containerRef}
        style={{
          display: "flex",
          padding: "2px 8px",
          alignItems: "center",
          ...(isLongText ? { flex: "1 0 0" } : {}),
          borderRadius: "9999px",
          border: `1px solid ${colors.border}`,
          background: colors.bg,
          position: "relative",
          maxWidth: "100%",
          minWidth: 0,
          width: "fit-content",
        }}
      >
        <div
          ref={textRef}
          style={{
            ...(isLongText
              ? {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  flex: "1 0 0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }
              : {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }),
            color: colors.text,
            textAlign: "left",
            fontFamily: "Public Sans",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "18px",
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily:
                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              color: colors.text,
            }}
          >
            {config.label}
          </span>
        </div>
      </div>
    );

    if (isTruncated) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{badgeElement}</TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            sideOffset={5}
            style={{
              maxWidth: "200px",
              wordWrap: "break-word",
              backgroundColor: "#0A0D12",
              color: "#FFF",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "18px",
              boxShadow:
                "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
            }}
          >
            {config.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return badgeElement;
  };

  const ProgressBar = ({ percentage }: { percentage: number }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flex: "1 0 0",
        alignSelf: "stretch",
        position: "relative",
      }}
    >
      <div style={{ height: "8px", flex: "1 0 0", position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "9999px",
            background: "#D5D7DA",
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        />
        <div
          style={{
            width: `${percentage}%`,
            height: "8px",
            borderRadius: "9999px",
            background: "#344698",
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        />
      </div>
      <div
        style={{
          color: "#414651",
          fontFamily: "Public Sans",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "20px",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily:
              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "rgba(65,70,81,1)",
          }}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );

  const CheckIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3334 4L6.00002 11.3333L2.66669 8"
        stroke="#A4A7AE"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ActionDotsIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke="#A4A7AE"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke="#A4A7AE"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke="#A4A7AE"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(invitesData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string) => {
    return (checked: boolean) => {
      if (checked) {
        setSelectedItems([...selectedItems, id]);
      } else {
        setSelectedItems(selectedItems.filter((item) => item !== id));
      }
    };
  };

  const handleSort = (field: keyof InviteData) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return invitesData;

    return invitesData.filter(
      (invite) =>
        invite.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Update sortedData to use filteredData instead of invitesData
  const sortedData = React.useMemo(() => {
    let data = [...filteredData];

    if (sortField && sortDirection) {
      data.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
        }
        if (typeof bValue === "string") {
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [filteredData, sortField, sortDirection]);

  // Pagination constants
  const pageSize = 10;
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Paginated data
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Search handling functions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearchActive(value.length > 0);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    setCurrentPage(1);
  };

  const handleAdvancedSearchChange = (field: string, value: string) => {
    setAdvancedSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearAdvancedSearch = () => {
    setAdvancedSearchForm({
      firstName: "",
      lastName: "",
      socialSecurityTrace: "",
      orderNumber: "",
    });
  };

  const handleAdvancedSearch = () => {
    // Combine all form fields into a single search query
    const searchTerms = Object.values(advancedSearchForm).filter((term) =>
      term.trim(),
    );
    const combinedQuery = searchTerms.join(" ");
    setSearchQuery(combinedQuery);
    setIsSearchActive(combinedQuery.length > 0);
    setShowAdvancedSearch(false);
    setCurrentPage(1);
  };

  // Helper function to highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <span
            key={index}
            style={{
              color: "#344698",
              fontWeight: 700,
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };


  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
      }}
    >
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="invites-orders"
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 0 0",
          alignSelf: "stretch",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          overflow: "visible",
          boxSizing: "border-box",
        }}
      >
        <Header
          isDesktop={isDesktop}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showMobileUserMenu={showMobileUserMenu}
          sidebarCollapsed={sidebarCollapsed}
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

        <main
          className="responsive-main-container"
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            flex: "1 1 auto",
            alignSelf: "stretch",
            borderRadius: "40px 0 0 0",
            background: "#FAFAFA",
            position: "relative",
            minWidth: 0,
            minHeight: 0,
          }}
        >
          {/* Header section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div className="page-header-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "20px",
                    alignSelf: "stretch",
                    position: "relative",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div className="page-title-group">
                    <h1 className="page-title">Invites & Orders</h1>
                    <div className="page-subtitle supporting-text">
                      Track pending invites and submitted orders in one place.
                      Use filters and tools to sort, review, and manage activity
                      easily.
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: isMobile ? "flex-start" : "center",
                      gap: "12px",
                      position: "relative",
                      ...(isMobile ? { alignSelf: "stretch" } : {}),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                      }}
                    >
                      {[
                        { key: "invites", label: "Invites", count: "456" },
                        { key: "orders", label: "Orders", count: "200" },
                      ].map((tab, index, array) => (
                        <div
                          key={tab.key}
                          onClick={() =>
                            setActiveTab(tab.key as typeof activeTab)
                          }
                          style={{
                            display: "flex",
                            minHeight: "40px",
                            padding: "8px 16px 8px 14px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "6px",
                            borderRight:
                              index < array.length - 1
                                ? "1px solid #D5D7DA"
                                : "none",
                            borderTopLeftRadius: index === 0 ? "8px" : "0",
                            borderBottomLeftRadius: index === 0 ? "8px" : "0",
                            borderTopRightRadius:
                              index === array.length - 1 ? "8px" : "0",
                            borderBottomRightRadius:
                              index === array.length - 1 ? "8px" : "0",
                            background:
                              activeTab === tab.key ? "#ECEEF9" : "#FFF",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color:
                                activeTab === tab.key ? "#273572" : "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontWeight: 600,
                                fontSize: "14px",
                                color:
                                  activeTab === tab.key
                                    ? "rgba(39,53,114,1)"
                                    : "rgba(65,70,81,1)",
                              }}
                            >
                              {tab.label}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "2px 8px",
                              alignItems: "center",
                              borderRadius: "9999px",
                              border:
                                activeTab === tab.key
                                  ? "1px solid #B3BCE5"
                                  : "1px solid #E9EAEB",
                              background:
                                activeTab === tab.key ? "#ECEEF9" : "#FAFAFA",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color:
                                  activeTab === tab.key ? "#273572" : "#414651",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  color:
                                    activeTab === tab.key
                                      ? "rgba(39,53,114,1)"
                                      : "rgba(65,70,81,1)",
                                }}
                              >
                                {tab.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              flex: "1 0 0",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "0",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                flex: "1 0 0",
                alignSelf: "stretch",
                position: "relative",
                maxWidth: "100%",
                overflow: "visible",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  position: "relative",
                  maxWidth: "100%",
                  overflow: "visible",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    position: "relative",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "visible",
                  }}
                >
                  {/* Table Header */}
                  <div
                    style={{
                      display: "flex",
                      padding: "16px 16px 0 16px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                      position: "relative",
                    }}
                  >
                    {/* Top Section - Responsive Layout */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection:
                          isDesktop && !isTablet ? "row" : "column",
                        gap: "16px",
                        alignItems:
                          isDesktop && !isTablet ? "center" : "flex-start",
                        alignSelf: "stretch",
                        position: "relative",
                        width: "100%",
                        maxWidth: "100%",
                        overflow: "visible",
                        boxSizing: "border-box",
                      }}
                    >
                      {isDesktop && !isTablet ? (
                        <>
                          {/* Desktop: Title - Left aligned */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                gap: "2px",
                                flex: "1 0 0",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "28px",
                                    position: "relative",
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
                                    Invites
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Desktop: Search */}
                          <div
                            className="search-container"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              flex: "0 0 234px",
                              height: "40px",
                              borderRadius: "8px",
                              border: isSearchActive
                                ? "2px solid #34479A"
                                : "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              padding: isSearchActive ? "7px" : "8px",
                              position: "relative",
                              boxSizing: "border-box",
                            }}
                          >
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
                              placeholder={
                                isSearchActive
                                  ? ""
                                  : "Search by Name, SSN, State.."
                              }
                              value={searchQuery}
                              onChange={handleSearchChange}
                              onFocus={() => setIsSearchActive(true)}
                              onBlur={() =>
                                setIsSearchActive(
                                  searchQuery.length > 0 || showAdvancedSearch,
                                )
                              }
                              style={{
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                flex: "1 0 0",
                                color: isSearchActive ? "#181D27" : "#717680",
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontSize: "14px",
                                fontWeight: isSearchActive ? 500 : 400,
                                lineHeight: "20px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            />
                            {isSearchActive && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "2px",

                                }}
                              >
                                {/* X Button */}
                                <button
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    clearSearch();
                                  }}

                                  onMouseEnter={() =>
                                    setHoveredSearchButton("clear")
                                  }
                                  onMouseLeave={() =>
                                    setHoveredSearchButton(null)
                                  }
                                  style={{
                                    display: "flex",
                                    width: "24px",
                                    height: "24px",
                                    padding: "4px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "6px",
                                    border: "none",
                                    background:
                                      hoveredSearchButton === "clear"
                                        ? "#F5F5F5"
                                        : "transparent",
                                    cursor: "pointer",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.3333 4.66675L4.66666 11.3334M4.66666 4.66675L11.3333 11.3334"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>

                                {/* Divider */}
                                <div
                                  style={{
                                    width: "1px",
                                    height: "24px",
                                    background: "#E9EAEB",
                                  }}
                                />
                              </div>
                            )}

                            {/* Advanced Search Button - Working Pattern */}
                            <div style={{ position: "relative" }}>
                              <button
                                onClick={() =>
                                  setShowAdvancedSearch(!showAdvancedSearch)
                                }
                                style={{
                                  display: "flex",
                                  width: "24px",
                                  height: "24px",
                                  padding: "4px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "6px",
                                  border: "none",
                                  background: showAdvancedSearch ? "#F5F5F5" : "transparent",
                                  cursor: "pointer",
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2 5.33325L10 5.33325M10 5.33325C10 6.43782 10.8954 7.33325 12 7.33325C13.1046 7.33325 14 6.43782 14 5.33325C14 4.22868 13.1046 3.33325 12 3.33325C10.8954 3.33325 10 4.22868 10 5.33325ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56202 2.89543 8.66659 4 8.66659C5.10457 8.66659 6 9.56202 6 10.6666Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                              {showAdvancedSearch && (
                                <div
                                  ref={advancedSearchRef}
                                  style={{
                                    position: "absolute",
                                    top: "calc(100% + 4px)",
                                    right: "0",
                                    width: "320px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(10, 13, 18, 0.04)",
                                    background: "rgba(255, 255, 255, 1)",
                                    boxShadow:
                                      "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                    zIndex: 9999,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "12px",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "12px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    {/* Title */}
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Advanced Search
                                      </div>
                                      <button
                                        onClick={clearAdvancedSearch}
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#273572",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Clear
                                      </button>
                                    </div>

                                    {/* Form */}
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                      }}
                                    >
                                      {/* First Name */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          First Name
                                        </div>
                                        <input
                                          type="text"
                                          value={advancedSearchForm.firstName}
                                          onChange={(e) =>
                                            handleAdvancedSearchChange(
                                              "firstName",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="Enter first name"
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: "#717680",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Last Name */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Last Name
                                        </div>
                                        <input
                                          type="text"
                                          value={advancedSearchForm.lastName}
                                          onChange={(e) =>
                                            handleAdvancedSearchChange(
                                              "lastName",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="Enter last name"
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: "#717680",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Social Security Trace */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Social Security Trace
                                        </div>
                                        <input
                                          type="text"
                                          value={
                                            advancedSearchForm.socialSecurityTrace
                                          }
                                          onChange={(e) =>
                                            handleAdvancedSearchChange(
                                              "socialSecurityTrace",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="000-00-0000"
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: "#717680",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Order Number */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Order Number
                                        </div>
                                        <input
                                          type="text"
                                          value={advancedSearchForm.orderNumber}
                                          onChange={(e) =>
                                            handleAdvancedSearchChange(
                                              "orderNumber",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="Enter order number"
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: "#717680",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                        />
                                      </div>
                                    </div>

                                    {/* Search Button */}
                                    <button
                                      onClick={handleAdvancedSearch}
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 16px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #273572",
                                        background: "#273572",
                                        boxShadow:
                                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#FFF",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Search
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Advanced Search Dropdown */}
                          {console.log('Render state:', showAdvancedSearch) || null}
                          {showAdvancedSearch && (
                            <div
                              ref={advancedSearchRef}
                              style={{
                                position: "absolute",
                                top: "calc(100% + 4px)",
                                right: "234px",
                                width: "320px",
                                zIndex: 9999,
                                borderRadius: "8px",
                                border: "1px solid rgba(10, 13, 18, 0.04)",
                                background: "rgba(255, 255, 255, 1)",
                                boxShadow:
                                  "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  padding: "12px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "12px",
                                  alignSelf: "stretch",
                                }}
                              >
                                {/* Title */}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Advanced Search
                                  </div>
                                  <button
                                    onClick={clearAdvancedSearch}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#273572",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Clear
                                  </button>
                                </div>

                                {/* Form */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  {/* First Name */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      First Name
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.firstName}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "firstName",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="John"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Last Name */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Last Name
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.lastName}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "lastName",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Doe"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Social Security Trace */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Social Security Trace
                                    </div>
                                    <input
                                      type="text"
                                      value={
                                        advancedSearchForm.socialSecurityTrace
                                      }
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "socialSecurityTrace",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="000-00-0000"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Order Number */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Order Number
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.orderNumber}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "orderNumber",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="123456"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* Search Button */}
                                <button
                                  onClick={handleAdvancedSearch}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border:
                                      "2px solid rgba(255, 255, 255, 0.12)",
                                    background: "#344698",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    color: "#FFF",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Desktop: Action Buttons */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              position: "relative",
                            }}
                          >
                            {/* Filters Button */}
                            <button
                              onClick={() => console.log("Filters clicked")}
                              onMouseEnter={() => setHoveredButton("filters")}
                              onMouseLeave={() => setHoveredButton(null)}
                              style={{
                                display: "flex",
                                minHeight: "36px",
                                padding: "6px 8px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background:
                                  hoveredButton === "filters"
                                    ? "#FDFDFD"
                                    : "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.83333 14L3.83333 10M3.83333 10C4.56971 10 5.16667 9.40305 5.16667 8.66667C5.16667 7.93029 4.56971 7.33333 3.83333 7.33333C3.09695 7.33333 2.5 7.93029 2.5 8.66667C2.5 9.40305 3.09695 10 3.83333 10ZM3.83333 4.66667V2M8.5 14V10M8.5 4.66667V2M8.5 4.66667C7.76362 4.66667 7.16667 5.26362 7.16667 6C7.16667 6.73638 7.76362 7.33333 8.5 7.33333C9.23638 7.33333 9.83333 6.73638 9.83333 6C9.83333 5.26362 9.23638 4.66667 8.5 4.66667ZM13.1667 14V11.3333M13.1667 11.3333C13.903 11.3333 14.5 10.7364 14.5 10C14.5 9.26362 13.903 8.66667 13.1667 8.66667C12.4303 8.66667 11.8333 9.26362 11.8333 10C11.8333 10.7364 12.4303 11.3333 13.1667 11.3333ZM13.1667 6V2"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "0 2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    Filters
                                  </span>
                                </div>
                              </div>
                            </button>

                            {/* Customize Button */}
                            <button
                              onClick={() => console.log("Customize clicked")}
                              onMouseEnter={() => setHoveredButton("customize")}
                              onMouseLeave={() => setHoveredButton(null)}
                              style={{
                                display: "flex",
                                minHeight: "36px",
                                padding: "6px 8px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background:
                                  hoveredButton === "customize"
                                    ? "#FDFDFD"
                                    : "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.53333 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H4.53333C5.28007 14 5.65344 14 5.93865 13.8547C6.18954 13.7268 6.39351 13.5229 6.52134 13.272C6.66667 12.9868 6.66667 12.6134 6.66667 11.8667V4.13333C6.66667 3.3866 6.66667 3.01323 6.52134 2.72801C6.39351 2.47713 6.18954 2.27316 5.93865 2.14532C5.65344 2 5.28007 2 4.53333 2Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.8667 2H11.4667C10.7199 2 10.3466 2 10.0613 2.14532C9.81046 2.27316 9.60649 2.47713 9.47866 2.72801C9.33333 3.01323 9.33333 3.3866 9.33333 4.13333V11.8667C9.33333 12.6134 9.33333 12.9868 9.47866 13.272C9.60649 13.5229 9.81046 13.7268 10.0613 13.8547C10.3466 14 10.7199 14 11.4667 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "0 2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    Customize
                                  </span>
                                </div>
                              </div>
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

                            {/* Default Button */}
                            <button
                              onClick={() => console.log("Default clicked")}
                              onMouseEnter={() => setHoveredButton("default")}
                              onMouseLeave={() => setHoveredButton(null)}
                              style={{
                                display: "flex",
                                minHeight: "36px",
                                padding: "6px 8px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background:
                                  hoveredButton === "default"
                                    ? "#FDFDFD"
                                    : "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2 6L14 6M6 2L6 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "0 2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    Default
                                  </span>
                                </div>
                              </div>
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

                            {/* Download Button */}
                            <div style={{ position: "relative" }}>
                              <button
                                onClick={() =>
                                  setShowDownloadDropdown(!showDownloadDropdown)
                                }
                                onMouseEnter={() =>
                                  setHoveredButton("download")
                                }
                                onMouseLeave={() => setHoveredButton(null)}
                                style={{
                                  display: "flex",
                                  minHeight: "36px",
                                  padding: "6px 8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background:
                                    hoveredButton === "download" ||
                                    showDownloadDropdown
                                      ? "#FDFDFD"
                                      : "#FFF",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "0 2px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Download
                                    </span>
                                  </div>
                                </div>
                              </button>
                              {showDownloadDropdown && (
                                <div
                                  ref={downloadDropdownRef}
                                  style={{
                                    position: "absolute",
                                    top: "calc(100% + 4px)",
                                    right: "0",
                                    width: "170px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(10, 13, 18, 0.04)",
                                    background: "rgba(255, 255, 255, 1)",
                                    boxShadow:
                                      "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                    zIndex: 9999,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "4px 0",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "#FDFDFD";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "transparent";
                                      }}
                                      onClick={() => {
                                        console.log("Download XLSX");
                                        setShowDownloadDropdown(false);
                                      }}
                                    >
                                      <div
                                        className="content"
                                        style={{
                                          display: "flex",
                                          padding: "6px 6px",
                                          alignItems: "center",
                                          gap: "12px",
                                          flex: "1 0 0",
                                          borderRadius: "6px",
                                          transition:
                                            "background-color 0.2s ease",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Download XLSX
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "#FDFDFD";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "transparent";
                                      }}
                                      onClick={() => {
                                        console.log("Download CSV");
                                        setShowDownloadDropdown(false);
                                      }}
                                    >
                                      <div
                                        className="content"
                                        style={{
                                          display: "flex",
                                          padding: "6px 6px",
                                          alignItems: "center",
                                          gap: "12px",
                                          flex: "1 0 0",
                                          borderRadius: "6px",
                                          transition:
                                            "background-color 0.2s ease",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Download CSV
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Key Stats Button */}
                            <button
                              onClick={() => setShowInformationDrawer(true)}
                              onMouseEnter={() =>
                                setHoveredButton("information")
                              }
                              onMouseLeave={() => setHoveredButton(null)}
                              style={{
                                display: "flex",
                                minHeight: "36px",
                                padding: "6px 8px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "8px",
                                background:
                                  hoveredButton === "information"
                                    ? "#F5F5F5"
                                    : "transparent",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 9.33333V7M8 4.66667H8.00667M6.6 12.8L7.57333 14.0978C7.71808 14.2908 7.79045 14.3873 7.87918 14.4218C7.95689 14.452 8.04311 14.452 8.12082 14.4218C8.20955 14.3873 8.28192 14.2908 8.42667 14.0978L9.4 12.8C9.59543 12.5394 9.69315 12.4091 9.81234 12.3097C9.97126 12.177 10.1589 12.0832 10.3603 12.0357C10.5114 12 10.6743 12 11 12C11.9319 12 12.3978 12 12.7654 11.8478C13.2554 11.6448 13.6448 11.2554 13.8478 10.7654C14 10.3978 14 9.93188 14 9V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9C2 9.93188 2 10.3978 2.15224 10.7654C2.35523 11.2554 2.74458 11.6448 3.23463 11.8478C3.60218 12 4.06812 12 5 12C5.32572 12 5.48858 12 5.63967 12.0357C5.84113 12.0832 6.02874 12.177 6.18766 12.3097C6.30685 12.4091 6.40457 12.5394 6.6 12.8Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "0 2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#535862",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "rgba(83,88,98,1)",
                                    }}
                                  >
                                    Key Stats
                                  </span>
                                </div>
                              </div>
                            </button>
                          </div>
                        </>
                      ) : isMobile ? (
                        <>
                          {/* Mobile: Title + Dots Action Button Row */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              alignSelf: "stretch",
                              position: "relative",
                            }}
                          >
                            {/* Title */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                gap: "2px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                  position: "relative",
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
                                  Invites
                                </span>
                              </div>
                            </div>

                            {/* Mobile Dots Menu */}
                            <div style={{ position: "relative" }}>
                              <button
                                onClick={() =>
                                  setShowMobileDotsMenu(!showMobileDotsMenu)
                                }
                                style={{
                                  display: "flex",
                                  minHeight: "36px",
                                  padding: "8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: showMobileDotsMenu
                                    ? "#FDFDFD"
                                    : "#FFF",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <ActionDotsIcon />
                              </button>

                              {/* Mobile Dots Menu Dropdown */}
                              {showMobileDotsMenu && (
                                <div
                                  ref={mobileDotsMenuRef}
                                  style={{
                                    position: "absolute",
                                    top: "calc(100% + 4px)",
                                    right: "0",
                                    width: "200px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(10, 13, 18, 0.04)",
                                    background: "rgba(255, 255, 255, 1)",
                                    boxShadow:
                                      "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                    zIndex: 9999,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "4px 0",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    {/* Customize Option */}
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "#F5F5F5";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "transparent";
                                      }}
                                      onClick={() => {
                                        console.log("Customize clicked");
                                        setShowMobileDotsMenu(false);
                                      }}
                                    >
                                      <div
                                        className="content"
                                        style={{
                                          display: "flex",
                                          padding: "8px 12px",
                                          alignItems: "center",
                                          gap: "12px",
                                          flex: "1 0 0",
                                          borderRadius: "6px",
                                          transition:
                                            "background-color 0.2s ease",
                                        }}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M4.53333 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H4.53333C5.28007 14 5.65344 14 5.93865 13.8547C6.18954 13.7268 6.39351 13.5229 6.52134 13.272C6.66667 12.9868 6.66667 12.6134 6.66667 11.8667V4.13333C6.66667 3.3866 6.66667 3.01323 6.52134 2.72801C6.39351 2.47713 6.18954 2.27316 5.93865 2.14532C5.65344 2 5.28007 2 4.53333 2Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M11.8667 2H11.4667C10.7199 2 10.3466 2 10.0613 2.14532C9.81046 2.27316 9.60649 2.47713 9.47866 2.72801C9.33333 3.01323 9.33333 3.3866 9.33333 4.13333V11.8667C9.33333 12.6134 9.33333 12.9868 9.47866 13.272C9.60649 13.5229 9.81046 13.7268 10.0613 13.8547C10.3466 14 10.7199 14 11.4667 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Customize
                                        </span>
                                      </div>
                                    </div>

                                    {/* Default Option */}
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "#F5F5F5";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "transparent";
                                      }}
                                      onClick={() => {
                                        console.log("Default clicked");
                                        setShowMobileDotsMenu(false);
                                      }}
                                    >
                                      <div
                                        className="content"
                                        style={{
                                          display: "flex",
                                          padding: "8px 12px",
                                          alignItems: "center",
                                          gap: "12px",
                                          flex: "1 0 0",
                                          borderRadius: "6px",
                                          transition:
                                            "background-color 0.2s ease",
                                        }}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M2 6L14 6M6 2L6 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Default
                                        </span>
                                      </div>
                                    </div>

                                    {/* Key Stats Option */}
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "#F5F5F5";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "transparent";
                                      }}
                                      onClick={() => {
                                        console.log("Key Stats clicked");
                                        setShowInformationDrawer(true);
                                        setShowMobileDotsMenu(false);
                                      }}
                                    >
                                      <div
                                        className="content"
                                        style={{
                                          display: "flex",
                                          padding: "8px 12px",
                                          alignItems: "center",
                                          gap: "12px",
                                          flex: "1 0 0",
                                          borderRadius: "6px",
                                          transition:
                                            "background-color 0.2s ease",
                                        }}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M8 9.33333V7M8 4.66667H8.00667M6.6 12.8L7.57333 14.0978C7.71808 14.2908 7.79045 14.3873 7.87918 14.4218C7.95689 14.452 8.04311 14.452 8.12082 14.4218C8.20955 14.3873 8.28192 14.2908 8.42667 14.0978L9.4 12.8C9.59543 12.5394 9.69315 12.4091 9.81234 12.3097C9.97126 12.177 10.1589 12.0832 10.3603 12.0357C10.5114 12 10.6743 12 11 12C11.9319 12 12.3978 12 12.7654 11.8478C13.2554 11.6448 13.6448 11.2554 13.8478 10.7654C14 10.3978 14 9.93188 14 9V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9C2 9.93188 2 10.3978 2.15224 10.7654C2.35523 11.2554 2.74458 11.6448 3.23463 11.8478C3.60218 12 4.06812 12 5 12C5.32572 12 5.48858 12 5.63967 12.0357C5.84113 12.0832 6.02874 12.177 6.18766 12.3097C6.30685 12.4091 6.40457 12.5394 6.6 12.8Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(83,88,98,1)",
                                          }}
                                        >
                                          Key Stats
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Mobile: View Toggle + Search Row */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              alignSelf: "stretch",
                              position: "relative",
                              width: "100%",
                              maxWidth: "100%",
                        overflow: "visible",
                        boxSizing: "border-box",
                            }}
                          >
                            {/* View Toggle */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                position: "relative",
                                minWidth: "88px",
                                flexShrink: 0,
                              }}
                            >
                              {/* Table View Button */}
                              <button
                                onClick={() => setTableView("table")}
                                style={{
                                  display: "flex",
                                  minHeight: "40px",
                                  padding: "8px 12px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "6px",
                                  borderRight: "1px solid #D5D7DA",
                                  background:
                                    tableView === "table" ? "#ECEEF9" : "#FFF",
                                  borderTopLeftRadius: "8px",
                                  borderBottomLeftRadius: "8px",
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 9L21 9M9 3L9 21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                                    stroke={
                                      tableView === "table"
                                        ? "#344698"
                                        : "#A4A7AE"
                                    }
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>

                              {/* Rows View Button */}
                              <button
                                onClick={() => setTableView("rows")}
                                style={{
                                  display: "flex",
                                  minHeight: "40px",
                                  padding: "8px 12px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "6px",
                                  background:
                                    tableView === "rows" ? "#ECEEF9" : "#FFF",
                                  borderTopRightRadius: "8px",
                                  borderBottomRightRadius: "8px",
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M17.8 10C18.9201 10 19.4802 10 19.908 9.78201C20.2843 9.59027 20.5903 9.28431 20.782 8.90798C21 8.48016 21 7.92011 21 6.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3L6.2 3C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2L3 6.8C3 7.9201 3 8.48016 3.21799 8.90798C3.40973 9.28431 3.71569 9.59027 4.09202 9.78201C4.51984 10 5.07989 10 6.2 10L17.8 10Z"
                                    stroke={
                                      tableView === "rows"
                                        ? "#344698"
                                        : "#A4A7AE"
                                    }
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M17.8 21C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V17.2C21 16.0799 21 15.5198 20.782 15.092C20.5903 14.7157 20.2843 14.4097 19.908 14.218C19.4802 14 18.9201 14 17.8 14L6.2 14C5.0799 14 4.51984 14 4.09202 14.218C3.71569 14.4097 3.40973 14.7157 3.21799 15.092C3 15.5198 3 16.0799 3 17.2L3 17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8Z"
                                    stroke={
                                      tableView === "rows"
                                        ? "#344698"
                                        : "#A4A7AE"
                                    }
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Search Input */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                                minWidth: 0,
                                height: "40px",
                                borderRadius: "8px",
                                border: isSearchActive
                                  ? "2px solid #34479A"
                                  : "1px solid #D5D7DA",
                                background: "rgba(255, 255, 255, 1)",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                padding: isSearchActive ? "7px" : "8px",
                                position: "relative",
                                boxSizing: "border-box",
                                maxWidth: "100%",
                                overflow: "hidden",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ flexShrink: 0 }}
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
                                placeholder={
                                  isSearchActive
                                    ? ""
                                    : "Search by Name, SSN, State.."
                                }
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => setIsSearchActive(true)}
                                onBlur={() =>
                                  setIsSearchActive(
                                    searchQuery.length > 0 ||
                                      showAdvancedSearch,
                                  )
                                }
                                style={{
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  flex: "1 0 0",
                                  minWidth: 0,
                                  color: isSearchActive ? "#181D27" : "#717680",
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontSize: "14px",
                                  fontWeight: isSearchActive ? 500 : 400,
                                  lineHeight: "20px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              />
                              {isSearchActive && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2px",

                                    flexShrink: 0,
                                  }}
                                >
                                  {/* X Button */}
                                  <button
                                    onMouseDown={(e) => {
                                    e.preventDefault();
                                    clearSearch();
                                  }}

                                    onMouseEnter={() =>
                                      setHoveredSearchButton("clear")
                                    }
                                    onMouseLeave={() =>
                                      setHoveredSearchButton(null)
                                    }
                                    style={{
                                      display: "flex",
                                      width: "24px",
                                      height: "24px",
                                      padding: "4px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "6px",
                                      border: "none",
                                      background:
                                        hoveredSearchButton === "clear"
                                          ? "#F5F5F5"
                                          : "transparent",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.3333 4.66675L4.66666 11.3334M4.66666 4.66675L11.3333 11.3334"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>

                                  {/* Divider */}
                                  <div
                                    style={{
                                      width: "1px",
                                      height: "24px",
                                      background: "#E9EAEB",
                                    }}
                                  />

                                  {/* Configure Search Button */}
                                  <button
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setShowAdvancedSearch(
                                        !showAdvancedSearch,
                                      );
                                    }}
                                  onClick={() => {
                                    console.log('ADVANCED SEARCH ONCLICK!', showAdvancedSearch);
                                    setShowAdvancedSearch(!showAdvancedSearch);
                                  }}
                                  onMouseEnter={() =>
                                    setHoveredSearchButton("advanced")
                                  }
                                  onMouseLeave={() =>
                                    setHoveredSearchButton(null)
                                  }
                                    style={{
                                      display: "flex",
                                      width: "24px",
                                      height: "24px",
                                      padding: "4px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "6px",
                                      border: "none",
                                      background:
                                        showAdvancedSearch ||
                                        hoveredSearchButton === "advanced"
                                          ? "#F5F5F5"
                                          : "transparent",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2 5.33325L10 5.33325M10 5.33325C10 6.43782 10.8954 7.33325 12 7.33325C13.1046 7.33325 14 6.43782 14 5.33325C14 4.22868 13.1046 3.33325 12 3.33325C10.8954 3.33325 10 4.22868 10 5.33325ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56202 2.89543 8.66659 4 8.66659C5.10457 8.66659 6 9.56202 6 10.6666Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Mobile: Advanced Search Dropdown */}
                          {showAdvancedSearch && (
                            <div
                              ref={advancedSearchRef}
                              style={{
                                position: "absolute",
                                top: "calc(100% + 8px)",
                                left: "0",
                                right: "0",
                                zIndex: 9999,
                                borderRadius: "8px",
                                border: "1px solid rgba(10, 13, 18, 0.04)",
                                background: "rgba(255, 255, 255, 1)",
                                boxShadow:
                                  "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                margin: "0 20px",
                                marginTop: "8px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  padding: "12px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "12px",
                                  alignSelf: "stretch",
                                }}
                              >
                                {/* Title */}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Advanced Search
                                  </div>
                                  <button
                                    onClick={clearAdvancedSearch}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#273572",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Clear
                                  </button>
                                </div>

                                {/* Form */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  {/* First Name */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      First Name
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.firstName}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "firstName",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="John"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Last Name */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Last Name
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.lastName}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "lastName",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Doe"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Social Security Trace */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Social Security Trace
                                    </div>
                                    <input
                                      type="text"
                                      value={
                                        advancedSearchForm.socialSecurityTrace
                                      }
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "socialSecurityTrace",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="000-00-0000"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Order Number */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Order Number
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.orderNumber}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "orderNumber",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="123456"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* Search Button */}
                                <button
                                  onClick={handleAdvancedSearch}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border:
                                      "2px solid rgba(255, 255, 255, 0.12)",
                                    background: "#344698",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    color: "#FFF",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Mobile: Filters + Download Buttons Row */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              position: "relative",
                            }}
                          >
                            {/* Filters Button */}
                            <button
                              onClick={() => console.log("Filters clicked")}
                              onMouseEnter={() => setHoveredButton("filters")}
                              onMouseLeave={() => setHoveredButton(null)}
                              style={{
                                display: "flex",
                                minHeight: "36px",
                                padding: "6px 8px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background:
                                  hoveredButton === "filters"
                                    ? "#FDFDFD"
                                    : "#FFF",
                                flex: "1 0 0",
                                minWidth: "0",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.83333 14L3.83333 10M3.83333 10C4.56971 10 5.16667 9.40305 5.16667 8.66667C5.16667 7.93029 4.56971 7.33333 3.83333 7.33333C3.09695 7.33333 2.5 7.93029 2.5 8.66667C2.5 9.40305 3.09695 10 3.83333 10ZM3.83333 4.66667V2M8.5 14V10M8.5 4.66667V2M8.5 4.66667C7.76362 4.66667 7.16667 5.26362 7.16667 6C7.16667 6.73638 7.76362 7.33333 8.5 7.33333C9.23638 7.33333 9.83333 6.73638 9.83333 6C9.83333 5.26362 9.23638 4.66667 8.5 4.66667ZM13.1667 14V11.3333M13.1667 11.3333C13.903 11.3333 14.5 10.7364 14.5 10C14.5 9.26362 13.903 8.66667 13.1667 8.66667C12.4303 8.66667 11.8333 9.26362 11.8333 10C11.8333 10.7364 12.4303 11.3333 13.1667 11.3333ZM13.1667 6V2"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "0 2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    Filters
                                  </span>
                                </div>
                              </div>
                            </button>

                            {/* Download Button */}
                            <div
                              style={{
                                position: "relative",
                                flex: "1 0 0",
                              }}
                            >
                              <button
                                onClick={() =>
                                  setShowDownloadDropdown(!showDownloadDropdown)
                                }
                                onMouseEnter={() =>
                                  setHoveredButton("download")
                                }
                                onMouseLeave={() => setHoveredButton(null)}
                                style={{
                                  display: "flex",
                                  minHeight: "36px",
                                  padding: "6px 8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background:
                                    hoveredButton === "download" ||
                                    showDownloadDropdown
                                      ? "#FDFDFD"
                                      : "#FFF",
                                  width: "100%",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "0 2px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Download
                                    </span>
                                  </div>
                                </div>
                              </button>
                              {showDownloadDropdown && (
                                <div
                                  ref={downloadDropdownRef}
                                  style={{
                                    position: "absolute",
                                    top: "calc(100% + 4px)",
                                    right: "0",
                                    width: "170px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(10, 13, 18, 0.04)",
                                    background: "rgba(255, 255, 255, 1)",
                                    boxShadow:
                                      "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                    zIndex: 9999,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "4px 0",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "#FDFDFD";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "transparent";
                                      }}
                                      onClick={() => {
                                        console.log("Download XLSX");
                                        setShowDownloadDropdown(false);
                                      }}
                                    >
                                      <div
                                        className="content"
                                        style={{
                                          display: "flex",
                                          padding: "6px 6px",
                                          alignItems: "center",
                                          gap: "12px",
                                          flex: "1 0 0",
                                          borderRadius: "6px",
                                          transition:
                                            "background-color 0.2s ease",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Download XLSX
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "#FDFDFD";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector(
                                          ".content",
                                        ).style.backgroundColor = "transparent";
                                      }}
                                      onClick={() => {
                                        console.log("Download CSV");
                                        setShowDownloadDropdown(false);
                                      }}
                                    >
                                      <div
                                        className="content"
                                        style={{
                                          display: "flex",
                                          padding: "6px 6px",
                                          alignItems: "center",
                                          gap: "12px",
                                          flex: "1 0 0",
                                          borderRadius: "6px",
                                          transition:
                                            "background-color 0.2s ease",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Download CSV
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Tablet: Title + Right-aligned Toggle + Search Row */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              alignSelf: "stretch",
                              position: "relative",
                            }}
                          >
                            {/* Title */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                gap: "2px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                  position: "relative",
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
                                  Invites
                                </span>
                              </div>
                            </div>

                            {/* Right-aligned: View Toggle + Search */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                position: "relative",
                              }}
                            >
                              {/* View Toggle */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  position: "relative",
                                  minWidth: "88px",
                                  flexShrink: 0,
                                }}
                              >
                                {/* Table View Button */}
                                <button
                                  onClick={() => setTableView("table")}
                                  style={{
                                    display: "flex",
                                    minHeight: "40px",
                                    padding: "8px 12px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "6px",
                                    borderRight: "1px solid #D5D7DA",
                                    background:
                                      tableView === "table"
                                        ? "#ECEEF9"
                                        : "#FFF",
                                    borderTopLeftRadius: "8px",
                                    borderBottomLeftRadius: "8px",
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3 9L21 9M9 3L9 21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                                      stroke={
                                        tableView === "table"
                                          ? "#344698"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>

                                {/* Rows View Button */}
                                <button
                                  onClick={() => setTableView("rows")}
                                  style={{
                                    display: "flex",
                                    minHeight: "40px",
                                    padding: "8px 12px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "6px",
                                    background:
                                      tableView === "rows" ? "#ECEEF9" : "#FFF",
                                    borderTopRightRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M17.8 10C18.9201 10 19.4802 10 19.908 9.78201C20.2843 9.59027 20.5903 9.28431 20.782 8.90798C21 8.48016 21 7.92011 21 6.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3L6.2 3C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2L3 6.8C3 7.9201 3 8.48016 3.21799 8.90798C3.40973 9.28431 3.71569 9.59027 4.09202 9.78201C4.51984 10 5.07989 10 6.2 10L17.8 10Z"
                                      stroke={
                                        tableView === "rows"
                                          ? "#344698"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M17.8 21C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V17.2C21 16.0799 21 15.5198 20.782 15.092C20.5903 14.7157 20.2843 14.4097 19.908 14.218C19.4802 14 18.9201 14 17.8 14L6.2 14C5.0799 14 4.51984 14 4.09202 14.218C3.71569 14.4097 3.40973 14.7157 3.21799 15.092C3 15.5198 3 16.0799 3 17.2L3 17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8Z"
                                      stroke={
                                        tableView === "rows"
                                          ? "#344698"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>

                              {/* Search Input */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                  height: "40px",
                                  borderRadius: "8px",
                                  border: isSearchActive
                                    ? "2px solid #34479A"
                                    : "1px solid #D5D7DA",
                                  background: "rgba(255, 255, 255, 1)",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  padding: isSearchActive ? "7px" : "8px",
                                  position: "relative",
                                  boxSizing: "border-box",
                                }}
                              >
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
                                  placeholder={
                                    isSearchActive
                                      ? ""
                                      : "Search by Name, SSN, State.."
                                  }
                                  value={searchQuery}
                                  onChange={handleSearchChange}
                                  onFocus={() => setIsSearchActive(true)}
                                  onBlur={() =>
                                    setIsSearchActive(
                                      searchQuery.length > 0 ||
                                        showAdvancedSearch,
                                    )
                                  }
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    background:
                                      showAdvancedSearch ||
                                      hoveredSearchButton === "advanced"
                                        ? "#F5F5F5"
                                        : "transparent",
                                    flex: "1 0 0",
                                    color: isSearchActive
                                      ? "#181D27"
                                      : "#717680",
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontWeight: isSearchActive ? 500 : 400,
                                    lineHeight: "20px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                />
                                {isSearchActive && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "2px",

                                    }}
                                  >
                                    {/* X Button */}
                                    <button
                                      onMouseDown={(e) => {
                                    e.preventDefault();
                                    clearSearch();
                                  }}

                                      onMouseEnter={() =>
                                        setHoveredSearchButton("clear")
                                      }
                                      onMouseLeave={() =>
                                        setHoveredSearchButton(null)
                                      }
                                      style={{
                                        display: "flex",
                                        width: "24px",
                                        height: "24px",
                                        padding: "4px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "6px",
                                        border: "none",
                                        background:
                                          hoveredSearchButton === "clear"
                                            ? "#F5F5F5"
                                            : "transparent",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11.3333 4.66675L4.66666 11.3334M4.66666 4.66675L11.3333 11.3334"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {/* Divider */}
                                    <div
                                      style={{
                                        width: "1px",
                                        height: "24px",
                                        background: "#E9EAEB",
                                      }}
                                    />

                                    {/* Configure Search Button */}
                                    <button
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        setShowAdvancedSearch(
                                          !showAdvancedSearch,
                                        );
                                      }}
                                  onClick={() => {
                                    console.log('ADVANCED SEARCH ONCLICK!', showAdvancedSearch);
                                    setShowAdvancedSearch(!showAdvancedSearch);
                                  }}
                                  onMouseEnter={() =>
                                    setHoveredSearchButton("advanced")
                                  }
                                  onMouseLeave={() =>
                                    setHoveredSearchButton(null)
                                  }
                                      style={{
                                        display: "flex",
                                        width: "24px",
                                        height: "24px",
                                        padding: "4px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "6px",
                                        border: "none",
                                        background:
                                          showAdvancedSearch ||
                                          hoveredSearchButton === "advanced"
                                            ? "#F5F5F5"
                                            : "transparent",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M2 5.33325L10 5.33325M10 5.33325C10 6.43782 10.8954 7.33325 12 7.33325C13.1046 7.33325 14 6.43782 14 5.33325C14 4.22868 13.1046 3.33325 12 3.33325C10.8954 3.33325 10 4.22868 10 5.33325ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56202 2.89543 8.66659 4 8.66659C5.10457 8.66659 6 9.56202 6 10.6666Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Tablet: Advanced Search Dropdown */}
                          {showAdvancedSearch && (
                            <div
                              ref={advancedSearchRef}
                              style={{
                                position: "absolute",
                                top: "calc(100% + 8px)",
                                right: "0",
                                width: "234px",
                                zIndex: 9999,
                                borderRadius: "8px",
                                border: "1px solid rgba(10, 13, 18, 0.04)",
                                background: "rgba(255, 255, 255, 1)",
                                boxShadow:
                                  "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  padding: "12px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "12px",
                                  alignSelf: "stretch",
                                }}
                              >
                                {/* Title */}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Advanced Search
                                  </div>
                                  <button
                                    onClick={clearAdvancedSearch}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#273572",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Clear
                                  </button>
                                </div>

                                {/* Form */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  {/* First Name */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      First Name
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.firstName}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "firstName",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="John"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Last Name */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Last Name
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.lastName}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "lastName",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Doe"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Social Security Trace */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Social Security Trace
                                    </div>
                                    <input
                                      type="text"
                                      value={
                                        advancedSearchForm.socialSecurityTrace
                                      }
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "socialSecurityTrace",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="000-00-0000"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>

                                  {/* Order Number */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Order Number
                                    </div>
                                    <input
                                      type="text"
                                      value={advancedSearchForm.orderNumber}
                                      onChange={(e) =>
                                        handleAdvancedSearchChange(
                                          "orderNumber",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="123456"
                                      style={{
                                        display: "flex",
                                        height: "32px",
                                        padding: "6px 8px",
                                        alignItems: "center",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        color: "#717680",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* Search Button */}
                                <button
                                  onClick={handleAdvancedSearch}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border:
                                      "2px solid rgba(255, 255, 255, 0.12)",
                                    background: "#344698",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    color: "#FFF",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Tablet: Action Buttons Row */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              position: "relative",
                              flexWrap: "wrap",
                              justifyContent: "flex-start",
                              width: "100%",
                              maxWidth: "100%",
                              overflow: "visible",
                              boxSizing: "border-box",
                            }}
                          >
                            {/* Mobile: Show only primary buttons + dots menu */}
                            {isMobile ? (
                              <>
                                {/* Filters Button */}
                                <button
                                  onClick={() => console.log("Filters clicked")}
                                  onMouseEnter={() =>
                                    setHoveredButton("filters")
                                  }
                                  onMouseLeave={() => setHoveredButton(null)}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background:
                                      hoveredButton === "filters"
                                        ? "#FDFDFD"
                                        : "#FFF",
                                    flex: "1 0 0",
                                    minWidth: "0",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.83333 14L3.83333 10M3.83333 10C4.56971 10 5.16667 9.40305 5.16667 8.66667C5.16667 7.93029 4.56971 7.33333 3.83333 7.33333C3.09695 7.33333 2.5 7.93029 2.5 8.66667C2.5 9.40305 3.09695 10 3.83333 10ZM3.83333 4.66667V2M8.5 14V10M8.5 4.66667V2M8.5 4.66667C7.76362 4.66667 7.16667 5.26362 7.16667 6C7.16667 6.73638 7.76362 7.33333 8.5 7.33333C9.23638 7.33333 9.83333 6.73638 9.83333 6C9.83333 5.26362 9.23638 4.66667 8.5 4.66667ZM13.1667 14V11.3333M13.1667 11.3333C13.903 11.3333 14.5 10.7364 14.5 10C14.5 9.26362 13.903 8.66667 13.1667 8.66667C12.4303 8.66667 11.8333 9.26362 11.8333 10C11.8333 10.7364 12.4303 11.3333 13.1667 11.3333ZM13.1667 6V2"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "0 2px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 600,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Filters
                                      </span>
                                    </div>
                                  </div>
                                </button>

                                {/* Download Button */}
                                <div
                                  style={{
                                    position: "relative",
                                    flex: "1 0 0",
                                  }}
                                >
                                  <button
                                    onClick={() =>
                                      setShowDownloadDropdown(
                                        !showDownloadDropdown,
                                      )
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("download")
                                    }
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style={{
                                      display: "flex",
                                      minHeight: "36px",
                                      padding: "6px 8px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "4px",
                                      borderRadius: "8px",
                                      border: "1px solid #D5D7DA",
                                      background:
                                        hoveredButton === "download" ||
                                        showDownloadDropdown
                                          ? "#FDFDFD"
                                          : "#FFF",
                                      width: "100%",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Download
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                  {showDownloadDropdown && (
                                    <div
                                      ref={downloadDropdownRef}
                                      style={{
                                        position: "absolute",
                                        top: "calc(100% + 4px)",
                                        right: "0",
                                        width: "170px",
                                        borderRadius: "8px",
                                        border:
                                          "1px solid rgba(10, 13, 18, 0.04)",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                        zIndex: 9999,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "4px 0",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "1px 4px",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor = "#FDFDFD";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor =
                                              "transparent";
                                          }}
                                          onClick={() => {
                                            console.log("Download XLSX");
                                            setShowDownloadDropdown(false);
                                          }}
                                        >
                                          <div
                                            className="content"
                                            style={{
                                              display: "flex",
                                              padding: "6px 6px",
                                              alignItems: "center",
                                              gap: "12px",
                                              flex: "1 0 0",
                                              borderRadius: "6px",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Download XLSX
                                            </span>
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "1px 4px",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor = "#FDFDFD";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor =
                                              "transparent";
                                          }}
                                          onClick={() => {
                                            console.log("Download CSV");
                                            setShowDownloadDropdown(false);
                                          }}
                                        >
                                          <div
                                            className="content"
                                            style={{
                                              display: "flex",
                                              padding: "6px 6px",
                                              alignItems: "center",
                                              gap: "12px",
                                              flex: "1 0 0",
                                              borderRadius: "6px",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Download CSV
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Mobile Dots Menu */}
                                <div style={{ position: "relative" }}>
                                  <button
                                    onClick={() =>
                                      setShowMobileDotsMenu(!showMobileDotsMenu)
                                    }
                                    style={{
                                      display: "flex",
                                      minHeight: "36px",
                                      padding: "8px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "8px",
                                      border: "1px solid #D5D7DA",
                                      background: showMobileDotsMenu
                                        ? "#FDFDFD"
                                        : "#FFF",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <ActionDotsIcon />
                                  </button>

                                  {/* Mobile Dots Menu Dropdown */}
                                  {showMobileDotsMenu && (
                                    <div
                                      ref={mobileDotsMenuRef}
                                      style={{
                                        position: "absolute",
                                        top: "calc(100% + 4px)",
                                        right: "0",
                                        width: "200px",
                                        borderRadius: "8px",
                                        border:
                                          "1px solid rgba(10, 13, 18, 0.04)",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                        zIndex: 9999,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "4px 0",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        {/* Customize Option */}
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "1px 4px",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor = "#F5F5F5";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor =
                                              "transparent";
                                          }}
                                          onClick={() => {
                                            console.log("Customize clicked");
                                            setShowMobileDotsMenu(false);
                                          }}
                                        >
                                          <div
                                            className="content"
                                            style={{
                                              display: "flex",
                                              padding: "8px 12px",
                                              alignItems: "center",
                                              gap: "12px",
                                              flex: "1 0 0",
                                              borderRadius: "6px",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M4.53333 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H4.53333C5.28007 14 5.65344 14 5.93865 13.8547C6.18954 13.7268 6.39351 13.5229 6.52134 13.272C6.66667 12.9868 6.66667 12.6134 6.66667 11.8667V4.13333C6.66667 3.3866 6.66667 3.01323 6.52134 2.72801C6.39351 2.47713 6.18954 2.27316 5.93865 2.14532C5.65344 2 5.28007 2 4.53333 2Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                d="M11.8667 2H11.4667C10.7199 2 10.3466 2 10.0613 2.14532C9.81046 2.27316 9.60649 2.47713 9.47866 2.72801C9.33333 3.01323 9.33333 3.3866 9.33333 4.13333V11.8667C9.33333 12.6134 9.33333 12.9868 9.47866 13.272C9.60649 13.5229 9.81046 13.7268 10.0613 13.8547C10.3466 14 10.7199 14 11.4667 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Customize
                                            </span>
                                          </div>
                                        </div>

                                        {/* Default Option */}
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "1px 4px",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor = "#F5F5F5";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor =
                                              "transparent";
                                          }}
                                          onClick={() => {
                                            console.log("Default clicked");
                                            setShowMobileDotsMenu(false);
                                          }}
                                        >
                                          <div
                                            className="content"
                                            style={{
                                              display: "flex",
                                              padding: "8px 12px",
                                              alignItems: "center",
                                              gap: "12px",
                                              flex: "1 0 0",
                                              borderRadius: "6px",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M2 6L14 6M6 2L6 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Default
                                            </span>
                                          </div>
                                        </div>

                                        {/* Key Stats Option */}
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "1px 4px",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor = "#F5F5F5";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor =
                                              "transparent";
                                          }}
                                          onClick={() => {
                                            console.log("Key Stats clicked");
                                            setShowInformationDrawer(true);
                                            setShowMobileDotsMenu(false);
                                          }}
                                        >
                                          <div
                                            className="content"
                                            style={{
                                              display: "flex",
                                              padding: "8px 12px",
                                              alignItems: "center",
                                              gap: "12px",
                                              flex: "1 0 0",
                                              borderRadius: "6px",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M8 9.33333V7M8 4.66667H8.00667M6.6 12.8L7.57333 14.0978C7.71808 14.2908 7.79045 14.3873 7.87918 14.4218C7.95689 14.452 8.04311 14.452 8.12082 14.4218C8.20955 14.3873 8.28192 14.2908 8.42667 14.0978L9.4 12.8C9.59543 12.5394 9.69315 12.4091 9.81234 12.3097C9.97126 12.177 10.1589 12.0832 10.3603 12.0357C10.5114 12 10.6743 12 11 12C11.9319 12 12.3978 12 12.7654 11.8478C13.2554 11.6448 13.6448 11.2554 13.8478 10.7654C14 10.3978 14 9.93188 14 9V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9C2 9.93188 2 10.3978 2.15224 10.7654C2.35523 11.2554 2.74458 11.6448 3.23463 11.8478C3.60218 12 4.06812 12 5 12C5.32572 12 5.48858 12 5.63967 12.0357C5.84113 12.0832 6.02874 12.177 6.18766 12.3097C6.30685 12.4091 6.40457 12.5394 6.6 12.8Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                color: "rgba(83,88,98,1)",
                                              }}
                                            >
                                              Key Stats
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              /* Tablet: Show all buttons as before */
                              <>
                                {/* Filters Button */}
                                <button
                                  onClick={() => console.log("Filters clicked")}
                                  onMouseEnter={() =>
                                    setHoveredButton("filters")
                                  }
                                  onMouseLeave={() => setHoveredButton(null)}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background:
                                      hoveredButton === "filters"
                                        ? "#FDFDFD"
                                        : "#FFF",
                                    flex: "1 0 0",
                                    minWidth: "90px",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.83333 14L3.83333 10M3.83333 10C4.56971 10 5.16667 9.40305 5.16667 8.66667C5.16667 7.93029 4.56971 7.33333 3.83333 7.33333C3.09695 7.33333 2.5 7.93029 2.5 8.66667C2.5 9.40305 3.09695 10 3.83333 10ZM3.83333 4.66667V2M8.5 14V10M8.5 4.66667V2M8.5 4.66667C7.76362 4.66667 7.16667 5.26362 7.16667 6C7.16667 6.73638 7.76362 7.33333 8.5 7.33333C9.23638 7.33333 9.83333 6.73638 9.83333 6C9.83333 5.26362 9.23638 4.66667 8.5 4.66667ZM13.1667 14V11.3333M13.1667 11.3333C13.903 11.3333 14.5 10.7364 14.5 10C14.5 9.26362 13.903 8.66667 13.1667 8.66667C12.4303 8.66667 11.8333 9.26362 11.8333 10C11.8333 10.7364 12.4303 11.3333 13.1667 11.3333ZM13.1667 6V2"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "0 2px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 600,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Filters
                                      </span>
                                    </div>
                                  </div>
                                </button>

                                {/* Customize Button */}
                                <button
                                  onClick={() =>
                                    console.log("Customize clicked")
                                  }
                                  onMouseEnter={() =>
                                    setHoveredButton("customize")
                                  }
                                  onMouseLeave={() => setHoveredButton(null)}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background:
                                      hoveredButton === "customize"
                                        ? "#FDFDFD"
                                        : "#FFF",
                                    flex: "1 0 0",
                                    minWidth: "120px",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4.53333 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H4.53333C5.28007 14 5.65344 14 5.93865 13.8547C6.18954 13.7268 6.39351 13.5229 6.52134 13.272C6.66667 12.9868 6.66667 12.6134 6.66667 11.8667V4.13333C6.66667 3.3866 6.66667 3.01323 6.52134 2.72801C6.39351 2.47713 6.18954 2.27316 5.93865 2.14532C5.65344 2 5.28007 2 4.53333 2Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M11.8667 2H11.4667C10.7199 2 10.3466 2 10.0613 2.14532C9.81046 2.27316 9.60649 2.47713 9.47866 2.72801C9.33333 3.01323 9.33333 3.3866 9.33333 4.13333V11.8667C9.33333 12.6134 9.33333 12.9868 9.47866 13.272C9.60649 13.5229 9.81046 13.7268 10.0613 13.8547C10.3466 14 10.7199 14 11.4667 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "0 2px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 600,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Customize
                                      </span>
                                    </div>
                                  </div>
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

                                {/* Default Button */}
                                <button
                                  onClick={() => console.log("Default clicked")}
                                  onMouseEnter={() =>
                                    setHoveredButton("default")
                                  }
                                  onMouseLeave={() => setHoveredButton(null)}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background:
                                      hoveredButton === "default"
                                        ? "#FDFDFD"
                                        : "#FFF",
                                    flex: "1 0 0",
                                    minWidth: "100px",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2 6L14 6M6 2L6 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "0 2px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 600,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Default
                                      </span>
                                    </div>
                                  </div>
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

                                {/* Download Button */}
                                <div style={{ position: "relative" }}>
                                  <button
                                    onClick={() =>
                                      setShowDownloadDropdown(
                                        !showDownloadDropdown,
                                      )
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("download")
                                    }
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style={{
                                      display: "flex",
                                      minHeight: "36px",
                                      padding: "6px 8px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "4px",
                                      borderRadius: "8px",
                                      border: "1px solid #D5D7DA",
                                      background:
                                        hoveredButton === "download" ||
                                        showDownloadDropdown
                                          ? "#FDFDFD"
                                          : "#FFF",
                                      flex: "1 0 0",
                                      minWidth: "120px",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Download
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                  {showDownloadDropdown && (
                                    <div
                                      ref={downloadDropdownRef}
                                      style={{
                                        position: "absolute",
                                        top: "calc(100% + 4px)",
                                        right: "0",
                                        width: "170px",
                                        borderRadius: "8px",
                                        border:
                                          "1px solid rgba(10, 13, 18, 0.04)",
                                        background: "rgba(255, 255, 255, 1)",
                                        boxShadow:
                                          "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                        zIndex: 9999,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "4px 0",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "1px 4px",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor = "#FDFDFD";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor =
                                              "transparent";
                                          }}
                                          onClick={() => {
                                            console.log("Download XLSX");
                                            setShowDownloadDropdown(false);
                                          }}
                                        >
                                          <div
                                            className="content"
                                            style={{
                                              display: "flex",
                                              padding: "6px 6px",
                                              alignItems: "center",
                                              gap: "12px",
                                              flex: "1 0 0",
                                              borderRadius: "6px",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Download XLSX
                                            </span>
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "1px 4px",
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor = "#FDFDFD";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ).style.backgroundColor =
                                              "transparent";
                                          }}
                                          onClick={() => {
                                            console.log("Download CSV");
                                            setShowDownloadDropdown(false);
                                          }}
                                        >
                                          <div
                                            className="content"
                                            style={{
                                              display: "flex",
                                              padding: "6px 6px",
                                              alignItems: "center",
                                              gap: "12px",
                                              flex: "1 0 0",
                                              borderRadius: "6px",
                                              transition:
                                                "background-color 0.2s ease",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily:
                                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Download CSV
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Key Stats Button */}
                                <button
                                  onClick={() => setShowInformationDrawer(true)}
                                  onMouseEnter={() =>
                                    setHoveredButton("information")
                                  }
                                  onMouseLeave={() => setHoveredButton(null)}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    background:
                                      hoveredButton === "information"
                                        ? "#F5F5F5"
                                        : "transparent",
                                    cursor: "pointer",
                                    flex: "0 0 auto",
                                    minWidth: "100px",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8 9.33333V7M8 4.66667H8.00667M6.6 12.8L7.57333 14.0978C7.71808 14.2908 7.79045 14.3873 7.87918 14.4218C7.95689 14.452 8.04311 14.452 8.12082 14.4218C8.20955 14.3873 8.28192 14.2908 8.42667 14.0978L9.4 12.8C9.59543 12.5394 9.69315 12.4091 9.81234 12.3097C9.97126 12.177 10.1589 12.0832 10.3603 12.0357C10.5114 12 10.6743 12 11 12C11.9319 12 12.3978 12 12.7654 11.8478C13.2554 11.6448 13.6448 11.2554 13.8478 10.7654C14 10.3978 14 9.93188 14 9V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9C2 9.93188 2 10.3978 2.15224 10.7654C2.35523 11.2554 2.74458 11.6448 3.23463 11.8478C3.60218 12 4.06812 12 5 12C5.32572 12 5.48858 12 5.63967 12.0357C5.84113 12.0832 6.02874 12.177 6.18766 12.3097C6.30685 12.4091 6.40457 12.5394 6.6 12.8Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "0 2px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#535862",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 600,
                                          fontSize: "14px",
                                          color: "rgba(83,88,98,1)",
                                        }}
                                      >
                                        Key Stats
                                      </span>
                                    </div>
                                  </div>
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Internal Divider */}
                  <div
                    style={{
                      height: "1px",
                      alignSelf: "stretch",
                      background: "#E9EAEB",
                      margin: "12px 0 0 0",
                    }}
                  />

                  {/* Table Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "0",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      position: "relative",
                      borderRadius: "0px 0px 12px 12px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Table Container with Horizontal Scroll */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        position: "relative",
                        width: "100%",
                        maxWidth: "100%",
                        overflowX: "auto",
                        overflowY: "hidden",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#D5D7DA #F9FAFB",
                        WebkitOverflowScrolling: "touch",
                        padding: "12px 16px 0 16px",
                      }}
                    >
                      {/* Table Content */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          position: "relative",
                          minWidth: isMobile
                            ? "1140px"
                            : isTablet
                              ? "1130px"
                              : isLargeDesktop
                                ? "1220px"
                                : "1100px",
                          width: "100%",
                          height: "556px", // Fixed height for header (36px) + 10 rows (10 × 52px)
                          overflow: "visible",
                        }}
                      >
                        {/* Table Header */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          {/* Checkbox Column */}
                          <div
                            style={{
                              display: "flex",
                              width: isMobile
                                ? "60px"
                                : isTablet
                                  ? "50px"
                                  : "40px",
                              height: "36px",
                              padding: "6px 12px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <Checkbox
                              checked={
                                selectedItems.length === invitesData.length
                              }
                              onCheckedChange={handleSelectAll}
                              className="h-4 w-4 rounded border border-[#D5D7DA] data-[state=checked]:bg-[#344698] data-[state=checked]:border-[#344698] data-[state=checked]:text-white"
                            />
                          </div>

                          {/* Status Column */}
                          <div
                            style={{
                              display: "flex",
                              width: "118px",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color:
                                    sortField === "status"
                                      ? "#34479A"
                                      : "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    color:
                                      sortField === "status"
                                        ? "#34479A"
                                        : "rgba(113,118,128,1)",
                                  }}
                                >
                                  Status
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "status" &&
                                      sortDirection === "asc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("status");
                                      setSortDirection("asc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "status" &&
                                        sortDirection === "asc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "status" &&
                                      sortDirection === "desc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("status");
                                      setSortDirection("desc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: "rotate(180deg)" }}
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "status" &&
                                        sortDirection === "desc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* First Name Column */}
                          <div
                            style={{
                              display: "flex",
                              ...(isLargeDesktop
                                ? { flex: "0 1 130px", minWidth: "108px" }
                                : { width: "108px" }),
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color:
                                    sortField === "firstName"
                                      ? "#34479A"
                                      : "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    color:
                                      sortField === "firstName"
                                        ? "#34479A"
                                        : "rgba(113,118,128,1)",
                                  }}
                                >
                                  First Name
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "firstName" &&
                                      sortDirection === "asc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("firstName");
                                      setSortDirection("asc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "firstName" &&
                                        sortDirection === "asc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "firstName" &&
                                      sortDirection === "desc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("firstName");
                                      setSortDirection("desc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: "rotate(180deg)" }}
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "firstName" &&
                                        sortDirection === "desc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Last Name Column */}
                          <div
                            style={{
                              display: "flex",
                              ...(isLargeDesktop
                                ? { flex: "0 1 130px", minWidth: "108px" }
                                : { width: "108px" }),
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color:
                                    sortField === "lastName"
                                      ? "#34479A"
                                      : "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    color:
                                      sortField === "lastName"
                                        ? "#34479A"
                                        : "rgba(113,118,128,1)",
                                  }}
                                >
                                  Last Name
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "lastName" &&
                                      sortDirection === "asc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("lastName");
                                      setSortDirection("asc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "lastName" &&
                                        sortDirection === "asc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "lastName" &&
                                      sortDirection === "desc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("lastName");
                                      setSortDirection("desc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: "rotate(180deg)" }}
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "lastName" &&
                                        sortDirection === "desc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Invitation Email Column */}
                          <div
                            style={{
                              display: "flex",
                              ...(isLargeDesktop
                                ? { flex: "1 1 120px", minWidth: "120px" }
                                : { width: "120px" }),
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color:
                                    sortField === "email"
                                      ? "#34479A"
                                      : "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    color:
                                      sortField === "email"
                                        ? "#34479A"
                                        : "rgba(113,118,128,1)",
                                  }}
                                >
                                  Invitation Email
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "email" &&
                                      sortDirection === "asc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("email");
                                      setSortDirection("asc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "email" &&
                                        sortDirection === "asc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "email" &&
                                      sortDirection === "desc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("email");
                                      setSortDirection("desc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: "rotate(180deg)" }}
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "email" &&
                                        sortDirection === "desc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Completed Column */}
                          <div
                            style={{
                              display: "flex",
                              width: "113px",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                flex: "1 0 0",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color:
                                    sortField === "completion"
                                      ? "#34479A"
                                      : "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    color:
                                      sortField === "completion"
                                        ? "#34479A"
                                        : "rgba(113,118,128,1)",
                                  }}
                                >
                                  Completed
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "completion" &&
                                      sortDirection === "asc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("completion");
                                      setSortDirection("asc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "completion" &&
                                        sortDirection === "asc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "completion" &&
                                      sortDirection === "desc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("completion");
                                      setSortDirection("desc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: "rotate(180deg)" }}
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "completion" &&
                                        sortDirection === "desc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Last Email Column */}
                          <div
                            style={{
                              display: "flex",
                              width: "105px",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color:
                                    sortField === "lastEmail"
                                      ? "#34479A"
                                      : "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    color:
                                      sortField === "lastEmail"
                                        ? "#34479A"
                                        : "rgba(113,118,128,1)",
                                  }}
                                >
                                  Last Email
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "lastEmail" &&
                                      sortDirection === "asc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("lastEmail");
                                      setSortDirection("asc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "lastEmail" &&
                                        sortDirection === "asc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      sortField === "lastEmail" &&
                                      sortDirection === "desc"
                                    ) {
                                      setSortField(null);
                                      setSortDirection(null);
                                    } else {
                                      setSortField("lastEmail");
                                      setSortDirection("desc");
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: "rotate(180deg)" }}
                                  >
                                    <path
                                      d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                                      stroke={
                                        sortField === "lastEmail" &&
                                        sortDirection === "desc"
                                          ? "#34479A"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* I-9 Filled Column */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              width: "90px",
                              alignSelf: "stretch",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                borderBottom: "1px solid #E9EAEB",
                                background: "rgba(255, 255, 255, 1)",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color:
                                      sortField === "i9Filled"
                                        ? "#34479A"
                                        : "#717680",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "18px",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                      color:
                                        sortField === "i9Filled"
                                          ? "#34479A"
                                          : "rgba(113,118,128,1)",
                                    }}
                                  >
                                    I-9 Filled
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Activate Column */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              width: "90px",
                              alignSelf: "stretch",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                borderBottom: "1px solid #E9EAEB",
                                background: "rgba(255, 255, 255, 1)",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color:
                                      sortField === "activated"
                                        ? "#34479A"
                                        : "#717680",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "18px",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                      color:
                                        sortField === "activated"
                                          ? "#34479A"
                                          : "rgba(113,118,128,1)",
                                    }}
                                  >
                                    Activate
                                  </span>
                                </div>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleSort("activated")}
                                >
                                  <path
                                    d="M4.66663 10L7.99996 13.3334L11.3333 10M4.66663 6.00002L7.99996 2.66669L11.3333 6.00002"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* EWS Column */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              width: "90px",
                              alignSelf: "stretch",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                borderBottom: "1px solid #E9EAEB",
                                background: "rgba(255, 255, 255, 1)",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color:
                                      sortField === "ews"
                                        ? "#34479A"
                                        : "#717680",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "18px",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                      color:
                                        sortField === "ews"
                                          ? "#34479A"
                                          : "rgba(113,118,128,1)",
                                    }}
                                  >
                                    EWS
                                  </span>
                                </div>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleSort("ews")}
                                >
                                  <path
                                    d="M4.66663 10L7.99996 13.3334L11.3333 10M4.66663 6.00002L7.99996 2.66669L11.3333 6.00002"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Actions Column */}
                          <div
                            style={{
                              display: "flex",
                              width: "60px",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          />
                        </div>

                        {/* Table Rows */}
                        {paginatedData.map((invite) => (
                          <div
                            key={invite.id}
                            onMouseEnter={() => setHoveredRowId(invite.id)}
                            onMouseLeave={() => setHoveredRowId(null)}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              alignSelf: "stretch",
                              position: "relative",
                              background:
                                hoveredRowId === invite.id
                                  ? "#F5F5F5"
                                  : "transparent",
                              transition: "background-color 0.15s ease",
                              cursor: "pointer",
                            }}
                          >
                            {/* Checkbox Cell */}
                            <div
                              style={{
                                display: "flex",
                                width: isMobile
                                  ? "60px"
                                  : isTablet
                                    ? "50px"
                                    : "40px",
                                height: "52px",
                                padding: "12px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "12px",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                              }}
                            >
                              <Checkbox
                                checked={selectedItems.includes(invite.id)}
                                onCheckedChange={handleSelectItem(invite.id)}
                                className="h-4 w-4 rounded border border-[#D5D7DA] data-[state=checked]:bg-[#344698] data-[state=checked]:border-[#344698] data-[state=checked]:text-white"
                              />
                            </div>

                            {/* Status Cell */}
                            <div
                              style={{
                                display: "flex",
                                width: "118px",
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                                minWidth: 0,
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  maxWidth: "100%",
                                  overflow: "hidden",
                                }}
                              >
                                <StatusBadge status={invite.status} />
                              </div>
                            </div>

                            {/* First Name Cell */}
                            <div
                              style={{
                                display: "flex",
                                ...(isLargeDesktop
                                  ? { flex: "0 1 130px", minWidth: "108px" }
                                  : { width: "108px" }),
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                                minWidth: 0,
                              }}
                            >
                              <TruncatedText
                                text={invite.firstName}
                                highlightedText={highlightText(
                                  invite.firstName,
                                  searchQuery,
                                )}
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              />
                            </div>

                            {/* Last Name Cell */}
                            <div
                              style={{
                                display: "flex",
                                ...(isLargeDesktop
                                  ? { flex: "0 1 130px", minWidth: "108px" }
                                  : { width: "108px" }),
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                                minWidth: 0,
                              }}
                            >
                              <TruncatedText
                                text={invite.lastName}
                                highlightedText={highlightText(
                                  invite.lastName,
                                  searchQuery,
                                )}
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              />
                            </div>

                            {/* Email Cell */}
                            <div
                              style={{
                                display: "flex",
                                ...(isLargeDesktop
                                  ? { flex: "1 1 120px", minWidth: "120px" }
                                  : { width: "120px" }),
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                                minWidth: 0,
                              }}
                            >
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 1,
                                  width: "100%",
                                  overflow: "hidden",
                                  color: "#181D27",
                                  textOverflow: "ellipsis",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                                title={invite.email}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    color: "rgba(24,29,39,1)",
                                  }}
                                >
                                  {highlightText(invite.email, searchQuery)}
                                </span>
                              </div>
                            </div>

                            {/* Completion Cell */}
                            <div
                              style={{
                                display: "flex",
                                width: "113px",
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                gap: "12px",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                              }}
                            >
                              <ProgressBar percentage={invite.completion} />
                            </div>

                            {/* Last Email Cell */}
                            <div
                              style={{
                                display: "flex",
                                width: "105px",
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                                minWidth: 0,
                              }}
                            >
                              <TruncatedText
                                text={invite.lastEmail}
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              />
                            </div>

                            {/* I-9 Filled Cell */}
                            <div
                              style={{
                                display: "flex",
                                width: "90px",
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                gap: "4px",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                              }}
                            >
                              {invite.i9Filled && <CheckIcon />}
                            </div>

                            {/* Activate Cell */}
                            <div
                              style={{
                                display: "flex",
                                width: "90px",
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                gap: "4px",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                              }}
                            >
                              {invite.activated && <CheckIcon />}
                            </div>

                            {/* EWS Cell */}
                            <div
                              style={{
                                display: "flex",
                                width: "90px",
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                gap: "4px",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                              }}
                            >
                              {invite.ews && <CheckIcon />}
                            </div>

                            {/* Actions Cell */}
                            <div
                              style={{
                                display: "flex",
                                width: "60px",
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                gap: "12px",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    cursor: "pointer",
                                    padding: "4px",
                                    borderRadius: "4px",
                                    transition: "background-color 0.2s ease",
                                    background:
                                      showActionMenu === invite.id
                                        ? "#FDFDFD"
                                        : "transparent",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowActionMenu(
                                      showActionMenu === invite.id
                                        ? null
                                        : invite.id,
                                    );
                                  }}
                                >
                                  <ActionDotsIcon />
                                </div>

                                {/* Action Menu Dropdown */}
                                {showActionMenu === invite.id && (
                                  <div
                                    ref={actionMenuRef}
                                    style={{
                                      position: "absolute",
                                      top: "100%",
                                      right: "0",
                                      marginTop: "4px",
                                      width: isMobile ? "200px" : "248px",
                                      borderRadius: "8px",
                                      border:
                                        "1px solid rgba(10, 13, 18, 0.04)",
                                      background: "rgba(255, 255, 255, 1)",
                                      boxShadow:
                                        "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                      zIndex: 9999,
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "4px 0",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        alignSelf: "stretch",
                                      }}
                                    >
                                      {/* Invite Summary */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "1px 4px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => {
                                          const content =
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ) as HTMLElement;
                                          if (content)
                                            content.style.backgroundColor =
                                              "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          const content =
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ) as HTMLElement;
                                          if (content)
                                            content.style.backgroundColor =
                                              "transparent";
                                        }}
                                        onClick={() => {
                                          console.log(
                                            "Invite Summary clicked for:",
                                            invite.id,
                                          );
                                          setShowActionMenu(null);
                                        }}
                                      >
                                        <div
                                          className="content"
                                          style={{
                                            display: "flex",
                                            padding: "6px 6px",
                                            alignItems: "center",
                                            gap: "12px",
                                            flex: "1 0 0",
                                            borderRadius: "6px",
                                            transition:
                                              "background-color 0.2s ease",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "8px",
                                              flex: "1 0 0",
                                            }}
                                          >
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M14 11H8M10 15H8M16 7H8M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H11.5M22 22L20.5 20.5M21.5 18C21.5 19.933 19.933 21.5 18 21.5C16.067 21.5 14.5 19.933 14.5 18C14.5 16.067 16.067 14.5 18 14.5C19.933 14.5 21.5 16.067 21.5 18Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <div
                                              style={{
                                                flex: "1 0 0",
                                                color: "#414651",
                                                fontFamily: "Public Sans",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                lineHeight: "20px",
                                              }}
                                            >
                                              Invite Summary
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Manage Invitation */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "1px 4px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => {
                                          const content =
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ) as HTMLElement;
                                          if (content)
                                            content.style.backgroundColor =
                                              "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          const content =
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ) as HTMLElement;
                                          if (content)
                                            content.style.backgroundColor =
                                              "transparent";
                                        }}
                                        onClick={() => {
                                          console.log(
                                            "Manage Invitation clicked for:",
                                            invite.id,
                                          );
                                          setShowActionMenu(null);
                                        }}
                                      >
                                        <div
                                          className="content"
                                          style={{
                                            display: "flex",
                                            padding: "6px 6px",
                                            alignItems: "center",
                                            gap: "12px",
                                            flex: "1 0 0",
                                            borderRadius: "6px",
                                            transition:
                                              "background-color 0.2s ease",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "8px",
                                              flex: "1 0 0",
                                            }}
                                          >
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M2.87604 18.1157C2.92198 17.7022 2.94496 17.4955 3.00751 17.3022C3.06301 17.1308 3.14143 16.9676 3.24064 16.8172C3.35246 16.6476 3.49955 16.5005 3.79373 16.2063L17 3.00006C18.1046 1.89549 19.8955 1.89549 21 3.00006C22.1046 4.10463 22.1046 5.89549 21 7.00006L7.79373 20.2063C7.49955 20.5005 7.35245 20.6476 7.18289 20.7594C7.03245 20.8586 6.86929 20.937 6.69785 20.9925C6.5046 21.0551 6.29786 21.0781 5.88437 21.124L2.5 21.5001L2.87604 18.1157Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <div
                                              style={{
                                                flex: "1 0 0",
                                                color: "#414651",
                                                fontFamily: "Public Sans",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                lineHeight: "20px",
                                              }}
                                            >
                                              Manage Invitation
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* HTML */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "1px 4px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => {
                                          const content =
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ) as HTMLElement;
                                          if (content)
                                            content.style.backgroundColor =
                                              "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          const content =
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ) as HTMLElement;
                                          if (content)
                                            content.style.backgroundColor =
                                              "transparent";
                                        }}
                                        onClick={() => {
                                          console.log(
                                            "HTML clicked for:",
                                            invite.id,
                                          );
                                          setShowActionMenu(null);
                                        }}
                                      >
                                        <div
                                          className="content"
                                          style={{
                                            display: "flex",
                                            padding: "6px 6px",
                                            alignItems: "center",
                                            gap: "12px",
                                            flex: "1 0 0",
                                            borderRadius: "6px",
                                            transition:
                                              "background-color 0.2s ease",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "8px",
                                              flex: "1 0 0",
                                            }}
                                          >
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17.5L16.5 15L14 12.5M10 12.5L7.5 15L10 17.5M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <div
                                              style={{
                                                flex: "1 0 0",
                                                color: "#414651",
                                                fontFamily: "Public Sans",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                lineHeight: "20px",
                                              }}
                                            >
                                              HTML
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* PDF */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "1px 4px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => {
                                          const content =
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ) as HTMLElement;
                                          if (content)
                                            content.style.backgroundColor =
                                              "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          const content =
                                            e.currentTarget.querySelector(
                                              ".content",
                                            ) as HTMLElement;
                                          if (content)
                                            content.style.backgroundColor =
                                              "transparent";
                                        }}
                                        onClick={() => {
                                          console.log(
                                            "PDF clicked for:",
                                            invite.id,
                                          );
                                          setShowActionMenu(null);
                                        }}
                                      >
                                        <div
                                          className="content"
                                          style={{
                                            display: "flex",
                                            padding: "6px 6px",
                                            alignItems: "center",
                                            gap: "12px",
                                            flex: "1 0 0",
                                            borderRadius: "6px",
                                            transition:
                                              "background-color 0.2s ease",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "8px",
                                              flex: "1 0 0",
                                            }}
                                          >
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M9 15L12 18M12 18L15 15M12 18L12 12M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <div
                                              style={{
                                                flex: "1 0 0",
                                                color: "#414651",
                                                fontFamily: "Public Sans",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                lineHeight: "20px",
                                              }}
                                            >
                                              PDF
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pagination - moved outside scroll container */}
                    <div
                      style={{
                        display: "flex",
                        padding: isMobile ? "16px" : "12px 16px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                        borderTop: "1px solid #E9EAEB",
                        position: "relative",
                        background: "#FFF",
                        minHeight: isMobile ? "64px" : "48px",
                        borderRadius: "0px 0px 12px 12px",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                        gap: isMobile ? "12px" : "0",
                      }}
                    >
                      {/* Left Side - Showing text */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              fontFamily:
                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                              fontWeight: 400,
                              fontSize: "14px",
                              color: "rgba(65,70,81,1)",
                            }}
                          >
                            Showing {(currentPage - 1) * pageSize + 1} to{" "}
                            {Math.min(
                              currentPage * pageSize,
                              sortedData.length,
                            )}{" "}
                            of {sortedData.length}
                          </span>
                        </div>
                      </div>

                      {/* Center - Pagination Controls */}
                      {!isMobile && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            position: "relative",
                          }}
                        >
                          {/* Previous Button */}
                          <button
                            onClick={() =>
                              setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            onMouseEnter={() =>
                              setHoveredPaginationButton("prev")
                            }
                            onMouseLeave={() =>
                              setHoveredPaginationButton(null)
                            }
                            style={{
                              display: "flex",
                              padding: "8px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: currentPage === 1 ? "default" : "pointer",
                              opacity: currentPage === 1 ? 0.5 : 1,
                              transition: "background-color 0.2s ease",
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.5 12H5.5M5.5 12L12.5 19M5.5 12L12.5 5"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          {/* Page Numbers */}
                          {getPageNumbers().map((page, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                typeof page === "number" && setCurrentPage(page)
                              }
                              disabled={page === "..."}
                              style={{
                                display: "flex",
                                width: "32px",
                                height: "32px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border:
                                  page === currentPage
                                    ? "1px solid #E9EAEB"
                                    : "1px solid #E9EAEB",
                                background:
                                  page === currentPage ? "#F5F5F5" : "#FFF",
                                cursor: page !== "..." ? "pointer" : "default",
                                position: "relative",
                                transition: "all 0.2s ease",
                                boxShadow:
                                  page === currentPage
                                    ? "0 1px 2px 0 rgba(10, 13, 18, 0.05)"
                                    : "none",
                                outline: "none",
                              }}
                              onMouseEnter={(e) => {
                                if (page !== "..." && page !== currentPage) {
                                  e.currentTarget.style.background = "#F5F5F5";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (page !== "..." && page !== currentPage) {
                                  e.currentTarget.style.background = "#FFF";
                                }
                              }}
                            >
                              <div
                                style={{
                                  color:
                                    page === currentPage
                                      ? "#414651"
                                      : "#717680",
                                  textAlign: "center",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: page === currentPage ? 500 : 500,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight:
                                      page === currentPage ? 500 : 500,
                                    fontSize: "14px",
                                    color:
                                      page === currentPage
                                        ? "rgba(65,70,81,1)"
                                        : "rgba(113,118,128,1)",
                                  }}
                                >
                                  {page}
                                </span>
                              </div>
                            </button>
                          ))}

                          {/* Next Button */}
                          <button
                            onClick={() =>
                              setCurrentPage(
                                Math.min(totalPages, currentPage + 1),
                              )
                            }
                            disabled={currentPage === totalPages}
                            onMouseEnter={() =>
                              setHoveredPaginationButton("next")
                            }
                            onMouseLeave={() =>
                              setHoveredPaginationButton(null)
                            }
                            style={{
                              display: "flex",
                              padding: "8px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor:
                                currentPage === totalPages
                                  ? "default"
                                  : "pointer",
                              opacity: currentPage === totalPages ? 0.5 : 1,
                              transition: "background-color 0.2s ease",
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.5 12H19.5M19.5 12L12.5 5M19.5 12L12.5 19"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Mobile pagination - simple version */}
                      {isMobile && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() =>
                              setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            style={{
                              display: "flex",
                              padding: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: currentPage === 1 ? "default" : "pointer",
                              opacity: currentPage === 1 ? 0.5 : 1,
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 12H5M5 12L12 19M5 12L12 5"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          <span
                            style={{
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              color: "#414651",
                            }}
                          >
                            {currentPage} of {totalPages}
                          </span>

                          <button
                            onClick={() =>
                              setCurrentPage(
                                Math.min(totalPages, currentPage + 1),
                              )
                            }
                            disabled={currentPage === totalPages}
                            style={{
                              display: "flex",
                              padding: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor:
                                currentPage === totalPages
                                  ? "default"
                                  : "pointer",
                              opacity: currentPage === totalPages ? 0.5 : 1,
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Right Side - Go to input */}
                      {!isMobile && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "12px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "20px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: "rgba(65,70,81,1)",
                              }}
                            >
                              Go to
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="1010"
                            value={goToInputValue}
                            onChange={(e) => {
                              // Only allow numbers
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                "",
                              );
                              setGoToInputValue(value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const page = parseInt(goToInputValue);
                                if (page >= 1 && page <= totalPages) {
                                  setCurrentPage(page);
                                  setGoToInputValue("");
                                }
                              }
                            }}
                            onBlur={() => {
                              const page = parseInt(goToInputValue);
                              if (page >= 1 && page <= totalPages) {
                                setCurrentPage(page);
                              }
                              setGoToInputValue("");
                            }}
                            style={{
                              display: "flex",
                              width: "72px",
                              height: "32px",
                              padding: "6px 8px",
                              alignItems: "center",
                              gap: "8px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              color: "#717680",
                              textAlign: "center",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                              outline: "none",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Information Drawer */}
      <InformationDrawer
        isOpen={showInformationDrawer}
        onClose={() => setShowInformationDrawer(false)}
      />
    </div>
  );
};

export default InvitesAndOrders;
