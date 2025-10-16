/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // If you want to also skip type checking during build:
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
