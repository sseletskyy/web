import React from 'react';

import classNames from 'classnames';

const Row = ({
  children,
  className,
  form,
  ...props,
}) => {
  const classes = classNames({
    row: true,
    'form-group': form,
    [className]: className,
  });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Row.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  form: React.PropTypes.bool,
};

export default Row;
