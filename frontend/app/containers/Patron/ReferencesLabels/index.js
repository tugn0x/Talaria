import React, {useEffect, useState} from 'react';
import {requestLabelsOptionList, requestPostLabel, requestUpdateLabel, requestRemoveLabel} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {labelsOptionListSelector, isPatronLoading} from '../selectors';
import ReferencesTag from 'components/Patron/ReferencesTag';
import messages from './messages';
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
import InputSearch from 'components/Form/InputSearch';
import SectionTitle from 'components/SectionTitle';

const ReferencesLabels = props => {
    // console.log('ReferencesLabels', props)
    const {dispatch, labelsOptionList, loading} = props;
    
    const intl = useIntl();

    useEffect(() => {
        dispatch(requestLabelsOptionList())
    }, [])

    const updateItem = (label_id, name) => {
        dispatch(requestUpdateLabel(label_id, name, intl.formatMessage(messages.labelUpdateMessage)))
    }
    
    const saveItem = (query) => {
        dispatch(requestPostLabel(query, intl.formatMessage(messages.labelCreateMessage)))
        
    }

    const removeItem = (label_id) => {
        // console.log(intl.formatMessage(messages.labelRemoveMessage))
        dispatch(requestRemoveLabel(label_id, intl.formatMessage(messages.labelRemoveMessage) ))
    } 

    return (
        <>
        <SectionTitle 
            title={messages.labels}
        />
        <div className="ReferencesLabels tags-list">
            <InputSearch
                icon="fas fa-save"
                placeholder={intl.formatMessage(messages.labelCreateNew)}
                submitCallBack={saveItem}
                className="w-50 mb-5"
            />
              
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
        </>
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