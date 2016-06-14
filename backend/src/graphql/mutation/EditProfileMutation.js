import {
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';

import { getViewer } from '../utils/getRoot';

import { management } from '../../vendor/auth0';

import models from '../../models';

import _ from 'lodash';

const EditProfile = mutationWithClientMutationId({
  name: 'EditProfile',
  inputFields: {
    badgeURI: { type: GraphQLString },
    description: { type: GraphQLString },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  outputFields: {
    viewer: getViewer(),
  },
  mutateAndGetPayload: (args, { user }) => {
    if (!user || !user.sub) throw new Error('unauthorized');
    return models.sequelize.transaction(async (t) => {
      const { badgeURI, description, name, email, username } = args;
      const body = { email, username, user_metadata: {} };
      if (description) body.user_metadata.description = description;
      if (name) body.user_metadata.name = name;
      if (badgeURI) {
        const badges = await models.BadgeRelationship.findAll({
          where: { type: 'user', ThingId: user.sub },
          include: [models.Badge],
          transaction: t,
          raw: true,
        });
        const userbadge = _.find(badges, ({ Badge }) => Badge.uri === badgeURI);
        if (userbadge) body.user_metadata.badge = badgeURI;
      }
      await management.updateUser({ id: user.sub }, body);
      return user;
    });
  },
});

export default EditProfile;
