import graphQLHTTP from 'express-graphql';

import logger from '../utils/logger';
import schema from '../graphql/schema';
import createLoaders from '../loaders';


export default graphQLHTTP((req) => {
  let user = req.get('X-Proxy-User-Header') && JSON.parse(req.get('X-Proxy-User-Header'));
  /* for dev purposes only */
  // user = {
  //   iss: 'https://icon.auth0.com/',
  //   sub: 'auth0|571d8fe8740a1df61b691d56',
  //   aud: 'Tn2SYv7j2qfu2HlRmTpYx8ZQUHEYHQhs',
  //   exp: 1462905025,
  //   iat: 1462300225,
  // };
  /* end of dev purposes */
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
