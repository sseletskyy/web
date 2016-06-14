import React from 'react';
import classNames from 'classnames';

const CardTitle = ({
  className,
  children,
  ...props,
}) => {
  const classes = classNames({
    ['card-title']: true,
    [className]: className,
  });
  return (
    <h3
      className={classes}
      {...props}
    >
      {children}
    </h3>
  );
};

CardTitle.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default CardTitle;
