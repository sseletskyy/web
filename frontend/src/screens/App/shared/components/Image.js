import React from 'react';

import geopattern from 'geopattern';

export default class Image extends React.Component {
  static propTypes = {
    pattern: React.PropTypes.string,
    src: React.PropTypes.string,
  }
  constructor(props) {
    super(props);
    const { src, pattern } = props;
    this.state = {
      image: src || geopattern.generate(pattern || Math.random()).toDataUri(),
    };
  }
  errorHandler = () => {
    const { pattern } = this.props;
    const image = geopattern.generate(pattern || Math.random()).toDataUri();
    this.setState({ image });
  }
  render() {
    const { pattern, src, ...props } = this.props;
    return (
      <img
        src={this.state.image}
        onError={this.errorHandler}
        {...props}
      />
    );
  }
}
