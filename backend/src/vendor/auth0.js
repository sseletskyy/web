import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  token: process.env.AUTH0_TOKEN,
  domain: `${process.env.AUTH0_DOMAIN}.auth0.com`,
});

export {
  management,
};
