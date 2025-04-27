/**
 * Basic development server for Next.js
 * Uses completely standard settings with no special flags
 * to avoid any compatibility issues.
 */

const { spawn } = require('child_process');

console.log('🚀 Starting standard Next.js development server...');
console.log('⚠️  This uses default settings to avoid compatibility issues');

// Start Next.js with standard settings
const nextProcess = spawn('node', ['node_modules/next/dist/bin/next', 'dev'], {
  stdio: 'inherit',
  env: process.env, // Just pass through all environment variables without changes
});

// Handle errors and exits
nextProcess.on('error', (error) => {
  console.error('Failed to start Next.js process:', error.message);
  process.exit(1);
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Stopping Next.js development server...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Stopping Next.js development server...');
  nextProcess.kill('SIGTERM');
});
