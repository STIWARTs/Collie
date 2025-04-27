import { useScreenDimensions as useScreenDimensionsImpl } from '../utils/responsive';

/**
 * Custom hook to get and track screen dimensions
 * @returns {Object} Object with width, height, device type and isMobile flag
 */
export const useScreenDimensions = useScreenDimensionsImpl;

export default useScreenDimensions;
