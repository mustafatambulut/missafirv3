/** @type {import("next").NextConfig} */
const withNextIntl = require("next-intl/plugin")(`./src/i18n.ts`);
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  images: {
    domains: [
      "i.ibb.co",
      "svgshare.com",
      "cdn-icons-png.flaticon.com",
      "missafir.s3.eu-central-1.amazonaws.com",
      "via.placeholder.com",
      "avatars.githubusercontent.com",
      "cloudflare-ipfs.com",
      "missafir.com",
      "ownerv2.missafir.com",
      "img.freepik.com",
      "missafirpms.s3.eu-central-1.amazonaws.com",
      "images.pexels.com",
      "prenohq.com",
      "i0.wp.com",
      "assets-global.website-files.com",
      "logowik.com",
      "cdnuploads.aa.com.tr",
      "missafir.s3.eu-central-1.amazonaws.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: ""
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "www.missafir.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "svgshare.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "ownerv2.missafir.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "missafirpms.s3.eu-central-1.amazonaws.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "strapi-aws-s3-images-bucket-v1.s3.eu-central-1.amazonaws.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "missafirv3-strapi.s3.eu-central-1.amazonaws.com",
        port: ""
      }
    ]
  },
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async rewrites() {
    return [
      {
        source: "/:lang/checkout/success",
        destination: "/api/checkout/success"
      },
      {
        source: "/:lang/checkout/failed",
        destination: "/api/checkout/failed"
      }
    ];
  }
};
module.exports = withNextIntl(nextConfig);
