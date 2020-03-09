import React, {useEffect, useState} from 'react'
import {requestGetReference} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm, /* ReferencesList */} from 'components';
import {requestPostReferences,requestUpdateReferences} from '../actions'
import messages from './messages'
import {useIntl} from 'react-intl';


const ReferencesPage = (props) => {
    const {dispatch, isLoading, location, match, patron} = props
    const {params} = match
    const reference = patron.reference 
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'

    useEffect(() => {
        if(!isNew && !isLoading){
           dispatch(requestGetReference(params.id))
        }
    }, [params.id])
    
    return (
        <>
            {isNew && 
                <ReferencesForm 
                    loading={isLoading} 
                    createReference={ (formData) => dispatch(requestPostReferences(formData, intl.formatMessage(messages.referenceAdded))) } />
            }
            {!isNew && 
                <ReferencesForm 
                    reference={reference}
                    loading={isLoading} 
                    updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) } />
            }
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isPatronLoading(),
    patron: makeSelectPatron()
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
  
export default compose(withConnect)((ReferencesPage));