function makeDiagonalRed(table) {
  for (const row of table.rows) 
    for (const cell of row.cells)
      if (row.rowIndex == cell.cellIndex)
        cell.style.backgroundColor = 'red';

  return table;
}