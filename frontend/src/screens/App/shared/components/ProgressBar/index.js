import React from 'react';

import styles from './ProgressBar.scss';
import classNames from 'classnames';

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
    let classes = classNames({
      [styles.progressbar]: true,
      [styles.progressbarHide]: percent < 0 || percent >= 100,
    });
    let style = { width: `${(percent < 0 ? 0 : percent)}%` };
    return (
      <div className={classes}>
        <div className={styles.progressbarPercent} style={style} />
      </div>
    );
  }
}
