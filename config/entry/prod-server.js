/* eslint no-console: "off"*/
const express = require('express');
const helmet = require('helmet');
const serveStatic = require('serve-static');

const app = express();

const serveCompressed = require('./prodServeCompressed');
const port = process.env.PORT || 8080;

app.use(require('connect-history-api-fallback')());
app.use(helmet());
app.use(helmet.noCache());

app.get('*.js', serveCompressed('text/javascript'));
app.get('*.css', serveCompressed('text/css'));
app.use(serveStatic(__dirname, {dotfiles: 'ignore'}));


app.listen(port, () => {
  console.log(`Prod app listening on port ${port}!`);
});
