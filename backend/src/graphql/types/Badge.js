import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { nodeInterface, registerNodeFetcher } from '../node';
import { betterConnectionDefinitons } from '../utils/connections';

const Badge = new GraphQLObjectType({
  name: 'Badge',
  fields: () => ({
    id: globalIdField(),
    description: {
      type: GraphQLString,
      description: 'desctipion of badge',
    },
    name: {
      type: GraphQLString,
      description: 'name of badge',
    },
    shortname: {
      type: GraphQLString,
      description: 'badge shortname',
    },
  }),
  interfaces: () => [nodeInterface],
});

registerNodeFetcher(Badge);

const {
  connectionType: BadgeConnection,
  edgeType: BadgeEdge,
} = betterConnectionDefinitons({ nodeType: Badge });

export {
  Badge,
  BadgeConnection,
  BadgeEdge,
};
