import React from 'react';
import Relay from 'react-relay';

import UserAvatar from 'react-user-avatar';
import Emoji from '../Emoji';

import styles from './Avatar.scss';

import get from 'lodash/get';

class Avatar extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    size: React.PropTypes.number,
  }
  static defaultProps = {
    size: 32,
  };
  getName = (user) => {
    const name = get(user, 'name');
    if (!!name) return name;
    return get(user, 'username');
  }
  render() {
    const {
      user,
      size,
      ...props,
    } = this.props;
    const shortname = get(user, 'badge.shortname');
    return (
      <div {...props} style={{ minWidth: size, minHeight: size, position: 'relative' }}>
        <UserAvatar
          size={size}
          name={this.getName(user)}
          src={get(user, 'picture')}
        />
        {shortname && (
          <Emoji
            className={styles[`${size > 70 ? 'lg' : 'sm'}-badge`]}
            str={get(user, 'badge.shortname')}
            size={0}
          />
        )}
      </div>
    );
  }
}

export default Relay.createContainer(Avatar, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        picture,
        username,
        badge { name, shortname },
      }
    `,
  },
});
