import React, { Component } from 'react';
import {navigationBoardType} from '../../helpers/game-contants'
import './BoardNavigation.css';

class BoardNavgiation extends Component {
  onMove() {
    const {dimentions, type} = this.props;
    let {row, col} = this.props.currentLocation;
    let newLocation = null;
    switch(type) {
      case navigationBoardType.UP:
        newLocation = {row: row - dimentions.maxScreenHeight, col: col};
        break;
      case navigationBoardType.DOWN:
        newLocation = {row: row + dimentions.maxScreenHeight, col: col};
        break;
      case navigationBoardType.RIGHT:
        newLocation = {row: row, col: col + dimentions.maxScreenWidth};
        break;
      case navigationBoardType.LEFT:
        newLocation = {row: row, col: col - dimentions.maxScreenWidth};
        break;
      default:
        newLocation = {};
        break;
    }
    this.props.onMoveBoard(newLocation);
  }

  shouldShow() {
    const {dimentions, type, currentLocation} = this.props;
    let show = false;
    switch(type) {
      case navigationBoardType.UP:
        show = currentLocation.row - dimentions.maxScreenHeight >= 0;
        break;
      case navigationBoardType.DOWN:
        show = currentLocation.row + dimentions.maxScreenHeight < dimentions.allCellsHeight;
        break;
      case navigationBoardType.RIGHT:
        show = currentLocation.col + dimentions.maxScreenWidth < dimentions.allCellsWidth;
        break;
      case navigationBoardType.LEFT:
        show = currentLocation.col - dimentions.maxScreenWidth >= 0;
        break;
      default:
        show = false;
        break;
    }
    return show;
  }
  generateStyle() {
    let style = "nav-button " + this.props.type;
    if(!this.shouldShow())
      style += " hide";
      return style;
  }
  render() {
    return (
      <span className={this.generateStyle()} onClick={() => this.onMove()}></span>
    );
  }
}

export default BoardNavgiation;
