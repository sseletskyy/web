import React from 'react';

import classNames from 'classnames';

const MediaBody = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'media-body': true,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

MediaBody.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default MediaBody;
