import React from 'react'
import {Button} from 'reactstrap'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';


const ButtonShow = (props) => {
  
    const intl = useIntl()
    const {onClickData} = props    

    return (
        <Button
            className="form-control"
            id={field.name}
            type={field.type}
            disabled={field.disabled ? field.disabled : false}
            placeholder={label ? intl.formatMessage(label) : ""}
            name={field.name}
            onClick={(e)=> onClickData(e, field.name, field.value)}
            required={field.required ? field.required : false}
            >
        </Button>
    )
}

ButtonShow.propTypes = {
    onClickData: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
};

export default ButtonShow