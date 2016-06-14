import React from 'react';

import classNames from 'classnames';

import Button from '../Button';

import styles from './Snackbar.scss';

export default class Snackbar extends React.Component {
  static propTypes = {
    action: React.PropTypes.string,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    icon: React.PropTypes.node,
    label: React.PropTypes.node,
    onClick: React.PropTypes.func,
    onTimeout: React.PropTypes.func,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string,
  }
  static defaultProps = {
    active: false,
    timeout: 2000,
    type: 'primary',
  }
  constructor(props) {
    super(props);
    this.state = {
      curTimeout: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.active && nextProps.timeout) {
      if (this.state.curTimeout) clearTimeout(this.state.curTimeout);

      const curTimeout = setTimeout(() => {
        nextProps.onTimeout();
        this.setState({ curTimeout: null });
      }, nextProps.timeout);

      this.setState({ curTimeout });
    }
  }
  render() {
    const { action, active, icon, label, onClick, type, className } = this.props;
    const classes = classNames({
      [styles.root]: true,
      [styles.active]: active,
      [className]: className,
    });

    return (
      <div className={classes} style={{ transform: `translateY(${active ? 0 : 100}%)` }}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <span className={styles.label}>{label}</span>
        {action &&
          <Button
            action={type}
            className={styles.button}
            onClick={onClick}
          >
            {action}
          </Button>}
      </div>
    );
  }
}
