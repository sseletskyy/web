const initialState = {
  value: -1,
};

export default function progress(state = initialState, action) {
  switch (action.type) {
    case 'START_PROGRESS':
      return { value: 50 };
    case 'STOP_PROGRESS':
      return { value: 100 };
    default:
      return state;
  }
}
