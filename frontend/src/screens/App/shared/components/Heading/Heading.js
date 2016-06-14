import React from 'react';
import classNames from 'classnames';
import { generate } from 'geopattern';

import styles from './Heading.scss';

const Heading = ({
  className,
  children,
  stacked,
  pattern,
  ...props,
}) => {
  const backgroundImage = pattern && generate(pattern).toDataUrl();
  const classes = classNames({
    [styles.container]: true,
    [styles.stacked]: stacked,
    [className]: className,
  });
  return (
    <div
      className={classes}
      style={{ backgroundImage }}
      {...props}
    >
      {children}
    </div>
  );
};

Heading.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  pattern: React.PropTypes.string,
  stacked: React.PropTypes.bool,
};

Heading.defaultProps = {
  stacked: true,
};

export default Heading;
