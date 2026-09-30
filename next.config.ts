import type { NextConfig } from "next";

// STATIC_EXPORT is set by the GitHub Pages workflow; local `next start` keeps
// running as a normal server without it.
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export" as const,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
