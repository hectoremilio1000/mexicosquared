// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@mercadopago/sdk-react",
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
  images: {
    // Sprint 3 — Gap #15: activamos next/image con remote patterns para el
    // backend AdonisJS (proxy /api/media/:token), Railway (deploy backend),
    // S3 público y picsum.photos (seed dev).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gabanabackadonis-production.up.railway.app",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "api.gabanarealstate.com.mx",
        pathname: "/api/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "*.gabanarealstate.com.mx",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
    ],
    deviceSizes: [320, 480, 640, 800, 1024, 1280, 1600],
    imageSizes: [64, 128, 256, 384, 512],
  },
};

module.exports = nextConfig;
