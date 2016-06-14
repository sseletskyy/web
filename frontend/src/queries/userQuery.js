import Relay from 'react-relay';

const userQuery = {
  user: () => Relay.QL`query { user(username: $username) }`,
};

export default userQuery;
