import React from 'react';

import classNames from 'classnames';

const Container = ({
  children,
  className,
  fluid = false,
  ...props,
}) => {
  const classes = classNames({
    container: !fluid,
    'container-fluid': fluid,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fluid: React.PropTypes.bool,
};

export default Container;
