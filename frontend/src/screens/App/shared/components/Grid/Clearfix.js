import React from 'react';

import classNames from 'classnames';

const Clearfix = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    clearfix: true,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Clearfix.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Clearfix;
