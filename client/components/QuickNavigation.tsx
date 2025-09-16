import React, { useState } from 'react';

interface QuickNavigationProps {
  isVisible: boolean;
  hasValidationErrors: boolean;
  onNavigateToSection: (sectionId: string) => void;
  sections: Array<{
    id: string;
    label: string;
    completed: boolean;
    hasErrors?: boolean;
  }>;
}

export const QuickNavigation: React.FC<QuickNavigationProps> = ({
  isVisible,
  hasValidationErrors,
  onNavigateToSection,
  sections,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isVisible) return null;

  const handleSectionClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setIsOpen(false);
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

          {/* Title and warning icon */}
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
            {hasValidationErrors && (
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
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                style={{
                  display: 'flex',
                  padding: '8px 12px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  borderRadius: '6px',
                  border: 'none',
                  background: section.completed ? '#F9F9F9' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!section.completed) {
                    e.currentTarget.style.background = '#F5F5F5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!section.completed) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div
                  style={{
                    color: section.completed ? '#414651' : '#717680',
                    fontFamily: "'Public Sans'",
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '20px',
                  }}
                >
                  {section.label}
                </div>
                
                {/* Status indicators */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {section.hasErrors && (
                    <div
                      style={{
                        display: 'flex',
                        width: '20px',
                        height: '20px',
                        padding: '4px',
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
                        width: '20px',
                        height: '20px',
                        padding: '4px',
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
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
