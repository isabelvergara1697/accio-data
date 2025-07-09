import { useState, useEffect } from "react";

interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

export function useResponsive(): ResponsiveBreakpoints {
  const [dimensions, setDimensions] = useState<ResponsiveBreakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setDimensions({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
      });
    };

    // Initial call
    updateDimensions();

    // Add event listener
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return dimensions;
}
