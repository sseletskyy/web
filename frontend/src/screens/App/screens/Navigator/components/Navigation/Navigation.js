import React from 'react';
import Relay from 'react-relay';

import { Navbar } from 'shared/components/Navbar';
import { Container } from 'shared/components/Grid';

import RightNav from './RightNav/RightNav';

import styles from './Navigation.scss';

class Navigation extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    viewer: React.PropTypes.object,
  };
  render() {
    return (
      <Navbar className={styles.navigation}>
        <Container>
          <RightNav viewer={this.props.viewer} />
        </Container>
      </Navbar>
    );
  }
}

export default Relay.createContainer(Navigation, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${RightNav.getFragment('viewer')},
      }
    `,
  },
});
