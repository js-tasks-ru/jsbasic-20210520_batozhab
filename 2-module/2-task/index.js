function isEmpty(obj) {
  for (let prop in obj) {
    if (prop) return false;
  }
  return true;
}