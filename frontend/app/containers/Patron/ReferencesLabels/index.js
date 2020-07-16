import React, {useEffect, useState} from 'react';
import {requestLabelsOptionList, requestUpdateLabel} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {labelsOptionListSelector, isPatronLoading} from '../selectors';
import ReferencesTag from 'components/Patron/ReferencesTag';
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';


const ReferencesLabels = props => {
    // console.log('ReferencesLabels', props)
    const {dispatch, labelsOptionList, loading} = props
    

    useEffect(() => {
        dispatch(requestLabelsOptionList())
    }, [])


    const saveItem = (label_id, name, i) => {
        dispatch(requestUpdateLabel(label_id, name))
     } 

    return (
        <div>
            <h1 className="section-title large">Labels</h1>
            {labelsOptionList.length > 0 && labelsOptionList.map((label, i) => (
                <ReferencesTag 
                    key={`${label.label}-${label.value}`}
                    data={label}
                    saveItem={(label_id, name) => saveItem(label_id, name)}
                    loading={loading}
                />
            ))}
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