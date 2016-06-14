import React from 'react';

import { Link } from 'react-router';

import classNames from 'classnames';

const Button = ({
  action,
  active,
  block,
  children,
  className,
  link,
  onClick,
  outline,
  size,
  type,
  value,
  ...props,
}) => {
  const classes = classNames({
    btn: true,
    [`btn-${action}${outline ? '-outline' : ''}`]: true,
    [`btn-${size}`]: size,
    'btn-block': block,
    active: active,
    [className]: className,
  });

  const clickHandler = (e) => {
    e.target.blur();
    if (onClick) onClick(e);
  };

  return link ? (
    <Link className={classes} onClick={clickHandler} {...props}>{value || children}</Link>
  ) : (
    <button
      type={type}
      className={classes}
      onClick={clickHandler}
      {...props}
    >{value || children}</button>
  );
};

Button.propTypes = {
  action: React.PropTypes.oneOf([
    'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link',
  ]),
  active: React.PropTypes.bool,
  block: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  link: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  outline: React.PropTypes.bool,
  size: React.PropTypes.oneOf(['sm', 'lg']),
  type: React.PropTypes.oneOf(['button', 'submit']),
  value: React.PropTypes.node,
};

Button.defaultProps = {
  action: 'primary',
  outline: false,
  type: 'button',
};

export default Button;
