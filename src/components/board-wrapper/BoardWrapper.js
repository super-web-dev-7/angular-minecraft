import React, { Component } from 'react';
import './BoardWrapper.css';
import Board from '../board/Board';
import { generateMinePlaces, createCells } from '../../helpers/cells-creator';

class BoardWrapper extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.gameNumber !== this.props.gameNumber;
  }
  render() {
    const {height, width, numOfMines, onCellFlaggedChanged, hasFlags} = this.props;
    const minePlaces = generateMinePlaces({height, width, numOfMines});
    const cells = createCells({height, width, minePlaces});
    return (
      <div className='board-wrapper'>
          <Board
            cells={cells}
            minePlaces={minePlaces}
            onCellFlaggedChanged={onCellFlaggedChanged}
            hasFlags={hasFlags}
            onWin={this.props.onWin}
            onLose={this.props.onLose}
            gameNumber={this.props.gameNumber}/>
     </div>
    );
  }
}

export default BoardWrapper;
