import React from 'react';
import { StyleSheet, css } from 'aphrodite';

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
          <button
            className={styles.button}
            onClick={onClick}
          >
            {action}
          </button>}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'fixed',
    right: '15px',
    bottom: 0,
    left: '15px',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    padding: '6px 24px',
    margin: '0 auto',
    minHeight: '50px',
    color: '#fff',
    borderRadius: '2px',
    background: 'rgba(0, 0, 0, 0.870588)',
    transition: 'all .35s cubic-bezier(.4,0,.2,1) .35s',
    '@media (max-width: 400px)': {
      right: 0,
      left: 0,
      borderRadius: '0px',
    },
  },
  icon: {
    marginRight: '10px',
  },
  label: {
    flexGrow: 1,
  },
  button: {
    marginLeft: '10px',
  },
});
