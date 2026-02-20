import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
      ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localstack",
        port: "4566",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4566",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4566",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      }
    ],
  },
};

export default nextConfig;
