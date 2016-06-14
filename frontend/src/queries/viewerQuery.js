import Relay from 'react-relay';

const viewerQuery = {
  viewer: () => Relay.QL`query { viewer }`,
};

export default viewerQuery;
