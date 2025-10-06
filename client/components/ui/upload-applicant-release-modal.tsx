import React, { useState, useRef } from "react";
import { UploadCloud, X } from "lucide-react";

interface UploadApplicantReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (fileName: string, file: File) => void;
}

export const UploadApplicantReleaseModal: React.FC<
  UploadApplicantReleaseModalProps
> = ({ isOpen, onClose, onUpload }) => {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (!fileName) {
      // Auto-populate file name if empty
      const name = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      setFileName(name);
    }
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

  const handleUploadClick = () => {
    if (!fileName.trim() || !selectedFile) {
      return;
    }
    onUpload(fileName.trim(), selectedFile);
    handleClose();
  };

  const handleClose = () => {
    setFileName("");
    setSelectedFile(null);
    setIsDragging(false);
    onClose();
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const isUploadDisabled = !fileName.trim() || !selectedFile;

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1100,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        backdropFilter: "blur(4px)",
        paddingLeft: isDesktop ? "40px" : "0",
      }}
      onClick={handleBackdropClick}
    >
      {/* Background overlay */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.7,
          background: "#0A0D12",
        }}
      />

      {/* Slide-out Panel */}
      <div
        onClick={handlePanelClick}
        style={{
          display: "flex",
          width: "400px",
          maxWidth: "100%",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          background: "#FFF",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
          position: "relative",
          animation: "slideIn 0.3s ease-out",
        }}
      >
        <style>
          {`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
          `}
        </style>

        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "24px",
            alignItems: "flex-start",
            gap: "8px",
            alignSelf: "stretch",
            background: "#FFF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flex: "1 0 0",
            }}
          >
            {/* Featured icon */}
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
              }}
            >
              <UploadCloud
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#344698",
                  strokeWidth: "1.66667",
                }}
              />
            </div>

            {/* Title and supporting text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                flex: "1 0 0",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                Attach Document to Order
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Name and upload File, this will be added to this form
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            type="button"
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
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
            <X
              style={{
                width: "24px",
                height: "24px",
                color: "#A4A7AE",
                strokeWidth: "1.66667",
              }}
            />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            width: "400px",
            maxWidth: "100%",
            padding: "0 24px 24px 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* File Name Input */}
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
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
              }}
            >
              {/* Label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
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
                  File Name
                </div>
                <div
                  style={{
                    color: "#344698",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  *
                </div>
              </div>

              {/* Input field */}
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="File Name"
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
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#344698";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 4px rgba(52, 70, 152, 0.12), 0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#D5D7DA";
                  e.currentTarget.style.boxShadow =
                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)";
                }}
              />
            </div>
          </div>

          {/* File Upload Area */}
          <div
            style={{
              display: "flex",
              height: "200px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              flexShrink: 0,
              alignSelf: "stretch",
            }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                display: "flex",
                padding: "16px 24px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                flex: "1 0 0",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: `1px ${isDragging ? "dashed" : "solid"} ${
                  isDragging ? "#344698" : "#E9EAEB"
                }`,
                background: isDragging ? "#F8F9FC" : "#FFF",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={handleBrowseClick}
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
                  <UploadCloud
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "#414651",
                      strokeWidth: "1.66667",
                    }}
                  />
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
                      <div
                        style={{
                          color: "#273572",
                          fontFamily: "Public Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        Click to upload
                      </div>
                    </button>
                    <div
                      style={{
                        color: "#535862",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      or drag and drop
                    </div>
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
                    10Mb Max
                  </div>
                  {selectedFile && (
                    <div
                      style={{
                        marginTop: "8px",
                        color: "#344698",
                        fontFamily: "Public Sans",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Selected: {selectedFile.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
                accept="*/*"
              />
            </div>
          </div>

          {/* Upload File Button */}
          <button
            onClick={handleUploadClick}
            disabled={isUploadDisabled}
            type="button"
            style={{
              display: "flex",
              height: "44px",
              padding: "12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              flexShrink: 0,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.12)",
              background: isUploadDisabled ? "#A4A7AE" : "#344698",
              boxShadow:
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: isUploadDisabled ? "not-allowed" : "pointer",
              opacity: isUploadDisabled ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isUploadDisabled) {
                e.currentTarget.style.background = "#2A3A7D";
              }
            }}
            onMouseLeave={(e) => {
              if (!isUploadDisabled) {
                e.currentTarget.style.background = "#344698";
              }
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
              <div
                style={{
                  color: "#FFF",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Upload File
              </div>
            </div>
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleClose}
            type="button"
            style={{
              display: "flex",
              height: "44px",
              padding: "12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              flexShrink: 0,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #D5D7DA",
              background: "#FFF",
              boxShadow:
                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F5F5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF";
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
              <div
                style={{
                  color: "#414651",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Cancel
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
