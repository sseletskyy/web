import React from 'react';
import Relay from 'react-relay';

import Navigation from './components/Navigation/Navigation';

class Navigator extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    viewer: React.PropTypes.object,
  };
  render() {
    return (
      <div>
        <Navigation viewer={this.props.viewer} />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Navigator, {
  initialVariables: {
    loggedIn: false,
  },
  fragments: {
    viewer: (variables) => Relay.QL`
      fragment on Viewer {
        ${Navigation.getFragment('viewer').if(variables.loggedIn)},
      }
    `,
  },
});
