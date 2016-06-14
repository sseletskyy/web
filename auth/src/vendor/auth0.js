import {
  AuthenticationClient,
  ManagementClient,
} from 'auth0';

const authentication = new AuthenticationClient({
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: `${process.env.AUTH0_DOMAIN}.auth0.com`,
});

const management = new ManagementClient({
  token: process.env.AUTH0_TOKEN,
  domain: `${process.env.AUTH0_DOMAIN}.auth0.com`,
});

export {
  authentication,
  management,
};
