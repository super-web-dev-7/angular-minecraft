import {cellType} from './game-contants'

export const createCells = ({height, width, minePlaces}) => {
    if(!height || !width || !minePlaces) {
      return [];
    }
    let cells = new Array(parseInt(height));
    for(let i=0 ; i<height; i++) {
      cells[i] = new Array(parseInt(width)).fill(null);;
    }
    if(minePlaces) {
      minePlaces.forEach((minePlace) => {
      const {row, col} = minePlace;
      let newCell = craeteNewCell(row + width * col, row, col);
      newCell.type = cellType.MINE;
      cells[row][col] = newCell;
      });
    }
    cells.forEach((row, rowIndex) => {
      createCellsInRow(cells, row, rowIndex, width);
    });
    return cells;
  }

  const craeteNewCell = (key, row, col) => {
    return {
              key, 
              row, 
              col,
              value: null,
              isOpen: false,
              isFlagged: false
    };
  }

  const createCellsInRow = (cells, row, rowIndex, width) => {
    row.forEach((cell, colIndex) => {
      if(!cell) {
        let countOfMinesArround = calculateMinesArround(rowIndex, colIndex, cells);
        let newCell = craeteNewCell(colIndex + width * rowIndex, rowIndex, colIndex);
        if(countOfMinesArround === 0) {
          newCell.type = cellType.EMPTY;
        } else {
          newCell.type = cellType.NUMBER;
          newCell.value = countOfMinesArround;
        }
        row[colIndex] = newCell;;
      }
    })
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


  export const generateMinePlaces = ({height, width, numOfMines}) => {
    if(numOfMines > height * width)
      return [];
    let availablePlaces = getAvailablePlaces(height, width);
    let minePlaces = [];
    while(minePlaces.length < numOfMines){
      let indexForPlace = Math.floor(Math.random() * availablePlaces.length);
      let mineIndex = availablePlaces.splice(indexForPlace,1);
      let row = Math.floor(mineIndex / width);
      let col = mineIndex % width;
      minePlaces.push({row, col});
    }
    return minePlaces;
  }
  
 const getAvailablePlaces = (height, width) => {
  const totalNumOfCells = height * width;
  let availablePlaces = [];
  for (let i = 0; i < totalNumOfCells; i++) {
    availablePlaces.push(i);
  }
  return availablePlaces;
}
  
