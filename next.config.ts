import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allows the lorem-ipsum placeholder images used in section scaffolds.
    // Remove once real assets replace them.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
