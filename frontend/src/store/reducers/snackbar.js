const initialState = {
  action: undefined,
  active: false,
  icon: undefined,
  label: undefined,
  onClick: undefined,
  type: undefined,
};

export default function snackbar(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SNACK':
      return { ...action.opts, active: true };
    case 'HIDE_SNACK':
      return { ...state, active: false };
    default:
      return state;
  }
}
