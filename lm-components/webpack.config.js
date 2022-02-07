const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async ({ config, mode }) => {
  config.resolve.plugins = [new TsconfigPathsPlugin({})];
  config.node = { fs: 'empty' };

  config.module.rules.push({
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../src'),
  });
  config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));

  return config;
};
