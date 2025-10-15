import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Sidebar } from "../components/Sidebar";
import { useIsMobile } from "../hooks/use-mobile";

type TabType = "profile" | "security" | "notifications";

export default function AccountSettings() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;
  
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Director of Human Resources");
  const [address, setAddress] = useState("123456 Street");
  const [zipCode, setZipCode] = useState("18735");
  const [state, setState] = useState("Texas");
  const [city, setCity] = useState("Austin");
  const [fax, setFax] = useState("9999999");
  const [phone, setPhone] = useState("9999999");
  const [timezone, setTimezone] = useState("Pacific Standard Time (PST)");
  const [primaryEmail, setPrimaryEmail] = useState("alexandra@acciodata.com");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hasPhoto = photoUrl.length > 0;

  const handleSignOut = () => {
    navigate("/login");
  };

  const getUserMenuStyles = () => ({
    position: "absolute" as const,
    top: "100%",
    right: 0,
    marginTop: "8px",
  });

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDeletePhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotoUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const headerHeight = isMobile ? 64 : 72;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#FAFAFA",
      }}
    >
      {isDesktop && (
        <Sidebar
          isDesktop={isDesktop}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          currentPage="settings"
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}

      {isMobile && (
        <MobileHeader
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          showMobileUserMenu={showMobileUserMenu}
          setShowMobileUserMenu={setShowMobileUserMenu}
          handleSignOut={handleSignOut}
          currentPage="settings"
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
            padding: isMobile ? "16px" : "32px",
            gap: isMobile ? "20px" : "32px",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {/* Page Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : "24px",
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

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                padding: "4px",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
                borderRadius: "10px",
                border: "1px solid #E9EAEB",
                background: "#FFF",
                overflowX: "auto",
              }}
            >
              {[
                { id: "profile" as TabType, label: "Profile" },
                { id: "security" as TabType, label: "Security" },
                { id: "notifications" as TabType, label: "Notifications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    height: "36px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "6px",
                    border: activeTab === tab.id ? "1px solid #B3BCE5" : "none",
                    background: activeTab === tab.id ? "#ECEEF9" : "transparent",
                    color: activeTab === tab.id ? "#273572" : "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Tab Content */}
          {activeTab === "profile" && (
            <>
              {/* Basic Information Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
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
                      Basic Information
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
                      Update your personal details so we can tailor your experience and keep your profile accurate.
                    </p>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Name Fields */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "16px" : "32px",
                    }}
                  >
                    <div
                      style={{
                        minWidth: isMobile ? "auto" : "200px",
                        maxWidth: isMobile ? "auto" : "280px",
                        flex: isMobile ? "none" : "1 0 0",
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
                        Name<span style={{ color: "#344698" }}>*</span>
                      </label>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "24px",
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{
                          flex: "1 0 0",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{
                          flex: "1 0 0",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Photo Upload */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "16px" : "32px",
                    }}
                  >
                    <div
                      style={{
                        minWidth: isMobile ? "auto" : "200px",
                        maxWidth: isMobile ? "auto" : "280px",
                        flex: isMobile ? "none" : "1 0 0",
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
                        Your photo<span style={{ color: "#344698" }}>*</span>
                      </label>
                      <p
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          margin: "4px 0 0 0",
                        }}
                      >
                        This will be displayed on your profile.
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                      }}
                    >
                      <div
                        onClick={() => {
                          if (hasPhoto) return;
                          fileInputRef.current?.click();
                        }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "9999px",
                          border: hasPhoto ? "1px solid rgba(0, 0, 0, 0.10)" : "1px solid rgba(0, 0, 0, 0.10)",
                          background: hasPhoto ? `url(${photoUrl}) center/cover` : "#E0E0E0",
                          cursor: hasPhoto ? "default" : "pointer",
                          position: "relative",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {!hasPhoto && (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ pointerEvents: "none" }}
                          >
                            <path
                              d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                              stroke="#344698"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}

                        {hasPhoto && isHovering && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              borderRadius: "9999px",
                              background: "rgba(0, 0, 0, 0.5)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              type="button"
                              onClick={handleDeletePhoto}
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
                              >
                                <path
                                  d="M10.6667 4.00016V3.46683C10.6667 2.72009 10.6667 2.34672 10.5213 2.06151C10.3935 1.81063 10.1895 1.60665 9.93865 1.47882C9.65344 1.3335 9.28007 1.3335 8.53333 1.3335H7.46667C6.71993 1.3335 6.34656 1.3335 6.06135 1.47882C5.81046 1.60665 5.60649 1.81063 5.47866 2.06151C5.33333 2.34672 5.33333 2.72009 5.33333 3.46683V4.00016M2 4.00016H14M12.6667 4.00016V11.4668C12.6667 12.5869 12.6667 13.147 12.4487 13.5748C12.2569 13.9511 11.951 14.2571 11.5746 14.4488C11.1468 14.6668 10.5868 14.6668 9.46667 14.6668H6.53333C5.41323 14.6668 4.85318 14.6668 4.42535 14.4488C4.04903 14.2571 3.74307 13.9511 3.55132 13.5748C3.33333 13.147 3.33333 12.5869 3.33333 11.4668V4.00016"
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
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/svg+xml,image/png,image/jpeg,image/gif"
                        onChange={handleFileInputChange}
                        style={{ display: "none" }}
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        style={{
                          flex: "1 0 0",
                          display: "flex",
                          padding: "16px 24px",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "12px",
                          border: isDragging ? "2px solid #344698" : "1px solid #E9EAEB",
                          background: isDragging ? "#ECEEF9" : "#FFF",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          position: "relative",
                          overflow: "hidden",
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
                          <div
                            style={{
                              display: "flex",
                              padding: "10px",
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
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "4px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#273572",
                                  fontFamily: "Public Sans",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                Click to upload
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
                                or drag and drop
                              </span>
                            </div>
                            <p
                              style={{
                                color: "#535862",
                                textAlign: "center",
                                fontFamily: "Roboto Mono",
                                fontSize: "12px",
                                fontWeight: 400,
                                lineHeight: "18px",
                                margin: 0,
                              }}
                            >
                              SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Other fields - Role, Address, Zip Code, Location, Fax, Phone, Timezone */}
                  {[
                    { label: "Role", value: role, onChange: setRole },
                    { label: "Address", value: address, onChange: setAddress },
                    { label: "Zip Code", value: zipCode, onChange: setZipCode },
                  ].map((field) => (
                    <React.Fragment key={field.label}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          gap: isMobile ? "16px" : "32px",
                        }}
                      >
                        <div
                          style={{
                            minWidth: isMobile ? "auto" : "200px",
                            maxWidth: isMobile ? "auto" : "280px",
                            flex: isMobile ? "none" : "1 0 0",
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
                            {field.label}
                          </label>
                        </div>
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          style={{
                            flex: "1 0 0",
                            minWidth: isMobile ? "auto" : "480px",
                            maxWidth: isMobile ? "auto" : "512px",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div style={{ height: "1px", background: "#E9EAEB" }} />
                    </React.Fragment>
                  ))}

                  {/* Location - State and City */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "16px" : "32px",
                    }}
                  >
                    <div
                      style={{
                        minWidth: isMobile ? "auto" : "200px",
                        maxWidth: isMobile ? "auto" : "280px",
                        flex: isMobile ? "none" : "1 0 0",
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
                        Location
                      </label>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "24px",
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                      }}
                    >
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        style={{
                          flex: "1 0 0",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      >
                        <option value="Texas">Texas</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                      </select>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{
                          flex: "1 0 0",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      >
                        <option value="Austin">Austin</option>
                        <option value="Houston">Houston</option>
                        <option value="Dallas">Dallas</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Fax and Phone */}
                  {[
                    { label: "Fax", value: fax, onChange: setFax },
                    { label: "Phone", value: phone, onChange: setPhone },
                  ].map((field) => (
                    <React.Fragment key={field.label}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          gap: isMobile ? "16px" : "32px",
                        }}
                      >
                        <div
                          style={{
                            minWidth: isMobile ? "auto" : "200px",
                            maxWidth: isMobile ? "auto" : "280px",
                            flex: isMobile ? "none" : "1 0 0",
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
                            {field.label}
                          </label>
                        </div>
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          style={{
                            flex: "1 0 0",
                            minWidth: isMobile ? "auto" : "480px",
                            maxWidth: isMobile ? "auto" : "512px",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            color: "#717680",
                            fontFamily: "Public Sans",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div style={{ height: "1px", background: "#E9EAEB" }} />
                    </React.Fragment>
                  ))}

                  {/* Timezone */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "16px" : "32px",
                    }}
                  >
                    <div
                      style={{
                        minWidth: isMobile ? "auto" : "200px",
                        maxWidth: isMobile ? "auto" : "280px",
                        flex: isMobile ? "none" : "1 0 0",
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
                        Timezone
                      </label>
                    </div>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      style={{
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        color: "#717680",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        outline: "none",
                      }}
                    >
                      <option value="Pacific Standard Time (PST)">Pacific Standard Time (PST)</option>
                      <option value="Eastern Standard Time (EST)">Eastern Standard Time (EST)</option>
                      <option value="Central Standard Time (CST)">Central Standard Time (CST)</option>
                    </select>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Save/Cancel Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
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
                        color: "#FFF",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
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
                      Email
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
                      Add and manage your email addresses. You'll need to verify each one to activate it.
                    </p>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Email Address */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "16px" : "32px",
                    }}
                  >
                    <div
                      style={{
                        minWidth: isMobile ? "auto" : "200px",
                        maxWidth: isMobile ? "auto" : "280px",
                        flex: isMobile ? "none" : "1 0 0",
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
                        Email Address<span style={{ color: "#344698" }}>*</span>
                      </label>
                    </div>
                    <div
                      style={{
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                      }}
                    >
                      <input
                        type="email"
                        value={primaryEmail}
                        onChange={(e) => setPrimaryEmail(e.target.value)}
                        style={{
                          width: "100%",
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
                        }}
                      />
                      <p
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          margin: "6px 0 0 0",
                        }}
                      >
                        Used for login, password recovery, and important account notifications.
                      </p>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Secondary Email */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "16px" : "32px",
                    }}
                  >
                    <div
                      style={{
                        minWidth: isMobile ? "auto" : "200px",
                        maxWidth: isMobile ? "auto" : "280px",
                        flex: isMobile ? "none" : "1 0 0",
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
                        Secondary Email<span style={{ color: "#344698" }}>*</span>
                      </label>
                    </div>
                    <div
                      style={{
                        flex: "1 0 0",
                        minWidth: isMobile ? "auto" : "480px",
                        maxWidth: isMobile ? "auto" : "512px",
                      }}
                    >
                      <input
                        type="email"
                        placeholder="user@mail.com"
                        value={secondaryEmail}
                        onChange={(e) => setSecondaryEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          color: "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          outline: "none",
                        }}
                      />
                      <p
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          margin: "6px 0 0 0",
                        }}
                      >
                        Optional. Used only for receiving system alerts or notification emails.
                      </p>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Save/Cancel Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
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
                        color: "#FFF",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Security Tab Content */}
          {activeTab === "security" && (
            <>
              {/* Password Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
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
                    Password
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
                    Please enter your current password to change your password.
                  </p>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Current Password */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "16px" : "32px",
                  }}
                >
                  <div
                    style={{
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flex: isMobile ? "none" : "1 0 0",
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
                      Current password<span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{
                      flex: "1 0 0",
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      color: "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* New Password */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "16px" : "32px",
                  }}
                >
                  <div
                    style={{
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flex: isMobile ? "none" : "1 0 0",
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
                      New password<span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <div
                    style={{
                      flex: "1 0 0",
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                    }}
                  >
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        color: "#717680",
                        fontFamily: "Public Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        outline: "none",
                      }}
                    />
                    <p
                      style={{
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        margin: "6px 0 0 0",
                      }}
                    >
                      Your new password must be more than 8 characters.
                    </p>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Confirm Password */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "16px" : "32px",
                  }}
                >
                  <div
                    style={{
                      minWidth: isMobile ? "auto" : "200px",
                      maxWidth: isMobile ? "auto" : "280px",
                      flex: isMobile ? "none" : "1 0 0",
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
                      Confirm new password<span style={{ color: "#344698" }}>*</span>
                    </label>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      flex: "1 0 0",
                      minWidth: isMobile ? "auto" : "480px",
                      maxWidth: isMobile ? "auto" : "512px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      color: "#717680",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
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
                      color: "#FFF",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Update password
                  </button>
                </div>
              </div>

              {/* Where You're Logged In Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  marginTop: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
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
                      Where you're logged in
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
                      We'll alert you via <strong>[mail.com]</strong> if there is any unusual activity on your account.
                    </p>
                  </div>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
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
                  </button>
                </div>

                <div style={{ height: "1px", background: "#E9EAEB" }} />

                {/* Devices List */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {/* Device 1 - MacBook */}
                  <div
                    style={{
                      display: "flex",
                      paddingLeft: "16px",
                      alignItems: "flex-start",
                      gap: "16px",
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
                        d="M15 17V21H9V17M5.2 17H18.8C19.9201 17 20.4802 17 20.908 16.782C21.2843 16.5903 21.5903 16.2843 21.782 15.908C22 15.4802 22 14.9201 22 13.8V6.2C22 5.0799 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H5.2C4.07989 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.07989 2 6.2V13.8C2 14.9201 2 15.4802 2.21799 15.908C2.40973 16.2843 2.71569 16.5903 3.09202 16.782C3.51984 17 4.0799 17 5.2 17Z"
                        stroke="#A4A7AE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        flex: "1 0 0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            color: "#414651",
                            fontFamily: "Public Sans",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          2024 MacBook Pro 14-inch
                        </span>
                        <div
                          style={{
                            display: "flex",
                            padding: "2px 6px",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "6px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="4" cy="4" r="3" fill="#17B26A" />
                          </svg>
                          <span
                            style={{
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "12px",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            Active now
                          </span>
                        </div>
                      </div>
                      <p
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          margin: 0,
                        }}
                      >
                        Minnesota, United States • 22 Jan at 10:40am
                      </p>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />

                  {/* Device 2 - iPhone */}
                  <div
                    style={{
                      display: "flex",
                      paddingLeft: "16px",
                      alignItems: "flex-start",
                      gap: "16px",
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
                        d="M12 17.5H12.01M8.2 22H15.8C16.9201 22 17.4802 22 17.908 21.782C18.2843 21.5903 18.5903 21.2843 18.782 20.908C19 20.4802 19 19.9201 19 18.8V5.2C19 4.07989 19 3.51984 18.782 3.09202C18.5903 2.71569 18.2843 2.40973 17.908 2.21799C17.4802 2 16.9201 2 15.8 2H8.2C7.0799 2 6.51984 2 6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202C5 3.51984 5 4.0799 5 5.2V18.8C5 19.9201 5 20.4802 5.21799 20.908C5.40973 21.2843 5.71569 21.5903 6.09202 21.782C6.51984 22 7.07989 22 8.2 22ZM12.5 17.5C12.5 17.7761 12.2761 18 12 18C11.7239 18 11.5 17.7761 11.5 17.5C11.5 17.2239 11.7239 17 12 17C12.2761 17 12.5 17.2239 12.5 17.5Z"
                        stroke="#A4A7AE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        flex: "1 0 0",
                      }}
                    >
                      <span
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        2025 Iphone 17 Pro
                      </span>
                      <p
                        style={{
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          margin: 0,
                        }}
                      >
                        California, United States • 22 Jan at 4:20pm
                      </p>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "#E9EAEB" }} />
                </div>
              </div>
            </>
          )}

          {/* Notifications Tab Content */}
          {activeTab === "notifications" && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#535862",
                fontFamily: "Public Sans",
                fontSize: "14px",
              }}
            >
              Notification settings coming soon...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
