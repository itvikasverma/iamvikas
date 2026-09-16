import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/iamvikas",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.14'],
};

export default nextConfig;
