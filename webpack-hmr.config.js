/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = function(options) {
  console.log('options:', options.entry)
  console.log('options output filename:', options.output.filename)
  return {
    ...options,
    entry: ['./src/main.ts'],
    watch: true,
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      })
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new StartServerPlugin({ name: options.output.filename }),
    ],
  };
};