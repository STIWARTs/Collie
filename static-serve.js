/**
 * Static file server for Next.js
 * This script builds the app once and then serves it statically,
 * which is much faster than running the development server.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3000;
const BUILD_DIR = path.join(__dirname, '.next');

console.log('🚀 Preparing static server...');

// Check if we need to build
const needsBuild =
  !fs.existsSync(BUILD_DIR) ||
  !fs.existsSync(path.join(BUILD_DIR, 'server', 'pages'));

if (needsBuild) {
  console.log(
    '📦 Building project (this will take a moment but only happens once)...',
  );
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Build failed:', error);
      return;
    }
    console.log('✅ Build completed successfully!');
    startServer();
  });
} else {
  console.log('✅ Using existing build');
  startServer();
}

function startServer() {
  console.log(`🌐 Starting static file server on port ${PORT}...`);

  // Simple static file server
  const server = http.createServer((req, res) => {
    // Strip query parameters
    const urlPath = req.url.split('?')[0];

    // Default to index.html
    let filePath = path.join(
      __dirname,
      '.next',
      'server',
      'pages',
      urlPath === '/' ? 'index.html' : urlPath,
    );

    // Add .html extension if no extension
    if (!path.extname(filePath)) {
      filePath += '.html';
    }

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File not found
        res.writeHead(404);
        res.end('404 Not Found');
        return;
      }

      // Determine content type
      const ext = path.extname(filePath);
      let contentType = 'text/html';

      switch (ext) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
      }

      // Read and serve the file
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('500 Server Error');
          return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      });
    });
  });

  server.listen(PORT, () => {
    console.log(`⭐ Server running at http://localhost:${PORT}/`);
    console.log(
      '📝 Note: This is a static server, not all dynamic features will work',
    );
  });

  // Handle server shutdown
  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}
