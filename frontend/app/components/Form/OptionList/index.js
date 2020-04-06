import React  from 'react'
// import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';
import Select from 'react-select';
import {Input} from 'reactstrap'
import {isEmpty} from 'lodash'
import {useIntl} from 'react-intl'
import formMessages from '../CustomForm/messages'

const OptionList = (props) => {
    const {field, label, selectedData, options, searchOptionList, handleChange} = props
    const intl = useIntl()
    
    const handleChangeOptionList = (option) => {
        handleChange(option) 
    }

    const handleSearchOptionList = (newValue, name) => {
        const inputValue = newValue.replace(/\W/g, '');
        searchOptionList[name](inputValue)
    };

    return (
       // selectedData &&
            <>
            <Select
                className={`option-list ${selectedData ? '' : 'danger'}`}
                type="custom-select"
                value={selectedData ? selectedData : {label: intl.formatMessage(formMessages.select), value: 0}}
                name={field.name}
                onChange={(option) => handleChangeOptionList(option)}
                onInputChange={(input) =>  searchOptionList && !isEmpty(searchOptionList) ? handleSearchOptionList(input, field.options) : input}
                options={options}
            /> 
            <Input 
                type="text"
                value={selectedData || ''}
                style={{
                    opacity: 0,
                    width: "100%",
                    height: 0,
                    position: "absolute"
                  }}
              //  onChange={(e) => e.target.value = selectedData}
                required={field.required ? field.required : false} />
            </>
    )
}

OptionList.propTypes = {
    handleChange: PropTypes.func.isRequired,
    searchOptionList: PropTypes.object.isRequired,
    // selectedData: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
};

export default OptionList