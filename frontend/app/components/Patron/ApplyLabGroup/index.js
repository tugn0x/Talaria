import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input} from 'reactstrap'
import messages from 'containers/Patron/ReferencesListPage/messages'
import {useIntl} from 'react-intl';
// import './style.scss';

const ApplyLabGroup = props => {
    const {type, submitCallBack, options, selectedIds} = props
    // const options = props.options
    const [data, setData] = useState(options)
    const [query, setQuery] = useState("")
    const intl = useIntl();
    
    
    useEffect(() => {
        if(query !== ""){
            const regex = new RegExp(query, "i")
            setData(state =>  state.filter(item => regex.test(item.label) ))
        }else {
            setData(options)
        }
    }, [query])

    

    return (
        <UncontrolledDropdown className={`apply ${type}`} direction="down">
            <DropdownToggle color="link">
                {/* <span>{intl.formatMessage(messages[type])}</span> */}
                {type === 'labels' ? <i className="icon-tag-plus"></i> :  <i className="fas fa-folder-plus"></i>}
            </DropdownToggle>
            <DropdownMenu center="true">
                <DropdownItem header>
                    {type === 'labels' ? 
                        <p>{intl.formatMessage(messages.labelAs)}</p>
                    :  <p>{intl.formatMessage(messages.groupAs)}</p>}
                    <input type="text" name="apply-search" onChange={(e) => setQuery(e.target.value)} value={query} />
                    <i className="fas fa-search" />    
                </DropdownItem>
                {data.length > 0 && data.map(item => (
                    <div className="apply-item" key={`apply-${type}-${item.value}`}>
                        <input id={`apply-${type}-${item.value}`} type="checkbox" onChange={() => submitCallBack(item.value)}  /* checked={selectedIds.includes(item.value) ? true : false} */  />
                        <label htmlFor={`apply-${type}-${item.value}`}>{item.label}</label>
                    </div>
                ))}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

ApplyLabGroup.propTypes = {
    type: PropTypes.string,
    options: PropTypes.array
};

export default ApplyLabGroup;