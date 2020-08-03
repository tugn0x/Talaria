import React, {useEffect, useState} from 'react'
import {requestGetReference} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm,Loader} from 'components';
import ReferenceDetail from 'components/Patron/ReferenceDetail';
import ReferenceRequest from 'components/Patron/ReferenceRequest';
import {requestPostReferences,requestUpdateReferences,requestMyActiveLibrariesOptionList, requestLabelsOptionList, requestApplyLabelsToReferences} from '../actions'
import messages from './messages'
import {useIntl} from 'react-intl';


const ReferencesPage = (props) => {
    console.log('ReferencesPage', props)
    const {dispatch, isLoading, match, patron} = props
    const {params} = match
    const reference = patron.reference 
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'
    const isRequest = !params.id && params.op=="request"
    const labelsOptionList = patron.labelsOptionList;
    // const groupsOptionList = patron.groupsOptionList
    useEffect(() => {
        if(!isNew && !isLoading){
           dispatch(requestGetReference(params.id))
           dispatch(requestLabelsOptionList())
        }
    }, [params.id])

    useEffect(() => {
       // if(isRequest && !isLoading){
           dispatch(requestMyActiveLibrariesOptionList())
           /*
            + dispatch della api /libraries/{id}/deliveries/
            */
       // }
    }, [/*isRequest*/])
    
    const applyLabelsToReferences = (labelIds,refIds) => {
        dispatch(requestApplyLabelsToReferences(refIds,[labelIds],'etichetta applicata', true))
     }
    
    return (
        <Loader show={isLoading}>
            {isNew && (
                <ReferencesForm 
                   //  loading={isLoading} 
                    messages={messages}
                    createReference={ (formData) => dispatch(requestPostReferences(formData, intl.formatMessage(messages.referenceAdded))) } />
                )
            }
            {!isNew && ( 
                params.op && params.op=="edit" &&
                    <ReferencesForm 
                        messages={messages}
                        reference={reference}
                        labelsOptionList={labelsOptionList}
                        applyLabels={applyLabelsToReferences}
                        updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) } />
                ||
                params.op && params.op=="request" &&
                    <ReferenceRequest
                        messages={messages}
                        reference={reference} 
                    />
                ||
                    <ReferenceDetail 
                        messages={messages}
                        reference={reference} 
                    />
                )
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