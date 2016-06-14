import React from 'react';
import Relay from 'react-relay';
import { connect } from 'react-redux';
import classNames from 'classnames';

import TetherComponent from 'react-tether';

import { Nav, NavItem, NavLink } from 'shared/components/Nav';
import { Popover, PopoverArrow, PopoverContent } from 'shared/components/Popover';
import ClickOutside from 'shared/components/ClickOutside';
import Avatar from 'shared/components/Avatar';
import { login, logout } from 'shared/utils/auth';

import get from 'lodash/get';

import styles from './RightNav.scss';

class RightNav extends React.Component {
  static propTypes = {
    me: React.PropTypes.object,
    viewer: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  getMe = () => {
    const { isOpen } = this.state;
    const user = get(this.props, 'viewer.actor');
    return (
      <TetherComponent
        attachment="top right"
        targetAttachment="bottom center"
        offset="0 -25px"
        style={{ zIndex: 99 }}
      >
        <Avatar
          className={styles.avatar}
          user={user}
          onClick={() => this.setState({ isOpen: true })}
        />
        {
          isOpen &&
            <ClickOutside onClickOutside={this.closeMe}>
              <Popover position="bottom" style={{ position: 'relative' }}>
                <PopoverArrow className={styles.popoverarrow} />
                <PopoverContent>
                  <Nav className={styles.nav}>
                    <NavItem className={styles.navitem}>
                      <NavLink to={`/hi/${user.username}`} onClick={this.closeMe}>
                        My Page
                      </NavLink>
                    </NavItem>
                    <NavItem className={styles.navitem}>
                      <NavLink to="/me/settings" onClick={this.closeMe}>
                        Settings
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <a href="#" onClick={logout}>
                        Logout
                      </a>
                    </NavItem>
                  </Nav>
                </PopoverContent>
              </Popover>
            </ClickOutside>
        }
      </TetherComponent>
    );
  }
  closeMe = (e) => {
    this.setState({ isOpen: false });
    e.stopPropagation(); // needed to toggle for avatar
  }
  render() {
    return (
      <Nav className={classNames('pull-xs-right', styles.rightNav)}>
        {this.props.me ? (
          <NavItem>
            {this.getMe()}
          </NavItem>
        ) : (
          <NavItem>
            <a href="#" onClick={login}>LOGIN</a>
          </NavItem>
        )}
      </Nav>
    );
  }
}

const mapStateToProps = (state) => ({
  me: state.user,
});

export default Relay.createContainer(connect(mapStateToProps)(RightNav), {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        actor {
          ${Avatar.getFragment('user')},
          username,
        }
      }
    `,
  },
});
