/** @type {import("next").NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    domains: [
      "i.ibb.co",
      "svgshare.com",
      "via.placeholder.com",
      "avatars.githubusercontent.com",
      "cloudflare-ipfs.com",
      "missafir.com",
      "ownerv2.missafir.com"
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
      }
    ]
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  }
};
module.exports = nextConfig;