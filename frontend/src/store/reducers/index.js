import { combineReducers } from 'redux';
import user from './user';
import progress from './progress';
import snackbar from './snackbar';

const rootReducer = combineReducers({
  user,
  progress,
  snackbar,
});

export default rootReducer;
