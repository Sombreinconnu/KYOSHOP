import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Force Next.js to treat kyoshop as the workspace root (not ~/package-lock.json)
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          "**/.cursor/**",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
