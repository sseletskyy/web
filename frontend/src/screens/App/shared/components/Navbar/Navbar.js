import React from 'react';

import classNames from 'classnames';

const Navbar = ({
  children,
  className,
  scheme,
  background,
  ...props,
}) => {
  const classes = classNames({
    navbar: true,
    [`navbar-${scheme}`]: scheme,
    [`bg-${background}`]: background,
    [className]: className,
  });
  return (
    <nav className={classes} {...props}>
      {children}
    </nav>
  );
};

Navbar.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  scheme: React.PropTypes.oneOf(['dark', 'light']),
  background: React.PropTypes.oneOf(['inverse', 'primary', 'faded']),
};

Navbar.defaultProps = {
  scheme: 'light',
  background: 'faded',
};

export default Navbar;
