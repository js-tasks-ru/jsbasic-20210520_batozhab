function highlight(table) {
  let tBody = table.querySelector('tbody');

  for (const row of tBody.rows) {
    
    let statusCell = row.cells[3];
    let hasValue = statusCell.dataset.available;

    if (typeof hasValue === 'undefined') {
      row.hidden = true;
    } else {
      if (hasValue === 'true') {
        row.classList.add('available');
      } else  {
        row.classList.add('unavailable');
      }
    }

    let genderCell = row.cells[2];
    switch (genderCell.textContent) {
      case 'm':
        row.classList.add('male');
        break;
      case 'f':
        row.classList.add('female');
        break;
    }

    let ageCell = row.cells[1];
    if (ageCell.textContent < 18)
      row.style.textDecoration = 'line-through';

  }
}