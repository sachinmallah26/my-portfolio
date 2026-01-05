import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: [],
    formats: ['image/avif', 'image/webp'],
    // minimumCacheTTL: 60,
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  compress: true,
  // swcMinify: true,
  poweredByHeader: false,
};

export default nextConfig;
