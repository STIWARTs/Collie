/**
 * Utility to preload images for better user experience
 */

export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  console.log('Preloading images:', imagePaths);

  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        console.log(`Successfully preloaded: ${src}`);
        resolve();
      };

      img.onerror = () => {
        console.error(`Failed to preload: ${src}`);
        // Resolve anyway to not block the entire process
        resolve();
      };

      img.src = src;
    });
  };

  return Promise.all(imagePaths.map(loadImage));
};

/**
 * Checks if an image exists by attempting to load it
 */
export const imageExists = (imagePath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
  });
};
