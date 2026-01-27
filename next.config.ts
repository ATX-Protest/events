import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Standalone output for optimized Railway/container deployments
  // Creates a self-contained build with only necessary dependencies
  output: "standalone",

  // Ensure consistent standalone output structure regardless of workspace detection
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
