import React from 'react';

import classNames from 'classnames';

const MediaLeft = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'media-left': true,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

MediaLeft.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default MediaLeft;
