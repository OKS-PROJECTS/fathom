import type { NextConfig } from "next";

// GitHub Pages serves the demo from /<repo>/ as a static export; local dev and `next start` stay at /.
const pages = Boolean(process.env.GITHUB_ACTIONS);
const base = pages ? "/fathom" : "";

const nextConfig: NextConfig = {
  ...(pages ? { output: "export" as const, basePath: base, assetPrefix: base, trailingSlash: true, images: { unoptimized: true } } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: base },
  cacheComponents: !pages,
  partialPrefetching: !pages,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
