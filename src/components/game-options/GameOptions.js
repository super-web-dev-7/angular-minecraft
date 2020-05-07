import React, { Component } from 'react';
import './GameOptions.css';
import OptionsField from '../ooptions-field/OptionsField';

class GameOptions extends Component {
  render() {
    const {height, width, numOfMines} = this.props;
    return (
      <div className="game-options">
        <div className="flags-number">
          <div className="flag-pic"></div>
          <span className="number">{this.props.flagsNumber}</span> left
        </div>
        <OptionsField name="height" value={height} onChange={this.props.handleChange} label="Height" />
        <OptionsField name="width" value={width} onChange={this.props.handleChange} label="Width" />
        <OptionsField name="numOfMines" value={numOfMines} onChange={this.props.handleChange} label="# Of Mines" />
        <button className="btn red" onClick={this.props.onNewGame}>Start!</button>
        <div className="superman-option"><input name="isSupermanMode" id="isSupermanMode" type="checkbox" onChange={this.props.handleChange}/> <label htmlFor="isSupermanMode">Superman</label> </div>
        <div className="footer">
          By Yarden Gabay
        </div>
      </div>
    );
  }
}

export default GameOptions;
