/* eslint max-len: "off"*/
const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const {NODE_ENV, PROJECT_TITLE} = process.env;
const rootPath = path.resolve();
const isDevMode = NODE_ENV !== 'production';
const projectTitle = PROJECT_TITLE || 'TBD';

module.exports = {
  output: {
    path: `${rootPath}/dist`,
    publicPath: '/',
    chunkFilename: '[name].[chunkhash].bundle.js',
    filename: '[name].[hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    alias: {
      '@': rootPath,
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
    }),
    new webpack.EnvironmentPlugin({
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${rootPath}/dist`, `${rootPath}/*.log`],
    }),
    new HtmlWebpackPlugin({
      title: `${isDevMode?'[Dev] ':''}${projectTitle}`,
      inject: 'head',
      // favicon: `${rootPath}/vendor/images/favicon.png`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover',
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      preload: /\.js$/,
      defaultAttribute: 'async',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       envName: NODE_ENV,
      //       babelrc: false,
      //       presets: [
      //         [
      //           '@babel/preset-env',
      //           {
      //             targets: {
      //               esmodules: true,
      //               node: true,
      //               // browsers: [

      //               // ],
      //             }
      //           },
      //         ],
      //       ],
      //       plugins: ['@babel/plugin-syntax-dynamic-import'],
      //     },
      //   },
      // },
      // {
      //   test: /\.(eot|ttf|woff|woff2)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //     },
      //   },
      // },
    ],
  },
};
