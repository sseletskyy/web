import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';

import config from '../config.json';
import authHandler from './middlewares/authHandler';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';

// import { authentication } from './vendor/auth0';

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function getOpts(opts) {
  opts = opts || {};
  let defaults = {
    // 7 days, make sure that JWT on Auth0 matches this number
    expires: new Date(Date.now() + (604800 * 1000)),
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
  };
  if (process.env.NODE_ENV === 'development') {
    defaults.domain = '';
  }
  return Object.assign(defaults, opts);
}

app.post('/secured/authorize-cookie', authHandler, (req, res) => {
  const decoded = jwtDecode(req.body.token);
  res.cookie('id_token', req.body.token, getOpts({ expires: new Date(decoded.exp * 1000) }));
  res.cookie('refresh_token', req.body.refreshToken, getOpts({ expires: new Date(2147483647000) }));
  res.send({ message: 'success!' });
});

app.post('/secured/refresh-token', authHandler, (req, res) => {
  if (req.cookies && req.cookies.refresh_token) {
    const refresh_token = req.cookies.refresh_token;
    // @FIXME waiting on https://github.com/auth0/node-auth0/issues/83
    // authentication.tokens.getDelegationToken({
    //   grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    //   refresh_token,
    //   api_type: 'app',
    // }).then(({ expires_in, id_token }) => {
    //   res.cookie('id_token', id_token, getOpts({ expires: expires_in }));
    //   res.send({ message: 'success!' });
    // });

    // workaround
    const url = `https://${process.env.AUTH0_DOMAIN}.auth0.com/delegation`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        refresh_token,
        scope: 'openid',
        api_type: 'app',
      }),
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response');
      }
      return response.json();
    }).then((response) => {
      const { expires_in, id_token } = response;
      const expires = new Date(Date.now() + (expires_in * 1000));
      res.cookie('id_token', id_token, getOpts({ expires }));
      res.send({ message: 'success!' });
    });
  } else {
    // if user doesn't have refresh token, return a 401
    res.send(401);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('id_token', '', { expires: new Date() });
  res.cookie('refresh_token', '', { expires: new Date() });
  res.send({ message: 'success!' });
});

app.get('/ping', (req, res) => {
  res.send('pong!');
});

app.use(errorHandler);

const server = app.listen(config.port, err => {
  if (err) {
    logger.error(err);
  } else {
    const { address, port } = server.address();
    logger.info(`Auth is listening at http://${address}:${port}`);
    if (process.send) {
      process.send('ready');
    }
  }
});
