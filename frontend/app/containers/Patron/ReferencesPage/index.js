import React, {useEffect, useState} from 'react'
import {requestGetReference, requestRemoveLabel} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm,Loader} from 'components';
import ReferenceDetail from 'components/Patron/ReferenceDetail';
import ReferenceRequest from 'components/Patron/ReferenceRequest';
import {requestPostReferences,requestUpdateReferences,
        requestMyActiveLibrariesOptionList, requestLabelsOptionList, 
        requestGroupsOptionList, requestApplyLabelsToReferences, 
        requestApplyGroupsToReferences, requestRemoveReferenceLabel,
        requestRemoveReferenceGroup, requestDeleteReference,requestGetLibraryDeliveries,requestPostRequest} from '../actions'
import messages from './messages';
import confirm from "reactstrap-confirm";
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';
import ErrorMsg from '../../../components/ErrorMsg';


const ReferencesPage = (props) => {
    console.log('ReferencesPage', props)
    const {dispatch, isLoading, match, patron} = props
    const {params} = match
    const reference = patron.reference 
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'
    const isRequest = params.id && params.op=="request"
    const labelsOptionList = patron.labelsOptionList;
    const groupsOptionList = patron.groupsOptionList;
    const libraryOptionList= patron.libraryOptionList;
    const deliveryOptionList= patron.deliveryOptionList;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if(!isNew && !isLoading){
           dispatch(requestGetReference(params.id));
        }
        if(!isLoading){
            dispatch(requestLabelsOptionList());
            dispatch(requestGroupsOptionList());
        }
        
    }, [params.id])

    useEffect(() => {
       if(isRequest && !isLoading)
           dispatch(requestMyActiveLibrariesOptionList())
    }, [isRequest])

    async function deleteReference (id) {
        let conf = await confirm({
             title: intl.formatMessage({id: 'app.global.confirm'}),
             // message: intl.formatMessage(messages.askRemoveLabelMessage),
             message: "Remove Reference",
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
             dispatch(requestDeleteReference(id,intl.formatMessage({id: 'app.global.removedMessage'})))
     }
    
    const applyLabelsToReferences = (labelIds,refIds) => {
        dispatch(requestApplyLabelsToReferences(refIds,[labelIds],'etichetta applicata', true))
     }
    const applyGroupsToReferences = (labelIds,refIds) => {
        dispatch(requestApplyGroupsToReferences(refIds,[labelIds],'etichetta applicata', true))
     }

     const libraryOnChange = (lib) => {
        dispatch(requestGetLibraryDeliveries(lib.id));
     }

    
     const submitReferenceRequest = (data) => {
         dispatch(requestPostRequest(data,"Request added"))
     }

     const canRequest = (ref) => {
        return (ref.active_patronrequests==0)
     }

     
     const canEdit = (ref) => {
        return (ref.patronrequests==0)
    }
    
    
    return (
        <Loader show={isLoading}>
            {isNew && isMounted && (
                <ReferencesForm 
                    messages={messages}
                    createReference={ (formData) => dispatch(requestPostReferences(formData, intl.formatMessage(messages.referenceAdded))) } 
                    labelsOptionList={labelsOptionList}
                    groupsOptionList={groupsOptionList}
                />
                )
            }
            {!isNew && ( 
                params.op && params.op=="edit" &&
                    (canEdit(reference) && <ReferencesForm 
                        messages={messages}
                        reference={reference}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        applyLabels={applyLabelsToReferences}
                        applyGroups={applyGroupsToReferences}
                        deleteReference={(id) => deleteReference(id)}
                        removeLabel={(id, labelId) => dispatch(requestRemoveReferenceLabel(id,labelId, 'removeLabel' ))}
                        removeGroup={(id, groupId) => dispatch(requestRemoveReferenceGroup(id,groupId,'removeGroup'))}
                        updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) } 
                        />
                        || 
                        <ErrorMsg message="ERROR: can't edit this reference"/>)
                ||
                isRequest && isMounted &&
                    (canRequest(reference) && <ReferenceRequest
                        messages={messages}
                        reference={reference} 
                        libraryOptionList={libraryOptionList}
                        deliveryOptionList={deliveryOptionList}
                        libraryOnChange={libraryOnChange}
                        submitCallBack={submitReferenceRequest}
                        history={props.history}
                    /> || 
                    <ErrorMsg message="ERROR: can't request this reference"/>)
                ||
                    <div className="detail">
                        <SectionTitle 
                            back={true}
                            title={messages.headerDetail}
                        />
                        <ReferenceDetail 
                            messages={messages}
                            reference={reference} 
                            deleteReference={(id) => deleteReference(id)}
                        />
                    </div>
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