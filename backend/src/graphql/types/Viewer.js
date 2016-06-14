import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { nodeInterface, registerNodeFetcher } from '../node';

import { authenticate } from '../utils/authenticate';

import { User } from './User';


const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField(),
    hasBadges: ({
      type: GraphQLBoolean,
      args: {
        badges: {
          description: 'does viewer have badges?',
          type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
      },
      resolve: (obj, { badges }, { user }) => authenticate(user, badges),
    }),
    actor: {
      type: User,
      description: 'current user information',
      resolve: (obj, args, { loaders, user }) => loaders.User.load(user.sub),
    },
  }),
  interfaces: () => [nodeInterface],
});

registerNodeFetcher(Viewer);

export {
  Viewer,
};
