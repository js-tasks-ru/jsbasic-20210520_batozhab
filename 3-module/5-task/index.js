function getMinMax(str) {
  let arr = str.split(',')
                .join(' ')
                .split(' ')
                .filter(t => isFinite(t) && t !== '');
                
  const result = {
    min: Math.min(...arr),
    max: Math.max(...arr),
  }

  return result;
}