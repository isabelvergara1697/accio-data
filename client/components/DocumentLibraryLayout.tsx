import React, { useState, useEffect } from "react";
import { FilterDropdown } from "./FilterDropdown";
import { SearchInput } from "./SearchInput";
import { DocumentSection } from "./DocumentSection";
import { SearchEmptyState } from "./SearchEmptyState";

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface DocumentSectionType {
  id: string;
  title: string;
  count: number;
  isOpen: boolean;
  documents: Document[];
}

interface DocumentLibraryLayoutProps {
  title: string;
  subtitle: string;
  documentSections: DocumentSectionType[];
  isMobile: boolean;
  isDesktop: boolean;
  searchPlaceholder?: string;
}

export const DocumentLibraryLayout: React.FC<DocumentLibraryLayoutProps> = ({
  title,
  subtitle,
  documentSections,
  isMobile,
  isDesktop,
  searchPlaceholder = "Find documents or categories",
}) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [fileTypeDropdownOpen, setFileTypeDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Most Recent");
  const [selectedFileType, setSelectedFileType] = useState("All Files");
  const [filteredSections, setFilteredSections] = useState(documentSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState(documentSections);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (sortDropdownOpen && !target.closest("[data-sort-dropdown]")) {
        setSortDropdownOpen(false);
      }
      if (fileTypeDropdownOpen && !target.closest("[data-filetype-dropdown]")) {
        setFileTypeDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [sortDropdownOpen, fileTypeDropdownOpen]);

  const toggleAccordion = (accordionId: string) => {
    setOpenAccordions((prev) =>
      prev.includes(accordionId)
        ? prev.filter((id) => id !== accordionId)
        : [...prev, accordionId],
    );
  };

  const handleSortOptionSelect = (option: string) => {
    setSelectedSortOption(option);
    setSortDropdownOpen(false);
    applyFilters(option, selectedFileType);
  };

  const handleFileTypeSelect = (type: string) => {
    setSelectedFileType(type);
    setFileTypeDropdownOpen(false);
    applyFilters(selectedSortOption, type);
  };

  const applyFilters = (sortOption: string, fileType: string) => {
    let filtered = [...documentSections];

    // Apply file type filter
    if (fileType !== "All Files") {
      filtered = filtered
        .map((section) => ({
          ...section,
          documents: section.documents.filter((doc) => {
            if (fileType === "PDF") return doc.type === "PDF";
            if (fileType === "Videos") return doc.type === "Video";
            if (fileType === "Docs") return doc.type === "Doc";
            if (fileType === "PPT") return doc.type === "PPT";
            return true;
          }),
        }))
        .filter((section) => section.documents.length > 0);
    }

    // Apply sorting
    filtered = filtered.map((section) => ({
      ...section,
      documents: [...section.documents].sort((a, b) => {
        if (sortOption === "A-Z") {
          return a.name.localeCompare(b.name);
        }
        if (sortOption === "Most Viewed") {
          // Simulate most viewed by reversing the order
          return b.name.localeCompare(a.name);
        }
        // Most Recent - use original order but reverse it slightly for demo
        return Math.random() - 0.5;
      }),
    }));

    setFilteredSections(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearchActive(query.length > 0);

    if (query.length > 0) {
      performSearch(query);
    } else {
      setSearchResults(documentSections);
    }
  };

  const performSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = documentSections
      .map((section) => {
        const matchingDocuments = section.documents.filter(
          (doc) =>
            doc.name.toLowerCase().includes(lowercaseQuery) ||
            section.title.toLowerCase().includes(lowercaseQuery),
        );

        if (
          matchingDocuments.length > 0 ||
          section.title.toLowerCase().includes(lowercaseQuery)
        ) {
          return {
            ...section,
            documents:
              matchingDocuments.length > 0
                ? matchingDocuments
                : section.documents,
            count: matchingDocuments.length,
          };
        }
        return null;
      })
      .filter((section) => section !== null);

    setSearchResults(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    setSearchResults(documentSections);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
    setFileTypeDropdownOpen(false);
  };

  const toggleFileTypeDropdown = () => {
    setFileTypeDropdownOpen(!fileTypeDropdownOpen);
    setSortDropdownOpen(false);
  };

  const sortOptions = ["A-Z", "Most Recent", "Most Viewed"];
  const fileTypeOptions = ["All Files", "PDF", "Videos", "Docs", "PPT"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "16px" : "32px",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
          padding: isMobile ? "16px" : "0",
        }}
      >
        <div
          className={
            isMobile ? "mobile-stack" : isDesktop ? "" : "tablet-layout"
          }
          style={{
            display: "flex",
            alignItems: isMobile
              ? "stretch"
              : isDesktop
                ? "flex-end"
                : "flex-start",
            alignContent: "flex-end",
            gap: isMobile ? "16px" : isDesktop ? "20px 16px" : "20px",
            alignSelf: "stretch",
            flexWrap: isMobile ? "nowrap" : isDesktop ? "wrap" : "nowrap",
          }}
        >
          {/* Title and Subtitle Section */}
          <div
            className={
              isMobile
                ? "mobile-title-section"
                : !isDesktop && !isMobile
                  ? "tablet-title-section"
                  : ""
            }
            style={{
              display: "flex",
              minWidth: isDesktop ? "320px" : "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: isMobile ? "2px" : !isDesktop && !isMobile ? "2px" : "4px",
              flex: isDesktop ? "1 0 0" : "none",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#181D27",
                fontFamily: "'Public Sans'",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "28px",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "rgba(24,29,39,1)",
                }}
              >
                {title}
              </span>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#535862",
                fontFamily: "'Public Sans'",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
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
                {subtitle}
              </span>
            </div>
          </div>

          {/* Buttons and Search Section - Tablet Layout */}
          {!isDesktop && !isMobile ? (
            <div className="tablet-buttons-container">
              <div className="tablet-filter-buttons">
                <FilterDropdown
                  isOpen={sortDropdownOpen}
                  onToggle={toggleSortDropdown}
                  selectedValue={selectedSortOption}
                  options={sortOptions}
                  onSelect={handleSortOptionSelect}
                  isMobile={isMobile}
                  dataAttribute="sort-dropdown"
                />
                <FilterDropdown
                  isOpen={fileTypeDropdownOpen}
                  onToggle={toggleFileTypeDropdown}
                  selectedValue={selectedFileType}
                  options={fileTypeOptions}
                  onSelect={handleFileTypeSelect}
                  isMobile={isMobile}
                  dataAttribute="filetype-dropdown"
                />
              </div>
              <div className="tablet-search">
                <SearchInput
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  onClearSearch={clearSearch}
                  isSearchActive={isSearchActive}
                  isMobile={isMobile}
                  placeholder={searchPlaceholder}
                />
              </div>
            </div>
          ) : (
            <>
              {/* Buttons Section - Desktop/Mobile Layout */}
              <div
                className={isMobile ? "mobile-buttons" : ""}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "stretch" : "center",
                  gap: "12px",
                  justifyContent: isMobile ? "flex-start" : "flex-start",
                  flex: isMobile ? "1 0 0" : "none",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                <FilterDropdown
                  isOpen={sortDropdownOpen}
                  onToggle={toggleSortDropdown}
                  selectedValue={selectedSortOption}
                  options={sortOptions}
                  onSelect={handleSortOptionSelect}
                  isMobile={isMobile}
                  dataAttribute="sort-dropdown"
                />
                <FilterDropdown
                  isOpen={fileTypeDropdownOpen}
                  onToggle={toggleFileTypeDropdown}
                  selectedValue={selectedFileType}
                  options={fileTypeOptions}
                  onSelect={handleFileTypeSelect}
                  isMobile={isMobile}
                  dataAttribute="filetype-dropdown"
                />
              </div>

              {/* Search Section - Desktop/Mobile Layout */}
              <div
                className={isMobile ? "mobile-search" : ""}
                style={{
                  display: "flex",
                  minWidth: isMobile ? "100%" : "200px",
                  maxWidth: isMobile ? "100%" : "320px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  flex: isMobile ? "none" : "1 0 0",
                }}
              >
                <SearchInput
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  onClearSearch={clearSearch}
                  isSearchActive={isSearchActive}
                  isMobile={isMobile}
                  placeholder={searchPlaceholder}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Results Header */}
      {isSearchActive && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            padding: isMobile ? "0px 16px" : "0px",
          }}
        >
          <div
            style={{
              color: "#181D27",
              fontFamily: "'Public Sans'",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "28px",
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
              Search results
            </span>
          </div>
          <div
            style={{
              color: "#535862",
              fontFamily: "'Public Sans'",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(83,88,98,1)",
              }}
            >
              {searchResults.reduce(
                (total, section) => total + section.documents.length,
                0,
              )}{" "}
              Results
            </span>
          </div>
        </div>
      )}

      {/* Document Sections */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
            padding: isMobile ? "0 16px" : "0",
          }}
        >
          {/* Show empty state when searching with no results */}
          {isSearchActive && searchResults.length === 0 ? (
            <SearchEmptyState
              searchQuery={searchQuery}
              onClearSearch={clearSearch}
              isMobile={isMobile}
            />
          ) : (
            (isSearchActive ? searchResults : filteredSections).map(
              (section) => (
                <DocumentSection
                  key={section.id}
                  section={section}
                  isOpen={openAccordions.includes(section.id)}
                  onToggle={toggleAccordion}
                  isMobile={isMobile}
                  isDesktop={isDesktop}
                />
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
};
