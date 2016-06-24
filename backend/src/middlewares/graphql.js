import graphQLHTTP from 'express-graphql';

import logger from '../utils/logger';
import schema from '../graphql/schema';
import createLoaders from '../loaders';


export default graphQLHTTP((req) => {
  let user = req.get('X-Proxy-User-Header') && JSON.parse(req.get('X-Proxy-User-Header'));
  /* override user here for dev purposes */
  const context = {
    user,
    loaders: createLoaders(user),
  };
  return ({
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
    pretty: process.env.NODE_ENV !== 'production',
    context,
  });
});
