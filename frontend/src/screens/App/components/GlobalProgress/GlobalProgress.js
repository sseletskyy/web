import React from 'react';
import { connect } from 'react-redux';

import ProgressBar from 'shared/components/ProgressBar';

import styles from './GlobalProgress.scss';

const GlobalProgress = ({ progress, ...props }) => (
  <div className={styles.progress} {...props}>
    <ProgressBar autoIncrement percent={progress.value} />
  </div>
);

GlobalProgress.propTypes = {
  progress: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  progress: state.progress,
});

export default connect(mapStateToProps)(GlobalProgress);
