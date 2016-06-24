import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import ProgressBar from 'shared/components/ProgressBar';

const GlobalProgress = ({ progress, ...props }) => (
  <div className={css(styles.progress)} {...props}>
    hello world
  </div>
);

GlobalProgress.propTypes = {
  progress: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  progress: state.progress,
});

export default connect(mapStateToProps)(GlobalProgress);

const styles = StyleSheet.create({
  progress: {
    width: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 999,
  },
});
