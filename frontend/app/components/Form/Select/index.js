import React from 'react'
import {CustomInput} from 'reactstrap'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';

const Select = (props) => {
    const {field, label, selectedData, handleChange, options} = props
    const intl = useIntl()
    
    return (
        <CustomInput
            className="form-control"
            id={field.name}
            type="select"
            disabled={field.disabled ? field.disabled : false}
            placeholder={label ? intl.formatMessage(label) : ""}
            name={field.name}
            value={selectedData ? selectedData : ""}
            onChange={(e) => handleChange(e.target.value)}
            required={field.required ? field.required : false}
        >
            {
            /* (typeof field.options === 'string') ?
            props[field.options] && props[field.options].map((opt, i) => (
                    <option key={`${field.name}-${i}`} value={opt.value}>
                        {opt.name}
                    </option>)
                ) : */
            options.map((opt, i) => (<option key={`${field.name}-${i}`} value={opt.value}>{opt.name}</option>))
            }
        </CustomInput>
    )
}

Select.propTypes = {
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
};

export default Select