import React from 'react';
import { connect } from 'react-redux';

import { hideSnack } from 'shared/actions/snackbar';

import Snackbar from 'shared/components/Snackbar';

const GlobalSnackbar = ({
  dispatch,
  snackbar,
}) => {
  const handleSnackbarTimeout = () => dispatch(hideSnack());
  return (<Snackbar onTimeout={handleSnackbarTimeout} {...snackbar} />);
};

GlobalSnackbar.propTypes = {
  dispatch: React.PropTypes.func,
  snackbar: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  snackbar: state.snackbar,
});

export default connect(mapStateToProps)(GlobalSnackbar);
