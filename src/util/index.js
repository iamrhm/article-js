export function getSelectedBlockElement(range) {
  let node = range.startContainer;
  do {
    try {
      const nodeIsDataBlock = node.getAttribute
        ? node.getAttribute("data-block")
        : null;
      if (nodeIsDataBlock) {
        return node;
      }
      node = node.parentNode;
    } catch (error) {
      return null;
    }
  } while (node !== null);
  return null;
}