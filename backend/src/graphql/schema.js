import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { nodeField } from './node';
import {
  getPublic,
  getTypeById,
  getUser,
  getViewer,
} from './utils/getRoot';
import mutation from './mutation';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    public: getPublic(),
    user: getUser(),
    viewer: getViewer(),
    node: nodeField,
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: mutation,
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
