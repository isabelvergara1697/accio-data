import React, { useRef, useEffect, useState } from "react";

interface Tab {
  id: string;
  label: string;
  current?: boolean;
}

interface HorizontalTabsProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
  currentTab: string;
  isMobile?: boolean;
  isTablet?: boolean;
}

export const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  onTabChange,
  currentTab,
  isMobile = false,
  isTablet = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  // Check if content needs scrolling
  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [tabs]);

  // Drag functionality for desktop/tablet
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isScrollable || (!isMobile && !isTablet && window.innerWidth > 1023))
      return;

    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || !isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const shouldEnableScroll = isMobile || isTablet || window.innerWidth <= 1023;
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                                    .tabs-container {
              display: flex;
              padding: 4px;
              align-items: center;
              align-content: center;
              gap: 4px;
              align-self: stretch;
              flex-wrap: wrap;
              border-radius: 10px;
              border: 1px solid #E9EAEB;
              background: #FFF;
              overflow-y: hidden;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
              -ms-overflow-style: none;
              scroll-behavior: smooth;
              user-select: none;
            }

            .tabs-container.scrollable {
              flex-wrap: nowrap;
              overflow-x: auto;
              padding-right: 20px;
              touch-action: pan-x;
              cursor: grab;
            }

            .tabs-container.scrollable.dragging {
              cursor: grabbing;
            }

            /* Enable scrolling on tablet and mobile viewports */
            @media (max-width: 1023px) {
              .tabs-container {
                flex-wrap: nowrap;
                overflow-x: auto;
                padding-right: 20px;
                touch-action: pan-x;
              }
            }

            /* Mobile specific styles */
            @media (max-width: 767px) {
              .tabs-container {
                flex-wrap: nowrap;
                overflow-x: auto;
                padding-right: 20px;
                touch-action: pan-x;
                cursor: default;
              }
            }

            .tabs-container::-webkit-scrollbar {
              display: none;
              width: 0;
              height: 0;
            }

            .tab-button {
              display: flex;
              height: 36px;
              padding: 8px 12px;
              justify-content: center;
              align-items: center;
              gap: 8px;
              border-radius: 6px;
              border: none;
              cursor: pointer;
              transition: all 0.2s ease;
              flex-shrink: 0;
              white-space: nowrap;
              min-width: fit-content;
            }
          `,
        }}
      />
      <div
        ref={containerRef}
        className={`tabs-container ${shouldEnableScroll && isScrollable ? "scrollable" : ""} ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="tab-button"
            style={{
              background: currentTab === tab.id ? "#ECEEF9" : "transparent",
              border: currentTab === tab.id ? "1px solid #B3BCE5" : "none",
            }}
            onMouseEnter={(e) => {
              if (currentTab !== tab.id) {
                e.currentTarget.style.background = "#F5F5F5";
              }
            }}
            onMouseLeave={(e) => {
              if (currentTab !== tab.id) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <div
              style={{
                color: currentTab === tab.id ? "#273572" : "#717680",
                fontFamily: "'Public Sans'",
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
                  color: currentTab === tab.id ? "#273572" : "#717680",
                }}
              >
                {tab.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};
