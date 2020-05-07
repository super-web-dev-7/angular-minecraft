import React from 'react';
import './PopupMessage.css';

const PopupMessage = (props) => {

    return (
      <div className="popup"> 
          <div className="popup-inner">
          <h2>{props.title}</h2>
          {props.content}
            <div className="popup-footer">
            <button className="btn red" onClick={props.onClick}>{props.actionText}</button>
            </div>
          </div>
      </div>
    );
}

export default PopupMessage;
