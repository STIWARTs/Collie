/**
 * Minimal development server for Next.js
 * This script starts a minimal Next.js server with most features disabled
 * for the fastest possible compilation and refresh times.
 */

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting minimal development server...');
console.log('⚠️  Warning: Most features are disabled for faster compilation');

// Check if Next.js can be started
if (!fs.existsSync(path.join(__dirname, 'node_modules', 'next'))) {
  console.error('Next.js not found in node_modules!');
  process.exit(1);
}

// Clean up .next directory to prevent permission issues
try {
  if (fs.existsSync(path.join(__dirname, '.next'))) {
    console.log('Cleaning up .next directory...');
    // This only removes trace files that might cause permission issues
    const tracePath = path.join(__dirname, '.next', 'trace');
    if (fs.existsSync(tracePath)) {
      fs.rmSync(tracePath, { recursive: true, force: true });
    }
  }
} catch (error) {
  console.warn('Failed to clean up .next directory:', error.message);
}

// Start the minimal Next.js dev server
process.env.NODE_ENV = 'development';

const nextProcess = spawn('node', ['node_modules/next/dist/bin/next', 'dev'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    // Disable all non-essential features
    NEXT_DISABLE_SOURCEMAPS: 'true',
    NEXT_TELEMETRY_DISABLED: '1',
    NEXT_SKIP_TYPECHECKING: 'true',
    NEXT_SKIP_LINTING: 'true',
    NEXT_TRACE_PROFILING: 'false',
    NEXT_DISABLE_WEBPACK_COMPILATION_TRACE: 'true',
    // Disable any unnecessary optimizations
    BROWSERSLIST_DISABLE_CACHE: 'true',
    NEXT_DISABLE_IMAGE_OPTIMIZATION: 'true',
    NODE_OPTIONS: '--max-old-space-size=4096',
  },
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
