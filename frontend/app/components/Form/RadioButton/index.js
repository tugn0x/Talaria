import React from 'react';
import PropTypes from 'prop-types';
import "./style.scss";

const RadioButton = props => {
    
    const {handleChange, checked, label, required} = props;
    // const [checkedRadio, setCheckedRadio] = React.useState(checked ? checked);


    return (
        <label className="radio-input"> 
            <input 
                hidden
                type="radio" 
                onChange={(e) => handleChange(e)}  
                checked={checked}   
                name="radio"
                className="form-control"
                required={required ? required : false}
                />
            <span className="checkmark"></span>
            {label ? <span className="label text-dark-text">{label}</span> : null}
        </label>
    );
};

RadioButton.propTypes = {
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    required: PropTypes.bool,
};

export default RadioButton;