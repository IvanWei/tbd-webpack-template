const NODE_ENV = process.env.NODE_ENV;

module.exports = require(`./config/webpack/${NODE_ENV}`);
