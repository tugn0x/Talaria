import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input} from 'reactstrap'
import messages from 'containers/Patron/ReferencesListPage/messages'
import {useIntl} from 'react-intl';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import './style.scss';

const FilterSelect = props => {
    const {type, submitCallBack, selectedIds} = props
    const options = props.options.map(opt => {
        return {...opt, checked: selectedIds.includes(opt) ? true : false}
    })
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")
    const intl = useIntl();
    
    useEffect(() => {
        setData(options)
    }, [props.options])
    
    useEffect(() => {
        if(query !== ""){
            const regex = new RegExp(query, "i")
            setData(state =>  state.filter(item => regex.test(item.label) ))
        }else {
            setData(options)
        }
    }, [query])

    

    return (
        <>
        <UncontrolledDropdown className={`filter-select ${type}`} direction="down">
            <DropdownToggle className="d-flex justify-content-between align-items-center">
                <span>{intl.formatMessage(messages[type])}</span>
                <i className="fas fa-sort"></i>
            </DropdownToggle>
            <DropdownMenu center="true">
                <DropdownItem header>
                    <input type="text" name="filter-search" onChange={(e) => setQuery(e.target.value)} value={query} />
                    <i className="fas fa-search" /> 
                </DropdownItem>
                {data.length > 0 && data.map(item => (
                    <div className="filter-item" key={item.value}>
                        <CustomCheckBox 
                            label={item.label}
                            handleChange={() => submitCallBack(item.value)}
                            checked={selectedIds.includes(item.value) ? true : false}
                        />
                    </div>
                ))}
            </DropdownMenu>
        </UncontrolledDropdown>
        </>
    );
};

FilterSelect.propTypes = {
    type: PropTypes.string,
    options: PropTypes.array
};

export default FilterSelect;