import React from 'react';

import classNames from 'classnames';

const MediaObject = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'media-object': true,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

MediaObject.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default MediaObject;
