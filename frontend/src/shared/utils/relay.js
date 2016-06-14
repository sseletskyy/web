import {
  startProgress,
  stopProgress,
} from '../actions/progress';

import {
  showSnack,
} from '../actions/snackbar';

import get from 'lodash/get';

function failureHandler(cb, dispatch) {
  return (transaction) => {
    const error = transaction.getError().source || new Error('Mutation failed.');
    console.error(error);
    const message = get(error, 'errors[0]');
    if (message) dispatch(showSnack({ label: message }));
    if (cb) cb(transaction);
  };
}

function successHandler(cb, dispatch) {
  return (response) => {
    console.log('Mutation successful!');
    if (cb) cb(response);
  };
}

function doneHandler(route, { onSuccess, onFailure, onDone, ...options }, dispatch) {
  if (options.progress) dispatch(stopProgress());
  if (onDone) onDone();
  switch (route) {
    case 'fail':
      return failureHandler(onFailure, dispatch);
    case 'success':
      return successHandler(onSuccess, dispatch);
    default:
      return undefined;
  }
}

const mutate = (Mutation, params, { relay, dispatch }, opts = {}) => {
  // dependency check
  if (!relay) throw new Error('relay required');
  if (!dispatch) throw new Error('dispatch required');

  // options
  const options = {
    progress: true,
    ...opts,
  };
  if (options.progress) dispatch(startProgress());
  const mutation = new Mutation(params);
  const transaction = relay.applyUpdate(mutation, {
    onFailure: doneHandler('fail', options, dispatch),
    onSuccess: doneHandler('success', options, dispatch),
  });
  transaction.commit();
  return transaction;
};

export {
  mutate,
};
