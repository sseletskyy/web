import React from 'react';

import classNames from 'classnames';

const Nav = ({
  inline,
  navbar,
  tabs,
  pills,
  stacked,
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    nav: true,
    'nav-inline': inline,
    'navbar-nav': navbar,
    'nav-tabs': tabs,
    'nav-pills': pills,
    'nav-stacked': stacked,
    [className]: className,
  });
  return (
    <ul className={classes} {...props}>
      {children}
    </ul>
  );
};

Nav.propTypes = {
  inline: React.PropTypes.bool,
  navbar: React.PropTypes.bool,
  tabs: React.PropTypes.bool,
  pills: React.PropTypes.bool,
  stacked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Nav;
