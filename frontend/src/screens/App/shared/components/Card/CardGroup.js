import React from 'react';
import classNames from 'classnames';

const CardGroup = ({
  className,
  children,
  ...props,
}) => {
  const classes = classNames({
    ['card-group']: true,
    [className]: className,
  });
  return (
    <div
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
};

CardGroup.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default CardGroup;
