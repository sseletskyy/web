import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';

import { getViewer } from '../utils/getRoot';

import { management } from '../../vendor/auth0';

const LinkSocial = mutationWithClientMutationId({
  name: 'LinkSocial',
  inputFields: {
    provider: { type: new GraphQLNonNull(GraphQLString) },
    userID: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    viewer: getViewer(),
  },
  mutateAndGetPayload: async (args, { user }) => {
    if (!user || !user.sub) throw new Error('unauthorized');
    const { provider, userID } = args;
    const linkParams = { user_id: userID, provider };
    await management.linkUsers(user.sub, linkParams);
    return { id: 0 };
  },
});

export default LinkSocial;
