/**
 * Custom dev script for faster development
 * This script temporarily renames the main page.tsx to page.original.tsx
 * and uses a simplified page for development
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Paths
const APP_DIR = path.join(__dirname, 'src', 'app');
const MAIN_PAGE = path.join(APP_DIR, 'page.tsx');
const BACKUP_PAGE = path.join(APP_DIR, 'page.original.tsx');
const FAST_PAGE = path.join(APP_DIR, 'fast-dev.tsx');
const TEMP_PAGE = path.join(APP_DIR, 'page.temp.tsx');

// Ensure the backup file exists before continuing
if (!fs.existsSync(FAST_PAGE)) {
  console.error(
    'Fast dev page not found. Make sure src/app/fast-dev.tsx exists.',
  );
  process.exit(1);
}

// Check if we need to backup the original page
if (fs.existsSync(MAIN_PAGE) && !fs.existsSync(BACKUP_PAGE)) {
  console.log('Backing up original page...');
  fs.copyFileSync(MAIN_PAGE, BACKUP_PAGE);
}

// Now replace the main page with our fast version
console.log('Using fast dev page for development...');
fs.copyFileSync(FAST_PAGE, MAIN_PAGE);

// Function to restore the original page on exit
function restoreOriginalPage() {
  if (fs.existsSync(BACKUP_PAGE)) {
    console.log('\nRestoring original page...');
    fs.copyFileSync(BACKUP_PAGE, MAIN_PAGE);
  }
}

// Start Next.js dev server with turbo
console.log('Starting Next.js dev server...');
const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

// Handle process termination
process.on('SIGINT', () => {
  restoreOriginalPage();
  process.exit(0);
});

// Listen for child process exit
nextDev.on('exit', (code) => {
  restoreOriginalPage();
  process.exit(code);
});
