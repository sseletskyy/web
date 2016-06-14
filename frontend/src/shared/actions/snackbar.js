export function showSnack(opts) {
  return { type: 'SHOW_SNACK', opts };
}

export function hideSnack() {
  return { type: 'HIDE_SNACK' };
}
