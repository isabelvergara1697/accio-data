import { useMemo } from "react";

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
  };
}

/**
 * Hook to get responsive SVG sizes based on device type
 * @param baseSizes - Object with mobile, tablet, and desktop sizes
 * @param isMobile - Boolean indicating if device is mobile
 * @param isTablet - Boolean indicating if device is tablet
 * @returns Object with responsive size values
 */
export const useResponsiveSVG = (
  baseSizes: ResponsiveSVGSizes | number,
  isMobile: boolean = false,
  isTablet: boolean = false,
): ResponsiveSVGResult => {
  return useMemo(() => {
    let size: number;

    if (typeof baseSizes === "number") {
      // If single number provided, calculate responsive sizes
      const baseSize = baseSizes;
      if (isMobile) {
        size = Math.max(baseSize - 4, 12); // Minimum 12px
      } else if (isTablet) {
        size = Math.max(baseSize - 2, 14); // Minimum 14px
      } else {
        size = baseSize;
      }
    } else {
      // If object with specific sizes provided
      if (isMobile) {
        size = baseSizes.mobile;
      } else if (isTablet) {
        size = baseSizes.tablet;
      } else {
        size = baseSizes.desktop;
      }
    }

    return {
      width: size,
      height: size,
      widthStr: size.toString(),
      heightStr: size.toString(),
      style: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }, [baseSizes, isMobile, isTablet]);
};

/**
 * Simplified hook for common icon sizes
 * @param size - Base size for desktop (mobile will be size-4, tablet size-2)
 * @param isMobile - Boolean indicating if device is mobile
 * @param isTablet - Boolean indicating if device is tablet
 * @returns Object with responsive size values
 */
export const useIconSize = (
  size: number = 20,
  isMobile: boolean = false,
  isTablet: boolean = false,
): ResponsiveSVGResult => {
  return useResponsiveSVG(size, isMobile, isTablet);
};

/**
 * Hook for navigation icon sizes specifically
 * @param isMobile - Boolean indicating if device is mobile
 * @param isTablet - Boolean indicating if device is tablet
 * @returns Object with responsive navigation icon sizes
 */
export const useNavIconSize = (
  isMobile: boolean = false,
  isTablet: boolean = false,
): ResponsiveSVGResult => {
  return useResponsiveSVG(
    {
      mobile: 18,
      tablet: 20,
      desktop: 21,
    },
    isMobile,
    isTablet,
  );
};

/**
 * Hook for button icon sizes
 * @param isMobile - Boolean indicating if device is mobile
 * @param isTablet - Boolean indicating if device is tablet
 * @returns Object with responsive button icon sizes
 */
export const useButtonIconSize = (
  isMobile: boolean = false,
  isTablet: boolean = false,
): ResponsiveSVGResult => {
  return useResponsiveSVG(
    {
      mobile: 16,
      tablet: 18,
      desktop: 20,
    },
    isMobile,
    isTablet,
  );
};
