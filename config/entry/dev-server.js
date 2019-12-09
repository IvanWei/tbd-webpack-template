const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');

const webpackOptions = require(`../webpack/${process.env.NODE_ENV}`);
const {port, log: logConfig} = webpackOptions.serve;

const compiler = webpack(webpackOptions);
const app = express();

app.use(require('connect-history-api-fallback')());
app.use(middleware(compiler, {
  logLevel: 'silent',
  publicPath: '/',
}));
app.use(require('webpack-hot-middleware')(compiler, {log: logConfig}));

app.listen(port);
