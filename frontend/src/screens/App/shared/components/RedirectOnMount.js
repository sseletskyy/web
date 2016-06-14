import React from 'react';

export default class RedirectOnMount extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  }
  static propTypes = {
    to: React.PropTypes.object,
  }
  componentDidMount() {
    this.context.router.push(this.props.to);
  }
  render() {
    return <span />;
  }
}
