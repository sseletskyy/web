import embedly from 'embedly';
import logger from '../utils/logger';
const api = new embedly({
  key: process.env.EMBEDLY_KEY,
  logger,
});

const extract = (opts) =>
  new Promise((resolve, reject) => {
    api.extract(opts, (err, objs) => {
      if (!!err) {
        return reject(err);
      }
      return resolve(objs);
    });
  });

export {
  extract,
};
