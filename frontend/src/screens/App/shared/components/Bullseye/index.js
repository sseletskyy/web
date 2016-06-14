import React from 'react';
import classNames from 'classnames';

import styles from './Bullseye.scss';

export const Bullseye = ({
  children,
  className,
  size,
  style = {},
  ...props,
}) => {
  const classes = classNames({
    [styles.container]: true,
    [className]: className,
  });
  return (
    <div
      className={classes}
      style={{
        width: size,
        height: size,
        borderRadius: size,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

Bullseye.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  size: React.PropTypes.number,
  style: React.PropTypes.object,
};

Bullseye.defaultProps = {
  size: 32,
};

export default Bullseye;
