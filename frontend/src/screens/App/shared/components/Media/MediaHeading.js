import React from 'react';

import classNames from 'classnames';

const MediaHeading = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'media-heading': true,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

MediaHeading.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default MediaHeading;
