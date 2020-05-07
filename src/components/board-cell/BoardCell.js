import React, { Component } from 'react';
import './BoardCell.css';
import { cellType } from '../../helpers/game-contants';

export class BoardCell extends Component {

  isEven(number) {
    return number % 2 === 0;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return  nextProps.gameNumber !== this.props.gameNumber ||
            nextProps.cell.isOpen !== this.props.cell.isOpen ||
            nextProps.cell.isFlagged !== this.props.cell.isFlagged;
  }

  generateButtonStyles() {
    const buttonStyles = [];
    const {row, col} = this.props.cell;
    let backgroundStyle = (this.isEven(row) && this.isEven(col)) || 
                            (!this.isEven(row) && !this.isEven(col)) ? 'dark' : 'light';
    buttonStyles.push(backgroundStyle);                
    return buttonStyles;
  }
  
  generateCellStyles() {
    const cellStyles = [];
    const {value, isOpen, row, col} = this.props.cell;
    if(value && value > 0) {
      let textColorStyle = 'number-color-'+value;
      cellStyles.push(textColorStyle);
    }
    let backgroundStyle = (this.isEven(row) && this.isEven(col)) || 
    (!this.isEven(row) && !this.isEven(col)) ? 'dark' : 'light';
    cellStyles.push(backgroundStyle); 
    cellStyles.push("cell");
    if(isOpen) {
      cellStyles.push("open");
    }
    return cellStyles;         
  }

  renderButton() {
    const {onCellClick, gameOver} = this.props;
    return(<button 
      disabled={gameOver}
      className={this.generateButtonStyles().join(' ')}
      onClick={onCellClick}>
    </button>);
  }
  renderCellContent() {
    const {value, type} = this.props.cell;
    if(type === cellType.MINE)
      return (<div className="led-red"></div>);
    if(type === cellType.NUMBER) {
      return (<span>{value}</span>);
    }
  }
  renderFlag() {
    const {isOpen, isFlagged} = this.props.cell;
    if(isFlagged && !isOpen) {
      return (<div className='flag'></div>)
    }
    return null;
  }
  render() {
    return (
      <div className={this.generateCellStyles().join(' ')}>
        {this.renderFlag()}
        {this.renderButton()}
        <span className='cell-content'>{this.renderCellContent()}</span>
      </div>
    );
  }
};

export default BoardCell;
