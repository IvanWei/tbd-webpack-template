const fs = require('fs');

module.exports = (contentType) => (req, res, next) => {
  const compressions = [
    {encoding: 'br', extension: 'br'},
    {encoding: 'gzip', extension: 'gz'},
  ];
  const acceptedEncodings = req.acceptsEncodings();
  // use first compression which is supported
  // and where file exists
  const compression = compressions.find((comp) => (
    acceptedEncodings.indexOf(comp.encoding) !== -1
    && fs.existsSync(`${__dirname}${req.url}.${comp.extension}`)
  ));

  if (compression) {
    req.url = `${req.url}.${compression.extension}`;
    res.set('Content-Encoding', compression.encoding);
    res.set('Content-Type', contentType);
  }

  next();
};
