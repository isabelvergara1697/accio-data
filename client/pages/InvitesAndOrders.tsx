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
}> = ({ text, style = {}, maxWidth }) => {
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
        {text}
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"invites" | "orders" | "hired">(
    "invites",
  );
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
  const downloadDropdownRef = useRef<HTMLDivElement>(null);

  // Window resize handler
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadDropdownRef.current &&
        !downloadDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDownloadDropdown(false);
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
  ];

  // Component for status badges with dynamic truncation detection
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

  const sortedData = React.useMemo(() => {
    if (!sortField || !sortDirection) return invitesData;

    return [...invitesData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      let comparison = 0;
      if (aValue < bValue) {
        comparison = -1;
      } else if (aValue > bValue) {
        comparison = 1;
      }

      return sortDirection === "desc" ? comparison * -1 : comparison;
    });
  }, [invitesData, sortField, sortDirection]);

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
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            display: "flex",
            paddingBottom: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            flex: "1 0 0",
            alignSelf: "stretch",
            borderRadius: "40px 0 0 0",
            background: "#FAFAFA",
            position: "relative",
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
            <div
              style={{
                display: "flex",
                padding: isMobile ? "32px 16px 0" : "32px 32px 0",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
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
                    gap: "20px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: "320px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      alignSelf: "stretch",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "32px",
                        position: "relative",
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
                        Invites & Orders
                      </span>
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                        position: "relative",
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
                        Track pending invites and submitted orders in one place.
                        Use filters and tools to sort, review, and manage
                        activity easily.
                      </span>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      position: "relative",
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
                        { key: "hired", label: "Hired", count: "587" },
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
                padding: "0 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                flex: "1 0 0",
                alignSelf: "stretch",
                position: "relative",
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
                    {/* Top Actions */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
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

                      {/* Action Buttons */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          position: "relative",
                        }}
                      >
                        {[
                          { icon: "filters", label: "Filters" },
                          { icon: "customize", label: "Customize" },
                          { icon: "views", label: "Views" },
                          { icon: "download", label: "Download" },
                          { icon: "information", label: "Information" },
                        ].map((action) => (
                          <div
                            key={action.label}
                            style={{ position: "relative" }}
                          >
                            <button
                              onClick={() => {
                                if (action.icon === "download") {
                                  setShowDownloadDropdown(
                                    !showDownloadDropdown,
                                  );
                                } else {
                                  console.log(`${action.label} clicked`);
                                }
                              }}
                              onMouseEnter={() => setHoveredButton(action.icon)}
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
                                  hoveredButton === action.icon || (action.icon === "download" && showDownloadDropdown)
                                    ? "#F5F5F5"
                                    : "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                                position: "relative",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {action.icon === "filters" && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.33333 14L3.33333 10M3.33333 10C4.06971 10 4.66667 9.40305 4.66667 8.66667C4.66667 7.93029 4.06971 7.33333 3.33333 7.33333C2.59695 7.33333 2 7.93029 2 8.66667C2 9.40305 2.59695 10 3.33333 10ZM3.33333 4.66667V2M8 14V10M8 4.66667V2M8 4.66667C7.26362 4.66667 6.66667 5.26362 6.66667 6C6.66667 6.73638 7.26362 7.33333 8 7.33333C8.73638 7.33333 9.33333 6.73638 9.33333 6C9.33333 5.26362 8.73638 4.66667 8 4.66667ZM12.6667 14V11.3333M12.6667 11.3333C13.403 11.3333 14 10.7364 14 10C14 9.26362 13.403 8.66667 12.6667 8.66667C11.9303 8.66667 11.3333 9.26362 11.3333 10C11.3333 10.7364 11.9303 11.3333 12.6667 11.3333ZM12.6667 6V2"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                              {action.icon === "customize" && (
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
                              )}
                              {action.icon === "views" && (
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
                              )}
                              {action.icon === "download" && (
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
                              )}
                              {action.icon === "information" && (
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
                              )}
                              <div
                                style={{
                                  display: "flex",
                                  padding: "0 2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
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
                                      color: "rgba(65,70,81,1)",
                                    }}
                                  >
                                    {action.label}
                                  </span>
                                </div>
                              </div>
                            </button>
                            {action.icon === "download" &&
                              showDownloadDropdown && (
                                <div
                                  ref={downloadDropdownRef}
                                  style={{
                                    position: "absolute",
                                    top: "calc(100% + 4px)",
                                    right: "0",
                                    width: "170px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(0, 0, 0, 0.08)",
                                    background: "#FFF",
                                    boxShadow: "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                    zIndex: 1000,
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
                                    {/* Download XLSX Option */}
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector('.content').style.backgroundColor = "#F5F5F5";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector('.content').style.backgroundColor = "transparent";
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
                                          transition: "background-color 0.2s ease",
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
                                          {/* File type icon */}
                                          <div
                                            style={{
                                              width: "24px",
                                              height: "24px",
                                              position: "relative",
                                            }}
                                          >
                                            <svg
                                              style={{
                                                width: "19px",
                                                height: "24px",
                                                position: "absolute",
                                                left: "4px",
                                                top: "0px",
                                              }}
                                              width="20"
                                              height="24"
                                              viewBox="0 0 20 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M4.2002 0.75H12.1895L18.6504 7.20996V20C18.6504 21.7949 17.1952 23.2499 15.4004 23.25H4.2002C2.40527 23.25 0.950195 21.7949 0.950195 20V4C0.950196 2.20507 2.40527 0.75 4.2002 0.75Z"
                                                stroke="#D5D7DA"
                                                strokeWidth="1.5"
                                              />
                                              <path
                                                d="M12.2002 0.299805V3.1998C12.2002 5.40894 13.9911 7.1998 16.2002 7.1998H19.1002"
                                                stroke="#D5D7DA"
                                                strokeWidth="1.5"
                                              />
                                            </svg>
                                            <svg
                                              style={{
                                                position: "absolute",
                                                left: "-5px",
                                                top: "8px",
                                                width: "26px",
                                                height: "16px",
                                              }}
                                              width="26"
                                              height="16"
                                              viewBox="0 0 26 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <rect
                                                width="26"
                                                height="16"
                                                rx="2"
                                                fill="#079455"
                                              />
                                              <text
                                                x="13"
                                                y="11.5"
                                                textAnchor="middle"
                                                fill="#FFFFFF"
                                                fontSize="10"
                                                fontFamily="Inter, -apple-system, Roboto, Helvetica, sans-serif"
                                                fontWeight="700"
                                              >
                                                XLS
                                              </text>
                                            </svg>
                                          </div>
                                          <div
                                            style={{
                                              flex: "1 0 0",
                                              color: "#414651",
                                              fontFamily: "Public Sans",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 700,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 700,
                                                fontSize: "14px",
                                                color: "rgba(65,70,81,1)",
                                              }}
                                            >
                                              Download XLSX
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Download CSV Option */}
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "1px 4px",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.querySelector('.content').style.backgroundColor = "#F5F5F5";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.querySelector('.content').style.backgroundColor = "transparent";
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
                                          transition: "background-color 0.2s ease",
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
                                          {/* File type icon */}
                                          <div
                                            style={{
                                              width: "24px",
                                              height: "24px",
                                              position: "relative",
                                            }}
                                          >
                                            <svg
                                              style={{
                                                width: "19px",
                                                height: "24px",
                                                position: "absolute",
                                                left: "4px",
                                                top: "0px",
                                              }}
                                              width="20"
                                              height="24"
                                              viewBox="0 0 20 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M4.2002 0.75H12.1895L18.6504 7.20996V20C18.6504 21.7949 17.1952 23.2499 15.4004 23.25H4.2002C2.40527 23.25 0.950195 21.7949 0.950195 20V4C0.950196 2.20507 2.40527 0.75 4.2002 0.75Z"
                                                stroke="#D5D7DA"
                                                strokeWidth="1.5"
                                              />
                                              <path
                                                d="M12.2002 0.299805V3.1998C12.2002 5.40894 13.9911 7.1998 16.2002 7.1998H19.1002"
                                                stroke="#D5D7DA"
                                                strokeWidth="1.5"
                                              />
                                            </svg>
                                            <svg
                                              style={{
                                                position: "absolute",
                                                left: "-5px",
                                                top: "8px",
                                                width: "28px",
                                                height: "16px",
                                              }}
                                              width="28"
                                              height="16"
                                              viewBox="0 0 28 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <rect
                                                width="28"
                                                height="16"
                                                rx="2"
                                                fill="#079455"
                                              />
                                              <text
                                                x="14"
                                                y="11.5"
                                                textAnchor="middle"
                                                fill="#FFFFFF"
                                                fontSize="10"
                                                fontFamily="Inter, -apple-system, Roboto, Helvetica, sans-serif"
                                                fontWeight="700"
                                              >
                                                CSV
                                              </text>
                                            </svg>
                                          </div>
                                          <div
                                            style={{
                                              flex: "1 0 0",
                                              color: "#414651",
                                              fontFamily: "Public Sans",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 700,
                                              lineHeight: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                fontWeight: 700,
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
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
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
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      position: "relative",
                    }}
                  >
                    {/* Table */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Table Container */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          flex: "1 0 0",
                          position: "relative",
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
                              width: "40px",
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
                              width: "130px",
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
                              width: "108px",
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
                              width: "108px",
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
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              flex: "1 0 0",
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
                              width: "90px",
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
                                    fontWeight: 700,
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
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSort("i9Filled")}
                              >
                                <path
                                  d="M4.66666 10L7.99999 13.3334L11.3333 10M4.66666 6.00002L7.99999 2.66669L11.3333 6.00002"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Activate Column */}
                          <div
                            style={{
                              display: "flex",
                              width: "80px",
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
                                    fontWeight: 700,
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

                          {/* EWS Column */}
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
                                    sortField === "ews" ? "#34479A" : "#717680",
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
                                    fontWeight: 700,
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

                          {/* Actions Column */}
                          <div
                            style={{
                              display: "flex",
                              width: "48px",
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
                        {sortedData.map((invite) => (
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
                                width: "40px",
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
                                width: "130px",
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
                                width: "108px",
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
                                width: "108px",
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
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                flex: "1 0 0",
                                borderBottom: "1px solid #E9EAEB",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 1,
                                  flex: "1 0 0",
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
                                  {invite.email}
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
                                width: "80px",
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
                                width: "60px",
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
                                width: "48px",
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
                                  cursor: "pointer",
                                }}
                              >
                                <ActionDotsIcon />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pagination */}
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "12px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                        borderTop: "1px solid #E9EAEB",
                        position: "relative",
                      }}
                    >
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
                            Showing 10 of 456
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          position: "relative",
                        }}
                      >
                        {/* Pagination Controls */}
                        <button
                          onMouseEnter={() =>
                            setHoveredPaginationButton("prev")
                          }
                          onMouseLeave={() => setHoveredPaginationButton(null)}
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background:
                              hoveredPaginationButton === "prev"
                                ? "#F5F5F5"
                                : "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease",
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

                        {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                          <div
                            key={index}
                            onMouseEnter={() =>
                              page !== "..." &&
                              setHoveredPaginationButton(`page-${index}`)
                            }
                            onMouseLeave={() =>
                              setHoveredPaginationButton(null)
                            }
                            style={{
                              display: "flex",
                              width: "32px",
                              height: "32px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              background:
                                page === currentPage
                                  ? "#F5F5F5"
                                  : hoveredPaginationButton ===
                                        `page-${index}` && page !== "..."
                                    ? "#F5F5F5"
                                    : "transparent",
                              cursor: page !== "..." ? "pointer" : "default",
                              position: "relative",
                              transition: "background-color 0.2s ease",
                            }}
                            onClick={() =>
                              typeof page === "number" && setCurrentPage(page)
                            }
                          >
                            <div
                              style={{
                                color:
                                  page === currentPage ? "#414651" : "#717680",
                                textAlign: "center",
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
                                  color:
                                    page === currentPage
                                      ? "rgba(65,70,81,1)"
                                      : "rgba(113,118,128,1)",
                                }}
                              >
                                {page}
                              </span>
                            </div>
                          </div>
                        ))}

                        <button
                          onMouseEnter={() =>
                            setHoveredPaginationButton("next")
                          }
                          onMouseLeave={() => setHoveredPaginationButton(null)}
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background:
                              hoveredPaginationButton === "next"
                                ? "#F5F5F5"
                                : "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease",
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
                            Go to
                          </span>
                        </div>
                        <input
                          type="text"
                          defaultValue="1010"
                          style={{
                            display: "flex",
                            width: "72px",
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
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InvitesAndOrders;
