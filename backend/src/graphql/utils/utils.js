export function unflatten(arr, node) {
  let tree = [];
  const mappedArr = {};

  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = arr.length; i < len; i++) {
    const arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
  }

  for (var id in mappedArr) {
    const mappedElem = mappedArr[id];
    // If the element is not at the root level, add it to its parent array of children.
    if (mappedElem.parentId) {
      const children = mappedArr[mappedElem.parentId][node] || [];
      mappedArr[mappedElem.parentId][node] = [...children, mappedElem];
    } else {
      // If the element is at the root level, add it to first level elements array.
      tree = [...tree, mappedElem];
    }
  }
  return tree;
}
