function ucFirst(str) {
  if (!str) return '';

  let result = str[0].toUpperCase() + str.slice(1);
  return result;
}