import React from 'react';

import classNames from 'classnames';

const PopoverArrow = ({
  className,
  ...props,
}) => {
  const classes = classNames({
    'popover-arrow': true,
    [className]: className,
  });
  return (
    <div className={classes} {...props} />
  );
};

PopoverArrow.propTypes = {
  className: React.PropTypes.string,
};

export default PopoverArrow;
