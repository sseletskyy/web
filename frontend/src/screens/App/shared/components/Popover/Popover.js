import React from 'react';

import classNames from 'classnames';

const Popover = ({
  children,
  className,
  position,
  ...props,
}) => {
  const classes = classNames({
    popover: true,
    [`popover-${position}`]: true,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Popover.propTypes = {
  position: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

Popover.defaultProps = {
  position: 'top',
};

export default Popover;
