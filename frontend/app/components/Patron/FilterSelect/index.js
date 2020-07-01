import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input} from 'reactstrap'
import messages from 'containers/Patron/ReferencesListPage/messages'
import {useIntl} from 'react-intl';
import './style.scss';

const options = [
    {value: 1, label: "Geografia"},
    {value: 2, label: "Storia"},
    {value: 3, label: "Ambiente"},
    {value: 4, label: "Scienza"},
    {value: 5, label: "Minerali"},
]

const FilterSelect = props => {
    const {type} = props
    const [defaultData, setDefaultData] = useState(options)
    const [data, setData] = useState(options)
    const [query, setQuery] = useState("")
    
    const queryREF = useRef(query)
    queryREF.current = query
    const intl = useIntl();
    
    const handleCheckBox = (itemValue) => {
        // const checked = e.target.checked;
        console.log(itemValue)
        setData(state => {
            return state.map(item => {
                if(item.value === itemValue){
                    // setDefaultData(state)
                    return {...item, checked: item.checked ? !item.checked : true }
                }else {
                    return {...item}
                }
                
            })
        }) 
        
    }

    useEffect(() => {
        if(query !== ""){
            const regex = new RegExp(query, "i")
            setData(state =>  state.filter(item => regex.test(item.label) ))
        }else {
            setData(options)
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
                    <Input type="text" name="filter-search" onChange={(e) => setQuery(e.target.value)} value={query} />
                    <i className="fa fa-search" />    
                </DropdownItem>
                {data.length > 0 && data.map(item => (
                    <div key={item.value}>
                        <Input type="checkbox" onChange={(e) => handleCheckBox(item.value)} checked={item.checked ? item.checked : false}  id={item.label} />
                        <label htmlFor={item.label}>{item.label}</label>
                    </div>
                ))}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

FilterSelect.propTypes = {
    type: PropTypes.string
};

export default FilterSelect;