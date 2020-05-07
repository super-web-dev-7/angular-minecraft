export const cellType = {
    MINE: "Mine",
    NUMBER: "Number",
    EMPTY: "Empty",
    FLAG: "Flag"
}

export const createCells = ({height, width, minePlaces}) => {
    let cells = new Array(parseInt(height));
    for(let i=0 ; i<height; i++) {
      cells[i] = new Array(parseInt(width)).fill(null);;
    }
    minePlaces.forEach((minePlace) => {
        const {row, col} = minePlace;
      cells[row][col] = {key:row + width * col,
                         row: row, 
                         col: col,
                         type: cellType.MINE,
                         isOpen: false};
    });
    cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if(!cell) {
          let countOfMinesArround = calculateMinesArround(i, j, cells);
          if(countOfMinesArround === 0) {
            row[j] = {key: j + width * i, row: i, col: j, type: cellType.EMPTY, isOpen: false};
          } else {
            row[j] = {key: j + width * i, row:i, col: j, type: cellType.NUMBER, value: countOfMinesArround, isOpen: false};
          }
        }
      })
    });
    return cells;
  }

  const calculateMinesArround = (rowIndex, colIndex, cells) => {
    let countOfMinesAround = 0;
    for(let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for(let j = colIndex -1; j <= colIndex + 1; j++) {
        if(cellIndexHasMine(i, j, cells)) {
          countOfMinesAround++;
        }   
      } 
    }
    return countOfMinesAround;
  }
  
  const cellIndexHasMine = (rowIndex, colIndex, cells) => {
    if(rowIndex > cells.length - 1 || rowIndex < 0)
      return false;
    let row = cells[rowIndex];
    if(colIndex > row.length - 1 ||  colIndex < 0)
      return false;
    return row[colIndex] && row[colIndex].type === cellType.MINE;
  }

  
