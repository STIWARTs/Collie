/**
 * Responsive design utility functions
 * This file provides tools to detect device types and handle responsive behavior
 */
import React from 'react';

/**
 * Check if the current device is mobile based on screen width
 * @returns {boolean} True if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // Server-side rendering default
  }
  return window.innerWidth <= 768;
};

/**
 * Check if the current device is a small mobile device (iPhone SE, etc)
 * @returns {boolean} True if the device is a small mobile
 */
export const isSmallMobileDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // Server-side rendering default
  }
  return window.innerWidth <= 375;
};

/**
 * Check if the current device is in landscape orientation
 * @returns {boolean} True if the device is in landscape orientation
 */
export const isLandscapeOrientation = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // Server-side rendering default
  }
  return window.innerWidth > window.innerHeight;
};

/**
 * Get the current device type
 * @returns {string} Device type: 'desktop', 'tablet', 'mobile', or 'small-mobile'
 */
export const getDeviceType = (): string => {
  if (typeof window === 'undefined') {
    return 'desktop'; // Server-side rendering default
  }

  const width = window.innerWidth;

  if (width <= 375) return 'small-mobile';
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

/**
 * Custom hook to get and track screen dimensions
 * @returns {Object} Object with width, height, and device type
 */
export const useScreenDimensions = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering default
    return {
      width: 1200,
      height: 800,
      deviceType: 'desktop',
      isMobile: false,
    };
  }

  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
    deviceType: getDeviceType(),
    isMobile: isMobileDevice(),
  });

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        deviceType: getDeviceType(),
        isMobile: isMobileDevice(),
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

export default {
  isMobileDevice,
  isSmallMobileDevice,
  isLandscapeOrientation,
  getDeviceType,
  useScreenDimensions,
};
