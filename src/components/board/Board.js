import React, { Component } from 'react';
import './Board.css';
import BoardCell from '../board-cell/BoardCell';
import { cellType, navigationBoardType } from '../../helpers/game-contants';
import {getSubset} from '../../helpers/cells-reducer';
import {exposeAllAdjustCells, exposeAllMines, exposeCell} from '../../helpers/cells-exposer';
import BoardNavgiation from '../board-navigation/BoardNavigation';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: this.props.cells,
      gameOver: false,
      currentLocation: {row: 0,col: 0},
      maxScreenWidth: 0,
      maxScreenHeight: 0
    }
    this.updateMaxDimensions = this.updateMaxDimensions.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    let location = this.state.currentLocation;
    if(nextProps.gameNumber > this.props.gameNumber) {
      location = {row: 0, col: 0};
    }
    this.setState({
      cells: nextProps.cells,
      gameOver: false,
      currentLocation: location
    });
  }

  componentDidMount() {
    this.updateMaxDimensions();
    window.addEventListener('resize', this.updateMaxDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMaxDimensions);
  }
  
  updateMaxDimensions() {
    let cellSize = 45;
    let reduceStyleWidth = 340;
    let reduceStyleHeight = 100;
    let maxScreenHeight = Math.floor((window.innerHeight - reduceStyleHeight) / cellSize);
    let maxScreenWidth = Math.floor((window.innerWidth - reduceStyleWidth) / cellSize);
    this.setState({
      maxScreenHeight,
      maxScreenWidth
    })
  }

  onCellClick(e, {row, col}) {
    if(this.state.gameOver)
      return;
    let cells = [...this.state.cells];
    let cell = cells[row][col];
    let gameOver = false;
    if(this.wasFlagPressed(e)) {
      this.onCellFlagged(cells, row, col);
      if(this.checkForWinning()) {
        gameOver=true;
        this.props.onWin();
      }
    }
    else {
        this.exposeCellsByClickedType(cells, cell);
        if(cell.type === cellType.MINE && !cell.isFlagged) {
          gameOver = true;
          this.props.onLose();
        }
    }
    this.setState({cells, gameOver});
  }

  wasFlagPressed(event) {
    return event.shiftKey;
  }

  exposeCellsByClickedType(cells, cell){
    const {row, col, isFlagged, type} = cell;
    if(isFlagged)
      return;
    switch(type) {
      case cellType.MINE:
        exposeAllMines(cells, this.props.minePlaces);
        break;
      case cellType.EMPTY:
        exposeAllAdjustCells(cells, row, col);
        break;
      default:
        exposeCell(cells, row, col);
        break;
    }
  }

  onCellFlagged(cells, row, col) {
    let isCellAlreadyFlagged = cells[row][col].isFlagged
    let isCellOpen = cells[row][col].isOpen;
    if((!this.props.hasFlags() && !isCellAlreadyFlagged) || isCellOpen)
    {
      return;
    }
    let cell = {...cells[row][col], isFlagged: !isCellAlreadyFlagged};
   cells[row][col] = cell;
   this.props.onCellFlaggedChanged(cell.isFlagged);
  }

  checkForWinning() {
    for(let row of this.state.cells) {
      for(let cell of row) {
        if((!cell.isFlagged && cell.type === cellType.MINE) ||
            (cell.isFlagged && !(cell.type === cellType.MINE)))
          return false;
      }
    }
    return true;
  }
  onMoveBoard(newLocation) {
    this.setState({
      currentLocation: newLocation
    });
  }

  renderBoard() {
    const {cells, maxScreenWidth, maxScreenHeight, currentLocation} = this.state;
    const {row, col} = currentLocation;
    let cellsToShow = getSubset(cells, row, col, maxScreenHeight, maxScreenWidth);
    let domBoard = cellsToShow.map((row, i) => {
      return(<div key={i} className='row'>
      { this.renderCellsInRow(row) }
      </div>)
    })
    return domBoard;
  }

  renderCellsInRow(row) {
    let domRow = row.map((cell) => {
      const {key, row, col} = cell;
      return (
          <BoardCell 
            key={key}
            onCellClick = {(e) => this.onCellClick(e, {row, col})}
            cell={cell}
            gameOver={this.state.gameOver}
            gameNumber={this.props.gameNumber}/>
      );  
    })
    return domRow;
  }
  generateDimentionsForNavigationButtons() {
    const {maxScreenHeight, maxScreenWidth, cells} = this.state;
    let dimentions = {maxScreenHeight, maxScreenWidth, allCellsHeight: 0, allCellsWidth: 0}
    if(cells.length > 0 && cells[0].length > 0) {
        dimentions.allCellsHeight = cells.length;
        dimentions.allCellsWidth = cells[0].length;
    }
    return dimentions;
  }
  render() {
    let dimentions = this.generateDimentionsForNavigationButtons();
    const {currentLocation} = this.state;
    return (
      <div className="board"> 
        <BoardNavgiation dimentions={dimentions} type={navigationBoardType.DOWN} onMoveBoard={this.onMoveBoard.bind(this)}  currentLocation={currentLocation}/>
        <BoardNavgiation dimentions={dimentions} type={navigationBoardType.UP} onMoveBoard={this.onMoveBoard.bind(this)} currentLocation={currentLocation}/>
        <BoardNavgiation dimentions={dimentions} type={navigationBoardType.LEFT} onMoveBoard={this.onMoveBoard.bind(this)} currentLocation={currentLocation}/>
        <BoardNavgiation dimentions={dimentions} type={navigationBoardType.RIGHT} onMoveBoard={this.onMoveBoard.bind(this)} currentLocation={currentLocation}/>
        { this.renderBoard() }
      </div>
    );
  }
}

export default Board;
