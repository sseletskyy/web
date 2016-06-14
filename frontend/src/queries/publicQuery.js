import Relay from 'react-relay';

const publicQuery = {
  public: () => Relay.QL`query { public }`,
};

export default publicQuery;
