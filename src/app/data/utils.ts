const freezeArray = (array: any[]) => {
  // Iterate through array and freeze all objects.
  // Note: this is not a deep freeze, as our data
  // currently does not require it.
  array.forEach(item => {
    Object.freeze(item);
    Object.seal(item);
  });
  return Object.freeze(array);
};

export { freezeArray };
