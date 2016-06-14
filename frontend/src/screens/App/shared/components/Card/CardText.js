import React from 'react';
import classNames from 'classnames';

const CardText = ({
  className,
  children,
  ...props,
}) => {
  const classes = classNames({
    ['card-text']: true,
    [className]: className,
  });
  return (
    <p
      className={classes}
      {...props}
    >
      {children}
    </p>
  );
};

CardText.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default CardText;
