/* eslint-disable no-empty-pattern */

import logger from '../utils/logger';

export default function errorHandler(err, {}, res, {}) {
  logger.error(err);

  if (res.headersSent) {
    res.end();
  } else {
    // @HACK
    // @NOTE this is where the error is handled if there is an error in the route
    res.redirect('/');
    // res.status(500).send('Internal server error.');
  }
}
