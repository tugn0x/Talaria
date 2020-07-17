import React, {useEffect, useState} from 'react';
import {requestLabelsOptionList, requestPostLabel, requestUpdateLabel, requestRemoveLabel} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import {labelsOptionListSelector, isPatronLoading} from '../selectors';
import ReferencesTag from 'components/Patron/ReferencesTag';
import messages from './messages';
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
import './style.scss';


const ReferencesLabels = props => {
    // console.log('ReferencesLabels', props)
    const {dispatch, labelsOptionList, loading} = props;
    const [newLabelName, setNewLabelName] = useState("");
    const [toggleInput, setToggleInput] = useState(false)
    const intl = useIntl();

    useEffect(() => {
        dispatch(requestLabelsOptionList())
    }, [])

    const handleChange = (e) => {
        const newLabel = e.target.value;
        setNewLabelName(newLabel)
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            saveItem() 
        }
    }

    const updateItem = (label_id, name) => {
        dispatch(requestUpdateLabel(label_id, name, intl.formatMessage(messages.labelUpdateMessage)))
    }
    
    const saveItem = () => {
        dispatch(requestPostLabel(newLabelName, intl.formatMessage(messages.labelCreateMessage)))
        setNewLabelName("")
        setToggleInput(state => !state)
    }

    const removeItem = (label_id) => {
        // console.log(intl.formatMessage(messages.labelRemoveMessage))
        dispatch(requestRemoveLabel(label_id, intl.formatMessage(messages.labelRemoveMessage) ))
    } 

    return (
        <div className="ReferencesLabels tags-list">
            <h1 className="section-title large">{intl.formatMessage(messages.labels)}</h1>
            <Dropdown direction="right" isOpen={toggleInput} toggle={() => setToggleInput(state => !state)}>
                <DropdownToggle color="default">
                    <i className="icon-tag-plus"></i>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header tag="div">
                        <Row className="align-items-center justify-content-around">
                            <input 
                                type="text" 
                                placeholder={intl.formatMessage(messages.labelCreateNew)}
                                name="tag-add" 
                                onChange={(e) => handleChange(e)} 
                                onKeyPress={(e) => handleKeyPress(e)}
                                value={newLabelName} />
                            <i className="fas fa-save" onClick={saveItem}></i>
                        </Row>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Loader show={loading}>
                {labelsOptionList.length > 0 && labelsOptionList.map((label, i) => (
                        <ReferencesTag 
                            key={`${label.label}-${label.value}`}
                            data={label}
                            updateItem={(label_id, name) => updateItem(label_id, name)}
                            removeItem={(label_id)=> removeItem(label_id)}
                            loading={loading}
                        />
                    ))}
            </Loader>
        </div>
    );
};



const mapStateToProps = createStructuredSelector({
    labelsOptionList: labelsOptionListSelector(),
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

export default compose(withConnect)(ReferencesLabels);