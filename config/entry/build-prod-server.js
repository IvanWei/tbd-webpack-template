/* eslint no-console: "off"*/
const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');

const webpackOptions = require(`../webpack/${process.env.NODE_ENV}`);

const spinner = ora('building for production...');
spinner.start();

webpack(webpackOptions, function(err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n\n');

  console.log(chalk.cyan('  Build complete.\n'));
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ));
});
