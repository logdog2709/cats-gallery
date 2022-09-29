export function storeValues(key, values) {
  const items = localStorage.getItem(key);
  if (!items) {
    localStorage.setItem(key, JSON.stringify(values));
  } else {
    const _items = JSON.parse(items);
    localStorage.setItem(key, JSON.stringify([..._items, ...values]));
  }
}

export function deleteValue(key, objectKey, value) {
  const items = localStorage.getItem(key);
  if (items) {
    const _items = JSON.parse(items);
    const filteredItems = _items.filter((o) => o[objectKey] !== value);
    localStorage.setItem(key, JSON.stringify(filteredItems));
  }
}

export function findItem(key, objectKey, value) {
  const items = localStorage.getItem(key);
  if (items) {
    const _items = JSON.parse(items);
    const filteredItem = _items.find((o) => o[objectKey] === value);
    if (filteredItem) {
      return filteredItem;
    }
  }
  return null;
}
