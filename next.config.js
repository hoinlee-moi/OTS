/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizeCss: false,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  poweredByHeader: process.env.NODE_ENV === "development",
  reactStrictMode: process.env.NODE_ENV === "development",
};

module.exports = nextConfig;
