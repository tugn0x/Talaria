import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const CustomCheckBox = ({ label, handleChange, checked}) => {
    return (
        <label className="checkbox-input">
            <input 
                hidden
                type="checkbox" 
                onChange={(e) => handleChange(e)}  
                checked={checked}   
                />
            <span className="checkmark"></span>
            {label ? <span className="label">{label}</span> : null}
        </label>
    );
};

CustomCheckBox.propTypes = {
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    checked: PropTypes.bool,
   // id: PropTypes.string || PropTypes.number,
   // value: PropTypes.string || PropTypes.number,
};

export default CustomCheckBox;