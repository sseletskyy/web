import { canUseDOM } from 'exenv';
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

import config from './config';

const clientId = 'Tn2SYv7j2qfu2HlRmTpYx8ZQUHEYHQhs';
const domain = 'icon.auth0.com';

const authAddress = `${process.env.APP_URL}${config.authPath}`;

const refresh = () => {
  return new Promise((resolve) => {
    if (canUseDOM) {
      const token = cookie.get('refresh_token');
      if (token) {
        fetch(`${authAddress}/secured/refresh-token`, {
          method: 'POST',
          credentials: 'same-origin',
        }).then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response');
          }
          return response.json();
        }).then(({ message }) => {
          if (message === 'success!') {
            resolve();
          } else {
            throw new Error('unable to refresh token');
          }
        });
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
};

const linkAccount = async (connection, cb) => {
  if (!cb) throw new Error('callback required');
  const token = cookie.get('id_token');
  if (canUseDOM && token) {
    const Auth0Lock = require('auth0-lock').default; // eslint-disable-line
    const opts = {
      autoclose: true,
      auth: {
        redirect: false,
      },
      languageDictionary: {
        title: `Link ${connection} account`,
      },
      rememberLastLogin: false,
      allowedConnections: [connection],
    };

    const lock = new Auth0Lock(clientId, domain, opts, (error, result) => {
      if (error) {
        console.error(error);
      }
      if (result) {
        const { idTokenPayload } = result;
        const [identity] = idTokenPayload.sub.split('|');
        if (identity === connection) {
          cb(null, result);
        } else if (identity === 'auth0') {
          cb('Account has already been connected with another user');
        } else {
          cb('Something went wrong');
        }
      }
    });
    lock.show();
  }
};

const login = () => {
  if (canUseDOM) {
    const Auth0Lock = require('auth0-lock').default; // eslint-disable-line
    const opts = {
      auth: {
        redirect: false,
        params: { scope: 'openid offline_access' },
      },
      additionalSignUpFields: [{
        name: 'name',
        placeholder: 'your full name',
        validator: (value) => value.length > 2,
      }],
      socialButtonStyle: 'big',
    };

    const lock = new Auth0Lock(clientId, domain, opts, (error, result) => {
      if (error) {
        // handle error
        console.error(error);
      }
      if (result) {
        const { idToken, refreshToken } = result;
        fetch(`${authAddress}/secured/authorize-cookie`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ token: idToken, refreshToken }),
        }).then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response');
          }
          return response.json();
        }).then(({ message }) => {
          if (message === 'success!') {
            if (window.location.pathname === '/') {
              window.location.href = '/news';
            } else {
              window.location.reload();
            }
          }
        });
      }
    });
    lock.show();
  }
};

const logout = () => {
  if (canUseDOM) {
    fetch(`${authAddress}/logout`, {
      method: 'POST',
      credentials: 'same-origin',
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response');
      }
      return response.json();
    }).then(({ message }) => {
      if (message === 'success!') {
        window.location.reload();
      }
    });
  }
};

export {
  linkAccount,
  login,
  logout,
  refresh,
};
