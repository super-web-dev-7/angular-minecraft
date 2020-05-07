export const getSubset = (cells, row, col, maxScreenHeight, maxScreenWidth) => {
    let subCells = [];
    for(let i = row; i < row + maxScreenHeight; i++) {
      if(i >= cells.length)
        break;
      let row = [];
      subCells.push(row);
      for(let j = col; j < col + maxScreenWidth; j++) 
      {
        if(j >= cells[i].length) {
          break;
        }
        row.push(cells[i][j]);
      }
    }
    return subCells;
  }