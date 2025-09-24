import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showNotification] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Notes state (persisted per order)
  type Note = {
    id: string;
    author: string;
    avatarUrl: string;
    content: string;
    createdAt: string; // ISO string
  };

  type TatSegment = {
    label: string;
    value: number;
    color: string;
  };

  const storageKey = `order-notes-${orderId ?? 'default'}`;
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setNotes(JSON.parse(saved));
      } else {
        setNotes([
          {
            id: String(Date.now()),
            author: "Phoenix Baker",
            avatarUrl:
              "https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800",
            content:
              "This report has been flagged due to the lack of documents.",
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.warn("Failed to read notes from storage", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch (e) {
      console.warn("Failed to save notes to storage", e);
    }
  }, [storageKey, notes]);

  const currentUser = "Alexandra Fitzwilliam";

  const tatData: TatSegment[] = [
    { label: "In Progress", value: 60, color: "#34479A" },
    { label: "Waiting on Applicant", value: 25, color: "#3CCB7F" },
    { label: "Waiting on HR", value: 15, color: "#A4A7AE" },
  ];
  const [tatHoveredSegment, setTatHoveredSegment] = useState<TatSegment | null>(null);
  const [tatHoveredIndex, setTatHoveredIndex] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [reportSummaryExpanded, setReportSummaryExpanded] = useState(true);
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [documentsExpanded, setDocumentsExpanded] = useState(true);
  const [documentsHoveredRowIndex, setDocumentsHoveredRowIndex] = useState<number | null>(null);
  const [subjectExpanded, setSubjectExpanded] = useState(true);

  const addNote = () => {
    const text = noteText.trim();
    if (!text) return;
    const newNote: Note = {
      id: String(Date.now()),
      author: currentUser,
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setNoteText("");
  };

  const formatTimestamp = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        weekday: "long",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const editNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setEditText(note.content);
    }
  };

  const saveEdit = (noteId: string) => {
    setNotes(prev => prev.map(n =>
      n.id === noteId ? { ...n, content: editText.trim() } : n
    ));
    setEditingNoteId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditText("");
  };

  const copyNote = (content: string) => {
    // Prefer async Clipboard API when available and permitted
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(content).catch((err) => {
        console.warn("navigator.clipboard.writeText failed:", err);
        // Fallback to legacy copy
        try {
          const textarea = document.createElement("textarea");
          textarea.value = content;
          // Avoid scrolling to bottom
          textarea.style.position = "fixed";
          textarea.style.top = "0";
          textarea.style.left = "0";
          textarea.style.width = "1px";
          textarea.style.height = "1px";
          textarea.style.padding = "0";
          textarea.style.border = "none";
          textarea.style.outline = "none";
          textarea.style.boxShadow = "none";
          textarea.style.background = "transparent";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          const successful = document.execCommand("copy");
          if (!successful) {
            console.warn("Fallback: copy command was unsuccessful");
          }
          document.body.removeChild(textarea);
        } catch (e) {
          console.warn("Fallback copy failed:", e);
        }
      });
      return;
    }

    // If Clipboard API isn't present, use legacy approach
    try {
      const textarea = document.createElement("textarea");
      textarea.value = content;
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.width = "1px";
      textarea.style.height = "1px";
      textarea.style.padding = "0";
      textarea.style.border = "none";
      textarea.style.outline = "none";
      textarea.style.boxShadow = "none";
      textarea.style.background = "transparent";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      if (!successful) {
        console.warn("Fallback: copy command was unsuccessful");
      }
      document.body.removeChild(textarea);
    } catch (e) {
      console.warn("Copy failed:", e);
    }
  };

  const showDeleteModal = (noteId: string) => {
    setNoteToDelete(noteId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteNote = () => {
    if (noteToDelete) {
      setNotes(prev => prev.filter(n => n.id !== noteToDelete));
      setNoteToDelete(null);
    }
    setDeleteModalOpen(false);
  };

  const cancelDeleteNote = () => {
    setNoteToDelete(null);
    setDeleteModalOpen(false);
  };

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

  const tatChartSize = 120;
  const tatCenterX = tatChartSize / 2;
  const tatCenterY = tatChartSize / 2;
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    outerR: number,
    innerR: number,
  ) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    const x1 = tatCenterX + outerR * Math.cos(startRad);
    const y1 = tatCenterY + outerR * Math.sin(startRad);
    const x2 = tatCenterX + outerR * Math.cos(endRad);
    const y2 = tatCenterY + outerR * Math.sin(endRad);

    const x3 = tatCenterX + innerR * Math.cos(endRad);
    const y3 = tatCenterY + innerR * Math.sin(endRad);
    const x4 = tatCenterX + innerR * Math.cos(startRad);
    const y4 = tatCenterY + innerR * Math.sin(startRad);

    return [
      "M",
      x1,
      y1,
      "A",
      outerR,
      outerR,
      0,
      largeArc,
      1,
      x2,
      y2,
      "L",
      x3,
      y3,
      "A",
      innerR,
      innerR,
      0,
      largeArc,
      0,
      x4,
      y4,
      "Z",
    ].join(" ");
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
          flex: "1 1 auto",
          alignSelf: "stretch",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          minHeight: "100vh",
          height: "auto",
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
          style={{
            display: "flex",
            marginTop: isDesktop ? "104px" : "96px",
            paddingBottom: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            borderRadius: "40px 0 0 0",
            position: "relative",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              display: "none",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "stretch",
              background:
                "linear-gradient(180deg, #FAFAFA 43.75%, rgba(255, 255, 255, 0.00) 100%)",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "72px",
                padding: "0 32px",
                alignItems: "center",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                {/* Search Bar */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "10px 14px",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      borderRadius: "8px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flex: "1 0 0",
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
                          d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          flex: "1 0 0",
                          overflow: "hidden",
                          color: "#717680",
                          textOverflow: "ellipsis",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Search
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "1px 4px",
                        alignItems: "flex-start",
                        borderRadius: "4px",
                        border: "1px solid #E9EAEB",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "18px",
                          position: "relative",
                        }}
                      >
                        ⌘K
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Create Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    position: "relative",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      padding: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "8px",
                      border: "2px solid rgba(255, 255, 255, 0.12)",
                      background: "#344698",
                      boxShadow:
                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
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
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        Quick Create
                      </div>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99935 6.66667V13.3333M6.66602 10H13.3327M18.3327 10C18.3327 14.6024 14.6017 18.3333 9.99935 18.3333C5.39698 18.3333 1.66602 14.6024 1.66602 10C1.66602 5.39763 5.39698 1.66667 9.99935 1.66667C14.6017 1.66667 18.3327 5.39763 18.3327 10Z"
                        stroke="#8D9BD8"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  width: "16px",
                  padding: "16px 8px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "1px",
                    height: "40px",
                    background: "#E9EAEB",
                    position: "relative",
                  }}
                />
              </div>

              {/* User Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  position: "relative",
                }}
              >
                {/* Notification Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "2px",
                    position: "relative",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      width: "40px",
                      padding: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "6px",
                      position: "relative",
                      background: "transparent",
                      border: "none",
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
                        d="M9.35493 21C10.0601 21.6224 10.9863 22 12.0008 22C13.0152 22 13.9414 21.6224 14.6466 21M18.0008 8C18.0008 6.4087 17.3686 4.88258 16.2434 3.75736C15.1182 2.63214 13.5921 2 12.0008 2C10.4095 2 8.88333 2.63214 7.75811 3.75736C6.63289 4.88258 6.00075 6.4087 6.00075 8C6.00075 11.0902 5.22122 13.206 4.35042 14.6054C3.61588 15.7859 3.24861 16.3761 3.26208 16.5408C3.27699 16.7231 3.31561 16.7926 3.46253 16.9016C3.59521 17 4.19334 17 5.38961 17H18.6119C19.8082 17 20.4063 17 20.539 16.9016C20.6859 16.7926 20.7245 16.7231 20.7394 16.5408C20.7529 16.3761 20.3856 15.7859 19.6511 14.6054C18.7803 13.206 18.0008 11.0902 18.0008 8Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* User Menu */}
                <div
                  style={{
                    display: "flex",
                    padding: "8px",
                    alignItems: "center",
                    gap: "16px",
                    borderRadius: "12px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "200px",
                      alignItems: "center",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                        aspectRatio: "1/1",
                        borderRadius: "9999px",
                        border: "1px solid rgba(0, 0, 0, 0.10)",
                        background:
                          "url(https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800) lightgray 50% / cover no-repeat",
                        position: "relative",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        Alexandra Fitzwilliam
                      </div>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                          color: "#535862",
                          textOverflow: "ellipsis",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        [User Role]
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Header */}
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
                padding: "0 32px",
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
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "20px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
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
                      flex: "1 0 0",
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
                      Sue Janes Order #{orderId || "38138"}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Report Disposition
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "4px 12px",
                          alignItems: "center",
                          borderRadius: "9999px",
                          border: "1px solid #ABEFC6",
                          background: "#ECFDF3",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#067647",
                            textAlign: "center",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Meets Hiring Requirements
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
                    <button
                      style={{
                        display: "flex",
                        minHeight: "36px",
                        padding: "6px 8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        position: "relative",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
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
                            color: "#535862",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          More Actions
                        </div>
                      </div>
                    </button>

                    <button
                      style={{
                        display: "flex",
                        minHeight: "36px",
                        padding: "6px 8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
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
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Add I-9
                        </div>
                      </div>
                    </button>

                    <button
                      style={{
                        display: "flex",
                        minHeight: "36px",
                        padding: "6px 8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
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
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Add to this report
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
                          d="M8.00065 5.33333V10.6667M5.33398 8H10.6673M14.6673 8C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8C1.33398 4.3181 4.31875 1.33333 8.00065 1.33333C11.6826 1.33333 14.6673 4.3181 14.6673 8Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      style={{
                        display: "flex",
                        minHeight: "36px",
                        padding: "6px 8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        border: "2px solid rgba(255, 255, 255, 0.12)",
                        background: "#344698",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
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
                            color: "#FFF",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          Main CTA
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              padding: "0 32px",
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
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* Left Column - Subject Overview */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "24px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "320px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 16px 0 16px",
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
                                Subject Overview
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    {/* General Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        General
                      </div>

                      {/* Information Items */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Name (LFM)
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Jeans, Sue
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          AKA
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          DDD, Sue
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Race
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Caucasian
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Gender
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Feminine
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Social Security Trace
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          777-77-7777
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "20px",
                            position: "relative",
                          }}
                        >
                          DOB
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          01/01/1980 (45 Years)
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        display: "flex",
                        padding: "4px 0",
                        alignItems: "center",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Address Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Address
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Address
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          1234 Fox ST Bossier
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          City
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Los Angeles
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Zip
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          71112
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Address Since
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          01/01/2024
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        display: "flex",
                        padding: "4px 0",
                        alignItems: "center",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Contact Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Contact
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Phone
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          +1 (555) 000-0000
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Email
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          suejanes@gmail.com
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        display: "flex",
                        padding: "4px 0",
                        alignItems: "center",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Local and National Identification Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Local and National Identification
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Label
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          [Value]
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        display: "flex",
                        padding: "4px 0",
                        alignItems: "center",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />
                    </div>

                    {/* Employment Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Employment
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Label
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          [Value]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div
                  style={{
                    display: "flex",
                    width: "320px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 16px 0 16px",
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
                                Notes
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    {/* Add new note section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Textarea input field */}
                      <div
                        style={{
                          display: "flex",
                          height: "180px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
                            flex: "1 0 0",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          {/* Label */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2px",
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
                              Add new note
                            </div>
                          </div>

                          {/* Textarea Input */}
                          <textarea
                            placeholder="Enter a description..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                addNote();
                              }
                            }}
                            style={{
                              display: "flex",
                              padding: "12px 14px",
                              alignItems: "flex-start",
                              gap: "8px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              position: "relative",
                              resize: "none",
                              outline: "none",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          />
                        </div>
                      </div>

                      {/* Send Button */}
                      <button
                        onClick={addNote}
                        disabled={!noteText.trim()}
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          position: "relative",
                          cursor: noteText.trim() ? "pointer" : "not-allowed",
                          opacity: noteText.trim() ? 1 : 0.6,
                        }}
                      >
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
                              color: "#FFF",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                              position: "relative",
                            }}
                          >
                            Send
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Messages list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignSelf: "stretch" }}>
                      {notes.map((n) => {
                        const isCurrentUser = n.author === currentUser;
                        return (
                          <div
                            key={n.id}
                            style={{
                              display: "flex",
                              justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                              alignItems: "flex-start",
                              gap: "12px",
                              alignSelf: "stretch",
                              position: "relative",
                            }}
                            onMouseEnter={() => setHoveredNoteId(n.id)}
                            onMouseLeave={() => setHoveredNoteId(null)}
                          >
                            {/* Avatar - only show for other users */}
                            {!isCurrentUser && (
                              <div
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  aspectRatio: "1/1",
                                  borderRadius: "9999px",
                                  border: "1px solid rgba(0, 0, 0, 0.10)",
                                  background: `url(${n.avatarUrl}) lightgray 50% / cover no-repeat`,
                                  position: "relative",
                                  flexShrink: 0,
                                }}
                              />
                            )}

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
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
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    flex: "1 0 0",
                                    overflow: "hidden",
                                    color: "#414651",
                                    textOverflow: "ellipsis",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  {isCurrentUser ? "You" : n.author}
                                </div>
                                <div
                                  style={{
                                    color: "#535862",
                                    fontFamily: "Roboto Mono, monospace",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "18px",
                                    position: "relative",
                                  }}
                                >
                                  {formatTimestamp(n.createdAt)}
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  padding: "8px 12px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  alignSelf: "stretch",
                                  minWidth: 0,
                                  borderRadius: isCurrentUser ? "8px 0px 8px 8px" : "0px 8px 8px 8px",
                                  border: "1px solid #E9EAEB",
                                  background: isCurrentUser ? "#FFF" : "#FAFAFA",
                                  position: "relative",
                                  overflow: hoveredNoteId === n.id ? "visible" : "hidden",
                                }}
                              >
                                {editingNoteId === n.id ? (
                                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignSelf: "stretch" }}>
                                    <textarea
                                      value={editText}
                                      onChange={(e) => setEditText(e.target.value)}
                                      style={{
                                        alignSelf: "stretch",
                                        color: "#181D27",
                                        fontFamily: "Public Sans",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "24px",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        resize: "none",
                                        minHeight: "24px",
                                      }}
                                    />
                                    <div style={{ display: "flex", gap: "8px" }}>
                                      <button
                                        onClick={() => saveEdit(n.id)}
                                        style={{
                                          padding: "4px 8px",
                                          borderRadius: "4px",
                                          border: "1px solid #D5D7DA",
                                          background: "#344698",
                                          color: "#FFF",
                                          fontSize: "12px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={cancelEdit}
                                        style={{
                                          padding: "4px 8px",
                                          borderRadius: "4px",
                                          border: "1px solid #D5D7DA",
                                          background: "#FFF",
                                          color: "#414651",
                                          fontSize: "12px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      alignSelf: "stretch",
                                      color: "#181D27",
                                      fontFamily: "Public Sans",
                                      fontSize: "16px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "24px",
                                      position: "relative",
                                      whiteSpace: "pre-wrap",
                                      overflowWrap: "anywhere",
                                      wordBreak: "break-word",
                                      hyphens: "auto",
                                    }}
                                  >
                                    {n.content}
                                  </div>
                                )}

                                {/* Action Panel - Only for current user's messages */}
                                {isCurrentUser && hoveredNoteId === n.id && editingNoteId !== n.id && (
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "6px 8px",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      position: "absolute",
                                      right: "-8px",
                                      bottom: "-20px",
                                      borderRadius: "8px",
                                      border: "1px solid #7B61FF",
                                      background: "#22262F",
                                      boxShadow: "0 20px 24px -4px rgba(255, 255, 255, 0.00), 0 8px 8px -4px rgba(255, 255, 255, 0.00), 0 3px 3px -1.5px rgba(255, 255, 255, 0.00)",
                                      zIndex: 10,
                                    }}
                                  >
                                    {/* Edit Button */}
                                    <button
                                      onClick={() => editNote(n.id)}
                                      style={{
                                        display: "flex",
                                        padding: "2px",
                                        alignItems: "center",
                                        borderRadius: "4px",
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        position: "relative",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
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
                                          d="M21 18L19.9999 19.094C19.4695 19.6741 18.7501 20 18.0001 20C17.2501 20 16.5308 19.6741 16.0004 19.094C15.4692 18.5151 14.75 18.1901 14.0002 18.1901C13.2504 18.1901 12.5311 18.5151 12 19.094M3 20H4.67454C5.16372 20 5.40832 20 5.63849 19.9447C5.84256 19.8957 6.03765 19.8149 6.2166 19.7053C6.41843 19.5816 6.59138 19.4086 6.93729 19.0627L19.5 6.49998C20.3285 5.67156 20.3285 4.32841 19.5 3.49998C18.6716 2.67156 17.3285 2.67156 16.5 3.49998L3.93726 16.0627C3.59136 16.4086 3.4184 16.5816 3.29472 16.7834C3.18506 16.9624 3.10425 17.1574 3.05526 17.3615C3 17.5917 3 17.8363 3 18.3255V20Z"
                                          stroke="#85888E"
                                          strokeWidth="1.33"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {/* Copy Button */}
                                    <button
                                      onClick={() => copyNote(n.content)}
                                      style={{
                                        display: "flex",
                                        padding: "2px",
                                        alignItems: "center",
                                        borderRadius: "4px",
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
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
                                          d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z"
                                          stroke="#61656C"
                                          strokeWidth="1.33"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                      onClick={() => showDeleteModal(n.id)}
                                      style={{
                                        display: "flex",
                                        width: "28px",
                                        padding: "2px",
                                        alignItems: "center",
                                        borderRadius: "4px",
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                      }}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ flexShrink: 0 }}
                                      >
                                        <path
                                          d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                          stroke="#61656C"
                                          strokeWidth="1.33"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                )}

                                {/* Action Panel - Copy only for other users' messages */}
                                {!isCurrentUser && hoveredNoteId === n.id && editingNoteId !== n.id && (
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "6px 8px",
                                      alignItems: "flex-start",
                                      gap: "6px",
                                      position: "absolute",
                                      right: "-8px",
                                      bottom: "-20px",
                                      borderRadius: "8px",
                                      border: "1px solid #7B61FF",
                                      background: "#22262F",
                                      boxShadow:
                                        "0 20px 24px -4px rgba(255, 255, 255, 0.00), 0 8px 8px -4px rgba(255, 255, 255, 0.00), 0 3px 3px -1.5px rgba(255, 255, 255, 0.00)",
                                      zIndex: 10,
                                    }}
                                  >
                                    <button
                                      onClick={() => copyNote(n.content)}
                                      style={{
                                        display: "flex",
                                        padding: "2px",
                                        alignItems: "center",
                                        borderRadius: "4px",
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
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
                                          d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z"
                                          stroke="#61656C"
                                          strokeWidth="1.33"
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
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Cycle Time Section */}
                <div
                  style={{
                    display: "flex",
                    width: "320px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 16px 0 16px",
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
                                Cycle Time
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Subject Cycle Time */}
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        Subject Cycle Time
                      </div>

                      {/* Progress Bar */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            height: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            position: "relative",
                          }}
                        >
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
                              width: "90%",
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
                          Business Days: 75.65
                        </div>
                      </div>

                      {/* Operating Hours */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Operating Hours
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          M-D 08:00-17:00
                        </div>
                      </div>

                      {/* Holidays */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Holidays
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          None
                        </div>
                      </div>

                      {/* Disclaimer */}
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        At the time the chart was generated, the following settings were in effect
                      </div>
                    </div>

                    {/* Divider */}
                    <svg
                      style={{
                        display: "flex",
                        padding: "4px 0",
                        alignItems: "center",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                      width="288"
                      height="9"
                      viewBox="0 0 288 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M288 5H0V4H288V5Z"
                        fill="#E9EAEB"
                      />
                    </svg>

                    {/* TAT Breakdown */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                          position: "relative",
                        }}
                      >
                        TAT Breakdown
                      </div>

                      {/* Pie Chart with Legend */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          position: "relative",
                        }}
                      >
                        {/* Pie Chart */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <svg
                            width={tatChartSize}
                            height={tatChartSize}
                            viewBox={`0 0 ${tatChartSize} ${tatChartSize}`}
                            style={{
                              width: "120px",
                              height: "120px",
                              position: "relative",
                            }}
                          >
                            {(() => {
                              const total = tatData.reduce((sum, item) => sum + item.value, 0);
                              const radius = (tatChartSize - 30) / 2;
                              const innerRadius = radius * 0.6;
                              let currentAngle = -90;
                              return tatData.map((segment, index) => {
                                const percentage = (segment.value / total) * 100;
                                const angle = (percentage / 100) * 360;
                                const d = createArcPath(
                                  currentAngle,
                                  currentAngle + angle,
                                  radius,
                                  innerRadius,
                                );
                                const isHovered = tatHoveredIndex === index;
                                const element = (
                                  <g key={index}>
                                    <path
                                      d={d}
                                      fill={segment.color}
                                      stroke="rgba(0, 0, 0, 0.1)"
                                      strokeWidth="0.5"
                                      style={{
                                        cursor: "pointer",
                                        transition: "all 0.2s ease-in-out",
                                      }}
                                      onMouseEnter={() => {
                                        setTatHoveredSegment(segment);
                                        setTatHoveredIndex(index);
                                      }}
                                      onMouseLeave={() => {
                                        setTatHoveredSegment(null);
                                        setTatHoveredIndex(null);
                                      }}
                                    />
                                    {isHovered && (
                                      <path
                                        d={d}
                                        fill="rgba(0, 0, 0, 0.4)"
                                        stroke="rgba(0, 0, 0, 0.1)"
                                        strokeWidth="0.5"
                                        style={{
                                          pointerEvents: "none",
                                          transition: "opacity 0.2s ease-in-out",
                                        }}
                                      />
                                    )}
                                  </g>
                                );
                                currentAngle += angle;
                                return element;
                              });
                            })()}
                          </svg>

                          {/* Tooltip - centered */}
                          {tatHoveredSegment && (
                            <div
                              style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "#0A0D12",
                                color: "#FFF",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                                boxShadow:
                                  "0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                pointerEvents: "none",
                                zIndex: 1000,
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              <div style={{ fontFamily: "Public Sans" }}>
                                {tatHoveredSegment.label} - {tatHoveredSegment.value}
                              </div>
                              <div
                                style={{
                                  color: "#D5D7DA",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  marginTop: "2px",
                                }}
                              >
                                See All
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Legend */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            position: "relative",
                          }}
                        >
                          {tatData.map((item, index) => {
                            const isHovered = tatHoveredIndex === index;
                            return (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={() => {
                                  setTatHoveredSegment(item);
                                  setTatHoveredIndex(index);
                                }}
                                onMouseLeave={() => {
                                  setTatHoveredSegment(null);
                                  setTatHoveredIndex(null);
                                }}
                              >
                                <div
                                  style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: isHovered ? "#181D27" : item.color,
                                    border: "0.5px solid rgba(0, 0, 0, 0.1)",
                                    flexShrink: 0,
                                    transition: "background-color 0.2s ease-in-out",
                                  }}
                                />
                                <div
                                  style={{
                                    color: isHovered ? "#181D27" : "#535862",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    transition: "color 0.2s ease-in-out",
                                  }}
                                >
                                  {item.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Footer Disclaimer */}
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                          position: "relative",
                        }}
                      >
                        The overall TAT ofr this search may have been affected by processes that are hidden from this repport
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requester Section */}
                <div
                  style={{
                    display: "flex",
                    width: "320px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 16px 0 16px",
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
                                Requester
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Account */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Account
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          csd/Cody
                        </div>
                      </div>

                      {/* Organization */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Organization
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Accio Data
                        </div>
                      </div>

                      {/* Requester */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Requester
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Alexandra Fitzwilliam
                        </div>
                      </div>

                      {/* Phone */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Phone
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          +1 (555) 000-0000
                        </div>
                      </div>

                      {/* Fax */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Fax
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          123456789
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Identifiers Section */}
                <div
                  style={{
                    display: "flex",
                    width: "320px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 16px 0 16px",
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
                                Billing Identifiers
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Label 1 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Label
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          [Value]
                        </div>
                      </div>

                      {/* Label 2 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Label
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          [Value]
                        </div>
                      </div>

                      {/* Label 3 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Label
                        </div>
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          [Value]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Report Summary */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "24px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "20px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0px",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
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
                                Report Summary
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() => setReportSummaryExpanded(!reportSummaryExpanded)}
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
                            position: "relative",
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
                              transform: reportSummaryExpanded ? "rotate(180deg)" : "rotate(0deg)",
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
                    </div>
                  </div>

                  {/* Report Summary Content */}
                  {reportSummaryExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Divider */}
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#E9EAEB",
                          margin: "4px 0",
                        }}
                      />

                      {/* Order Information Grid */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            height: "124px",
                            gridTemplateRows: "repeat(2, minmax(0, 1fr))",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            rowGap: "8px",
                            columnGap: "8px",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          {/* Order Number */}
                          <div
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              gridRow: "1 / span 1",
                              gridColumn: "1 / span 1",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              Order Number
                            </div>
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              812008
                            </div>
                          </div>

                          {/* Remote Order Number */}
                          <div
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              gridRow: "1 / span 1",
                              gridColumn: "2 / span 1",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              Remote Order Number
                            </div>
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              8120007
                            </div>
                          </div>

                          {/* Package */}
                          <div
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              gridRow: "1 / span 1",
                              gridColumn: "3 / span 1",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              Package
                            </div>
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              CSD Standard
                            </div>
                          </div>

                          {/* Order Date */}
                          <div
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              gridRow: "2 / span 1",
                              gridColumn: "1 / span 1",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              Order Date
                            </div>
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              4/30/25 11:13 AM Central
                            </div>
                          </div>

                          {/* Time First Completed */}
                          <div
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              gridRow: "2 / span 1",
                              gridColumn: "2 / span 1",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              Time First Completed
                            </div>
                            <div
                              style={{
                                alignSelf: "stretch",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              4/30/25 11:13 AM Central
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Data Table */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        {/* Named Search Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              Named Search
                            </div>
                          </div>
                          {/* Data rows */}
                          {[
                            "Sue Jeans",
                            "Sue Jeans",
                            "Sue Jeans",
                            "Sue Jeans",
                            "Sue DD",
                            "Sue DD",
                            "Sue DD",
                            "Sue Jeans",
                            "Sue Jeans",
                            "Sue Jeans",
                          ].map((name, index) => (
                            <div
                              key={index}
                              onMouseEnter={() => setHoveredRowIndex(index)}
                              onMouseLeave={() => setHoveredRowIndex(null)}
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: hoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <div
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                {name}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Search Type Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: "1 0 0",
                            position: "relative",
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              Search Type
                            </div>
                          </div>
                          {/* Data rows */}
                          {[
                            "Resume Validation",
                            "Employment at Jerrys",
                            "Employment at Hank",
                            "Education at Brown Community College",
                            "Professional References",
                            "MJD",
                            "Countywide Criminal History",
                            "5 Panel",
                            "CBSV",
                            "Nationwide Federal Crime",
                          ].map((searchType, index) => (
                            <div
                              key={index}
                              onMouseEnter={() => setHoveredRowIndex(index)}
                              onMouseLeave={() => setHoveredRowIndex(null)}
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: hoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <button
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                  gap: "4px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  position: "relative",
                                  width: "100%",
                                  flex: "1 0 0",
                                  textAlign: "left",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    flex: "1 0 0",
                                    overflow: "hidden",
                                    color: hoveredRowIndex === index ? "#1A234C" : "#273572",
                                    textOverflow: "ellipsis",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                    textDecoration: "underline",
                                    position: "relative",
                                    textAlign: "left",
                                  }}
                                  title={searchType}
                                >
                                  {searchType}
                                </div>
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* County Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              County
                            </div>
                          </div>
                          {/* Data rows */}
                          {[
                            "Harris",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "Bossier",
                            "Bossier",
                            "Bossier",
                            "Bossier",
                          ].map((county, index) => (
                            <div
                              key={index}
                              onMouseEnter={() => setHoveredRowIndex(index)}
                              onMouseLeave={() => setHoveredRowIndex(null)}
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: hoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {county && (
                                <div
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  {county}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* State Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              State
                            </div>
                          </div>
                          {/* Data rows */}
                          {[
                            "Texas",
                            "Texas",
                            "Texas",
                            "Texas",
                            "Texas",
                            "Texas",
                            "LA",
                            "LA",
                            "LA",
                            "LA",
                          ].map((state, index) => (
                            <div
                              key={index}
                              onMouseEnter={() => setHoveredRowIndex(index)}
                              onMouseLeave={() => setHoveredRowIndex(null)}
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: hoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <div
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                {state}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Research Results Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: "1 0 0",
                            position: "relative",
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              Research Results
                            </div>
                          </div>
                          {/* Data rows */}
                          {Array(10)
                            .fill("Completed - Verified")
                            .map((status, index) => (
                              <div
                                key={index}
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: hoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "2px 8px",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    border: "1px solid #ABEFC6",
                                    background: "#ECFDF3",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#067647",
                                      textAlign: "center",
                                      fontFamily: "Public Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "18px",
                                      position: "relative",
                                    }}
                                  >
                                    {status}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Search ID Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              Search ID
                            </div>
                          </div>
                          {/* Data rows */}
                          {Array(10)
                            .fill("845841254/451254")
                            .map((searchId, index) => (
                              <div
                                key={index}
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: hoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  {searchId}
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Documents Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: "1 0 0",
                            position: "relative",
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              Documents
                            </div>
                          </div>
                          {/* Data rows */}
                          {Array(10)
                            .fill("[File Name]")
                            .map((fileName, index) => (
                              <div
                                key={index}
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: hoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <button
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: hoveredRowIndex === index ? "#1A234C" : "#273572",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                      textDecoration: "underline",
                                      position: "relative",
                                    }}
                                  >
                                    {fileName}
                                  </div>
                                </button>
                              </div>
                            ))}
                        </div>

                        {/* View Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              width: "40px",
                              height: "36px",
                              padding: "6px 12px",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "relative",
                            }}
                          />
                          {/* Data rows */}
                          {Array(10)
                            .fill(0)
                            .map((_, index) => (
                              <div
                                key={index}
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: hoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <button
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: 0,
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
                                      d="M1.61342 8.47546C1.52262 8.3317 1.47723 8.25982 1.45182 8.14895C1.43273 8.06568 1.43273 7.93434 1.45182 7.85107C1.47723 7.7402 1.52262 7.66832 1.61341 7.52456C2.36369 6.33657 4.59693 3.33334 8.00027 3.33334C11.4036 3.33334 13.6369 6.33657 14.3871 7.52456C14.4779 7.66832 14.5233 7.7402 14.5487 7.85107C14.5678 7.93434 14.5678 8.06568 14.5487 8.14895C14.5233 8.25982 14.4779 8.3317 14.3871 8.47546C13.6369 9.66345 11.4036 12.6667 8.00027 12.6667C4.59693 12.6667 2.36369 9.66345 1.61342 8.47546Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M8.00027 10C9.10484 10 10.0003 9.10458 10.0003 8.00001C10.0003 6.89544 9.10484 6.00001 8.00027 6.00001C6.8957 6.00001 6.00027 6.89544 6.00027 8.00001C6.00027 9.10458 6.8957 10 8.00027 10Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Documents Section */}
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "20px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0px",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
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
                                Documents
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #F9DBAF",
                                  background: "#FEF6EE",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#B93815",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                  }}
                                >
                                  Pending Documents
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() => setDocumentsExpanded(!documentsExpanded)}
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
                            position: "relative",
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
                              transform: documentsExpanded ? "rotate(180deg)" : "rotate(0deg)",
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
                    </div>
                  </div>

                  {/* Documents Content */}
                  {documentsExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "24px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Pending Documents Section */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "24px",
                              position: "relative",
                            }}
                          >
                            Pending Documents
                          </div>
                          <button
                            style={{
                              display: "flex",
                              minHeight: "36px",
                              padding: "6px 8px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              position: "relative",
                              cursor: "pointer",
                            }}
                          >
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
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                View all combined
                              </div>
                            </div>
                          </button>
                        </div>

                        {/* Pending Documents Table */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          {/* Document Name Column */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              flex: "1 0 0",
                              position: "relative",
                            }}
                          >
                            {/* Header */}
                            <div
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: "#FFF",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                Document Name
                              </div>
                            </div>
                            {/* Data rows */}
                            {["SSA-89", "Resume", "Resume"].map((docName, index) => (
                              <div
                                key={index}
                                onMouseEnter={() => setDocumentsHoveredRowIndex(index)}
                                onMouseLeave={() => setDocumentsHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: documentsHoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <button
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: index === 0 ? "#273572" : "#181D27",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: index === 0 ? 600 : 500,
                                      lineHeight: "20px",
                                      textDecoration: index === 0 ? "underline" : "none",
                                      position: "relative",
                                    }}
                                  >
                                    {docName}
                                  </div>
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Documents Column */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              flex: "1 0 0",
                              position: "relative",
                            }}
                          >
                            {/* Header */}
                            <div
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: "#FFF",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                Documents
                              </div>
                            </div>
                            {/* Data rows */}
                            {["Click to Upload", "Click to Upload", "Click to Upload"].map((action, index) => (
                              <div
                                key={index}
                                onMouseEnter={() => setDocumentsHoveredRowIndex(index)}
                                onMouseLeave={() => setDocumentsHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: documentsHoveredRowIndex === index ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <button
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#273572",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                      textDecoration: "underline",
                                      position: "relative",
                                    }}
                                  >
                                    {action}
                                  </div>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Attached Documents Section */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "8px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "24px",
                              position: "relative",
                            }}
                          >
                            Attached Documents
                          </div>
                          <button
                            style={{
                              display: "flex",
                              minHeight: "36px",
                              padding: "6px 8px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              position: "relative",
                              cursor: "pointer",
                            }}
                          >
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
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  position: "relative",
                                }}
                              >
                                View all combined
                              </div>
                            </div>
                          </button>
                        </div>

                        {/* Attached Documents Table */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          {/* Document Name Column */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              flex: "1 0 0",
                              position: "relative",
                            }}
                          >
                            {/* Header */}
                            <div
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: "#FFF",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                Document Name
                              </div>
                            </div>
                            {/* Data rows */}
                            {[
                              "Applicant Release All",
                              "Background Check Disclosure All",
                              "Complete the fillable Form All",
                              "Download Sign and upload all",
                              "Driver's License"
                            ].map((docName, index) => (
                              <div
                                key={index + 100} // offset to avoid conflicts with pending docs
                                onMouseEnter={() => setDocumentsHoveredRowIndex(index + 100)}
                                onMouseLeave={() => setDocumentsHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: documentsHoveredRowIndex === index + 100 ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <button
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "4px",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    position: "relative",
                                    width: "100%",
                                    flex: "1 0 0",
                                    textAlign: "left",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "-webkit-box",
                                      WebkitBoxOrient: "vertical",
                                      WebkitLineClamp: 1,
                                      flex: "1 0 0",
                                      overflow: "hidden",
                                      color: "#273572",
                                      textOverflow: "ellipsis",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                      textDecoration: "underline",
                                      position: "relative",
                                      textAlign: "left",
                                    }}
                                    title={docName}
                                  >
                                    {docName}
                                  </div>
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Date Uploaded Column */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              position: "relative",
                            }}
                          >
                            {/* Header */}
                            <div
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: "#FFF",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                Date Uploaded
                              </div>
                            </div>
                            {/* Data rows */}
                            {Array(5).fill("2025-04-30 11:12:39").map((date, index) => (
                              <div
                                key={index + 100}
                                onMouseEnter={() => setDocumentsHoveredRowIndex(index + 100)}
                                onMouseLeave={() => setDocumentsHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: documentsHoveredRowIndex === index + 100 ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  {date}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Documents Column (Actions) */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              flex: "1 0 0",
                              position: "relative",
                            }}
                          >
                            {/* Header */}
                            <div
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background: "#FFF",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                Documents
                              </div>
                            </div>
                            {/* Data rows */}
                            {Array(5).fill(["Edit", "Delete", "Fax Document"]).map((actions, index) => (
                              <div
                                key={index + 100}
                                onMouseEnter={() => setDocumentsHoveredRowIndex(index + 100)}
                                onMouseLeave={() => setDocumentsHoveredRowIndex(null)}
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: documentsHoveredRowIndex === index + 100 ? "#F5F5F5" : "transparent",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                {actions.map((action, actionIndex) => (
                                  <button
                                    key={actionIndex}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "4px",
                                      background: "transparent",
                                      border: "none",
                                      cursor: "pointer",
                                      position: "relative",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#273572",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                        textDecoration: "underline",
                                        position: "relative",
                                      }}
                                    >
                                      {action}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Note Confirmation Modal */}
      {deleteModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
          }}
        >
          {/* Background Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(10, 13, 18, 0.7)",
            }}
            onClick={cancelDeleteNote}
          />

          {/* Modal */}
          <div
            style={{
              display: "flex",
              maxWidth: "400px",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "16px",
              background: "#FFF",
              boxShadow: "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
              position: "relative",
              zIndex: 1001,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "24px 24px 0 24px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                {/* Featured Icon */}
                <div
                  style={{
                    display: "flex",
                    width: "48px",
                    height: "48px",
                    padding: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "9999px",
                    background: "#FEE4E2",
                    position: "relative",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: "24px",
                      height: "24px",
                      flexShrink: 0,
                    }}
                  >
                    <path
                      d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 19.862C18.3854 20.4265 17.9265 20.8854 17.362 21.173C16.7202 21.5 15.8802 21.5 14.2 21.5H9.8C8.11984 21.5 7.27976 21.5 6.63803 21.173C6.07354 20.8854 5.6146 20.4265 5.32698 19.862C5 19.7202 5 18.8802 5 17.2V6"
                      stroke="#D92D20"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "2px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                      position: "relative",
                    }}
                  >
                    Delete Note
                  </div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    Are you sure you want to delete this note? This action cannot be undone.
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={cancelDeleteNote}
                style={{
                  display: "flex",
                  width: "44px",
                  height: "44px",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "24px",
                    height: "24px",
                    flexShrink: 0,
                  }}
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#A4A7AE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                paddingTop: "32px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 24px 24px 24px",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                {/* Cancel Button */}
                <button
                  onClick={cancelDeleteNote}
                  style={{
                    display: "flex",
                    padding: "12px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFF";
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    Cancel
                  </div>
                </button>

                {/* Delete Button */}
                <button
                  onClick={confirmDeleteNote}
                  style={{
                    display: "flex",
                    padding: "12px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: "#D92D20",
                    boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#B91C1C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#D92D20";
                  }}
                >
                  <div
                    style={{
                      color: "#FFF",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    Delete
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
