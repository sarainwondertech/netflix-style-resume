import type { NextConfig } from "next";

// Allow Next's dev server to accept HMR requests from a phone on the same LAN.
// Set DEV_LAN_ORIGIN=<your laptop's LAN IP> in .env.local to enable.
const devLanOrigin = process.env.DEV_LAN_ORIGIN;

const nextConfig: NextConfig = {
  allowedDevOrigins: devLanOrigin ? [devLanOrigin] : [],
};

export default nextConfig;
