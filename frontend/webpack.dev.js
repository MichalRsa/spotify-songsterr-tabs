/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
});
