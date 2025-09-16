import React, { useState } from 'react';

interface QuickNavigationProps {
  isVisible: boolean;
  hasValidationErrors: boolean;
  onNavigateToSection: (sectionId: string) => void;
  allSectionsCompleted?: boolean;
  sections: Array<{
    id: string;
    label: string;
    completed: boolean;
    hasErrors?: boolean;
    count?: number;
    subsections?: Array<{
      id: string;
      label: string;
      completed: boolean;
      hasErrors?: boolean;
    }>;
  }>;
}

export const QuickNavigation: React.FC<QuickNavigationProps> = ({
  isVisible,
  hasValidationErrors,
  onNavigateToSection,
  sections,
  allSectionsCompleted = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  if (!isVisible) return null;

  const handleSectionClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setIsOpen(false);
  };

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '32px',
        bottom: '96px',
        zIndex: 1000,
        width: '320px',
        maxWidth: 'calc(100vw - 64px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '12px',
          borderRadius: '10px',
          border: '1px solid #E9EAEB',
          background: '#FFF',
          boxShadow: '0 4px 6px -1px rgba(10, 13, 18, 0.10), 0 2px 4px -2px rgba(10, 13, 18, 0.06)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            height: '36px',
            padding: '8px 0',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderRadius: '6px',
          }}
        >
          {/* Menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              padding: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <svg
              style={{ width: '16px', height: '16px' }}
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

          {/* Title and status icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flex: '1 0 0',
            }}
          >
            <div
              style={{
                color: '#181D27',
                fontFamily: "'Public Sans'",
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '28px',
              }}
            >
              Quick Navigation
            </div>
            {allSectionsCompleted && (
              <div
                style={{
                  display: 'flex',
                  width: '28px',
                  height: '28px',
                  padding: '6px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '9999px',
                  background: '#DCFAE6',
                }}
              >
                <svg
                  style={{ width: '16px', height: '16px', flexShrink: 0 }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3337 4L6.00033 11.3333L2.66699 8"
                    stroke="#079455"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
            {hasValidationErrors && !allSectionsCompleted && (
              <div
                style={{
                  display: 'flex',
                  width: '28px',
                  height: '28px',
                  padding: '6px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '9999px',
                  background: '#FEE4E2',
                }}
              >
                <svg
                  style={{ width: '16px', height: '16px', flexShrink: 0 }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_quick_nav_alert)">
                    <path
                      d="M8.00004 5.33337V8.00004M8.00004 10.6667H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                      stroke="#D92D20"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_quick_nav_alert">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              display: 'flex',
              padding: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <svg
              style={{ width: '16px', height: '16px' }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 4.66663L4.66663 11.3333M4.66663 4.66663L11.3333 11.3333"
                stroke="#A4A7AE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Navigation sections - show when open */}
        {isOpen && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px',
              alignSelf: 'stretch',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            {sections.map((section) => (
              <div key={section.id}>
                {/* Main section */}
                <div
                  style={{
                    display: 'flex',
                    height: '36px',
                    padding: '8px 12px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    borderRadius: '6px',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F5F5F5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Left side - label, badge, and status indicators */}
                  <div
                    onClick={() => handleSectionClick(section.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <div
                      style={{
                        color: '#414651',
                        fontFamily: "'Public Sans'",
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '20px',
                      }}
                    >
                      {section.label}
                    </div>

                    {/* Count badge for sections with multiple entries */}
                    {typeof section.count === 'number' && (
                      <div
                        style={{
                          display: 'flex',
                          padding: '2px 8px',
                          alignItems: 'center',
                          borderRadius: '9999px',
                          border: (section.count ?? 0) <= 0 ? '1px solid #FDA29B' : section.completed ? '1px solid #ABEFC6' : '1px solid #E9EAEB',
                          background: (section.count ?? 0) <= 0 ? '#FEE4E2' : section.completed ? '#ECFDF3' : '#F9F9F9',
                        }}
                      >
                        <div
                          style={{
                            color: (section.count ?? 0) <= 0 ? '#D92D20' : section.completed ? '#067647' : '#414651',
                            textAlign: 'center',
                            fontFamily: "'Public Sans'",
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: '18px',
                          }}
                        >
                          {section.count ?? 0}
                        </div>
                      </div>
                    )}

                    {/* Status indicators */}
                    {section.hasErrors && (
                      <div
                        style={{
                          display: 'flex',
                          width: '24px',
                          height: '24px',
                          padding: '6px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '9999px',
                          background: '#FEE4E2',
                        }}
                      >
                        <svg
                          style={{ width: '12px', height: '12px', flexShrink: 0 }}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_section_alert)">
                            <path
                              d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                              stroke="#D92D20"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_section_alert">
                              <rect width="12" height="12" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    )}

                    {section.completed && (
                      <div
                        style={{
                          display: 'flex',
                          width: '24px',
                          height: '24px',
                          padding: '6px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '9999px',
                          background: '#DCFAE6',
                        }}
                      >
                        <svg
                          style={{ width: '12px', height: '12px', flexShrink: 0 }}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="#079455"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Expand/Collapse button for sections with subsections */}
                  {section.subsections && section.subsections.length > 0 && (
                    <button
                      onClick={() => toggleSectionExpansion(section.id)}
                      style={{
                        display: 'flex',
                        width: '24px',
                        height: '24px',
                        padding: '4px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <svg
                        style={{
                          width: '16px',
                          height: '16px',
                          flexShrink: 0,
                          transform: expandedSections.has(section.id) ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                        }}
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
                  )}
                </div>

                {/* Subsections - show when expanded */}
                {section.subsections &&
                 section.subsections.length > 0 &&
                 expandedSections.has(section.id) && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch' }}>
                    {section.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => handleSectionClick(subsection.id)}
                        style={{
                          display: 'flex',
                          height: '36px',
                          padding: '0px 12px',
                          alignItems: 'center',
                          gap: '8px',
                          alignSelf: 'stretch',
                          borderRadius: '6px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F5F5F5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <div
                          style={{
                            color: '#414651',
                            fontFamily: "'Public Sans'",
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '20px',
                          }}
                        >
                          {subsection.label}
                        </div>

                        {/* Subsection status indicators */}
                        {subsection.hasErrors && (
                          <div
                            style={{
                              display: 'flex',
                              width: '24px',
                              height: '24px',
                              padding: '6px',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '9999px',
                              background: '#FEE4E2',
                            }}
                          >
                            <svg
                              style={{ width: '12px', height: '12px', flexShrink: 0 }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_subsection_alert)">
                                <path
                                  d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                                  stroke="#D92D20"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_subsection_alert">
                                  <rect width="12" height="12" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        )}

                        {subsection.completed && (
                          <div
                            style={{
                              display: 'flex',
                              width: '24px',
                              height: '24px',
                              padding: '6px',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '9999px',
                              background: '#DCFAE6',
                            }}
                          >
                            <svg
                              style={{ width: '12px', height: '12px', flexShrink: 0 }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="#079455"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
