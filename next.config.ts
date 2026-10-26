import type { NextConfig } from "next";
const config: NextConfig = { distDir: process.env.EASTWAVE_PREVIEW_DIR || ".next", agentRules: false, poweredByHeader: false, devIndicators: false, experimental: { cpus: 1, workerThreads: true, webpackBuildWorker: false } };
export default config;

