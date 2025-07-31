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
  const [showInformationDrawer, setShowInformationDrawer] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

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
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setShowActionMenu(null);
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
                padding: isMobile ? "0 16px" : "0 32px",
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
                          gap: isMobile ? "8px" : "12px",
                          position: "relative",
                          ...(isMobile
                            ? {
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                              }
                            : {}),
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
                                } else if (action.icon === "information") {
                                  setShowInformationDrawer(true);
                                } else {
                                  console.log(`${action.label} clicked`);
                                }
                              }}
                              onMouseEnter={() => setHoveredButton(action.icon)}
                              onMouseLeave={() => setHoveredButton(null)}
                              style={{
                                display: "flex",
                                minHeight: isMobile ? "40px" : "36px",
                                padding: isMobile ? "8px 12px" : "6px 8px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background:
                                  hoveredButton === action.icon ||
                                  (action.icon === "download" &&
                                    showDownloadDropdown)
                                    ? "#FDFDFD"
                                    : "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                                position: "relative",
                                transition: "all 0.2s ease",
                                ...(isMobile
                                  ? {
                                      minWidth: action.label.length > 8 ? "auto" : "80px",
                                      fontSize: "13px",
                                    }
                                  : {}),
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
                                    boxShadow:
                                      "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
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
                                                flexShrink: 0,
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
                                                d="M4.20001 0.75H12.1893L18.6502 7.20996V20C18.6502 21.7949 17.195 23.2499 15.4002 23.25H4.20001C2.40509 23.25 0.950012 21.7949 0.950012 20V4C0.950013 2.20507 2.40509 0.75 4.20001 0.75Z"
                                                stroke="#D5D7DA"
                                                strokeWidth="1.5"
                                              />
                                              <path
                                                d="M12.2 0.300049V3.20005C12.2 5.40919 13.9909 7.20005 16.2 7.20005H19.1"
                                                stroke="#D5D7DA"
                                                strokeWidth="1.5"
                                              />
                                            </svg>
                                            <svg
                                              style={{
                                                display: "inline-flex",
                                                padding: "2px 3px",
                                                alignItems: "flex-start",
                                                gap: "8px",
                                                borderRadius: "2px",
                                                background: "#079455",
                                                position: "absolute",
                                                left: "-4px",
                                                top: "10px",
                                                width: "25px",
                                                height: "11px",
                                              }}
                                              width="25"
                                              height="13"
                                              viewBox="0 0 25 13"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <rect
                                                x="0.0574341"
                                                y="0.862427"
                                                width="24.6852"
                                                height="11.4751"
                                                rx="2"
                                                fill="#079455"
                                              />
                                              <path
                                                d="M4.84366 2.96186L6.31028 5.44055H6.36709L7.84082 2.96186H9.57732L7.35786 6.59822L9.62704 10.2346H7.85857L6.36709 7.75234H6.31028L4.8188 10.2346H3.05743L5.33371 6.59822L3.10005 2.96186H4.84366Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M10.5503 10.2346V2.96186H12.088V8.96683H15.2059V10.2346H10.5503Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M20.1695 5.05348C20.1411 4.76702 20.0191 4.54448 19.8037 4.38586C19.5883 4.22725 19.2959 4.14794 18.9266 4.14794C18.6756 4.14794 18.4637 4.18345 18.2909 4.25447C18.1181 4.32313 17.9855 4.41901 17.8932 4.54211C17.8032 4.66522 17.7583 4.8049 17.7583 4.96115C17.7535 5.09136 17.7807 5.20499 17.8399 5.30206C17.9015 5.39912 17.9855 5.48317 18.0921 5.55419C18.1986 5.62284 18.3217 5.68321 18.4614 5.7353C18.6011 5.78501 18.7502 5.82763 18.9088 5.86314L19.5622 6.01939C19.8795 6.09041 20.1707 6.18511 20.4358 6.30348C20.701 6.42185 20.9306 6.56745 21.1247 6.74027C21.3189 6.91309 21.4692 7.11669 21.5757 7.35106C21.6846 7.58544 21.7403 7.85414 21.7426 8.15717C21.7403 8.60225 21.6266 8.98814 21.4017 9.31484C21.1792 9.63918 20.8572 9.89131 20.4358 10.0712C20.0168 10.2488 19.5113 10.3376 18.9195 10.3376C18.3324 10.3376 17.821 10.2476 17.3854 10.0677C16.9521 9.88776 16.6136 9.62142 16.3698 9.26868C16.1283 8.91356 16.0016 8.47441 15.9898 7.95121H17.4777C17.4943 8.19505 17.5641 8.39865 17.6872 8.562C17.8127 8.72299 17.9796 8.84491 18.1879 8.92777C18.3986 9.00826 18.6366 9.04851 18.9017 9.04851C19.1621 9.04851 19.3882 9.01063 19.58 8.93487C19.7741 8.85911 19.9244 8.75376 20.031 8.61882C20.1375 8.48388 20.1908 8.32881 20.1908 8.15362C20.1908 7.99027 20.1422 7.85296 20.0452 7.74169C19.9505 7.63042 19.8108 7.53572 19.6261 7.4576C19.4439 7.37947 19.2201 7.30845 18.955 7.24453L18.1631 7.04567C17.5499 6.89652 17.0658 6.66333 16.7107 6.34609C16.3556 6.02886 16.1792 5.60154 16.1815 5.06413C16.1792 4.62379 16.2964 4.23908 16.5331 3.91001C16.7722 3.58094 17.1001 3.32407 17.5168 3.13942C17.9334 2.95476 18.4069 2.86243 18.9372 2.86243C19.477 2.86243 19.9481 2.95476 20.3506 3.13942C20.7554 3.32407 21.0703 3.58094 21.2952 3.91001C21.5201 4.23908 21.6361 4.62024 21.6432 5.05348H20.1695Z"
                                                fill="white"
                                              />
                                            </svg>
                                          </div>
                                          <div
                                            style={{
                                              flex: "1 0 0",
                                              color: "#414651",
                                              fontFamily: "Public Sans",
                                              fontSize: "14px",
                                              fontStyle: "normal",
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
                                                flexShrink: 0,
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
                                                d="M4.20001 0.75H12.1893L18.6502 7.20996V20C18.6502 21.7949 17.195 23.2499 15.4002 23.25H4.20001C2.40509 23.25 0.950012 21.7949 0.950012 20V4C0.950013 2.20507 2.40509 0.75 4.20001 0.75Z"
                                                stroke="#D5D7DA"
                                                strokeWidth="1.5"
                                              />
                                              <path
                                                d="M12.2 0.300049V3.20005C12.2 5.40919 13.9909 7.20005 16.2 7.20005H19.1"
                                                stroke="#D5D7DA"
                                                strokeWidth="1.5"
                                              />
                                            </svg>
                                            <svg
                                              style={{
                                                display: "inline-flex",
                                                padding: "2px 3px",
                                                alignItems: "flex-start",
                                                gap: "8px",
                                                borderRadius: "2px",
                                                background: "#079455",
                                                position: "absolute",
                                                left: "-4px",
                                                top: "10px",
                                                width: "27px",
                                                height: "11px",
                                              }}
                                              width="28"
                                              height="13"
                                              viewBox="0 0 28 13"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <rect
                                                x="0.597412"
                                                y="0.862549"
                                                width="26.8052"
                                                height="11.4751"
                                                rx="2"
                                                fill="#079455"
                                              />
                                              <path
                                                d="M10.1422 5.50815H8.58676C8.55835 5.30691 8.50035 5.12817 8.41275 4.97192C8.32516 4.81331 8.21271 4.67836 8.0754 4.56709C7.93808 4.45583 7.77947 4.3706 7.59954 4.31141C7.42199 4.25223 7.22904 4.22263 7.02071 4.22263C6.64429 4.22263 6.3164 4.31615 6.03704 4.50317C5.75769 4.68783 5.54107 4.95772 5.38718 5.31283C5.2333 5.66558 5.15636 6.09408 5.15636 6.59834C5.15636 7.11681 5.2333 7.55242 5.38718 7.90516C5.54343 8.25791 5.76124 8.52424 6.04059 8.70417C6.31995 8.88409 6.6431 8.97405 7.01005 8.97405C7.21602 8.97405 7.4066 8.94683 7.58179 8.89238C7.75934 8.83793 7.91678 8.75862 8.05409 8.65445C8.1914 8.54792 8.30504 8.41889 8.395 8.26738C8.48733 8.11586 8.55125 7.94304 8.58676 7.74891L10.1422 7.75601C10.1019 8.08982 10.0013 8.41179 9.84031 8.72192C9.68169 9.02969 9.46744 9.30549 9.19755 9.54934C8.93004 9.79082 8.61043 9.98258 8.23875 10.1246C7.86943 10.2643 7.45158 10.3341 6.9852 10.3341C6.33652 10.3341 5.7565 10.1874 5.24514 9.8938C4.73614 9.60024 4.33368 9.17529 4.03775 8.61894C3.74419 8.0626 3.59741 7.38906 3.59741 6.59834C3.59741 5.80526 3.74656 5.13054 4.04486 4.5742C4.34315 4.01785 4.74798 3.59408 5.25934 3.30289C5.77071 3.00933 6.34599 2.86255 6.9852 2.86255C7.4066 2.86255 7.79722 2.92173 8.15707 3.04011C8.51929 3.15848 8.84007 3.3313 9.11943 3.55857C9.39879 3.78348 9.62606 4.05928 9.80125 4.38599C9.9788 4.71269 10.0924 5.08674 10.1422 5.50815Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M15.1901 5.0536C15.1617 4.76714 15.0398 4.5446 14.8243 4.38599C14.6089 4.22737 14.3165 4.14806 13.9472 4.14806C13.6963 4.14806 13.4844 4.18357 13.3115 4.25459C13.1387 4.32325 13.0061 4.41913 12.9138 4.54224C12.8239 4.66534 12.7789 4.80502 12.7789 4.96127C12.7741 5.09148 12.8014 5.20512 12.8606 5.30218C12.9221 5.39924 13.0061 5.48329 13.1127 5.55431C13.2192 5.62297 13.3423 5.68333 13.482 5.73542C13.6217 5.78513 13.7708 5.82775 13.9294 5.86326L14.5829 6.01951C14.9001 6.09053 15.1913 6.18523 15.4564 6.3036C15.7216 6.42197 15.9512 6.56757 16.1454 6.74039C16.3395 6.91321 16.4898 7.11681 16.5963 7.35119C16.7052 7.58556 16.7609 7.85426 16.7633 8.15729C16.7609 8.60237 16.6472 8.98826 16.4223 9.31496C16.1998 9.6393 15.8778 9.89143 15.4564 10.0714C15.0374 10.2489 14.532 10.3377 13.9401 10.3377C13.353 10.3377 12.8416 10.2477 12.406 10.0678C11.9728 9.88788 11.6342 9.62155 11.3904 9.2688C11.1489 8.91369 11.0222 8.47453 11.0104 7.95133H12.4983C12.5149 8.19517 12.5847 8.39877 12.7079 8.56212C12.8333 8.72311 13.0002 8.84503 13.2086 8.92789C13.4193 9.00838 13.6572 9.04863 13.9223 9.04863C14.1828 9.04863 14.4088 9.01075 14.6006 8.93499C14.7947 8.85923 14.9451 8.75388 15.0516 8.61894C15.1581 8.484 15.2114 8.32893 15.2114 8.15374C15.2114 7.99039 15.1629 7.85308 15.0658 7.74181C14.9711 7.63054 14.8314 7.53584 14.6468 7.45772C14.4645 7.37959 14.2408 7.30857 13.9756 7.24465L13.1837 7.04579C12.5705 6.89664 12.0864 6.66345 11.7313 6.34621C11.3762 6.02898 11.1998 5.60166 11.2022 5.06425C11.1998 4.62391 11.317 4.23921 11.5537 3.91013C11.7928 3.58106 12.1207 3.3242 12.5374 3.13954C12.9541 2.95488 13.4275 2.86255 13.9579 2.86255C14.4976 2.86255 14.9687 2.95488 15.3712 3.13954C15.776 3.3242 16.0909 3.58106 16.3158 3.91013C16.5407 4.23921 16.6567 4.62036 16.6638 5.0536H15.1901Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M19.1114 2.96198L20.8693 8.48755H20.9367L22.6981 2.96198H24.4026L21.8955 10.2347H19.914L17.4033 2.96198H19.1114Z"
                                                fill="white"
                                              />
                                            </svg>
                                          </div>
                                          <div
                                            style={{
                                              flex: "1 0 0",
                                              color: "#414651",
                                              fontFamily: "Public Sans",
                                              fontSize: "14px",
                                              fontStyle: "normal",
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
                      padding: isMobile ? "8px 8px 16px 8px" : "12px 16px 16px 16px",
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
                        overflowX: isMobile || isTablet ? "auto" : "visible",
                        overflowY: "hidden",
                        ...(isMobile || isTablet
                          ? {
                              scrollbarWidth: "thin",
                              scrollbarColor: "#D5D7DA #F9FAFB",
                              WebkitOverflowScrolling: "touch",
                            }
                          : {}),
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
                          minWidth: isMobile || isTablet ? "800px" : "auto",
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
                              width: isMobile ? "48px" : "40px",
                              height: isMobile ? "44px" : "36px",
                              padding: isMobile ? "8px 16px" : "6px 12px",
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
                                width: isMobile ? "48px" : "40px",
                                height: isMobile ? "60px" : "52px",
                                padding: isMobile ? "16px" : "12px",
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
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    cursor: "pointer",
                                    padding: "4px",
                                    borderRadius: "4px",
                                    transition: "background-color 0.2s ease",
                                    background: showActionMenu === invite.id ? "#F5F5F5" : "transparent",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowActionMenu(showActionMenu === invite.id ? null : invite.id);
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
                                          const content = e.currentTarget.querySelector(".content") as HTMLElement;
                                          if (content) content.style.backgroundColor = "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          const content = e.currentTarget.querySelector(".content") as HTMLElement;
                                          if (content) content.style.backgroundColor = "transparent";
                                        }}
                                        onClick={() => {
                                          console.log("Invite Summary clicked for:", invite.id);
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
                                          const content = e.currentTarget.querySelector(".content") as HTMLElement;
                                          if (content) content.style.backgroundColor = "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          const content = e.currentTarget.querySelector(".content") as HTMLElement;
                                          if (content) content.style.backgroundColor = "transparent";
                                        }}
                                        onClick={() => {
                                          console.log("Manage Invitation clicked for:", invite.id);
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
                                          const content = e.currentTarget.querySelector(".content") as HTMLElement;
                                          if (content) content.style.backgroundColor = "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          const content = e.currentTarget.querySelector(".content") as HTMLElement;
                                          if (content) content.style.backgroundColor = "transparent";
                                        }}
                                        onClick={() => {
                                          console.log("HTML clicked for:", invite.id);
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
                                          const content = e.currentTarget.querySelector(".content") as HTMLElement;
                                          if (content) content.style.backgroundColor = "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          const content = e.currentTarget.querySelector(".content") as HTMLElement;
                                          if (content) content.style.backgroundColor = "transparent";
                                        }}
                                        onClick={() => {
                                          console.log("PDF clicked for:", invite.id);
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
                            padding: isMobile ? "12px" : "8px",
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
                              width: isMobile ? "40px" : "32px",
                              height: isMobile ? "40px" : "32px",
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
                            padding: isMobile ? "12px" : "8px",
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
                            width: isMobile ? "80px" : "72px",
                            padding: isMobile ? "8px 12px" : "6px 8px",
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

      {/* Information Drawer */}
      <InformationDrawer
        isOpen={showInformationDrawer}
        onClose={() => setShowInformationDrawer(false)}
      />
    </div>
  );
};

export default InvitesAndOrders;
