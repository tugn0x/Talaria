/* eslint consistent-return:0 import/order:0 */

const environment = {
  ...process.env,
  ...require('dotenv').config({path: __dirname + '/../../.env'}).parsed
};

console.log(__dirname + '/../.env')
console.log(require('dotenv').config({path: __dirname + '/../../.env'}).parsed)

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = parseInt(argv.port || environment.PORT || '3000', 10);
const setup = require('./middlewares/frontendMiddleware');
const isDev = environment.NODE_ENV !== 'production';

const ngrok =
  (isDev && environment.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use('/spid-login-button/', express.static(`${__dirname}/../spid-smart-button/dist`));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || environment.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

console.log(`${__dirname}/../spid-smart-button/dist`)
// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
