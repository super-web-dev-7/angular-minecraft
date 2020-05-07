import React, { Component } from 'react';
import './MineSweeper.css';
import GameOptions from '../game-options/GameOptions';
import BoardWrapper from '../board-wrapper/BoardWrapper';
import PopupMessage from '../popup-message/PopupMessage';

class MineSweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 10,
      width: 10, 
      numOfMines: 15,
      flags: 15,
      gameNumber: 1,
      isSupermanMode: false,
      popup: {}
    };
  }
  handleGameOptionChange(event) {
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    if(event.target.type === "checkbox")
      propertyValue = event.target.checked;
    if(!this.isValidInput(event))
      return;
    this.setState({[propertyName]: propertyValue})
  }
  isValidInput(event) {
    let value = event.target.value;
    if(event.target.type === "checkbox")
      return true;
    let isNotValidText = (value !== '' && value <= 0) || isNaN(value);
    if(isNotValidText)
      return false;
    return true;
  }
  handleNewGame() {
    const {height, width, numOfMines} = this.state;
    if(numOfMines > height * width)
      return;
    this.setState((prevState, props) => {
      return {
              height,
              width,
              numOfMines,
              flags: numOfMines,
              gameNumber: prevState.gameNumber+1
             }
    });
  } 
  onCellFlaggedChanged(cellFlagged) {
    let newFlagsNumber = cellFlagged ? this.state.flags - 1 : this.state.flags + 1;
    this.setState({
      flags: newFlagsNumber
    });
  }
  renderPopup() {
    const {show, title, content, actionText, onClick} = this.state.popup;
    if(show) {
      return (<PopupMessage 
                title={title} 
                content={content}
                actionText={actionText}
                onClick={onClick} />);
    }
  }
  closePopup() {
    this.setState({
      popup: {
        open: false
      }
    });
  }
  openWinningPopup() {
    this.setState({
      popup: {
        show:true,
        title: "You Won!",
        content: "Great job, you did find all the mines!",
        actionText: "Start Over",
        onClick: () => {this.closePopup(); this.handleNewGame()}
      }
    });
  }
  openLosingPopup() {
    this.setState({
      popup: {
        show:true,
        title: "You Lost :(",
        content: "You hitted a mine! you can try again...",
        actionText: "Start Over",
        onClick: () => {this.closePopup(); this.handleNewGame()}
      }
    });
  }
  render() {
    const {height, width, numOfMines, flags, gameNumber} = this.state;
    const styles = ['game-container'];
    if(this.state.isSupermanMode)
      styles.push('superman-mode');
    return (
      <div className={styles.join(' ')}>
        {this.renderPopup()}
        <GameOptions onNewGame={this.handleNewGame.bind(this)} 
                     flagsNumber={flags}
                     handleChange={this.handleGameOptionChange.bind(this)}
                     height={height}
                     width={width}
                     numOfMines={numOfMines}/>
        <BoardWrapper height={height} 
                      width={width} 
                      numOfMines={numOfMines} 
                      onCellFlaggedChanged={this.onCellFlaggedChanged.bind(this)}
                      gameNumber={gameNumber}
                      hasFlags={() => this.state.flags > 0}
                      onWin={this.openWinningPopup.bind(this)}
                      onLose={this.openLosingPopup.bind(this)} />
      </div>
    );
  }
}

export default MineSweeper;
