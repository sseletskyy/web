import React from 'react';

import { Link } from 'react-router';
import classNames from 'classnames';

const NavLink = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'nav-link': true,
    [className]: className,
  });
  return (
    <Link
      className={classes}
      {...props}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default NavLink;
