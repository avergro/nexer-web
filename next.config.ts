import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Set NEXT_PUBLIC_BASE_PATH=/nexer (or any subfolder) to deploy under a path.
  // Leave unset for root deployments (Vercel, Netlify, root domain).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};

export default nextConfig;
