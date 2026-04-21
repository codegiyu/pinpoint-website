import type { NextConfig } from 'next';

const cmsImageHost = process.env.NEXT_PUBLIC_CMS_IMAGE_HOSTNAME;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Force HTTPS
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://pinpoint.ng/:path*',
        permanent: true,
      },
      // Redirect www to root domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.pinpoint.ng' }],
        destination: 'https://pinpoint.ng/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        // For static assets (JS, CSS), allow short cache but with revalidation
        source: '/:path*\\.(js|css|woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.pinpoint.ng',
      },
      ...(cmsImageHost
        ? [
            {
              protocol: 'https' as const,
              hostname: cmsImageHost,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
