import React, { useEffect, useState }  from 'react'
// import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';
import Select from 'react-select';
import {Input} from 'reactstrap'
import {isEmpty} from 'lodash'
import {useIntl} from 'react-intl'
import formMessages from '../CustomForm/messages'

const translateOptions = (options, intl) => {
    if(options && Array.isArray(options)){
        let objReturn = []
        objReturn = options.length > 0 ? options.map(opt => {
            if(opt.label.includes('app.global')){
                return { value: opt.value, label: intl.formatMessage({id: opt.label}) } 
            }else {
                return opt
            }
        }) : []
        return objReturn
    }else{
        let objReturn = {}
        if(options &&  options.label && options.label.includes('app.global')){
            objReturn = { value: options.value, label: intl.formatMessage({id: options.label}) } 
        }else {
            objReturn = options
        }
        return objReturn
    } 
}

const OptionList = (props) => {
    const {field, label, selectedOption, options, searchOptionList, handleChange} = props
    const [isRequired, setIsRequired] = useState(false)
    const intl = useIntl()
    
    const handleChangeOptionList = (option) => {
        handleChange(option) 
    }

    const handleSearchOptionList = (newValue, name) => {
        const inputValue = newValue.replace(/\W/g, '');
        searchOptionList[name](inputValue)
    };

   /*  useEffect(() => {
        translateOptions(selectedOption, intl)
    }, [selectedOption])
*/
    useEffect(() => {
        setIsRequired(() => {
           const required = options.length < 0 ?
            false :
            field.required && 
            options.length > 0 ?
            true :
            false
            return required
        })
    }, [options, field])  
    
    return (
       // selectedOption &&
            <>
            <Select
                className={`option-list ${!isRequired || selectedOption ? '' : 'danger'}`}
                type="custom-select"
                value={selectedOption ? translateOptions(selectedOption, intl) : {label: intl.formatMessage(formMessages.select), value: 0}}
                name={field.name}
                onChange={(option) => handleChangeOptionList(option)}
                onInputChange={(input) =>  searchOptionList && !isEmpty(searchOptionList) ? handleSearchOptionList(input, field.options) : input}
                options={translateOptions(options, intl)}
            /> 
           <Input 
                type="text"
                value={selectedOption || ''}
                style={{
                    opacity: 0,
                    width: "100%",
                    height: 0,
                    position: "absolute"
                  }}
                onChange={(e) => null}
                required={isRequired} /> 
            </>
    )
}

OptionList.propTypes = {
    handleChange: PropTypes.func.isRequired,
    searchOptionList: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired || PropTypes.object.isRequired,
    // selectedOption: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
};

export default OptionList