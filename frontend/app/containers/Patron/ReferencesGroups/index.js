import React, {useEffect, useState} from 'react';
import {requestGroupsOptionList, requestPostGroup, requestUpdateGroup, requestRemoveGroup} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button} from 'reactstrap'
import {groupsOptionListSelector, isPatronLoading} from '../selectors';
import ReferencesTag from 'components/Patron/ReferencesTag';
import messages from './messages';
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
// import './style.scss';


const ReferencesGroups = props => {
    // console.log('ReferencesGroups', props)
    const {dispatch, groupsOptionList, loading} = props;
    const [newGroupName, setNewGroupName] = useState("");
    const [toggleInput, setToggleInput] = useState(false)
    const intl = useIntl();

    useEffect(() => {
        dispatch(requestGroupsOptionList())
    }, [])

    const handleChange = (e) => {
        const newGroup = e.target.value;
        setNewGroupName(newGroup)
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            saveItem() 
        }
    }

    const updateItem = (group_id, name) => {
        dispatch(requestUpdateGroup(group_id, name, intl.formatMessage(messages.groupUpdateMessage)))
    }
    
    const saveItem = () => {
        dispatch(requestPostGroup(newGroupName, intl.formatMessage(messages.groupCreateMessage)))
        setNewGroupName("")
        setToggleInput(state => !state)
    }

    const removeItem = (group_id) => {
        // console.log(intl.formatMessage(messages.labelRemoveMessage))
        dispatch(requestRemoveGroup(group_id, intl.formatMessage(messages.groupRemoveMessage) ))
    } 

    return (
        <div className="ReferencesGroups tags-list">
            <h1 className="section-title large">{intl.formatMessage(messages.groups)}</h1>
            <Dropdown direction="right" isOpen={toggleInput} toggle={() => setToggleInput(state => !state)}>
                <DropdownToggle color="icon">
                    <i className="fas fa-folder-plus"></i>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header tag="div">
                        <Row className="align-items-center justify-content-around">
                            <input 
                                type="text" 
                                placeholder={intl.formatMessage(messages.groupCreateNew)}
                                name="tag-add" 
                                onChange={(e) => handleChange(e)} 
                                onKeyPress={(e) => handleKeyPress(e)}
                                value={newGroupName} />
                            <Button color="icon" onClick={saveItem}>
                                <i className="fas fa-save"></i>    
                            </Button>    
                        </Row>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Loader show={loading}>
                {groupsOptionList.length > 0 && groupsOptionList.map(group => (
                        <ReferencesTag 
                            key={`${group.label}-${group.value}`}
                            data={group}
                            updateItem={(group_id, name) => updateItem(group_id, name)}
                            removeItem={(group_id)=> removeItem(group_id)}
                            loading={loading}
                        />
                    ))}
            </Loader>
        </div>
    );
};



const mapStateToProps = createStructuredSelector({
    groupsOptionList: groupsOptionListSelector(),
    loading: isPatronLoading()
});
  
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(ReferencesGroups);