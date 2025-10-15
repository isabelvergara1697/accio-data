import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [quickOrderDrawerOpen, setQuickOrderDrawerOpen] = useState(false);
  const [ssnOrderDrawerOpen, setSSNOrderDrawerOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [documentsExpanded, setDocumentsExpanded] = useState(true);

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsDesktop(width >= 1024);
    };

    updateBreakpoints();
    window.addEventListener("resize", updateBreakpoints);

    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  const handleSignOut = () => {
    navigate("/login");
  };

  const getUserMenuStyles = () => ({
    background: userMenuOpen || userMenuHovered ? "#F5F5F5" : "transparent",
    transition: "background 0.2s ease",
  });

  const invites = [
    {
      id: 1,
      status: "Canceled",
      firstName: "Loremp",
      lastName: "Young",
      email: "isabella.miller@example.com",
      completed: 80,
      lastEmail: "07/19/22",
      i9Filled: true,
      activate: true,
      ews: true,
    },
    {
      id: 2,
      status: "Canceled",
      firstName: "Ava",
      lastName: "Lewis",
      email: "Loremp@example.com",
      completed: 60,
      lastEmail: "09/05/23",
      i9Filled: true,
      activate: false,
      ews: false,
    },
  ];

  const orders = [
    {
      id: 1,
      status: "Waiting",
      firstName: "Loremp",
      lastName: "Young",
      email: "Loremp@example.com",
      phone: "(555) 890-1234",
      newUpdate: true,
      completed: 80,
      lastUpdate: "07/19/22",
      eta: "08/29/23",
    },
    {
      id: 2,
      status: "Unsolicited",
      firstName: "Ava",
      lastName: "Lewis",
      email: "Loremp@example.com",
      phone: "(555) 012-3456",
      newUpdate: true,
      completed: 60,
      lastUpdate: "09/05/23",
      eta: "10/30/24",
    },
  ];

  const documents = [
    { id: 1, name: "Loremp", size: "200 KB", type: "PDF" },
    { id: 2, name: "Loremp", size: "200 KB", type: "PDF" },
  ];

  const idVerifications = [
    {
      id: 1,
      orderNumber: "334213",
      orderingAccount: "Loremp",
      applicantName: "Chloe Anderson",
      preAdverseLetterName: "[Value]",
      preAdverseSent: "[Value]",
      preAdverseOpened: "[Value]",
      adverseLetterDaysWait: "[Value]",
    },
    {
      id: 2,
      orderNumber: "334213",
      orderingAccount: "[Value]",
      applicantName: "Loremp Thompson",
      preAdverseLetterName: "[Value]",
      preAdverseSent: "[Value]",
      preAdverseOpened: "[Value]",
      adverseLetterDaysWait: "[Value]",
    },
  ];

  const adverseActionLetters = [
    {
      id: 1,
      status: "Waiting on Applicant",
      orderNumber: "234",
      firstName: "Loremp",
      lastName: "Young",
      timeEntered: "07/19/22",
    },
    {
      id: 2,
      status: "Passed",
      orderNumber: "3456",
      firstName: "Ava",
      lastName: "Loremp",
      timeEntered: "09/05/23",
    },
  ];

  const totalResults =
    invites.length +
    orders.length +
    idVerifications.length +
    adverseActionLetters.length +
    documents.length;

  const headerHeight = isDesktop ? 72 : 64;
  const verticalPadding = isMobile ? 24 : 32;
  const horizontalPadding = isMobile ? 16 : 32;
  const bottomPadding = isMobile ? 80 : 32;
  const sectionGap = isMobile ? 16 : 24;

  const renderStatusBadge = (status: string) => {
    const statusStyles: Record<string, { background: string; border: string; color: string }> = {
      Canceled: {
        background: "#FEF6EE",
        border: "1px solid #F9DBAF",
        color: "#B93815",
      },
      Waiting: {
        background: "#ECFDF3",
        border: "1px solid #ABEFC6",
        color: "#067647",
      },
      Unsolicited: {
        background: "#F4F3FF",
        border: "1px solid #D9D6FE",
        color: "#5925DC",
      },
      "Waiting on Applicant": {
        background: "#F0F9FF",
        border: "1px solid #B9E6FE",
        color: "#026AA2",
      },
      Passed: {
        background: "#FAFAFA",
        border: "1px solid #E9EAEB",
        color: "#414651",
      },
    };

    const style = statusStyles[status] || statusStyles.Canceled;

    return (
      <span
        style={{
          display: "inline-flex",
          padding: "2px 8px",
          alignItems: "center",
          borderRadius: "9999px",
          ...style,
        }}
      >
        <span
          style={{
            fontFamily: "Public Sans",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "18px",
          }}
        >
          {status}
        </span>
      </span>
    );
  };

  const renderCheckIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3334 4L6.00008 11.3333L2.66675 8"
        stroke="#A4A7AE"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ProgressBar = ({ value }: { value: number }) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            flex: "0 0 80px",
            height: "8px",
            borderRadius: "9999px",
            background: "#D5D7DA",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${clampedValue}%`,
              height: "100%",
              borderRadius: "9999px",
              background: "#344698",
            }}
          />
        </div>
        <span
          style={{
            color: "#414651",
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
          }}
        >
          {clampedValue}%
        </span>
      </div>
    );
  };

  const tableHeaderCellStyle: React.CSSProperties = {
    padding: "6px 12px",
    textAlign: "left",
    borderBottom: "1px solid #E9EAEB",
    background: "#FFF",
    color: "#717680",
    fontFamily: "Public Sans",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "18px",
    whiteSpace: "nowrap",
  };

  const cardContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    border: "1px solid #E9EAEB",
    background: "#FFF",
    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
  };

  const cardHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    padding: "16px 16px 12px 16px",
  };

  const badgeStyle: React.CSSProperties = {
    display: "flex",
    padding: "2px 8px",
    alignItems: "center",
    borderRadius: "9999px",
    border: "1px solid #E9EAEB",
    background: "#FAFAFA",
    color: "#414651",
    fontFamily: "Public Sans",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "18px",
    minWidth: "32px",
    justifyContent: "center",
  };

  const documentsChevronRotation = documentsExpanded ? "rotate(180deg)" : "rotate(0deg)";

  const tableWrapperStyle: React.CSSProperties = {
    width: "100%",
    overflowX: "auto",
    overflowY: isMobile ? "auto" : "visible",
    maxHeight: isMobile ? "200px" : "none",
    padding: isMobile ? "12px 16px 16px 16px" : "0",
    borderTop: isMobile ? "1px solid #E9EAEB" : "none",
    WebkitOverflowScrolling: "touch",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: isMobile ? "600px" : "720px",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#FAFAFA",
      }}
    >
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigate={(path) => navigate(path)}
        onOpenQuickOrderDrawer={() => setQuickOrderDrawerOpen(true)}
        onOpenSSNOrderDrawer={() => setSSNOrderDrawerOpen(true)}
        onOpenNotificationModal={() => setNotificationModalOpen(true)}
      />

      <div
        style={{
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          position: "relative",
          minHeight: "100vh",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
        }}
      >
        <Header
          isDesktop={isDesktop}
          isMobile={isMobile}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          searchQuery={searchQuery}
          sidebarCollapsed={sidebarCollapsed}
          quickOrderDrawerOpen={quickOrderDrawerOpen}
          setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
          ssnOrderDrawerOpen={ssnOrderDrawerOpen}
          setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
          notificationModalOpen={notificationModalOpen}
          setNotificationModalOpen={setNotificationModalOpen}
          onOpenQuickOrderDrawer={() => setQuickOrderDrawerOpen(true)}
          onOpenSSNOrderDrawer={() => setSSNOrderDrawerOpen(true)}
          onOpenNotificationModal={() => setNotificationModalOpen(true)}
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
          quickOrderDrawerOpen={quickOrderDrawerOpen}
          setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
          ssnOrderDrawerOpen={ssnOrderDrawerOpen}
          setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
          notificationModalOpen={notificationModalOpen}
          setNotificationModalOpen={setNotificationModalOpen}
          onOpenQuickOrderDrawer={() => setQuickOrderDrawerOpen(true)}
          onOpenSSNOrderDrawer={() => setSSNOrderDrawerOpen(true)}
          onOpenNotificationModal={() => setNotificationModalOpen(true)}
        />

        <main
          style={{
            marginTop: `${headerHeight}px`,
            padding: `${verticalPadding}px ${horizontalPadding}px ${bottomPadding}px`,
            display: "flex",
            flexDirection: "column",
            gap: `${sectionGap}px`,
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 600,
                lineHeight: isMobile ? "28px" : "32px",
              }}
            >
              Search Results
            </h1>
            <p
              style={{
                margin: 0,
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Found {" "}
              <span style={{ fontWeight: 700 }}>{totalResults} Results</span>
              {" "}
              to “{searchQuery || "Search Value"}”
            </p>
          </section>

          <section style={cardContainerStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                }}
              >
                <span
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Invites
                </span>
                <span style={badgeStyle}>{invites.length}</span>
              </div>
            </div>

            <div style={tableWrapperStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={tableHeaderCellStyle}>Status</th>
                    <th style={tableHeaderCellStyle}>First Name</th>
                    <th style={tableHeaderCellStyle}>Last Name</th>
                    <th style={tableHeaderCellStyle}>Invitation Email</th>
                    <th style={tableHeaderCellStyle}>Completed</th>
                    <th style={tableHeaderCellStyle}>Last Email</th>
                    <th style={tableHeaderCellStyle}>I-9 Filled</th>
                    <th style={tableHeaderCellStyle}>Activate</th>
                    <th style={tableHeaderCellStyle}>EWS</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.map((invite, index) => {
                    const isLastRow = index === invites.length - 1;
                    return (
                      <tr key={invite.id}>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                          }}
                        >
                          {renderStatusBadge(invite.status)}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                            color: index === 0 ? "#344698" : "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: index === 0 ? 700 : 500,
                            lineHeight: "20px",
                          }}
                        >
                          {invite.firstName}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          {invite.lastName}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                            color: index === 1 ? "#344698" : "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: index === 1 ? 700 : 500,
                            lineHeight: "20px",
                            maxWidth: "220px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {invite.email}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                          }}
                        >
                          <ProgressBar value={invite.completed} />
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          {invite.lastEmail}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                          }}
                        >
                          {invite.i9Filled ? renderCheckIcon() : null}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                          }}
                        >
                          {invite.activate ? renderCheckIcon() : null}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                          }}
                        >
                          {invite.ews ? renderCheckIcon() : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section style={cardContainerStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                }}
              >
                <span
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Orders
                </span>
                <span style={badgeStyle}>{orders.length}</span>
              </div>
            </div>

            <div style={{ padding: "0 0 16px 0" }}>
              <div style={tableWrapperStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={tableHeaderCellStyle}>Status</th>
                      <th style={tableHeaderCellStyle}>First Name</th>
                      <th style={tableHeaderCellStyle}>Last Name</th>
                      <th style={tableHeaderCellStyle}>Applicant Email</th>
                      <th style={tableHeaderCellStyle}>Phone</th>
                      <th style={tableHeaderCellStyle}>New Update</th>
                      <th style={tableHeaderCellStyle}>Completed</th>
                      <th style={tableHeaderCellStyle}>Last Update</th>
                      <th style={tableHeaderCellStyle}>ETA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      const isLastRow = index === orders.length - 1;
                      return (
                        <tr key={order.id}>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                            }}
                          >
                            {renderStatusBadge(order.status)}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: index === 0 ? "#344698" : "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: index === 0 ? 700 : 500,
                              lineHeight: "20px",
                            }}
                          >
                            {order.firstName}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {order.lastName}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#344698",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 700,
                              lineHeight: "20px",
                              maxWidth: "220px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {order.email}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {order.phone}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                            }}
                          >
                            {order.newUpdate ? renderCheckIcon() : null}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                            }}
                          >
                            <ProgressBar value={order.completed} />
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {order.lastUpdate}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {order.eta}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section style={cardContainerStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                }}
              >
                <span
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  ID Verification Status
                </span>
                <span style={badgeStyle}>{idVerifications.length}</span>
              </div>
            </div>

            <div style={{ padding: "0 0 16px 0" }}>
              <div style={tableWrapperStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={tableHeaderCellStyle}>Order Number</th>
                      <th style={tableHeaderCellStyle}>Ordering Account</th>
                      <th style={tableHeaderCellStyle}>Applicant Name</th>
                      <th style={tableHeaderCellStyle}>Pre Adverse Letter Name</th>
                      <th style={tableHeaderCellStyle}>Pre Adverse Sent</th>
                      <th style={tableHeaderCellStyle}>Pre Adverse Opened</th>
                      <th style={tableHeaderCellStyle}>Adverse Letter Days Wait</th>
                    </tr>
                  </thead>
                  <tbody>
                    {idVerifications.map((item, index) => {
                      const isLastRow = index === idVerifications.length - 1;
                      const isFirstApplicantName = index === 1;
                      const applicantNameParts = item.applicantName.split(" ");
                      const isLorempFirst = applicantNameParts[0] === "Loremp";

                      return (
                        <tr key={item.id}>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.orderNumber}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: index === 0 ? "#344698" : "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: index === 0 ? 700 : 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.orderingAccount}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              lineHeight: "20px",
                            }}
                          >
                            {isFirstApplicantName && isLorempFirst ? (
                              <>
                                <span style={{ color: "#344698", fontWeight: 700 }}>
                                  Loremp
                                </span>
                                <span style={{ color: "#181D27", fontWeight: 400 }}>
                                  {" "}
                                  {applicantNameParts.slice(1).join(" ")}
                                </span>
                              </>
                            ) : (
                              <span style={{ color: "#181D27", fontWeight: 500 }}>
                                {item.applicantName}
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.preAdverseLetterName}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.preAdverseSent}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.preAdverseOpened}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.adverseLetterDaysWait}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section style={cardContainerStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: "1 0 0",
                }}
              >
                <span
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Adverse Action Letters
                </span>
                <span style={badgeStyle}>{adverseActionLetters.length}</span>
              </div>
            </div>

            <div style={{ padding: "0 0 16px 0" }}>
              <div style={tableWrapperStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={tableHeaderCellStyle}>Status</th>
                      <th style={tableHeaderCellStyle}>Order Number</th>
                      <th style={tableHeaderCellStyle}>First Name</th>
                      <th style={tableHeaderCellStyle}>Last Name</th>
                      <th style={tableHeaderCellStyle}>Time Entered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adverseActionLetters.map((item, index) => {
                      const isLastRow = index === adverseActionLetters.length - 1;
                      return (
                        <tr key={item.id}>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                            }}
                          >
                            {renderStatusBadge(item.status)}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.orderNumber}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: index === 0 ? "#344698" : "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: index === 0 ? 700 : 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.firstName}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: index === 1 ? "#344698" : "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: index === 1 ? 700 : 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.lastName}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: isLastRow ? "none" : "1px solid #E9EAEB",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            {item.timeEntered}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section style={cardContainerStyle}>
            <div
              style={{
                ...cardHeaderStyle,
                padding: "20px 24px 0 24px",
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  flex: "1 0 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                    }}
                  >
                    Documents
                  </span>
                  <span style={badgeStyle}>{documents.length}</span>
                </div>
                <span
                  style={{
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    display: "block",
                  }}
                >
                  Your XML PostBack URL is [url]
                </span>
              </div>

              <button
                type="button"
                aria-label={documentsExpanded ? "Collapse documents" : "Expand documents"}
                onClick={() => setDocumentsExpanded((prev) => !prev)}
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
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: documentsChevronRotation,
                    transition: "transform 0.2s ease",
                  }}
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

            {documentsExpanded && (
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "stretch",
                  gap: "16px",
                  padding: "20px 24px 24px 24px",
                }}
              >
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      display: "flex",
                      flex: "1 0 0",
                      padding: "16px",
                      alignItems: "center",
                      gap: "12px",
                      borderRadius: "12px",
                      border: "1px solid #E9EAEB",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flex: "1 0 0",
                      }}
                    >
                      <div style={{ position: "relative", width: "40px", height: "40px" }}>
                        <svg
                          width="32"
                          height="40"
                          viewBox="0 0 32 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 0.75H20C20.1212 0.75 20.2375 0.798088 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
                            stroke="#D5D7DA"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
                            stroke="#D5D7DA"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <div
                          style={{
                            position: "absolute",
                            left: "1px",
                            top: "18px",
                            display: "inline-flex",
                            padding: "2px 3px",
                            alignItems: "center",
                            borderRadius: "2px",
                            background: "#D92D20",
                            color: "#FFF",
                            fontFamily: "Inter",
                            fontSize: "10px",
                            fontWeight: 700,
                            lineHeight: "12px",
                          }}
                        >
                          {doc.type}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                          flex: "1 0 0",
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            color: "#344698",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 700,
                            lineHeight: "20px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {doc.name}
                        </span>
                        <span
                          style={{
                            color: "#535862",
                            fontFamily: "Public Sans",
                            fontSize: "12px",
                            fontWeight: 400,
                            lineHeight: "18px",
                          }}
                        >
                          {doc.size}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <button
                        type="button"
                        aria-label="Preview document"
                        style={{
                          display: "flex",
                          width: "36px",
                          height: "36px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "6px",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
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
                      <button
                        type="button"
                        aria-label="Download document"
                        style={{
                          display: "flex",
                          width: "36px",
                          height: "36px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "6px",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
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
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
