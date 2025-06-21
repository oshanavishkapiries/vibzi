import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: 'export',
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
