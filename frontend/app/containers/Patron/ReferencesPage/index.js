import React, {useEffect, useState} from 'react'
import {requestGetReference} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm,Loader} from 'components';
import ReferenceDetail from 'components/Patron/ReferenceDetail';
import {requestPostReferences,requestUpdateReferences} from '../actions'
import messages from './messages'
import {useIntl} from 'react-intl';


const ReferencesPage = (props) => {
    const {dispatch, isLoading, match, patron} = props
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
        <Loader show={isLoading}>
            {isNew && 
                <ReferencesForm 
                   //  loading={isLoading} 
                    messages={messages}
                    createReference={ (formData) => dispatch(requestPostReferences(formData, intl.formatMessage(messages.referenceAdded))) } />
            }
            {!isNew && 
                params.edit &&
                    <ReferencesForm 
                        messages={messages}
                        reference={reference}
                        // loading={isLoading} 
                        updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) } />
                ||
                    <ReferenceDetail 
                        messages={messages}
                        reference={reference} 
                    />
            }
        </Loader>
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