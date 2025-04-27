/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

// Simplified configuration to avoid compatibility issues
const nextConfig = {
  // Basic essential settings
  reactStrictMode: false, // Disable strict mode for faster development
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize compilation
  swcMinify: true,
  // Disable static exports to speed up development
  output: 'standalone',
  // Reduce build time by disabling some optimizations in dev
  experimental: {
    optimizeCss: false,
    optimizePackageImports: [
      '@mui/material',
      'framer-motion',
      '@heroicons/react',
    ],
  },
  // Image configuration
  images: {
    remotePatterns: [
      {
        hostname: 'www.gstatic.com',
      },
      {
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    formats: ['image/webp'],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
