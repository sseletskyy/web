import 'babel-polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import config from '../../config.json';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import renderOnServer from './middlewares/renderOnServer';

const app = express();
app.use(cookieParser()); // auth

if (process.env.NODE_ENV === 'production') {
  app.use('/assets', express.static(path.resolve(__dirname, '..', '..', 'assets')));
} else {
  app.use(require('./middlewares/webpackDev').default); // eslint-disable-line global-require
  app.use(require('./middlewares/webpackHot').default); // eslint-disable-line global-require
}
app.get('*', renderOnServer);
app.use(errorHandler);


const server = app.listen(config.port, err => {
  if (err) {
    logger.error(err);
  } else {
    const { address, port } = server.address();
    logger.info(`Frontend is listening at http://${address}:${port}`);

    if (process.send) {
      process.send('ready');
    }
  }
});
