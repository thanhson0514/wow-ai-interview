const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  resolve: {
    crypto: false,
  },
  plugins: [new NodePolyfillPlugin()],
};
