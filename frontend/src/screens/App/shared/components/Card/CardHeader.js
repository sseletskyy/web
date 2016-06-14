import React from 'react';
import classNames from 'classnames';

const CardHeader = ({
  className,
  children,
  ...props,
}) => {
  const classes = classNames({
    ['card-header']: true,
    [className]: className,
  });
  return (
    <h4
      className={classes}
      {...props}
    >
      {children}
    </h4>
  );
};

CardHeader.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default CardHeader;
