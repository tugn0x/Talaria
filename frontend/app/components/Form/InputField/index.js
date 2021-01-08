import React from 'react'
import {CustomInput} from 'reactstrap'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';
const InputField = (props) => {
    const {field, label, data, handleChange} = props
    const intl = useIntl()
    
    const onChange = (e) => {
        const reg = field.type === 'number' ? /^[0-9\g]+$/ : /^.{1,50}$/
        if(e.target.value == '' || reg.test(e.target.value)){
            handleChange(e.target.value)
        }else {
            e.preventDefault()
        }
    }

    return (
        <CustomInput
            className="form-control"
            id={field.name}
            maxLength={field.maxLength}
            type={field.type !== 'textarea' ? 'text' : 'textarea'}
            disabled={field.disabled ? field.disabled : false}
            placeholder={label ? intl.formatMessage(label) : ""}
            name={field.name}
            value={data ? data : ""}
            onChange={(e) => onChange(e)}
            required={field.required ? field.required : false}
        />
    )
}

InputField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
};

export default InputField