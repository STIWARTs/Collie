// Script to identify used and unused image directories
const fs = require('fs');
const path = require('path');

// Directories to check
const imageDirs = [
  'public/images/avatar/animal',
  'public/images/avatar/emoji',
  'public/images/avatar/festival',
  'public/images/avatar/flat',
  'public/images/avatar/handdrawing',
  'public/images/avatar/hipster',
  'public/images/avatar/illustration',
  'public/images/avatar/minimal',
  'public/images/avatar/paint',
  'public/images/avatar/plain',
  'public/images/avatar/popular',
  'public/images/avatar/products',
];

// Images referenced in code (from our analysis)
const usedImages = [
  // Product images from DiscoverSliderContent
  '/images/avatar/products/denim-jacket.jpg',
  '/images/avatar/products/pleatedmini-skirt.jpg',
  '/images/avatar/products/premium-tshirt.jpg',
  '/images/avatar/products/crossboy-bag.jpg',
  '/images/avatar/products/chinnopants.jpg',
  '/images/avatar/products/floral-print-summer-dress.jpg',
  '/images/avatar/products/sunglasses.jpg',
  '/images/avatar/products/leather-chelsea-boots.jpg',
  '/images/avatar/products/blend-sweather.jpg',
  '/images/avatar/products/blend-blazer.jpg',

  // Product detail images
  '/images/avatar/products/denim-jacket/1.jpg',
  '/images/avatar/products/denim-jacket/2.jpg',
  '/images/avatar/products/denim-jacket/3.jpg',
  '/images/avatar/products/pleatedmini-skirt/1.jpg',
  '/images/avatar/products/pleatedmini-skirt/2.jpg',
  '/images/avatar/products/pleatedmini-skirt/3.jpg',
  '/images/avatar/products/premium-tshirt/1.jpg',
  '/images/avatar/products/premium-tshirt/2.jpg',
  '/images/avatar/products/premium-tshirt/3.jpg',
  '/images/avatar/products/crossboy-bag/1.jpg',
  '/images/avatar/products/crossboy-bag/2.jpg',
  '/images/avatar/products/crossboy-bag/3.jpg',
  '/images/avatar/products/chinnopants/1.jpg',
  '/images/avatar/products/chinnopants/2.jpg',
  '/images/avatar/products/chinnopants/3.jpg',
  '/images/avatar/products/floral-print-summer-dress/1.jpg',
  '/images/avatar/products/floral-print-summer-dress/2.jpg',
  '/images/avatar/products/floral-print-summer-dress/3.jpg',
  '/images/avatar/products/sunglasses/1.jpg',
  '/images/avatar/products/sunglasses/2.jpg',
  '/images/avatar/products/sunglasses/3.jpg',
  '/images/avatar/products/leather-chelsea-boots/1.jpg',
  '/images/avatar/products/leather-chelsea-boots/2.jpg',
  '/images/avatar/products/leather-chelsea-boots/3.jpg',

  // Summer sale images from SummerSaleContent
  '/images/avatar/illustration/1.png',
  '/images/avatar/illustration/2.png',
  '/images/avatar/illustration/3.png',
  '/images/avatar/illustration/4.png',
  '/images/avatar/illustration/5.png',
  '/images/avatar/illustration/6.png',
  '/images/avatar/illustration/7.png',
  '/images/avatar/illustration/8.png',
  '/images/avatar/illustration/9.png',
  '/images/avatar/illustration/10.png',

  // Discover tiles images
  '/images/avatar/hipster/4.png',
  '/images/avatar/hipster/5.png',
  '/images/avatar/hipster/6.png',
  '/images/avatar/hipster/8.png',
];

// Function to list all files in a directory recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      // Convert Windows backslashes to forward slashes for consistency
      arrayOfFiles.push(filePath.replace(/\\/g, '/'));
    }
  });

  return arrayOfFiles;
}

// Main function to analyze and report
function analyzeImages() {
  console.log('=== Image Usage Analysis ===');

  let unusedImageCount = 0;
  let totalImageCount = 0;
  const unusedDirs = [];

  // Process each image directory
  for (const dir of imageDirs) {
    try {
      if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}`);
        continue;
      }

      const allImages = getAllFiles(dir);
      const dirImages = allImages.map(
        (img) => '/' + img.replace('public/', ''),
      );

      const usedImagesInDir = dirImages.filter((img) =>
        usedImages.includes(img),
      );
      const unusedImagesInDir = dirImages.filter(
        (img) => !usedImages.includes(img),
      );

      totalImageCount += dirImages.length;
      unusedImageCount += unusedImagesInDir.length;

      const percentUnused = (
        (unusedImagesInDir.length / dirImages.length) *
        100
      ).toFixed(2);

      console.log(`\n${dir}:`);
      console.log(`  Total images: ${dirImages.length}`);
      console.log(`  Used images: ${usedImagesInDir.length}`);
      console.log(
        `  Unused images: ${unusedImagesInDir.length} (${percentUnused}%)`,
      );

      if (percentUnused > 90) {
        console.log(
          `  ⚠️ This directory is mostly unused and could be considered for removal`,
        );
        unusedDirs.push(dir);
      }

      if (unusedImagesInDir.length > 0 && unusedImagesInDir.length <= 10) {
        console.log('  Unused images:');
        unusedImagesInDir.forEach((img) => console.log(`    ${img}`));
      }
    } catch (err) {
      console.error(`Error processing ${dir}: ${err.message}`);
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Total images: ${totalImageCount}`);
  console.log(
    `Unused images: ${unusedImageCount} (${(
      (unusedImageCount / totalImageCount) *
      100
    ).toFixed(2)}%)`,
  );

  if (unusedDirs.length > 0) {
    console.log('\nDirectories that could be removed:');
    unusedDirs.forEach((dir) => console.log(`  ${dir}`));

    console.log('\nTo remove these directories, you can use:');
    const rmCommands = unusedDirs.map((dir) => `rm -rf ${dir}`).join('\n');
    console.log(rmCommands);
  }
}

// Run the analysis
analyzeImages();
