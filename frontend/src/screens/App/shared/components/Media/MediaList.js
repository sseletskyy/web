import React from 'react';

import classNames from 'classnames';

const MediaList = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'media-list': true,
    [className]: className,
  });
  return (
    <ul className={classes} {...props}>
      {children}
    </ul>
  );
};

MediaList.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default MediaList;
