import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { HorizontalTabs } from "../components/HorizontalTabs";
import { useIsMobile } from "../hooks/use-mobile";
import DeleteUserModal from "../components/ui/delete-user-modal";
import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";

type CompanyTabType =
  | "company"
  | "saml"
  | "team"
  | "termination"
  | "adjudication"
  | "resources"
  | "invoices"
  | "audit"
  | "customization";

type RoleKey = "superAdmin" | "admin" | "recruiter" | "support";

type RolePermissionRow = {
  label: string;
  roles: Record<RoleKey, boolean>;
};

type RolePermissionCategory = {
  title: string;
  permissions: RolePermissionRow[];
};

const ROLE_COLUMNS: { key: RoleKey; label: string; locked?: boolean }[] = [
  { key: "superAdmin", label: "Super Admin", locked: true },
  { key: "admin", label: "Admin" },
  { key: "recruiter", label: "Recruiter" },
  { key: "support", label: "Support" },
];

const INITIAL_ROLE_PERMISSIONS: RolePermissionCategory[] = [
  {
    title: "User Management",
    permissions: [
      {
        label: "View Users",
        roles: { superAdmin: true, admin: true, recruiter: false, support: true },
      },
      {
        label: "Create User",
        roles: { superAdmin: true, admin: true, recruiter: true, support: false },
      },
      {
        label: "Edit Users",
        roles: { superAdmin: true, admin: true, recruiter: true, support: false },
      },
      {
        label: "Delete Users",
        roles: { superAdmin: true, admin: true, recruiter: true, support: false },
      },
    ],
  },
  {
    title: "Orders",
    permissions: [
      {
        label: "[Permission Label]",
        roles: { superAdmin: true, admin: true, recruiter: false, support: true },
      },
      {
        label: "[Permission Label]",
        roles: { superAdmin: true, admin: true, recruiter: true, support: false },
      },
      {
        label: "[Permission Label]",
        roles: { superAdmin: true, admin: true, recruiter: true, support: false },
      },
      {
        label: "[Permission Label]",
        roles: { superAdmin: true, admin: true, recruiter: true, support: false },
      },
    ],
  },
  {
    title: "Billing & Finances",
    permissions: [
      {
        label: "View Billing",
        roles: { superAdmin: true, admin: true, recruiter: false, support: true },
      },
      {
        label: "Configure Billing",
        roles: { superAdmin: true, admin: true, recruiter: true, support: false },
      },
    ],
  },
  {
    title: "System Settings",
    permissions: [
      {
        label: "Company Settings",
        roles: { superAdmin: true, admin: true, recruiter: true, support: true },
      },
      {
        label: "SAML Integration",
        roles: { superAdmin: true, admin: true, recruiter: false, support: false },
      },
      {
        label: "Customization",
        roles: { superAdmin: true, admin: true, recruiter: false, support: false },
      },
    ],
  },
];

const LOGIN_IMAGE_PLACEHOLDER =
  "https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F9160e695278645baa7e162772c838288?format=webp&width=800";

const PORTAL_INSTRUCTIONS_PLACEHOLDER =
  "https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F67d571b6d4e44b9d89c7487a4b1437be?format=webp&width=800";


// Uploaded File Type
interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "complete" | "error";
}

// Termination Upload Area Component
function TerminationUploadArea({ isMobile }: { isMobile: boolean }) {
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: "uploading",
    };

    setUploadedFiles((prev) => [...prev, newFile]);

    // Simulate upload progress
    simulateUpload(newFile.id);
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "complete" as const } : f
          )
        );
      }
    }, 100);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return Math.round(bytes / (1024 * 1024)) + " MB";
  };

  const getFileExtension = (filename: string): string => {
    const ext = filename.split(".").pop()?.toUpperCase() || "";
    return ext;
  };

  const getFileTypeColor = (ext: string): string => {
    if (ext === "PDF") return "#D92D20";
    if (ext === "XLSX" || ext === "XLS") return "#079455";
    if (ext === "CSV") return "#344698";
    return "#A4A7AE";
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "12px 16px 16px 16px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
        borderTop: "1px solid #E9EAEB",
        background: "#FFF",
      }}
    >
      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "12px",
            alignSelf: "stretch",
          }}
        >
          {uploadedFiles.map((uploadedFile) => {
            const fileExt = getFileExtension(uploadedFile.file.name);
            const fileColor = getFileTypeColor(fileExt);
            const fileSize = formatFileSize(uploadedFile.file.size);
            const uploadedSize =
              uploadedFile.status === "complete"
                ? fileSize
                : formatFileSize(
                    Math.round(
                      (uploadedFile.file.size * uploadedFile.progress) / 100
                    )
                  );

            return (
              <div
                key={uploadedFile.id}
                style={{
                  display: "flex",
                  padding: "16px",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    flex: "1 0 0",
                  }}
                >
                  {/* File Type Icon */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      position: "relative",
                    }}
                  >
                    <svg
                      width="32"
                      height="40"
                      viewBox="0 0 32 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: "absolute",
                        left: "7px",
                        top: "0px",
                      }}
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
                    <div
                      style={{
                        display: "inline-flex",
                        padding: "2px 3px",
                        alignItems: "flex-start",
                        gap: "8px",
                        borderRadius: "2px",
                        background: fileColor,
                        position: "absolute",
                        left: "1px",
                        top: "18px",
                        minWidth: "26px",
                        height: "16px",
                      }}
                    >
                      <div
                        style={{
                          color: "#FFF",
                          textAlign: "center",
                          fontFamily: "Inter",
                          fontSize: "10px",
                          fontWeight: 700,
                          lineHeight: "normal",
                        }}
                      >
                        {fileExt}
                      </div>
                    </div>
                  </div>

                  {/* File Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: "1 0 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "2px",
                        alignSelf: "stretch",
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
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        {uploadedFile.file.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
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
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          {uploadedSize} of {fileSize}
                        </div>
                        <svg
                          width="2"
                          height="14"
                          viewBox="0 0 2 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1V13"
                            stroke="#D5D7DA"
                            strokeLinecap="round"
                          />
                        </svg>
                        {uploadedFile.status === "complete" && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0)">
                                <path
                                  d="M5.00065 7.99992L7.00065 9.99992L11.0007 5.99992M14.6673 7.99992C14.6673 11.6818 11.6826 14.6666 8.00065 14.6666C4.31875 14.6666 1.33398 11.6818 1.33398 7.99992C1.33398 4.31802 4.31875 1.33325 8.00065 1.33325C11.6826 1.33325 14.6673 4.31802 14.6673 7.99992Z"
                                  stroke="#079455"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <div
                              style={{
                                color: "#079455",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              Complete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        alignSelf: "stretch",
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
                            left: 0,
                            top: 0,
                          }}
                        />
                        <div
                          style={{
                            width: `${uploadedFile.progress}%`,
                            height: "8px",
                            borderRadius: "9999px",
                            background: "#344698",
                            position: "absolute",
                            left: 0,
                            top: 0,
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        {uploadedFile.progress}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(uploadedFile.id)}
                  style={{
                    display: "flex",
                    width: "32px",
                    height: "32px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "6px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F5F5";
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
                      d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                      stroke="#A4A7AE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* File upload area - only show if no files uploaded */}
      {uploadedFiles.length === 0 && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          style={{
            display: "flex",
            padding: "16px 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            alignSelf: "stretch",
            borderRadius: "12px",
            border: `1px ${isDragging ? "dashed" : "solid"} ${
              isDragging ? "#344698" : "#E9EAEB"
            }`,
            background: isDragging ? "#F8F9FC" : "#FFF",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            {/* Upload icon */}
            <div
              style={{
                display: "flex",
                padding: "10px",
                alignItems: "center",
                gap: "10px",
                borderRadius: "8px",
                border: "1px solid #D5D7DA",
                background: "#FFF",
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                  d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                  stroke="#414651"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Text content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "4px",
                  alignSelf: "stretch",
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowseClick();
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      color: "#273572",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    Click to upload
                  </span>
                </button>
                <span
                  style={{
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  or drag and drop
                </span>
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  textAlign: "center",
                  fontFamily: "Roboto Mono",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "18px",
                }}
              >
                XLSX or CSV Files
              </div>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            accept=".xlsx,.xls,.csv,.pdf"
          />
        </div>
      )}

      {/* Upload File Button */}
      <button
        onClick={handleBrowseClick}
        type="button"
        style={{
          display: "flex",
          padding: "12px",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          alignSelf: "stretch",
          borderRadius: "8px",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          background: "#344698",
          boxShadow:
            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#2A3A7D";
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
          }}
        >
          <span
            style={{
              color: "#FFF",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
            }}
          >
            Upload File
          </span>
        </div>
      </button>
    </div>
  );
}

export default function CompanySettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = React.useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const width = window.innerWidth;
    return width >= 768 && width < 1024;
  });
  const isDesktop = !isMobile && !isTablet;
  const isCompactLayout = isMobile || isTablet;
  const headerHeight = isDesktop ? 72 : 64;

  const [activeTab, setActiveTab] = React.useState<CompanyTabType>("company");
  const initialTab = React.useMemo(
    () =>
      (location.state as { initialTab?: CompanyTabType } | null)?.initialTab,
    [location.state],
  );
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [userMenuHovered, setUserMenuHovered] = React.useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = React.useState<
    number | null
  >(null);
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(
    null,
  );
  const [deleteUserModalOpen, setDeleteUserModalOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState<{ id: number; name: string } | null>(null);
  const [teamSubTab, setTeamSubTab] = React.useState<'members' | 'permissions'>('members');
  const [rolePermissions, setRolePermissions] =
    React.useState<RolePermissionCategory[]>(() => INITIAL_ROLE_PERMISSIONS);

  // Customization state
  const [companyName, setCompanyName] = React.useState("");
  const [customDomain, setCustomDomain] = React.useState("");
  const [brandColor, setBrandColor] = React.useState("#7F56D9");
  const [displayPreference, setDisplayPreference] = React.useState<'system' | 'light' | 'dark'>('system');
  const [uiStyling, setUiStyling] = React.useState<'pill' | 'round' | 'sharp'>('pill');
  const [loginImageEnabled, setLoginImageEnabled] = React.useState(true);
  const [portalInstructionsEnabled, setPortalInstructionsEnabled] = React.useState(true);
  const loginImageInputRef = React.useRef<HTMLInputElement | null>(null);
  const portalInstructionsInputRef = React.useRef<HTMLInputElement | null>(null);
  const buttonCornerRadius = React.useMemo(() => {
    if (uiStyling === "pill") {
      return "9999px";
    }
    if (uiStyling === "round") {
      return "10px";
    }
    return "0px";
  }, [uiStyling]);
  const [loginImagePreview, setLoginImagePreview] = React.useState<string>(
    LOGIN_IMAGE_PLACEHOLDER,
  );
  const [portalInstructionsPreview, setPortalInstructionsPreview] = React.useState<string>(
    PORTAL_INSTRUCTIONS_PLACEHOLDER,
  );

  const processImageSelection = React.useCallback(
    (
      files: FileList | null,
      setPreview: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      const file = files?.[0];
      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Unsupported file type",
          description: "Please upload an image in SVG, PNG, JPG, or GIF format.",
          variant: "destructive",
        });
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setPreview((previous) => {
        if (previous.startsWith("blob:")) {
          URL.revokeObjectURL(previous);
        }
        return fileUrl;
      });
    },
    [],
  );

  const handleImageInputChange = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      setPreview: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      processImageSelection(event.target.files, setPreview);
      event.target.value = "";
    },
    [processImageSelection],
  );

  const handleImageDrop = React.useCallback(
    (
      event: React.DragEvent<HTMLDivElement>,
      setPreview: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      event.preventDefault();
      processImageSelection(event.dataTransfer?.files ?? null, setPreview);
    },
    [processImageSelection],
  );

  React.useEffect(() => {
    return () => {
      if (loginImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(loginImagePreview);
      }
    };
  }, [loginImagePreview]);

  React.useEffect(() => {
    return () => {
      if (portalInstructionsPreview.startsWith("blob:")) {
        URL.revokeObjectURL(portalInstructionsPreview);
      }
    };
  }, [portalInstructionsPreview]);

  const handlePermissionToggle = React.useCallback(
    (categoryIndex: number, permissionIndex: number, roleKey: RoleKey) => {
      const roleMeta = ROLE_COLUMNS.find((role) => role.key === roleKey);
      if (roleMeta?.locked) {
        return;
      }

      setRolePermissions((prev) =>
        prev.map((category, catIdx) => {
          if (catIdx !== categoryIndex) {
            return category;
          }

          return {
            ...category,
            permissions: category.permissions.map((permission, permIdx) => {
              if (permIdx !== permissionIndex) {
                return permission;
              }

              return {
                ...permission,
                roles: {
                  ...permission.roles,
                  [roleKey]: !permission.roles[roleKey],
                },
              };
            }),
          };
        }),
      );
    },
    [],
  );

  const getToggleStyle = React.useCallback(
    (isOn: boolean, locked: boolean) => ({
      display: "flex",
      width: "36px",
      height: "20px",
      padding: "2px",
      alignItems: "center",
      borderRadius: "9999px",
      border: locked
        ? "1px solid #E9EAEB"
        : isOn
          ? "1px solid transparent"
          : "1px solid #E9EAEB",
      background: locked ? "#8D9BD8" : isOn ? "#344698" : "#F5F5F5",
      justifyContent: isOn ? "flex-end" : "flex-start",
      cursor: locked ? "not-allowed" : "pointer",
      opacity: locked ? 0.6 : 1,
      transition: "all 0.15s ease",
    }),
    [],
  );

  const getToggleKnobStyle = React.useCallback(
    (locked: boolean) => ({
      width: "16px",
      height: "16px",
      borderRadius: "9999px",
      background: locked ? "#FAFAFA" : "#FFF",
      boxShadow: "0 1px 3px 0 rgba(10, 13, 18, 0.10)",
      transition: "transform 0.15s ease",
    }),
    [],
  );

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewport = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownIndex !== null) {
        const target = event.target as HTMLElement;
        if (
          !target.closest("[data-dropdown-menu]") &&
          !target.closest("button")
        ) {
          setOpenDropdownIndex(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIndex]);

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      } as const;
    }
    return {};
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      console.log("Deleting user:", userToDelete.name);
      // TODO: Add actual delete user API call here

      // Show success toast notification
      toast({
        title: "User account deleted",
        description: `The user ${userToDelete.name || userToDelete.email} has been successfully removed from your team.`,
      });

      setUserToDelete(null);
    }
  };

  const tabs = React.useMemo(
    () => [
      { id: "company" as CompanyTabType, label: "Company" },
      { id: "saml" as CompanyTabType, label: "SAML Integration" },
      { id: "team" as CompanyTabType, label: "Team & Permissions" },
      { id: "termination" as CompanyTabType, label: "Termination Dates" },
      { id: "adjudication" as CompanyTabType, label: "Adjudication Emails" },
      { id: "resources" as CompanyTabType, label: "Resources" },
      { id: "invoices" as CompanyTabType, label: "Invoices" },
      { id: "audit" as CompanyTabType, label: "Audit Logs" },
      { id: "customization" as CompanyTabType, label: "Customization" },
    ],
    [],
  );

  // Administration Contact state
  const [firstName, setFirstName] = React.useState("Oliva");
  const [lastName, setLastName] = React.useState("Rhye");
  const [title, setTitle] = React.useState("HR Manager");
  const [city, setCity] = React.useState("Austin");
  const [state, setState] = React.useState("Alabama");
  const [telephone, setTelephone] = React.useState("Austin");
  const [fax, setFax] = React.useState("2849193");
  const [email, setEmail] = React.useState("olivia@acciodata.com");

  // General Settings state
  const [manualRescreening, setManualRescreening] = React.useState("12");
  const [minPasswordLength, setMinPasswordLength] = React.useState("6");
  const [maxPasswordExpiration, setMaxPasswordExpiration] =
    React.useState("15 Days");
  const [inactivityLogout, setInactivityLogout] = React.useState("60 Minutes");
  const [printFCRA, setPrintFCRA] = React.useState("60 Minutes");
  const [duplicateOrderCheck1, setDuplicateOrderCheck1] =
    React.useState("60 Minutes");
  const [duplicateOrderCheck2, setDuplicateOrderCheck2] =
    React.useState("No Check");
  const [sendHitsEmail, setSendHitsEmail] = React.useState(
    "olivia@acciodata.com",
  );

  // SAML Integration state
  const [samlIdpValue, setSamlIdpValue] = React.useState(
    "Value to give to your IdP",
  );
  const [samlAcsUrl, setSamlAcsUrl] = React.useState(
    "https://demoh.acciodata.com/c/p/saml?account=flatirons",
  );
  const [samlSpEntityId, setSamlSpEntityId] = React.useState(
    "https://demoh.acciodata.com/c/p/saml_logout?account=flatirons",
  );
  const [samlEnableAuth, setSamlEnableAuth] = React.useState(
    "Disable SAML Single Signon for this account",
  );
  const [samlUseMappedUsernames, setSamlUseMappedUsernames] =
    React.useState("No");
  const [samlSsoUrl, setSamlSsoUrl] = React.useState("");
  const [samlIdpCertificate, setSamlIdpCertificate] = React.useState("");
  const [samlIdpIssuer, setSamlIdpIssuer] = React.useState("");
  const [samlEmailAttribute, setSamlEmailAttribute] = React.useState("");
  const [samlPrivateKey, setSamlPrivateKey] = React.useState("");
  const [samlAccioCertificate, setSamlAccioCertificate] = React.useState("");

  const inputStyle = {
    width: "100%",
    maxWidth: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #D5D7DA",
    background: "#FFF",
    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
    color: "#181D27",
    fontFamily: "Public Sans",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    outline: "none",
    boxSizing: "border-box" as const,
    minWidth: 0,
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
      {mobileMenuOpen && !isDesktop && (
        <div
          className="fixed inset-0 z-[9998]"
          style={{
            width: "100vw",
            height: "100vh",
            background: "rgba(10, 13, 18, 0.7)",
            backdropFilter: "blur(8px)",
            position: "fixed",
            left: 0,
            top: 0,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="company-settings"
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {!isDesktop && (
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
      )}

      <main
        style={{
          marginTop: `${headerHeight}px`,
          marginLeft: isDesktop ? (isCollapsed ? "80px" : "296px") : "0",
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAFA",
          boxSizing: "border-box",
          width: "100%",
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        {isDesktop && (
          <Header
            isDesktop={isDesktop}
            isMobile={isMobile}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            sidebarCollapsed={isCollapsed}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: isMobile ? "24px 16px 24px" : "32px 32px 32px",
            gap: isMobile ? "20px" : "24px",
            maxWidth: "1200px",
            width: "100%",
            minWidth: 0,
            margin: "0 auto",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : "20px",
            }}
          >
            <h1
              style={{
                color: "#181D27",
                fontFamily: "Public Sans",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 600,
                lineHeight: isMobile ? "28px" : "32px",
                margin: 0,
              }}
            >
              Account Settings
            </h1>

            <HorizontalTabs
              tabs={tabs}
              currentTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId as CompanyTabType)}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </div>

          {activeTab === "termination" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Termination Dates Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}
                  >
                    Termination Date(s)
                  </h2>
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Update multiple users at once by uploading a spreadsheet with their termination dates. You can use our sample file to get started.
                  </p>
                </div>

                {/* Upload Card */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    overflow: "hidden",
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={{
                      display: "flex",
                      padding: "16px 16px 12px 16px",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
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
                      }}
                    >
                      <h3
                        style={{
                          color: "#181D27",
                          fontFamily: "Public Sans",
                          fontSize: "18px",
                          fontWeight: 600,
                          lineHeight: "28px",
                          margin: 0,
                        }}
                      >
                        Upload Termination Dates
                      </h3>
                    </div>
                    <button
                      type="button"
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
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F5F5F5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#FFF";
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
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          Download Sample
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Upload Area */}
                  <TerminationUploadArea isMobile={isMobile} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "company" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Administration Contact Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}
                  >
                    Administration Contact
                  </h2>
                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                      overflow: "hidden",
                      color: "#535862",
                      textOverflow: "ellipsis",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Main point of contact of your company
                  </p>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      Name
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      alignItems: "flex-start",
                      gap: isCompactLayout ? "12px" : "24px",
                      width: "100%",
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                      boxSizing: "border-box" as const,
                    }}
                  >
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{
                        ...inputStyle,
                        flex: isCompactLayout ? "unset" : "1 0 0",
                      }}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        ...inputStyle,
                        flex: isCompactLayout ? "unset" : "1 0 0",
                      }}
                    />
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Title
                    </label>
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      City
                    </label>
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      State
                    </label>
                  </div>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="Alabama">Alabama</option>
                    <option value="Texas">Texas</option>
                    <option value="California">California</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Telephone
                    </label>
                  </div>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Fax
                    </label>
                  </div>
                  <input
                    type="text"
                    value={fax}
                    onChange={(e) => setFax(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Email
                    </label>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      width: "100%",
                      background: "#E9EAEB",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      justifyContent: isCompactLayout
                        ? "flex-start"
                        : "flex-end",
                      alignItems: isCompactLayout ? "stretch" : "center",
                      gap: isCompactLayout ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        justifyContent: isCompactLayout
                          ? "flex-start"
                          : "flex-end",
                        alignItems: "center",
                        gap: isCompactLayout ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isCompactLayout ? "100%" : "auto",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          display: "flex",
                          padding: "12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          width: isCompactLayout ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        style={{
                          display: "flex",
                          padding: "12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          width: isCompactLayout ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Settings Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}
                  >
                    General Settings
                  </h2>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Manual rescreening interval (months)
                    </label>
                  </div>
                  <input
                    type="text"
                    value={manualRescreening}
                    onChange={(e) => setManualRescreening(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Minimum Password Length
                    </label>
                  </div>
                  <select
                    value={minPasswordLength}
                    onChange={(e) => setMinPasswordLength(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Maximum Password Expiration
                    </label>
                  </div>
                  <select
                    value={maxPasswordExpiration}
                    onChange={(e) => setMaxPasswordExpiration(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Inactivity Logout
                    </label>
                  </div>
                  <select
                    value={inactivityLogout}
                    onChange={(e) => setInactivityLogout(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="60 Minutes">60 Minutes</option>
                    <option value="120 Minutes">120 Minutes</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Print FCRA Rights on Report
                    </label>
                  </div>
                  <select
                    value={printFCRA}
                    onChange={(e) => setPrintFCRA(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="60 Minutes">60 Minutes</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Duplicate Order Check
                    </label>
                  </div>
                  <select
                    value={duplicateOrderCheck1}
                    onChange={(e) => setDuplicateOrderCheck1(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="60 Minutes">60 Minutes</option>
                    <option value="120 Minutes">120 Minutes</option>
                  </select>
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Duplicate Order Check
                    </label>
                  </div>
                  <select
                    value={duplicateOrderCheck2}
                    onChange={(e) => setDuplicateOrderCheck2(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="No Check">No Check</option>
                    <option value="Check">Check</option>
                  </select>
                </div>

                <div style={{ height: "2px", background: "#E9EAEB" }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Send Hits E-mail
                    </label>
                  </div>
                  <input
                    type="email"
                    value={sendHitsEmail}
                    onChange={(e) => setSendHitsEmail(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      width: "100%",
                      background: "#E9EAEB",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      justifyContent: isCompactLayout
                        ? "flex-start"
                        : "flex-end",
                      alignItems: isCompactLayout ? "stretch" : "center",
                      gap: isCompactLayout ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        justifyContent: isCompactLayout
                          ? "flex-start"
                          : "flex-end",
                        alignItems: "center",
                        gap: isCompactLayout ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isCompactLayout ? "100%" : "auto",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          display: "flex",
                          padding: "12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          width: isCompactLayout ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        style={{
                          display: "flex",
                          padding: "12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          width: isCompactLayout ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "saml" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* SAML 2.0 Integration Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}
                  >
                    SAML 2.0 (Single Signon) Integration Settings
                  </h2>
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Use this form to configure and enable single signon through
                    the SAML 2.0 protocol. NOTE: Once you have enabled SAML
                    authentication, if you do not have a bypass user, and the
                    SAML authentication fails, you will be locked out of your
                    account. Make sure you have at least one user on your
                    account with SAML bypass enabled before turning on SAML
                    authentication. If you wish to give a particular user the
                    ability to bypass SAML authentication, change their 'User
                    May Bypass SAML Authentication' setting to 'Yes'.
                  </p>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Setting for Your IdP */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      Setting for Your IdP
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      alignItems: isCompactLayout ? "stretch" : "center",
                      gap: isCompactLayout ? "12px" : "24px",
                      width: "100%",
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        overflow: isCompactLayout ? "visible" : "hidden",
                        textOverflow: isCompactLayout ? "clip" : "ellipsis",
                        whiteSpace: isCompactLayout ? "normal" : "nowrap",
                        overflowWrap: isCompactLayout ? "anywhere" : "normal",
                        wordBreak: isCompactLayout ? "break-word" : "normal",
                      }}
                    >
                      {samlIdpValue}
                    </div>
                    <button
                      type="button"
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
                        cursor: "pointer",
                        width: isCompactLayout ? "100%" : "auto",
                        alignSelf: isCompactLayout ? "stretch" : "auto",
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
                          d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* ACS URL */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      ACS URL (Your SP SSO URL)
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      alignItems: isCompactLayout ? "stretch" : "center",
                      gap: isCompactLayout ? "12px" : "24px",
                      width: "100%",
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        overflow: isCompactLayout ? "visible" : "hidden",
                        textOverflow: isCompactLayout ? "clip" : "ellipsis",
                        whiteSpace: isCompactLayout ? "normal" : "nowrap",
                        overflowWrap: isCompactLayout ? "anywhere" : "normal",
                        wordBreak: isCompactLayout ? "break-word" : "normal",
                      }}
                    >
                      {samlAcsUrl}
                    </div>
                    <button
                      type="button"
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
                        cursor: "pointer",
                        width: isCompactLayout ? "100%" : "auto",
                        alignSelf: isCompactLayout ? "stretch" : "auto",
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
                          d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SP Entity Id */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SP Entity Id (Audience Restriction)
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      alignItems: isCompactLayout ? "stretch" : "center",
                      gap: isCompactLayout ? "12px" : "24px",
                      width: "100%",
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        overflow: isCompactLayout ? "visible" : "hidden",
                        textOverflow: isCompactLayout ? "clip" : "ellipsis",
                        whiteSpace: isCompactLayout ? "normal" : "nowrap",
                        overflowWrap: isCompactLayout ? "anywhere" : "normal",
                        wordBreak: isCompactLayout ? "break-word" : "normal",
                      }}
                    >
                      {samlSpEntityId}
                    </div>
                    <button
                      type="button"
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
                        cursor: "pointer",
                        width: isCompactLayout ? "100%" : "auto",
                        alignSelf: isCompactLayout ? "stretch" : "auto",
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
                          d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Another SP Entity Id field */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SP Entity Id (Audience Restriction)
                      <span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      alignItems: isCompactLayout ? "stretch" : "center",
                      gap: isCompactLayout ? "12px" : "24px",
                      width: "100%",
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        overflow: isCompactLayout ? "visible" : "hidden",
                        textOverflow: isCompactLayout ? "clip" : "ellipsis",
                        whiteSpace: isCompactLayout ? "normal" : "nowrap",
                        overflowWrap: isCompactLayout ? "anywhere" : "normal",
                        wordBreak: isCompactLayout ? "break-word" : "normal",
                      }}
                    >
                      {samlSpEntityId}
                    </div>
                    <button
                      type="button"
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
                        cursor: "pointer",
                        width: isCompactLayout ? "100%" : "auto",
                        alignSelf: isCompactLayout ? "stretch" : "auto",
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
                          d="M8.74984 1.66908C8.1873 1.6767 7.84959 1.70927 7.57652 1.8484C7.26292 2.00819 7.00795 2.26316 6.84816 2.57676C6.70903 2.84983 6.67646 3.18754 6.66883 3.75008M16.2498 1.66908C16.8124 1.6767 17.1501 1.70927 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.2906 2.84983 18.3232 3.18754 18.3308 3.75007M18.3308 11.2501C18.3232 11.8126 18.2907 12.1503 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.1501 13.2909 16.8124 13.3235 16.2498 13.3311M18.3332 6.66674V8.33341M11.6665 1.66675H13.3331M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Enable SAML Authentication */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      Enable SAML Authentication
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <select
                    value={samlEnableAuth}
                    onChange={(e) => setSamlEnableAuth(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="Disable SAML Single Signon for this account">
                      Disable SAML Single Signon for this account
                    </option>
                    <option value="Enable SAML Single Signon for this account">
                      Enable SAML Single Signon for this account
                    </option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Use Mapped Usernames */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SAML Use Mapped Usernames
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <select
                    value={samlUseMappedUsernames}
                    onChange={(e) => setSamlUseMappedUsernames(e.target.value)}
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "48px",
                    }}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML SSO URL */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SAML SSO URL
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={samlSsoUrl}
                    onChange={(e) => setSamlSsoUrl(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML IdP Certificate */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SAML IdP Certificate
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <textarea
                    value={samlIdpCertificate}
                    onChange={(e) => setSamlIdpCertificate(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minHeight: "154px",
                      resize: "vertical",
                      padding: "12px 14px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Idp Issuer */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SAML Idp Issuer
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={samlIdpIssuer}
                    onChange={(e) => setSamlIdpIssuer(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Email Attribute */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SAML Email Attribute
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={samlEmailAttribute}
                    onChange={(e) => setSamlEmailAttribute(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minWidth: 0,
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Private Key */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SAML Private Key
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <textarea
                    value={samlPrivateKey}
                    onChange={(e) => setSamlPrivateKey(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minHeight: "154px",
                      resize: "vertical",
                      padding: "12px 14px",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* SAML Accio Certificate */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "stretch" : "flex-start",
                    gap: isCompactLayout ? "16px" : "16px 32px",
                    width: "100%",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: isCompactLayout ? "100%" : "auto",
                      minWidth: isCompactLayout ? "100%" : "200px",
                      maxWidth: isCompactLayout ? "100%" : "280px",
                      flex: isCompactLayout ? "0 0 auto" : "1 0 0",
                    }}
                  >
                    <label
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      SAML Accio Certificate
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <textarea
                    value={samlAccioCertificate}
                    onChange={(e) => setSamlAccioCertificate(e.target.value)}
                    placeholder="[Value]"
                    style={{
                      ...inputStyle,
                      maxWidth: isCompactLayout ? "100%" : "512px",
                      minHeight: "154px",
                      resize: "vertical",
                      padding: "12px 14px",
                    }}
                  />
                </div>

                {/* Footer with Cancel and Update buttons */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      width: "100%",
                      background: "#E9EAEB",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      justifyContent: isCompactLayout
                        ? "flex-start"
                        : "flex-end",
                      alignItems: isCompactLayout ? "stretch" : "center",
                      gap: isCompactLayout ? "12px" : "20px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        justifyContent: isCompactLayout
                          ? "flex-start"
                          : "flex-end",
                        alignItems: "center",
                        gap: isCompactLayout ? "8px" : "12px",
                        flex: "1 0 0",
                        width: isCompactLayout ? "100%" : "auto",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          display: "flex",
                          padding: "12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          width: isCompactLayout ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        style={{
                          display: "flex",
                          padding: "12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          width: isCompactLayout ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Team & Permissions Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}
                  >
                    Team & Permissions
                  </h2>
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Invite new users, assign roles, and customize permissions to
                    control what each team member can access or do within the
                    platform.
                  </p>
                </div>

                {/* Sub-tabs for Members and Role Permissions */}
                <div
                  style={{
                    display: "flex",
                    padding: "4px",
                    alignItems: "center",
                    alignContent: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    width: isCompactLayout ? "100%" : "fit-content",
                    alignSelf: isCompactLayout ? "stretch" : "flex-start",
                    borderRadius: "8px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxSizing: "border-box",
                  }}
                >
                  <button
                    onClick={() => setTeamSubTab('members')}
                    style={{
                      display: "flex",
                      height: "36px",
                      padding: "8px 12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "6px",
                      border: teamSubTab === 'members' ? "1px solid #B3BCE5" : "none",
                      background: teamSubTab === 'members' ? "#ECEEF9" : "transparent",
                      color: teamSubTab === 'members' ? "#273572" : "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Members
                  </button>
                  <button
                    onClick={() => setTeamSubTab('permissions')}
                    style={{
                      display: "flex",
                      height: "36px",
                      padding: "8px 12px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "6px",
                      border: teamSubTab === 'permissions' ? "1px solid #B3BCE5" : "none",
                      background: teamSubTab === 'permissions' ? "#ECEEF9" : "transparent",
                      color: teamSubTab === 'permissions' ? "#273572" : "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Role Permissions
                  </button>
                </div>

                {/* Members Table Section */}
                {teamSubTab === 'members' && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    overflow: "hidden",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Table Header */}
                  <div
                    style={{
                      display: "flex",
                      padding: "16px 16px 12px 16px",
                      flexDirection: "column",
                      gap: "16px",
                      width: "100%",
                      boxSizing: "border-box",
                      borderBottom: "1px solid #E9EAEB",
                    }}
                  >
                    {/* Top row with title and search/view toggle */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isTablet ? "row" : isMobile ? "column" : "row",
                        alignItems: isTablet ? "flex-end" : isMobile ? "flex-start" : "center",
                        gap: isTablet ? "4px" : "16px",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          flex: isTablet || isDesktop ? "1 0 0" : "auto",
                          color: "#181D27",
                          fontFamily: "Public Sans",
                          fontSize: "18px",
                          fontWeight: 600,
                          lineHeight: "28px",
                        }}
                      >
                        Members
                      </div>

                      {isTablet && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            flex: "1 0 0",
                          }}
                        >
                          {/* View Toggle Button Group */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <button
                              style={{
                                display: "flex",
                                minHeight: "40px",
                                padding: "8px 12px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "6px",
                                borderRight: "1px solid #D5D7DA",
                                background: "#D9DEF2",
                                border: "none",
                                borderRadius: "0",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                width="24"
                                height="20"
                                viewBox="0 0 24 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 7.5L21 7.5M9 2.5L9 17.5M7.8 2.5H16.2C17.8802 2.5 18.7202 2.5 19.362 2.77248C19.9265 3.01217 20.3854 3.39462 20.673 3.86502C21 4.3998 21 5.09987 21 6.5V13.5C21 14.9001 21 15.6002 20.673 16.135C20.3854 16.6054 19.9265 16.9878 19.362 17.2275C18.7202 17.5 17.8802 17.5 16.2 17.5H7.8C6.11984 17.5 5.27976 17.5 4.63803 17.2275C4.07354 16.9878 3.6146 16.6054 3.32698 16.135C3 15.6002 3 14.9001 3 13.5V6.5C3 5.09987 3 4.3998 3.32698 3.86502C3.6146 3.39462 4.07354 3.01217 4.63803 2.77248C5.27976 2.5 6.11984 2.5 7.8 2.5Z"
                                  stroke="#344698"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              style={{
                                display: "flex",
                                minHeight: "40px",
                                padding: "8px 12px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "6px",
                                background: "#FFF",
                                border: "none",
                                borderRadius: "0",
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
                                  d="M17.8 10C18.9201 10 19.4802 10 19.908 9.78201C20.2843 9.59027 20.5903 9.28431 20.782 8.90798C21 8.48016 21 7.92011 21 6.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3L6.2 3C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2L3 6.8C3 7.9201 3 8.48016 3.21799 8.90798C3.40973 9.28431 3.71569 9.59027 4.09202 9.78201C4.51984 10 5.07989 10 6.2 10L17.8 10Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M17.8 21C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V17.2C21 16.0799 21 15.5198 20.782 15.092C20.5903 14.7157 20.2843 14.4097 19.908 14.218C19.4802 14 18.9201 14 17.8 14L6.2 14C5.0799 14 4.51984 14 4.09202 14.218C3.71569 14.4097 3.40973 14.7157 3.21799 15.092C3 15.5198 3 16.0799 3 17.2L3 17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Search Input */}
                          <input
                            type="text"
                            placeholder="Search by users or by roles"
                            style={{
                              display: "flex",
                              height: "40px",
                              padding: "8px",
                              alignItems: "center",
                              gap: "8px",
                              flex: "1 0 0",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              color: "#717680",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      )}

                      {!isTablet && !isMobile && (
                        <input
                          type="text"
                          placeholder="Search by users or by roles"
                          style={{
                            display: "flex",
                            height: "40px",
                            padding: "8px",
                            alignItems: "center",
                            gap: "8px",
                            width: "234px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      )}
                    </div>

                    {/* Action buttons row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        alignSelf: isTablet || isMobile ? "stretch" : "flex-end",
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      {isMobile && (
                        <input
                          type="text"
                          placeholder="Search by users or by roles"
                          style={{
                            display: "flex",
                            height: "40px",
                            padding: "8px",
                            alignItems: "center",
                            gap: "8px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      )}
                      <button
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          flex: isTablet ? "1 0 0" : isMobile ? "auto" : "auto",
                          width: isMobile ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Filters
                      </button>
                      <button
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          flex: isTablet ? "1 0 0" : isMobile ? "auto" : "auto",
                          width: isMobile ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Download
                      </button>
                      <button
                        onClick={() => navigate("/invite-new-member")}
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          flex: isTablet ? "1 0 0" : isMobile ? "auto" : "auto",
                          width: isMobile ? "100%" : "auto",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Invite New Member
                      </button>
                    </div>
                  </div>

                  {/* Table Content - Responsive */}
                  <div
                    style={{
                      width: "100%",
                      overflowX: isMobile ? "auto" : "visible",
                      boxSizing: "border-box",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        minWidth: isMobile ? "800px" : "100%",
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid #E9EAEB",
                            background: "#FFF",
                          }}
                        >
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Name
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66669 10.0001L8.00002 13.3334L11.3334 10.0001M4.66669 6.00008L8.00002 2.66675L11.3334 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Email
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66669 10.0001L8.00002 13.3334L11.3334 10.0001M4.66669 6.00008L8.00002 2.66675L11.3334 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Role
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66669 10.0001L8.00002 13.3334L11.3334 10.0001M4.66669 6.00008L8.00002 2.66675L11.3334 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Department
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66669 10.0001L8.00002 13.3334L11.3334 10.0001M4.66669 6.00008L8.00002 2.66675L11.3334 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Last Active/ Invited
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66667 10.0001L8 13.3334L11.3333 10.0001M4.66667 6.00008L8 2.66675L11.3333 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Status
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66666 10.0001L8 13.3334L11.3333 10.0001M4.66666 6.00008L8 2.66675L11.3333 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                          <th
                            style={{
                              padding: "6px 12px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  lineHeight: "18px",
                                }}
                              >
                                Actions
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66667 10.0001L8 13.3334L11.3333 10.0001M4.66667 6.00008L8 2.66675L11.3333 6.00008"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Lucas Hernandez",
                            email: "admin@acciodata.com",
                            role: "Editor",
                            department: "Finance",
                            lastActive: "Feb 22, 2025, 08:10 PM",
                            status: "Inactive",
                          },
                          {
                            name: "Isabella Rodriguez",
                            email: "support@acciodata.com",
                            role: "Editor",
                            department: "Human Resources",
                            lastActive: "Mar 10, 2025, 09:30 AM",
                            status: "Active",
                          },
                          {
                            name: "Mason Martinez",
                            email: "sso@acciodata.com",
                            role: "Orders Only",
                            department: "Talent Acquisition",
                            lastActive: "Invited Jan 10, 2025",
                            status: "Pending",
                          },
                          {
                            name: "Emma Johnson",
                            email: "deactivate@acciodata.com",
                            role: "Admin",
                            department: "Accounting",
                            lastActive: "May 18, 2025, 11:45 AM",
                            status: "Active",
                          },
                          {
                            name: "Noah Davis",
                            email: "security@acciodata.com",
                            role: "Orders Only",
                            department: "Customer Support",
                            lastActive: "Jun 30, 2025, 03:00 PM",
                            status: "Inactive",
                          },
                          {
                            name: "Liam Smith",
                            email: "newdevice@acciodata.com",
                            role: "Admin",
                            department: "Recruitment",
                            lastActive: "Invited Jan 10, 2025",
                            status: "Pending",
                          },
                          {
                            name: "Ethan Miller",
                            email: "alerts@acciodata.com",
                            role: "Admin",
                            department: "Employee Relations",
                            lastActive: "Aug 25, 2025, 01:30 PM",
                            status: "Inactive",
                          },
                          {
                            name: "Olivia Brown",
                            email: "export@acciodata.com",
                            role: "Orders Only",
                            department: "Training and Development",
                            lastActive: "Sep 14, 2025, 04:00 PM",
                            status: "Active",
                          },
                          {
                            name: "Sophia Garcia",
                            email: "timeout@acciodata.com",
                            role: "Editor",
                            department: "Payroll",
                            lastActive: "Oct 29, 2025, 12:00 PM",
                            status: "Active",
                          },
                          {
                            name: "Ava Wilson",
                            email: "settings@acciodata.com",
                            role: "Editor",
                            department: "Workplace Culture",
                            lastActive: "Nov 11, 2025, 05:15 PM",
                            status: "Active",
                          },
                        ].map((member, index) => (
                          <tr
                            key={index}
                            onMouseEnter={() => setHoveredRowIndex(index)}
                            onMouseLeave={() => setHoveredRowIndex(null)}
                            style={{
                              borderBottom: "1px solid #E9EAEB",
                              background:
                                hoveredRowIndex === index
                                  ? "#F5F5F5"
                                  : "transparent",
                              transition: "background-color 0.15s ease",
                            }}
                          >
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.name}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.email}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.role}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.department}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {member.lastActive}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border:
                                    member.status === "Active"
                                      ? "1px solid #ABEFC6"
                                      : member.status === "Pending"
                                        ? "1px solid #B2DDFF"
                                        : "1px solid #E9EAEB",
                                  background:
                                    member.status === "Active"
                                      ? "#ECFDF3"
                                      : member.status === "Pending"
                                        ? "#EFF8FF"
                                        : "#FAFAFA",
                                  color:
                                    member.status === "Active"
                                      ? "#067647"
                                      : member.status === "Pending"
                                        ? "#175CD3"
                                        : "#414651",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {member.status}
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                textAlign: "center",
                                position: "relative",
                              }}
                            >
                              <button
                                onClick={() =>
                                  setOpenDropdownIndex(
                                    openDropdownIndex === index ? null : index,
                                  )
                                }
                                style={{
                                  display: "inline-flex",
                                  padding: "8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border: "none",
                                  background:
                                    hoveredRowIndex === index
                                      ? "#FDFDFD"
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
                                    d="M8 8.66675C8.36819 8.66675 8.66667 8.36827 8.66667 8.00008C8.66667 7.63189 8.36819 7.33341 8 7.33341C7.63181 7.33341 7.33333 7.63189 7.33333 8.00008C7.33333 8.36827 7.63181 8.66675 8 8.66675Z"
                                    stroke="#717680"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 4.00008C8.36819 4.00008 8.66667 3.7016 8.66667 3.33341C8.66667 2.96522 8.36819 2.66675 8 2.66675C7.63181 2.66675 7.33333 2.96522 7.33333 3.33341C7.33333 3.7016 7.63181 4.00008 8 4.00008Z"
                                    stroke="#717680"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 13.3334C8.36819 13.3334 8.66667 13.0349 8.66667 12.6667C8.66667 12.2986 8.36819 12.0001 8 12.0001C7.63181 12.0001 7.33333 12.2986 7.33333 12.6667C7.33333 13.0349 7.63181 13.3334 8 13.3334Z"
                                    stroke="#717680"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                              {openDropdownIndex === index && (
                                <div
                                  data-dropdown-menu
                                  style={{
                                    position: "absolute",
                                    right: "20px",
                                    top: "50px",
                                    zIndex: 1000,
                                    minWidth: "180px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(0, 0, 0, 0.08)",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "4px 0",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      onClick={() => {
                                        navigate("/edit-member", { state: { member } });
                                        setOpenDropdownIndex(null);
                                      }}
                                      style={{
                                        display: "flex",
                                        padding: "1px 6px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.background =
                                            "#F9FAFB")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.background =
                                            "transparent")
                                        }
                                        style={{
                                          display: "flex",
                                          padding: "8px",
                                          alignItems: "center",
                                          gap: "8px",
                                          borderRadius: "6px",
                                          cursor: "pointer",
                                          transition: "background 0.15s ease",
                                          width: "100%",
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
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div
                                          style={{
                                            color: "#181D27",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          Edit Member
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      onClick={() => {
                                        console.log(
                                          "Resent Invite",
                                          member.name,
                                        );
                                        setOpenDropdownIndex(null);
                                      }}
                                      style={{
                                        display: "flex",
                                        padding: "1px 6px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.background =
                                            "#F9FAFB")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.background =
                                            "transparent")
                                        }
                                        style={{
                                          display: "flex",
                                          padding: "8px",
                                          alignItems: "center",
                                          gap: "8px",
                                          borderRadius: "6px",
                                          cursor: "pointer",
                                          transition: "background 0.15s ease",
                                          width: "100%",
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
                                            d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div
                                          style={{
                                            color: "#181D27",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          Resent Invite
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      onClick={() => {
                                        setUserToDelete({ id: index, name: member.name });
                                        setDeleteUserModalOpen(true);
                                        setOpenDropdownIndex(null);
                                      }}
                                      style={{
                                        display: "flex",
                                        padding: "1px 6px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.background =
                                            "#F9FAFB")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.background =
                                            "transparent")
                                        }
                                        style={{
                                          display: "flex",
                                          padding: "8px",
                                          alignItems: "center",
                                          gap: "8px",
                                          borderRadius: "6px",
                                          cursor: "pointer",
                                          transition: "background 0.15s ease",
                                          width: "100%",
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
                                            d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div
                                          style={{
                                            color: "#181D27",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          Remove Users
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isCompactLayout ? "column" : "row",
                      padding: "12px 16px",
                      justifyContent: isMobile ? "center" : "space-between",
                      alignItems: "center",
                      width: "100%",
                      borderTop: "1px solid #E9EAEB",
                      gap: isMobile ? "12px" : "0",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        minWidth: isMobile ? "auto" : "150px",
                      }}
                    >
                      Showing [X] of [X]
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isCompactLayout ? "column" : "row",
                        alignItems: "center",
                        gap: "12px",
                        justifyContent: "center",
                        flex: isMobile ? "0" : "1",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <button
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
                          ←
                        </button>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <div
                            style={{
                              display: "flex",
                              width: "32px",
                              height: "32px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #E9EAEB",
                              background: "#F5F5F5",
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            1
                          </div>
                          {[2, 3, "...", 8, 9, 10].map((page, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                width: "32px",
                                height: "32px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                cursor: page === "..." ? "default" : "pointer",
                              }}
                            >
                              {page}
                            </div>
                          ))}
                        </div>
                        <button
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
                          →
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Go to
                        </span>
                        <input
                          type="text"
                          defaultValue="1010"
                          style={{
                            display: "flex",
                            height: "32px",
                            width: "72px",
                            padding: "6px 8px",
                            alignItems: "center",
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
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Role Permissions Section */}
                {teamSubTab === 'permissions' && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                      width: "100%",
                    }}
                  >
                    {rolePermissions.map((category, categoryIndex) => (
                      <div
                        key={category.title}
                        style={{ display: "flex", flexDirection: "column", width: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "16px 16px 12px 16px",
                            borderRadius: "12px 12px 0 0",
                            border: "1px solid #E9EAEB",
                            borderBottom: "none",
                            background: "#FFF",
                          }}
                        >
                          <h3
                            style={{
                              color: "#181D27",
                              fontFamily: "Public Sans",
                              fontSize: "18px",
                              fontWeight: 600,
                              lineHeight: "28px",
                              margin: 0,
                            }}
                          >
                            {category.title}
                          </h3>
                        </div>
                        <div
                          style={{
                            border: "1px solid #E9EAEB",
                            borderRadius: "0 0 12px 12px",
                            background: "#FFF",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              maxHeight: isMobile ? "320px" : "none",
                              overflowY: isMobile ? "auto" : "visible",
                              overflowX: "auto",
                              WebkitOverflowScrolling: "touch",
                            }}
                          >
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                              <thead>
                                <tr style={{ borderBottom: "1px solid #E9EAEB" }}>
                                  <th
                                    style={{
                                      padding: "6px 12px",
                                      textAlign: "left",
                                      fontFamily: "Public Sans",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                      color: "#717680",
                                    }}
                                  >
                                    Permissions
                                  </th>
                                  {ROLE_COLUMNS.map((role) => (
                                    <th
                                      key={role.key}
                                      style={{
                                        padding: "6px 12px",
                                        textAlign: "left",
                                        fontFamily: "Public Sans",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        color: "#717680",
                                      }}
                                    >
                                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                        {role.label}
                                        {role.locked && (
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M11.9333 7.33333V5.33333C11.9333 3.49238 10.4409 2 8.59993 2C6.75899 2 5.2666 3.49238 5.2666 5.33333V7.33333M6.4666 14H10.7333C11.8534 14 12.4134 14 12.8412 13.782C13.2176 13.5903 13.5235 13.2843 13.7153 12.908C13.9333 12.4802 13.9333 11.9201 13.9333 10.8V10.5333C13.9333 9.41323 13.9333 8.85318 13.7153 8.42535C13.5235 8.04903 13.2176 7.74307 12.8412 7.55132C12.4134 7.33333 11.8534 7.33333 10.7333 7.33333H6.4666C5.3465 7.33333 4.78644 7.33333 4.35862 7.55132C3.9823 7.74307 3.67634 8.04903 3.48459 8.42535C3.2666 8.85318 3.2666 9.41323 3.2666 10.5333V10.8C3.2666 11.9201 3.2666 12.4802 3.48459 12.908C3.67634 13.2843 3.9823 13.5903 4.35862 13.782C4.78644 14 5.3465 14 6.4666 14Z"
                                              stroke="#A4A7AE"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        )}
                                      </div>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {category.permissions.map((permission, permissionIndex) => (
                                  <tr
                                    key={`${category.title}-${permission.label}-${permissionIndex}`}
                                    style={{
                                      borderBottom:
                                        permissionIndex < category.permissions.length - 1
                                          ? "1px solid #E9EAEB"
                                          : "none",
                                    }}
                                  >
                                    <td
                                      style={{
                                        padding: "12px",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        color: "#181D27",
                                      }}
                                    >
                                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                        {permission.label}
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M6.05967 5.99992C6.21641 5.55436 6.52578 5.17866 6.93298 4.93934C7.34018 4.70002 7.81894 4.61254 8.28446 4.69239C8.74998 4.77224 9.17222 5.01427 9.47639 5.3756C9.78057 5.73694 9.94705 6.19427 9.94634 6.66659C9.94634 7.99992 7.94634 8.66659 7.94634 8.66659M7.99967 11.3333H8.00634M14.6663 7.99992C14.6663 11.6818 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6818 1.33301 7.99992C1.33301 4.31802 4.31778 1.33325 7.99967 1.33325C11.6816 1.33325 14.6663 4.31802 14.6663 7.99992Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.33333"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                    </td>
                                    {ROLE_COLUMNS.map((role) => {
                                      const locked = Boolean(role.locked);
                                      const isOn = permission.roles[role.key];
                                      return (
                                        <td key={role.key} style={{ padding: "12px" }}>
                                          <button
                                            type="button"
                                            aria-pressed={isOn}
                                            aria-label={`${role.label} permission for ${permission.label}${locked ? " (locked)" : ""}`}
                                            disabled={locked}
                                            onClick={() =>
                                              handlePermissionToggle(
                                                categoryIndex,
                                                permissionIndex,
                                                role.key,
                                              )
                                            }
                                            style={getToggleStyle(isOn, locked)}
                                          >
                                            <span style={getToggleKnobStyle(locked)} />
                                          </button>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}


          {activeTab === "adjudication" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Adjudication Email Management Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}
                  >
                    Adjudication Email Management
                  </h2>
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Easily upload or export adjudication email addresses to manage your review notifications. Use our template to get started or drag and drop your file below.
                  </p>
                </div>

                {/* Upload Card */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    overflow: "hidden",
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={{
                      display: "flex",
                      padding: "16px 16px 12px 16px",
                      alignItems: "center",
                      gap: "16px",
                      alignSelf: "stretch",
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
                      }}
                    >
                      <h3
                        style={{
                          color: "#181D27",
                          fontFamily: "Public Sans",
                          fontSize: "18px",
                          fontWeight: 600,
                          lineHeight: "28px",
                          margin: 0,
                        }}
                      >
                        Import/Export Adjudication Emails
                      </h3>
                    </div>
                    <button
                      type="button"
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
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F5F5F5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#FFF";
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
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          Download Adjudication Emails
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Upload Area */}
                  <TerminationUploadArea isMobile={isMobile} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <p style={{ color: "#535862", fontFamily: "Public Sans" }}>
                Resources content coming soon...
              </p>
            </div>
          )}

          {activeTab === "invoices" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Invoices & Billing History Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}
                  >
                    Invoices & Billing History
                  </h2>
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Access and download all your past invoices. Keep track of your billing details and payment history in one place.
                  </p>
                </div>

                {/* Invoices Table */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Table Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      borderRadius: "12px 12px 0 0",
                      border: "1px solid #E9EAEB",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "16px 16px 12px 16px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Title */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: isMobile ? "1 1 100%" : "1 0 0",
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
                            }}
                          >
                            <h3
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "18px",
                                fontWeight: 600,
                                lineHeight: "28px",
                                margin: 0,
                              }}
                            >
                              Invoices
                            </h3>
                          </div>
                        </div>

                        {/* Actions */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            flexWrap: "wrap",
                            flex: isMobile ? "1 1 100%" : "0 0 auto",
                          }}
                        >
                          {/* Search Input */}
                          <div
                            style={{
                              display: "flex",
                              height: "40px",
                              padding: "8px",
                              alignItems: "center",
                              gap: "8px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              width: isMobile ? "100%" : "320px",
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
                              placeholder="Search by user, type or price"
                              style={{
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                flex: "1 0 0",
                              }}
                            />
                          </div>

                          {/* Download All Button */}
                          <button
                            type="button"
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
                              boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                              width: isMobile ? "100%" : "auto",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#F5F5F5";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#FFF";
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
                            <span
                              style={{
                                color: "#414651",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: "20px",
                              }}
                            >
                              Download All
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      borderRight: "1px solid #E9EAEB",
                      borderBottom: "1px solid #E9EAEB",
                      borderLeft: "1px solid #E9EAEB",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      overflowX: "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        minWidth: isMobile ? "800px" : "auto",
                      }}
                    >
                      {/* Invoices Column */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flex: "1 0 0",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Invoices
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          "15 Mar, 2025",
                          "22 Jul, 2025",
                          "10 Nov, 2025",
                          "5 Ene, 2025",
                          "30 Abr, 2025",
                          "8 Sep, 2025",
                          "12 Jun, 2025",
                          "25 Ago, 2025",
                          "3 Feb, 2025",
                          "27 Oct, 2025",
                        ].map((date, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              gap: "6px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <span
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {date}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Status Column */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flex: "1 0 0",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Status
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          "Paid",
                          "Paid",
                          "Pending",
                          "Paid",
                          "Paid",
                          "Pending",
                          "Paid",
                          "Paid",
                          "Paid",
                          "Paid",
                        ].map((status, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "2px 8px",
                                alignItems: "center",
                                borderRadius: "9999px",
                                border: `1px solid ${status === "Paid" ? "#ABEFC6" : "#B2DDFF"}`,
                                background: status === "Paid" ? "#ECFDF3" : "#EFF8FF",
                              }}
                            >
                              <span
                                style={{
                                  color: status === "Paid" ? "#067647" : "#175CD3",
                                  textAlign: "center",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* User Column */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flex: "1 0 0",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              User
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          "Lucas Hernandez",
                          "Isabella Rodriguez",
                          "Mason Martinez",
                          "Emma Johnson",
                          "Noah Davis",
                          "Liam Smith",
                          "Ethan Miller",
                          "Olivia Brown",
                          "Sophia Garcia",
                          "Ava Wilson",
                        ].map((user, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              gap: "6px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <span
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {user}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Type Column */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flex: "1 0 0",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Type
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          "I-9 Order",
                          "Batch Order",
                          "Court Order",
                          "CSD Standard Order",
                          "I-9 Order",
                          "CSD Standard Order",
                          "I-9 Order",
                          "CSD Standard Order",
                          "I-9 Order",
                          "Court Order",
                        ].map((type, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              gap: "6px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <span
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {type}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Price Column */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flex: "1 0 0",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Price
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          "$12.45",
                          "$27.89",
                          "$33.50",
                          "$19.99",
                          "$29.99",
                          "$15.60",
                          "$37.25",
                          "$22.30",
                          "$8.75",
                          "$45.00",
                        ].map((price, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              gap: "6px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <span
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {price}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Actions Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "102px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Actions
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {Array(10)
                          .fill(null)
                          .map((_, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                height: "52px",
                                padding: "12px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                              }}
                            >
                              <button
                                type="button"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: 0,
                                }}
                              >
                                <span
                                  style={{
                                    color: "#273572",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                    textDecoration: "underline",
                                  }}
                                >
                                  Download
                                </span>
                              </button>
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
                        flexWrap: isMobile ? "wrap" : "nowrap",
                        gap: isMobile ? "12px" : "0",
                      }}
                    >
                      {/* Showing Total */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Showing [X] of [X]
                        </span>
                      </div>

                      {/* Pagination Numbers */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {/* Previous Button */}
                        <button
                          type="button"
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                              d="M19 12H5M5 12L12 19M5 12L12 5"
                              stroke="#A4A7AE"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Page Numbers */}
                        <div
                          style={{
                            display: "flex",
                            width: "32px",
                            height: "32px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #E9EAEB",
                            background: "#F5F5F5",
                          }}
                        >
                          <span
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            1
                          </span>
                        </div>
                        {[2, 3].map((num) => (
                          <div
                            key={num}
                            style={{
                              display: "flex",
                              width: "32px",
                              height: "32px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {num}
                            </span>
                          </div>
                        ))}
                        <span
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          ...
                        </span>
                        {[8, 9, 10].map((num) => (
                          <div
                            key={num}
                            style={{
                              display: "flex",
                              width: "32px",
                              height: "32px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {num}
                            </span>
                          </div>
                        ))}

                        {/* Next Button */}
                        <button
                          type="button"
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="#A4A7AE"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Go to */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Go to
                        </span>
                        <input
                          type="text"
                          placeholder="1010"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* Audit Logs Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}
                  >
                    Audit Logs
                  </h2>
                  <p
                    style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: "2px 0 0 0",
                    }}
                  >
                    View and track all administrative changes and security events
                  </p>
                </div>

                {/* Logs Table */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Table Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      borderRadius: "12px 12px 0 0",
                      border: "1px solid #E9EAEB",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "16px 16px 12px 16px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Title */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: isMobile ? "1 1 100%" : "1 0 0",
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
                            }}
                          >
                            <h3
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "18px",
                                fontWeight: 600,
                                lineHeight: "28px",
                                margin: 0,
                              }}
                            >
                              Logs
                            </h3>
                          </div>
                        </div>

                        {/* Actions */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            flexWrap: "wrap",
                            flex: isMobile ? "1 1 100%" : "0 0 auto",
                          }}
                        >
                          {/* Search Input */}
                          <div
                            style={{
                              display: "flex",
                              height: "40px",
                              padding: "8px",
                              alignItems: "center",
                              gap: "8px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              width: isMobile ? "100%" : "234px",
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
                              placeholder="Search by logs or user"
                              style={{
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                                flex: "1 0 0",
                              }}
                            />
                          </div>

                          {/* Filters Button */}
                          <button
                            type="button"
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
                              boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#F5F5F5";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#FFF";
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
                                d="M3.33333 14L3.33333 10M3.33333 10C4.06971 10 4.66667 9.40305 4.66667 8.66667C4.66667 7.93029 4.06971 7.33333 3.33333 7.33333C2.59695 7.33333 2 7.93029 2 8.66667C2 9.40305 2.59695 10 3.33333 10ZM3.33333 4.66667V2M8 14V10M8 4.66667V2M8 4.66667C7.26362 4.66667 6.66667 5.26362 6.66667 6C6.66667 6.73638 7.26362 7.33333 8 7.33333C8.73638 7.33333 9.33333 6.73638 9.33333 6C9.33333 5.26362 8.73638 4.66667 8 4.66667ZM12.6667 14V11.3333M12.6667 11.3333C13.403 11.3333 14 10.7364 14 10C14 9.26362 13.403 8.66667 12.6667 8.66667C11.9303 8.66667 11.3333 9.26362 11.3333 10C11.3333 10.7364 11.9303 11.3333 12.6667 11.3333ZM12.6667 6V2"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span
                              style={{
                                color: "#414651",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: "20px",
                              }}
                            >
                              Filters
                            </span>
                          </button>

                          {/* Download Button */}
                          <button
                            type="button"
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
                              boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#F5F5F5";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#FFF";
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
                            <span
                              style={{
                                color: "#414651",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: "20px",
                              }}
                            >
                              Download
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 16px 16px 16px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      borderRadius: "0px 0px 12px 12px",
                      borderRight: "1px solid #E9EAEB",
                      borderBottom: "1px solid #E9EAEB",
                      borderLeft: "1px solid #E9EAEB",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      overflowX: "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        minWidth: isMobile ? "1000px" : "auto",
                      }}
                    >
                      {/* Timestamp Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "108px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Timestamp
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {Array(10)
                          .fill("Oct 01,  13:15")
                          .map((timestamp, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                height: "52px",
                                padding: "12px",
                                alignItems: "center",
                                gap: "6px",
                                alignSelf: "stretch",
                                borderBottom: "1px solid #E9EAEB",
                              }}
                            >
                              <span
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                {timestamp}
                              </span>
                            </div>
                          ))}
                      </div>

                      {/* User & IP Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "158px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              User & IP
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          { name: "Olivia Rhye", ip: "172.20.10.5" },
                          { name: "Olivia Rhye", ip: "10.0.1.15" },
                          { name: "Olivia Rhye", ip: "192.168.1.200" },
                          { name: "Olivia Rhye", ip: "10.0.0.1" },
                          { name: "Olivia Rhye", ip: "10.1.1.5" },
                          { name: "Olivia Rhye", ip: "172.16.254.3" },
                          { name: "Olivia Rhye", ip: "172.31.0.2" },
                          { name: "Olivia Rhye", ip: "192.168.100.25" },
                          { name: "Olivia Rhye", ip: "10.10.10.10" },
                          { name: "Olivia Rhye", ip: "192.168.50.10" },
                        ].map((user, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <span
                                style={{
                                  color: "#181D27",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                {user.name}
                              </span>
                              <span
                                style={{
                                  color: "#535862",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  lineHeight: "20px",
                                }}
                              >
                                {user.ip}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Description Column */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          flex: "1 0 0",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Description
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          "User Role Administration",
                          "API Rate Limit",
                          "SSO Configuration",
                          "User Account Deactivation",
                          "Two Factor Authentication",
                          "New Device Login",
                          "Email Notifications",
                          "User Data Export",
                          "Session Timeout",
                          "Notification Settings",
                        ].map((desc, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              gap: "6px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <span
                              style={{
                                color: "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {desc}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Change Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "228px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Change
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          { from: "Enable", to: "Disable", arrow: true },
                          { from: "Off", to: "On", arrow: true },
                          { from: "Enable", to: "Disable", arrow: true },
                          { from: "Active Account", to: "Deactivated", arrow: true },
                          { from: "On", to: "Off", arrow: true },
                          { from: "New device detected", to: null, arrow: false },
                          { from: "Weekly", to: "Off", arrow: true },
                          { from: "Exported 1,250 Records", to: null, arrow: false },
                          { from: "30 mins", to: "60 mins", arrow: true },
                          { from: "Active", to: "Inactive", arrow: true },
                        ].map((change, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              gap: "8px",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <span
                              style={{
                                color: change.to ? "#535862" : "#181D27",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {change.from}
                            </span>
                            {change.arrow && (
                              <>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.66797 8H13.3346M13.3346 8L9.33464 4M13.3346 8L9.33464 12"
                                    stroke="#717680"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  {change.to}
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Severity Column */}
                      <div
                        style={{
                          display: "flex",
                          width: "108px",
                          flexDirection: "column",
                          alignItems: "flex-start",
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
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontWeight: 600,
                                lineHeight: "18px",
                              }}
                            >
                              Severity
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66602 10.0001L7.99935 13.3334L11.3327 10.0001M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Rows */}
                        {[
                          { level: "Low", type: "low" },
                          { level: "Medium", type: "medium" },
                          { level: "High", type: "high" },
                          { level: "High", type: "high" },
                          { level: "Low", type: "low" },
                          { level: "Medium", type: "medium" },
                          { level: "Low", type: "low" },
                          { level: "High", type: "high" },
                          { level: "Medium", type: "medium" },
                          { level: "Medium", type: "medium" },
                        ].map((severity, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              height: "52px",
                              padding: "12px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              borderBottom: "1px solid #E9EAEB",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "2px 8px 2px 6px",
                                alignItems: "center",
                                gap: "2px",
                                borderRadius: "9999px",
                                border: `1px solid ${
                                  severity.type === "low"
                                    ? "#E9EAEB"
                                    : severity.type === "medium"
                                    ? "#FEDF89"
                                    : "#FECDCA"
                                }`,
                                background:
                                  severity.type === "low"
                                    ? "#FAFAFA"
                                    : severity.type === "medium"
                                    ? "#FFFAEB"
                                    : "#FEF3F2",
                              }}
                            >
                              {severity.type === "low" && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.9987 5.33325V7.99992M7.9987 10.6666H8.00536M1.33203 5.68175V10.3181C1.33203 10.4812 1.33203 10.5627 1.35045 10.6394C1.36678 10.7074 1.39372 10.7725 1.43027 10.8321C1.4715 10.8994 1.52915 10.957 1.64445 11.0723L4.92628 14.3542C5.04158 14.4695 5.09923 14.5271 5.16651 14.5683C5.22616 14.6049 5.29119 14.6318 5.35921 14.6482C5.43594 14.6666 5.51747 14.6666 5.68053 14.6666H10.3169C10.4799 14.6666 10.5615 14.6666 10.6382 14.6482C10.7062 14.6318 10.7712 14.6049 10.8309 14.5683C10.8982 14.5271 10.9558 14.4695 11.0711 14.3542L14.3529 11.0723C14.4682 10.957 14.5259 10.8994 14.5671 10.8321C14.6037 10.7725 14.6306 10.7074 14.6469 10.6394C14.6654 10.5627 14.6654 10.4812 14.6654 10.3181V5.68175C14.6654 5.51869 14.6654 5.43716 14.6469 5.36043C14.6306 5.29241 14.6037 5.22738 14.5671 5.16773C14.5259 5.10045 14.4682 5.0428 14.3529 4.9275L11.0711 1.64567C10.9558 1.53037 10.8982 1.47272 10.8309 1.43149C10.7712 1.39494 10.7062 1.368 10.6382 1.35167C10.5615 1.33325 10.4799 1.33325 10.3169 1.33325H5.68053C5.51747 1.33325 5.43594 1.33325 5.35921 1.35167C5.29119 1.368 5.22616 1.39494 5.16651 1.43149C5.09923 1.47272 5.04158 1.53037 4.92628 1.64567L1.64445 4.9275C1.52915 5.0428 1.4715 5.10045 1.43027 5.16773C1.39372 5.22738 1.36678 5.29241 1.35045 5.36043C1.33203 5.43716 1.33203 5.51869 1.33203 5.68175Z"
                                    stroke="#717680"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                              {severity.type === "medium" && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.9987 5.33325V7.99992M7.9987 10.6666H8.00536M14.6654 7.99992C14.6654 11.6818 11.6806 14.6666 7.9987 14.6666C4.3168 14.6666 1.33203 11.6818 1.33203 7.99992C1.33203 4.31802 4.3168 1.33325 7.9987 1.33325C11.6806 1.33325 14.6654 4.31802 14.6654 7.99992Z"
                                    stroke="#F79009"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                              {severity.type === "high" && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.99853 5.99991V8.66658M7.99853 11.3332H8.0052M7.07541 2.59439L1.59216 12.0655C1.28802 12.5908 1.13595 12.8535 1.15843 13.069C1.17803 13.2571 1.27654 13.4279 1.42945 13.5391C1.60475 13.6666 1.90826 13.6666 2.51528 13.6666H13.4818C14.0888 13.6666 14.3923 13.6666 14.5676 13.5391C14.7205 13.4279 14.819 13.2571 14.8386 13.069C14.8611 12.8535 14.709 12.5908 14.4049 12.0655L8.92166 2.59439C8.61861 2.07095 8.46709 1.80923 8.2694 1.72132C8.09696 1.64465 7.90011 1.64465 7.72767 1.72132C7.52998 1.80923 7.37846 2.07095 7.07541 2.59439Z"
                                    stroke="#F04438"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                              <span
                                style={{
                                  color:
                                    severity.type === "low"
                                      ? "#414651"
                                      : severity.type === "medium"
                                      ? "#B54708"
                                      : "#B42318",
                                  textAlign: "center",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {severity.level}
                              </span>
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
                        flexWrap: isMobile ? "wrap" : "nowrap",
                        gap: isMobile ? "12px" : "0",
                      }}
                    >
                      {/* Showing Total */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Showing [X] of [X]
                        </span>
                      </div>

                      {/* Pagination Numbers */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {/* Previous Button */}
                        <button
                          type="button"
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                              d="M19 12H5M5 12L12 19M5 12L12 5"
                              stroke="#A4A7AE"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Page Numbers */}
                        <div
                          style={{
                            display: "flex",
                            width: "32px",
                            height: "32px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #E9EAEB",
                            background: "#F5F5F5",
                          }}
                        >
                          <span
                            style={{
                              color: "#414651",
                              textAlign: "center",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          >
                            1
                          </span>
                        </div>
                        {[2, 3].map((num) => (
                          <div
                            key={num}
                            style={{
                              display: "flex",
                              width: "32px",
                              height: "32px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {num}
                            </span>
                          </div>
                        ))}
                        <span
                          style={{
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          ...
                        </span>
                        {[8, 9, 10].map((num) => (
                          <div
                            key={num}
                            style={{
                              display: "flex",
                              width: "32px",
                              height: "32px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              style={{
                                color: "#717680",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              {num}
                            </span>
                          </div>
                        ))}

                        {/* Next Button */}
                        <button
                          type="button"
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
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
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="#A4A7AE"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Go to */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                          }}
                        >
                          Go to
                        </span>
                        <input
                          type="text"
                          placeholder="1010"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "customization" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                width: "100%",
              }}
            >
              {/* Platform Customization */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <h2 style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    margin: 0,
                  }}>
                    Platform Customization
                  </h2>
                  <p style={{
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    margin: "2px 0 0 0",
                  }}>
                    Customize your platform's branding and appearance
                  </p>
                </div>

                {/* Brand Identity Card */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                  overflow: "hidden",
                }}>
                  {/* Header */}
                  <div style={{
                    padding: "16px 16px 12px 16px",
                    borderBottom: "1px solid #E9EAEB",
                  }}>
                    <h3 style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      margin: 0,
                    }}>
                      Brand Identity
                    </h3>
                  </div>

                  {/* Content */}
                  <div style={{
                    padding: "12px 16px 40px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}>
                    {/* Company Name & Custom Domain */}
                    <div style={{
                      display: "flex",
                      gap: "16px",
                      flexDirection: isCompactLayout ? "column" : "row",
                    }}>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}>
                          Custom Domain (Optional)
                        </label>
                        <input
                          type="text"
                          value={customDomain}
                          onChange={(e) => setCustomDomain(e.target.value)}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>

                    {/* Logo & Favicon Uploaders */}
                    <div style={{
                      display: "flex",
                      gap: "16px",
                      flexDirection: isCompactLayout ? "column" : "row",
                    }}>
                      {/* Logo */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                        <label style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}>
                          Logo
                        </label>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                          <div style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "9999px",
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            background: "#FFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4px",
                          }}>
                            <div style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "9999px",
                              border: "1px solid rgba(0, 0, 0, 0.08)",
                              background: "#F5F5F5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path d="M18.75 4.5H11.7C9.17976 4.5 7.91965 4.5 6.95704 4.99047C6.11031 5.4219 5.4219 6.11031 4.99047 6.95704C4.5 7.91965 4.5 9.17976 4.5 11.7V24.3C4.5 26.8202 4.5 28.0804 4.99047 29.043C5.4219 29.8897 6.11031 30.5781 6.95704 31.0095C7.91965 31.5 9.17976 31.5 11.7 31.5H25.5C26.895 31.5 27.5924 31.5 28.1647 31.3467C29.7176 30.9306 30.9306 29.7176 31.3467 28.1647C31.5 27.5924 31.5 26.895 31.5 25.5M28.5 12V3M24 7.5H33M15.75 12.75C15.75 14.4069 14.4069 15.75 12.75 15.75C11.0931 15.75 9.75 14.4069 9.75 12.75C9.75 11.0931 11.0931 9.75 12.75 9.75C14.4069 9.75 15.75 11.0931 15.75 12.75Z" stroke="#A4A7AE" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                          <div style={{
                            flex: 1,
                            padding: "16px 24px",
                            borderRadius: "12px",
                            border: "1px solid #E9EAEB",
                            background: "#FFF",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                            cursor: "pointer",
                          }}>
                            <div style={{ textAlign: "center" }}>
                              <span style={{
                                color: "#273572",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: "20px",
                              }}>Click to upload</span>
                              <span style={{
                                color: "#535862",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "20px",
                              }}> or drag and drop</span>
                            </div>
                            <p style={{
                              color: "#535862",
                              fontFamily: "Roboto Mono",
                              fontSize: "12px",
                              fontWeight: 400,
                              lineHeight: "18px",
                              margin: 0,
                            }}>
                              SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Favicon */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                        <label style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}>
                          Favicon
                        </label>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                          <div style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "9999px",
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            background: "#FFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4px",
                          }}>
                            <div style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "9999px",
                              border: "1px solid rgba(0, 0, 0, 0.08)",
                              background: "#F5F5F5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path d="M18.75 4.5H11.7C9.17976 4.5 7.91965 4.5 6.95704 4.99047C6.11031 5.4219 5.4219 6.11031 4.99047 6.95704C4.5 7.91965 4.5 9.17976 4.5 11.7V24.3C4.5 26.8202 4.5 28.0804 4.99047 29.043C5.4219 29.8897 6.11031 30.5781 6.95704 31.0095C7.91965 31.5 9.17976 31.5 11.7 31.5H25.5C26.895 31.5 27.5924 31.5 28.1647 31.3467C29.7176 30.9306 30.9306 29.7176 31.3467 28.1647C31.5 27.5924 31.5 26.895 31.5 25.5M28.5 12V3M24 7.5H33M15.75 12.75C15.75 14.4069 14.4069 15.75 12.75 15.75C11.0931 15.75 9.75 14.4069 9.75 12.75C9.75 11.0931 11.0931 9.75 12.75 9.75C14.4069 9.75 15.75 11.0931 15.75 12.75Z" stroke="#A4A7AE" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                          <div style={{
                            flex: 1,
                            padding: "16px 24px",
                            borderRadius: "12px",
                            border: "1px solid #E9EAEB",
                            background: "#FFF",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                            cursor: "pointer",
                          }}>
                            <div style={{ textAlign: "center" }}>
                              <span style={{
                                color: "#273572",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: "20px",
                              }}>Click to upload</span>
                              <span style={{
                                color: "#535862",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "20px",
                              }}> or drag and drop</span>
                            </div>
                            <p style={{
                              color: "#535862",
                              fontFamily: "Roboto Mono",
                              fontSize: "12px",
                              fontWeight: 400,
                              lineHeight: "18px",
                              margin: 0,
                            }}>
                              SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hint Text */}
                    <p style={{
                      color: "#535862",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      margin: 0,
                    }}>
                      Main logo: Recommended size 200x60px, PNG or SVG format<br/>
                      Favicon: Must be 32x32px or 16x16px, ICO, PNG, or SVG format<br/>
                      Use transparent backgrounds for best results
                    </p>

                    {/* Footer */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div style={{ height: "1px", background: "#E9EAEB" }} />
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                        <button type="button" style={{
                          padding: "12px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}>
                          Cancel
                        </button>
                        <button type="button" style={{
                          padding: "12px",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#FFF",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          cursor: "pointer",
                        }}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Appearance */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflow: "hidden",
              }}>
                <div style={{
                  padding: "16px 16px 12px 16px",
                  borderBottom: "1px solid #E9EAEB",
                }}>
                  <h3 style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    margin: 0,
                  }}>
                    Theme Appearance
                  </h3>
                </div>

                <div style={{ padding: "12px 16px 16px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Brand Color */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "504px" }}>
                    <div>
                      <h4 style={{
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        margin: 0,
                      }}>Brand color</h4>
                      <p style={{
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        margin: 0,
                      }}>Update your dashboard to your brand color.</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {['#535862', '#099250', '#1570EF', '#444CE7', '#6938EF', '#BA24D5', '#DD2590', '#E04F16'].map((color) => (
                          <div
                            key={color}
                            onClick={() => setBrandColor(color)}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "9999px",
                              border: "1px solid rgba(0, 0, 0, 0.10)",
                              background: color,
                              cursor: "pointer",
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}>Custom</span>
                        <div style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "9999px",
                          border: "1px solid rgba(0, 0, 0, 0.10)",
                          background: brandColor,
                          boxShadow: "0 0 0 2px #FFF, 0 0 0 4px #34479A",
                        }} />
                        <input
                          type="text"
                          value={brandColor}
                          onChange={(e) => setBrandColor(e.target.value)}
                          style={{
                            width: "96px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Display Preference */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                      <h4 style={{
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        margin: 0,
                      }}>Display preference</h4>
                      <p style={{
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        margin: 0,
                      }}>Switch between light and dark modes.</p>
                    </div>
                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                      {[
                        { id: 'system', label: 'System preference', image: 'https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F28061e34c4fb41358cd8bdc18c168d5d?format=webp&width=400' },
                        { id: 'light', label: 'Light mode', image: 'https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2Fca32016b7e2a487da3c1f68ed93d8ecb?format=webp&width=400' },
                        { id: 'dark', label: 'Dark mode', image: 'https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F7a6ae071236d46eb8447ef865a5c2f0d?format=webp&width=400' },
                      ].map((option) => (
                        <div key={option.id} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "240px" }}>
                          <div
                            onClick={() => setDisplayPreference(option.id as any)}
                            style={{
                              width: "200px",
                              height: "132px",
                              borderRadius: "10px",
                              border: displayPreference === option.id ? "1px solid #D5D7DA" : "1px solid #D5D7DA",
                              background: "#F5F5F5",
                              boxShadow: displayPreference === option.id ? "0 0 0 2px #FFF, 0 0 0 4px #34479A" : "none",
                              cursor: "pointer",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={option.image}
                              alt={option.label}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            {displayPreference === option.id && (
                              <div style={{
                                position: "absolute",
                                left: "8px",
                                top: "104px",
                                width: "20px",
                                height: "20px",
                                borderRadius: "9999px",
                                background: "#344698",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                                <div style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "9999px",
                                  background: "#FFF",
                                }} />
                              </div>
                            )}
                          </div>
                          <span style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}>{option.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* UI Styling */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                      <h4 style={{
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        margin: 0,
                      }}>UI Styling</h4>
                      <p style={{
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        margin: 0,
                      }}>Choose the corner style for the interface throughout your platform</p>
                    </div>
                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                      {[
                        { id: 'pill', label: 'Pill', radius: '9999px', image: 'https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F8458897a322d4066ad368c6e476937c6?format=webp&width=400' },
                        { id: 'round', label: 'Round', radius: '10px', image: 'https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2Fff2448386a5e4990b1f225aac0912e40?format=webp&width=400' },
                        { id: 'sharp', label: 'Sharp', radius: '0px', image: 'https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2Fe8f87c4fe87c45c5bfd50e88a3f56f99?format=webp&width=400' },
                      ].map((option) => (
                        <div key={option.id} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "240px" }}>
                          <div
                            onClick={() => setUiStyling(option.id as any)}
                            style={{
                              width: "200px",
                              height: "132px",
                              borderRadius: "10px",
                              border: "1px solid #D5D7DA",
                              background: "#F5F5F5",
                              boxShadow: uiStyling === option.id ? "0 0 0 2px #FFF, 0 0 0 4px #34479A" : "none",
                              cursor: "pointer",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={option.image}
                              alt={option.label}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            {uiStyling === option.id && (
                              <div style={{
                                position: "absolute",
                                left: "8px",
                                top: "104px",
                                width: "20px",
                                height: "20px",
                                borderRadius: "9999px",
                                background: "#344698",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                                <div style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "9999px",
                                  background: "#FFF",
                                }} />
                              </div>
                            )}
                          </div>
                          <span style={{
                            color: "#181D27",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}>{option.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                      <button type="button" style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}>
                        Cancel
                      </button>
                      <button type="button" style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "2px solid rgba(255, 255, 255, 0.12)",
                        background: "#344698",
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        color: "#FFF",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}>
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Customization */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflow: "hidden",
              }}>
                <div style={{
                  padding: "16px 16px 12px 16px",
                  borderBottom: "1px solid #E9EAEB",
                }}>
                  <h3 style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    margin: 0,
                  }}>
                    Additional Customization
                  </h3>
                </div>

                <div style={{ padding: "12px 16px 16px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Login Image */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", width: "344px" }}>
                      <div
                        onClick={() => setLoginImageEnabled(!loginImageEnabled)}
                        style={{
                          width: "36px",
                          height: "20px",
                          padding: "2px",
                          borderRadius: "9999px",
                          background: loginImageEnabled ? "#344698" : "#F5F5F5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: loginImageEnabled ? "flex-end" : "flex-start",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "9999px",
                          background: "#FFF",
                          boxShadow: "0 1px 3px 0 rgba(10, 13, 18, 0.10)",
                        }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          margin: 0,
                        }}>Login Image</p>
                        <p style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          margin: 0,
                        }}>Customize the login screen with an additional image.</p>
                      </div>
                    </div>

                    {loginImageEnabled && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: isCompactLayout ? "stretch" : "center",
                          gap: isCompactLayout ? "16px" : "24px",
                          flexDirection: isCompactLayout ? "column" : "row",
                          width: "100%",
                        }}
                      >
                        <input
                          ref={loginImageInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/gif,image/svg+xml"
                          style={{ display: "none" }}
                          onChange={(event) =>
                            handleImageInputChange(event, setLoginImagePreview)
                          }
                        />
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label="Upload login image"
                          onClick={() => loginImageInputRef.current?.click()}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              loginImageInputRef.current?.click();
                            }
                          }}
                          onDragOver={(event) => {
                            event.preventDefault();
                            event.dataTransfer.dropEffect = "copy";
                          }}
                          onDrop={(event) => handleImageDrop(event, setLoginImagePreview)}
                          style={{
                            flex: 1,
                            maxWidth: isCompactLayout ? "100%" : "424px",
                            padding: "16px 24px",
                            borderRadius: "12px",
                            border: "1px solid #E9EAEB",
                            background: "#FFF",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <span style={{
                              color: "#273572",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}>Click to upload</span>
                            <span style={{
                              color: "#535862",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}> or drag and drop</span>
                          </div>
                          <p style={{
                            color: "#535862",
                            fontFamily: "Roboto Mono",
                            fontSize: "12px",
                            fontWeight: 400,
                            lineHeight: "18px",
                            margin: 0,
                          }}>
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                        <div style={{
                          width: "200px",
                          height: "132px",
                          borderRadius: "10px",
                          border: "1px solid #D5D7DA",
                          background: "#F5F5F5",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}>
                          <img
                            src={loginImagePreview}
                            alt="Login image preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Applicant Portal Instructions */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: isCompactLayout ? "stretch" : "center",
                      gap: isCompactLayout ? "16px" : "24px",
                      flexDirection: isCompactLayout ? "column" : "row",
                      width: "100%",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", width: isCompactLayout ? "100%" : "424px" }}>
                      <div
                        onClick={() => setPortalInstructionsEnabled(!portalInstructionsEnabled)}
                        style={{
                          width: "36px",
                          height: "20px",
                          padding: "2px",
                          borderRadius: "9999px",
                          background: portalInstructionsEnabled ? "#344698" : "#F5F5F5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: portalInstructionsEnabled ? "flex-end" : "flex-start",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "9999px",
                          background: "#FFF",
                          boxShadow: "0 1px 3px 0 rgba(10, 13, 18, 0.10)",
                        }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          margin: 0,
                        }}>Applicant Portal Instructions</p>
                        <p style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          margin: 0,
                        }}>
                          Allow users to get an understanding and instructions of the upcoming steps. <span style={{ color: "#273572", textDecoration: "underline", cursor: "pointer" }}>Preview here</span>
                        </p>
                      </div>
                    </div>
                    <input
                      ref={portalInstructionsInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/gif,image/svg+xml"
                      style={{ display: "none" }}
                      onChange={(event) =>
                        handleImageInputChange(event, setPortalInstructionsPreview)
                      }
                    />
                    <div
                      role="button"
                      tabIndex={portalInstructionsEnabled ? 0 : -1}
                      aria-label="Upload applicant portal preview image"
                      aria-disabled={!portalInstructionsEnabled}
                      onClick={() => {
                        if (!portalInstructionsEnabled) {
                          return;
                        }
                        portalInstructionsInputRef.current?.click();
                      }}
                      onKeyDown={(event) => {
                        if (!portalInstructionsEnabled) {
                          return;
                        }
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          portalInstructionsInputRef.current?.click();
                        }
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        if (!portalInstructionsEnabled) {
                          return;
                        }
                        event.dataTransfer.dropEffect = "copy";
                      }}
                      onDrop={(event) => {
                        if (!portalInstructionsEnabled) {
                          event.preventDefault();
                          return;
                        }
                        handleImageDrop(event, setPortalInstructionsPreview);
                      }}
                      style={{
                        width: "200px",
                        height: "132px",
                        borderRadius: "10px",
                        border: "1px solid #D5D7DA",
                        background: "#F5F5F5",
                        overflow: "hidden",
                        flexShrink: 0,
                        cursor: portalInstructionsEnabled ? "pointer" : "default",
                        opacity: portalInstructionsEnabled ? 1 : 0.6,
                        outline: "none",
                      }}
                    >
                      <img
                        src={portalInstructionsPreview}
                        alt="Applicant portal preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ height: "1px", background: "#E9EAEB" }} />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                      <button type="button" style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        color: "#414651",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}>
                        Cancel
                      </button>
                      <button type="button" style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "2px solid rgba(255, 255, 255, 0.12)",
                        background: "#344698",
                        boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        color: "#FFF",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}>
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={deleteUserModalOpen}
        onClose={() => {
          setDeleteUserModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirmDelete={handleDeleteUser}
        userName={userToDelete?.name}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
