export const removeKeysFromObject = (keys, obj) => {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((result, current) => {
      result[current] = obj[current];
      return result;
  }, {});
};

export const removeKeyFromObject = (key, obj) => {
  return removeKeysFromObject([key], obj);
};

export const removeItemFromArray = (item, arr) => {
  const index = arr.indexOf(item);

  return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
  ];
}

export const removeItemsFromArray = (items, arr) =>
  arr.filter(item => !items.includes(item));
