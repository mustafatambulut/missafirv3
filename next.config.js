/** @type {import("next").NextConfig} */
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const withNextIntl = require("next-intl/plugin")(`./src/i18n.ts`);
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: { webpack5: true },
  webpack: (config, { dev }) => {
    // The condition is to have the plugin on build time, not to perturb live refresh
    // fastrefresh true
    !dev && config.plugins.push(new BundleAnalyzerPlugin());
    config.plugins.push(new DuplicatePackageCheckerPlugin());
    config.resolve.alias["fast-deep-equal"] = path.resolve(
      "node_modules",
      "fast-deep-equal"
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.optimization.minimize = false;
    config.optimization.concatenateModules = false;
    config.output.pathinfo = "verbose";
    if (dev) {
      config.watchOptions = {
        poll: true
      };
    }

    // if(process.env.NEXT_WEBPACK_USEPOLLING) {
    //   config.watchOptions = {
    //     poll: 500,
    //     aggregateTimeout: 300
    //   }
    // }

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
      "missafir.s3.eu-central-1.amazonaws.com",
      "missafir-dev.s3.eu-central-1.amazonaws.com"
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
        hostname:
          "strapi-aws-s3-images-bucket-v1.s3.eu-central-1.amazonaws.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "missafirv3-strapi.s3.eu-central-1.amazonaws.com",
        port: ""
      }
    ]
  },
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}"
    }
  },
  experimental: {
    serverActions: true,
    optimizePackageImports: ["lodash", "react-leaflet", "moment"],
    enableUndici: true,
    turbo: {
      rules: {
        // Option format
        "*.md": [
          {
            loader: "@mdx-js/loader",
            options: {
              format: "md"
            }
          }
        ],
        // Option-less format
        "*.mdx": ["@mdx-js/loader"]
      }
    }
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
