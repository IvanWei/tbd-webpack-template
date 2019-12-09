module.exports = {
  ident: 'postcss',
  plugins: (loader) => [
    require('autoprefixer')(),
  ],
};
