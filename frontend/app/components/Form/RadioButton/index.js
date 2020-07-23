import React from 'react';
import PropTypes from 'prop-types';
import "./style.scss";

const RadioButton = props => {
    
    const {handleChange, checked, label} = props;
    // const [checkedRadio, setCheckedRadio] = React.useState(checked ? checked);


    return (
        <label className="radio-input"> 
            <input 
                hidden
                type="radio" 
                onChange={(e) => handleChange(e)}  
                checked={checked}   
                name="radio"
                />
            <span className="checkmark"></span>
            {label ? <span className="label text-dark-text">{label}</span> : null}
        </label>
    );
};

RadioButton.propTypes = {
    
};

export default RadioButton;