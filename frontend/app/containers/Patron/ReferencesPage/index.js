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
        requestRemoveReferenceGroup, requestDeleteReference} from '../actions'
import messages from './messages';
import confirm from "reactstrap-confirm";
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';


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
       if(isRequest && !isLoading){
           dispatch(requestMyActiveLibrariesOptionList())
           /*
            + dispatch della api /libraries/{id}/deliveries/
            */
       }
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
    
    return (
        <Loader show={isLoading}>
            {isNew && (
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
                    <ReferencesForm 
                        messages={messages}
                        reference={reference}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        applyLabels={applyLabelsToReferences}
                        applyGroups={applyGroupsToReferences}
                        deleteReference={(id) => deleteReference(id)}
                        removeLabel={(id, labelId) => dispatch(requestRemoveReferenceLabel(id,labelId, 'removeLabel' ))}
                        removeGroup={(id, groupId) => dispatch(requestRemoveReferenceGroup(id,groupId,'removeGroup'))}
                        updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) } />
                ||
                !isNew && isRequest &&
                    <ReferenceRequest
                        messages={messages}
                        reference={reference} 
                    />
                ||
                    <div className="detail">
                        <SectionTitle 
                            back={true}
                            title={messages.headerDetail}
                        />
                        <ReferenceDetail 
                            messages={messages}
                            reference={reference} 
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