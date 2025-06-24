// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // …other config options…

  images: {
    // Allow Next.js Image to optimize from this domain:
    domains: ["easyorders.fra1.digitaloceanspaces.com", "app.easy-orders.net"],
    // Alternatively, with remotePatterns:
    /*
    remotePatterns: [
      {
        protocol: "https",
        hostname: "easyorders.fra1.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
    ],
    */
  },
};

export default nextConfig;
