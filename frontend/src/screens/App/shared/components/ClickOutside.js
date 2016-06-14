// from: https://github.com/tj/react-click-outside/blob/master/index.js

import React, { Component, PropTypes } from 'react';

export default class ClickOutside extends Component {
  static propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    children: React.PropTypes.node,
  };
  componentDidMount() {
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true);
  }

  handle = e => {
    const { onClickOutside } = this.props;
    const el = this.refs.container;
    if (!el.contains(e.target)) onClickOutside(e);
  };

  render() {
    const { children, ...props } = this.props;
    return <div {...props} ref="container">{children}</div>;
  }
}
