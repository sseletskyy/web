import {
  GraphQLID,
  GraphQLString,
} from 'graphql';

import { fromGlobalId } from 'graphql-relay';

import { User } from '../types/User';
import { Viewer } from '../types/Viewer';
import { Public } from '../types/Public';

import { management } from '../../vendor/auth0';

const getViewer = () => ({
  type: Viewer,
  resolve: (obj, args, { user }) => {
    if (!user || !user.sub) return null;
    return { id: 0 };
  },
});

const getPublic = () => ({
  type: Public,
  resolve: () => ({ id: 0 }),
});

const getUser = () => ({
  type: User,
  args: {
    username: {
      description: 'username of the user',
      type: GraphQLString,
    },
  },
  resolve: async (obj, args, { user, loaders }) => {
    // if no username is provided, return current user
    if (!args.username) {
      if (!user || !user.sub) return null;
      return loaders.User.load(user.sub);
    }
    // else return user from auth0
    const [res] = await management.getUsers({
      q: `username:${args.username}`,
      search_engine: 'v2',
    });
    // if user doesn't exist in auth0
    if (!res) throw new Error('User does not exist');
    // else return user
    return loaders.User.load(res.user_id);
  },
});

const getTypeById = (type) => ({
  type,
  args: {
    id: {
      description: 'id of object',
      type: GraphQLID,
    },
  },
  resolve: (obj, { id }, { loaders }) => {
    return id ? loaders[type.name].load(fromGlobalId(id).id) : null;
  },
});

export {
  getPublic,
  getTypeById,
  getUser,
  getViewer,
};
