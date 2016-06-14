import React from 'react';
import classNames from 'classnames';

const CardDeck = ({
  className,
  children,
  ...props,
}) => {
  const classes = classNames({
    ['card-deck']: true,
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

CardDeck.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default CardDeck;
