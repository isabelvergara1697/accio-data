import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { EVerifySection } from "../components/order-details/EVerifySection";
import { FivePanelsSection } from "../components/order-details/FivePanelsSection";
import { CreditEmploymentReportSection } from "../components/order-details/CreditEmploymentReportSection";
import { CBSVSection } from "../components/order-details/CBSVSection";
import { MotorVehicleDrivingHistorySection } from "../components/order-details/MotorVehicleDrivingHistorySection";
import { CredentialsSection } from "../components/order-details/CredentialsSection";
import AddAkasModal, { AkaEntry } from "../components/ui/add-akas-modal";
import { ArchiveOrderModal } from "../components/ui/archive-order-modal";
import { UploadApplicantReleaseModal } from "../components/ui/upload-applicant-release-modal";
import {
  RequestDocumentUploadModal,
  RequestDocumentData,
} from "../components/ui/request-document-upload-modal";
import { SendReportModal } from "../components/ui/send-report-modal";
import { CustomerServiceModal } from "../components/ui/customer-service-modal";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { MoreActionsSubmenu } from "../components/ui/more-actions-submenu";
import { Checkbox } from "../components/ui/checkbox";
import { User, X, HelpCircle, ChevronDown } from "lucide-react";

type Note = {
  id: string;
  author: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
};

type TatSegment = {
  label: string;
  value: number;
  color: string;
};

type ReportSummarySearchLink = {
  label: string;
  targetId: string;
};

type ReportSummaryRow = {
  namedSearch: string;
  searchType?: ReportSummarySearchLink;
  county?: string;
  state?: string;
  researchResult: string;
  searchId: string;
  documentLabel: string;
};

const REPORT_SUMMARY_GRID_TEMPLATE =
  "50px 120px 240px 220px 140px 110px 200px 220px 60px";

const REPORT_SUMMARY_HEADER_STYLE: React.CSSProperties = {
  color: "#717680",
  fontFamily: "Public Sans",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "18px",
  position: "relative",
  whiteSpace: "nowrap",
};

const REPORT_SUMMARY_TEXT_STYLE: React.CSSProperties = {
  color: "#181D27",
  fontFamily: "Public Sans",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "20px",
  position: "relative",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const REPORT_SUMMARY_LINK_STYLE: React.CSSProperties = {
  ...REPORT_SUMMARY_TEXT_STYLE,
  color: "#273572",
  textDecoration: "underline",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

const REPORT_SUMMARY_ROWS: ReportSummaryRow[] = [
  {
    namedSearch: "Sue Jeans",
    searchType: { label: "Subject", targetId: "subject" },
    county: "Harris",
    state: "Texas",
    researchResult: "Completed - Verified",
    searchId: "845841254/451254",
    documentLabel: "Subject_Profile.pdf",
  },
  {
    namedSearch: "Sue Jeans",
    searchType: {
      label: "Resume Validation",
      targetId: "resume-validation",
    },
    county: "Harris",
    state: "Texas",
    researchResult: "Completed - Verified",
    searchId: "845841254/451255",
    documentLabel: "Resume_Submission.pdf",
  },
  {
    namedSearch: "Sue Jeans",
    searchType: {
      label: "Employment at Jerrys",
      targetId: "employment-at-jerrys-tx",
    },
    county: "",
    state: "Texas",
    researchResult: "Completed - Verified",
    searchId: "845841254/451256",
    documentLabel: "Employment_Verification.pdf",
  },
  {
    namedSearch: "Sue Jeans",
    searchType: {
      label: "Education at Brown Community College",
      targetId: "education-at-brown-community-college",
    },
    county: "",
    state: "Texas",
    researchResult: "Completed - Verified",
    searchId: "845841254/451257",
    documentLabel: "Education_Transcript.pdf",
  },
  {
    namedSearch: "Sue DD",
    searchType: {
      label: "Countywide Criminal History",
      targetId: "countywide-criminal-history",
    },
    county: "Bossier",
    state: "LA",
    researchResult: "Completed - Verified",
    searchId: "845841254/451258",
    documentLabel: "Criminal_History_Report.pdf",
  },
  {
    namedSearch: "Sue DD",
    searchType: { label: "MJD", targetId: "mjd" },
    county: "",
    state: "Texas",
    researchResult: "Completed - Verified",
    searchId: "845841254/451259",
    documentLabel: "MJD_Process_Record.pdf",
  },
  {
    namedSearch: "Sue Jeans",
    searchType: {
      label: "Nationwide Federal Crime",
      targetId: "nationwide-federal-crime",
    },
    county: "Bossier",
    state: "LA",
    researchResult: "Completed - Verified",
    searchId: "845841254/451260",
    documentLabel: "Federal_Crime_Check.pdf",
  },
  {
    namedSearch: "Sue DD",
    searchType: {
      label: "Professional References",
      targetId: "professional-references",
    },
    county: "",
    state: "Texas",
    researchResult: "Completed - Verified",
    searchId: "845841254/451261",
    documentLabel: "Professional_References.docx",
  },
  {
    namedSearch: "Sue DD",
    searchType: {
      label: "Credentials-Professional License #1",
      targetId: "credentials-professional-license",
    },
    county: "",
    state: "Texas",
    researchResult: "Completed - Verified",
    searchId: "845841254/451262",
    documentLabel: "License_Credential.pdf",
  },
  {
    namedSearch: "Sue Jeans",
    searchType: {
      label: "Motor Vehicle Driving History",
      targetId: "motor-vehicle-driving-history",
    },
    county: "Bossier",
    state: "LA",
    researchResult: "Completed - Verified",
    searchId: "845841254/451263",
    documentLabel: "Motor_Vehicle_Record.pdf",
  },
  {
    namedSearch: "Sue Jeans",
    searchType: { label: "E-Verify", targetId: "e-verify" },
    county: "Bossier",
    state: "LA",
    researchResult: "Completed - Verified",
    searchId: "845841254/451264",
    documentLabel: "E-Verify_Confirmation.pdf",
  },
  {
    namedSearch: "Sue Jeans",
    searchType: { label: "5 Panel", targetId: "five-panels-section" },
    county: "Bossier",
    state: "LA",
    researchResult: "Completed - Verified",
    searchId: "845841254/451265",
    documentLabel: "Drug_Screen_Result.pdf",
  },
  {
    namedSearch: "Sue Jeans",
    searchType: { label: "CBSV", targetId: "cbsv-section" },
    county: "Bossier",
    state: "LA",
    researchResult: "Completed - Verified",
    searchId: "845841254/451266",
    documentLabel: "CBSV_Response.pdf",
  },
];

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
  const storageKey = `order-notes-${orderId ?? "default"}`;
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
  const [tatHoveredSegment, setTatHoveredSegment] = useState<TatSegment | null>(
    null,
  );
  const [tatHoveredIndex, setTatHoveredIndex] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [reportSummaryExpanded, setReportSummaryExpanded] = useState(true);
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [documentsExpanded, setDocumentsExpanded] = useState(true);
  const [documentsHoveredRowIndex, setDocumentsHoveredRowIndex] = useState<
    number | null
  >(null);
  const [subjectExpanded, setSubjectExpanded] = useState(true);
  const [resumeValidationExpanded, setResumeValidationExpanded] =
    useState(true);
  const [employmentExpanded, setEmploymentExpanded] = useState(true);
  const [employmentHoveredRowIndex, setEmploymentHoveredRowIndex] = useState<
    number | null
  >(null);
  const [educationExpanded, setEducationExpanded] = useState(true);
  const [educationHoveredRowIndex, setEducationHoveredRowIndex] = useState<
    number | null
  >(null);
  const [criminalHistoryExpanded, setCriminalHistoryExpanded] = useState(true);
  const [
    adjudicationMatrixHoveredRowIndex,
    setAdjudicationMatrixHoveredRowIndex,
  ] = useState<number | null>(null);
  const [mjdExpanded, setMjdExpanded] = useState(true);
  const [federalCrimeExpanded, setFederalCrimeExpanded] = useState(true);
  const [professionalReferencesExpanded, setProfessionalReferencesExpanded] =
    useState(true);
  const [
    professionalReferencesHoveredRowIndex,
    setProfessionalReferencesHoveredRowIndex,
  ] = useState<number | null>(null);
  const [motorVehicleExpanded, setMotorVehicleExpanded] = useState(true);
  const [credentialsExpanded, setCredentialsExpanded] = useState(true);
  const [creditEmploymentExpanded, setCreditEmploymentExpanded] =
    useState(true);
  const [eVerifyExpanded, setEVerifyExpanded] = useState(true);
  const [eVerifyHoveredRowIndex, setEVerifyHoveredRowIndex] = useState<
    number | null
  >(null);
  const [fivePanelsExpanded, setFivePanelsExpanded] = useState(true);
  const [fivePanelsHoveredRowIndex, setFivePanelsHoveredRowIndex] = useState<
    number | null
  >(null);
  const [cbsvExpanded, setCbsvExpanded] = useState(true);
  const [cbsvHoveredRowIndex, setCbsvHoveredRowIndex] = useState<number | null>(
    null,
  );
  const [specialNoticeExpanded, setSpecialNoticeExpanded] = useState(true);
  const [specialNoticeHoveredRowIndex, setSpecialNoticeHoveredRowIndex] =
    useState<number | null>(null);

  // Report Summary checkbox selection state
  const [selectedReportRows, setSelectedReportRows] = useState<Set<number>>(
    new Set(),
  );
  const [selectAllReportRows, setSelectAllReportRows] = useState(false);

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");

  // AKAs modal state
  const [akasModalOpen, setAkasModalOpen] = useState(false);
  const [savedAkas, setSavedAkas] = useState<AkaEntry[]>([]);

  // Archive Order modal state
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);

  // Upload Applicant Release modal state
  const [uploadReleaseModalOpen, setUploadReleaseModalOpen] = useState(false);

  // Request Document Upload modal state
  const [requestDocumentModalOpen, setRequestDocumentModalOpen] =
    useState(false);

  // Send Report modal state
  const [sendReportModalOpen, setSendReportModalOpen] = useState(false);

  // Customer Service modal state
  const [customerServiceModalOpen, setCustomerServiceModalOpen] =
    useState(false);

  // Manual rescreening state
  const [manualRescreening, setManualRescreening] = useState<string>("");

  // Report Visibility state
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [reportVisibleTo, setReportVisibleTo] = useState<
    Array<{
      id: string;
      name: string;
      avatar?: string;
    }>
  >([
    { id: "1", name: "John Doe", avatar: "/placeholder-avatar-1.jpg" },
    { id: "2", name: "Jane Smith", avatar: "/placeholder-avatar-2.jpg" },
  ]);

  // Mock team members data
  const teamMembers = [
    { id: "3", name: "Alex Johnson", avatar: "/placeholder-avatar-3.jpg" },
    { id: "4", name: "Sarah Wilson", avatar: "/placeholder-avatar-4.jpg" },
    { id: "5", name: "Michael Brown", avatar: "/placeholder-avatar-5.jpg" },
    { id: "6", name: "Emily Davis", avatar: "/placeholder-avatar-6.jpg" },
  ];

  const stackedLayout = isMobile || isTablet;
  const mainContentHorizontalPadding = isMobile
    ? "0 16px"
    : isTablet
      ? "0 24px"
      : "0 32px";
  const mainColumnsGap = stackedLayout ? "16px" : "20px";
  const leftColumnWidth = isDesktop ? "320px" : "100%";
  const stickyHeaderLeftOffset = isDesktop ? (sidebarCollapsed ? 80 : 296) : 0;

  // Collapse/Expand all state
  const [allSectionsCollapsed, setAllSectionsCollapsed] = useState(false);

  // More Actions submenu state
  const [moreActionsOpen, setMoreActionsOpen] = useState(false);
  const [moreActionsPosition, setMoreActionsPosition] = useState({
    x: 0,
    y: 0,
  });
  const [moreActionsIsSticky, setMoreActionsIsSticky] = useState(false);
  const moreActionsRef = useRef<HTMLButtonElement | null>(null);
  const stickyMoreActionsRef = useRef<HTMLButtonElement | null>(null);
  const enabledMoreActionIds = useMemo(
    () => [
      "order-additional-searches",
      "order-criminal-records",
      "archive-order",
      "adverse-action-process",
      "upload-applicant-release",
      "request-doc-upload",
      "send-report-copy",
      "customer-service",
    ],
    [],
  );

  // Sticky header state
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const stickyHeaderRef = useRef<HTMLDivElement | null>(null);
  const [stickyHeight, setStickyHeight] = useState<number>(0);
  const mobileHeaderRef = useRef<HTMLDivElement | null>(null);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState<number>(96);
  const nonDesktopHeaderOffsetValue = Math.max(
    Math.round(mobileHeaderHeight + 16),
    80,
  );
  const baseHeaderOffset = isDesktop ? 104 : nonDesktopHeaderOffsetValue;

  // Sticky navigation state for billing identifiers section
  const [showStickyNavigation, setShowStickyNavigation] = useState(false);
  const [stickyNavigationOpen, setStickyNavigationOpen] = useState(false);
  const stickyNavigationRef = useRef<HTMLDivElement | null>(null);
  const [stickyNavHeight, setStickyNavHeight] = useState<number>(0);

  // Accurate in-page anchor scroll accounting for fixed headers
  const scrollToSection = (
    targetId: string,
    options?: { closeQuickNavigation?: boolean },
  ) => {
    const { closeQuickNavigation = false } = options ?? {};

    const performScroll = () => {
      if (typeof document === "undefined" || typeof window === "undefined") {
        return;
      }
      const el = document.getElementById(targetId);
      if (!el) return;
      const headerOffset =
        showStickyHeader && stickyHeaderRef.current
          ? stickyHeaderRef.current.offsetHeight
          : baseHeaderOffset;
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    };

    if (closeQuickNavigation) {
      setStickyNavigationOpen(false);
    }

    if (
      closeQuickNavigation &&
      !isDesktop &&
      typeof window !== "undefined" &&
      typeof window.requestAnimationFrame === "function"
    ) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(performScroll);
      });
      return;
    }

    performScroll();
  };

  const collapseAllSections = () => {
    setReportSummaryExpanded(false);
    setDocumentsExpanded(false);
    setSubjectExpanded(false);
    setResumeValidationExpanded(false);
    setEmploymentExpanded(false);
    setEducationExpanded(false);
    setCriminalHistoryExpanded(false);
    setMjdExpanded(false);
    setFederalCrimeExpanded(false);
    setProfessionalReferencesExpanded(false);
    setMotorVehicleExpanded(false);
    setCredentialsExpanded(false);
    setCreditEmploymentExpanded(false);
    setEVerifyExpanded(false);
    setFivePanelsExpanded(false);
    setCbsvExpanded(false);
    setSpecialNoticeExpanded(false);
    setAllSectionsCollapsed(true);
  };

  const expandAllSections = () => {
    setReportSummaryExpanded(true);
    setDocumentsExpanded(true);
    setSubjectExpanded(true);
    setResumeValidationExpanded(true);
    setEmploymentExpanded(true);
    setEducationExpanded(true);
    setCriminalHistoryExpanded(true);
    setMjdExpanded(true);
    setFederalCrimeExpanded(true);
    setProfessionalReferencesExpanded(true);
    setMotorVehicleExpanded(true);
    setCredentialsExpanded(true);
    setCreditEmploymentExpanded(true);
    setEVerifyExpanded(true);
    setFivePanelsExpanded(true);
    setCbsvExpanded(true);
    setSpecialNoticeExpanded(true);
    setAllSectionsCollapsed(false);
  };

  const handleCollapseExpandAll = () => {
    if (allSectionsCollapsed) {
      expandAllSections();
    } else {
      collapseAllSections();
    }
  };

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
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setEditText(note.content);
    }
  };

  const saveEdit = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId ? { ...n, content: editText.trim() } : n,
      ),
    );
    setEditingNoteId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditText("");
  };

  const copyNote = (content: string) => {
    // Prefer async Clipboard API when available and permitted
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
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
      setNotes((prev) => prev.filter((n) => n.id !== noteToDelete));
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

  // Scroll listener for sticky header and billing identifiers navigation
  useEffect(() => {
    const handleScroll = () => {
      const subjectElement = document.getElementById("subject");
      if (subjectElement) {
        const rect = subjectElement.getBoundingClientRect();
        // Show sticky header when subject section is scrolled past (top of element is above viewport)
        setShowStickyHeader(rect.top < 0);
      }

      const billingIdentifiersElement = document.getElementById(
        "billing-identifiers",
      );
      if (billingIdentifiersElement) {
        if (isDesktop) {
          const rect = billingIdentifiersElement.getBoundingClientRect();
          // Show sticky navigation when billing identifiers section is scrolled past
          setShowStickyNavigation(rect.top < 0);
        } else {
          setShowStickyNavigation(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  // Measure sticky header height to offset content when active
  useEffect(() => {
    const updateHeight = () => {
      if (stickyHeaderRef.current) {
        setStickyHeight(stickyHeaderRef.current.offsetHeight);
      }
    };
    if (showStickyHeader) {
      updateHeight();
      window.addEventListener("resize", updateHeight);
    }
    return () => window.removeEventListener("resize", updateHeight);
  }, [showStickyHeader]);

  // Measure mobile/tablet header height for layout offsets
  useLayoutEffect(() => {
    const updateMobileHeaderHeight = () => {
      if (mobileHeaderRef.current) {
        const nextHeight =
          mobileHeaderRef.current.getBoundingClientRect().height;
        setMobileHeaderHeight((prev) =>
          Math.abs(prev - nextHeight) > 0.5 ? nextHeight : prev,
        );
      }
    };
    updateMobileHeaderHeight();
    window.addEventListener("resize", updateMobileHeaderHeight);
    return () => window.removeEventListener("resize", updateMobileHeaderHeight);
  }, [isDesktop, isMobile, showMobileUserMenu]);

  useEffect(() => {
    if (!isDesktop) {
      setShowStickyNavigation(true);
      setStickyNavigationOpen(true);
    }
  }, [isDesktop]);

  // Measure sticky navigation height
  useEffect(() => {
    const updateNavHeight = () => {
      if (stickyNavigationRef.current) {
        setStickyNavHeight(stickyNavigationRef.current.offsetHeight);
      }
    };
    if (showStickyNavigation) {
      updateNavHeight();
      window.addEventListener("resize", updateNavHeight);
    }
    return () => window.removeEventListener("resize", updateNavHeight);
  }, [showStickyNavigation]);

  const handleSignOut = () => {
    console.log("Sign out");
  };

  // AKAs modal handlers
  const handleOpenAkasModal = () => {
    setAkasModalOpen(true);
  };

  const handleCloseAkasModal = () => {
    setAkasModalOpen(false);
  };

  const handleSaveAkas = (akas: AkaEntry[]) => {
    setSavedAkas(akas);
    console.log("Saved AKAs:", akas);
    // Here you would typically send the data to your backend
  };

  // Archive Order modal handlers
  const handleArchiveOrder = () => {
    console.log("Archiving order:", orderId);
    // Here you would typically send the archive request to your backend
    // Then navigate to the invites-orders page on the orders tab
    navigate("/invites-orders");
  };

  const handleCloseArchiveModal = () => {
    setArchiveModalOpen(false);
  };

  const handleCloseUploadModal = () => {
    setUploadReleaseModalOpen(false);
  };

  const handleUploadFile = (fileName: string, file: File) => {
    console.log("Uploading file:", fileName, file);
    // Here you would typically send the file to your backend
    // For now, just log it and show a success message
    alert(`File "${fileName}" uploaded successfully!`);
  };

  const handleCloseRequestDocumentModal = () => {
    setRequestDocumentModalOpen(false);
  };

  const handleSendDocumentRequest = (data: RequestDocumentData) => {
    console.log("Sending document request:", data);
    // Here you would typically send the request to your backend
    // For now, just log it and show a success message
    alert(`Document request sent to ${data.to}!`);
  };

  const handleCloseSendReportModal = () => {
    setSendReportModalOpen(false);
  };

  const handleSendReport = (email: string) => {
    console.log("Sending report to:", email);
    // Here you would typically send the request to your backend
    // For now, just log it and show a success message
    alert(`Report will be sent to ${email}!`);
  };

  const handleCloseCustomerServiceModal = () => {
    setCustomerServiceModalOpen(false);
  };

  const handleSubmitCustomerService = (inquiry: string) => {
    console.log("Submitting customer service inquiry:", inquiry);
    // Here you would typically send the inquiry to your backend
    // For now, just log it and show a success message
    alert(
      "Your inquiry has been submitted. Our support team will get back to you shortly!",
    );
  };

  // Report Visibility handlers
  const handleAddUser = (userId: string) => {
    const user = teamMembers.find((member) => member.id === userId);
    if (user && !reportVisibleTo.find((existing) => existing.id === userId)) {
      setReportVisibleTo((prev) => [...prev, user]);
      setSelectedUser("");
    }
  };

  const handleRemoveUser = (userId: string) => {
    setReportVisibleTo((prev) => prev.filter((user) => user.id !== userId));
  };

  // More Actions handlers
  const handleMoreActionsClick = (isSticky: boolean = false) => {
    const buttonRef = isSticky ? stickyMoreActionsRef : moreActionsRef;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth =
        typeof window !== "undefined" ? window.innerWidth : 0;
      const menuWidth = viewportWidth ? Math.min(350, viewportWidth - 32) : 350;
      const minX = 16;
      const maxX = viewportWidth ? viewportWidth - menuWidth - 16 : rect.left;

      let xPosition = rect.right - menuWidth;
      if (isSticky && viewportWidth) {
        xPosition = 16;
      } else if (viewportWidth) {
        xPosition = Math.max(minX, Math.min(xPosition, maxX));
      }

      setMoreActionsPosition({
        x: xPosition,
        y: rect.bottom,
      });
      setMoreActionsIsSticky(isSticky);
      setMoreActionsOpen(true);
    }
  };

  const handleMoreActionsClose = () => {
    setMoreActionsOpen(false);
  };

  const handleMoreAction = (action: string) => {
    console.log(`More action: ${action}`);
    // Handle different actions here
    switch (action) {
      case "pre-adverse-general":
        // Handle pre-adverse general action
        break;
      case "adverse-action-letter":
        // Handle adverse action letter
        break;
      case "order-additional-searches":
        navigate("/online-ordering");
        break;
      case "order-criminal-records":
        navigate(`/quickscreen/${orderId}`);
        break;
      case "archive-order":
        setArchiveModalOpen(true);
        break;
      case "adverse-action-process":
        navigate(`/adverse-action-process/${orderId}`);
        break;
      case "upload-applicant-release":
        setUploadReleaseModalOpen(true);
        break;
      case "request-doc-upload":
        setRequestDocumentModalOpen(true);
        break;
      case "download-fax-release":
        // Handle download and fax release
        break;
      case "upload-supporting-docs":
        // Handle upload supporting docs
        break;
      case "view-attached-docs":
        // Handle view attached docs
        break;
      case "request-doc-upload":
        // Handle request document upload
        break;
      case "email-requester":
        // Handle email requester
        break;
      case "email-ordering-user":
        // Handle email ordering user
        break;
      case "send-report-copy":
        setSendReportModalOpen(true);
        break;
      case "email-completion-notification":
        // Handle email completion notification
        break;
      case "customer-service":
        setCustomerServiceModalOpen(true);
        break;
      default:
        console.log(`Unhandled action: ${action}`);
    }
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
          marginLeft: isDesktop ? `${stickyHeaderLeftOffset}px` : "0",
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
        {!showStickyHeader && (
          <>
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
              headerRef={mobileHeaderRef}
            />
          </>
        )}

        {/* Sticky Header */}
        {showStickyHeader && (
          <div
            ref={stickyHeaderRef}
            style={{
              position: "fixed",
              top: "0",
              left: `${stickyHeaderLeftOffset}px`,
              right: "0",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: isMobile ? "12px" : "16px",
              padding: isMobile
                ? "12px 16px"
                : isTablet
                  ? "8px 32px"
                  : "16px 24px",
              background: "#FFF",
              borderBottom: "1px solid #E9EAEB",
              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              width: "auto",
              boxSizing: "border-box",
            }}
            className="sticky-header"
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "flex-end",
                alignContent: isMobile ? "stretch" : "flex-end",
                gap: isMobile ? "12px" : "20px 16px",
                alignSelf: "stretch",
                flexWrap: isMobile ? "nowrap" : "wrap",
                position: "relative",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
              className="header-content"
            >
              <div
                style={{
                  display: "flex",
                  minWidth: isMobile ? "0" : "320px",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: isMobile ? "1 1 auto" : "1 0 0",
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
                  className="order-title"
                >
                  Sue Janes Order #38138
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
                      maxWidth: "100%",
                      minWidth: 0,
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
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      Meets Hiring Requirements
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "12px",
                  position: "relative",
                  flexWrap: "wrap",
                  maxWidth: "100%",
                  minWidth: 0,
                  flex: "1 1 auto",
                  alignSelf: "stretch",
                }}
                className="sticky-header-actions-desktop"
              >
                {/* More Actions - Ghost Button */}
                <button
                  ref={stickyMoreActionsRef}
                  onClick={() => handleMoreActionsClick(true)}
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
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

                {/* Add I-9 - Secondary Button */}
                <button
                  onClick={() => navigate("/i9-order")}
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_sticky_i9)">
                      <path
                        d="M8.00065 5.33333V10.6667M5.33398 8H10.6673M14.6673 8C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8C1.33398 4.3181 4.31875 1.33333 8.00065 1.33333C11.6826 1.33333 14.6673 4.3181 14.6673 8Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_sticky_i9">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>

                {/* Add AKAs - Secondary Button */}
                <button
                  onClick={handleOpenAkasModal}
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
                      Add AKAs
                    </div>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_sticky_akas)">
                      <path
                        d="M8.00065 5.33333V10.6667M5.33398 8H10.6673M14.6673 8C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8C1.33398 4.3181 4.31875 1.33333 8.00065 1.33333C11.6826 1.33333 14.6673 4.3181 14.6673 8Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_sticky_akas">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>

                {/* Add to this Order - Primary Button */}
                <button
                  onClick={() => navigate("/online-ordering")}
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
                      Add to this Order
                    </div>
                  </div>
                </button>

                {/* Divider */}
                <div
                  style={{
                    width: "1px",
                    height: "24px",
                    background: "#E9EAEB",
                  }}
                />

                {/* Collapse/Expand All - Secondary Button */}
                <button
                  onClick={handleCollapseExpandAll}
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
                      {allSectionsCollapsed ? "Expand All" : "Collapse All"}
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
                      d="M4.66602 10L7.99935 13.3333L11.3327 10M4.66602 6L7.99935 2.66667L11.3327 6"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Simplified Mobile Buttons - Hidden by default, shown on mobile */}
              <div
                style={{
                  display: "none",
                  alignItems: "center",
                  gap: "12px",
                  alignSelf: "stretch",
                  position: "relative",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                className="sticky-header-actions-mobile"
              >
                {/* Actions Button - Primary */}
                <button
                  ref={stickyMoreActionsRef}
                  onClick={() => handleMoreActionsClick(true)}
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    flex: "1 1 0%",
                    minWidth: 0,
                    width: "100%",
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
                      Actions
                    </div>
                  </div>
                </button>

                {/* Collapse All Button - Secondary */}
                <button
                  onClick={handleCollapseExpandAll}
                  style={{
                    display: "flex",
                    minHeight: "36px",
                    padding: "6px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    flex: "1 1 0%",
                    minWidth: 0,
                    width: "100%",
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
                      {allSectionsCollapsed ? "Expand All" : "Collapse All"}
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
                      d="M4.66602 10L7.99935 13.3333L11.3327 10M4.66602 6L7.99935 2.66667L11.3327 6"
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
        )}

        {/* Sticky Quick Navigation */}
        {(isDesktop ? showStickyNavigation : true) && (
          <div
            ref={stickyNavigationRef}
            style={{
              position: "fixed",
              bottom: isMobile ? "16px" : "24px",
              left: isDesktop ? "112px" : "16px",
              right: isDesktop || isTablet ? "auto" : "16px",
              zIndex: 999,
              display: "flex",
              width: isDesktop ? "320px" : isTablet ? "296px" : "auto",
              maxWidth: isDesktop ? "320px" : isTablet ? "296px" : "520px",
              padding: "12px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              borderRadius: "10px",
              border: "1px solid #E9EAEB",
              background: "#FFF",
              boxShadow:
                "0 4px 6px -1px rgba(10, 13, 18, 0.10), 0 2px 4px -2px rgba(10, 13, 18, 0.06)",
              boxSizing: "border-box",
            }}
          >
            {/* Header with hamburger menu, title and close button */}
            <div
              style={{
                display: "flex",
                height: "36px",
                padding: "8px 0",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                borderRadius: "6px",
                position: "relative",
              }}
            >
              <button
                onClick={() => setStickyNavigationOpen(!stickyNavigationOpen)}
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  position: "relative",
                  background: "transparent",
                  border: "none",
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
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8H14M2 4H14M2 12H14"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flex: "1 0 0",
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
                  Quick Navigation
                </div>
              </div>
              {isDesktop && (
                <button
                  onClick={() => setShowStickyNavigation(false)}
                  style={{
                    display: "flex",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    position: "relative",
                    background: "transparent",
                    border: "none",
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
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.3327 4.66669L4.66602 11.3334M4.66602 4.66669L11.3327 11.3334"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Navigation Links - Show when expanded */}
            {stickyNavigationOpen && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0px",
                  alignSelf: "stretch",
                  position: "relative",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {/* Report Summary */}
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setStickyNavigationOpen(false);
                  }}
                  style={{
                    display: "flex",
                    height: "36px",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Report Summary
                  </div>
                </button>

                {/* Documents */}
                <button
                  onClick={() => {
                    scrollToSection("documents-section", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    height: "36px",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                      }}
                    >
                      Pending Documents
                    </div>
                  </div>
                </button>

                {/* Subject */}
                <button
                  onClick={() => {
                    scrollToSection("subject", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    height: "36px",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Subject
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Resume Validation */}
                <button
                  onClick={() => {
                    scrollToSection("resume-validation", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    height: "36px",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Resume Validation
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Employment */}
                <button
                  onClick={() => {
                    scrollToSection("employment-at-jerrys-tx", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
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
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Employment #1, Jerrys, TX
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Education */}
                <button
                  onClick={() => {
                    scrollToSection("education-at-brown-community-college", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
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
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Education #1, Major, Brown Community College
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Criminal History */}
                <button
                  onClick={() => {
                    scrollToSection("countywide-criminal-history", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
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
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Countywide Criminal History Bossie, LA - Years: 10 - Sue
                    Jeans
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* MJD */}
                <button
                  onClick={() => {
                    scrollToSection("mjd", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    MJD
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Nationwide Federal Crime */}
                <button
                  onClick={() => {
                    scrollToSection("nationwide-federal-crime", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Nationwide Federal Crime
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Professional References */}
                <button
                  onClick={() => {
                    scrollToSection("professional-references", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Professional References
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Credentials - Professional License */}
                <button
                  onClick={() => {
                    scrollToSection("credentials-professional-license", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Credentials - Professional License #1
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Motor Vehicle Driving History */}
                <button
                  onClick={() => {
                    scrollToSection("motor-vehicle-driving-history", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Motor Vehicle Driving History
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Credit Employment Report */}
                <button
                  onClick={() => {
                    scrollToSection("credit-employment-report", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Credit Employment Report
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* E-Verify */}
                <button
                  onClick={() => {
                    scrollToSection("e-verify", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    E-Verify
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #F9DBAF",
                      background: "#FEF6EE",
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
                      }}
                    >
                      Pending
                    </div>
                  </div>
                </button>

                {/* 5 Panel */}
                <button
                  onClick={() => {
                    scrollToSection("five-panels-section", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    5 Panels
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #F9DBAF",
                      background: "#FEF6EE",
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
                      }}
                    >
                      Pending
                    </div>
                  </div>
                </button>

                {/* CBSV */}
                <button
                  onClick={() => {
                    scrollToSection("cbsv-section", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    CBSV
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>

                {/* Special Notice */}
                <button
                  onClick={() => {
                    scrollToSection("special-notice-section", {
                      closeQuickNavigation: true,
                    });
                  }}
                  style={{
                    display: "flex",
                    padding: "8px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
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
                    Special Notice
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "2px 8px",
                      alignItems: "center",
                      borderRadius: "9999px",
                      border: "1px solid #ABEFC6",
                      background: "#ECFDF3",
                    }}
                  >
                    <div
                      style={{
                        color: "#067647",
                        textAlign: "center",
                        fontFamily: "Public Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Completed - Verified
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        <main
          style={{
            display: "flex",
            marginTop: showStickyHeader
              ? `${stickyHeight}px`
              : `${baseHeaderOffset}px`,
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
                        ���K
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
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
              className="page-header-container-order"
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
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                  }}
                  className="header-content"
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isMobile ? "0" : "320px",
                      width: "100%",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: isMobile ? "1 1 auto" : "1 0 0",
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
                      className="order-title"
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
                          maxWidth: "100%",
                          minWidth: 0,
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
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
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
                    className="order-actions-container"
                  >
                    {/* More Actions - Ghost Button */}
                    <button
                      ref={moreActionsRef}
                      onClick={() => handleMoreActionsClick(false)}
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
                      className="order-action-btn"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F5F5F5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
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

                    {/* Add I-9 - Secondary Button */}
                    <button
                      onClick={() => navigate("/i9-order")}
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
                      className="order-action-btn"
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_add_i9)">
                          <path
                            d="M8.00065 5.33333V10.6667M5.33398 8H10.6673M14.6673 8C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8C1.33398 4.3181 4.31875 1.33333 8.00065 1.33333C11.6826 1.33333 14.6673 4.3181 14.6673 8Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_add_i9">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>

                    {/* Add AKAs - Secondary Button */}
                    <button
                      onClick={handleOpenAkasModal}
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
                      className="order-action-btn"
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
                          Add AKAs
                        </div>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_add_akas)">
                          <path
                            d="M8.00065 5.33333V10.6667M5.33398 8H10.6673M14.6673 8C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8C1.33398 4.3181 4.31875 1.33333 8.00065 1.33333C11.6826 1.33333 14.6673 4.3181 14.6673 8Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_add_akas">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>

                    {/* Add to this Order - Primary Button */}
                    <button
                      onClick={() => navigate("/online-ordering")}
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
                      className="order-action-btn"
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
                          Add to this Order
                        </div>
                      </div>
                    </button>

                    {/* Divider */}
                    <div
                      style={{
                        width: "1px",
                        height: "24px",
                        background: "#E9EAEB",
                      }}
                      className="order-actions-divider"
                    />

                    {/* Collapse/Expand All - Secondary Button */}
                    <button
                      onClick={handleCollapseExpandAll}
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
                      className="order-action-btn"
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
                          {allSectionsCollapsed ? "Expand All" : "Collapse All"}
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
                          d="M4.66602 10L7.99935 13.3333L11.3327 10M4.66602 6L7.99935 2.66667L11.3327 6"
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
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              padding: mainContentHorizontalPadding,
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
                flexDirection: stackedLayout ? "column" : "row",
                alignItems: "stretch",
                gap: mainColumnsGap,
                alignSelf: "stretch",
                position: "relative",
                minWidth: "0",
                width: "100%",
              }}
            >
              {/* Left Column - Subject Overview */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: stackedLayout ? "16px" : "24px",
                  position: "relative",
                  width: leftColumnWidth,
                  maxWidth: "100%",
                  minWidth: "0",
                  alignSelf: stackedLayout ? "stretch" : "flex-start",
                  flex: stackedLayout ? "1 1 auto" : "0 0 auto",
                }}
              >
                <div
                  id="subject"
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                    minWidth: "0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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

                {/* Manual Rescreening Section */}
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Manual Rescreening
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
                      border: "1px solid #E9EAEB",
                      borderTop: "none",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                      Is this order on manual rescreening schedule?
                    </div>

                    <RadioGroup
                      value={manualRescreening}
                      onValueChange={setManualRescreening}
                      className="flex flex-col gap-3 self-stretch"
                    >
                      <div className="flex items-start gap-2">
                        <RadioGroupItem
                          value="yes"
                          id="manual-rescreening-yes"
                          className="mt-1 h-4 w-4 border-[#D5D7DA] text-[#344698]"
                        />
                        <label
                          htmlFor="manual-rescreening-yes"
                          className="flex-1 cursor-pointer text-sm font-medium text-[#414651]"
                          style={{
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <RadioGroupItem
                          value="no"
                          id="manual-rescreening-no"
                          className="mt-1 h-4 w-4 border-[#D5D7DA] text-[#344698]"
                        />
                        <label
                          htmlFor="manual-rescreening-no"
                          className="flex-1 cursor-pointer text-sm font-medium text-[#414651]"
                          style={{
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          No
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Notes Section */}
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                    minWidth: "0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        alignSelf: "stretch",
                      }}
                    >
                      {notes.map((n) => {
                        const isCurrentUser = n.author === currentUser;
                        return (
                          <div
                            key={n.id}
                            style={{
                              display: "flex",
                              justifyContent: isCurrentUser
                                ? "flex-end"
                                : "flex-start",
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
                                  flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                  borderRadius: isCurrentUser
                                    ? "8px 0px 8px 8px"
                                    : "0px 8px 8px 8px",
                                  border: "1px solid #E9EAEB",
                                  background: isCurrentUser
                                    ? "#FFF"
                                    : "#FAFAFA",
                                  position: "relative",
                                  overflow:
                                    hoveredNoteId === n.id
                                      ? "visible"
                                      : "hidden",
                                }}
                              >
                                {editingNoteId === n.id ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "8px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <textarea
                                      value={editText}
                                      onChange={(e) =>
                                        setEditText(e.target.value)
                                      }
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
                                    <div
                                      style={{ display: "flex", gap: "8px" }}
                                    >
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
                                {isCurrentUser &&
                                  hoveredNoteId === n.id &&
                                  editingNoteId !== n.id && (
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
                                          e.currentTarget.style.background =
                                            "rgba(255, 255, 255, 0.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background =
                                            "transparent";
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
                                          e.currentTarget.style.background =
                                            "rgba(255, 255, 255, 0.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background =
                                            "transparent";
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
                                          e.currentTarget.style.background =
                                            "rgba(255, 255, 255, 0.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background =
                                            "transparent";
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
                                {!isCurrentUser &&
                                  hoveredNoteId === n.id &&
                                  editingNoteId !== n.id && (
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
                                          e.currentTarget.style.background =
                                            "rgba(255, 255, 255, 0.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background =
                                            "transparent";
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
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                    minWidth: "0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                        At the time the chart was generated, the following
                        settings were in effect
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
                              const total = tatData.reduce(
                                (sum, item) => sum + item.value,
                                0,
                              );
                              const radius = (tatChartSize - 30) / 2;
                              const innerRadius = radius * 0.6;
                              let currentAngle = -90;
                              return tatData.map((segment, index) => {
                                const percentage =
                                  (segment.value / total) * 100;
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
                                          transition:
                                            "opacity 0.2s ease-in-out",
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
                                {tatHoveredSegment.label} -{" "}
                                {tatHoveredSegment.value}
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
                                    backgroundColor: isHovered
                                      ? "#181D27"
                                      : item.color,
                                    border: "0.5px solid rgba(0, 0, 0, 0.1)",
                                    flexShrink: 0,
                                    transition:
                                      "background-color 0.2s ease-in-out",
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
                        The overall TAT ofr this search may have been affected
                        by processes that are hidden from this repport
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requester Section */}
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                    minWidth: "0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                  id="billing-identifiers"
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                    minWidth: "0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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

                {/* Report Visibility Section */}
                <div
                  style={{
                    display: "flex",
                    width: "100%",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Report Visibility
                              </div>
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
                              Allow others access this report
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
                      background: "#FFF",
                      position: "relative",
                    }}
                  >
                    {/* Add New User Section */}
                    <div className="flex w-full flex-col gap-1.5">
                      <div className="flex items-center gap-0.5">
                        <label
                          htmlFor="add-user-select"
                          className="text-sm font-medium text-[#414651]"
                          style={{
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          Add New user
                        </label>
                        <span className="text-sm text-[#344698]">*</span>
                        <div className="ml-0.5 flex h-4 w-4 items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_help_circle)">
                              <path
                                d="M6.05967 5.99992C6.21641 5.55436 6.52578 5.17866 6.93298 4.93934C7.34018 4.70002 7.81894 4.61254 8.28446 4.69239C8.74998 4.77224 9.17222 5.01427 9.47639 5.3756C9.78057 5.73694 9.94705 6.19427 9.94634 6.66659C9.94634 7.99992 7.94634 8.66659 7.94634 8.66659M7.99967 11.3333H8.00634M14.6663 7.99992C14.6663 11.6818 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6818 1.33301 7.99992C1.33301 4.31802 4.31778 1.33325 7.99967 1.33325C11.6816 1.33325 14.6663 4.31802 14.6663 7.99992Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_help_circle">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      <Select
                        value={selectedUser}
                        onValueChange={handleAddUser}
                      >
                        <SelectTrigger className="flex h-[44px] w-full items-center gap-2 rounded-lg border border-[#D5D7DA] bg-white px-[14px] py-[10px] shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
                          <User className="h-6 w-6 text-[#A4A7AE]" />
                          <SelectValue
                            placeholder="Select team member"
                            className="flex-1 text-base text-[#717680]"
                            style={{
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
                          />
                          <ChevronDown className="h-6 w-6 text-[#A4A7AE]" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers
                            .filter(
                              (member) =>
                                !reportVisibleTo.find(
                                  (existing) => existing.id === member.id,
                                ),
                            )
                            .map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-4 w-4">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  {member.name}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Report Visible To Section */}
                    <div className="flex w-full flex-col gap-1">
                      <div
                        className="text-base text-[#717680]"
                        style={{
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Report Visible to:
                      </div>

                      <div className="flex w-full flex-col gap-2">
                        {reportVisibleTo.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-[3px] rounded-md border border-[#D5D7DA] bg-white px-1 py-0.5"
                          >
                            <div className="flex flex-1 items-center gap-[5px] pl-1">
                              <Avatar className="h-4 w-4 border border-[rgba(0,0,0,0.1)]">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="text-xs">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span
                                className="flex-1 text-sm font-medium text-[#414651]"
                                style={{
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                {user.name}
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveUser(user.id)}
                              className="flex items-center justify-center rounded-sm p-0.5 text-[#A4A7AE] transition-colors hover:bg-[#F5F6F7]"
                            >
                              <X className="h-6 w-6" />
                            </button>
                          </div>
                        ))}
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
                  gap: stackedLayout ? "16px" : "24px",
                  flex: "1 1 0",
                  position: "relative",
                  minWidth: "0",
                  maxWidth: isDesktop
                    ? `calc(100vw - ${(sidebarCollapsed ? 80 : 296) + 404}px)`
                    : "100%",
                  width: "100%",
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
                    minWidth: "0",
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
                        padding: isMobile
                          ? "20px 16px 0 16px"
                          : "20px 24px 0 24px",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                          onClick={() =>
                            setReportSummaryExpanded(!reportSummaryExpanded)
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
                              transform: reportSummaryExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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
                        padding: isMobile
                          ? "12px 16px 20px 16px"
                          : "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
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
                            display: isMobile ? "flex" : "grid",
                            flexDirection: isMobile ? "column" : undefined,
                            height: isMobile ? "auto" : "124px",
                            gridTemplateRows: isMobile
                              ? undefined
                              : "repeat(2, minmax(0, 1fr))",
                            gridTemplateColumns: isMobile
                              ? undefined
                              : "repeat(3, minmax(0, 1fr))",
                            rowGap: isMobile ? undefined : "8px",
                            columnGap: isMobile ? undefined : "8px",
                            gap: isMobile ? "8px" : undefined,
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
                              gridRow: isMobile ? undefined : "1 / span 1",
                              gridColumn: isMobile ? undefined : "1 / span 1",
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
                              gridRow: isMobile ? undefined : "1 / span 1",
                              gridColumn: isMobile ? undefined : "2 / span 1",
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
                              gridRow: isMobile ? undefined : "1 / span 1",
                              gridColumn: isMobile ? undefined : "3 / span 1",
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
                              gridRow: isMobile ? undefined : "2 / span 1",
                              gridColumn: isMobile ? undefined : "1 / span 1",
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
                              gridRow: isMobile ? undefined : "2 / span 1",
                              gridColumn: isMobile ? undefined : "2 / span 1",
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

                      {/* Report Summary Links Table */}
                      <div
                        style={{
                          width: "100%",
                          overflowX: "auto",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "stretch",
                            alignSelf: "stretch",
                            position: "relative",
                            minWidth: "1200px",
                            width: "max-content",
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: REPORT_SUMMARY_GRID_TEMPLATE,
                              alignItems: "center",
                              padding: "6px 12px",
                              gap: "12px",
                              borderBottom: "1px solid #E9EAEB",
                              background: "#FFF",
                              position: "sticky",
                              top: 0,
                              zIndex: 1,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <Checkbox
                                checked={selectAllReportRows}
                                onCheckedChange={(checked) => {
                                  setSelectAllReportRows(!!checked);
                                  if (checked) {
                                    setSelectedReportRows(
                                      new Set(
                                        REPORT_SUMMARY_ROWS.map((_, i) => i),
                                      ),
                                    );
                                  } else {
                                    setSelectedReportRows(new Set());
                                  }
                                }}
                              />
                              <div
                                style={{
                                  ...REPORT_SUMMARY_HEADER_STYLE,
                                  flex: "1 0 0",
                                }}
                              >
                                Show on PDF
                              </div>
                            </div>
                            <div style={REPORT_SUMMARY_HEADER_STYLE}>
                              Named Search
                            </div>
                            <div style={REPORT_SUMMARY_HEADER_STYLE}>
                              Search Type
                            </div>
                            <div style={REPORT_SUMMARY_HEADER_STYLE}>
                              Research Results
                            </div>
                            <div style={REPORT_SUMMARY_HEADER_STYLE}>
                              County
                            </div>
                            <div style={REPORT_SUMMARY_HEADER_STYLE}>State</div>
                            <div style={REPORT_SUMMARY_HEADER_STYLE}>
                              Search ID
                            </div>
                            <div style={REPORT_SUMMARY_HEADER_STYLE}>
                              Documents
                            </div>
                            <div
                              style={{
                                ...REPORT_SUMMARY_HEADER_STYLE,
                                textAlign: "center",
                              }}
                            ></div>
                          </div>

                          {REPORT_SUMMARY_ROWS.map((row, index) => {
                            const isHovered = hoveredRowIndex === index;
                            const isLastRow =
                              index === REPORT_SUMMARY_ROWS.length - 1;

                            return (
                              <div
                                key={row.searchId + "-" + index}
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                                style={{
                                  display: "grid",
                                  gridTemplateColumns:
                                    REPORT_SUMMARY_GRID_TEMPLATE,
                                  alignItems: "center",
                                  padding: "12px",
                                  gap: "12px",
                                  borderBottom: isLastRow
                                    ? "none"
                                    : "1px solid #E9EAEB",
                                  background: isHovered
                                    ? "#F5F5F5"
                                    : "transparent",
                                  transition: "background-color 0.2s ease",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    checked={selectedReportRows.has(index)}
                                    onCheckedChange={(checked) => {
                                      const newSelected = new Set(
                                        selectedReportRows,
                                      );
                                      if (checked) {
                                        newSelected.add(index);
                                      } else {
                                        newSelected.delete(index);
                                        setSelectAllReportRows(false);
                                      }
                                      setSelectedReportRows(newSelected);

                                      // Update select all state
                                      if (
                                        newSelected.size ===
                                        REPORT_SUMMARY_ROWS.length
                                      ) {
                                        setSelectAllReportRows(true);
                                      }
                                    }}
                                  />
                                </div>
                                <div style={REPORT_SUMMARY_TEXT_STYLE}>
                                  {row.namedSearch}
                                </div>

                                {row.searchType ? (
                                  <a
                                    href={"#" + row.searchType.targetId}
                                    style={REPORT_SUMMARY_LINK_STYLE}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      scrollToSection(row.searchType.targetId);
                                    }}
                                  >
                                    {row.searchType.label}
                                  </a>
                                ) : (
                                  <div style={REPORT_SUMMARY_TEXT_STYLE}>���</div>
                                )}

                                <div
                                  style={{
                                    display: "inline-flex",
                                    padding: "2px 8px",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    border: "1px solid #ABEFC6",
                                    background: "#ECFDF3",
                                    position: "relative",
                                    maxWidth: "100%",
                                    justifySelf: "flex-start",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#067647",
                                      textAlign: "center",
                                      fontFamily: "Public Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "18px",
                                      position: "relative",
                                    }}
                                  >
                                    {row.researchResult}
                                  </div>
                                </div>

                                <div style={REPORT_SUMMARY_TEXT_STYLE}>
                                  {row.county && row.county.trim().length > 0
                                    ? row.county
                                    : "����"}
                                </div>

                                <div style={REPORT_SUMMARY_TEXT_STYLE}>
                                  {row.state && row.state.trim().length > 0
                                    ? row.state
                                    : "—"}
                                </div>

                                <div style={REPORT_SUMMARY_TEXT_STYLE}>
                                  {row.searchId}
                                </div>

                                <a
                                  href="#"
                                  style={{
                                    ...REPORT_SUMMARY_LINK_STYLE,
                                    fontWeight: 600,
                                  }}
                                  onClick={(event) => event.preventDefault()}
                                >
                                  {row.documentLabel}
                                </a>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
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
                                      d="M1.61342 8.47543C1.52262 8.33167 1.47723 8.25979 1.45182 8.14892C1.43273 8.06565 1.43273 7.93431 1.45182 7.85104C1.47723 7.74017 1.52262 7.66829 1.61341 7.52453C2.36369 6.33654 4.59693 3.33331 8.00027 3.33331C11.4036 3.33331 13.6369 6.33654 14.3871 7.52453C14.4779 7.66829 14.5233 7.74017 14.5487 7.85104C14.5678 7.93431 14.5678 8.06565 14.5487 8.14892C14.5233 8.25979 14.4779 8.33167 14.3871 8.47543C13.6369 9.66342 11.4036 12.6666 8.00027 12.6666C4.59693 12.6666 2.36369 9.66342 1.61342 8.47543Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M8.00027 9.99998C9.10484 9.99998 10.0003 9.10455 10.0003 7.99998C10.0003 6.89541 9.10484 5.99998 8.00027 5.99998C6.8957 5.99998 6.00027 6.89541 6.00027 7.99998C6.00027 9.10455 6.8957 9.99998 8.00027 9.99998Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Documents Section */}
                <div
                  id="documents-section"
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
                    minWidth: "0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                  maxWidth: "100%",
                                  minWidth: 0,
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
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
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
                          onClick={() =>
                            setDocumentsExpanded(!documentsExpanded)
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
                              transform: documentsExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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
                            width: "100%",
                            overflowX: "auto",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              alignSelf: "stretch",
                              position: "relative",
                              minWidth: isMobile ? "0" : "960px",
                              width: isMobile ? "100%" : "max-content",
                            }}
                          >
                            {/* Document Name Column */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: isMobile ? "0 0 80px" : "1 0 0",
                                width: isMobile ? "80px" : "auto",
                                minWidth: isMobile ? "80px" : "0",
                                maxWidth: isMobile ? "80px" : "none",
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
                                  width: "100%",
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
                              {["SSA-89", "Resume", "Resume"].map(
                                (docName, index) => (
                                  <div
                                    key={index}
                                    onMouseEnter={() =>
                                      setDocumentsHoveredRowIndex(index)
                                    }
                                    onMouseLeave={() =>
                                      setDocumentsHoveredRowIndex(null)
                                    }
                                    style={{
                                      display: "flex",
                                      height: "36px",
                                      padding: "12px",
                                      alignItems: "center",
                                      gap: "8px",
                                      alignSelf: "stretch",
                                      borderBottom: "1px solid #E9EAEB",
                                      background:
                                        documentsHoveredRowIndex === index
                                          ? "#F5F5F5"
                                          : "transparent",
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
                                      }}
                                    >
                                      <div
                                        style={{
                                          color:
                                            index === 0 ? "#273572" : "#181D27",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: index === 0 ? 600 : 500,
                                          lineHeight: "20px",
                                          textDecoration:
                                            index === 0 ? "underline" : "none",
                                          position: "relative",
                                          width: "100%",
                                          maxWidth: "100%",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {docName}
                                      </div>
                                    </button>
                                  </div>
                                ),
                              )}
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
                              {[
                                "Click to Upload",
                                "Click to Upload",
                                "Click to Upload",
                              ].map((action, index) => (
                                <div
                                  key={index}
                                  onMouseEnter={() =>
                                    setDocumentsHoveredRowIndex(index)
                                  }
                                  onMouseLeave={() =>
                                    setDocumentsHoveredRowIndex(null)
                                  }
                                  style={{
                                    display: "flex",
                                    height: "36px",
                                    padding: "12px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderBottom: "1px solid #E9EAEB",
                                    background:
                                      documentsHoveredRowIndex === index
                                        ? "#F5F5F5"
                                        : "transparent",
                                    position: "relative",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      const fileNames = [
                                        "SSA-89",
                                        "Resume",
                                        "Resume",
                                      ];
                                      setUploadFileName(
                                        fileNames[index] || "Document",
                                      );
                                      setUploadModalOpen(true);
                                    }}
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
                            width: "100%",
                            overflowX: "auto",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              alignSelf: "stretch",
                              position: "relative",
                              minWidth: isMobile ? "0" : "960px",
                              width: isMobile ? "100%" : "max-content",
                            }}
                          >
                            {/* Document Name Column */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: isMobile ? "0 0 80px" : "1 0 0",
                                width: isMobile ? "80px" : "auto",
                                minWidth: isMobile ? "80px" : "0",
                                maxWidth: isMobile ? "80px" : "none",
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
                                  width: "100%",
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
                                "Driver's License",
                              ].map((docName, index) => (
                                <div
                                  key={index + 100} // offset to avoid conflicts with pending docs
                                  onMouseEnter={() =>
                                    setDocumentsHoveredRowIndex(index + 100)
                                  }
                                  onMouseLeave={() =>
                                    setDocumentsHoveredRowIndex(null)
                                  }
                                  style={{
                                    display: "flex",
                                    height: "36px",
                                    padding: "12px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderBottom: "1px solid #E9EAEB",
                                    background:
                                      documentsHoveredRowIndex === index + 100
                                        ? "#F5F5F5"
                                        : "transparent",
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
                                        display: "block",
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
                                        width: "100%",
                                        maxWidth: "100%",
                                        whiteSpace: "nowrap",
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
                              {Array(5)
                                .fill("2025-04-30 11:12:39")
                                .map((date, index) => (
                                  <div
                                    key={index + 100}
                                    onMouseEnter={() =>
                                      setDocumentsHoveredRowIndex(index + 100)
                                    }
                                    onMouseLeave={() =>
                                      setDocumentsHoveredRowIndex(null)
                                    }
                                    style={{
                                      display: "flex",
                                      height: "36px",
                                      padding: "12px",
                                      alignItems: "center",
                                      alignSelf: "stretch",
                                      borderBottom: "1px solid #E9EAEB",
                                      background:
                                        documentsHoveredRowIndex === index + 100
                                          ? "#F5F5F5"
                                          : "transparent",
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
                              {Array(5)
                                .fill(["Edit", "Delete", "Fax Document"])
                                .map((actions, index) => (
                                  <div
                                    key={index + 100}
                                    onMouseEnter={() =>
                                      setDocumentsHoveredRowIndex(index + 100)
                                    }
                                    onMouseLeave={() =>
                                      setDocumentsHoveredRowIndex(null)
                                    }
                                    style={{
                                      display: "flex",
                                      height: "36px",
                                      padding: "12px",
                                      alignItems: "center",
                                      gap: "8px",
                                      alignSelf: "stretch",
                                      borderBottom: "1px solid #E9EAEB",
                                      background:
                                        documentsHoveredRowIndex === index + 100
                                          ? "#F5F5F5"
                                          : "transparent",
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
                    </div>
                  )}
                </div>

                {/* Subject Section */}
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
                    minWidth: "0",
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
                        padding: isMobile
                          ? "20px 16px 0 16px"
                          : "20px 24px 0 24px",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Subject
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #ABEFC6",
                                  background: "#ECFDF3",
                                  position: "relative",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    color: "#067647",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  Completed - Verified
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() => setSubjectExpanded(!subjectExpanded)}
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
                              transform: subjectExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* Subject Content */}
                  {subjectExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: isMobile
                          ? "12px 16px 20px 16px"
                          : "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
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
                          {/* Requester Information Title */}
                          <div
                            style={{
                              alignSelf: "stretch",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "24px",
                              position: "relative",
                            }}
                          >
                            Requester Information
                          </div>

                          {/* First Row: First Name, Middle Name, Last Name */}
                          <div
                            style={{
                              display: isMobile ? "flex" : "grid",
                              flexDirection: isMobile ? "column" : undefined,
                              height: isMobile ? "auto" : "52px",
                              rowGap: "8px",
                              columnGap: "8px",
                              gap: isMobile ? "8px" : undefined,
                              alignSelf: "stretch",
                              gridTemplateRows: isMobile
                                ? undefined
                                : "fit-content(100%)",
                              gridTemplateColumns: isMobile
                                ? undefined
                                : "repeat(3, minmax(0, 1fr))",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "1 / span 1",
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
                                First Name
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
                                Alexandra
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "2 / span 1",
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
                                Middle Name
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
                                Johnson
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "3 / span 1",
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
                                Last Name
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
                                Smith
                              </div>
                            </div>
                          </div>

                          {/* AKA's Section */}
                          <div
                            style={{
                              display: "flex",
                              padding: "16px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "12px",
                              alignSelf: "stretch",
                              borderRadius: "10px",
                              border: "1px solid #E9EAEB",
                              background: "#F5F5F5",
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
                              AKA's
                            </div>

                            <div
                              style={{
                                display: isMobile ? "flex" : "grid",
                                flexDirection: isMobile ? "column" : undefined,
                                height: isMobile ? "auto" : "52px",
                                rowGap: "8px",
                                columnGap: "8px",
                                gap: isMobile ? "8px" : undefined,
                                alignSelf: "stretch",
                                gridTemplateRows: isMobile
                                  ? undefined
                                  : "fit-content(100%)",
                                gridTemplateColumns: isMobile
                                  ? undefined
                                  : "repeat(3, minmax(0, 1fr))",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "4px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                  gridRow: isMobile ? undefined : "1 / span 1",
                                  gridColumn: isMobile
                                    ? undefined
                                    : "1 / span 1",
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
                                  Other First Name
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
                                  Alexander
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "4px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                  gridRow: isMobile ? undefined : "1 / span 1",
                                  gridColumn: isMobile
                                    ? undefined
                                    : "2 / span 1",
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
                                  Other Middle Name
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
                                  J
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "4px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                  gridRow: isMobile ? undefined : "1 / span 1",
                                  gridColumn: isMobile
                                    ? undefined
                                    : "3 / span 1",
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
                                  Other Last Name
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
                                  Smith T
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Second Grid: DOB, Zip Code, Address / City, State, Country */}
                          <div
                            style={{
                              display: isMobile ? "flex" : "grid",
                              flexDirection: isMobile ? "column" : undefined,
                              height: isMobile ? "auto" : "120px",
                              rowGap: isMobile ? "8px" : "16px",
                              columnGap: "16px",
                              gap: isMobile ? "8px" : undefined,
                              alignSelf: "stretch",
                              gridTemplateRows: isMobile
                                ? undefined
                                : "fit-content(100%) minmax(0, 1fr)",
                              gridTemplateColumns: isMobile
                                ? undefined
                                : "repeat(3, minmax(0, 1fr))",
                              position: "relative",
                            }}
                          >
                            {/* Row 1 */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "1 / span 1",
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
                                DOB (MM/DD/YYYY)
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
                                18/12/1991
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "2 / span 1",
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
                                Zip Code
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
                                080102
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "3 / span 1",
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
                                Address
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
                                Street 123
                              </div>
                            </div>

                            {/* Row 2 */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "2 / span 1",
                                gridColumn: isMobile ? undefined : "1 / span 1",
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
                                City
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
                                City ABC
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "2 / span 1",
                                gridColumn: isMobile ? undefined : "2 / span 1",
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
                                State
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
                                AL, Alabama
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "2 / span 1",
                                gridColumn: isMobile ? undefined : "3 / span 1",
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
                                Country
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
                                USA
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

                          {/* FCRA Purpose and Criminal Records */}
                          <div
                            style={{
                              display: isMobile ? "flex" : "grid",
                              flexDirection: isMobile ? "column" : undefined,
                              height: isMobile ? "auto" : "52px",
                              rowGap: isMobile ? "8px" : "16px",
                              columnGap: "16px",
                              gap: isMobile ? "8px" : undefined,
                              alignSelf: "stretch",
                              gridTemplateRows: isMobile
                                ? undefined
                                : "fit-content(100%)",
                              gridTemplateColumns: isMobile
                                ? undefined
                                : "repeat(2, minmax(0, 1fr))",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "1 / span 1",
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
                                FCRA Purpose
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
                                Employment by Hire or Contract
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "2 / span 1",
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
                                Applicant has know Criminal Records?
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
                                [Category]
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

                          {/* Applicant Phone and Email */}
                          <div
                            style={{
                              display: isMobile ? "flex" : "grid",
                              flexDirection: isMobile ? "column" : undefined,
                              height: isMobile ? "auto" : "52px",
                              rowGap: isMobile ? "8px" : "16px",
                              columnGap: "16px",
                              gap: isMobile ? "8px" : undefined,
                              alignSelf: "stretch",
                              gridTemplateRows: isMobile
                                ? undefined
                                : "fit-content(100%)",
                              gridTemplateColumns: isMobile
                                ? undefined
                                : "repeat(2, minmax(0, 1fr))",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "1 / span 1",
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
                                Applicant Phone
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
                                +1 (555) 000-0000
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: isMobile ? undefined : "1 / span 1",
                                gridColumn: isMobile ? undefined : "2 / span 1",
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
                                Applicant Email
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
                                alexjsmith@gmail.com
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Resume Validation Section */}
                <div
                  id="resume-validation"
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
                    minWidth: "0",
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
                        padding: isMobile
                          ? "20px 16px 0 16px"
                          : "20px 24px 0 24px",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Resume Validation
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #ABEFC6",
                                  background: "#ECFDF3",
                                  position: "relative",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    color: "#067647",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  Completed - Verified
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() =>
                            setResumeValidationExpanded(
                              !resumeValidationExpanded,
                            )
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
                              transform: resumeValidationExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* Resume Validation Content */}
                  {resumeValidationExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: isMobile
                          ? "12px 16px 20px 16px"
                          : "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
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
                          {/* Validation Details Title */}
                          <div
                            style={{
                              alignSelf: "stretch",
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "24px",
                              position: "relative",
                            }}
                          >
                            Validation Details
                          </div>

                          {/* Search Description */}
                          <div
                            style={{
                              display: "flex",
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
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                position: "relative",
                              }}
                            >
                              Search Description
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
                              This is the description text box for a custom
                              product
                            </div>
                          </div>

                          {/* Three Column Grid: Roll Number, Start Date, License Issuer */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: isMobile ? "column" : "row",
                              gap: "8px",
                              alignSelf: "stretch",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: isMobile ? "0 0 auto" : "1 0 0",
                                alignSelf: "stretch",
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
                                Roll Number
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
                                19889
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: isMobile ? "0 0 auto" : "1 0 0",
                                alignSelf: "stretch",
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
                                Start Date
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
                                01/01/2025
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: isMobile ? "0 0 auto" : "1 0 0",
                                alignSelf: "stretch",
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
                                License Issuer
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
                                State of Texas
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Employment Section */}
                <div
                  id="employment-at-jerrys-tx"
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
                    minWidth: "0",
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
                        padding: isMobile
                          ? "20px 16px 0 16px"
                          : "20px 24px 0 24px",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Employment #1, Jerrys, TX
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #ABEFC6",
                                  background: "#ECFDF3",
                                  position: "relative",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    color: "#067647",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  Completed - Verified
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() =>
                            setEmploymentExpanded(!employmentExpanded)
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
                              transform: employmentExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* Employment Content */}
                  {employmentExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: isMobile
                          ? "12px 0px 20px 0px"
                          : "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Employment Table */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          position: "relative",
                          overflowX: isMobile ? "auto" : "visible",
                          paddingLeft: isMobile ? "16px" : "0",
                          paddingRight: isMobile ? "16px" : "0",
                        }}
                      >
                        {/* Field Labels Column */}
                        <div
                          style={{
                            display: "flex",
                            width: "171px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                            flex: "0 0 171px",
                            minWidth: "171px",
                            flexShrink: 0,
                          }}
                        >
                          {/* Empty header cell */}
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
                          />

                          {/* Field Labels */}
                          {[
                            "Employer Name",
                            "Contact Name",
                            "Contact Phone",
                            "Address 1",
                            "Address 2",
                            "City",
                            "State",
                            "Zip",
                            "Position/Title",
                            "Date From",
                            "Date To",
                            "Income",
                            "Reason For Leaving",
                            "Separation Type",
                            "Employer Comments",
                            "Contact Employer",
                            "Eligible for Rehire",
                            "AKA's on file",
                            "Order Comments",
                            "Person Interviewed",
                            "Researched By",
                            "Research Comments",
                          ].map((label, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setEmploymentHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setEmploymentHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  employmentHoveredRowIndex === index
                                    ? "#F5F5F5"
                                    : "#FFF",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
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
                                {label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Provided by Subject Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: isMobile ? "0 0 200px" : "1 0 0",
                            minWidth: isMobile ? "200px" : "0",
                            flexShrink: isMobile ? 0 : 1,
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
                              Provided by Subject
                            </div>
                          </div>

                          {/* Data rows */}
                          {[
                            "Jerrys",
                            "George",
                            "888-888-888",
                            "",
                            "",
                            "Houston",
                            "TX",
                            "010001",
                            "Driver",
                            "01/01/2000",
                            "04/29/2025",
                            "Hourly",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                          ].map((value, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setEmploymentHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setEmploymentHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  employmentHoveredRowIndex === index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {value && (
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
                                  {value}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Provided by Source Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: isMobile ? "0 0 200px" : "1 0 0",
                            minWidth: isMobile ? "200px" : "0",
                            flexShrink: isMobile ? 0 : 1,
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
                              Provided by Source
                            </div>
                          </div>

                          {/* Data rows */}
                          {[
                            "Jerrys",
                            "George",
                            "888-888-888",
                            "",
                            "",
                            "Houston",
                            "TX",
                            "010001",
                            "Driver",
                            "01/01/2000",
                            "04/29/2025",
                            "Hourly",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                          ].map((value, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setEmploymentHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setEmploymentHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  employmentHoveredRowIndex === index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {value && (
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
                                  {value}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Research Results Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: isMobile ? "0 0 200px" : "1 0 0",
                            minWidth: isMobile ? "200px" : "0",
                            flexShrink: isMobile ? 0 : 1,
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

                          {/* Data rows with verification badges */}
                          {[
                            "Verified", // Employer Name
                            "", // Contact Name
                            "Verified", // Contact Phone
                            "", // Address 1
                            "", // Address 2
                            "", // City
                            "", // State
                            "", // Zip
                            "", // Position/Title
                            "", // Date From
                            "", // Date To
                            "", // Income
                            "", // Reason For Leaving
                            "", // Separation Type
                            "", // Employer Comments
                            "", // Contact Employer
                            "", // Eligible for Rehire
                            "", // AKA's on file
                            "", // Order Comments
                            "", // Person Interviewed
                            "", // Researched By
                            "", // Research Comments
                          ].map((status, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setEmploymentHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setEmploymentHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  employmentHoveredRowIndex === index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {status && (
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "2px 8px",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    border: "1px solid #ABEFC6",
                                    background: "#ECFDF3",
                                    position: "relative",
                                    maxWidth: "100%",
                                    minWidth: 0,
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#067647",
                                      textAlign: "center",
                                      fontFamily: "Public Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "18px",
                                      position: "relative",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      maxWidth: "100%",
                                    }}
                                  >
                                    {status}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* See File Button */}
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
                          marginLeft: isMobile ? "16px" : "0",
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
                            See File
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
                            d="M14 6L14 2M14 2H10M14 2L8.66667 7.33333M6.66667 3.33333H5.2C4.0799 3.33333 3.51984 3.33333 3.09202 3.55132C2.71569 3.74307 2.40973 4.04903 2.21799 4.42535C2 4.85318 2 5.41323 2 6.53333V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H9.46667C10.5868 14 11.1468 14 11.5746 13.782C11.951 13.5903 12.2569 13.2843 12.4487 12.908C12.6667 12.4802 12.6667 11.9201 12.6667 10.8V9.33333"
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

                {/* Education Section */}
                <div
                  id="education-at-brown-community-college"
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
                    minWidth: "0",
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
                        padding: isMobile
                          ? "20px 16px 0 16px"
                          : "20px 24px 0 24px",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Education #1, Major, Brown Community College
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #ABEFC6",
                                  background: "#ECFDF3",
                                  position: "relative",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    color: "#067647",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  Completed - Verified
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() =>
                            setEducationExpanded(!educationExpanded)
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
                              transform: educationExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* Education Content */}
                  {educationExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: isMobile
                          ? "12px 0px 20px 0px"
                          : "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Institution and Summary */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          gap: isMobile ? "8px" : "0",
                          justifyContent: isMobile
                            ? "flex-start"
                            : "space-between",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          position: "relative",
                          paddingLeft: isMobile ? "16px" : "0",
                          paddingRight: isMobile ? "16px" : "0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
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
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                              position: "relative",
                            }}
                          >
                            Institution
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
                            Brown Community College
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
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
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                              position: "relative",
                            }}
                          >
                            Summary
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
                            -
                          </div>
                        </div>
                      </div>

                      {/* Education Table */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          position: "relative",
                          overflowX: isMobile ? "auto" : "visible",
                          paddingLeft: isMobile ? "16px" : "0",
                          paddingRight: isMobile ? "16px" : "0",
                        }}
                      >
                        {/* Field Labels Column */}
                        <div
                          style={{
                            display: "flex",
                            width: "171px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                            flex: "0 0 171px",
                            minWidth: "171px",
                            flexShrink: 0,
                          }}
                        >
                          {/* Empty header cell */}
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
                          />

                          {/* Field Labels */}
                          {[
                            "Address 1",
                            "Address 2",
                            "City",
                            "State",
                            "Zip",
                            "Graduation Date",
                            "Projected Graduation Date",
                            "Date From",
                            "Date To",
                            "Major(s)",
                            "Graduated",
                            "Transcript",
                            "GPA",
                            "Student ID",
                            "Highest Achieved",
                            "Currently Enrolled",
                            "Order Comments",
                            "Person Interviewed",
                            "Interview Comments",
                            "Researched By",
                            "Research Comments",
                          ].map((label, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setEducationHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setEducationHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  educationHoveredRowIndex === index
                                    ? "#F5F5F5"
                                    : "#FFF",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
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
                                {label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Provided on Application Materials Column */}
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
                              Provided on Application Materials
                            </div>
                          </div>

                          {/* Data rows */}
                          {[
                            "",
                            "",
                            "Houston",
                            "TX",
                            "010001",
                            "01/01/2000",
                            "",
                            "04/29/2025",
                            "04/29/2025",
                            "Major",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                          ].map((value, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setEducationHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setEducationHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  educationHoveredRowIndex === index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {value && (
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
                                  {value}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Obtained From Education Interview Column */}
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
                              Obtained From Education Interview
                            </div>
                          </div>

                          {/* Data rows */}
                          {[
                            "",
                            "",
                            "Houston",
                            "TX",
                            "010001",
                            "01/01/2000",
                            "",
                            "04/29/2025",
                            "04/29/2025",
                            "Major",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                          ].map((value, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setEducationHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setEducationHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  educationHoveredRowIndex === index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {value && (
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
                                  {value}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Research Results Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: isMobile ? "0 0 200px" : "1 0 0",
                            minWidth: isMobile ? "200px" : "0",
                            flexShrink: isMobile ? 0 : 1,
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

                          {/* Data rows with verification badges */}
                          {[
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "Verified",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                          ].map((status, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setEducationHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setEducationHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  educationHoveredRowIndex === index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {status && (
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "2px 8px",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    border: "1px solid #ABEFC6",
                                    background: "#ECFDF3",
                                    position: "relative",
                                    maxWidth: "100%",
                                    minWidth: 0,
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#067647",
                                      textAlign: "center",
                                      fontFamily: "Public Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "18px",
                                      position: "relative",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      maxWidth: "100%",
                                    }}
                                  >
                                    {status}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* See File Button */}
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
                          marginLeft: isMobile ? "16px" : "0",
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
                            See File
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
                            d="M14 6L14 2M14 2H10M14 2L8.66667 7.33333M6.66667 3.33333H5.2C4.0799 3.33333 3.51984 3.33333 3.09202 3.55132C2.71569 3.74307 2.40973 4.04903 2.21799 4.42535C2 4.85318 2 5.41323 2 6.53333V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H9.46667C10.5868 14 11.1468 14 11.5746 13.782C11.951 13.5903 12.2569 13.2843 12.4487 12.908C12.6667 12.4802 12.6667 11.9201 12.6667 10.8V9.33333"
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

                {/* Criminal History Section */}
                <div
                  id="countywide-criminal-history"
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
                    minWidth: "0",
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
                        padding: isMobile
                          ? "20px 16px 0 16px"
                          : "20px 24px 0 24px",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Countywide Criminal History Bossie, LA - Years:
                                10 - Sue Jeans
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #ABEFC6",
                                  background: "#ECFDF3",
                                  position: "relative",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    color: "#067647",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  Completed - Clear
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() =>
                            setCriminalHistoryExpanded(!criminalHistoryExpanded)
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
                              transform: criminalHistoryExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* Criminal History Content */}
                  {criminalHistoryExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: isMobile
                          ? "12px 16px 20px 16px"
                          : "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Search Type */}
                      <div
                        style={{
                          display: "flex",
                          height: "52px",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
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
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                              position: "relative",
                            }}
                          >
                            Search Type
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
                            Felony Including Misdemeanor
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <svg
                        width="900"
                        height="9"
                        viewBox="0 0 900 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          display: "flex",
                          padding: "4px 0",
                          alignItems: "center",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M900 5H0V4H900V5Z"
                          fill="#E9EAEB"
                        />
                      </svg>

                      {/* Case #1 */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                          borderRadius: "4px",
                          background: "#FAFAFA",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
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
                            Case #1
                          </div>
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
                            Defendant: Sue Janes
                          </div>
                        </div>

                        {/* Case #1 Info Grid */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            flexWrap: isMobile ? "nowrap" : "wrap",
                            gap: "8px",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: isMobile ? "0 0 auto" : "1 0 0",
                              alignSelf: "stretch",
                              position: "relative",
                              minWidth: isMobile ? "auto" : "0",
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
                              Defendant
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
                              Sue Janes
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
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
                              Address
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
                              Street 1234
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
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
                              Gender
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
                              Female
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
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
                              Weight
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
                              Female
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
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
                              Hair Color
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
                              Brown
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "2 / span 1",
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
                              Height
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
                              5'5
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "3 / span 1",
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
                              Eye Color
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
                              5'5
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "3 / span 1",
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
                              Identified By
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
                              Name, Date of Birth
                            </div>
                          </div>
                        </div>

                        {/* Case #1 Additional Info */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            flexWrap: isMobile ? "nowrap" : "wrap",
                            gap: "8px",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
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
                              Source
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
                              State
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
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
                              Source State
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
                              TX
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
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
                              Offense Date
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
                              01/01/2020
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
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
                              Filing Date
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
                              01/02/2020
                            </div>
                          </div>
                        </div>

                        {/* Additional Case Notes */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
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
                            Additional Case Notes
                          </div>
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
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                  position: "relative",
                                }}
                              >
                                Comments
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
                                Performantted text goes here
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <svg
                        width="900"
                        height="9"
                        viewBox="0 0 900 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          display: "flex",
                          padding: "4px 0",
                          alignItems: "center",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M900 5H0V4H900V5Z"
                          fill="#E9EAEB"
                        />
                      </svg>

                      {/* Charge #4455 */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                          borderRadius: "4px",
                          background: "#FAFAFA",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
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
                            Charge #4455
                          </div>
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
                            Defendant: Sue Janes
                          </div>
                        </div>

                        {/* Charge Info Grid */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            position: "relative",
                            overflowX: isMobile ? "auto" : "visible",
                            paddingLeft: isMobile ? "4px" : "0",
                            paddingRight: isMobile ? "4px" : "0",
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              rowGap: "8px",
                              columnGap: "8px",
                              width: isMobile ? "max-content" : "100%",
                              minWidth: isMobile ? "576px" : "0",
                              gridTemplateRows:
                                "fit-content(100%) minmax(0, 1fr)",
                              gridTemplateColumns: isMobile
                                ? "repeat(3, minmax(180px, 1fr))"
                                : "repeat(3, minmax(0, 1fr))",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Charge
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
                                Petty Theft
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Crime Type:
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
                                Civil
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Disposition
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
                                Conviction
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Plea
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
                                Not Guilty
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Case Notes */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
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
                            Additional Case Notes
                          </div>
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
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                  position: "relative",
                                }}
                              >
                                Comments
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
                                Charge comments
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <svg
                        width="900"
                        height="9"
                        viewBox="0 0 900 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          display: "flex",
                          padding: "4px 0",
                          alignItems: "center",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M900 5H0V4H900V5Z"
                          fill="#E9EAEB"
                        />
                      </svg>

                      {/* Charge #88623 */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                          borderRadius: "4px",
                          background: "#FAFAFA",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
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
                            Charge #88623
                          </div>
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
                            Defendant: Sue Janes
                          </div>
                        </div>

                        {/* Charge Info Grid */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            position: "relative",
                            overflowX: isMobile ? "auto" : "visible",
                            paddingLeft: isMobile ? "4px" : "0",
                            paddingRight: isMobile ? "4px" : "0",
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              rowGap: "8px",
                              columnGap: "8px",
                              width: isMobile ? "max-content" : "100%",
                              minWidth: isMobile ? "576px" : "0",
                              gridTemplateRows:
                                "fit-content(100%) minmax(0, 1fr) minmax(0, 1fr)",
                              gridTemplateColumns: isMobile
                                ? "repeat(3, minmax(180px, 1fr))"
                                : "repeat(3, minmax(0, 1fr))",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Charge
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
                                Petty Theft
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Crime Type:
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
                                Civil
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Disposition
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
                                Conviction
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Plea
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
                                Not Guilty
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
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
                                Arrest Date
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
                                03/03/2021
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "2 / span 1",
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
                                Offense Date
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
                                03/03/2021
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "3 / span 1",
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
                                Disposition Date
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
                                03/03/2021
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Case Notes */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
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
                            Additional Case Notes
                          </div>
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
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                  position: "relative",
                                }}
                              >
                                Comments
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
                                Charge comments
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Sentencing Table */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            position: "relative",
                            overflowX: isMobile ? "auto" : "visible",
                            paddingLeft: isMobile ? "4px" : "0",
                            paddingRight: isMobile ? "4px" : "0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              width: isMobile ? "max-content" : "100%",
                              minWidth: isMobile ? "720px" : "0",
                              flex: isMobile ? "0 0 auto" : "1 0 0",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: isMobile ? "0 0 180px" : "1 0 0",
                                minWidth: isMobile ? "180px" : "0",
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
                                  Sentencing:
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  position: "relative",
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
                                  Jail Time
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: isMobile ? "0 0 180px" : "1 0 0",
                                minWidth: isMobile ? "180px" : "0",
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
                                  Active
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  position: "relative",
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
                                  5/12/2024
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: isMobile ? "0 0 180px" : "1 0 0",
                                minWidth: isMobile ? "180px" : "0",
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
                                  Suspended
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  position: "relative",
                                }}
                              />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: isMobile ? "0 0 180px" : "1 0 0",
                                minWidth: isMobile ? "180px" : "0",
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
                                  Completed
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "12px",
                                  alignItems: "center",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  position: "relative",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <svg
                        width="900"
                        height="9"
                        viewBox="0 0 900 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          display: "flex",
                          padding: "4px 0",
                          alignItems: "center",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M900 5H0V4H900V5Z"
                          fill="#E9EAEB"
                        />
                      </svg>

                      {/* Adjudication Matrix */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "12px",
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
                            fontWeight: 500,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Adjudication Matrix
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            position: "relative",
                            overflowX: isMobile ? "auto" : "visible",
                          }}
                        >
                          {/* Items Column */}
                          <div
                            style={{
                              display: "flex",
                              width: "355px",
                              flexDirection: "column",
                              alignItems: "flex-start",
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
                                Item
                              </div>
                            </div>

                            {[
                              "Perjury (Felony or Misdemeanor)",
                              "Subordination of Perjury (Felony or Misdemeanor)",
                              "Criminal Fraud",
                              "Embezzlement",
                              "False Pretenses",
                              "Bribery",
                              "Theft",
                              "Unauthorized use of a Motor Vehicle",
                              "Unlawful use of a Computer",
                              "Computer Fraud & Abuse",
                              "Crimes against a Person",
                              "Intent to Distribute Drug / Controlled Substance",
                            ].map((item, index) => (
                              <div
                                key={index}
                                onMouseEnter={() =>
                                  setAdjudicationMatrixHoveredRowIndex(index)
                                }
                                onMouseLeave={() =>
                                  setAdjudicationMatrixHoveredRowIndex(null)
                                }
                                style={{
                                  display: "flex",
                                  height: "36px",
                                  padding: "6px 12px",
                                  alignItems: "center",
                                  gap: "12px",
                                  alignSelf: "stretch",
                                  borderBottom: "1px solid #E9EAEB",
                                  background:
                                    adjudicationMatrixHoveredRowIndex === index
                                      ? "#F5F5F5"
                                      : "#FFF",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
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
                                  {item}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Count Column */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              flex: "1 0 0",
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
                                Count
                              </div>
                            </div>

                            {Array(12)
                              .fill("0")
                              .map((count, index) => (
                                <div
                                  key={index}
                                  onMouseEnter={() =>
                                    setAdjudicationMatrixHoveredRowIndex(index)
                                  }
                                  onMouseLeave={() =>
                                    setAdjudicationMatrixHoveredRowIndex(null)
                                  }
                                  style={{
                                    display: "flex",
                                    height: "36px",
                                    padding: "12px",
                                    alignItems: "center",
                                    alignSelf: "stretch",
                                    borderBottom: "1px solid #E9EAEB",
                                    background:
                                      adjudicationMatrixHoveredRowIndex ===
                                      index
                                        ? "#F5F5F5"
                                        : "transparent",
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
                                    {count}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      {/* See File Button */}
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
                          alignSelf: isMobile ? "flex-start" : "auto",
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
                            See File
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
                            d="M14 6L14 2M14 2H10M14 2L8.66667 7.33333M6.66667 3.33333H5.2C4.0799 3.33333 3.51984 3.33333 3.09202 3.55132C2.71569 3.74307 2.40973 4.04903 2.21799 4.42535C2 4.85318 2 5.41323 2 6.53333V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H9.46667C10.5868 14 11.1468 14 11.5746 13.782C11.951 13.5903 12.2569 13.2843 12.4487 12.908C12.6667 12.4802 12.6667 11.9201 12.6667 10.8V9.33333"
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

                {/* MJD Sue Jeans Section */}
                <div
                  id="mjd"
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
                    minWidth: "0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                MJD Sue Jeans
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #ABEFC6",
                                  background: "#ECFDF3",
                                  position: "relative",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    color: "#067647",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  Completed - Verified
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() => setMjdExpanded(!mjdExpanded)}
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
                              transform: mjdExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* MJD Content */}
                  {mjdExpanded && (
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
                        We verify criminal matches found during our instant
                        database search directly with the source before
                        reporting them. A criminal record will be added to the
                        order when we discover criminal records that are a
                        possible match. Depending on the number of hits and the
                        response time from each search this can take a few days.
                        Our average turnaround time for a verified search that
                        initially has hits, is 1-3 business days. Here is a
                        CLEAR STATIC Disclaimer. 4/20/2011
                      </div>
                    </div>
                  )}
                </div>

                {/* Nationwide Federal Crime Sue Jeans Section */}
                <div
                  id="nationwide-federal-crime"
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
                    minWidth: "0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Nationwide Federal Crime Sue Jeans
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #ABEFC6",
                                  background: "#ECFDF3",
                                  position: "relative",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    color: "#067647",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  Completed - Verified
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() =>
                            setFederalCrimeExpanded(!federalCrimeExpanded)
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
                              transform: federalCrimeExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* Federal Crime Content */}
                  {federalCrimeExpanded && (
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
                        No records found
                      </div>
                    </div>
                  )}
                </div>

                {/* Professional References Section */}
                <div
                  id="professional-references"
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
                    minWidth: "0",
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
                        padding: isMobile
                          ? "20px 16px 0 16px"
                          : "20px 24px 0 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: isMobile ? "12px" : "16px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? "12px" : "16px",
                          alignSelf: "stretch",
                          position: "relative",
                          flexWrap: isMobile ? "wrap" : "nowrap",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: "1 0 0",
                            minWidth: 0,
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
                              minWidth: 0,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                position: "relative",
                                flexWrap: "wrap",
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
                                Professional References #1, Hank Williams
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border: "1px solid #ABEFC6",
                                  background: "#ECFDF3",
                                  position: "relative",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    color: "#067647",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  Completed - Verified
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chevron Button */}
                        <button
                          onClick={() =>
                            setProfessionalReferencesExpanded(
                              !professionalReferencesExpanded,
                            )
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
                            position: "relative",
                            cursor: "pointer",
                            alignSelf: isMobile ? "flex-start" : "auto",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              transform: professionalReferencesExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* Professional References Content */}
                  {professionalReferencesExpanded && (
                    <div
                      style={{
                        display: "flex",
                        padding: isMobile
                          ? "12px 16px 20px 16px"
                          : "12px 24px 20px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Professional References Table */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          position: "relative",
                          overflowX: isMobile ? "auto" : "visible",
                          paddingLeft: isMobile ? "4px" : "0",
                          paddingRight: isMobile ? "4px" : "0",
                        }}
                      >
                        {/* Field Labels Column */}
                        <div
                          style={{
                            display: "flex",
                            width: "171px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                            flex: "0 0 171px",
                            minWidth: "171px",
                            flexShrink: 0,
                          }}
                        >
                          {/* Empty header cell */}
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
                          />

                          {/* Field Labels */}
                          {[
                            "Contact Name",
                            "Reference Type",
                            "Contact Relationship",
                            "Contact Phone",
                            "Contact Email",
                            "Contact address",
                            "City",
                            "State",
                            "Zip",
                          ].map((label, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setProfessionalReferencesHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setProfessionalReferencesHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "6px 12px",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  professionalReferencesHoveredRowIndex ===
                                  index
                                    ? "#F5F5F5"
                                    : "#FFF",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
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
                                {label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Provided by Subject Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: isMobile ? "0 0 200px" : "1 0 0",
                            minWidth: isMobile ? "200px" : "0",
                            flexShrink: isMobile ? 0 : 1,
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
                              Provided by Subject
                            </div>
                          </div>

                          {/* Data rows */}
                          {[
                            "Hank Williams",
                            "",
                            "",
                            "444-444-444",
                            "",
                            "",
                            "",
                            "",
                            "",
                          ].map((value, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setProfessionalReferencesHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setProfessionalReferencesHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  professionalReferencesHoveredRowIndex ===
                                  index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {value && (
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
                                  {value}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Provided by Source Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: isMobile ? "0 0 200px" : "1 0 0",
                            minWidth: isMobile ? "200px" : "0",
                            flexShrink: isMobile ? 0 : 1,
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
                              Provided by Source
                            </div>
                          </div>

                          {/* Data rows */}
                          {[
                            "Hank Williams",
                            "Friend",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                          ].map((value, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setProfessionalReferencesHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setProfessionalReferencesHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  professionalReferencesHoveredRowIndex ===
                                  index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {value && (
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
                                  {value}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Research Results Column */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: isMobile ? "0 0 200px" : "1 0 0",
                            minWidth: isMobile ? "200px" : "0",
                            flexShrink: isMobile ? 0 : 1,
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

                          {/* Data rows with verification badges */}
                          {[
                            "Verified", // Contact Name
                            "", // Reference Type
                            "", // Contact Relationship
                            "", // Contact Phone
                            "", // Contact Email
                            "", // Contact address
                            "", // City
                            "", // State
                            "", // Zip
                          ].map((status, index) => (
                            <div
                              key={index}
                              onMouseEnter={() =>
                                setProfessionalReferencesHoveredRowIndex(index)
                              }
                              onMouseLeave={() =>
                                setProfessionalReferencesHoveredRowIndex(null)
                              }
                              style={{
                                display: "flex",
                                height: "36px",
                                padding: "12px",
                                alignItems: "center",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                                background:
                                  professionalReferencesHoveredRowIndex ===
                                  index
                                    ? "#F5F5F5"
                                    : "transparent",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              {status && (
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "2px 8px",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    border: "1px solid #ABEFC6",
                                    background: "#ECFDF3",
                                    position: "relative",
                                    maxWidth: "100%",
                                    minWidth: 0,
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#067647",
                                      textAlign: "center",
                                      fontFamily: "Public Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "18px",
                                      position: "relative",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      maxWidth: "100%",
                                    }}
                                  >
                                    {status}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comments Section */}
                      <div
                        style={{
                          display: "flex",
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Comments
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
                          They provided a great reference!!!!
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Credentials-Professional License #1 Section */}
                <CredentialsSection
                  expanded={credentialsExpanded}
                  onToggle={() => setCredentialsExpanded(!credentialsExpanded)}
                />

                {/* Motor Vehicle Driving History Section */}
                <MotorVehicleDrivingHistorySection
                  expanded={motorVehicleExpanded}
                  onToggle={() => setMotorVehicleExpanded(!motorVehicleExpanded)}
                />

                {/* Credit Employment Report Section */}
                <CreditEmploymentReportSection
                  id="credit-employment-report"
                  expanded={creditEmploymentExpanded}
                  onToggle={() =>
                    setCreditEmploymentExpanded(!creditEmploymentExpanded)
                  }
                />

                {/* E-Verify Section */}
                <EVerifySection
                  expanded={eVerifyExpanded}
                  onToggle={() => setEVerifyExpanded(!eVerifyExpanded)}
                />

                {/* 5 Panels Section */}
                <FivePanelsSection
                  expanded={fivePanelsExpanded}
                  onToggle={() => setFivePanelsExpanded(!fivePanelsExpanded)}
                />

                {/* CBSV Section */}
                <CBSVSection
                  expanded={cbsvExpanded}
                  onToggle={() => setCbsvExpanded(!cbsvExpanded)}
                />


                {/* Special Notice Section */}
                <div
                  id="special-notice-section"
                  style={{
                    display: "flex",
                    padding: "0px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0px",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    paddingBottom: specialNoticeExpanded ? "0px" : "20px",
                    overflow: "hidden",
                    minWidth: "0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                      borderRadius: "12px 12px 0 0",
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
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
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
                                Special Notice
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setSpecialNoticeExpanded(!specialNoticeExpanded)
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
                              transform: specialNoticeExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
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

                  {/* Special Notice Content */}
                  {specialNoticeExpanded && (
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
                      {/* Notice Information */}
                      <div
                        style={{
                          display: "flex",
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
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "24px",
                            position: "relative",
                          }}
                        >
                          Noticy
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
                          The information provided is a consumer report as
                          defined in the federal Fair Credit Reporting Act [15
                          U.S.C. 1681- 1681u]. It contains confidential
                          information on the individual named. It is submitted
                          to the conditions contained in your Subscriber
                          Agreement with us and may be used solely as a factor
                          in evaluating the named individual for property
                          renting/leasing, employment, promotion, reassignment
                          or retention as an employee. We maintain strict
                          procedures designed to ensure that the information is
                          complete and up to date. While the information
                          furnished is from reliable sources, its accuracy is
                          not guaranteed. Proper use of this report and final
                          verification of the named individual's identity is
                          your sole responsibility. If any adverse action is
                          taken based in whole or in part on this consumer
                          report, a copy of this report and a summary of the
                          consumer's rights must be provided to the consumer
                          prior to taking adverse action.
                        </div>
                      </div>

                      {/* Fair Credit Reporting Act Link */}
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          position: "relative",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0",
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
                            position: "relative",
                          }}
                        >
                          A Summary of Your Rights Under the Fair Credit
                          Reporting Act
                        </div>
                      </button>
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
              boxShadow:
                "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
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
                    Are you sure you want to delete this note? This action
                    cannot be undone.
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
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            background: "rgba(10, 13, 18, 0.7)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setUploadModalOpen(false);
            }
          }}
        >
          <div
            style={{
              display: "flex",
              width: "min(1144px, 100vw)",
              height: "100vh",
              paddingLeft: isDesktop ? "40px" : "0px",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "1 0 0",
                alignSelf: "stretch",
                borderLeft: isDesktop
                  ? "1px solid rgba(0, 0, 0, 0.08)"
                  : "none",
                background: "#FFF",
                boxShadow:
                  "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
                position: "relative",
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  display: "flex",
                  padding: isMobile ? "16px" : "24px",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                  background: "#FFF",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  {/* Featured Icon */}
                  <div
                    style={{
                      display: "flex",
                      width: "44px",
                      height: "44px",
                      padding: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "9999px",
                      background: "#D9DEF2",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6654 8.75001V5.66667C16.6654 4.26654 16.6654 3.56647 16.3929 3.0317C16.1532 2.56129 15.7707 2.17884 15.3003 1.93916C14.7656 1.66667 14.0655 1.66667 12.6654 1.66667H7.33203C5.9319 1.66667 5.23183 1.66667 4.69706 1.93916C4.22665 2.17884 3.8442 2.56129 3.60451 3.0317C3.33203 3.56647 3.33203 4.26654 3.33203 5.66667V14.3333C3.33203 15.7335 3.33203 16.4335 3.60451 16.9683C3.8442 17.4387 4.22665 17.8212 4.69706 18.0609C5.23183 18.3333 5.9319 18.3333 7.33203 18.3333H9.58203M18.332 18.3333L17.082 17.0833M17.9154 15C17.9154 16.6108 16.6095 17.9167 14.9987 17.9167C13.3879 17.9167 12.082 16.6108 12.082 15C12.082 13.3892 13.3879 12.0833 14.9987 12.0833C16.6095 12.0833 17.9154 13.3892 17.9154 15Z"
                        stroke="#344698"
                        strokeWidth="1.66667"
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
                      flex: "1 0 0",
                      position: "relative",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "28px",
                        position: "relative",
                        wordWrap: "break-word",
                      }}
                    >
                      Upload {uploadFileName}
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
                        wordWrap: "break-word",
                      }}
                    >
                      Upload a clear copy of {uploadFileName}. Make sure all
                      information is visible and the file is not blurry.
                    </div>
                  </div>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setUploadModalOpen(false)}
                  style={{
                    display: "flex",
                    width: "40px",
                    height: "40px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    flexShrink: 0,
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
                  >
                    <path
                      d="M15 5L5 15M5 5L15 15"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div
                style={{
                  display: "flex",
                  padding: isMobile ? "16px" : "24px",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                {/* File Upload Area */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    position: "relative",
                  }}
                >
                  {/* File Upload */}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      maxWidth: "512px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      position: "relative",
                      padding: isMobile ? "16px" : "24px",
                    }}
                  >
                    {/* File Queue */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "12px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* File Upload Item */}
                      <div
                        style={{
                          display: "flex",
                          padding: "16px",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          borderRadius: "12px",
                          border: "1px solid #E9EAEB",
                          background: "#FFF",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            flex: "1 0 0",
                            position: "relative",
                          }}
                        >
                          {/* File Type Icon */}
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              position: "relative",
                              flexShrink: 0,
                            }}
                          >
                            <svg
                              width="32"
                              height="40"
                              viewBox="0 0 32 41"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                position: "absolute",
                                left: "4px",
                                top: "0px",
                              }}
                            >
                              <path
                                d="M4 1.25H20C20.1212 1.25 20.2375 1.29809 20.3232 1.38379L31.1162 12.1768C31.2019 12.2625 31.25 12.3788 31.25 12.5V36.5C31.25 38.2949 29.7949 39.75 28 39.75H4C2.20507 39.75 0.75 38.2949 0.75 36.5V4.5C0.750001 2.70507 2.20508 1.25 4 1.25Z"
                                stroke="#D5D7DA"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M20 1V8.5C20 10.7091 21.7909 12.5 24 12.5H31.5"
                                stroke="#D5D7DA"
                                strokeWidth="1.5"
                              />
                            </svg>
                            <div
                              style={{
                                display: "inline-flex",
                                padding: "2px 3px",
                                alignItems: "flex-start",
                                gap: "8px",
                                borderRadius: "2px",
                                background: "#D92D20",
                                position: "absolute",
                                left: "1px",
                                top: "18px",
                                width: "26px",
                                height: "16px",
                              }}
                            >
                              <div
                                style={{
                                  color: "#FFF",
                                  textAlign: "center",
                                  fontFamily: "Inter",
                                  fontSize: "10px",
                                  fontStyle: "normal",
                                  fontWeight: 700,
                                  lineHeight: "normal",
                                  position: "relative",
                                }}
                              >
                                PDF
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                              position: "relative",
                              minWidth: 0,
                            }}
                          >
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
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 1,
                                  alignSelf: "stretch",
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
                                Tech design requirements.pdf
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: isMobile ? "column" : "row",
                                alignItems: isMobile ? "flex-start" : "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                position: "relative",
                                  flexWrap: "wrap",
                                }}
                              >
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
                                  200 KB of 200 KB
                                </div>
                                <svg
                                  width="2"
                                  height="13"
                                  viewBox="0 0 2 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    height: "12px",
                                    flexShrink: 0,
                                  }}
                                >
                                  <path
                                    d="M1 0.5V12.5"
                                    stroke="#D5D7DA"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    position: "relative",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4.9987 8.49998L6.9987 10.5L10.9987 6.49998M14.6654 8.49998C14.6654 12.1819 11.6806 15.1666 7.9987 15.1666C4.3168 15.1666 1.33203 12.1819 1.33203 8.49998C1.33203 4.81808 4.3168 1.83331 7.9987 1.83331C11.6806 1.83331 14.6654 4.81808 14.6654 8.49998Z"
                                      stroke="#079455"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      color: "#079455",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                      position: "relative",
                                    }}
                                  >
                                    Complete
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  height: "8px",
                                  flex: "1 0 0",
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
                                    width: "100%",
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
                                100%
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          style={{
                            display: "flex",
                            width: "32px",
                            height: "32px",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "6px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            position: "relative",
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(0, 0, 0, 0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 6.5V5.7C16 4.5799 16 4.01984 15.782 3.59202C15.5903 3.21569 15.2843 2.90973 14.908 2.71799C14.4802 2.5 13.9201 2.5 12.8 2.5H11.2C10.0799 2.5 9.51984 2.5 9.09202 2.71799C8.71569 2.90973 8.40973 3.21569 8.21799 3.59202C8 4.01984 8 4.5799 8 5.7V6.5M10 12V17M14 12V17M3 6.5H21M19 6.5V17.7C19 19.3802 19 20.2202 18.673 20.862C18.3854 21.4265 17.9265 21.8854 17.362 22.173C16.7202 22.5 15.8802 22.5 14.2 22.5H9.8C8.11984 22.5 7.27976 22.5 6.63803 22.173C6.07354 21.8854 5.6146 21.4265 5.32698 20.862C5 20.2202 5 19.3802 5 17.7V6.5"
                              stroke="#A4A7AE"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "10px",
                      flex: "1 0 0",
                      position: "relative",
                    }}
                  >
                    <button
                      onClick={() => {
                        // Handle file submission logic here
                        console.log("Submitting file:", uploadFileName);
                        setUploadModalOpen(false);
                      }}
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
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#2A3A85";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#344698";
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
                          Submit File
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add AKAs Modal */}
      <AddAkasModal
        isOpen={akasModalOpen}
        onClose={handleCloseAkasModal}
        onSave={handleSaveAkas}
        initialAkas={savedAkas}
      />

      {/* Archive Order Modal */}
      <ArchiveOrderModal
        isOpen={archiveModalOpen}
        onClose={handleCloseArchiveModal}
        onConfirm={handleArchiveOrder}
      />

      {/* Upload Applicant Release Modal */}
      <UploadApplicantReleaseModal
        isOpen={uploadReleaseModalOpen}
        onClose={handleCloseUploadModal}
        onUpload={handleUploadFile}
      />

      {/* Request Document Upload Modal */}
      <RequestDocumentUploadModal
        isOpen={requestDocumentModalOpen}
        onClose={handleCloseRequestDocumentModal}
        onSend={handleSendDocumentRequest}
      />

      {/* Send Report Modal */}
      <SendReportModal
        isOpen={sendReportModalOpen}
        onClose={handleCloseSendReportModal}
        onSend={handleSendReport}
        isOrderComplete={false}
      />

      {/* Customer Service Modal */}
      <CustomerServiceModal
        isOpen={customerServiceModalOpen}
        onClose={handleCloseCustomerServiceModal}
        onSubmit={handleSubmitCustomerService}
      />

      {/* More Actions Submenu */}
      <MoreActionsSubmenu
        isOpen={moreActionsOpen}
        onClose={handleMoreActionsClose}
        onAction={handleMoreAction}
        enabledActions={enabledMoreActionIds}
        position={moreActionsPosition}
        isMobile={isMobile}
        isSticky={moreActionsIsSticky}
        onAddI9Click={() => navigate("/i9-order")}
        onAddAkasClick={handleOpenAkasModal}
        onAddToOrderClick={() => navigate("/online-ordering")}
      />
    </div>
  );
};

export default OrderDetails;
