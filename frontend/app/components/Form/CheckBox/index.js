import React, {useState} from 'react'
import {CustomInput} from 'reactstrap'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';

const CheckBox = (props) => {
    const {field, label, data, handleChange} = props
    const intl = useIntl()
    
    return (
        <CustomInput
            // className="form-control"
            id={field.name}
            type="checkbox"
            name={field.name}
            placeholder={label ? intl.formatMessage(label) : ""}
            onChange={(e) => handleChange(e.target.checked)}
            required={field.required ? field.required : false}
            checked={data ? data : false}
        />
    )
}

CheckBox.propTypes = {
    handleChange: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
};

export default CheckBox