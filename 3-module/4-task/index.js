function showSalary(users, age) {
  let result = users
    .filter(({age: userAge}) => userAge <= age)
    .map(({name, balance}, index, arr) => {
      if (index == arr.length - 1) return name + ', ' + balance;
      return name + ', ' + balance + '\n';
    })
  return result.join('');
}