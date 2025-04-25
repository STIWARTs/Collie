/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const nextConfig = {
  experimental: {
    typedRoutes: true,
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizeCss: true,
    optimizePackageImports: [
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  serverExternalPackages: ['mongoose'],
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // env: { Example: 'value' },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: advancedHeaders,
      },
    ];
  },
};

const advancedHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

module.exports = async () => {
  const plugins = [withBundleAnalyzer]; //All plugins goes into this array
  return plugins.reduce((acc, next) => next(acc), nextConfig);
};
