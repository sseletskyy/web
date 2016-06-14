import React from 'react';
import classNames from 'classnames';

const CardSubtitle = ({
  className,
  children,
  ...props,
}) => {
  const classes = classNames({
    ['card-subtitle']: true,
    ['text-muted']: true,
    [className]: className,
  });
  return (
    <h6
      className={classes}
      {...props}
    >
      {children}
    </h6>
  );
};

CardSubtitle.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default CardSubtitle;
