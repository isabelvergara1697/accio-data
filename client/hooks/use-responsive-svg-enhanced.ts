import { useState, useEffect, useMemo } from "react";

interface ResponsiveSVGSizes {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface ResponsiveSVGResult {
  width: number;
  height: number;
  widthStr: string;
  heightStr: string;
  style: {
    width: string;
    height: string;
    maxWidth: string;
    maxHeight: string;
    minWidth: string;
    minHeight: string;
  };
  className: string;
}

/**
 * Enhanced responsive SVG hook that automatically detects breakpoints
 * and provides container-aware sizing
 */
export const useResponsiveSVGEnhanced = (
  baseSizes: ResponsiveSVGSizes | number,
  options: {
    /** Allow SVG to scale with container */
    containerAware?: boolean;
    /** Minimum size constraint */
    minSize?: number;
    /** Maximum size constraint */
    maxSize?: number;
    /** Custom breakpoints */
    breakpoints?: {
      mobile: number;
      tablet: number;
    };
  } = {},
): ResponsiveSVGResult => {
  const {
    containerAware = true,
    minSize = 12,
    maxSize,
    breakpoints = {
      mobile: 768,
      tablet: 1024,
    },
  } = options;

  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  }));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(() => {
    const { width: windowWidth } = windowSize;

    // Determine current breakpoint
    const isMobile = windowWidth < breakpoints.mobile;
    const isTablet =
      windowWidth >= breakpoints.mobile && windowWidth < breakpoints.tablet;
    const isDesktop = windowWidth >= breakpoints.tablet;

    let baseSize: number;

    if (typeof baseSizes === "number") {
      // If single number provided, calculate responsive sizes
      if (isMobile) {
        baseSize = Math.max(baseSizes - 4, minSize);
      } else if (isTablet) {
        baseSize = Math.max(baseSizes - 2, minSize);
      } else {
        baseSize = baseSizes;
      }
    } else {
      // If object with specific sizes provided
      if (isMobile) {
        baseSize = baseSizes.mobile;
      } else if (isTablet) {
        baseSize = baseSizes.tablet;
      } else {
        baseSize = baseSizes.desktop;
      }
    }

    // Apply size constraints
    let finalSize = baseSize;
    if (minSize && finalSize < minSize) finalSize = minSize;
    if (maxSize && finalSize > maxSize) finalSize = maxSize;

    // Generate responsive className for additional CSS control
    const deviceClass = isMobile
      ? "svg-mobile"
      : isTablet
        ? "svg-tablet"
        : "svg-desktop";
    const className = `responsive-svg ${deviceClass}`;

    return {
      width: finalSize,
      height: finalSize,
      widthStr: finalSize.toString(),
      heightStr: finalSize.toString(),
      style: {
        width: `${finalSize}px`,
        height: `${finalSize}px`,
        maxWidth: containerAware ? "100%" : `${finalSize}px`,
        maxHeight: containerAware ? "100%" : `${finalSize}px`,
        minWidth: `${minSize}px`,
        minHeight: `${minSize}px`,
      },
      className,
    };
  }, [windowSize, baseSizes, containerAware, minSize, maxSize, breakpoints]);
};

/**
 * Hook for icon sizes with enhanced responsiveness
 */
export const useIconSizeEnhanced = (
  size: number = 20,
  options?: Parameters<typeof useResponsiveSVGEnhanced>[1],
): ResponsiveSVGResult => {
  return useResponsiveSVGEnhanced(size, options);
};

/**
 * Hook for navigation icon sizes with enhanced responsiveness
 */
export const useNavIconSizeEnhanced = (
  options?: Parameters<typeof useResponsiveSVGEnhanced>[1],
): ResponsiveSVGResult => {
  return useResponsiveSVGEnhanced(
    {
      mobile: 16,
      tablet: 18,
      desktop: 20,
    },
    options,
  );
};

/**
 * Hook for button icon sizes with enhanced responsiveness
 */
export const useButtonIconSizeEnhanced = (
  options?: Parameters<typeof useResponsiveSVGEnhanced>[1],
): ResponsiveSVGResult => {
  return useResponsiveSVGEnhanced(
    {
      mobile: 14,
      tablet: 16,
      desktop: 18,
    },
    options,
  );
};
