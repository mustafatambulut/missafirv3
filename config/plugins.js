module.exports = ({env}) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: env("NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN"),
      sites: [
        {
          name: env("NETLIFY_DEPLOYMENTS_PLUGIN_SITES_NAME"),
          id: env("NETLIFY_DEPLOYMENTS_PLUGIN_SITES_ID"),
          buildHook: env("NETLIFY_DEPLOYMENTS_PLUGIN_SITES_BUILD_HOOK"),
          branch: 'main' // optional
        }
      ]
    },
  },
});
