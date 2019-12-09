const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const commonConfig = require('./common');
const rootPath = path.resolve();
const port = 8080;

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      './src/index',
    ],
  },
  serve: {
    port: port,
    log: false,
  },
  watchOptions: {
    aggregateTimeout: 10000,
    poll: 5000,
    ignored: [
      'node_modules',
      'config',
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Dev app is running here http://localhost:${port}`],
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: require(`${rootPath}/config/postcss`),
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: './vendor/images',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
});
