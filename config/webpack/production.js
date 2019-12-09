const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BrotliWebpackPlugin = require('brotli-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./common');
const rootPath = path.resolve();

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: '#source-map',
  entry: {
    app: [
      './src/index',
    ],
  },
  plugins: [
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliWebpackPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CssoWebpackPlugin({
      comments: false,
    }),
    new CopyWebpackPlugin([
      {from: `${rootPath}/config/entry/prod-server.js`, to: './'},
      {from: `${rootPath}/config/entry/prod-server-compressed.js`, to: './'},
      {from: `${rootPath}/package.json`, to: './'},
    ]),
  ],
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 3,
      maxInitialRequests: Infinity,
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
              name: '[name].[hash].[ext]',
              outputPath: './vendor/images',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {progressive: true, quality: 65},
              optipng: {enable: false},
              pngquant: {quality: '65-90', speed: 4},
              svgo: {options: {
                cleanupAttrs: true,
                removeComments: true,
              }},
            },
          },
        ],
      },
    ],
  },
});
