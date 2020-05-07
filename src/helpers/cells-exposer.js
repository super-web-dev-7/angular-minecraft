import { cellType } from './game-contants';

export const exposeCell = (cells, row, col) => {
    let cell = {
                ...cells[row][col],
                isOpen: true
                };
    cells[row][col] = cell;
  }

  export const  exposeAllAdjustCells = (cells, clickedCellRow, clickedCellCol) => {
    const cellsToCheck = [];
    cellsToCheck.push(cells[clickedCellRow][clickedCellCol]);
    while(cellsToCheck.length > 0) {
      let cell = cellsToCheck.pop();
      const {row, col } = cell;
      exposeCell(cells, row, col);
      if(cell.type === cellType.EMPTY) {
        addAllNeighbors(row, col, cells, cellsToCheck);
      }
    }
  }

  const addAllNeighbors = (row, col, cells, cellsToCheck) => {
    for (let rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
      for (let colIndex = col - 1; colIndex <= col + 1; colIndex++) {
        if (isInRange(cells, rowIndex, colIndex)) {
          let cellToAdd = cells[rowIndex][colIndex];
          if (!cellToAdd.isOpen && !cellToAdd.isFlagged)
            cellsToCheck.push(cellToAdd);
        }
      }
    }
  }

  const isInRange = (cells, row, col) => {
    let height = cells.length;
    if(row < 0 || row > height - 1)
      return false;
    let width = cells[row].length;
    if(col < 0 || col > width - 1)
      return false;
    return true;
  }
  
  export const exposeAllMines = (cells, minePlaces) => {
    minePlaces.forEach(minePlace => {
        let cell = {
          ...cells[minePlace.row][minePlace.col],
          isOpen: true
      }
      cells[minePlace.row][minePlace.col] = cell;
    });
  }