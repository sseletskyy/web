import React from 'react';
import classNames from 'classnames';

const CardImage = ({
  className,
  position,
  ...props,
}) => {
  const classes = classNames({
    [`card-img-${position}`]: true,
    [className]: className,
  });
  return (
    <img className={classes} {...props} />
  );
};

CardImage.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  position: React.PropTypes.oneOf(['top', 'bottom']),
};

export default CardImage;
