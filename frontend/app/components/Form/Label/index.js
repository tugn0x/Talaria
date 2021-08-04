import React from 'react'
import {Label} from 'reactstrap'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';
const Label = (props) => {
    const {field, label, data, onClick} = props
    const intl = useIntl()
    
    const onClick = (e) => {
       return e;
    }

    return (
        <Label
            className="form-control"
            id={field.name}
            type={field.type}
            disabled={field.disabled ? field.disabled : false}
            placeholder={label ? intl.formatMessage(label) : ""}
            name={field.name}
            size={field.size}
            cssModule={field.cssModule}
        />

         
    )
}

Label.propTypes = {
    handleChange: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
};

export default Label