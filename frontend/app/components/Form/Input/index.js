import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Label, Input as InputField} from 'reactstrap';
import ErrorBox from 'components/Form/ErrorBox';
import {useIntl} from 'react-intl';


const Input = ({label, handleChange, type, required, input,noplaceholder}) => {
    
    const [inputValue, setInptValue] = React.useState("");
    const intl = useIntl();
    const onChange = (e) => {
        const reg = type === 'number' ? /^[0-9\g]+$/ : /^.*$/
        if(e.target.value === '' || reg.test(e.target.value)){
            handleChange(e.target.value)
            setInptValue(e.target.value)
        }else {
            e.preventDefault()
        }
    }

    useEffect(() => {
        setInptValue(input ? input : "")
    }, [input])

    return (
        <>
            {label && <Label>{label}</Label>}
            {type === 'textarea' && 
                <textarea
                    placeholder={noplaceholder?'':label}
                    onChange={(e) => onChange(e)}
                    value={inputValue}
                    required={required}
                    
                ></textarea>
             ||   
                <InputField 
                    placeholder={noplaceholder?'':label}
                    onChange={(e) => onChange(e)}
                    value={inputValue}
                    required={required}
                />
            }
            <ErrorBox 
                className="invalid-feedback" 
                error={  intl.formatMessage({ id: 'app.global.invalid_field' })}
            /> 
        </>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    input:  PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    required: PropTypes.bool,
};

export default Input;