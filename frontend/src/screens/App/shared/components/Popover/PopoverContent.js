import React from 'react';

import classNames from 'classnames';

const PopoverContent = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'popover-content': true,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>{children}</div>
  );
};

PopoverContent.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default PopoverContent;
