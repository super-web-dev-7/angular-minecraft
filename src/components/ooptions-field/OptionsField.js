import React from 'react';
import './OptionsField.css';

const OptionsField = (props) => {
    return (
        <div className="field-group">      
          <input type="text" 
                 value={props.value}
                 name={props.name}
                 onChange={props.onChange} required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>{props.label}</label>
        </div>
    );
}

export default OptionsField;
