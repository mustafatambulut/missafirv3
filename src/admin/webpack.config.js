// ./src/admin/webpack.config.js
'use strict';

module.exports = (config, webpack) => {
// Note: we provide webpack above so you should not `require` it
// Perform customizations to webpack config
// Important: return the modified config

  config.plugins.push(
    new webpack.DefinePlugin({
      FRONT_END_URL: JSON.stringify(process.env.FRONT_END_URL),
    })
  )
  return config;
};
