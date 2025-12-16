/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placid.asia',
      },
      {
        protocol: 'https',
        hostname: 'cdn.abacus.ai',
      },
    ],
  },
};

module.exports = nextConfig;
