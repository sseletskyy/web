import React from 'react';

import classNames from 'classnames';

const NavItem = ({
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    'nav-item': true,
    [className]: className,
  });
  return (
    <li className={classes} {...props}>
      {children}
    </li>
  );
};

NavItem.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default NavItem;
