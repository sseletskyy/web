import createEntityLoader from './createEntityLoader';
import userLoader from './userLoader';

import models from '../models';

function createLoaders(user) {
  return {
    Badge: createEntityLoader(models.Badge),
    User: userLoader(user && user.sub),
  };
}

export default createLoaders;
