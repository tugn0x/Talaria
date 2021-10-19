import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {UncontrolledDropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input} from 'reactstrap'
import {useIntl} from 'react-intl';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import './style.scss';

const ApplyTag = props => {
    console.log('ApplyTag', props)
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
            <DropdownToggle color="icon" disabled={disabled}>
                { (type === 'label'|| type==="tag" ) ? <i className="icon-tag-plus"></i> :  <i className="fas fa-folder-plus"></i>}
            </DropdownToggle>
            <DropdownMenu center="true" className="rounded">
                <DropdownItem header>
                    {type === 'label' && <p>{intl.formatMessage({id: 'app.references.labelAs'})}</p>}
                    {type === 'tag' && <p>{intl.formatMessage({id: 'app.requests.tagAs'})}</p>}
                    {type === 'group' && <p>{intl.formatMessage({id: 'app.references.groupAs'})}</p>}
                    <input type="text" name="apply-search" onChange={(e) => setQuery(e.target.value)} value={query} />
                    <i className="fas fa-search" />    
                </DropdownItem>
                {data.length > 0 && data.map(item => (
                    <div className="apply-item" key={`apply-${type}-${item.label.toLowerCase()}`}>
                        <CustomCheckBox 
                            handleChange={() => submitCallBack(item.value)}
                            label={item.label}
                        />
                    </div>
                ))}
                {query.length > 0 &&
                <div className="create-new">
                    <span>"{query}"</span>
                    <span className="action-btn" onClick={() => submitCallBack(query)}>{intl.formatMessage({id: 'app.global.createNewLabelGroupTag'})}</span>
                </div>
                }
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

ApplyTag.propTypes = {
    type: PropTypes.string,
    options: PropTypes.array
};

export default ApplyTag;