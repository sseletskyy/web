import React from 'react';
import classNames from 'classnames';

const Media = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    media: true,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Media.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Media;
