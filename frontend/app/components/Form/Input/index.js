import React from 'react';
import PropTypes from 'prop-types';
import {Label, Input as InputField} from 'reactstrap';
import ErrorBox from 'components/Form/ErrorBox';
import {useIntl} from 'react-intl';

const Input = ({label, handleChange, type, required, input}) => {
    
    const [inputValue, setInptValue] = React.useState(input ? input : "");
    const intl = useIntl();
    const onChange = (e) => {
        const reg = type === 'number' ? /^[0-9\g]+$/ : /^.{1,50}$/
        if(e.target.value === '' || reg.test(e.target.value)){
            handleChange(e.target.value)
            setInptValue(e.target.value)
        }else {
            e.preventDefault()
        }
    }

    return (
        <>
            <Label>{label}</Label>
            <InputField 
                placeholder={label}
                onChange={(e) => onChange(e)}
                value={inputValue}
                required={required}
            />
            <ErrorBox 
                className="invalid-feedback" 
                error={  intl.formatMessage({ id: 'app.global.invalid_field' })}
            /> 
        </>
    );
};

Input.propTypes = {
    
};

export default Input;