import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default withContentlayer(nextConfig);
