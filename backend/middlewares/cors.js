const allowedDomains = [
  'https://mesto.rita-kruglova.nomoredomains.xyz',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
];

module.exports.checkDomain = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  console.log('origin', origin);

  if (allowedDomains.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
