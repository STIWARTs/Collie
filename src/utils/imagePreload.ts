/**
 * Preloads an array of images by creating new Image objects and setting their src
 * @param imagePaths Array of image paths to preload
 * @returns Promise that resolves when all images are loaded or rejects if any fails
 */
export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  const imagePromises = imagePaths.map((path) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        console.log(`Successfully preloaded image: ${path}`);
        resolve();
      };
      img.onerror = () => {
        console.error(`Failed to preload image: ${path}`);
        reject(new Error(`Failed to preload image: ${path}`));
      };
      img.src = path;
    });
  });

  return Promise.all(imagePromises);
};
