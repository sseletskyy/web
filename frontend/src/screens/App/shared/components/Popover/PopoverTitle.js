import React from 'react';

import classNames from 'classnames';

const PopoverTitle = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'popover-title': true,
    [className]: className,
  });
  return (
    <h3 className={classes} {...props}>{children}</h3>
  );
};

PopoverTitle.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default PopoverTitle;
