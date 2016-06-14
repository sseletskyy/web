import React from 'react';
import classNames from 'classnames';

const CardBlock = ({
  className,
  children,
  ...props,
}) => {
  const classes = classNames({
    ['card-block']: true,
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

CardBlock.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default CardBlock;
