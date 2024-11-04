import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.shopify.com", "mock.shop"], // Added Shopify CDN domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};

export default nextConfig;
