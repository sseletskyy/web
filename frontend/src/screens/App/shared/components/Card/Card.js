import React from 'react';
import classNames from 'classnames';

const Card = ({
  block,
  className,
  children,
  textAlign,
  ...props,
}) => {
  const classes = classNames({
    card: true,
    'card-block': block,
    [`text-xs-${textAlign}`]: textAlign,
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

Card.propTypes = {
  block: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  textAlign: React.PropTypes.oneOf(['left', 'right', 'center']),
};

export default Card;
