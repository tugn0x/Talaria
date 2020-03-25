import React from 'react'
import {CustomInput} from 'reactstrap'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';
const InputField = (props) => {
    const {field, label, data, handleChange} = props
    const intl = useIntl()
    
    return (
        <CustomInput
            className="form-control"
            id={field.name}
            type={field.type}
            disabled={field.disabled ? field.disabled : false}
            placeholder={label ? intl.formatMessage(label) : ""}
            name={field.name}
            value={data ? data : ""}
            onChange={(e) => handleChange(e.target.value)}
            required={field.required ? field.required : false}
        />
    )
}

InputField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
};

export default InputField