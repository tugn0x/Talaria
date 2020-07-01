import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input} from 'reactstrap'
import messages from 'containers/Patron/ReferencesListPage/messages'
import {useIntl} from 'react-intl';
import './style.scss';

const FilterSelect = props => {
    const {type} = props
    const options = props.options.map(opt => ({...opt, checked: false}))
    const [defaultData, setDefaultData] = useState(options)
    const [data, setData] = useState(options)
    const [query, setQuery] = useState("")
    const intl = useIntl();
    
    const handleCheckBox = (options, itemValue) => {
        return options.map(item => {
            if(item.value === itemValue){
                return {...item, checked: item.checked ? !item.checked : true }
            }else {
                return {...item}
            }
        })
    }

    const onCheckBox = (itemValue) => {
        setData(state => handleCheckBox(state, itemValue)) 
        setDefaultData(state => handleCheckBox(state, itemValue)) 
    }

    useEffect(() => {
        if(query !== ""){
            const regex = new RegExp(query, "i")
            setData(state =>  state.filter(item => regex.test(item.label) ))
        }else {
            setData(defaultData)
        }
    }, [query])

    

    return (
        <UncontrolledDropdown className={`filter-select ${type}`} direction="down">
            <DropdownToggle className="d-flex justify-content-between align-items-center">
                <span>{intl.formatMessage(messages[type])}</span>
                <i className="fa fa-sort"></i>
            </DropdownToggle>
            <DropdownMenu center="true">
                <DropdownItem header>
                    <input type="text" name="filter-search" onChange={(e) => setQuery(e.target.value)} value={query} />
                    <i className="fa fa-search" />    
                </DropdownItem>
                {data.length > 0 && data.map(item => (
                    <div className="filter-item" key={item.value}>
                        <input type="checkbox" onChange={(e) => onCheckBox(item.value)} checked={item.checked ? item.checked : false}  id={item.label} />
                        <label htmlFor={item.label}>{item.label}</label>
                    </div>
                ))}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

FilterSelect.propTypes = {
    type: PropTypes.string,
    options: PropTypes.array
};

export default FilterSelect;