import React from 'react';
import Relay from 'react-relay';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import { login, logout } from 'shared/utils/auth';

import get from 'lodash/get';

class Home extends React.Component {
  static propTypes = {
    me: React.PropTypes.object,
  }
  render() {
    return (
      <div>
        {this.props.me ? (
          <div className={css(styles.welcome)}>
            Welcome {get(this.props, 'viewer.actor.username')}
            <a href="#" onClick={logout}>Logout</a>
          </div>
        ) : (
          <div>
            <a href="#" onClick={login}>Login</a>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  me: state.user,
});

export default Relay.createContainer(
  connect(mapStateToProps)(Home), {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          actor {
            username,
          }
        }
      `,
    },
  },
);

const styles = StyleSheet.create({
  welcome: {
    fontSize: '22px',
  },
});
