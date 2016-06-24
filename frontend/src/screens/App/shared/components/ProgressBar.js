import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class ProgressBar extends React.Component {
  static propTypes = {
    percent: React.PropTypes.number,
    autoIncrement: React.PropTypes.bool,
    intervalTime: React.PropTypes.number,
  }
  static defaultProps = {
    percent: -1,
    autoIncrement: false,
    intervalTime: 200,
  }
  constructor(props) {
    super(props);
    this.state = {
      percent: this.props.percent,
    };
  }
  componentDidMount = () => {
    this.handleProps(this.props);
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.handleProps(nextProps);
  };

  componentWillUnmount = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  increment = () => {
    let { percent } = this.state;
    percent = percent + (Math.random() + 1 - Math.random());
    percent = percent < 99 ? percent : 99;
    this.setState({ percent });
  };

  handleProps = (props) => {
    if (props.autoIncrement && props.percent >= 0 && props.percent < 99) {
      this.interval = setInterval(this.increment, props.intervalTime);
    }

    if (props.percent >= 100) {
      this.setState({ percent: 99.9 }, () => {
        this.timeout = setTimeout(() => {
          this.setState({ percent: -1 });
        }, 400);
      });
    } else {
      this.setState({ percent: props.percent });
    }
  };
  render() {
    const { percent } = this.state;
    let style = { width: `${(percent < 0 ? 0 : percent)}%` };
    const hideProgress = percent < 0 || percent >= 100;
    return (
      <div className={css(styles.progressbar, hideProgress && styles.progressbarHide)}>
        <div className={css(styles.progressbarPercent)} style={style} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  progressbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    visibility: 'visible',
    opacity: 1,
    transition: 'all 400ms',
    zIndex: 9999,
  },
  progressbarHide: {
    opacity: 0,
    visibility: 'hidden',
    zIndex: -10,
  },
  progressbarPercent: {
    height: '2px',
    background: '#29D',
    boxShadow: '0 0 10px #29D, 0 0 5px #29D',
    transition: 'all 200ms ease',
  },
});
