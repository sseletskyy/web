import React from 'react';

import classNames from 'classnames';

const Col = ({
  xs,
  sm,
  md,
  lg,
  xl,
  offsetXS,
  offsetSM,
  offsetMD,
  offsetLG,
  offsetXL,
  children,
  className,
  ...props,
}) => {
  const classes = classNames({
    [`col-xs-${xs}`]: xs,
    [`col-sm-${sm}`]: sm,
    [`col-md-${md}`]: md,
    [`col-lg-${lg}`]: lg,
    [`col-xl-${xl}`]: xl,
    [`col-xs-offset-${offsetXS}`]: offsetXS,
    [`col-sm-offset-${offsetSM}`]: offsetSM,
    [`col-md-offset-${offsetMD}`]: offsetMD,
    [`col-lg-offset-${offsetLG}`]: offsetLG,
    [`col-xl-offset-${offsetXL}`]: offsetXL,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Col.propTypes = {
  xs: React.PropTypes.number,
  sm: React.PropTypes.number,
  md: React.PropTypes.number,
  lg: React.PropTypes.number,
  xl: React.PropTypes.number,
  offsetXS: React.PropTypes.number,
  offsetSM: React.PropTypes.number,
  offsetMD: React.PropTypes.number,
  offsetLG: React.PropTypes.number,
  offsetXL: React.PropTypes.number,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Col;
