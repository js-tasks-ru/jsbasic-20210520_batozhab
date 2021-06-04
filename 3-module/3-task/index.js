function camelize(str) {
  let array = str.split('-');
  
  let result = array.map((item, index) => {
    if (index !== 0) 
      return item[0].toUpperCase() + item.slice(1).toLowerCase();
    else 
      return item;
  });

  return result.join('');
}