function sumSalary(salaries) {
  let result = 0;

  for(let key in salaries) {
    let salaryEmployee = salaries[key];

    if (isFinite(salaryEmployee)) {    
      result += salaryEmployee;
    }
  }

  return result;
}