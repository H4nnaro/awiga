import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
};
module.exports = {
  images: {
    domains: ["plus.unsplash.com", "images.unsplash.com", "images.pexels.com"],
  },
};
export default nextConfig;
