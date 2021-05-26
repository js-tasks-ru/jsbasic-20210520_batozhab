function checkSpam(str) {
  let result = str.toLowerCase();
  if (result.includes('1xbet') || result.includes('xxx'))
    return true;
  else 
    return false;
}