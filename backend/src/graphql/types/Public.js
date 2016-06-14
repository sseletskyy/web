import {
  GraphQLObjectType,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { nodeInterface, registerNodeFetcher } from '../node';

const Public = new GraphQLObjectType({
  name: 'Public',
  fields: () => ({
    id: globalIdField(),
  }),
  interfaces: () => [nodeInterface],
});

registerNodeFetcher(Public);

export {
  Public,
};
