import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { nodeInterface, registerNodeFetcher } from '../node';
import { betterConnectionDefinitons, connectionHelper } from '../utils/connections';

import { Badge, BadgeConnection } from './Badge';

import models from '../../models';

import _ from 'lodash';

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    badge: {
      type: Badge,
      description: 'show badge of user',
      resolve: async (obj) => {
        const uri = _.get(obj, 'user_metadata.badge');
        if (uri) {
          const badge = await models.BadgeRelationship.findOne({
            where: {
              type: 'user',
              ThingId: obj.id,
            },
            include: [{ model: models.Badge, where: { uri } }],
          });
          return _.get(badge, 'Badge');
        }
        return null;
      },
    },
    badges: connectionHelper({
      auth: true,
      type: BadgeConnection,
      prop: 'BadgeRelationship',
      where: (obj) => ({ ThingId: obj.id, type: 'user' }),
      include: [models.Badge],
      resolveNode: (edge) => _.get(edge, 'Badge'),
    }),
    description: {
      type: GraphQLString,
      description: 'description of user',
      resolve: (obj) => _.get(obj, 'user_metadata.description'),
    },
    email: {
      type: GraphQLString,
      description: 'email of user',
      resolve: ({ id, email }, args, { user }) => {
        if (user && user.sub && user.sub === id) return email;
        return null;
      },
    },
    name: {
      type: GraphQLString,
      description: 'name of user',
      resolve: (obj) => _.get(obj, 'user_metadata.name'),
    },
    picture: {
      type: GraphQLString,
      description: 'picture of user',
    },
    username: {
      type: GraphQLString,
      description: 'username of user',
    },
    followers: connectionHelper({
      type: UserConnection,
      prop: 'Relationship',
      where: (obj) => ({ toId: obj.id }),
      resolveNode: (edge, args, { loaders }) => loaders.User.load(edge.node.fromId),
    }),
    following: connectionHelper({
      type: UserConnection,
      prop: 'Relationship',
      where: (obj) => ({ fromId: obj.id }),
      resolveNode: (edge, args, { loaders }) => loaders.User.load(edge.node.toId),
    }),
    viewerRelationship: {
      type: GraphQLString,
      description: 'relationship viewer has with user',
      resolve: async ({ id }, args, { user }) => {
        if (!user || !user.sub) return null;
        if (user.sub === id) return 'self';
        const relationship = await models.Relationship.findOne({
          where: {
            toId: id,
            fromId: user.sub,
          },
        });
        if (!relationship) return null;
        return relationship.status;
      },
    },
    // social
    facebookUrl: {
      type: GraphQLString,
      description: 'facebook url of user',
      resolve: ({ identities }) => {
        const fbIdentity = _.find(identities, { isSocial: true, connection: 'facebook' });
        if (!fbIdentity) return null;
        return _.get(fbIdentity, 'profileData.link', null);
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

registerNodeFetcher(User);

const {
  connectionType: UserConnection,
  edgeType: UserEdge,
} = betterConnectionDefinitons({ nodeType: User });

export {
  User,
  UserConnection,
  UserEdge,
};
