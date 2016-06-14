import React from 'react';
import classNames from 'classnames';

import styles from './Heading.scss';

const HeadingInfo = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    [styles.info]: true,
    [className]: className,
  });
  return (
    <div
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
};

HeadingInfo.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default HeadingInfo;
