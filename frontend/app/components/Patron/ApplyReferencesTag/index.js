import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {UncontrolledDropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input} from 'reactstrap'
import messages from 'containers/Patron/ReferencesListPage/messages'
import {useIntl} from 'react-intl';
import './style.scss';

const ApplyReferencesTag = props => {
    console.log('ApplyReferencesTag', props)
    const {type, submitCallBack, options, disabled} = props
    const [data, setData] = useState(options)
    const [query, setQuery] = useState("")
    const intl = useIntl();
    
    useEffect(() => {
        setData(options)
    }, [options])

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
            <DropdownToggle color="default" disabled={disabled}>
                {type === 'label' ? <i className="icon-tag-plus"></i> :  <i className="fas fa-folder-plus"></i>}
            </DropdownToggle>
            <DropdownMenu center="true">
                <DropdownItem header>
                    {type === 'label' ? 
                        <p>{intl.formatMessage(messages.labelAs)}</p>
                    :  <p>{intl.formatMessage(messages.groupAs)}</p>}
                    <input type="text" name="apply-search" onChange={(e) => setQuery(e.target.value)} value={query} />
                    <i className="fas fa-search" />    
                </DropdownItem>
                {data.length > 0 && data.map(item => (
                    <div className="apply-item" key={`apply-${type}-${item.label.toLowerCase()}`}>
                        <input id={`apply-${type}-${item.label.toLowerCase()}`} type="checkbox" onChange={() => submitCallBack(item.value)}  /* checked={selectedIds.includes(item.value) ? true : false} */  />
                        <label htmlFor={`apply-${type}-${item.label.toLowerCase()}`}>{item.label}</label>
                    </div>
                ))}
                {query.length > 0 &&
                <div className="create-new">
                    <span>{query}</span>
                    <span className="action-btn" onClick={() => submitCallBack(query)}>{intl.formatMessage(messages.createNewLabel)}</span>
                </div>
                }
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

ApplyReferencesTag.propTypes = {
    type: PropTypes.string,
    options: PropTypes.array
};

export default ApplyReferencesTag;