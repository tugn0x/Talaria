import React from 'react'
import {CustomInput} from 'reactstrap'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';
import { fields } from '../../../containers/RegisterLibrary/fields';
const InputField = (props) => {
    const {field, label, data, handleChange} = props
    const intl = useIntl()
    
    const onChange = (e) => {
        let reg = ""
        if (field.type === 'number')
            reg =  /^[0-9\g]+$/ 
        
        if (field.type === 'textarea')
            reg =  /^.*$/
        else
            reg =  /^.{1,50}$/
        
        if(e.target.value == '' || reg.test(e.target.value)){
            handleChange(e.target.value)
        }else {
            e.preventDefault()
        }
    }

    return (
        (field.type==='textarea') ?
        (
            <textarea 
            id={field.name} 
            className="form-control"                                                                                                                                     
            disabled={field.disabled ? field.disabled : false}
            placeholder={label ? intl.formatMessage(label) : ""}
            maxLength={field.maxLength}
            name={field.name}
            value={data ? data : ""}
            onChange={(e) => onChange(e)}
            required={field.required ? field.required : false}
            cols={field.cols}
            rows={field.rows}
            ></textarea>
        ) :
        (
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
    )
}

InputField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
};

export default InputField